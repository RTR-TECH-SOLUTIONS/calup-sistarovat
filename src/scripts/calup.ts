/**
 * Harta unui calup de parcele cadastrale: tot satul pe fundal, parcelele de
 * vânzare scoase în față. Datele vin din `public/date/<slug>.geojson`, generat
 * de scripts/kml-calup.mjs din exportul QGIS al clientului.
 */
import { Map as MapLibre, Popup, NavigationControl, ScaleControl, setWorkerUrl, LngLatBounds } from 'maplibre-gl';
import type { MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { cale } from '../lib/cale';
import { styleBasemap, FONT_HARTA, type ModBasemap } from '../lib/basemap';

// Vezi harta.ts: fără calea explicită a workerului sursele GeoJSON rămân goale.
setWorkerUrl(cale('/maplibre/maplibre-gl-worker.mjs'));

interface ProprietatiParcela {
  cad: string;
  parcela: string;
  tarla: string;
  suprafata: number;
  categorie: string;
  vanzare: boolean;
}

type Colectie = GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon, ProprietatiParcela>;

const SURSA = 'parcele';

/** Denumirile din cadastru, cu diacritice, așa cum le scrie un notar. */
const CATEGORII: Record<string, string> = {
  arabil: 'Arabil',
  pasune: 'Pășune',
  faneata: 'Fâneață',
  drum: 'Drum',
  curti: 'Curți construcții',
  ape: 'Ape',
  padure: 'Pădure',
  neproductiv: 'Neproductiv',
  altele: 'Altele',
};

/**
 * Culoarea parcelelor de vânzare depinde de fundal. Pe satelit verdele se
 * pierde în câmp și în pădure, deci acolo e galbenul de evidențiere de pe
 * ortofotoplanuri, cu contur închis. Pe hartă rămâne verdele de „disponibil”.
 */
const VANZARE: Record<ModBasemap, { umplere: string; contur: string; opacitate: number }> = {
  harta: { umplere: '#2f8f57', contur: '#123f26', opacitate: 0.72 },
  teren: { umplere: '#ffd23f', contur: '#3a2c00', opacitate: 0.7 },
};

/** Cât de vizibil e restul satului pe fiecare fundal. Satelitul e închis la culoare, deci conturul e deschis. */
const FUNDAL: Record<ModBasemap, { contur: string; umplere: string; opacitate: number }> = {
  harta: { contur: '#6b6457', umplere: '#d8d2c4', opacitate: 0.28 },
  teren: { contur: '#f4f1ea', umplere: '#f4f1ea', opacitate: 0.04 },
};

const nf = new Intl.NumberFormat('ro-RO');
const mp = (n: number) => `${nf.format(n)} m²`;
const ha = (n: number) => `${new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 2 }).format(n / 10000)} ha`;

const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;

let harta: MapLibre;
let date: Colectie;
let mod: ModBasemap = 'teren';
let doarVanzare = false;
let selectat: number | null = null;
let hoverId: number | null = null;
const popup = new Popup({ closeButton: true, closeOnClick: false, maxWidth: '300px', offset: 8, anchor: 'bottom' });

function limite(features: Colectie['features']) {
  const b = new LngLatBounds();
  for (const f of features) {
    const inele = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const p of inele) for (const [x, y] of p[0]) b.extend([x, y]);
  }
  return b;
}

const FARA_VANZARE = ['!', ['get', 'vanzare']] as never;
const vizibil = () => (doarVanzare ? 'none' : 'visible');

const redusa = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Granițele României, cât să încapă toată țara în cadrul de pornire. */
const ROMANIA: [[number, number], [number, number]] = [
  [20.26, 43.62],
  [29.72, 48.27],
];

/**
 * Cât de aprinse sunt parcelele, de la 0 la 1. La intrare pornesc stinse și se
 * aprind spre finalul coborârii de pe glob, ca la demo-ul Boerescu: altfel ar
 * apărea ca o pată galbenă peste toată țara înainte să ajungă camera acolo.
 */
let aparitie = 1;
const hover = (aprins: number, stins: number) =>
  ['case', ['boolean', ['feature-state', 'hover'], false], aprins * aparitie, stins * aparitie] as never;

/** Expresiile de zoom nu pot sta într-o înmulțire, deci factorul intră în fiecare treaptă. */
const opacitati = () => {
  const f = FUNDAL[mod];
  return {
    'fundal-umplere': ['fill-opacity', hover(f.opacitate + 0.25, f.opacitate)],
    'fundal-contur': ['line-opacity', ['interpolate', ['linear'], ['zoom'], 12, 0.22 * aparitie, 15, 0.6 * aparitie]],
    'vanzare-umplere': ['fill-opacity', hover(0.9, VANZARE[mod].opacitate)],
    'vanzare-contur': ['line-opacity', aparitie],
  } as Record<string, [string, unknown]>;
};

function aplicaAparitie() {
  for (const [strat, [prop, val]] of Object.entries(opacitati())) {
    if (harta.getLayer(strat)) harta.setPaintProperty(strat, prop as never, val as never);
  }
}

let ceasAparitie: number | null = null;
function aprindeParcele(intarziere: number) {
  const durata = 1100;
  let start = 0;
  const pas = (t: number) => {
    if (!start) start = t + intarziere;
    aparitie = Math.min(1, Math.max(0, (t - start) / durata));
    aplicaAparitie();
    ceasAparitie = aparitie < 1 ? requestAnimationFrame(pas) : null;
  };
  if (ceasAparitie) cancelAnimationFrame(ceasAparitie);
  ceasAparitie = requestAnimationFrame(pas);
}

function adaugaStraturi() {
  if (harta.getSource(SURSA)) return;
  const f = FUNDAL[mod];
  harta.addSource(SURSA, { type: 'geojson', data: date });

  // Restul satului: doar hairline, ca pe un plan de situație. Nu trebuie să
  // concureze cu parcelele de vânzare, doar să arate unde sunt ele.
  harta.addLayer({
    id: 'fundal-umplere',
    type: 'fill',
    source: SURSA,
    filter: FARA_VANZARE,
    layout: { visibility: vizibil() },
    paint: {
      'fill-color': f.umplere,
      'fill-opacity': opacitati()['fundal-umplere'][1] as never,
    },
  });
  harta.addLayer({
    id: 'fundal-contur',
    type: 'line',
    source: SURSA,
    filter: FARA_VANZARE,
    layout: { visibility: vizibil() },
    paint: {
      'line-color': f.contur,
      'line-opacity': opacitati()['fundal-contur'][1] as never,
      'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.4, 16, 1],
    },
  });

  harta.addLayer({
    id: 'vanzare-umplere',
    type: 'fill',
    source: SURSA,
    filter: ['get', 'vanzare'] as never,
    paint: {
      'fill-color': VANZARE[mod].umplere,
      'fill-opacity': opacitati()['vanzare-umplere'][1] as never,
    },
  });
  harta.addLayer({
    id: 'vanzare-contur',
    type: 'line',
    source: SURSA,
    filter: ['get', 'vanzare'] as never,
    paint: {
      'line-color': VANZARE[mod].contur,
      'line-opacity': aparitie,
      'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.6, 16, 1.6],
    },
  });

  harta.addLayer({
    id: 'selectat',
    type: 'line',
    source: SURSA,
    filter: ['==', ['id'], selectat ?? -1] as never,
    paint: { 'line-color': '#15181a', 'line-width': 3 },
  });

  // Numărul cadastral apare abia când parcela e destul de mare pe ecran ca să
  // îl încapă. Sub zoom 15 ar fi doar zgomot peste 2.000 de forme.
  harta.addLayer({
    id: 'etichete',
    type: 'symbol',
    source: SURSA,
    minzoom: 15,
    filter: doarVanzare ? (['get', 'vanzare'] as never) : (['all'] as never),
    layout: {
      'text-field': ['get', 'cad'],
      'text-font': FONT_HARTA,
      'text-size': 11,
      'symbol-placement': 'point',
      'text-allow-overlap': false,
    },
    paint: {
      'text-color': mod === 'teren' ? '#ffffff' : '#15181a',
      'text-halo-color': mod === 'teren' ? 'rgba(0,0,0,0.75)' : 'rgba(251,250,247,0.9)',
      'text-halo-width': 1.4,
    },
  });
}

function fisa(p: ProprietatiParcela) {
  const stare = p.vanzare
    ? '<span class="stare stare-vanzare">De vânzare</span>'
    : '<span class="stare">Nu e de vânzare</span>';
  return `
    <div class="fisa">
      ${stare}
      <p class="fisa-titlu">Nr. cadastral <strong>${p.cad}</strong></p>
      <dl>
        <div><dt>Suprafață</dt><dd>${mp(p.suprafata)}<span> · ${ha(p.suprafata)}</span></dd></div>
        <div><dt>Categorie</dt><dd>${CATEGORII[p.categorie] ?? p.categorie}</dd></div>
        <div><dt>Tarla / parcelă</dt><dd>T${p.tarla} / P${p.parcela}</dd></div>
      </dl>
    </div>`;
}

function selecteaza(f: GeoJSON.Feature | MapGeoJSONFeature, centreaza = false) {
  selectat = Number(f.id);
  harta.setFilter('selectat', ['==', ['id'], selectat] as never);
  const b = limite([f as Colectie['features'][number]]);
  if (centreaza) harta.fitBounds(b, { padding: margini(120), maxZoom: 17, duration: redusa() ? 0 : 1400 });
  // Fișa stă deasupra parcelei, nu peste ea: parcela e ce vrei să vezi.
  popup
    .setLngLat([b.getCenter().lng, b.getNorth()])
    .setHTML(fisa(f.properties as ProprietatiParcela))
    .addTo(harta);
}

/** Panoul ocupă stânga pe desktop și josul pe telefon; încadrările îl ocolesc. */
function margini(m: number) {
  const lat = window.innerWidth > 900;
  return { top: m, right: m, left: lat ? 356 + m : m, bottom: lat ? m : window.innerHeight * 0.42 + m / 2 };
}

function laClick(e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) {
  const f = e.features?.[0];
  if (f) selecteaza(f);
}

function laHover(e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) {
  const f = e.features?.[0];
  const id = f ? Number(f.id) : null;
  if (id === hoverId) return;
  if (hoverId !== null) harta.setFeatureState({ source: SURSA, id: hoverId }, { hover: false });
  hoverId = id;
  if (id !== null) harta.setFeatureState({ source: SURSA, id }, { hover: true });
  harta.getCanvas().style.cursor = id !== null ? 'pointer' : '';
}

function legaInteractiuni() {
  for (const strat of ['vanzare-umplere', 'fundal-umplere']) {
    harta.on('click', strat, laClick);
    harta.on('mousemove', strat, laHover);
    harta.on('mouseleave', strat, () => laHover({ features: [] } as never));
  }
}

function aplicaFiltru() {
  harta.setLayoutProperty('fundal-umplere', 'visibility', vizibil());
  harta.setLayoutProperty('fundal-contur', 'visibility', vizibil());
  harta.setFilter('etichete', doarVanzare ? (['get', 'vanzare'] as never) : (['all'] as never));
}

function schimbaFundal(nou: ModBasemap) {
  if (nou === mod) return;
  mod = nou;
  document.querySelector('.ecran')?.setAttribute('data-fundal', mod);
  document.querySelectorAll<HTMLButtonElement>('[data-basemap]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.basemap === mod));
  });
  void styleBasemap(mod).then((stil) => {
    harta.setStyle(stil);
    harta.once('styledata', () => {
      adaugaStraturi();
      aplicaFiltru();
    });
  });
}

function cauta(text: string) {
  const mesaj = el('cauta-mesaj');
  const t = text.trim().replace(/\s+/g, '');
  if (!t) return;
  const gasit = date.features.find((f) => f.properties.cad === t);
  if (!gasit) {
    if (mesaj) mesaj.textContent = `Nu există nr. cadastral ${t} în calup.`;
    return;
  }
  if (mesaj) mesaj.textContent = '';
  if (doarVanzare && !gasit.properties.vanzare) {
    doarVanzare = false;
    el<HTMLInputElement>('doar-vanzare')!.checked = false;
    aplicaFiltru();
  }
  selecteaza(gasit, true);
}

function completeazaPanou() {
  const vanzare = date.features.filter((f) => f.properties.vanzare);
  const total = vanzare.reduce((s, f) => s + f.properties.suprafata, 0);
  const pe = new Map<string, { n: number; s: number }>();
  for (const f of vanzare) {
    const c = pe.get(f.properties.categorie) ?? { n: 0, s: 0 };
    c.n++;
    c.s += f.properties.suprafata;
    pe.set(f.properties.categorie, c);
  }
  el('nr-vanzare')!.textContent = nf.format(vanzare.length);
  el('nr-total')!.textContent = nf.format(date.features.length);
  el('ha-vanzare')!.textContent = ha(total);
  el('pe-categorii')!.innerHTML = [...pe.entries()]
    .sort((a, b) => b[1].s - a[1].s)
    .map(
      ([c, v]) =>
        `<li><span>${CATEGORII[c] ?? c}</span><span class="cifre">${v.n} parcele · ${ha(v.s)}</span></li>`,
    )
    .join('');
}

function aratEroare(container: HTMLElement, titlu: string, detaliu: string) {
  const nod = document.createElement('div');
  nod.className = 'harta-eroare';
  nod.setAttribute('role', 'alert');
  const t = document.createElement('p');
  t.className = 'harta-eroare-titlu';
  t.textContent = titlu;
  const d = document.createElement('p');
  d.textContent = detaliu;
  nod.append(t, d);
  container.append(nod);
}

async function porneste() {
  const container = el('harta');
  if (!container) return;
  const slug = container.dataset.slug ?? 'calup4';
  date = await fetch(cale(`/date/${slug}.geojson`)).then((r) => r.json());
  completeazaPanou();

  // MapLibre desenează numai prin WebGL2. Când browserul îl are oprit (accelerarea
  // grafică dezactivată sau placa video blocată), harta ar rămâne un ecran gol,
  // fără nicio explicație. Mai bine spunem ce e de făcut.
  if (!document.createElement('canvas').getContext('webgl2')) {
    aratEroare(
      container,
      'Harta nu se poate afișa în acest browser.',
      'Are nevoie de accelerare grafică (WebGL). În Chrome: Setări, apoi Sistem, apoi pornește „Folosește accelerarea grafică când este disponibilă” și repornește browserul.',
    );
    return;
  }

  const vanzare = date.features.filter((f) => f.properties.vanzare);
  const incadrare = limite(vanzare.length ? vanzare : date.features);
  // Cu mișcare: pornim cu România încadrată pe ecran, ca omul să vadă unde e
  // satul în țară, și facem zoom pe calup. Fără mișcare: direct pe calup.
  // Globul întreg era prea departe: țara ocupa un colț din ecran.
  const intrare = !redusa();
  if (intrare) aparitie = 0;
  harta = new MapLibre({
    container,
    style: await styleBasemap(mod),
    bounds: intrare ? ROMANIA : incadrare,
    fitBoundsOptions: { padding: margini(intrare ? 24 : 40) },
    validateStyle: false,
    // Globul se vede abia sub zoom 5.
    minZoom: 1.5,
    maxZoom: 19,
    attributionControl: { compact: true },
    preserveDrawingBuffer: true,
    // Stilul vine din basemap.ts ca tip propriu; MapLibre îl acceptă la rulare.
  } as unknown as ConstructorParameters<typeof MapLibre>[0]);
  harta.addControl(new NavigationControl({ showCompass: false }), 'bottom-right');
  harta.addControl(new ScaleControl({ maxWidth: 110, unit: 'metric' }), 'bottom-left');

  // Dacă omul pune mâna pe hartă înainte de zbor, nu-i luăm camera.
  let atins = false;
  for (const ev of ['dragstart', 'wheel', 'touchstart'] as const) harta.once(ev, () => (atins = true));

  harta.on('load', () => {
    adaugaStraturi();
    legaInteractiuni();
    if (!intrare) return;
    window.setTimeout(() => {
      if (atins || selectat !== null) {
        aprindeParcele(0);
        return;
      }
      const tinta = harta.cameraForBounds(incadrare, { padding: margini(40) });
      if (tinta) {
        // Curba mică: de la nivel de țară până pe sat e un zoom-in continuu. Cu
        // una mare, camera s-ar ridica întâi și ar părea că pleacă de pe țară.
        harta.flyTo({ ...tinta, duration: 3400, curve: 1.2, essential: false });
      }
      aprindeParcele(2000);
    }, 400);
  });
  popup.on('close', () => {
    selectat = null;
    if (harta.getLayer('selectat')) harta.setFilter('selectat', ['==', ['id'], -1] as never);
  });

  document.querySelectorAll<HTMLButtonElement>('[data-basemap]').forEach((b) => {
    b.addEventListener('click', () => schimbaFundal(b.dataset.basemap as ModBasemap));
  });
  el<HTMLInputElement>('doar-vanzare')?.addEventListener('change', (e) => {
    doarVanzare = (e.target as HTMLInputElement).checked;
    aplicaFiltru();
  });
  el<HTMLFormElement>('cauta')?.addEventListener('submit', (e) => {
    e.preventDefault();
    cauta(el<HTMLInputElement>('cauta-cad')?.value ?? '');
  });
  el('arata-tot')?.addEventListener('click', () => {
    harta.fitBounds(limite(date.features), { padding: margini(40), duration: redusa() ? 0 : 1400 });
  });

  if (import.meta.env.DEV) (window as unknown as { harta: MapLibre }).harta = harta;
}

porneste().catch((err) => {
  console.error('[calup]', err);
  const container = el('harta');
  if (container) aratEroare(container, 'Harta nu a putut fi încărcată.', 'Reîncarcă pagina.');
});

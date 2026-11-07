/**
 * Transformă exportul KML din QGIS al unui calup de parcele cadastrale în
 * GeoJSON-ul pe care îl citește harta. Rulează cu:
 *
 *   npm run date -- "<cale spre fișier.kml>" [slug]
 *
 * Fișierul primit de la client conține și numele proprietarilor și actele de
 * posesie. Ele NU trec în GeoJSON: pagina e publică, iar pentru a arăta o
 * parcelă pe hartă ajung numărul cadastral, tarlaua, suprafața și categoria.
 * KML-ul sursă rămâne în afara repo-ului din același motiv.
 *
 * Coloana „Vichente” marchează cu „da” parcelele de vânzare. Ipoteza trebuie
 * confirmată cu clientul; până atunci restul sunt fundalul satului.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const AICI = dirname(fileURLToPath(import.meta.url));
const [sursa, slug = 'calup4'] = process.argv.slice(2);
if (!sursa) {
  console.error('Folosire: node scripts/kml-calup.mjs <fișier.kml> [slug]');
  process.exit(1);
}

const DEST = join(AICI, '..', 'public', 'date', `${slug}.geojson`);

const CATEGORII = new Set(['arabil', 'pasune', 'faneata', 'drum', 'curti', 'ape', 'padure', 'neproductiv']);

/** 6 zecimale înseamnă ~10 cm la latitudinea asta: sub precizia măsurătorii. */
const rotunjeste = (n) => Math.round(n * 1e6) / 1e6;

function camp(bloc, nume) {
  const m = bloc.match(new RegExp(`<SimpleData name="${nume.replace(/\./g, '\\.')}">([\\s\\S]*?)</SimpleData>`));
  return m ? m[1].trim() : null;
}

function inel(text) {
  return text
    .trim()
    .split(/\s+/)
    .map((p) => p.split(',').slice(0, 2).map(Number))
    .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y))
    .map(([x, y]) => [rotunjeste(x), rotunjeste(y)]);
}

function poligoane(bloc) {
  return [...bloc.matchAll(/<Polygon>([\s\S]*?)<\/Polygon>/g)].map(([, p]) => {
    const exterior = p.match(/<outerBoundaryIs>[\s\S]*?<coordinates>([\s\S]*?)<\/coordinates>/);
    const interioare = [...p.matchAll(/<innerBoundaryIs>[\s\S]*?<coordinates>([\s\S]*?)<\/coordinates>/g)];
    return [inel(exterior[1]), ...interioare.map(([, c]) => inel(c))];
  });
}

const kml = readFileSync(sursa, 'utf8');
const placemarks = [...kml.matchAll(/<Placemark>([\s\S]*?)<\/Placemark>/g)].map((m) => m[1]);

const features = [];
let fara = 0;
for (const p of placemarks) {
  const geo = poligoane(p);
  if (!geo.length || geo[0][0].length < 4) {
    fara++;
    continue;
  }
  const categorie = (camp(p, 'Categorie') || '').toLowerCase();
  features.push({
    type: 'Feature',
    id: Number(camp(p, 'Id')),
    properties: {
      cad: camp(p, 'LABEL'),
      parcela: camp(p, 'Parcela'),
      tarla: camp(p, 'Tarla'),
      suprafata: Math.round(Number(camp(p, 'Suprafata')) || 0),
      categorie: CATEGORII.has(categorie) ? categorie : 'altele',
      vanzare: camp(p, 'Vichente') === 'da',
    },
    geometry: geo.length === 1 ? { type: 'Polygon', coordinates: geo[0] } : { type: 'MultiPolygon', coordinates: geo },
  });
}

mkdirSync(dirname(DEST), { recursive: true });
writeFileSync(DEST, JSON.stringify({ type: 'FeatureCollection', features }));

const deVanzare = features.filter((f) => f.properties.vanzare).length;
console.log(`${features.length} parcele (${deVanzare} de vânzare) -> ${DEST}`);
if (fara) console.warn(`${fara} parcele fără geometrie validă, sărite`);

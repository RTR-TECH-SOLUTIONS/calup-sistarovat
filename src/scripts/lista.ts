/**
 * Filtrele și sortarea listei de parcele. Rândurile sunt deja în HTML; aici
 * doar le ascundem și le mutăm. Starea filtrelor stă în adresă, ca un link spre
 * „doar cele de vânzare, arabil” să se poată trimite pe WhatsApp.
 */
import { nrParcele } from '../lib/parcela';

type Stare = 'toate' | 'vanzare' | 'rest';
type Coloana = 'cad' | 't' | 'p' | 'c' | 's' | 'v';

interface Rand {
  tr: HTMLTableRowElement;
  cad: string;
  t: string;
  p: string;
  c: string;
  categorie: string;
  s: number;
  v: boolean;
  text: string;
}

const tabel = document.querySelector<HTMLTableElement>('#lista');
const corp = tabel?.tBodies[0];
const formular = document.querySelector<HTMLFormElement>('#filtre');

if (tabel && corp && formular) {
  const camp = formular.querySelector<HTMLInputElement>('#filtru-text')!;
  const selectCategorie = formular.querySelector<HTMLSelectElement>('#filtru-categorie')!;
  const rezultat = document.querySelector<HTMLElement>('#rezultat')!;
  const gol = document.querySelector<HTMLElement>('#gol')!;

  // Celulele goale au „–”; la sortare le vrem la coadă, nu în față.
  const valoare = (td: HTMLTableCellElement) => {
    const t = td.textContent?.trim() ?? '';
    return t === '–' ? '' : t;
  };

  const randuri: Rand[] = [...corp.rows].map((tr) => {
    const cad = tr.cells[0].querySelector('a')?.textContent?.trim() ?? '';
    const t = valoare(tr.cells[1]);
    const p = valoare(tr.cells[2]);
    return {
      tr,
      cad,
      t,
      p,
      c: valoare(tr.cells[3]),
      categorie: tr.dataset.c ?? '',
      s: Number(tr.dataset.s),
      v: tr.dataset.v === '1',
      text: `${cad} ${t} ${p}`.toLowerCase(),
    };
  });

  const colator = new Intl.Collator('ro', { numeric: true, sensitivity: 'base' });
  let sortare: { col: Coloana; dir: 1 | -1 } = { col: 'v', dir: 1 };

  function compara(a: Rand, b: Rand) {
    const { col, dir } = sortare;
    let d: number;
    if (col === 's') d = a.s - b.s;
    else if (col === 'v') d = Number(b.v) - Number(a.v);
    else {
      const x = a[col];
      const y = b[col];
      if (!x !== !y) return x ? -1 : 1;
      d = colator.compare(x, y);
    }
    return d * dir || colator.compare(a.cad, b.cad);
  }

  function ordoneaza() {
    const frag = document.createDocumentFragment();
    for (const r of [...randuri].sort(compara)) frag.append(r.tr);
    corp!.append(frag);
    tabel!.querySelectorAll<HTMLTableCellElement>('th').forEach((th) => {
      const col = th.querySelector('button')?.dataset.col;
      th.setAttribute('aria-sort', col === sortare.col ? (sortare.dir === 1 ? 'ascending' : 'descending') : 'none');
    });
  }

  function filtreaza() {
    const date = new FormData(formular!);
    const stare = (date.get('stare') as Stare) ?? 'toate';
    const categorie = String(date.get('categorie') ?? '');
    const q = String(date.get('q') ?? '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');

    let n = 0;
    for (const r of randuri) {
      const ok =
        (stare === 'toate' || (stare === 'vanzare') === r.v) &&
        (!categorie || r.categorie === categorie) &&
        (!q || r.text.includes(q));
      r.tr.hidden = !ok;
      if (ok) n++;
    }

    rezultat.textContent = n === randuri.length ? nrParcele(n) : `${nrParcele(n)} din ${randuri.length.toLocaleString('ro-RO')}`;
    gol.hidden = n > 0;
    tabel!.hidden = n === 0;

    const url = new URL(location.href);
    for (const [cheie, val, implicit] of [
      ['stare', stare, 'toate'],
      ['categorie', categorie, ''],
      ['q', q, ''],
    ] as const) {
      if (val && val !== implicit) url.searchParams.set(cheie, val);
      else url.searchParams.delete(cheie);
    }
    history.replaceState(null, '', url);
  }

  // Filtrele din adresă, dacă pagina a fost deschisă dintr-un link.
  const din = new URLSearchParams(location.search);
  const stareInitiala = din.get('stare');
  if (stareInitiala) {
    const radio = formular.querySelector<HTMLInputElement>(`input[name="stare"][value="${CSS.escape(stareInitiala)}"]`);
    if (radio) radio.checked = true;
  }
  if (din.get('categorie')) selectCategorie.value = din.get('categorie')!;
  if (din.get('q')) camp.value = din.get('q')!;
  if ([...din.keys()].length) filtreaza();

  formular.addEventListener('input', filtreaza);
  formular.addEventListener('submit', (e) => e.preventDefault());

  document.querySelector('#sterge-filtre')?.addEventListener('click', () => {
    formular.reset();
    filtreaza();
    camp.focus();
  });

  tabel.querySelector('thead')?.addEventListener('click', (e) => {
    const buton = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-col]');
    if (!buton) return;
    const col = buton.dataset.col as Coloana;
    // Suprafața o vrei de obicei de la cea mai mare; restul, alfabetic.
    sortare = col === sortare.col ? { col, dir: sortare.dir === 1 ? -1 : 1 } : { col, dir: col === 's' ? -1 : 1 };
    ordoneaza();
  });

  // Tot rândul duce pe hartă, nu doar numărul. Fără să strice selecția de text.
  corp.addEventListener('click', (e) => {
    const tinta = e.target as HTMLElement;
    if (tinta.closest('a') || String(getSelection() ?? '').length) return;
    tinta.closest('tr')?.querySelector('a')?.click();
  });

  // Capul tabelului stă lipit sub bara de filtre, oricât de înaltă e ea.
  const bara = document.querySelector<HTMLElement>('#bara');
  if (bara) {
    const masoara = () => {
      const lipita = getComputedStyle(bara).position === 'sticky';
      document.documentElement.style.setProperty('--bara-h', `${lipita ? bara.offsetHeight : 0}px`);
    };
    new ResizeObserver(masoara).observe(bara);
    masoara();
  }
}

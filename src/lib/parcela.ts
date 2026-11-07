/**
 * Ce știm despre o parcelă și cum o scriem pe ecran. Folosit și de hartă, în
 * browser, și de paginile randate la build, deci fără nimic din Node aici.
 */

export interface ProprietatiParcela {
  cad: string;
  /** Lipsesc la o parte din parcele în exportul QGIS. */
  parcela: string | null;
  tarla: string | null;
  suprafata: number;
  categorie: string;
  vanzare: boolean;
}

export type Colectie = GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon, ProprietatiParcela>;

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

export const numeCategorie = (c: string) => CATEGORII[c] ?? c;

/** Tarla și parcela sunt tastate de mână în QGIS: uneori lipsesc, o dată au și un rând nou în ele. */
export const curata = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();

/** „T11 / P172/14”. Tarlalele scrise ca „LOT 33” rămân cum sunt. */
export function tarlaParcela(p: Pick<ProprietatiParcela, 'tarla' | 'parcela'>) {
  const t = curata(p.tarla);
  const pc = curata(p.parcela);
  return [t && (/^\d/.test(t) ? `T${t}` : t), pc && `P${pc}`].filter(Boolean).join(' / ') || '–';
}

export const nf = new Intl.NumberFormat('ro-RO');
const nfHa = new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 2 });
export const mp = (n: number) => `${nf.format(n)} m²`;
export const ha = (n: number) => `${nfHa.format(n / 10000)} ha`;

/**
 * Româna cere „de” după numerele care se termină în 20–99 sau în 00:
 * „213 parcele”, dar „61 de parcele” și „2.321 de parcele”.
 */
export function nrParcele(n: number) {
  if (n === 1) return '1 parcelă';
  const r = n % 100;
  return `${nf.format(n)}${(r === 0 && n > 0) || r >= 20 ? ' de' : ''} parcele`;
}

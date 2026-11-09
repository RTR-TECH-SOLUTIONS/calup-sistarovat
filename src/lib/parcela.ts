/**
 * Ce știm despre o parcelă și cum o scriem pe ecran. Folosit și de hartă, în
 * browser, și de paginile randate la build, deci fără nimic din Node aici.
 */
import { LOCALE, type Limba } from '../i18n/limbi';

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

/**
 * Denumirile categoriilor de folosință. În română cum le scrie un notar; în
 * germană termenii din cadastrul german (Unland, Hof- und Gebäudefläche).
 */
const CATEGORII: Record<Limba, Record<string, string>> = {
  ro: {
    arabil: 'Arabil',
    pasune: 'Pășune',
    faneata: 'Fâneață',
    drum: 'Drum',
    curti: 'Curți construcții',
    ape: 'Ape',
    padure: 'Pădure',
    neproductiv: 'Neproductiv',
    altele: 'Altele',
  },
  en: {
    arabil: 'Arable land',
    pasune: 'Pasture',
    faneata: 'Hayfield',
    drum: 'Road',
    curti: 'Built-up yard',
    ape: 'Water',
    padure: 'Forest',
    neproductiv: 'Unproductive land',
    altele: 'Other',
  },
  de: {
    arabil: 'Ackerland',
    pasune: 'Weide',
    faneata: 'Wiese',
    drum: 'Weg',
    curti: 'Hof- und Gebäudefläche',
    ape: 'Gewässer',
    padure: 'Wald',
    neproductiv: 'Unland',
    altele: 'Sonstige',
  },
};

/** Tarla și parcela sunt tastate de mână în QGIS: uneori lipsesc, o dată au și un rând nou în ele. */
export const curata = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();

/** „T11 / P172/14”. Tarlalele scrise ca „LOT 33” rămân cum sunt. */
export function tarlaParcela(p: Pick<ProprietatiParcela, 'tarla' | 'parcela'>) {
  const t = curata(p.tarla);
  const pc = curata(p.parcela);
  return [t && (/^\d/.test(t) ? `T${t}` : t), pc && `P${pc}`].filter(Boolean).join(' / ') || '–';
}

/**
 * Numere, suprafețe și numărul de parcele, în formatul fiecărei limbi:
 * 2.321 și 104,23 ha în română și germană, 2,321 și 104.23 ha în engleză.
 */
export function formatare(limba: Limba) {
  const nf = new Intl.NumberFormat(LOCALE[limba]);
  const nfHa = new Intl.NumberFormat(LOCALE[limba], { maximumFractionDigits: 2 });
  return {
    nr: (n: number) => nf.format(n),
    mp: (n: number) => `${nf.format(n)} m²`,
    ha: (n: number) => `${nfHa.format(n / 10000)} ha`,
    categorie: (c: string) => CATEGORII[limba][c] ?? c,
    parcele: (n: number) => PARCELE[limba](n, nf.format(n)),
  };
}

export type Formatare = ReturnType<typeof formatare>;

const PARCELE: Record<Limba, (n: number, scris: string) => string> = {
  /**
   * Româna cere „de” după numerele care se termină în 20–99 sau în 00:
   * „213 parcele”, dar „61 de parcele” și „2.321 de parcele”.
   */
  ro: (n, scris) => {
    if (n === 1) return '1 parcelă';
    const r = n % 100;
    return `${scris}${(r === 0 && n > 0) || r >= 20 ? ' de' : ''} parcele`;
  },
  en: (n, scris) => (n === 1 ? '1 parcel' : `${scris} parcels`),
  de: (n, scris) => (n === 1 ? '1 Flurstück' : `${scris} Flurstücke`),
};

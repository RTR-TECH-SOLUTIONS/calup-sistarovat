/**
 * Cifrele despre calup pe care le citează paginile cu text (despre noi, FAQ),
 * calculate la build din aceleași date ca harta. Așa nu rămâne nicăieri o
 * cifră scrisă de mână care să nu se mai potrivească.
 */
import { citesteCalup } from './date';
import { formatare } from './parcela';
import type { Limba } from '../i18n/limbi';

/** „a, b și c”. Virgula zecimală strică orice înlocuire cu regex, deci ultimul element se lipește separat. */
export const enumerare = (l: string[], si: string) =>
  l.length > 1 ? `${l.slice(0, -1).join(', ')} ${si} ${l.at(-1)}` : (l[0] ?? '');

export interface Statistici {
  /** „2.321 de parcele” */
  total: string;
  /** „213 parcele” */
  vanzare: string;
  haVanzare: string;
  min: string;
  max: string;
  /** „50,21 ha teren arabil”, de la cea mai mare suprafață în jos. */
  categorii: string[];
}

export function statistici(limba: Limba, categoriiMici: boolean): Statistici {
  const fmt = formatare(limba);
  const parcele = citesteCalup('calup4').features.map((f) => f.properties);
  const vanzare = parcele.filter((p) => p.vanzare);
  const suprafete = vanzare.map((p) => p.suprafata);
  const suma = (l: number[]) => l.reduce((s, x) => s + x, 0);

  const categorii = [...Map.groupBy(vanzare, (p) => p.categorie)]
    .map(([c, lista]) => ({ nume: fmt.categorie(c), s: suma(lista.map((p) => p.suprafata)) }))
    .sort((a, b) => b.s - a.s)
    .map((c) => `${fmt.ha(c.s)} ${categoriiMici ? c.nume.toLowerCase() : c.nume}`);

  const marime = (mp: number) => (mp >= 10_000 ? fmt.ha(mp) : fmt.mp(mp));

  return {
    total: fmt.parcele(parcele.length),
    vanzare: fmt.parcele(vanzare.length),
    haVanzare: fmt.ha(suma(suprafete)),
    min: marime(Math.min(...suprafete)),
    max: marime(Math.max(...suprafete)),
    categorii,
  };
}

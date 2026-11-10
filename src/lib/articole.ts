/**
 * Articolele unei limbi, adresa fiecăruia și traducerile lui. Un articol din
 * ro/ și unul din de/ cu același nume de fișier (sau aceeași `cheie`) sunt
 * același text în două limbi: comutatorul de limbă trece de la unul la altul.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALE, RUTE, type Limba } from '../i18n/limbi';
import { cale } from './cale';

export type Articol = CollectionEntry<'articole'>;

const limbaArticol = (a: Articol) => a.id.split('/')[0] as Limba;
const adresa = (a: Articol) => a.id.split('/').slice(1).join('/');
const cheie = (a: Articol) => a.data.cheie ?? adresa(a);

export const linkArticol = (a: Articol) => cale(`${RUTE.articole[limbaArticol(a)]}${adresa(a)}/`);

/** Articolele dintr-o limbă, cele mai noi primele. */
export async function articole(limba: Limba) {
  const toate = await getCollection('articole');
  return toate
    .filter((a) => limbaArticol(a) === limba)
    .sort((a, b) => b.data.data.valueOf() - a.data.data.valueOf());
}

/** Pentru getStaticPaths: o pagină pentru fiecare articol din limbă. */
export async function caiArticole(limba: Limba) {
  return (await articole(limba)).map((articol) => ({ params: { slug: adresa(articol) }, props: { articol } }));
}

/** Adresa articolului în fiecare limbă în care există. */
export async function traduceri(a: Articol): Promise<Partial<Record<Limba, string>>> {
  const toate = await getCollection('articole');
  return Object.fromEntries(toate.filter((x) => cheie(x) === cheie(a)).map((x) => [limbaArticol(x), linkArticol(x)]));
}

export const dataArticol = (limba: Limba, d: Date) =>
  new Intl.DateTimeFormat(LOCALE[limba], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);

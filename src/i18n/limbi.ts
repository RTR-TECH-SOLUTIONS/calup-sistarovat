/**
 * Limbile site-ului și adresa fiecărei pagini în fiecare limbă. Româna stă în
 * rădăcină, ca linkurile deja trimise clientului (/parcele/?stare=vanzare) să
 * meargă mai departe. Engleza și germana au adrese traduse, sub /en/ și /de/.
 *
 * Fișierele din src/pages/ trebuie să stea exact la adresele de aici.
 */
import { cale } from '../lib/cale';

export const LIMBI = ['ro', 'en', 'de'] as const;
export type Limba = (typeof LIMBI)[number];

export const LOCALE: Record<Limba, string> = { ro: 'ro-RO', en: 'en-GB', de: 'de-DE' };

export const NUME_LIMBA: Record<Limba, string> = { ro: 'Română', en: 'English', de: 'Deutsch' };

/** Ordinea din comutatorul de limbi, cum a cerut-o clientul: DE EN RO. */
export const ORDINE_LIMBI: readonly Limba[] = ['de', 'en', 'ro'];

export type Pagina =
  | 'despre'
  | 'harta'
  | 'parcele'
  | 'zona'
  | 'articole'
  | 'faq'
  | 'contact'
  | 'confidentialitate'
  | 'termeni'
  | 'cookies';

export const RUTE: Record<Pagina, Record<Limba, string>> = {
  despre: { ro: '/despre-noi/', en: '/en/about/', de: '/de/ueber-uns/' },
  harta: { ro: '/', en: '/en/', de: '/de/' },
  parcele: { ro: '/parcele/', en: '/en/parcels/', de: '/de/flurstuecke/' },
  zona: { ro: '/zona/', en: '/en/area/', de: '/de/gegend/' },
  articole: { ro: '/articole/', en: '/en/articles/', de: '/de/artikel/' },
  faq: { ro: '/intrebari-frecvente/', en: '/en/faq/', de: '/de/faq/' },
  contact: { ro: '/contact/', en: '/en/contact/', de: '/de/kontakt/' },
  confidentialitate: { ro: '/confidentialitate/', en: '/en/privacy/', de: '/de/datenschutz/' },
  termeni: { ro: '/termeni/', en: '/en/terms/', de: '/de/nutzungsbedingungen/' },
  cookies: { ro: '/cookies/', en: '/en/cookies/', de: '/de/cookies/' },
};

/** Adresa unei pagini într-o limbă, cu baza de preview inclusă. */
export const ruta = (pagina: Pagina, limba: Limba) => cale(RUTE[pagina][limba]);

/** Limba paginii curente, citită în browser din <html lang>. */
export function limbaDocument(): Limba {
  const l = document.documentElement.lang as Limba;
  return LIMBI.includes(l) ? l : 'ro';
}

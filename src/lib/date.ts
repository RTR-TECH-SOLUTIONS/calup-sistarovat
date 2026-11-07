/**
 * Citește parcelele la build, pentru paginile care le scriu direct în HTML
 * (lista, cifrele de pe pagina zonei). Harta le ia separat, cu fetch.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Colectie } from './parcela';

export function citesteCalup(slug = 'calup4'): Colectie {
  return JSON.parse(readFileSync(join(process.cwd(), 'public/date', `${slug}.geojson`), 'utf8'));
}

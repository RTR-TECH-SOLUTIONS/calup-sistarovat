/**
 * Prețurile de pornire, așa cum le-a dat clientul pe 9 noiembrie 2026. Apar pe
 * pagina „Despre noi” și în întrebările frecvente; de schimbat doar aici.
 */
import { LOCALE, type Limba } from '../i18n/limbi';

export const OFERTA = {
  /** Vânzare, € pe metru pătrat. */
  vanzare: 1,
  /** Concesiune, € pe metru pătrat pe an. */
  concesiune: 0.06,
};

/** „1 €”, „0,06 €”, „€0.06”: forma obișnuită în fiecare limbă. */
export function euro(limba: Limba, valoare: number) {
  return new Intl.NumberFormat(LOCALE[limba], {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: Number.isInteger(valoare) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(valoare);
}

/** Cât iese pentru un hectar, la prețul de pornire. Rotunjit, ca 0,06 × 10.000 să nu dea 599,9999. */
export const peHectar = (pretMp: number) => Math.round(pretMp * 10_000 * 100) / 100;

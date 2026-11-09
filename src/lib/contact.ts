/**
 * Datele vânzătorului, într-un singur loc. Apar pe pagina de contact și în
 * paginile legale, unde vânzătorul e operatorul datelor.
 *
 * Ce e încă `null` apare pe site marcat „de completat”, ca să se vadă ce
 * lipsește până la lansare. Build-ul le listează în consolă.
 */
export const CONTACT = {
  /** Numele vânzătorului sau al firmei prin care vinde. */
  nume: 'Popescu Ion' as string | null,
  /** CUI și nr. de înregistrare, doar dacă vinde printr-o firmă. Altfel rămâne null și nu apare. */
  firma: null as string | null,
  adresa: null as string | null,
  email: 'x@x' as string | null,
  telefon: '+40 742 314 574',
};

export const telefonLink = `tel:${CONTACT.telefon.replace(/[^\d+]/g, '')}`;

/** Link wa.me, cu mesajul gata scris dacă îl dăm. */
export function whatsapp(text?: string) {
  const nr = CONTACT.telefon.replace(/\D/g, '');
  return `https://wa.me/${nr}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

// Adresa și firma sunt opționale: când lipsesc, pur și simplu nu apar.
const lipsa = (['nume', 'email'] as const).filter((k) => !CONTACT[k]);
if (lipsa.length && typeof window === 'undefined') {
  console.warn(`[contact] De completat în src/lib/contact.ts: ${lipsa.join(', ')}`);
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/**
 * Valoarea ca HTML, sau un marcaj vizibil „de completat: …” când lipsește.
 * Folosit în textele legale, care se randează cu set:html.
 */
export function camp(valoare: string | null, prefix: string, eticheta: string) {
  return valoare ? escape(valoare) : `<mark class="de-completat">${escape(prefix)}: ${escape(eticheta)}</mark>`;
}

/**
 * Datele vânzătorului, într-un singur loc. Apar pe pagina de contact, în
 * întrebările frecvente și în paginile legale, unde vânzătorul e operatorul datelor.
 *
 * Ce e încă `null` apare pe site marcat „de completat”, ca să se vadă ce
 * lipsește până la lansare. Build-ul le listează în consolă.
 */
export const CONTACT = {
  /**
   * Numele vânzătorului sau al firmei prin care vinde. „George” l-a cerut clientul
   * pe 10 nov. Pentru paginile legale ar trebui numele complet al operatorului.
   */
  nume: 'George' as string | null,
  /** CUI și nr. de înregistrare, doar dacă vinde printr-o firmă. Altfel rămâne null și nu apare. */
  firma: null as string | null,
  adresa: null as string | null,
  email: 'badoiu_george@yahoo.de' as string | null,
  /** Numărul de pe care scrie clientul. Pe el e și WhatsApp-ul. */
  telefon: '+40 742 314 574',
  /** Numărul din Germania, cerut de client pentru apeluri. */
  telefonDe: '+49 160 92387165',
};

const tel = (nr: string) => `tel:${nr.replace(/[^\d+]/g, '')}`;
export const telefonLink = tel(CONTACT.telefon);
export const telefonDeLink = tel(CONTACT.telefonDe);

/** Link wa.me, cu mesajul gata scris dacă îl dăm. */
export function whatsapp(text?: string) {
  const nr = CONTACT.telefon.replace(/\D/g, '');
  return `https://wa.me/${nr}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

/** Link mailto, cu subiect și text gata scrise dacă le dăm. */
export function mailto(subiect?: string, text?: string) {
  const q = [subiect && `subject=${encodeURIComponent(subiect)}`, text && `body=${encodeURIComponent(text)}`]
    .filter(Boolean)
    .join('&');
  return CONTACT.email ? `mailto:${CONTACT.email}${q ? `?${q}` : ''}` : null;
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

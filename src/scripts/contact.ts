/**
 * Formularul de contact compune mesajul și deschide WhatsApp. Nu trimite și nu
 * păstrează nimic: e doar un mod comod de a scrie primul mesaj.
 */
import { limbaDocument } from '../i18n/limbi';
import { TEXT } from '../i18n/text';

const form = document.querySelector<HTMLFormElement>('#form-wa');

if (form) {
  const t = TEXT[limbaDocument()].contact;
  const camp = (nume: string) => form.elements.namedItem(nume) as HTMLInputElement | HTMLTextAreaElement;

  // Din fișa parcelei de pe hartă se ajunge aici cu ?cad=…
  const cad = new URLSearchParams(location.search).get('cad');
  if (cad) camp('cad').value = cad;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nume = camp('nume').value.trim();
    const nr = camp('cad').value.trim().replace(/\s+/g, '');
    const mesaj = camp('mesaj').value.trim();

    const text = [`${t.salut}\n${nr ? t.despreParcela(nr) : t.despreSite}`, mesaj, nume].filter(Boolean).join('\n\n');
    window.open(`${form.dataset.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
}

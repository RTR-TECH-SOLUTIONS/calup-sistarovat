/**
 * Formularul de contact compune mesajul și îl deschide în WhatsApp sau în
 * programul de email, după butonul apăsat. Nu trimite și nu păstrează nimic:
 * e doar un mod comod de a scrie primul mesaj. Tot aici, butonul care copiază
 * adresa de email.
 */
import { limbaDocument } from '../i18n/limbi';
import { TEXT } from '../i18n/text';

const t = TEXT[limbaDocument()].contact;
const form = document.querySelector<HTMLFormElement>('#form-mesaj');

if (form) {
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

    const canal = (e.submitter as HTMLButtonElement | null)?.value;
    if (canal === 'email' && form.dataset.email) {
      const q = `subject=${encodeURIComponent(t.subiect(nr))}&body=${encodeURIComponent(text)}`;
      location.href = `${form.dataset.email}?${q}`;
    } else {
      window.open(`${form.dataset.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    }
  });
}

// Pe telefon, mailto: nu deschide nimic dacă omul n-are aplicație de email;
// adresa copiată merge lipită oriunde.
document.querySelectorAll<HTMLButtonElement>('[data-copiaza]').forEach((buton) => {
  const eticheta = buton.querySelector('span');
  buton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(buton.dataset.copiaza!);
    } catch {
      return;
    }
    if (!eticheta) return;
    eticheta.textContent = t.copiat;
    setTimeout(() => (eticheta.textContent = t.copiaza), 1800);
  });
});

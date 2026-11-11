/**
 * Paginile legale: confidențialitate (GDPR), termeni și cookies, în trei limbi.
 *
 * Ce scrie aici trebuie să rămână adevărat despre site: fără cookie-uri, fără
 * analytics, fonturi servite de pe site, harta de la Mapbox, articolele de la
 * Soro (trysoro.com), formularul de
 * contact care doar deschide WhatsApp. Dacă se schimbă ceva din astea, se
 * schimbă și textul.
 *
 * Datele vânzătorului vin din src/lib/contact.ts; ce lipsește apare marcat.
 * Textele sunt HTML scris de noi, randat cu set:html.
 */
import { CONTACT, camp, telefonDeLink, telefonLink, whatsapp } from '../lib/contact';
import { ruta, type Limba } from './limbi';
import { MARCA, TEXT } from './text';

export type PaginaLegala = 'confidentialitate' | 'termeni' | 'cookies';

export interface DocLegal {
  titlu: string;
  descriere: string;
  actualizat: string;
  intro?: string;
  sectiuni: { titlu: string; html: string }[];
}

const p = (...x: string[]) => x.map((t) => `<p>${t}</p>`).join('');
const ul = (...x: string[]) => `<ul>${x.map((t) => `<li>${t}</li>`).join('')}</ul>`;
const a = (href: string, text: string) =>
  `<a href="${href}"${href.startsWith('http') ? ' rel="noopener"' : ''}>${text}</a>`;

const SAU: Record<Limba, string> = { ro: 'sau', en: 'or', de: 'oder' };

/** Datele care se repetă, în forma fiecărei limbi. */
function date(l: Limba) {
  const t = TEXT[l];
  const nume = camp(CONTACT.nume, t.deCompletat, t.contact.lipsaNume);
  const extra = [CONTACT.firma, CONTACT.adresa].filter(Boolean).map((x) => camp(x, '', ''));
  const email = CONTACT.email
    ? a(`mailto:${CONTACT.email}`, camp(CONTACT.email, '', ''))
    : camp(null, t.deCompletat, t.contact.lipsaEmail);
  return {
    vanzator: [nume, ...extra].join(', '),
    // Două numere: cel din România (și pe WhatsApp) și cel din Germania.
    telefon: `${a(telefonLink, CONTACT.telefon)} ${SAU[l]} ${a(telefonDeLink, CONTACT.telefonDe)}`,
    whatsapp: a(whatsapp(), 'WhatsApp'),
    email,
    cookies: ruta('cookies', l),
    confidentialitate: ruta('confidentialitate', l),
    contact: ruta('contact', l),
  };
}

const ANSPDCP = a('https://www.dataprotection.ro', 'www.dataprotection.ro');

function confidentialitate(l: Limba): DocLegal {
  const d = date(l);
  if (l === 'en')
    return {
      titlu: 'Privacy policy',
      descriere: `How personal data is handled on the ${MARCA} website.`,
      actualizat: 'Last updated: 11 November 2026',
      intro:
        'In short: this website uses no cookies and does not track visitors. We only receive personal data when you contact us, on WhatsApp, by phone or by email.',
      sectiuni: [
        {
          titlu: 'Who is responsible for your data',
          html: p(
            `The controller is ${d.vanzator}, the seller of the parcels shown on this website. You can reach us by phone at ${d.telefon}, on ${d.whatsapp} or by email at ${d.email}.`,
          ),
        },
        {
          titlu: 'What data we process',
          html:
            ul(
              '<strong>When you contact us.</strong> Your name, your phone number or email address and what you write to us, including the cadastral numbers you ask about.',
              '<strong>The form on the contact page.</strong> It sends nothing to this website. It opens WhatsApp with the message filled in, and you decide whether to send it. Nothing you type in the form is stored on the website.',
              '<strong>Technical data.</strong> As with any website, the server hosting it and the map provider receive your device’s IP address and the usual details of a web request: browser, page requested, time. Without them the page and the map could not be displayed.',
            ) +
            p(
              `We do not use cookies, traffic analytics or advertising tools. Details in the ${a(d.cookies, 'cookie policy')}.`,
            ),
        },
        {
          titlu: 'Why, and on what legal basis',
          html: ul(
            'To answer you and to discuss a parcel or a sale: Art. 6(1)(b) of Regulation (EU) 2016/679 (GDPR), steps taken at your request before a possible contract.',
            'To make the website and the map work and keep them secure: Art. 6(1)(f) GDPR, our legitimate interest in displaying the website.',
            'If a sale goes ahead, the data needed for the documents is processed because the law requires it: Art. 6(1)(c) GDPR.',
          ),
        },
        {
          titlu: 'Who receives the data',
          html:
            ul(
              'the company hosting the website;',
              'Mapbox, Inc. (USA), which delivers the map and the satellite imagery;',
              'Soro (trysoro.com), which delivers the articles on the Articles page, with their images;',
              'WhatsApp (Meta), if you choose to write to us on WhatsApp; the WhatsApp privacy policy also applies to those messages;',
              'our email provider, if you write to us by email;',
              'the notary and the authorities, if a sale goes ahead, as far as the law requires.',
            ) + p('We do not sell or rent your data to anyone.'),
        },
        {
          titlu: 'Transfers outside the European Union',
          html: p(
            'Mapbox is based in the USA, Soro delivers the articles from servers in the USA, and Meta, the company behind WhatsApp, also processes data in the USA. These transfers take place under Chapter V of the GDPR, for example on the basis of the EU–US Data Privacy Framework or the standard contractual clauses approved by the European Commission.',
          ),
        },
        {
          titlu: 'How long we keep the data',
          html: p(
            'We keep messages while we are discussing a parcel. If no sale follows, we delete them once they are no longer needed, or earlier if you ask us to. If a sale goes ahead, the documents are kept for as long as the law requires. The hosting provider keeps technical server logs for a short period, for security.',
          ),
        },
        {
          titlu: 'Your rights',
          html: p(
            'You have the right to find out what data we hold about you and to receive a copy, to have it corrected, to ask for it to be erased, to restrict its processing, to receive it in a portable format, and to object to processing based on legitimate interest. To exercise any of these, write to us or call us using the details above. We reply within one month.',
            `If you believe your data is not being handled correctly, you can lodge a complaint with the Romanian data protection authority, ANSPDCP (${ANSPDCP}), or with the data protection authority in the country where you live.`,
          ),
        },
        {
          titlu: 'Changes',
          html: p('If we change the way we process data, we will update this page and the date above.'),
        },
      ],
    };

  if (l === 'de')
    return {
      titlu: 'Datenschutzerklärung',
      descriere: `Wie auf der Website ${MARCA} mit personenbezogenen Daten umgegangen wird.`,
      actualizat: 'Zuletzt aktualisiert: 11. November 2026',
      intro:
        'Kurz gesagt: Diese Website verwendet keine Cookies und verfolgt keine Besucher. Personenbezogene Daten erhalten wir nur, wenn Sie uns kontaktieren, per WhatsApp, Telefon oder E-Mail.',
      sectiuni: [
        {
          titlu: 'Verantwortlicher',
          html: p(
            `Verantwortlich ist ${d.vanzator}, der Verkäufer der auf dieser Website gezeigten Flurstücke. Sie erreichen uns telefonisch unter ${d.telefon}, per ${d.whatsapp} oder per E-Mail unter ${d.email}.`,
          ),
        },
        {
          titlu: 'Welche Daten wir verarbeiten',
          html:
            ul(
              '<strong>Wenn Sie uns kontaktieren.</strong> Ihren Namen, Ihre Telefonnummer oder E-Mail-Adresse und den Inhalt Ihrer Nachricht, einschließlich der Katasternummern, nach denen Sie fragen.',
              '<strong>Das Formular auf der Kontaktseite.</strong> Es sendet nichts an diese Website. Es öffnet WhatsApp mit der ausgefüllten Nachricht, und Sie entscheiden, ob Sie sie absenden. Was Sie in das Formular eingeben, wird auf der Website nicht gespeichert.',
              '<strong>Technische Daten.</strong> Wie bei jeder Website erhalten der Server, auf dem sie liegt, und der Kartenanbieter die IP-Adresse Ihres Geräts und die üblichen Angaben einer Webanfrage: Browser, aufgerufene Seite, Uhrzeit. Ohne sie könnten Seite und Karte nicht angezeigt werden.',
            ) +
            p(
              `Wir verwenden keine Cookies, keine Webanalyse und keine Werbewerkzeuge. Einzelheiten in den ${a(d.cookies, 'Hinweisen zu Cookies')}.`,
            ),
        },
        {
          titlu: 'Zwecke und Rechtsgrundlagen',
          html: ul(
            'Um Ihnen zu antworten und über ein Flurstück oder einen Verkauf zu sprechen: Art. 6 Abs. 1 lit. b der Verordnung (EU) 2016/679 (DSGVO), vorvertragliche Maßnahmen auf Ihre Anfrage.',
            'Damit Website und Karte funktionieren und sicher sind: Art. 6 Abs. 1 lit. f DSGVO, unser berechtigtes Interesse an der Bereitstellung der Website.',
            'Kommt es zu einem Verkauf, werden die für die Urkunden nötigen Daten verarbeitet, weil das Gesetz es verlangt: Art. 6 Abs. 1 lit. c DSGVO.',
          ),
        },
        {
          titlu: 'Empfänger',
          html:
            ul(
              'das Unternehmen, das die Website hostet;',
              'Mapbox, Inc. (USA), das die Karte und die Satellitenbilder liefert;',
              'Soro (trysoro.com), das die Artikel auf der Seite Artikel samt Bildern liefert;',
              'WhatsApp (Meta), wenn Sie uns per WhatsApp schreiben; für diese Nachrichten gilt zusätzlich die Datenschutzrichtlinie von WhatsApp;',
              'unser E-Mail-Anbieter, wenn Sie uns eine E-Mail schreiben;',
              'der Notar und die Behörden, wenn es zu einem Verkauf kommt, soweit das Gesetz es verlangt.',
            ) + p('Wir verkaufen oder vermieten Ihre Daten an niemanden.'),
        },
        {
          titlu: 'Übermittlung in Länder außerhalb der EU',
          html: p(
            'Mapbox hat seinen Sitz in den USA, Soro liefert die Artikel von Servern in den USA, und Meta, das Unternehmen hinter WhatsApp, verarbeitet Daten ebenfalls in den USA. Diese Übermittlungen erfolgen nach Kapitel V der DSGVO, zum Beispiel auf Grundlage des EU-US-Datenschutzrahmens oder der von der Europäischen Kommission genehmigten Standardvertragsklauseln.',
          ),
        },
        {
          titlu: 'Speicherdauer',
          html: p(
            'Nachrichten bewahren wir auf, solange wir über ein Flurstück sprechen. Kommt kein Verkauf zustande, löschen wir sie, sobald sie nicht mehr benötigt werden, oder früher, wenn Sie uns darum bitten. Kommt es zu einem Verkauf, werden die Unterlagen so lange aufbewahrt, wie es das Gesetz vorschreibt. Technische Server-Protokolle speichert der Hosting-Anbieter für kurze Zeit, aus Sicherheitsgründen.',
          ),
        },
        {
          titlu: 'Ihre Rechte',
          html: p(
            'Sie haben das Recht auf Auskunft über die bei uns gespeicherten Daten und auf eine Kopie, auf Berichtigung, auf Löschung, auf Einschränkung der Verarbeitung, auf Datenübertragbarkeit und auf Widerspruch gegen eine Verarbeitung aufgrund berechtigter Interessen. Schreiben Sie uns oder rufen Sie uns dazu unter den oben genannten Kontaktdaten an. Wir antworten innerhalb eines Monats.',
            `Wenn Sie der Meinung sind, dass Ihre Daten nicht korrekt verarbeitet werden, können Sie sich bei der rumänischen Datenschutzbehörde ANSPDCP (${ANSPDCP}) oder bei der Datenschutzaufsichtsbehörde Ihres Wohnsitzlandes beschweren.`,
          ),
        },
        {
          titlu: 'Änderungen',
          html: p('Ändern wir die Art, wie wir Daten verarbeiten, aktualisieren wir diese Seite und das Datum oben.'),
        },
      ],
    };

  return {
    titlu: 'Politica de confidențialitate',
    descriere: `Cum sunt prelucrate datele personale pe site-ul ${MARCA}.`,
    actualizat: 'Ultima actualizare: 11 noiembrie 2026',
    intro:
      'Pe scurt: site-ul nu folosește cookie-uri și nu urmărește vizitatorii. Date personale primim doar când ne contactezi, pe WhatsApp, la telefon sau pe email.',
    sectiuni: [
      {
        titlu: 'Cine răspunde de date',
        html: p(
          `Operatorul datelor este ${d.vanzator}, vânzătorul parcelelor prezentate pe acest site. Ne poți contacta la telefon ${d.telefon}, pe ${d.whatsapp} sau pe email la ${d.email}.`,
        ),
      },
      {
        titlu: 'Ce date prelucrăm',
        html:
          ul(
            '<strong>Când ne contactezi.</strong> Numele, numărul de telefon sau adresa de email și ce ne scrii, inclusiv numerele cadastrale despre care întrebi.',
            '<strong>Formularul de pe pagina de contact.</strong> Nu trimite nimic către site. Deschide WhatsApp cu mesajul completat, iar tu decizi dacă îl trimiți. Ce scrii în formular nu se păstrează pe site.',
            '<strong>Date tehnice.</strong> Ca la orice site, serverul care îl găzduiește și furnizorul hărții primesc adresa IP a dispozitivului și datele obișnuite ale unei cereri web: browserul, pagina cerută, ora. Fără ele pagina și harta nu s-ar putea afișa.',
          ) +
          p(
            `Nu folosim cookie-uri, instrumente de analiză a traficului sau de publicitate. Detalii în ${a(d.cookies, 'politica de cookies')}.`,
          ),
      },
      {
        titlu: 'De ce și pe ce temei',
        html: ul(
          'Ca să-ți răspundem și să discutăm despre o parcelă sau o vânzare: art. 6 alin. (1) lit. b) din Regulamentul (UE) 2016/679 (GDPR), adică demersuri făcute la cererea ta înainte de un eventual contract.',
          'Ca site-ul și harta să funcționeze și să fie în siguranță: art. 6 alin. (1) lit. f) GDPR, interesul legitim de a afișa site-ul.',
          'Dacă se ajunge la vânzare, datele necesare actelor se prelucrează pentru că o cere legea: art. 6 alin. (1) lit. c) GDPR.',
        ),
      },
      {
        titlu: 'Cui ajung datele',
        html:
          ul(
            'firmei care găzduiește site-ul;',
            'Mapbox, Inc. (SUA), care livrează harta și imaginile din satelit;',
            'Soro (trysoro.com), care livrează articolele de pe pagina Articole, cu imaginile lor;',
            'WhatsApp (Meta), dacă alegi să ne scrii pe WhatsApp; pentru mesajele de acolo se aplică și politica de confidențialitate WhatsApp;',
            'furnizorului nostru de email, dacă ne scrii pe email;',
            'notarului și autorităților, dacă se ajunge la vânzare, în măsura în care o cere legea.',
          ) + p('Nu vindem și nu închiriem datele nimănui.'),
      },
      {
        titlu: 'Transferuri în afara Uniunii Europene',
        html: p(
          'Mapbox are sediul în SUA, Soro livrează articolele de pe servere din SUA, iar Meta, firma care deține WhatsApp, prelucrează date tot în SUA. Transferurile se fac în condițiile capitolului V din GDPR, de exemplu în baza Cadrului UE–SUA privind confidențialitatea datelor sau a clauzelor contractuale standard aprobate de Comisia Europeană.',
        ),
      },
      {
        titlu: 'Cât timp păstrăm datele',
        html: p(
          'Mesajele le păstrăm cât timp discutăm despre o parcelă. Dacă nu se ajunge la vânzare, le ștergem când nu mai sunt necesare sau mai devreme, dacă ne ceri. Dacă se ajunge la vânzare, actele se păstrează cât prevede legea. Jurnalele tehnice ale serverului le păstrează furnizorul de găzduire o perioadă scurtă, pentru securitate.',
        ),
      },
      {
        titlu: 'Drepturile tale',
        html: p(
          'Ai dreptul să afli ce date avem despre tine și să primești o copie, să le corectezi, să ceri ștergerea lor, să restrângi prelucrarea, să le primești într-un format portabil și să te opui prelucrării bazate pe interes legitim. Pentru oricare dintre ele, scrie-ne sau sună-ne la datele de mai sus. Răspundem în cel mult o lună.',
          `Dacă crezi că datele tale nu sunt prelucrate corect, poți depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP, ${ANSPDCP}) sau la autoritatea de protecție a datelor din țara în care locuiești.`,
        ),
      },
      {
        titlu: 'Modificări',
        html: p('Dacă schimbăm ceva în felul în care prelucrăm datele, actualizăm pagina și data de mai sus.'),
      },
    ],
  };
}

function termeni(l: Limba): DocLegal {
  const d = date(l);
  if (l === 'en')
    return {
      titlu: 'Terms of use',
      descriere: `Terms of use for the ${MARCA} website.`,
      actualizat: 'Last updated: 10 November 2026',
      sectiuni: [
        {
          titlu: 'About this website',
          html: p(
            `This website presents the parcels in Șiștarovăț commune, Arad County, Romania, offered for sale by ${d.vanzator}. By using the website you accept the terms below.`,
          ),
        },
        {
          titlu: 'Information about the parcels',
          html: p(
            'The outlines, areas, land-use categories and tarla and parcel numbers come from the cadastral export provided by the seller and are for information only. They may differ from the official documents. The legal status and exact area of a parcel are confirmed by the land register extract (extras de carte funciară) issued by OCPI Arad, the Arad cadastre office, or through a notary.',
            'The satellite imagery and the background map are indicative. The exact position of a parcel on the ground follows the cadastral documentation.',
          ),
        },
        {
          titlu: 'Not a binding offer',
          html: p(
            'Nothing on this website is a binding offer to sell. The price, terms and availability of a parcel are agreed directly with the seller. A sale is concluded by a notarial deed, in accordance with Romanian law, including, for agricultural land outside built-up areas, the procedure set out in Law no. 17/2014.',
          ),
        },
        {
          titlu: 'Intellectual property',
          html: p(
            'The texts and design of this website may not be copied without permission. The historical images on the area page are in the public domain, and the county map uses ANCPI data under the Open Government licence; the source is given under each image. Background map and satellite imagery: © Mapbox, © OpenStreetMap, imagery Maxar.',
          ),
        },
        {
          titlu: 'Liability',
          html: p(
            'We do our best to keep the information correct and up to date, but we cannot guarantee that it is complete at all times. We are not liable for decisions taken solely on the basis of this website without checking the official documents. The website links to other websites (WhatsApp, Mapbox, Wikipedia), whose content we are not responsible for.',
          ),
        },
        {
          titlu: 'Applicable law',
          html: p(
            'Romanian law applies. We will first try to settle any disagreement amicably; otherwise it will be decided by the competent courts.',
          ),
        },
        {
          titlu: 'Changes',
          html: p('We may update these terms. The version in force is the one published here, with the date above.'),
        },
        {
          titlu: 'Contact',
          html: p(`Phone ${d.telefon}, ${d.whatsapp}, email ${d.email}.`),
        },
      ],
    };

  if (l === 'de')
    return {
      titlu: 'Nutzungsbedingungen',
      descriere: `Nutzungsbedingungen der Website ${MARCA}.`,
      actualizat: 'Zuletzt aktualisiert: 10. November 2026',
      sectiuni: [
        {
          titlu: 'Über diese Website',
          html: p(
            `Diese Website zeigt die Flurstücke in der Gemeinde Șiștarovăț, Kreis Arad, Rumänien, die ${d.vanzator} zum Verkauf anbietet. Mit der Nutzung der Website akzeptieren Sie die folgenden Bedingungen.`,
          ),
        },
        {
          titlu: 'Angaben zu den Flurstücken',
          html: p(
            'Umrisse, Flächen, Nutzungsarten sowie Tarla- und Parzellennummern stammen aus dem Katasterexport des Verkäufers und dienen nur zur Information. Sie können von den amtlichen Unterlagen abweichen. Rechtsstatus und genaue Fläche eines Flurstücks ergeben sich aus dem Grundbuchauszug (extras de carte funciară) des Katasteramts OCPI Arad oder werden über einen Notar geprüft.',
            'Satellitenbilder und Hintergrundkarte sind Anhaltspunkte. Die genaue Lage eines Flurstücks im Gelände richtet sich nach den Katasterunterlagen.',
          ),
        },
        {
          titlu: 'Kein verbindliches Angebot',
          html: p(
            'Die Angaben auf dieser Website sind kein verbindliches Verkaufsangebot. Preis, Bedingungen und Verfügbarkeit eines Flurstücks werden direkt mit dem Verkäufer vereinbart. Der Verkauf erfolgt durch notarielle Urkunde nach rumänischem Recht, bei landwirtschaftlichen Flächen außerhalb der Ortslage einschließlich des Verfahrens nach Gesetz Nr. 17/2014.',
          ),
        },
        {
          titlu: 'Urheberrecht',
          html: p(
            'Texte und Gestaltung dieser Website dürfen nicht ohne Zustimmung kopiert werden. Die historischen Bilder auf der Seite zur Gegend sind gemeinfrei, die Karte des Kreises verwendet Daten der ANCPI unter der Open-Government-Lizenz; die Quelle steht unter jedem Bild. Hintergrundkarte und Satellitenbilder: © Mapbox, © OpenStreetMap, Bilder Maxar.',
          ),
        },
        {
          titlu: 'Haftung',
          html: p(
            'Wir bemühen uns, die Angaben richtig und aktuell zu halten, können aber nicht garantieren, dass sie jederzeit vollständig sind. Für Entscheidungen, die allein auf Grundlage dieser Website ohne Prüfung der amtlichen Unterlagen getroffen werden, haften wir nicht. Die Website verlinkt auf andere Websites (WhatsApp, Mapbox, Wikipedia), für deren Inhalte wir nicht verantwortlich sind.',
          ),
        },
        {
          titlu: 'Anwendbares Recht',
          html: p(
            'Es gilt rumänisches Recht. Meinungsverschiedenheiten versuchen wir zunächst gütlich zu klären; andernfalls entscheiden die zuständigen Gerichte.',
          ),
        },
        {
          titlu: 'Änderungen',
          html: p(
            'Wir können diese Bedingungen aktualisieren. Es gilt die hier veröffentlichte Fassung mit dem oben genannten Datum.',
          ),
        },
        {
          titlu: 'Kontakt',
          html: p(`Telefon ${d.telefon}, ${d.whatsapp}, E-Mail ${d.email}.`),
        },
      ],
    };

  return {
    titlu: 'Termeni și condiții',
    descriere: `Termenii de folosire a site-ului ${MARCA}.`,
    actualizat: 'Ultima actualizare: 10 noiembrie 2026',
    sectiuni: [
      {
        titlu: 'Despre site',
        html: p(
          `Site-ul prezintă parcelele din comuna Șiștarovăț, județul Arad, puse în vânzare de ${d.vanzator}. Folosind site-ul, accepți condițiile de mai jos.`,
        ),
      },
      {
        titlu: 'Informațiile despre parcele',
        html: p(
          'Contururile, suprafețele, categoriile de folosință și numerele de tarla și parcelă vin din exportul cadastral primit de la vânzător și au caracter informativ. Pot exista diferențe față de documentele oficiale. Situația juridică și suprafața exactă a unei parcele se verifică în extrasul de carte funciară eliberat de OCPI Arad sau prin notar.',
          'Imaginile din satelit și harta de fundal sunt orientative. Poziția exactă a unei parcele pe teren se stabilește după documentația cadastrală.',
        ),
      },
      {
        titlu: 'Nu este o ofertă fermă',
        html: p(
          'Ce apare pe site nu reprezintă o ofertă fermă de vânzare. Prețul, condițiile și disponibilitatea unei parcele se stabilesc direct cu vânzătorul. Vânzarea se încheie prin act autentic la notar, cu respectarea legii, inclusiv, pentru terenurile agricole din extravilan, a procedurii prevăzute de Legea nr. 17/2014.',
        ),
      },
      {
        titlu: 'Proprietate intelectuală',
        html: p(
          'Textele și designul site-ului nu pot fi copiate fără acord. Imaginile istorice de pe pagina despre zonă sunt în domeniul public, iar harta județului folosește date ANCPI, sub licența Open Government; sursa e trecută sub fiecare imagine. Harta de fundal și imaginile din satelit: © Mapbox, © OpenStreetMap, imagini Maxar.',
        ),
      },
      {
        titlu: 'Răspundere',
        html: p(
          'Ne străduim ca informațiile să fie corecte și la zi, dar nu putem garanta că sunt complete în orice moment. Nu răspundem pentru decizii luate doar pe baza site-ului, fără verificarea documentelor oficiale. Site-ul trimite spre alte site-uri (WhatsApp, Mapbox, Wikipedia), pentru al căror conținut nu răspundem.',
        ),
      },
      {
        titlu: 'Legea aplicabilă',
        html: p(
          'Se aplică legea română. Neînțelegerile încercăm să le rezolvăm întâi pe cale amiabilă; altfel, le soluționează instanțele competente.',
        ),
      },
      {
        titlu: 'Modificări',
        html: p('Putem actualiza acești termeni. Versiunea valabilă e cea publicată aici, cu data de mai sus.'),
      },
      {
        titlu: 'Contact',
        html: p(`Telefon ${d.telefon}, ${d.whatsapp}, email ${d.email}.`),
      },
    ],
  };
}

function cookies(l: Limba): DocLegal {
  const d = date(l);
  if (l === 'en')
    return {
      titlu: 'Cookie policy',
      descriere: `The ${MARCA} website uses no cookies.`,
      actualizat: 'Last updated: 11 November 2026',
      intro: 'This website uses no cookies. That is why we do not ask for your consent with a banner.',
      sectiuni: [
        {
          titlu: 'What cookies are',
          html: p(
            'Cookies are small files a website can store in your browser, for example to recognise you on a later visit or to follow your browsing.',
          ),
        },
        {
          titlu: 'What this website uses',
          html: ul(
            'No cookies, neither our own nor from third parties.',
            'No traffic analytics (such as Google Analytics) and no advertising pixels.',
            'Nothing stored in your browser’s local storage.',
          ),
        },
        {
          titlu: 'External services',
          html: ul(
            'The map and the satellite imagery come from Mapbox. When they load, Mapbox receives your IP address, as any web server does, but it stores no cookies in your browser through this website.',
            'The articles come from Soro (trysoro.com). When they load, Soro receives your IP address, as any web server does; its script stores no cookies and nothing else in your browser.',
            'The fonts are served from the same server as the website, not from Google.',
            'The WhatsApp links open the WhatsApp service, which has its own rules on cookies.',
          ),
        },
        {
          titlu: 'Controlling cookies',
          html: p(
            'You can delete or block cookies at any time in your browser settings. Blocking them changes nothing on this website.',
          ),
        },
        {
          titlu: 'If anything changes',
          html: p(
            `If we ever add cookies that are not strictly necessary, for example for statistics, we will ask for your consent first and update this page. More on personal data in the ${a(d.confidentialitate, 'privacy policy')}.`,
          ),
        },
      ],
    };

  if (l === 'de')
    return {
      titlu: 'Hinweise zu Cookies',
      descriere: `Die Website ${MARCA} verwendet keine Cookies.`,
      actualizat: 'Zuletzt aktualisiert: 11. November 2026',
      intro:
        'Diese Website verwendet keine Cookies. Deshalb bitten wir Sie auch nicht mit einem Banner um Ihre Einwilligung.',
      sectiuni: [
        {
          titlu: 'Was Cookies sind',
          html: p(
            'Cookies sind kleine Dateien, die eine Website in Ihrem Browser speichern kann, etwa um Sie bei einem späteren Besuch wiederzuerkennen oder Ihr Surfverhalten zu verfolgen.',
          ),
        },
        {
          titlu: 'Was diese Website verwendet',
          html: ul(
            'Keine Cookies, weder eigene noch von Dritten.',
            'Keine Webanalyse (etwa Google Analytics) und keine Werbepixel.',
            'Nichts im lokalen Speicher Ihres Browsers.',
          ),
        },
        {
          titlu: 'Externe Dienste',
          html: ul(
            'Karte und Satellitenbilder kommen von Mapbox. Beim Laden erhält Mapbox Ihre IP-Adresse, wie jeder Webserver, speichert über diese Website aber keine Cookies in Ihrem Browser.',
            'Die Artikel kommen von Soro (trysoro.com). Beim Laden erhält Soro Ihre IP-Adresse, wie jeder Webserver; sein Skript speichert keine Cookies und auch sonst nichts in Ihrem Browser.',
            'Die Schriften werden vom selben Server wie die Website geladen, nicht von Google.',
            'Die WhatsApp-Links öffnen den Dienst WhatsApp, für den eigene Regeln zu Cookies gelten.',
          ),
        },
        {
          titlu: 'Cookies selbst verwalten',
          html: p(
            'Sie können Cookies jederzeit in den Einstellungen Ihres Browsers löschen oder blockieren. Auf dieser Website ändert sich dadurch nichts.',
          ),
        },
        {
          titlu: 'Wenn sich etwas ändert',
          html: p(
            `Sollten wir einmal Cookies einsetzen, die nicht unbedingt erforderlich sind, etwa für Statistiken, holen wir vorher Ihre Einwilligung ein und aktualisieren diese Seite. Mehr zu personenbezogenen Daten in der ${a(d.confidentialitate, 'Datenschutzerklärung')}.`,
          ),
        },
      ],
    };

  return {
    titlu: 'Politica de cookies',
    descriere: `Site-ul ${MARCA} nu folosește cookie-uri.`,
    actualizat: 'Ultima actualizare: 11 noiembrie 2026',
    intro: 'Site-ul nu folosește cookie-uri. De aceea nu îți cerem acordul printr-un banner.',
    sectiuni: [
      {
        titlu: 'Ce sunt cookie-urile',
        html: p(
          'Cookie-urile sunt fișiere mici pe care un site le poate salva în browserul tău, de exemplu ca să te recunoască la o vizită ulterioară sau ca să-ți urmărească navigarea.',
        ),
      },
      {
        titlu: 'Ce folosește acest site',
        html: ul(
          'Niciun cookie, nici al nostru, nici de la terți.',
          'Nicio unealtă de analiză a traficului (de tipul Google Analytics) și niciun pixel de publicitate.',
          'Nimic salvat în memoria locală a browserului.',
        ),
      },
      {
        titlu: 'Servicii externe',
        html: ul(
          'Harta și imaginile din satelit vin de la Mapbox. Când se încarcă, Mapbox primește adresa IP, ca orice server web, dar nu salvează cookie-uri în browser prin acest site.',
          'Articolele vin de la Soro (trysoro.com). Când se încarcă, Soro primește adresa IP, ca orice server web; scriptul lor nu salvează cookie-uri și nici altceva în browser.',
          'Fonturile sunt servite de pe același server cu site-ul, nu de la Google.',
          'Linkurile spre WhatsApp deschid serviciul WhatsApp, care are propriile reguli despre cookie-uri.',
        ),
      },
      {
        titlu: 'Cum controlezi cookie-urile',
        html: p(
          'Poți șterge sau bloca oricând cookie-urile din setările browserului. Pe acest site nu se schimbă nimic dacă le blochezi.',
        ),
      },
      {
        titlu: 'Dacă se schimbă ceva',
        html: p(
          `Dacă vom adăuga vreodată cookie-uri care nu sunt strict necesare, de exemplu pentru statistici, îți vom cere acordul înainte și vom actualiza pagina. Mai multe despre datele personale în ${a(d.confidentialitate, 'politica de confidențialitate')}.`,
        ),
      },
    ],
  };
}

export const LEGAL: Record<PaginaLegala, (l: Limba) => DocLegal> = { confidentialitate, termeni, cookies };

/**
 * Întrebări frecvente, cerute de client pe 9 noiembrie 2026 „pe baza” paginii
 * Despre noi și a descrierii zonei. Răspunsurile folosesc doar ce scrie acolo,
 * cifrele din date și regulile generale pe care le spun deja termenii (notar,
 * extras de carte funciară, Legea 17/2014). Nimic despre condițiile pentru
 * cumpărătorii străini: asta trebuie confirmat întâi cu un notar.
 *
 * Răspunsurile sunt HTML (au linkuri) și se randează cu set:html.
 */
import type { Limba } from './limbi';
import { MARCA } from './text';
import type { Preturi } from './despre';
import { enumerare, type Statistici } from '../lib/statistici';

export interface ContextFaq {
  pret: Preturi;
  s: Statistici;
  link: { harta: string; parcele: string; zona: string; contact: string };
  /** Deja ca linkuri HTML (tel:, mailto:). */
  tel: { ro: string; de: string; email: string | null };
}

export interface TextFaq {
  titlu: string;
  descriere: string;
  h1: string;
  lead: string;
  categoriiMici: boolean;
  intrebari: (c: ContextFaq) => { q: string; a: string }[];
  maiAiIntrebari: string;
  butonContact: string;
}

const a = (href: string, text: string) => `<a href="${href}">${text}</a>`;

export const FAQ: Record<Limba, TextFaq> = {
  ro: {
    titlu: `Întrebări frecvente · ${MARCA}`,
    descriere: 'Prețuri, concesiune, acte și cumpărare: răspunsuri despre parcelele din Șiștarovăț, jud. Arad.',
    h1: 'Întrebări frecvente',
    lead: 'Ce ne întreabă cel mai des cei care se uită la parcelele din Șiștarovăț.',
    categoriiMici: true,
    intrebari: ({ pret, s, link, tel }) => [
      {
        q: 'Cât costă un teren?',
        a: `Cumpărarea pornește de la ${pret.vanzare} pe metru pătrat, adică de la ${pret.vanzareHa} pentru un hectar. Prețul pentru o parcelă anume ți-l spunem când ne scrii, cu numărul ei cadastral.`,
      },
      {
        q: 'Pot lua terenul în concesiune, în loc să-l cumpăr?',
        a: `Da. Concesiunea pornește de la ${pret.concesiune} pe metru pătrat pe an, adică de la ${pret.concesiuneHa} pe an pentru un hectar. Condițiile le stabilim pentru fiecare parcelă.`,
      },
      {
        q: 'Câte parcele sunt de vânzare și cât de mari sunt?',
        a: `${s.vanzare}, în total ${s.haVanzare}, din cele ${s.total} de pe hartă. Cea mai mică are ${s.min}, cea mai mare ${s.max}. Le vezi pe toate pe ${a(link.harta, 'hartă')} și în ${a(link.parcele, 'listă')}.`,
      },
      {
        q: 'Unde se află terenurile?',
        a: 'În comuna Șiștarovăț, în județul Arad, pe Dealurile Lipovei. Comuna e la aproximativ 40 km de Arad și 60 km de Timișoara.',
      },
      {
        q: 'De ce Șiștarovăț?',
        a: `Pentru liniște și aer curat, într-o zonă de dealuri împădurite, aproape de stațiunea Lipova și de mănăstirea Maria Radna. Iar terenurile sunt încă ieftine față de periferia Aradului sau a Timișoarei. Mai multe găsești pe pagina despre ${a(link.zona, 'zonă')}.`,
      },
      {
        q: 'La ce se pot folosi terenurile?',
        a: `Categoria de folosință a fiecărei parcele e trecută în fișa ei de pe hartă și în listă. Cele de vânzare sunt: ${enumerare(s.categorii, 'și')}. Zona se pretează la agricultură, pomicultură, viticultură și silvicultură. Ce se poate construi pe o parcelă anume afli din certificatul de urbanism, pe care îl eliberează primăria.`,
      },
      {
        q: 'Ce acte au parcelele?',
        a: 'Fiecare parcelă are număr cadastral. Situația ei juridică o poți verifica oricând într-un extras de carte funciară, cerut la OCPI Arad sau prin notar.',
      },
      {
        q: 'Cum se face cumpărarea?',
        a: 'Prin act autentic, la notar. Pentru terenurile agricole din extravilan, Legea 17/2014 cere înainte o procedură la primărie, în care anumite persoane au drept de preempțiune. Notarul îți spune ce acte trebuie.',
      },
      {
        q: 'Cum găsesc o parcelă pe hartă?',
        a: `Pe ${a(link.harta, 'hartă')} cauți după numărul cadastral, iar în ${a(link.parcele, 'listă')} și după tarla sau parcelă. Apasă pe o parcelă ca să-i vezi suprafața și categoria; din fișa ei ne poți scrie direct.`,
      },
      {
        q: 'Cum vă contactez?',
        a: `Pe WhatsApp sau la telefon în România, la ${tel.ro}, la telefon în Germania, la ${tel.de}${tel.email ? `, ori pe email, la ${tel.email}` : ''}. Sau pregătește mesajul pe pagina de ${a(link.contact, 'contact')}.`,
      },
    ],
    maiAiIntrebari: 'Ai altă întrebare?',
    butonContact: 'Scrie-ne',
  },

  en: {
    titlu: `FAQ · ${MARCA}`,
    descriere: 'Prices, leasing, paperwork and buying: answers about the parcels in Șiștarovăț, Arad County, Romania.',
    h1: 'Frequently asked questions',
    lead: 'What people looking at the parcels in Șiștarovăț ask us most often.',
    categoriiMici: true,
    intrebari: ({ pret, s, link, tel }) => [
      {
        q: 'How much does the land cost?',
        a: `Prices to buy start at ${pret.vanzare} per square metre, which is from ${pret.vanzareHa} for one hectare. We give you the price for a specific parcel when you write to us with its cadastral number.`,
      },
      {
        q: 'Can I lease the land instead of buying it?',
        a: `Yes. Leases start at ${pret.concesiune} per square metre a year, which is from ${pret.concesiuneHa} a year for one hectare. The terms are agreed for each parcel.`,
      },
      {
        q: 'How many parcels are for sale, and how big are they?',
        a: `${s.vanzare}, ${s.haVanzare} in total, out of the ${s.total} on the map. The smallest is ${s.min}, the largest ${s.max}. You can see them all on the ${a(link.harta, 'map')} and in the ${a(link.parcele, 'list')}.`,
      },
      {
        q: 'Where is the land?',
        a: 'In Șiștarovăț commune, Arad County, in the Lipova Hills of western Romania. The commune is about 40 km from Arad and 60 km from Timișoara.',
      },
      {
        q: 'Why Șiștarovăț?',
        a: `For peace and clean air in wooded hill country, close to the Lipova spa and the Maria Radna monastery. And land here is still inexpensive compared with the outskirts of Arad or Timișoara. Read more ${a(link.zona, 'about the area')}.`,
      },
      {
        q: 'What can the land be used for?',
        a: `The land use of every parcel is shown on its card on the map and in the list. The parcels for sale are ${enumerare(s.categorii, 'and')}. The area suits farming, orchards, vineyards and forestry. What may be built on a given parcel is set out in the urban planning certificate issued by the town hall.`,
      },
      {
        q: 'What documents do the parcels have?',
        a: 'Every parcel has a cadastral number. You can check its legal status at any time in a land register extract, from the Arad cadastre office (OCPI Arad) or through a notary.',
      },
      {
        q: 'How does buying work?',
        a: 'By notarial deed. For agricultural land outside built-up areas, Romanian law (Law 17/2014) first requires a procedure at the town hall, in which certain people have a right of first refusal. The notary will tell you which documents are needed.',
      },
      {
        q: 'How do I find a parcel on the map?',
        a: `On the ${a(link.harta, 'map')} you can search by cadastral number, and in the ${a(link.parcele, 'list')} also by tarla or parcel. Tap a parcel to see its area and land use; you can write to us about it straight from its card.`,
      },
      {
        q: 'How do I contact you?',
        a: `On WhatsApp or by phone in Romania, at ${tel.ro}, by phone in Germany, at ${tel.de}${tel.email ? `, or by email, at ${tel.email}` : ''}. Or prepare your message on the ${a(link.contact, 'contact')} page.`,
      },
    ],
    maiAiIntrebari: 'Another question?',
    butonContact: 'Get in touch',
  },

  de: {
    titlu: `FAQ · ${MARCA}`,
    descriere: 'Preise, Pacht, Unterlagen und Kauf: Antworten zu den Flurstücken in Șiștarovăț, Kreis Arad, Rumänien.',
    h1: 'Häufige Fragen',
    lead: 'Was uns Interessenten an den Flurstücken in Șiștarovăț am häufigsten fragen.',
    categoriiMici: false,
    intrebari: ({ pret, s, link, tel }) => [
      {
        q: 'Was kostet ein Grundstück?',
        a: `Der Kaufpreis beginnt bei ${pret.vanzare} pro Quadratmeter, also ab ${pret.vanzareHa} für einen Hektar. Den Preis für ein bestimmtes Flurstück nennen wir Ihnen, wenn Sie uns mit der Katasternummer schreiben.`,
      },
      {
        q: 'Kann ich das Land pachten, statt es zu kaufen?',
        a: `Ja. Die Pacht beginnt bei ${pret.concesiune} pro Quadratmeter und Jahr, also ab ${pret.concesiuneHa} im Jahr für einen Hektar. Die Bedingungen vereinbaren wir für jedes Flurstück.`,
      },
      {
        q: 'Wie viele Flurstücke stehen zum Verkauf, und wie groß sind sie?',
        a: `${s.vanzare}, insgesamt ${s.haVanzare}, von den ${s.total.replace('Flurstücke', 'Flurstücken')} auf der Karte. Das kleinste hat ${s.min}, das größte ${s.max}. Alle sehen Sie auf der ${a(link.harta, 'Karte')} und in der ${a(link.parcele, 'Liste')}.`,
      },
      {
        q: 'Wo liegen die Grundstücke?',
        a: 'In der Gemeinde Șiștarovăț im Kreis Arad, im Hügelland von Lipova im rumänischen Banat. Die Gemeinde liegt etwa 40 km von Arad und 60 km von Timișoara entfernt.',
      },
      {
        q: 'Warum Șiștarovăț?',
        a: `Wegen der Ruhe und der sauberen Luft in bewaldetem Hügelland, nahe dem Kurort Lipova und dem Kloster Maria Radna. Und das Land ist hier noch günstig im Vergleich zum Umland von Arad oder Timișoara. Mehr ${a(link.zona, 'über die Gegend')}.`,
      },
      {
        q: 'Wofür kann das Land genutzt werden?',
        a: `Die Nutzungsart jedes Flurstücks sehen Sie, wenn Sie es auf der Karte antippen, und in der Liste. Zum Verkauf stehen: ${enumerare(s.categorii, 'und')}. Die Gegend eignet sich für Landwirtschaft, Obstbau, Weinbau und Forstwirtschaft. Was auf einem bestimmten Flurstück gebaut werden darf, steht in der Städtebaubescheinigung (certificat de urbanism), die das Rathaus ausstellt.`,
      },
      {
        q: 'Welche Unterlagen haben die Flurstücke?',
        a: 'Jedes Flurstück hat eine Katasternummer. Die Rechtslage können Sie jederzeit in einem Grundbuchauszug prüfen, beim Katasteramt Arad (OCPI Arad) oder über einen Notar.',
      },
      {
        q: 'Wie läuft der Kauf ab?',
        a: 'Durch notarielle Urkunde. Bei landwirtschaftlichen Flächen außerhalb der Ortslage schreibt das rumänische Gesetz 17/2014 vorher ein Verfahren beim Rathaus vor, in dem bestimmte Personen ein Vorkaufsrecht haben. Welche Unterlagen nötig sind, sagt Ihnen der Notar.',
      },
      {
        q: 'Wie finde ich ein Flurstück auf der Karte?',
        a: `Auf der ${a(link.harta, 'Karte')} suchen Sie nach der Katasternummer, in der ${a(link.parcele, 'Liste')} auch nach Tarla oder Parzelle. Tippen Sie auf ein Flurstück, um Fläche und Nutzungsart zu sehen; im Infofenster können Sie uns direkt dazu schreiben.`,
      },
      {
        q: 'Wie erreiche ich Sie?',
        a: `Per WhatsApp oder telefonisch in Rumänien unter ${tel.ro}, telefonisch in Deutschland unter ${tel.de}${tel.email ? ` oder per E-Mail an ${tel.email}` : ''}. Oder bereiten Sie Ihre Nachricht auf der Seite ${a(link.contact, 'Kontakt')} vor.`,
      },
    ],
    maiAiIntrebari: 'Noch eine Frage?',
    butonContact: 'Schreiben Sie uns',
  },
};

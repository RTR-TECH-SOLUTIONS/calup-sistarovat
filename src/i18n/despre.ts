/**
 * Pagina „Despre noi”, cerută de client pe 9 noiembrie 2026: vânzare de la
 * 1 €/m² sau concesiune de la 0,06 €/m² pe an. Prețurile vin din
 * src/lib/oferta.ts, cifrele despre parcele din date. Nu scriem nimic despre
 * vânzător în afară de ce știm: că vinde și dă în concesiune aceste parcele.
 *
 * „Concesiune” e cuvântul clientului. În germană i-am spus „Pacht”, iar în
 * engleză „lease”: așa înțelege cititorul de acolo folosirea unui teren cu
 * plată pe an.
 */
import type { Limba } from './limbi';
import { MARCA } from './text';
import { enumerare, type Statistici } from '../lib/statistici';

/** Prețurile, deja scrise în forma limbii: „1 €”, „€0.06”, „10.000 €”. */
export interface Preturi {
  vanzare: string;
  concesiune: string;
  vanzareHa: string;
  concesiuneHa: string;
}

interface Varianta {
  titlu: string;
  dela: string;
  unitate: string;
  exemplu: (pretHa: string) => string;
  text: string;
}

export interface TextDespre {
  titlu: string;
  descriere: (p: Preturi) => string;
  h1: string;
  lead: string;
  ofertaTitlu: string;
  cumparare: Varianta;
  concesiune: Varianta;
  notaPret: string;
  parceleTitlu: string;
  categoriiMici: boolean;
  parcele: (s: Statistici) => string;
  planAria: string;
  planNota: string;
  pasiTitlu: string;
  pasi: { titlu: string; text: string }[];
  butonHarta: string;
  butonContact: string;
}

export const DESPRE: Record<Limba, TextDespre> = {
  ro: {
    titlu: `Despre noi · ${MARCA}`,
    descriere: (p) =>
      `Vindem și dăm în concesiune parcele în comuna Șiștarovăț, jud. Arad: cumpărare de la ${p.vanzare}/m², concesiune de la ${p.concesiune}/m² pe an.`,
    h1: 'Despre noi',
    lead: 'Vindem și dăm în concesiune parcele de teren în comuna Șiștarovăț, în județul Arad, pe Dealurile Lipovei. Toate sunt pe hartă, fiecare cu numărul cadastral, suprafața și categoria de folosință, ca să știi exact ce alegi înainte să ne scrii.',
    ofertaTitlu: 'Cumperi sau iei în concesiune',
    cumparare: {
      titlu: 'Cumpărare',
      dela: 'de la',
      unitate: 'pe m²',
      exemplu: (x) => `Un hectar: de la ${x}.`,
      text: 'Parcela devine a ta. Contractul se încheie la notar.',
    },
    concesiune: {
      titlu: 'Concesiune',
      dela: 'de la',
      unitate: 'pe m², pe an',
      exemplu: (x) => `Un hectar: de la ${x} pe an.`,
      text: 'Folosești terenul și plătești anual, fără să-l cumperi.',
    },
    notaPret:
      'Sunt prețuri de pornire. Prețul și condițiile pentru o parcelă anume ți le spunem când ne scrii, cu numărul ei cadastral.',
    parceleTitlu: 'Ce parcele avem',
    categoriiMici: true,
    parcele: (s) =>
      `Din cele ${s.total} cadastrale de pe hartă, ${s.vanzare} sunt de vânzare, în total ${s.haVanzare}. Cea mai mică are ${s.min}, cea mai mare ${s.max}. Pe categorii de folosință: ${enumerare(s.categorii, 'și')}.`,
    planAria: 'Planul parcelelor din Șiștarovăț; cele de vânzare sunt în verde',
    planNota: 'Toate parcelele de pe hartă; cele de vânzare, în verde. Nordul e sus.',
    pasiTitlu: 'Cum se face',
    pasi: [
      {
        titlu: 'Alegi parcela',
        text: 'Pe hartă sau în listă. Fiecare are număr cadastral, suprafață și categorie de folosință.',
      },
      {
        titlu: 'Ne scrii sau ne suni',
        text: 'Pe WhatsApp, pe email sau la telefon, în România ori în Germania. Trimite-ne și numărul cadastral al parcelei.',
      },
      {
        titlu: 'Semnăm contractul',
        text: 'Cumpărarea se face prin act autentic, la notar; concesiunea, prin contract. Situația parcelei o poți verifica înainte într-un extras de carte funciară.',
      },
    ],
    butonHarta: 'Vezi parcelele pe hartă',
    butonContact: 'Scrie-ne',
  },

  en: {
    titlu: `About us · ${MARCA}`,
    descriere: (p) =>
      `We sell and lease parcels of land in Șiștarovăț commune, Arad County, Romania: to buy from ${p.vanzare}/m², to lease from ${p.concesiune}/m² a year.`,
    h1: 'About us',
    lead: 'We sell and lease parcels of land in Șiștarovăț commune, Arad County, in the Lipova Hills of western Romania. Every parcel is on the map with its cadastral number, area and land use, so you know exactly what you are choosing before you get in touch.',
    ofertaTitlu: 'Buy or lease',
    cumparare: {
      titlu: 'Buy',
      dela: 'from',
      unitate: 'per m²',
      exemplu: (x) => `One hectare: from ${x}.`,
      text: 'The parcel becomes yours. The contract is signed before a notary.',
    },
    concesiune: {
      titlu: 'Lease',
      dela: 'from',
      unitate: 'per m², per year',
      exemplu: (x) => `One hectare: from ${x} a year.`,
      text: 'You use the land and pay once a year, without buying it.',
    },
    notaPret:
      'These are starting prices. We give you the price and terms for a specific parcel when you write to us with its cadastral number.',
    parceleTitlu: 'The parcels',
    categoriiMici: true,
    parcele: (s) =>
      `Of the ${s.total} on the map, ${s.vanzare} are for sale, ${s.haVanzare} in total. The smallest is ${s.min}, the largest ${s.max}. By land use: ${enumerare(s.categorii, 'and')}.`,
    planAria: 'Plan of the parcels in Șiștarovăț; the ones for sale are in green',
    planNota: 'All the parcels on the map; the ones for sale in green. North is up.',
    pasiTitlu: 'How it works',
    pasi: [
      {
        titlu: 'Choose a parcel',
        text: 'On the map or in the list. Each one has a cadastral number, an area and a land use.',
      },
      {
        titlu: 'Write or call',
        text: 'On WhatsApp, by email or by phone, in Romania or in Germany. Please include the parcel’s cadastral number.',
      },
      {
        titlu: 'Sign the contract',
        text: 'A purchase is made by notarial deed; a lease by contract. Before that, you can check the parcel’s legal status in a land register extract.',
      },
    ],
    butonHarta: 'See the parcels on the map',
    butonContact: 'Get in touch',
  },

  de: {
    titlu: `Über uns · ${MARCA}`,
    descriere: (p) =>
      `Wir verkaufen und verpachten Flurstücke in der Gemeinde Șiștarovăț, Kreis Arad, Rumänien: Kauf ab ${p.vanzare}/m², Pacht ab ${p.concesiune}/m² im Jahr.`,
    h1: 'Über uns',
    lead: 'Wir verkaufen und verpachten Flurstücke in der Gemeinde Șiștarovăț im Kreis Arad, im Hügelland von Lipova im rumänischen Banat. Jedes Flurstück ist auf der Karte zu sehen, mit Katasternummer, Fläche und Nutzungsart, damit Sie genau wissen, was Sie wählen, bevor Sie uns schreiben.',
    ofertaTitlu: 'Kaufen oder pachten',
    cumparare: {
      titlu: 'Kauf',
      dela: 'ab',
      unitate: 'pro m²',
      exemplu: (x) => `Ein Hektar: ab ${x}.`,
      text: 'Das Flurstück gehört Ihnen. Der Vertrag wird beim Notar geschlossen.',
    },
    concesiune: {
      titlu: 'Pacht',
      dela: 'ab',
      unitate: 'pro m² und Jahr',
      exemplu: (x) => `Ein Hektar: ab ${x} im Jahr.`,
      text: 'Sie nutzen das Land und zahlen jährlich, ohne es zu kaufen.',
    },
    notaPret:
      'Das sind Einstiegspreise. Preis und Bedingungen für ein bestimmtes Flurstück nennen wir Ihnen, wenn Sie uns mit der Katasternummer schreiben.',
    parceleTitlu: 'Die Flurstücke',
    categoriiMici: false,
    parcele: (s) =>
      `Von den ${s.total.replace('Flurstücke', 'Flurstücken')} auf der Karte stehen ${s.vanzare} zum Verkauf, insgesamt ${s.haVanzare}. Das kleinste hat ${s.min}, das größte ${s.max}. Nach Nutzungsart: ${enumerare(s.categorii, 'und')}.`,
    planAria: 'Plan der Flurstücke in Șiștarovăț; die zum Verkauf sind grün',
    planNota: 'Alle Flurstücke auf der Karte; die zum Verkauf grün. Norden ist oben.',
    pasiTitlu: 'So geht es',
    pasi: [
      {
        titlu: 'Flurstück wählen',
        text: 'Auf der Karte oder in der Liste. Jedes hat eine Katasternummer, eine Fläche und eine Nutzungsart.',
      },
      {
        titlu: 'Schreiben oder anrufen',
        text: 'Per WhatsApp, E-Mail oder Telefon, in Rumänien oder in Deutschland. Nennen Sie uns bitte die Katasternummer.',
      },
      {
        titlu: 'Vertrag unterschreiben',
        text: 'Der Kauf erfolgt durch notarielle Urkunde, die Pacht durch Vertrag. Vorher können Sie die Rechtslage des Flurstücks in einem Grundbuchauszug prüfen.',
      },
    ],
    butonHarta: 'Flurstücke auf der Karte ansehen',
    butonContact: 'Schreiben Sie uns',
  },
};

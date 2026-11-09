/**
 * Textul paginii despre zonă. Faptele vin din Wikipedia (articolele despre
 * comuna și satul Șiștarovăț și despre Banat), verificate pe 7 noiembrie 2026.
 * Engleza și germana sunt traduceri ale aceluiași text, fără nimic adăugat.
 * În germană râurile au numele germane (Marosch, Theiß), cum le știe cititorul.
 */
import type { Limba } from './limbi';

interface Calup {
  total: string;
  ha: string;
  vanzare: string;
  haVanzare: string;
  categorii: string[];
}

export interface TextZona {
  titlu: string;
  descriere: string;
  h1: string;
  lead: string;
  fisaAria: string;
  fisa: [string, string][];
  hartaVecheAlt: string;
  hartaVeche: string;
  istoricTitlu: string;
  istoric: string[];
  pastorAlt: string;
  pastor: string;
  banatTitlu: string;
  banat: string[];
  judetAlt: string;
  judet: string;
  /** Germana scrie substantivele cu majusculă: „50,21 ha Ackerland”, nu „ackerland”. */
  categoriiMici: boolean;
  calup: (c: Calup) => string;
  butonHarta: string;
  butonLista: string;
  surse: string;
}

/** „a, b și c”. Virgula zecimală strică orice înlocuire cu regex, deci ultimul element se lipește separat. */
const enumerare = (l: string[], si: string) =>
  l.length > 1 ? `${l.slice(0, -1).join(', ')} ${si} ${l.at(-1)}` : (l[0] ?? '');

export const ZONA: Record<Limba, TextZona> = {
  ro: {
    titlu: 'Despre zonă · Șiștarovăț, jud. Arad',
    descriere: 'Comuna Șiștarovăț, pe Dealurile Lipovei, în Banatul istoric: sate, istorie, pământ.',
    h1: 'Șiștarovăț, pe Dealurile Lipovei',
    lead: 'Șiștarovăț este o comună din sudul județului Arad, la 42 km de municipiul Arad. Are patru sate și 340 de locuitori pe aproape 123 km², adică mai puțin de trei oameni pe kilometru pătrat. Pădurile trec de 6.000 de hectare, cam jumătate din comună.',
    fisaAria: 'Fișa comunei',
    fisa: [
      ['Județul', 'Arad'],
      ['Sate', 'Șiștarovăț (reședința), Cuveșdia, Labașinț, Varnița'],
      ['Suprafață', '122,67 km²'],
      ['Locuitori', '340, la recensământul din 2021'],
      ['Altitudine', '195 m'],
      ['Până la Arad', '42 km'],
      ['Prima atestare', '1440'],
    ],
    hartaVecheAlt:
      'Hartă desenată de mână: satul Șiștarovăț, cu grădinile colorate în verde, înconjurat de dealuri împădurite și de câmpuri arate în fâșii.',
    hartaVeche:
      'Satul, notat „Sistarowitz”, pe harta militară iosefină a Banatului, secția 45, ridicată între 1769 și 1772. Österreichisches Staatsarchiv, Kriegsarchiv. Domeniu public.',
    istoricTitlu: 'Satele și oamenii lor',
    istoric: [
      'Șiștarovăț și Cuveșdia apar în documente încă din 1440. Labașinț e pomenit prima oară în 1477, iar Varnița s-a format mult mai târziu, între 1820 și 1830. În trecut, Șiștarovățul s-a mai numit Dâmbu-Timișan. Pe ungurește i se spune Sistaróc, pe nemțește Schischtarowetz.',
      'Aici s-au născut doi oameni politici cunoscuți ai vremii lor. Sever Bocu (1874–1951) a fost redactor la ziarul „Tribuna” din Arad, deputat al Banatului și apoi ministru în guvernul lui Iuliu Maniu. Avocatul Ioan Suciu (1862–1939) a fost unul dintre organizatorii Marii Adunări Naționale de la Alba Iulia, din 1 decembrie 1918.',
      'În Cuveșdia și în Labașinț sunt bisericile ortodoxe ale satelor, iar în Șiștarovăț e o tabără școlară.',
    ],
    pastorAlt:
      'Acuarelă: un păstor bătrân în cămașă și ițari albi, cu căciulă neagră de blană, opinci și un toiag subțire.',
    pastor:
      'Păstor din Șiștarovăț, acuarelă de Théodore Valerio, semnată „Sistarovecz 1851”. Beaux-Arts de Paris. Domeniu public.',
    banatTitlu: 'În Banatul istoric',
    banat: [
      'Comuna ține de Banat, regiunea mărginită de Mureș, Tisa, Dunăre și de munții Poiana Ruscă și Retezat, împărțită astăzi între România, Serbia și Ungaria. Relieful Banatului coboară în trepte, de la munte la dealuri și apoi la câmpie.',
      'Șiștarovățul e în nordul regiunii, pe treapta de deal, aproape de Mureș. De pe Dealurile Lipovei se vede culoarul râului, iar Valea Mureșului e trecută printre atracțiile comunei.',
      'Oamenii trăiesc mai ales din pământ: livezi, vie, creșterea animalelor și prelucrarea lemnului.',
    ],
    judetAlt:
      'Harta județului Arad împărțit pe comune. Comuna Șiștarovăț e colorată cu negru, la marginea de sud a județului.',
    judet: 'Comuna Șiștarovăț, cu negru, între comunele județului Arad. Date ANCPI, licență Open Government.',
    categoriiMici: true,
    calup: (c) =>
      `Calupul are ${c.total} cadastrale, cu o suprafață totală de ${c.ha}. ${c.vanzare} sunt de vânzare și însumează ${c.haVanzare}: ${enumerare(c.categorii, 'și')}.`,
    butonHarta: 'Vezi parcelele pe hartă',
    butonLista: 'Lista celor de vânzare',
    surse:
      'Surse: Wikipedia, articolele despre comuna și satul Șiștarovăț și despre Banat; recensământul din 2021. Cifrele despre calup sunt calculate din exportul cadastral primit.',
  },

  en: {
    titlu: 'The area · Șiștarovăț, Arad County',
    descriere: 'Șiștarovăț commune in the Lipova Hills, in the historical Banat: villages, history, land.',
    h1: 'Șiștarovăț, in the Lipova Hills',
    lead: 'Șiștarovăț is a commune in the south of Arad County, Romania, 42 km from the city of Arad. It has four villages and 340 inhabitants on almost 123 km², fewer than three people per square kilometre. Forests cover more than 6,000 hectares, about half of the commune.',
    fisaAria: 'Commune facts',
    fisa: [
      ['County', 'Arad'],
      ['Villages', 'Șiștarovăț (seat), Cuveșdia, Labașinț, Varnița'],
      ['Area', '122.67 km²'],
      ['Population', '340, at the 2021 census'],
      ['Altitude', '195 m'],
      ['To Arad', '42 km'],
      ['First recorded', '1440'],
    ],
    hartaVecheAlt:
      'Hand-drawn map: the village of Șiștarovăț with its gardens coloured green, surrounded by wooded hills and fields ploughed in strips.',
    hartaVeche:
      'The village, marked “Sistarowitz”, on the Josephine military survey of the Banat, section 45, drawn between 1769 and 1772. Österreichisches Staatsarchiv, Kriegsarchiv. Public domain.',
    istoricTitlu: 'The villages and their people',
    istoric: [
      'Șiștarovăț and Cuveșdia appear in documents as early as 1440. Labașinț is first mentioned in 1477, while Varnița was founded much later, between 1820 and 1830. Șiștarovăț was once also called Dâmbu-Timișan. In Hungarian it is Sistaróc, in German Schischtarowetz.',
      'Two politicians well known in their time were born here. Sever Bocu (1874–1951) was an editor of the newspaper “Tribuna” in Arad, a deputy for the Banat and later a minister in Iuliu Maniu’s government. The lawyer Ioan Suciu (1862–1939) was one of the organisers of the Great National Assembly of Alba Iulia on 1 December 1918.',
      'Cuveșdia and Labașinț have the villages’ Orthodox churches, and Șiștarovăț has a school camp.',
    ],
    pastorAlt:
      'Watercolour: an old shepherd in a white shirt and white trousers, with a black fur cap, opinci sandals and a thin staff.',
    pastor:
      'Shepherd from Șiștarovăț, watercolour by Théodore Valerio, signed “Sistarovecz 1851”. Beaux-Arts de Paris. Public domain.',
    banatTitlu: 'In the historical Banat',
    banat: [
      'The commune belongs to the Banat, the region bounded by the Mureș, the Tisza, the Danube and the Poiana Ruscă and Retezat mountains, today divided between Romania, Serbia and Hungary. The land of the Banat descends in steps, from the mountains to the hills and then to the plain.',
      'Șiștarovăț lies in the north of the region, on the hill step, close to the Mureș. The Lipova Hills look over the river corridor, and the Mureș valley is listed among the commune’s attractions.',
      'People live mainly from the land: orchards, vineyards, livestock and woodworking.',
    ],
    judetAlt:
      'Map of Arad County divided into communes. Șiștarovăț commune is shaded black, on the southern edge of the county.',
    judet: 'Șiștarovăț commune, in black, among the communes of Arad County. ANCPI data, Open Government licence.',
    categoriiMici: true,
    calup: (c) =>
      `Calup 4 has ${c.total} with a total area of ${c.ha}. ${c.vanzare} are for sale, covering ${c.haVanzare} in all: ${enumerare(c.categorii, 'and')}.`,
    butonHarta: 'See the parcels on the map',
    butonLista: 'List of parcels for sale',
    surse:
      'Sources: Wikipedia, the articles on the commune and the village of Șiștarovăț and on the Banat; the 2021 census. The figures for Calup 4 are calculated from the cadastral export we received.',
  },

  de: {
    titlu: 'Die Gegend · Șiștarovăț, Kreis Arad',
    descriere: 'Die Gemeinde Șiștarovăț im Hügelland von Lipova, im historischen Banat: Dörfer, Geschichte, Land.',
    h1: 'Șiștarovăț, im Hügelland von Lipova',
    lead: 'Șiștarovăț ist eine Gemeinde im Süden des Kreises Arad in Rumänien, 42 km von der Stadt Arad entfernt. Zu ihr gehören vier Dörfer mit 340 Einwohnern auf knapp 123 km², weniger als drei Menschen pro Quadratkilometer. Der Wald bedeckt mehr als 6.000 Hektar, etwa die Hälfte der Gemeinde.',
    fisaAria: 'Steckbrief der Gemeinde',
    fisa: [
      ['Kreis', 'Arad'],
      ['Dörfer', 'Șiștarovăț (Sitz), Cuveșdia, Labașinț, Varnița'],
      ['Fläche', '122,67 km²'],
      ['Einwohner', '340, Volkszählung 2021'],
      ['Höhe', '195 m'],
      ['Bis Arad', '42 km'],
      ['Erste Erwähnung', '1440'],
    ],
    hartaVecheAlt:
      'Handgezeichnete Karte: das Dorf Șiștarovăț mit grün eingefärbten Gärten, umgeben von bewaldeten Hügeln und in Streifen gepflügten Feldern.',
    hartaVeche:
      'Das Dorf, eingetragen als „Sistarowitz“, auf der Josephinischen Landesaufnahme des Banats, Sektion 45, aufgenommen zwischen 1769 und 1772. Österreichisches Staatsarchiv, Kriegsarchiv. Gemeinfrei.',
    istoricTitlu: 'Die Dörfer und ihre Menschen',
    istoric: [
      'Șiștarovăț und Cuveșdia werden bereits 1440 urkundlich erwähnt. Labașinț erscheint zum ersten Mal 1477, Varnița entstand erst viel später, zwischen 1820 und 1830. Früher hieß Șiștarovăț auch Dâmbu-Timișan. Auf Deutsch heißt der Ort Schischtarowetz, auf Ungarisch Sistaróc.',
      'Zwei zu ihrer Zeit bekannte Politiker wurden hier geboren. Sever Bocu (1874–1951) war Redakteur der Zeitung „Tribuna“ in Arad, Abgeordneter des Banats und später Minister in der Regierung von Iuliu Maniu. Der Rechtsanwalt Ioan Suciu (1862–1939) gehörte zu den Organisatoren der Großen Nationalversammlung von Alba Iulia am 1. Dezember 1918.',
      'In Cuveșdia und Labașinț stehen die orthodoxen Kirchen der Dörfer, in Șiștarovăț gibt es ein Schullandheim.',
    ],
    pastorAlt:
      'Aquarell: ein alter Hirte in weißem Hemd und weißer Hose, mit schwarzer Pelzmütze, Opanken und einem dünnen Stab.',
    pastor:
      'Hirte aus Șiștarovăț, Aquarell von Théodore Valerio, signiert „Sistarovecz 1851“. Beaux-Arts de Paris. Gemeinfrei.',
    banatTitlu: 'Im historischen Banat',
    banat: [
      'Die Gemeinde gehört zum Banat, der Region zwischen Marosch, Theiß, Donau und den Gebirgen Poiana Ruscă und Retezat, die heute zwischen Rumänien, Serbien und Ungarn aufgeteilt ist. Das Land fällt in Stufen ab, vom Gebirge über das Hügelland bis in die Ebene.',
      'Șiștarovăț liegt im Norden der Region, auf der Hügelstufe, nahe der Marosch. Vom Hügelland von Lipova sieht man auf das Flusstal, und das Maroschtal zählt zu den Sehenswürdigkeiten der Gemeinde.',
      'Die Menschen leben vor allem vom Land: Obstgärten, Weinbau, Viehzucht und Holzverarbeitung.',
    ],
    judetAlt:
      'Karte des Kreises Arad, nach Gemeinden aufgeteilt. Die Gemeinde Șiștarovăț ist schwarz eingefärbt, am Südrand des Kreises.',
    judet: 'Die Gemeinde Șiștarovăț, schwarz, unter den Gemeinden des Kreises Arad. Daten ANCPI, Open-Government-Lizenz.',
    categoriiMici: false,
    calup: (c) =>
      `Calup 4 umfasst ${c.total} mit einer Gesamtfläche von ${c.ha}. ${c.vanzare} stehen zum Verkauf, zusammen ${c.haVanzare}: ${enumerare(c.categorii, 'und')}.`,
    butonHarta: 'Flurstücke auf der Karte ansehen',
    butonLista: 'Liste der Flurstücke zum Verkauf',
    surse:
      'Quellen: Wikipedia, die Artikel über die Gemeinde und das Dorf Șiștarovăț und über das Banat; Volkszählung 2021. Die Zahlen zu Calup 4 sind aus dem erhaltenen Katasterexport berechnet.',
  },
};

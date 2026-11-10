/**
 * Textul paginii despre zonă. Începe cu descrierea trimisă de client pe
 * WhatsApp pe 9 noiembrie 2026 („descrierea găsită de mine cu IA”), păstrată
 * cum a scris-o, fără emoji, cu ortografia îndreptată (liniuța din
 * „București–Nădlac”, minuscula după două puncte). Restul faptelor vin din
 * Wikipedia (articolele despre comuna și satul Șiștarovăț și despre Banat),
 * verificate pe 7 noiembrie 2026. Engleza și germana sunt traduceri ale
 * aceluiași text, fără nimic adăugat.
 * În germană râurile au numele germane (Marosch, Theiß), cum le știe cititorul.
 */
import type { Limba } from './limbi';
import { MARCA } from './text';

/** Descrierea clientului: secțiuni cu titlu, o frază de intrare și puncte „Etichetă: text”. */
export interface Descriere {
  intro: string;
  sectiuni: { titlu: string; intro?: string; puncte: [string, string][]; numerotat?: boolean }[];
  incheiere: string;
}

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
  descriereClient: Descriere;
  /** Fostul paragraf de deschidere, cu cifrele comunei; acum deschide secțiunea despre sate. */
  comuna: string;
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
  calupTitlu: string;
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
    titlu: `Zona · Șiștarovăț, jud. Arad · ${MARCA}`,
    descriere: 'Comuna Șiștarovăț, pe Dealurile Lipovei, în Banat: așezare, legături, potențial și istorie.',
    h1: 'Șiștarovăț – Oaza de dezvoltare și natură de la porțile Aradului',
    lead: 'Șiștarovăț reprezintă una dintre cele mai promițătoare și strategice micro-regiuni din județul Arad și întreaga zonă a Banatului. Amplasată într-un cadru natural deosebit, dar perfect conectată la arterele economice majore ale vestului României, această localitate oferă oportunități unice atât pentru proiecte rezidențiale ecologice, cât și pentru investiții industriale, logistice sau agricole.',
    descriereClient: {
      intro: 'Iată principalele argumente care transformă Șiștarovăț într-o destinație de top pentru achiziția de terenuri:',
      sectiuni: [
        {
          titlu: 'Poziționare geografică și conectivitate excelentă',
          intro:
            'Deși oferă liniștea și aerul curat specifice unei zone colinare, Șiștarovăț beneficiază de o proximitate strategică față de marile centre urbane și logistice din vestul țării:',
          puncte: [
            [
              'Distanțe reduse',
              'Localitatea se află la doar aproximativ 40 km de municipiul Arad și în jur de 60 km de Timișoara, cele două mari motoare economice ale regiunii.',
            ],
            [
              'Acces rapid la infrastructura europeană',
              'Poziționarea permite un acces facil la autostrada A1 (București–Nădlac), corelată direct cu rețeaua de autostrăzi din Ungaria și restul Europei de Vest. Acest lucru facilitează transportul rapid de mărfuri și deplasarea facilă a angajaților sau rezidenților.',
            ],
          ],
        },
        {
          titlu: 'Potențial rezidențial și ecoturism: calitatea vieții pe primul loc',
          intro:
            'Pentru cei interesați de parcele intravilane, Șiștarovăț devine rapid o destinație favorită pentru dezvoltări rezidențiale de tip „green living”, case de vacanță sau pensiuni:',
          puncte: [
            [
              'Peisaj colinar și natură virgină',
              'Zona este înconjurată de dealuri împădurite (Dealurile Lipovei), oferind un aer extrem de curat, un microclimat blând și un peisaj pitoresc, ferit de poluarea marilor aglomerări urbane.',
            ],
            [
              'Turism și relaxare',
              'Proximitatea față de stațiunea balneoclimaterică Lipova și mănăstirea Maria Radna adaugă o puternică valoare turistică zonei, ideală pentru proiecte de ospitalitate, glamping sau centre de recreere.',
            ],
          ],
        },
        {
          titlu: 'Oportunități industriale, logistice și agricole',
          intro:
            'Pentru investitorii interesați de parcele extravilane sau suprafețe mari de teren, Șiștarovăț oferă un teren fertil pentru afaceri sustenabile:',
          puncte: [
            [
              'Soluri fertile și relief favorabil',
              'Terenurile extravilane din zonă sunt excelente pentru agricultură, pomicultură, viticultură sau silvicultură, beneficiind de un istoric agricol bogat în Banat.',
            ],
            [
              'Spațiu pentru expansiune industrială ușoară',
              'Datorită prețurilor încă extrem de competitive ale terenurilor (comparativ cu periferia imediată a Aradului sau Timișoarei), Șiștarovăț este o opțiune excelentă pentru parcuri logistice de mici/medii dimensiuni, hale de producție nepoluantă sau facilități de depozitare care deservesc vestul țării.',
            ],
          ],
        },
        {
          titlu: 'De ce să cumperi o parcelă în Șiștarovăț chiar acum?',
          numerotat: true,
          puncte: [
            [
              'Costuri de achiziție atractive',
              'Terenurile din Șiștarovăț oferă în prezent un raport calitate-preț imbatabil în regiunea de vest, asigurând un potențial uriaș de apreciere a valorii pe termen mediu și lung.',
            ],
            [
              'Infrastructură locală în modernizare',
              'Autoritățile locale investesc constant în rețelele de utilități, drumuri și facilități, crescând atractivitatea și viabilitatea fiecărei parcele.',
            ],
            [
              'Comunitate primitoare și multiculturală',
              'Ca parte din Banat, localitatea se bucură de o atmosferă sigură, liniștită, deschisă către investitorii străini și perfect aliniată valorilor europene.',
            ],
          ],
        },
      ],
      incheiere:
        'Fie că îți dorești o parcelă intravilană pentru a construi casa visurilor tale în mijlocul naturii, fie că ești o companie europeană în căutare de teren extravilan pentru un proiect de anvergură, Șiștarovăț este locul unde investiția ta prinde rădăcini puternice.',
    },
    comuna: 'Șiștarovăț este o comună din sudul județului Arad, la 42 km de municipiul Arad. Are patru sate și 340 de locuitori pe aproape 123 km², adică mai puțin de trei oameni pe kilometru pătrat. Pădurile trec de 6.000 de hectare, cam jumătate din comună.',
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
    calupTitlu: 'Parcelele de pe hartă',
    calup: (c) =>
      `Pe hartă sunt ${c.total} cadastrale, cu o suprafață totală de ${c.ha}. ${c.vanzare} sunt de vânzare și însumează ${c.haVanzare}: ${enumerare(c.categorii, 'și')}.`,
    butonHarta: 'Vezi parcelele pe hartă',
    butonLista: 'Lista celor de vânzare',
    surse:
      'Descrierea de la început e textul primit de la vânzător. Surse pentru restul paginii: Wikipedia, articolele despre comuna și satul Șiștarovăț și despre Banat; recensământul din 2021. Cifrele despre parcele sunt calculate din exportul cadastral primit.',
  },

  en: {
    titlu: `The area · Șiștarovăț, Arad County · ${MARCA}`,
    descriere: 'Șiștarovăț commune in the Lipova Hills, in the Banat, Romania: location, connections, potential and history.',
    h1: 'Șiștarovăț – an oasis of growth and nature at the gates of Arad',
    lead: 'Șiștarovăț is one of the most promising and strategic micro-regions in Arad County and in the whole of the Banat. Set in exceptional natural surroundings, yet perfectly connected to the main economic arteries of western Romania, it offers unique opportunities both for eco-friendly residential projects and for industrial, logistics or agricultural investment.',
    descriereClient: {
      intro: 'Here are the main reasons that make Șiștarovăț a top destination for buying land:',
      sectiuni: [
        {
          titlu: 'Location and excellent connections',
          intro:
            'While it offers the peace and clean air of hill country, Șiștarovăț lies strategically close to the large urban and logistics centres of western Romania:',
          puncte: [
            [
              'Short distances',
              'Șiștarovăț is only about 40 km from the city of Arad and around 60 km from Timișoara, the two great economic engines of the region.',
            ],
            [
              'Fast access to European infrastructure',
              'The A1 motorway (Bucharest–Nădlac) is within easy reach and links directly to the motorway network of Hungary and the rest of Western Europe. This makes it easy to move goods quickly and for employees or residents to get around.',
            ],
          ],
        },
        {
          titlu: 'Residential and eco-tourism potential: quality of life first',
          intro:
            'For those interested in parcels inside the village boundary, Șiștarovăț is fast becoming a favourite for “green living” homes, holiday houses and guesthouses:',
          puncte: [
            [
              'Rolling hills and unspoilt nature',
              'The area is surrounded by wooded hills (the Lipova Hills), with very clean air, a mild microclimate and picturesque scenery, away from the pollution of large cities.',
            ],
            [
              'Tourism and leisure',
              'The nearby Lipova spa resort and the Maria Radna monastery add strong tourist value to the area, ideal for hospitality projects, glamping or leisure centres.',
            ],
          ],
        },
        {
          titlu: 'Industrial, logistics and agricultural opportunities',
          intro:
            'For investors interested in land outside the built-up area or in large plots, Șiștarovăț is fertile ground for sustainable business:',
          puncte: [
            [
              'Fertile soils and favourable terrain',
              'The agricultural land around here is excellent for farming, orchards, vineyards or forestry, with a rich farming history in the Banat.',
            ],
            [
              'Room for light industry',
              'Thanks to land prices that are still highly competitive (compared with the immediate outskirts of Arad or Timișoara), Șiștarovăț is an excellent option for small and medium logistics parks, clean manufacturing halls or storage facilities serving western Romania.',
            ],
          ],
        },
        {
          titlu: 'Why buy a parcel in Șiștarovăț now?',
          numerotat: true,
          puncte: [
            [
              'Attractive purchase costs',
              'Land in Șiștarovăț currently offers unbeatable value for money in western Romania, with huge potential for appreciation in the medium and long term.',
            ],
            [
              'Local infrastructure being modernised',
              'The local authorities invest steadily in utilities, roads and facilities, making every parcel more attractive and more viable.',
            ],
            [
              'A welcoming, multicultural community',
              'As part of the Banat, the village enjoys a safe, quiet atmosphere, open to foreign investors and fully in line with European values.',
            ],
          ],
        },
      ],
      incheiere:
        'Whether you want a parcel inside the village to build your dream home in the middle of nature, or you are a European company looking for land outside the built-up area for a major project, Șiștarovăț is where your investment puts down strong roots.',
    },
    comuna: 'Șiștarovăț is a commune in the south of Arad County, Romania, 42 km from the city of Arad. It has four villages and 340 inhabitants on almost 123 km², fewer than three people per square kilometre. Forests cover more than 6,000 hectares, about half of the commune.',
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
    calupTitlu: 'The parcels on the map',
    calup: (c) =>
      `The map shows ${c.total} with a total area of ${c.ha}. ${c.vanzare} are for sale, covering ${c.haVanzare} in all: ${enumerare(c.categorii, 'and')}.`,
    butonHarta: 'See the parcels on the map',
    butonLista: 'List of parcels for sale',
    surse:
      'The description at the top is the text we received from the seller. Sources for the rest of the page: Wikipedia, the articles on the commune and the village of Șiștarovăț and on the Banat; the 2021 census. The parcel figures are calculated from the cadastral export we received.',
  },

  de: {
    titlu: `Die Gegend · Șiștarovăț, Kreis Arad · ${MARCA}`,
    descriere: 'Die Gemeinde Șiștarovăț im Hügelland von Lipova, im Banat, Rumänien: Lage, Anbindung, Potenzial und Geschichte.',
    h1: 'Șiștarovăț – eine Oase für Entwicklung und Natur vor den Toren Arads',
    lead: 'Șiștarovăț gehört zu den vielversprechendsten und strategisch günstigsten Kleinregionen des Kreises Arad und des gesamten Banats. Der Ort liegt in einer besonderen Naturlandschaft und ist zugleich bestens an die großen Wirtschaftsachsen Westrumäniens angebunden. Er bietet einmalige Möglichkeiten für ökologische Wohnprojekte ebenso wie für Investitionen in Industrie, Logistik oder Landwirtschaft.',
    descriereClient: {
      intro: 'Die wichtigsten Gründe, warum Șiștarovăț zu den besten Adressen für den Grundstückskauf zählt:',
      sectiuni: [
        {
          titlu: 'Lage und hervorragende Anbindung',
          intro:
            'Șiștarovăț bietet die Ruhe und die saubere Luft des Hügellands und liegt doch strategisch nahe an den großen Städten und Logistikzentren im Westen des Landes:',
          puncte: [
            [
              'Kurze Wege',
              'Der Ort liegt nur etwa 40 km von der Stadt Arad und rund 60 km von Timișoara entfernt, den beiden großen Wirtschaftsmotoren der Region.',
            ],
            [
              'Schneller Anschluss an Europa',
              'Die Autobahn A1 (Bukarest–Nădlac) ist gut erreichbar und direkt mit dem Autobahnnetz Ungarns und Westeuropas verbunden. Das erleichtert den schnellen Warentransport und die Wege von Mitarbeitern und Bewohnern.',
            ],
          ],
        },
        {
          titlu: 'Wohnen und sanfter Tourismus: Lebensqualität zuerst',
          intro:
            'Für alle, die sich für Grundstücke innerhalb der Ortslage interessieren, wird Șiștarovăț schnell zu einer beliebten Adresse für „Green Living“, Ferienhäuser oder Pensionen:',
          puncte: [
            [
              'Hügelland und unberührte Natur',
              'Die Gegend ist von bewaldeten Hügeln umgeben (dem Hügelland von Lipova), mit sehr sauberer Luft, mildem Mikroklima und malerischer Landschaft, fern von der Luftverschmutzung der Großstädte.',
            ],
            [
              'Tourismus und Erholung',
              'Die Nähe zum Kurort Lipova und zum Kloster Maria Radna gibt der Gegend einen hohen touristischen Wert, ideal für Gastgewerbe, Glamping oder Freizeitanlagen.',
            ],
          ],
        },
        {
          titlu: 'Chancen für Industrie, Logistik und Landwirtschaft',
          intro:
            'Für Investoren, die Flächen außerhalb der Ortslage oder große Grundstücke suchen, bietet Șiștarovăț einen fruchtbaren Boden für nachhaltige Geschäfte:',
          puncte: [
            [
              'Fruchtbare Böden, günstiges Gelände',
              'Die landwirtschaftlichen Flächen der Gegend eignen sich hervorragend für Ackerbau, Obstbau, Weinbau oder Forstwirtschaft, mit einer reichen landwirtschaftlichen Tradition im Banat.',
            ],
            [
              'Raum für leichte Industrie',
              'Dank der noch äußerst günstigen Grundstückspreise (im Vergleich zum direkten Umland von Arad oder Timișoara) ist Șiștarovăț eine ausgezeichnete Wahl für kleine und mittlere Logistikparks, Hallen für emissionsarme Produktion oder Lagerflächen für den Westen Rumäniens.',
            ],
          ],
        },
        {
          titlu: 'Warum gerade jetzt ein Grundstück in Șiștarovăț kaufen?',
          numerotat: true,
          puncte: [
            [
              'Günstige Anschaffungskosten',
              'Grundstücke in Șiștarovăț bieten derzeit ein unschlagbares Preis-Leistungs-Verhältnis in Westrumänien, mit großem Wertsteigerungspotenzial auf mittlere und lange Sicht.',
            ],
            [
              'Örtliche Infrastruktur im Ausbau',
              'Die örtlichen Behörden investieren laufend in Versorgungsnetze, Straßen und Einrichtungen, was jedes Grundstück attraktiver und besser nutzbar macht.',
            ],
            [
              'Offene, multikulturelle Gemeinschaft',
              'Als Teil des Banats bietet der Ort eine sichere, ruhige Atmosphäre, offen für ausländische Investoren und ganz im Einklang mit europäischen Werten.',
            ],
          ],
        },
      ],
      incheiere:
        'Ob Sie ein Grundstück im Ort suchen, um mitten in der Natur Ihr Traumhaus zu bauen, oder als europäisches Unternehmen Land außerhalb der Ortslage für ein großes Projekt: In Șiștarovăț schlägt Ihre Investition starke Wurzeln.',
    },
    comuna: 'Șiștarovăț ist eine Gemeinde im Süden des Kreises Arad in Rumänien, 42 km von der Stadt Arad entfernt. Zu ihr gehören vier Dörfer mit 340 Einwohnern auf knapp 123 km², weniger als drei Menschen pro Quadratkilometer. Der Wald bedeckt mehr als 6.000 Hektar, etwa die Hälfte der Gemeinde.',
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
    calupTitlu: 'Die Flurstücke auf der Karte',
    calup: (c) =>
      `Die Karte zeigt ${c.total} mit einer Gesamtfläche von ${c.ha}. ${c.vanzare} stehen zum Verkauf, zusammen ${c.haVanzare}: ${enumerare(c.categorii, 'und')}.`,
    butonHarta: 'Flurstücke auf der Karte ansehen',
    butonLista: 'Liste der Flurstücke zum Verkauf',
    surse:
      'Die Beschreibung am Anfang ist der Text, den wir vom Verkäufer erhalten haben. Quellen für den Rest der Seite: Wikipedia, die Artikel über die Gemeinde und das Dorf Șiștarovăț und über das Banat; Volkszählung 2021. Die Zahlen zu den Flurstücken sind aus dem erhaltenen Katasterexport berechnet.',
  },
};

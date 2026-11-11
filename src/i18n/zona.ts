/**
 * Textul paginii despre zonă. Începe cu descrierea trimisă de client pe
 * WhatsApp pe 9 noiembrie 2026 („descrierea găsită de mine cu IA”), păstrată
 * cum a scris-o, fără emoji, cu ortografia îndreptată (liniuța din
 * „București–Nădlac”, minuscula după două puncte). Restul faptelor vin din
 * Wikipedia (articolele despre comuna și satul Șiștarovăț și despre Banat),
 * verificate pe 7 noiembrie 2026. Engleza și germana sunt traduceri ale
 * aceluiași text, fără nimic adăugat.
 * În germană râurile au numele germane (Marosch, Theiß), cum le știe cititorul.
 *
 * Istoria germanilor din Banat e documentul Word trimis de client pe WhatsApp
 * pe 11 noiembrie 2026, cu două hărți, păstrat cum l-a scris, cu ortografia
 * îndreptată. Două locuri sunt corectate după Wikipedia: la Oravița, documentul
 * spunea că primii 13 mineri tirolezi au venit în 1703, când Banatul era încă
 * otoman (coloniștii vin după 1717), iar „Haufeld” e Heufeld. Legendele
 * hărților sunt ale noastre și spun doar ce se vede pe ele.
 */
import type { Limba } from './limbi';
import { MARCA } from './text';

/** Descrierea clientului: secțiuni cu titlu, o frază de intrare și puncte „Etichetă: text”. */
export interface Descriere {
  intro: string;
  sectiuni: { titlu: string; intro?: string; puncte: [string, string][]; numerotat?: boolean }[];
  incheiere: string;
}

/** Istoria germanilor din Banat: zonele colonizate, apoi Șiștarovățul, fiecare parte cu harta ei. */
export interface Germani {
  titlu: string;
  intro: string;
  zoneTitlu: string;
  zoneIntro: string;
  zone: { titlu: string; intro: string; puncte: [string, string][] }[];
  sistarovatTitlu: string;
  sistarovat: string[];
  hartaBanatAlt: string;
  hartaBanat: string;
  hartaAproapeAlt: string;
  hartaAproape: string;
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
  germani: Germani;
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
    germani: {
      titlu: 'Istoria etnicilor germani din Banat',
      intro:
        'Istoria etnicilor germani din Banat (cunoscuți în zonele de șes ca șvabi bănățeni și în zonele muntoase ca germani montani) reprezintă una dintre cele mai fascinante pagini de colonizare din Europa Centrală și de Est. Prezența lor în regiune a început imediat după trecerea Banatului sub stăpânire habsburgică în anul 1716, prin alungarea otomanilor.',
      zoneTitlu: 'Zonele și localitățile unde s-au aflat germanii de-a lungul timpului',
      zoneIntro:
        'Colonizarea germană în Banat s-a desfășurat în mai multe valuri organizate de Imperiul Habsburgic sub trei monarhi diferiți: Valul Carolin (sub Carol al VI-lea, 1718–1740), Valul Terezian (sub Maria Tereza, 1744–1772) și Valul Iosefin (sub Iosif al II-lea, 1782–1787). Regiunea a fost împărțită geografic în funcție de specificul comunităților:',
      zone: [
        {
          titlu: 'Banatul de Șes (Câmpia Timișului) – șvabii bănățeni',
          intro:
            'Coloniștii din această zonă proveneau în mare parte din sudul Germaniei (Rin, Lorena, Palatinat, Alsacia). Aceștia au transformat zonele mlăștinoase în terenuri agricole extrem de productive.',
          puncte: [
            [
              'Timișoara (Temeswar)',
              'Capitala culturală și administrativă. A fost nucleul vieții urbane germane, cu cartiere întregi dominate de arhitectura de tip administrativ austriac.',
            ],
            [
              'Jimbolia (Hatzfeld)',
              'A devenit una dintre cele mai mari și dezvoltate așezări șvăbești din câmpie, recunoscută pentru industria de țiglă și ceramică.',
            ],
            [
              'Lenauheim (Tschatad)',
              'Un sat de referință culturală, fiind locul natal al celebrului poet romantic Nikolaus Lenau.',
            ],
            [
              'Biled (Billed), Săcălaz (Sackelhausen) și Sânandrei (Sankt Andreas)',
              'Localități rurale mari din jurul Timișoarei, colonizate intensiv în perioada tereziană, care păstrează structura stradală caracteristică, tip tablă de șah.',
            ],
            [
              'Charlottenburg',
              'Un caz unic în Banat, fiind singurul sat construit în formă circulară (sat rotund), conservat ca monument istoric.',
            ],
            ['Gottlob și Lovrin', 'Centre agricole prospere, renumite pentru tehnicile avansate de cultură a pământului.'],
          ],
        },
        {
          titlu: 'Banatul Montan (Caraș-Severin) – germanii montani',
          intro:
            'Spre deosebire de șvabi, coloniștii din zona montană erau în special mineri, metalurgiști și meșteșugari proveniți din regiunile miniere din Austria (Austria Superioară, Stiria, Tirol) sau Boemia.',
          puncte: [
            [
              'Oravița (Orawitz)',
              'Punctul de plecare al istoriei industriale germane în regiune. Primii mineri tirolezi s-au așezat aici imediat după alungarea otomanilor.',
            ],
            [
              'Reșița (Reschitza)',
              'S-a transformat dintr-un mic sat într-un uriaș centru metalurgic și siderurgic la nivel european, datorită inginerilor și muncitorilor germani aduși pentru prelucrarea fierului.',
            ],
            [
              'Anina (Steierdorf)',
              'Fondată de coloniști din regiunea Steiermark (Stiria). A devenit rapid un centru minier carbonifer major.',
            ],
            [
              'Dognecea (Dognatschka)',
              'O altă veche comunitate minieră unde extragerea cuprului și a zincului a fost dezvoltată direct de către comunitățile de specialiști germani.',
            ],
          ],
        },
        {
          titlu: 'Banatul Sârbesc (Voivodina, Serbia)',
          intro:
            'După Tratatul de la Trianon din 1920, Banatul istoric a fost împărțit, o treime revenind Serbiei. În această zonă au existat comunități germane masive până la al Doilea Război Mondial.',
          puncte: [
            [
              'Banatsko Veliko Selo',
              'O așezare formată din unificarea administrativă a trei foste sate pur germane: Sankt Hubert, Charleville și Seultour.',
            ],
            ['Novi Kozarci', 'Sat creat prin unirea fostelor sate șvăbești Heufeld și Mastort.'],
            [
              'Pančevo, Kikinda (Grosskikinda) și Vršac',
              'Orașe din Banatul sârbesc care adăposteau procente importante de populație germană urbană, implicată în comerț și meșteșuguri.',
            ],
          ],
        },
      ],
      sistarovatTitlu: 'Prezența în satul Șiștarovăț (Schischtarowetz) și comunitățile similare',
      sistarovat: [
        'În timp ce marile așezări din șesul și muntele Banatului au fost colonizate masiv și compact cu etnici germani, devenind localități majoritare, au existat și sate unde prezența germană a fost una minoritară, integrată în comunități predominant românești. Un exemplu perfect în acest sens este satul Șiștarovăț (Schischtarowetz), aflat astăzi în județul Arad, la granița istorică a Banatului montan și de șes.',
        'În secolele al XVIII-lea și al XIX-lea, după preluarea Banatului de către Coroana Habsburgică, un număr mic de germani s-au stabilit aici. Aceștia erau de obicei funcționari administrativi, pădurari, meșteșugari sau comercianți, trimiși pentru a gestiona resursele locale (cum ar fi prelucrarea lemnului din Dealurile Lipovei).',
        'Astfel, istoria germanilor din Banat nu se rezumă doar la satele mari „pur” germane, ci și la amprenta discretă lăsată în sate colinare și forestiere precum Șiștarovăț, unde câteva familii au contribuit preț de generații la modernizarea economică a zonei.',
      ],
      hartaBanatAlt:
        'Hartă a vestului Banatului, de la Jimbolia și Periam până la Bocșa și Anina, cu localitățile germane marcate cu verde și cu portocaliu. Șiștarovăț e marcat cu albastru, la nord-est de Timișoara.',
      hartaBanat:
        'Localitățile germane din Banat, cu numele lor nemțești: cu verde, satele șvabilor bănățeni, cu portocaliu, cele ale germanilor montani. Hartă primită de la vânzător.',
      hartaAproapeAlt:
        'Hartă între Arad, Lipova și Șiștarovăț: la vest de sat sunt marcate Mașloc (Blumenthal), Altringen și Bogda (Neuhof).',
      hartaAproape:
        'Pe hartă, cele mai apropiate sate germane de Șiștarovăț sunt Mașloc (Blumenthal), Altringen și Bogda (Neuhof). Hartă primită de la vânzător.',
    },
    categoriiMici: true,
    calupTitlu: 'Parcelele de pe hartă',
    calup: (c) =>
      `Pe hartă sunt ${c.total} cadastrale, cu o suprafață totală de ${c.ha}. ${c.vanzare} sunt de vânzare și însumează ${c.haVanzare}: ${enumerare(c.categorii, 'și')}.`,
    butonHarta: 'Vezi parcelele pe hartă',
    butonLista: 'Lista celor de vânzare',
    surse:
      'Descrierea de la început și istoria etnicilor germani din Banat, cu cele două hărți, sunt primite de la vânzător. Surse pentru restul paginii: Wikipedia, articolele despre comuna și satul Șiștarovăț și despre Banat; recensământul din 2021. Cifrele despre parcele sunt calculate din exportul cadastral primit.',
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
    germani: {
      titlu: 'The history of the ethnic Germans of the Banat',
      intro:
        'The history of the ethnic Germans of the Banat (known in the lowlands as Banat Swabians and in the mountains as Mountain Germans) is one of the most fascinating chapters of colonisation in Central and Eastern Europe. Their presence in the region began right after the Banat came under Habsburg rule in 1716, when the Ottomans were driven out.',
      zoneTitlu: 'The areas and places where Germans lived over time',
      zoneIntro:
        'German colonisation of the Banat took place in several waves organised by the Habsburg Empire under three different monarchs: the Caroline wave (under Charles VI, 1718–1740), the Theresian wave (under Maria Theresa, 1744–1772) and the Josephine wave (under Joseph II, 1782–1787). The region was divided geographically according to the character of its communities:',
      zone: [
        {
          titlu: 'The Banat lowlands (the Timiș Plain) – the Banat Swabians',
          intro:
            'The settlers in this area came mostly from southern Germany (the Rhine, Lorraine, the Palatinate, Alsace). They turned marshland into highly productive farmland.',
          puncte: [
            [
              'Timișoara (Temeswar)',
              'The cultural and administrative capital. It was the heart of German urban life, with whole districts dominated by Austrian administrative architecture.',
            ],
            [
              'Jimbolia (Hatzfeld)',
              'It became one of the largest and most developed Swabian settlements on the plain, known for its roof tile and ceramics industry.',
            ],
            [
              'Lenauheim (Tschatad)',
              'A village of cultural importance, as the birthplace of the famous Romantic poet Nikolaus Lenau.',
            ],
            [
              'Biled (Billed), Săcălaz (Sackelhausen) and Sânandrei (Sankt Andreas)',
              'Large rural settlements around Timișoara, intensively colonised in the Theresian period, which keep their characteristic chessboard street pattern.',
            ],
            [
              'Charlottenburg',
              'A unique case in the Banat, as the only village built in a circle (a round village), preserved as a historic monument.',
            ],
            ['Gottlob and Lovrin', 'Prosperous farming centres, renowned for their advanced methods of working the land.'],
          ],
        },
        {
          titlu: 'The Banat Mountains (Caraș-Severin) – the Mountain Germans',
          intro:
            'Unlike the Swabians, the settlers in the mountains were mainly miners, metalworkers and craftsmen from the mining regions of Austria (Upper Austria, Styria, Tyrol) or Bohemia.',
          puncte: [
            [
              'Oravița (Orawitz)',
              'The starting point of German industrial history in the region. The first Tyrolean miners settled here right after the Ottomans were driven out.',
            ],
            [
              'Reșița (Reschitza)',
              'It grew from a small village into a huge metallurgical and steelmaking centre of European standing, thanks to the German engineers and workers brought in to work the iron.',
            ],
            [
              'Anina (Steierdorf)',
              'Founded by settlers from Styria (Steiermark). It soon became a major coal mining centre.',
            ],
            [
              'Dognecea (Dognatschka)',
              'Another old mining community, where copper and zinc mining was developed directly by communities of German specialists.',
            ],
          ],
        },
        {
          titlu: 'The Serbian Banat (Vojvodina, Serbia)',
          intro:
            'After the Treaty of Trianon in 1920, the historical Banat was divided, with a third going to Serbia. Large German communities lived in this area until the Second World War.',
          puncte: [
            [
              'Banatsko Veliko Selo',
              'A settlement formed by the administrative merger of three formerly purely German villages: Sankt Hubert, Charleville and Seultour.',
            ],
            ['Novi Kozarci', 'A village created by joining the former Swabian villages of Heufeld and Mastort.'],
            [
              'Pančevo, Kikinda (Grosskikinda) and Vršac',
              'Towns in the Serbian Banat with a sizeable urban German population, active in trade and crafts.',
            ],
          ],
        },
      ],
      sistarovatTitlu: 'Germans in Șiștarovăț (Schischtarowetz) and similar communities',
      sistarovat: [
        'While the large settlements of the Banat plain and mountains were colonised heavily and compactly by ethnic Germans and became German-majority places, there were also villages where Germans were a minority, part of predominantly Romanian communities. A perfect example is the village of Șiștarovăț (Schischtarowetz), today in Arad County, on the historical border between the mountain and the lowland Banat.',
        'In the 18th and 19th centuries, after the Banat passed to the Habsburg Crown, a small number of Germans settled here. They were usually administrative officials, foresters, craftsmen or merchants, sent to manage local resources (such as timber from the Lipova Hills).',
        'So the history of the Banat Germans is not only about the large, “purely” German villages, but also about the discreet mark left on hill and forest villages such as Șiștarovăț, where a few families helped modernise the local economy for generations.',
      ],
      hartaBanatAlt:
        'Map of the western Banat, from Jimbolia and Periam to Bocșa and Anina, with German settlements marked in green and orange. Șiștarovăț is marked in blue, north-east of Timișoara.',
      hartaBanat:
        'German settlements in the Banat with their German names: in green, the villages of the Banat Swabians; in orange, those of the Mountain Germans. Map from the seller.',
      hartaAproapeAlt:
        'Map between Arad, Lipova and Șiștarovăț: west of the village, Mașloc (Blumenthal), Altringen and Bogda (Neuhof) are marked.',
      hartaAproape:
        'On the map, the German villages closest to Șiștarovăț are Mașloc (Blumenthal), Altringen and Bogda (Neuhof). Map from the seller.',
    },
    categoriiMici: true,
    calupTitlu: 'The parcels on the map',
    calup: (c) =>
      `The map shows ${c.total} with a total area of ${c.ha}. ${c.vanzare} are for sale, covering ${c.haVanzare} in all: ${enumerare(c.categorii, 'and')}.`,
    butonHarta: 'See the parcels on the map',
    butonLista: 'List of parcels for sale',
    surse:
      'The description at the top and the history of the ethnic Germans of the Banat, with its two maps, come from the seller. Sources for the rest of the page: Wikipedia, the articles on the commune and the village of Șiștarovăț and on the Banat; the 2021 census. The parcel figures are calculated from the cadastral export we received.',
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
    germani: {
      titlu: 'Die Geschichte der Deutschen im Banat',
      intro:
        'Die Geschichte der Deutschen im Banat (in der Ebene als Banater Schwaben, im Bergland als Berglanddeutsche bekannt) gehört zu den faszinierendsten Kapiteln der Kolonisation in Mittel- und Osteuropa. Ihre Anwesenheit in der Region begann unmittelbar, nachdem das Banat 1716 mit der Vertreibung der Osmanen unter habsburgische Herrschaft gekommen war.',
      zoneTitlu: 'Gebiete und Orte, in denen im Lauf der Zeit Deutsche lebten',
      zoneIntro:
        'Die deutsche Kolonisation des Banats verlief in mehreren Wellen, die das Habsburgerreich unter drei verschiedenen Herrschern organisierte: der Karolinische Schwabenzug (unter Karl VI., 1718–1740), der Theresianische (unter Maria Theresia, 1744–1772) und der Josephinische (unter Joseph II., 1782–1787). Geografisch gliederte sich die Region nach der Eigenart der Gemeinschaften:',
      zone: [
        {
          titlu: 'Die Banater Ebene (Temesch-Ebene) – die Banater Schwaben',
          intro:
            'Die Siedler in diesem Gebiet stammten großenteils aus Süddeutschland (Rhein, Lothringen, Pfalz, Elsass). Sie verwandelten Sumpfland in äußerst ertragreiches Ackerland.',
          puncte: [
            [
              'Timișoara (Temeswar)',
              'Die kulturelle und administrative Hauptstadt. Sie war das Zentrum des deutschen städtischen Lebens, mit ganzen Vierteln, die von österreichischer Verwaltungsarchitektur geprägt sind.',
            ],
            [
              'Jimbolia (Hatzfeld)',
              'Sie wurde zu einer der größten und am weitesten entwickelten schwäbischen Siedlungen der Ebene, bekannt für ihre Ziegel- und Keramikindustrie.',
            ],
            [
              'Lenauheim (Tschatad)',
              'Ein Dorf von kultureller Bedeutung, Geburtsort des berühmten romantischen Dichters Nikolaus Lenau.',
            ],
            [
              'Biled (Billed), Săcălaz (Sackelhausen) und Sânandrei (Sankt Andreas)',
              'Große Dörfer rund um Timișoara, in theresianischer Zeit dicht besiedelt, die ihr typisches schachbrettartiges Straßennetz bewahrt haben.',
            ],
            [
              'Charlottenburg',
              'Ein Einzelfall im Banat: das einzige kreisförmig angelegte Dorf (Runddorf), als historisches Denkmal erhalten.',
            ],
            ['Gottlob und Lovrin', 'Wohlhabende landwirtschaftliche Zentren, bekannt für fortschrittliche Methoden der Bodenbearbeitung.'],
          ],
        },
        {
          titlu: 'Das Banater Bergland (Caraș-Severin) – die Berglanddeutschen',
          intro:
            'Anders als die Schwaben waren die Siedler im Bergland vor allem Bergleute, Hüttenarbeiter und Handwerker aus den Bergbaugebieten Österreichs (Oberösterreich, Steiermark, Tirol) oder aus Böhmen.',
          puncte: [
            [
              'Oravița (Orawitz)',
              'Der Ausgangspunkt der deutschen Industriegeschichte in der Region. Die ersten Tiroler Bergleute ließen sich hier gleich nach der Vertreibung der Osmanen nieder.',
            ],
            [
              'Reșița (Reschitza)',
              'Aus einem kleinen Dorf wurde ein riesiges Hütten- und Stahlzentrum von europäischem Rang, dank der deutschen Ingenieure und Arbeiter, die für die Eisenverarbeitung geholt wurden.',
            ],
            [
              'Anina (Steierdorf)',
              'Von Siedlern aus der Steiermark gegründet. Der Ort wurde rasch zu einem bedeutenden Kohlebergbauzentrum.',
            ],
            [
              'Dognecea (Dognatschka)',
              'Eine weitere alte Bergbaugemeinde, in der der Abbau von Kupfer und Zink direkt von deutschen Fachleuten aufgebaut wurde.',
            ],
          ],
        },
        {
          titlu: 'Das serbische Banat (Vojvodina, Serbien)',
          intro:
            'Nach dem Vertrag von Trianon 1920 wurde das historische Banat geteilt, ein Drittel fiel an Serbien. In diesem Gebiet gab es bis zum Zweiten Weltkrieg große deutsche Gemeinschaften.',
          puncte: [
            [
              'Banatsko Veliko Selo',
              'Ein Ort, der durch den administrativen Zusammenschluss von drei ehemals rein deutschen Dörfern entstand: Sankt Hubert, Charleville und Seultour.',
            ],
            ['Novi Kozarci', 'Ein Dorf, das aus dem Zusammenschluss der ehemaligen schwäbischen Dörfer Heufeld und Mastort hervorging.'],
            [
              'Pančevo, Kikinda (Großkikinda) und Vršac',
              'Städte im serbischen Banat mit einem bedeutenden Anteil deutscher Stadtbevölkerung, die in Handel und Handwerk tätig war.',
            ],
          ],
        },
      ],
      sistarovatTitlu: 'Deutsche in Șiștarovăț (Schischtarowetz) und ähnlichen Gemeinden',
      sistarovat: [
        'Während die großen Siedlungen in der Ebene und im Bergland des Banats dicht und geschlossen von Deutschen besiedelt wurden und zu deutschen Mehrheitsorten wurden, gab es auch Dörfer, in denen die Deutschen eine Minderheit waren, eingebunden in überwiegend rumänische Gemeinschaften. Ein perfektes Beispiel dafür ist das Dorf Șiștarovăț (Schischtarowetz), heute im Kreis Arad, an der historischen Grenze zwischen Banater Bergland und Ebene.',
        'Im 18. und 19. Jahrhundert, nachdem das Banat an die Habsburger Krone gefallen war, ließ sich hier eine kleine Zahl Deutscher nieder. Meist waren es Verwaltungsbeamte, Förster, Handwerker oder Kaufleute, die die örtlichen Ressourcen verwalten sollten (etwa die Holzverarbeitung im Hügelland von Lipova).',
        'Die Geschichte der Banater Deutschen beschränkt sich also nicht auf die großen „rein“ deutschen Dörfer, sondern umfasst auch die stillen Spuren in Hügel- und Walddörfern wie Șiștarovăț, wo einige Familien über Generationen zur wirtschaftlichen Modernisierung der Gegend beitrugen.',
      ],
      hartaBanatAlt:
        'Karte des westlichen Banats, von Jimbolia und Periam bis Bocșa und Anina, mit deutschen Orten in Grün und Orange. Șiștarovăț ist blau markiert, nordöstlich von Timișoara.',
      hartaBanat:
        'Deutsche Orte im Banat mit ihren deutschen Namen: grün die Dörfer der Banater Schwaben, orange die der Berglanddeutschen. Karte vom Verkäufer.',
      hartaAproapeAlt:
        'Karte zwischen Arad, Lipova und Șiștarovăț: westlich des Dorfes sind Mașloc (Blumenthal), Altringen und Bogda (Neuhof) markiert.',
      hartaAproape:
        'Die deutschen Dörfer, die auf der Karte Șiștarovăț am nächsten liegen: Mașloc (Blumenthal), Altringen und Bogda (Neuhof). Karte vom Verkäufer.',
    },
    categoriiMici: false,
    calupTitlu: 'Die Flurstücke auf der Karte',
    calup: (c) =>
      `Die Karte zeigt ${c.total} mit einer Gesamtfläche von ${c.ha}. ${c.vanzare} stehen zum Verkauf, zusammen ${c.haVanzare}: ${enumerare(c.categorii, 'und')}.`,
    butonHarta: 'Flurstücke auf der Karte ansehen',
    butonLista: 'Liste der Flurstücke zum Verkauf',
    surse:
      'Die Beschreibung am Anfang und die Geschichte der Deutschen im Banat mit den beiden Karten stammen vom Verkäufer. Quellen für den Rest der Seite: Wikipedia, die Artikel über die Gemeinde und das Dorf Șiștarovăț und über das Banat; Volkszählung 2021. Die Zahlen zu den Flurstücken sind aus dem erhaltenen Katasterexport berechnet.',
  },
};

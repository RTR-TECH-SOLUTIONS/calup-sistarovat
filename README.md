# Grundstücke Banat Rumänien · Șiștarovăț

Previzualizare pentru un client: parcelele cadastrale din comuna Șiștarovăț
(jud. Arad), cu cele de vânzare evidențiate. Datele sunt ale calupului 4, dar pe
site nu scrie „Calup 4”: clientul a cerut pe 10 noiembrie să apară Șiștarovăț peste tot. Publicată la
https://demo.mrwebsites.ro/calup-sistarovat/. Domeniul cerut de client pentru
lansare: `grundstuecke-banat-rumaenien.com` (liber la 10 noiembrie 2026, încă necumpărat).

Antetul, pe toate paginile, urmează cererea clientului: sigla stânga sus, lângă ea
„Grundstücke Banat Rumänien”, limbile în ordinea DE EN RO și meniul. Semnul din
siglă e redesenat vectorial în `src/components/Sigla.astro` (și `public/favicon.svg`)
după imaginea primită; numele e text, cu Montserrat ca în siglă.

## Pagini

Site-ul e în română, engleză și germană. Româna stă în rădăcină, celelalte sub
`/en/` și `/de/`, cu adrese traduse. Harta adreselor e în `src/i18n/limbi.ts`;
fișierele din `src/pages/` doar aleg vederea (`src/vederi/`) și limba.

| Pagina | RO | EN | DE |
| --- | --- | --- | --- |
| Despre noi | `/despre-noi/` | `/en/about/` | `/de/ueber-uns/` |
| Harta (`?cad=<nr. cadastral>` deschide parcela) | `/` | `/en/` | `/de/` |
| Lista parcelelor | `/parcele/` | `/en/parcels/` | `/de/flurstuecke/` |
| Zona | `/zona/` | `/en/area/` | `/de/gegend/` |
| Articole | `/articole/` | `/en/articles/` | `/de/artikel/` |
| Întrebări frecvente | `/intrebari-frecvente/` | `/en/faq/` | `/de/faq/` |
| Contact (`?cad=` completează numărul) | `/contact/` | `/en/contact/` | `/de/kontakt/` |
| Confidențialitate | `/confidentialitate/` | `/en/privacy/` | `/de/datenschutz/` |
| Termeni | `/termeni/` | `/en/terms/` | `/de/nutzungsbedingungen/` |
| Cookies | `/cookies/` | `/en/cookies/` | `/de/cookies/` |

- Textele interfeței: `src/i18n/text.ts`. Pagina zonei: `src/i18n/zona.ts`. Începe cu
  descrierea trimisă de client (păstrată cum a scris-o, fără emoji, tradusă în EN și
  DE), apoi vin fapte din Wikipedia (comuna și satul Șiștarovăț, Banatul). Imaginile ei sunt de pe
  Wikimedia Commons: harta iosefină și acuarela lui Valerio în domeniul public,
  harta județului cu date ANCPI, sub licența Open Government.
- Lista e scrisă în HTML la build, cu căutare, filtre și sortare
  (`src/scripts/lista.ts`). Filtrele stau în adresă, de exemplu
  `/parcele/?stare=vanzare&categorie=arabil`, și rămân la schimbarea limbii.
- „Despre noi” (`src/i18n/despre.ts`) și întrebările frecvente (`src/i18n/faq.ts`) iau
  prețurile din `src/lib/oferta.ts` (vânzare de la 1 €/m², concesiune de la
  0,06 €/m² pe an, cum le-a dat clientul) și cifrele din date (`src/lib/statistici.ts`).
  Prețul se schimbă doar în `oferta.ts`. Planul parcelelor de pe „Despre noi” e
  `/plan-calup.svg`, generat la build (`src/lib/plan.ts`).
- Articolele sunt fișiere Markdown în `src/content/articole/<limbă>/`; formatul e în
  README-ul de acolo. Cât timp nu e niciunul, lista spune că apar în curând, iar
  build-ul avertizează că n-a găsit fișiere. Clientul trimite textele.
- Contactul nu are server: formularul compune mesajul și deschide WhatsApp sau
  programul de email. Butonul „Sună” folosește numărul din Germania, cum a cerut clientul.

## Date de contact și paginile legale

Numele, emailul, telefoanele (România, pe care e și WhatsApp-ul, și Germania) și, dacă
e cazul, firma vânzătorului stau în `src/lib/contact.ts`. Ce lipsește apare pe site
marcat cu galben („de completat”) și build-ul listează în consolă. Vânzătorul e
„George”, cum a cerut clientul; pentru paginile legale ar trebui numele complet.

Textele legale (`src/i18n/legal.ts`) descriu site-ul așa cum e acum: fără
cookie-uri, fără analytics, fonturi servite de pe site (Astro le descarcă la
build), harta de la Mapbox. De aceea nu există banner de cookies. Dacă se adaugă
statistici sau alt serviciu extern, se schimbă și textele, și apare bannerul.

## Date

`public/date/calup4.geojson` se generează din exportul KML (QGIS) primit de la client:

```
npm run date -- "<cale spre fișier.kml>"
```

Scriptul păstrează doar datele cadastrale (nr. cadastral, tarla, parcelă,
suprafață, categorie). Numele proprietarilor și actele de posesie din KML nu
ajung pe site, iar KML-ul nu intră în repo.

Parcelele de vânzare sunt cele cu „da” în coloana `Vichente` din KML. Semnificația
coloanei trebuie confirmată cu clientul.

## Rulare

```
npm install
npm run dev
```

Fundalul e Mapbox dacă există `PUBLIC_MAPBOX_TOKEN` în `.env` (local) sau în
secretele repo-ului (CI). Fără el, harta cade pe fundalul propriu și pe Esri.

# Calup 4 · Șiștarovăț

Previzualizare pentru un client: parcelele cadastrale ale calupului 4 din comuna
Șiștarovăț (jud. Arad), cu cele de vânzare evidențiate. Publicată la
https://demo.mrwebsites.ro/calup-sistarovat/

## Pagini

Site-ul e în română, engleză și germană. Româna stă în rădăcină, celelalte sub
`/en/` și `/de/`, cu adrese traduse. Harta adreselor e în `src/i18n/limbi.ts`;
fișierele din `src/pages/` doar aleg vederea (`src/vederi/`) și limba.

| Pagina | RO | EN | DE |
| --- | --- | --- | --- |
| Harta (`?cad=<nr. cadastral>` deschide parcela) | `/` | `/en/` | `/de/` |
| Lista parcelelor | `/parcele/` | `/en/parcels/` | `/de/flurstuecke/` |
| Despre zonă | `/zona/` | `/en/area/` | `/de/gegend/` |
| Contact (`?cad=` completează numărul) | `/contact/` | `/en/contact/` | `/de/kontakt/` |
| Confidențialitate | `/confidentialitate/` | `/en/privacy/` | `/de/datenschutz/` |
| Termeni | `/termeni/` | `/en/terms/` | `/de/nutzungsbedingungen/` |
| Cookies | `/cookies/` | `/en/cookies/` | `/de/cookies/` |

- Textele interfeței: `src/i18n/text.ts`. Pagina zonei: `src/i18n/zona.ts`, cu fapte
  din Wikipedia (comuna și satul Șiștarovăț, Banatul). Imaginile ei sunt de pe
  Wikimedia Commons: harta iosefină și acuarela lui Valerio în domeniul public,
  harta județului cu date ANCPI, sub licența Open Government.
- Lista e scrisă în HTML la build, cu căutare, filtre și sortare
  (`src/scripts/lista.ts`). Filtrele stau în adresă, de exemplu
  `/parcele/?stare=vanzare&categorie=arabil`, și rămân la schimbarea limbii.
- Contactul nu are server: formularul compune mesajul și deschide WhatsApp.

## Date de contact și paginile legale

Numele, emailul și, dacă e cazul, firma vânzătorului se completează în
`src/lib/contact.ts`. Până atunci apar pe site marcate cu galben („de completat”)
și build-ul le listează în consolă.

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

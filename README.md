# Calup 4 · Șiștarovăț

Previzualizare pentru un client: parcelele cadastrale ale calupului 4 din comuna
Șiștarovăț (jud. Arad), cu cele de vânzare evidențiate. Publicată la
https://demo.mrwebsites.ro/calup-sistarovat/

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

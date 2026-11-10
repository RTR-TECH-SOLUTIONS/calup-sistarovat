# Articole

Fiecare articol e un fișier Markdown, în dosarul limbii lui:

```
src/content/articole/ro/teren-de-vanzare-sistarovat.md   ->  /articole/teren-de-vanzare-sistarovat/
src/content/articole/de/grundstueck-kaufen-banat.md       ->  /de/artikel/grundstueck-kaufen-banat/
src/content/articole/en/land-for-sale-banat.md            ->  /en/articles/land-for-sale-banat/
```

Numele fișierului devine adresa paginii: litere mici, fără diacritice, cu
cratimă între cuvinte. La început, între liniile `---`:

```markdown
---
titlu: Teren de vânzare în Șiștarovăț
descriere: Una-două fraze. Apar în lista de articole și în rezultatele Google.
data: 2026-11-10
cheie: teren-sistarovat   # opțional, vezi mai jos
---

Textul articolului. ## pentru subtitluri, - pentru liste.
```

Un articol tradus are același nume de fișier în fiecare limbă, iar DE / EN / RO
din antet duc de la o variantă la alta. Dacă numele diferă, de pildă pentru că
adresa e tradusă, toate variantele primesc aceeași `cheie`. Un articol fără
traducere trimite, la schimbarea limbii, la lista de articole.

Acest README nu apare pe site: se citesc doar fișierele din `ro/`, `en/` și `de/`.

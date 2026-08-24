# SEO & Reviews — technische documentatie

Dit document beschrijft hoe de SEO-opzet van deze site werkt, waar je wat
aanpast, en welke acties er buiten de code nog nodig zijn.

---

## 1. Waarom Google pagina's niet indexeerde

De site is een React SPA (Vite). In `vercel.json` stond een catch-all rewrite die
**elke** URL doorstuurde naar `index.html`:

```json
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
```

Gevolg:

| Symptoom in Search Console | Oorzaak |
| --- | --- |
| **Soft 404** | Onbekende URL's gaven HTTP **200** met een lege SPA-shell. Google ziet een pagina zonder inhoud die wél 200 zegt: dat heet een soft 404. |
| **Crawled – currently not indexed** | Elke URL leverde identieke HTML: dezelfde `<title>`, dezelfde description, dezelfde canonical, en een lege `<div id="root">`. Voor Google waren alle pagina's duplicaten van elkaar. |
| **Not found (404)** | Vóór de rewrite bestonden `/diensten`, `/contact` etc. niet als bestand en gaven ze een echte 404. |

Alle drie zijn nu bij de bron opgelost.

## 2. Hoe het nu werkt: statische prerender

`npm run build` doet drie dingen:

1. `vite build` → de gewone client-bundle in `dist/`.
2. `vite build --ssr src/entry-server.tsx --outDir dist-ssr` → dezelfde React-app,
   maar bruikbaar in Node.
3. `node scripts/prerender.mjs` → rendert elke route uit `src/lib/routes.ts` naar
   een **echt HTML-bestand** met volledige inhoud en de juiste head-tags.

Resultaat in `dist/`:

```
index.html                     → /
diensten.html                  → /diensten
diensten/schuifpui-reparatie.html
werkgebieden/amsterdam.html
beoordelingen.html
404.html                       → alles wat niet bestaat (echte HTTP 404)
sitemap.xml                    → alleen 200 OK, indexeerbare URL's
robots.txt                     → verwijst naar sitemap.xml
```

Bezoekers krijgen dus direct leesbare HTML (sneller, en crawlbaar zonder
JavaScript). Daarna hydrateert React en werkt de site verder als SPA. Bij
client-side navigatie houdt `src/components/Seo.tsx` de head-tags gelijk aan de
route.

## 3. Waar pas ik wat aan?

| Wil je... | Bewerk dan |
| --- | --- |
| Bedrijfsgegevens, telefoonnummer, adres, Google-review link | `src/lib/site.ts` |
| Meta title/description van een vaste pagina | `src/lib/routes.ts` |
| Tekst, meta en FAQ van een dienstpagina | `src/content/services.ts` |
| Tekst, meta en FAQ van een werkgebiedpagina | `src/content/cities.ts` |
| Gecontroleerde reviews (site én schema.org) | `src/content/reviews.ts` |
| Ingestuurde reviews beheren of modereren | Supabase-dashboard, zie [REVIEWS.md](REVIEWS.md) |
| Structured data (schema.org) | `src/lib/schema.ts` |
| Redirects voor oude URL's | `src/lib/redirects.ts` **én** `vercel.json` |

Een nieuwe dienst of stad toevoegen in `src/content/` is genoeg: de route, de
sitemap-entry, het prerenderde HTML-bestand, de interne links en het
Service-schema volgen automatisch.

### Een 404 uit Search Console oplossen

Staat er een URL in het rapport "Niet gevonden (404)" die ergens naartoe moet?
Voeg één regel toe aan `src/lib/redirects.ts` **en** dezelfde regel aan
`vercel.json` (`{"source": "...", "destination": "...", "statusCode": 301}`).
De build faalt als de twee lijsten uiteenlopen, dus vergeten kan niet.

## 4. Reviews

### Waar staat de knop?

De knop **"Schrijf een review"** staat in de footer (dus op elke pagina), in de
sectie *Wat Onze Klanten Zeggen* op de homepage, op `/beoordelingen`, op elke
werkgebiedpagina met reviews en op *Over Ons*.

### Wat gebeurt er bij versturen?

De review gaat naar een Supabase-database en is daarmee direct voor álle
bezoekers zichtbaar, zonder nieuwe deploy. Tegelijk opent het
Google-bedrijfsprofiel in een nieuw tabblad.

**Het instellen van Supabase, het beheren van reviews en het aanzetten van
moderatie staat in [REVIEWS.md](REVIEWS.md).** Zolang de
omgevingsvariabelen niet zijn ingevuld, valt het formulier terug op opslag in de
browser van de bezoeker, zodat de site altijd blijft werken.

### Waarom ingestuurde reviews niet in de structured data staan

De `aggregateRating` in de JSON-LD blijft berekend over `src/content/reviews.ts`,
de door ons gecontroleerde lijst. Reviews uit de database komen er via
JavaScript bij en zijn niet geverifieerd; zou het gemiddelde in de markup daarop
gebaseerd zijn, dan wijkt de markup af van wat Googlebot in de geprerenderde HTML
ziet — precies waar Google rich-result-sancties voor uitdeelt.
`src/test/seo.test.ts` bewaakt dit.

Gevolg: op een pagina met ingestuurde reviews staat een ander gemiddelde dan in
de (onzichtbare) JSON-LD. Dat is bewust en heeft geen effect op de
zoekresultaten. Wil je een ingestuurde review wél laten meetellen, neem hem dan
over in `src/content/reviews.ts`.

## 5. Structured data

Op elke pagina staat:

- `HomeAndConstructionBusiness` + `LocalBusiness` met NAP-gegevens, geo,
  openingstijden, `areaServed` (alle steden + Nederland), dienstencatalogus,
  `aggregateRating` en alle `review`-objecten;
- `WebSite`;
- `BreadcrumbList`.

Aanvullend: `Service` + `FAQPage` op dienst- en werkgebiedpagina's, `FAQPage`
op de homepage en `ItemList` met reviews op `/beoordelingen`.

Controleren kan met de [Rich Results Test](https://search.google.com/test/rich-results).

## 6. Actiepunten buiten de code

1. **Controleer het canonieke domein.** De hele site gaat uit van
   `https://www.schuifpuiservicenederland.nl` (`SITE_URL` in `src/lib/site.ts`).
   Zet in Vercel → Settings → Domains **www** als *Primary Domain*. Staat daar nu
   het domein zónder www als primair, kies dan één van beide:
   - zet www als primair (aanbevolen, niets in de code hoeft te wijzigen), of
   - wijzig `SITE_URL` naar `https://schuifpuiservicenederland.nl` en draai de
     host-redirect in `vercel.json` om.

   Doe je geen van beide, dan redirecten Vercel en `vercel.json` naar elkaar en
   ontstaat er een redirect-loop. De test in `src/test/seo.test.ts` controleert
   dat code en `vercel.json` het in elk geval onderling eens zijn.
2. **Dien de sitemap opnieuw in** in Google Search Console:
   `https://www.schuifpuiservicenederland.nl/sitemap.xml`, en vraag via
   URL-inspectie indexering aan voor de nieuwe dienst- en werkgebiedpagina's.
3. **Zet Supabase op** volgens [REVIEWS.md](REVIEWS.md), zodat ingestuurde
   reviews voor alle bezoekers zichtbaar worden. Zonder die stap blijft een
   review in de browser van de inzender hangen.
4. **Vul de Google Place ID in.** Zet in `src/lib/site.ts` de `GOOGLE_PLACE_ID`
   van het bedrijfsprofiel. Bezoekers landen dan direct in het
   "schrijf een review"-scherm van Google in plaats van op het Maps-profiel.
5. **Google Business Profile**: zorg dat naam, adres en telefoonnummer daar exact
   gelijk zijn aan `src/lib/site.ts`. Verschillen in NAP-gegevens kosten lokale
   posities.
6. **Sterren in de zoekresultaten**: de `aggregateRating` is technisch correct
   opgenomen, maar Google toont beoordelingssterren voor een lokaal bedrijf niet
   altijd op basis van reviews op de eigen site. Reviews op het Google
   Business Profile blijven daarvoor de belangrijkste bron — vandaar de
   Google-knop in de review-modal.

## 7. Controles

```bash
npm run test    # 98 tests: meta-lengtes, canonicals, redirect-sync, schema, reviewflow
npm run lint
npm run build   # faalt als vercel.json en src/lib/redirects.ts uiteenlopen
```

De tests bewaken onder meer dat titles ≤ 60 tekens zijn, descriptions ≤ 155,
dat titles en descriptions uniek zijn, dat elke redirect naar een bestaande
pagina wijst, dat er geen redirect-loops ontstaan, dat elke dienst- en
werkgebiedpagina minimaal 300 woorden unieke tekst heeft, dat een ingestuurde
review wordt opgeslagen en direct in de lijst verschijnt, en dat lokale reviews
nooit in de structured data belanden.

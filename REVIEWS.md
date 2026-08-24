# Reviews: instellen en beheren

Bezoekers kunnen via de knop **"Schrijf een review"** een beoordeling
achterlaten. Die wordt opgeslagen in een gratis Supabase-database en is daarna
voor **alle** bezoekers zichtbaar — zonder dat de site opnieuw gebouwd of
gedeployd hoeft te worden.

---

## 1. Eenmalig instellen (ongeveer 10 minuten)

### Stap 1 — Supabase-project aanmaken

1. Ga naar [supabase.com](https://supabase.com) en maak een gratis account.
2. **New project** → kies een naam, een sterk databasewachtwoord en als regio
   **West EU (Ireland)** of **Central EU (Frankfurt)**. Dat houdt de gegevens
   binnen de EU, wat voor de AVG het makkelijkst uit te leggen is.
3. Wacht tot het project klaar is (ongeveer twee minuten).

### Stap 2 — De tabel aanmaken

1. Open in Supabase **SQL Editor** → **New query**.
2. Plak de volledige inhoud van [`supabase/schema.sql`](supabase/schema.sql).
3. Klik **Run**. Je ziet "Success. No rows returned" — dat klopt.

Dit maakt de tabel `reviews` aan, inclusief de rechten: anonieme bezoekers mogen
alleen reviews *insturen* en alleen *goedgekeurde* reviews *lezen*. Aanpassen of
verwijderen kan uitsluitend vanuit het Supabase-dashboard.

### Stap 3 — Sleutels in de site zetten

1. In Supabase: **Project Settings** → **Data API**. Noteer de **Project URL** en
   de **anon public** key.
2. In Vercel: **Settings** → **Environment Variables**. Voeg toe voor
   *Production*, *Preview* én *Development*:

   | Naam | Waarde |
   | --- | --- |
   | `VITE_SUPABASE_URL` | de Project URL, bv. `https://abcdefgh.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | de anon public key |

3. Deploy opnieuw (**Deployments** → laatste deploy → **Redeploy**). De
   variabelen worden bij het bouwen in de site verwerkt, dus zonder nieuwe
   deploy verandert er niets.

Lokaal ontwikkelen: kopieer `.env.example` naar `.env` en vul dezelfde twee
waarden in.

> De anon-key hoort publiek te zijn — hij staat in de JavaScript van de site en
> wordt afgeschermd door de policies uit `schema.sql`. Zet **nooit** de
> `service_role`-key in deze variabelen: die omzeilt alle beveiliging.

### Stap 4 — Controleren

Open de site, laat een testreview achter en kijk in Supabase onder
**Table Editor** → `reviews` of de regel er staat. Verwijder hem daarna gerust.

---

## 2. Wat er gebeurt als een bezoeker een review instuurt

1. Het **Google-bedrijfsprofiel** gaat direct open in een nieuw tabblad. Dat
   moet meteen bij de klik gebeuren: zodra er eerst op de database gewacht
   wordt, ziet de browser het niet meer als handeling van de bezoeker en
   blokkeert hij het venster.
2. De review gaat naar **Supabase** en is daarmee direct voor iedereen
   zichtbaar.
3. De bezoeker krijgt de bevestiging **"Bedankt! Je review staat nu op onze
   site. Help ons door deze ook op Google te plaatsen."** — in beeld én als
   melding rechtsonder.

De teller en het gemiddelde op `/beoordelingen`, op de homepage en in de footer
tellen de nieuwe review meteen mee.

### Als er iets misgaat

| Situatie | Wat de bezoeker ziet | Wat er gebeurt |
| --- | --- | --- |
| Alles werkt | "Je review staat nu op onze site" | Opgeslagen in Supabase, direct publiek |
| Moderatie staat aan | "Wij plaatsen hem zodra we hem hebben gelezen" | Opgeslagen met status `pending` |
| Supabase onbereikbaar of niet ingesteld | "We hebben hem op dit apparaat bewaard" | Opgeslagen in de browser, met een knop om de review alsnog te mailen |

De site blijft in alle gevallen gewoon werken: valt Supabase uit, dan toont de
site nog steeds de gecontroleerde reviews uit `src/content/reviews.ts`.

---

## 3. Beheren

### Een review offline halen

**Table Editor** → `reviews` → zet `status` op `rejected`. Hij verdwijnt direct
van de site; een nieuwe deploy is niet nodig.

### Eerst zelf lezen voordat een review op de site komt

Standaard staat een ingestuurde review er meteen op. Wil je ze eerst
beoordelen, draai dan één keer in de SQL Editor:

```sql
alter table public.reviews alter column status set default 'pending';
```

Nieuwe reviews staan dan in het dashboard op `pending` en verschijnen pas als je
ze op `approved` zet. De bezoeker krijgt in dat geval de tekst dat zijn review
wordt geplaatst zodra jullie hem gelezen hebben — dat past de site zelf aan, er
is geen wijziging in de code voor nodig.

### Een e-mail krijgen bij een nieuwe review

Supabase → **Database** → **Webhooks** → nieuwe webhook op `INSERT` van
`public.reviews`. Koppel die aan een e-maildienst of aan Zapier/Make. Zonder dit
moet je zelf af en toe in het dashboard kijken.

---

## 4. Waarvoor Supabase *niet* wordt gebruikt

De sterren die Google in de zoekresultaten kan tonen, komen uit de
`aggregateRating` in de JSON-LD. Die blijft berekend over de gecontroleerde
reviews in `src/content/reviews.ts` en bevat dus géén ingestuurde reviews. Twee
redenen:

1. **De markup moet kloppen.** De JSON-LD staat in de vooraf gebouwde HTML.
   Reviews uit de database komen er via JavaScript bij. Zou het gemiddelde in de
   markup gebaseerd zijn op gegevens die Googlebot mogelijk niet ophaalt, dan
   wijkt de markup af van de zichtbare pagina — precies waar Google
   rich-result-sancties voor uitdeelt.
2. **Ze zijn niet geverifieerd.** Iedereen kan een review insturen. Ongecontroleerde
   tekst in structured data zetten is vragen om problemen.

Is er een mooie review binnengekomen die je wél in de sterren wilt meetellen?
Neem hem over in `src/content/reviews.ts` en deploy. Dan telt hij mee in het
schema én blijft hij staan als de database ooit leeg raakt.

---

## 5. Beperkingen om rekening mee te houden

- **Geen rate limiting.** De database controleert lengtes en de score, maar
  iemand die het erop aanlegt kan meerdere reviews insturen. Zie je spam, zet
  dan moderatie aan (§3). Voor een strengere aanpak is een Supabase Edge
  Function met IP-limiet nodig.
- **Persoonsgegevens.** De tabel bewaart naam en woonplaats zoals de bezoeker ze
  invult. Vermeld dit in de privacyverklaring en verwijder een review op
  verzoek via het dashboard.
- **Gratis plan.** Supabase pauzeert projecten die een week lang geen verkeer
  krijgen. Bij een actieve site is dat geen probleem; gebeurt het toch, dan
  hervat je het project in het dashboard. De site zelf blijft ondertussen
  gewoon werken. 

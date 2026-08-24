/**
 * Klantbeoordelingen. Deze lijst voedt zowel de "Wat Onze Klanten Zeggen"
 * sectie als het `aggregateRating` / `review` gedeelte van het
 * LocalBusiness schema. Voeg je hier een review toe, dan wordt de
 * gemiddelde score automatisch opnieuw berekend.
 */
export type Review = {
  /**
   * Vaste identificatie van een geverifieerde review, bijvoorbeeld overgenomen
   * uit Google. Optioneel: oudere entries hebben er geen.
   */
  id?: string;
  /** Naam zoals de klant die zelf heeft doorgegeven. */
  name: string;
  city: string;
  /** 1 t/m 5 sterren. */
  rating: number;
  text: string;
  /**
   * ISO-datum, gebruikt als `datePublished` in schema.org. Meestal YYYY-MM-DD;
   * YYYY-MM mag ook wanneer alleen de maand bekend is (beide zijn geldig
   * ISO 8601 en op de site tonen wij toch alleen maand en jaar).
   */
  date: string;
  /** Dienst waar de review over gaat, komt terug als `itemReviewed` context. */
  service: string;
};

export const reviews: Review[] = [
  {
    name: "Jan de Vries",
    city: "Amsterdam",
    rating: 5,
    text: "Uitstekende service! Binnen een dag was onze schuifpui weer als nieuw. De monteur heeft de wieltjes vervangen en de rail gereinigd. Zeer vakkundig en netjes gewerkt.",
    date: "2025-11-14",
    service: "Schuifpui reparatie",
  },
  {
    name: "Maria Jansen",
    city: "Utrecht",
    rating: 5,
    text: "Na een inbraak snel geholpen. Dezelfde middag was de schuifpui weer veilig afsluitbaar. De monteur was vriendelijk en heeft alles perfect hersteld. Aanrader!",
    date: "2025-10-29",
    service: "Inbraakschade herstel",
  },
  {
    name: "Peter Bakker",
    city: "Rotterdam",
    rating: 5,
    text: "Al jaren onze vaste partij voor het onderhoud van de schuifpuien in ons appartementencomplex. Betrouwbaar, punctueel en eerlijke prijzen.",
    date: "2025-09-08",
    service: "Schuifpui onderhoud",
  },
  {
    name: "Sandra Willems",
    city: "Den Haag",
    rating: 5,
    text: "Het slot van onze schuifpui klemde al maanden. Netjes vervangen door een SKG-cilinder en meteen uitgelegd hoe we onderhoud kunnen doen. Top geregeld.",
    date: "2026-01-22",
    service: "Slot reparatie schuifpui",
  },
  {
    name: "Ahmed Bouzid",
    city: "Eindhoven",
    rating: 5,
    text: "Snel gereageerd op mijn WhatsApp-bericht en de volgende ochtend al langsgekomen. De hendel was afgebroken en is direct vervangen. Prima prijs-kwaliteit.",
    date: "2026-02-11",
    service: "Hendel reparatie",
  },
  {
    name: "Ellen Hofman",
    city: "Arnhem",
    rating: 4,
    text: "Goede reparatie van een zware schuifpui uit de jaren tachtig. Er moest een onderdeel besteld worden waardoor het iets langer duurde, maar de communicatie was helder.",
    date: "2025-12-03",
    service: "Schuifpui reparatie",
  },
  {
    name: "Rob Nieuwenhuis",
    city: "Almere",
    rating: 5,
    text: "Onze schuifpui liep zo stroef dat we hem met twee handen moesten opentrekken. Nu glijdt hij met één vinger open. Wat een verschil, bedankt!",
    date: "2026-03-19",
    service: "Schuifpui reparatie",
  },
  {
    name: "Familie Van Dijk",
    city: "Tiel",
    rating: 5,
    text: "Lokale specialist die doet wat hij belooft. Onderhoudsbeurt aan twee schuifpuien inclusief afstellen en smeren. Duidelijke offerte vooraf, geen verrassingen achteraf.",
    date: "2026-04-07",
    service: "Schuifpui onderhoud",
  },
  {
    id: "tommy-docherty",
    name: "Tommy Docherty",
    city: "Middelburg",
    rating: 5,
    // Deze klant schreef zijn beoordeling in het Engels; citaten laten wij
    // onvertaald staan zoals ze zijn achtergelaten.
    text: "My door was completely locked up due to under wheels shearing completely off. This was an absolute disaster for the guys and a really hard fix. Total respect to the gentlemen. No complaints just got stuck into the work and done an absolute fabulous job. I can not speak highly enough of the men and I would highly recommend to anyone whom has any issues at all. Thanks again lads, grand job done.",
    date: "2026-08",
    service: "Schuifpui Reparatie",
  },
];

/** Totaal aantal reviews, gebruikt in `aggregateRating.reviewCount`. */
export const reviewCount = reviews.length;

/** Gemiddelde score afgerond op één decimaal, bv. 4.9. */
export const averageRating =
  Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10;

/** De reviews die we op de homepage tonen (meest recente eerst). */
export const featuredReviews = [...reviews]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 6);

/**
 * Centrale bedrijfsgegevens (NAP) en site-constanten.
 *
 * Dit bestand is de ENIGE bron van waarheid voor het canonieke domein, de
 * bedrijfsgegevens en de Google-review link. Het wordt zowel door de React-app
 * gebruikt (runtime meta tags) als door de build-time SEO plugin
 * (prerender, sitemap.xml, robots.txt).
 *
 * LET OP: gebruik hier geen React-, asset- of browser-imports. Dit bestand
 * wordt ook in Node (vite.config.ts) geladen.
 */

/**
 * Canoniek domein, inclusief protocol en zonder trailing slash.
 *
 * Wijzig je dit naar het apex-domein (zonder www), pas dan OOK de
 * host-redirect in `vercel.json` aan én zet in Vercel > Settings > Domains
 * hetzelfde domein als "Primary Domain". Anders ontstaat er een redirect-loop.
 * De test `src/test/seo.test.ts` bewaakt dat beide waarden gelijk blijven.
 */
export const SITE_URL = "https://www.schuifpuiservicenederland.nl";

export const SITE_NAME = "Schuifpui Service Nederland";
export const SITE_TAGLINE = "Schuifpui reparatie, onderhoud en service in heel Nederland";

export const PHONE_DISPLAY = "0344 700 234";
export const PHONE_E164 = "+31344700234";
export const MOBILE_DISPLAY = "06 360 745 31";
export const MOBILE_E164 = "+31636074531";
export const EMAIL = "info@schuifpuiservicenederland.nl";
export const WHATSAPP_URL =
  "https://wa.me/31636074531?text=Hallo%2C%20ik%20heb%20een%20vraag%20over%20schuifpui%20reparatie.";

export const ADDRESS = {
  streetAddress: "Voltastraat 3B",
  postalCode: "4004 KA",
  addressLocality: "Tiel",
  addressRegion: "Gelderland",
  addressCountry: "NL",
} as const;

/** Coördinaten van de vestiging in Tiel (gebruikt in LocalBusiness schema). */
export const GEO = { latitude: 51.8853, longitude: 5.4284 } as const;

/**
 * Openingstijden voor het `openingHoursSpecification` in het LocalBusiness
 * schema. Het bedrijf is 24/7 bereikbaar via WhatsApp en e-mail, dus alle zeven
 * dagen van 00:00 tot 23:59. Zo laat Google geen "gesloten" bij de vermelding
 * zien. Let op: de openingstijden in het Google Business Profile staan daar los
 * van en moeten in dat dashboard zelf worden aangepast.
 */
export const OPENING_HOURS = {
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  opens: "00:00",
  closes: "23:59",
} as const;

export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/QmxnFJ2oZxS7VoiB8";

/**
 * Vul hier de Google Place ID in van het bedrijfsprofiel om bezoekers direct
 * in het "schrijf een review"-scherm te laten landen. Zolang deze leeg is,
 * verwijzen we naar het Google Maps bedrijfsprofiel (daar staat de
 * review-knop ook). Place ID opzoeken:
 * https://developers.google.com/maps/documentation/places/web-service/place-id
 */
export const GOOGLE_PLACE_ID = "";

export const GOOGLE_REVIEW_URL = GOOGLE_PLACE_ID
  ? `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`
  : GOOGLE_MAPS_URL;

/** Bouwt een absolute URL op basis van een intern pad ("/diensten"). */
export const absoluteUrl = (path: string): string => {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

/**
 * JSON-LD (schema.org) generatoren.
 *
 * Alle structured data van de site komt hier vandaan, zodat NAP-gegevens,
 * beoordelingen en werkgebieden nooit uit elkaar kunnen lopen. De output wordt
 * zowel bij het bouwen in de statische HTML gezet (plugins/seo.ts) als bij
 * client-side navigatie ververst (src/components/Seo.tsx).
 *
 * Geen React-imports: dit bestand draait ook in Node.
 */
import {
  ADDRESS,
  EMAIL,
  GEO,
  MOBILE_E164,
  OPENING_HOURS,
  PHONE_E164,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./site";
import { averageRating, reviewCount, reviews } from "../content/reviews";
import { cities } from "../content/cities";
import { services } from "../content/services";
import type { Faq } from "../content/services";

/** Stabiele @id waarnaar andere schema's kunnen verwijzen. */
export const BUSINESS_ID = `${SITE_URL}/#business`;

type JsonLd = Record<string, unknown>;

/**
 * LocalBusiness / HomeAndConstructionBusiness met NAP-gegevens, openingstijden,
 * werkgebieden, dienstencatalogus, gemiddelde beoordeling en losse reviews.
 * Dit is het schema waarmee Google sterren in de zoekresultaten kan tonen.
 */
export const localBusinessSchema = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
  "@id": BUSINESS_ID,
  name: SITE_NAME,
  alternateName: "Schuifpui Specialist Nederland",
  description:
    "Specialist in schuifpui reparatie, slot- en hendelvervanging, inbraakschade herstel en preventief onderhoud in heel Nederland.",
  url: `${SITE_URL}/`,
  logo: absoluteUrl("/logo.png"),
  image: [absoluteUrl("/og-image.jpg"), absoluteUrl("/logo.png")],
  telephone: PHONE_E164,
  email: EMAIL,
  currenciesAccepted: "EUR",
  paymentAccepted: "Contant, PIN, Bankoverschrijving",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.streetAddress,
    postalCode: ADDRESS.postalCode,
    addressLocality: ADDRESS.addressLocality,
    addressRegion: ADDRESS.addressRegion,
    addressCountry: ADDRESS.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PHONE_E164,
      contactType: "customer service",
      areaServed: "NL",
      availableLanguage: ["nl", "en"],
    },
    {
      "@type": "ContactPoint",
      telephone: MOBILE_E164,
      contactType: "emergency",
      areaServed: "NL",
      availableLanguage: ["nl"],
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...OPENING_HOURS.days],
      opens: OPENING_HOURS.opens,
      closes: OPENING_HOURS.closes,
    },
  ],
  areaServed: [
    { "@type": "Country", name: "Nederland" },
    ...cities.map((city) => ({
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: city.province },
    })),
  ],
  knowsAbout: [
    "schuifpui reparatie",
    "schuifpui onderhoud",
    "slot reparatie schuifpui",
    "hendel reparatie schuifpui",
    "inbraakschade herstel",
    "hefschuifdeuren",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Schuifpui diensten",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        url: absoluteUrl(`/diensten/${service.slug}`),
      },
    })),
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: averageRating,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
  review: reviews.map((review) => ({
    "@type": "Review",
    author: { "@type": "Person", name: review.name },
    datePublished: review.date,
    reviewBody: review.text,
    name: `${review.service} in ${review.city}`,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
  })),
});

/** WebSite-schema, geeft Google de sitenaam en taal van de site. */
export const webSiteSchema = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: "nl-NL",
  publisher: { "@id": BUSINESS_ID },
});

/** Service-schema voor een dienstpagina, gekoppeld aan het bedrijf. */
export const serviceSchema = (params: {
  name: string;
  description: string;
  url: string;
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: params.name,
  description: params.description,
  url: params.url,
  serviceType: params.name,
  category: "Schuifpui service",
  provider: { "@id": BUSINESS_ID },
  areaServed: [
    { "@type": "Country", name: "Nederland" },
    ...cities.map((city) => ({ "@type": "City", name: city.name })),
  ],
  availableChannel: {
    "@type": "ServiceChannel",
    servicePhone: PHONE_E164,
    serviceUrl: absoluteUrl("/contact"),
  },
});

/** FAQPage-schema; levert uitklapbare vragen in de zoekresultaten op. */
export const faqSchema = (faqs: Faq[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});

/** Kruimelpad-schema; toont de sitestructuur onder het zoekresultaat. */
export const breadcrumbSchema = (
  trail: { name: string; path: string }[],
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

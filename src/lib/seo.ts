/**
 * Bouwt per URL de volledige set head-gegevens: title, description, canonical,
 * robots, Open Graph, Twitter Card en JSON-LD.
 *
 * Eén functie, twee gebruikers:
 *  - build time: `plugins/seo.ts` schrijft het resultaat in de statische HTML,
 *    zodat crawlers de juiste tags zien zonder JavaScript uit te voeren;
 *  - runtime: `src/components/Seo.tsx` past dezelfde tags toe bij client-side
 *    navigatie binnen de SPA.
 *
 * Geen React-imports: dit bestand draait ook in Node.
 */
import { SITE_NAME, SITE_URL, absoluteUrl } from "./site";
import { normalisePath, notFoundRoute, routeByPath, routes, type RouteMeta } from "./routes";
import { cityBySlug } from "../content/cities";
import { serviceBySlug } from "../content/services";
import { reviews } from "../content/reviews";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  serviceSchema,
  webSiteSchema,
} from "./schema";

export type HeadData = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: "website" | "article";
  jsonLd: Record<string, unknown>[];
};

const OG_IMAGE = absoluteUrl("/og-image.jpg");

/** Bouwt het kruimelpad op basis van het URL-pad. */
const breadcrumbTrail = (path: string): { name: string; path: string }[] => {
  const trail = [{ name: "Home", path: "/" }];
  if (path === "/") return trail;

  const segments = path.split("/").filter(Boolean);
  let current = "";
  for (const segment of segments) {
    current += `/${segment}`;
    const meta = routeByPath(current);
    trail.push({ name: meta?.breadcrumb ?? meta?.title ?? segment, path: current });
  }
  return trail;
};

/** Pagina-specifieke JSON-LD bovenop het bedrijfsschema. */
const pageSchemas = (path: string): Record<string, unknown>[] => {
  const extra: Record<string, unknown>[] = [];

  if (path.startsWith("/diensten/")) {
    const service = serviceBySlug(path.replace("/diensten/", ""));
    if (service) {
      extra.push(
        serviceSchema({
          name: service.name,
          description: service.summary,
          url: absoluteUrl(path),
        }),
      );
      extra.push(faqSchema(service.faqs));
    }
  }

  if (path.startsWith("/werkgebieden/")) {
    const city = cityBySlug(path.replace("/werkgebieden/", ""));
    if (city) {
      extra.push(
        serviceSchema({
          name: `Schuifpui reparatie ${city.name}`,
          description: city.summary,
          url: absoluteUrl(path),
        }),
      );
      extra.push(faqSchema(city.faqs));
    }
  }

  if (path === "/") {
    extra.push(
      faqSchema([
        {
          q: "Hoe snel kunnen jullie ter plaatse zijn?",
          a: "In de meeste gevallen zijn wij binnen 24 uur bij u aan huis. Bij spoed, zoals inbraakschade of een niet-afsluitbare schuifpui, proberen wij dezelfde dag nog te komen.",
        },
        {
          q: "Geven jullie garantie op reparaties?",
          a: "Ja, wij geven garantie op al onze reparaties en op de gebruikte onderdelen. De exacte garantieperiode staat vermeld op de offerte.",
        },
        {
          q: "Welke merken schuifpuien repareren jullie?",
          a: "Wij repareren alle gangbare merken, waaronder Reynaers, Schüco, Kawneer, Aliplast, Sapa en Hueck, én oudere systemen waarvan geen originele onderdelen meer leverbaar zijn.",
        },
        {
          q: "Wat kost een schuifpui reparatie?",
          a: "De kosten hangen af van het type reparatie en de benodigde onderdelen. U ontvangt altijd vooraf een vrijblijvende prijsopgave, zodat u niet voor verrassingen komt te staan.",
        },
        {
          q: "Werken jullie door heel Nederland?",
          a: "Ja, wij zijn actief in heel Nederland. Van Amsterdam tot Maastricht komen onze monteurs bij u aan huis.",
        },
      ]),
    );
  }

  if (path === "/beoordelingen") {
    extra.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Klantbeoordelingen Schuifpui Service Nederland",
      numberOfItems: reviews.length,
      itemListElement: reviews.map((review, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Review",
          author: { "@type": "Person", name: review.name },
          datePublished: review.date,
          reviewBody: review.text,
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
          },
        },
      })),
    });
  }

  return extra;
};

/** Zoekt de route-meta bij een pad; valt terug op de 404-meta. */
export const resolveRoute = (path: string): RouteMeta =>
  routeByPath(path) ?? notFoundRoute;

/** Volledige head-gegevens voor één URL. */
export const buildHead = (rawPath: string): HeadData => {
  const path = normalisePath(rawPath);
  const meta = resolveRoute(path);
  const isKnown = meta !== notFoundRoute;

  const jsonLd: Record<string, unknown>[] = isKnown
    ? [
        localBusinessSchema(),
        webSiteSchema(),
        breadcrumbSchema(breadcrumbTrail(path)),
        ...pageSchemas(path),
      ]
    : [];

  return {
    path,
    title: meta.title,
    description: meta.description,
    canonical: absoluteUrl(isKnown ? path : "/"),
    robots: meta.noindex
      ? "noindex, follow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    ogTitle: meta.title,
    ogDescription: meta.description,
    ogImage: OG_IMAGE,
    ogType: path === "/" ? "website" : "article",
    jsonLd,
  };
};

/** Head-gegevens voor elke indexeerbare route (gebruikt door de prerender). */
export const allHeads = (): HeadData[] => routes.map((route) => buildHead(route.path));

export { SITE_NAME, SITE_URL };

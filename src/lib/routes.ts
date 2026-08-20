/**
 * Route-manifest: de enige bron van waarheid voor welke URL's bestaan.
 *
 * Wordt gebruikt door:
 *  - `src/lib/seo.ts`      → meta tags in de browser (runtime)
 *  - `plugins/seo.ts`      → prerender van statische HTML + sitemap.xml (build)
 *  - `src/test/seo.test.ts` → bewaakt lengtes, uniciteit en redirect-doelen
 *
 * Staat een URL hier niet in, dan wordt er ook geen HTML-bestand voor
 * gegenereerd en levert Vercel een echte 404 op. Dat is precies de bedoeling:
 * zo verdwijnen de "soft 404"-meldingen uit Google Search Console.
 *
 * Let op: geen React- of asset-imports in dit bestand (draait ook in Node).
 */
import { services } from "../content/services";
import { cities } from "../content/cities";

export type RouteMeta = {
  /** Pad zonder trailing slash, behalve de homepage ("/"). */
  path: string;
  /** <title> — houd onder de 60 tekens. */
  title: string;
  /** meta description — houd onder de 155 tekens. */
  description: string;
  /** Prioriteit in sitemap.xml (0.0 – 1.0). */
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  /** Pagina's met noindex komen niet in de sitemap. */
  noindex?: boolean;
  /** Breadcrumb-label; valt terug op de paginanaam. */
  breadcrumb?: string;
};

const staticRoutes: RouteMeta[] = [
  {
    path: "/",
    title: "Schuifpui Reparatie Nederland | Binnen 24u Ter Plaatse",
    description:
      "Schuifpui reparatie, slot- en hendelvervanging en onderhoud in heel Nederland. 100% garantie, binnen 24u ter plaatse. Bel direct: 0344 700 234.",
    priority: 1.0,
    changefreq: "weekly",
    breadcrumb: "Home",
  },
  {
    path: "/diensten",
    title: "Onze Diensten | Schuifpui Reparatie & Onderhoud",
    description:
      "Schuifpui reparatie, slot- en hendelvervanging, inbraakschade herstel en preventief onderhoud. Vakkundig en met garantie. Bel 0344 700 234.",
    priority: 0.9,
    changefreq: "monthly",
    breadcrumb: "Diensten",
  },
  {
    path: "/werkgebieden",
    title: "Werkgebieden | Schuifpui Specialist in Heel NL",
    description:
      "Schuifpui service in Amsterdam, Rotterdam, Utrecht, Den Haag en heel Nederland. Bekijk uw regio en de aanrijtijd. Bel direct: 0344 700 234.",
    priority: 0.9,
    changefreq: "monthly",
    breadcrumb: "Werkgebieden",
  },
  {
    path: "/beoordelingen",
    title: "Beoordelingen | Ervaringen van Onze Klanten",
    description:
      "Lees ervaringen van klanten over onze schuifpui reparatie en onderhoud, of laat zelf een beoordeling achter. Gemiddeld cijfer en echte reviews.",
    priority: 0.7,
    changefreq: "weekly",
    breadcrumb: "Beoordelingen",
  },
  {
    path: "/over-ons",
    title: "Over Ons | 15+ Jaar Schuifpui Specialist",
    description:
      "Al 15+ jaar dé specialist in schuifpui reparatie en onderhoud. Gecertificeerde vakmensen, eerlijke prijzen en garantie. Bel 0344 700 234.",
    priority: 0.6,
    changefreq: "yearly",
    breadcrumb: "Over Ons",
  },
  {
    path: "/contact",
    title: "Contact | Schuifpui Service Nederland in Tiel",
    description:
      "Neem contact op voor een vrijblijvende offerte. Voltastraat 3B, Tiel. Bereikbaar ma t/m vr 08:00-18:00. Bel 0344 700 234 of app 06 360 745 31.",
    priority: 0.8,
    changefreq: "yearly",
    breadcrumb: "Contact",
  },
];

const serviceRoutes: RouteMeta[] = services.map((service) => ({
  path: `/diensten/${service.slug}`,
  title: service.metaTitle,
  description: service.metaDescription,
  priority: 0.8,
  changefreq: "monthly" as const,
  breadcrumb: service.shortName,
}));

const cityRoutes: RouteMeta[] = cities.map((city) => ({
  path: `/werkgebieden/${city.slug}`,
  title: city.metaTitle,
  description: city.metaDescription,
  priority: 0.7,
  changefreq: "monthly" as const,
  breadcrumb: city.name,
}));

/** Alle indexeerbare routes (komen in sitemap.xml en worden geprerenderd). */
export const routes: RouteMeta[] = [...staticRoutes, ...serviceRoutes, ...cityRoutes];

/** Meta voor de 404-pagina. Bewust noindex en niet in de sitemap. */
export const notFoundRoute: RouteMeta = {
  path: "/404",
  title: "Pagina niet gevonden | Schuifpui Service Nederland",
  description:
    "Deze pagina bestaat niet (meer). Bekijk onze diensten en werkgebieden of neem contact op via 0344 700 234.",
  priority: 0,
  changefreq: "yearly",
  noindex: true,
};

export const routeByPath = (path: string): RouteMeta | undefined => {
  const normalised = normalisePath(path);
  return routes.find((r) => r.path === normalised);
};

/** Verwijdert trailing slashes en query/hash zodat "/diensten/" === "/diensten". */
export const normalisePath = (path: string): string => {
  const withoutQuery = path.split("?")[0].split("#")[0];
  if (withoutQuery === "" || withoutQuery === "/") return "/";
  return withoutQuery.replace(/\/+$/, "") || "/";
};

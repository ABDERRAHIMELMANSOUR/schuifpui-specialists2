import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { routes, notFoundRoute, normalisePath, routeByPath } from "@/lib/routes";
import { redirects } from "@/lib/redirects";
import { buildHead } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { services } from "@/content/services";
import { cities } from "@/content/cities";
import { averageRating, reviewCount, reviews } from "@/content/reviews";

type VercelRedirect = {
  source: string;
  destination: string;
  statusCode?: number;
  has?: { type: string; value: string }[];
};

type VercelConfig = {
  redirects: VercelRedirect[];
  rewrites?: unknown[];
  cleanUrls?: boolean;
  trailingSlash?: boolean;
};

type Business = {
  "@type": string[];
  aggregateRating: { ratingValue: number; reviewCount: number };
  review: unknown[];
  areaServed: { name: string }[];
};

const vercelConfig: VercelConfig = JSON.parse(
  readFileSync(resolve(__dirname, "../../vercel.json"), "utf8"),
);

/** Leest het @type van een JSON-LD blok, dat een string of array kan zijn. */
const typeOf = (block: Record<string, unknown>): string =>
  JSON.stringify(block["@type"] ?? "");

describe("meta titles en descriptions", () => {
  it.each(routes)("$path heeft een title van maximaal 60 tekens", (route) => {
    expect(route.title.length).toBeGreaterThan(10);
    expect(route.title.length).toBeLessThanOrEqual(60);
  });

  it.each(routes)("$path heeft een description van maximaal 155 tekens", (route) => {
    expect(route.description.length).toBeGreaterThan(50);
    expect(route.description.length).toBeLessThanOrEqual(155);
  });

  it("heeft unieke titles en descriptions (geen duplicate content)", () => {
    const titles = routes.map((r) => r.title);
    const descriptions = routes.map((r) => r.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("heeft unieke paden", () => {
    const paths = routes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
  });
});

describe("canonicals", () => {
  it("geeft elke route een absolute canonical op het canonieke domein", () => {
    for (const route of routes) {
      const head = buildHead(route.path);
      expect(head.canonical.startsWith(`${SITE_URL}/`)).toBe(true);
      // Alleen de homepage eindigt op een slash; de rest is slash-loos.
      const expected = route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
      expect(head.canonical).toBe(expected);
    }
  });

  it("negeert trailing slashes, query en hash bij het bepalen van de canonical", () => {
    expect(buildHead("/diensten/").canonical).toBe(`${SITE_URL}/diensten`);
    expect(buildHead("/diensten?utm_source=google").canonical).toBe(`${SITE_URL}/diensten`);
    expect(buildHead("/diensten#top").canonical).toBe(`${SITE_URL}/diensten`);
  });

  it("zet de homepage-canonical op het domein met slash", () => {
    expect(buildHead("/").canonical).toBe(`${SITE_URL}/`);
  });

  it("markeert onbekende URL's als noindex", () => {
    const head = buildHead("/deze-pagina-bestaat-niet");
    expect(head.robots).toContain("noindex");
    expect(head.title).toBe(notFoundRoute.title);
    expect(head.jsonLd).toHaveLength(0);
  });

  it("markeert bekende URL's als indexeerbaar", () => {
    expect(buildHead("/contact").robots).toContain("index, follow");
  });
});

describe("redirects", () => {
  it("verwijst altijd naar een bestaande route", () => {
    for (const redirect of redirects) {
      expect(routeByPath(redirect.to), `${redirect.from} -> ${redirect.to}`).toBeDefined();
    }
  });

  it("heeft geen bron die zelf een geldige route is (voorkomt redirect-loops)", () => {
    for (const redirect of redirects) {
      expect(routeByPath(redirect.from), `${redirect.from} is al een route`).toBeUndefined();
    }
  });

  it("heeft unieke bronnen", () => {
    const sources = redirects.map((r) => r.from);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("staat één op één in vercel.json als 301", () => {
    const configured = new Map<string, VercelRedirect>(
      vercelConfig.redirects
        .filter((entry) => !entry.has)
        .map((entry) => [entry.source, entry] as const),
    );

    for (const redirect of redirects) {
      const entry = configured.get(redirect.from);
      expect(entry, `vercel.json mist ${redirect.from}`).toBeDefined();
      expect(entry!.destination).toBe(redirect.to);
      expect(entry!.statusCode).toBe(301);
    }
    expect(configured.size).toBe(redirects.length);
  });
});

describe("vercel configuratie", () => {
  it("dwingt het canonieke domein af dat ook in SITE_URL staat", () => {
    const hostRedirect = vercelConfig.redirects.find((entry) => entry.has);
    expect(hostRedirect).toBeDefined();
    expect(hostRedirect!.destination.startsWith(SITE_URL)).toBe(true);
    expect(hostRedirect!.statusCode).toBe(301);
    // De bron-host mag nooit gelijk zijn aan de doel-host: dat zou een loop zijn.
    expect(`https://${hostRedirect!.has![0].value}`).not.toBe(SITE_URL);
  });

  it("dwingt schone URL's zonder trailing slash af", () => {
    expect(vercelConfig.cleanUrls).toBe(true);
    expect(vercelConfig.trailingSlash).toBe(false);
  });

  it("heeft geen SPA catch-all rewrite meer (die veroorzaakte de soft 404's)", () => {
    expect(vercelConfig.rewrites ?? []).toHaveLength(0);
  });
});

describe("routes en content", () => {
  it("heeft voor elke dienst een route", () => {
    for (const service of services) {
      expect(routeByPath(`/diensten/${service.slug}`)).toBeDefined();
    }
  });

  it("heeft voor elk werkgebied een route", () => {
    for (const city of cities) {
      expect(routeByPath(`/werkgebieden/${city.slug}`)).toBeDefined();
    }
  });

  it("geeft elke dienstpagina genoeg unieke tekst om geïndexeerd te worden", () => {
    for (const service of services) {
      const words = [
        ...service.intro,
        ...service.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]),
        ...service.faqs.flatMap((f) => [f.q, f.a]),
      ]
        .join(" ")
        .split(/\s+/).length;
      expect(words, `${service.slug} heeft te weinig tekst`).toBeGreaterThanOrEqual(300);
    }
  });

  it("geeft elke werkgebiedpagina genoeg unieke tekst om geïndexeerd te worden", () => {
    for (const city of cities) {
      const words = [
        ...city.intro,
        ...city.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]),
        ...city.faqs.flatMap((f) => [f.q, f.a]),
      ]
        .join(" ")
        .split(/\s+/).length;
      expect(words, `${city.slug} heeft te weinig tekst`).toBeGreaterThanOrEqual(300);
    }
  });

  it("gebruikt geen gekopieerde intro's tussen steden (voorkomt doorway pages)", () => {
    const intros = cities.map((c) => c.intro.join(" "));
    expect(new Set(intros).size).toBe(intros.length);
  });

  it("normaliseert paden consistent", () => {
    expect(normalisePath("/diensten/")).toBe("/diensten");
    expect(normalisePath("/")).toBe("/");
    expect(normalisePath("")).toBe("/");
    expect(normalisePath("/diensten?a=1#b")).toBe("/diensten");
  });
});

describe("structured data", () => {
  it("zet LocalBusiness met aggregateRating op elke indexeerbare pagina", () => {
    for (const route of routes) {
      const head = buildHead(route.path);
      const business = head.jsonLd.find((block) =>
        typeOf(block).includes("LocalBusiness"),
      ) as unknown as Business | undefined;
      expect(business, `${route.path} mist LocalBusiness`).toBeDefined();
      expect(business!.aggregateRating.ratingValue).toBe(averageRating);
      expect(business!.aggregateRating.reviewCount).toBe(reviewCount);
      expect(business!.review).toHaveLength(reviews.length);
    }
  });

  it("berekent de gemiddelde score uit de daadwerkelijke reviews", () => {
    const expected =
      Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10;
    expect(averageRating).toBe(expected);
    expect(averageRating).toBeLessThanOrEqual(5);
    expect(averageRating).toBeGreaterThan(0);
  });

  it("geeft dienstpagina's een Service- en FAQPage-schema", () => {
    const head = buildHead(`/diensten/${services[0].slug}`);
    const types = head.jsonLd.map((block) => block["@type"]);
    expect(types).toContain("Service");
    expect(types).toContain("FAQPage");
    expect(types).toContain("BreadcrumbList");
  });

  it("geeft werkgebiedpagina's een Service- en FAQPage-schema", () => {
    const head = buildHead(`/werkgebieden/${cities[0].slug}`);
    const types = head.jsonLd.map((block) => block["@type"]);
    expect(types).toContain("Service");
    expect(types).toContain("FAQPage");
  });

  it("neemt lokaal opgeslagen reviews NIET op in de structured data", () => {
    // Reviews die een bezoeker zelf achterlaat staan alleen in diens browser.
    // Zouden ze in de JSON-LD belanden, dan zou de aggregateRating niet meer
    // overeenkomen met wat Googlebot (met lege localStorage) op de pagina ziet.
    window.localStorage.setItem(
      "ssn-reviews-v1",
      JSON.stringify([
        {
          id: "test",
          name: "Lokale Bezoeker",
          city: "Tiel",
          rating: 1,
          text: "Mag niet in het schema komen.",
          date: "2026-01-01",
          service: "Overig",
          source: "user",
        },
      ]),
    );

    const business = buildHead("/").jsonLd[0] as unknown as Business;
    expect(business.aggregateRating.reviewCount).toBe(reviews.length);
    expect(business.aggregateRating.ratingValue).toBe(averageRating);
    expect(JSON.stringify(business.review)).not.toContain("Lokale Bezoeker");

    window.localStorage.clear();
  });

  it("noemt alle werkgebieden in areaServed", () => {
    const business = buildHead("/").jsonLd[0] as unknown as Business;
    const names = business.areaServed.map((area) => area.name);
    expect(names).toContain("Nederland");
    for (const city of cities) {
      expect(names).toContain(city.name);
    }
  });
});

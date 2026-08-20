/**
 * Statische prerender + sitemap-generator.
 *
 * Draait als laatste stap van `npm run build`, nadat de client-build (dist/) en
 * de SSR-build (dist-ssr/) klaar zijn. Per route:
 *
 *   1. rendert de React-app naar HTML-string;
 *   2. vult de route-specifieke head (title, description, canonical, Open Graph,
 *      JSON-LD) in tussen de <!--seo-head--> markers;
 *   3. schrijft het resultaat weg als een echt HTML-bestand.
 *
 * Daarnaast worden sitemap.xml en robots.txt gegenereerd, en wordt gecontroleerd
 * of de redirects in vercel.json nog gelijk zijn aan src/lib/redirects.ts.
 *
 * Waarom dit belangrijk is: zonder deze stap serveert de site voor élke URL
 * dezelfde lege SPA-shell met HTTP 200. Dat is precies wat Google rapporteert
 * als "soft 404" en "crawled - currently not indexed".
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(rootDir, "dist");

const {
  render,
  routes,
  notFoundRoute,
  buildHead,
  redirects,
  SITE_URL,
} = await import(join(rootDir, "dist-ssr", "entry-server.js"));

const HEAD_BLOCK = /<!--seo-head-->[\s\S]*?<!--\/seo-head-->/;
const APP_PLACEHOLDER = "<!--app-html-->";

/** Escapet tekst voor gebruik in een HTML-attribuut of tekstknoop. */
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Escapet JSON-LD zodat een "</script>" in de data het blok niet afbreekt. */
const escapeJsonLd = (data) =>
  JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");

const renderHead = (head) =>
  [
    "<!--seo-head-->",
    `    <title>${escapeHtml(head.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(head.description)}" />`,
    `    <meta name="robots" content="${escapeHtml(head.robots)}" />`,
    `    <link rel="canonical" href="${escapeHtml(head.canonical)}" />`,
    `    <meta property="og:site_name" content="Schuifpui Service Nederland" />`,
    `    <meta property="og:title" content="${escapeHtml(head.ogTitle)}" />`,
    `    <meta property="og:description" content="${escapeHtml(head.ogDescription)}" />`,
    `    <meta property="og:type" content="${escapeHtml(head.ogType)}" />`,
    `    <meta property="og:url" content="${escapeHtml(head.canonical)}" />`,
    `    <meta property="og:image" content="${escapeHtml(head.ogImage)}" />`,
    `    <meta property="og:locale" content="nl_NL" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${escapeHtml(head.ogTitle)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(head.ogDescription)}" />`,
    `    <meta name="twitter:image" content="${escapeHtml(head.ogImage)}" />`,
    ...head.jsonLd.map(
      (schema) =>
        `    <script type="application/ld+json">${escapeJsonLd(schema)}</script>`,
    ),
    "    <!--/seo-head-->",
  ].join("\n");

/** "/" -> dist/index.html, "/diensten/slot" -> dist/diensten/slot.html */
const outputFileFor = (path) =>
  path === "/" ? join(distDir, "index.html") : join(distDir, `${path.replace(/^\//, "")}.html`);

const template = await readFile(join(distDir, "index.html"), "utf8");

if (!HEAD_BLOCK.test(template) || !template.includes(APP_PLACEHOLDER)) {
  throw new Error(
    "index.html mist de <!--seo-head--> markers of de <!--app-html--> placeholder.",
  );
}

const writePage = async (route) => {
  const head = buildHead(route.path);
  // De 404-pagina wordt geserveerd op onbekende URL's; renderen we hem op "/404",
  // dan matcht de catch-all route van react-router en krijgen we de juiste pagina.
  const appHtml = render(route.path);
  const html = template
    .replace(HEAD_BLOCK, renderHead(head))
    .replace(APP_PLACEHOLDER, appHtml);

  const file = outputFileFor(route.path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html, "utf8");
  return file;
};

const pages = [...routes, notFoundRoute];
for (const route of pages) {
  await writePage(route);
}

// --- sitemap.xml -----------------------------------------------------------
// Alleen routes die daadwerkelijk 200 OK teruggeven en indexeerbaar zijn.
// Redirects, de 404-pagina en noindex-pagina's blijven er bewust buiten.
const lastmod = new Date().toISOString().slice(0, 10);
const indexable = routes.filter((route) => !route.noindex);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexable.map((route) =>
    [
      "  <url>",
      `    <loc>${SITE_URL}${route.path === "/" ? "/" : route.path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority.toFixed(1)}</priority>`,
      "  </url>",
    ].join("\n"),
  ),
  "</urlset>",
  "",
].join("\n");

await writeFile(join(distDir, "sitemap.xml"), sitemap, "utf8");

// --- robots.txt ------------------------------------------------------------
const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  "# Geen crawl-budget verspillen aan build-artefacten",
  "Disallow: /assets/*.map$",
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  "",
].join("\n");

await writeFile(join(distDir, "robots.txt"), robots, "utf8");

// --- controle: vercel.json in sync met src/lib/redirects.ts ----------------
const vercelConfig = JSON.parse(await readFile(join(rootDir, "vercel.json"), "utf8"));
const configured = new Map(
  (vercelConfig.redirects ?? [])
    .filter((entry) => !entry.has)
    .map((entry) => [entry.source, entry.destination]),
);

const missing = redirects.filter(({ from, to }) => configured.get(from) !== to);
if (missing.length > 0) {
  throw new Error(
    `vercel.json mist ${missing.length} redirect(s) uit src/lib/redirects.ts: ` +
      missing.map((r) => `${r.from} -> ${r.to}`).join(", "),
  );
}

console.log(
  `[seo] ${pages.length} pagina's geprerenderd, ${indexable.length} URL's in sitemap.xml, ` +
    `${redirects.length} redirects gecontroleerd.`,
);

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { buildHead } from "@/lib/seo";

/**
 * Houdt de head-tags gelijk aan de huidige route.
 *
 * De eerste pagina die een bezoeker opent is al geprerenderd inclusief de
 * juiste head (zie scripts/prerender.mjs). Navigeert de bezoeker daarna
 * client-side door de SPA, dan zorgt dit component dat title, description,
 * canonical, Open Graph en JSON-LD meebewegen. Dat is nodig omdat Google
 * pagina's ook via de client-side router kan renderen.
 */
const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

const replaceJsonLd = (blocks: Record<string, unknown>[]) => {
  document.head
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((node) => node.remove());

  for (const block of blocks) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  }
};

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = buildHead(pathname);

    document.title = head.title;
    upsertMeta("name", "description", head.description);
    upsertMeta("name", "robots", head.robots);
    upsertCanonical(head.canonical);

    upsertMeta("property", "og:title", head.ogTitle);
    upsertMeta("property", "og:description", head.ogDescription);
    upsertMeta("property", "og:url", head.canonical);
    upsertMeta("property", "og:type", head.ogType);
    upsertMeta("property", "og:image", head.ogImage);
    upsertMeta("property", "og:locale", "nl_NL");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", head.ogTitle);
    upsertMeta("name", "twitter:description", head.ogDescription);
    upsertMeta("name", "twitter:image", head.ogImage);

    replaceJsonLd(head.jsonLd);
  }, [pathname]);

  return null;
};

export default Seo;

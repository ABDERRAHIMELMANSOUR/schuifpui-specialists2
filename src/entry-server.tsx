/**
 * Server-entry voor de statische prerender.
 *
 * `vite build --ssr src/entry-server.tsx` bundelt dit bestand naar dist-ssr/,
 * waarna `scripts/prerender.mjs` per route `render()` aanroept en de HTML
 * wegschrijft. Zo krijgt elke URL echte, door crawlers leesbare HTML in plaats
 * van een lege SPA-shell.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";

export const render = (url: string): string =>
  renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );

// Doorgeven aan het prerender-script, zodat dat maar één bundle hoeft te laden.
export { routes, notFoundRoute } from "./lib/routes";
export { buildHead } from "./lib/seo";
export { redirects } from "./lib/redirects";
export { SITE_URL } from "./lib/site";

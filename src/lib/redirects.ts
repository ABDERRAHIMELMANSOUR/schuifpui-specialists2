/**
 * Permanente (301) redirects voor oude, verkeerd getypte of verplaatste URL's.
 *
 * Deze lijst is de bron van waarheid; `vercel.json` bevat dezelfde regels zodat
 * de redirect al op HTTP-niveau plaatsvindt (Google volgt dan een echte 301 in
 * plaats van een client-side redirect). De test `src/test/seo.test.ts` bewaakt
 * dat beide lijsten identiek blijven en dat elk doel een bestaande route is.
 *
 * Vindt u in Google Search Console een 404 die hier nog niet staat? Voeg de
 * regel op BEIDE plekken toe (dit bestand én vercel.json) en de test blijft groen.
 */
export type Redirect = {
  from: string;
  to: string;
};

export const redirects: Redirect[] = [
  // Oude / alternatieve homepage-URL's
  { from: "/index.html", to: "/" },
  { from: "/home", to: "/" },

  // Engelstalige varianten uit de eerdere sitestructuur
  { from: "/services", to: "/diensten" },
  { from: "/service", to: "/diensten" },
  { from: "/about", to: "/over-ons" },
  { from: "/about-us", to: "/over-ons" },
  { from: "/contact-us", to: "/contact" },
  { from: "/areas", to: "/werkgebieden" },
  { from: "/service-areas", to: "/werkgebieden" },
  { from: "/reviews", to: "/beoordelingen" },

  // Nederlandse enkelvoud-/spelvarianten
  { from: "/dienst", to: "/diensten" },
  { from: "/werkgebied", to: "/werkgebieden" },
  { from: "/over", to: "/over-ons" },
  { from: "/overons", to: "/over-ons" },
  { from: "/beoordeling", to: "/beoordelingen" },
  { from: "/referenties", to: "/beoordelingen" },

  // Losse dienst-URL's zonder /diensten-prefix
  { from: "/schuifpui-reparatie", to: "/diensten/schuifpui-reparatie" },
  { from: "/schuifpui-onderhoud", to: "/diensten/schuifpui-onderhoud" },
  { from: "/onderhoud", to: "/diensten/schuifpui-onderhoud" },
  { from: "/slot-reparatie", to: "/diensten/slot-reparatie-schuifpui" },
  { from: "/slot-reparatie-schuifpui", to: "/diensten/slot-reparatie-schuifpui" },
  { from: "/hendel-reparatie", to: "/diensten/hendel-reparatie" },
  { from: "/inbraakschade", to: "/diensten/inbraakschade-herstel" },
  { from: "/inbraakschade-herstel", to: "/diensten/inbraakschade-herstel" },

  // Losse stad-URL's zonder /werkgebieden-prefix
  { from: "/amsterdam", to: "/werkgebieden/amsterdam" },
  { from: "/rotterdam", to: "/werkgebieden/rotterdam" },
  { from: "/utrecht", to: "/werkgebieden/utrecht" },
  { from: "/den-haag", to: "/werkgebieden/den-haag" },
  { from: "/eindhoven", to: "/werkgebieden/eindhoven" },
  { from: "/tilburg", to: "/werkgebieden/tilburg" },
  { from: "/breda", to: "/werkgebieden/breda" },
  { from: "/arnhem", to: "/werkgebieden/arnhem" },
  { from: "/nijmegen", to: "/werkgebieden/nijmegen" },
  { from: "/almere", to: "/werkgebieden/almere" },
  { from: "/tiel", to: "/werkgebieden/tiel" },
];

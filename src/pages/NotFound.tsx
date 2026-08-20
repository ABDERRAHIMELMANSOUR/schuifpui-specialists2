import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { services } from "@/content/services";
import { cities } from "@/content/cities";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

/**
 * 404-pagina. Wordt door Vercel geserveerd als /404.html met een echte
 * HTTP 404-status (zie vercel.json: geen SPA catch-all rewrite meer), zodat
 * Google onbekende URL's als verdwenen ziet in plaats van als "soft 404".
 */
const NotFound = () => {
  const { pathname } = useLocation();

  // Deze pagina wordt als één statisch bestand (404.html) geserveerd voor élke
  // onbekende URL. Het opgevraagde pad mag dus pas ná het mounten in beeld
  // komen, anders wijkt de client-render af van de geprerenderde HTML.
  const [requestedPath, setRequestedPath] = useState<string | null>(null);
  useEffect(() => setRequestedPath(pathname), [pathname]);

  return (
    <Layout>
      <section className="bg-primary">
        <div className="container py-16 md:py-24 text-center">
          <p className="font-heading text-6xl md:text-7xl font-extrabold text-accent mb-4">404</p>
          <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Deze pagina bestaat niet (meer)
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            {requestedPath ? (
              <>
                De pagina <span className="font-mono text-sm">{requestedPath}</span> is verplaatst
                of verwijderd.
              </>
            ) : (
              <>Deze pagina is verplaatst of verwijderd.</>
            )}{" "}
            Via de links hieronder vindt u snel wat u zoekt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button variant="hero" size="lg" asChild>
              <Link to="/">
                <Home className="w-5 h-5" />
                Naar de homepage
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href={`tel:${PHONE_E164}`}>
                <Phone className="w-5 h-5" />
                {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-heading text-xl font-bold mb-4">Onze diensten</h2>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/diensten/${service.slug}`}
                      className="text-muted-foreground hover:text-accent inline-flex items-center gap-1 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 shrink-0" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold mb-4">Onze werkgebieden</h2>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    to={`/werkgebieden/${city.slug}`}
                    className="inline-flex items-center text-sm bg-card border border-border rounded-full px-4 py-2 text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;

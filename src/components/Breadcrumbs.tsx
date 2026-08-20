import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; path?: string };

/**
 * Zichtbaar kruimelpad. Doet twee dingen tegelijk: het geeft bezoekers houvast
 * en het levert Google interne links naar de bovenliggende pagina's — precies
 * wat diepere pagina's nodig hebben om geïndexeerd te raken.
 * De bijbehorende BreadcrumbList JSON-LD komt uit src/lib/seo.ts.
 */
const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Kruimelpad" className="text-sm">
    <ol className="flex flex-wrap items-center gap-1 text-primary-foreground/70">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={item.name} className="flex items-center gap-1">
            {item.path && !isLast ? (
              <Link to={item.path} className="hover:text-primary-foreground transition-colors">
                {item.name}
              </Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined} className="text-primary-foreground">
                {item.name}
              </span>
            )}
            {!isLast && <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;

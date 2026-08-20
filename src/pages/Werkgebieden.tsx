import { Link } from "react-router-dom";
import { MapPin, Phone, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { cities } from "@/content/cities";
import { services } from "@/content/services";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

const Werkgebieden = () => (
  <Layout>
    <section className="bg-primary">
      <div className="container py-16 md:py-24">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Werkgebieden" }]} />
        <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mt-6 mb-4">
          Werkgebieden: Schuifpui Service in Heel Nederland
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl">
          Schuifpui Service Nederland is actief in het hele land. Kies hieronder uw stad of regio
          voor lokale informatie, aanrijtijden en klantervaringen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button variant="hero" size="lg" asChild>
            <a href={`tel:${PHONE_E164}`}>
              <Phone className="w-5 h-5" />
              Bel direct: {PHONE_DISPLAY}
            </a>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/contact">Offerte aanvragen</Link>
          </Button>
        </div>
      </div>
    </section>

    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cities.map((city) => (
            <article
              key={city.slug}
              className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <h2 className="font-heading font-bold text-xl">
                  Schuifpui Reparatie {city.name}
                </h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                {city.summary}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {city.province}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {city.responseTime}
                </span>
              </div>
              <Link
                to={`/werkgebieden/${city.slug}`}
                className="text-accent text-sm font-medium inline-flex items-center gap-1 hover:underline"
              >
                Schuifpui specialist in {city.name} <ChevronRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-secondary">
      <div className="container py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-4">
          Welke dienst heeft u nodig?
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          Al onze diensten zijn in elk werkgebied beschikbaar.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/diensten/${service.slug}`}
              className="bg-card rounded-xl p-5 border border-border hover:border-accent hover:shadow-md transition-all"
            >
              <h3 className="font-heading font-bold text-base mb-1">{service.name}</h3>
              <p className="text-muted-foreground text-sm">{service.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-primary">
      <div className="container py-14 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
          Uw stad niet vermeld?
        </h2>
        <p className="text-primary-foreground/70 mb-8">
          Geen probleem — wij zijn actief door heel Nederland. Neem contact op en wij plannen een
          monteur in bij u in de buurt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <a href={`tel:${PHONE_E164}`}>
              <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
            </a>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/contact">Contact Opnemen</Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Werkgebieden;

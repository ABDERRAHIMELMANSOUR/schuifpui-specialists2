import { Link } from "react-router-dom";
import { Wrench, Lock, Hand, ShieldAlert, Settings, Phone, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { services } from "@/content/services";
import { cities } from "@/content/cities";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";
import serviceImage from "@/assets/service-repair.jpg";

const ICONS = { Wrench, Lock, Hand, ShieldAlert, Settings } as const;

const Diensten = () => (
  <Layout>
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={serviceImage}
          alt="Schuifpui reparatie specialist aan het werk aan een aluminium schuifpui"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(215,70%,22%,0.8)] to-[hsl(200,80%,30%,0.65)]" />
      </div>
      <div className="relative container py-16 md:py-24">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Diensten" }]} />
        <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mt-6 mb-4">
          Diensten: Schuifpui Reparatie, Slot en Onderhoud
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl">
          Professionele schuifpui service in heel Nederland — van reparatie en slotvervanging tot
          inbraakschade herstel en preventief onderhoud.
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
        <div className="space-y-8">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Wrench;
            return (
              <article
                key={service.slug}
                className={`flex flex-col lg:flex-row gap-8 items-start bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl mb-3">{service.name}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{service.intro[0]}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-5">
                    {service.symptoms.slice(0, 4).map((symptom) => (
                      <li key={symptom} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-1" />
                        <span className="text-sm text-muted-foreground">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/diensten/${service.slug}`}
                    className="text-accent font-medium inline-flex items-center gap-1 hover:underline"
                  >
                    Lees meer over {service.shortName.toLowerCase()}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="bg-secondary">
      <div className="container py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-4">
          In welke plaats heeft u een schuifpui specialist nodig?
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          Wij werken in heel Nederland. Bekijk de pagina van uw regio voor lokale informatie en
          aanrijtijden.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              to={`/werkgebieden/${city.slug}`}
              className="inline-flex items-center bg-card border border-border rounded-full px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-primary">
      <div className="container py-14 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
          Direct hulp nodig?
        </h2>
        <p className="text-primary-foreground/70 mb-8">
          Bel ons of vraag een vrijblijvende offerte aan — meestal binnen 24 uur ter plaatse.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <a href={`tel:${PHONE_E164}`}>
              <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
            </a>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/contact">Offerte Aanvragen</Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Diensten;

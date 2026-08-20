import { Link, Navigate, useParams } from "react-router-dom";
import {
  Wrench,
  Lock,
  Hand,
  ShieldAlert,
  Settings,
  Phone,
  CheckCircle,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { services, serviceBySlug } from "@/content/services";
import { cities } from "@/content/cities";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";
import serviceImage from "@/assets/service-repair.jpg";

const ICONS = { Wrench, Lock, Hand, ShieldAlert, Settings } as const;

/** Detailpagina per dienst: /diensten/:slug */
const DienstDetail = () => {
  const { slug } = useParams();
  const service = slug ? serviceBySlug(slug) : undefined;

  // Onbekende slug: doorsturen naar het dienstenoverzicht in plaats van een
  // lege pagina tonen. Onbekende URL's leveren op serverniveau al een 404 op.
  if (!service) return <Navigate to="/diensten" replace />;

  const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Wrench;
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={serviceImage}
            alt={`${service.name} door een monteur van Schuifpui Service Nederland`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(215,70%,22%,0.85)] to-[hsl(200,80%,30%,0.7)]" />
        </div>
        <div className="relative container py-14 md:py-20">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Diensten", path: "/diensten" },
              { name: service.shortName },
            ]}
          />
          <div className="flex items-center gap-4 mt-6 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground">
              {service.h1}
            </h1>
          </div>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">{service.summary}</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button variant="hero" size="lg" asChild>
              <a href={`tel:${PHONE_E164}`}>
                <Phone className="w-5 h-5" />
                Bel direct: {PHONE_DISPLAY}
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">Vraag een offerte aan</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {service.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold mb-4">
                  Herkent u een van deze klachten?
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.symptoms.map((symptom) => (
                    <li
                      key={symptom}
                      className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border"
                    >
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {service.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-heading text-2xl font-bold mb-4">{section.heading}</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div>
                <h2 className="font-heading text-2xl font-bold mb-6">
                  Veelgestelde vragen over {service.shortName.toLowerCase()}
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq) => (
                    <details key={faq.q} className="bg-card rounded-xl border border-border group">
                      <summary className="px-6 py-4 font-heading font-bold text-foreground cursor-pointer list-none flex items-center justify-between gap-4">
                        <h3 className="text-base font-heading font-bold">{faq.q}</h3>
                        <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                <h2 className="font-heading font-bold text-lg mb-2">
                  Direct een monteur inplannen?
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Meestal binnen 24 uur ter plaatse, met garantie op het werk en de onderdelen.
                </p>
                <Button variant="cta" size="lg" className="w-full mb-3" asChild>
                  <a href={`tel:${PHONE_E164}`}>
                    <Phone className="w-4 h-4" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/contact">Offerte aanvragen</Link>
                </Button>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="font-heading font-bold text-lg mb-4">Onze andere diensten</h2>
                <ul className="space-y-2">
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link
                        to={`/diensten/${other.slug}`}
                        className="text-sm text-muted-foreground hover:text-accent inline-flex items-center gap-1 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 shrink-0" />
                        {other.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="font-heading font-bold text-lg mb-4">
                  {service.shortName} in uw regio
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      to={`/werkgebieden/${city.slug}`}
                      className="inline-flex items-center gap-1 text-xs bg-secondary border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                    >
                      <MapPin className="w-3 h-3" />
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-primary">
        <div className="container py-14 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            {service.name} nodig? Wij staan voor u klaar
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Bel voor direct advies of vraag online een vrijblijvende offerte aan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href={`tel:${PHONE_E164}`}>
                <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">Offerte aanvragen</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DienstDetail;

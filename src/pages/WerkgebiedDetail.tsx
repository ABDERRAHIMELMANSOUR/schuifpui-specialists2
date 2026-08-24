import { Link, Navigate, useParams } from "react-router-dom";
import { MapPin, Phone, Clock, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewDialog from "@/components/ReviewDialog";
import StarRating from "@/components/StarRating";
import { cities, cityBySlug } from "@/content/cities";
import { services } from "@/content/services";
import { isUserReview, useReviews } from "@/hooks/use-reviews";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";
import workPhoto from "@/assets/work-photo-2.jpg";

/** Detailpagina per werkgebied: /werkgebieden/:slug */
const WerkgebiedDetail = () => {
  const { slug } = useParams();
  const { reviews } = useReviews();
  const city = slug ? cityBySlug(slug) : undefined;

  if (!city) return <Navigate to="/werkgebieden" replace />;

  // Ook een zelf ingestuurde review uit deze plaats verschijnt hier direct.
  const localReviews = reviews.filter(
    (review) => review.city.toLowerCase() === city.name.toLowerCase(),
  );
  const otherCities = cities.filter((c) => c.slug !== city.slug);

  return (
    <Layout>
      <section className="bg-primary">
        <div className="container py-14 md:py-20">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Werkgebieden", path: "/werkgebieden" },
              { name: city.name },
            ]}
          />
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mt-6 mb-4">
            {city.h1}
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">{city.summary}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-primary-foreground/70 text-sm">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Provincie {city.province}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" /> Aanrijtijd: {city.responseTime}
            </span>
          </div>
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
        <div className="container py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {city.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <figure className="rounded-xl overflow-hidden border border-border">
                <img
                  src={workPhoto}
                  alt={`Schuifpui reparatie monteur aan het werk in ${city.name}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  width={1200}
                  height={900}
                />
                <figcaption className="bg-card px-4 py-3 text-xs text-muted-foreground">
                  Onze monteur tijdens een schuifpui reparatie in de regio {city.name}.
                </figcaption>
              </figure>

              {city.sections.map((section) => (
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
                <h2 className="font-heading text-2xl font-bold mb-4">
                  Wijken en kernen waar wij komen
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Onze monteurs zijn actief in heel {city.name} en omgeving, onder meer in:
                </p>
                <div className="flex flex-wrap gap-2">
                  {city.districts.map((district) => (
                    <span
                      key={district}
                      className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-4 py-2 text-sm text-foreground"
                    >
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      {district}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold mb-4">
                  Onze diensten in {city.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/diensten/${service.slug}`}
                      className="bg-card rounded-xl p-5 border border-border hover:border-accent hover:shadow-md transition-all"
                    >
                      <h3 className="font-heading font-bold text-base mb-1">
                        {service.name} {city.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">{service.summary}</p>
                      <span className="text-accent text-sm font-medium inline-flex items-center gap-1 mt-3">
                        Meer over deze dienst <ChevronRight className="w-4 h-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {localReviews.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold mb-4">
                    Wat klanten in {city.name} zeggen
                  </h2>
                  <div className="space-y-4">
                    {localReviews.map((review) => (
                      <blockquote
                        key={isUserReview(review) ? review.id : `${review.name}-${review.date}`}
                        className="bg-card rounded-xl p-6 border border-border"
                      >
                        <StarRating rating={review.rating} className="mb-3" />
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          “{review.text}”
                        </p>
                        <footer className="text-sm">
                          <span className="font-medium text-foreground">{review.name}</span>
                          <span className="text-muted-foreground"> — {review.service}</span>
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                  <div className="mt-4">
                    <ReviewDialog
                      label={`Schrijf een review over ${city.name}`}
                      variant="outline"
                      size="lg"
                    />
                  </div>
                </div>
              )}

              <div>
                <h2 className="font-heading text-2xl font-bold mb-6">
                  Veelgestelde vragen over schuifpui reparatie in {city.name}
                </h2>
                <div className="space-y-3">
                  {city.faqs.map((faq) => (
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
                  Schuifpui specialist in {city.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {city.responseTime.charAt(0).toUpperCase() + city.responseTime.slice(1)} ter
                  plaatse, met 100% garantie op reparatie en onderdelen.
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
                <h2 className="font-heading font-bold text-lg mb-4">Andere werkgebieden</h2>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((other) => (
                    <Link
                      key={other.slug}
                      to={`/werkgebieden/${other.slug}`}
                      className="inline-flex items-center gap-1 text-xs bg-secondary border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                    >
                      <MapPin className="w-3 h-3" />
                      {other.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WerkgebiedDetail;

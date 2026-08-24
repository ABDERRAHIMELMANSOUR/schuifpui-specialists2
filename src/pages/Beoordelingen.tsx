import { Link } from "react-router-dom";
import { Phone, ExternalLink, Users, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewDialog from "@/components/ReviewDialog";
import StarRating from "@/components/StarRating";
import { isUserReview, useReviews } from "@/hooks/use-reviews";
import { GOOGLE_REVIEW_URL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("nl-NL", { year: "numeric", month: "long" });

/**
 * Overzicht van alle klantbeoordelingen + de mogelijkheid er zelf een achter te
 * laten. De lijst is de samenvoeging van de gecontroleerde reviews en de
 * reviews die de bezoeker zelf heeft ingestuurd (opgeslagen in localStorage),
 * inclusief het bijgewerkte gemiddelde en aantal.
 */
const Beoordelingen = () => {
  const { reviews, reviewCount, averageRating, userReviews, loading, removeReview } = useReviews();

  // Eigen reviews bovenaan, daarna de rest op datum aflopend.
  const sorted = [...reviews].sort((a, b) => {
    const own = Number(isUserReview(b)) - Number(isUserReview(a));
    return own !== 0 ? own : b.date.localeCompare(a.date);
  });

  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((review) => review.rating === stars).length,
  }));

  return (
    <Layout>
      <section className="bg-primary">
        <div className="container py-14 md:py-20">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Beoordelingen" }]} />
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mt-6 mb-4">
            Beoordelingen van Onze Klanten
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Lees wat klanten uit heel Nederland vinden van onze schuifpui reparatie en onderhoud —
            en laat gerust zelf een beoordeling achter.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Samenvatting */}
            <div className="bg-card rounded-xl p-8 border border-border text-center lg:sticky lg:top-24">
              <div className="text-5xl font-heading font-extrabold text-accent mb-2">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={Math.round(averageRating)} className="justify-center mb-2" />
              <p className="text-muted-foreground text-sm mb-6">
                Gemiddeld op basis van {reviewCount} beoordelingen
              </p>

              <ul className="space-y-2 text-left mb-6">
                {distribution.map(({ stars, count }) => (
                  <li key={stars} className="flex items-center gap-3 text-sm">
                    <span className="w-12 shrink-0 text-muted-foreground">{stars} ster</span>
                    <span className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                      <span
                        className="block h-full bg-accent"
                        style={{ width: `${(count / reviewCount) * 100}%` }}
                      />
                    </span>
                    <span className="w-6 text-right text-muted-foreground">{count}</span>
                  </li>
                ))}
              </ul>

              <ReviewDialog label="Laat een beoordeling achter" className="w-full mb-3" />
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Beoordeel ons op Google
                </a>
              </Button>
            </div>

            {/* Reviews */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold mb-2">
                Alle {reviewCount} beoordelingen
              </h2>
              {loading && (
                <p className="text-sm text-muted-foreground mb-6" role="status">
                  Nieuwe beoordelingen worden geladen...
                </p>
              )}
              {userReviews.length > 0 && (
                <p className="text-sm text-muted-foreground mb-6">
                  Waarvan {userReviews.length}{" "}
                  {userReviews.length === 1 ? "beoordeling" : "beoordelingen"} van uzelf.
                  {userReviews.some((review) => review.awaitingApproval)
                    ? " Die plaatsen wij op de site zodra wij hem hebben gelezen."
                    : " Die staan voorlopig alleen op dit apparaat."}
                </p>
              )}
              <div className="mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sorted.map((review) => {
                  const own = isUserReview(review);
                  return (
                    <article
                      key={own ? review.id : `${review.name}-${review.date}`}
                      className={`bg-card rounded-xl p-6 border ${
                        own ? "border-accent ring-1 ring-accent/30" : "border-border"
                      }`}
                    >
                      {own && (
                        <p className="text-xs font-medium text-accent mb-3">
                          {review.awaitingApproval
                            ? "Uw beoordeling · zichtbaar voor iedereen zodra wij hem hebben gelezen"
                            : "Uw beoordeling · voorlopig alleen op dit apparaat zichtbaar"}
                        </p>
                      )}
                      <StarRating rating={review.rating} className="mb-3" />
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        “{review.text}”
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm text-foreground">{review.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {review.city} · {review.service} · {formatDate(review.date)}
                          </div>
                        </div>
                        {own && (
                          <button
                            type="button"
                            onClick={() => removeReview(review.id)}
                            aria-label={`Beoordeling van ${review.name} verwijderen`}
                            className="p-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-10 bg-secondary rounded-xl p-8 border border-border">
                <h2 className="font-heading text-xl font-bold mb-2">
                  Onlangs bij u geweest? Deel uw ervaring
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Uw beoordeling helpt andere mensen die zoeken naar een betrouwbare schuifpui
                  specialist. Het invullen kost nog geen minuut.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <ReviewDialog label="Schrijf een review" />
                  <Button variant="outline" size="lg" asChild>
                    <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Via Google
                    </a>
                  </Button>
                </div>
              </div>

              <nav className="mt-10 flex flex-wrap gap-4 text-sm" aria-label="Gerelateerde pagina's">
                <Link to="/diensten" className="text-accent inline-flex items-center gap-1 hover:underline">
                  Bekijk onze diensten <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/werkgebieden" className="text-accent inline-flex items-center gap-1 hover:underline">
                  Bekijk onze werkgebieden <ChevronRight className="w-4 h-4" />
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary">
        <div className="container py-14 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Zelf ook zo geholpen worden?
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

export default Beoordelingen;

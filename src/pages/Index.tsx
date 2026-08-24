import { Link } from "react-router-dom";
import {
  Phone,
  FileText,
  Shield,
  Clock,
  Wrench,
  CheckCircle,
  MapPin,
  Users,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ReviewDialog from "@/components/ReviewDialog";
import StarRating from "@/components/StarRating";
import { services } from "@/content/services";
import { cities } from "@/content/cities";
import { featuredReviews } from "@/content/reviews";
import { useReviews } from "@/hooks/use-reviews";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";
import heroImage from "@/assets/image_hero.jpg";
import workPhoto1 from "@/assets/work-photo-1.jpg";
import workPhoto2 from "@/assets/work-photo-2.jpg";
import workPhoto3 from "@/assets/work-photo-3.jpg";
import workPhoto4 from "@/assets/work-photo-4.jpg";
import workPhoto6 from "@/assets/work-photo-6.jpg";
import workPhotoHero from "@/assets/work-photo-hero.jpg";

const stats = [
  { value: "15+", label: "Jaar ervaring" },
  { value: "3000+", label: "Tevreden klanten" },
  { value: "24u", label: "Snelle service" },
  { value: "100%", label: "Garantie" },
];

const benefits = [
  {
    icon: Shield,
    title: "Garantie op Reparaties",
    desc: "Wij staan achter ons werk met garantie op alle reparaties en gebruikte onderdelen.",
  },
  {
    icon: Clock,
    title: "Binnen 24 Uur Ter Plaatse",
    desc: "Meestal binnen 24 uur bij u aan huis, bij spoed vaak nog dezelfde dag.",
  },
  {
    icon: Wrench,
    title: "Gecertificeerde Vakmensen",
    desc: "Ervaren specialisten die dagelijks schuifpuien repareren en onderhouden.",
  },
  {
    icon: CheckCircle,
    title: "Alle Merken & Typen",
    desc: "Van Reynaers en Schüco tot oudere systemen zonder originele onderdelen.",
  },
];

const workPhotos = [
  { src: workPhotoHero, alt: "Schuifpui reparatie monteur aan het werk bij een klant aan huis" },
  { src: workPhoto1, alt: "Schuifpui reparatie: onderhoud en reiniging van de onderrail" },
  { src: workPhoto2, alt: "Vakkundige schuifpui reparatie door een monteur in Nederland" },
  { src: workPhoto4, alt: "Deurrenovatie: het eindresultaat na vervanging bij een klant" },
  { src: workPhoto3, alt: "Vervangen schuifdeur, aan de binnenzijde volledig afgewerkt" },
  { src: workPhoto6, alt: "Renovatiewerkzaamheden aan een schuifpui in de woonkamer" },
];

const faqs = [
  {
    q: "Hoe snel kunnen jullie ter plaatse zijn?",
    a: "In de meeste gevallen zijn wij binnen 24 uur bij u aan huis. Bij spoed, zoals inbraakschade of een niet-afsluitbare schuifpui, proberen wij dezelfde dag nog te komen.",
  },
  {
    q: "Geven jullie garantie op reparaties?",
    a: "Ja, wij geven garantie op al onze reparaties en op de gebruikte onderdelen. De exacte garantieperiode staat vermeld op de offerte.",
  },
  {
    q: "Welke merken schuifpuien repareren jullie?",
    a: "Wij repareren alle gangbare merken, waaronder Reynaers, Schüco, Kawneer, Aliplast, Sapa en Hueck, én oudere systemen waarvan geen originele onderdelen meer leverbaar zijn.",
  },
  {
    q: "Wat kost een schuifpui reparatie?",
    a: "De kosten hangen af van het type reparatie en de benodigde onderdelen. U ontvangt altijd vooraf een vrijblijvende prijsopgave, zodat u niet voor verrassingen komt te staan.",
  },
  {
    q: "Werken jullie door heel Nederland?",
    a: "Ja, wij zijn actief in heel Nederland. Van Amsterdam tot Maastricht komen onze monteurs bij u aan huis.",
  },
];

const Index = () => {
  // Telt een zelf ingestuurde review meteen mee in de score in de hero en de
  // reviewsectie, net als op /beoordelingen.
  const { averageRating, reviewCount } = useReviews();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Moderne schuifpui in een Nederlandse woning, gerepareerd en onderhouden door Schuifpui Service Nederland"
            className="w-full h-full object-cover"
            loading="eager"
            // React 18 geeft `fetchPriority` niet door; het lowercase attribuut wel.
            {...{ fetchpriority: "high" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(215,70%,22%,0.75)] to-[hsl(200,80%,30%,0.6)]" />
        </div>
        <div className="relative container py-20 md:py-32 lg:py-44">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
              Schuifpui Reparatie in Nederland – Snel, Veilig en Professioneel
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 leading-relaxed">
              Problemen met uw schuifpui? Onze specialisten repareren uw schuifdeur vakkundig in heel
              Nederland — meestal binnen 24 uur ter plaatse en met 100% garantie op het werk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  <FileText className="w-5 h-5" />
                  Vraag een Offerte aan
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href={`tel:${PHONE_E164}`}>
                  <Phone className="w-5 h-5" />
                  Bel direct: {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
            <Link
              to="/beoordelingen"
              className="inline-flex items-center gap-2 mt-8 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              <StarRating rating={Math.round(averageRating)} size="w-4 h-4" />
              <span className="text-sm">
                {averageRating.toFixed(1)} uit {reviewCount} beoordelingen
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-4xl font-heading font-extrabold text-accent">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-background">
        <div className="container py-16 md:py-24">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-4">
            Waarom Kiezen voor Schuifpui Service Nederland?
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Wij zijn dé specialist op het gebied van schuifpui reparatie en onderhoud. Met meer dan 15
            jaar ervaring staan wij garant voor vakmanschap en een eerlijke prijs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="bg-secondary">
        <div className="container py-16 md:py-24">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-4">
            Onze Diensten voor Schuifpuien
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Van reparatie en slotvervanging tot preventief onderhoud — wij bieden een compleet pakket
            voor uw schuifpui.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <article
                key={s.slug}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow flex flex-col"
              >
                <Wrench className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-heading font-bold text-lg mb-2">{s.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-1">{s.summary}</p>
                <Link
                  to={`/diensten/${s.slug}`}
                  className="text-accent text-sm font-medium inline-flex items-center gap-1 hover:underline"
                >
                  Meer over {s.shortName.toLowerCase()} <ChevronRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Work Photos */}
      <section className="bg-background">
        <div className="container py-16 md:py-24">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-4">
            Ons Werk in Beeld
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Bekijk foto's van daadwerkelijk uitgevoerde klussen — van schuifpui reparaties tot
            complete deurrenovaties.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workPhotos.map((photo) => (
              <div
                key={photo.alt}
                className="rounded-xl overflow-hidden shadow-md border border-border group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="cta" size="lg" asChild>
              <Link to="/contact">Vraag een Offerte aan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-secondary">
        <div className="container py-16 md:py-24">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-4">
            Wat Onze Klanten Zeggen
          </h2>
          <div className="flex flex-col items-center gap-2 mb-10">
            <StarRating rating={Math.round(averageRating)} size="w-6 h-6" />
            <p className="text-muted-foreground text-center">
              Gemiddeld{" "}
              <span className="font-bold text-foreground">{averageRating.toFixed(1)} van de 5</span> op
              basis van {reviewCount} beoordelingen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.slice(0, 3).map((r) => (
              <blockquote key={`${r.name}-${r.date}`} className="bg-card rounded-xl p-6 border border-border">
                <StarRating rating={r.rating} className="mb-3" />
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">“{r.text}”</p>
                <footer className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.city} · {r.service}
                    </div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Review CTA */}
          <div className="mt-12 bg-card rounded-2xl border border-border p-8 text-center max-w-3xl mx-auto">
            <h3 className="font-heading text-xl md:text-2xl font-bold mb-2">
              Onlangs bij u geweest? Laat een beoordeling achter
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-xl mx-auto">
              Uw ervaring helpt anderen bij het kiezen van een betrouwbare schuifpui specialist. Het
              invullen kost nog geen minuut.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ReviewDialog label="Schrijf een review" />
              <Button variant="outline" size="lg" asChild>
                <Link to="/beoordelingen">Alle beoordelingen lezen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-background">
        <div className="container py-16 md:py-24">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-4">
            Schuifpui Specialist Actief Door Heel Nederland
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Wij bieden schuifpui reparatie en onderhoud in alle grote steden en regio's. Klik op uw
            stad voor lokale informatie en aanrijtijden.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/werkgebieden/${city.slug}`}
                className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                <MapPin className="w-4 h-4" />
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary">
        <div className="container py-16 md:py-24">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
            Veelgestelde Vragen over Schuifpui Reparatie
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-card rounded-xl border border-border group">
                <summary className="px-6 py-4 font-heading font-bold text-foreground cursor-pointer list-none flex items-center justify-between gap-4">
                  <h3 className="text-base font-heading font-bold">{faq.q}</h3>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary">
        <div className="container py-16 md:py-20 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Heeft u een probleem met uw schuifpui?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Neem vandaag nog contact op voor een vrijblijvende offerte of direct advies van een
            specialist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href={`tel:${PHONE_E164}`}>
                <Phone className="w-5 h-5" />
                {PHONE_DISPLAY}
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">Vraag Offerte Aan</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

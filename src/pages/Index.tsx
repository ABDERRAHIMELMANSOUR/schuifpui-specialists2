import { Link } from "react-router-dom";
import { Phone, FileText, Shield, Clock, Wrench, CheckCircle, Star, MapPin, Users, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroImage from "@/assets/image_hero.jpg";
import beforeAfterImage from "@/assets/before-after.jpg";
import workPhoto1 from "@/assets/work-photo-1.jpg";
import workPhoto2 from "@/assets/work-photo-2.jpg";
import workPhoto3 from "@/assets/work-photo-3.jpg";
import workPhoto4 from "@/assets/work-photo-4.jpg";
import workPhoto5 from "@/assets/work-photo-5.jpg";
import workPhoto6 from "@/assets/work-photo-6.jpg";
import workPhotoHero from "@/assets/work-photo-hero.jpg";

const stats = [
  { value: "15+", label: "Jaar ervaring" },
  { value: "3000+", label: "Tevreden klanten" },
  { value: "24u", label: "Snelle service" },
  { value: "100%", label: "Garantie" },
];

const benefits = [
  { icon: Shield, title: "Garantie op Reparaties", desc: "Wij staan achter ons werk met garantie op alle reparaties en onderdelen." },
  { icon: Clock, title: "Snel Ter Plaatse", desc: "Meestal binnen 24 uur bij u aan huis voor een snelle oplossing." },
  { icon: Wrench, title: "Gecertificeerde Vakmensen", desc: "Ons team bestaat uit ervaren en gecertificeerde specialisten." },
  { icon: CheckCircle, title: "Alle Merken & Typen", desc: "Wij werken met alle gangbare merken schuifpuien en schuifdeuren." },
];

const services = [
  { title: "Schuifpui Reparatie", desc: "Reparatie van schuifpuien die zwaar schuiven of niet meer openen." },
  { title: "Slot Reparatie & Vervanging", desc: "Vervangen van kapotte sloten en cilinders voor optimale veiligheid." },
  { title: "Hendel Reparatie", desc: "Reparatie of vervanging van schuifpui handgrepen." },
  { title: "Inbraakschade Herstel", desc: "Professioneel herstellen van schade na een inbraak." },
  { title: "Onderhoud van Schuifpuien", desc: "Preventief onderhoud zodat uw schuifpui soepel blijft werken." },
];

const reviews = [
  { name: "Jan de Vries", city: "Amsterdam", rating: 5, text: "Uitstekende service! Binnen een dag was onze schuifpui weer als nieuw. Zeer vakkundig en netjes gewerkt." },
  { name: "Maria Jansen", city: "Utrecht", rating: 5, text: "Na een inbraak snel geholpen. De monteur was vriendelijk en heeft alles perfect gerepareerd. Aanrader!" },
  { name: "Peter Bakker", city: "Rotterdam", rating: 5, text: "Al jaren onze vaste partij voor onderhoud. Betrouwbaar, punctueel en eerlijke prijzen." },
];

const cities = ["Amsterdam", "Rotterdam", "Utrecht", "Den Haag", "Eindhoven", "Tilburg", "Breda", "Arnhem", "Nijmegen", "Almere"];

const faqs = [
  { q: "Hoe snel kunnen jullie ter plaatse zijn?", a: "In de meeste gevallen zijn wij binnen 24 uur bij u aan huis. Bij spoedgevallen, zoals inbraakschade, proberen wij dezelfde dag nog te komen." },
  { q: "Geven jullie garantie op reparaties?", a: "Ja, wij geven garantie op al onze reparaties en gebruikte onderdelen. De exacte garantieperiode bespreken wij bij de offerte." },
  { q: "Welke merken schuifpuien repareren jullie?", a: "Wij repareren alle gangbare merken schuifpuien, waaronder Reynaers, Schüco, Kawneer, Aliplast en vele andere." },
  { q: "Wat kost een schuifpui reparatie?", a: "De kosten zijn afhankelijk van het type reparatie. Neem contact op voor een vrijblijvende offerte. Wij hanteren transparante en eerlijke prijzen." },
  { q: "Werken jullie door heel Nederland?", a: "Ja, wij zijn actief door heel Nederland. Van Amsterdam tot Maastricht, wij komen bij u aan huis." },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Moderne schuifpui in luxe woning" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(215,70%,22%,0.75)] to-[hsl(200,80%,30%,0.6)]" />
      </div>
      <div className="relative container py-20 md:py-32 lg:py-44">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
            Schuifpui Reparatie in Nederland – Snel, Veilig en Professioneel
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 leading-relaxed">
            Problemen met uw schuifpui? Onze specialisten repareren uw schuifdeur snel en vakkundig in heel Nederland.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                <FileText className="w-5 h-5" />
                Vraag een Offerte aan
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="tel:+31344700234">
                <Phone className="w-5 h-5" />
                Bel Direct
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="bg-card border-b border-border">
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-4xl font-heading font-extrabold text-accent">{s.value}</div>
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
          Wij zijn dé specialist op het gebied van schuifpui reparatie. Met jarenlange ervaring en vakmanschap staan wij garant voor kwaliteit.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
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
          Onze Diensten
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Van reparatie tot preventief onderhoud — wij bieden een compleet pakket voor uw schuifpui.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
              <Wrench className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-heading font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{s.desc}</p>
              <Link to="/diensten" className="text-accent text-sm font-medium inline-flex items-center gap-1 hover:underline">
                Meer informatie <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Before / After */}
    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Voor & Na Reparatie
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Bekijk het verschil dat onze vakkundige reparaties maken. Van versleten en beschadigde schuifpuien naar een perfect werkend resultaat. Wij herstellen uw schuifpui naar de originele staat.
            </p>
            <ul className="space-y-3 mb-6">
              {["Soepel schuivend resultaat", "Verbeterde isolatie", "Nieuwe sloten en hendels", "Professionele afwerking"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Button variant="cta" size="lg" asChild>
              <Link to="/contact">Vraag een Offerte aan</Link>
            </Button>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-border">
            <img src={beforeAfterImage} alt="Voor en na schuifpui reparatie" className="w-full h-auto" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    {/* Reviews */}
    <section className="bg-secondary">
      <div className="container py-16 md:py-24">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-4">
          Wat Onze Klanten Zeggen
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Meer dan 3000 tevreden klanten gingen u voor. Lees hun ervaringen.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-card rounded-xl p-6 border border-border">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Service Areas */}
    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-4">
          Actief Door Heel Nederland
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Wij bieden schuifpui reparatie en service in alle grote steden en regio's van Nederland.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {cities.map((city) => (
            <Link
              key={city}
              to="/werkgebieden"
              className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {city}
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="bg-secondary">
      <div className="container py-16 md:py-24">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
          Veelgestelde Vragen
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="bg-card rounded-xl border border-border group">
              <summary className="px-6 py-4 font-heading font-bold text-foreground cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* Contact Form CTA */}
    <section className="bg-primary">
      <div className="container py-16 md:py-20 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
          Heeft u een probleem met uw schuifpui?
        </h2>
        <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
          Neem vandaag nog contact met ons op voor een vrijblijvende offerte of direct advies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <a href="tel:+31344700234">
              <Phone className="w-5 h-5" />
              0344 700 234
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

export default Index;
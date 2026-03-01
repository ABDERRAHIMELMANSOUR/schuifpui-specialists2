import { Link } from "react-router-dom";
import { Phone, FileText, Shield, Clock, Wrench, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-sliding-door.jpg";

const stats = [
  { value: "15+", label: "Jaar ervaring" },
  { value: "2500+", label: "Tevreden klanten" },
  { value: "24u", label: "Snelle service" },
];

const benefits = [
  { icon: Shield, title: "Garantie", desc: "Op al onze reparaties en installaties" },
  { icon: Clock, title: "Snel ter plaatse", desc: "Binnen 24 uur bij u aan huis" },
  { icon: Wrench, title: "Vakmanschap", desc: "Gecertificeerde specialisten" },
  { icon: CheckCircle, title: "Alle merken", desc: "Wij werken met alle gangbare merken" },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Moderne schuifpui in luxe woning" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
      </div>
      <div className="relative container py-20 md:py-32 lg:py-40">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
            Dé Schuifpui Specialisten van Nederland
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 leading-relaxed">
            Professionele reparatie, onderhoud en installatie van schuifpuien. Snel, vakkundig en met garantie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="tel:+31344700234">
                <Phone className="w-5 h-5" />
                Bel Direct
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">
                <FileText className="w-5 h-5" />
                Vraag Offerte Aan
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="bg-card border-b border-border">
      <div className="container py-10">
        <div className="grid grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-4xl font-heading font-extrabold text-accent">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
          Waarom kiezen voor ons?
        </h2>
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

    {/* CTA */}
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
              +31 344 700 234
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

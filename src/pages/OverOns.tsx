import { Link } from "react-router-dom";
import { Award, Users, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const highlights = [
  { icon: Award, title: "15+ Jaar Ervaring", desc: "Al meer dan 15 jaar de specialist in schuifpuien." },
  { icon: Users, title: "2500+ Klanten", desc: "Duizenden tevreden klanten door heel Nederland." },
  { icon: MapPin, title: "Heel Nederland", desc: "Wij komen bij u aan huis, waar u ook woont." },
  { icon: Clock, title: "Snelle Service", desc: "Meestal binnen 24 uur bij u ter plaatse." },
];

const OverOns = () => (
  <Layout>
    {/* Hero */}
    <section className="bg-primary">
      <div className="container py-16 md:py-24">
        <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
          Over Ons
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-xl">
          Vakmanschap, betrouwbaarheid en service staan bij ons centraal.
        </p>
      </div>
    </section>

    {/* About content */}
    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
            Uw vertrouwde partner voor schuifpuien
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Schuifpuispecialisten is al meer dan 15 jaar dé specialist op het gebied van schuifpui reparatie, onderhoud en installatie in Nederland. Ons team van gecertificeerde vakmensen staat garant voor kwaliteit en een snelle, betrouwbare service.
            </p>
            <p>
              Wij werken met alle gangbare merken en typen schuifpuien. Of het nu gaat om een kleine reparatie, het vervangen van glas of de installatie van een compleet nieuwe schuifpui — wij staan voor u klaar.
            </p>
            <p>
              Klanttevredenheid staat bij ons op nummer één. Daarom bieden wij altijd een vrijblijvende offerte en geven wij garantie op al onze werkzaamheden. Onze monteurs zijn ervaren, betrouwbaar en werken netjes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {highlights.map((h) => (
            <div key={h.title} className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <h.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">{h.title}</h3>
              <p className="text-muted-foreground text-sm">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary">
      <div className="container py-14 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
          Klaar om te starten?
        </h2>
        <p className="text-primary-foreground/70 mb-8">Neem contact op voor een vrijblijvend adviesgesprek.</p>
        <Button variant="hero" size="lg" asChild>
          <Link to="/contact"><Phone className="w-5 h-5" /> Neem Contact Op</Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default OverOns;

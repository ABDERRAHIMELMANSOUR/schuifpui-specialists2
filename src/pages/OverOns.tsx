import { Link } from "react-router-dom";
import { Award, Users, MapPin, Clock, Phone, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewDialog from "@/components/ReviewDialog";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

const highlights = [
  { icon: Award, title: "15+ Jaar Ervaring", desc: "Al meer dan 15 jaar dé specialist in schuifpui reparatie en onderhoud." },
  { icon: Users, title: "3000+ Klanten", desc: "Duizenden tevreden klanten door heel Nederland." },
  { icon: MapPin, title: "Heel Nederland", desc: "Wij komen bij u aan huis, waar u ook woont." },
  { icon: Clock, title: "Snelle Service", desc: "Meestal binnen 24 uur bij u ter plaatse." },
];

const values = [
  "Gecertificeerde en ervaren vakmensen",
  "Transparante en eerlijke prijzen",
  "Garantie op alle reparaties",
  "Alleen originele onderdelen",
  "Schoon en netjes werken",
  "Persoonlijk advies op maat",
];

const OverOns = () => (
  <Layout>
    <section className="bg-primary">
      <div className="container py-16 md:py-24">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Over Ons" }]} />
        <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mt-6 mb-4">
          Over Schuifpui Service Nederland – Uw Schuifpui Specialist
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl">
          Al meer dan 15 jaar het vertrouwde adres voor schuifpui reparatie en onderhoud in heel
          Nederland. Vakmanschap, betrouwbaarheid en klanttevredenheid staan bij ons centraal.
        </p>
      </div>
    </section>

    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
              Uw Vertrouwde Partner voor Schuifpui Reparatie
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Schuifpui Service Nederland is al meer dan 15 jaar dé specialist op het gebied van schuifpui reparatie en onderhoud in heel Nederland. Ons team van gecertificeerde vakmensen staat garant voor kwaliteit, snelheid en een betrouwbare service.
              </p>
              <p>
                Wij zijn gespecialiseerd in het repareren van schuifpuien van alle merken en typen. Of het nu gaat om een slot dat vervangen moet worden, een hendel die kapot is, inbraakschade die hersteld moet worden, of preventief onderhoud — wij staan voor u klaar.
              </p>
              <p>
                Onze monteurs zijn niet alleen vakkundig, maar ook betrouwbaar en klantvriendelijk. Wij werken altijd netjes en laten uw huis achter zoals wij het aantroffen. Klanttevredenheid staat bij ons op nummer één.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-accent" />
              Onze Kernwaarden
            </h3>
            <ul className="space-y-3">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground font-medium text-sm">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {highlights.map((h) => (
            <div key={h.title} className="text-center p-6 bg-card rounded-xl border border-border">
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

    <section className="bg-primary">
      <div className="container py-14 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
          Klaar om te starten?
        </h2>
        <p className="text-primary-foreground/70 mb-8">
          Neem contact op voor een vrijblijvend adviesgesprek of bel direct met een specialist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <a href={`tel:${PHONE_E164}`}>
              <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
            </a>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/contact">Neem Contact Op</Link>
          </Button>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/10">
          <p className="text-primary-foreground/70 text-sm mb-4">
            Al klant geweest? Wij horen graag wat u van onze service vond.
          </p>
          <ReviewDialog label="Laat een beoordeling achter" />
        </div>
      </div>
    </section>
  </Layout>
);

export default OverOns;
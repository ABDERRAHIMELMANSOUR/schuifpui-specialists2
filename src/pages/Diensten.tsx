import { Link } from "react-router-dom";
import { Wrench, Lock, Hand, ShieldAlert, Settings, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import serviceImage from "@/assets/service-repair.jpg";

const services = [
  {
    icon: Wrench,
    title: "Schuifpui Reparatie",
    desc: "Reparatie van schuifpuien die zwaar schuiven of niet meer openen. Wij vervangen wieltjes, rails en andere onderdelen zodat uw schuifpui weer soepel loopt. Onze monteurs hebben ervaring met alle merken en typen schuifpuien.",
  },
  {
    icon: Lock,
    title: "Slot Reparatie en Vervanging",
    desc: "Vervangen van kapotte sloten en cilinders. Een goed werkend slot is essentieel voor de veiligheid van uw woning. Wij plaatsen sloten van hoge kwaliteit die voldoen aan de nieuwste veiligheidsnormen.",
  },
  {
    icon: Hand,
    title: "Hendel Reparatie",
    desc: "Reparatie of vervanging van schuifpui handgrepen. Een kapotte hendel maakt het onmogelijk om uw schuifpui goed te openen of te sluiten. Wij leveren en monteren hendels voor alle gangbare merken.",
  },
  {
    icon: ShieldAlert,
    title: "Inbraakschade Herstel",
    desc: "Herstellen van schade na een inbraak. Wij begrijpen dat snelheid en vakmanschap cruciaal zijn na een inbraak. Onze monteurs komen zo snel mogelijk bij u langs om de schade professioneel te herstellen.",
  },
  {
    icon: Settings,
    title: "Onderhoud van Schuifpuien",
    desc: "Preventief onderhoud zodat uw schuifpui soepel blijft werken. Regelmatig onderhoud voorkomt dure reparaties en verlengt de levensduur van uw schuifpui. Wij bieden onderhoudscontracten en eenmalige beurten.",
  },
];

const Diensten = () => (
  <Layout>
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={serviceImage} alt="Schuifpui reparatie specialist aan het werk" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
      </div>
      <div className="relative container py-16 md:py-24">
        <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
          Onze Diensten
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-xl">
          Professionele schuifpui service — van reparatie en slot vervanging tot inbraakschade herstel en preventief onderhoud.
        </p>
      </div>
    </section>

    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="space-y-8">
          {services.map((s, i) => (
            <div key={s.title} className={`flex flex-col lg:flex-row gap-8 items-start bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <s.icon className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl mb-3">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-primary">
      <div className="container py-14 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
          Direct hulp nodig?
        </h2>
        <p className="text-primary-foreground/70 mb-8">Bel ons of vraag een vrijblijvende offerte aan.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <a href="tel:+31344700234"><Phone className="w-5 h-5" /> 0344 700 234</a>
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
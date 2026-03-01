import { Link } from "react-router-dom";
import { Wrench, Settings, SlidersHorizontal, Square, PlusCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import serviceImage from "@/assets/service-repair.jpg";

const services = [
  {
    icon: Wrench,
    title: "Schuifpui Reparatie",
    desc: "Uw schuifpui loopt niet meer soepel? Wij repareren alle soorten schuifpuien snel en vakkundig. Van kapotte wieltjes tot beschadigde rails.",
  },
  {
    icon: Settings,
    title: "Schuifpui Onderhoud",
    desc: "Regelmatig onderhoud voorkomt dure reparaties. Wij bieden onderhoudscontracten en eenmalige onderhoudsbeurten voor optimale werking.",
  },
  {
    icon: SlidersHorizontal,
    title: "Schuifpui Afstellen",
    desc: "Uw schuifpui sluit niet goed of loopt stroef? Onze specialisten stellen uw schuifpui perfect af voor optimale isolatie en gebruiksgemak.",
  },
  {
    icon: Square,
    title: "Glas Vervangen",
    desc: "Beschadigd of verouderd glas? Wij vervangen enkel, dubbel en HR++ glas in alle gangbare schuifpuien.",
  },
  {
    icon: PlusCircle,
    title: "Nieuwe Schuifpui Installatie",
    desc: "Wilt u een nieuwe schuifpui laten plaatsen? Wij adviseren, leveren en installeren schuifpuien van topkwaliteit.",
  },
];

const Diensten = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={serviceImage} alt="Schuifpui reparatie specialist" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
      </div>
      <div className="relative container py-16 md:py-24">
        <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
          Onze Diensten
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-xl">
          Van reparatie tot volledige installatie — wij zijn uw partner voor alles rondom schuifpuien.
        </p>
      </div>
    </section>

    {/* Services */}
    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <s.icon className="w-6 h-6 text-accent" />
              </div>
              <h2 className="font-heading font-bold text-xl mb-3">{s.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary">
      <div className="container py-14 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
          Direct hulp nodig?
        </h2>
        <p className="text-primary-foreground/70 mb-8">Bel ons of vraag een vrijblijvende offerte aan.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <a href="tel:+31344700234"><Phone className="w-5 h-5" /> Bel Direct</a>
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

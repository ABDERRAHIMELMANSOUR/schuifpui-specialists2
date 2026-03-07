import { Link } from "react-router-dom";
import { MapPin, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const cities = [
  {
    name: "Amsterdam",
    text: "Heeft u een schuifpui in Amsterdam die niet meer goed sluit of zwaar schuift? Onze specialisten komen snel bij u langs in Amsterdam en omgeving. Van de grachtengordel tot Amsterdam-Zuid, wij repareren uw schuifpui vakkundig en met garantie.",
  },
  {
    name: "Rotterdam",
    text: "Schuifpui reparatie in Rotterdam? Wij zijn uw betrouwbare partner in de Maasstad. Of u nu in Rotterdam-Zuid, Kralingen of het centrum woont, onze monteurs staan voor u klaar voor alle schuifpui reparaties en onderhoud.",
  },
  {
    name: "Utrecht",
    text: "In Utrecht en omgeving verzorgen wij professionele schuifpui reparaties. Van kapotte sloten tot stroef lopende schuifdeuren — onze vakmensen in Utrecht lossen het snel en vakkundig op.",
  },
  {
    name: "Den Haag",
    text: "Zoekt u een schuifpui specialist in Den Haag? Wij bieden snelle en betrouwbare schuifpui reparatie in de hofstad. Van Scheveningen tot Loosduinen, wij komen bij u thuis voor reparatie en onderhoud.",
  },
  {
    name: "Eindhoven",
    text: "Schuifpui problemen in Eindhoven? Onze specialisten zijn actief in Eindhoven en de regio Brabant. Wij repareren uw schuifpui snel, zodat u weer veilig en comfortabel van uw woning kunt genieten.",
  },
  {
    name: "Tilburg",
    text: "Ook in Tilburg kunt u rekenen op onze professionele schuifpui service. Of het gaat om een hendel vervanging, slot reparatie of volledig onderhoud — in Tilburg staan wij voor u klaar.",
  },
  {
    name: "Breda",
    text: "Schuifpui reparatie in Breda en omgeving? Onze ervaren monteurs komen bij u langs voor vakkundige reparatie van uw schuifpui. Snel, betrouwbaar en met garantie op ons werk.",
  },
  {
    name: "Arnhem",
    text: "In Arnhem en de regio Gelderland verzorgen wij schuifpui reparaties van hoge kwaliteit. Van inbraakschade herstel tot preventief onderhoud — bel ons voor snelle service in Arnhem.",
  },
  {
    name: "Nijmegen",
    text: "Heeft u schuifpui problemen in Nijmegen? Onze specialisten repareren alle merken schuifpuien in Nijmegen en omgeving. Wij staan bekend om onze snelle service en vakkundige aanpak.",
  },
  {
    name: "Almere",
    text: "Schuifpui service in Almere? Wij zijn actief in heel Flevoland en komen graag bij u langs voor reparatie of onderhoud van uw schuifpui. Bel ons voor een vrijblijvende offerte.",
  },
];

const Werkgebieden = () => (
  <Layout>
    <section className="bg-primary">
      <div className="container py-16 md:py-24">
        <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
          Onze Werkgebieden
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-xl">
          Schuifpui Service Nederland is actief door heel Nederland. Bekijk onze servicegebieden hieronder.
        </p>
      </div>
    </section>

    <section className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cities.map((city) => (
            <article key={city.name} className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-accent" />
                <h2 className="font-heading font-bold text-xl">Schuifpui Reparatie {city.name}</h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{city.text}</p>
              <Link to="/contact" className="text-accent text-sm font-medium inline-flex items-center gap-1 hover:underline">
                Offerte aanvragen <ChevronRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-primary">
      <div className="container py-14 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
          Uw stad niet vermeld?
        </h2>
        <p className="text-primary-foreground/70 mb-8">Geen probleem! Wij zijn actief door heel Nederland. Neem contact op.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <a href="tel:+31344700234"><Phone className="w-5 h-5" /> 0344 700 234</a>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/contact">Contact Opnemen</Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Werkgebieden;
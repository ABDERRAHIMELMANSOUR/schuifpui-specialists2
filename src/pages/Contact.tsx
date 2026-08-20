import { useState } from "react";
import { Phone, Mail, MapPin, Send, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  ADDRESS,
  EMAIL,
  GOOGLE_MAPS_URL,
  MOBILE_DISPLAY,
  MOBILE_E164,
  PHONE_DISPLAY,
  PHONE_E164,
} from "@/lib/site";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ naam: "", telefoon: "", email: "", bericht: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const subject = encodeURIComponent("Contactaanvraag via website");
    const body = encodeURIComponent(
      `Naam: ${form.naam}\nTelefoon: ${form.telefoon}\nEmail: ${form.email}\n\nBericht:\n${form.bericht}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Bericht verzonden!",
        description: "Wij nemen zo snel mogelijk contact met u op.",
      });
      setForm({ naam: "", telefoon: "", email: "", bericht: "" });
    }, 1000);
  };

  return (
    <Layout>
      <section className="bg-primary">
        <div className="container py-16 md:py-24">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact" }]} />
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mt-6 mb-4">
            Contact – Schuifpui Service Nederland
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Neem contact op voor een vrijblijvende offerte of direct advies over uw schuifpui.
            Bereikbaar op werkdagen van 08:00 tot 18:00 uur.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <h2 className="font-heading text-xl font-bold mb-6">Stuur ons een bericht</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Naam *</label>
                  <Input required maxLength={100} autoComplete="name" value={form.naam} onChange={(e) => setForm({ ...form, naam: e.target.value })} placeholder="Uw naam" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Telefoon *</label>
                  <Input required type="tel" maxLength={20} autoComplete="tel" value={form.telefoon} onChange={(e) => setForm({ ...form, telefoon: e.target.value })} placeholder="Uw telefoonnummer" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">E-mail *</label>
                  <Input required type="email" maxLength={255} autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Uw e-mailadres" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Bericht *</label>
                  <Textarea required maxLength={1000} rows={5} value={form.bericht} onChange={(e) => setForm({ ...form, bericht: e.target.value })} placeholder="Beschrijf uw probleem of vraag" />
                </div>
                <Button type="submit" variant="cta" size="lg" className="w-full" disabled={loading}>
                  <Send className="w-4 h-4" />
                  {loading ? "Verzenden..." : "Verstuur Bericht"}
                </Button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-xl font-bold mb-6">Contactgegevens</h2>
                <div className="space-y-4">
                  <a href={`tel:${PHONE_E164}`} className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Telefoon</div>
                      <div className="font-medium">{PHONE_DISPLAY}</div>
                    </div>
                  </a>
                  <a href={`tel:${MOBILE_E164}`} className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Mobiel</div>
                      <div className="font-medium">{MOBILE_DISPLAY}</div>
                    </div>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">E-mail</div>
                      <div className="font-medium">{EMAIL}</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Adres</div>
                      <div className="font-medium not-italic">
                        {ADDRESS.streetAddress}
                        <br />
                        {ADDRESS.postalCode} {ADDRESS.addressLocality}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden border border-border"
              >
                <iframe
                  title="Locatie Schuifpui Service Nederland"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2474.5!2d5.4284!3d51.8853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6e5df893968f3%3A0x4e5e5f5c5b5a5958!2sVoltastraat+3B%2C+4004+KA+Tiel!5e0!3m2!1snl!2snl!4v1700000000000"
                  width="100%"
                  height="250"
                  style={{ border: 0, pointerEvents: "none" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="bg-card px-4 py-3 flex items-center gap-2 text-sm font-medium text-accent hover:underline">
                  <MapPin className="w-4 h-4" />
                  Bekijk op Google Maps
                </div>
              </a>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-heading font-bold mb-2">Liever direct bellen?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Wij zijn bereikbaar van maandag t/m vrijdag, 08:00 - 18:00 uur.
                </p>
                <Button variant="cta" size="lg" asChild>
                  <a href={`tel:${PHONE_E164}`}><Phone className="w-4 h-4" /> Bel nu: {PHONE_DISPLAY}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
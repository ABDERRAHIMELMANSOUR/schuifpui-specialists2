import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ naam: "", telefoon: "", email: "", bericht: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // mailto fallback
    const subject = encodeURIComponent("Contactaanvraag via website");
    const body = encodeURIComponent(
      `Naam: ${form.naam}\nTelefoon: ${form.telefoon}\nEmail: ${form.email}\n\nBericht:\n${form.bericht}`
    );
    window.location.href = `mailto:contact@schuifpuispecialisten.nl?subject=${subject}&body=${body}`;

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
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
            Contact
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl">
            Neem contact met ons op voor een vrijblijvende offerte of advies.
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
                  <Input
                    required
                    maxLength={100}
                    value={form.naam}
                    onChange={(e) => setForm({ ...form, naam: e.target.value })}
                    placeholder="Uw naam"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Telefoon *</label>
                  <Input
                    required
                    type="tel"
                    maxLength={20}
                    value={form.telefoon}
                    onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
                    placeholder="Uw telefoonnummer"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">E-mail *</label>
                  <Input
                    required
                    type="email"
                    maxLength={255}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Uw e-mailadres"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Bericht *</label>
                  <Textarea
                    required
                    maxLength={1000}
                    rows={5}
                    value={form.bericht}
                    onChange={(e) => setForm({ ...form, bericht: e.target.value })}
                    placeholder="Beschrijf uw probleem of vraag"
                  />
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
                  <a href="tel:+31344700234" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Telefoon</div>
                      <div className="font-medium">+31 344 700 234</div>
                    </div>
                  </a>
                  <a href="mailto:contact@schuifpuispecialisten.nl" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">E-mail</div>
                      <div className="font-medium">contact@schuifpuispecialisten.nl</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Werkgebied</div>
                      <div className="font-medium">Heel Nederland</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-heading font-bold mb-2">Liever direct bellen?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Wij zijn bereikbaar van maandag t/m vrijdag, 08:00 - 18:00 uur.
                </p>
                <Button variant="cta" size="lg" asChild>
                  <a href="tel:+31344700234"><Phone className="w-4 h-4" /> Bel Nu</a>
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

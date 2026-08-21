import { useState } from "react";
import { Star, Send, CheckCircle2, ExternalLink, PenLine, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addStoredReview } from "@/hooks/use-reviews";
import { cn } from "@/lib/utils";
import { services } from "@/content/services";
import { EMAIL, GOOGLE_REVIEW_URL } from "@/lib/site";

type ReviewDialogProps = {
  /** Tekst op de knop die de modal opent. */
  label?: string;
  variant?: "cta" | "hero" | "heroOutline" | "outline" | "secondary" | "ghost";
  size?: "sm" | "lg" | "default";
  className?: string;
};

const RATING_LABELS = [
  "Zeer ontevreden",
  "Ontevreden",
  "Neutraal",
  "Tevreden",
  "Zeer tevreden",
];

const emptyForm = { naam: "", plaats: "", dienst: services[0].name, bericht: "" };

/**
 * "Schrijf een review" knop met formulier in een modal.
 *
 * Bij versturen gebeurt er drie dingen:
 *  1. de review wordt opgeslagen in localStorage (zie `useReviews`), zodat hij
 *     direct zichtbaar is op /beoordelingen en meetelt in het gemiddelde;
 *  2. het Google-bedrijfsprofiel wordt in een nieuw tabblad geopend, zodat de
 *     bezoeker de beoordeling ook daar kan achterlaten — dáár telt hij mee voor
 *     de vindbaarheid;
 *  3. de bezoeker krijgt een bevestiging in beeld.
 *
 * De site heeft geen backend, dus lokaal opgeslagen reviews bereiken ons niet
 * vanzelf. In de bevestiging staat daarom een knop om de review ook per e-mail
 * te sturen; die verstuurt niets automatisch maar zet een bericht klaar.
 */
const ReviewDialog = ({
  label = "Schrijf een review",
  variant = "cta",
  size = "lg",
  className,
}: ReviewDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  /** Werd het Google-tabblad geblokkeerd door de browser? */
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [form, setForm] = useState(emptyForm);

  const reset = () => {
    setSubmitted(false);
    setPopupBlocked(false);
    setRating(5);
    setHovered(0);
    setForm(emptyForm);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      // Even wachten tot de sluit-animatie klaar is voordat we resetten.
      window.setTimeout(reset, 200);
    }
  };

  /** Zet dezelfde review klaar als e-mail, zodat wij hem ook echt ontvangen. */
  const mailtoHref = () => {
    const subject = encodeURIComponent(
      `Nieuwe review (${rating}/5) van ${form.naam || "een klant"}`,
    );
    const body = encodeURIComponent(
      [
        `Naam: ${form.naam}`,
        `Woonplaats: ${form.plaats}`,
        `Beoordeling: ${rating} van 5 sterren`,
        `Dienst: ${form.dienst}`,
        "",
        "Beoordeling:",
        form.bericht,
      ].join("\n"),
    );
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addStoredReview({
      name: form.naam.trim(),
      city: form.plaats.trim(),
      rating,
      text: form.bericht.trim(),
      service: form.dienst,
    });

    // Synchroon binnen de klik-afhandeling openen; een `setTimeout` hieromheen
    // zou door popup-blokkers tegengehouden worden.
    const googleTab = window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
    setPopupBlocked(!googleTab);

    setSubmitted(true);
    toast({
      title: "Bedankt voor je review!",
      description: "Help ons door deze ook op Google te plaatsen.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <PenLine className="w-4 h-4" />
          {label}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-center font-heading">
                Bedankt voor je review!
              </DialogTitle>
              <DialogDescription className="text-center">
                Help ons door deze ook op Google te plaatsen. Je beoordeling staat inmiddels
                bovenaan op onze beoordelingenpagina.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 rounded-xl border border-border bg-secondary p-4 text-left">
              <p className="text-sm text-muted-foreground mb-3">
                {popupBlocked
                  ? "Je browser blokkeerde het nieuwe tabblad. Gebruik de knop hieronder om je beoordeling op Google te plaatsen."
                  : "We hebben Google in een nieuw tabblad geopend. Is dat tabblad gesloten? Dan kan het hier opnieuw."}
              </p>
              <Button variant="cta" size="lg" className="w-full" asChild>
                <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Beoordeel ons op Google
                </a>
              </Button>
            </div>

            <div className="mt-3 rounded-xl border border-border p-4 text-left">
              <p className="text-sm text-muted-foreground mb-3">
                Je review staat nu op dit apparaat. Stuur hem ook naar ons toe, dan kunnen wij hem
                na controle op de site plaatsen voor alle bezoekers.
              </p>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href={mailtoHref()}>
                  <Mail className="w-4 h-4" />
                  Review ook naar ons mailen
                </a>
              </Button>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="ghost" className="w-full" onClick={() => handleOpenChange(false)}>
                Sluiten
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading">Schrijf een review</DialogTitle>
              <DialogDescription>
                Vertel kort hoe u onze schuifpui service heeft ervaren. Uw beoordeling helpt
                anderen bij het kiezen van een specialist.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <fieldset>
                <legend className="text-sm font-medium text-foreground mb-2">
                  Uw beoordeling *
                </legend>
                <div
                  className="flex items-center gap-1"
                  role="radiogroup"
                  aria-label="Aantal sterren"
                  onMouseLeave={() => setHovered(0)}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={rating === value}
                      aria-label={`${value} ${value === 1 ? "ster" : "sterren"} – ${RATING_LABELS[value - 1]}`}
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHovered(value)}
                      onFocus={() => setHovered(value)}
                      className="p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <Star
                        className={cn(
                          "w-8 h-8 transition-colors",
                          value <= (hovered || rating)
                            ? "text-accent fill-accent"
                            : "text-muted-foreground/40",
                        )}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {RATING_LABELS[(hovered || rating) - 1]}
                  </span>
                </div>
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="review-naam">Naam *</Label>
                  <Input
                    id="review-naam"
                    required
                    maxLength={100}
                    autoComplete="name"
                    value={form.naam}
                    onChange={(e) => setForm({ ...form, naam: e.target.value })}
                    placeholder="Uw naam"
                  />
                </div>
                <div>
                  <Label htmlFor="review-plaats">Woonplaats *</Label>
                  <Input
                    id="review-plaats"
                    required
                    maxLength={80}
                    autoComplete="address-level2"
                    value={form.plaats}
                    onChange={(e) => setForm({ ...form, plaats: e.target.value })}
                    placeholder="Bijv. Amsterdam"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="review-dienst">Welke dienst betreft het? *</Label>
                <select
                  id="review-dienst"
                  required
                  value={form.dienst}
                  onChange={(e) => setForm({ ...form, dienst: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {services.map((service) => (
                    <option key={service.slug} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                  <option value="Overig">Overig</option>
                </select>
              </div>

              <div>
                <Label htmlFor="review-bericht">Uw ervaring *</Label>
                <Textarea
                  id="review-bericht"
                  required
                  rows={4}
                  maxLength={1000}
                  value={form.bericht}
                  onChange={(e) => setForm({ ...form, bericht: e.target.value })}
                  placeholder="Wat is er gedaan en hoe heeft u de service ervaren?"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {form.bericht.length}/1000 tekens
                </p>
              </div>

              <DialogFooter className="flex-col sm:flex-col gap-2">
                <Button type="submit" variant="cta" size="lg" className="w-full">
                  <Send className="w-4 h-4" />
                  Review versturen
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Liever direct op Google beoordelen
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Na het versturen openen wij Google in een nieuw tabblad, zodat u de beoordeling
                  daar ook kunt achterlaten.
                </p>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;

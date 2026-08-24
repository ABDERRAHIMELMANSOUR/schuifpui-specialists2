import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Smartphone, Star } from "lucide-react";
import ReviewDialog from "./ReviewDialog";
import { services } from "@/content/services";
import { cities } from "@/content/cities";
import {
  ADDRESS,
  EMAIL,
  MOBILE_DISPLAY,
  MOBILE_E164,
  PHONE_DISPLAY,
  PHONE_E164,
} from "@/lib/site";
import { useReviews } from "@/hooks/use-reviews";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { averageRating, reviewCount } = useReviews();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Review CTA */}
      <div className="border-b border-primary-foreground/10">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-accent/20 hidden sm:flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 text-accent fill-accent" />
            </div>
            <div>
              <p className="font-heading font-bold text-lg">Tevreden over onze service?</p>
              <p className="text-primary-foreground/70 text-sm">
                Laat een beoordeling achter — nu gemiddeld {averageRating.toFixed(1)} uit{" "}
                {reviewCount} reviews.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <ReviewDialog label="Schrijf een review" />
            <Link
              to="/beoordelingen"
              className="inline-flex items-center justify-center h-11 px-8 rounded-md border-2 border-primary-foreground/30 bg-primary-foreground/10 text-base font-medium hover:bg-primary-foreground/20 transition-colors"
            >
              Lees alle reviews
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src={logo}
                alt="Logo Schuifpui Service Nederland"
                className="h-10 w-auto brightness-0 invert"
                width={160}
                height={40}
              />
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Uw specialist voor schuifpui reparatie, slot- en hendelvervanging, inbraakschade herstel
              en onderhoud — door heel Nederland.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="font-heading font-bold mb-4 text-base">Navigatie</h2>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
              <Link to="/diensten" className="hover:text-primary-foreground transition-colors">Diensten</Link>
              <Link to="/werkgebieden" className="hover:text-primary-foreground transition-colors">Werkgebieden</Link>
              <Link to="/beoordelingen" className="hover:text-primary-foreground transition-colors">Beoordelingen</Link>
              <Link to="/over-ons" className="hover:text-primary-foreground transition-colors">Over Ons</Link>
              <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-heading font-bold mb-4 text-base">Diensten</h2>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  to={`/diensten/${service.slug}`}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-heading font-bold mb-4 text-base">Contact</h2>
            <address className="not-italic flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a href={`tel:${PHONE_E164}`} className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> {PHONE_DISPLAY}
              </a>
              <a href={`tel:${MOBILE_E164}`} className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Smartphone className="w-4 h-4 shrink-0" /> {MOBILE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-primary-foreground transition-colors break-all">
                <Mail className="w-4 h-4 shrink-0" /> {EMAIL}
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  {ADDRESS.streetAddress}, {ADDRESS.postalCode} {ADDRESS.addressLocality}
                </span>
              </span>
            </address>
          </div>
        </div>

        {/* Werkgebieden links: interne links naar alle stadspagina's */}
        <div className="mt-10 pt-8 border-t border-primary-foreground/10">
          <h2 className="font-heading font-bold mb-4 text-base">Schuifpui specialist per regio</h2>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-primary-foreground/60">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/werkgebieden/${city.slug}`}
                className="hover:text-primary-foreground transition-colors"
              >
                Schuifpui reparatie {city.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container py-4 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Schuifpui Service Nederland. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

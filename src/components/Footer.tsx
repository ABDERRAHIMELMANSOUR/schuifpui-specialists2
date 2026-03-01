import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <line x1="12" y1="4" x2="12" y2="20" />
              </svg>
            </div>
            <span className="font-heading font-bold text-lg">Schuifpuispecialisten</span>
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Uw specialist voor schuifpui reparatie, onderhoud en installatie door heel Nederland.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-heading font-bold mb-4">Navigatie</h3>
          <nav className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <Link to="/diensten" className="hover:text-primary-foreground transition-colors">Diensten</Link>
            <Link to="/over-ons" className="hover:text-primary-foreground transition-colors">Over Ons</Link>
            <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-heading font-bold mb-4">Contact</h3>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
            <a href="tel:+31344700234" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-4 h-4" /> +31 344 700 234
            </a>
            <a href="mailto:contact@schuifpuispecialisten.nl" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="w-4 h-4" /> contact@schuifpuispecialisten.nl
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Heel Nederland
            </div>
            <p className="text-xs text-primary-foreground/40 mt-2">KvK: [Nummer invoegen]</p>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container py-4 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} Schuifpuispecialisten. Alle rechten voorbehouden.
      </div>
    </div>
  </footer>
);

export default Footer;

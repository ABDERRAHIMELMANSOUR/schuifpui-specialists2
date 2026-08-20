import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Diensten", path: "/diensten" },
  { label: "Werkgebieden", path: "/werkgebieden" },
  { label: "Reviews", path: "/beoordelingen" },
  { label: "Over Ons", path: "/over-ons" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo Schuifpui Service Nederland – schuifpui reparatie specialist"
            className="h-10 md:h-12 w-auto"
            width={200}
            height={48}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="cta" size="lg" asChild>
            <a href={`tel:${PHONE_E164}`}>
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="cta" size="lg" className="mt-2" asChild>
              <a href={`tel:${PHONE_E164}`}>
                <Phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
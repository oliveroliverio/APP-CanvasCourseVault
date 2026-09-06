import { useState } from "react";
import { Button } from "@/components/ui/button";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "Demo", href: "#hero-demo" },
  { label: "Problem", href: "#problem-benefits" },
  { label: "How It Works", href: "#how-it-works-and-pilot" },
  { label: "FAQ", href: "#faq" },
  { label: "Student Pilot", href: "#how-it-works-and-pilot" },
];

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header
      id="header"
      className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Wordmark */}
          <a
            href="#top"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            <span className="font-heading text-lg md:text-xl font-semibold tracking-tight text-foreground">
              CourseVault
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-150 ease-out relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              >
                {link.label}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-150 ease-out origin-left" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Controls */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden md:inline-flex rounded-full px-5 py-2 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <a href="#how-it-works-and-pilot">I'm Interested</a>
            </Button>

            {/* Mobile: CTA pill (always visible) */}
            <Button
              asChild
              className="md:hidden rounded-full px-4 py-1.5 text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <a href="#how-it-works-and-pilot">I'm Interested</a>
            </Button>

            {/* Mobile: Hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-foreground hover:bg-muted transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? (
                <X size={20} weight="duotone" />
              ) : (
                <List size={20} weight="duotone" />
              )}
            </button>
          </div>
        </div>

        {/* Disclaimer strip — desktop only, inline */}
        <div className="hidden md:flex justify-end pb-1 -mt-1">
          <span className="text-xs text-muted-foreground tracking-wide">
            An independent student productivity project.
          </span>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center px-3 py-3 text-base text-foreground hover:bg-muted rounded-md transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-border">
              <p className="px-3 text-xs text-muted-foreground tracking-wide">
                An independent student productivity project.
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

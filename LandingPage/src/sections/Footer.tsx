import { GithubLogo, TwitterLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { label: "Demo", href: "#hero-demo" },
  { label: "How It Works", href: "#how-it-works-and-pilot" },
  { label: "FAQ", href: "#faq" },
  { label: "Student Pilot", href: "#how-it-works-and-pilot" },
];

const socialLinks = [
  { label: "Twitter", href: "#", icon: TwitterLogo },
  { label: "GitHub", href: "#", icon: GithubLogo },
  {
    label: "Email",
    href: "mailto:hello@coursevault.app",
    icon: EnvelopeSimple,
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1 — Brand & Disclaimer */}
          <div className="flex flex-col gap-4">
            <a
              href="#top"
              className="font-heading text-xl font-semibold text-foreground tracking-tight hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm w-fit"
            >
              CourseVault
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              An independent student productivity project. Built to help
              students organize, search, and keep their course material.
            </p>
            <Badge
              variant="outline"
              className="w-fit text-xs text-muted-foreground border-border px-3 py-1 rounded-full font-normal tracking-wide uppercase"
            >
              Independent Project
            </Badge>
          </div>

          {/* Column 2 — Navigation Links */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground">
              Navigate
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 — Social & Utility */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground">
              Connect
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  <Icon size={20} weight="duotone" />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mt-2">
              Questions or feedback? Reach out at{" "}
              <a
                href="mailto:hello@coursevault.app"
                className="underline underline-offset-2 hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              >
                hello@coursevault.app
              </a>
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom bar — copyright + non-affiliation disclaimer */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CourseVault. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground max-w-sm md:text-right leading-relaxed">
            CourseVault is not affiliated with or endorsed by{" "}
            <span className="font-medium text-foreground">
              Instructure, Inc.
            </span>{" "}
            or <span className="font-medium text-foreground">Canvas</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

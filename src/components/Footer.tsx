import Link from "next/link"
import { CarFront, Mail, Globe, MessageCircle } from "lucide-react"

const quickLinks = [
  { label: "All Cars", href: "/cars" },
  { label: "Movies", href: "/movies" },
  { label: "TV Series", href: "/tv-series" },
  { label: "By Decade", href: "/decade/1960s" },
  { label: "By Make", href: "/make/aston-martin" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <CarFront className="h-6 w-6 text-primary" />
              <span className="font-heading text-lg font-bold tracking-wide text-white">
                Cine<span className="text-primary">Cars</span>
              </span>
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The ultimate directory of iconic cars from movies and TV series.
              Every legendary vehicle, complete with specs and film appearances.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h3>
            <p className="mb-4 text-sm text-muted">
              Follow us for updates, new additions, and cinematic car culture.
            </p>
            <div className="flex gap-3">
              <a
                href="mailto:hello@cinecars.directory"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-muted transition-colors hover:bg-primary hover:text-white"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-muted transition-colors hover:bg-primary hover:text-white"
                aria-label="GitHub"
              >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-muted transition-colors hover:bg-primary hover:text-white"
              aria-label="Social"
            >
              <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} CineCars Directory. All rights
            reserved. This site is a fan project and is not affiliated with any
            movie studios or automotive manufacturers.
          </p>
        </div>
      </div>
    </footer>
  )
}

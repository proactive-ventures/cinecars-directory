import type { Metadata } from "next"
import { Car, BookOpen, Search, Users, Shield, Sparkles } from "lucide-react"
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME}, the ultimate directory of iconic cars from movies and TV series. Our mission, methodology, and editorial standards.`,
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description: `Learn about ${SITE_NAME}, the ultimate directory of iconic cars from movies and TV series.`,
    url: `${SITE_URL}/about`,
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: `About ${SITE_NAME}`,
            description: SITE_DESCRIPTION,
            url: `${SITE_URL}/about`,
            mainEntity: {
              "@type": "Organization",
              name: SITE_NAME,
              description: SITE_DESCRIPTION,
            },
          }),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
            <Car className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            About {SITE_NAME}
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            {SITE_DESCRIPTION}
          </p>
        </div>

        {/* Mission */}
        <section className="mb-12 glass rounded-2xl border border-border/50 p-8">
          <h2 className="font-heading text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            Our Mission
          </h2>
          <p className="text-muted leading-relaxed">
            Cars are more than transportation — they are characters. From James Bond&apos;s
            Aston Martin DB5 to Dominic Toretto&apos;s Dodge Charger, the vehicles that
            appear on screen become part of our cultural fabric. {SITE_NAME} is a
            comprehensive, community-driven directory dedicated to cataloging every
            iconic car that has graced the silver and small screens.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            Our goal is to be the definitive reference for film and television
            automotive enthusiasts, researchers, and fans. Every entry includes
            detailed specifications, screen appearances, cultural impact analysis, and
            the stories behind these legendary machines.
          </p>
        </section>

        {/* Three pillars */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="glass rounded-xl border border-border/50 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Comprehensive Research
            </h3>
            <p className="text-sm text-muted">
              Every vehicle entry is researched using multiple sources including
              production notes, automotive databases, and fan communities.
            </p>
          </div>
          <div className="glass rounded-xl border border-border/50 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Editorial Standards
            </h3>
            <p className="text-sm text-muted">
              Each entry follows strict editorial guidelines. We verify facts,
              cite sources, and update information as corrections are identified.
            </p>
          </div>
          <div className="glass rounded-xl border border-border/50 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Community Driven
            </h3>
            <p className="text-sm text-muted">
              We welcome contributions and corrections from the community. If
              you spot an error or know of a missing car, please reach out.
            </p>
          </div>
        </div>

        {/* Methodology */}
        <section className="mb-12 glass rounded-2xl border border-border/50 p-8">
          <h2 className="font-heading text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Search className="h-6 w-6 text-primary" />
            Research Methodology
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Our research process prioritizes accuracy and depth. For each vehicle,
              we consult:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">Primary sources:</strong> Production
                records, manufacturer press releases, and official film/TV documentation.
              </li>
              <li>
                <strong className="text-foreground">Automotive databases:</strong>
                Manufacturer archives, automotive historians, and vehicle registry
                databases.
              </li>
              <li>
                <strong className="text-foreground">Media analysis:</strong> Frame-by-frame
                verification of vehicles appearing in films and episodes.
              </li>
              <li>
                <strong className="text-foreground">Community validation:</strong>
                Cross-referencing with enthusiast communities and expert forums.
              </li>
            </ul>
            <p className="mt-4">
              All specifications are sourced from manufacturer data sheets and
              verified against multiple independent sources. Cultural impact
              analysis incorporates critical reception, fan studies, and
              automotive journalism.
            </p>
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="mb-12 glass rounded-2xl border border-border/50 p-8">
          <h2 className="font-heading text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            Editorial Standards
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              {SITE_NAME} maintains high editorial standards to ensure trustworthiness
              and authority:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">Accuracy first:</strong> All data is
                verified against at least two independent sources before publication.
              </li>
              <li>
                <strong className="text-foreground">Transparency:</strong> Sources are
                documented and available upon request. We clearly distinguish between
                verified facts and editorial commentary.
              </li>
              <li>
                <strong className="text-foreground">Regular updates:</strong> Entries are
                reviewed and updated as new information becomes available or when
                errors are reported.
              </li>
              <li>
                <strong className="text-foreground">No paid placements:</strong> We do
                not accept payment for listings. All vehicles are included based on
                their cultural significance and relevance.
              </li>
              <li>
                <strong className="text-foreground">Correction policy:</strong> If you
                identify an error, please contact us. We promptly investigate and
                correct verified inaccuracies.
              </li>
            </ul>
          </div>
        </section>

        {/* Contact / CTA */}
        <section className="glass rounded-2xl border border-border/50 p-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Have a correction, suggestion, or just want to talk about cinematic
            cars? We would love to hear from you.
          </p>
          <a
            href="mailto:hello@cinecars.directory"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
          >
            hello@cinecars.directory
          </a>
        </section>
      </div>
    </>
  )
}

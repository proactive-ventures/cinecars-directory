import Link from "next/link"
import { Tv, ChevronRight } from "lucide-react"
import { tvSeries } from "@/data/tv-series"
import { SITE_URL } from "@/lib/constants"

export const metadata = {
    title: "TV Series – Iconic Cars on Television",
  robots: { index: true, follow: true },
  description:
    `Browse ${tvSeries.length} TV series featuring iconic cars. Discover vehicles from Knight Rider, The Dukes of Hazzard, Supernatural, Miami Vice, Breaking Bad, and more. Complete specs and cultural impact.`,
  keywords: ["TV series cars", "television vehicles", "Knight Rider KITT", "General Lee", "iconic TV cars", "Miami Vice cars", "TV vehicle database"],
  openGraph: {
    title: "TV Series – Iconic Cars on Television | CineCars Directory",
    description: `Browse ${tvSeries.length} TV series featuring iconic cars from your favorite shows.`,
    url: `${SITE_URL}/tv-series`,
    siteName: "CineCars Directory",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TV Series – Iconic Cars on Television | CineCars Directory",
    description: `Browse ${tvSeries.length} TV series featuring iconic cars.`,
  },
  alternates: {
    canonical: `${SITE_URL}/tv-series`,
  },
}

export default function TVSeriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "TV Series", item: `${SITE_URL}/tv-series` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "TV Series – Iconic Cars on Television",
            description: `Browse ${tvSeries.length} TV series featuring iconic cars.`,
            url: `${SITE_URL}/tv-series`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: tvSeries.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "TVSeries",
                  name: s.title,
                  url: `${SITE_URL}/tv-series/${s.slug}`,
                },
              })),
            },
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            TV Series
          </h1>
          <p className="mt-2 text-muted">
            Browse {tvSeries.length} television series featuring iconic cars
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tvSeries.map((series) => (
            <Link
              key={series.slug}
              href={`/tv-series/${series.slug}`}
              className="group glass rounded-xl border border-border/50 overflow-hidden transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
            >
              <div className="relative aspect-[16/9] flex items-center justify-center overflow-hidden">
                {(series.image || series.imageUrl) && (
                  <img
                    src={series.image || series.imageUrl}
                    alt={series.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="img-scrim pointer-events-none absolute inset-0" />
                {!series.image && !series.imageUrl && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-surface to-surface" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08)_0%,transparent_60%)]" />
                    <Tv className="relative z-10 h-12 w-12 text-primary/30 group-hover:text-primary/50 transition-colors" />
                  </>
                )}
              </div>
              <div className="p-5">
                <h2 className="font-heading text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {series.title}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {series.years}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-muted">
                  {series.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-primary">
                  <span>{series.carIds?.length || 0} cars</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

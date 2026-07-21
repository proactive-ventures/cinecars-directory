import Link from "next/link"
import { Film, ChevronRight } from "lucide-react"
import { movies } from "@/data/movies"
import { SITE_URL } from "@/lib/constants"

export const metadata = {
    title: "Movies – Iconic Cars in Cinema",
  robots: { index: true, follow: true },
  description:
    `Browse ${movies.length} movies featuring iconic cars. Discover vehicles from Fast & Furious, James Bond, Batman, Knight Rider, and more. Complete vehicle specs and cultural impact.`,
  keywords: ["movie cars", "cinema vehicles", "iconic film cars", "James Bond cars", "Fast and Furious", "Batmobile", "movie vehicle database", "film automobiles"],
  openGraph: {
    title: "Movies – Iconic Cars in Cinema | CineCars Directory",
    description: `Browse ${movies.length} movies featuring iconic cars. Discover vehicles from your favorite films.`,
    url: `${SITE_URL}/movies`,
    siteName: "CineCars Directory",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movies – Iconic Cars in Cinema | CineCars Directory",
    description: `Browse ${movies.length} movies featuring iconic cars.`,
  },
  alternates: {
    canonical: `${SITE_URL}/movies`,
  },
}

export default function MoviesPage() {
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
              { "@type": "ListItem", position: 2, name: "Movies", item: `${SITE_URL}/movies` },
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
            name: "Movies – Iconic Cars in Cinema",
            description: `Browse ${movies.length} movies featuring iconic cars.`,
            url: `${SITE_URL}/movies`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: movies.map((m, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Movie",
                  name: m.title,
                  url: `${SITE_URL}/movies/${m.slug}`,
                },
              })),
            },
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Movies
          </h1>
          <p className="mt-2 text-muted">
            Browse {movies.length} films featuring iconic cars
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <Link
              key={movie.slug}
              href={`/movies/${movie.slug}`}
              className="group glass rounded-xl border border-border/50 overflow-hidden transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
            >
              <div className="relative aspect-[16/9] flex items-center justify-center overflow-hidden">
                {movie.image && (
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="img-scrim pointer-events-none absolute inset-0" />
                {!movie.image && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-surface to-surface" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08)_0%,transparent_60%)]" />
                    <Film className="relative z-10 h-12 w-12 text-primary/30 group-hover:text-primary/50 transition-colors" />
                  </>
                )}
              </div>
              <div className="p-5">
                <h2 className="font-heading text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {movie.title}
                </h2>
                <p className="mt-1 text-sm text-muted">{movie.year}</p>
                <p className="mt-2 line-clamp-2 text-sm text-muted">
                  {movie.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-primary">
                  <span>{movie.carIds?.length || 0} cars</span>
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

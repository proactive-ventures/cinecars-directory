import Link from "next/link"
import { Film, ChevronRight } from "lucide-react"
import { movies } from "@/data/movies"
import { SITE_URL } from "@/lib/constants"

export const metadata = {
  title: "Movies",
  description:
    "Browse iconic cars from your favorite movies. Discover vehicles from Fast & Furious, James Bond, Batman, and more.",
  openGraph: {
    title: "Movies | CineCars Directory",
    description:
      "Browse iconic cars from your favorite movies.",
    url: `${SITE_URL}/movies`,
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
            "@type": "CollectionPage",
            name: "Movies | CineCars Directory",
            description: "Browse iconic cars from your favorite movies.",
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
              <div className="aspect-[16/9] bg-gradient-to-br from-surface-light via-surface to-surface flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08)_0%,transparent_60%)]" />
                <Film className="relative z-10 h-12 w-12 text-primary/30 group-hover:text-primary/50 transition-colors" />
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

import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Film, ChevronRight, Calendar, Car } from "lucide-react"
import CarCard from "@/components/CarCard"
import { movies } from "@/data/movies"
import { cars } from "@/data/cars"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return movies.map((movie) => ({ slug: movie.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const movie = movies.find((m) => m.slug === slug)
  if (!movie) return {}
  return {
    title: `${movie.title} (${movie.year}) – Cars`,
    description: movie.description,
    openGraph: {
      title: `${movie.title} – ${SITE_NAME}`,
      description: movie.description,
      url: `${SITE_URL}/movies/${movie.slug}`,
      ...(movie.image ? { images: [{ url: `${SITE_URL}${movie.image}` }] } : {}),
    },
    alternates: {
      canonical: `${SITE_URL}/movies/${movie.slug}`,
    },
  }
}

export default async function MovieDetailPage({ params }: Props) {
  const { slug } = await params
  const movie = movies.find((m) => m.slug === slug)
  if (!movie) notFound()

  const movieCars = cars.filter((car) =>
    car.appearances.some(
      (a) =>
        a.title.toLowerCase().replace(/\s+/g, "-") === movie.slug &&
        (a.mediaType === "movie" || a.mediaType === "animated-film"),
    ),
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Movie",
            name: movie.title,
            description: movie.description,
            url: `${SITE_URL}/movies/${movie.slug}`,
            datePublished: movie.year,
            ...(movie.director ? { director: { "@type": "Person", name: movie.director } } : {}),
          }),
        }}
      />

      <article>
        {/* Breadcrumbs */}
        <nav className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link
                href="/movies"
                className="hover:text-foreground transition-colors"
              >
                Movies
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-foreground">{movie.title}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-border/50">
            <div className="relative aspect-[21/9] bg-gradient-to-br from-surface-light via-surface to-surface flex items-center justify-center">
              {movie.image && (
                <img
                  src={movie.image}
                  alt={`${movie.title} (${movie.year})`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="img-scrim pointer-events-none absolute inset-0" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.12)_0%,transparent_60%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(245,158,11,0.08)_0%,transparent_60%)]" />
              {!movie.image && (
                <Film className="relative z-10 h-24 w-24 text-primary/30" />
              )}
            </div>
          </div>
        </section>

        {/* Info */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {movie.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-muted">
              <Calendar className="h-4 w-4" />
              <span>{movie.year}</span>
            </div>
            {movie.director && (
              <div className="flex items-center gap-2 text-muted">
                <Film className="h-4 w-4" />
                <span>Directed by {movie.director}</span>
              </div>
            )}
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            {movie.description}
          </p>
        </div>

        {/* Cars in this movie */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">
            Cars in {movie.title}
          </h2>
          {movieCars.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
              <Car className="h-12 w-12 text-muted" />
              <p className="mt-4 text-muted">
                No cars have been cataloged for this movie yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movieCars.map((car) => {
                const appearance = car.appearances.find(
                  (a) =>
                    a.title.toLowerCase().replace(/\s+/g, "-") === movie.slug,
                )
                return (
                  <div key={car.slug} className="relative">
                    <CarCard car={car} />
                    {appearance && (
                      <p className="mt-2 text-xs text-muted px-1">
                        Role: {appearance.role}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </article>
    </>
  )
}

import Link from "next/link"
import { ArrowRight, Star, Film, Tv, Clapperboard, Timer, Car, Search } from "lucide-react"
import CarCard from "@/components/CarCard"
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, decades } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { cars } from "@/data/cars"
import { movies } from "@/data/movies"
import { tvSeries } from "@/data/tv-series"
import { franchises } from "@/data/franchises"

export default function HomePage() {
  const featuredCars = cars.filter((c) => c.isFeatured).slice(0, 8)
  const stats = [
    { label: "Iconic Cars", value: cars.length, icon: Car },
    { label: "Movies", value: movies.length, icon: Film },
    { label: "TV Series", value: tvSeries.length, icon: Tv },
    { label: "Franchises", value: franchises.length, icon: Clapperboard },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${SITE_NAME} Home`,
            description: SITE_DESCRIPTION,
            url: SITE_URL,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: featuredCars.map((car, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Vehicle",
                  name: car.name,
                  url: `${SITE_URL}/cars/${car.slug}`,
                },
              })),
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.15)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.08)_0%,transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Star className="h-4 w-4 fill-primary" />
              <span>Explore {cars.length}+ legendary vehicles</span>
            </div>
            <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Every Iconic Car
              <br />
              <span className="text-gradient">from Movies &amp; TV</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
              {SITE_DESCRIPTION}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/cars"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
              >
                Browse All Cars
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-8 py-3 text-base font-semibold text-foreground transition-all hover:bg-surface-light"
              >
                About the Directory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-20 z-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl border border-border/50 p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <stat.icon className="h-6 w-6 text-primary" />
                <span className="font-heading text-3xl font-bold text-white">
                  {stat.value}+
                </span>
                <span className="text-sm text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Featured Cars
            </h2>
            <p className="mt-2 text-muted">
              The most iconic vehicles that defined cinema and television
            </p>
          </div>
          <Link
            href="/cars"
            className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-light sm:flex"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredCars.slice(0, 4).map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCars.slice(4, 8).map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl text-center mb-12">
            Browse by Category
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Movies",
                description: "Explore cars from your favorite films",
                href: "/movies",
                icon: Film,
                count: movies.length,
              },
              {
                title: "TV Series",
                description: "Discover iconic TV vehicles",
                href: "/tv-series",
                icon: Tv,
                count: tvSeries.length,
              },
              {
                title: "By Make",
                description: "Browse cars by manufacturer",
                href: "/make/ferrari",
                icon: Car,
                count: 0,
              },
              {
                title: "By Decade",
                description: "Travel through automotive history",
                href: "/decade/1980s",
                icon: Timer,
                count: decades.length,
              },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group glass rounded-xl border border-border/50 p-6 transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{cat.description}</p>
                <span className="mt-3 inline-block text-xs text-primary">
                  {cat.count}+ entries →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Franchises */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Featured Franchises
            </h2>
            <p className="mt-2 text-muted">
              Legendary car franchises that shaped pop culture
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {franchises.slice(0, 4).map((franchise) => (
            <Link
              key={franchise.slug}
              href={`/franchise/${franchise.slug}`}
              className="group glass rounded-xl border border-border/50 p-6 transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
            >
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-primary transition-colors">
                {franchise.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">
                {franchise.description}
              </p>
              <span className="mt-3 inline-block text-xs text-primary">
                {franchise.carIds.length} cars →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by Decade */}
      <section className="bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl text-center mb-4">
            Browse by Decade
          </h2>
          <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
            Explore the evolution of cinematic cars through the decades
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {decades.map((decade) => (
              <Link
                key={decade}
                href={`/decade/${decade}`}
                className={cn(
                  "rounded-lg border border-border bg-surface/50 px-5 py-2.5 text-sm font-medium text-muted transition-all hover:border-primary/30 hover:text-primary hover:bg-primary/5",
                )}
              >
                {decade}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-2xl border border-border/50 p-12">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Know a Car We Should Add?
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            CineCars Directory is a community-driven project. If you know of an
            iconic car we have missed, reach out and help us grow the collection.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white transition-all hover:bg-primary-dark"
          >
            <Search className="h-4 w-4" />
            Get Involved
          </Link>
        </div>
      </section>
    </>
  )
}

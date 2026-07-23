"use client"

import Link from "next/link"
import {
  ArrowLeft, BarChart3, Car, Calendar, Gauge, Zap,
  Building2, Film, Tv, TrendingUp,
} from "lucide-react"
import { cars } from "@/data/cars"
import { SITE_URL } from "@/lib/constants"

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-card/50 p-6">
      <div className="text-primary">{icon}</div>
      <span className="mt-2 font-heading text-3xl font-bold text-foreground">{value}</span>
      <span className="mt-1 text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

function BarRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 text-xs font-medium text-muted-foreground truncate">{label}</span>
      <div className="flex-1 h-5 rounded bg-muted/20 overflow-hidden">
        <div className="h-full rounded bg-primary/70 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 text-right text-xs font-semibold text-foreground">{value}</span>
    </div>
  )
}

export default function StatsPage() {
  const totalCars = cars.length

  // Decades
  const decades: Record<string, number> = {}
  cars.forEach((c) => {
    const dec = `${Math.floor(c.year / 10) * 10}s`
    decades[dec] = (decades[dec] || 0) + 1
  })
  const decadeEntries = Object.entries(decades).sort((a, b) => a[0].localeCompare(b[0]))
  const maxDecade = Math.max(...decadeEntries.map((e) => e[1]))

  // Makes
  const makes: Record<string, number> = {}
  cars.forEach((c) => { makes[c.make] = (makes[c.make] || 0) + 1 })
  const makeEntries = Object.entries(makes).sort((a, b) => b[1] - a[1]).slice(0, 15)
  const maxMake = Math.max(...makeEntries.map((e) => e[1]))

  // Body types
  const bodyTypes: Record<string, number> = {}
  cars.forEach((c) => { if (c.bodyType) bodyTypes[c.bodyType] = (bodyTypes[c.bodyType] || 0) + 1 })
  const bodyEntries = Object.entries(bodyTypes).sort((a, b) => b[1] - a[1])
  const maxBody = Math.max(...bodyEntries.map((e) => e[1]))

  // Top horsepower
  const topHP = cars.filter((c) => typeof c.specs.horsepower === "number").sort((a, b) => (b.specs.horsepower as number) - (a.specs.horsepower as number)).slice(0, 10)

  // Top appearance count
  const topAppearances = [...cars].sort((a, b) => b.appearances.length - a.appearances.length).slice(0, 10)

  // Year range
  const years = cars.map((c) => c.year)
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)

  // Movie vs TV
  const movieAppearances = cars.reduce((sum, c) => sum + c.appearances.filter((a) => a.mediaType === "movie" || a.mediaType === "animated-film").length, 0)
  const tvAppearances = cars.reduce((sum, c) => sum + c.appearances.filter((a) => a.mediaType === "tv-series" || a.mediaType === "animated-series").length, 0)

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
              { "@type": "ListItem", position: 2, name: "Stats", item: `${SITE_URL}/stats` },
            ],
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/cars" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to all cars
          </Link>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            CineCars Stats
          </h1>
          <p className="mt-2 text-muted">
            A deep dive into {totalCars.toLocaleString()} vehicles from movies and TV
          </p>
        </div>

        {/* Top-level stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard icon={<Car className="h-6 w-6" />} label="Total Cars" value={totalCars.toLocaleString()} />
          <StatCard icon={<Calendar className="h-6 w-6" />} label="Year Range" value={`${minYear}–${maxYear}`} />
          <StatCard icon={<Building2 className="h-6 w-6" />} label="Unique Makes" value={Object.keys(makes).length} />
          <StatCard icon={<Film className="h-6 w-6" />} label="Movie Appearances" value={movieAppearances.toLocaleString()} />
          <StatCard icon={<Tv className="h-6 w-6" />} label="TV Appearances" value={tvAppearances.toLocaleString()} />
          <StatCard icon={<Gauge className="h-6 w-6" />} label="Cars with Specs" value={cars.filter((c) => c.specs.horsepower || c.specs.engine).length.toLocaleString()} />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Cars by decade */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Cars by Decade
            </h2>
            <div className="space-y-2">
              {decadeEntries.map(([dec, count]) => (
                <BarRow key={dec} label={dec} value={count} max={maxDecade} />
              ))}
            </div>
          </div>

          {/* Top Makes */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Top 15 Makes
            </h2>
            <div className="space-y-2">
              {makeEntries.map(([make, count]) => (
                <BarRow key={make} label={make} value={count} max={maxMake} />
              ))}
            </div>
          </div>

          {/* Body Types */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Car className="h-4 w-4 text-primary" />
              Cars by Body Type
            </h2>
            <div className="space-y-2">
              {bodyEntries.map(([bt, count]) => (
                <BarRow key={bt} label={bt} value={count} max={maxBody} />
              ))}
            </div>
          </div>

          {/* Top Horsepower */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Top 10 Horsepower
            </h2>
            <div className="space-y-2">
              {topHP.map((c) => (
                <div key={c.slug} className="flex items-center gap-3">
                  <Link href={`/cars/${c.slug}`} className="w-32 text-xs font-medium text-primary hover:underline truncate">
                    {c.name}
                  </Link>
                  <div className="flex-1 h-5 rounded bg-muted/20 overflow-hidden">
                    <div
                      className="h-full rounded bg-secondary/70 transition-all"
                      style={{ width: `${((c.specs.horsepower as number) / (topHP[0]?.specs.horsepower as number || 1)) * 100}%` }}
                    />
                  </div>
                  <span className="w-14 text-right text-xs font-semibold text-foreground">{c.specs.horsepower} hp</span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Appearances */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 lg:col-span-2">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Most Appearances Across Productions
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {topAppearances.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/cars/${c.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-border/30 bg-card/30 p-3 hover:bg-card/60 transition-colors"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.appearances.length} {c.appearances.length === 1 ? "appearance" : "appearances"}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {c.appearances.some((a) => a.mediaType === "movie" || a.mediaType === "animated-film") && (
                      <Film className="h-3 w-3 text-muted-foreground" />
                    )}
                    {c.appearances.some((a) => a.mediaType === "tv-series" || a.mediaType === "animated-series") && (
                      <Tv className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

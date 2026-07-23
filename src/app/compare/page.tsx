"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import {
  ArrowLeft, GitCompareArrows, Gauge, Zap, Timer, Fuel,
  Shield, Cog, Weight, X, SearchCode,
} from "lucide-react"
import { cars } from "@/data/cars"
import type { Car } from "@/data/cars"
import { SITE_URL } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function CompareInner() {
  const searchParams = useSearchParams()
  const raw = searchParams.get("cars") || ""
  const slugs = raw.split(",").filter(Boolean).slice(0, 4)
  const compareCars = slugs.map((s) => cars.find((c) => c.slug === s)).filter((c): c is Car => c !== undefined)

  if (compareCars.length === 0) {
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
                { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/compare` },
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
              <GitCompareArrows className="h-8 w-8 text-primary" />
              Compare Cars
            </h1>
            <p className="mt-2 text-muted">Select up to 4 cars to compare side-by-side</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24">
            <GitCompareArrows className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
              No cars selected
            </h3>
            <p className="mt-2 text-sm text-muted text-center max-w-md">
              Click the compare icon on any car card to add it to your comparison
            </p>
            <Link href="/cars">
              <Button className="mt-6">
                <SearchCode className="h-4 w-4 mr-2" />
                Browse Cars
              </Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  const specRows = [
    { label: "Year", icon: null, get: (c: typeof compareCars[0]) => c.year },
    { label: "Make", icon: null, get: (c: typeof compareCars[0]) => c.make },
    { label: "Model", icon: null, get: (c: typeof compareCars[0]) => c.model },
    { label: "Body Type", icon: null, get: (c: typeof compareCars[0]) => c.bodyType || "—" },
    { label: "Horsepower", icon: <Gauge className="h-3.5 w-3.5" />, get: (c: typeof compareCars[0]) => c.specs.horsepower ? `${c.specs.horsepower} hp` : "—" },
    { label: "Top Speed", icon: <Zap className="h-3.5 w-3.5" />, get: (c: typeof compareCars[0]) => c.specs.topSpeed ? `${c.specs.topSpeed} ${typeof c.specs.topSpeed === 'number' ? 'mph' : ''}` : "—" },
    { label: "0-60 mph", icon: <Timer className="h-3.5 w-3.5" />, get: (c: typeof compareCars[0]) => c.specs.zeroToSixty ? `${c.specs.zeroToSixty} sec` : "—" },
    { label: "Engine", icon: <Fuel className="h-3.5 w-3.5" />, get: (c: typeof compareCars[0]) => c.specs.engine || "—" },
    { label: "Drivetrain", icon: <Shield className="h-3.5 w-3.5" />, get: (c: typeof compareCars[0]) => c.specs.drivetrain || "—" },
    { label: "Transmission", icon: <Cog className="h-3.5 w-3.5" />, get: (c: typeof compareCars[0]) => c.specs.transmission || "—" },
    { label: "Weight", icon: <Weight className="h-3.5 w-3.5" />, get: (c: typeof compareCars[0]) => c.specs.weight ? `${c.specs.weight} lbs` : "—" },
    { label: "Appearances", icon: null, get: (c: typeof compareCars[0]) => `${c.appearances.length}` },
  ]

  const gridCols = compareCars.length === 2
    ? "grid-cols-[140px_1fr_1fr]"
    : compareCars.length === 3
    ? "grid-cols-[140px_1fr_1fr_1fr]"
    : "grid-cols-[140px_1fr_1fr_1fr_1fr]"

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
              { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/compare` },
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
            <GitCompareArrows className="h-8 w-8 text-primary" />
            Compare Cars
          </h1>
          <p className="mt-2 text-muted">
            Comparing {compareCars.length} {compareCars.length === 1 ? "car" : "cars"}
            <span className="text-muted-foreground"> &middot; Add up to {4 - compareCars.length} more</span>
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/50">
          <div className={`min-w-[600px] grid ${gridCols}`}>
            {/* Header row: images */}
            <div />
            {compareCars.map((car) => (
              <div key={car.slug} className="relative flex flex-col items-center border-b border-border/50 bg-card/50 p-4">
                <Link href={`/cars/${car.slug}`} className="group">
                  <div className="h-32 w-48 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-secondary/10">
                    {car.image || car.imageUrl ? (
                      <img
                        src={car.image || car.imageUrl}
                        alt={car.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-heading text-2xl font-bold text-white/20">
                        {car.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-2 text-center font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {car.name}
                  </h3>
                  <p className="text-center text-xs text-muted-foreground">{car.year} &middot; {car.make}</p>
                </Link>
              </div>
            ))}

            {/* Spec rows */}
            {specRows.map((row, ri) => (
              <>
                <div key={`label-${ri}`} className={`flex items-center gap-2 border-b border-border/30 px-4 py-2.5 text-xs font-medium text-muted-foreground ${ri % 2 === 0 ? "bg-card/30" : ""}`}>
                  {row.icon}
                  <span>{row.label}</span>
                </div>
                {compareCars.map((car, ci) => (
                  <div
                    key={`${car.slug}-${ri}`}
                    className={`flex items-center justify-center border-b border-border/30 px-3 py-2.5 text-sm font-medium text-foreground ${ri % 2 === 0 ? "bg-card/30" : ""} ${ci > 0 ? "border-l border-l-border/30" : ""}`}
                  >
                    {row.get(car)}
                  </div>
                ))}
              </>
            ))}

            {/* Fun fact row */}
            <div className="flex items-center gap-2 border-b border-border/30 px-4 py-2.5 text-xs font-medium text-muted-foreground bg-card/30">
              Fun Fact
            </div>
            {compareCars.map((car, ci) => (
              <div
                key={`${car.slug}-funfact`}
                className={`flex items-start border-b border-border/30 px-3 py-2.5 text-xs text-muted-foreground italic ${ci > 0 ? "border-l border-l-border/30" : ""}`}
              >
                {car.funFact || car.iconicScene || "—"}
              </div>
            ))}

            {/* Actions row */}
            <div />
            {compareCars.map((car) => (
              <div key={`${car.slug}-actions`} className="flex justify-center border-t border-border/50 bg-card/50 p-3">
                <Link
                  href={`/cars/${car.slug}`}
                  className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </div>
    }>
      <CompareInner />
    </Suspense>
  )
}

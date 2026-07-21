import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ChevronRight, Timer } from "lucide-react"
import CarCard from "@/components/CarCard"
import { cars } from "@/data/cars"
import { SITE_NAME, SITE_URL, decades } from "@/lib/constants"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return decades.map((decade) => ({ slug: decade }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decadeLabel = slug.endsWith("s") ? slug : `${slug}s`
  return {
    title: `Cars from the ${decadeLabel}`,
    description: `Browse iconic cars from movies and TV series released in the ${decadeLabel}.`,
    openGraph: {
      title: `Cars from the ${decadeLabel} | ${SITE_NAME}`,
      description: `Browse iconic cars from movies and TV series released in the ${decadeLabel}.`,
      url: `${SITE_URL}/decade/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/decade/${slug}`,
    },
  }
}

export default async function DecadePage({ params }: Props) {
  const { slug } = await params
  const decadeLabel = slug.endsWith("s") ? slug : `${slug}s`
  const decadeStart = Number.parseInt(slug.replace("s", ""))

  if (!decades.includes(decadeLabel as typeof decades[number])) notFound()

  const decadeCars = cars.filter(
    (c) => c.year >= decadeStart && c.year < decadeStart + 10,
  )

  const prevDecade = decades[decades.indexOf(decadeLabel as typeof decades[number]) - 1] || null
  const nextDecade = decades[decades.indexOf(decadeLabel as typeof decades[number]) + 1] || null

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
              { "@type": "ListItem", position: 2, name: decadeLabel, item: `${SITE_URL}/decade/${slug}` },
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
            name: `Cars from the ${decadeLabel}`,
            description: `Browse iconic cars from movies and TV series released in the ${decadeLabel}.`,
            url: `${SITE_URL}/decade/${slug}`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: decadeCars.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Vehicle",
                  name: c.name,
                  url: `${SITE_URL}/cars/${c.slug}`,
                  ...(c.specs.horsepower ? { power: `${c.specs.horsepower} HP` } : {}),
                },
              })),
            },
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-foreground">{decadeLabel}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Timer className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                {decadeLabel}
              </h1>
              <p className="mt-1 text-muted">
                {decadeCars.length} iconic cars from movies and TV
              </p>
            </div>
          </div>
        </div>

        {/* Decade navigation */}
        <div className="mb-8 flex flex-wrap gap-3">
          {decades.map((d) => {
            const isActive = d === decadeLabel
            return (
              <Link
                key={d}
                href={`/decade/${d}`}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-surface text-muted hover:bg-surface-light hover:text-foreground"
                }`}
              >
                {d}
              </Link>
            )
          })}
        </div>

        {/* Results */}
        {decadeCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24">
            <Timer className="h-12 w-12 text-muted" />
            <h2 className="mt-4 font-heading text-xl font-bold text-white">
              No cars from this decade
            </h2>
            <p className="mt-2 text-sm text-muted">
              We have not cataloged any cars from this decade yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {decadeCars.map((car) => (
              <CarCard key={car.slug} car={car} />
            ))}
          </div>
        )}

        {/* Prev/Next navigation */}
        <div className="mt-12 flex justify-between border-t border-border pt-6">
          {prevDecade ? (
            <Link
              href={`/decade/${prevDecade}`}
              className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              {prevDecade}
            </Link>
          ) : (
            <div />
          )}
          {nextDecade ? (
            <Link
              href={`/decade/${nextDecade}`}
              className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              {nextDecade}
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  )
}

import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ChevronRight, Car } from "lucide-react"
import CarCard from "@/components/CarCard"
import { cars } from "@/data/cars"
import { makes as MakesList } from "@/data/makes"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const makes = [...new Set(cars.map((c) => c.make))]
  return makes.map((make) => ({
    slug: make.toLowerCase().replace(/[\s]+/g, "-"),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const makeName =
    MakesList.find(
      (m) => m.slug === slug,
    )?.name ||
    slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  return {
    title: `${makeName} Cars in Movies & TV`,
    description: `Browse all ${makeName} cars featured in movies and TV series. Explore specs, appearances, and cultural impact.`,
    openGraph: {
      title: `${makeName} Cars | ${SITE_NAME}`,
      description: `Browse all ${makeName} cars featured in movies and TV series.`,
      url: `${SITE_URL}/make/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/make/${slug}`,
    },
  }
}

export default async function MakePage({ params }: Props) {
  const { slug } = await params
  const makeInfo = MakesList.find((m) => m.slug === slug)
  const makeName = makeInfo?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  const makeCars = cars.filter(
    (c) => c.make.toLowerCase() === makeName.toLowerCase(),
  )

  if (makeCars.length === 0 && !makeInfo) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${makeName} Cars in Movies & TV`,
            description: `Browse all ${makeName} cars featured in movies and TV series.`,
            url: `${SITE_URL}/make/${slug}`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: makeCars.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Vehicle",
                  name: c.name,
                  url: `${SITE_URL}/cars/${c.slug}`,
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
            <li className="text-foreground">{makeName}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Car className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
              {makeName}
            </h1>
            <p className="mt-1 text-muted">
              {makeCars.length} iconic {makeName} vehicles from movies and TV
              {makeInfo?.country && (
                <>
                  {" "}&middot; {makeInfo.country}
                </>
              )}
            </p>
            {makeInfo && (
              <p className="mt-3 max-w-2xl text-sm text-muted">
                Manufacturer based in {makeInfo.country}
              </p>
            )}
          </div>
        </div>

        {/* Results */}
        {makeCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24">
            <Car className="h-12 w-12 text-muted" />
            <h2 className="mt-4 font-heading text-xl font-bold text-white">
              No cars found
            </h2>
            <p className="mt-2 text-sm text-muted">
              We have not cataloged any {makeName} vehicles yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {makeCars.map((car) => (
              <CarCard key={car.slug} car={car} />
            ))}
          </div>
        )}

        {/* All makes navigation */}
        <div className="mt-12 border-t border-border pt-6">
          <Link
            href="/cars"
            className="text-sm text-primary hover:text-primary-light transition-colors"
          >
            ← Browse all makes
          </Link>
        </div>
      </div>
    </>
  )
}

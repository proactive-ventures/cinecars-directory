import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ChevronRight, Clapperboard } from "lucide-react"
import CarCard from "@/components/CarCard"
import { cars } from "@/data/cars"
import { franchises } from "@/data/franchises"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return franchises.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const franchise = franchises.find((f) => f.slug === slug)
  if (!franchise) return {}
  return {
    title: `${franchise.name} – Cars`,
    description: franchise.description,
    openGraph: {
      title: `${franchise.name} – ${SITE_NAME}`,
      description: franchise.description,
      url: `${SITE_URL}/franchise/${franchise.slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/franchise/${franchise.slug}`,
    },
  }
}

export default async function FranchisePage({ params }: Props) {
  const { slug } = await params
  const franchise = franchises.find((f) => f.slug === slug)
  if (!franchise) notFound()

  const franchiseCars = cars.filter((c) =>
    c.appearances.some((a) => {
      const fs = a.franchise?.toLowerCase().replace(/\s+/g, "-")
      return fs === franchise.slug
    }),
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${franchise.name} Cars | ${SITE_NAME}`,
            description: franchise.description,
            url: `${SITE_URL}/franchise/${franchise.slug}`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: franchiseCars.map((c, i) => ({
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
            <li className="text-foreground">{franchise.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Clapperboard className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
              {franchise.name}
            </h1>
            <p className="mt-1 text-muted">
              {franchiseCars.length} iconic vehicles across the franchise
            </p>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              {franchise.description}
            </p>
          </div>
        </div>

        {/* Results */}
        {franchiseCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24">
            <Clapperboard className="h-12 w-12 text-muted" />
            <h2 className="mt-4 font-heading text-xl font-bold text-white">
              No cars cataloged yet
            </h2>
            <p className="mt-2 text-sm text-muted">
              We are still adding cars for this franchise.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {franchiseCars.map((car) => (
              <CarCard key={car.slug} car={car} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

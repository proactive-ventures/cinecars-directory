import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { existsSync } from "fs"
import path from "path"
import {
  Calendar, Gauge, Cpu, Cog, Car, Shield, Zap, ChevronRight,
  Film, Tv, Lightbulb, Sparkles,
} from "lucide-react"
import { cars } from "@/data/cars"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import CarCard from "@/components/CarCard"

function resolveImage(car: { image?: string; imageUrl?: string }): string | undefined {
  if (car.image && existsSync(path.join(process.cwd(), "public", car.image))) {
    return car.image
  }
  return car.imageUrl
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const car = cars.find((c) => c.slug === slug)
  if (!car) return {}
  const ogImage = resolveImage(car)
  return {
    title: `${car.name} (${car.year}) – ${car.make} ${car.model} | ${SITE_NAME}`,
    description: car.description,
    keywords: [car.make, car.model, String(car.year), ...car.appearances.map((a) => a.title), "movie cars", "iconic vehicles"],
    openGraph: {
      type: "website",
      title: `${car.name} – ${SITE_NAME}`,
      description: car.description,
      url: `${SITE_URL}/cars/${car.slug}`,
      images: ogImage ? [{ url: ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`, alt: car.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${car.name} – ${SITE_NAME}`,
      description: car.description,
      images: car.image ? [`${SITE_URL}${car.image}`] : car.imageUrl ? [car.imageUrl] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/cars/${car.slug}`,
    },
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params
  const car = cars.find((c) => c.slug === slug)
  if (!car) notFound()

  const franchiseName = car.appearances.find((a) => a.franchise)?.franchise
  const franchiseSlug = franchiseName?.toLowerCase().replace(/\s+/g, "-")

  const relatedCars = cars.filter(
    (c) =>
      c.slug !== car.slug &&
      (c.appearances.some((a) => a.franchise === franchiseName) ||
        c.appearances.some((a) =>
          car.appearances.some((ca) => ca.title === a.title),
        )),
  ).slice(0, 4)

  const decade = `${Math.floor(car.year / 10) * 10}s`

  const specs: { label: string; value: string | number | undefined; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: "Year", value: car.year, icon: Calendar },
    { label: "Make", value: car.make, icon: Car },
    { label: "Model", value: car.model, icon: Cog },
    { label: "Body Type", value: car.bodyType, icon: Car },
    { label: "Engine", value: car.specs.engine, icon: Cpu },
    { label: "Horsepower", value: car.specs.horsepower ? `${car.specs.horsepower} hp` : undefined, icon: Gauge },
    { label: "Transmission", value: car.specs.transmission, icon: Cog },
    { label: "Drivetrain", value: car.specs.drivetrain, icon: Shield },
    { label: "Top Speed", value: car.specs.topSpeed ? `${car.specs.topSpeed} mph` : undefined, icon: Zap },
    { label: "0–60 mph", value: car.specs.zeroToSixty ? `${car.specs.zeroToSixty}s` : undefined, icon: Gauge },
    { label: "Weight", value: car.specs.weight ? `${car.specs.weight} lbs` : undefined, icon: Shield },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Vehicle",
            name: car.name,
            description: car.description,
            url: `${SITE_URL}/cars/${car.slug}`,
            manufacturer: { "@type": "Organization", name: car.make },
            vehicleModelDate: car.year,
            vehicleTransmission: car.specs.transmission,
            engineType: car.specs.engine,
            productionDate: car.year,
            bodyType: car.bodyType,
            brand: { "@type": "Brand", name: car.make },
            ...(car.specs.horsepower ? { power: `${car.specs.horsepower} HP` } : {}),
            ...(car.specs.topSpeed ? { speed: `${car.specs.topSpeed} mph` } : {}),
            ...(car.specs.weight ? { weight: `${car.specs.weight} lbs` } : {}),
          }),
        }}
      />

      <article>
        <nav className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li><Link href="/cars" className="hover:text-foreground transition-colors">Cars</Link></li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-foreground">{car.name}</li>
          </ol>
        </nav>

        <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-border/50">
            <div className="bg-gradient-to-br from-surface-light via-surface to-surface aspect-[21/9] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.1)_0%,transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(245,158,11,0.06)_0%,transparent_60%)]" />
              {resolveImage(car)
                ? <img src={resolveImage(car)} alt={car.name} className="relative z-10 h-full w-full object-contain p-4" />
                : <div className="relative z-10 text-center">
                    <Car className="mx-auto h-24 w-24 text-primary/30" />
                    <p className="mt-4 text-sm text-muted">Image coming soon</p>
                  </div>
              }
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {franchiseName && (
                  <Link
                    href={`/franchise/${franchiseSlug}`}
                    className="rounded-full border border-primary/30 bg-primary/5 px-3 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
                  >
                    {franchiseName}
                  </Link>
                )}
              </div>
              <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                {car.name}
              </h1>
              <p className="mt-2 text-lg text-muted">
                {car.make} {car.model} &middot; {car.year}
              </p>
            </div>
            <Link
              href={`/decade/${decade}`}
              className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:bg-surface-light hover:text-foreground"
            >
              {decade}
            </Link>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-muted">{car.description}</p>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">Specifications</h2>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {specs.map((spec) => spec.value !== undefined && spec.value !== null ? (
              <div key={spec.label} className="flex items-center gap-3 bg-surface px-5 py-4">
                <spec.icon className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted">{spec.label}</p>
                  <p className="font-medium text-foreground">{spec.value}</p>
                </div>
              </div>
            ) : null)}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-white mb-6">Appearances in Media</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {car.appearances.map((appearance, i) => (
              <div
                key={`${appearance.title}-${i}`}
                className="group glass rounded-xl border border-border/50 p-5 transition-all hover:border-primary/30 hover:shadow-[0_0_15px_rgba(220,38,38,0.1)]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {appearance.mediaType === "movie" || appearance.mediaType === "animated-film" ? (
                      <Film className="h-5 w-5" />
                    ) : (
                      <Tv className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-primary transition-colors">
                      {appearance.title}
                    </h3>
                    <p className="text-sm text-muted">
                      {appearance.mediaType.replace("-", " ")} &middot; {appearance.year}
                    </p>
                    <p className="mt-1 text-sm text-foreground">Role: {appearance.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2">
          {car.iconicScene && (
            <section className="glass rounded-xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-secondary" />
                <h2 className="font-heading text-2xl font-bold text-white">Iconic Scene</h2>
              </div>
              <p className="text-muted leading-relaxed">{car.iconicScene}</p>
            </section>
          )}
          {car.culturalImpact && (
            <section className="glass rounded-xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
                <h2 className="font-heading text-2xl font-bold text-white">Cultural Impact</h2>
              </div>
              <p className="text-muted leading-relaxed">{car.culturalImpact}</p>
            </section>
          )}
        </div>

        {car.funFact && (
          <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-6">
              <h2 className="font-heading text-xl font-bold text-secondary mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Fun Fact
              </h2>
              <p className="text-muted leading-relaxed">{car.funFact}</p>
            </div>
          </section>
        )}

        {relatedCars.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Related Cars</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCars.map((rc) => (
                <CarCard key={rc.slug} car={rc} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
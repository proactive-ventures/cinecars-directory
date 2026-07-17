import Link from "next/link"
import { Car } from "lucide-react"

interface MakeCardProps {
  make: {
    slug: string
    name: string
    carCount: number
    country?: string
    description?: string
  }
}

export default function MakeCard({ make }: MakeCardProps) {
  const initials = make.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <Link
      href={`/make/${make.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary/20 via-surface to-primary/10">
        <div className="flex flex-col items-center gap-2">
          <span className="font-heading text-5xl font-bold text-white">
            {initials}
          </span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {make.country || "Automotive"}
          </span>
        </div>
        <div className="img-scrim pointer-events-none absolute inset-0" />
      </div>

      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-primary">
          {make.name}
        </h3>

        {make.description && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {make.description}
          </p>
        )}

        <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
          <Car className="h-4 w-4" />
          <span>{make.carCount} cars</span>
        </div>
      </div>
    </Link>
  )
}

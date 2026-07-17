import Link from "next/link"
import { Calendar, Car } from "lucide-react"

interface DecadeCardProps {
  decade: {
    slug: string
    name: string
    carCount: number
    description?: string
  }
}

export default function DecadeCard({ decade }: DecadeCardProps) {
  return (
    <Link
      href={`/decade/${decade.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-surface to-secondary/10">
        <div className="flex flex-col items-center gap-2">
          <Calendar className="h-10 w-10 text-white/60" />
          <span className="font-heading text-5xl font-bold text-white">
            {decade.name}
          </span>
        </div>
        <div className="img-scrim pointer-events-none absolute inset-0" />
      </div>

      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-primary">
          {decade.name}
        </h3>

        {decade.description && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {decade.description}
          </p>
        )}

        <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
          <Car className="h-4 w-4" />
          <span>{decade.carCount} cars</span>
        </div>
      </div>
    </Link>
  )
}

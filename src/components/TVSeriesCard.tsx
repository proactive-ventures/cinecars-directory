import Link from "next/link"
import { Tv, Calendar, Monitor } from "lucide-react"

interface TVSeriesCardProps {
  series: {
    id: string
    slug: string
    title: string
    year: number
    creator: string
    carCount: number
    image?: string
  }
}

export default function TVSeriesCard({ series }: TVSeriesCardProps) {
  const initials = series.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <Link
      href={`/tv-series/${series.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-surface to-secondary/10">
        {series.image ? (
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${series.image})` }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Tv className="h-10 w-10 text-white/15" />
            <span className="font-heading text-4xl font-bold text-white/15">
              {initials}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-primary">
          {series.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {series.year}
          </span>
          <span className="flex items-center gap-1">
            <Monitor className="h-3 w-3" />
            {series.creator}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
          <span>{series.carCount} cars</span>
        </div>
      </div>
    </Link>
  )
}

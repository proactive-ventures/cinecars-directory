import Link from "next/link"
import { Globe, Car, Film } from "lucide-react"

interface FranchiseCardProps {
  franchise: {
    id: string
    slug: string
    name: string
    description?: string
    carCount: number
    movieCount: number
    image?: string
  }
}

export default function FranchiseCard({ franchise }: FranchiseCardProps) {
  const initials = franchise.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <Link
      href={`/franchises/${franchise.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary/20 via-surface to-primary/10">
        {franchise.image ? (
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${franchise.image})` }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Globe className="h-10 w-10 text-white/15" />
            <span className="font-heading text-4xl font-bold text-white/15">
              {initials}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-primary">
          {franchise.name}
        </h3>

        {franchise.description && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
            {franchise.description}
          </p>
        )}

        <div className="mt-3 flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Car className="h-3 w-3" />
            {franchise.carCount} cars
          </span>
          <span className="flex items-center gap-1">
            <Film className="h-3 w-3" />
            {franchise.movieCount} movies
          </span>
        </div>
      </div>
    </Link>
  )
}

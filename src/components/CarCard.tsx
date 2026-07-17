"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Building2, Gauge, Fuel, Zap, Cog, ArrowUpRight, Star, Film, Tv, Info, Quote } from "lucide-react"
import type { Car } from "@/data/cars"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CarCardProps {
  car: Car
  index?: number
}

export default function CarCard({ car, index = 0 }: CarCardProps) {
  const initials = car.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const imgSrc = car.image || car.imageUrl
  const fallbackSrc = car.imageUrl && car.imageUrl !== car.image ? car.imageUrl : null

  const mediaIcons = {
    movie: <Film className="h-3 w-3" />,
    "tv-series": <Tv className="h-3 w-3" />,
    "animated-film": <Film className="h-3 w-3" />,
    "animated-series": <Tv className="h-3 w-3" />,
  } as const

  const mediaLabels = {
    movie: "Movie",
    "tv-series": "TV Series",
    "animated-film": "Animated Film",
    "animated-series": "Animated Series",
  } as const

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        className="group perspective-1000 h-[420px]"
      >
        <div className="flip-3d">
          {/* Front Face */}
          <Card className="flip-face overflow-hidden border-border/50">
            <Link href={`/cars/${car.slug}`} className="block h-full">
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-card to-secondary/10">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={car.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      if (fallbackSrc && (e.currentTarget as HTMLImageElement).src !== fallbackSrc) {
                        e.currentTarget.src = fallbackSrc
                      }
                    }}
                  />
                ) : (
                  <span className="font-heading text-5xl font-bold tracking-wider text-white/20">
                    {initials}
                  </span>
                )}
                {car.isFeatured && (
                  <span className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground shadow-md">
                    <Star className="h-3 w-3 fill-secondary-foreground" />
                    Featured
                  </span>
                )}
                <div className="img-scrim pointer-events-none absolute inset-0" />
              </div>

              <CardContent className="p-4">
                <h3 className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary line-clamp-1">
                  {car.name}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {car.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {car.make}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {car.appearances.slice(0, 3).map((appearance, appIdx) => {
                    const Icon = mediaIcons[appearance.mediaType] || Film
                    return (
                      <Tooltip key={`front-${appIdx}`}>
                        <TooltipTrigger asChild>
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                            {Icon}
                            <span className="truncate max-w-[80px]">{appearance.title}</span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                          <p>{appearance.title} ({appearance.year})</p>
                          <p className="text-muted-foreground">{appearance.role}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                  {car.appearances.length > 3 && (
                    <Badge variant="secondary" className="text-[11px] px-2 py-0.5">
                      +{car.appearances.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <div className="absolute bottom-2 right-3 text-[11px] font-semibold text-white/80 drop-shadow">
                Hover to flip →
              </div>
            </Link>
          </Card>

          {/* Back Face */}
          <Card className="flip-face flip-face--back overflow-hidden border-primary/20">
            <div className="flex h-full flex-col p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-base font-semibold text-foreground line-clamp-1">
                    {car.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {car.year} &middot; {car.make} &middot; {car.bodyType}
                  </p>
                </div>
                <Link
                  href={`/cars/${car.slug}`}
                  className="shrink-0 flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                >
                  Details <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Specs Grid */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {car.specs.horsepower && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-muted/20 px-2 py-1.5">
                    <Gauge className="h-3 w-3 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground">HP</p>
                      <p className="text-xs font-medium text-foreground truncate">{car.specs.horsepower}</p>
                    </div>
                  </div>
                )}
                {car.specs.engine && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 rounded-lg bg-muted/20 px-2 py-1.5">
                        <Fuel className="h-3 w-3 text-primary shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-muted-foreground">Engine</p>
                          <p className="text-xs font-medium text-foreground truncate">{car.specs.engine}</p>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs max-w-[200px]">
                      {car.specs.engine}
                    </TooltipContent>
                  </Tooltip>
                )}
                {car.specs.topSpeed && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-muted/20 px-2 py-1.5">
                    <Zap className="h-3 w-3 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground">Top Speed</p>
                      <p className="text-xs font-medium text-foreground truncate">{car.specs.topSpeed}{typeof car.specs.topSpeed === 'number' ? ' mph' : ''}</p>
                    </div>
                  </div>
                )}
                {car.specs.zeroToSixty && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-muted/20 px-2 py-1.5">
                    <Cog className="h-3 w-3 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground">0-60</p>
                      <p className="text-xs font-medium text-foreground truncate">{car.specs.zeroToSixty}{typeof car.specs.zeroToSixty === 'number' ? 's' : ''}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Appearances */}
              <div className="mt-2">
                <p className="text-[11px] font-medium text-muted-foreground mb-1">Appears in</p>
                <div className="flex flex-wrap gap-1">
                  {car.appearances.slice(0, 4).map((app, appIdx) => {
                    const Icon = mediaIcons[app.mediaType] || Film
                    return (
                      <Tooltip key={`back-${appIdx}`}>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="gap-1 text-[11px] px-2 py-0.5 text-primary border-primary/20 cursor-default">
                            {Icon}
                            <span className="truncate max-w-[100px]">{app.title}</span>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                          <p>{app.title} ({app.year})</p>
                          <p className="text-muted-foreground">{app.role}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                  {car.appearances.length > 4 && (
                    <Badge variant="secondary" className="text-[11px] px-2 py-0.5">
                      +{car.appearances.length - 4}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Fun Fact */}
              {car.funFact && (
                <div className="mt-2 rounded-lg bg-muted/15 px-2.5 py-1.5">
                  <div className="flex items-start gap-1.5">
                    <Quote className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-tight text-muted-foreground italic line-clamp-2">{car.funFact}</p>
                  </div>
                </div>
              )}

              {/* Iconic Scene / Cultural Impact */}
              {(car.iconicScene || car.culturalImpact) && (
                <div className="mt-1.5 rounded-lg bg-primary/5 px-2.5 py-1.5">
                  <div className="flex items-start gap-1.5">
                    <Info className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-tight text-muted-foreground line-clamp-1">
                      {car.iconicScene || car.culturalImpact}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-auto pt-2 text-center text-[10px] font-medium text-muted-foreground">
                Hover to flip back
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}

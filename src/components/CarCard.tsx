"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useCallback, useState } from "react"
import {
  Calendar, Building2, Gauge, Fuel, Zap, Cog, ArrowUpRight, Star,
  Film, Tv, Info, Quote, Timer, Shield, ChevronRight, Eye, Heart,
  GitCompareArrows,
} from "lucide-react"
import type { Car } from "@/data/cars"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useFavorites } from "@/hooks/useFavorites"
import { useCompare } from "@/hooks/useCompare"

interface CarCardProps {
  car: Car
  index?: number
  showFavorites?: boolean
}

export default function CarCard({ car, index = 0, showFavorites = true }: CarCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { has: isCompared, add: addToCompare, remove: removeFromCompare, isFull } = useCompare()

  const initials = car.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const imgSrc = car.image || car.imageUrl
  const fallbackSrc = car.imageUrl && car.imageUrl !== car.image ? car.imageUrl : null
  const mediaCount = car.appearances.length

  const mediaIcons = {
    movie: <Film className="h-3 w-3" />,
    "tv-series": <Tv className="h-3 w-3" />,
    "animated-film": <Film className="h-3 w-3" />,
    "animated-series": <Tv className="h-3 w-3" />,
  } as const

  const primaryAppearance = car.appearances[0]
  const primarySlug = primaryAppearance?.title.toLowerCase().replace(/\s+/g, "-")
  const primaryMediaType = primaryAppearance?.mediaType
  const primaryLink = primaryMediaType === "movie" || primaryMediaType === "animated-film"
    ? `/movies/${primarySlug}` : `/tv-series/${primarySlug}`

  const hasSpecs = car.specs.horsepower || car.specs.engine || car.specs.topSpeed || car.specs.zeroToSixty

  const toggleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        toggleFlip()
      }
    },
    [toggleFlip],
  )

  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      toggleFavorite(car.slug)
    },
    [car.slug, toggleFavorite],
  )

  const fav = isFavorite(car.slug)
  const compared = isCompared(car.slug)

  const handleCompareClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (compared) {
        removeFromCompare(car.slug)
      } else if (!isFull) {
        addToCompare(car.slug)
      }
    },
    [car.slug, compared, addToCompare, removeFromCompare, isFull],
  )

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.35, ease: "easeOut" }}
        className="group perspective-1000 h-[430px] card-lift"
      >
        <div
          className={`flip-3d ${isFlipped ? "is-flipped" : ""}`}
          onClick={toggleFlip}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={`${car.name} - ${isFlipped ? "Click to show front" : "Click to show details"}`}
          aria-pressed={isFlipped}
        >
          {/* ======== FRONT FACE ======== */}
          <Card className="flip-face overflow-hidden border-border/50 bg-card">
            <div className="block h-full">
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-card to-secondary/10">
                {imgSrc && !imgError ? (
                  <img
                    src={imgSrc}
                    alt={car.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      if (fallbackSrc && (e.currentTarget as HTMLImageElement).src !== fallbackSrc) {
                        e.currentTarget.src = fallbackSrc
                        setImgError(false)
                      } else {
                        setImgError(true)
                      }
                    }}
                  />
                ) : (
                  <span className="font-heading text-5xl font-bold tracking-wider text-white/20">
                    {initials}
                  </span>
                )}
                {car.isFeatured && (
                  <span className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground shadow-md">
                    <Star className="h-3 w-3 fill-secondary-foreground" />
                    Featured
                  </span>
                )}
                {showFavorites && (
                  <>
                    <button
                      onClick={handleFavoriteClick}
                      className={`absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full p-1.5 transition-all ${
                        fav
                          ? "bg-primary text-white shadow-md"
                          : "bg-black/40 text-white/70 hover:bg-black/60 hover:text-white"
                      }`}
                      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={handleCompareClick}
                      className={`absolute left-10 top-2 z-10 flex items-center gap-1 rounded-full p-1.5 transition-all ${
                        compared
                          ? "bg-primary text-white shadow-md"
                          : "bg-black/40 text-white/70 hover:bg-black/60 hover:text-white"
                      }`}
                      aria-label={compared ? "Remove from compare" : "Add to compare"}
                    >
                      <GitCompareArrows className="h-4 w-4" />
                    </button>
                  </>
                )}
                <div className="img-scrim pointer-events-none absolute inset-0" />
              </div>

              <CardContent className="p-4">
                <Link href={`/cars/${car.slug}`} onClick={(e) => e.stopPropagation()} className="font-heading text-lg font-semibold text-foreground transition-colors hover:text-primary line-clamp-1">
                  {car.name}
                </Link>

                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {car.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {car.make}
                  </span>
                  {car.bodyType && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-muted/30 text-muted-foreground">
                      {car.bodyType}
                    </Badge>
                  )}
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  {car.appearances.slice(0, 3).map((appearance, appIdx) => {
                    const Icon = mediaIcons[appearance.mediaType] || Film
                    return (
                      <Tooltip key={`front-${appIdx}`}>
                        <TooltipTrigger asChild>
                          <Link
                            href={`/${appearance.mediaType === "movie" || appearance.mediaType === "animated-film" ? "movies" : "tv-series"}/${appearance.title.toLowerCase().replace(/\s+/g, "-")}`}
                            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/20 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {Icon}
                            <span className="truncate max-w-[80px]">{appearance.title}</span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                          <p>{appearance.title} ({appearance.year})</p>
                          <p className="text-muted-foreground">Role: {appearance.role}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                  {mediaCount > 3 && (
                    <Badge variant="secondary" className="text-[11px] px-2 py-0.5">
                      +{mediaCount - 3}
                    </Badge>
                  )}
                </div>

                {hasSpecs && (
                  <div className="mt-2.5 flex items-center gap-3 text-xs text-muted-foreground">
                    {car.specs.horsepower && (
                      <span className="flex items-center gap-1">
                        <Gauge className="h-3 w-3 text-primary" />
                        <span>{car.specs.horsepower} hp</span>
                      </span>
                    )}
                    {car.specs.topSpeed && (
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-primary" />
                        <span>{car.specs.topSpeed}{typeof car.specs.topSpeed === 'number' ? ' mph' : ''}</span>
                      </span>
                    )}
                  </div>
                )}
              </CardContent>

              <div className="absolute bottom-2 right-3 flex items-center gap-1.5 text-[11px] font-medium text-white/70">
                <Eye className="h-3 w-3" />
                <span>Tap to flip</span>
              </div>
            </div>
          </Card>

          {/* ======== BACK FACE (FLIPPED) ======== */}
          <Card className="flip-face flip-face--back overflow-hidden border-primary/20 bg-gradient-to-b from-card to-card/95">
            <div className="flex h-full flex-col p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-base font-semibold text-foreground line-clamp-1">
                    {car.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {car.year} &middot; {car.make}
                    {car.bodyType ? <span> &middot; {car.bodyType}</span> : null}
                  </p>
                </div>
                <Link
                  href={`/cars/${car.slug}`}
                  className="shrink-0 flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Full Details <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                {car.specs.horsepower ? (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 px-2 py-1.5">
                    <span className="text-lg font-bold text-primary">{car.specs.horsepower}</span>
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">HP</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-muted/10 px-2 py-1.5">
                    <span className="text-lg font-bold text-muted-foreground">—</span>
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">HP</span>
                  </div>
                )}
                {car.specs.topSpeed ? (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 px-2 py-1.5">
                    <span className="text-lg font-bold text-primary">{car.specs.topSpeed}</span>
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">
                      {typeof car.specs.topSpeed === 'number' ? 'MPH' : 'Top Spd'}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-muted/10 px-2 py-1.5">
                    <span className="text-lg font-bold text-muted-foreground">—</span>
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">TOP</span>
                  </div>
                )}
                {car.specs.zeroToSixty ? (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-secondary/10 px-2 py-1.5">
                    <span className="text-lg font-bold text-secondary">{car.specs.zeroToSixty}</span>
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">
                      {typeof car.specs.zeroToSixty === 'number' ? 'SEC 0-60' : '0-60'}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-muted/10 px-2 py-1.5">
                    <span className="text-lg font-bold text-muted-foreground">—</span>
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">0-60</span>
                  </div>
                )}
              </div>

              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                {car.specs.engine && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 rounded-lg bg-muted/15 px-2 py-1 cursor-default">
                        <Fuel className="h-3 w-3 text-primary shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Engine</p>
                          <p className="text-[11px] font-medium text-foreground truncate">{car.specs.engine}</p>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs max-w-[200px]">
                      {car.specs.engine}
                    </TooltipContent>
                  </Tooltip>
                )}
                {car.specs.drivetrain && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-muted/15 px-2 py-1">
                    <Shield className="h-3 w-3 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Drivetrain</p>
                      <p className="text-[11px] font-medium text-foreground truncate">{car.specs.drivetrain}</p>
                    </div>
                  </div>
                )}
                {car.specs.transmission && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-muted/15 px-2 py-1">
                    <Cog className="h-3 w-3 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Transmission</p>
                      <p className="text-[11px] font-medium text-foreground truncate">{car.specs.transmission}</p>
                    </div>
                  </div>
                )}
                {car.specs.weight && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-muted/15 px-2 py-1">
                    <Timer className="h-3 w-3 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Weight</p>
                      <p className="text-[11px] font-medium text-foreground truncate">{car.specs.weight}{typeof car.specs.weight === 'number' ? ' lbs' : ''}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-1.5">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[11px] font-medium text-muted-foreground">Appears in {mediaCount} {mediaCount === 1 ? 'production' : 'productions'}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {car.appearances.slice(0, 4).map((app, appIdx) => {
                    const Icon = mediaIcons[app.mediaType] || Film
                    const appSlug = app.title.toLowerCase().replace(/\s+/g, "-")
                    const appLink = app.mediaType === "movie" || app.mediaType === "animated-film"
                      ? `/movies/${appSlug}` : `/tv-series/${appSlug}`
                    return (
                      <Tooltip key={`back-${appIdx}`}>
                        <TooltipTrigger asChild>
                          <Link
                            href={appLink}
                            className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/10 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {Icon}
                            <span className="truncate max-w-[90px]">{app.title}</span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                          <p>{app.title} ({app.year})</p>
                          <p className="text-muted-foreground">Role: {app.role}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                  {mediaCount > 4 && (
                    <Badge variant="secondary" className="text-[11px] px-2 py-0.5">
                      +{mediaCount - 4}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-1">
                {car.funFact && (
                  <div className="rounded-lg bg-muted/10 px-2.5 py-1.5">
                    <div className="flex items-start gap-1.5">
                      <Quote className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-tight text-muted-foreground italic line-clamp-2">{car.funFact}</p>
                    </div>
                  </div>
                )}
                {!car.funFact && (car.iconicScene || car.culturalImpact) && (
                  <div className="rounded-lg bg-primary/5 px-2.5 py-1.5">
                    <div className="flex items-start gap-1.5">
                      <Info className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-tight text-muted-foreground line-clamp-2">
                        {car.iconicScene || car.culturalImpact}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-1.5 flex items-center justify-between">
                {primaryAppearance && (
                  <Link
                    href={primaryLink}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Film className="h-3 w-3" />
                    See {primaryAppearance.title} cars <ChevronRight className="h-3 w-3" />
                  </Link>
                )}
                <span className="text-[10px] font-medium text-muted-foreground">Tap to flip back</span>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}

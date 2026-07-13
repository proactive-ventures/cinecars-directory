"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useAnimationControls } from "framer-motion"
import { ChevronLeft, ChevronRight, Film, Calendar } from "lucide-react"

interface FeaturedCar {
  id: string
  slug: string
  name: string
  year: number
  make: string
  appearances: string[]
  image?: string
}

interface FeaturedCarouselProps {
  cars: FeaturedCar[]
}

export default function FeaturedCarousel({ cars }: FeaturedCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: [0, -1920],
        transition: {
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        },
      })
    } else {
      controls.stop()
    }
  }, [isPaused, controls])

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const amount = direction === "left" ? -400 : 400
      containerRef.current.scrollBy({ left: amount, behavior: "smooth" })
    }
  }

  const duplicatedCars = [...cars, ...cars]

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute left-0 top-0 z-10 flex h-full items-center">
        <button
          onClick={() => scroll("left")}
          className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 text-muted backdrop-blur-sm transition-colors hover:bg-primary hover:text-white"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute right-0 top-0 z-10 flex h-full items-center">
        <button
          onClick={() => scroll("right")}
          className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 text-muted backdrop-blur-sm transition-colors hover:bg-primary hover:text-white"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={containerRef}
        className="no-scrollbar flex gap-4 overflow-x-auto pb-4"
      >
        <motion.div animate={controls} className="flex gap-4">
          {duplicatedCars.map((car, index) => {
            const initials = car.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()

            return (
              <Link
                key={`${car.id}-${index}`}
                href={`/cars/${car.slug}`}
                className="group w-72 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
              >
                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-surface to-secondary/10">
                  {car.image ? (
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${car.image})` }}
                    />
                  ) : (
                    <span className="font-heading text-4xl font-bold text-white/20">
                      {initials}
                    </span>
                  )}
                  <div className="absolute right-2 top-2 rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-medium text-secondary backdrop-blur-sm">
                    Featured
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="font-heading text-base font-semibold text-white transition-colors group-hover:text-primary">
                    {car.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {car.year}
                    </span>
                    <span className="text-muted">|</span>
                    <span>{car.make}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {car.appearances.slice(0, 2).map((appearance) => (
                      <span
                        key={appearance}
                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary-light"
                      >
                        <Film className="h-2 w-2" />
                        {appearance}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </motion.div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

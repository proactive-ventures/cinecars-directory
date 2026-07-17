"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Film,
  Calendar,
  Building2,
  Star,
  ChevronRight,
} from "lucide-react"


interface FeatureCardProps {
  car: {
    id: string
    slug: string
    name: string
    year: number
    make: string
    model: string
    appearances: string[]
    image?: string
    isFeatured?: boolean
    description?: string
  }
  index?: number
}

export default function FeatureCard({ car, index = 0 }: FeatureCardProps) {
  const initials = car.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        href={`/cars/${car.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(220,38,38,0.3)]"
      >
        <div className="grid md:grid-cols-2">
          <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/30 via-surface to-secondary/20 md:h-full">
            {car.image ? (
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${car.image})` }}
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="font-heading text-7xl font-bold text-white/15">
                  {initials}
                </span>
                <span className="text-sm text-muted-foreground">{car.name}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/50 to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-6 lg:p-8">
            {car.isFeatured && (
              <span className="mb-3 flex w-fit items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-secondary backdrop-blur-sm">
                <Star className="h-3 w-3 fill-secondary" />
                Featured Vehicle
              </span>
            )}

            <h3 className="font-heading text-2xl font-bold text-white transition-colors group-hover:text-primary lg:text-3xl">
              {car.name}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {car.description ||
                `Discover the iconic ${car.make} ${car.model} from ${car.year}.`}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                {car.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-secondary" />
                {car.make}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {car.appearances.slice(0, 4).map((appearance) => (
                <span
                  key={appearance}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary-light"
                >
                  <Film className="h-3 w-3" />
                  {appearance}
                </span>
              ))}
            </div>

            <span className="mt-6 flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-secondary">
              View Details
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Building2, Star } from "lucide-react"
import type { Car } from "@/data/cars"

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

  const imgSrc = car.imageUrl || car.image

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link
        href={`/cars/${car.slug}`}
        className="group block overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
      >
        <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-surface to-secondary/10">
          {imgSrc && (
            <img
              src={imgSrc}
              alt={car.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          )}
          {!imgSrc && (
            <span className="font-heading text-5xl font-bold tracking-wider text-white/20">
              {initials}
            </span>
          )}
          {car.isFeatured && (
            <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-1 text-xs font-medium text-secondary backdrop-blur-sm z-10">
              <Star className="h-3 w-3 fill-secondary" />
              Featured
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="p-4">
          <h3 className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-primary">
            {car.name}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
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
            {car.appearances.slice(0, 3).map((appearance) => (
              <span
                key={appearance.title}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary-light"
              >
                {appearance.title}
              </span>
            ))}
            {car.appearances.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-surface-light px-2 py-0.5 text-[11px] font-medium text-muted">
                +{car.appearances.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
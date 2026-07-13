"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calendar,
  Building2,
  Film,
  Tv,
  Globe,
  ChevronRight,
} from "lucide-react"

const categories = [
  {
    title: "Browse by Decade",
    description:
      "Discover cars from the 1920s through today. Each decade shaped automotive and cinematic history.",
    href: "/decade/1960s",
    icon: Calendar,
    gradient: "from-primary/20 via-surface to-primary/10",
  },
  {
    title: "Browse by Make",
    description:
      "Explore iconic brands from Aston Martin to Ferrari, Dodge to DeLorean.",
    href: "/make/aston-martin",
    icon: Building2,
    gradient: "from-secondary/20 via-surface to-secondary/10",
  },
  {
    title: "Movies",
    description:
      "From James Bond to Fast & Furious — every blockbuster's most memorable vehicles.",
    href: "/movies",
    icon: Film,
    gradient: "from-primary/20 via-surface to-accent/10",
  },
  {
    title: "TV Series",
    description:
      "Knight Rider, The Dukes of Hazzard, and more — small screen, big wheels.",
    href: "/tv-series",
    icon: Tv,
    gradient: "from-accent/20 via-surface to-primary/10",
  },
  {
    title: "Franchises",
    description:
      "Deep dives into the automotive stars of cinema's biggest franchises.",
    href: "/cars?franchise=true",
    icon: Globe,
    gradient: "from-secondary/20 via-surface to-primary/10",
  },
]

export default function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Link
            href={category.href}
            className={`group relative block h-full overflow-hidden rounded-xl border border-border bg-gradient-to-br ${category.gradient} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <category.icon className="h-6 w-6 text-primary" />
            </div>

            <h3 className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-primary">
              {category.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-muted">
              {category.description}
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Explore
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, ArrowRight, Car, Film, Tv, Building2 } from "lucide-react"
import Link from "next/link"

const stats = [
  { value: 250, label: "Cars", icon: Car },
  { value: 80, label: "Movies", icon: Film },
  { value: 45, label: "TV Series", icon: Tv },
  { value: 30, label: "Franchises", icon: Building2 },
]

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}+</span>
}

export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/cars?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      key: i,
      left: `${((i * 17 + 31) % 100)}%`,
      top: `${((i * 13 + 7) % 100)}%`,
      duration: 3 + ((i * 7) % 4),
      delay: ((i * 11) % 5),
    }))
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.15)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(245,158,11,0.08)_0%,_transparent_50%)]" />

      {particles.map((p) => (
        <motion.div
          key={p.key}
          className="absolute h-1 w-1 rounded-full bg-primary/30"
          style={{ left: p.left, top: p.top }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-light backdrop-blur-sm">
            The Ultimate Automotive Film Archive
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Every Iconic Car from{" "}
          <span className="text-gradient">Movies &amp; TV Series</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Explore 250+ legendary vehicles from Fast &amp; Furious, James Bond,
          Batman, Knight Rider, and more. Complete specs, film appearances, and
          cultural impact.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onSubmit={handleSearch}
          className="mx-auto mt-8 flex max-w-xl items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a car, movie, or make..."
              className="w-full rounded-xl border border-border bg-surface/80 py-3.5 pl-11 pr-4 text-sm text-foreground placeholder-muted backdrop-blur-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Search
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            Explore Cars
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/cars?franchise=true"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-surface"
          >
            Browse by Franchise
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border/50 bg-surface/50 p-4 backdrop-blur-sm"
            >
              <stat.icon className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 font-heading text-2xl font-bold text-white">
                <AnimatedCounter target={stat.value} />
              </p>
              <p className="text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

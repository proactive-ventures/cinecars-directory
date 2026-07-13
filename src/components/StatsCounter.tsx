"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface StatsCounterProps {
  value: number
  label: string
  icon: LucideIcon
  suffix?: string
}

export default function StatsCounter({
  value,
  label,
  icon: Icon,
  suffix = "+",
}: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
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
  }, [value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center rounded-xl border border-border/50 bg-surface/50 p-6 backdrop-blur-sm"
    >
      <Icon className="h-6 w-6 text-primary" />
      <p className="mt-2 font-heading text-3xl font-bold text-white">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-muted">{label}</p>
    </motion.div>
  )
}

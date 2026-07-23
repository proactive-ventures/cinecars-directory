"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CarFront, Menu, X, Sun, Moon, Heart, Shuffle, GitCompareArrows, BarChart3 } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/lib/constants"
import { useFavorites } from "@/hooks/useFavorites"
import { useCompare } from "@/hooks/useCompare"
import { cars } from "@/data/cars"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { count } = useFavorites()
  const { count: compareCount } = useCompare()
  const [mounted, setMounted] = useState(false)

  const goRandom = useCallback(() => {
    const idx = Math.floor(Math.random() * cars.length)
    router.push(`/cars/${cars[idx].slug}`)
  }, [router])

  useEffect(() => { setMounted(true) }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <CarFront className="h-7 w-7 text-primary transition-colors group-hover:text-secondary" />
          <span className="font-heading text-xl font-bold tracking-wide text-foreground">
            Cine<span className="text-primary">Cars</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-surface-light hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/favorites"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1",
              pathname.startsWith("/favorites")
                ? "bg-primary/10 text-primary"
                : "text-muted hover:bg-surface-light hover:text-foreground",
            )}
          >
            <Heart className={`h-3.5 w-3.5 ${count > 0 ? "fill-primary text-primary" : ""}`} />
            Favorites
            {count > 0 && (
              <span className="flex items-center justify-center h-4 min-w-[16px] rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/compare"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1",
              pathname.startsWith("/compare")
                ? "bg-primary/10 text-primary"
                : "text-muted hover:bg-surface-light hover:text-foreground",
            )}
          >
            <GitCompareArrows className={`h-3.5 w-3.5 ${compareCount > 0 ? "text-primary" : ""}`} />
            Compare
            {compareCount > 0 && (
              <span className="flex items-center justify-center h-4 min-w-[16px] rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {compareCount}
              </span>
            )}
          </Link>
          <Link
            href="/stats"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1",
              pathname === "/stats"
                ? "bg-primary/10 text-primary"
                : "text-muted hover:bg-surface-light hover:text-foreground",
            )}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Stats
          </Link>
          <button
            onClick={goRandom}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-light hover:text-foreground"
            aria-label="Show random car"
          >
            <Shuffle className="h-4 w-4" />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-light hover:text-foreground"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-light hover:text-foreground"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-light hover:text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:bg-surface-light hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Link
                href="/favorites"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors inline-flex items-center gap-2",
                  pathname.startsWith("/favorites")
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-surface-light hover:text-foreground",
                )}
              >
                <Heart className={`h-4 w-4 ${count > 0 ? "fill-primary text-primary" : ""}`} />
                Favorites
                {count > 0 && (
                  <span className="flex items-center justify-center h-4 min-w-[16px] rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                    {count}
                  </span>
                )}
              </Link>
              <button
                onClick={() => { setIsOpen(false); goRandom() }}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors inline-flex items-center gap-2 text-muted hover:bg-surface-light hover:text-foreground"
              >
                <Shuffle className="h-4 w-4" />
                Random Car
              </button>
              <Link
                href="/compare"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors inline-flex items-center gap-2",
                  pathname.startsWith("/compare")
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-surface-light hover:text-foreground",
                )}
              >
                <GitCompareArrows className={`h-4 w-4 ${compareCount > 0 ? "fill-primary text-primary" : ""}`} />
                Compare
                {compareCount > 0 && (
                  <span className="flex items-center justify-center h-4 min-w-[16px] rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                    {compareCount}
                  </span>
                )}
              </Link>
              <Link
                href="/stats"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors inline-flex items-center gap-2",
                  pathname === "/stats"
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-surface-light hover:text-foreground",
                )}
              >
                <BarChart3 className="h-4 w-4" />
                Stats
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

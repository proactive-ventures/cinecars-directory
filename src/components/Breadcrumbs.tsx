"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"


const labelMap: Record<string, string> = {
  cars: "Cars",
  movies: "Movies",
  "tv-series": "TV Series",
  decade: "By Decade",
  make: "By Make",
  about: "About",
  franchises: "Franchises",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  disclaimer: "Disclaimer",
}

function formatSegment(segment: string): string {
  if (labelMap[segment]) return labelMap[segment]
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function Breadcrumbs() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const segments = pathname.split("/").filter(Boolean)

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <ol className="flex items-center gap-1.5 text-sm text-muted">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-primary"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/")
          const isLast = index === segments.length - 1
          const label = formatSegment(segment)

          return (
            <li key={href} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="transition-colors hover:text-primary"
                >
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

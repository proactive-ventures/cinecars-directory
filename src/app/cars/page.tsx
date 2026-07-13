"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useMemo, useState, useCallback } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import CarCard from "@/components/CarCard"
import { cars } from "@/data/cars"
import { SITE_URL, decades, bodyTypes, mediaTypes } from "@/lib/constants"
import { cn } from "@/lib/utils"

const CARS_PER_PAGE = 20

interface Filters {
  query: string
  decade: string
  make: string
  bodyType: string
  mediaType: string
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-muted">Loading cars...</div></div>}>
      <CarsPageContent />
    </Suspense>
  )
}

function CarsPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [filters, setFilters] = useState<Filters>({
    query: searchParams.get("q") || "",
    decade: searchParams.get("decade") || "",
    make: searchParams.get("make") || "",
    bodyType: searchParams.get("bodyType") || "",
    mediaType: searchParams.get("mediaType") || "",
  })
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
  const [showFilters, setShowFilters] = useState(false)

  const updateURL = useCallback(
    (newFilters: Filters, newPage: number) => {
      const params = new URLSearchParams()
      if (newFilters.query) params.set("q", newFilters.query)
      if (newFilters.decade) params.set("decade", newFilters.decade)
      if (newFilters.make) params.set("make", newFilters.make)
      if (newFilters.bodyType) params.set("bodyType", newFilters.bodyType)
      if (newFilters.mediaType) params.set("mediaType", newFilters.mediaType)
      if (newPage > 1) params.set("page", String(newPage))
      const qs = params.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [router, pathname],
  )

  const updateFilter = useCallback(
    (key: keyof Filters, value: string) => {
      const next = { ...filters, [key]: value }
      setFilters(next)
      setPage(1)
      updateURL(next, 1)
    },
    [filters, updateURL],
  )

  const clearFilters = useCallback(() => {
    const cleared = { query: "", decade: "", make: "", bodyType: "", mediaType: "" }
    setFilters(cleared)
    setPage(1)
    updateURL(cleared, 1)
  }, [updateURL])

  const filtered = useMemo(() => {
    let result = [...cars]
    if (filters.query) {
      const q = filters.query.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.make.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      )
    }
    if (filters.decade) {
      const start = Number.parseInt(filters.decade)
      result = result.filter((c) => c.year >= start && c.year < start + 10)
    }
    if (filters.make) {
      result = result.filter(
        (c) => c.make.toLowerCase() === filters.make.toLowerCase(),
      )
    }
    if (filters.bodyType) {
      result = result.filter(
        (c) => c.bodyType.toLowerCase() === filters.bodyType.toLowerCase(),
      )
    }
    if (filters.mediaType) {
      result = result.filter((c) =>
        c.appearances.some(
          (a) => a.mediaType.toLowerCase() === filters.mediaType.toLowerCase(),
        ),
      )
    }
    return result
  }, [filters])

  const totalPages = Math.ceil(filtered.length / CARS_PER_PAGE)
  const paginated = filtered.slice(
    (page - 1) * CARS_PER_PAGE,
    page * CARS_PER_PAGE,
  )

  const hasActiveFilters = Object.values(filters).some(Boolean)

  const makes = [...new Set(cars.map((c) => c.make))].sort()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "All Cars | CineCars Directory",
            description:
              "Browse our complete collection of iconic cars from movies and TV series.",
            url: `${SITE_URL}/cars`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: cars.map((car, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Vehicle",
                  name: car.name,
                  url: `${SITE_URL}/cars/${car.slug}`,
                },
              })),
            },
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            All Cars
          </h1>
          <p className="mt-2 text-muted">
            Browse {cars.length} iconic vehicles from movies and television
          </p>
        </div>

        {/* Search + Filter Toggle */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search cars by name, make, or model..."
              value={filters.query}
              onChange={(e) => updateFilter("query", e.target.value)}
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {filters.query && (
              <button
                onClick={() => updateFilter("query", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
              showFilters || hasActiveFilters
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-surface text-muted hover:bg-surface-light",
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {Object.values(filters).filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="w-full shrink-0 lg:w-64">
              <div className="glass rounded-xl border border-border/50 p-5 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg font-bold text-white">
                    Filters
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-primary hover:text-primary-light"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Decade */}
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-foreground">
                    Decade
                  </legend>
                  <select
                    value={filters.decade}
                    onChange={(e) => updateFilter("decade", e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="">All Decades</option>
                    {decades.map((d) => (
                      <option key={d} value={d.replace("s", "")}>
                        {d}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Make */}
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-foreground">
                    Make
                  </legend>
                  <select
                    value={filters.make}
                    onChange={(e) => updateFilter("make", e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="">All Makes</option>
                    {makes.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Body Type */}
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-foreground">
                    Body Type
                  </legend>
                  <select
                    value={filters.bodyType}
                    onChange={(e) => updateFilter("bodyType", e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="">All Types</option>
                    {bodyTypes.map((bt) => (
                      <option key={bt} value={bt}>
                        {bt}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Media Type */}
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-foreground">
                    Media Type
                  </legend>
                  <select
                    value={filters.mediaType}
                    onChange={(e) => updateFilter("mediaType", e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="">All Media</option>
                    {mediaTypes.map((mt) => (
                      <option key={mt} value={mt}>
                        {mt}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>
            </aside>
          )}

          {/* Results */}
          <div className="flex-1">
            <p className="mb-4 text-sm text-muted">
              Showing {(page - 1) * CARS_PER_PAGE + 1}–
              {Math.min(page * CARS_PER_PAGE, filtered.length)} of{" "}
              {filtered.length} results
            </p>

            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24">
                <Search className="h-12 w-12 text-muted" />
                <h3 className="mt-4 font-heading text-xl font-bold text-white">
                  No cars found
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginated.map((car) => (
                  <CarCard key={car.slug} car={car} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    const next = Math.max(1, page - 1)
                    setPage(next)
                    updateURL(filters, next)
                  }}
                  disabled={page === 1}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-light disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum: number
                  if (totalPages <= 7) {
                    pageNum = i + 1
                  } else if (page <= 4) {
                    pageNum = i + 1
                  } else if (page >= totalPages - 3) {
                    pageNum = totalPages - 6 + i
                  } else {
                    pageNum = page - 3 + i
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setPage(pageNum)
                        updateURL(filters, pageNum)
                      }}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                        pageNum === page
                          ? "bg-primary text-white"
                          : "bg-surface text-muted hover:bg-surface-light",
                      )}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                <button
                  onClick={() => {
                    const next = Math.min(totalPages, page + 1)
                    setPage(next)
                    updateURL(filters, next)
                  }}
                  disabled={page === totalPages}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-light disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

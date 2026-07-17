"use client"

import { Suspense, useMemo, useState, useCallback, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Search, SlidersHorizontal, X, SearchCode, LayoutGrid, Columns3, Columns4, ArrowUpDown } from "lucide-react"
import CarCard from "@/components/CarCard"
import CarCardSkeleton from "@/components/CarCardSkeleton"
import { cars } from "@/data/cars"
import { SITE_URL, decades, bodyTypes, mediaTypes } from "@/lib/constants"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const CARS_PER_PAGE = 20
const SKELETON_COUNT = 8

type SortKey = "relevance" | "name-asc" | "name-desc" | "year-desc" | "year-asc" | "appearances"
type GridDensity = "3" | "4" | "5"

interface Filters {
  query: string
  decade: string
  make: string
  bodyType: string
  mediaType: string
}

const gridClasses: Record<GridDensity, string> = {
  "3": "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  "5": "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
}

function getGridDensity(): GridDensity {
  if (typeof window === "undefined") return "4"
  return (localStorage.getItem("car-grid-density") as GridDensity) || "4"
}

function sortCars(list: typeof cars, sortKey: SortKey) {
  const sorted = [...list]
  switch (sortKey) {
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name))
      break
    case "year-desc":
      sorted.sort((a, b) => b.year - a.year)
      break
    case "year-asc":
      sorted.sort((a, b) => a.year - b.year)
      break
    case "appearances":
      sorted.sort((a, b) => b.appearances.length - a.appearances.length)
      break
    default:
      break
  }
  return sorted
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-muted-foreground">Loading cars...</div></div>}>
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
  const [commandOpen, setCommandOpen] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>((searchParams.get("sort") as SortKey) || "relevance")
  const [gridDensity, setGridDensity] = useState<GridDensity>(getGridDensity)
  const [loading, setLoading] = useState(false)

  const updateURL = useCallback(
    (newFilters: Filters, newPage: number, newSort?: SortKey) => {
      const params = new URLSearchParams()
      if (newFilters.query) params.set("q", newFilters.query)
      if (newFilters.decade) params.set("decade", newFilters.decade)
      if (newFilters.make) params.set("make", newFilters.make)
      if (newFilters.bodyType) params.set("bodyType", newFilters.bodyType)
      if (newFilters.mediaType) params.set("mediaType", newFilters.mediaType)
      if (newPage > 1) params.set("page", String(newPage))
      if (newSort && newSort !== "relevance") params.set("sort", newSort)
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
      setLoading(true)
      updateURL(next, 1, sortKey)
    },
    [filters, sortKey, updateURL],
  )

  const handleSortChange = useCallback(
    (value: string) => {
      const key = value as SortKey
      setSortKey(key)
      setPage(1)
      updateURL(filters, 1, key)
    },
    [filters, updateURL],
  )

  const handleDensityChange = useCallback((density: GridDensity) => {
    setGridDensity(density)
    localStorage.setItem("car-grid-density", density)
  }, [])

  const clearFilters = useCallback(() => {
    const cleared = { query: "", decade: "", make: "", bodyType: "", mediaType: "" }
    setFilters(cleared)
    setPage(1)
    setSortKey("relevance")
    updateURL(cleared, 1, "relevance")
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
    return sortCars(result, sortKey)
  }, [filters, sortKey])

  const totalPages = Math.ceil(filtered.length / CARS_PER_PAGE)
  const paginated = filtered.slice(
    (page - 1) * CARS_PER_PAGE,
    page * CARS_PER_PAGE,
  )

  const hasActiveFilters = Object.values(filters).some(Boolean) || sortKey !== "relevance"
  const activeFilterCount = Object.values(filters).filter(Boolean).length + (sortKey !== "relevance" ? 1 : 0)

  const makes = useMemo(() => [...new Set(cars.map((c) => c.make))].sort(), [])

  const activeFiltersList = Object.entries(filters).filter(([, v]) => v)

  // Scroll to top + loading state on page change
  const handlePageChange = useCallback(
    (newPage: number) => {
      setLoading(true)
      setPage(newPage)
      updateURL(filters, newPage, sortKey)
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
    [filters, sortKey, updateURL],
  )

  // Simulate loading delay on filter/page changes
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 150)
      return () => clearTimeout(timer)
    }
  }, [loading, page, filters, sortKey])

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
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            All Cars
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse {filtered.length} of {cars.length} iconic vehicles from movies and television
          </p>
        </div>

        {/* Search + Controls Bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder='Search cars... (Ctrl+K for quick search)'
              value={filters.query}
              onChange={(e) => updateFilter("query", e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                  e.preventDefault()
                  setCommandOpen(true)
                }
              }}
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {filters.query ? (
              <button
                onClick={() => updateFilter("query", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted/20 px-1.5 py-0.5 text-[11px] text-muted-foreground sm:inline-block">
                ⌘K
              </kbd>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <div className="w-[160px]">
              <Select value={sortKey} onValueChange={handleSortChange}>
                <SelectTrigger className="h-10 text-xs">
                  <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Default</SelectItem>
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                  <SelectItem value="year-desc">Newest First</SelectItem>
                  <SelectItem value="year-asc">Oldest First</SelectItem>
                  <SelectItem value="appearances">Most Appearances</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grid Density Toggle */}
            <TooltipProvider>
              <div className="flex rounded-lg border border-border overflow-hidden">
                {(["3", "4", "5"] as GridDensity[]).map((d) => (
                  <Tooltip key={d}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleDensityChange(d)}
                        className={`flex items-center justify-center h-10 w-10 text-xs transition-colors ${
                          gridDensity === d
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {d === "3" ? <Columns3 className="h-4 w-4" /> : d === "4" ? <LayoutGrid className="h-4 w-4" /> : <Columns4 className="h-4 w-4" />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>{d} columns</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>

            {/* Filter Drawer Toggle */}
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button
                  variant={hasActiveFilters ? "default" : "outline"}
                  className="gap-2 h-10"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 text-[10px]">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down the cars by decade, make, or type
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Decade</label>
                    <Select value={filters.decade} onValueChange={(v) => updateFilter("decade", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Decades" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Decades</SelectItem>
                        {decades.map((d) => (
                          <SelectItem key={d} value={d.replace("s", "")}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Make</label>
                    <Select value={filters.make} onValueChange={(v) => updateFilter("make", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Makes" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        <SelectItem value="all">All Makes</SelectItem>
                        {makes.map((m) => (
                          <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Body Type</label>
                    <Select value={filters.bodyType} onValueChange={(v) => updateFilter("bodyType", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {bodyTypes.map((bt) => (
                          <SelectItem key={bt} value={bt}>{bt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Media Type</label>
                    <Select value={filters.mediaType} onValueChange={(v) => updateFilter("mediaType", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Media" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Media</SelectItem>
                        {mediaTypes.map((mt) => (
                          <SelectItem key={mt} value={mt}>{mt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {hasActiveFilters && (
                    <Button onClick={clearFilters} variant="outline" className="w-full">
                      Clear all filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active filter pills */}
        {activeFiltersList.length > 0 || sortKey !== "relevance" ? (
          <div className="mb-4 flex flex-wrap gap-2">
            {activeFiltersList.map(([key, val]) => (
              <Badge key={key} variant="secondary" className="gap-1 px-3 py-1">
                {key === "query" ? `"${val}"` : val}
                <button onClick={() => updateFilter(key as keyof Filters, "")} className="ml-1 hover:text-foreground">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {sortKey !== "relevance" && (
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                Sort: {sortKey}
                <button onClick={() => handleSortChange("relevance")} className="ml-1 hover:text-foreground">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-primary hover:text-primary/80 underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        ) : null}

        <div className="flex flex-col gap-8">
          <div className="flex-1">
            <p className="mb-4 text-sm text-muted-foreground">
              Showing {(page - 1) * CARS_PER_PAGE + 1}–
              {Math.min(page * CARS_PER_PAGE, filtered.length)} of{" "}
              {filtered.length} results
            </p>

            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24">
                <SearchCode className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                  No cars found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : loading ? (
              <div className={`grid gap-6 ${gridClasses[gridDensity]}`}>
                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <CarCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className={`grid gap-6 ${gridClasses[gridDensity]}`}>
                {paginated.map((car, i) => (
                  <CarCard key={car.slug} car={car} index={i} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (page > 1) handlePageChange(page - 1)
                        }}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
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
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            isActive={pageNum === page}
                            onClick={(e) => {
                              e.preventDefault()
                              handlePageChange(pageNum)
                            }}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (page < totalPages) handlePageChange(page + 1)
                        }}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Improved Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search 7,000+ cars..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Results">
            {cars
              .filter((c) => {
                if (!commandOpen) return false
                return true
              })
              .slice(0, 50)
              .map((car) => (
                <CommandItem
                  key={car.slug}
                  value={`${car.name} ${car.make} ${car.model} ${car.year}`}
                  onSelect={() => {
                    setCommandOpen(false)
                    router.push(`/cars/${car.slug}`)
                  }}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-foreground">{car.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{car.year}</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{car.make}</span>
                    <span className="text-[10px] text-muted-foreground/50 shrink-0">{car.appearances.length} appearance{car.appearances.length !== 1 ? 's' : ''}</span>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

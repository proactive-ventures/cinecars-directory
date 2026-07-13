"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { decades, bodyTypes, mediaTypes } from "@/lib/constants"

const makes = [
  "Aston Martin",
  "Ferrari",
  "Lamborghini",
  "Porsche",
  "Ford",
  "Chevrolet",
  "Dodge",
  "DeLorean",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Toyota",
  "Nissan",
  "Mazda",
  "Volkswagen",
  "Jeep",
  "AMC",
  "Pontiac",
]

interface FilterSectionProps {
  title: string
  options: readonly string[]
  paramKey: string
  selected: string[]
  onToggle: (key: string, value: string) => void
}

function FilterSection({
  title,
  options,
  paramKey,
  selected,
  onToggle,
}: FilterSectionProps) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </h4>
      <div className="space-y-1">
        {options.map((option) => {
          const isChecked = selected.includes(option)
          return (
            <label
              key={option}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
                isChecked
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-surface-light hover:text-foreground",
              )}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(paramKey, option)}
                className="h-3.5 w-3.5 rounded border-border bg-surface text-primary accent-primary focus:ring-primary"
              />
              {option}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const q = searchParams.get("q") || ""
  const selectedDecades = searchParams.get("decade")?.split(",").filter(Boolean) || []
  const selectedMakes = searchParams.get("make")?.split(",").filter(Boolean) || []
  const selectedBodyTypes = searchParams.get("bodyType")?.split(",").filter(Boolean) || []
  const selectedMediaTypes = searchParams.get("mediaType")?.split(",").filter(Boolean) || []

  const updateURL = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    const queryString = newParams.toString()
    router.push(queryString ? `/cars?${queryString}` : "/cars")
  }

  const handleToggle = (key: string, value: string) => {
    const current = searchParams.get(key)?.split(",").filter(Boolean) || []
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateURL({ [key]: updated.length > 0 ? updated.join(",") : null })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const query = formData.get("q") as string
    updateURL({ q: query || null })
  }

  const activeFilters: { key: string; label: string; paramKey: string }[] = [
    ...selectedDecades.map((v) => ({ key: v, label: v, paramKey: "decade" })),
    ...selectedMakes.map((v) => ({ key: v, label: v, paramKey: "make" })),
    ...selectedBodyTypes.map((v) => ({ key: v, label: v, paramKey: "bodyType" })),
    ...selectedMediaTypes.map((v) => ({ key: v, label: v, paramKey: "mediaType" })),
  ]

  const clearAll = () => {
    router.push("/cars")
  }

  return (
    <aside className="space-y-6">
      <form onSubmit={handleSearch} className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search cars..."
          className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </form>

      {activeFilters.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Active Filters
            </h4>
            <button
              onClick={clearAll}
              className="text-xs text-primary transition-colors hover:text-primary-light"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeFilters.map((filter) => (
              <span
                key={`${filter.paramKey}-${filter.key}`}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary-light"
              >
                {filter.label}
                <button
                  onClick={() => handleToggle(filter.paramKey, filter.key)}
                  className="ml-0.5 transition-colors hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-5">
        <FilterSection
          title="Decade"
          options={decades}
          paramKey="decade"
          selected={selectedDecades}
          onToggle={handleToggle}
        />
        <FilterSection
          title="Make"
          options={makes}
          paramKey="make"
          selected={selectedMakes}
          onToggle={handleToggle}
        />
        <FilterSection
          title="Body Type"
          options={bodyTypes}
          paramKey="bodyType"
          selected={selectedBodyTypes}
          onToggle={handleToggle}
        />
        <FilterSection
          title="Media Type"
          options={mediaTypes}
          paramKey="mediaType"
          selected={selectedMediaTypes}
          onToggle={handleToggle}
        />
      </div>
    </aside>
  )
}

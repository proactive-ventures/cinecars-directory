"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "cinecars-favorites"

function getFavorites(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    setFavorites(getFavorites())
    const handler = () => setFavorites(getFavorites())
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }, [])

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites])

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const count = favorites.length

  return { favorites, isFavorite, toggleFavorite, count }
}

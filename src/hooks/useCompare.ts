"use client"

import { useCallback, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const MAX_COMPARE = 4

export function useCompare() {
  const router = useRouter()
  const [slugs, setSlugs] = useState<string[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const raw = params.get("cars")
    if (raw) {
      setSlugs(raw.split(",").filter(Boolean).slice(0, MAX_COMPARE))
    }
  }, [])

  const count = slugs.length
  const isFull = slugs.length >= MAX_COMPARE

  const add = useCallback(
    (slug: string) => {
      if (slugs.includes(slug) || isFull) return
      const next = [...slugs, slug]
      router.push(`/compare?cars=${next.join(",")}`)
    },
    [slugs, isFull, router],
  )

  const remove = useCallback(
    (slug: string) => {
      const next = slugs.filter((s) => s !== slug)
      router.push(next.length > 0 ? `/compare?cars=${next.join(",")}` : "/compare")
    },
    [slugs, router],
  )

  const clear = useCallback(() => {
    router.push("/compare")
  }, [router])

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs])

  return { slugs, count, add, remove, clear, has, isFull, MAX_COMPARE }
}

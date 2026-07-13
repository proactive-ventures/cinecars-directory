import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"
import { cars } from "@/data/cars"
import { movies } from "@/data/movies"
import { tvSeries } from "@/data/tv-series"
import { franchises } from "@/data/franchises"
import { decades } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${SITE_URL}/cars`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${SITE_URL}/movies`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/tv-series`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
  ]

  const carPages = cars.map((car) => ({
    url: `${SITE_URL}/cars/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const moviePages = movies.map((movie) => ({
    url: `${SITE_URL}/movies/${movie.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const tvPages = tvSeries.map((series) => ({
    url: `${SITE_URL}/tv-series/${series.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const decadePages = decades.map((decade) => ({
    url: `${SITE_URL}/decade/${decade}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  const franchisePages = franchises.map((franchise) => ({
    url: `${SITE_URL}/franchise/${franchise.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  const makeSlugs = [...new Set(cars.map((c) => c.make))]
  const makePages = makeSlugs.map((make) => ({
    url: `${SITE_URL}/make/${make.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [
    ...staticPages,
    ...carPages,
    ...moviePages,
    ...tvPages,
    ...decadePages,
    ...franchisePages,
    ...makePages,
  ]
}

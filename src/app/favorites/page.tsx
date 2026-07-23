"use client"

import Link from "next/link"
import { Heart, ArrowLeft, Star, SearchCode } from "lucide-react"
import CarCard from "@/components/CarCard"
import { cars } from "@/data/cars"
import { useFavorites } from "@/hooks/useFavorites"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { Button } from "@/components/ui/button"

export default function FavoritesPage() {
  const { favorites, count } = useFavorites()

  const favoriteCars = cars.filter((c) => favorites.includes(c.slug))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Favorites", item: `${SITE_URL}/favorites` },
            ],
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/cars" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to all cars
          </Link>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl flex items-center gap-3">
            <Heart className="h-8 w-8 text-primary" />
            My Favorites
          </h1>
          <p className="mt-2 text-muted">
            {count > 0
              ? `You have ${count} saved ${count === 1 ? "car" : "cars"} in your favorites`
              : "Save your favorite cars to find them quickly"}
          </p>
        </div>

        {favoriteCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24">
            <Heart className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
              No favorites yet
            </h3>
            <p className="mt-2 text-sm text-muted text-center max-w-md">
              Click the heart icon on any car card to save it here for quick access
            </p>
            <Link href="/cars">
              <Button className="mt-6">
                <Star className="h-4 w-4 mr-2" />
                Browse Cars
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteCars.map((car, i) => (
              <CarCard key={car.slug} car={car} index={i} showFavorites={true} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

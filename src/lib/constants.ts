export const SITE_NAME = "CineCars Directory"
export const SITE_TAGLINE = "Every Iconic Car from Movies & TV Series"
export const SITE_DESCRIPTION = "The ultimate directory of iconic cars from movies and TV series. Explore 200+ legendary vehicles from Fast & Furious, James Bond, Batman, Knight Rider, and more. Complete specs, film appearances, and cultural impact."
export const SITE_URL = "https://cinecars.directory"
export const SITE_LOCALE = "en_US"

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "Movies", href: "/movies" },
  { label: "TV Series", href: "/tv-series" },
  { label: "By Decade", href: "/decade/1960s" },
  { label: "By Make", href: "/make/aston-martin" },
  { label: "Franchises", href: "#franchises" },
  { label: "About", href: "/about" },
] as const

export const decades = [
  "1920s", "1930s", "1940s", "1950s", "1960s",
  "1970s", "1980s", "1990s", "2000s", "2010s", "2020s",
] as const

export const bodyTypes = [
  "Sports Car",
  "Muscle Car",
  "Supercar",
  "Sedan",
  "Coupe",
  "Convertible",
  "SUV",
  "Truck",
  "Wagon",
  "Hatchback",
  "Concept Car",
  "Van",
  "Military",
] as const

export const mediaTypes = [
  "Movie",
  "TV Series",
  "Animated Film",
  "Animated Series",
] as const

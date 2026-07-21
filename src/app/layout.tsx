import type { Metadata, Viewport } from "next"
import { Inter, Oswald } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BackToTop from "@/components/BackToTop"
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} – ${SITE_DESCRIPTION}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "movie cars", "iconic vehicles", "cinema cars", "TV series cars",
    "James Bond cars", "Fast and Furious cars", "Batman vehicles",
    "Knight Rider KITT", "Back to the Future DeLorean", "car database",
    "movie vehicle directory", "automotive cinema",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: SITE_NAME }],
  publisher: SITE_NAME,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          id="organization-schema"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              foundingDate: "2026",
              sameAs: [
                "https://github.com/proactive-ventures/cinecars-directory",
              ],
              knowsAbout: ["Movie cars", "Iconic vehicles", "Automotive cinema", "Vehicle specifications"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          id="website-schema"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              inLanguage: "en-US",
              isAccessibleForFree: true,
              about: {
                "@type": "Thing",
                name: "Movie and TV vehicles",
                description: "Directory of iconic cars from films and television",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/cars?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          id="speakable-schema"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: SITE_NAME,
              description: SITE_DESCRIPTION,
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["h1", "h2", ".speakable"],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-body antialiased">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}

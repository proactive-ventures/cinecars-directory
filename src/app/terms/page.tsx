import type { Metadata } from "next"
import { FileText } from "lucide-react"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME}. Please read these terms carefully before using the Site.`,
  openGraph: {
    title: `Terms of Service | ${SITE_NAME}`,
    description: `Terms of Service for ${SITE_NAME}.`,
    url: `${SITE_URL}/terms`,
  },
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
}

export default function TermsPage() {
  const lastUpdated = "January 1, 2026"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms of Service",
            url: `${SITE_URL}/terms`,
          }),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
            <FileText className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-muted">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using {SITE_NAME} (the &quot;Site&quot;), you agree to be bound by
            these Terms of Service. If you do not agree, please do not use the Site.
          </p>

          <h2>Description of Service</h2>
          <p>
            {SITE_NAME} is an informational directory that catalogs iconic cars from
            movies and TV series. The Site provides reference content, vehicle
            specifications, and cultural context for educational and entertainment
            purposes.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The content on the Site — including text, descriptions, specifications,
            and compilation of data — is the property of {SITE_NAME} unless otherwise
            noted.
          </p>
          <p>
            Vehicle names, model designations, and manufacturer trademarks are the
            property of their respective owners. Film and TV series titles, images,
            and related content are the property of their respective copyright holders.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works from,
            or publicly display any content from the Site without prior written
            permission, except for personal, non-commercial use.
          </p>

          <h2>User Conduct</h2>
          <p>By using the Site, you agree not to:</p>
          <ul>
            <li>Use the Site for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to the Site&apos;s systems</li>
            <li>Interfere with the proper functioning of the Site</li>
            <li>
              Submit false information or impersonate any person or entity
            </li>
            <li>Scrape, crawl, or extract data without authorization</li>
          </ul>

          <h2>Accuracy of Information</h2>
          <p>
            We strive for accuracy but make no guarantees. Vehicle specifications,
            production details, and film appearances are provided for informational
            purposes and may contain errors or omissions. We encourage users to
            verify critical information from official sources.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites. We are not responsible
            for the content, privacy practices, or terms of those sites.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            {SITE_NAME} is provided &quot;as is&quot; without warranties of any kind, either
            express or implied. In no event shall we be liable for any damages arising
            from your use of the Site.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be
            effective immediately upon posting. Your continued use of the Site
            after changes constitutes acceptance of the new terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the
            laws, without regard to conflict of law provisions.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these terms, contact us at:
          </p>
          <p>
            <a href="mailto:legal@cinecars.directory">
              legal@cinecars.directory
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

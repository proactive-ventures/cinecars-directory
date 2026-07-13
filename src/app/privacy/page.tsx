import type { Metadata } from "next"
import { Shield } from "lucide-react"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}. Learn how we collect, use, and protect your personal information.`,
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `Learn how we collect, use, and protect your information.`,
    url: `${SITE_URL}/privacy`,
  },
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
}

export default function PrivacyPage() {
  const lastUpdated = "January 1, 2026"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            description: `Privacy Policy for ${SITE_NAME}.`,
            url: `${SITE_URL}/privacy`,
            lastReviewed: lastUpdated,
          }),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            {SITE_NAME} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
            protecting your privacy. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website at{" "}
            <a href={SITE_URL}>{SITE_URL}</a>.
          </p>
          <p>
            By using the Site, you agree to the collection and use of information in
            accordance with this policy.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Data</h3>
          <p>
            We do not require you to create an account or provide personal information
            to browse the directory. The only personal data we may collect is what you
            voluntarily provide, such as when you contact us via email.
          </p>

          <h3>Usage Data</h3>
          <p>
            We may collect information automatically when you visit the Site,
            including:
          </p>
          <ul>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on each page</li>
            <li>Referring website addresses</li>
            <li>Device type and operating system</li>
            <li>IP address (anonymized where possible)</li>
          </ul>

          <h3>Cookies</h3>
          <p>
            We use minimal cookies essential for the functioning of the Site. We do
            not use tracking cookies for advertising purposes. Cookies may be used
            for:
          </p>
          <ul>
            <li>Remembering your filter preferences</li>
            <li>Basic analytics (anonymous page views)</li>
          </ul>
          <p>
            You can control cookie settings through your browser preferences.
            Disabling cookies may affect certain functionality of the Site.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information for:</p>
          <ul>
            <li>Providing and maintaining the Site</li>
            <li>Improving user experience</li>
            <li>Analyzing usage patterns to improve content</li>
            <li>Responding to your inquiries</li>
          </ul>

          <h2>Legal Basis for Processing (GDPR)</h2>
          <p>
            If you are from the European Economic Area (EEA), our legal basis for
            collecting and using your information depends on the data concerned and
            the context in which we collect it. We process your data:
          </p>
          <ul>
            <li>
              <strong>Legitimate interests:</strong> To improve and maintain the Site.
            </li>
            <li>
              <strong>Consent:</strong> When you voluntarily contact us.
            </li>
          </ul>

          <h2>Your Rights (GDPR &amp; CCPA)</h2>
          <p>Depending on your jurisdiction, you may have the following rights:</p>
          <ul>
            <li>
              <strong>Right to access:</strong> Request copies of your personal data.
            </li>
            <li>
              <strong>Right to rectification:</strong> Request correction of inaccurate data.
            </li>
            <li>
              <strong>Right to erasure:</strong> Request deletion of your personal data.
            </li>
            <li>
              <strong>Right to restrict processing:</strong> Object to our use of your data.
            </li>
            <li>
              <strong>Right to data portability:</strong> Request transfer of your data.
            </li>
            <li>
              <strong>Right to opt-out (CCPA):</strong> Do Not Sell My Personal Information.
              We do not sell personal data.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at the email address below.
            We will respond within 30 days.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain usage data for analytics purposes for a period of 26 months. If
            you contact us, we retain our correspondence for as long as necessary to
            address your inquiry.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We do not use third-party advertising networks. We may use basic analytics
            services that collect anonymized data. These services are contractually
            prohibited from using your data for any purpose other than providing
            analytics to us.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect
            your information. However, no method of transmission over the Internet is
            100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            The Site is not intended for children under 13. We do not knowingly collect
            personal information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of
            changes by posting the new policy on this page with an updated date.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your
            rights, please contact us at:
          </p>
          <p>
            <a href="mailto:privacy@cinecars.directory">
              privacy@cinecars.directory
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

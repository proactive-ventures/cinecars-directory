import type { Metadata } from "next"
import { AlertTriangle } from "lucide-react"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer, DMCA notice, fair use policy, and trademark information for ${SITE_NAME}.`,
  openGraph: {
    title: `Disclaimer | ${SITE_NAME}`,
    description: `Disclaimer and legal notices for ${SITE_NAME}.`,
    url: `${SITE_URL}/disclaimer`,
  },
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
}

export default function DisclaimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Disclaimer",
            url: `${SITE_URL}/disclaimer`,
          }),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary/10">
            <AlertTriangle className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Disclaimer
          </h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2>General Information</h2>
          <p>
            The information provided on {SITE_NAME} is for general informational and
            entertainment purposes only. While we strive to keep the information
            accurate and up-to-date, we make no representations or warranties of any
            kind, express or implied, about the completeness, accuracy, reliability,
            suitability, or availability of the information contained on the Site.
          </p>

          <h2>DMCA Notice</h2>
          <p>
            {SITE_NAME} respects the intellectual property rights of others. If you
            believe that any material on the Site infringes your copyright, please
            notify us with the following information:
          </p>
          <ul>
            <li>A description of the copyrighted work claimed to have been infringed</li>
            <li>The URL or location of the infringing material on our Site</li>
            <li>Your contact information (email, phone, address)</li>
            <li>
              A statement that you have a good faith belief that the use is not
              authorized by the copyright owner
            </li>
            <li>
              A statement, under penalty of perjury, that the information in your
              notice is accurate and that you are the copyright owner or authorized
              to act on their behalf
            </li>
            <li>Your physical or electronic signature</li>
          </ul>
          <p>
            Send DMCA notices to:
            <br />
            <a href="mailto:dmca@cinecars.directory">dmca@cinecars.directory</a>
          </p>

          <h2>Fair Use Notice</h2>
          <p>
            This Site may contain copyrighted material the use of which has not been
            specifically authorized by the copyright owner. We are making such
            material available for criticism, comment, news reporting, scholarship,
            and research. We believe this constitutes a &quot;fair use&quot; of any such
            copyrighted material as provided for in section 107 of the US Copyright
            Law.
          </p>
          <p>
            If you wish to use copyrighted material from this Site for purposes of
            your own that go beyond fair use, you must obtain permission from the
            copyright owner.
          </p>

          <h2>Trademark Notice</h2>
          <p>
            All vehicle manufacturer names, model names, and related logos are
            trademarks or registered trademarks of their respective owners. All film
            and television titles, character names, and related imagery are
            trademarks or registered trademarks of their respective production
            companies, studios, or distributors.
          </p>
          <p>
            {SITE_NAME} is not affiliated with, endorsed by, or sponsored by any
            automobile manufacturer, film studio, or television network. Reference
            to any specific vehicle, film, or TV series does not imply endorsement
            or affiliation.
          </p>

          <h2>Affiliate Disclosure</h2>
          <p>
            {SITE_NAME} may include affiliate links to third-party websites. If you
            click on an affiliate link and make a purchase, we may receive a small
            commission at no additional cost to you. We only recommend products or
            services that we genuinely believe add value to our users.
          </p>
          <p>
            We are a participant in the Amazon Services LLC Associates Program, an
            affiliate advertising program designed to provide a means for sites to
            earn advertising fees by advertising and linking to Amazon.com and
            affiliated sites.
          </p>

          <h2>External Links</h2>
          <p>
            The Site may contain links to external websites that are not provided or
            maintained by us. We do not guarantee the accuracy, relevance, timeliness,
            or completeness of any information on these external websites.
          </p>

          <h2>Accuracy of Content</h2>
          <p>
            Vehicle specifications, production details, and film appearances are
            gathered from multiple sources and may contain errors. We encourage users
            to verify critical information from official manufacturer or studio
            sources.
          </p>

          <h2>No Professional Advice</h2>
          <p>
            The content on {SITE_NAME} is not intended to be a substitute for
            professional automotive advice, legal advice, or any other professional
            service. Always seek the advice of qualified professionals with any
            questions you may have.
          </p>

          <h2>Changes to This Disclaimer</h2>
          <p>
            We reserve the right to update, amend, or change this disclaimer at any
            time without prior notice. Your continued use of the Site after any
            changes constitutes acceptance of the updated disclaimer.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about this disclaimer, contact us at:
            <br />
            <a href="mailto:legal@cinecars.directory">legal@cinecars.directory</a>
          </p>
        </div>
      </div>
    </>
  )
}

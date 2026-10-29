import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { T } from "../components/T";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of use for Theophilus Atlas: an independent showcase of one hundred separate projects, with no warranty, no official status and clear content licensing.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHead
        eyebrow={<T k="legal.termsTitle" />}
        title="Terms of use"
        intro={<T k="legal.termsIntro" />}
        homeLabel={<T k="nav.home" />}
        image="/images/city-lagos.jpg"
        imageAlt="Mid rise office buildings in central Lagos with traffic on the road below"
        crumbs={[{ href: "/terms", label: "Terms" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <p className="ta-help" style={{ marginBottom: 18 }}>
                <T k="legal.updated" />
              </p>

              <div className="ta-prose">
                <h3>Independence</h3>
                <p>
                  Theophilus Atlas is a personal showcase of a one hundred site build challenge. It is not operated
                  by, endorsed by or affiliated with any government, county, church, school, company or academic body
                  mentioned in the directory. Names appear because the builds were made for, or modelled on, those
                  kinds of organisations.
                </p>

                <h3>No official evaluation</h3>
                <p>
                  Nothing here is an audit, accreditation, ranking or official evaluation. Headline numbers count
                  builds, clusters, delivery days and recorded deployments. They do not measure visitors, revenue,
                  enrolment, giving or programme outcomes.
                </p>

                <h3>The original sites remain separate</h3>
                <p>
                  Every build links to its own repository and, where recorded, its own deployment. Those sites have
                  their own terms, privacy notes and owners. Availability changes. A link here is not a warranty that
                  a deployment is live, current or supported.
                </p>

                <h3>Content licence</h3>
                <ul>
                  <li>
                    The playbook, cluster notes and editorial text on this site may be reused with attribution to
                    Theophilus Atlas.
                  </li>
                  <li>
                    Template design, layout, colour tokens, typography and animation classes belong to the original
                    Atlas template authors and are used under the terms that accompanied the upload.
                  </li>
                  <li>
                    Raleway and Oswald are served by Google Fonts under the SIL Open Font Licence. Font Awesome icons
                    are used under their own licence.
                  </li>
                  <li>
                    Photographs are Pexels images used under the Pexels licence. They are credited on the{" "}
                    <Link href="/credits">credits page</Link>. Reuse of a photograph requires checking the current
                    Pexels terms for that file.
                  </li>
                </ul>

                <h3>Acceptable use</h3>
                <ul>
                  <li>Do not present this atlas as an official government, church, school or academic publication.</li>
                  <li>Do not send automated traffic, scrape at volume or attempt to bypass rate limits.</li>
                  <li>Do not submit unlawful, abusive or misleading content through the contact form.</li>
                </ul>

                <h3>No warranty</h3>
                <p>
                  The site is provided as it is. While care was taken over every entry, descriptions, dates and links
                  may contain errors, and deployments change without notice. Use the playbook at your own discretion
                  and check the details that matter to you against the organisation itself.
                </p>

                <h3>Limitation</h3>
                <p>
                  To the extent permitted by law, the maintainer of this site is not liable for decisions taken on the
                  basis of its content, or for the conduct, availability or content of any linked site.
                </p>

                <h3>Changes</h3>
                <p>
                  These terms may be updated as the atlas grows. The date at the top of the page shows the last
                  revision. Continued reading after a change means you accept the revised terms.
                </p>

                <h3>Contact</h3>
                <p>
                  Write to <a href={`mailto:${site.email}`}>{site.email}</a> or the WhatsApp line,{" "}
                  {site.whatsappDisplay}. The privacy note is at <Link href="/privacy">/privacy</Link>.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ta-disclosure">
                <strong>Short version.</strong> An independent showcase, not an official rating. Reuse the playbook
                with credit. Check the photographs and each original site against their own terms.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

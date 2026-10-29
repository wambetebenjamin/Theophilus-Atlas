import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { T } from "../components/T";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Theophilus Atlas handles cookies, saved sites, notes, contact messages and third party services. No advertising, no cross site profiles.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHead
        eyebrow={<T k="nav.privacy" />}
        title="Privacy, in plain language"
        intro={<T k="legal.privacyIntro" />}
        homeLabel={<T k="nav.home" />}
        image="/images/city-kampala.jpg"
        imageAlt="A hillside view across Kampala with roads and rooftops in warm evening light"
        crumbs={[{ href: "/privacy", label: "Privacy" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <p className="ta-help" style={{ marginBottom: 18 }}>
                <T k="legal.updated" />
              </p>

              <div className="ta-prose">
                <h3>What is stored</h3>
                <ul>
                  <li>
                    <b>{site.cookieName}</b>: a single cookie that records whether you allowed anonymous measurement.
                    It holds a yes or no and a timestamp, nothing else. It lasts 180 days.
                  </li>
                  <li>
                    <b>{site.localeCookie}</b>: your language choice, English, Kiswahili or French. It lasts one year
                    and is also mirrored in local storage so the switcher opens on the right language.
                  </li>
                  <li>
                    <b>Saved sites and notes</b>: kept in your browser only, under {site.savedKey} and {site.notesKey}.
                    They never reach a server and disappear when you clear site data.
                  </li>
                  <li>
                    <b>Optional sign in</b>: if you sign in, your email address is held in a signed session cookie for
                    30 days. It is used only to label your shelf. There is no profile page and no password database.
                  </li>
                </ul>

                <h3>What is not done</h3>
                <ul>
                  <li>No advertising cookies, pixels or retargeting.</li>
                  <li>No cross site profiles, fingerprinting or session recording.</li>
                  <li>No sale or sharing of personal data with data brokers.</li>
                  <li>No private analytics dashboards. The charts on this site count builds, not people.</li>
                </ul>

                <h3>Contact messages</h3>
                <p>
                  If you send a message through the contact form, the name, email, organisation and message are used
                  to reply. Messages may be forwarded to a WhatsApp thread so the reply reaches you faster. They are
                  kept only as long as needed to answer and are never added to a marketing list. The form includes a
                  honeypot field and rate limiting to reduce spam.
                </p>

                <h3>Third party services</h3>
                <ul>
                  <li>
                    <b>Vercel</b> hosts the site and processes standard request logs such as IP address and user agent
                    for delivery and security.
                  </li>
                  <li>
                    <b>Google Fonts</b> serves Raleway and Oswald. The request reveals your IP address to Google.
                  </li>
                  <li>
                    <b>Google reCAPTCHA</b> runs on the contact form when a site key is configured. Without a key, a
                    simple human confirmation checkbox is used instead.
                  </li>
                  <li>
                    <b>Pexels</b> hosts the photographs. Images are served from this site, so reading a page does not
                    contact Pexels. The Pexels remote pattern is configured for future editorial use.
                  </li>
                  <li>
                    <b>WhatsApp</b> opens only when you choose a WhatsApp link. The conversation is then governed by
                    WhatsApp, not by this site.
                  </li>
                </ul>

                <h3>Your choices</h3>
                <p>
                  You can refuse measurement when the cookie note appears, change language at any time, and clear
                  saved sites by removing them or clearing site data in your browser. If you have signed in, signing
                  out ends the session.
                </p>

                <h3>Children</h3>
                <p>
                  The site is a professional showcase and is not directed at children. It does not knowingly collect
                  data from anyone under 16.
                </p>

                <h3>Contact</h3>
                <p>
                  Questions about this note can go to <a href={`mailto:${site.email}`}>{site.email}</a> or the
                  WhatsApp line, {site.whatsappDisplay}. See also the <Link href="/terms">terms of use</Link>.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ta-disclosure">
                <strong>Short version.</strong> Two cookies, both small and both explained above. Saves stay in your
                browser. No advertising, no tracking dashboards, no private analytics.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

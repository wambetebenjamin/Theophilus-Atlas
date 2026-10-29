import type { Metadata } from "next";
import { PageHead } from "../components/PageHead";
import { ContactForm } from "../components/ContactForm";
import { T } from "../components/T";
import { site, whatsappLink } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Theophilus Atlas about a build, a workshop or reusing the playbook. WhatsApp, email and a short form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow={<T k="contact.eyebrow" />}
        title={<T k="contact.title" />}
        intro={<T k="contact.intro" />}
        homeLabel={<T k="nav.home" />}
        image="/images/meeting.jpg"
        imageAlt="Four colleagues in bright clothing planning together around a laptop"
        crumbs={[{ href: "/contact", label: "Contact" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="ta-title">
                <span className="ta-eyebrow">Form</span>
                <h2>
                  <T k="contact.formTitle" />
                </h2>
                <p>
                  <T k="contact.formText" />
                </p>
              </div>
              <ContactForm />
            </div>

            <div className="col-md-5">
              <div className="ta-card" style={{ marginBottom: 20 }}>
                <span className="ta-kicker">
                  <T k="contact.directTitle" />
                </span>
                <h3>
                  <T k="contact.whatsappTitle" />
                </h3>
                <p>
                  The fastest route. Messages are read on a phone and answered in the same thread.
                </p>
                <a
                  className="ta-btn"
                  href={whatsappLink("Hello Theophilus Atlas, I would like to talk about a site.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.whatsappDisplay}
                </a>
              </div>

              <div className="ta-card" style={{ marginBottom: 20 }}>
                <h3>
                  <T k="contact.emailTitle" />
                </h3>
                <p>
                  For documents, briefs and anything longer than a message.
                </p>
                <a className="ta-link-arrow" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>

              <div className="ta-card">
                <h3>
                  <T k="contact.hoursTitle" />
                </h3>
                <p>
                  <T k="contact.hoursText" />
                </p>
                <p className="ta-help" style={{ marginTop: 6 }}>
                  Nairobi, Kenya. East Africa Time, UTC+3.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

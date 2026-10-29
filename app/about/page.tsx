import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { Reveal } from "../components/Reveal";
import { Disclaimer } from "../components/Disclaimer";
import { T } from "../components/T";
import { site, whatsappLink } from "../lib/site";
import { buildDays, liveSites, totalSites } from "../lib/atlas";

export const metadata: Metadata = {
  title: "About",
  description:
    "The origin, method and credits of Theophilus Atlas, the closing site of a one hundred product website challenge built for African organisations in October 2026.",
  alternates: { canonical: "/about" },
};

const timeline = [
  {
    date: "1 October 2026",
    title: "The first build",
    text: "Grace Cathedral Church in Nairobi: service times, sermons, ministries and a giving path. One template, one evening, one deployment.",
  },
  {
    date: "5 to 8 October",
    title: "The field widens",
    text: "A job board, a ticketing platform, a podcast network, a radio station and the first voice activated interface in the set.",
  },
  {
    date: "11 to 22 October",
    title: "Health, money and home",
    text: "Clinics, maternal care, chamas, insurance, construction, property, laundry and the first full county service directory.",
  },
  {
    date: "27 to 29 October",
    title: "The closing run",
    text: "The final fourteen builds, including three directories, four health and media pages, and this atlas at number one hundred.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow={<T k="about.eyebrow" />}
        title={<T k="about.title" />}
        intro={<T k="about.intro" />}
        homeLabel={<T k="nav.home" />}
        image="/images/work.jpg"
        imageAlt="A developer working at a desk with two monitors in a Nairobi office"
        crumbs={[{ href: "/about", label: "About" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <Reveal effect="slide-bottom">
                <div className="ta-title">
                  <span className="ta-eyebrow">Origin</span>
                  <h2>
                    <T k="about.title" />
                  </h2>
                </div>
                <p className="ta-lead">
                  <T k="about.intro" />
                </p>
                <p className="ta-lead">
                  <T k="about.originText" />
                </p>
                <p className="ta-lead">
                  The set is deliberately uneven. A five page restaurant menu sits next to a booking platform, a
                  directory and a school dashboard. What they share is not a sector but a method: take the uploaded
                  design, keep it, and spend the effort on the words and photographs a reader actually needs.
                </p>
              </Reveal>
            </div>
            <div className="col-md-5">
              <Reveal effect="slide-left" delay={0.12}>
                <div className="ta-quote">
                  <p>
                    {totalSites} sites. {buildDays} delivery days. {liveSites} public deployments. One method.
                  </p>
                  <cite>The challenge, October 2026</cite>
                </div>
                <figure style={{ margin: "24px 0 0" }}>
                  <Image
                    src="/images/builders.jpg"
                    alt="Construction workers on bamboo scaffolding raising a concrete frame"
                    width={1000}
                    height={667}
                    sizes="(max-width: 991px) 100vw, 38vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <figcaption className="ta-help" style={{ marginTop: 8 }}>
                    Builders at work. Photograph published on Pexels, credited on the credits page.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="ta-section ta-section--paper">
        <div className="container">
          <Reveal effect="slide-bottom">
            <div className="ta-title ta-title--center">
              <span className="ta-eyebrow">Method</span>
              <h2>
                <T k="about.methodTitle" />
              </h2>
              <hr />
            </div>
          </Reveal>
          <div className="ta-grid ta-grid--3">
            {(
              [
                { n: "01", t: "about.method1Title", d: "about.method1Text", icon: "fa-copy" },
                { n: "02", t: "about.method2Title", d: "about.method2Text", icon: "fa-pencil" },
                { n: "03", t: "about.method3Title", d: "about.method3Text", icon: "fa-rocket" },
              ] as const
            ).map((item, index) => (
              <Reveal key={item.n} effect="slide-bottom" delay={index * 0.08}>
                <article className="ta-card">
                  <i className={`fa ${item.icon} ta-icon`} aria-hidden="true" />
                  <span className="ta-kicker">{item.n}</span>
                  <h3>
                    <T k={item.t} />
                  </h3>
                  <p>
                    <T k={item.d} />
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Reveal effect="slide-right">
                <div className="ta-title">
                  <span className="ta-eyebrow">The month</span>
                  <h2>Four movements</h2>
                </div>
                <ul className="ta-timeline">
                  {timeline.map((item) => (
                    <li key={item.date}>
                      <b>{item.date}</b>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="col-md-6">
              <Reveal effect="slide-left" delay={0.1}>
                <div className="ta-title">
                  <span className="ta-eyebrow">Credits</span>
                  <h2>
                    <T k="about.creditsTitle" />
                  </h2>
                </div>
                <div className="ta-prose">
                  <p>
                    Template design, layout, colour tokens, typography and animation classes come from the uploaded
                    Atlas template. The fonts are Raleway and Oswald, and the icon set is Font Awesome, both as the
                    template ships them.
                  </p>
                  <p>
                    Every photograph is a real, unwatermarked Pexels photograph. Each file is listed with its subject,
                    photographer and source page on the credits page. No generated image is used anywhere in the set.
                  </p>
                  <p>
                    Build notes, cluster groupings and the playbook are written from the repositories of the hundred
                    builds. Nothing is copied from a client brief, because no client engaged the challenge.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                  <Link className="ta-btn" href="/credits">
                    Full credits
                  </Link>
                  <Link className="ta-btn" href="/terms">
                    Terms
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <Disclaimer />
          </div>
        </div>
      </section>

      <section className="ta-section ta-section--tight ta-section--paper">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="ta-title" style={{ marginBottom: 10 }}>
                <span className="ta-eyebrow">Contact</span>
                <h2>
                  <T k="about.contactTitle" />
                </h2>
                <p>
                  <T k="about.contactText" />
                </p>
              </div>
            </div>
            <div className="col-md-4" style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <a
                className="ta-btn ta-btn--solid"
                href={whatsappLink("Hello Theophilus Atlas, I read the about page and would like to talk.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.whatsappDisplay}
              </a>
              <Link className="ta-btn" href="/contact">
                <T k="nav.contact" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

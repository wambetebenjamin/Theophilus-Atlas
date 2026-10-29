import Image from "next/image";
import Link from "next/link";
import { T } from "./components/T";
import { Reveal } from "./components/Reveal";
import { Disclaimer } from "./components/Disclaimer";
import { buildDays, clusterCounts, liveSites, totalSites } from "./lib/atlas";
import { sites } from "../data/sites";
import { site, whatsappLink } from "./lib/site";

const headline = [
  { value: String(totalSites), labelKey: "home.statSites" as const },
  { value: String(clusterCounts.length), labelKey: "home.statClusters" as const },
  { value: String(liveSites), labelKey: "home.statLive" as const },
  { value: String(buildDays), labelKey: "home.statDays" as const },
];

const featured = [
  {
    n: 33,
    name: "Raphael Voice",
    icon: "fa-microphone",
    line: "The first voice activated interface in the set. Visitors move through the site by speech, and the written page stays complete underneath.",
    href: "/stories#raphael-voice",
  },
  {
    n: 44,
    name: "Raphael Community Health",
    icon: "fa-wifi",
    line: "Offline first health records for community health workers, written to the device and synced when a signal returns.",
    href: "/stories#raphael-community-health",
  },
  {
    n: 92,
    name: "Hiram Forges",
    icon: "fa-wrench",
    line: "A repair directory for blacksmiths, welders and metal fabricators, filterable by region and specialty.",
    href: "/stories#hiram-forges",
  },
  {
    n: 93,
    name: "Apollos Studios",
    icon: "fa-music",
    line: "A rehearsal and recording room directory across six African cities, with saved rooms and a booking path.",
    href: "/directory?q=Apollos",
  },
  {
    n: 78,
    name: "Deborah Aid",
    icon: "fa-balance-scale",
    line: "Free legal aid across all 47 Kenyan counties, with clinics, paralegals and know your rights resources.",
    href: "/directory?q=Deborah",
  },
  {
    n: 46,
    name: "Shiloh Transit",
    icon: "fa-bus",
    line: "Intercity bus and matatu booking with a live seat map, M-Pesa payment and an instant e-ticket.",
    href: "/directory?q=Shiloh",
  },
];

const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Nigeria", "Ghana", "Senegal", "South Africa", "Benin"];

export default function HomePage() {
  return (
    <>
      <section className="ta-hero">
        <div className="ta-hero-media" aria-hidden="true">
          <Image
            src="/images/hero-01.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
        </div>
        <div className="homeoverlay" aria-hidden="true" />
        <div className="container ta-hero-inner">
          <span className="ta-eyebrow">
            <T k="home.eyebrow" />
          </span>
          <h1 className="sliderbigtitle">
            <T k="home.titleTop" />{" "}
            <br />
            <T k="home.titleBottom" />
          </h1>
          <hr />
          <p className="slidersmalltitle">{site.oneLiner}</p>
          <div className="ta-hero-meta">
            <span>1 to 29 October 2026</span>
            <span>Nairobi, Kenya</span>
            <span>Independent showcase</span>
          </div>
          <div className="ta-hero-actions">
            <Link className="ta-btn ta-btn--gold" href="/directory">
              <T k="home.ctaDirectory" />
            </Link>
            <Link className="ta-btn ta-btn--light" href="/playbook">
              <T k="home.ctaPlaybook" />
            </Link>
          </div>
        </div>
        <div className="ta-hero-scroll">
          <a href="#completion" aria-label="Scroll to the completion statement">
            <i className="fa fa-angle-down" aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="ta-promo">
        <div className="brand-promotion">
          <div className="container">
            <div className="row">
              {[
                {
                  icon: "fa-flag-checkered",
                  title: "100 of 100",
                  text: "Every build delivered, numbered and published with its own repository.",
                },
                {
                  icon: "fa-globe",
                  title: `${clusterCounts.length} clusters`,
                  text: "From literacy and health to trade, mobility and civic service.",
                },
                {
                  icon: "fa-language",
                  title: "3 languages",
                  text: "English, Kiswahili and French on every build, with a visible switcher.",
                },
              ].map((item) => (
                <div className="col-sm-4" key={item.title}>
                  <div className="brand-content">
                    <i className={`fa ${item.icon}`} aria-hidden="true" />
                    <div className="ta-promo-body">
                      <h2>{item.title}</h2>
                      <p>{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section id="completion" className="ta-section ta-section--white">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <Reveal effect="slide-bottom">
                <div className="ta-title">
                  <span className="ta-eyebrow">The finale</span>
                  <h2>
                    <T k="home.completionTitle" />
                  </h2>
                </div>
                <p className="ta-lead">
                  <T k="home.intro" />
                </p>
                <p className="ta-lead">
                  <T k="home.completionText" />
                </p>
                <div className="ta-hero-actions" style={{ justifyContent: "flex-start", marginTop: 22 }}>
                  <Link className="ta-btn" href="/about">
                    Origin and method
                  </Link>
                  <Link className="ta-btn" href="/credits">
                    Image credits
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="col-md-5">
              <Reveal effect="slide-left" delay={0.15}>
                <figure style={{ margin: 0 }}>
                  <Image
                    src="/images/gathering.jpg"
                    alt="Colleagues in a bright meeting room working together around open laptops"
                    width={1000}
                    height={667}
                    sizes="(max-width: 991px) 100vw, 40vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <figcaption className="ta-help" style={{ marginTop: 10 }}>
                    The shape of the work: laptops open, one page at a time, a review at the end of the day.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="ta-stat-band" aria-label="Headline numbers">
        <div className="container">
          <div className="ta-stats">
            {headline.map((item) => (
              <div className="ta-stat" key={item.labelKey}>
                <b>{item.value}</b>
                <span>
                  <T k={item.labelKey} />
                </span>
              </div>
            ))}
          </div>
          <p className="ta-stat-note">
            <T k="home.statsNote" />
          </p>
        </div>
      </section>

      <section className="ta-section ta-section--paper">
        <div className="container">
          <Reveal effect="slide-bottom">
            <div className="ta-title ta-title--center">
              <h2>
                <T k="home.featuredTitle" />
              </h2>
              <p>
                <T k="home.featuredIntro" />
              </p>
              <hr />
            </div>
          </Reveal>
          <div className="ta-grid ta-grid--3">
            {featured.map((item, index) => (
              <Reveal key={item.name} effect="slide-bottom" delay={index * 0.06}>
                <article className="ta-card">
                  <i className={`fa ${item.icon} ta-icon`} aria-hidden="true" />
                  <span className="ta-kicker">Site {String(item.n).padStart(3, "0")}</span>
                  <h3>{item.name}</h3>
                  <p>{item.line}</p>
                  <Link className="ta-link-arrow" href={item.href}>
                    Read the build
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ta-section ta-section--white">
        <div className="container">
          <Reveal effect="slide-bottom">
            <div className="ta-title">
              <span className="ta-eyebrow">Start here</span>
              <h2>
                <T k="home.exploreTitle" />
              </h2>
            </div>
          </Reveal>
          <div className="ta-grid ta-grid--3">
            {(
              [
                { n: "01", t: "home.explore1Title", d: "home.explore1Text", href: "/directory" },
                { n: "02", t: "home.explore2Title", d: "home.explore2Text", href: "/atlas" },
                { n: "03", t: "home.explore3Title", d: "home.explore3Text", href: "/playbook" },
              ] as const
            ).map((item, index) => (
              <Reveal key={item.n} effect="slide-bottom" delay={index * 0.08}>
                <article className="ta-card">
                  <span className="ta-site-n">{item.n}</span>
                  <h3 style={{ marginTop: 14 }}>
                    <T k={item.t} />
                  </h3>
                  <p>
                    <T k={item.d} />
                  </p>
                  <Link className="ta-link-arrow" href={item.href}>
                    Open
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ta-section ta-section--tight ta-section--paper">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <Reveal effect="slide-right">
                <figure style={{ margin: 0 }}>
                  <Image
                    src="/images/skyline.jpg"
                    alt="Skyline view of the Nairobi cityscape on a clear day"
                    width={1000}
                    height={667}
                    sizes="(max-width: 991px) 100vw, 40vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <figcaption className="ta-help" style={{ marginTop: 10 }}>
                    Nairobi, where the month started and where every build was finished.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
            <div className="col-md-7">
              <Reveal effect="slide-left" delay={0.1}>
                <div className="ta-title" style={{ marginBottom: 14 }}>
                  <span className="ta-eyebrow">Multiple countries</span>
                  <h2>One set, many neighbours</h2>
                </div>
                <p className="ta-lead">
                  The hundred begin in Nairobi and reach outward. Some build for a single street. Others name six
                  cities across five countries in a single page. The atlas counts the countries each build names,
                  and says plainly that a mention is not a market claim.
                </p>
                <ul className="ta-chips" style={{ marginTop: 18 }}>
                  {countries.map((country) => (
                    <li key={country}>{country}</li>
                  ))}
                </ul>
                <p className="ta-help" style={{ marginTop: 16 }}>
                  {sites.filter((item) => (item.reach?.length ?? 0) > 1).length} builds name more than one country.
                  Kenya is the home base for the whole set.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="ta-band-photo" aria-labelledby="completion-band">
        <div className="ta-band-photo-media" aria-hidden="true">
          <Image
            src="/images/celebration.jpg"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
        </div>
        <div className="homeoverlay" aria-hidden="true" />
        <div className="container ta-band-photo-inner">
          <div className="row">
            <div className="col-md-8">
              <span className="ta-eyebrow ta-eyebrow--onDark">Completion</span>
              <h2 id="completion-band">
                The hundredth is a page about the other ninety nine
              </h2>
              <p style={{ maxWidth: 620 }}>
                The set ends where it began, with a small team and an ordinary working day. What remains is the
                record: a directory anyone can search, an atlas that counts only what it can see, and a playbook
                written for the next person who starts from nothing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ta-section ta-section--white">
        <div className="container">
          <Reveal effect="slide-bottom">
            <div className="ta-title ta-title--center">
              <h2>
                <T k="home.ctaTitle" />
              </h2>
              <p>
                <T k="home.ctaText" />
              </p>
              <hr />
            </div>
          </Reveal>
          <div className="ta-hero-actions">
            <a
              className="ta-btn ta-btn--solid"
              href={whatsappLink("Hello Theophilus Atlas, I would like to build a site for my organisation.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <T k="home.ctaButton" />
            </a>
            <Link className="ta-btn" href="/contact">
              <T k="nav.contact" />
            </Link>
          </div>
          <div style={{ marginTop: 44 }}>
            <Disclaimer compact />
          </div>
        </div>
      </section>
    </>
  );
}

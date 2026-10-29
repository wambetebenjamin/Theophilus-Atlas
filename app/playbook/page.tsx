import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { Reveal } from "../components/Reveal";
import { T } from "../components/T";
import { checklist, lessons, recognition } from "../../data/playbook";
import { site, whatsappLink } from "../lib/site";

export const metadata: Metadata = {
  title: "Playbook",
  description:
    "Nine open lessons from one hundred builds: template discipline, first screens, one action per page, frugal design, translation, real photography, honest limits, deployment and recognition pathways.",
  alternates: { canonical: "/playbook" },
};

export default function PlaybookPage() {
  return (
    <>
      <PageHead
        eyebrow={<T k="playbook.eyebrow" />}
        title={<T k="playbook.title" />}
        intro={<T k="playbook.intro" />}
        homeLabel={<T k="nav.home" />}
        image="/images/classroom.jpg"
        imageAlt="A teacher standing at a whiteboard explaining a lesson to a classroom"
        crumbs={[{ href: "/playbook", label: "Playbook" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="row" style={{ marginBottom: 30 }}>
            <div className="col-md-8">
              <div className="ta-title" style={{ marginBottom: 0 }}>
                <span className="ta-eyebrow">Open, not gated</span>
                <h2>
                  <T k="playbook.title" />
                </h2>
                <p>
                  <T k="playbook.intro" />
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="ta-disclosure">
                <strong>Licence.</strong> These lessons are free to reuse with attribution to Theophilus Atlas. The
                template design, fonts and icon set belong to their original authors. Photographs remain under the
                Pexels licence.
              </div>
            </div>
          </div>

          <div className="ta-grid ta-grid--3">
            {lessons.map((lesson, index) => (
              <Reveal key={lesson.n} effect="slide-bottom" delay={(index % 3) * 0.07}>
                <article className="ta-lesson">
                  <span className="ta-lesson-n">{lesson.n}</span>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.summary}</p>
                  <details>
                    <summary>
                      <T k="playbook.download" />
                    </summary>
                    {lesson.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)} style={{ fontSize: 12, marginTop: 10 }}>
                        {paragraph}
                      </p>
                    ))}
                    <ul>
                      {lesson.checks.map((check) => (
                        <li key={check}>{check}</li>
                      ))}
                    </ul>
                  </details>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ta-section ta-section--paper">
        <div className="container">
          <Reveal effect="slide-bottom">
            <div className="ta-title ta-title--center">
              <span className="ta-eyebrow">For institutions</span>
              <h2>
                <T k="playbook.recognitionTitle" />
              </h2>
              <p>
                <T k="playbook.recognitionIntro" />
              </p>
              <hr />
            </div>
          </Reveal>

          <div className="ta-grid ta-grid--2">
            {recognition.map((item, index) => (
              <Reveal key={item.who} effect="slide-bottom" delay={(index % 2) * 0.08}>
                <article className="ta-card">
                  <span className="ta-kicker">Pathway {String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.who}</h3>
                  <p>
                    <b style={{ color: "#3C3B3B" }}>What they need.</b> {item.needs}
                  </p>
                  <p>
                    <b style={{ color: "#3C3B3B" }}>Honest route.</b> {item.route}
                  </p>
                  <p className="ta-honest" style={{ borderTop: "1px dashed #ececec", paddingTop: 10 }}>
                    <b style={{ color: "#3C3B3B" }}>Care.</b> {item.caution}
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
            <div className="col-md-5">
              <Reveal effect="slide-right">
                <div className="ta-title">
                  <span className="ta-eyebrow">Before you ship</span>
                  <h2>
                    <T k="playbook.checklistTitle" />
                  </h2>
                  <p>
                    <T k="playbook.checklistText" />
                  </p>
                </div>
                <a
                  className="ta-btn ta-btn--solid"
                  href={whatsappLink("Hello Theophilus Atlas, I am using the playbook and have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <T k="common.whatsapp" />
                </a>
                <p className="ta-help" style={{ marginTop: 14 }}>
                  {site.whatsappDisplay}, Monday to Saturday.
                </p>
              </Reveal>
            </div>
            <div className="col-md-7">
              <Reveal effect="slide-left" delay={0.1}>
                <ul className="ta-checklist">
                  {checklist.map((item) => (
                    <li key={item}>
                      <i className="fa fa-check-square-o" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <div className="ta-quote" style={{ marginTop: 40 }}>
            <p>The playbook is only useful if it is used. Send a link to the person who needs it.</p>
            <cite>
              <Link className="ta-link-arrow" href="/directory">
                See the builds behind it
              </Link>
            </cite>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { Reveal } from "../components/Reveal";
import { T } from "../components/T";
import { stories } from "../../data/stories";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Selected impact and build stories from the 100 website challenge, each naming what the build controlled and what stayed outside it.",
  alternates: { canonical: "/stories" },
};

export default function StoriesPage() {
  return (
    <>
      <PageHead
        eyebrow={<T k="stories.eyebrow" />}
        title={<T k="stories.title" />}
        intro={<T k="stories.intro" />}
        homeLabel={<T k="nav.home" />}
        image="/images/gathering.jpg"
        imageAlt="Colleagues in a bright meeting room working together around open laptops"
        crumbs={[{ href: "/stories", label: "Stories" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="ta-disclosure" style={{ marginBottom: 34 }}>
            <strong>A note on these stories.</strong> <T k="stories.disclaimer" />
          </div>

          <div className="ta-grid ta-grid--2">
            {stories.map((story, index) => (
              <Reveal key={story.slug} effect="slide-bottom" delay={(index % 2) * 0.08}>
                <article className="ta-story" id={story.slug}>
                  <div className="ta-story-media">
                    <Image
                      src={story.image}
                      alt={story.imageAlt}
                      width={1000}
                      height={625}
                      sizes="(max-width: 767px) 100vw, 46vw"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="ta-story-body">
                    <span className="ta-kicker">
                      Site {String(story.siteNumber).padStart(3, "0")} / {story.site} / {story.builtOn}
                    </span>
                    <h3>{story.title}</h3>
                    <p style={{ color: "#3C3B3B" }}>{story.lede}</p>
                    {story.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                    <blockquote className="ta-story-quote" style={{ margin: 0 }}>
                      {story.quote}
                      <span style={{ display: "block", marginTop: 8, fontSize: 11, fontStyle: "normal", letterSpacing: 1.4, textTransform: "uppercase", color: "#999" }}>
                        {story.quoteBy}
                      </span>
                    </blockquote>
                    <p className="ta-honest">{story.honest}</p>
                    <Link className="ta-link-arrow" href={`/stories/${story.slug}`}>
                      Read the full story
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="ta-quote" style={{ marginTop: 40 }}>
            <p>Every story here ends with a link to its repository, not a testimonial.</p>
            <cite>
              <Link className="ta-link-arrow" href="/directory">
                Open the directory
              </Link>
            </cite>
          </div>
        </div>
      </section>
    </>
  );
}

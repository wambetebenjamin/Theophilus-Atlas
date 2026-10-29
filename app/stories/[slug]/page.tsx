import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "../../components/PageHead";
import { Disclaimer } from "../../components/Disclaimer";
import { stories } from "../../../data/stories";
import { sites } from "../../../data/sites";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  if (!story) return { title: "Story" };
  return {
    title: story.title,
    description: story.lede.slice(0, 180),
    alternates: { canonical: `/stories/${story.slug}` },
    openGraph: {
      title: story.title,
      description: story.lede.slice(0, 180),
      images: [{ url: story.image, width: 1000, height: 625, alt: story.imageAlt }],
    },
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  if (!story) notFound();

  const index = stories.findIndex((item) => item.slug === story.slug);
  const next = stories[(index + 1) % stories.length];
  const record = sites.find((item) => item.name === story.site);

  return (
    <>
      <PageHead
        eyebrow={`Story ${String(index + 1).padStart(2, "0")} of ${String(stories.length).padStart(2, "0")}`}
        title={story.title}
        intro={story.lede}
        image={story.image}
        imageAlt={story.imageAlt}
        crumbs={[
          { href: "/stories", label: "Stories" },
          { href: `/stories/${story.slug}`, label: story.site },
        ]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <p className="ta-help" style={{ marginBottom: 18 }}>
                Site {String(story.siteNumber).padStart(3, "0")} / {story.site} / Built {story.builtOn}
              </p>
              <div className="ta-prose">
                {story.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              <blockquote className="ta-story-quote" style={{ margin: "26px 0" }}>
                {story.quote}
                <span
                  style={{
                    display: "block",
                    marginTop: 10,
                    fontSize: 11,
                    fontStyle: "normal",
                    letterSpacing: 1.4,
                    textTransform: "uppercase",
                    color: "#999999",
                  }}
                >
                  {story.quoteBy}
                </span>
              </blockquote>

              <div className="ta-disclosure">
                <strong>What this story does not claim.</strong> {story.honest}
              </div>

              <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                {record?.url ? (
                  <a className="ta-btn ta-btn--solid" href={record.url} target="_blank" rel="noopener noreferrer">
                    Open the site
                  </a>
                ) : null}
                {record?.repo ? (
                  <a className="ta-btn" href={record.repo} target="_blank" rel="noopener noreferrer">
                    Repository
                  </a>
                ) : null}
                <Link className="ta-btn" href="/stories">
                  All stories
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ta-card">
                <span className="ta-kicker">Next story</span>
                <h3>{next.title}</h3>
                <p>{next.lede}</p>
                <Link className="ta-link-arrow" href={`/stories/${next.slug}`}>
                  Read it
                </Link>
              </div>
              <div className="ta-card" style={{ marginTop: 20 }}>
                <h3>In the directory</h3>
                <p>
                  {story.site} sits at position {story.siteNumber} of the hundred. The directory shows every build with
                  its cluster, country focus and links.
                </p>
                <Link className="ta-link-arrow" href={`/directory?q=${encodeURIComponent(story.site)}`}>
                  Find it
                </Link>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 34 }}>
            <Disclaimer compact />
          </div>
        </div>
      </section>

      <section className="ta-section ta-section--tight ta-section--paper">
        <div className="container">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-md-8">
              <div className="ta-title" style={{ marginBottom: 0 }}>
                <span className="ta-eyebrow">Continue</span>
                <h2>More from the build month</h2>
              </div>
            </div>
            <div className="col-md-4">
              <Link className="ta-btn" href="/stories">
                All stories
              </Link>
            </div>
          </div>
          <div className="ta-grid ta-grid--3" style={{ marginTop: 26 }}>
            {stories
              .filter((item) => item.slug !== story.slug)
              .slice(0, 3)
              .map((item) => (
                <article className="ta-card" key={item.slug} style={{ padding: 0, border: 0 }}>
                  <Link href={`/stories/${item.slug}`} style={{ display: "block" }}>
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={640}
                      height={400}
                      sizes="(max-width: 767px) 100vw, 31vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Link>
                  <div style={{ padding: "18px 0 0" }}>
                    <span className="ta-kicker">Site {String(item.siteNumber).padStart(3, "0")}</span>
                    <h3 style={{ fontSize: 15 }}>
                      <Link href={`/stories/${item.slug}`}>{item.title}</Link>
                    </h3>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

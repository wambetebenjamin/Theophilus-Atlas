import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { Reveal } from "../components/Reveal";
import { Disclaimer } from "../components/Disclaimer";
import { T } from "../components/T";
import { clusters } from "../../data/clusters";
import { sites } from "../../data/sites";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Ten innovation clusters from the 100 website challenge: literacy, health, work and money, trade and craft, hospitality, home and land, mobility, faith, media and civic resilience.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <>
      <PageHead
        eyebrow={<T k="categories.eyebrow" />}
        title={<T k="categories.title" />}
        intro={<T k="categories.intro" />}
        homeLabel={<T k="nav.home" />}
        image="/images/community.jpg"
        imageAlt="Traders and shoppers in a busy open air market with bright umbrellas"
        crumbs={[{ href: "/categories", label: "Categories" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="ta-grid ta-grid--2">
            {clusters.map((cluster, index) => {
              const members = sites.filter((site) => site.cluster === cluster.id);
              return (
                <Reveal key={cluster.id} effect="slide-bottom" delay={(index % 2) * 0.08}>
                  <article className="ta-cluster">
                    <div className="ta-cluster-head">
                      <div>
                        <span className="ta-kicker">
                          <i className={`fa ${cluster.icon}`} aria-hidden="true" /> {members.length}{" "}
                          <T k="categories.sites" />
                        </span>
                        <h3>{cluster.name}</h3>
                      </div>
                      <span className="ta-cluster-count" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p>{cluster.blurb}</p>
                    <div className="ta-cluster-lesson">
                      <b style={{ color: "#3C3B3B" }}>
                        <T k="categories.lesson" />:
                      </b>{" "}
                      {cluster.lesson}
                    </div>
                    <ul>
                      {members.slice(0, 6).map((site) => (
                        <li key={site.slug}>
                          <Link href={`/directory?q=${encodeURIComponent(site.name)}`}>{site.name}</Link>
                        </li>
                      ))}
                      {members.length > 6 ? (
                        <li>
                          <Link href={`/directory?cluster=${cluster.id}`}>
                            +{members.length - 6} more
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                    <div>
                      <Link className="ta-link-arrow" href={`/directory?cluster=${cluster.id}`}>
                        <T k="categories.explore" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div style={{ marginTop: 34 }}>
            <Disclaimer compact />
          </div>
        </div>
      </section>
    </>
  );
}

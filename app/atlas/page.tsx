import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { Reveal } from "../components/Reveal";
import { Disclaimer } from "../components/Disclaimer";
import { ClusterChart, CountryChart, PaceChart, ThemeBars } from "../components/AtlasCharts";
import { T } from "../components/T";
import {
  buildDays,
  busiestDay,
  clusterShare,
  countryCounts,
  multiCountryBuilds,
  reachMentions,
  firstBuild,
  formatBuildDate,
  lastBuild,
  liveSites,
  totalSites,
  topCluster,
} from "../lib/atlas";

export const metadata: Metadata = {
  title: "Atlas",
  description:
    "Light visual summaries of the 100 website challenge: clusters, country reach and delivery rhythm, with the lessons behind the counts and a clear list of what is not measured.",
  alternates: { canonical: "/atlas" },
};

const ledger = ["atlas.ledger1", "atlas.ledger2", "atlas.ledger3", "atlas.ledger4"] as const;

export default function AtlasPage() {
  return (
    <>
      <PageHead
        eyebrow={<T k="atlas.eyebrow" />}
        title={<T k="atlas.title" />}
        intro={<T k="atlas.intro" />}
        homeLabel={<T k="nav.home" />}
        image="/images/city-nairobi.jpg"
        imageAlt="Nairobi office towers catching late afternoon sun"
        crumbs={[{ href: "/atlas", label: "Atlas" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="row" style={{ marginBottom: 30 }}>
            <div className="col-md-7">
              <div className="ta-title" style={{ marginBottom: 0 }}>
                <span className="ta-eyebrow">Aggregated from public build data</span>
                <h2>
                  <T k="atlas.title" />
                </h2>
                <p>
                  <T k="atlas.intro" />
                </p>
              </div>
            </div>
            <div className="col-md-5">
              <div className="ta-quote">
                <p>
                  {totalSites} builds, {buildDays} delivery days, {liveSites} public deployments.
                </p>
                <cite>
                  Last build on {formatBuildDate(lastBuild)}. Heaviest day: {busiestDay.value} sites.
                </cite>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-7">
              <Reveal effect="slide-bottom">
                <div className="ta-chart-card">
                  <h3>
                    <T k="atlas.chart1" />
                  </h3>
                  <p className="ta-chart-sub">
                    Ten clusters, sorted by size. The largest is {topCluster.label} at {topCluster.value} builds.
                  </p>
                  <ClusterChart />
                </div>
              </Reveal>
            </div>
            <div className="col-lg-5">
              <Reveal effect="slide-bottom" delay={0.1}>
                <div className="ta-chart-card">
                  <h3>Countries named beyond Kenya</h3>
                  <p className="ta-chart-sub">
                    {countryCounts.length} countries named across the set. Beyond Kenya there are {reachMentions}{" "}
                    mentions, from {multiCountryBuilds} builds that name more than one country.
                  </p>
                  <CountryChart />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="row" style={{ marginTop: 24 }}>
            <div className="col-lg-7">
              <Reveal effect="slide-bottom">
                <div className="ta-chart-card">
                  <h3>Delivery rhythm</h3>
                  <p className="ta-chart-sub">
                    Sites shipped on each delivery day between {formatBuildDate(firstBuild)} and{" "}
                    {formatBuildDate(lastBuild)}.
                  </p>
                  <PaceChart />
                </div>
              </Reveal>
            </div>
            <div className="col-lg-5">
              <Reveal effect="slide-bottom" delay={0.1}>
                <div className="ta-chart-card">
                  <h3>Cluster share</h3>
                  <p className="ta-chart-sub">The same ten groups as a share of the hundred.</p>
                  <div style={{ padding: "14px 0 8px" }}>
                    <ThemeBars rows={clusterShare.map((item) => ({ label: item.label, value: item.value, share: item.share }))} />
                  </div>
                  <p className="ta-chart-note">{clusterShare.map((item) => `${item.label} ${item.share}%`).join(", ")}.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="ta-section ta-section--paper">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Reveal effect="slide-right">
                <div className="ta-title">
                  <span className="ta-eyebrow">Reading the shape</span>
                  <h2>
                    <T k="atlas.lessonsTitle" />
                  </h2>
                </div>
                <div className="ta-prose">
                  <p>
                    The set is wider than it is deep. Media, trade, health, work and home account for most of the
                    hundred, because those are the pages African organisations ask for first: a catalogue, a service
                    list, a job board, a giving page, a booking.
                  </p>
                  <p>
                    Civic and faith builds are fewer, but they carry the clearest disclaimers. Where a page touches a
                    public service or a congregation, the build says what it does not decide.
                  </p>
                  <p>
                    The delivery rhythm is the least glamorous chart and the most useful. The first eight days shipped
                    steadily, the middle week shipped two or three a day, and the closing week shipped the final
                    fourteen. Batching work by shape, not by sector, is what made that pace possible.
                  </p>
                </div>
                <p>
                  <Link className="ta-link-arrow" href="/playbook">
                    Take the nine lessons
                  </Link>
                </p>
              </Reveal>
            </div>
            <div className="col-md-6">
              <Reveal effect="slide-left" delay={0.1}>
                <div className="ta-lesson" style={{ background: "#fff" }}>
                  <span className="ta-lesson-n">Honest ledger</span>
                  <h3>
                    <T k="atlas.ledgerTitle" />
                  </h3>
                  <ul className="ta-prose" style={{ margin: "12px 0 0" }}>
                    {ledger.map((key) => (
                      <li key={key} style={{ listStyle: "none", paddingLeft: 22, position: "relative" }}>
                        <i
                          className="fa fa-times"
                          aria-hidden="true"
                          style={{ position: "absolute", left: 0, top: 6, color: "#999", fontSize: 11 }}
                        />
                        <T k={key} />
                      </li>
                    ))}
                  </ul>
                  <p style={{ marginTop: 16 }}>
                    <T k="atlas.methodTitle" />. <T k="atlas.methodText" />
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
          <div style={{ marginTop: 30 }}>
            <Disclaimer compact />
          </div>
        </div>
      </section>
    </>
  );
}

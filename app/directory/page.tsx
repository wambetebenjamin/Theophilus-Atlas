import type { Metadata } from "next";
import { PageHead } from "../components/PageHead";
import { DirectoryExplorer } from "../components/DirectoryExplorer";
import { Disclaimer } from "../components/Disclaimer";
import { T } from "../components/T";
import { sites } from "../../data/sites";
import { clusterCounts } from "../lib/atlas";

export const metadata: Metadata = {
  title: "Directory",
  description:
    "Every build in the 100 website challenge, searchable by name, innovation cluster and country focus, with a link to each site or its repository.",
  alternates: { canonical: "/directory" },
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cluster?: string }>;
}) {
  const params = await searchParams;
  const initialCluster =
    params.cluster && clusterCounts.some((item) => item.key === params.cluster)
      ? params.cluster
      : "all";

  return (
    <>
      <PageHead
        eyebrow={<T k="directory.eyebrow" />}
        title={<T k="directory.title" />}
        intro={<T k="directory.intro" />}
        homeLabel={<T k="nav.home" />}
        image="/images/skyline.jpg"
        imageAlt="Aerial view of the Nairobi skyline under a wide blue sky"
        crumbs={[{ href: "/directory", label: "Directory" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="row" style={{ marginBottom: 26 }}>
            <div className="col-md-8">
              <div className="ta-title" style={{ marginBottom: 0 }}>
                <span className="ta-eyebrow">
                  {sites.length} entries, {clusterCounts.length} clusters
                </span>
                <h2>
                  <T k="directory.title" />
                </h2>
                <p>
                  <T k="directory.intro" />
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <Disclaimer compact />
            </div>
          </div>

          <DirectoryExplorer initialQuery={params.q ?? ""} initialCluster={initialCluster} />

          <p className="ta-help" style={{ marginTop: 22 }}>
            <T k="directory.note" />
          </p>
        </div>
      </section>
    </>
  );
}

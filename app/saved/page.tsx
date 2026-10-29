import type { Metadata } from "next";
import { PageHead } from "../components/PageHead";
import { SavedShelf } from "../components/SavedShelf";
import { SessionLabel } from "../components/SessionLabel";
import { T } from "../components/T";

export const metadata: Metadata = {
  title: "Saved sites",
  description:
    "The sites you saved from the 100 website challenge directory, kept in your browser with a short note for each.",
  alternates: { canonical: "/saved" },
  robots: { index: false, follow: true },
};

export default function SavedPage() {
  return (
    <>
      <PageHead
        eyebrow="Your shelf"
        title={<T k="saved.title" />}
        intro={<T k="saved.intro" />}
        homeLabel={<T k="nav.home" />}
        image="/images/print.jpg"
        imageAlt="A print workshop with a craftsman working at a screen printing frame"
        crumbs={[{ href: "/saved", label: "Saved" }]}
      />

      <section className="ta-section ta-section--white">
        <div className="container">
          <div className="row" style={{ marginBottom: 22 }}>
            <div className="col-md-8">
              <div className="ta-title" style={{ marginBottom: 0 }}>
                <span className="ta-eyebrow">Local to your browser</span>
                <h2>
                  <T k="saved.title" />
                </h2>
                <p>
                  <T k="saved.intro" />
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <SessionLabel />
            </div>
          </div>
          <SavedShelf />
        </div>
      </section>
    </>
  );
}

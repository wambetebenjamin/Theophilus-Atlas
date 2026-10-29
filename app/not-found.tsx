import Link from "next/link";

export default function NotFound() {
  return (
    <section className="ta-pagehead" style={{ minHeight: "62vh" }}>
      <div className="homeoverlay" aria-hidden="true" />
      <div className="container ta-pagehead-inner">
        <span className="ta-eyebrow">404</span>
        <h1>That page is not in the atlas</h1>
        <p>
          The address may have moved or the build may never have existed. Every one of the hundred is listed in the
          directory, and the playbook explains how the set was made.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <Link className="ta-btn ta-btn--gold" href="/directory">
            Open the directory
          </Link>
          <Link className="ta-btn ta-btn--light" href="/">
            Back to the start
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <section className="ta-section ta-section--white" style={{ minHeight: "52vh" }} aria-busy="true">
      <div className="container">
        <p className="ta-count" role="status">
          Loading the atlas
        </p>
        <div style={{ maxWidth: 220, marginTop: 18 }}>
          <span
            style={{
              display: "block",
              height: 2,
              background: "#ededed",
              position: "relative",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <span
              style={{
                position: "absolute",
                inset: "0 auto 0 0",
                width: "40%",
                background: "var(--ta-gold)",
              }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}

import React from "react";

export default function EventExperienceProse() {
  const manifestoPoints = [
    { num: "01", text: "Come to participate actively in intellectual discourse." },
    { num: "02", text: "Come to ask questions that challenge conventional wisdom." },
    { num: "03", text: "Come to listen deeply to groundbreaking perspectives." },
    { num: "04", text: "Come to build relationships with peers and mentors who elevate your ambition." },
    { num: "05", text: "Come with an open, inquiring mind ready for a new era." },
  ];

  return (
    <section
      style={{
        backgroundColor: "#14070E",
        color: "#F8F5EF",
        paddingTop: "clamp(80px, 11vw, 136px)",
        paddingBottom: "clamp(80px, 11vw, 136px)",
        borderTop: "1px solid rgba(245, 200, 75, 0.2)",
        borderBottom: "1px solid rgba(245, 200, 75, 0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Eyebrow Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: "#F5C84B",
              transform: "rotate(45deg)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#F5C84B",
            }}
          >
            The Participant Manifesto
          </span>
        </div>

        {/* Large Dominant Headline */}
        <h2
          style={{
            fontFamily: "var(--font-editorial)",
            fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
            fontWeight: 500,
            color: "#F8F5EF",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            marginBottom: "clamp(44px, 6vw, 72px)",
            maxWidth: "900px",
          }}
        >
          Don&apos;t come just to attend.
        </h2>

        {/* Two-Column Manifesto Composition */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "start",
          }}
        >
          {/* Left Column: Emotional Manifesto Statement */}
          <div style={{ maxWidth: "520px" }}>
            <blockquote
              style={{
                margin: "0 0 24px 0",
                paddingLeft: "24px",
                borderLeft: "2px solid #F5C84B",
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontSize: "clamp(1.35rem, 2.2vw, 1.85rem)",
                lineHeight: 1.45,
                color: "#F5C84B",
              }}
            >
              “Because university life isn&apos;t only about collecting grades. It&apos;s about collecting experiences, mentors, ideas, and stories that shape who we become.”
            </blockquote>

            <p
              style={{
                fontSize: "0.98rem",
                lineHeight: 1.7,
                color: "rgba(248, 245, 239, 0.75)",
                fontFamily: "var(--font-sans)",
              }}
            >
              GENESIS is a purposeful departure from passive attendance. It is designed to spark initiative, ignite academic inquiry, and forge enduring collegiate connections.
            </p>
          </div>

          {/* Right Column: 5 Concise Manifesto Experiences */}
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {manifestoPoints.map((point) => (
              <div
                key={point.num}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "20px",
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(245, 200, 75, 0.15)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#F5C84B",
                  }}
                >
                  {point.num}
                </span>

                <p
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)",
                    fontStyle: "italic",
                    color: "#F8F5EF",
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

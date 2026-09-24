import React from "react";

export default function EventIntro() {
  return (
    <section
      id="event"
      className="section-padding"
      style={{
        backgroundColor: "var(--color-surface-base)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Asymmetric Editorial 2-Column Composition */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(36px, 6vw, 72px)",
            alignItems: "start",
            marginBottom: "clamp(48px, 6vw, 72px)",
          }}
        >
          {/* Left Column: Anchored Heading & Eyebrow */}
          <div style={{ maxWidth: "500px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "var(--color-burgundy)",
                  transform: "rotate(45deg)",
                  display: "inline-block",
                }}
              />
              <span className="eyebrow" style={{ color: "var(--color-burgundy)" }}>
                The Philosophy
              </span>
            </div>

            <h2
              className="title-section"
              style={{
                color: "var(--color-charcoal)",
                fontSize: "clamp(2.35rem, 4.2vw, 3.4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              More than an event.
              <span
                style={{
                  display: "block",
                  fontStyle: "normal",
                  fontWeight: 600,
                  color: "var(--color-burgundy)",
                  marginTop: "6px",
                }}
              >
                A space for ideas.
              </span>
            </h2>

            <div
              style={{
                width: "48px",
                height: "2px",
                backgroundColor: "var(--color-gold)",
                marginTop: "24px",
              }}
            />
          </div>

          {/* Right Column: Statement, Lead & Narrative */}
          <div style={{ maxWidth: "620px" }}>
            <blockquote
              style={{
                margin: "0 0 28px 0",
                paddingLeft: "24px",
                borderLeft: "2px solid var(--color-burgundy)",
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
                lineHeight: 1.45,
                color: "var(--color-charcoal)",
              }}
            >
              “How often do we get the chance to sit in the same room with people who can change the way we think?”
            </blockquote>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  lineHeight: 1.6,
                }}
              >
                Not just another seminar. Not just another certificate. Not just another day on the university calendar.
              </p>

              <p
                style={{
                  fontSize: "0.98rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                GENESIS was conceived to create a genuine intellectual turning point. It is a curated gathering where students, young researchers, and aspiring professionals meet industry trailblazers, master communicators, and distinguished scholars.
              </p>

              <p
                style={{
                  fontSize: "0.98rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                Because university life isn&apos;t only about collecting grades—it&apos;s about collecting experiences, perspectives, and stories that shape who we become in our professions and communities.
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Visual Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--color-border-subtle)",
            width: "100%",
          }}
        />
      </div>
    </section>
  );
}

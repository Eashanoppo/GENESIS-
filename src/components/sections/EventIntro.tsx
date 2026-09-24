import React from "react";

export default function EventIntro() {
  return (
    <section
      id="event"
      className="section-padding"
      style={{
        backgroundColor: "var(--color-surface-base)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container-narrow">
        <span className="eyebrow" style={{ marginBottom: "16px" }}>
          The Philosophy
        </span>

        <h2 className="title-section" style={{ marginBottom: "28px", color: "var(--color-charcoal)" }}>
          More than an event. A space for ideas.
        </h2>

        <blockquote
          className="quote-editorial"
          style={{
            marginBottom: "32px",
            paddingLeft: "24px",
            borderLeft: "2px solid var(--color-burgundy)",
            color: "var(--color-charcoal)",
          }}
        >
          “How often do we get the chance to sit in the same room with people who can change the way we think?”
        </blockquote>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p className="body-lead" style={{ color: "var(--color-text-secondary)" }}>
            Not just another seminar. Not just another certificate. Not just another day on the university calendar.
          </p>
          <p className="body-default" style={{ fontSize: "1.05rem" }}>
            GENESIS was conceived to create a genuine intellectual turning point. It is a curated gathering where students, young researchers, and aspiring professionals meet industry trailblazers, master communicators, and distinguished scholars.
          </p>
          <p className="body-default" style={{ fontSize: "1.05rem" }}>
            Because university life isn&apos;t only about collecting grades—it&apos;s about collecting experiences, perspectives, and stories that shape who we become in our professions and communities.
          </p>
        </div>
      </div>
    </section>
  );
}

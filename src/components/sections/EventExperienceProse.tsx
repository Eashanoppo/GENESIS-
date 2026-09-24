import React from "react";

export default function EventExperienceProse() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-charcoal)",
        color: "var(--color-warm-white)",
        paddingTop: "clamp(64px, 10vw, 120px)",
        paddingBottom: "clamp(64px, 10vw, 120px)",
      }}
    >
      <div className="container-narrow">
        <h2
          className="title-hero"
          style={{
            color: "var(--color-warm-white)",
            marginBottom: "32px",
            lineHeight: 1.15,
          }}
        >
          Don&apos;t come just to attend.
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)",
            fontFamily: "var(--font-editorial)",
            fontStyle: "italic",
            color: "var(--color-cream)",
            marginBottom: "40px",
          }}
        >
          <p>Come to participate.</p>
          <p>Come to ask questions.</p>
          <p>Come to listen deeply.</p>
          <p>Come to meet someone new.</p>
          <p>Come with an open mind.</p>
        </div>

        <div
          style={{
            paddingTop: "32px",
            borderTop: "1px solid var(--color-border-dark)",
            maxWidth: "600px",
          }}
        >
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--color-text-inverse-muted)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Because university life isn&apos;t only about collecting grades. It&apos;s about collecting experiences, people, ideas, and stories that shape who we become in life.
          </p>
        </div>
      </div>
    </section>
  );
}

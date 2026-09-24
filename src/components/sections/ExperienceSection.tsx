import React from "react";

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Inspiring Plenary Sessions",
      desc: "Delivered by distinguished educators and senior trainers from software engineering, artificial intelligence, and corporate communications.",
    },
    {
      title: "Lunch & Refreshments",
      desc: "Wholesome meal and mid-session refreshments included for registered attendees to keep you energized throughout the event.",
    },
    {
      title: "Cultural Showcase",
      desc: "An inspiring segment celebrating shared collegiate creativity, music, and thought-provoking artistic expressions.",
    },
    {
      title: "Official E-Certificate",
      desc: "An official attendance-verified digital certificate issued to registered participants who join in person.",
    },
    {
      title: "Executive Networking",
      desc: "Structured opportunities to connect with faculty heads, visiting mentors, student leaders, and fellow aspiring professionals.",
    },
    {
      title: "Book, Food & Gifts (Optional Package)",
      desc: "Select the optional package during registration (BDT 100) to receive the commemorative book, special food pack, and event gifts.",
    },
  ];

  return (
    <section
      id="experience"
      className="section-padding"
      style={{
        backgroundColor: "var(--color-surface-base)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "700px", marginBottom: "48px" }}>
          <span className="eyebrow" style={{ marginBottom: "12px" }}>
            The Full Spectrum
          </span>
          <h2 className="title-section" style={{ color: "var(--color-charcoal)", marginBottom: "14px" }}>
            More Than a Session
          </h2>
          <p className="body-lead">
            GENESIS provides a holistic, curated environment ensuring you take away meaningful memories, relationships, and tangible tools.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {experiences.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: "24px",
                backgroundColor: "var(--color-surface-card)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--color-charcoal)",
                  marginBottom: "8px",
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";

export default function ExperienceSection() {
  const experiences = [
    {
      category: "LEARNING",
      title: "Inspiring Plenary Keynotes",
      desc: "Delivered by distinguished educators and senior trainers exploring cutting-edge software engineering, artificial intelligence, and workplace communications.",
    },
    {
      category: "NETWORK",
      title: "Executive Networking",
      desc: "Structured opportunities to connect with university faculty heads, visiting mentors, student leaders, and fellow aspiring professionals.",
    },
    {
      category: "CULTURE",
      title: "Collegiate Cultural Showcase",
      desc: "An inspiring segment celebrating collegiate creativity, musical expressions, and thought-provoking artistic performances.",
    },
    {
      category: "CONNECTION",
      title: "Official Verified E-Certificate",
      desc: "An official attendance-verified digital credential issued directly to registered participants who join us on-site.",
    },
    {
      category: "FOOD",
      title: "Lunch & Mid-Day Refreshments",
      desc: "Wholesome meal and mid-session refreshments provided for registered attendees to maintain energy throughout the day.",
    },
    {
      category: "BOOK",
      title: "Commemorative Package & Gifts",
      desc: "Select the optional package during registration (BDT 100) to receive the printed summit book, special food pack, and event gifts.",
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
        {/* Section Header */}
        <div style={{ maxWidth: "760px", marginBottom: "clamp(44px, 6vw, 64px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
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
              The Full Spectrum
            </span>
          </div>

          <h2
            className="title-section"
            style={{
              color: "var(--color-charcoal)",
              fontSize: "clamp(2rem, 3.6vw, 2.85rem)",
              lineHeight: 1.15,
              marginBottom: "14px",
            }}
          >
            More Than a Session
          </h2>

          <p className="body-lead" style={{ color: "var(--color-text-secondary)" }}>
            GENESIS provides a holistic, curated environment ensuring you take away meaningful memories, relationships, and tangible tools.
          </p>
        </div>

        {/* Structured 3 × 2 Editorial Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1px",
            backgroundColor: "var(--color-border-default)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
            overflow: "hidden",
          }}
        >
          {experiences.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: "clamp(24px, 3.5vw, 36px)",
                backgroundColor: "var(--color-surface-card)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    marginBottom: "10px",
                  }}
                >
                  {item.category}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "var(--color-charcoal)",
                    marginBottom: "10px",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

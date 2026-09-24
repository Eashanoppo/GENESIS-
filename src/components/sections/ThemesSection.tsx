import React from "react";

export default function ThemesSection() {
  const pillars = [
    {
      num: "01",
      title: "LEARN",
      tagline: "Discover new ideas and perspectives",
      description:
        "Absorb transformative academic insights, technological frontiers, and rigorous intellectual knowledge from established educators and industry leaders.",
    },
    {
      num: "02",
      title: "CREATE",
      tagline: "Turn concepts into possibilities",
      description:
        "Translate conceptual knowledge into actionable software solutions, impactful research projects, and community-driven initiatives.",
    },
    {
      num: "03",
      title: "GROW",
      tagline: "Develop soft skills & confidence",
      description:
        "Master the fine art of professional communication, persuasive public speaking, and executive demeanor required in contemporary workplaces.",
    },
    {
      num: "04",
      title: "CONNECT",
      tagline: "Build meaningful relationships",
      description:
        "Forge relationships with like-minded peers, visiting mentors, and the wider DIU Rotaract community that extend far beyond campus corridors.",
    },
  ];

  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: "var(--color-surface-card)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: "720px", marginBottom: "clamp(48px, 7vw, 76px)" }}>
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
              The Four Dimensions
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
            What GENESIS Is About
          </h2>

          <p className="body-lead" style={{ color: "var(--color-text-secondary)" }}>
            Four interconnected dimensions designed to elevate your university journey into a transformative personal and professional experience.
          </p>
        </div>

        {/* 4 Editorial Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "clamp(28px, 4vw, 44px)",
            position: "relative",
          }}
        >
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.num}
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                paddingTop: "16px",
                borderTop: "2px solid var(--color-border-default)",
              }}
            >
              {/* Large Subtle Number Anchor */}
              <span
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "clamp(2.75rem, 4vw, 3.8rem)",
                  fontWeight: 400,
                  lineHeight: 1,
                  color: "var(--color-border-default)",
                  marginBottom: "8px",
                  display: "block",
                  letterSpacing: "-0.04em",
                }}
              >
                {pillar.num}
              </span>

              {/* Primary Visual Focus: Word */}
              <h3
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "clamp(1.75rem, 2.4vw, 2.2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--color-charcoal)",
                  marginBottom: "8px",
                  lineHeight: 1.1,
                }}
              >
                {pillar.title}
              </h3>

              {/* Tagline */}
              <p
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--color-burgundy)",
                  marginBottom: "12px",
                  lineHeight: 1.4,
                }}
              >
                {pillar.tagline}
              </p>

              {/* Short Description */}
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";

export default function ThemesSection() {
  const themes = [
    {
      num: "01",
      title: "Learn",
      tagline: "Discover new ideas and perspectives",
      description:
        "Absorb transformative academic insights, technological trends, and rigorous intellectual knowledge from established educators and industry leaders.",
    },
    {
      num: "02",
      title: "Create",
      tagline: "Turn concepts into possibilities",
      description:
        "Learn how to translate conceptual knowledge into actionable software solutions, research projects, and community-driven initiatives.",
    },
    {
      num: "03",
      title: "Grow",
      tagline: "Develop soft skills & confidence",
      description:
        "Master the fine art of professional communication, persuasive public speaking, and executive demeanor required in contemporary workplaces.",
    },
    {
      num: "04",
      title: "Connect",
      tagline: "Build meaningful relationships",
      description:
        "Forge relationships with like-minded peers, mentors, and the wider DIU Rotaract community that extend far beyond university corridors.",
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
        <div style={{ maxWidth: "700px", marginBottom: "48px" }}>
          <span className="eyebrow" style={{ marginBottom: "12px" }}>
            The Pillars
          </span>
          <h2 className="title-section" style={{ color: "var(--color-charcoal)", marginBottom: "14px" }}>
            What GENESIS Is About
          </h2>
          <p className="body-lead">
            Four interconnected dimensions designed to elevate your university journey into a transformative personal and professional experience.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "28px",
          }}
        >
          {themes.map((theme) => (
            <div
              key={theme.num}
              style={{
                padding: "32px 24px",
                borderLeft: "2px solid var(--color-burgundy)",
                backgroundColor: "var(--color-surface-base)",
                borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--color-burgundy)",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                {theme.num}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  color: "var(--color-charcoal)",
                  marginBottom: "6px",
                }}
              >
                {theme.title}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  marginBottom: "12px",
                }}
              >
                {theme.tagline}
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                {theme.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";

export default function EventInfo() {
  const blocks = [
    {
      label: "DATE & TIMING",
      primary: "03 NOVEMBER 2026",
      secondary: "Tuesday · Full-Day Summit",
      accent: false,
    },
    {
      label: "VENUE DESTINATION",
      primary: "ICH, AB4 · 3RD FLOOR",
      secondary: "Daffodil International University",
      accent: false,
    },
    {
      label: "REGISTRATION PERIOD",
      primary: "25 OCT — 01 NOV",
      secondary: "Pre-registration required · Limited seats",
      accent: true,
    },
    {
      label: "FORMAT & EXPERIENCE",
      primary: "IDEAS • INSPIRATION • CONNECTION",
      secondary: "Plenary sessions, workshops & fellowship",
      accent: false,
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "var(--color-surface-card)",
        paddingTop: "clamp(48px, 6vw, 72px)",
        paddingBottom: "clamp(48px, 6vw, 72px)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container">
        {/* Section Intro Eyebrow */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--color-burgundy)", marginBottom: "6px", display: "inline-block" }}>
              Essential Logistics
            </span>
            <h2
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
                fontWeight: 600,
                color: "var(--color-charcoal)",
                lineHeight: 1.15,
              }}
            >
              GENESIS at a Glance
            </h2>
          </div>

          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
            }}
          >
            Summit Overview · Quick Facts
          </span>
        </div>

        {/* Editorial Information Strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--color-surface-base)",
            overflow: "hidden",
          }}
        >
          {blocks.map((block, idx) => (
            <div
              key={idx}
              style={{
                padding: "clamp(24px, 3vw, 32px) 24px",
                borderRight: idx < blocks.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "transparent",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: block.accent ? "var(--color-burgundy)" : "var(--color-gold)",
                    marginBottom: "12px",
                  }}
                >
                  {block.label}
                </span>

                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "var(--color-charcoal)",
                    lineHeight: 1.3,
                    marginBottom: "8px",
                  }}
                >
                  {block.primary}
                </div>
              </div>

              <div
                style={{
                  fontSize: "0.825rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.5,
                  paddingTop: "12px",
                  borderTop: "1px dashed var(--color-border-subtle)",
                }}
              >
                {block.secondary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

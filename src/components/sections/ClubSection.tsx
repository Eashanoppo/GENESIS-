import React from "react";

export default function ClubSection() {
  const pillars = [
    {
      title: "Community Service",
      desc: "Creating tangible, positive social impact through educational drives, environmental awareness, and humanitarian assistance.",
    },
    {
      title: "Leadership & Professional Development",
      desc: "Cultivating leadership capabilities, career readiness, mentorship, and professional competence that bridge academics and industry.",
    },
    {
      title: "Fellowship & Global Understanding",
      desc: "Nurturing deep friendships, intercultural exchange, and international solidarity across the global Rotary network.",
    },
  ];

  return (
    <section
      id="club"
      className="section-padding"
      style={{
        backgroundColor: "var(--color-surface-card)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "780px", marginBottom: "48px" }}>
          <span className="eyebrow" style={{ marginBottom: "12px" }}>
            The Organizing Host
          </span>
          <h2 className="title-section" style={{ color: "var(--color-charcoal)", marginBottom: "16px" }}>
            About Rotaract Club of Daffodil International University
          </h2>
          <p className="body-lead">
            The Rotaract Club of DIU is an active part of Rotary International District 3281, empowering youth to develop professional acumen and serve the wider community with integrity.
          </p>
        </div>

        {/* Pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {pillars.map((p, idx) => (
            <div
              key={idx}
              style={{
                padding: "28px",
                backgroundColor: "var(--color-surface-base)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "var(--color-burgundy)",
                  marginBottom: "8px",
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Beyond the Classroom Callout */}
        <div
          style={{
            padding: "32px",
            backgroundColor: "var(--color-burgundy-surface)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-sm)",
            maxWidth: "840px",
          }}
        >
          <span className="eyebrow" style={{ color: "var(--color-burgundy)", marginBottom: "8px" }}>
            Beyond The Classroom
          </span>
          <h4
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--color-charcoal)",
              marginBottom: "8px",
            }}
          >
            Empowering Future Professionals
          </h4>
          <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.65 }}>
            We equip our members with indispensable soft skills for modern workplaces, providing practical hands-on experience in project leadership, public speaking, and institutional event curation such as GENESIS.
          </p>
        </div>
      </div>
    </section>
  );
}

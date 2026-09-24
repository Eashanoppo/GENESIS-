import React from "react";

export default function ClubSection() {
  const pillars = [
    {
      num: "01",
      title: "COMMUNITY SERVICE",
      desc: "Creating tangible, positive social impact through student-led educational drives, environmental awareness, and humanitarian relief.",
    },
    {
      num: "02",
      title: "LEADERSHIP",
      desc: "Cultivating executive governance, personal accountability, and collaborative team stewardship through major institutional programs.",
    },
    {
      num: "03",
      title: "GLOBAL UNDERSTANDING",
      desc: "Nurturing collegiate fellowship, intercultural exchange, and international solidarity across the worldwide Rotary International network.",
    },
    {
      num: "04",
      title: "PROFESSIONAL DEVELOPMENT",
      desc: "Bridging academic coursework with modern industry expectations through hands-on masterclasses, career mentorship, and summit production.",
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
        {/* Editorial Organization Profile Header */}
        <div style={{ maxWidth: "860px", marginBottom: "clamp(48px, 7vw, 76px)" }}>
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
              About The Club
            </span>
          </div>

          <h2
            className="title-section"
            style={{
              color: "var(--color-charcoal)",
              fontSize: "clamp(2.1rem, 3.8vw, 3.1rem)",
              lineHeight: 1.12,
              marginBottom: "20px",
            }}
          >
            Rooted in Youth Leadership.
            <span
              style={{
                display: "block",
                fontStyle: "normal",
                fontWeight: 600,
                color: "var(--color-burgundy)",
                marginTop: "4px",
              }}
            >
              Dedicated to Lasting Institutional Impact.
            </span>
          </h2>

          <p
            className="body-lead"
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: "760px",
            }}
          >
            The Rotaract Club of Daffodil International University operates under Rotary International District 3281. We unite ambitious students, young scholars, and community builders to solve societal challenges and develop executive acumen through benchmark initiatives like GENESIS.
          </p>
        </div>

        {/* 4 Pillars Horizontal Arrangement */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "clamp(24px, 3vw, 36px)",
            paddingTop: "24px",
            borderTop: "1px solid var(--color-border-default)",
          }}
        >
          {pillars.map((p) => (
            <div
              key={p.num}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--color-gold)",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                PILLAR {p.num}
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  color: "var(--color-charcoal)",
                  marginBottom: "10px",
                  lineHeight: 1.3,
                }}
              >
                {p.title}
              </h3>

              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

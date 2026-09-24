import React from "react";
import Image from "next/image";
import { SPEAKERS } from "@/config/speakers";

export default function SpeakersSection() {
  return (
    <section
      id="speakers"
      className="section-padding"
      style={{
        backgroundColor: "var(--color-surface-base)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: "760px", marginBottom: "56px" }}>
          <span className="eyebrow" style={{ marginBottom: "12px" }}>
            The Plenary Voices
          </span>
          <h2 className="title-section" style={{ color: "var(--color-charcoal)", marginBottom: "16px" }}>
            Two Voices. Different Perspectives. One Platform.
          </h2>
          <p className="body-lead">
            Meet the academic pioneers and master educators sharing actionable frameworks to shape your professional and scholarly journey.
          </p>
        </div>

        {/* Speakers Grid - Two Featured Keynotes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "36px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {SPEAKERS.map((speaker) => (
            <div
              key={speaker.id}
              className="card-editorial"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: "24px",
                backgroundColor: "var(--color-surface-card)",
              }}
            >
              {/* Speaker Photo */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  backgroundColor: "var(--color-warm-white-dim)",
                  borderRadius: "var(--radius-xs)",
                  overflow: "hidden",
                  marginBottom: "20px",
                  border: "1px solid var(--color-border-subtle)",
                }}
              >
                {speaker.image ? (
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={speaker.isChiefGuest}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      padding: "20px",
                      textAlign: "center",
                      backgroundColor: "var(--color-burgundy-surface)",
                      color: "var(--color-burgundy)",
                    }}
                  >
                    <span style={{ fontSize: "2rem", marginBottom: "8px" }}>✦</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      To Be Announced
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
                      Plenary Speaker 3
                    </span>
                  </div>
                )}

                {speaker.isChiefGuest && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      backgroundColor: "var(--color-burgundy)",
                      color: "var(--color-warm-white)",
                      padding: "4px 10px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      borderRadius: "var(--radius-xs)",
                    }}
                  >
                    Chief Guest
                  </div>
                )}
              </div>

              {/* Speaker Meta */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "1.65rem",
                    fontWeight: 600,
                    color: "var(--color-charcoal)",
                    marginBottom: "4px",
                    lineHeight: 1.2,
                  }}
                >
                  {speaker.name}
                </h3>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-burgundy)", marginBottom: "2px" }}>
                  {speaker.role}
                </p>
                <p style={{ fontSize: "0.825rem", color: "var(--color-text-muted)", marginBottom: "16px" }}>
                  {speaker.affiliation}
                </p>

                <div
                  style={{
                    paddingTop: "16px",
                    borderTop: "1px solid var(--color-border-subtle)",
                    marginTop: "auto",
                  }}
                >
                  <span className="eyebrow-muted" style={{ display: "block", marginBottom: "6px" }}>
                    Session Topic
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--color-charcoal)",
                      marginBottom: "12px",
                    }}
                  >
                    {speaker.sessionTitle}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
                    {speaker.description}
                  </p>

                  {speaker.topics && (
                    <div style={{ marginTop: "14px" }}>
                      <span className="eyebrow-muted" style={{ display: "block", marginBottom: "8px", fontSize: "0.68rem" }}>
                        Key Discussion Focus:
                      </span>
                      <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                        {speaker.topics.map((t, idx) => (
                          <li
                            key={idx}
                            style={{
                              fontSize: "0.82rem",
                              color: "var(--color-text-secondary)",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <span style={{ color: "var(--color-burgundy)", fontSize: "0.9rem" }}>•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

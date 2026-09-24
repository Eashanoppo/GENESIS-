import React from "react";
import { SCHEDULE } from "@/config/schedule";

export default function ProgramTimeline() {
  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: "var(--color-surface-base)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container-narrow">
        <div style={{ marginBottom: "48px" }}>
          <span className="eyebrow" style={{ marginBottom: "12px" }}>
            The Itinerary
          </span>
          <h2 className="title-section" style={{ color: "var(--color-charcoal)", marginBottom: "12px" }}>
            Program Outline
          </h2>
          <p className="body-lead">
            A carefully paced sequence of plenary discussions, interactive masterclasses, and networking sessions.
          </p>
        </div>

        {/* Timeline Stack */}
        <div style={{ position: "relative", paddingLeft: "28px" }}>
          {/* Vertical Line */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              bottom: "20px",
              left: "6px",
              width: "1.5px",
              backgroundColor: "var(--color-border-default)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {SCHEDULE.map((item, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                {/* Node indicator */}
                <div
                  style={{
                    position: "absolute",
                    left: "-28px",
                    top: "4px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    backgroundColor: idx === 0 || idx === SCHEDULE.length - 1 ? "var(--color-burgundy)" : "var(--color-surface-card)",
                    border: "2px solid var(--color-burgundy)",
                  }}
                />

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "var(--color-burgundy)",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.time}
                    </span>
                    {item.speaker && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          backgroundColor: "var(--color-burgundy-surface)",
                          color: "var(--color-burgundy)",
                          padding: "2px 8px",
                          borderRadius: "var(--radius-xs)",
                        }}
                      >
                        {item.speaker}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--color-charcoal)",
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

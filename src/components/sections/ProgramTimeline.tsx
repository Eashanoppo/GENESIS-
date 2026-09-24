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
      <div className="container" style={{ maxWidth: "860px" }}>
        {/* Section Header */}
        <div style={{ marginBottom: "clamp(44px, 6vw, 68px)" }}>
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
              The Itinerary
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
            Program Outline
          </h2>

          <p className="body-lead" style={{ color: "var(--color-text-secondary)" }}>
            A carefully paced sequence of plenary discussions, interactive masterclasses, and networking sessions.
          </p>
        </div>

        {/* Vertical Event Timeline */}
        <div style={{ position: "relative" }}>
          {/* Continuous Vertical Line */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              bottom: "24px",
              left: "100px",
              width: "1.5px",
              backgroundColor: "var(--color-border-default)",
            }}
            className="timeline-rail"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {SCHEDULE.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "36px",
                  alignItems: "start",
                  position: "relative",
                }}
                className="timeline-item"
              >
                {/* Left: Time / Slot */}
                <div style={{ textAlign: "right", paddingTop: "2px" }} className="timeline-time">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "var(--color-burgundy)",
                      textTransform: "uppercase",
                      display: "block",
                    }}
                  >
                    {item.time}
                  </span>
                </div>

                {/* Central Node Indicator */}
                <div
                  style={{
                    position: "absolute",
                    left: "95px",
                    top: "7px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: idx === 0 || idx === SCHEDULE.length - 1 ? "var(--color-burgundy)" : "var(--color-surface-base)",
                    border: "2px solid var(--color-burgundy)",
                    zIndex: 2,
                  }}
                  className="timeline-node"
                />

                {/* Right: Event Title, Speaker & Description */}
                <div
                  style={{
                    paddingBottom: "24px",
                    borderBottom: idx < SCHEDULE.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "var(--color-charcoal)",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </h3>

                    {item.speaker && (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          backgroundColor: "var(--color-burgundy-surface)",
                          color: "var(--color-burgundy)",
                          padding: "2px 8px",
                          borderRadius: "var(--radius-xs)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {item.speaker}
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
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

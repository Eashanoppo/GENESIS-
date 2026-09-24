import React from "react";
import { EVENT_CONFIG } from "@/config/event";

export default function EventInfo() {
  const details = [
    {
      label: "DATE & DAY",
      primary: EVENT_CONFIG.dateDisplay,
      secondary: "Tuesday, 2026",
    },
    {
      label: "VENUE",
      primary: "ICH (International Conference Hall)",
      secondary: "AB4, 3rd Floor, Daffodil International University",
    },
    {
      label: "ORGANIZED BY",
      primary: "Rotaract Club of DIU",
      secondary: "District 3281, Bangladesh",
    },
    {
      label: "REGISTRATION TIMELINE",
      primary: "25 Oct – 01 Nov 2026",
      secondary: "Strict seat allotment / Pre-registration required",
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
        <div style={{ marginBottom: "36px" }}>
          <span className="eyebrow" style={{ marginBottom: "8px" }}>
            Essential Logistics
          </span>
          <h2 className="title-subsection" style={{ color: "var(--color-charcoal)" }}>
            GENESIS at a Glance
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {details.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: "24px",
                backgroundColor: "var(--color-surface-base)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <span className="eyebrow-muted" style={{ display: "block", marginBottom: "8px" }}>
                {item.label}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--color-charcoal)",
                  marginBottom: "4px",
                }}
              >
                {item.primary}
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                {item.secondary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

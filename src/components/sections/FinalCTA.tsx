import React from "react";
import Link from "next/link";
import { EVENT_CONFIG } from "@/config/event";

export default function FinalCTA() {
  return (
    <section
      style={{
        paddingTop: "clamp(64px, 8.5vw, 100px)",
        paddingBottom: "clamp(64px, 8.5vw, 100px)",
        backgroundColor: "var(--color-surface-base)",
        textAlign: "center",
        borderBottom: "1px solid var(--color-border-subtle)",
        position: "relative",
      }}
    >
      <div className="container" style={{ maxWidth: "780px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
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
            Reserve Your Place
          </span>
          <span
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: "var(--color-burgundy)",
              transform: "rotate(45deg)",
              display: "inline-block",
            }}
          />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-editorial)",
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 600,
            color: "var(--color-charcoal)",
            marginBottom: "12px",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
          }}
        >
          BRING YOUR CURIOSITY.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-editorial)",
            fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
            fontStyle: "italic",
            color: "var(--color-burgundy)",
            marginBottom: "36px",
            lineHeight: 1.4,
          }}
        >
          Join fellow scholars, innovators, and leaders for a day that begins a new era.
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <Link
            href="/register"
            className="btn btn-primary"
            style={{
              padding: "16px 44px",
              fontSize: "1.05rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              boxShadow: "0 6px 20px rgba(93, 18, 34, 0.2)",
            }}
          >
            Register for GENESIS →
          </Link>
        </div>

        {/* Subtle Underline Tagline */}
        <p
          style={{
            fontSize: "0.825rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            marginBottom: "12px",
          }}
        >
          Learn • Connect • Enjoy • Grow
        </p>

        <p style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
          {EVENT_CONFIG.dateDisplay} · {EVENT_CONFIG.venueShort} · Pre-registration Required
        </p>
      </div>
    </section>
  );
}

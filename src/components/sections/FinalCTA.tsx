import React from "react";
import Link from "next/link";
import { EVENT_CONFIG } from "@/config/event";

export default function FinalCTA() {
  return (
    <section
      style={{
        paddingTop: "clamp(72px, 12vw, 128px)",
        paddingBottom: "clamp(72px, 12vw, 128px)",
        backgroundColor: "var(--color-surface-base)",
        textAlign: "center",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container-narrow">
        <span className="eyebrow" style={{ marginBottom: "16px" }}>
          Reserve Your Place
        </span>

        <h2
          className="title-hero"
          style={{
            color: "var(--color-charcoal)",
            marginBottom: "16px",
            lineHeight: 1.1,
          }}
        >
          Bring Your Curiosity.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-editorial)",
            fontSize: "clamp(1.35rem, 2.5vw, 1.85rem)",
            fontStyle: "italic",
            color: "var(--color-burgundy)",
            marginBottom: "36px",
          }}
        >
          Be part of something special.
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <Link href="/register" className="btn btn-primary" style={{ padding: "16px 40px", fontSize: "1.05rem" }}>
            Register for GENESIS
          </Link>
        </div>

        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
          {EVENT_CONFIG.theme} · {EVENT_CONFIG.dateDisplay} · {EVENT_CONFIG.venueShort}
        </p>
      </div>
    </section>
  );
}

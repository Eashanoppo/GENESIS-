import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EVENT_CONFIG } from "@/config/event";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        paddingTop: "clamp(48px, 7vw, 84px)",
        paddingBottom: "clamp(56px, 8vw, 96px)",
        borderBottom: "1px solid var(--color-border-subtle)",
        overflow: "hidden",
        backgroundColor: "var(--color-surface-base)",
      }}
    >
      <div className="container">
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "clamp(36px, 5vw, 64px)",
            alignItems: "center",
          }}
        >
          {/* Left Column: Editorial Information & Action */}
          <div>
            {/* Institution Badge */}
            <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span className="eyebrow" style={{ color: "var(--color-burgundy)" }}>
                {EVENT_CONFIG.organizer}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>•</span>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                District 3281
              </span>
            </div>

            {/* Display Title */}
            <h1
              className="title-display"
              style={{
                marginBottom: "16px",
                color: "var(--color-charcoal)",
                lineHeight: 1.05,
              }}
            >
              GENESIS
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.2rem, 2.2vw, 1.75rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--color-burgundy)",
                  marginTop: "8px",
                }}
              >
                The Beginning of a New Era
              </span>
            </h1>

            {/* Theme & Tagline */}
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                backgroundColor: "var(--color-gold-subtle)",
                border: "1px solid var(--color-gold-light)",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: "var(--color-gold)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              {EVENT_CONFIG.theme}
            </div>

            {/* Lead Narrative */}
            <p
              className="body-lead"
              style={{
                fontSize: "clamp(1.025rem, 1.8vw, 1.2rem)",
                marginBottom: "32px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
              }}
            >
              A benchmark university plenary summit convening pioneering academic leadership, master communicators, and forward-looking students for a day of transformative ideas.
            </p>

            {/* Key Logistics Bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "20px",
                paddingTop: "20px",
                paddingBottom: "24px",
                borderTop: "1px solid var(--color-border-subtle)",
                borderBottom: "1px solid var(--color-border-subtle)",
                marginBottom: "32px",
              }}
            >
              <div>
                <span className="eyebrow-muted" style={{ display: "block", marginBottom: "4px", fontSize: "0.68rem" }}>
                  Date & Timing
                </span>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-charcoal)" }}>
                  {EVENT_CONFIG.dateDisplay}
                </span>
              </div>

              <div>
                <span className="eyebrow-muted" style={{ display: "block", marginBottom: "4px", fontSize: "0.68rem" }}>
                  Auditorium
                </span>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-charcoal)" }}>
                  {EVENT_CONFIG.venueShort}
                </span>
              </div>

              <div>
                <span className="eyebrow-muted" style={{ display: "block", marginBottom: "4px", fontSize: "0.68rem" }}>
                  Registration Period
                </span>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-burgundy)" }}>
                  25 Oct – 01 Nov
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}>
              <Link
                href="/register"
                className="btn btn-primary"
                style={{ padding: "14px 34px", fontSize: "1rem" }}
              >
                Register for GENESIS
              </Link>
              <a
                href="#event"
                className="btn btn-secondary"
                style={{ padding: "14px 24px", fontSize: "0.925rem" }}
              >
                Event Schedule & Highlights
              </a>
            </div>

            {/* Scarcity Note */}
            <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-burgundy)",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
                Strict venue capacity. Limited seats allocated on first-come registration.
              </span>
            </div>
          </div>

          {/* Right Column: Featured Premium Visual Showcase */}
          <div style={{ position: "relative" }}>
            {/* Luminous Glow Halo */}
            <div
              style={{
                position: "absolute",
                inset: "-8px",
                background: "radial-gradient(ellipse at center, rgba(93, 18, 34, 0.16) 0%, rgba(20, 20, 22, 0) 70%)",
                borderRadius: "var(--radius-md)",
                filter: "blur(20px)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            {/* Artwork Frame */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                border: "1.5px solid var(--color-border-strong)",
                backgroundColor: "var(--color-charcoal)",
                boxShadow: "0 24px 48px -12px rgba(20, 20, 22, 0.22)",
              }}
            >
              {/* Image Frame */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                }}
              >
                <Image
                  src="/images/genesis-artwork.png"
                  alt="GENESIS — The Beginning of a New Era official visual banner"
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 900px) 100vw, 550px"
                  style={{
                    objectFit: "cover",
                  }}
                />

                {/* Corner Tag */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    backgroundColor: "rgba(20, 20, 22, 0.85)",
                    backdropFilter: "blur(6px)",
                    color: "var(--color-warm-white)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-xs)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  Official Event Identity
                </div>
              </div>

              {/* Bottom Institutional Strip */}
              <div
                style={{
                  padding: "12px 18px",
                  backgroundColor: "var(--color-charcoal-soft)",
                  borderTop: "1px solid var(--color-border-dark)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  color: "var(--color-text-inverse-muted)",
                }}
              >
                <span>Rotary · Rotaract DIU · Daffodil International University</span>
                <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>03 NOV 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

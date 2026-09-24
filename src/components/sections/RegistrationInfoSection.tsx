import React from "react";
import Link from "next/link";

export default function RegistrationInfoSection() {
  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: "var(--color-surface-base)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "720px", marginBottom: "40px" }}>
          <span className="eyebrow" style={{ marginBottom: "12px" }}>
            Participation
          </span>
          <h2 className="title-section" style={{ color: "var(--color-charcoal)", marginBottom: "16px" }}>
            Be Part of GENESIS
          </h2>
          <p className="body-lead">
            Bring your curiosity. Reserve your seat and participate in a benchmark university-level intellectual gathering.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {/* E-Certificate Box */}
          <div
            style={{
              padding: "28px",
              backgroundColor: "var(--color-surface-card)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--color-burgundy)",
                display: "block",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              Included For All Attendees
            </span>
            <h3
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "1.45rem",
                fontWeight: 600,
                color: "var(--color-charcoal)",
                marginBottom: "8px",
              }}
            >
              Official E-Certificate
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Every registered participant who attends the event in person will receive an official verifiable digital e-certificate validating their participation.
            </p>
          </div>

          {/* Optional Package Box */}
          <div
            style={{
              padding: "28px",
              backgroundColor: "var(--color-surface-card)",
              border: "1.5px solid var(--color-burgundy)",
              borderRadius: "var(--radius-sm)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-11px",
                right: "20px",
                backgroundColor: "var(--color-burgundy)",
                color: "var(--color-warm-white)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "2px 10px",
                borderRadius: "var(--radius-xs)",
              }}
            >
              Optional Package
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--color-burgundy)",
                display: "block",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              BDT 100
            </span>
            <h3
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "1.45rem",
                fontWeight: 600,
                color: "var(--color-charcoal)",
                marginBottom: "8px",
              }}
            >
              Book, Food & Gifts
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Participants who wish to receive the official event publication, special refreshments/food, and souvenir gifts can select this optional package in the registration form.
            </p>
          </div>
        </div>

        <div>
          <Link href="/register" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: "1rem" }}>
            Proceed to Registration
          </Link>
        </div>
      </div>
    </section>
  );
}

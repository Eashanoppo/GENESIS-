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
        {/* Section Header */}
        <div style={{ maxWidth: "760px", marginBottom: "clamp(44px, 6vw, 64px)" }}>
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
              Participation Pathways
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
            Be Part of GENESIS
          </h2>

          <p className="body-lead" style={{ color: "var(--color-text-secondary)" }}>
            Select your pathway to join this benchmark university plenary summit as a participant delegate or as an affiliated club member.
          </p>
        </div>

        {/* 2 Clearly Differentiated Paths */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(28px, 4vw, 44px)",
            alignItems: "stretch",
          }}
        >
          {/* Path 1: ATTEND (Primary Action for Participants / Students) */}
          <div
            style={{
              backgroundColor: "var(--color-surface-card)",
              border: "2px solid var(--color-burgundy)",
              borderRadius: "var(--radius-sm)",
              padding: "clamp(28px, 4vw, 40px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 12px 32px -8px rgba(93, 18, 34, 0.12)",
              position: "relative",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-burgundy)",
                  }}
                >
                  PRIMARY PATHWAY
                </span>

                <span
                  style={{
                    backgroundColor: "var(--color-burgundy)",
                    color: "var(--color-warm-white)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: "var(--radius-xs)",
                  }}
                >
                  Open Registration
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "clamp(1.75rem, 2.5vw, 2.2rem)",
                  fontWeight: 600,
                  color: "var(--color-charcoal)",
                  marginBottom: "6px",
                  lineHeight: 1.2,
                }}
              >
                Attend as a Delegate
              </h3>

              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--color-burgundy)",
                  marginBottom: "16px",
                }}
              >
                For University Students, Young Scholars &amp; Guests
              </p>

              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: "24px",
                }}
              >
                Full access to keynote plenary lectures, interactive audience Q&amp;A, campus check-in kit, verified digital e-certificate, and option to select the commemorative package (Book + Food + Gifts).
              </p>

              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "var(--color-burgundy-surface)",
                  borderRadius: "var(--radius-xs)",
                  marginBottom: "32px",
                }}
              >
                <div style={{ fontSize: "0.825rem", color: "var(--color-charcoal)", fontWeight: 600 }}>
                  Guest Registration: <span style={{ color: "var(--color-burgundy)" }}>Free (BDT 0)</span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                  Optional Package: BDT 100 (Book + Refreshments + Gifts)
                </div>
              </div>
            </div>

            <Link
              href="/register"
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "16px 28px",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              <span>Register as Participant Delegate →</span>
            </Link>
          </div>

          {/* Path 2: ENGAGE (Supporting Action for Club Members & Volunteers) */}
          <div
            style={{
              backgroundColor: "var(--color-surface-card)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
              padding: "clamp(28px, 4vw, 40px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                  }}
                >
                  ORGANIZATION &amp; ALUMNI
                </span>

                <span
                  style={{
                    backgroundColor: "var(--color-surface-base)",
                    color: "var(--color-text-secondary)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: "var(--radius-xs)",
                    border: "1px solid var(--color-border-subtle)",
                  }}
                >
                  Internal Roster
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "clamp(1.75rem, 2.5vw, 2.2rem)",
                  fontWeight: 600,
                  color: "var(--color-charcoal)",
                  marginBottom: "6px",
                  lineHeight: 1.2,
                }}
              >
                Join as a Club Member
              </h3>

              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                  marginBottom: "16px",
                }}
              >
                For General Members, Board Officers &amp; Ex-Rotaractors
              </p>

              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: "24px",
                }}
              >
                Members of the Rotaract Club of DIU and esteemed alumni participate with executive duties, specialized summit credentials, reserved VIP seating, and verified alumni networking.
              </p>

              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "var(--color-surface-base)",
                  borderRadius: "var(--radius-xs)",
                  marginBottom: "32px",
                  border: "1px solid var(--color-border-subtle)",
                }}
              >
                <div style={{ fontSize: "0.825rem", color: "var(--color-charcoal)", fontWeight: 600 }}>
                  Member Tiers: <span style={{ color: "var(--color-charcoal)" }}>BDT 100 – 1000</span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                  Fee automatically calculated by executive position / status
                </div>
              </div>
            </div>

            <Link
              href="/register"
              className="btn btn-secondary"
              style={{
                width: "100%",
                padding: "16px 28px",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              <span>Member &amp; Alumni Registration →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EVENT_CONFIG } from "@/config/event";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-charcoal)",
        color: "var(--color-warm-white)",
        paddingTop: "clamp(56px, 7vw, 84px)",
        paddingBottom: "48px",
      }}
    >
      <div className="container">
        {/* 4-Column Structured Publication Footer */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(36px, 4vw, 56px)",
            marginBottom: "56px",
          }}
        >
          {/* Column 1: GENESIS Identity & Description */}
          <div style={{ maxWidth: "340px" }}>
            <span
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "1.85rem",
                fontWeight: 600,
                color: "var(--color-warm-white)",
                display: "block",
                marginBottom: "8px",
                letterSpacing: "-0.01em",
              }}
            >
              GENESIS
            </span>
            <p style={{ fontSize: "0.85rem", color: "var(--color-gold)", marginBottom: "14px", fontWeight: 600 }}>
              {EVENT_CONFIG.tagline}
            </p>
            <p style={{ fontSize: "0.84rem", color: "var(--color-text-inverse-muted)", lineHeight: 1.65 }}>
              A benchmark university plenary summit organized by the {EVENT_CONFIG.organizer}. Convening academic leadership, master communicators, and ambitious students for a transformative day of ideas.
            </p>
          </div>

          {/* Column 2: Event Navigation */}
          <div>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                display: "block",
                marginBottom: "18px",
              }}
            >
              Event
            </span>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <a href="#event" style={{ fontSize: "0.86rem", color: "var(--color-text-inverse-muted)", transition: "color var(--transition-fast)" }}>
                  Event Overview
                </a>
              </li>
              <li>
                <a href="#speakers" style={{ fontSize: "0.86rem", color: "var(--color-text-inverse-muted)", transition: "color var(--transition-fast)" }}>
                  Plenary Speakers
                </a>
              </li>
              <li>
                <a href="#experience" style={{ fontSize: "0.86rem", color: "var(--color-text-inverse-muted)", transition: "color var(--transition-fast)" }}>
                  The Experience
                </a>
              </li>
              <li>
                <a href="#faq" style={{ fontSize: "0.86rem", color: "var(--color-text-inverse-muted)", transition: "color var(--transition-fast)" }}>
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <Link href="/register" style={{ fontSize: "0.86rem", color: "var(--color-gold)", fontWeight: 600 }}>
                  Register for Summit →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Organization */}
          <div>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                display: "block",
                marginBottom: "18px",
              }}
            >
              Organization
            </span>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <a href="#club" style={{ fontSize: "0.86rem", color: "var(--color-text-inverse-muted)" }}>
                  Rotaract Club of DIU
                </a>
              </li>
              <li>
                <span style={{ fontSize: "0.86rem", color: "var(--color-text-inverse-muted)" }}>
                  Rotary District 3281
                </span>
              </li>
              <li>
                <a href="#club" style={{ fontSize: "0.86rem", color: "var(--color-text-inverse-muted)" }}>
                  Leadership &amp; Service
                </a>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  style={{
                    fontSize: "0.84rem",
                    color: "var(--color-text-inverse-muted)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Organizers Portal Login →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Venue */}
          <div>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                display: "block",
                marginBottom: "18px",
              }}
            >
              Contact &amp; Location
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.84rem", color: "var(--color-text-inverse-muted)", lineHeight: 1.6 }}>
              <div>
                <strong style={{ color: "var(--color-warm-white)", display: "block" }}>Summit Venue:</strong>
                {EVENT_CONFIG.venueFull}
              </div>
              <div>
                <strong style={{ color: "var(--color-warm-white)", display: "block" }}>Event Date:</strong>
                {EVENT_CONFIG.dateDisplay} (Tuesday)
              </div>
              <div>
                <strong style={{ color: "var(--color-warm-white)", display: "block" }}>Inquiries:</strong>
                <span>info@rotaract.org.bd</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partners & Affiliations Showcase with Consistent Dimensions */}
        <div
          style={{
            padding: "32px 0",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            marginBottom: "32px",
          }}
        >
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                display: "inline-block",
              }}
            >
              Official Partners &amp; Affiliations
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              alignItems: "stretch",
            }}
          >
            {/* Organizer */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-sm)",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                minHeight: "100px",
              }}
            >
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#6B7280",
                  marginBottom: "10px",
                }}
              >
                Organized By
              </span>
              <div style={{ position: "relative", width: "100%", height: "48px" }}>
                <Image
                  src="/partners/organizer.jpeg"
                  alt="Rotaract Club of Daffodil International University"
                  fill
                  sizes="(max-width: 768px) 100vw, 220px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Host Institution */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-sm)",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                minHeight: "100px",
              }}
            >
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#6B7280",
                  marginBottom: "10px",
                }}
              >
                Host Institution
              </span>
              <div style={{ position: "relative", width: "100%", height: "48px" }}>
                <Image
                  src="/partners/host.jpeg"
                  alt="Daffodil International University"
                  fill
                  sizes="(max-width: 768px) 100vw, 220px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Technology Partner */}
            <a
              href="https://www.unleft.space/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-sm)",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                textDecoration: "none",
                minHeight: "100px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#6B7280",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Technology Partner ↗
              </span>
              <div style={{ position: "relative", width: "100%", height: "48px" }}>
                <Image
                  src="/partners/tecnoloy_partner.png"
                  alt="UNLEFT LLC"
                  fill
                  sizes="(max-width: 768px) 100vw, 180px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid var(--color-border-dark)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            fontSize: "0.825rem",
            color: "var(--color-text-inverse-muted)",
          }}
        >
          <div>
            © 2026 {EVENT_CONFIG.organizer}. All rights reserved.
          </div>

          <div>
            Technology Partner:{" "}
            <a
              href="https://www.unleft.space/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--color-warm-white)",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              UNLEFT LLC
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import Link from "next/link";
import { EVENT_CONFIG } from "@/config/event";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-charcoal)",
        color: "var(--color-warm-white)",
        paddingTop: "64px",
        paddingBottom: "48px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "48px",
            marginBottom: "56px",
          }}
        >
          {/* Identity */}
          <div style={{ maxWidth: "360px" }}>
            <span
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "1.75rem",
                fontWeight: 600,
                color: "var(--color-warm-white)",
                display: "block",
                marginBottom: "8px",
              }}
            >
              GENESIS
            </span>
            <p style={{ fontSize: "0.85rem", color: "var(--color-cream)", marginBottom: "16px" }}>
              {EVENT_CONFIG.tagline} — {EVENT_CONFIG.theme}
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-inverse-muted)", lineHeight: 1.6 }}>
              Organized with pride by the {EVENT_CONFIG.organizer}.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Navigation
            </span>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <a href="#event" style={{ fontSize: "0.88rem", color: "var(--color-text-inverse-muted)" }}>
                  Event Overview
                </a>
              </li>
              <li>
                <a href="#speakers" style={{ fontSize: "0.88rem", color: "var(--color-text-inverse-muted)" }}>
                  Plenary Speakers
                </a>
              </li>
              <li>
                <a href="#experience" style={{ fontSize: "0.88rem", color: "var(--color-text-inverse-muted)" }}>
                  The Experience
                </a>
              </li>
              <li>
                <a href="#club" style={{ fontSize: "0.88rem", color: "var(--color-text-inverse-muted)" }}>
                  About Rotaract Club
                </a>
              </li>
              <li>
                <a href="#faq" style={{ fontSize: "0.88rem", color: "var(--color-text-inverse-muted)" }}>
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <Link href="/register" style={{ fontSize: "0.88rem", color: "var(--color-gold)" }}>
                  Registration Form →
                </Link>
              </li>
            </ul>
          </div>

          {/* Venue & System */}
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Event Destination
            </span>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-inverse-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
              {EVENT_CONFIG.venueFull}
            </p>

            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Organizers Portal
            </span>
            <Link
              href="/admin/login"
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-inverse-muted)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Admin Dashboard Login →
            </Link>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div
          style={{
            paddingTop: "32px",
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
              href={EVENT_CONFIG.partner.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--color-warm-white)",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {EVENT_CONFIG.partner.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EVENT_CONFIG } from "@/config/event";

export default function Hero() {
  return (
    <section className="genesis-hero" aria-label="GENESIS Summit 2026 Hero">
      {/* ============================================================
          Layered Atmospheric Background & Brand Geometry
          ============================================================ */}
      <div className="genesis-hero-bg" aria-hidden="true">
        {/* Deep Atmospheric Wine Blooms */}
        <div className="genesis-hero-bloom-primary" />
        <div className="genesis-hero-bloom-secondary" />

        {/* Architectural Diamond Construct (Inspired by Official Artwork) */}
        <div className="genesis-hero-diamond-outer" />
        <div className="genesis-hero-diamond-inner" />

        {/* Precision Horizontal Axis Line */}
        <div className="genesis-hero-axis-line" />

        {/* Soft Radiant Light Flare Source */}
        <div className="genesis-hero-flare" />

        {/* Lower Diamond Grid Matrix */}
        <svg
          className="genesis-hero-matrix"
          width="120"
          height="70"
          viewBox="0 0 120 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#F5C84B" opacity="0.45">
            <rect x="60" y="5" width="6" height="6" transform="rotate(45 60 5)" />
            <rect x="48" y="17" width="6" height="6" transform="rotate(45 48 17)" />
            <rect x="60" y="17" width="6" height="6" transform="rotate(45 60 17)" />
            <rect x="72" y="17" width="6" height="6" transform="rotate(45 72 17)" />
            <rect x="36" y="29" width="6" height="6" transform="rotate(45 36 29)" />
            <rect x="48" y="29" width="6" height="6" transform="rotate(45 48 29)" />
            <rect x="60" y="29" width="6" height="6" transform="rotate(45 60 29)" />
            <rect x="72" y="29" width="6" height="6" transform="rotate(45 72 29)" />
            <rect x="84" y="29" width="6" height="6" transform="rotate(45 84 29)" />
            <rect x="48" y="41" width="6" height="6" transform="rotate(45 48 41)" />
            <rect x="60" y="41" width="6" height="6" transform="rotate(45 60 41)" />
            <rect x="72" y="41" width="6" height="6" transform="rotate(45 72 41)" />
            <rect x="60" y="53" width="6" height="6" transform="rotate(45 60 53)" />
          </g>
        </svg>
      </div>

      {/* ============================================================
          Main Hero Grid: Content & Integrated Artwork
          ============================================================ */}
      <div className="container genesis-hero-container">
        <div className="genesis-hero-grid">
          {/* Left Column: Typography, Hierarchy & Logistics */}
          <div className="genesis-hero-content">
            {/* Institutional Eyebrow */}
            <div className="genesis-hero-institution">
              <span className="genesis-hero-institution-name">
                {EVENT_CONFIG.organizer}
              </span>
              <span className="genesis-hero-sep">•</span>
              <span className="genesis-hero-institution-sub">
                District 3281
              </span>
            </div>

            {/* Confident Primary Visual Anchor: GENESIS */}
            <h1 className="genesis-hero-title">
              <span className="genesis-hero-title-main">GENESIS</span>
              <span className="genesis-hero-title-sub">The Beginning of a New Era</span>
            </h1>

            {/* Editorial Tag / Theme Badge */}
            <div className="genesis-hero-tag">
              <span className="genesis-hero-tag-diamond" />
              <span>A Day of Ideas &amp; Inspiration</span>
            </div>

            {/* Event Description */}
            <p className="genesis-hero-lead">
              A benchmark university plenary summit convening pioneering academic leadership, master communicators, and forward-looking students for a day of transformative ideas.
            </p>

            {/* Clean Editorial Information Row */}
            <div className="genesis-hero-logistics">
              <div className="genesis-hero-logistics-item">
                <span className="genesis-hero-logistics-label">Date &amp; Timing</span>
                <span className="genesis-hero-logistics-value">03 November 2026</span>
              </div>

              <div className="genesis-hero-logistics-divider" />

              <div className="genesis-hero-logistics-item">
                <span className="genesis-hero-logistics-label">Venue</span>
                <span className="genesis-hero-logistics-value">ICH, Ab4 3rd Floor, DIU</span>
              </div>

              <div className="genesis-hero-logistics-divider" />

              <div className="genesis-hero-logistics-item">
                <span className="genesis-hero-logistics-label">Registration Period</span>
                <span className="genesis-hero-logistics-value accent">25 Oct – 01 Nov</span>
              </div>
            </div>

            {/* Actions: Primary & Secondary CTAs */}
            <div className="genesis-hero-ctas">
              <Link href="/register" className="genesis-hero-btn-primary">
                <span>Register for GENESIS</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#event" className="genesis-hero-btn-secondary">
                <span>Event Schedule &amp; Highlights</span>
              </a>
            </div>

            {/* Capacity Scarcity Indicator */}
            <div className="genesis-hero-scarcity">
              <span className="genesis-hero-pulse" />
              <span>Strict venue capacity. Limited seats allocated on first-come registration.</span>
            </div>
          </div>

          {/* Right Column: Integrated Official GENESIS Artwork */}
          <div className="genesis-hero-visual">
            {/* Radiant Ambient Light Aura */}
            <div className="genesis-hero-visual-glow" />

            {/* Architectural Frame with Corner Ticks */}
            <div className="genesis-hero-frame">
              {/* Corner Ticks */}
              <div className="genesis-hero-corner genesis-hero-corner-tl" />
              <div className="genesis-hero-corner genesis-hero-corner-tr" />
              <div className="genesis-hero-corner genesis-hero-corner-bl" />
              <div className="genesis-hero-corner genesis-hero-corner-br" />

              {/* Responsive Image Aspect Canvas */}
              <div className="genesis-hero-image-canvas">
                <Image
                  src="/images/genesis-artwork.png"
                  alt="GENESIS — The Beginning of a New Era official visual banner"
                  fill
                  priority
                  quality={75}
                  sizes="(max-width: 992px) 100vw, 580px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Provenance Footer Strip */}
              <div className="genesis-hero-provenance">
                <span className="genesis-hero-provenance-text">
                  Rotary · Rotaract DIU · Daffodil International University
                </span>
                <span className="genesis-hero-provenance-badge">
                  ✦ 03 NOV 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

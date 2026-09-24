"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  const navLinks = [
    { label: "Event", href: "#event" },
    { label: "Speakers", href: "#speakers" },
    { label: "Experience", href: "#experience" },
    { label: "About Club", href: "#club" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: scrolled ? "rgba(252, 250, 247, 0.94)" : "var(--color-surface-base)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: "1px solid",
          borderColor: scrolled ? "var(--color-border-subtle)" : "transparent",
          transition: "all var(--transition-normal)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* Brand Identity */}
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "1.5rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--color-burgundy)",
                lineHeight: 1.1,
              }}
            >
              GENESIS
            </span>
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
              }}
            >
              Rotaract Club of DIU
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
            className="desktop-nav"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                  transition: "color var(--transition-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-burgundy)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions & Mobile Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/register" className="btn btn-primary" style={{ fontSize: "0.875rem", padding: "9px 20px" }}>
              Register Now
            </Link>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle"
              style={{
                display: "none",
                padding: "8px",
                color: "var(--color-charcoal)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            backgroundColor: "rgba(20, 20, 22, 0.4)",
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        style={{
          position: "fixed",
          top: "72px",
          left: 0,
          right: 0,
          zIndex: 45,
          backgroundColor: "var(--color-surface-base)",
          borderBottom: "1px solid var(--color-border-default)",
          padding: "24px 20px 32px",
          display: mobileOpen ? "block" : "none",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "1.1rem",
                fontWeight: 500,
                color: "var(--color-text-primary)",
                paddingBottom: "8px",
                borderBottom: "1px solid var(--color-border-subtle)",
              }}
            >
              {item.label}
            </a>
          ))}
          <div style={{ paddingTop: "12px" }}>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Register for GENESIS
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          :global(.desktop-nav) {
            display: none !important;
          }
          :global(.mobile-toggle) {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

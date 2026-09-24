"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't render admin navigation on the login screen
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      window.location.href = "/admin/login";
    } catch {
      window.location.href = "/admin/login";
    }
  };

  const navLinks = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "All Registrations", href: "/admin/registrations" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color-surface-base)" }}>
      {/* Desktop Sidebar */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "var(--color-charcoal)",
          color: "var(--color-warm-white)",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
        className="admin-sidebar"
      >
        {/* Brand */}
        <div style={{ marginBottom: "32px", paddingLeft: "12px" }}>
          <span
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "1.45rem",
              fontWeight: 600,
              color: "var(--color-warm-white)",
              display: "block",
            }}
          >
            GENESIS Admin
          </span>
          <span style={{ fontSize: "0.7rem", color: "var(--color-text-inverse-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Event Operations
          </span>
        </div>

        {/* Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: isActive ? "var(--color-warm-white)" : "var(--color-text-inverse-muted)",
                  backgroundColor: isActive ? "var(--color-charcoal-soft)" : "transparent",
                  borderLeft: isActive ? "3px solid var(--color-gold)" : "3px solid transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div style={{ paddingTop: "20px", borderTop: "1px solid var(--color-border-dark)", display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link
            href="/"
            target="_blank"
            style={{
              fontSize: "0.825rem",
              color: "var(--color-text-inverse-muted)",
              padding: "8px 12px",
            }}
          >
            View Public Site ↗
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: "10px 14px",
              textAlign: "left",
              fontSize: "0.875rem",
              color: "#F5B0B0",
              fontWeight: 500,
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Header */}
        <header
          style={{
            height: "64px",
            backgroundColor: "var(--color-surface-card)",
            borderBottom: "1px solid var(--color-border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: "none", padding: "6px" }}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>
              Rotaract Club of DIU · GENESIS 2026 Management
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
              Admin Session Active
            </span>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: "var(--color-charcoal)",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: "var(--color-warm-white)",
                  padding: "8px 0",
                  fontSize: "0.95rem",
                }}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              style={{
                color: "#F5B0B0",
                textAlign: "left",
                padding: "8px 0",
                fontSize: "0.9rem",
              }}
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Page Content Body */}
        <main style={{ flex: 1, padding: "clamp(20px, 3vw, 36px)", overflowX: "auto" }}>
          {children}
        </main>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.admin-sidebar) {
            display: none !important;
          }
          :global(.admin-mobile-toggle) {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

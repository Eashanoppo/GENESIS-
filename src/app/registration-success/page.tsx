"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/sections/Footer";

function SuccessContent() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "GEN-2026-XXXXX";
  const name = searchParams.get("name") || "Valued Participant";
  const type = searchParams.get("type") || "guest";
  const category = searchParams.get("category") || "guest";
  const position = searchParams.get("position");
  const amount = searchParams.get("amount") || "0";
  const method = searchParams.get("method") || "bKash";
  const status = searchParams.get("status") || "pending";

  const categoryLabel =
    type === "guest"
      ? "Guest Participant"
      : category === "general"
      ? "Club Member — General Member"
      : category === "board"
      ? `Club Member — Board (${position || "Executive"})`
      : "Club Member — Ex-Rotaractor";

  return (
    <div style={{ maxWidth: "620px", margin: "0 auto" }}>
      <div
        className="card-editorial"
        style={{
          padding: "clamp(28px, 6vw, 48px)",
          backgroundColor: "var(--color-surface-card)",
          border: "1.5px solid var(--color-border-default)",
          borderRadius: "var(--radius-sm)",
          textAlign: "center",
        }}
      >
        {/* Verification Checkmark */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "var(--color-burgundy-surface)",
            color: "var(--color-burgundy)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.75rem",
            margin: "0 auto 20px",
          }}
        >
          ✓
        </div>

        <span className="eyebrow" style={{ color: "var(--color-burgundy)", marginBottom: "8px" }}>
          Confirmation Receipt
        </span>
        <h1
          style={{
            fontFamily: "var(--font-editorial)",
            fontSize: "clamp(2rem, 4vw, 2.5rem)",
            color: "var(--color-charcoal)",
            marginBottom: "8px",
            lineHeight: 1.15,
          }}
        >
          Registration Confirmed
        </h1>
        <p className="body-default" style={{ marginBottom: "32px" }}>
          Thank you for registering for GENESIS. Your registration record has been securely recorded.
        </p>

        {/* Highlighted Registration ID */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "var(--color-surface-base)",
            border: "1.5px dashed var(--color-border-strong)",
            borderRadius: "var(--radius-sm)",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-muted)", display: "block", marginBottom: "4px" }}>
            Official Registration ID
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.65rem",
              fontWeight: 700,
              color: "var(--color-burgundy)",
              letterSpacing: "0.06em",
            }}
          >
            {id}
          </span>
        </div>

        {/* Details Table */}
        <div
          style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            borderTop: "1px solid var(--color-border-subtle)",
            borderBottom: "1px solid var(--color-border-subtle)",
            paddingTop: "20px",
            paddingBottom: "20px",
            marginBottom: "32px",
            fontSize: "0.925rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Name</span>
            <span style={{ fontWeight: 600, color: "var(--color-charcoal)" }}>{name}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Category</span>
            <span style={{ fontWeight: 600, color: "var(--color-charcoal)" }}>{categoryLabel}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Payment Method</span>
            <span style={{ fontWeight: 600, color: "var(--color-charcoal)", textTransform: "uppercase" }}>
              {method}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Total Fee</span>
            <span style={{ fontWeight: 700, color: "var(--color-charcoal)" }}>BDT {amount}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Status</span>
            <span
              className={status === "verified" ? "badge badge-verified" : "badge badge-pending"}
            >
              {status === "verified" ? "Confirmed & Verified" : "Pending Verification"}
            </span>
          </div>
        </div>

        <p style={{ fontSize: "0.825rem", color: "var(--color-text-muted)", marginBottom: "28px", lineHeight: 1.5 }}>
          Please take a screenshot of this page or note down your Registration ID. You will need it during event check-in at ICH, Daffodil International University on 03 November 2026.
        </p>

        {/* CTA */}
        <Link href="/" className="btn btn-secondary" style={{ width: "100%", padding: "14px" }}>
          Return to Event Homepage
        </Link>
      </div>
    </div>
  );
}

export default function RegistrationSuccessPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: "clamp(36px, 6vw, 64px)", paddingBottom: "clamp(56px, 8vw, 96px)" }}>
        <div className="container">
          <Suspense fallback={<div style={{ textAlign: "center", padding: "48px" }}>Loading confirmation...</div>}>
            <SuccessContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

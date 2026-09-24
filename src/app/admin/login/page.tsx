"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Invalid administrator credentials.");
        setLoading(false);
        return;
      }

      // Hard redirect to ensure auth cookies are included in the subsequent document request
      window.location.href = "/admin/dashboard";
    } catch {
      setErrorMsg("Failed to connect to authentication service.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-surface-base)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "2rem",
                fontWeight: 600,
                color: "var(--color-burgundy)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              GENESIS
            </span>
          </Link>
          <span className="eyebrow" style={{ color: "var(--color-text-muted)" }}>
            Organizing Committee Admin Portal
          </span>
        </div>

        {/* Login Card */}
        <div
          className="card-editorial"
          style={{
            padding: "32px",
            backgroundColor: "var(--color-surface-card)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "20px" }}>
            Sign In to Dashboard
          </h1>

          {errorMsg && (
            <div
              style={{
                padding: "12px",
                backgroundColor: "var(--color-danger-bg)",
                border: "1px solid var(--color-danger-border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--color-danger)",
                fontSize: "0.85rem",
                marginBottom: "20px",
              }}
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Admin ID / Email</label>
              <input
                type="text"
                className="form-input"
                placeholder="252-35-242.admin56@diu.edu.bd"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px" }}
            >
              {loading ? "Authenticating..." : "Sign In to Admin Portal"}
            </button>
          </form>
        </div>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link href="/" style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

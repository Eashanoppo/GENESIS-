"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      // Hard redirect to ensure auth cookies are recognized in subsequent navigation
      window.location.href = "/admin/dashboard";
    } catch {
      setErrorMsg("Failed to connect to authentication service. Please check your network.");
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
                lineHeight: "1.4",
              }}
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="on">
            <div className="form-group">
              <label htmlFor="admin-identifier" className="form-label">
                Admin ID / Email
              </label>
              <input
                id="admin-identifier"
                type="text"
                className="form-input"
                placeholder="Enter Admin ID or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label htmlFor="admin-password" className="form-label">
                Password
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: "44px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "6px",
                    color: "var(--color-text-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {showPassword ? (
                    // Eye-off icon
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    // Eye icon
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: "14px",
                      height: "14px",
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <span>Authenticating...</span>
                </>
              ) : (
                "Sign In to Admin Portal"
              )}
            </button>
          </form>
        </div>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link href="/" style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
            ← Return to Public Website
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

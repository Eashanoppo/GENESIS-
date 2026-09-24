"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Registration } from "@/types/registration";

interface DashboardStats {
  total: number;
  guests: number;
  clubMembers: number;
  generalMembers: number;
  boardMembers: number;
  exRotaractors: number;
  pendingPayments: number;
  verifiedPayments: number;
  rejectedPayments: number;
  attended: number;
  optionalPackages: number;
  totalRevenue: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recent, setRecent] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/registrations")
      .then((res) => {
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.success) {
          setStats(data.stats);
          setRecent(data.data.slice(0, 8));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading dashboard analytics...</div>;
  }

  const statCards = [
    { label: "Total Registrations", value: stats?.total ?? 0, highlight: false },
    { label: "Verified Attendees", value: stats?.verifiedPayments ?? 0, highlight: true },
    { label: "Pending Payments", value: stats?.pendingPayments ?? 0, highlight: false },
    { label: "Total Revenue", value: `BDT ${stats?.totalRevenue?.toLocaleString() ?? 0}`, highlight: true },
    { label: "Guests", value: stats?.guests ?? 0, highlight: false },
    { label: "Club Members", value: stats?.clubMembers ?? 0, highlight: false },
    { label: "Board Members", value: stats?.boardMembers ?? 0, highlight: false },
    { label: "Optional Packages", value: stats?.optionalPackages ?? 0, highlight: false },
  ];

  return (
    <div>
      {/* Title & Top Action */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600, color: "var(--color-charcoal)" }}>
            Overview Dashboard
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            Real-time participant counts, payment verifications, and financial totals for GENESIS 2026.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <a href="/api/admin/export" className="btn btn-secondary" style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
            📥 Download Excel
          </a>
          <Link href="/admin/registrations" className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
            View All Registrations
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "36px",
        }}
      >
        {statCards.map((card, idx) => (
          <div
            key={idx}
            style={{
              padding: "20px",
              backgroundColor: "var(--color-surface-card)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-muted)", display: "block", marginBottom: "8px" }}>
              {card.label}
            </span>
            <div
              style={{
                fontSize: "1.65rem",
                fontWeight: 700,
                color: card.highlight ? "var(--color-burgundy)" : "var(--color-charcoal)",
              }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Registrations Table */}
      <div
        style={{
          backgroundColor: "var(--color-surface-card)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: "24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--color-charcoal)" }}>
            Recent Registrations
          </h2>
          <Link href="/admin/registrations" style={{ fontSize: "0.85rem", color: "var(--color-burgundy)", fontWeight: 600 }}>
            See All →
          </Link>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1.5px solid var(--color-border-default)", color: "var(--color-text-muted)", fontSize: "0.78rem", textTransform: "uppercase" }}>
                <th style={{ padding: "10px 12px" }}>Reg ID</th>
                <th style={{ padding: "10px 12px" }}>Name</th>
                <th style={{ padding: "10px 12px" }}>Type / Role</th>
                <th style={{ padding: "10px 12px" }}>Payment</th>
                <th style={{ padding: "10px 12px" }}>Amount</th>
                <th style={{ padding: "10px 12px" }}>Status</th>
                <th style={{ padding: "10px 12px", textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "24px", textAlign: "center", color: "var(--color-text-muted)" }}>
                    No registrations recorded yet.
                  </td>
                </tr>
              ) : (
                recent.map((row) => (
                  <tr key={row.id} style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                    <td style={{ padding: "12px", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                      {row.registration_id}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ fontWeight: 600, color: "var(--color-charcoal)" }}>{row.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>{row.student_id}</div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      {row.participant_type === "guest"
                        ? "Guest"
                        : row.member_type === "board"
                        ? `Board (${row.position_custom || row.position})`
                        : row.member_type === "general"
                        ? "General Member"
                        : "Ex-Rotaractor"}
                    </td>
                    <td style={{ padding: "12px", textTransform: "uppercase", fontSize: "0.8rem" }}>
                      {row.payment_method}
                    </td>
                    <td style={{ padding: "12px", fontWeight: 600 }}>BDT {row.total_amount}</td>
                    <td style={{ padding: "12px" }}>
                      <span
                        className={
                          row.payment_status === "verified"
                            ? "badge badge-verified"
                            : row.payment_status === "rejected"
                            ? "badge badge-rejected"
                            : "badge badge-pending"
                        }
                      >
                        {row.payment_status}
                      </span>
                    </td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      <Link
                        href={`/admin/registrations/${row.registration_id}`}
                        style={{ fontSize: "0.825rem", color: "var(--color-burgundy)", fontWeight: 600 }}
                      >
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

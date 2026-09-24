"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { Registration, PaymentStatus, AttendanceStatus } from "@/types/registration";

export default function RegistrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchRecord = () => {
    setLoading(true);
    fetch(`/api/admin/registrations/${id}`)
      .then((res) => {
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.success) {
          setRegistration(data.data);
          setNotes(data.data.payment_notes || "");
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecord();
  }, [id]);

  const updateStatus = async (payment_status?: PaymentStatus, attendance_status?: AttendanceStatus) => {
    setUpdating(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_status,
          attendance_status,
          payment_notes: notes.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setRegistration(data.data);
        setFeedbackMsg({ type: "success", text: "Registration record updated successfully." });
      } else {
        setFeedbackMsg({ type: "error", text: data.error || "Update failed." });
      }
    } catch {
      setFeedbackMsg({ type: "error", text: "Connection error while updating status." });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "48px", textAlign: "center" }}>Loading participant details...</div>;
  }

  if (!registration) {
    return (
      <div style={{ padding: "48px", textAlign: "center" }}>
        <h2>Registration Not Found</h2>
        <p style={{ color: "var(--color-text-muted)", marginTop: "8px" }}>
          No registration record matching identifier: <strong>{id}</strong>
        </p>
        <Link href="/admin/registrations" className="btn btn-secondary" style={{ marginTop: "20px" }}>
          ← Back to All Registrations
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px" }}>
      {/* Top Breadcrumb */}
      <div style={{ marginBottom: "20px" }}>
        <Link
          href="/admin/registrations"
          style={{ fontSize: "0.85rem", color: "var(--color-burgundy)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          ← Back to Registry Table
        </Link>
      </div>

      {/* Main Title & Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--color-burgundy)", marginBottom: "4px" }}>
            Participant Dossier
          </span>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 600, color: "var(--color-charcoal)" }}>
            {registration.name}
          </h1>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--color-text-muted)" }}>
            {registration.registration_id}
          </span>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span
            className={
              registration.payment_status === "verified"
                ? "badge badge-verified"
                : registration.payment_status === "rejected"
                ? "badge badge-rejected"
                : "badge badge-pending"
            }
            style={{ fontSize: "0.85rem", padding: "6px 14px" }}
          >
            Payment: {registration.payment_status}
          </span>

          <span
            className={
              registration.attendance_status === "attended"
                ? "badge badge-attended"
                : registration.attendance_status === "absent"
                ? "badge badge-absent"
                : "badge"
            }
            style={{
              fontSize: "0.85rem",
              padding: "6px 14px",
              backgroundColor: registration.attendance_status === "not_marked" ? "var(--color-warm-white-dim)" : undefined,
              color: registration.attendance_status === "not_marked" ? "var(--color-text-muted)" : undefined,
            }}
          >
            Attendance: {registration.attendance_status === "not_marked" ? "Not Marked" : registration.attendance_status}
          </span>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedbackMsg && (
        <div
          style={{
            padding: "14px 18px",
            borderRadius: "var(--radius-sm)",
            marginBottom: "24px",
            fontSize: "0.9rem",
            backgroundColor: feedbackMsg.type === "success" ? "var(--color-success-bg)" : "var(--color-danger-bg)",
            color: feedbackMsg.type === "success" ? "var(--color-success)" : "var(--color-danger)",
            border: `1px solid ${feedbackMsg.type === "success" ? "var(--color-success-border)" : "var(--color-danger-border)"}`,
          }}
        >
          {feedbackMsg.text}
        </div>
      )}

      {/* Grid of Sections */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        {/* Profile Card */}
        <div className="card-editorial" style={{ backgroundColor: "var(--color-surface-card)" }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid var(--color-border-subtle)" }}>
            Personal & Academic Information
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Student ID / Member ID:</span>
              <span style={{ fontWeight: 600 }}>{registration.student_id}</span>
            </div>
            {registration.department && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-muted)" }}>Department:</span>
                <span style={{ fontWeight: 600, color: "var(--color-burgundy)" }}>{registration.department}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Email Address:</span>
              <span style={{ fontWeight: 600 }}>{registration.email}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Contact Number:</span>
              <span style={{ fontWeight: 600 }}>{registration.contact_number}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Registration Date:</span>
              <span>{new Date(registration.created_at).toLocaleString("en-GB")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Referral Source:</span>
              <span>
                {registration.referral_source}
                {registration.referral_other && ` (${registration.referral_other})`}
              </span>
            </div>
          </div>
        </div>

        {/* Category & Role Details */}
        <div className="card-editorial" style={{ backgroundColor: "var(--color-surface-card)" }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid var(--color-border-subtle)" }}>
            Registration Category & Affiliation
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Participant Type:</span>
              <span style={{ fontWeight: 600, textTransform: "capitalize" }}>{registration.participant_type}</span>
            </div>
            {registration.member_type && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-muted)" }}>Member Type:</span>
                <span style={{ fontWeight: 600, textTransform: "capitalize" }}>
                  {registration.member_type.replace("_", " ")}
                </span>
              </div>
            )}
            {(registration.position || registration.position_custom) && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-muted)" }}>Executive Position:</span>
                <span style={{ fontWeight: 600, color: "var(--color-burgundy)" }}>
                  {registration.position_custom || registration.position}
                </span>
              </div>
            )}
            {registration.club_name && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-muted)" }}>Affiliated Club:</span>
                <span style={{ fontWeight: 600 }}>{registration.club_name}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Optional Package:</span>
              <span style={{ fontWeight: 600, color: registration.package_selected ? "var(--color-burgundy)" : "inherit" }}>
                {registration.package_selected ? "Yes (Book + Food + Gifts)" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Operations Control Panel */}
      <div
        className="card-editorial"
        style={{
          padding: "28px",
          backgroundColor: "var(--color-surface-card)",
          border: "1.5px solid var(--color-border-default)",
          marginBottom: "32px",
        }}
      >
        <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "20px" }}>
          Payment Verification & Actions
        </h2>

        {/* Financial Breakdown */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            padding: "16px",
            backgroundColor: "var(--color-surface-base)",
            borderRadius: "var(--radius-sm)",
            marginBottom: "24px",
          }}
        >
          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
              Base Registration
            </span>
            <div style={{ fontSize: "1.15rem", fontWeight: 700 }}>BDT {registration.registration_fee}</div>
          </div>

          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
              Package Fee
            </span>
            <div style={{ fontSize: "1.15rem", fontWeight: 700 }}>BDT {registration.package_fee}</div>
          </div>

          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
              Total Payable
            </span>
            <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--color-burgundy)" }}>
              BDT {registration.total_amount}
            </div>
          </div>

          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
              Payment Method
            </span>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, textTransform: "uppercase" }}>
              {registration.payment_method}
            </div>
          </div>

          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
              Transaction ID
            </span>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
              {registration.transaction_id || "None / Free"}
            </div>
          </div>
        </div>

        {/* Status Actions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-charcoal)", marginRight: "8px" }}>
            Set Payment Status:
          </span>

          <button
            type="button"
            disabled={updating || registration.payment_status === "verified"}
            onClick={() => updateStatus("verified")}
            className="btn"
            style={{
              backgroundColor: "var(--color-success)",
              color: "#FFF",
              fontSize: "0.85rem",
              padding: "8px 18px",
            }}
          >
            ✓ Mark as Verified
          </button>

          <button
            type="button"
            disabled={updating || registration.payment_status === "pending"}
            onClick={() => updateStatus("pending")}
            className="btn btn-secondary"
            style={{ fontSize: "0.85rem", padding: "8px 18px" }}
          >
            Set as Pending
          </button>

          <button
            type="button"
            disabled={updating || registration.payment_status === "rejected"}
            onClick={() => updateStatus("rejected")}
            className="btn"
            style={{
              backgroundColor: "var(--color-danger)",
              color: "#FFF",
              fontSize: "0.85rem",
              padding: "8px 18px",
            }}
          >
            ✕ Mark as Rejected
          </button>
        </div>

        {/* Attendance Toggle */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "24px" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-charcoal)", marginRight: "8px" }}>
            Event Attendance:
          </span>

          <button
            type="button"
            disabled={updating}
            onClick={() => updateStatus(undefined, "attended")}
            className="btn"
            style={{
              backgroundColor: registration.attendance_status === "attended" ? "var(--color-diu-blue)" : "var(--color-surface-base)",
              color: registration.attendance_status === "attended" ? "#FFF" : "var(--color-text-primary)",
              border: "1px solid var(--color-border-default)",
              fontSize: "0.85rem",
              padding: "6px 14px",
            }}
          >
            Mark Attended
          </button>

          <button
            type="button"
            disabled={updating}
            onClick={() => updateStatus(undefined, "absent")}
            className="btn"
            style={{
              backgroundColor: registration.attendance_status === "absent" ? "var(--color-charcoal)" : "var(--color-surface-base)",
              color: registration.attendance_status === "absent" ? "#FFF" : "var(--color-text-primary)",
              border: "1px solid var(--color-border-default)",
              fontSize: "0.85rem",
              padding: "6px 14px",
            }}
          >
            Mark Absent
          </button>

          <button
            type="button"
            disabled={updating}
            onClick={() => updateStatus(undefined, "not_marked")}
            className="btn"
            style={{
              backgroundColor: "var(--color-surface-base)",
              color: "var(--color-text-muted)",
              border: "1px solid var(--color-border-default)",
              fontSize: "0.85rem",
              padding: "6px 14px",
            }}
          >
            Reset
          </button>
        </div>

        {/* Admin Notes */}
        <div>
          <label className="form-label" style={{ marginBottom: "6px" }}>
            Admin Notes / Rejection Reason
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. bKash received from 017XXXXX on 26/10"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ flex: 1, minHeight: "40px" }}
            />
            <button
              type="button"
              disabled={updating}
              onClick={() => updateStatus(registration.payment_status, registration.attendance_status)}
              className="btn btn-secondary"
              style={{ minHeight: "40px", padding: "0 18px", fontSize: "0.85rem" }}
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

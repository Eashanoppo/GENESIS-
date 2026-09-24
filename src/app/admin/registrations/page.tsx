"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Registration } from "@/types/registration";

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState("");
  const [participantType, setParticipantType] = useState("all");
  const [memberType, setMemberType] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [attendanceStatus, setAttendanceStatus] = useState("all");
  const [packageSelected, setPackageSelected] = useState("all");

  const fetchRecords = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (participantType !== "all") params.set("participant_type", participantType);
    if (memberType !== "all") params.set("member_type", memberType);
    if (paymentStatus !== "all") params.set("payment_status", paymentStatus);
    if (attendanceStatus !== "all") params.set("attendance_status", attendanceStatus);
    if (packageSelected !== "all") params.set("package_selected", packageSelected);

    fetch(`/api/admin/registrations?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRegistrations(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecords();
  }, [participantType, memberType, paymentStatus, attendanceStatus, packageSelected]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecords();
  };

  // Build the export URL reflecting active filters
  const exportParams = new URLSearchParams();
  if (search.trim()) exportParams.set("search", search.trim());
  if (participantType !== "all") exportParams.set("participant_type", participantType);
  if (memberType !== "all") exportParams.set("member_type", memberType);
  if (paymentStatus !== "all") exportParams.set("payment_status", paymentStatus);
  if (attendanceStatus !== "all") exportParams.set("attendance_status", attendanceStatus);
  if (packageSelected !== "all") exportParams.set("package_selected", packageSelected);

  const exportUrl = `/api/admin/export?${exportParams.toString()}`;

  return (
    <div>
      {/* Title & Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600, color: "var(--color-charcoal)" }}>
            Registrations Registry
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            Search, filter, verify payments, track attendance, and export Excel records.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <a href={exportUrl} className="btn btn-secondary" style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
            📥 Export Filtered Excel
          </a>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "var(--color-surface-card)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-sm)",
          marginBottom: "24px",
        }}
      >
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by name, student ID, email, transaction ID, or registration ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minHeight: "40px", fontSize: "0.88rem" }}
          />
          <button type="submit" className="btn btn-dark" style={{ minHeight: "40px", padding: "0 20px", fontSize: "0.88rem" }}>
            Search
          </button>
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setTimeout(fetchRecords, 50);
              }}
              className="btn btn-secondary"
              style={{ minHeight: "40px", padding: "0 14px", fontSize: "0.85rem" }}
            >
              Clear
            </button>
          )}
        </form>

        {/* Filter Dropdowns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginBottom: "4px" }}>
              Type
            </label>
            <select
              className="form-select"
              value={participantType}
              onChange={(e) => setParticipantType(e.target.value)}
              style={{ minHeight: "36px", padding: "6px 10px", fontSize: "0.825rem" }}
            >
              <option value="all">All Types</option>
              <option value="guest">Guest</option>
              <option value="club_member">Club Member</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginBottom: "4px" }}>
              Member Category
            </label>
            <select
              className="form-select"
              value={memberType}
              onChange={(e) => setMemberType(e.target.value)}
              style={{ minHeight: "36px", padding: "6px 10px", fontSize: "0.825rem" }}
            >
              <option value="all">All Categories</option>
              <option value="general">General Member</option>
              <option value="board">Board Member</option>
              <option value="ex_rotaractor">Ex-Rotaractor</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginBottom: "4px" }}>
              Payment Status
            </label>
            <select
              className="form-select"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              style={{ minHeight: "36px", padding: "6px 10px", fontSize: "0.825rem" }}
            >
              <option value="all">All Payment Statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginBottom: "4px" }}>
              Attendance
            </label>
            <select
              className="form-select"
              value={attendanceStatus}
              onChange={(e) => setAttendanceStatus(e.target.value)}
              style={{ minHeight: "36px", padding: "6px 10px", fontSize: "0.825rem" }}
            >
              <option value="all">All Attendance</option>
              <option value="not_marked">Not Marked</option>
              <option value="attended">Attended</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block", marginBottom: "4px" }}>
              Optional Package
            </label>
            <select
              className="form-select"
              value={packageSelected}
              onChange={(e) => setPackageSelected(e.target.value)}
              style={{ minHeight: "36px", padding: "6px 10px", fontSize: "0.825rem" }}
            >
              <option value="all">All</option>
              <option value="true">With Package</option>
              <option value="false">Without Package</option>
            </select>
          </div>
        </div>
      </div>

      {/* Registrations Data Table */}
      <div
        style={{
          backgroundColor: "var(--color-surface-card)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: "16px 20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
            Showing <strong>{registrations.length}</strong> matching records
          </span>
        </div>

        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>Refreshing registration records...</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1.5px solid var(--color-border-default)", color: "var(--color-text-muted)", fontSize: "0.75rem", textTransform: "uppercase" }}>
                  <th style={{ padding: "10px 8px" }}>ID</th>
                  <th style={{ padding: "10px 8px" }}>Participant</th>
                  <th style={{ padding: "10px 8px" }}>Contact</th>
                  <th style={{ padding: "10px 8px" }}>Type / Role</th>
                  <th style={{ padding: "10px 8px" }}>Payment</th>
                  <th style={{ padding: "10px 8px" }}>Amount</th>
                  <th style={{ padding: "10px 8px" }}>Payment Status</th>
                  <th style={{ padding: "10px 8px" }}>Attendance</th>
                  <th style={{ padding: "10px 8px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: "32px", textAlign: "center", color: "var(--color-text-muted)" }}>
                      No matching registrations found for the selected criteria.
                    </td>
                  </tr>
                ) : (
                  registrations.map((r) => (
                    <tr key={r.id} style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                      <td style={{ padding: "10px 8px", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                        {r.registration_id}
                      </td>
                      <td style={{ padding: "10px 8px" }}>
                        <div style={{ fontWeight: 600, color: "var(--color-charcoal)" }}>{r.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>ID: {r.student_id}</div>
                      </td>
                      <td style={{ padding: "10px 8px" }}>
                        <div>{r.email}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{r.contact_number}</div>
                      </td>
                      <td style={{ padding: "10px 8px" }}>
                        {r.participant_type === "guest"
                          ? "Guest"
                          : r.member_type === "board"
                          ? `Board (${r.position_custom || r.position})`
                          : r.member_type === "general"
                          ? "General Member"
                          : `Ex-Rotaractor (${r.club_name || "DIU"})`}
                      </td>
                      <td style={{ padding: "10px 8px" }}>
                        <div style={{ textTransform: "uppercase", fontSize: "0.78rem" }}>{r.payment_method}</div>
                        {r.transaction_id && (
                          <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                            TX: {r.transaction_id}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "10px 8px", fontWeight: 600 }}>
                        BDT {r.total_amount}
                        {r.package_selected && (
                          <span style={{ fontSize: "0.7rem", color: "var(--color-burgundy)", display: "block" }}>
                            + Package
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "10px 8px" }}>
                        <span
                          className={
                            r.payment_status === "verified"
                              ? "badge badge-verified"
                              : r.payment_status === "rejected"
                              ? "badge badge-rejected"
                              : "badge badge-pending"
                          }
                        >
                          {r.payment_status}
                        </span>
                      </td>
                      <td style={{ padding: "10px 8px" }}>
                        <span
                          className={
                            r.attendance_status === "attended"
                              ? "badge badge-attended"
                              : r.attendance_status === "absent"
                              ? "badge badge-absent"
                              : "badge"
                          }
                          style={{
                            backgroundColor: r.attendance_status === "not_marked" ? "var(--color-warm-white-dim)" : undefined,
                            color: r.attendance_status === "not_marked" ? "var(--color-text-muted)" : undefined,
                          }}
                        >
                          {r.attendance_status === "not_marked" ? "Not Marked" : r.attendance_status}
                        </span>
                      </td>
                      <td style={{ padding: "10px 8px", textAlign: "right" }}>
                        <Link
                          href={`/admin/registrations/${r.registration_id}`}
                          className="btn btn-secondary"
                          style={{ fontSize: "0.75rem", padding: "4px 10px", minHeight: "auto" }}
                        >
                          Details →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

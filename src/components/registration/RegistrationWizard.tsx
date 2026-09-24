"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ParticipantType, MemberType, BoardPosition, PaymentMethod } from "@/types/registration";
import { EVENT_CONFIG } from "@/config/event";

export default function RegistrationWizard() {
  const router = useRouter();

  // Wizard state
  const [participantType, setParticipantType] = useState<ParticipantType | null>(null);
  const [memberType, setMemberType] = useState<MemberType | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [clubName, setClubName] = useState("");
  const [referralSource, setReferralSource] = useState("Facebook");
  const [referralOther, setReferralOther] = useState("");

  // Board Specific
  const [boardPosition, setBoardPosition] = useState<BoardPosition>("Secretary");
  const [positionCustom, setPositionCustom] = useState("");

  // Package & Payment
  const [packageSelected, setPackageSelected] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bkash");
  const [transactionId, setTransactionId] = useState("");

  // UI status
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Dynamic fee calculation for client preview (authoritative validation is on server)
  const calculateClientTotal = () => {
    let base = 0;
    if (participantType === "guest") {
      base = 0;
    } else if (participantType === "club_member") {
      if (memberType === "general") {
        base = 100;
      } else if (memberType === "ex_rotaractor") {
        base = 1000;
      } else if (memberType === "board") {
        if (boardPosition === "IPP") base = 1000;
        else if (
          boardPosition === "President" ||
          boardPosition === "Vice President" ||
          boardPosition === "Secretary" ||
          boardPosition === "Joint Secretary"
        ) {
          base = 500;
        } else {
          base = 300; // Treasurer, Directors, Other
        }
      }
    }
    const packageFee = packageSelected ? 100 : 0;
    return { base, packageFee, total: base + packageFee };
  };

  const { base: baseFee, packageFee, total: totalFee } = calculateClientTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic frontend validations
    if (!name.trim()) return setErrorMsg("Please enter your full name.");
    if (!studentId.trim()) return setErrorMsg("Please enter your student / member ID.");
    if (participantType === "guest" && !department.trim()) {
      return setErrorMsg("Please enter your academic department.");
    }
    if (!email.trim() || !email.includes("@")) return setErrorMsg("Please provide a valid email address.");
    if (!contactNumber.trim() || contactNumber.length < 10) {
      return setErrorMsg("Please enter a valid mobile number (e.g. 01712345678).");
    }

    if (totalFee > 0 && !transactionId.trim()) {
      return setErrorMsg("Transaction ID / Reference Number is required for this registration.");
    }

    if (participantType === "guest" && referralSource === "Other" && !referralOther.trim()) {
      return setErrorMsg("Please specify how you heard about GENESIS.");
    }

    if (participantType === "club_member" && memberType === "board" && boardPosition === "Other" && !positionCustom.trim()) {
      return setErrorMsg("Please enter your executive position title.");
    }

    if (participantType === "club_member" && memberType === "ex_rotaractor" && !clubName.trim()) {
      return setErrorMsg("Please enter your Rotaract club name.");
    }

    setLoading(true);

    try {
      const payload: any = {
        participant_type: participantType,
        name: name.trim(),
        student_id: studentId.trim(),
        department: department.trim() || undefined,
        email: email.trim(),
        contact_number: contactNumber.trim(),
        payment_method: paymentMethod,
        transaction_id: transactionId.trim() || undefined,
        package_selected: packageSelected,
      };

      if (participantType === "guest") {
        payload.referral_source = referralSource;
        if (referralSource === "Other") payload.referral_other = referralOther.trim();
      } else {
        payload.member_type = memberType;
        if (memberType === "board") {
          payload.position = boardPosition;
          if (boardPosition === "Other") payload.position_custom = positionCustom.trim();
        } else if (memberType === "ex_rotaractor") {
          payload.club_name = clubName.trim();
        }
      }

      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Submission failed. Please verify your entries.");
        setLoading(false);
        return;
      }

      // Successful registration: redirect with query params for confirmation receipt
      const query = new URLSearchParams({
        id: data.registration_id,
        name: data.name,
        type: data.participant_type,
        category: data.member_type || "guest",
        position: data.position || "",
        amount: String(data.total_amount),
        method: data.payment_method,
        status: data.payment_status,
      }).toString();

      router.push(`/registration-success?${query}`);
    } catch {
      setErrorMsg("Network error. Please check your internet connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      {/* Step 1: Participant Type Selector */}
      {!participantType && (
        <div>
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <span className="eyebrow" style={{ marginBottom: "8px" }}>
              Step 1 of 3
            </span>
            <h1 className="title-section" style={{ color: "var(--color-charcoal)", marginBottom: "8px" }}>
              Choose Registration Category
            </h1>
            <p className="body-default">
              Select whether you are registering as a general university guest or as an affiliated Rotaract member.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {/* Guest Option */}
            <button
              type="button"
              onClick={() => setParticipantType("guest")}
              className="card-editorial"
              style={{
                padding: "36px 28px",
                textAlign: "left",
                cursor: "pointer",
                border: "2px solid var(--color-border-subtle)",
                transition: "all var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-burgundy)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border-subtle)")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="eyebrow" style={{ color: "var(--color-burgundy)" }}>
                  General Admission
                </span>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-success)" }}>
                  FREE ENTRY
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "2rem",
                  color: "var(--color-charcoal)",
                  marginBottom: "8px",
                }}
              >
                Guest Registration
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
                Open to all university students. Attend plenary sessions, earn an e-certificate, with an optional book & food package for BDT 100.
              </p>
            </button>

            {/* Club Member Option */}
            <button
              type="button"
              onClick={() => setParticipantType("club_member")}
              className="card-editorial"
              style={{
                padding: "36px 28px",
                textAlign: "left",
                cursor: "pointer",
                border: "2px solid var(--color-border-subtle)",
                transition: "all var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-burgundy)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border-subtle)")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="eyebrow" style={{ color: "var(--color-burgundy)" }}>
                  Affiliated Members
                </span>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-burgundy)" }}>
                  ROTARACT
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "2rem",
                  color: "var(--color-charcoal)",
                  marginBottom: "8px",
                }}
              >
                Club Member
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
                For General Members (BDT 100), Board Members (BDT 300–1000), and Ex-Rotaractors (BDT 1000).
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Member Type Sub-selector (if Club Member) */}
      {participantType === "club_member" && !memberType && (
        <div>
          <div style={{ marginBottom: "28px" }}>
            <button
              type="button"
              onClick={() => setParticipantType(null)}
              style={{
                fontSize: "0.85rem",
                color: "var(--color-burgundy)",
                marginBottom: "16px",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ← Back to Categories
            </button>
            <span className="eyebrow" style={{ display: "block", marginBottom: "6px" }}>
              Step 2 of 3
            </span>
            <h2 className="title-section" style={{ color: "var(--color-charcoal)" }}>
              Select Member Category
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <button
              type="button"
              onClick={() => setMemberType("general")}
              className="card-editorial"
              style={{
                padding: "24px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "4px" }}>
                  General Member
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)" }}>
                  Active members of Rotaract Club of DIU
                </p>
              </div>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-burgundy)" }}>
                BDT 100
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMemberType("board")}
              className="card-editorial"
              style={{
                padding: "24px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "4px" }}>
                  Board Member
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)" }}>
                  Presidents, VPs, Secretaries, Treasurers, Directors & IPP
                </p>
              </div>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-burgundy)" }}>
                BDT 300 – 1000
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMemberType("ex_rotaractor")}
              className="card-editorial"
              style={{
                padding: "24px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "4px" }}>
                  Ex-Rotaractor / Alumni
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)" }}>
                  Graduated Rotaractors and alumni network
                </p>
              </div>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-burgundy)" }}>
                BDT 1000
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Registration Form & Payment */}
      {((participantType === "guest") || (participantType === "club_member" && memberType)) && (
        <form onSubmit={handleSubmit} className="card-editorial" style={{ padding: "clamp(24px, 5vw, 40px)" }}>
          {/* Header & Back Button */}
          <div style={{ marginBottom: "28px" }}>
            <button
              type="button"
              onClick={() => {
                if (participantType === "club_member") setMemberType(null);
                else setParticipantType(null);
              }}
              style={{
                fontSize: "0.85rem",
                color: "var(--color-burgundy)",
                marginBottom: "12px",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ← Change Category
            </button>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: "4px" }}>
                  Registration Form
                </span>
                <h2 className="title-subsection" style={{ color: "var(--color-charcoal)" }}>
                  {participantType === "guest"
                    ? "Guest Registration"
                    : memberType === "general"
                    ? "General Member Registration"
                    : memberType === "board"
                    ? "Board Member Registration"
                    : "Ex-Rotaractor Registration"}
                </h2>
              </div>

              <div
                style={{
                  backgroundColor: "var(--color-burgundy-surface)",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border-subtle)",
                  textAlign: "right",
                }}
              >
                <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-text-muted)", display: "block" }}>
                  Registration Fee
                </span>
                <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-burgundy)" }}>
                  BDT {baseFee}
                </span>
              </div>
            </div>
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "var(--color-danger-bg)",
                border: "1px solid var(--color-danger-border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--color-danger)",
                fontSize: "0.9rem",
                marginBottom: "24px",
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Board Position Selection (Only if Board Member) */}
          {participantType === "club_member" && memberType === "board" && (
            <div style={{ marginBottom: "28px", paddingBottom: "24px", borderBottom: "1px solid var(--color-border-subtle)" }}>
              <div className="form-group">
                <label className="form-label">
                  Board Position <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={boardPosition}
                  onChange={(e) => setBoardPosition(e.target.value as BoardPosition)}
                >
                  <option value="IPP">IPP (Immediate Past President) — BDT 1000</option>
                  <option value="President">President — BDT 500</option>
                  <option value="Vice President">Vice President — BDT 500</option>
                  <option value="Secretary">Secretary — BDT 500</option>
                  <option value="Joint Secretary">Joint Secretary — BDT 500</option>
                  <option value="Treasurer">Treasurer — BDT 300</option>
                  <option value="Directors">Director — BDT 300</option>
                  <option value="Other">Other Executive Position — BDT 300</option>
                </select>
              </div>

              {boardPosition === "Other" && (
                <div className="form-group">
                  <label className="form-label">
                    Enter Position Title <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Sergeant-at-Arms, Club Editor"
                    value={positionCustom}
                    onChange={(e) => setPositionCustom(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Ex-Rotaractor Specific: Club Name */}
          {participantType === "club_member" && memberType === "ex_rotaractor" && (
            <div className="form-group">
              <label className="form-label">
                Rotaract Club Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Rotaract Club of Daffodil International University"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
              />
            </div>
          )}

          {/* Personal Information Fields */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your official name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {participantType === "guest" ? "Student ID" : "Student / Member ID"} <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., 221-15-4890"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div className="form-group">
              <label className="form-label">
                Department {participantType === "guest" && <span className="required">*</span>}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Software Engineering, CSE, BBA, English"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required={participantType === "guest"}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="e.g., yourname@diu.edu.bd"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div className="form-group">
              <label className="form-label">
                Contact Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                className="form-input"
                placeholder="e.g., 01712345678"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Guest Specific: Referral */}
          {participantType === "guest" && (
            <div style={{ marginTop: "8px", marginBottom: "24px" }}>
              <div className="form-group">
                <label className="form-label">
                  How did you know about the program? <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={referralSource}
                  onChange={(e) => setReferralSource(e.target.value)}
                >
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Friend / Colleague">Friend / Colleague</option>
                  <option value="Club Member">Club Member</option>
                  <option value="University Announcement">University Announcement</option>
                  <option value="Poster / Flyer">Poster / Flyer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {referralSource === "Other" && (
                <div className="form-group">
                  <label className="form-label">
                    Please specify <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Where did you hear about GENESIS?"
                    value={referralOther}
                    onChange={(e) => setReferralOther(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Optional Package Toggle (Available for all or guests) */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "var(--color-surface-base)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-sm)",
              margin: "24px 0",
            }}
          >
            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={packageSelected}
                onChange={(e) => setPackageSelected(e.target.checked)}
                style={{ width: "20px", height: "20px", marginTop: "2px", accentColor: "var(--color-burgundy)" }}
              />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontWeight: 600, color: "var(--color-charcoal)" }}>
                    Add Optional Event Package (Book + Food + Gifts)
                  </span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-burgundy)" }}>
                    + BDT 100
                  </span>
                </div>
                <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)", marginTop: "4px" }}>
                  Receive the official event book, food refreshments pack, and commemorative souvenirs on the day.
                </p>
              </div>
            </label>
          </div>

          {/* Payment Section (Rendered if totalFee > 0) */}
          {totalFee > 0 ? (
            <div
              style={{
                padding: "24px",
                border: "1.5px solid var(--color-border-default)",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--color-surface-card)",
                marginBottom: "28px",
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <span className="eyebrow" style={{ color: "var(--color-burgundy)", marginBottom: "4px" }}>
                  Payment Details
                </span>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--color-charcoal)" }}>
                  Select Payment Method
                </h3>
              </div>

              {/* Payment Method Switcher */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1.5px solid",
                    borderColor: paymentMethod === "bkash" ? "var(--color-burgundy)" : "var(--color-border-subtle)",
                    backgroundColor: paymentMethod === "bkash" ? "var(--color-burgundy-surface)" : "var(--color-surface-base)",
                    fontWeight: 600,
                    color: paymentMethod === "bkash" ? "var(--color-burgundy)" : "var(--color-text-primary)",
                  }}
                >
                  bKash
                </button>

                {(participantType === "club_member" && (memberType === "board" || memberType === "ex_rotaractor")) && (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1.5px solid",
                      borderColor: paymentMethod === "bank" ? "var(--color-burgundy)" : "var(--color-border-subtle)",
                      backgroundColor: paymentMethod === "bank" ? "var(--color-burgundy-surface)" : "var(--color-surface-base)",
                      fontWeight: 600,
                      color: paymentMethod === "bank" ? "var(--color-burgundy)" : "var(--color-text-primary)",
                    }}
                  >
                    Bank Transfer
                  </button>
                )}
              </div>

              {/* bKash Details */}
              {paymentMethod === "bkash" && (
                <div
                  style={{
                    padding: "16px",
                    backgroundColor: "var(--color-surface-base)",
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: "20px",
                  }}
                >
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
                    Send Total <strong>BDT {totalFee}</strong> to our verified bKash number:
                  </p>
                  <div
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-burgundy)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {EVENT_CONFIG.payment.bkashNumber}
                  </div>
                  {memberType === "general" && (
                    <div style={{ marginTop: "10px", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                      Payment Reference: <code style={{ color: "var(--color-charcoal)" }}>racgen_{name ? name.replace(/\s+/g, "") : "YourName"}</code>
                    </div>
                  )}
                  {memberType === "board" && (
                    <div style={{ marginTop: "10px", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                      Payment Reference: <code style={{ color: "var(--color-charcoal)" }}>racgen_(last 3 digits of your payment number)</code>
                    </div>
                  )}
                </div>
              )}

              {/* Bank Details */}
              {paymentMethod === "bank" && (
                <div
                  style={{
                    padding: "16px",
                    backgroundColor: "var(--color-surface-base)",
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "4px" }}>
                    Bank: <strong>{EVENT_CONFIG.payment.bankName}</strong>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "4px" }}>
                    Account Number:
                  </div>
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-charcoal)",
                      marginBottom: "8px",
                    }}
                  >
                    {EVENT_CONFIG.payment.bankAccount}
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                    Please transfer exactly BDT {totalFee} and input the transaction/slip reference number below.
                  </p>
                </div>
              )}

              {/* Transaction ID Input */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">
                  Transaction ID / Reference Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., 9J28LK902 or Slip Ref"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                />
                <span className="form-hint">
                  Your registration status will be confirmed once payment is verified against this identifier.
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "var(--color-success-bg)",
                border: "1px solid var(--color-success-border)",
                borderRadius: "var(--radius-sm)",
                marginBottom: "24px",
                color: "var(--color-success)",
                fontSize: "0.9rem",
              }}
            >
              ✓ Free Guest Admission. No payment or transaction ID required.
            </div>
          )}

          {/* Payment Summary Table */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "var(--color-surface-base)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-sm)",
              marginBottom: "28px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "8px" }}>
              <span>Base Registration Fee</span>
              <span>BDT {baseFee}</span>
            </div>
            {packageSelected && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "8px" }}>
                <span>Optional Package (Book + Food + Gifts)</span>
                <span>BDT {packageFee}</span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--color-charcoal)",
                paddingTop: "12px",
                borderTop: "1px solid var(--color-border-subtle)",
              }}
            >
              <span>Total Payable Amount</span>
              <span style={{ color: "var(--color-burgundy)" }}>BDT {totalFee}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: "100%", padding: "16px", fontSize: "1.05rem" }}
          >
            {loading ? "Submitting Registration..." : "Complete & Confirm Registration"}
          </button>
        </form>
      )}
    </div>
  );
}

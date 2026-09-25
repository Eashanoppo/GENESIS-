"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

  const isFormStep = (participantType === "guest") || (participantType === "club_member" && memberType);

  return (
    <div className={`reg-wizard ${!participantType ? "reg-wizard-wide" : "reg-wizard-narrow"}`}>
      {/* Editorial Progress Indicator */}
      <div className="reg-progress-container" aria-label="Registration Progress">
        {/* Desktop 3-Step Bar: 01 ───── 02 ───── 03 */}
        <div className="reg-progress-desktop">
          <div className={`reg-progress-step ${!participantType || (participantType === "club_member" && !memberType) ? "active" : "completed"}`}>
            <span className="reg-progress-num">01</span>
            <span className="reg-progress-label">Category</span>
          </div>

          <div className={`reg-progress-divider ${isFormStep ? "active-fill" : ""}`} />

          <div className={`reg-progress-step ${isFormStep ? "active" : ""}`}>
            <span className="reg-progress-num">02</span>
            <span className="reg-progress-label">Details</span>
          </div>

          <div className="reg-progress-divider" />

          <div className="reg-progress-step">
            <span className="reg-progress-num">03</span>
            <span className="reg-progress-label">Confirm</span>
          </div>
        </div>

        {/* Mobile Progress Display: STEP 01 / 03 with clean progress bar */}
        <div className="reg-progress-mobile">
          <div className="reg-progress-mobile-header">
            <span className="reg-progress-mobile-step">
              {!isFormStep ? "Step 01 / 03" : "Step 02 / 03"}
            </span>
            <span className="reg-progress-mobile-title">
              {!participantType
                ? "Category"
                : participantType === "club_member" && !memberType
                ? "Member Tier"
                : "Details & Payment"}
            </span>
          </div>
          <div className="reg-progress-mobile-track">
            <div
              className="reg-progress-mobile-bar"
              style={{ width: !isFormStep ? "33.3%" : "66.6%" }}
            />
          </div>
        </div>
      </div>

      {/* Step 1: Participant Type Selector */}
      {!participantType && (
        <div>
          {/* Page Introduction */}
          <div className="reg-header">
            <div className="reg-eyebrow">
              <span className="reg-eyebrow-accent">✦</span>
              <span>Step 01 / 03</span>
              <span className="reg-eyebrow-accent">✦</span>
            </div>
            <h1 className="reg-title">
              Choose Registration Category
            </h1>
            <p className="reg-subtitle">
              Select the registration category that best matches your participation.
            </p>
          </div>

          {/* Category Cards (Balanced 2-Card Editorial Grid) */}
          <div className="reg-category-grid">
            {/* Card 01: General Admission (Guest) */}
            <button
              type="button"
              onClick={() => setParticipantType("guest")}
              className="reg-card"
              aria-label="Select General Admission Guest Registration, Free Entry"
            >
              <div>
                <div className="reg-card-top">
                  <div className="reg-card-meta">
                    <span className="reg-card-num">01</span>
                    <span className="reg-card-eyebrow">General Admission</span>
                  </div>
                  <span className="reg-card-badge reg-card-badge-free">Free Entry</span>
                </div>

                <h2 className="reg-card-heading">
                  Guest Registration
                </h2>

                <p className="reg-card-desc">
                  Open to all university students, academic attendees, and general visitors. Attend plenary sessions, participate in keynotes, and earn an official e-certificate.
                </p>

                {/* Pricing Information Hierarchy */}
                <div className="reg-card-pricing">
                  <div className="reg-card-pricing-primary">
                    <span className="reg-card-pricing-label">Registration Fee</span>
                    <span className="reg-card-pricing-amount">FREE ENTRY</span>
                  </div>
                  <div className="reg-card-pricing-sub">
                    Optional Book + Food package: <strong>BDT 100</strong>
                  </div>
                </div>

                {/* Compact "What You Get" Benefits Row */}
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "8px" }}>
                    What You Receive
                  </div>
                  <div className="reg-card-benefits">
                    <span className="reg-benefit-tag">E-Certificate</span>
                    <span className="reg-benefit-tag">Optional Book + Food</span>
                    <span className="reg-benefit-tag">Event Access</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Indicator */}
              <div className="reg-card-bottom">
                <span className="reg-action-btn">
                  Select Guest <span className="reg-card-arrow">→</span>
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontStyle: "italic" }}>
                  Instant Confirmation
                </span>
              </div>
            </button>

            {/* Card 02: Affiliated Members (Club Member) */}
            <button
              type="button"
              onClick={() => setParticipantType("club_member")}
              className="reg-card"
              aria-label="Select Affiliated Members Club Registration, Rotaract Members, Fee BDT 100 to 1000"
            >
              <div>
                <div className="reg-card-top">
                  <div className="reg-card-meta">
                    <span className="reg-card-num">02</span>
                    <span className="reg-card-eyebrow">Affiliated Members</span>
                  </div>
                  <span className="reg-card-badge reg-card-badge-rotaract">Rotaract</span>
                </div>

                <h2 className="reg-card-heading">
                  Club Member
                </h2>

                <p className="reg-card-desc">
                  Dedicated registration for active General Members, Executive Board Members, and Rotaractor Alumni. Special member credential and program recognition included.
                </p>

                {/* Pricing Information Hierarchy */}
                <div className="reg-card-pricing">
                  <div className="reg-card-pricing-primary">
                    <span className="reg-card-pricing-label">Registration Fee</span>
                    <span className="reg-card-pricing-amount">BDT 100 — 1000</span>
                  </div>
                  <div className="reg-card-pricing-sub">
                    Registration fee varies by member category
                  </div>
                </div>

                {/* Compact "What You Get" Benefits Row */}
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "8px" }}>
                    What You Receive
                  </div>
                  <div className="reg-card-benefits">
                    <span className="reg-benefit-tag">Member Registration</span>
                    <span className="reg-benefit-tag">E-Certificate</span>
                    <span className="reg-benefit-tag">Event Access</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Indicator */}
              <div className="reg-card-bottom">
                <span className="reg-action-btn">
                  Select Member <span className="reg-card-arrow">→</span>
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontStyle: "italic" }}>
                  3 Member Categories
                </span>
              </div>
            </button>
          </div>

          {/* Small Trust / Event Note */}
          <div className="reg-trust-note">
            <span className="reg-trust-icon">✦</span>
            <p className="reg-trust-text">
              All registered participants who attend the event will receive an official e-certificate.
            </p>
            <span className="reg-trust-icon">✦</span>
          </div>
        </div>
      )}

      {/* Step 2: Member Type Sub-selector (if Club Member) */}
      {participantType === "club_member" && !memberType && (
        <div>
          <button
            type="button"
            onClick={() => setParticipantType(null)}
            className="reg-back-btn"
            aria-label="Back to Registration Categories"
          >
            ← Back to Categories
          </button>

          <div className="reg-header" style={{ textAlign: "left", marginBottom: "24px" }}>
            <div className="reg-eyebrow" style={{ marginBottom: "6px" }}>
              <span className="reg-eyebrow-accent">✦</span>
              <span>Step 01 / 03 · Affiliated Members</span>
            </div>
            <h2 className="reg-title" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", marginBottom: "8px" }}>
              Select Member Category
            </h2>
            <p className="reg-subtitle" style={{ margin: "0", maxWidth: "none" }}>
              Select your active membership tier in Rotaract Club of DIU to calculate the applicable fee.
            </p>
          </div>

          <div className="reg-subcat-list">
            {/* General Member */}
            <button
              type="button"
              onClick={() => setMemberType("general")}
              className="reg-subcat-card"
              aria-label="Select General Member, BDT 100"
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-burgundy)" }}>
                    01
                  </span>
                  <h3 className="reg-subcat-title" style={{ margin: 0 }}>General Member</h3>
                </div>
                <p className="reg-subcat-desc">
                  Active members of Rotaract Club of DIU
                </p>
              </div>
              <div className="reg-subcat-price-wrap">
                <span className="reg-subcat-price">BDT 100</span>
                <span className="reg-subcat-btn">
                  Select Category <span className="reg-card-arrow">→</span>
                </span>
              </div>
            </button>

            {/* Board Member */}
            <button
              type="button"
              onClick={() => setMemberType("board")}
              className="reg-subcat-card"
              aria-label="Select Board Member, BDT 300 to 1000"
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-burgundy)" }}>
                    02
                  </span>
                  <h3 className="reg-subcat-title" style={{ margin: 0 }}>Board Member</h3>
                </div>
                <p className="reg-subcat-desc">
                  Presidents, VPs, Secretaries, Treasurers, Directors & IPP
                </p>
              </div>
              <div className="reg-subcat-price-wrap">
                <span className="reg-subcat-price">BDT 300 – 1000</span>
                <span className="reg-subcat-btn">
                  Select Category <span className="reg-card-arrow">→</span>
                </span>
              </div>
            </button>

            {/* Ex-Rotaractor */}
            <button
              type="button"
              onClick={() => setMemberType("ex_rotaractor")}
              className="reg-subcat-card"
              aria-label="Select Ex-Rotaractor or Alumni, BDT 1000"
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-burgundy)" }}>
                    03
                  </span>
                  <h3 className="reg-subcat-title" style={{ margin: 0 }}>Ex-Rotaractor / Alumni</h3>
                </div>
                <p className="reg-subcat-desc">
                  Graduated Rotaractors and alumni network
                </p>
              </div>
              <div className="reg-subcat-price-wrap">
                <span className="reg-subcat-price">BDT 1000</span>
                <span className="reg-subcat-btn">
                  Select Category <span className="reg-card-arrow">→</span>
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Registration Form & Payment */}
      {isFormStep && (
        <form onSubmit={handleSubmit} className="card-editorial" style={{ padding: "clamp(24px, 4vw, 40px)" }}>
          {/* Header & Back Button */}
          <div style={{ marginBottom: "28px" }}>
            <button
              type="button"
              onClick={() => {
                if (participantType === "club_member") setMemberType(null);
                else setParticipantType(null);
              }}
              className="reg-back-btn"
              style={{ marginBottom: "14px" }}
              aria-label="Change Selected Registration Category"
            >
              ← Change Category
            </button>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
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
                  padding: "10px 18px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border-subtle)",
                  textAlign: "right",
                }}
              >
                <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--color-text-muted)", display: "block", letterSpacing: "0.08em" }}>
                  Registration Fee
                </span>
                <span style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-editorial)", color: "var(--color-burgundy)" }}>
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
              role="alert"
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
            <div className="form-group" style={{ marginBottom: "24px" }}>
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

          {/* Optional Package Toggle */}
          <div
            style={{
              padding: "20px",
              backgroundColor: packageSelected ? "var(--color-burgundy-surface)" : "var(--color-surface-base)",
              border: "1.5px solid",
              borderColor: packageSelected ? "var(--color-burgundy)" : "var(--color-border-subtle)",
              borderRadius: "var(--radius-sm)",
              margin: "24px 0",
              transition: "all var(--transition-fast)",
            }}
          >
            <label style={{ display: "flex", alignItems: "flex-start", gap: "14px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={packageSelected}
                onChange={(e) => setPackageSelected(e.target.checked)}
                style={{ width: "20px", height: "20px", marginTop: "2px", accentColor: "var(--color-burgundy)" }}
              />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 600, color: "var(--color-charcoal)", fontSize: "0.95rem" }}>
                    Add Optional Event Package (Book + Food + Gifts)
                  </span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-burgundy)", backgroundColor: "#FFFFFF", padding: "2px 8px", borderRadius: "var(--radius-xs)", border: "1px solid rgba(93, 18, 34, 0.2)" }}>
                    + BDT 100
                  </span>
                </div>
                <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)", marginTop: "6px", lineHeight: 1.5 }}>
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
                    transition: "all var(--transition-fast)",
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
                      transition: "all var(--transition-fast)",
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
                    padding: "18px",
                    backgroundColor: "var(--color-surface-base)",
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: "20px",
                  }}
                >
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "8px" }}>
                    Send Total <strong>BDT {totalFee}</strong> to our verified bKash number:
                  </p>
                  <div
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-burgundy)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {EVENT_CONFIG.payment.bkashNumber}
                  </div>
                  {memberType === "general" && (
                    <div style={{ marginTop: "12px", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                      Payment Reference: <code style={{ color: "var(--color-charcoal)", backgroundColor: "#FFFFFF", padding: "2px 6px", borderRadius: "2px", border: "1px solid var(--color-border-subtle)" }}>racgen_{name ? name.replace(/\s+/g, "") : "YourName"}</code>
                    </div>
                  )}
                  {memberType === "board" && (
                    <div style={{ marginTop: "12px", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                      Payment Reference: <code style={{ color: "var(--color-charcoal)", backgroundColor: "#FFFFFF", padding: "2px 6px", borderRadius: "2px", border: "1px solid var(--color-border-subtle)" }}>racgen_(last 3 digits of your payment number)</code>
                    </div>
                  )}
                </div>
              )}

              {/* Bank Details */}
              {paymentMethod === "bank" && (
                <div
                  style={{
                    padding: "18px",
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
                      fontSize: "1.35rem",
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
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>✓</span>
              <span><strong>Free Guest Admission.</strong> No payment or transaction ID required.</span>
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
              <span style={{ color: "var(--color-text-secondary)" }}>Base Registration Fee</span>
              <span style={{ fontWeight: 600 }}>BDT {baseFee}</span>
            </div>
            {packageSelected && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "8px" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>Optional Package (Book + Food + Gifts)</span>
                <span style={{ fontWeight: 600 }}>BDT {packageFee}</span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--color-charcoal)",
                paddingTop: "12px",
                borderTop: "1px solid var(--color-border-subtle)",
              }}
            >
              <span>Total Payable Amount</span>
              <span style={{ fontSize: "1.3rem", fontFamily: "var(--font-editorial)", color: "var(--color-burgundy)" }}>
                BDT {totalFee}
              </span>
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

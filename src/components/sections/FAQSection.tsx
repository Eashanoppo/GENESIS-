"use client";

import React, { useState } from "react";
import { FAQS } from "@/config/faq";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="section-padding"
      style={{
        backgroundColor: "var(--color-surface-card)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container" style={{ maxWidth: "760px" }}>
        {/* Section Header */}
        <div style={{ marginBottom: "clamp(44px, 6vw, 64px)", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "var(--color-burgundy)",
                transform: "rotate(45deg)",
                display: "inline-block",
              }}
            />
            <span className="eyebrow" style={{ color: "var(--color-burgundy)" }}>
              Inquiries &amp; Answers
            </span>
          </div>

          <h2
            className="title-section"
            style={{
              color: "var(--color-charcoal)",
              fontSize: "clamp(2rem, 3.6vw, 2.85rem)",
              lineHeight: 1.15,
              marginBottom: "14px",
            }}
          >
            Frequently Asked Questions
          </h2>

          <p className="body-lead" style={{ color: "var(--color-text-secondary)" }}>
            Common questions regarding eligibility, registration tiers, payment verification, and summit day protocols.
          </p>
        </div>

        {/* Flat Minimalist Editorial Accordion */}
        <div style={{ borderTop: "1px solid var(--color-border-default)" }}>
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  borderBottom: "1px solid var(--color-border-subtle)",
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                  style={{
                    width: "100%",
                    padding: "24px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                    textAlign: "left",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-editorial)",
                      fontSize: "clamp(1.15rem, 1.8vw, 1.35rem)",
                      fontWeight: 600,
                      color: isOpen ? "var(--color-burgundy)" : "var(--color-charcoal)",
                      lineHeight: 1.3,
                      transition: "color var(--transition-fast)",
                    }}
                  >
                    {item.question}
                  </span>

                  <span
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 400,
                      lineHeight: 1,
                      color: isOpen ? "var(--color-burgundy)" : "var(--color-gold)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform var(--transition-fast), color var(--transition-fast)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      paddingBottom: "24px",
                      paddingRight: "24px",
                      color: "var(--color-text-secondary)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

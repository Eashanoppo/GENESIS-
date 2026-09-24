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
      <div className="container-narrow">
        <div style={{ marginBottom: "40px" }}>
          <span className="eyebrow" style={{ marginBottom: "12px" }}>
            Inquiries & Clarity
          </span>
          <h2 className="title-section" style={{ color: "var(--color-charcoal)", marginBottom: "12px" }}>
            Frequently Asked Questions
          </h2>
          <p className="body-lead">
            Common questions regarding eligibility, registration tiers, payment processing, and event-day logistics.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--color-surface-base)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    color: isOpen ? "var(--color-burgundy)" : "var(--color-charcoal)",
                    transition: "color var(--transition-fast)",
                  }}
                >
                  <span>{item.question}</span>
                  <span
                    style={{
                      fontSize: "1.2rem",
                      lineHeight: 1,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform var(--transition-fast)",
                      color: "var(--color-burgundy)",
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 24px 20px 24px",
                      color: "var(--color-text-secondary)",
                      fontSize: "0.95rem",
                      lineHeight: 1.65,
                      borderTop: "1px solid var(--color-border-subtle)",
                      paddingTop: "16px",
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

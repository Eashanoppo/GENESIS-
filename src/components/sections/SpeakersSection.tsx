import React from "react";
import Image from "next/image";
import { SPEAKERS } from "@/config/speakers";

export default function SpeakersSection() {
  return (
    <section
      id="speakers"
      className="section-padding"
      style={{
        backgroundColor: "var(--color-surface-base)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: "780px", marginBottom: "clamp(44px, 6vw, 68px)" }}>
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
              The Plenary Voices
            </span>
          </div>

          <h2
            className="title-section"
            style={{
              color: "var(--color-charcoal)",
              fontSize: "clamp(2.1rem, 3.8vw, 3rem)",
              lineHeight: 1.12,
              marginBottom: "16px",
            }}
          >
            Two Voices. Distinct Perspectives.
            <span
              style={{
                display: "block",
                fontStyle: "normal",
                fontWeight: 600,
                color: "var(--color-burgundy)",
                marginTop: "4px",
              }}
            >
              One Plenary Platform.
            </span>
          </h2>

          <p className="body-lead" style={{ color: "var(--color-text-secondary)", maxWidth: "640px" }}>
            Meet the academic pioneers and master communicators sharing actionable frameworks to shape your professional and scholarly journey.
          </p>
        </div>

        {/* 2-Column Editorial Speaker Profiles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "clamp(36px, 5vw, 64px)",
            alignItems: "start",
          }}
        >
          {SPEAKERS.map((speaker, idx) => {
            const sessionNum = idx === 0 ? "SESSION 01" : "SESSION 02";
            return (
              <article
                key={speaker.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "clamp(24px, 3.5vw, 36px)",
                  backgroundColor: "var(--color-surface-card)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm)",
                  position: "relative",
                }}
              >
                {/* Header Session Index & Chief Guest Badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    paddingBottom: "12px",
                    borderBottom: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: "var(--color-gold)",
                        textTransform: "uppercase",
                      }}
                    >
                      {sessionNum}
                    </span>
                  </div>

                  {speaker.isChiefGuest && (
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        backgroundColor: "var(--color-burgundy-surface)",
                        color: "var(--color-burgundy)",
                        padding: "3px 10px",
                        borderRadius: "var(--radius-xs)",
                        border: "1px solid var(--color-border-subtle)",
                      }}
                    >
                      Chief Guest
                    </span>
                  )}
                </div>

                {/* Speaker Portrait Frame */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 11",
                    backgroundColor: "var(--color-warm-white-dim)",
                    borderRadius: "var(--radius-xs)",
                    overflow: "hidden",
                    border: "1px solid var(--color-border-default)",
                    marginBottom: "24px",
                  }}
                >
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    style={{
                      objectFit: "cover",
                      objectPosition: speaker.imagePosition || "center center",
                    }}
                    priority={speaker.isChiefGuest}
                  />
                </div>

                {/* Prominent Speaker Name */}
                <h3
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "clamp(1.85rem, 2.8vw, 2.35rem)",
                    fontWeight: 600,
                    color: "var(--color-charcoal)",
                    marginBottom: "6px",
                    lineHeight: 1.15,
                  }}
                >
                  {speaker.name}
                </h3>

                {/* Role & Affiliation */}
                <div style={{ marginBottom: "20px" }}>
                  <p
                    style={{
                      fontSize: "0.925rem",
                      fontWeight: 600,
                      color: "var(--color-burgundy)",
                      marginBottom: "4px",
                    }}
                  >
                    {speaker.role}
                  </p>
                  <p
                    style={{
                      fontSize: "0.84rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {speaker.affiliation}
                  </p>
                </div>

                {/* Thin Editorial Divider */}
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "var(--color-border-subtle)",
                    marginBottom: "20px",
                  }}
                />

                {/* Session Details */}
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                      marginBottom: "6px",
                    }}
                  >
                    Plenary Keynote Session
                  </span>

                  <h4
                    style={{
                      fontFamily: "var(--font-editorial)",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "var(--color-charcoal)",
                      marginBottom: "10px",
                      lineHeight: 1.35,
                    }}
                  >
                    {speaker.sessionTitle}
                  </h4>

                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: speaker.topics ? "16px" : "0",
                    }}
                  >
                    {speaker.description}
                  </p>

                  {/* Key Discussion Points if available */}
                  {speaker.topics && (
                    <div
                      style={{
                        paddingTop: "14px",
                        borderTop: "1px dashed var(--color-border-subtle)",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--color-burgundy)",
                          marginBottom: "8px",
                        }}
                      >
                        Core Focus Areas:
                      </span>
                      <ul
                        style={{
                          listStyleType: "none",
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        {speaker.topics.map((topic, tIdx) => (
                          <li
                            key={tIdx}
                            style={{
                              fontSize: "0.825rem",
                              color: "var(--color-text-primary)",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <span
                              style={{
                                width: "4px",
                                height: "4px",
                                backgroundColor: "var(--color-burgundy)",
                                transform: "rotate(45deg)",
                                display: "inline-block",
                                flexShrink: 0,
                              }}
                            />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

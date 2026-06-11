"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

/*
 * NOTE: These are placeholder testimonials. Replace the quotes, names, and
 * roles with real recommendations (e.g. from LinkedIn) before sharing widely.
 */
const testimonials = [
  {
    quote:
      "Shakoor consistently delivers clean, reliable features on the STC forecasting platform. He takes ownership from requirement to release and the finance team trusts what he ships.",
    name: "Team Lead",
    role: "Blutech Consulting",
    accent: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
    border: "rgba(91,60,245,0.18)",
  },
  {
    quote:
      "He built our entire platform end-to-end — database, API, and a polished UI — and kept communication clear throughout. Exactly what you want from a full-stack developer.",
    name: "Freelance Client",
    role: "E-Commerce Project",
    accent: "#00A882",
    bg: "rgba(0,168,130,0.08)",
    border: "rgba(0,168,130,0.18)",
  },
  {
    quote:
      "Strong on both code quality and delivery speed. Shakoor picks up new domains fast — he went from brief to working Power Platform automation in days, not weeks.",
    name: "Project Manager",
    role: "Enterprise Automation",
    accent: "#e84a2a",
    bg: "rgba(232,74,42,0.07)",
    border: "rgba(232,74,42,0.18)",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.55 },
  });

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        padding: "96px 0 100px",
        background: "#FAFAF7",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, #D8D8D0, transparent)",
        }}
      />

      {/* Soft background accent */}
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "rgba(192,38,211,0.05)",
          filter: "blur(75px)",
          top: 80,
          right: -140,
          pointerEvents: "none",
        }}
      />

      <div
        className="testimonials-container"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 48 }}>
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#5B3CF5",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                width: 20,
                height: 2,
                background: "#5B3CF5",
                borderRadius: 1,
                display: "inline-block",
              }}
            />
            Kind Words
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
              color: "#0D0D0D",
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
              marginBottom: 10,
            }}
          >
            What People <span style={{ color: "#5B3CF5" }}>Say</span>
          </h2>

          <p
            style={{
              maxWidth: 520,
              fontSize: 15,
              lineHeight: 1.7,
              color: "#7A7A7A",
              fontWeight: 300,
            }}
          >
            Feedback from colleagues and clients I&apos;ve had the pleasure of
            building with.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          className="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name + t.role}
              {...fadeUp(0.12 + i * 0.1)}
              whileHover={{ y: -4, boxShadow: "0 14px 36px rgba(13,13,13,0.075)" }}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "26px 24px",
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E8E8E2",
                boxShadow: "0 8px 28px rgba(13,13,13,0.035)",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  background: t.bg,
                  border: `1px solid ${t.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Quote size={16} style={{ color: t.accent }} />
              </div>

              <blockquote
                style={{
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: "#5A5A5A",
                  fontWeight: 300,
                  flex: 1,
                  marginBottom: 20,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption
                style={{
                  borderTop: "1px solid #E8E8E2",
                  paddingTop: 14,
                }}
              >
                <p style={{ fontSize: 13.5, fontWeight: 600, color: "#0D0D0D" }}>
                  {t.name}
                </p>
                <p style={{ fontSize: 12, color: "#7A7A7A", marginTop: 2 }}>
                  {t.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, #D8D8D0, transparent)",
        }}
      />

      <style>{`
        @media (max-width: 900px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .testimonials-container {
            padding-left: 22px !important;
            padding-right: 22px !important;
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Clock,
  Code2,
  Server,
  Radio,
  Zap,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────── */
const stats = [
  { n: "2+", label: "Years Exp.", color: "#5B3CF5" },
  { n: "10+", label: "Projects", color: "#00A882" },
  { n: "15+", label: "Technologies", color: "#e84a2a" },
  { n: "100%", label: "Commitment", color: "#c026d3" },
];

const chips = [
  { label: "React", variant: "purple" },
  { label: "Next.js", variant: "purple" },
  { label: "TypeScript", variant: "purple" },
  { label: "Node.js", variant: "teal" },
  { label: "Power Apps", variant: "teal" },
  { label: "Power Automate", variant: "teal" },
  { label: "PostgreSQL", variant: "neutral" },
  { label: "MongoDB", variant: "neutral" },
] as const;

const highlights = [
  { key: "Open Source", val: "GitHub Contributor" },
  { key: "Focus", val: "Clean Code & Perf" },
  { key: "Domain", val: "Web + Enterprise" },
  { key: "Mode", val: "Remote & On-site" },
];

const services = [
  {
    icon: Code2,
    title: "Frontend",
    desc: "React · Next.js · TypeScript · Tailwind",
    color: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
  },
  {
    icon: Server,
    title: "Backend",
    desc: "Node.js · Express · REST · GraphQL",
    color: "#00A882",
    bg: "rgba(0,168,130,0.08)",
  },
  {
    icon: Radio,
    title: "Power Platform",
    desc: "Power Apps · Automate · BI · SharePoint",
    color: "#e84a2a",
    bg: "rgba(232,74,42,0.07)",
  },
  {
    icon: Zap,
    title: "Full Delivery",
    desc: "Architecture → API → UI → Deployment",
    color: "#c026d3",
    bg: "rgba(192,38,211,0.07)",
  },
];

/* ─── Chip variant styles ──────────────────────────────────────────── */
const chipStyles = {
  purple: {
    background: "rgba(91,60,245,0.08)",
    color: "#5B3CF5",
    border: "1px solid rgba(91,60,245,0.18)",
  },
  teal: {
    background: "rgba(0,168,130,0.08)",
    color: "#00A882",
    border: "1px solid rgba(0,168,130,0.18)",
  },
  neutral: {
    background: "rgba(13,13,13,0.05)",
    color: "#3A3A3A",
    border: "1px solid #E8E8E2",
  },
};

/* ─── Component ─────────────────────────────────────────────────────── */
export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.55 },
  });

  return (
    <section
      id="about"
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
          background:
            "linear-gradient(90deg, transparent, #D8D8D0, transparent)",
        }}
      />

      <div
        className="about-container"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* ── Section header ── */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
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
            Who I Am
          </p>

          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 42,
              color: "#0D0D0D",
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
            }}
          >
            About <span style={{ color: "#5B3CF5" }}>Me</span>
          </h2>

          <p
            style={{
              marginTop: 8,
              fontSize: 15,
              color: "#7A7A7A",
              fontWeight: 300,
            }}
          >
            Passionate developer building impactful web & automation solutions
          </p>
        </motion.div>

        {/* ── Main grid ── */}
        <div
          className="about-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 28,
            alignItems: "stretch",
            marginBottom: 28,
          }}
        >
          {/* LEFT */}
          <motion.div
            {...fadeUp(0.1)}
            className="about-left-column"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              height: "100%",
              minHeight: 0,
            }}
          >
            {/* Profile card */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #E8E8E2",
                borderRadius: 20,
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 18,
                  background:
                    "linear-gradient(135deg, rgba(91,60,245,0.12), rgba(0,168,130,0.1))",
                  border: "1px solid rgba(91,60,245,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  marginBottom: 16,
                  flexShrink: 0,
                }}
              >
                👨‍💻
              </div>

              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#0D0D0D",
                  letterSpacing: "-0.3px",
                  marginBottom: 4,
                }}
              >
                Muhammad Shakoor
              </p>

              <p
                style={{
                  fontSize: 13,
                  color: "#5B3CF5",
                  fontWeight: 500,
                  marginBottom: 16,
                }}
              >
                Full Stack Developer
              </p>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "#E8E8E2",
                  marginBottom: 16,
                }}
              />

              {/* Meta rows */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  {
                    icon: <MapPin size={13} />,
                    text: "Islamabad, Pakistan",
                  },
                  {
                    icon: <Briefcase size={13} />,
                    text: "Blutech Consulting",
                  },
                  {
                    icon: <Clock size={13} />,
                    text: "2+ Years Experience",
                  },
                ].map(({ icon, text }) => (
                  <div
                    key={text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 13,
                      color: "#3A3A3A",
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 7,
                        background: "#F4F4F0",
                        border: "1px solid #E8E8E2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#7A7A7A",
                      }}
                    >
                      {icon}
                    </span>
                    {text}
                  </div>
                ))}
              </div>

              {/* Available badge */}
              <div
                style={{
                  width: "100%",
                  marginTop: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  padding: "9px 0",
                  borderRadius: 10,
                  background: "rgba(22,163,74,0.08)",
                  border: "1px solid rgba(22,163,74,0.18)",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#16a34a",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#16a34a",
                    animation: "pulse 2s infinite",
                    display: "inline-block",
                  }}
                />
                Available for opportunities
              </div>
            </div>

            {/* Stats 2×2 - fills remaining height */}
            <div
              className="about-stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: 10,
                flex: 1,
                minHeight: 0,
              }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.45 }}
                  style={{
                    background: "#fff",
                    border: "1px solid #E8E8E2",
                    borderRadius: 14,
                    padding: "16px 14px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 0,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 28,
                      letterSpacing: "-1px",
                      lineHeight: 1,
                      marginBottom: 5,
                      color: s.color,
                    }}
                  >
                    {s.n}
                  </p>

                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#7A7A7A",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* /LEFT */}

          {/* RIGHT */}
          <motion.div
            {...fadeUp(0.2)}
            style={{
              background: "#fff",
              border: "1px solid #E8E8E2",
              borderRadius: 20,
              padding: "36px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            {/* Bio */}
            <div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#0D0D0D",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.3,
                  marginBottom: 16,
                }}
              >
                Associate Full Stack Developer &
                <br />
                <span style={{ color: "#5B3CF5" }}>
                  Automation Engineer
                </span>
              </h3>

              {[
                <>
                  Currently at{" "}
                  <strong style={{ color: "#0D0D0D", fontWeight: 500 }}>
                    Blutech Consulting
                  </strong>
                  , I contribute to enterprise products including the{" "}
                  <strong style={{ color: "#0D0D0D", fontWeight: 500 }}>
                    STC Bahrain P&L Forecasting Tool
                  </strong>{" "}
                  — a finance dashboard for Saudi Telecom Company managing
                  monthly forecasts across Consumer, Business, Wholesale, and
                  stc Pay segments.
                </>,
                <>
                  I ship end-to-end web applications — from database schema to
                  polished, responsive UIs — using{" "}
                  <strong style={{ color: "#0D0D0D", fontWeight: 500 }}>
                    React, TypeScript, Node.js, PostgreSQL
                  </strong>
                  , and the Microsoft Power Platform. I care about clean code,
                  performance, and real business impact.
                </>,
                <>
                  Outside work I explore advanced automation patterns, system
                  design, and cloud integrations.
                </>,
              ].map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.78,
                    color: "#7A7A7A",
                    fontWeight: 300,
                    marginTop: i > 0 ? 12 : 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Rule */}
            <div style={{ height: 1, background: "#E8E8E2" }} />

            {/* Core Stack chips */}
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#B0B0A8",
                  marginBottom: 12,
                }}
              >
                Core Stack
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                }}
              >
                {chips.map((c) => (
                  <span
                    key={c.label}
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      padding: "5px 12px",
                      borderRadius: 20,
                      letterSpacing: "0.02em",
                      ...chipStyles[c.variant],
                    }}
                  >
                    {c.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights 2×2 */}
            <div
              className="about-highlights-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {highlights.map((h) => (
                <div
                  key={h.key}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 12,
                    background: "#F4F4F0",
                    border: "1px solid #E8E8E2",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#B0B0A8",
                      marginBottom: 5,
                    }}
                  >
                    {h.key}
                  </p>

                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#0D0D0D",
                    }}
                  >
                    {h.val}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          {/* /RIGHT */}
        </div>
        {/* /main grid */}

        {/* ── Services row ── */}
        <div
          className="about-services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
              whileHover={{
                y: -4,
                boxShadow: "0 8px 24px rgba(13,13,13,0.08)",
              }}
              style={{
                background: "#fff",
                border: "1px solid #E8E8E2",
                borderRadius: 16,
                padding: "22px 20px",
                cursor: "default",
                transition: "border-color 0.18s",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                <s.icon size={18} color={s.color} />
              </div>

              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#0D0D0D",
                  marginBottom: 6,
                  letterSpacing: "-0.1px",
                }}
              >
                {s.title}
              </p>

              <p
                style={{
                  fontSize: 11.5,
                  color: "#7A7A7A",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Local CSS */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.35;
          }
        }

        @media (max-width: 900px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }

          .about-left-column {
            height: auto !important;
          }

          .about-stats-grid {
            flex: initial !important;
          }

          .about-services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .about-container {
            padding-left: 22px !important;
            padding-right: 22px !important;
          }

          .about-highlights-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 520px) {
          .about-stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }

          .about-services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
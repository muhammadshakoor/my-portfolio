"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";

const items = [
  {
    type: "work",
    role: "Associate Full Stack Developer & Automation Engineer",
    company: "Blutech Consulting",
    url: "https://blutech.com",
    location: "Islamabad, Pakistan",
    period: "2023 — Present",
    current: true,
    desc: "Building full-stack web applications and enterprise automation solutions. Contributed to the STC Bahrain P&L Forecasting Tool — an enterprise finance dashboard for Saudi Telecom managing monthly forecasts across Consumer, Business, Wholesale, and stc Pay segments.",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Power Apps",
      "Power Automate",
      "PostgreSQL",
      "Azure",
    ],
    accent: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
    border: "rgba(91,60,245,0.18)",
  },
  {
    type: "work",
    role: "Full Stack Developer",
    company: "Freelance",
    url: "#",
    location: "Remote",
    period: "2022 — 2023",
    current: false,
    desc: "Delivered 10+ production projects end-to-end — e-commerce platforms, hotel management systems, and blockchain DApps. Full ownership from architecture to deployment.",
    tags: ["React", "Node.js", "MongoDB", "Web3", "Solidity", "Express", "JWT"],
    accent: "#00A882",
    bg: "rgba(0,168,130,0.08)",
    border: "rgba(0,168,130,0.18)",
  },
  {
    type: "work",
    role: "Frontend Developer",
    company: "Agency",
    url: "#",
    location: "On-site",
    period: "2021 — 2022",
    current: false,
    desc: "Built responsive, animated web interfaces for 15+ clients. Collaborated closely with designers in Figma and translated designs into pixel-perfect, performance-optimised code.",
    tags: ["React", "JavaScript", "Tailwind CSS", "REST APIs", "Figma"],
    accent: "#e84a2a",
    bg: "rgba(232,74,42,0.07)",
    border: "rgba(232,74,42,0.18)",
  },
  {
    type: "edu",
    role: "Bachelor's in Computer Science",
    company: "University",
    url: "#",
    location: "Pakistan",
    period: "2017 — 2021",
    current: false,
    desc: "Studied algorithms, data structures, software engineering, databases, operating systems, and networking. Graduated with honours and shipped several full-stack projects.",
    tags: ["Algorithms", "OOP", "Databases", "Networking", "Software Engineering"],
    accent: "#c026d3",
    bg: "rgba(192,38,211,0.07)",
    border: "rgba(192,38,211,0.18)",
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.55 },
  });

  return (
    <section
      id="experience"
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

      {/* Soft background accents */}
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "rgba(91,60,245,0.06)",
          filter: "blur(75px)",
          top: 80,
          right: -140,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(0,168,130,0.055)",
          filter: "blur(75px)",
          bottom: 60,
          left: -130,
          pointerEvents: "none",
        }}
      />

      <div
        className="experience-container"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 54 }}>
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
            Career Path
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
              color: "#0D0D0D",
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
              marginBottom: 10,
            }}
          >
            Experience &{" "}
            <span style={{ color: "#5B3CF5" }}>Education</span>
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
            My professional journey so far — from frontend development to
            full-stack delivery and enterprise automation.
          </p>
        </motion.div>

        {/* Timeline */}
        <div
          className="timeline-wrapper"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {/* Vertical timeline line */}
          <div
            className="timeline-line"
            style={{
              position: "absolute",
              top: 16,
              bottom: 16,
              left: 22,
              width: 1,
              background: "#E8E8E2",
            }}
          />

          {items.map((it, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.1 + i * 0.1)}
              className="timeline-item"
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "64px 1fr",
                gap: 18,
              }}
            >
              {/* Icon column */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 18,
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    border: `1px solid ${it.border}`,
                    boxShadow: "0 8px 24px rgba(13,13,13,0.06)",
                    color: it.accent,
                  }}
                >
                  {it.type === "edu" ? (
                    <GraduationCap size={18} />
                  ) : (
                    <Briefcase size={18} />
                  )}
                </div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{
                  y: -4,
                  boxShadow: "0 14px 36px rgba(13,13,13,0.075)",
                }}
                style={{
                  background: "#fff",
                  border: "1px solid #E8E8E2",
                  borderRadius: 20,
                  padding: "26px 28px",
                  boxShadow: "0 8px 28px rgba(13,13,13,0.035)",
                }}
              >
                {/* Top meta */}
                <div
                  className="experience-card-top"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 18,
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 7,
                          padding: "5px 12px",
                          borderRadius: 999,
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: it.accent,
                          background: it.bg,
                          border: `1px solid ${it.border}`,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: it.accent,
                          }}
                        />
                        {it.type === "edu" ? "Education" : "Work"}
                      </span>

                      {it.current && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "5px 11px",
                            borderRadius: 999,
                            fontSize: 10,
                            fontWeight: 600,
                            background: "rgba(22,163,74,0.08)",
                            color: "#16a34a",
                            border: "1px solid rgba(22,163,74,0.18)",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#16a34a",
                              animation: "pulse 2s infinite",
                            }}
                          />
                          Current
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-display), sans-serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#0D0D0D",
                        letterSpacing: "-0.4px",
                        lineHeight: 1.28,
                        marginBottom: 5,
                      }}
                    >
                      {it.role}
                    </h3>

                    <p
                      style={{
                        fontSize: 13,
                        color: "#5B3CF5",
                        fontWeight: 500,
                      }}
                    >
                      {it.company}
                    </p>
                  </div>

                  <div
                    className="experience-period"
                    style={{
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#0D0D0D",
                        marginBottom: 4,
                      }}
                    >
                      {it.period}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#7A7A7A",
                      }}
                    >
                      {it.location}
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 14,
                    color: "#7A7A7A",
                    lineHeight: 1.75,
                    fontWeight: 300,
                    marginBottom: 18,
                  }}
                >
                  {it.desc}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                  }}
                >
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "5px 11px",
                        borderRadius: "999px",
                        fontSize: 11,
                        fontWeight: 500,
                        background: it.bg,
                        color: it.accent,
                        border: `1px solid ${it.border}`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Resume CTA */}
        <motion.div
          {...fadeUp(0.55)}
          style={{
            textAlign: "center",
            marginTop: 44,
          }}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              background: "#5B3CF5",
              border: "1px solid #5B3CF5",
              textDecoration: "none",
              boxShadow: "0 10px 24px rgba(91,60,245,0.22)",
            }}
          >
            View Full Résumé
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, #D8D8D0, transparent)",
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.35;
          }
        }

        @media (max-width: 768px) {
          .experience-container {
            padding-left: 22px !important;
            padding-right: 22px !important;
          }

          .timeline-item {
            grid-template-columns: 48px 1fr !important;
            gap: 12px !important;
          }

          .timeline-line {
            left: 23px !important;
          }

          .experience-card-top {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }

          .experience-period {
            text-align: left !important;
          }
        }

        @media (max-width: 480px) {
          .timeline-item {
            grid-template-columns: 1fr !important;
          }

          .timeline-line {
            display: none !important;
          }

          .timeline-item > div:first-child {
            justify-content: flex-start !important;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
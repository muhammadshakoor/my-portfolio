"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiPrisma,
  SiRedis,
  SiGraphql,
  SiFirebase,
  SiFigma,
  SiHtml5,
  SiCss,
  SiVercel,
  SiGithub,
  SiRedux,
  SiVite,
  SiSupabase,
  SiPostman,
  SiJira,
  SiPython,
  SiDjango,
  SiFlask,
  SiSwagger,
  SiSass,
  SiLinux,
  SiMysql,
  SiNpm,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa6";

const cats = [
  {
    name: "Frontend",
    color: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
    border: "rgba(91,60,245,0.18)",
    items: [
      { name: "React",      icon: SiReact,      color: "#61DAFB" },
      { name: "Next.js",    icon: SiNextdotjs,  color: "var(--text-1)" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Redux",      icon: SiRedux,      color: "#764ABC" },
      { name: "Tailwind",   icon: SiTailwindcss,color: "#06B6D4" },
      { name: "Sass",       icon: SiSass,       color: "#CC6699" },
      { name: "Vite",       icon: SiVite,       color: "#646CFF" },
      { name: "HTML5",      icon: SiHtml5,      color: "#E34F26" },
      { name: "CSS3",       icon: SiCss,        color: "#1572B6" },
    ],
  },
  {
    name: "Backend & Database",
    color: "#00A882",
    bg: "rgba(0,168,130,0.08)",
    border: "rgba(0,168,130,0.18)",
    items: [
      { name: "Node.js",    icon: SiNodedotjs,  color: "#339933" },
      { name: "Express",    icon: SiExpress,    color: "var(--text-1)" },
      { name: "Python",     icon: SiPython,     color: "#3776AB" },
      { name: "Django",     icon: SiDjango,     color: "#4ADE80" },
      { name: "Flask",      icon: SiFlask,      color: "#8BADC2" },
      { name: "REST API",   icon: SiSwagger,    color: "#49A14D" },
      { name: "GraphQL",    icon: SiGraphql,    color: "#E10098" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB",    icon: SiMongodb,    color: "#47A248" },
      { name: "Prisma",     icon: SiPrisma,     color: "#5B3CF5" },
      { name: "Supabase",   icon: SiSupabase,   color: "#3ECF8E" },
      { name: "Redis",      icon: SiRedis,      color: "#DC382D" },
      { name: "Firebase",   icon: SiFirebase,   color: "#FFCA28" },
      { name: "MySQL",      icon: SiMysql,      color: "#4479A1" },
    ],
  },
  {
    name: "Tools & DevOps",
    color: "#e84a2a",
    bg: "rgba(232,74,42,0.07)",
    border: "rgba(232,74,42,0.18)",
    items: [
      { name: "Azure",  icon: FaMicrosoft, color: "#0078D4" },
      { name: "Linux",  icon: SiLinux,    color: "#FCC624" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "var(--text-1)" },
      { name: "Vercel", icon: SiVercel, color: "var(--text-1)" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Jira",    icon: SiJira,    color: "#0052CC" },
      { name: "Figma",   icon: SiFigma,   color: "#F24E1E" },
      { name: "npm",     icon: SiNpm,     color: "#CB3837" },
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.55 },
  });

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: "96px 0 100px",
        background: "var(--bg-section)",
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
            "linear-gradient(90deg, transparent, var(--divider), transparent)",
        }}
      />

      {/* Soft background accents */}
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "rgba(91,60,245,0.07)",
          filter: "blur(70px)",
          top: 80,
          left: -130,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(0,168,130,0.06)",
          filter: "blur(70px)",
          bottom: 80,
          right: -120,
          pointerEvents: "none",
        }}
      />

      <div
        className="skills-container"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 52 }}>
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
            What I Use
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
              color: "var(--text-1)",
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
              marginBottom: 10,
            }}
          >
            Tech <span style={{ color: "#5B3CF5" }}>Stack</span>
          </h2>

          <p
            style={{
              maxWidth: 520,
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--text-2)",
              fontWeight: 300,
            }}
          >
            A curated toolkit of modern technologies I use daily to build fast,
            scalable, and maintainable digital products.
          </p>
        </motion.div>

        {/* Category cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {cats.map((cat, ci) => (
            <motion.div
              key={cat.name}
              {...fadeUp(0.1 + ci * 0.12)}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "26px",
                boxShadow: "0 8px 28px rgba(13,13,13,0.035)",
              }}
            >
              {/* Category header */}
              <div
                className="category-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 18,
                  marginBottom: 22,
                }}
              >
                <div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 13px",
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: cat.color,
                      background: cat.bg,
                      border: `1px solid ${cat.border}`,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: cat.color,
                      }}
                    />
                    {cat.name}
                  </span>
                </div>

                <div
                  className="category-line"
                  style={{
                    flex: 1,
                    height: 1,
                    background:
                      "linear-gradient(90deg, var(--cat-line), transparent)",
                  }}
                />
              </div>

              {/* Icon grid */}
              <div
                className="skills-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(96px, 1fr))",
                  gap: 12,
                }}
              >
                {cat.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.86 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.18 + ci * 0.08 + ii * 0.035,
                      type: "spring",
                      stiffness: 200,
                      damping: 18,
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 24px rgba(13,13,13,0.08)",
                    }}
                    style={{
                      minHeight: 104,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      padding: "18px 10px",
                      borderRadius: 15,
                      cursor: "default",
                      background: "transparent",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <item.icon size={24} style={{ color: item.color }} />
                    </div>

                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--text-b)",
                        fontWeight: 500,
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
          background:
            "linear-gradient(90deg, transparent, var(--divider), transparent)",
        }}
      />

      <style>{`
        @media (max-width: 768px) {
          .skills-container {
            padding-left: 22px !important;
            padding-right: 22px !important;
          }

          .category-header {
            align-items: flex-start !important;
            flex-direction: column !important;
            gap: 12px !important;
          }

          .category-line {
            width: 100% !important;
          }

          .skills-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 420px) {
          .skills-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ArrowUpRight, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, categories, type Project } from "@/data/projects";

function TechPill({
  tag,
  color,
  bg,
  border,
}: {
  tag: string;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 11px",
        borderRadius: "999px",
        fontSize: 11,
        fontWeight: 500,
        background: bg,
        color,
        border: `1px solid ${border}`,
      }}
    >
      {tag}
    </span>
  );
}

/* Browser-chrome frame so emoji thumbnails read as product shots */
function BrowserFrame({ p, emojiSize }: { p: Project; emojiSize: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          background: "rgba(255,255,255,0.72)",
          borderBottom: `1px solid ${p.border}`,
          flexShrink: 0,
        }}
      >
        <span style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span
              key={c}
              style={{ width: 8, height: 8, borderRadius: "50%", background: c }}
            />
          ))}
        </span>
        <span
          style={{
            flex: 1,
            maxWidth: 220,
            margin: "0 auto",
            padding: "3px 12px",
            borderRadius: 999,
            background: "rgba(13,13,13,0.05)",
            border: "1px solid rgba(13,13,13,0.06)",
            fontSize: 9.5,
            color: "#7A7A7A",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "monospace",
          }}
        >
          {p.slug}.app
        </span>
      </div>

      {/* Viewport */}
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${p.color}35 1px, transparent 1px)`,
            backgroundSize: "22px 22px",
            opacity: 0.28,
          }}
        />
        <span style={{ fontSize: emojiSize, position: "relative", zIndex: 1 }}>
          {p.emoji}
        </span>
      </div>
    </div>
  );
}

function CardLinks({ p, small }: { p: Project; small?: boolean }) {
  const fontSize = small ? 11 : 12;
  const iconSize = small ? 12 : 14;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: small ? 15 : 18,
        borderTop: "1px solid #E8E8E2",
        paddingTop: small ? 14 : 18,
        flexWrap: "wrap",
      }}
    >
      <Link
        href={`/projects/${p.slug}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: small ? 5 : 6,
          fontSize,
          color: p.color,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        <BookOpen size={iconSize} />
        Case Study
        <ArrowUpRight size={iconSize - 2} />
      </Link>

      <a
        href={p.github}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: small ? 5 : 6,
          fontSize,
          color: "#7A7A7A",
          fontWeight: 500,
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#0D0D0D";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#7A7A7A";
        }}
      >
        <FaGithub size={iconSize} />
        {small ? "Source" : "Source Code"}
      </a>
    </div>
  );
}

function FeaturedCard({ p, index }: { p: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="featured-card-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
        gap: 28,
        alignItems: "center",
        padding: 28,
        borderRadius: 20,
        background: "#fff",
        border: "1px solid #E8E8E2",
        boxShadow: "0 8px 28px rgba(13,13,13,0.035)",
      }}
      whileHover={{
        y: -3,
        boxShadow: "0 14px 36px rgba(13,13,13,0.075)",
      }}
    >
      {/* Visual */}
      <div
        className="featured-visual"
        style={{
          order: isEven ? 0 : 1,
          borderRadius: 16,
          overflow: "hidden",
          aspectRatio: "16/10",
          background: `linear-gradient(135deg, ${p.bg}, #FAFAF7)`,
          border: `1px solid ${p.border}`,
          position: "relative",
        }}
      >
        <BrowserFrame p={p} emojiSize={64} />

        {p.featured && (
          <div
            style={{
              position: "absolute",
              top: 42,
              right: 14,
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 11px",
              borderRadius: "999px",
              fontSize: 10,
              fontWeight: 700,
              background: "rgba(251,191,36,0.16)",
              border: "1px solid rgba(251,191,36,0.32)",
              color: "#b7791f",
              zIndex: 2,
            }}
          >
            <Star size={9} fill="currentColor" />
            Featured
          </div>
        )}
      </div>

      {/* Details */}
      <div style={{ order: isEven ? 1 : 0 }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: p.color,
            marginBottom: 8,
          }}
        >
          {p.cat}
        </p>

        <h3
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: "#0D0D0D",
            marginBottom: 5,
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
          }}
        >
          {p.title}
        </h3>

        <p
          style={{
            fontSize: 13,
            color: "#7A7A7A",
            marginBottom: 14,
          }}
        >
          {p.sub}
        </p>

        <p
          style={{
            fontSize: 14,
            color: "#7A7A7A",
            lineHeight: 1.75,
            marginBottom: 20,
            fontWeight: 300,
          }}
        >
          {p.desc}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 7,
            marginBottom: 22,
          }}
        >
          {p.tags.map((t) => (
            <TechPill key={t} tag={t} color={p.color} bg={p.bg} border={p.border} />
          ))}
        </div>

        <CardLinks p={p} />
      </div>
    </motion.div>
  );
}

function GridCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, delay: i * 0.04 }}
      whileHover={{
        y: -5,
        boxShadow: "0 12px 30px rgba(13,13,13,0.08)",
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 18,
        overflow: "hidden",
        background: "#fff",
        border: "1px solid #E8E8E2",
        boxShadow: "0 8px 26px rgba(13,13,13,0.035)",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          height: 148,
          background: `linear-gradient(135deg, ${p.bg}, #FAFAF7)`,
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #E8E8E2",
        }}
      >
        <BrowserFrame p={p} emojiSize={42} />
      </div>

      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <p
          style={{
            fontSize: 9,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: p.color,
            marginBottom: 5,
          }}
        >
          {p.cat}
        </p>

        <h3
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "#0D0D0D",
            marginBottom: 4,
            letterSpacing: "-0.2px",
          }}
        >
          {p.title}
        </h3>

        <p
          style={{
            fontSize: 12,
            color: "#7A7A7A",
            marginBottom: 10,
          }}
        >
          {p.sub}
        </p>

        <p
          style={{
            fontSize: 12.5,
            color: "#7A7A7A",
            lineHeight: 1.65,
            flex: 1,
            marginBottom: 14,
            fontWeight: 300,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {p.desc}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            marginBottom: 14,
          }}
        >
          {p.tags.slice(0, 4).map((t) => (
            <TechPill key={t} tag={t} color={p.color} bg={p.bg} border={p.border} />
          ))}
        </div>

        <CardLinks p={p} small />
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [active, setActive] = useState("All");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  const isFiltered = active !== "All";
  const filteredAll = projects.filter((p) => p.cat === active);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.55 },
  });

  return (
    <section
      id="projects"
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

      {/* Soft background accent */}
      <div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(91,60,245,0.06)",
          filter: "blur(75px)",
          top: 90,
          left: -150,
          pointerEvents: "none",
        }}
      />

      <div
        className="projects-container"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 36 }}>
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
            What I&apos;ve Built
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
            My <span style={{ color: "#5B3CF5" }}>Projects</span>
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
            A selection of projects I&apos;ve designed and built from scratch —
            from business dashboards to full-stack platforms, AI models, and
            automation tools.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          {...fadeUp(0.1)}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 34,
          }}
        >
          {categories.map((c) => {
            const isActive = active === c;

            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                style={{
                  padding: "7px 17px",
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: "999px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: isActive ? "#5B3CF5" : "#fff",
                  color: isActive ? "#fff" : "#7A7A7A",
                  border: isActive
                    ? "1px solid #5B3CF5"
                    : "1px solid #E8E8E2",
                  boxShadow: isActive
                    ? "0 8px 20px rgba(91,60,245,0.22)"
                    : "none",
                }}
              >
                {c}
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {!isFiltered ? (
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Featured cards */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 22,
                  marginBottom: 42,
                }}
              >
                {featured.map((p, i) => (
                  <FeaturedCard key={p.slug} p={p} index={i} />
                ))}
              </div>

              {/* Other projects */}
              <div>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#B0B0A8",
                    marginBottom: 16,
                  }}
                >
                  Other Noteworthy Projects
                </p>

                <div
                  className="projects-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 18,
                  }}
                >
                  {others.map((p, i) => (
                    <GridCard key={p.slug} p={p} i={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="projects-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 18,
              }}
            >
              {filteredAll.map((p, i) => (
                <GridCard key={p.slug} p={p} i={i} />
              ))}

              {filteredAll.length === 0 && (
                <p
                  style={{
                    color: "#7A7A7A",
                    textAlign: "center",
                    gridColumn: "1/-1",
                    padding: "40px 0",
                  }}
                >
                  No projects in this category yet.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          {...fadeUp(0.2)}
          style={{
            textAlign: "center",
            marginTop: 46,
          }}
        >
          <a
            href="https://github.com/muhammadshakoor"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 14,
              background: "#fff",
              color: "#0D0D0D",
              border: "1px solid #E8E8E2",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(13,13,13,0.04)",
            }}
          >
            <FaGithub size={15} />
            More on GitHub
            <ArrowUpRight size={14} />
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
        @media (max-width: 900px) {
          .featured-card-grid {
            grid-template-columns: 1fr !important;
          }

          .featured-visual {
            order: 0 !important;
          }
        }

        @media (max-width: 768px) {
          .projects-container {
            padding-left: 22px !important;
            padding-right: 22px !important;
          }
        }

        @media (max-width: 420px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const projects = [
  {
    id: 3,
    emoji: "📊",
    title: "STC P&L Forecasting",
    sub: "Enterprise Finance Dashboard",
    desc: "Finance dashboard for Saudi Telecom Company — monthly forecasts across Consumer, Business, Wholesale & stc Pay segments. Built at Blutech Consulting.",
    tags: ["React", "Vite", "TypeScript", "Power BI", "REST API"],
    cat: "Enterprise",
    color: "#e84a2a",
    bg: "rgba(232,74,42,0.07)",
    border: "rgba(232,74,42,0.18)",
    featured: true,
    github: "https://github.com/muhammadshakoor/STC-Forecasting-Frontend",
    live: "#",
  },
  {
    id: 9,
    emoji: "🗺️",
    title: "Bank Lead Generation",
    sub: "Enterprise Field Agent Platform",
    desc: "Field agent platform for a major bank — an interactive map displays nearby businesses, agents tap to generate leads and log visits for account opening pitches. Multi-level hierarchy: Branch, Region, Group, and Head levels, each with role-specific dashboards, lead favourites, and visit status tracking. Built at Blutech Consulting.",
    tags: ["React", "TypeScript", "Node.js", "Express", "Google Maps", "PostgreSQL"],
    cat: "Enterprise",
    color: "#0369a1",
    bg: "rgba(3,105,161,0.07)",
    border: "rgba(3,105,161,0.18)",
    featured: true,
    github: "https://github.com/insaf-blutech/LeadGeneration_Frontend",
    live: "#",
  },
  {
    id: 1,
    emoji: "🏨",
    title: "Smart Guest",
    sub: "Hotel Management System",
    desc: "Full-featured hotel management with booking engine, room management, invoicing, and real-time availability. Role-based admin dashboard with analytics.",
    tags: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    cat: "Full Stack",
    color: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
    border: "rgba(91,60,245,0.18)",
    featured: true,
    github: "https://github.com/muhammadshakoor/smart-guest",
    live: "#",
  },
  {
    id: 2,
    emoji: "💄",
    title: "Cosmetics Store",
    sub: "E-Commerce Platform",
    desc: "End-to-end e-commerce with product catalog, shopping cart, Stripe payments, order tracking, and admin dashboard. JWT auth with RBAC.",
    tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Stripe"],
    cat: "Full Stack",
    color: "#c026d3",
    bg: "rgba(192,38,211,0.07)",
    border: "rgba(192,38,211,0.18)",
    featured: true,
    github: "https://github.com/muhammadshakoor/cosmetics-store",
    live: "#",
  },
  {
    id: 7,
    emoji: "🔄",
    title: "CRUD App",
    sub: "Full Stack Monorepo",
    desc: "A full-stack CRUD application with frontend and backend in a single monorepo, deployed together on Vercel using a unified vercel.json. Also available as separate frontend and backend repositories with independent deployments.",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind",
      "Express",
      "PostgreSQL",
      "Vercel",
    ],
    cat: "Full Stack",
    color: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
    border: "rgba(91,60,245,0.18)",
    featured: true,
    github: "https://github.com/muhammadshakoor/crud_app",
    live: "https://crud-app-drab-ten.vercel.app",
  },
  {
    id: 8,
    emoji: "🧠",
    title: "MNIST CNN & KITTI Object Detection",
    sub: "Deep Learning & Computer Vision",
    desc: "Built and benchmarked 5 CNN architectures for real-time handwritten digit recognition on MNIST, then fine-tuned a Faster R-CNN model to detect Cars, Pedestrians, and Cyclists in live KITTI driving footage. Delivered production-ready model weights, mAP benchmarks, and visual detection outputs.",
    tags: [
      "Python",
      "PyTorch",
      "TorchVision",
      "Jupyter",
      "MNIST",
      "KITTI",
      "Faster R-CNN",
    ],
    cat: "AI/ML",
    color: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
    border: "rgba(91,60,245,0.18)",
    featured: true,
    github: "https://github.com/muhammadshakoor/mnist-cnn-kitti-object-detection",
    live: "#",
  },
  {
    id: 4,
    emoji: "🪙",
    title: "TokenDapp",
    sub: "Blockchain DApp",
    desc: "Decentralised ERC-20 token app with MetaMask wallet, token transfers, real-time balances, and full transaction history.",
    tags: ["React", "TypeScript", "Web3.js", "Solidity", "MetaMask"],
    cat: "Web3",
    color: "#00A882",
    bg: "rgba(0,168,130,0.08)",
    border: "rgba(0,168,130,0.18)",
    featured: false,
    github: "https://github.com/muhammadshakoor/TokenDapp",
    live: "#",
  },
  {
    id: 5,
    emoji: "🤖",
    title: "LangFlow BTC",
    sub: "AI Bitcoin Chatbot",
    desc: "Bitcoin-focused AI chatbot powered by LangFlow & OpenAI — market analysis, price insights, and educational crypto content.",
    tags: ["Next.js", "TypeScript", "LangFlow", "OpenAI", "Tailwind"],
    cat: "AI/ML",
    color: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
    border: "rgba(91,60,245,0.18)",
    featured: false,
    github: "https://github.com/muhammadshakoor/LangFlowBTC",
    live: "#",
  },
  {
    id: 6,
    emoji: "🔐",
    title: "JWT Auth System",
    sub: "Authentication Boilerplate",
    desc: "Production-ready auth with JWT + refresh tokens, email verification, OAuth, and two-factor authentication.",
    tags: ["Node.js", "Express", "JWT", "MongoDB", "Nodemailer"],
    cat: "Backend",
    color: "#00A882",
    bg: "rgba(0,168,130,0.08)",
    border: "rgba(0,168,130,0.18)",
    featured: false,
    github: "https://github.com/muhammadshakoor/loginpage",
    live: "#",
  },
];

const cats = ["All", "Full Stack", "Enterprise", "Web3", "AI/ML", "Backend"];

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

function FeaturedCard({
  p,
  index,
}: {
  p: (typeof projects)[0];
  index: number;
}) {
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${p.bg}, #FAFAF7)`,
          border: `1px solid ${p.border}`,
          position: "relative",
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

        <span
          style={{
            fontSize: 70,
            position: "relative",
            zIndex: 1,
          }}
        >
          {p.emoji}
        </span>

        {p.featured && (
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 11px",
              borderRadius: "999px",
              fontSize: 10,
              fontWeight: 700,
              background: "rgba(251,191,36,0.12)",
              border: "1px solid rgba(251,191,36,0.28)",
              color: "#b7791f",
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
            fontFamily: "'Syne', sans-serif",
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
            <TechPill
              key={t}
              tag={t}
              color={p.color}
              bg={p.bg}
              border={p.border}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            borderTop: "1px solid #E8E8E2",
            paddingTop: 18,
            flexWrap: "wrap",
          }}
        >
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
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
            <FaGithub size={14} />
            Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function GridCard({ p, i }: { p: (typeof projects)[0]; i: number }) {
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${p.bg}, #FAFAF7)`,
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #E8E8E2",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${p.color}35 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            opacity: 0.24,
          }}
        />

        <span style={{ fontSize: 50, position: "relative", zIndex: 1 }}>
          {p.emoji}
        </span>
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
            fontFamily: "'Syne', sans-serif",
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
            <TechPill
              key={t}
              tag={t}
              color={p.color}
              bg={p.bg}
              border={p.border}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            borderTop: "1px solid #E8E8E2",
            paddingTop: 14,
            flexWrap: "wrap",
          }}
        >
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
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
            <FaGithub size={12} />
            Source
          </a>
        </div>
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
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
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
          {cats.map((c) => {
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
                  <FeaturedCard key={p.id} p={p} index={i} />
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
                    <GridCard key={p.id} p={p} i={i} />
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
                <GridCard key={p.id} p={p} i={i} />
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
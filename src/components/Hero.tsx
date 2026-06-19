"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, Briefcase, Code2 } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaWhatsapp, FaFacebook, FaInstagram, FaThreads } from "react-icons/fa6";
import { useTheme } from "@/context/ThemeContext";

const roles = [
  "Full Stack Developer",
  "React & TypeScript Expert",
  "Power Platform Specialist",
  "Node.js Developer",
  "Automation Engineer",
];

const roleColors: { dark: string; light: string }[] = [
  { dark: "#818CF8", light: "#5B3CF5" },   // Full Stack Developer — indigo/purple
  { dark: "#00C8FF", light: "#0284C7" },   // React & TypeScript Expert — cyan/sky
  { dark: "#FB923C", light: "#c2410c" },   // Power Platform Specialist — orange
  { dark: "#2DD4BF", light: "#0f766e" },   // Node.js Developer — teal
  { dark: "#F472B6", light: "#be185d" },   // Automation Engineer — pink
];

type Dot = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dur: number;
  delay: number;
};

const socials = [
  {
    icon: FaGithub,
    href: "https://github.com/muhammadshakoor",
    label: "GitHub",
    color: "var(--text-1)",
    bg: "var(--icon-bw-bg)",
    border: "var(--icon-bw-border)",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/muhammad-shakoor-2971a6117/",
    label: "LinkedIn",
    color: "#818CF8",
    bg: "rgba(91,60,245,0.12)",
    border: "rgba(91,60,245,0.25)",
  },
  {
    icon: FaXTwitter,
    href: "https://twitter.com/Muhamma45190755",
    label: "Twitter",
    color: "var(--text-1)",
    bg: "var(--icon-bw-bg)",
    border: "var(--icon-bw-border)",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/923107252754",
    label: "WhatsApp",
    color: "#25D366",
    bg: "rgba(37,211,102,0.08)",
    border: "rgba(37,211,102,0.22)",
  },
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/muhammad.shakoor.786",
    label: "Facebook",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.08)",
    border: "rgba(24,119,242,0.22)",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/muhammadshakoor_official",
    label: "Instagram",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    border: "rgba(225,48,108,0.22)",
  },
  {
    icon: FaThreads,
    href: "https://www.threads.net/@muhammadshakoor_official",
    label: "Threads",
    color: "var(--text-1)",
    bg: "var(--icon-bw-bg)",
    border: "var(--icon-bw-border)",
  },
  {
    icon: Download,
    href: "/resume.pdf",
    label: "Resume",
    color: "#00A882",
    bg: "rgba(0,168,130,0.08)",
    border: "rgba(0,168,130,0.18)",
  },
];

export default function Hero() {
  const { theme } = useTheme();
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(true);
  const [dots] = useState<Dot[]>(() => {
    const COLORS = ["#5B3CF5", "#00A882", "#e84a2a", "#c026d3"];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      color: COLORS[i % COLORS.length],
      dur: Math.random() * 4 + 4,
      delay: Math.random() * 4,
    }));
  });
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cur = roles[roleIdx];
    if (typing) {
      if (text.length < cur.length) {
        timer.current = setTimeout(() => setText(cur.slice(0, text.length + 1)), 65);
      } else {
        timer.current = setTimeout(() => setTyping(false), 2400);
      }
    } else {
      if (text.length > 0) {
        timer.current = setTimeout(() => setText((t) => t.slice(0, -1)), 30);
      } else {
        timer.current = setTimeout(() => {
          setRoleIdx((i) => (i + 1) % roles.length);
          setTyping(true);
        }, 0);
      }
    }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [text, typing, roleIdx]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6 },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-section)" }}
    >
      {/* Top rule */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.18), transparent)",
        }}
      />

      {/* Soft grid */}
      <div className="hero-grid pointer-events-none" />

      {/* Light orbs */}
      <div className="hero-orb" style={{ width: 520, height: 520, top: "14%", left: -160, background: "rgba(91,60,245,0.18)" }} />
      <div className="hero-orb" style={{ width: 380, height: 380, bottom: "16%", right: -90, background: "rgba(0,200,255,0.12)", animationDelay: "3s" }} />
      <div className="hero-orb" style={{ width: 280, height: 280, top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "rgba(0,168,130,0.08)", animationDelay: "1.5s" }} />

      {/* Floating dots */}
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full pointer-events-none"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, background: d.color, opacity: 0.28 }}
          animate={{ y: [0, -18, 0], opacity: [0.18, 0.45, 0.18] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Main content */}
      <div
        className="hero-content relative z-10 w-full"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "108px 48px 72px",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {/* Two-column row */}
        <div className="hero-columns" style={{ display: "flex", alignItems: "flex-start", gap: 72, marginBottom: 40, width: "100%" }}>

        {/* LEFT: Text */}
        <div className="hero-left" style={{ flex: 1, minWidth: 0 }}>
          {/* Status badge */}
          <motion.div {...fadeUp(0.1)} className="hero-badge" style={{ marginBottom: "36px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 18px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.01em",
                background: "rgba(22,163,74,0.08)",
                border: "1px solid rgba(22,163,74,0.18)",
                color: "#16a34a",
              }}
            >
              <span
                style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#16a34a", flexShrink: 0,
                  animation: "pulse 2s infinite",
                }}
              />
              Available for work · Islamabad, Pakistan
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            {...fadeUp(0.2)}
            style={{
              color: "#5B3CF5",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ width: 20, height: 2, background: "#5B3CF5", borderRadius: 1, display: "inline-block" }} />
            Hi, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.3)}
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              lineHeight: 1.04,
              fontSize: "clamp(2.6rem, 4.6vw, 4.1rem)",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              color: "var(--text-1)",
            }}
          >
            <span style={{ color: "var(--accent-highlight)" }}>Muhammad</span>
            <br />
            <span style={{ color: theme === "dark" ? "#E2EDF5" : "#0D0D0D" }}>Shakoor</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            {...fadeUp(0.4)}
            className="hero-typewriter"
            style={{ height: "52px", display: "flex", alignItems: "center", marginBottom: "28px" }}
          >
            <span style={{ fontSize: "clamp(1rem, 2.2vw, 1.3rem)", fontWeight: 600, color: roleColors[roleIdx][theme] }}>
              {text}
              <span className="cursor-blink" style={{ color: "#5B3CF5", marginLeft: "2px" }}>|</span>
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            {...fadeUp(0.5)}
            style={{
              color: "var(--text-2)",
              fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
              lineHeight: 1.75,
              maxWidth: "500px",
              marginBottom: "40px",
              fontWeight: 300,
            }}
          >
            Associate Full Stack Developer &amp; Automation Engineer at{" "}
            <span style={{ color: "var(--text-1)", fontWeight: 500 }}>Blutech Consulting</span>. Building
            scalable web applications and enterprise automation with{" "}
            <span style={{ color: "#818CF8", fontWeight: 600 }}>React</span>,{" "}
            <span style={{ color: "#2DD4BF", fontWeight: 600 }}>Node.js</span>, and{" "}
            <span style={{ color: "#FB923C", fontWeight: 600 }}>Power Platform</span>.
          </motion.p>

          {/* Buttons */}
          <motion.div {...fadeUp(0.6)} className="hero-cta-buttons" style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 22px", borderRadius: 14,
                background: "#5B3CF5", color: "#fff",
                border: "1px solid #5B3CF5", fontSize: 14, fontWeight: 600,
                cursor: "pointer", boxShadow: "0 10px 24px rgba(91,60,245,0.22)",
              }}
            >
              <Briefcase size={16} /> View My Work
            </button>
            <a
              href="https://github.com/muhammadshakoor"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 22px", borderRadius: 14,
                background: "var(--icon-bw-bg)", color: "var(--text-1)",
                border: "1px solid var(--icon-bw-border)", fontSize: 14, fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <FaGithub size={16} /> GitHub Profile
            </a>
          </motion.div>
        </div>

        {/* RIGHT: Profile image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hero-image-col"
          style={{ flexShrink: 0, position: "relative", width: 340, marginTop: 118 }}
        >
          {/* Decorative rotated background */}
          <div
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: 36,
              background: "linear-gradient(135deg, rgba(91,60,245,0.1), rgba(0,168,130,0.07))",
              transform: "rotate(3deg)",
            }}
          />

          {/* Image */}
          <div
            style={{
              position: "relative",
              borderRadius: 28,
              overflow: "hidden",
              border: "2px solid rgba(91,60,245,0.18)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(91,60,245,0.08)",
              aspectRatio: "4/5",
            }}
          >
            <Image
              src="/profile.jpg"
              alt="Muhammad Shakoor"
              fill
              style={{ objectFit: "cover", objectPosition: "top center" }}
              priority
            />
          </div>

          {/* Badge: Experience */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            style={{
              position: "absolute",
              bottom: -26, left: -24,
              background: "var(--badge-bg)",
              border: "1px solid var(--badge-border)",
              borderRadius: 16,
              padding: "12px 16px",
              boxShadow: "0 8px 28px rgba(0,0,0,0.4)",
              display: "flex", alignItems: "center", gap: 10,
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "rgba(91,60,245,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Briefcase size={16} style={{ color: "#818CF8" }} />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text-1)", lineHeight: 1 }}>3+</div>
              <div style={{ fontSize: 10, color: "var(--text-2)", fontWeight: 500, marginTop: 2 }}>Years Exp.</div>
            </div>
          </motion.div>

          {/* Badge: Projects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            style={{
              position: "absolute",
              top: -26, right: -24,
              background: "var(--badge-bg)",
              border: "1px solid var(--badge-border)",
              borderRadius: 16,
              padding: "12px 16px",
              boxShadow: "0 8px 28px rgba(0,0,0,0.4)",
              display: "flex", alignItems: "center", gap: 10,
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "rgba(0,168,130,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Code2 size={16} style={{ color: "#2DD4BF" }} />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text-1)", lineHeight: 1 }}>8+</div>
              <div style={{ fontSize: 10, color: "var(--text-2)", fontWeight: 500, marginTop: 2 }}>Projects</div>
            </div>
          </motion.div>
        </motion.div>
        </div>{/* /hero-columns */}

        {/* CONNECT — full-width centered below both columns */}
        <motion.div
          {...fadeUp(0.7)}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", width: "180px" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: "9px", color: "var(--text-3)", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              connect
            </span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          <div className="hero-socials" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            {socials.map(({ icon: Icon, href, label, color, bg, border }) => (
              <div key={label} style={{ position: "relative" }}>
                <motion.a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  download={label === "Resume" ? "Muhammad_Shakoor_Resume.pdf" : undefined}
                  onMouseEnter={() => setHoveredSocial(label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.1, y: -5, boxShadow: "0 8px 24px rgba(13,13,13,0.08)" }}
                  whileTap={{ scale: 0.94 }}
                  className="hero-social-icon"
                  style={{
                    width: 46, height: 46, borderRadius: 12,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: bg, border: `1px solid ${border}`, textDecoration: "none",
                  }}
                >
                  <Icon size={18} style={{ color }} />
                </motion.a>
                {hoveredSocial === label && (
                  <div style={{
                    position: "absolute",
                    bottom: "calc(100% + 10px)", left: "50%",
                    transform: "translateX(-50%)",
                    background: "#1a1a2e", color: "#e2e8f0",
                    fontSize: "11px", fontWeight: 500,
                    padding: "5px 10px", borderRadius: 7,
                    whiteSpace: "nowrap",
                    border: "1px solid rgba(255,255,255,0.1)",
                    pointerEvents: "none", zIndex: 50,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}>
                    {label === "Resume" ? "Download Resume" : label}
                    <div style={{
                      position: "absolute",
                      top: "100%", left: "50%",
                      transform: "translateX(-50%)",
                      width: 0, height: 0,
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderTop: "5px solid #1a1a2e",
                    }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute", bottom: "32px", left: 0, right: 0,
          display: "flex", justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <motion.button
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
            color: "var(--text-3)", background: "none", border: "none", cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          <span style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            scroll
          </span>
          <ArrowDown size={13} />
        </motion.button>
      </motion.div>

      <style>{`
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--hero-grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(circle at center, black 0%, transparent 72%);
        }

        .hero-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(48px);
          animation: heroFloat 8s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        .cursor-blink { animation: blink 1s step-end infinite; }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (max-width: 860px) {
          .hero-content {
            padding-top: 90px !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }

          .hero-columns {
            flex-direction: column-reverse !important;
            align-items: center !important;
            gap: 44px !important;
            margin-bottom: 28px !important;
            text-align: center;
          }

          .hero-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }

          .hero-badge {
            display: flex;
            justify-content: center;
          }

          .hero-typewriter {
            justify-content: center !important;
          }

          .hero-image-col {
            width: 260px !important;
            margin-top: 0 !important;
          }

          .hero-cta-buttons {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-socials {
            gap: 8px !important;
            max-width: 320px;
          }

          .hero-social-icon {
            width: 40px !important;
            height: 40px !important;
            border-radius: 10px !important;
          }
        }

        @media (max-width: 360px) {
          .hero-socials {
            gap: 6px !important;
            max-width: 280px;
          }

          .hero-social-icon {
            width: 36px !important;
            height: 36px !important;
            border-radius: 9px !important;
          }
        }
      `}</style>
    </section>
  );
}

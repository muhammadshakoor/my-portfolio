"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Briefcase } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const roles = [
  "Full Stack Developer",
  "React & TypeScript Expert",
  "Power Platform Specialist",
  "Node.js Developer",
  "Automation Engineer",
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
    color: "#0D0D0D",
    bg: "rgba(13,13,13,0.04)",
    border: "#E8E8E2",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/muhammad-shakoor-2971a6117/",
    label: "LinkedIn",
    color: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
    border: "rgba(91,60,245,0.18)",
  },
  {
    icon: FaXTwitter,
    href: "https://twitter.com/Muhamma45190755",
    label: "Twitter",
    color: "#0D0D0D",
    bg: "rgba(13,13,13,0.04)",
    border: "#E8E8E2",
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
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(true);
  const [dots, setDots] = useState<Dot[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const COLORS = ["#5B3CF5", "#00A882", "#e84a2a", "#c026d3"];

    setDots(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        color: COLORS[i % COLORS.length],
        dur: Math.random() * 4 + 4,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  useEffect(() => {
    const cur = roles[roleIdx];

    if (typing) {
      if (text.length < cur.length) {
        timer.current = setTimeout(
          () => setText(cur.slice(0, text.length + 1)),
          65
        );
      } else {
        timer.current = setTimeout(() => setTyping(false), 2400);
      }
    } else {
      if (text.length > 0) {
        timer.current = setTimeout(() => setText((t) => t.slice(0, -1)), 30);
      } else {
        setRoleIdx((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
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
      style={{ background: "#FAFAF7" }}
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

      {/* Soft grid */}
      <div className="hero-grid pointer-events-none" />

      {/* Light orbs */}
      <div
        className="hero-orb"
        style={{
          width: 520,
          height: 520,
          top: "14%",
          left: -160,
          background: "rgba(91,60,245,0.10)",
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: 380,
          height: 380,
          bottom: "16%",
          right: -90,
          background: "rgba(0,168,130,0.08)",
          animationDelay: "3s",
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: 280,
          height: 280,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(232,74,42,0.055)",
          animationDelay: "1.5s",
        }}
      />

      {/* Floating dots */}
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            opacity: 0.28,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.18, 0.45, 0.18] }}
          transition={{
            duration: d.dur,
            repeat: Infinity,
            delay: d.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main content */}
      <div
        className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center"
        style={{ paddingTop: "108px", paddingBottom: "88px" }}
      >
        {/* Status badge */}
        <motion.div
          {...fadeUp(0.1)}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "36px",
          }}
        >
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
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#16a34a",
                flexShrink: 0,
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
          <span
            style={{
              width: 20,
              height: 2,
              background: "#5B3CF5",
              borderRadius: 1,
              display: "inline-block",
            }}
          />
          Hi, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.3)}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            lineHeight: 1,
            fontSize: "clamp(3.6rem, 9vw, 7.5rem)",
            letterSpacing: "-0.04em",
            marginBottom: "16px",
            color: "#0D0D0D",
          }}
        >
          <span style={{ color: "#5B3CF5" }}>Muhammad</span>
          <br />
          <span style={{ color: "#0D0D0D" }}>Shakoor</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          {...fadeUp(0.4)}
          style={{
            height: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              fontWeight: 600,
              color: "#3A3A3A",
            }}
          >
            {text}
            <span
              className="cursor-blink"
              style={{ color: "#5B3CF5", marginLeft: "2px" }}
            >
              |
            </span>
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          {...fadeUp(0.5)}
          style={{
            color: "#7A7A7A",
            fontSize: "clamp(0.95rem, 2vw, 1.08rem)",
            lineHeight: 1.75,
            maxWidth: "610px",
            margin: "0 auto",
            marginBottom: "56px",
            fontWeight: 300,
          }}
        >
          Associate Full Stack Developer &amp; Automation Engineer at{" "}
          <span style={{ color: "#0D0D0D", fontWeight: 500 }}>
            Blutech Consulting
          </span>
          . Building scalable web applications and enterprise automation with{" "}
          <span style={{ color: "#5B3CF5", fontWeight: 600 }}>React</span>,{" "}
          <span style={{ color: "#00A882", fontWeight: 600 }}>Node.js</span>,
          and{" "}
          <span style={{ color: "#e84a2a", fontWeight: 600 }}>
            Power Platform
          </span>
          .
        </motion.p>

        {/* CTA + Social */}
        <motion.div
          {...fadeUp(0.6)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "28px",
          }}
        >
          {/* Primary buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "14px",
            }}
          >
            <button
              onClick={() =>
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 22px",
                borderRadius: 14,
                background: "#5B3CF5",
                color: "#fff",
                border: "1px solid #5B3CF5",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 10px 24px rgba(91,60,245,0.22)",
              }}
            >
              <Briefcase size={16} /> View My Work
            </button>

            <a
              href="https://github.com/muhammadshakoor"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 22px",
                borderRadius: 14,
                background: "#fff",
                color: "#0D0D0D",
                border: "1px solid #E8E8E2",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <FaGithub size={16} /> GitHub Profile
            </a>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              width: "180px",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "#E8E8E2" }} />
            <span
              style={{
                fontSize: "9px",
                color: "#B0B0A8",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              connect
            </span>
            <div style={{ flex: 1, height: 1, background: "#E8E8E2" }} />
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {socials.map(({ icon: Icon, href, label, color, bg, border }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  boxShadow: "0 8px 24px rgba(13,13,13,0.08)",
                }}
                whileTap={{ scale: 0.94 }}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: bg,
                  border: `1px solid ${border}`,
                  textDecoration: "none",
                }}
              >
                <Icon size={18} style={{ color }} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() =>
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          delay: 1.5,
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          color: "#B0B0A8",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <ArrowDown size={13} />
      </motion.button>

      {/* Local styles */}
      <style>{`
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(13,13,13,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,13,13,0.035) 1px, transparent 1px);
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
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-18px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.35;
          }
        }

        .cursor-blink {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
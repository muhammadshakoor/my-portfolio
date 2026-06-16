"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaWhatsapp, FaFacebook, FaInstagram, FaThreads } from "react-icons/fa6";

const nav = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Footer() {
  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const go = (id: string) => {
    document.querySelector(`#${id.toLowerCase()}`)?.scrollIntoView({
      behavior: "smooth",
    });
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
      color: "#0D0D0D",
      bg: "rgba(13,13,13,0.04)",
      border: "#E8E8E2",
    },
  ];

  return (
    <footer
      style={{
        background: "#FAFAF7",
        borderTop: "1px solid #E8E8E2",
        position: "relative",
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
        className="footer-container"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "42px 48px 28px",
        }}
      >
        {/* Top footer row */}
        <div
          className="footer-main-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 28,
          }}
        >
          {/* Brand */}
          <button
            onClick={top}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image src="/logo.png" alt="MS" width={52} height={52} style={{ objectFit: "contain" }} />
          </button>

          {/* Nav */}
          <nav
            className="footer-nav"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 22,
            }}
          >
            {nav.map((l) => (
              <button
                key={l}
                onClick={() => go(l)}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#7A7A7A",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#5B3CF5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#7A7A7A";
                }}
              >
                {l}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div
            style={{
              display: "flex",
              gap: 9,
            }}
          >
            {socials.map(({ icon: Icon, href, label, color, bg, border }) => (
              <div key={label} style={{ position: "relative" }}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onMouseEnter={() => setHoveredSocial(label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.1, y: -3, boxShadow: "0 8px 22px rgba(13,13,13,0.08)" }}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: bg, border: `1px solid ${border}`, textDecoration: "none",
                  }}
                >
                  <Icon size={15} style={{ color }} />
                </motion.a>

                {hoveredSocial === label && (
                  <div style={{
                    position: "absolute",
                    bottom: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#1a1a2e",
                    color: "#e2e8f0",
                    fontSize: "11px",
                    fontWeight: 500,
                    padding: "4px 10px",
                    borderRadius: 6,
                    whiteSpace: "nowrap",
                    border: "1px solid rgba(255,255,255,0.1)",
                    pointerEvents: "none",
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}>
                    {label}
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
        </div>

        {/* Divider */}
        <div
          style={{
            margin: "28px 0 18px",
            height: 1,
            background: "#E8E8E2",
          }}
        />

        {/* Bottom footer row */}
        <div
          className="footer-bottom-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            fontSize: 12,
            color: "#7A7A7A",
          }}
        >
          <span
            className="footer-built-text"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              lineHeight: 1.6,
            }}
          >
            Built with
            <Heart size={12} color="#5B3CF5" fill="#5B3CF5" />
            using Next.js, TypeScript & Tailwind CSS
          </span>

          <span style={{ color: "#7A7A7A" }}>
            © {new Date().getFullYear()} Muhammad Shakoor
          </span>

          <motion.button
            onClick={top}
            whileHover={{
              scale: 1.1,
              y: -3,
              boxShadow: "0 8px 22px rgba(91,60,245,0.18)",
            }}
            whileTap={{ scale: 0.92 }}
            aria-label="Back to top"
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(91,60,245,0.08)",
              border: "1px solid rgba(91,60,245,0.18)",
              color: "#5B3CF5",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-container {
            padding-left: 22px !important;
            padding-right: 22px !important;
          }

          .footer-main-row {
            flex-direction: column !important;
            text-align: center !important;
          }

          .footer-nav {
            gap: 14px !important;
          }

          .footer-bottom-row {
            flex-direction: column !important;
            text-align: center !important;
          }

          .footer-built-text {
            justify-content: center !important;
            flex-wrap: wrap !important;
          }
        }
      `}</style>
    </footer>
  );
}
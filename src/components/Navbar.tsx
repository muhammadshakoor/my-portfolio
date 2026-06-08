"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Scroll spy — find which section's top is closest above the navbar
      const navHeight = 90;
      let current = "";
      for (const { href } of links) {
        const el = document.getElementById(href.slice(1));
        if (!el) continue;
        if (el.getBoundingClientRect().top <= navHeight) {
          current = href;
        }
      }
      if (current) setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close panel when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const panel = document.getElementById("mobile-menu-panel");
      const toggle = document.getElementById("mobile-menu-toggle");
      if (
        panel && !panel.contains(e.target as Node) &&
        toggle && !toggle.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const go = (href: string) => {
    setActive(href);
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        width: "100%",
        background: scrolled ? "rgba(30,30,35,0.97)" : "rgba(30,30,35,0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled
          ? "0 4px 28px rgba(0,0,0,0.22)"
          : "0 2px 14px rgba(0,0,0,0.12)",
      }}
    >
      {/* Main navbar */}
      <div
        className="navbar-inner"
        style={{
          width: "100%",
          height: 84,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Go to top"
          style={{
            width: 90,
            height: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          <Image
            src="/logo.png"
            alt="MS"
            width={90}
            height={90}
            style={{ objectFit: "contain" }}
            priority
          />
        </button>

        {/* Desktop nav + CTA */}
        <div
          className="hidden md:flex items-center navbar-right"
          style={{
            gap: 14,
          }}
        >
          {/* Desktop nav links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {links.map((l) => {
              const isActive = active === l.href;

              return (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="relative text-sm rounded-xl transition-colors duration-200"
                  style={{
                    minHeight: 38,
                    padding: "9px 16px",
                    color: isActive ? "#ffffff" : "#C9C6D8",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "0.01em",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    lineHeight: 1,
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#ffffff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#C9C6D8";
                    }
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute rounded-xl"
                      style={{
                        inset: 0,
                        background:
                          "linear-gradient(135deg, rgba(22,153,255,0.22), rgba(91,60,245,0.34))",
                        border: "1px solid rgba(135,116,255,0.26)",
                        boxShadow:
                          "0 6px 18px rgba(91,60,245,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {l.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 24,
              background:
                "linear-gradient(180deg, transparent, rgba(255,255,255,0.18), transparent)",
              marginLeft: 4,
              marginRight: 4,
            }}
          />

          {/* Hire Me */}
          <motion.button
            onClick={() => go("#contact")}
            whileHover={{
              scale: 1.04,
              boxShadow:
                "0 10px 28px rgba(91,60,245,0.38), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
            whileTap={{ scale: 0.96 }}
            className="text-sm"
            style={{
              borderRadius: 12,
              padding: "11px 26px",
              background: "linear-gradient(135deg, #129DFF 0%, #5B3CF5 58%, #6D35F5 100%)",
              color: "#ffffff",
              fontWeight: 800,
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 6px 20px rgba(91,60,245,0.32)",
              cursor: "pointer",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden rounded-xl transition-colors"
          style={{
            padding: "10px 12px",
            background: "rgba(255,255,255,0.07)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.12)",
            cursor: "pointer",
          }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu-panel"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.22, type: "spring", stiffness: 300, damping: 28 }}
            className="absolute z-50"
            style={{
              top: 92,
              right: 16,
              width: 210,
              borderRadius: 18,
              padding: 10,
              background: "rgba(28,28,33,0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
            }}
          >
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="w-full text-left rounded-xl text-sm font-medium transition-colors duration-150"
                  style={{
                    padding: "12px 16px",
                    color: isActive ? "#ffffff" : "#C9C6D8",
                    background: isActive
                      ? "linear-gradient(135deg, rgba(22,153,255,0.18), rgba(91,60,245,0.28))"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(135,116,255,0.22)"
                      : "1px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  {l.label}
                </button>
              );
            })}

            <div
              className="mt-2 pt-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <button
                onClick={() => go("#contact")}
                className="w-full text-sm"
                style={{
                  borderRadius: 10,
                  padding: "11px 16px",
                  background: "linear-gradient(135deg, #129DFF 0%, #5B3CF5 58%, #6D35F5 100%)",
                  color: "#ffffff",
                  fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.10)",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(91,60,245,0.28)",
                }}
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1180px) {
          .navbar-inner {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }

          .navbar-right {
            gap: 10px !important;
          }

          .navbar-right nav {
            gap: 6px !important;
          }

          .navbar-right nav button {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
        }

        @media (max-width: 1024px) {
          .navbar-inner {
            padding-left: 28px !important;
            padding-right: 28px !important;
          }

          .navbar-right nav button {
            padding-left: 10px !important;
            padding-right: 10px !important;
          }
        }

        @media (max-width: 768px) {
          .navbar-inner {
            height: 72px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

        }
      `}</style>
    </motion.header>
  );
}
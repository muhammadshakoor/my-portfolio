"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const router = useRouter();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

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
    if (href.startsWith("/")) {
      router.push(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        width: "100%",
        background: scrolled ? "var(--nav-bg-scroll)" : "var(--nav-bg-top)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: scrolled
          ? "1px solid var(--nav-border)"
          : "1px solid var(--nav-border-top)",
        boxShadow: scrolled ? "var(--nav-shadow)" : "none",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Main navbar */}
      <div
        className="navbar-inner"
        style={{
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Go to top"
          style={{
            width: 56,
            height: 56,
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
            alt="Muhammad Shakoor logo"
            width={52}
            height={52}
            style={{ objectFit: "contain" }}
            priority
          />
        </button>

        {/* Desktop nav + CTA */}
        <div className="hidden md:flex items-center navbar-right" style={{ gap: 14 }}>
          {/* Desktop nav links */}
          <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {links.map((l) => {
              const isActive = active === l.href;

              return (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="relative text-sm rounded-xl transition-colors duration-200"
                  style={{
                    minHeight: 32,
                    padding: "7px 13px",
                    fontSize: 13,
                    color: isActive ? "var(--nav-active)" : "var(--nav-link)",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: "0.01em",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    lineHeight: 1,
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--nav-link-hover)";
                      e.currentTarget.style.background = "var(--nav-link-hover-bg)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--nav-link)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute rounded-xl"
                      style={{
                        inset: 0,
                        background: "var(--nav-active-bg)",
                        border: "1px solid var(--nav-active-border)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <span style={{ position: "relative", zIndex: 1, whiteSpace: "nowrap" }}>
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
              background: "linear-gradient(180deg, transparent, var(--border), transparent)",
              marginLeft: 4,
              marginRight: 4,
            }}
          />

          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--toggle-bg)",
              border: "1px solid var(--toggle-border)",
              color: "var(--toggle-color)",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.2s, border-color 0.2s",
            }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>

          {/* Hire Me */}
          <motion.button
            onClick={() => go("#contact")}
            whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(91,60,245,0.32)" }}
            whileTap={{ scale: 0.96 }}
            className="text-sm"
            style={{
              borderRadius: 12,
              padding: "9px 20px",
              fontSize: 13,
              background: "linear-gradient(135deg, #6D4DFF 0%, #5B3CF5 100%)",
              color: "#ffffff",
              fontWeight: 700,
              border: "none",
              boxShadow: "0 6px 18px rgba(91,60,245,0.24)",
              cursor: "pointer",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile right side: theme toggle + hamburger */}
        <div className="flex md:hidden" style={{ alignItems: "center", gap: 8 }}>
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--toggle-bg)",
              border: "1px solid var(--toggle-border)",
              color: "var(--toggle-color)",
              cursor: "pointer",
            }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>

          <button
            id="mobile-menu-toggle"
            className="rounded-xl transition-colors"
            style={{
              padding: "7px 9px",
              background: "var(--toggle-bg)",
              color: "var(--text-1)",
              border: "1px solid var(--toggle-border)",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu-panel"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -1,
          left: 0,
          right: 0,
          height: 2,
          transformOrigin: "0%",
          scaleX: progress,
          background: "linear-gradient(90deg, #5B3CF5, #00A882)",
        }}
      />

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
              top: 72,
              right: 16,
              width: 210,
              borderRadius: 18,
              padding: 10,
              background: "var(--menu-bg)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--menu-border)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
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
                    color: isActive ? "var(--nav-active)" : "var(--nav-link)",
                    background: isActive ? "var(--nav-active-bg)" : "transparent",
                    border: isActive
                      ? "1px solid var(--nav-active-border)"
                      : "1px solid transparent",
                    cursor: "pointer",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "var(--nav-link-hover-bg)";
                      e.currentTarget.style.color = "var(--nav-link-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--nav-link)";
                    }
                  }}
                >
                  {l.label}
                </button>
              );
            })}

            <div className="mt-2 pt-2" style={{ borderTop: "1px solid var(--menu-divider)" }}>
              <button
                onClick={() => go("#contact")}
                className="w-full text-sm"
                style={{
                  borderRadius: 10,
                  padding: "11px 16px",
                  background: "linear-gradient(135deg, #6D4DFF 0%, #5B3CF5 100%)",
                  color: "#ffffff",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(91,60,245,0.24)",
                }}
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .navbar-inner {
            height: 58px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>
    </motion.header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function BlogHeader() {
  const { theme, toggle } = useTheme();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--nav-bg-scroll)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: "1px solid var(--nav-border)",
        boxShadow: "var(--nav-shadow)",
      }}
    >
      <div
        style={{
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
        <Link href="/" aria-label="Back to portfolio" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/logo.png"
            alt="Muhammad Shakoor logo"
            width={48}
            height={48}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Blog title */}
        <span
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: "var(--text-1)",
            letterSpacing: "-0.3px",
          }}
        >
          Blog
        </span>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={toggle}
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
              transition: "background 0.2s",
            }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              color: "var(--nav-link)",
              textDecoration: "none",
              padding: "7px 13px",
              borderRadius: 10,
              background: "var(--toggle-bg)",
              border: "1px solid var(--toggle-border)",
              transition: "color 0.15s",
            }}
          >
            <ArrowLeft size={13} />
            Portfolio
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .blog-header-inner {
            padding-left: 16px !important;
            padding-right: 16px !important;
            height: 56px !important;
          }
        }
      `}</style>
    </header>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

const suggestions = [
  { href: "/#projects", label: "Projects", desc: "Case studies and source code" },
  { href: "/blog", label: "Blog", desc: "Writing on engineering and automation" },
  { href: "/#contact", label: "Contact", desc: "Start a project or say hello" },
];

export default function NotFound() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "96px 24px",
        background: "var(--bg-section)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 720, textAlign: "center" }}>
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
            marginBottom: 18,
          }}
        >
          <Compass size={13} />
          Error 404
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 9vw, 5rem)",
            color: "var(--text-1)",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          This page doesn&apos;t exist
        </h1>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: "var(--text-2)",
            fontWeight: 300,
            maxWidth: 480,
            margin: "0 auto 36px",
          }}
        >
          The link may be broken or the page may have moved. Here&apos;s where most
          people are headed.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 36,
            textAlign: "left",
          }}
        >
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              style={{
                display: "block",
                padding: "16px 18px",
                borderRadius: 16,
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                textDecoration: "none",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--text-1)",
                  marginBottom: 4,
                }}
              >
                {s.label}
              </span>
              <span style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 300, lineHeight: 1.5 }}>
                {s.desc}
              </span>
            </Link>
          ))}
        </div>

        <div style={{ marginBottom: 36 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-3)",
              marginBottom: 12,
            }}
          >
            Featured case studies
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 14px",
                  borderRadius: 999,
                  fontSize: 12.5,
                  fontWeight: 500,
                  background: p.bg,
                  color: p.color,
                  border: `1px solid ${p.border}`,
                  textDecoration: "none",
                }}
              >
                <span aria-hidden>{p.emoji}</span>
                {p.title}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "13px 22px",
            borderRadius: 14,
            background: "#5B3CF5",
            color: "#fff",
            border: "1px solid #5B3CF5",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 10px 24px rgba(91,60,245,0.22)",
          }}
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    </main>
  );
}

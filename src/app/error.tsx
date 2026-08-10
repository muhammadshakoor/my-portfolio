"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "min(100svh, 920px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(72px, 8vw, 96px) 24px",
        background: "var(--bg-section)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 560, textAlign: "center" }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 22px",
            background: "rgba(232,74,42,0.08)",
            border: "1px solid rgba(232,74,42,0.2)",
          }}
        >
          <AlertTriangle size={22} style={{ color: "#e84a2a" }} />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.9rem, 5vw, 2.6rem)",
            color: "var(--text-1)",
            letterSpacing: "-1px",
            lineHeight: 1.15,
            marginBottom: 14,
          }}
        >
          Something went wrong
        </h1>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: "var(--text-2)",
            fontWeight: 300,
            marginBottom: 30,
          }}
        >
          This part of the page failed to load. Trying again usually fixes it — if
          it doesn&apos;t, email me at{" "}
          <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--accent-highlight)", fontWeight: 500 }}>
            {siteConfig.email}
          </a>
          .
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => unstable_retry()}
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
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(91,60,245,0.22)",
            }}
          >
            <RotateCw size={16} />
            Try again
          </button>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 22px",
              borderRadius: 14,
              background: "var(--bg-card)",
              color: "var(--text-1)",
              border: "1px solid var(--border)",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>

        {error.digest && (
          <p style={{ marginTop: 26, fontSize: 11, color: "var(--text-3)", fontFamily: "monospace" }}>
            Reference: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}

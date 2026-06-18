import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;
  const description = project.desc;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `/projects/${project.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { caseStudy } = project;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteConfig.url}/#projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${siteConfig.url}/projects/${project.slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.desc,
        url: `${siteConfig.url}/projects/${project.slug}`,
        author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
        keywords: project.tags.join(", "),
      },
    ],
  };

  const meta = [
    { label: "Role", value: caseStudy.role },
    { label: "Timeline", value: caseStudy.timeline },
    { label: "Category", value: project.cat },
    { label: "Stack", value: project.tags.slice(0, 3).join(" · ") },
  ];

  return (
    <main
      id="main"
      style={{ background: "var(--bg-section)", minHeight: "100vh", position: "relative" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "56px 24px 96px",
        }}
      >
        {/* Back link */}
        <Link
          href="/#projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text-2)",
            textDecoration: "none",
            padding: "8px 14px",
            borderRadius: 10,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            marginBottom: 40,
          }}
        >
          <ArrowLeft size={14} />
          All Projects
        </Link>

        {/* Header */}
        <header style={{ marginBottom: 36 }}>
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 13px",
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: project.color,
              background: project.bg,
              border: `1px solid ${project.border}`,
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: project.color,
              }}
            />
            {project.cat}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--text-1)",
              letterSpacing: "-1px",
              lineHeight: 1.1,
              marginBottom: 10,
            }}
          >
            {project.title}
          </h1>

          <p style={{ fontSize: 17, color: "var(--text-2)", fontWeight: 300 }}>
            {project.sub}
          </p>
        </header>

        {/* Hero visual — browser frame */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${project.border}`,
            background: `linear-gradient(135deg, ${project.color}18, var(--bg-section, transparent))`,
            marginBottom: 36,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              background: "var(--badge-bg)",
              borderBottom: `1px solid ${project.border}`,
            }}
          >
            <span style={{ display: "flex", gap: 6 }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                <span
                  key={c}
                  style={{ width: 10, height: 10, borderRadius: "50%", background: c }}
                />
              ))}
            </span>
            <span
              style={{
                flex: 1,
                maxWidth: 280,
                margin: "0 auto",
                padding: "4px 14px",
                borderRadius: 999,
                background: "var(--bg-input)",
                border: "1px solid var(--border)",
                fontSize: 11,
                color: "var(--text-2)",
                textAlign: "center",
                fontFamily: "monospace",
              }}
            >
              {project.slug}.app
            </span>
          </div>

          <div
            style={{
              height: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(${project.color}35 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
                opacity: 0.28,
              }}
            />
            <span style={{ fontSize: 84, position: "relative" }}>{project.emoji}</span>
          </div>
        </div>

        {/* Meta grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 44,
          }}
        >
          {meta.map((m) => (
            <div
              key={m.label}
              style={{
                padding: "14px 16px",
                borderRadius: 14,
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-3)",
                  marginBottom: 5,
                }}
              >
                {m.label}
              </p>
              <p style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-1)" }}>
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* Overview */}
        <section style={{ marginBottom: 44 }}>
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: "var(--text-1)",
              letterSpacing: "-0.5px",
              marginBottom: 16,
            }}
          >
            Overview
          </h2>
          {caseStudy.overview.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: "var(--text-b)",
                fontWeight: 300,
                marginTop: i > 0 ? 14 : 0,
              }}
            >
              {para}
            </p>
          ))}
        </section>

        {/* Challenges */}
        <section style={{ marginBottom: 44 }}>
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: "var(--text-1)",
              letterSpacing: "-0.5px",
              marginBottom: 18,
            }}
          >
            Challenges &amp; Solutions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {caseStudy.challenges.map((c, i) => (
              <div
                key={c.title}
                style={{
                  padding: "20px 22px",
                  borderRadius: 16,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--text-1)",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      background: project.bg,
                      border: `1px solid ${project.border}`,
                      color: project.color,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  {c.title}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: "var(--text-2)",
                    fontWeight: 300,
                  }}
                >
                  {c.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section style={{ marginBottom: 44 }}>
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: "var(--text-1)",
              letterSpacing: "-0.5px",
              marginBottom: 16,
            }}
          >
            Outcomes
          </h2>

          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {caseStudy.outcomes.map((o) => (
              <li
                key={o}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 14.5,
                  color: "var(--text-b)",
                  lineHeight: 1.6,
                }}
              >
                <CheckCircle2
                  size={17}
                  style={{ color: "#00A882", flexShrink: 0, marginTop: 3 }}
                />
                {o}
              </li>
            ))}
          </ul>
        </section>

        {/* Tech stack */}
        <section style={{ marginBottom: 52 }}>
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: "var(--text-1)",
              letterSpacing: "-0.5px",
              marginBottom: 16,
            }}
          >
            Tech Stack
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tags.map((t) => (
              <span
                key={t}
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 12.5,
                  fontWeight: 500,
                  background: project.bg,
                  color: project.color,
                  border: `1px solid ${project.border}`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Links / CTA */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            paddingTop: 28,
            borderTop: "1px solid var(--border)",
          }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 14,
              background: "var(--text-1)",
              color: "var(--btn-solid-fg)",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <FaGithub size={15} />
            View Source
          </a>

          {project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 14,
                background: "var(--bg-card)",
                color: "var(--text-1)",
                border: "1px solid var(--border)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Live Demo
              <ArrowUpRight size={14} />
            </a>
          )}

          <Link
            href="/#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 14,
              background: "#5B3CF5",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 10px 24px rgba(91,60,245,0.22)",
              marginLeft: "auto",
            }}
          >
            Work With Me
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </article>
    </main>
  );
}

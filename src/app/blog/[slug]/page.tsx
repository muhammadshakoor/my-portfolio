import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { CATEGORY_STYLES } from "@/lib/blog-config";
import { siteConfig } from "@/lib/site";
import BlogHeader from "@/components/blog/BlogHeader";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const catStyle = CATEGORY_STYLES[post.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <main id="main" style={{ minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <BlogHeader />

      <article
        style={{
          maxWidth: 780,
          margin: "0 auto",
          padding: "48px 24px 96px",
        }}
      >
        {/* Back link */}
        <Link
          href="/blog"
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
          <ArrowLeft size={13} />
          All Posts
        </Link>

        {/* Header */}
        <header style={{ marginBottom: 40 }}>
          {catStyle && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: catStyle.color,
                background: catStyle.bg,
                border: `1px solid ${catStyle.border}`,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: catStyle.color,
                }}
              />
              {post.category}
            </span>
          )}

          <h1
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--text-1)",
              letterSpacing: "-1px",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "var(--text-2)",
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              padding: "14px 18px",
              borderRadius: 12,
              background: "var(--bg-meta)",
              border: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "var(--text-2)",
              }}
            >
              <Calendar size={13} style={{ color: "var(--text-3)" }} />
              {formatDate(post.date)}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "var(--text-2)",
              }}
            >
              <Clock size={13} style={{ color: "var(--text-3)" }} />
              {post.readTime} min read
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexWrap: "wrap",
                marginLeft: "auto",
              }}
            >
              <Tag size={11} style={{ color: "var(--text-3)" }} />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "3px 9px",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--chip-n-color)",
                    background: "var(--chip-n-bg)",
                    border: "1px solid var(--chip-n-border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, var(--divider), transparent)",
            marginBottom: 40,
          }}
        />

        {/* Post content */}
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: 64,
            padding: "32px",
            borderRadius: 18,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--text-1)",
              marginBottom: 8,
            }}
          >
            Want to work together?
          </p>
          <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 20 }}>
            I&apos;m available for Full Stack and automation projects.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/#contact"
              style={{
                padding: "11px 24px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #6D4DFF 0%, #5B3CF5 100%)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(91,60,245,0.25)",
              }}
            >
              Get in Touch
            </Link>
            <Link
              href="/blog"
              style={{
                padding: "11px 24px",
                borderRadius: 12,
                background: "var(--bg-card)",
                color: "var(--text-1)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid var(--border)",
              }}
            >
              More Posts
            </Link>
          </div>
        </div>
      </article>

      <style>{`
        .prose-content {
          color: var(--text-b);
          font-size: 15.5px;
          line-height: 1.85;
        }
        .prose-content h1,
        .prose-content h2,
        .prose-content h3,
        .prose-content h4 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -0.4px;
          margin-top: 40px;
          margin-bottom: 16px;
          line-height: 1.25;
        }
        .prose-content h1 { font-size: 2rem; }
        .prose-content h2 { font-size: 1.5rem; }
        .prose-content h3 { font-size: 1.2rem; }
        .prose-content p { margin-bottom: 20px; }
        .prose-content a {
          color: var(--accent-highlight);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .prose-content strong { color: var(--text-1); font-weight: 600; }
        .prose-content code {
          font-family: "Fira Code", "Cascadia Code", monospace;
          font-size: 13px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 5px;
          padding: 2px 6px;
          color: var(--accent-highlight);
        }
        .prose-content pre {
          background: rgba(0,0,0,0.25);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 20px 22px;
          overflow-x: auto;
          margin: 24px 0;
        }
        [data-theme="light"] .prose-content pre { background: #f5f5f0; }
        .prose-content pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 13.5px;
          color: var(--text-b);
        }
        .prose-content ul,
        .prose-content ol { padding-left: 24px; margin-bottom: 20px; }
        .prose-content li { margin-bottom: 8px; }
        .prose-content blockquote {
          border-left: 3px solid var(--accent-highlight);
          padding-left: 18px;
          margin: 24px 0;
          color: var(--text-2);
          font-style: italic;
        }
        .prose-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0;
          font-size: 14px;
        }
        .prose-content th {
          text-align: left;
          padding: 10px 14px;
          background: var(--bg-meta);
          border: 1px solid var(--border);
          color: var(--text-1);
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .prose-content td {
          padding: 10px 14px;
          border: 1px solid var(--border);
          color: var(--text-b);
        }
        .prose-content tr:nth-child(even) td { background: var(--bg-card); }
        .prose-content hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 36px 0;
        }
      `}</style>
    </main>
  );
}

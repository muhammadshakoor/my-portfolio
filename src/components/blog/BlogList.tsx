"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, Calendar, ArrowRight, Tag } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import { CATEGORIES, CATEGORY_STYLES, type Category } from "@/lib/blog-config";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [posts, activeCategory, search]);

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "72px 24px 56px",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(91,60,245,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 14px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#5B3CF5",
            background: "rgba(91,60,245,0.08)",
            border: "1px solid rgba(91,60,245,0.2)",
            marginBottom: 20,
          }}
        >
          <Tag size={10} />
          Developer Blog
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            color: "var(--text-1)",
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Insights on{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #5B3CF5, #00C8FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Full Stack & AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: 16,
            color: "var(--text-2)",
            maxWidth: 520,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          Practical articles on Full Stack Development, AI Automation, Backend,
          and Frontend — updated regularly.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          style={{
            position: "relative",
            maxWidth: 460,
            margin: "0 auto",
          }}
        >
          <Search
            size={15}
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-3)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 14px 11px 38px",
              borderRadius: 12,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-1)",
              fontSize: 14,
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(91,60,245,0.4)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border)";
            }}
          />
        </motion.div>
      </div>

      {/* Category tabs */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const style = cat !== "All" ? CATEGORY_STYLES[cat] : null;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: isActive
                    ? style
                      ? style.bg
                      : "rgba(91,60,245,0.1)"
                    : "var(--bg-card)",
                  color: isActive
                    ? style
                      ? style.color
                      : "#5B3CF5"
                    : "var(--text-2)",
                  border: isActive
                    ? `1px solid ${style ? style.border : "rgba(91,60,245,0.25)"}`
                    : "1px solid var(--border)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Result count */}
        {(search || activeCategory !== "All") && (
          <p
            style={{
              fontSize: 13,
              color: "var(--text-3)",
              marginBottom: 20,
            }}
          >
            {filtered.length} post{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              color: "var(--text-2)",
            }}
          >
            <p style={{ fontSize: 16, marginBottom: 8 }}>No posts found.</p>
            <p style={{ fontSize: 13, color: "var(--text-3)" }}>
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <motion.div
            key={`${activeCategory}-${search}`}
            variants={container}
            initial="hidden"
            animate="show"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 20,
              paddingBottom: 96,
            }}
          >
            {filtered.map((post) => {
              const catStyle = CATEGORY_STYLES[post.category];
              return (
                <motion.article key={post.slug} variants={item}>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ textDecoration: "none", display: "block", height: "100%" }}
                  >
                    <div
                      style={{
                        padding: "24px",
                        borderRadius: 18,
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-sm)",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = catStyle
                          ? catStyle.border
                          : "rgba(91,60,245,0.25)";
                        el.style.boxShadow = "var(--shadow-md)";
                        el.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = "var(--border)";
                        el.style.boxShadow = "var(--shadow-sm)";
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      {/* Category badge */}
                      {catStyle && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 10px",
                            borderRadius: 999,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: catStyle.color,
                            background: catStyle.bg,
                            border: `1px solid ${catStyle.border}`,
                            width: "fit-content",
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

                      {/* Title */}
                      <h2
                        style={{
                          fontFamily: "var(--font-display), sans-serif",
                          fontWeight: 700,
                          fontSize: 17,
                          color: "var(--text-1)",
                          letterSpacing: "-0.3px",
                          lineHeight: 1.35,
                          margin: 0,
                        }}
                      >
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p
                        style={{
                          fontSize: 13.5,
                          color: "var(--text-2)",
                          lineHeight: 1.65,
                          margin: 0,
                          flex: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {post.tags.slice(0, 3).map((tag) => (
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
                      )}

                      {/* Footer */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: 14,
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              fontSize: 12,
                              color: "var(--text-3)",
                            }}
                          >
                            <Calendar size={11} />
                            {formatDate(post.date)}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              fontSize: 12,
                              color: "var(--text-3)",
                            }}
                          >
                            <Clock size={11} />
                            {post.readTime} min read
                          </span>
                        </div>

                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 12,
                            fontWeight: 600,
                            color: catStyle ? catStyle.color : "#5B3CF5",
                          }}
                        >
                          Read
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

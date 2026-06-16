"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail, MapPin, Send, CheckCircle, MessageSquare,
  Layers, Monitor, Server, Zap, Wrench, ChevronDown,
} from "lucide-react";
import {
  FaGithub, FaLinkedinIn, FaXTwitter, FaWhatsapp,
  FaFacebook, FaInstagram, FaThreads,
} from "react-icons/fa6";

/* ── static data ──────────────────────────────────── */
const socials = [
  { icon: FaGithub,    href: "https://github.com/muhammadshakoor",                       label: "GitHub",    color: "#0D0D0D", bg: "rgba(13,13,13,0.04)",    border: "#E8E8E2" },
  { icon: FaLinkedinIn,href: "https://www.linkedin.com/in/muhammad-shakoor-2971a6117/",  label: "LinkedIn",  color: "#5B3CF5", bg: "rgba(91,60,245,0.08)",   border: "rgba(91,60,245,0.18)" },
  { icon: FaXTwitter,  href: "https://twitter.com/Muhamma45190755",                      label: "Twitter",   color: "#0D0D0D", bg: "rgba(13,13,13,0.04)",    border: "#E8E8E2" },
  { icon: FaWhatsapp,  href: "https://wa.me/923107252754",                               label: "WhatsApp",  color: "#25D366", bg: "rgba(37,211,102,0.08)",  border: "rgba(37,211,102,0.22)" },
  { icon: FaFacebook,  href: "https://www.facebook.com/muhammad.shakoor.786",            label: "Facebook",  color: "#1877F2", bg: "rgba(24,119,242,0.08)",  border: "rgba(24,119,242,0.22)" },
  { icon: FaInstagram, href: "https://www.instagram.com/muhammadshakoor_official",       label: "Instagram", color: "#E1306C", bg: "rgba(225,48,108,0.08)", border: "rgba(225,48,108,0.22)" },
  { icon: FaThreads,   href: "https://www.threads.net/@muhammadshakoor_official",        label: "Threads",   color: "#0D0D0D", bg: "rgba(13,13,13,0.04)",    border: "#E8E8E2" },
];

type CatId = "fullstack" | "frontend" | "backend" | "automation" | "custom";
type Status = "idle" | "sending" | "sent" | "error";

const CATS = [
  { id: "fullstack"   as CatId, label: "Full Stack App",    icon: Layers,  color: "#5B3CF5", bg: "rgba(91,60,245,0.08)",  border: "rgba(91,60,245,0.18)",  desc: "End-to-end web application" },
  { id: "frontend"    as CatId, label: "Frontend Only",     icon: Monitor, color: "#00A882", bg: "rgba(0,168,130,0.08)",  border: "rgba(0,168,130,0.18)",  desc: "UI/UX & React development" },
  { id: "backend"     as CatId, label: "Backend / API",     icon: Server,  color: "#e84a2a", bg: "rgba(232,74,42,0.07)",  border: "rgba(232,74,42,0.18)",  desc: "APIs, databases & servers" },
  { id: "automation"  as CatId, label: "AI & Automation",   icon: Zap,     color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.22)", desc: "LangFlow, n8n, Power Platform" },
  { id: "custom"      as CatId, label: "Custom Work",       icon: Wrench,  color: "#6b7280", bg: "rgba(107,114,128,0.07)",border: "rgba(107,114,128,0.18)",desc: "Something else entirely" },
];

const emptyForm = {
  name: "", email: "", timeline: "", budget: "", message: "",
  projectType: "", techStack: [] as string[], features: [] as string[],
  framework: "", hasDesign: "",
  apiType: "", database: "", deployment: "",
  tools: [] as string[], currentSystem: "", automationGoal: "",
};

/* ── reusable mini-components ─────────────────────── */
function MultiPills({ options, selected, onToggle, color }: {
  options: string[]; selected: string[]; onToggle: (v: string) => void; color: string;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {options.map((opt) => {
        const on = selected.includes(opt);
        return (
          <button key={opt} type="button" onClick={() => onToggle(opt)} style={{
            padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 500,
            cursor: "pointer", transition: "all 0.15s",
            border: `1px solid ${on ? color : "#E8E8E2"}`,
            background: on ? color + "18" : "#FAFAF7",
            color: on ? color : "#7A7A7A",
          }}>{opt}</button>
        );
      })}
    </div>
  );
}

function RadioPills({ options, value, onChange, color }: {
  options: string[]; value: string; onChange: (v: string) => void; color: string;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {options.map((opt) => {
        const on = value === opt;
        return (
          <button key={opt} type="button" onClick={() => onChange(on ? "" : opt)} style={{
            padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 500,
            cursor: "pointer", transition: "all 0.15s",
            border: `1px solid ${on ? color : "#E8E8E2"}`,
            background: on ? color + "18" : "#FAFAF7",
            color: on ? color : "#7A7A7A",
          }}>{opt}</button>
        );
      })}
    </div>
  );
}

function Sel({ value, onChange, onFocus, onBlur, style, children }: {
  value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  style: React.CSSProperties; children: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur}
        className="contact-select" style={{ ...style, paddingRight: 36, cursor: "pointer" }}>
        {children}
      </select>
      <ChevronDown size={13} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#B0B0A8", pointerEvents: "none" }} />
    </div>
  );
}

function SectionDivider({ label, color }: { label: string; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 1, background: "#E8E8E2" }} />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: color ?? "#B0B0A8" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "#E8E8E2" }} />
    </div>
  );
}

/* ── main component ───────────────────────────────── */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [selectedCat, setSelectedCat] = useState<CatId | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");

  const activeCat = CATS.find((c) => c.id === selectedCat);

  const set = (key: keyof typeof emptyForm, val: unknown) =>
    setForm((p) => ({ ...p, [key]: val }));

  const toggle = (key: "techStack" | "features" | "tools", val: string) =>
    setForm((p) => ({
      ...p,
      [key]: (p[key] as string[]).includes(val)
        ? (p[key] as string[]).filter((x) => x !== val)
        : [...(p[key] as string[]), val],
    }));

  const selectCat = (id: CatId) => {
    setSelectedCat((prev) => (prev === id ? null : id));
    setForm((p) => ({
      ...p,
      projectType: "", techStack: [], features: [],
      framework: "", hasDesign: "",
      apiType: "", database: "", deployment: "",
      tools: [], currentSystem: "", automationGoal: "",
    }));
  };

  const buildMessage = () => {
    const lines = [`SERVICE REQUEST`, `Category: ${activeCat?.label}`, ``];
    if (selectedCat === "fullstack") {
      if (form.projectType) lines.push(`Project Type: ${form.projectType}`);
      if (form.techStack.length) lines.push(`Tech Stack: ${form.techStack.join(", ")}`);
      if (form.features.length) lines.push(`Features: ${form.features.join(", ")}`);
    } else if (selectedCat === "frontend") {
      if (form.framework) lines.push(`Framework: ${form.framework}`);
      if (form.hasDesign) lines.push(`Design: ${form.hasDesign}`);
    } else if (selectedCat === "backend") {
      if (form.apiType) lines.push(`API Type: ${form.apiType}`);
      if (form.database) lines.push(`Database: ${form.database}`);
      if (form.deployment) lines.push(`Deployment: ${form.deployment}`);
    } else if (selectedCat === "automation") {
      if (form.tools.length) lines.push(`Tools/Platforms: ${form.tools.join(", ")}`);
      if (form.currentSystem) lines.push(`Current System: ${form.currentSystem}`);
      if (form.automationGoal) lines.push(`Goal: ${form.automationGoal}`);
    }
    lines.push(``, `Timeline: ${form.timeline || "Not specified"}`, `Budget: ${form.budget || "Not specified"}`);
    if (form.message) lines.push(``, `Notes:`, form.message);
    return lines.join("\n");
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCat) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          from_name: "Portfolio Contact Form",
          name: form.name, email: form.email,
          subject: `${activeCat?.label} Request from ${form.name}`,
          message: buildMessage(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setSelectedCat(null);
        setForm(emptyForm);
        setTimeout(() => setStatus("idle"), 5000);
      } else { setStatus("error"); setTimeout(() => setStatus("idle"), 4000); }
    } catch { setStatus("error"); setTimeout(() => setStatus("idle"), 4000); }
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.55 },
  });

  const inputBase: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 13,
    color: "#0D0D0D", background: "#FAFAF7", border: "1px solid #E8E8E2",
    outline: "none", transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
  };
  const labelSt: React.CSSProperties = {
    display: "block", fontSize: 10, fontWeight: 600, letterSpacing: "0.11em",
    textTransform: "uppercase", color: "#B0B0A8", marginBottom: 7,
  };
  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#5B3CF5";
    e.target.style.background = "#fff";
    e.target.style.boxShadow = "0 0 0 3px rgba(91,60,245,0.08)";
  };
  const blurIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#E8E8E2";
    e.target.style.background = "#FAFAF7";
    e.target.style.boxShadow = "none";
  };

  return (
    <section id="contact" ref={ref}
      style={{ padding: "96px 0 100px", background: "#FAFAF7", position: "relative", overflow: "hidden" }}>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #D8D8D0, transparent)" }} />
      <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", background: "rgba(91,60,245,0.06)", filter: "blur(75px)", top: 70, left: -150, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "rgba(0,168,130,0.055)", filter: "blur(75px)", bottom: 80, right: -130, pointerEvents: "none" }} />

      <div className="contact-container"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 52 }}>
          <p style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5B3CF5", marginBottom: 12 }}>
            <span style={{ width: 20, height: 2, background: "#5B3CF5", borderRadius: 1, display: "inline-block" }} />
            Get In Touch
          </p>
          <h2 style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 5vw, 3.2rem)", color: "#0D0D0D", letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: 10 }}>
            Let&apos;s <span style={{ color: "#5B3CF5" }}>Work Together</span>
          </h2>
          <p style={{ maxWidth: 540, fontSize: 15, lineHeight: 1.7, color: "#7A7A7A", fontWeight: 300 }}>
            Pick a service, fill in the details — I&apos;ll reply within 24 hours with a tailored plan.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="contact-grid"
          style={{ display: "grid", gridTemplateColumns: "330px 1fr", gap: 28, alignItems: "stretch" }}>

          {/* ── Left column — sticky ── */}
          <motion.div {...fadeUp(0.12)} className="contact-left-column"
            style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Contact info */}
            <div style={{ background: "#fff", border: "1px solid #E8E8E2", borderRadius: 20, padding: 24, boxShadow: "0 8px 28px rgba(13,13,13,0.035)" }}>
              <h3 style={{ fontFamily: "var(--font-display), sans-serif", fontSize: 17, fontWeight: 700, color: "#0D0D0D", marginBottom: 18, letterSpacing: "-0.3px" }}>Contact Info</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: Mail,         label: "Email",    val: "muhammadshakoor86@gmail.com", href: "mailto:muhammadshakoor86@gmail.com", color: "#5B3CF5", bg: "rgba(91,60,245,0.08)",  border: "rgba(91,60,245,0.18)" },
                  { icon: FaWhatsapp,   label: "WhatsApp", val: "+92 310 725 2754",            href: "https://wa.me/923107252754",          color: "#25D366", bg: "rgba(37,211,102,0.08)", border: "rgba(37,211,102,0.22)" },
                  { icon: MapPin,       label: "Location", val: "Islamabad, Pakistan",         href: undefined,                             color: "#00A882", bg: "rgba(0,168,130,0.08)",  border: "rgba(0,168,130,0.18)" },
                  { icon: MessageSquare,label: "Response", val: "Within 24 hours",             href: undefined,                             color: "#e84a2a", bg: "rgba(232,74,42,0.07)",  border: "rgba(232,74,42,0.18)" },
                ].map((c) => (
                  <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: c.bg, border: `1px solid ${c.border}` }}>
                      <c.icon size={16} style={{ color: c.color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B0B0A8", marginBottom: 3 }}>{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          style={{ fontSize: 13, color: "#0D0D0D", fontWeight: 500, wordBreak: "break-all", textDecoration: "none", transition: "color 0.2s", lineHeight: 1.4 }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = c.color; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "#0D0D0D"; }}>
                          {c.val}
                        </a>
                      ) : (
                        <p style={{ fontSize: 13, color: "#0D0D0D", fontWeight: 500, wordBreak: "break-word", lineHeight: 1.4 }}>{c.val}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div style={{ background: "#fff", border: "1px solid #E8E8E2", borderRadius: 20, padding: 24, boxShadow: "0 8px 28px rgba(13,13,13,0.035)" }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B0B0A8", marginBottom: 14 }}>Find Me On</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {socials.map(({ icon: Icon, href, label, color, bg, border }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    whileHover={{ scale: 1.1, y: -3, boxShadow: "0 8px 22px rgba(13,13,13,0.08)" }}
                    whileTap={{ scale: 0.92 }}
                    style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: bg, border: `1px solid ${border}`, textDecoration: "none" }}>
                    <Icon size={17} style={{ color }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 20, borderRadius: 18, background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.18)", flex: 1, justifyContent: "space-between" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", marginTop: 6, flexShrink: 0, animation: "pulse 2s infinite" }} />
                <div>
                  <p style={{ color: "#16a34a", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Open to opportunities</p>
                  <p style={{ color: "#7A7A7A", fontSize: 12.5, lineHeight: 1.65, fontWeight: 300 }}>Available for freelance, full-time roles, and exciting collaborations.</p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(22,163,74,0.15)" }} />

              {/* What I offer */}
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {[
                  { emoji: "⚡", label: "Fast turnaround", sub: "Delivery within agreed timeline" },
                  { emoji: "💬", label: "Daily updates",   sub: "Transparent progress reports" },
                  { emoji: "🔁", label: "Free revisions",  sub: "Until you're satisfied" },
                  { emoji: "🔒", label: "NDA friendly",    sub: "Your ideas stay confidential" },
                ].map(({ emoji, label, sub }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 15, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
                    <div>
                      <p style={{ fontSize: 12.5, fontWeight: 600, color: "#0D0D0D", lineHeight: 1.2 }}>{label}</p>
                      <p style={{ fontSize: 11, color: "#7A7A7A", fontWeight: 300, lineHeight: 1.4 }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(22,163,74,0.15)" }} />

              {/* Response time badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, background: "rgba(22,163,74,0.15)", color: "#16a34a", fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>⏱ Replies within 24h</span>
                <span style={{ fontSize: 11, background: "rgba(91,60,245,0.08)", color: "#5B3CF5", fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>🌍 Remote-ready</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right column ── */}
          <motion.div {...fadeUp(0.22)} className="contact-form-column" style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>

            {/* Service selector card */}
            <div style={{ background: "#fff", border: "1px solid #E8E8E2", borderRadius: 20, padding: 24, boxShadow: "0 8px 28px rgba(13,13,13,0.035)" }}>
              <p style={labelSt}>Step 1 — Select Service Type</p>
              <div className="cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                {CATS.map((cat) => {
                  const Icon = cat.icon;
                  const active = selectedCat === cat.id;
                  return (
                    <motion.button key={cat.id} type="button" onClick={() => selectCat(cat.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: "16px 10px", borderRadius: 14, textAlign: "center", cursor: "pointer",
                        border: `1.5px solid ${active ? cat.color : "#E8E8E2"}`,
                        background: active ? cat.bg : "#FAFAF7",
                        boxShadow: active ? `0 6px 18px ${cat.color}28` : "none",
                        transition: "all 0.2s",
                      }}>
                      <div style={{ width: 38, height: 38, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", background: active ? cat.color + "22" : "rgba(13,13,13,0.05)", transition: "background 0.2s" }}>
                        <Icon size={17} style={{ color: active ? cat.color : "#7A7A7A" }} />
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: active ? cat.color : "#0D0D0D", marginBottom: 3, lineHeight: 1.25 }}>{cat.label}</div>
                      <div style={{ fontSize: 10, color: "#B0B0A8", lineHeight: 1.35 }}>{cat.desc}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Form card — slides in when category selected */}
            <AnimatePresence>
              {selectedCat && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <form onSubmit={submit}
                    style={{ flex: 1, background: "#fff", border: "1px solid #E8E8E2", borderRadius: 20, padding: 28, boxShadow: "0 8px 28px rgba(13,13,13,0.035)", display: "flex", flexDirection: "column", gap: 18 }}>

                    {/* Category-specific section */}
                    <AnimatePresence mode="wait">
                      <motion.div key={selectedCat}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.22 }}
                        style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                        <SectionDivider label={`${activeCat?.label} Details`} color={activeCat?.color} />

                        {/* Full Stack */}
                        {selectedCat === "fullstack" && (<>
                          <div>
                            <label style={labelSt}>Project Type</label>
                            <Sel value={form.projectType} onChange={(e) => set("projectType", e.target.value)} onFocus={focusIn} onBlur={blurIn} style={inputBase}>
                              <option value="">Select project type…</option>
                              <option>SaaS Platform</option>
                              <option>E-Commerce Store</option>
                              <option>Admin Dashboard</option>
                              <option>Landing Page / Website</option>
                              <option>Internal Business Tool</option>
                              <option>Mobile App (React Native)</option>
                              <option>Other</option>
                            </Sel>
                          </div>
                          <div>
                            <label style={labelSt}>Tech Stack Preferences</label>
                            <MultiPills options={["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "TypeScript", "Docker", "No preference"]} selected={form.techStack} onToggle={(v) => toggle("techStack", v)} color="#5B3CF5" />
                          </div>
                          <div>
                            <label style={labelSt}>Features Needed</label>
                            <MultiPills options={["Auth / Login", "Payments", "REST API", "Real-time", "Admin Panel", "File Upload", "Email Notifications", "Role-based Access"]} selected={form.features} onToggle={(v) => toggle("features", v)} color="#5B3CF5" />
                          </div>
                        </>)}

                        {/* Frontend */}
                        {selectedCat === "frontend" && (<>
                          <div>
                            <label style={labelSt}>Framework Preference</label>
                            <RadioPills options={["React", "Next.js", "Vue", "Angular", "No preference"]} value={form.framework} onChange={(v) => set("framework", v)} color="#00A882" />
                          </div>
                          <div>
                            <label style={labelSt}>Design Available?</label>
                            <RadioPills options={["Yes — Figma / XD ready", "No — need design too", "Have rough wireframes"]} value={form.hasDesign} onChange={(v) => set("hasDesign", v)} color="#00A882" />
                          </div>
                        </>)}

                        {/* Backend */}
                        {selectedCat === "backend" && (<>
                          <div>
                            <label style={labelSt}>API Type</label>
                            <RadioPills options={["REST API", "GraphQL", "Both"]} value={form.apiType} onChange={(v) => set("apiType", v)} color="#e84a2a" />
                          </div>
                          <div>
                            <label style={labelSt}>Database</label>
                            <RadioPills options={["PostgreSQL", "MongoDB", "MySQL", "SQL Server", "Redis", "No preference"]} value={form.database} onChange={(v) => set("database", v)} color="#e84a2a" />
                          </div>
                          <div>
                            <label style={labelSt}>Deployment Target</label>
                            <RadioPills options={["Vercel", "Railway", "AWS", "Docker / VPS", "No preference"]} value={form.deployment} onChange={(v) => set("deployment", v)} color="#e84a2a" />
                          </div>
                        </>)}

                        {/* AI & Automation */}
                        {selectedCat === "automation" && (<>
                          <div>
                            <label style={labelSt}>Tools / Platforms</label>
                            <MultiPills options={["LangFlow", "Dify", "n8n", "Power Automate", "Power Apps", "Power BI"]} selected={form.tools} onToggle={(v) => toggle("tools", v)} color="#f59e0b" />
                          </div>
                          <div>
                            <label style={labelSt}>Current System / Tools</label>
                            <input type="text" value={form.currentSystem} onChange={(e) => set("currentSystem", e.target.value)} placeholder="e.g. SharePoint, Excel, Notion, Airtable…" style={inputBase} onFocus={focusIn} onBlur={blurIn} />
                          </div>
                          <div>
                            <label style={labelSt}>Automation Goal</label>
                            <Sel value={form.automationGoal} onChange={(e) => set("automationGoal", e.target.value)} onFocus={focusIn} onBlur={blurIn} style={inputBase}>
                              <option value="">Select goal…</option>
                              <option>Automate a repetitive process</option>
                              <option>Build an AI agent / chatbot</option>
                              <option>Connect & sync multiple tools</option>
                              <option>Create reports & dashboards</option>
                              <option>Build a canvas / model-driven app</option>
                              <option>Full automation suite</option>
                              <option>Other</option>
                            </Sel>
                          </div>
                        </>)}

                        {/* Custom */}
                        {selectedCat === "custom" && (
                          <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(107,114,128,0.06)", border: "1px solid rgba(107,114,128,0.14)" }}>
                            <p style={{ fontSize: 13, color: "#7A7A7A", lineHeight: 1.65 }}>
                              Describe your project in the notes below — I&apos;ll reply with a tailored plan.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Common fields */}
                    <SectionDivider label="Your Details" />

                    <div className="form-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div>
                        <label style={labelSt}>Your Name</label>
                        <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Muhammad…" style={inputBase} onFocus={focusIn} onBlur={blurIn} />
                      </div>
                      <div>
                        <label style={labelSt}>Email Address</label>
                        <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required placeholder="hello@example.com" style={inputBase} onFocus={focusIn} onBlur={blurIn} />
                      </div>
                    </div>

                    <div className="form-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div>
                        <label style={labelSt}>Timeline</label>
                        <Sel value={form.timeline} onChange={(e) => set("timeline", e.target.value)} onFocus={focusIn} onBlur={blurIn} style={inputBase}>
                          <option value="">Select timeline…</option>
                          <option>ASAP (&lt; 1 week)</option>
                          <option>1–2 weeks</option>
                          <option>1 month</option>
                          <option>2–3 months</option>
                          <option>Flexible</option>
                        </Sel>
                      </div>
                      <div>
                        <label style={labelSt}>Budget</label>
                        <Sel value={form.budget} onChange={(e) => set("budget", e.target.value)} onFocus={focusIn} onBlur={blurIn} style={inputBase}>
                          <option value="">Select budget…</option>
                          <option>Under $500</option>
                          <option>$500 – $2,000</option>
                          <option>$2,000 – $5,000</option>
                          <option>$5,000+</option>
                          <option>{"Let's discuss"}</option>
                        </Sel>
                      </div>
                    </div>

                    <div>
                      <label style={labelSt}>{selectedCat === "custom" ? "Project Description" : "Additional Notes"}</label>
                      <textarea value={form.message} onChange={(e) => set("message", e.target.value)}
                        required={selectedCat === "custom"}
                        placeholder={selectedCat === "custom" ? "Describe your project in detail…" : "Any extra details, deadlines, or requirements…"}
                        rows={4}
                        style={{ ...inputBase, resize: "none", minHeight: 100 }}
                        onFocus={focusIn} onBlur={blurIn} />
                    </div>

                    {/* Spacer — absorbs extra height when form is shorter than left column */}
                    <div style={{ flex: 1 }} />

                    {/* Submit */}
                    <motion.button type="submit" disabled={status !== "idle"}
                      whileHover={{ scale: status === "idle" ? 1.015 : 1 }}
                      whileTap={{ scale: 0.98 }}
                      style={
                        status === "sent"
                          ? { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 18px", borderRadius: 14, fontSize: 14, fontWeight: 700, background: "rgba(22,163,74,0.08)", color: "#16a34a", border: "1px solid rgba(22,163,74,0.18)", cursor: "default" }
                          : status === "error"
                          ? { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 18px", borderRadius: 14, fontSize: 14, fontWeight: 700, background: "rgba(220,38,38,0.08)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)", cursor: "default" }
                          : { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 18px", borderRadius: 14, fontSize: 14, fontWeight: 700, background: activeCat?.color ?? "#5B3CF5", color: "#fff", border: `1px solid ${activeCat?.color ?? "#5B3CF5"}`, boxShadow: `0 10px 24px ${activeCat?.color ?? "#5B3CF5"}38`, cursor: "pointer", opacity: status === "sending" ? 0.8 : 1 }
                      }>
                      {status === "sending" && (
                        <svg className="animate-spin" style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24">
                          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                        </svg>
                      )}
                      {status === "sent" && <CheckCircle size={16} />}
                      {status === "idle" && <Send size={15} />}
                      {status === "error" && <span>✕</span>}
                      {status === "sending" ? "Sending…" : status === "sent" ? "Request Sent!" : status === "error" ? "Failed — Try Again" : `Send ${activeCat?.label} Request`}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #D8D8D0, transparent)" }} />

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .contact-select { appearance: none; -webkit-appearance: none; }
        .contact-container input::placeholder,
        .contact-container textarea::placeholder { color: #B0B0A8; }
        .contact-container select option { color: #0D0D0D; background: #fff; }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-left-column { position: static !important; }
          .cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .contact-container { padding-left: 22px !important; padding-right: 22px !important; }
          .form-two { grid-template-columns: 1fr !important; }
          .cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

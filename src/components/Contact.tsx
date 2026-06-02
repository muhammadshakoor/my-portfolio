"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

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
];

type F = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type S = "idle" | "sending" | "sent";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState<F>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<S>("idle");

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("sending");

    await new Promise((r) => setTimeout(r, 1500));

    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setStatus("idle"), 4000);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.55 },
  });

  const inputBaseStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 15px",
    borderRadius: 12,
    fontSize: 14,
    color: "#0D0D0D",
    background: "#FAFAF7",
    border: "1px solid #E8E8E2",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.11em",
    textTransform: "uppercase",
    color: "#B0B0A8",
    marginBottom: 7,
  };

  const focusInput = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.target.style.borderColor = "#5B3CF5";
    e.target.style.background = "#fff";
    e.target.style.boxShadow = "0 0 0 3px rgba(91,60,245,0.08)";
  };

  const blurInput = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.target.style.borderColor = "#E8E8E2";
    e.target.style.background = "#FAFAF7";
    e.target.style.boxShadow = "none";
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "96px 0 100px",
        background: "#FAFAF7",
        position: "relative",
        overflow: "hidden",
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

      {/* Soft background accents */}
      <div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(91,60,245,0.06)",
          filter: "blur(75px)",
          top: 70,
          left: -150,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(0,168,130,0.055)",
          filter: "blur(75px)",
          bottom: 80,
          right: -130,
          pointerEvents: "none",
        }}
      />

      <div
        className="contact-container"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 52 }}>
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
              marginBottom: 12,
            }}
          >
            <span
              style={{
                width: 20,
                height: 2,
                background: "#5B3CF5",
                borderRadius: 1,
                display: "inline-block",
              }}
            />
            Get In Touch
          </p>

          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
              color: "#0D0D0D",
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
              marginBottom: 10,
            }}
          >
            Let&apos;s <span style={{ color: "#5B3CF5" }}>Work Together</span>
          </h2>

          <p
            style={{
              maxWidth: 540,
              fontSize: 15,
              lineHeight: 1.7,
              color: "#7A7A7A",
              fontWeight: 300,
            }}
          >
            Have a project in mind or want to say hi? Drop me a message — I
            respond within 24 hours.
          </p>
        </motion.div>

        {/* Main grid */}
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "330px 1fr",
            gap: 28,
            alignItems: "stretch",
          }}
        >
          {/* Left info column */}
          <motion.div
            {...fadeUp(0.12)}
            className="contact-left-column"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              height: "100%",
            }}
          >
            {/* Contact info card */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #E8E8E2",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 8px 28px rgba(13,13,13,0.035)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0D0D0D",
                  marginBottom: 18,
                  letterSpacing: "-0.3px",
                }}
              >
                Contact Info
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    val: "muhammadshakoor86@gmail.com",
                    color: "#5B3CF5",
                    bg: "rgba(91,60,245,0.08)",
                    border: "rgba(91,60,245,0.18)",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    val: "Islamabad, Pakistan",
                    color: "#00A882",
                    bg: "rgba(0,168,130,0.08)",
                    border: "rgba(0,168,130,0.18)",
                  },
                  {
                    icon: MessageSquare,
                    label: "Response",
                    val: "Within 24 hours",
                    color: "#e84a2a",
                    bg: "rgba(232,74,42,0.07)",
                    border: "rgba(232,74,42,0.18)",
                  },
                ].map((c) => (
                  <div
                    key={c.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 11,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: c.bg,
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      <c.icon size={16} style={{ color: c.color }} />
                    </div>

                    <div>
                      <p
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#B0B0A8",
                          marginBottom: 3,
                        }}
                      >
                        {c.label}
                      </p>

                      <p
                        style={{
                          fontSize: 14,
                          color: "#0D0D0D",
                          fontWeight: 500,
                          wordBreak: "break-word",
                        }}
                      >
                        {c.val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social card */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #E8E8E2",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 8px 28px rgba(13,13,13,0.035)",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#B0B0A8",
                  marginBottom: 14,
                }}
              >
                Find Me On
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                }}
              >
                {socials.map(({ icon: Icon, href, label, color, bg, border }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{
                      scale: 1.1,
                      y: -3,
                      boxShadow: "0 8px 22px rgba(13,13,13,0.08)",
                    }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: bg,
                      border: `1px solid ${border}`,
                      textDecoration: "none",
                    }}
                  >
                    <Icon size={18} style={{ color }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div
              className="availability-card"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: 20,
                borderRadius: 18,
                background: "rgba(22,163,74,0.08)",
                border: "1px solid rgba(22,163,74,0.18)",
                flex: 1,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#16a34a",
                  marginTop: 6,
                  flexShrink: 0,
                  animation: "pulse 2s infinite",
                }}
              />

              <div>
                <p
                  style={{
                    color: "#16a34a",
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  Open to opportunities
                </p>

                <p
                  style={{
                    color: "#7A7A7A",
                    fontSize: 12.5,
                    lineHeight: 1.65,
                    fontWeight: 300,
                  }}
                >
                  Available for freelance, full-time roles, and exciting
                  collaborations.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            {...fadeUp(0.22)}
            className="contact-form-column"
            style={{
              height: "100%",
              minHeight: 0,
            }}
          >
            <form
              onSubmit={submit}
              style={{
                height: "100%",
                background: "#fff",
                border: "1px solid #E8E8E2",
                borderRadius: 20,
                padding: 30,
                boxShadow: "0 8px 28px rgba(13,13,13,0.035)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="form-two"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                {(["name", "email"] as const).map((field) => (
                  <div key={field}>
                    <label style={labelStyle}>
                      {field === "name" ? "Your Name" : "Email Address"}
                    </label>

                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={form[field]}
                      onChange={change}
                      required
                      placeholder={
                        field === "name" ? "Muhammad..." : "hello@example.com"
                      }
                      style={inputBaseStyle}
                      onFocus={focusInput}
                      onBlur={blurInput}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Subject</label>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={change}
                  required
                  placeholder="Project Inquiry"
                  style={inputBaseStyle}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>

              <div
                style={{
                  marginBottom: 18,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                }}
              >
                <label style={labelStyle}>Message</label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={change}
                  required
                  placeholder="Tell me about your project..."
                  style={{
                    ...inputBaseStyle,
                    resize: "none",
                    flex: 1,
                    minHeight: 170,
                  }}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status !== "idle"}
                whileHover={{ scale: status === "idle" ? 1.015 : 1 }}
                whileTap={{ scale: 0.98 }}
                style={
                  status === "sent"
                    ? {
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "14px 18px",
                        borderRadius: 14,
                        fontSize: 14,
                        fontWeight: 700,
                        background: "rgba(22,163,74,0.08)",
                        color: "#16a34a",
                        border: "1px solid rgba(22,163,74,0.18)",
                        cursor: "default",
                      }
                    : {
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "14px 18px",
                        borderRadius: 14,
                        fontSize: 14,
                        fontWeight: 700,
                        background: "#5B3CF5",
                        color: "#fff",
                        border: "1px solid #5B3CF5",
                        boxShadow: "0 10px 24px rgba(91,60,245,0.22)",
                        cursor: status === "idle" ? "pointer" : "not-allowed",
                        opacity: status === "sending" ? 0.8 : 1,
                      }
                }
              >
                {status === "sending" && (
                  <svg
                    className="animate-spin"
                    style={{ width: 16, height: 16 }}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      style={{ opacity: 0.25 }}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      style={{ opacity: 0.75 }}
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
                    />
                  </svg>
                )}

                {status === "sent" && <CheckCircle size={16} />}
                {status === "idle" && <Send size={15} />}

                {status === "sending"
                  ? "Sending..."
                  : status === "sent"
                  ? "Message Sent!"
                  : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom rule */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, #D8D8D0, transparent)",
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.35;
          }
        }

        .contact-container input::placeholder,
        .contact-container textarea::placeholder {
          color: #B0B0A8;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }

          .contact-left-column,
          .contact-form-column {
            height: auto !important;
          }

          .availability-card {
            flex: initial !important;
          }
        }

        @media (max-width: 768px) {
          .contact-container {
            padding-left: 22px !important;
            padding-right: 22px !important;
          }

          .form-two {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { X } from "lucide-react";

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 10,
      }}
    >
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "#fff",
              border: "1px solid #E8E8E2",
              borderRadius: 14,
              padding: "10px 14px",
              boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 500, color: "#0D0D0D" }}>
              Chat on WhatsApp
            </span>
            <button
              onClick={(e) => { e.preventDefault(); setDismissed(true); }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 2,
                color: "#B0B0A8",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Dismiss"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href="https://wa.me/923107252754"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(37,211,102,0.40), 0 2px 8px rgba(0,0,0,0.12)",
          textDecoration: "none",
          position: "relative",
        }}
      >
        {/* Pulse ring */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "rgba(37,211,102,0.35)",
            animation: "waPulse 2.2s ease-out infinite",
          }}
        />
        <FaWhatsapp size={30} color="#fff" />
      </motion.a>

      <style>{`
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

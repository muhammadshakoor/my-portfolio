import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Full Stack Developer & Automation Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAF7",
          padding: 72,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Soft brand orbs */}
        <div
          style={{
            position: "absolute",
            width: 480,
            height: 480,
            borderRadius: 999,
            background: "rgba(91,60,245,0.12)",
            filter: "blur(80px)",
            top: -140,
            left: -120,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: 999,
            background: "rgba(0,168,130,0.10)",
            filter: "blur(80px)",
            bottom: -140,
            right: -100,
          }}
        />

        {/* Top row: availability badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(22,163,74,0.08)",
              border: "2px solid rgba(22,163,74,0.22)",
              color: "#16a34a",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#16a34a",
              }}
            />
            Available for work
          </div>
        </div>

        {/* Middle: name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              color: "#5B3CF5",
              letterSpacing: -3,
              lineHeight: 1.02,
            }}
          >
            Muhammad
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              color: "#0D0D0D",
              letterSpacing: -3,
              lineHeight: 1.02,
              marginBottom: 26,
            }}
          >
            Shakoor
          </div>
          <div style={{ fontSize: 34, color: "#3A3A3A", fontWeight: 500 }}>
            Full Stack Developer & Automation Engineer
          </div>
        </div>

        {/* Bottom: stack chips + location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {["React", "Next.js", "TypeScript", "Node.js", "Power Platform"].map(
              (t) => (
                <div
                  key={t}
                  style={{
                    padding: "10px 22px",
                    borderRadius: 999,
                    background: "rgba(91,60,245,0.08)",
                    border: "2px solid rgba(91,60,245,0.18)",
                    color: "#5B3CF5",
                    fontSize: 21,
                    fontWeight: 600,
                  }}
                >
                  {t}
                </div>
              )
            )}
          </div>

          <div style={{ fontSize: 22, color: "#7A7A7A" }}>
            Islamabad, Pakistan
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "linear-gradient(90deg, #5B3CF5, #00A882)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

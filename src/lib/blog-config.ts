// Client-safe constants — no Node.js imports

export const CATEGORIES = [
  "All",
  "Full Stack",
  "AI & Automation",
  "Web Development",
  "Backend",
  "Frontend",
  "DevOps",
  "Database",
  "TypeScript",
  "Security",
  "Career",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_STYLES: Record<
  string,
  { color: string; bg: string; border: string }
> = {
  "Full Stack": {
    color: "#00C8FF",
    bg: "rgba(0,200,255,0.08)",
    border: "rgba(0,200,255,0.2)",
  },
  "AI & Automation": {
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
  },
  "Web Development": {
    color: "#00A882",
    bg: "rgba(0,168,130,0.08)",
    border: "rgba(0,168,130,0.2)",
  },
  Backend: {
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.2)",
  },
  Frontend: {
    color: "#4ade80",
    bg: "rgba(74,222,128,0.08)",
    border: "rgba(74,222,128,0.2)",
  },
  DevOps: {
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.2)",
  },
  Database: {
    color: "#facc15",
    bg: "rgba(250,204,21,0.08)",
    border: "rgba(250,204,21,0.2)",
  },
  TypeScript: {
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.2)",
  },
  Security: {
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
  },
  Career: {
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
};

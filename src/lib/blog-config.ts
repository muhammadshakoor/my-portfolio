// Client-safe constants — no Node.js imports

export const CATEGORIES = [
  "All",
  "Full Stack",
  "AI & Automation",
  "Web Development",
  "Backend",
  "Frontend",
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
};

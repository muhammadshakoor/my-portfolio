// Resolution order: explicit env override → Vercel's auto-provided production
// domain (works on the free plan, no custom domain needed) → local dev.
const resolvedUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteConfig = {
  url: resolvedUrl,
  name: "Muhammad Shakoor",
  title: "Muhammad Shakoor | Full Stack Developer & Automation Engineer",
  description:
    "Full Stack Developer & Power Platform expert in Islamabad, Pakistan. I build scalable web apps and enterprise automation with React, Next.js, TypeScript, Node.js, and PostgreSQL.",
  email: "muhammadshakoor86@gmail.com",
  location: "Islamabad, Pakistan",
  company: "Blutech Consulting",
  twitterHandle: "@Muhamma45190755",
  links: {
    github: "https://github.com/muhammadshakoor",
    linkedin: "https://www.linkedin.com/in/muhammad-shakoor-2971a6117/",
    twitter: "https://twitter.com/Muhamma45190755",
  },
} as const;

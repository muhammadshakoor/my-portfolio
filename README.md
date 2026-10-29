# Muhammad Shakoor — Portfolio

Personal portfolio for a Full Stack Developer & Automation Engineer at Blutech Consulting (Islamabad, Pakistan).

Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **Sanity** (blog).

## Features

- Single-page portfolio: Hero, About, Skills, Projects, Experience, Testimonials, Contact
- Project case studies at `/projects/[slug]`
- Blog at `/blog` — Sanity CMS with local Markdown fallback (`content/posts/`)
- Embedded Sanity Studio at `/studio`
- Dark / light theme
- Contact form via Web3Forms + WhatsApp float
- SEO: sitemap, robots, Open Graph, JSON-LD

## Prerequisites

- Node.js 20+ recommended
- npm

## Setup

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local`:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | For contact form | [web3forms.com](https://web3forms.com) access key |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Optional | Blog CMS (defaults can use local Markdown) |
| `NEXT_PUBLIC_SANITY_DATASET` | Optional | Defaults to `production` |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical URL (local default: `http://localhost:3003`) |

## Run locally

Dev server runs on **port 3003** (not 3000):

```bash
npm run dev
```

Open [http://localhost:3003](http://localhost:3003).

```bash
npm run build   # production build
npm start       # serve build on port 3003
npm run lint    # ESLint
```

CI (`.github/workflows/ci.yml`) runs `npm ci`, lint and build on every pull request. If you change dependencies, commit the updated `package-lock.json` or `npm ci` will fail.

## Content

| What | Where |
|---|---|
| Site identity / SEO, headline stats (years, projects) | `src/lib/site.ts` |
| Projects & case studies (`featured: true` = large card on the homepage) | `src/data/projects.ts` |
| Experience / About / Hero copy | `src/components/*.tsx` |
| Blog (CMS) | Sanity Studio → `/studio` |
| Blog (local fallback) | `content/posts/*.md` |

## Deploy

Designed for **Vercel**. Set the same env vars in the project settings. `VERCEL_PROJECT_PRODUCTION_URL` is used automatically when `NEXT_PUBLIC_SITE_URL` is unset.

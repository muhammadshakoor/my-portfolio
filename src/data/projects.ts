export type Project = {
  slug: string;
  emoji: string;
  title: string;
  sub: string;
  desc: string;
  tags: string[];
  cat: string;
  color: string;
  bg: string;
  border: string;
  featured: boolean;
  /** Card/hero visual under /public/projects. Real screenshot where the product
   *  is publicly reachable, designed cover art otherwise. Falls back to the
   *  emoji browser frame when absent. */
  image?: string;
  /** Crop anchor. Cover art is centre-composed, so it defaults to "center";
   *  screenshots put their content up top and need "top". Wrong anchor slices
   *  the title off in the short grid-card thumbnails. */
  imageAnchor?: "top" | "center";
  /** Omitted when the repository is private — better than linking to a 404. */
  github?: string;
  live: string;
  caseStudy: {
    role: string;
    timeline: string;
    /** Set on team projects so the page states team size up front. */
    team?: string;
    /** Credit line for forked/derived work. */
    basedOn?: string;
    overview: string[];
    /** My specific scope on a team project — deliberately narrower than the
     *  feature list above, which describes the product as a whole. */
    contributions?: string[];
    challenges: { title: string; detail: string }[];
    outcomes: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "stc-pl-forecasting",
    emoji: "📈",
    title: "STC P&L Forecasting",
    sub: "Enterprise Finance Dashboard",
    desc: "Finance dashboard for Saudi Telecom Company — monthly forecasts across Consumer, Business, Wholesale & stc Pay segments. Built at Blutech Consulting.",
    tags: ["React", "Vite", "TypeScript", "Power BI", "REST API"],
    cat: "Enterprise",
    color: "#e84a2a",
    bg: "rgba(232,74,42,0.07)",
    border: "rgba(232,74,42,0.18)",
    featured: true,
    image: "/projects/stc-pl-forecasting.jpg",
    // Client repository is private.
    live: "#",
    caseStudy: {
      role: "Frontend Developer — Blutech Consulting",
      timeline: "2023 — Present",
      overview: [
        "STC Bahrain needed a single place to manage monthly profit & loss forecasts across four business segments: Consumer, Business, Wholesale, and stc Pay. Before this tool, forecasting lived in disconnected spreadsheets that were slow to consolidate and easy to break.",
        "I worked on the React frontend of the forecasting platform — data-dense grids for entering and reviewing forecasts, segment-level dashboards, and Power BI embedded reporting for leadership views.",
      ],
      challenges: [
        {
          title: "Data-dense editable grids",
          detail:
            "Finance users expect spreadsheet-grade editing — keyboard navigation, bulk paste, and instant validation — inside a browser. We built virtualised grid views that stay responsive with thousands of cells.",
        },
        {
          title: "Multi-segment consistency",
          detail:
            "Each segment has its own cost structure but rolls up into one P&L. The UI had to keep totals, allocations, and cross-segment rules consistent as users edit.",
        },
        {
          title: "Enterprise review workflow",
          detail:
            "Forecasts move through draft, review, and approved states. The interface surfaces who changed what, and locks data at each approval gate.",
        },
      ],
      outcomes: [
        "Replaced spreadsheet-based consolidation with a single source of truth",
        "Monthly forecast cycle became faster and auditable across 4 segments",
        "Leadership reporting delivered through embedded Power BI dashboards",
      ],
    },
  },
  {
    slug: "bank-lead-generation",
    emoji: "🗺️",
    title: "Bank Lead Generation",
    sub: "Enterprise Field Agent Platform",
    desc: "Field agent platform for a major bank — an interactive map displays nearby businesses, agents tap to generate leads and log visits for account opening pitches. Multi-level hierarchy: Branch, Region, Group, and Head levels, each with role-specific dashboards, lead favourites, and visit status tracking. Built at Blutech Consulting.",
    tags: ["React", "TypeScript", "Node.js", "Express", "Google Maps", "PostgreSQL"],
    cat: "Enterprise",
    color: "#0369a1",
    bg: "rgba(3,105,161,0.07)",
    border: "rgba(3,105,161,0.18)",
    featured: true,
    image: "/projects/bank-lead-generation.jpg",
    // Client repository is private.
    live: "#",
    caseStudy: {
      role: "Full Stack Developer — Blutech Consulting",
      timeline: "2024 — Present",
      overview: [
        "A major bank wanted its field agents to stop working from printed lists and start generating leads on the ground. The platform puts an interactive map in agents' hands: nearby businesses appear as pins, and one tap creates a lead and logs a visit for an account-opening pitch.",
        "The system mirrors the bank's real org chart — Branch, Region, Group, and Head levels — so every manager sees dashboards scoped to their own territory, with lead favourites and visit status tracking at each level.",
      ],
      challenges: [
        {
          title: "Map performance with dense business data",
          detail:
            "City centres can have hundreds of businesses in one viewport. Marker clustering and viewport-based fetching keep the Google Maps experience smooth on mid-range phones agents actually carry.",
        },
        {
          title: "Four-level role hierarchy",
          detail:
            "Branch, Region, Group, and Head each need different data scopes and actions. We modelled this as role-based access on the API plus role-specific dashboard views, so one codebase serves the whole hierarchy.",
        },
        {
          title: "Visit lifecycle tracking",
          detail:
            "A lead moves from spotted on the map → visited → pitched → converted. The status model had to be simple enough for agents in the field and rich enough for management reporting.",
        },
      ],
      outcomes: [
        "Agents generate and log leads directly from an interactive map",
        "Role-scoped dashboards for all four management levels",
        "Visit tracking gives management real pipeline visibility",
      ],
    },
  },
  {
    slug: "entellica",
    emoji: "⚙️",
    title: "Entellica",
    sub: "Enterprise AI-Agent Orchestration Platform",
    desc: "A visual, node-based builder where non-engineers compose LLM workflows, paired with an operator console for running agents and an admin portal for governance. Built by a team of 9 on top of the open-source Langflow, with a large custom layer for permissions, token budgets, and policy-checked database access.",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "React Flow", "Zustand", "Python", "Docker"],
    cat: "AI/ML",
    color: "#6C3CF5",
    bg: "rgba(108,60,245,0.1)",
    border: "rgba(108,60,245,0.22)",
    featured: true,
    image: "/projects/entellica.jpg",
    // Repository is private — no source link rather than a dead one.
    live: "#",
    caseStudy: {
      role: "Frontend / UI Contributor — Blutech Consulting",
      timeline: "May 2026 — July 2026 (active)",
      team: "9 contributors · 155 commits",
      basedOn:
        "Built on the open-source langflow-ai/langflow (v1.9.1), rebranded across user-visible surfaces and extended with a custom feature layer of roughly 58,700 added lines across 605 files.",
      overview: [
        "Entellica is an enterprise AI-agent orchestration platform: a drag-and-drop canvas where non-engineers compose LLM workflows, an operator console for running and monitoring those agents, and an admin portal for governance. It began as a fork of the open-source Langflow and grew a substantial custom layer on top.",
        "The product surface splits in two. The flow editor stays close to upstream Langflow, while a second surface at /operations layers on a workspace shell, agent library, live run view, and data-connector management — so operators can run agents without ever opening the graph editor. Behind both sits a governance layer: centrally managed provider credentials, per-user model allow/deny lists, and token budgets enforced at request time.",
        "This was a team project of nine contributors. My own scope was the frontend/UI layer; the feature set described here is the product as a whole, not a list of what I personally wrote.",
      ],
      // NOTE: Awaiting Muhammad's specific contribution bullets before this
      // renders — the section is hidden while empty rather than guessed at.
      challenges: [
        {
          title: "SQL access policy enforced at the AST level",
          detail:
            "Agents can query 10 external database types — PostgreSQL, MySQL, SQL Server, Oracle, SQLite, Snowflake, Hive, Redshift, ClickHouse, BigQuery. Every query is parsed with sqlglot before execution and checked against a per-connection policy: read-only enforcement, statement/schema/table allowlists, and row caps. Parsing the actual syntax tree, rather than pattern-matching strings, is what closes off both injection and privilege escalation through a user-facing query endpoint. A connection with no policy attached falls back to a safe read-only default, so the endpoint is never an open SQL shell.",
        },
        {
          title: "Dynamic model registry replacing hardcoded lists",
          detail:
            "A model_definition table sources models three ways — built-in, auto-discovered from provider APIs, and admin-added — across OpenAI, Anthropic, Google, Ollama, watsonx, DeepSeek, xAI, and HuggingFace. Admins get full CRUD and per-provider sync, and the catalog is cached for 60 seconds with a fallback to static constants when the database is unreachable, so provider changes never require a redeploy.",
        },
        {
          title: "Live agent monitoring over Server-Sent Events",
          detail:
            "A single SSE stream broadcasts per-flow execution events — token counts, vertex completion, errors, and build lifecycle — to a real-time dashboard, with multiple subscribers able to watch the same run concurrently.",
        },
        {
          title: "Alembic migrations against a shared Postgres instance",
          detail:
            "Nine developers running migrations against one shared database is a recipe for corrupted revision graphs. The fix combined advisory locks and deadlock retries at runtime with an automated revision-graph checker in pre-commit that fails the commit on duplicate revision IDs or multiple heads.",
        },
        {
          title: "Keeping a large fork mergeable with upstream",
          detail:
            "Carrying roughly 59,000 lines of custom code on a fast-moving open-source base means every upstream release is a potential conflict. Custom work was kept in separable modules and new surfaces wherever possible, rather than threaded through files upstream edits frequently.",
        },
      ],
      outcomes: [
        "Operator console, admin portal, and agent APIs total ~24,000 lines across 77 files",
        "Every external database query parsed and policy-checked before it executes",
        "Provider credentials centrally managed, so end users never handle API keys",
        "Token budgets enforced per user at request time, with HTTP 429 on breach",
      ],
    },
  },
  {
    slug: "cosmetics-store",
    emoji: "💎",
    title: "Cosmetics Store",
    sub: "E-Commerce Platform",
    desc: "End-to-end e-commerce with product catalog, shopping cart, Stripe payments, order tracking, and admin dashboard. JWT auth with RBAC.",
    tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Stripe"],
    cat: "Full Stack",
    color: "#c026d3",
    bg: "rgba(192,38,211,0.07)",
    border: "rgba(192,38,211,0.18)",
    featured: true,
    image: "/projects/cosmetics-store.jpg",
    imageAnchor: "top",
    live: "https://cosmetics-store-g8nt.vercel.app/",
    caseStudy: {
      role: "Full Stack Developer — Freelance",
      timeline: "2022 — 2023",
      overview: [
        "A complete e-commerce platform for a cosmetics brand: product catalog with categories and search, shopping cart, Stripe checkout, order tracking for customers, and an admin dashboard for inventory and order management.",
        "Built on PostgreSQL with a typed Node.js API and a React storefront, with JWT authentication and role-based access separating customers from store admins.",
      ],
      challenges: [
        {
          title: "Payment integrity with Stripe",
          detail:
            "Orders are only confirmed when Stripe webhooks verify payment — the client is never trusted with payment state. Failed and abandoned payments leave inventory untouched.",
        },
        {
          title: "Inventory consistency",
          detail:
            "Stock is decremented transactionally at order confirmation, preventing oversells when two customers buy the last item at the same time.",
        },
        {
          title: "Admin operations",
          detail:
            "The admin dashboard covers product CRUD, stock management, and order fulfilment — designed so a non-technical store owner can run the shop alone.",
        },
      ],
      outcomes: [
        "Full storefront-to-fulfilment flow with secure Stripe payments",
        "Transactional inventory prevents overselling",
        "Self-serve admin dashboard for non-technical staff",
      ],
    },
  },
  {
    slug: "smart-guest",
    emoji: "🏨",
    title: "Smart Guest",
    sub: "Hotel Management System",
    desc: "Full-featured hotel management with booking engine, room management, invoicing, and real-time availability. Role-based admin dashboard with analytics.",
    tags: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    cat: "Full Stack",
    color: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
    border: "rgba(91,60,245,0.18)",
    featured: true,
    image: "/projects/smart-guest.jpg",
    github: "https://github.com/muhammadshakoor/smart-guest-hotel",
    live: "#",
    caseStudy: {
      role: "Full Stack Developer — Freelance",
      timeline: "2022 — 2023",
      overview: [
        "Smart Guest is an end-to-end hotel management system: a booking engine for guests and an operations dashboard for staff, covering room management, invoicing, and real-time availability.",
        "I designed and built the whole stack — MongoDB data model, Express REST API, and a React dashboard with role-based access for reception, housekeeping, and management.",
      ],
      challenges: [
        {
          title: "Real-time availability",
          detail:
            "Double-booking is the cardinal sin of hotel software. Availability checks are enforced at the API level with date-range queries, so two simultaneous bookings can never claim the same room-night.",
        },
        {
          title: "Invoicing and billing flows",
          detail:
            "Stays change — late checkouts, room upgrades, extra services. The invoicing module recalculates totals from the stay record so bills always match reality.",
        },
        {
          title: "Role-based dashboard",
          detail:
            "Reception, housekeeping, and managers need different views of the same data. JWT-backed roles drive both API authorisation and which dashboard modules render.",
        },
      ],
      outcomes: [
        "Complete booking-to-invoice flow in one system",
        "Real-time room availability with conflict-safe booking",
        "Analytics dashboard for occupancy and revenue tracking",
      ],
    },
  },
  {
    slug: "crud-app",
    emoji: "🔄",
    title: "CRUD App",
    sub: "Full Stack Monorepo",
    desc: "A full-stack CRUD application with frontend and backend in a single monorepo, deployed together on Vercel using a unified vercel.json. Also available as separate frontend and backend repositories with independent deployments.",
    tags: ["React", "TypeScript", "Vite", "Tailwind", "Express", "PostgreSQL", "Vercel"],
    cat: "Full Stack",
    color: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
    border: "rgba(91,60,245,0.18)",
    featured: true,
    image: "/projects/crud-app.jpg",
    github: "https://github.com/muhammadshakoor/crud_app",
    // Previous Vercel deployment is gone; re-add once redeployed.
    live: "#",
    caseStudy: {
      role: "Full Stack Developer — Personal Project",
      timeline: "2024",
      overview: [
        "A reference full-stack CRUD application demonstrating two deployment strategies for the same codebase: a single monorepo deployed to Vercel with a unified vercel.json, and split frontend/backend repositories with independent deployments.",
        "The goal was a clean, copyable template: Vite + React + Tailwind on the front, Express + PostgreSQL behind a typed API, with both deployment styles documented.",
      ],
      challenges: [
        {
          title: "One repo, one deployment",
          detail:
            "Serving an Express API and a Vite SPA from a single Vercel project requires careful vercel.json routing — API routes to serverless functions, everything else to the static build.",
        },
        {
          title: "Serverless PostgreSQL",
          detail:
            "Connection pooling matters when every API call may be a cold serverless invocation. The data layer uses pooled connections sized for serverless limits.",
        },
      ],
      outcomes: [
        "Live deployment on Vercel from a single monorepo",
        "Documented split-repo variant for independent scaling",
        "Reusable template for typed full-stack CRUD apps",
      ],
    },
  },
  {
    slug: "mnist-cnn-kitti-object-detection",
    emoji: "🧠",
    title: "MNIST CNN & KITTI Object Detection",
    sub: "Deep Learning & Computer Vision",
    desc: "Built and benchmarked 5 CNN architectures for real-time handwritten digit recognition on MNIST, then fine-tuned a Faster R-CNN model to detect Cars, Pedestrians, and Cyclists in live KITTI driving footage. Delivered production-ready model weights, mAP benchmarks, and visual detection outputs.",
    tags: ["Python", "PyTorch", "TorchVision", "Jupyter", "MNIST", "KITTI", "Faster R-CNN"],
    cat: "AI/ML",
    color: "#5B3CF5",
    bg: "rgba(91,60,245,0.08)",
    border: "rgba(91,60,245,0.18)",
    featured: true,
    image: "/projects/mnist-cnn-kitti-object-detection.jpg",
    github: "https://github.com/muhammadshakoor/mnist-cnn-kitti-object-detection",
    live: "#",
    caseStudy: {
      role: "ML Engineer — Research Project",
      timeline: "2024",
      overview: [
        "A two-part computer vision project: first, building and benchmarking five CNN architectures for handwritten digit recognition on MNIST; second, fine-tuning a Faster R-CNN model to detect Cars, Pedestrians, and Cyclists in KITTI autonomous-driving footage.",
        "Deliverables included production-ready model weights, mAP benchmarks comparing architectures, and visual detection outputs on real driving scenes.",
      ],
      challenges: [
        {
          title: "Fair architecture comparison",
          detail:
            "Five CNN variants were trained under identical conditions — same splits, augmentation, and schedules — so accuracy and speed differences reflect architecture, not training luck.",
        },
        {
          title: "Transfer learning on KITTI",
          detail:
            "Fine-tuning Faster R-CNN for three road-user classes meant balancing a small labelled dataset against overfitting, using staged unfreezing and careful augmentation.",
        },
        {
          title: "Meaningful evaluation",
          detail:
            "Detection quality is reported as per-class mAP with visual outputs on held-out driving footage, not just a single headline number.",
        },
      ],
      outcomes: [
        "5 CNN architectures benchmarked head-to-head on MNIST",
        "Faster R-CNN fine-tuned for Cars, Pedestrians & Cyclists on KITTI",
        "Reproducible notebooks, weights, and mAP benchmark reports",
      ],
    },
  },
  {
    slug: "rest-api-boilerplate",
    emoji: "🔌",
    title: "REST API Boilerplate",
    sub: "Production-Ready Node.js Backend",
    desc: "A battle-tested backend starter with Express.js, PostgreSQL, JWT auth, RBAC, Docker, rate limiting, request validation, and structured error handling — everything needed to ship a secure API fast.",
    tags: ["Node.js", "Express.js", "PostgreSQL", "TypeScript", "Docker", "JWT", "RBAC"],
    cat: "Backend",
    color: "#00A882",
    bg: "rgba(0,168,130,0.08)",
    border: "rgba(0,168,130,0.18)",
    featured: false,
    image: "/projects/rest-api-boilerplate.jpg",
    // Private repository.
    live: "#",
    caseStudy: {
      role: "Backend Developer — Personal Project",
      timeline: "2024",
      overview: [
        "A production-ready REST API starter built to eliminate the boilerplate cost on every new Node.js project. It ships with Express.js, PostgreSQL (via connection pooling), TypeScript types throughout, Docker Compose for local dev, and a full auth layer out of the box.",
        "The goal was a template strict enough to enforce good patterns — structured error responses, input validation, role-based access — without locking teams into a framework.",
      ],
      challenges: [
        {
          title: "Consistent error handling",
          detail:
            "Every API route funnels through a central error middleware that maps domain errors to HTTP status codes and returns a uniform JSON shape — so clients never parse surprise error formats.",
        },
        {
          title: "Role-based access at the middleware layer",
          detail:
            "RBAC is enforced as composable route middleware rather than scattered if-checks, making it easy to add or change permissions without touching business logic.",
        },
        {
          title: "Docker-first local development",
          detail:
            "A single docker-compose up spins up the API, PostgreSQL, and a migration runner — so any developer can be productive in minutes with no manual database setup.",
        },
      ],
      outcomes: [
        "Drop-in backend starter used across multiple projects",
        "JWT + refresh token auth and RBAC wired in from day one",
        "Dockerised environment eliminates local setup friction",
      ],
    },
  },
  {
    slug: "jwt-auth-system",
    emoji: "🔐",
    title: "JWT Auth System",
    sub: "Authentication Boilerplate",
    desc: "Production-ready auth with JWT + refresh tokens, email verification, OAuth, and two-factor authentication.",
    tags: ["Node.js", "Express", "JWT", "MongoDB", "Nodemailer"],
    cat: "Backend",
    color: "#00A882",
    bg: "rgba(0,168,130,0.08)",
    border: "rgba(0,168,130,0.18)",
    featured: false,
    image: "/projects/jwt-auth-system.jpg",
    // Private repository.
    live: "#",
    caseStudy: {
      role: "Backend Developer — Personal Project",
      timeline: "2023",
      overview: [
        "A production-ready authentication boilerplate covering the full account lifecycle: registration with email verification, JWT access + refresh token rotation, OAuth sign-in, and two-factor authentication.",
        "Designed as a drop-in starting point for new Node.js projects, so auth never has to be rebuilt from scratch.",
      ],
      challenges: [
        {
          title: "Refresh token rotation",
          detail:
            "Long-lived sessions without long-lived access tokens: refresh tokens rotate on every use and are revocable server-side, limiting the blast radius of a leaked token.",
        },
        {
          title: "Layered verification",
          detail:
            "Email verification, OAuth identities, and TOTP-based 2FA each add a trust layer without blocking the basic sign-up flow.",
        },
      ],
      outcomes: [
        "Reusable auth foundation with JWT + refresh rotation",
        "Email verification and 2FA out of the box",
        "OAuth sign-in alongside password auth",
      ],
    },
  },
];

export const categories = ["All", "Full Stack", "Enterprise", "AI/ML", "Backend"];

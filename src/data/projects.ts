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
  github: string;
  live: string;
  caseStudy: {
    role: string;
    timeline: string;
    overview: string[];
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
    github: "https://github.com/muhammadshakoor/STC-Forecasting-Frontend",
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
    github: "https://github.com/insaf-blutech/LeadGeneration_Frontend",
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
    slug: "langflow-btc",
    emoji: "⚙️",
    title: "LangFlow BTC",
    sub: "AI Workflow Platform with Enterprise Controls",
    desc: "A production-ready fork of LangFlow rebranded for enterprise use. Features a full admin portal with per-user token budgets, role-based permissions, live agent monitoring, external database connections, Portkey AI gateway for caching and routing, and Langfuse observability — all self-hosted on PostgreSQL.",
    tags: ["LangFlow", "FastAPI", "React", "PostgreSQL", "Docker", "Portkey", "Langfuse", "OpenAI"],
    cat: "AI/ML",
    color: "#6C3CF5",
    bg: "rgba(108,60,245,0.1)",
    border: "rgba(108,60,245,0.22)",
    featured: true,
    github: "https://github.com/muhammadshakoor/LangFlowBTC",
    live: "#",
    caseStudy: {
      role: "Full Stack Developer — Personal Project",
      timeline: "2024",
      overview: [
        "LangFlow BTC is a production-ready enterprise fork of LangFlow, rebranded and extended with a full admin portal. It adds per-user token budgets, role-based permissions, and live agent monitoring on top of LangFlow's visual AI pipeline builder.",
        "The platform is fully self-hosted on PostgreSQL with a Portkey AI gateway for model caching and routing across providers, and Langfuse observability for tracing every agent run — giving enterprise teams control and cost visibility they don't get from hosted LangFlow.",
      ],
      challenges: [
        {
          title: "Per-user token budgets",
          detail:
            "Each user gets a token allowance enforced at the gateway layer via Portkey. Budgets are tracked in PostgreSQL and checked before every LLM call, preventing runaway costs in shared environments.",
        },
        {
          title: "Live agent monitoring",
          detail:
            "Enterprise users need to see running pipelines in real time. A WebSocket-backed monitoring panel streams agent status, token counts, and error events as workflows execute.",
        },
        {
          title: "Portkey + Langfuse integration",
          detail:
            "Routing AI calls through Portkey adds caching and provider fallbacks; every call is also traced in Langfuse, giving a full audit trail of inputs, outputs, latency, and cost per run.",
        },
      ],
      outcomes: [
        "Self-hosted AI workflow platform with full admin controls",
        "Per-user token budgets enforced at the gateway layer",
        "Complete observability via Langfuse tracing on every agent run",
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
    github: "https://github.com/muhammadshakoor/cosmetics-store",
    live: "#",
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
    github: "https://github.com/muhammadshakoor/smart-guest",
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
    github: "https://github.com/muhammadshakoor/crud_app",
    live: "https://crud-app-drab-ten.vercel.app",
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
    github: "https://github.com/muhammadshakoor",
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
    github: "https://github.com/muhammadshakoor/loginpage",
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

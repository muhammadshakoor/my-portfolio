import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/site";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Muhammad Shakoor",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Power Platform",
    "Power Apps",
    "Automation Engineer",
    "Web Developer Islamabad",
    "Software Engineer Pakistan",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${siteConfig.name} — Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_US",
    // og:image comes from app/opengraph-image.tsx (file convention)
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Icons come from app/icon.png + app/apple-icon.png (file convention).
  // Pointing them at /logo.png shipped a 1.36 MB favicon on every page load.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060d1a" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
  ],
  colorScheme: "dark light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: `${siteConfig.url}/profile.jpg`,
      jobTitle: "Full Stack Developer & Automation Engineer",
      worksFor: { "@type": "Organization", name: siteConfig.company },
      email: `mailto:${siteConfig.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Microsoft Power Platform",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: `${siteConfig.name} — Portfolio`,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      {/* Inline script runs before React hydration to prevent theme flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          {children}
          <WhatsAppFloat />
          <ScrollToTop />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        {/* Zanderio AI chat widget — loads on browser idle so it can't delay LCP */}
        <Script
          src="https://cdn.zanderio.ai/widget/loader.js"
          data-id="wdg_VCdfgqUPA7V4MJgnGNZ3K1lE"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

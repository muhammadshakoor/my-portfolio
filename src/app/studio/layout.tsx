import type { Metadata } from "next";

// Belt-and-braces with robots.ts: the CMS admin should never surface in search.
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false, nocache: true },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

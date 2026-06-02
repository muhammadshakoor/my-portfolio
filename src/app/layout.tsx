import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Muhammad Shakoor | Full Stack Developer",
  description: "Associate Full Stack Developer & Power Platform Expert based in Islamabad, Pakistan. Specialising in React, TypeScript, Node.js, and enterprise automation.",
  keywords: ["Muhammad Shakoor", "Full Stack Developer", "React", "Next.js", "Node.js", "TypeScript", "Power Platform", "Islamabad"],
  authors: [{ name: "Muhammad Shakoor" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#080e1c] text-slate-200 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

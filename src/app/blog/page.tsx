import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogList from "@/components/blog/BlogList";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical articles on Full Stack Development, AI Automation, Web Development, Backend, and Frontend — by Muhammad Shakoor.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Practical articles on Full Stack Development, AI Automation, Web Development, Backend, and Frontend.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteConfig.name}`,
    description:
      "Practical articles on Full Stack Development, AI Automation, Web Development, Backend, and Frontend.",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main id="main" style={{ minHeight: "100vh" }}>
      <BlogHeader />
      <BlogList posts={posts} />
    </main>
  );
}

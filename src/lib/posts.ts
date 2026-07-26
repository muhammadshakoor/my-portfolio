import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { client } from "@/sanity/client";
import {
  ALL_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  ALL_SLUGS_QUERY,
} from "@/sanity/queries";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
  readTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

type Frontmatter = {
  title?: string;
  date?: string;
  category?: string;
  excerpt?: string;
  tags?: string[];
  readTime?: number;
};

function readLocalPostFiles(): { slug: string; data: Frontmatter; content: string }[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, data: data as Frontmatter, content };
    });
}

function localPostsMeta(): PostMeta[] {
  return readLocalPostFiles()
    .map(({ slug, data }) => ({
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString().slice(0, 10),
      category: data.category ?? "Web Development",
      excerpt: data.excerpt ?? "",
      tags: data.tags ?? [],
      readTime: data.readTime ?? 5,
    }))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

function localPostBySlug(slug: string): Post | null {
  const match = readLocalPostFiles().find((p) => p.slug === slug);
  if (!match) return null;
  const { data, content } = match;
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? new Date().toISOString().slice(0, 10),
    category: data.category ?? "Web Development",
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    readTime: data.readTime ?? 5,
    content: marked(content) as string,
  };
}

/** Prefer Sanity CMS; fall back to `content/posts/*.md` so the blog works offline. */
export async function getAllPosts(): Promise<PostMeta[]> {
  if (client) {
    try {
      const posts = await client.fetch(ALL_POSTS_QUERY);
      if (Array.isArray(posts) && posts.length > 0) return posts;
    } catch {
      // fall through to local markdown
    }
  }
  return localPostsMeta();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (client) {
    try {
      const data = await client.fetch(POST_BY_SLUG_QUERY, { slug });
      if (data) {
        return {
          ...data,
          content: marked(data.body ?? "") as string,
        };
      }
    } catch {
      // fall through
    }
  }
  return localPostBySlug(slug);
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  if (client) {
    try {
      const slugs = await client.fetch(ALL_SLUGS_QUERY);
      if (Array.isArray(slugs) && slugs.length > 0) return slugs;
    } catch {
      // fall through
    }
  }
  return localPostsMeta().map((p) => ({ slug: p.slug }));
}

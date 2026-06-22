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

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!client) return [];
  return client.fetch(ALL_POSTS_QUERY);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!client) return null;
  const data = await client.fetch(POST_BY_SLUG_QUERY, { slug });
  if (!data) return null;
  return {
    ...data,
    content: marked(data.body ?? "") as string,
  };
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  if (!client) return [];
  return client.fetch(ALL_SLUGS_QUERY);
}

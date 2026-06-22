import { defineType, defineField } from "sanity";

const CATEGORIES = [
  "Full Stack",
  "AI & Automation",
  "Web Development",
  "Backend",
  "Frontend",
  "DevOps",
  "Database",
  "TypeScript",
  "Security",
  "Career",
];

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: CATEGORIES.map((c) => ({ title: c, value: c })),
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short summary shown on the blog listing page.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "body",
      title: "Body (Markdown)",
      description: "Write your post content in Markdown.",
      type: "text",
      rows: 30,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Published Date, Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      date: "publishedAt",
    },
    prepare({ title, subtitle, date }) {
      const d = date ? new Date(date).toLocaleDateString() : "Draft";
      return { title, subtitle: `${subtitle ?? "—"} · ${d}` };
    },
  },
});

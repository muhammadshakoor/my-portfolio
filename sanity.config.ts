import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "portfolio-blog",
  title: "Blog Studio",
  projectId: "5txtsukb",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});

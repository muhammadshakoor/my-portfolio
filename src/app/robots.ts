import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The embedded Sanity Studio is an authoring tool, not public content.
      disallow: ["/studio", "/studio/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

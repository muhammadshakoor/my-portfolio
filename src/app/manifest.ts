import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Portfolio`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#5B3CF5",
    icons: [
      {
        src: "/logo.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}

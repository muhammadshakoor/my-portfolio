import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // The LangFlow BTC case study was renamed to its product name, Entellica.
      { source: "/projects/langflow-btc", destination: "/projects/entellica", permanent: true },
    ];
  },
};

export default nextConfig;

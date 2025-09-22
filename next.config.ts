import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Force Next.js à utiliser Webpack
  experimental: {
    turbo: {
      rules: {}, // forcer une config vide = désactive turbopack
    },
  },
  webpack: (config) => config,
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",
  },
};

export default nextConfig;

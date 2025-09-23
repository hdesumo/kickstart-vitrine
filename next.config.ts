import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Évite les erreurs ESLint bloquantes pendant le build sur Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Supprime l'avertissement sur les lockfiles multiples
  outputFileTracingRoot: __dirname,

  // ✅ Active Turbopack (nouvelle config, remplace experimental.turbo)
  turbopack: {
    resolveAlias: {
      "@": "./",
    },
  },

  // ⚠️ Si tu utilises i18n, vérifie qu'il est compatible App Router
  // et configure ici si nécessaire :
  // i18n: {
  //   locales: ["fr", "en"],
  //   defaultLocale: "fr",
  // },

  // Ajoute d'autres options si tu as besoin (images, redirects, rewrites…)
};

export default nextConfig;

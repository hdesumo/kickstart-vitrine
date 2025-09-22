// lib/i18n.ts
export type SupportedLang = "fr" | "en";

export const SUPPORTED_LANGUAGES: SupportedLang[] = ["fr", "en"];

// Dictionnaire de traductions
export const translations: Record<SupportedLang, Record<string, string>> = {
  fr: {
    learning: "Learning",
    subscriptions: "Abonnements",
    about: "À propos",
    login: "Connexion",
    searchPlaceholder: "Rechercher...",
    footer: "Tous droits réservés",
  },
  en: {
    learning: "Learning",
    subscriptions: "Subscriptions",
    about: "About",
    login: "Login",
    searchPlaceholder: "Search...",
    footer: "All rights reserved",
  },
};

// Helper pour récupérer une traduction
export const t = (lang: SupportedLang, key: string) => {
  return translations[lang]?.[key] ?? key;
};

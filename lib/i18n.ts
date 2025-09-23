export type SupportedLang = "fr" | "en";

export const SUPPORTED_LANGUAGES: SupportedLang[] = ["fr", "en"];

const translations = {
  fr: {
    home: "Accueil",
    courses: "Cours",
    projects: "Projets",
    contact: "Contact",
    login: "Connexion",
    about: "À propos",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    rights: "Tous droits réservés",
  },
  en: {
    home: "Home",
    courses: "Courses",
    projects: "Projects",
    contact: "Contact",
    login: "Login",
    about: "About",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    rights: "All rights reserved",
  },
};

export function t(key: keyof typeof translations["fr"], lang: SupportedLang) {
  return translations[lang]?.[key] ?? key;
}

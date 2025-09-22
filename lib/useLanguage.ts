// lib/useLanguage.ts
"use client";

export type SupportedLang = "fr" | "en";
export const SUPPORTED_LANGUAGES: SupportedLang[] = ["fr", "en"];

export default function useLanguage() {
  const getInitial = (): SupportedLang => {
    if (typeof window === "undefined") return "fr";
    const saved = localStorage.getItem("kickstart-lang");
    if (saved && SUPPORTED_LANGUAGES.includes(saved as SupportedLang)) {
      return saved as SupportedLang;
    }
    const nav = navigator.language?.split("-")[0] ?? "fr";
    return (SUPPORTED_LANGUAGES.includes(nav as SupportedLang) ? nav : "fr") as SupportedLang;
  };

  let lang = getInitial();

  const setLang = (val: SupportedLang) => {
    lang = val;
    if (typeof window !== "undefined") {
      localStorage.setItem("kickstart-lang", val);
      document.documentElement.setAttribute("lang", val);
    }
  };

  return { lang, setLang, SUPPORTED_LANGUAGES };
}

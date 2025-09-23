import { useState, useEffect, useCallback } from "react";
import { SupportedLang, SUPPORTED_LANGUAGES } from "@/lib/i18n";

export function useLanguage() {
  const [lang, setLang] = useState<SupportedLang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("kickstart-lang");
    if (saved && SUPPORTED_LANGUAGES.includes(saved as SupportedLang)) {
      setLang(saved as SupportedLang);
    } else {
      const browserLang = navigator.language.split("-")[0];
      setLang(
        SUPPORTED_LANGUAGES.includes(browserLang as SupportedLang)
          ? (browserLang as SupportedLang)
          : "fr"
      );
    }
  }, []);

  const changeLang = useCallback((newLang: SupportedLang) => {
    setLang(newLang);
    localStorage.setItem("kickstart-lang", newLang);
  }, []);

  return { lang, setLang, changeLang, SUPPORTED_LANGUAGES };
}

"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageSelector() {
  const { lang, changeLang, SUPPORTED_LANGUAGES } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="lang-select" className="text-sm text-gray-600">
        🌐
      </label>
      <select
        id="lang-select"
        value={lang}
        onChange={(e) => changeLang(e.target.value as typeof SUPPORTED_LANGUAGES[number])}
        className="border rounded px-2 py-1 text-sm bg-white shadow-sm"
      >
        {SUPPORTED_LANGUAGES.map((lng) => (
          <option key={lng} value={lng}>
            {lng.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

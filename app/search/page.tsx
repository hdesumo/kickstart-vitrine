"use client";

import { useEffect, useState } from "react";
import { t, SupportedLang, SUPPORTED_LANGUAGES } from "@/lib/i18n";

interface Suggestion {
  type: "course" | "quiz" | "question";
  title: string;
}

export default function SearchPage() {
  const [lang, setLang] = useState<SupportedLang>("fr");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search/suggestions?q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setResults(data.suggestions || []);
    } catch (err) {
      console.error("Erreur recherche :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">
        {lang === "fr" ? "Recherche" : "Search"}
      </h1>

      {/* Formulaire de recherche */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
        <input
          type="text"
          placeholder={
            lang === "fr" ? "Tapez un mot clé..." : "Type a keyword..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? (lang === "fr" ? "Recherche..." : "Searching...") : "🔍"}
        </button>
      </form>

      {/* Résultats */}
      <div className="space-y-4">
        {results.length === 0 && !loading && (
          <p className="text-gray-500">
            {lang === "fr"
              ? "Aucun résultat pour le moment."
              : "No results yet."}
          </p>
        )}

        {results.length > 0 && (
          <ul className="space-y-2">
            {results.map((item, idx) => (
              <li
                key={idx}
                className="p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <span className="text-sm text-gray-500">
                  {item.type === "course"
                    ? lang === "fr"
                      ? "Cours"
                      : "Course"
                    : item.type === "quiz"
                    ? lang === "fr"
                      ? "Quiz"
                      : "Quiz"
                    : lang === "fr"
                    ? "Question"
                    : "Question"}
                </span>
                <p className="font-medium">{item.title}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

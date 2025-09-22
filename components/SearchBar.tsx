"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSuggestions } from "@/lib/api";
import useLanguage from "@/lib/useLanguage";

type Suggestion = {
  type: string;
  title: string;
};

export default function SearchBar({ placeholder }: { placeholder?: string }) {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  // Récupération suggestions backend
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    let active = true;
    setLoading(true);
    getSuggestions(query)
      .then((res) => {
        if (!active) return;
        setSuggestions(res.suggestions);
        setOpen(res.suggestions.length > 0);
      })
      .catch(() => {
        if (active) setSuggestions([]);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [query]);

  // Fermer dropdown si clic extérieur
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`);
    setOpen(false);
  };

  const handleSelect = (item: Suggestion) => {
    // Redirection en fonction du type (ajuster si tu as des routes dédiées)
    const base =
      item.type === "course"
        ? "/learning"
        : item.type === "quiz"
        ? "/learning"
        : "/search";
    router.push(`${base}?q=${encodeURIComponent(item.title)}`);
    setOpen(false);
  };

  return (
    <div className="relative w-full" ref={ref}>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder={
            placeholder ||
            (lang === "fr" ? "Rechercher cours ou quiz..." : "Search courses or quizzes...")
          }
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          🔍
        </button>
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {loading && (
            <div className="px-4 py-2 text-gray-500 text-sm">Chargement...</div>
          )}
          {!loading &&
            suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(s)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                <span className="font-medium text-blue-600">
                  {s.type.toUpperCase()}
                </span>{" "}
                - {s.title}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

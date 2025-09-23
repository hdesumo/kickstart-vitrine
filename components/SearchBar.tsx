"use client";

import { useState, useEffect, useRef } from "react";
import { getSuggestions } from "@/lib/api";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Annule les appels précédents si l'utilisateur continue à taper
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!query.trim()) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    // Ajout du debounce : attend 300 ms avant d'appeler l'API
    timeoutRef.current = setTimeout(() => {
      let active = true;
      getSuggestions(query)
        .then((res) => {
          if (!active) return;
          setSuggestions(res); // ✅ res est déjà un tableau de string[]
          setOpen(res.length > 0);
        })
        .catch(() => {
          setSuggestions([]);
          setOpen(false);
        });

      return () => {
        active = false;
      };
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un cours, un projet..."
        className="w-full border rounded px-3 py-2"
      />

      {open && (
        <ul className="absolute z-10 bg-white border rounded mt-1 w-full shadow-md">
          {suggestions.length > 0 ? (
            suggestions.map((s, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setQuery(s)}
              >
                {s}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">Aucune suggestion</li>
          )}
        </ul>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";

interface Suggestion {
  id: string;
  title: string;
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.6 3.6a7.5 7.5 0 0013.05 13.05z"
    />
  </svg>
);

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 1) {
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data) => setSuggestions(data))
          .catch(() => setSuggestions([]));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative max-w-xl mx-auto">
      {/* Conteneur avec animation focus */}
      <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm transition-transform duration-300 focus-within:scale-[1.02] focus-within:ring-2 focus-within:ring-primary/60 focus-within:shadow-lg">
        {/* Icône loupe */}
        <div className="pl-3 text-gray-500">
          <SearchIcon />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Rechercher un cours ou une leçon..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-3 text-gray-700 focus:outline-none rounded-l-full"
        />

        {/* Bouton recherche */}
        <button
          onClick={() => console.log("Recherche :", query)}
          className="bg-primary text-white px-5 py-3 rounded-r-full hover:bg-primary-dark transition"
        >
          Rechercher
        </button>
      </div>

      {/* Liste des suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-full z-50 max-h-56 overflow-y-auto">
          {suggestions.map((s) => (
            <li
              key={s.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
              onClick={() => console.log("Selected:", s.title)}
            >
              {s.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

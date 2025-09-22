// components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const willDark = !dark;
    setDark(willDark);
    root.classList.toggle("dark", willDark);
    localStorage.setItem("kickstart-theme", willDark ? "dark" : "light");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("kickstart-theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  return (
    <button
      onClick={toggle}
      className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      aria-label="Basculer le thème"
      title="Basculer le thème"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

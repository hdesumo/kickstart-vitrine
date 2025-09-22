"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import { t, SUPPORTED_LANGUAGES, SupportedLang } from "@/lib/i18n";
import Image from "next/image";
import logo from "@/public/logo.png";
import useLanguage from "@/lib/useLanguage";

export default function Navbar() {
  const { lang, changeLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (path: string) => {
    setMobileMenuOpen(false);
    router.push(path);
  };

  const LOGO_SIZE = 72;

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 h-20">
        {/* ✅ Logo interactif */}
        <motion.div
          className="flex items-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => router.push("/")}
        >
          <Image
            src={logo}
            alt="Logo"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6" role="navigation">
          <button
            onClick={() => handleNav("/learning")}
            className={`hover:text-blue-600 transition ${
              pathname === "/learning" ? "text-blue-600 font-semibold" : ""
            }`}
          >
            {t(lang, "learning")}
          </button>
          <button
            onClick={() => handleNav("/tiers")}
            className={`hover:text-blue-600 transition ${
              pathname === "/tiers" ? "text-blue-600 font-semibold" : ""
            }`}
          >
            {t(lang, "tiers")}
          </button>
          <SearchBar />
          <select
            aria-label="Choisir la langue"
            value={lang}
            onChange={(e) => changeLang(e.target.value as SupportedLang)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
        </nav>

        {/* Bouton Mobile */}
        <button
          aria-label="Ouvrir le menu mobile"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-7 h-7 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile animé */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-inner border-t border-gray-100"
          >
            <div className="flex flex-col px-4 py-3 space-y-3">
              <button
                onClick={() => handleNav("/learning")}
                className="text-left hover:text-blue-600"
              >
                {t(lang, "learning")}
              </button>
              <button
                onClick={() => handleNav("/tiers")}
                className="text-left hover:text-blue-600"
              >
                {t(lang, "tiers")}
              </button>
              <SearchBar />
              <select
                aria-label="Choisir la langue"
                value={lang}
                onChange={(e) => changeLang(e.target.value as SupportedLang)}
                className="border rounded-md px-2 py-1 text-sm"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

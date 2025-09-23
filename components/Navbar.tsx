"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";
import LanguageSelector from "@/components/LanguageSelector";

export default function Navbar() {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { href: "/", key: "home" },
    { href: "/courses", key: "courses" },
    { href: "/projects", key: "projects" },
    { href: "/contact", key: "contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-green-600">
        Kickstart
      </Link>

      {/* Menu desktop */}
      <div className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={`hover:text-green-600 ${
              pathname === link.href ? "text-green-600 font-semibold" : "text-gray-700"
            }`}
          >
            {t(link.key as any, lang)}
          </Link>
        ))}

        <LanguageSelector />
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {t("login", lang)}
        </button>
      </div>

      {/* Menu mobile */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md p-4 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`hover:text-green-600 ${
                pathname === link.href ? "text-green-600 font-semibold" : "text-gray-700"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(link.key as any, lang)}
            </Link>
          ))}
          <LanguageSelector />
          <button
            onClick={() => {
              router.push("/login");
              setMobileMenuOpen(false);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {t("login", lang)}
          </button>
        </div>
      )}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useUnread } from "@/lib/unreadContext";
import { logout } from "@/lib/api";

export default function NavbarStudent() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { unreadCount, refreshUnread } = useUnread();

  async function handleLogout() {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
    }
  }

  const navLinks = [
    { href: "/dashboard", label: "Tableau de bord" },
    { href: "/projects", label: "Projets" },
    { href: "/learning", label: "Cours" },
    { href: "/wallet", label: "Portefeuille" },
  ];

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/dashboard" className="text-xl font-bold text-green-600">
          Kickstart
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-green-600 ${
                pathname === link.href
                  ? "text-green-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Icône notifications */}
          <Link href="/notifications" className="relative">
            <span className="material-icons text-gray-600 hover:text-green-600">
              notifications
            </span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>

          {/* Bouton déconnexion */}
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
          >
            Déconnexion
          </button>
        </nav>

        {/* Menu mobile toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t flex flex-col gap-3 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`hover:text-green-600 ${
                pathname === link.href
                  ? "text-green-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/notifications"
            className="flex items-center gap-2 hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-icons">notifications</span>
            {unreadCount > 0 && (
              <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="text-left text-sm bg-gray-100 rounded px-3 py-2 hover:bg-gray-200"
          >
            Déconnexion
          </button>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUnreadCount } from "@/lib/unreadContext";

export default function NavbarStudent() {
  const pathname = usePathname();
  const router = useRouter();
  const { unread, refreshUnread, logout } = useUnreadCount();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/projects", label: "Projets" },
    { href: "/wallet", label: "Wallet" },
    { href: "/profile", label: "Profil" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
          Kickstart Campus
        </Link>

        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={`/app/(student)${link.href}`}
                className={`${
                  pathname.endsWith(link.href)
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                } transition`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* Notifications */}
          <li>
            <Link href="/app/(student)/notifications" className="relative">
              🔔
              {unread > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {unread}
                </span>
              )}
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

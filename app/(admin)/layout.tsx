import type { Metadata } from "next";
import { ReactNode } from "react";
import { UnreadProvider } from "@/lib/unreadContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/api";

export const metadata: Metadata = {
  title: "Admin | Kickstart Campus",
  description:
    "Interface d’administration pour la gestion des utilisateurs, contenus et abonnements.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-100 flex">
        <UnreadProvider>
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <AdminTopbar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </UnreadProvider>
      </body>
    </html>
  );
}

/* --- Composants internes pour la sidebar et la topbar --- */

function AdminSidebar() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/admin/dashboard", label: "Tableau de bord" },
    { href: "/admin/users", label: "Utilisateurs" },
    { href: "/admin/courses", label: "Cours" },
    { href: "/admin/projects", label: "Projets" },
    { href: "/admin/tiers", label: "Plans tarifaires" },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col">
      <div className="p-4 text-xl font-bold text-green-600">Kickstart Admin</div>
      <nav className="flex-1 flex flex-col">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 hover:bg-green-50 ${
              pathname === link.href
                ? "bg-green-100 text-green-700 font-semibold"
                : "text-gray-700"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function AdminTopbar() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
    }
  }

  return (
    <header className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800">Administration</h1>
      <button
        onClick={handleLogout}
        className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
      >
        Déconnexion
      </button>
    </header>
  );
}

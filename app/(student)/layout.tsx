import type { Metadata } from "next";
import { UnreadProvider } from "@/lib/unreadContext";
import NavbarStudent from "@/components/NavbarStudent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Espace étudiant | Kickstart Campus",
  description:
    "Tableau de bord étudiant, projets, cours et notifications sur Kickstart Campus.",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <UnreadProvider>
          <NavbarStudent />
          <main className="flex-1">{children}</main>
          <Footer variant="minimal" />
        </UnreadProvider>
      </body>
    </html>
  );
}

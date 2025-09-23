import "./globals.css";
import type { Metadata } from "next";
import { UnreadProvider } from "@/lib/unreadContext";
import Navbar from "@/components/Navbar"; // ou NavbarStudent si c'est le layout étudiant
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kickstart Campus",
  description:
    "La première plateforme d'émancipation économique étudiante d'Afrique – épargne collaborative, apprentissage et financement de projets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-gray-50">
        {/* Provider global pour les notifications */}
        <UnreadProvider>
          {/* Navbar en haut */}
          <Navbar />

          {/* Contenu principal */}
          <main className="flex-1">{children}</main>

          {/* Footer en bas */}
          <Footer />
        </UnreadProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kickstart Campus",
  description: "Plateforme pour apprendre, se connecter et trouver des opportunités.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white">
        {/* Le Layout principal inclut déjà le Header et le Footer */}
        {children}
      </body>
    </html>
  );
}

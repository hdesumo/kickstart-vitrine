import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-gray-50 text-gray-900">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        {/* Footer institutionnel par défaut */}
        <Footer variant="vitrine" />
      </body>
    </html>
  );
}

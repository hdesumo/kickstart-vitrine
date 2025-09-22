// app/(student)/layout.tsx
import "@/app/globals.css";
import Footer from "@/components/Footer";
import NavbarStudent from "@/components/NavbarStudent";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="bg-gray-50 text-gray-900">
      <body className="min-h-screen flex flex-col">
        <NavbarStudent />
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        <Footer variant="minimal" />
      </body>
    </html>
  );
}

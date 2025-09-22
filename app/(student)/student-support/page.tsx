"use client";

import { useEffect, useState } from "react";
import { SupportedLang, SUPPORTED_LANGUAGES } from "@/lib/i18n";

export default function StudentSupportPage() {
  const [lang, setLang] = useState<SupportedLang>("fr");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Détection de la langue
  useEffect(() => {
    const saved = localStorage.getItem("kickstart-lang");
    if (saved && SUPPORTED_LANGUAGES.includes(saved as SupportedLang)) {
      setLang(saved as SupportedLang);
    } else {
      const browserLang = navigator.language.split("-")[0];
      setLang(
        SUPPORTED_LANGUAGES.includes(browserLang as SupportedLang)
          ? (browserLang as SupportedLang)
          : "fr"
      );
    }
  }, []);

  // Vérification d'authentification (exemple simple)
  useEffect(() => {
    const token = localStorage.getItem("kickstart-token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {lang === "fr"
            ? "Accès réservé aux étudiants"
            : "Access restricted to students"}
        </h1>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          {lang === "fr"
            ? "Connectez-vous à votre compte étudiant pour accéder à l’assistance personnalisée et suivre vos tickets de support."
            : "Log in to your student account to access personalized assistance and track your support tickets."}
        </p>
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          {lang === "fr" ? "Se connecter" : "Log in"}
        </a>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-blue-600">
        {lang === "fr" ? "Support Étudiant" : "Student Support"}
      </h1>
      <p className="text-gray-700 max-w-2xl">
        {lang === "fr"
          ? "Bienvenue dans l’espace support étudiant. Ici, vous pouvez ouvrir de nouveaux tickets, suivre vos demandes en cours et consulter les réponses de notre équipe."
          : "Welcome to the student support area. Here you can open new tickets, track your ongoing requests, and read responses from our team."}
      </p>

      {/* Exemple de liste de tickets */}
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((id) => (
          <div
            key={id}
            className="p-5 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold mb-2">
              {lang === "fr"
                ? `Ticket #${id} - Sujet Exemple`
                : `Ticket #${id} - Sample Subject`}
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              {lang === "fr"
                ? "Description rapide du problème ou de la demande de l'étudiant."
                : "Quick description of the student's issue or request."}
            </p>
            <span className="text-xs text-green-600 font-medium">
              {lang === "fr" ? "Statut : Résolu" : "Status: Resolved"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

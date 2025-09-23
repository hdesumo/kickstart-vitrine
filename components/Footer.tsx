"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

export default function Footer({ variant = "vitrine" }: { variant?: "vitrine" | "minimal" }) {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  if (variant === "minimal") {
    // 🟢 Footer minimal (pour espace étudiant ou dashboard)
    return (
      <footer className="bg-gray-50 text-center py-3 text-xs text-gray-500 border-t border-gray-200">
        © {year} Kickstart Campus
      </footer>
    );
  }

  // 🟢 Footer institutionnel (par défaut : vitrine)
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Colonne 1 : Présentation */}
        <div>
          <h3 className="text-lg font-bold text-blue-600">Kickstart Campus</h3>
          <p className="text-sm text-gray-600 mt-2">
            {lang === "fr"
              ? "La première plateforme d'émancipation économique étudiante d'Afrique – épargne collaborative, apprentissage et financement de projets."
              : "Africa's first student economic empowerment platform – collaborative savings, learning, and project funding."}
          </p>
        </div>

        {/* Colonne 2 : Liens rapides */}
        <div>
          <h4 className="font-semibold mb-2">
            {lang === "fr" ? "Liens utiles" : "Quick Links"}
          </h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/learning" className="hover:text-blue-600">
                {lang === "fr" ? "Cours & Formations" : "Courses & Training"}
              </a>
            </li>
            <li>
              <a href="/tiers" className="hover:text-blue-600">
                {lang === "fr" ? "Abonnements" : "Subscriptions"}
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-600">
                {t("about", lang)}
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-600">
                {t("contact", lang)}
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Réseaux sociaux */}
        <div>
          <h4 className="font-semibold mb-2">
            {lang === "fr" ? "Rejoignez-nous" : "Join us"}
          </h4>
          <div className="flex gap-4 text-gray-600">
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-600">
              {/* Icône LinkedIn */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761...z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-600">
              {/* Icône Twitter */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9...z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-600">
              {/* Icône Instagram */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2...z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 text-center py-4 text-xs text-gray-500">
        © {year} Kickstart Campus – {t("rights", lang)}
      </div>
    </footer>
  );
}

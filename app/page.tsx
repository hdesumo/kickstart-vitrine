"use client";

import Layout from "@/components/Layout";
import HeroSlider from "@/components/HeroSlider";
import SearchBar from "@/components/SearchBar";
import NewsSection from "@/components/NewsSection";
import OpportunitiesSection from "@/components/OpportunitiesSection";

export default function HomePage() {
  return (
    <Layout title="Accueil - Kickstart Campus">
      {/* HERO */}
      <section className="bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <HeroSlider />
        </div>
      </section>

      {/* SECTION RECHERCHE + PRÉSENTATION */}
      <section className="bg-gray-50 max-w-full px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🔍 Rechercher un cours ou réviser une leçon
        </h2>

        <div className="max-w-2xl mx-auto mb-6">
          <SearchBar />
        </div>

        <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
          Kickstart Campus est la plateforme qui aide les étudiants et jeunes
          entrepreneurs à apprendre, se connecter et trouver des opportunités
          pour construire l’avenir.
        </p>
      </section>

      {/* SECTION LEARNING */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <img src="/learning.webp" alt="Cours" className="rounded-2xl shadow-lg" />
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">📚 Apprentissage</h2>
          <p className="text-gray-600 mb-6">
            Découvrez un catalogue de cours et d'ateliers pour développer vos
            compétences et avancer dans votre parcours académique et entrepreneurial.
          </p>
          <a href="/learning" className="btn-primary">Découvrir les cours</a>
        </div>
      </section>

      {/* SECTION FORUMS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-primary mb-4">💬 Forums</h2>
            <p className="text-gray-600 mb-6">
              Partagez vos idées et échangez avec d'autres étudiants et experts.
            </p>
            <a href="/forums" className="btn-primary">Participer aux discussions</a>
          </div>
          <img src="/forums.webp" alt="Forums" className="order-1 md:order-2 rounded-2xl shadow-lg" />
        </div>
      </section>

      {/* SECTION CONNEXIONS */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <img src="/connections.webp" alt="Connexions" className="rounded-2xl shadow-lg" />
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">🤝 Connexions</h2>
          <p className="text-gray-600 mb-6">
            Créez votre profil, connectez-vous avec d'autres étudiants et
            développez votre réseau professionnel.
          </p>
          <a href="/connections" className="btn-primary">Créer mon réseau</a>
        </div>
      </section>

      {/* SECTION OPPORTUNITÉS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-primary mb-4">🚀 Opportunités</h2>
            <p className="text-gray-600 mb-6">
              Trouvez des financements et concours pour transformer vos idées en réalité.
            </p>
            <a href="/opportunities" className="btn-primary">Voir les opportunités</a>
          </div>
          <img src="/opp1.webp" alt="Opportunités" className="order-1 md:order-2 rounded-2xl shadow-lg" />
        </div>
      </section>

      {/* BLOC RESTEZ INFORMÉ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            📰 Restez informé
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Consultez les dernières actualités de la communauté Kickstart Campus
            et découvrez les opportunités à ne pas manquer.
          </p>
        </div>

        {/* NEWS & OPPORTUNITÉS */}
        <div className="space-y-16">
          <NewsSection />
          <OpportunitiesSection />
        </div>
      </section>

      {/* SECTION CTA FINALE */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-500 to-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Rejoignez Kickstart Campus aujourd'hui !
        </h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto">
          Apprenez, connectez-vous et construisez l'avenir avec nous.
        </p>
        <a href="/signup" className="btn-secondary bg-white text-primary hover:bg-gray-100">
          Créer un compte gratuit
        </a>
      </section>
    </Layout>
  );
}

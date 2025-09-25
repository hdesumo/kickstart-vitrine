"use client";

import React from "react";
import Head from "next/head";
import AnnouncementsMarquee from "./AnnouncementsMarquee";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  title = "Kickstart Campus",
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Kickstart Campus"
              className="h-24 w-auto bg-white p-1 rounded-md shadow-sm"
            />
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6 font-medium text-gray-700">
            <a href="/" className="link">Accueil</a>
            <a href="/learning" className="link">Learning</a>
            <a href="/forums" className="link">Forums</a>
            <a href="/connections" className="link">Connexions</a>
            <a href="/opportunities" className="link">Opportunités</a>
          </nav>

          {/* Langue + Actions */}
          <div className="flex items-center gap-3">
            <select
              className="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none"
              defaultValue="fr"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
            <a href="/login" className="btn-secondary">Se connecter</a>
            <a href="/signup" className="btn-primary">Créer un compte</a>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <AnnouncementsMarquee />

      {/* CONTENU */}
      <main className="flex-1">{children}</main>

      {/* FOOTER EN COLONNES */}
      <footer className="bg-gray-100 text-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Colonne 1 - Présentation */}
          <div>
            <img src="/logo.png" alt="Kickstart Campus" className="h-16 mb-4" />
            <p className="text-sm text-gray-600 leading-relaxed">
              Kickstart Campus est la plateforme qui aide les étudiants et jeunes
              entrepreneurs à apprendre, se connecter et trouver des opportunités
              pour construire l’avenir.
            </p>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 uppercase tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="link">Accueil</a></li>
              <li><a href="/learning" className="link">Learning</a></li>
              <li><a href="/forums" className="link">Forums</a></li>
              <li><a href="/connections" className="link">Connexions</a></li>
              <li><a href="/opportunities" className="link">Opportunités</a></li>
            </ul>
          </div>

          {/* Colonne 3 - Suivez-nous */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 uppercase tracking-wide">
              Suivez-nous
            </h4>
            <div className="flex gap-4">
              {/* Facebook */}
              <a href="#" className="text-gray-600 hover:text-primary transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-gray-600 hover:text-primary transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="text-gray-600 hover:text-primary transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.58 8.58 0 01-2.72 1.04A4.28 4.28 0 0015.5 4a4.28 4.28 0 00-4.27 4.27c0 .34.04.67.11.99A12.14 12.14 0 013 5.15a4.27 4.27 0 001.33 5.7 4.3 4.3 0 01-1.94-.54v.06a4.27 4.27 0 003.43 4.18 4.3 4.3 0 01-1.93.07 4.28 4.28 0 003.99 2.96A8.58 8.58 0 012 19.54a12.1 12.1 0 006.56 1.92c7.87 0 12.17-6.52 12.17-12.17 0-.18 0-.35-.01-.53A8.67 8.67 0 0022.46 6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Kickstart Campus. Tous droits réservés.
        </div>
      </footer>
    </>
  );
};

export default Layout;

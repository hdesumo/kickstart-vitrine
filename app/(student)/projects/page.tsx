"use client";

import { useEffect, useState } from "react";
import { getProjects, type Project } from "@/lib/api";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data.projects); // ✅ Corrigé
      } catch (err) {
        console.error("Erreur chargement projets:", err);
        setError("Impossible de charger les projets.");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Chargement...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <section className="flex-1 px-6 py-12 max-w-5xl mx-auto space-y-8">
        <motion.h1
          className="text-3xl font-bold text-green-600 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projets et réalisations
        </motion.h1>

        {projects.length === 0 ? (
          <p className="text-gray-500 text-center">
            Aucun projet disponible pour le moment.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((proj) => (
              <motion.div
                key={proj.id}
                className="p-4 rounded-lg shadow bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold">{proj.title}</h3>
                {proj.description && (
                  <p className="text-sm text-gray-600 mt-2">
                    {proj.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

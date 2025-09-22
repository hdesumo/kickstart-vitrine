"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchTiers } from "@/lib/api";

type Tier = {
  id: number;
  name: string;
  labelFr: string;
  labelEn: string;
  price: number;
  currency: string;
  featuresFr: string;
  featuresEn: string;
};

export default function TiersPage() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTiers() {
      try {
        const data = await fetchTiers();
        setTiers(data);
      } catch (err) {
        console.error("Erreur lors du chargement des plans :", err);
        setError("Impossible de charger les plans tarifaires.");
      } finally {
        setLoading(false);
      }
    }
    loadTiers();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Chargement des plans...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nos plans tarifaires
      </motion.h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {tiers.map((tier) => {
          const featuresFr: string[] = JSON.parse(tier.featuresFr || "[]");
          return (
            <motion.div
              key={tier.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-2xl font-semibold mb-2">{tier.labelFr}</h2>
              <p className="text-3xl font-bold text-blue-600 mb-4">
                {tier.price === 0 ? "Gratuit" : `${tier.price.toLocaleString()} ${tier.currency}`}
              </p>

              <ul className="flex-1 mb-4 space-y-2 text-gray-700">
                {featuresFr.length > 0 ? (
                  featuresFr.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      ✅ <span className="ml-2">{feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">Aucune fonctionnalité renseignée</li>
                )}
              </ul>

              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 px-4 transition">
                Choisir ce plan
              </button>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}

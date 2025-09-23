"use client";

import { useEffect, useState } from "react";
import { fetchTiers, type Tier } from "@/lib/api";

export default function TiersPage() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTiers() {
      try {
        const data = await fetchTiers();
        setTiers(data.tiers); // ✅ On passe seulement le tableau
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
    return <p className="p-6 text-gray-500">Chargement des plans...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Plans tarifaires</h1>
      {tiers.length === 0 ? (
        <p className="text-gray-500">Aucun plan disponible pour le moment.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="p-4 border rounded-lg shadow-sm bg-white flex flex-col"
            >
              <h2 className="text-lg font-semibold mb-2">{tier.name}</h2>
              <p className="text-gray-700 mb-2">
                {tier.currency ? `${tier.price} ${tier.currency}` : tier.price}
              </p>
              {/* Ajoute ici d'autres infos si disponibles dans l'API */}
              <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded">
                Choisir ce plan
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

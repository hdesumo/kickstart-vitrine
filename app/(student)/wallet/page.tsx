"use client";

import { useEffect, useState } from "react";
import { getTiers } from "@/lib/api";

export default function WalletPage() {
  const [tiers, setTiers] = useState<any[]>([]);

  useEffect(() => {
    getTiers()
      .then((res) => setTiers(res.tiers))
      .catch((err) => console.error("Erreur wallet:", err));
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Mon Wallet</h1>
      <p className="text-gray-600 mb-6">
        Cet espace affichera ton solde, ton historique de transactions et tes avantages.
      </p>
      <h2 className="text-lg font-semibold mb-2">Abonnements disponibles</h2>
      <ul className="space-y-2">
        {tiers.map((tier) => (
          <li key={tier.id} className="card">
            <p className="font-medium">{tier.kind}</p>
            <p className="text-sm text-gray-500">
              {tier.minMonthlyUsd} {tier.currency} / mois –{" "}
              {tier.benefits || "Aucun détail"}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

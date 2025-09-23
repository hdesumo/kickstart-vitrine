'use client';

import { useEffect, useState } from 'react';
import { getTiers, type Tier } from '@/lib/api';

export default function WalletPage() {
  const [tiers, setTiers] = useState<Tier[]>([]);

  useEffect(() => {
    getTiers()
      .then((res) => setTiers(res.tiers))
      .catch((err) => console.error('Erreur wallet:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Formules disponibles</h1>
      {tiers.length === 0 && <p>Aucune formule trouvée.</p>}
      <ul className="space-y-3">
        {tiers.map((tier) => (
          <li key={tier.id} className="p-3 rounded bg-gray-100 flex justify-between">
            <div>
              <div className="font-semibold">{tier.name}</div>
              {tier.currency && <div className="text-sm text-gray-600">{tier.currency}</div>}
            </div>
            <div className="font-bold">{tier.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

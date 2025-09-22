// components/pricing/PricingTable.tsx
"use client";
import { useEffect, useState } from "react";
import { formatCurrency, convertFromUSD } from "@/lib/currency";

type Tier = {
  id: number;
  kind: "student" | "non_student" | string;
  minMonthlyUsd: number;
  benefits?: string | null;
  isDefault: boolean;
};

export default function PricingTable({ locale="fr", currency="XAF" }:{
  locale?: "fr"|"en";
  currency?: "USD"|"EUR"|"XAF"|"XOF"|"NGN"|"GHS";
}) {
  const [tiers, setTiers] = useState<Tier[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tiers`)
      .then(res => res.json())
      .then(d => setTiers(d.tiers ?? []));
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {tiers.map(t => {
        const local = convertFromUSD(t.minMonthlyUsd, currency);
        return (
          <div key={t.id} className="rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              {t.kind === "student" ? (locale==="fr"?"Étudiant":"Student")
                : t.kind === "non_student" ? (locale==="fr"?"Non-Étudiant":"Non-Student")
                : t.kind}
            </h3>
            <p className="text-3xl font-bold mb-1">
              {formatCurrency(local, currency, locale)}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              ≈ {formatCurrency(t.minMonthlyUsd, "USD", locale)} / mo
            </p>
            <ul className="text-sm space-y-2 mb-6">
              {(t.benefits ?? "").split(/[,•\-–]\s*/).filter(Boolean).map((b,i)=>(
                <li key={i}>• {b}</li>
              ))}
            </ul>
            <button className="w-full rounded-xl py-2 border hover:bg-gray-50">
              {locale==="fr" ? "Commencer" : "Get started"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

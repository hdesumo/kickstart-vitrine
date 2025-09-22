"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/lib/api";

export default function ProfilePage() {
  const [me, setMe] = useState<{ id: number; email: string } | null>(null);

  useEffect(() => {
    getMe()
      .then((res) => setMe(res))
      .catch(() => console.log("Utilisateur non connecté"));
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>
      {me ? (
        <div className="card">
          <p>
            <span className="font-semibold">ID :</span> {me.id}
          </p>
          <p>
            <span className="font-semibold">Email :</span> {me.email}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Vous n’êtes pas connecté.</p>
      )}
    </section>
  );
}

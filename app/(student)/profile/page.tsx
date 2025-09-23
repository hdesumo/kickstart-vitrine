'use client';

import { useEffect, useState } from 'react';
import { getMe, type UserProfile } from '@/lib/api';

export default function ProfilePage() {
  const [me, setMe] = useState<UserProfile | null>(null);

  useEffect(() => {
    getMe()
      .then((res) => setMe(res))
      .catch(() => console.log('Utilisateur non connecté'));
  }, []);

  if (!me) {
    return <p className="p-4">Chargement...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mon profil</h1>
      <div className="space-y-2">
        <p><strong>Email :</strong> {me.email}</p>
        {me.name && <p><strong>Nom :</strong> {me.name}</p>}
        {me.role && <p><strong>Rôle :</strong> {me.role}</p>}
      </div>
    </div>
  );
}

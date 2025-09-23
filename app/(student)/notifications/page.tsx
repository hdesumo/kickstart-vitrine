'use client';

import { useEffect, useState } from 'react';
import { getPaginatedNotifications, type Notification as ApiNotification } from '@/lib/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<ApiNotification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await getPaginatedNotifications(page, 10);
        // ✅ TS sait que res.notifications est ApiNotification[]
        setNotifications((prev) => [...prev, ...res.notifications]);
        setHasMore(res.notifications.length > 0);
      } catch (err) {
        console.error('Erreur récupération notifications:', err);
      }
    }

    fetchNotifications();
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 && <p>Aucune notification</p>}
      <ul className="space-y-2">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className={`p-2 rounded ${notif.read ? 'bg-gray-100' : 'bg-yellow-50'}`}
          >
            <p className="text-sm">{notif.title ?? notif.message}</p>
            <span className="text-xs text-gray-400">
              {new Date(notif.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Charger plus
        </button>
      )}
    </div>
  );
}

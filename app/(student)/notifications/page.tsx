// app/(student)/notifications/page.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  getPaginatedNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/lib/api";
import { useUnreadCount } from "@/lib/unreadContext";
import { toast } from "sonner";

type Notification = {
  id: number;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { refreshUnread } = useUnreadCount();

  const fetchNotifications = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const res = await getPaginatedNotifications(page, 10);
      setNotifications((prev) => [...prev, ...res.notifications]);
      setHasMore(res.notifications.length > 0);
    } catch (err) {
      console.error("Erreur récupération notifications:", err);
      toast.error("Impossible de charger les notifications.");
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, hasMore]);

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  async function handleMarkRead(id: number) {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      refreshUnread();
      toast.success("Notification marquée comme lue.");
    } catch (error) {
      console.error("Erreur marquage notification:", error);
      toast.error("Échec du marquage.");
    }
  }

  async function handleMarkAllRead() {
    try {
      await markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      refreshUnread();
      toast.success("Toutes les notifications ont été marquées comme lues !");
    } catch (error) {
      console.error("Erreur marquage global:", error);
      toast.error("Impossible de tout marquer comme lu.");
    }
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={handleMarkAllRead}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Tout marquer comme lu ✅
          </button>
        )}
      </div>

      {notifications.length === 0 && !loading && (
        <p className="text-gray-500">Aucune notification pour le moment.</p>
      )}

      <ul className="space-y-3">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`p-4 border rounded-lg shadow-sm ${
              n.read ? "bg-gray-100" : "bg-blue-50"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{n.title}</h2>
                <p className="text-sm text-gray-700">{n.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              {!n.read && (
                <button
                  onClick={() => handleMarkRead(n.id)}
                  className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Marquer comme lue
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {loading && <p className="text-center mt-4">Chargement...</p>}
      <div ref={loaderRef} className="h-8"></div>
    </section>
  );
}

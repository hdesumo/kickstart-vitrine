"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUnreadNotifications } from "@/lib/api";

interface UnreadContextType {
  unreadCount: number;
  refreshUnread: () => Promise<void>;
}

const UnreadContext = createContext<UnreadContextType | undefined>(undefined);

export function UnreadProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);

  async function refreshUnread() {
    try {
      const data = await getUnreadNotifications();
      setUnreadCount(data.count);
    } catch (error) {
      console.error("Erreur récupération notifications non lues:", error);
    }
  }

  useEffect(() => {
    refreshUnread();
    // Optionnel : rafraîchir toutes les 60s
    const interval = setInterval(refreshUnread, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <UnreadContext.Provider value={{ unreadCount, refreshUnread }}>
      {children}
    </UnreadContext.Provider>
  );
}

export function useUnread() {
  const context = useContext(UnreadContext);
  if (!context) {
    throw new Error("useUnread must be used within an UnreadProvider");
  }
  return context;
}

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUnreadNotifications, logout as apiLogout } from "@/lib/api";

const UnreadContext = createContext<any>(null);

export function UnreadProvider({ children }: { children: React.ReactNode }) {
  const [unread, setUnread] = useState(0);

  async function refreshUnread() {
    try {
      const res = await getUnreadNotifications();
      setUnread(res.unread);
    } catch {
      setUnread(0);
    }
  }

  async function logout() {
    await apiLogout();
    setUnread(0);
  }

  useEffect(() => {
    refreshUnread();
  }, []);

  return (
    <UnreadContext.Provider value={{ unread, refreshUnread, logout }}>
      {children}
    </UnreadContext.Provider>
  );
}

export function useUnreadCount() {
  return useContext(UnreadContext);
}

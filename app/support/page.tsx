"use client";

import { useState } from "react";
import { sendPublicSupport } from "@/lib/api";

export default function PublicSupportPage() {
  const [status, setStatus] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const subject = String(fd.get("subject") || "");
    const message = String(fd.get("message") || "");

    try {
      await sendPublicSupport({ name, email, subject, message });
      setStatus("✅ Merci ! Votre demande a bien été envoyée. Nous revenons vers vous rapidement.");
      e.currentTarget.reset();
    } catch {
      setStatus("❌ Impossible d’envoyer la demande. Réessayez.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Support d’assistance (visiteurs)</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Votre nom" required className="w-full border p-2 rounded" />
        <input
          name="email"
          type="email"
          placeholder="Votre email"
          required
          className="w-full border p-2 rounded"
        />
        <input name="subject" placeholder="Sujet" required className="w-full border p-2 rounded" />
        <textarea
          name="message"
          placeholder="Expliquez votre besoin…"
          required
          rows={5}
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Envoyer
        </button>
      </form>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
}

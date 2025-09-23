import { useState, useCallback } from "react";
import { generateRevision, type RevisionResponse } from "@/lib/api";

export function useGenerateRevision() {
  const [result, setResult] = useState<RevisionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = useCallback(
    async (subject: string, chapter: string, exerciseType: string) => {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const data = await generateRevision(subject, chapter, exerciseType);
        if (data.status === "success") {
          setResult(data);
        } else {
          setError(data.message ?? "Erreur inconnue");
        }
      } catch (err: any) {
        setError(
          err?.message ??
            "Impossible de générer la révision. Veuillez réessayer plus tard."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { result, error, loading, generate };
}

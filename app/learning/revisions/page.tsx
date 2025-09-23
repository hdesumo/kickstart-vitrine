"use client";

import { useState } from "react";
import { useGenerateRevision } from "@/hooks/useGenerateRevision";
import RevisionCard from "@/components/RevisionCard";
import jsPDF from "jspdf";

export default function RevisionsPage() {
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const { result, error, loading, generate } = useGenerateRevision();

  function handleDownloadPDF() {
    if (!result || !result.questions) return;
    const pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text("Révision", 10, 15);

    if (result.summary) {
      pdf.setFontSize(12);
      pdf.text(result.summary, 10, 25);
    }

    let y = 40;
    pdf.setFontSize(12);
    result.questions.forEach((q, idx) => {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(`${idx + 1}. ${q}`, 10, y);
      y += 10;
    });

    pdf.save("revision.pdf");
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Générateur de révisions</h1>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Matière"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Chapitre"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Type d'exercice"
          value={exerciseType}
          onChange={(e) => setExerciseType(e.target.value)}
          className="w-full border rounded p-2"
        />

        <button
          onClick={() => generate(subject, chapter, exerciseType)}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Génération..." : "Générer"}
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {result && result.status === "success" && (
        <div className="space-y-3">
          {result.summary && (
            <p className="text-gray-700 font-medium mb-4">{result.summary}</p>
          )}
          {result.questions && result.questions.length > 0 && (
            <>
              {result.questions.map((q, index) => (
                <RevisionCard key={index} index={index} question={q} />
              ))}
              <button
                onClick={handleDownloadPDF}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
              >
                Télécharger en PDF
              </button>
            </>
          )}
        </div>
      )}
    </main>
  );
}

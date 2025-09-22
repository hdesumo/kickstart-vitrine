"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SupportedLang, SUPPORTED_LANGUAGES } from "@/lib/i18n";
import { generateRevision } from "@/lib/api";

export default function RevisionsPage() {
  const [lang, setLang] = useState<SupportedLang>("fr");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [exerciseType, setExerciseType] = useState("quiz");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("kickstart-lang");
    if (saved && SUPPORTED_LANGUAGES.includes(saved as SupportedLang)) {
      setLang(saved as SupportedLang);
    } else {
      const browserLang = navigator.language.split("-")[0];
      setLang(
        SUPPORTED_LANGUAGES.includes(browserLang as SupportedLang)
          ? (browserLang as SupportedLang)
          : "fr"
      );
    }
  }, []);

  async function handleGenerate() {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await generateRevision(subject, chapter, exerciseType);
      if (data.status === "success") {
        setResult(data);
      } else {
        setError(data.message || "Erreur inconnue");
      }
    } catch (err: any) {
      setError(
        lang === "fr"
          ? "❌ Impossible de générer la révision. Vérifiez votre connexion."
          : "❌ Unable to generate revision. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 md:px-12 py-12">
      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-600"
      >
        {lang === "fr" ? "Révisions IA" : "AI-Powered Revisions"}
      </motion.h1>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-gray-600 mb-10 max-w-2xl mx-auto"
      >
        {lang === "fr"
          ? "Choisissez la matière, le chapitre et le type d’exercice pour générer un quiz, un résumé ou des flashcards adaptés à votre programme."
          : "Select the subject, chapter, and exercise type to generate a quiz, summary, or flashcards tailored to your curriculum."}
      </motion.p>

      {/* Formulaire */}
      <div className="max-w-xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-sm">
        {/* Matière */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === "fr" ? "Matière" : "Subject"}
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">
              {lang === "fr"
                ? "-- Sélectionnez une matière --"
                : "-- Select a subject --"}
            </option>
            <option value="math">
              {lang === "fr" ? "Mathématiques" : "Mathematics"}
            </option>
            <option value="physique">
              {lang === "fr" ? "Physique" : "Physics"}
            </option>
            <option value="chimie">
              {lang === "fr" ? "Chimie" : "Chemistry"}
            </option>
            <option value="histoire">
              {lang === "fr" ? "Histoire" : "History"}
            </option>
            <option value="droit">{lang === "fr" ? "Droit" : "Law"}</option>
          </select>
        </div>

        {/* Chapitre */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === "fr" ? "Chapitre" : "Chapter"}
          </label>
          <input
            type="text"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            placeholder={
              lang === "fr"
                ? "Ex: Les équations différentielles"
                : "Ex: Differential equations"
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Type d'exercice */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === "fr" ? "Type d’exercice" : "Exercise type"}
          </label>
          <select
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="quiz">{lang === "fr" ? "Quiz" : "Quiz"}</option>
            <option value="resume">
              {lang === "fr" ? "Résumé" : "Summary"}
            </option>
            <option value="flashcard">
              {lang === "fr" ? "Flashcards" : "Flashcards"}
            </option>
          </select>
        </div>

        {/* Bouton */}
        <button
          onClick={handleGenerate}
          disabled={loading || !subject || !chapter}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading
            ? lang === "fr"
              ? "Génération en cours..."
              : "Generating..."
            : lang === "fr"
            ? "Générer"
            : "Generate"}
        </button>

        {/* Message d'erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}
      </div>

      {/* Résultats */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto mt-10 space-y-6"
        >
          {/* Résumé */}
          {result.summary && (
            <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                {lang === "fr" ? "Résumé" : "Summary"}
              </h3>
              <p className="text-gray-700">{result.summary}</p>
            </div>
          )}

          {/* Quiz */}
          {result.questions && result.questions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {lang === "fr" ? "Quiz" : "Quiz"}
              </h3>
              {result.questions.map((q: any) => (
                <div
                  key={q.id}
                  className="p-4 bg-white border rounded-xl shadow-sm"
                >
                  <p className="font-medium mb-3">{q.question}</p>
                  <ul className="space-y-2">
                    {q.options.map((opt: string, idx: number) => (
                      <li
                        key={idx}
                        className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Flashcards */}
          {result.flashcards && result.flashcards.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {result.flashcards.map((card: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 bg-white border rounded-xl shadow-sm"
                >
                  <p className="font-semibold">{card.front}</p>
                  <p className="text-gray-600">{card.back}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

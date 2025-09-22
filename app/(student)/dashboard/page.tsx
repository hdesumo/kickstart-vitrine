"use client";

import { useEffect, useState } from "react";
import { getCourses, getQuizzes } from "@/lib/api";

export default function DashboardPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesRes, quizzesRes] = await Promise.all([getCourses(), getQuizzes()]);
        setCourses(coursesRes.courses);
        setQuizzes(quizzesRes.quizzes);
      } catch (error) {
        console.error("Erreur dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-gray-600">Chargement...</p>;

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Mes cours</h2>
          {courses.length > 0 ? (
            <ul className="list-disc ml-4">
              {courses.map((c) => (
                <li key={c.id}>{c.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun cours disponible.</p>
          )}
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Mes quizzes</h2>
          {quizzes.length > 0 ? (
            <ul className="list-disc ml-4">
              {quizzes.map((q) => (
                <li key={q.id}>{q.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun quiz disponible.</p>
          )}
        </div>
      </div>
    </section>
  );
}

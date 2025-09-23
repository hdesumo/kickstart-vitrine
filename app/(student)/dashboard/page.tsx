'use client';

import { useEffect, useState } from 'react';
import { getCourses, getQuizzes, type Course, type Quiz } from '@/lib/api';

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [coursesRes, quizzesRes] = await Promise.all([getCourses(), getQuizzes()]);
        setCourses(coursesRes.courses); // ✅ On accède au tableau
        setQuizzes(quizzesRes.quizzes); // ✅ Idem pour les quizzes
      } catch (error) {
        console.error('Erreur dashboard:', error);
      }
    }
    loadData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tableau de bord</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Mes cours</h2>
        {courses.length === 0 && <p>Aucun cours disponible.</p>}
        <ul className="space-y-2">
          {courses.map((course) => (
            <li key={course.id} className="p-2 rounded bg-gray-100">
              {course.title}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Mes quiz</h2>
        {quizzes.length === 0 && <p>Aucun quiz disponible.</p>}
        <ul className="space-y-2">
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="p-2 rounded bg-gray-100">
              {quiz.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getCourses } from "@/lib/api";

export default function ProjectsPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    getCourses()
      .then((res) => setCourses(res.courses))
      .catch((err) => console.error("Erreur projets:", err));
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Projets étudiants</h1>
      <p className="text-gray-600 mb-4">
        Voici les cours actuellement disponibles — imagine que chaque cours peut être
        associé à un projet collaboratif.
      </p>
      <div className="grid gap-4">
        {courses.map((c) => (
          <div key={c.id} className="card">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

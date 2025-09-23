"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { t, SupportedLang, SUPPORTED_LANGUAGES } from "@/lib/i18n";
import CourseCard from "@/components/CourseCard";
import { fetchCourses, type Course } from "@/lib/api";

export default function LearningPage() {
  const [lang, setLang] = useState<SupportedLang>("fr");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

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

    async function loadCourses() {
      try {
        const data = await fetchCourses();
        setCourses(data.courses); // ✅ Corrigé : on passe le tableau de cours
      } catch (error) {
        console.error("Erreur lors du chargement des cours :", error);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <section className="flex-1 px-6 py-12 max-w-5xl mx-auto space-y-8">
        <motion.h1
          className="text-3xl font-bold text-blue-600 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {lang === "fr"
            ? "Apprenez, progressez et entreprenez"
            : "Learn, Grow & Launch Ventures"}
        </motion.h1>

        <motion.p
          className="text-gray-700 leading-relaxed max-w-2xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {lang === "fr"
            ? "Kickstart Campus met à votre disposition un catalogue de cours pour développer vos compétences et réussir vos projets."
            : "Kickstart Campus offers a curated catalog of courses to help you acquire the entrepreneurial skills you need to succeed."}
        </motion.p>

        {loading ? (
          <p className="text-center text-gray-500">
            {lang === "fr" ? "Chargement des cours..." : "Loading courses..."}
          </p>
        ) : courses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            {lang === "fr"
              ? "Aucun cours disponible pour le moment."
              : "No courses available yet."}
          </p>
        )}
      </section>
    </main>
  );
}

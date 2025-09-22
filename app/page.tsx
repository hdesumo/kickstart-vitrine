"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Hero Section avec animation */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center">
        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Donnez vie à vos idées avec{" "}
          <span className="text-blue-600">Kickstart Campus</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Apprenez, collaborez et trouvez des financements pour vos projets.
          Une plateforme pensée pour les étudiants et les innovateurs.
        </motion.p>

        {/* ✅ CTA */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/tiers"
            className="px-6 py-3 text-white bg-blue-600 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Découvrir les offres
          </Link>
          <Link
            href="/learning"
            className="px-6 py-3 text-blue-600 bg-white rounded-xl shadow hover:bg-gray-100 transition"
          >
            Explorer les cours
          </Link>
        </motion.div>
      </section>

      {/* ✅ Footer */}
      <Footer />
    </main>
  );
}

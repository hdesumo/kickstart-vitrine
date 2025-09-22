"use client";

import Link from "next/link";

type CourseCardProps = {
  id: number;
  title: string;
  description?: string;
  lang?: "fr" | "en";
};

export default function CourseCard({
  id,
  title,
  description,
  lang = "fr",
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
      </div>
      <Link
        href={`/learning/${id}`}
        className="w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {lang === "fr" ? "Voir le cours" : "View Course"}
      </Link>
    </div>
  );
}

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "success",
    subject: "math",
    chapter: "équations différentielles",
    type: "quiz",
    summary:
      "Ce chapitre explique la forme générale d'une équation différentielle linéaire du premier ordre et présente la méthode de séparation des variables pour la résoudre.",
    questions: [
      {
        id: 1,
        question:
          "Quelle est la forme générale d'une équation différentielle du premier ordre ?",
        options: [
          "y' + p(x)y = q(x)",
          "ax + b = 0",
          "y'' + ay' + by = 0"
        ],
        answer: 0
      },
      {
        id: 2,
        question: "Quelle méthode permet de résoudre ce type d'équation ?",
        options: [
          "Séparation des variables",
          "Méthode du discriminant",
          "Transformée de Laplace"
        ],
        answer: 0
      }
    ],
    flashcards: [
      { front: "Forme générale", back: "y' + p(x)y = q(x)" },
      { front: "Méthode de résolution", back: "Séparation des variables" }
    ],
    createdAt: new Date().toISOString(),
    durationMs: 1200
  });
}

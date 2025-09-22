const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Récupère la liste des cours depuis le backend.
 */
export async function fetchCourses() {
  const res = await fetch(`${API_URL}/api/courses`);
  if (!res.ok) throw new Error("Erreur lors de la récupération des cours");
  return res.json();
}

/**
 * Récupère la liste des quiz.
 */
export async function fetchQuizzes() {
  const res = await fetch(`${API_URL}/api/quizzes`);
  if (!res.ok) throw new Error("Erreur lors de la récupération des quiz");
  return res.json();
}

/**
 * Récupère la liste des notifications.
 */
export async function fetchNotifications() {
  const res = await fetch(`${API_URL}/api/notifications`);
  if (!res.ok) throw new Error("Erreur lors de la récupération des notifications");
  return res.json();
}

/**
 * Récupère les informations de support.
 */
export async function fetchSupport() {
  const res = await fetch(`${API_URL}/api/support`);
  if (!res.ok) throw new Error("Erreur lors de la récupération du support");
  return res.json();
}

/**
 * Récupère la liste des plans tarifaires (tiers).
 */
export async function fetchTiers() {
  const res = await fetch(`${API_URL}/api/tiers`);
  if (!res.ok) throw new Error("Erreur lors de la récupération des plans tarifaires");
  return res.json();
}

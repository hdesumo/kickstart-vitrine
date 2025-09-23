// lib/api.ts

// ⚠️ Doit pointer vers ton backend public (sans slash final), ex:
// https://api.chantier-campus.com ou l’URL Render/Railway de ton backend
export const API_URL =
  (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/+$/, '');

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

/**
 * Récupère un éventuel token côté client (localStorage).
 * - Si tu utilises des cookies httpOnly uniquement, ce n’est pas grave :
 *   on envoie quand même les cookies via `credentials: 'include'`.
 */
function getBrowserToken(): string | null {
  if (typeof window === 'undefined') return null;
  const key = process.env.NEXT_PUBLIC_TOKEN_KEY || 'access_token';
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Appel générique fetch avec:
 * - baseURL (API_URL)
 * - cookies inclus (credentials: 'include')
 * - Authorization: Bearer <token> si présent (localStorage côté client)
 */
async function request<T = unknown>(path: string, opts: RequestOptions = {}) {
  if (!API_URL) {
    throw new Error(
      'NEXT_PUBLIC_API_URL est manquant. Définis-le dans tes variables d’environnement.'
    );
  }

  const url = path.startsWith('http') ? path : `${API_URL}${path}`;

  const token = getBrowserToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: opts.method ?? 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    credentials: 'include', // envoie les cookies si ton backend en utilise
    cache: 'no-store',
    signal: opts.signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
  }

  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return (await res.json()) as T;
  return (await res.text()) as T;
}

/* =========================
   Exports attendus par tes pages
   ========================= */

// /api/me
export async function getMe() {
  return request('/api/me');
}

// /api/notifications
export async function getNotifications(params?: {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}) {
  const q = new URLSearchParams();
  if (params?.page) q.set('page', String(params.page));
  if (params?.limit) q.set('limit', String(params.limit));
  if (params?.unreadOnly) q.set('unreadOnly', 'true');
  const qs = q.toString() ? `?${q}` : '';
  return request(`/api/notifications${qs}`);
}

// POST /api/notifications/:id/read
export async function markNotificationRead(id: string) {
  if (!id) throw new Error('Paramètre "id" requis');
  return request(`/api/notifications/${id}/read`, { method: 'POST' });
}

// POST /api/notifications/read-all
export async function markAllNotificationsRead() {
  return request('/api/notifications/read-all', { method: 'POST' });
}

/* =========================
   Tes endpoints "vitrine"
   (conservent la logique existante)
   ========================= */

// GET /api/courses
export async function fetchCourses() {
  return request('/api/courses');
}
export async function fetchCourse(id: string | number) {
  return request(`/api/courses/${id}`);
}

// GET /api/quizzes
export async function fetchQuizzes() {
  return request('/api/quizzes');
}
export async function fetchQuiz(id: string | number) {
  return request(`/api/quizzes/${id}`);
}

// GET /api/support
export async function fetchSupport() {
  return request('/api/support');
}

// GET /api/tiers
export async function fetchTiers() {
  return request('/api/tiers');
}

/* =========================
   Profil (optionnel mais utile)
   ========================= */
export async function updateProfile(payload: Record<string, unknown>) {
  return request('/api/me', { method: 'PUT', body: payload });
}

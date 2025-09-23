// lib/api.ts
export const API_URL =
  (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/+$/, '');

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

function getBrowserToken(): string | null {
  if (typeof window === 'undefined') return null;
  const key = process.env.NEXT_PUBLIC_TOKEN_KEY || 'access_token';
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

async function request<T = unknown>(path: string, opts: RequestOptions = {}) {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL est manquant.');

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
    credentials: 'include',
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

/* === PROFIL === */
export async function getMe() {
  return request('/api/me');
}
export async function updateProfile(payload: Record<string, unknown>) {
  return request('/api/me', { method: 'PUT', body: payload });
}

/* === NOTIFICATIONS === */
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

export async function getPaginatedNotifications(
  page = 1,
  limit = 10,
  unreadOnly = false
) {
  const qs = `?page=${page}&limit=${limit}&unreadOnly=${unreadOnly}`;
  return request(`/api/notifications${qs}`);
}

export async function markNotificationRead(id: string) {
  return request(`/api/notifications/${id}/read`, { method: 'POST' });
}
export async function markAllNotificationsRead() {
  return request('/api/notifications/read-all', { method: 'POST' });
}

/* === COURS === */
export async function getCourses() {
  return request('/api/courses');
}
export async function fetchCourses() {
  return getCourses(); // alias, compatibilité ancienne
}
export async function fetchCourse(id: string | number) {
  return request(`/api/courses/${id}`);
}

/* === QUIZZES === */
export async function getQuizzes() {
  return request('/api/quizzes');
}
export async function fetchQuizzes() {
  return getQuizzes(); // alias
}
export async function fetchQuiz(id: string | number) {
  return request(`/api/quizzes/${id}`);
}

/* === SUPPORT & TIERS === */
export async function fetchSupport() {
  return request('/api/support');
}
export async function fetchTiers() {
  return request('/api/tiers');
}

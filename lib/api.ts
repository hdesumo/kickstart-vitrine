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

/* === TYPES === */
export interface Course {
  id: number;
  title: string;
  description?: string;
  [key: string]: unknown;
}
export interface CoursesResponse {
  courses: Course[];
}

export interface Quiz {
  id: number;
  title: string;
  [key: string]: unknown;
}
export interface QuizzesResponse {
  quizzes: Quiz[];
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  [key: string]: unknown;
}
export interface ProjectsResponse {
  projects: Project[];
}

export interface Notification {
  id: number;
  title?: string;
  message?: string;
  read: boolean;
  createdAt: string;
  [key: string]: unknown;
}
export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
}

export interface UserProfile {
  id: number;
  email: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
}

export interface Tier {
  id: number;
  name: string;
  price: number;
  currency?: string;
  [key: string]: unknown;
}
export interface TiersResponse {
  tiers: Tier[];
}

export interface RevisionResponse {
  status: "success" | "error";
  message?: string;
  questions?: string[];
  summary?: string;
  createdAt?: string;
  [key: string]: unknown;
}

/* === AUTH === */
export async function logout(): Promise<{ success: boolean }> {
  return request<{ success: boolean }>('/api/logout', { method: 'POST' });
}

/* === PROFIL === */
export async function getMe(): Promise<UserProfile> {
  return request<UserProfile>('/api/me');
}
export async function updateProfile(payload: Partial<UserProfile>): Promise<UserProfile> {
  return request<UserProfile>('/api/me', { method: 'PUT', body: payload });
}

/* === NOTIFICATIONS === */
export async function getNotifications(params?: {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}): Promise<NotificationsResponse> {
  const q = new URLSearchParams();
  if (params?.page) q.set('page', String(params.page));
  if (params?.limit) q.set('limit', String(params.limit));
  if (params?.unreadOnly) q.set('unreadOnly', 'true');
  const qs = q.toString() ? `?${q}` : '';
  return request<NotificationsResponse>(`/api/notifications${qs}`);
}

export async function getPaginatedNotifications(
  page = 1,
  limit = 10,
  unreadOnly = false
): Promise<NotificationsResponse> {
  const qs = `?page=${page}&limit=${limit}&unreadOnly=${unreadOnly}`;
  return request<NotificationsResponse>(`/api/notifications${qs}`);
}

export async function getUnreadNotifications(): Promise<{ count: number }> {
  return request<{ count: number }>('/api/notifications/unread-count');
}

export async function markNotificationRead(id: number): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(`/api/notifications/${id}/read`, { method: 'POST' });
}
export async function markAllNotificationsRead(): Promise<{ success: boolean }> {
  return request<{ success: boolean }>('/api/notifications/read-all', { method: 'POST' });
}

/* === COURS === */
export async function getCourses(): Promise<CoursesResponse> {
  return request<CoursesResponse>('/api/courses');
}
export async function fetchCourses() {
  return getCourses();
}
export async function fetchCourse(id: number): Promise<Course> {
  return request<Course>(`/api/courses/${id}`);
}

/* === QUIZZES === */
export async function getQuizzes(): Promise<QuizzesResponse> {
  return request<QuizzesResponse>('/api/quizzes');
}
export async function fetchQuizzes() {
  return getQuizzes();
}
export async function fetchQuiz(id: number): Promise<Quiz> {
  return request<Quiz>(`/api/quizzes/${id}`);
}

/* === PROJECTS === */
export async function getProjects(): Promise<ProjectsResponse> {
  return request<ProjectsResponse>('/api/projects');
}

/* === TIERS === */
export async function getTiers(): Promise<TiersResponse> {
  return request<TiersResponse>('/api/tiers');
}
export async function fetchTiers() {
  return getTiers();
}

/* === REVISIONS === */
export async function generateRevision(
  subject: string,
  chapter: string,
  exerciseType: string
): Promise<RevisionResponse> {
  return request<RevisionResponse>('/api/revisions/generate', {
    method: 'POST',
    body: { subject, chapter, exerciseType },
  });
}

/* === SUPPORT PUBLIC === */
export async function fetchSupport(): Promise<Record<string, unknown>> {
  return request('/api/support');
}
export async function sendPublicSupport(payload: Record<string, unknown>): Promise<Record<string, unknown>> {
  return request('/api/support/public', { method: 'POST', body: payload });
}

/* === SEARCH === */
export async function getSuggestions(query: string): Promise<string[]> {
  return request<string[]>(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
}

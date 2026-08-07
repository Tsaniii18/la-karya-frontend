import { ref } from 'vue';
import { API_BASE_URL } from './config/api';

export type DepartmentName = 'HR' | 'FINANCE' | 'IT' | 'MARKETING';

export interface AuthUser {
  id: number;
  employeeNumber: string;
  name: string;
  email: string;
  accountStatus: 'PENDING' | 'ACTIVE' | 'SUSPENDED';
  role: 'USER' | 'MANAGER';
  department: DepartmentName;
  profilePictUrl: string | null;
}

interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

interface ApiError {
  message?: string | string[];
}

const savedToken = localStorage.getItem('access_token');

export const authToken = ref<string | null>(savedToken);
export const currentUser = ref<AuthUser | null>(null);

async function apiRequest<T>(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (authToken.value) {
    headers.set('Authorization', `Bearer ${authToken.value}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = (await response.json()) as T & ApiError;

  if (!response.ok) {
    const message = Array.isArray(data.message)
      ? data.message.join(', ')
      : data.message;
    throw new Error(message ?? 'Permintaan gagal diproses');
  }

  return data as T;
}

export async function register(payload: {
  employeeNumber: string;
  name: string;
  email: string;
  password: string;
  department: DepartmentName;
}) {
  return apiRequest<AuthUser>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function login(email: string, password: string) {
  const response = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  authToken.value = response.accessToken;
  currentUser.value = response.user;
  localStorage.setItem('access_token', response.accessToken);
}

export async function loadCurrentUser() {
  currentUser.value = await apiRequest<AuthUser>('/auth/me');
  return currentUser.value;
}

export function clearAuth() {
  authToken.value = null;
  currentUser.value = null;
  localStorage.removeItem('access_token');
}

export async function logout() {
  try {
    await apiRequest<{ message: string }>('/auth/logout', { method: 'POST' });
  } finally {
    clearAuth();
  }
}

import axios from 'axios';

function normalizeBase(url) {
  if (!url) return 'http://localhost:5000/api';
  const clean = url.replace(/\/$/, '');
  // If user provided a URL that already ends with /api, use as-is
  if (/\/api$/i.test(clean)) return clean;
  return `${clean}/api`;
}

const API_BASE = normalizeBase(import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

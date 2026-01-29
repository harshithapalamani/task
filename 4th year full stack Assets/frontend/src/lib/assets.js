function normalizeBase(url) {
  if (!url) return 'http://localhost:5000/api';
  const clean = url.replace(/\/$/, '');
  if (/\/api$/i.test(clean)) return clean;
  return `${clean}/api`;
}

export function toAssetUrl(path) {
  const apiBase = normalizeBase(import.meta.env.VITE_API_URL);
  const hostBase = apiBase.replace(/\/?api\/?$/, '/');
  if (!path) return hostBase; // fallback to host for empty
  try {
    return new URL(path, hostBase).toString();
  } catch {
    return path;
  }
}

export function fallbackImage(type = 'default') {
  if (type === 'project') return '/images/pexels-brett-sayles-2881232-1.svg';
  if (type === 'client') return '/images/pexels-fauxels-3182834.svg';
  return '/images/logo.svg';
}

function normalizeBase(url) {
  if (!url) return 'http://localhost:5000/api';
  const clean = url.replace(/\/$/, '');
  if (/\/api$/i.test(clean)) return clean;
  return `${clean}/api`;
}

export function toAssetUrl(path) {
  const apiBase = normalizeBase(import.meta.env.VITE_API_URL);
  const hostBase = apiBase.replace(/\/?api\/?$/, '/');
  // If no image path, return null so callers can fall back to placeholders
  if (!path) return null;
  try {
    return new URL(path, hostBase).toString();
  } catch {
    return path;
  }
}

const projectPlaceholders = [
  '/images/pexels-brett-sayles-2881232.svg',
  '/images/pexels-brett-sayles-2881232-1.svg',
  '/images/pexels-brett-sayles-2881232-2.svg',
  '/images/pexels-brett-sayles-2881232-3.svg',
  '/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home%201.svg',
];

const clientPlaceholders = [
  '/images/pexels-fauxels-3182834.svg',
  '/images/pexels-andres-ayrton-6578391.svg',
  '/images/logo.svg',
];

function stableIndex(key, len) {
  if (!len) return 0;
  if (key === undefined || key === null) return Math.floor(Math.random() * len);
  const s = String(key);
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  return hash % len;
}

export function placeholderImage(type = 'default', key) {
  if (type === 'project') return projectPlaceholders[stableIndex(key, projectPlaceholders.length)];
  if (type === 'client') return clientPlaceholders[stableIndex(key, clientPlaceholders.length)];
  return '/images/logo.svg';
}

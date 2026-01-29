export function toAssetUrl(path) {
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const hostBase = apiBase.replace(/\/?api\/?$/, '/');
  try {
    return new URL(path, hostBase).toString();
  } catch {
    return path;
  }
}

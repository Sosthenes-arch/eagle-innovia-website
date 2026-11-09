import { site } from '@/config/site';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Add a trailing slash to page paths (GitHub Pages serves /about/ and redirects /about). */
function withSlash(path: string): string {
  const [p, hash = ''] = path.split('#');
  const last = p.split('/').pop() ?? '';
  const out = p.endsWith('/') || last.includes('.') ? p : `${p}/`;
  return hash ? `${out}#${hash}` : out;
}

/** Prefix an internal path with the deploy base path (works on the github.io preview and the custom domain). */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${withSlash(p)}`;
}

/** Strip the base path and normalise trailing slash so pages can be compared. */
export function normalisePath(pathname: string): string {
  let p = pathname.split('#')[0];
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || '/';
  p = p.replace(/index\.html$/, '');
  if (p.length > 1) p = p.replace(/\/$/, '');
  return p || '/';
}

/** Canonical absolute URL on the production domain (with trailing slash, matching the sitemap). */
export function canonical(pathname: string): string {
  const p = normalisePath(pathname);
  return p === '/' ? `${site.url}/` : `${site.url}${p}/`;
}

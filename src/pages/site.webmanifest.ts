import type { APIRoute } from 'astro';
import { site } from '@/config/site';

export const GET: APIRoute = () => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const manifest = {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: `${base}/`,
    scope: `${base}/`,
    display: 'standalone',
    background_color: '#F7F9F8',
    theme_color: '#0D1B1E',
    icons: [
      { src: `${base}/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${base}/icon-512.png`, sizes: '512x512', type: 'image/png' },
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
};

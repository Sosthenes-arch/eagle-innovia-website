import type { ImageMetadata } from 'astro';
import { site, isSet } from '@/config/site';

const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{png,jpg,jpeg,webp,avif}');

/** Screenshot for a case study, from site.ts. Returns null while it is still TODO. */
export async function caseStudyImage(slug: string): Promise<ImageMetadata | null> {
  if (slug !== 'afroremote' || !isSet(site.afroremote.screenshot)) return null;
  const load = images[`/src/assets/${site.afroremote.screenshot}`];
  return load ? (await load()).default : null;
}

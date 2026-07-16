import type { MetadataRoute } from 'next';

const BASE = 'https://www.staybookt.com';

/* Only real, current pages. The legacy routes 308 to their live replacements
 * (see next.config.ts), so they must not appear here.
 * /work is IN as of July 2026: it now carries a real screenshot of a real client's
 * live site rather than the fabricated before/after it used to. */
const PATHS = [
  '/',
  '/how-it-works',
  '/pricing',
  '/long-term',
  '/work',
  '/founders',
  '/whats-included',
  '/start',
  '/contact',
  '/terms',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.map((p) => ({
    url: `${BASE}${p === '/' ? '' : p}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '/' ? 1 : 0.8,
  }));
}

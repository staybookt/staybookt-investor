import type { MetadataRoute } from 'next';

const BASE = 'https://www.staybookt.com';

/* Only real, current pages. The legacy routes 308 to their live replacements
 * (see next.config.ts), so they must not appear here.
 * /work is deliberately excluded until it carries real proof. */
const PATHS = [
  '/',
  '/how-it-works',
  '/pricing',
  '/enjoy-life',
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

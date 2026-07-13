import type { MetadataRoute } from 'next';

const BASE = 'https://www.staybookt.com';

// Public, indexable routes only. /start and any internal or investor-facing
// routes are intentionally excluded so indexing stays clean.
const PATHS = ['/', '/how-it-works', '/whats-included', '/pricing', '/why-a-website', '/enjoy-life', '/long-term', '/founders'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.map((p) => ({
    url: `${BASE}${p === '/' ? '' : p}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p === '/' ? 1 : 0.7,
  }));
}

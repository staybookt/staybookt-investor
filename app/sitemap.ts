import type { MetadataRoute } from 'next';

const BASE = 'https://www.staybookt.com';

// Only real, canonical, in-nav pages. Redirect stubs and orphaned legacy
// routes are intentionally excluded so indexing stays clean.
const PATHS = ['/', '/how-it-works', '/pricing', '/why-a-website', '/enjoy-life', '/long-term', '/founders'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.map((p) => ({
    url: `${BASE}${p === '/' ? '' : p}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '/' ? 1 : 0.8,
  }));
}

import type { MetadataRoute } from 'next';

const BASE = 'https://www.staybookt.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
  ];
}

import type { MetadataRoute } from 'next';

const BASE = 'https://www.staybookt.com';

/* Only real, current pages. The legacy routes 308 to their live replacements
 * (see next.config.ts), so they must not appear here.
 * /work is IN as of July 2026: it now carries a real screenshot of a real client's
 * live site rather than the fabricated before/after it used to. */
const PATHS = [
  '/',
  // /how-it-works retired (Jul 30 2026), 307 to '/' — see next.config.ts. Its content is
  // now the homepage journey, so this line drops per the rule above.
  // /long-term retired too (Jul 30 2026, same day), 307 to /founders#long-term-value —
  // merged into the About Us page. Same rule, this line drops.
  '/pricing',
  '/journeys',
  '/journeys/home-service',
  '/journeys/consultant',
  '/journeys/real-estate-agent',
  '/founders',
  '/whats-included',
  '/start',
  // The real estate wing's waitlist page (Aug 2026). Indexable on purpose: it is a public
  // waitlist, and outbound to Ontario agents is the point. Note it overlaps in audience
  // with /journeys/real-estate-agent, which sells the CURRENT product to agents. If those
  // two ever start competing in search, /journeys/real-estate-agent is the one to narrow.
  '/agents',
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

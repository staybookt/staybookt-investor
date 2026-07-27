import type { NextConfig } from 'next';

/* GHOST ROUTES.
 *
 * Legacy pages that were still live, still indexable, and still wearing the old
 * design with the old pricing. Someone could land on /why-a-website from Google
 * and meet a different company. Next checks redirects BEFORE the filesystem, so
 * these win over the stale page.tsx files that still sit in the repo.
 *
 * Permanent (308) on purpose: we want Google to drop them and pass any equity to
 * the page that replaced them. */
const GHOSTS: { source: string; destination: string }[] = [
  { source: '/about', destination: '/founders' },
  { source: '/team', destination: '/founders' },
  { source: '/manifesto', destination: '/founders' },
  { source: '/platform', destination: '/how-it-works' },
  { source: '/why-a-website', destination: '/how-it-works' },
  { source: '/is-this-for-me', destination: '/how-it-works' },
  { source: '/economics', destination: '/pricing' },
  // /whats-included MERGED INTO /pricing (Jacob + Richard, Jul 23 2026). The chart page was
  // the stronger of the two pricing-ish pages, so it became /pricing. Permanent so Google
  // drops /whats-included and passes its equity to the merged page.
  { source: '/whats-included', destination: '/pricing' },
  // /long-term IS A REAL PAGE (Richard, review round 2, July 2026). It was a ghost, then the
  // same argument shipped at /enjoy-life, and Richard called that "the weakest part of the
  // site" because the title promised a feeling while the page argued economics. It is back at
  // the URL that always described it. /economics stays dead.
  { source: '/proof', destination: '/success-stories' },
  { source: '/work', destination: '/success-stories' },
  // Investor-era pages. No investor surface right now, so they go home.
  { source: '/opportunity', destination: '/' },
  { source: '/brief', destination: '/' },
];

/* BENCHED ROUTES. Not dead. Temporarily unshippable, and coming back.
 *
 * These are 307 (TEMPORARY) and that distinction is the whole point. A 308 is cached by
 * the browser forever and tells Google to drop the URL. Use one on a page you intend to
 * restore and you have poisoned it for every visitor who saw it once.
 *
 * /work was benched here for a few hours in July 2026 because both of its before/after
 * images were fabricated mockups. It is UNBENCHED: the drag-to-compare is gone entirely and
 * the page is now one real, unedited screenshot of the live topchoiceelectrical.com plus a
 * link to it. Nothing on it needs us to be believed.
 *
 * The "before" was recoverable (Tim's old WordPress is intact on DreamHost). We chose not to
 * use it. See the header of components/v4/WorkShowcase.tsx for why. */
/* /enjoy-life is 307 (TEMPORARY) on purpose. This route has been a ghost, then a real page,
 * then renamed, all inside one day. A 308 is cached by the browser forever and tells Google
 * to drop the URL; using one on a route this volatile poisons it for anyone who saw it once.
 * The page moved to /long-term. If that name survives a month, this can become a 308. */
const BENCHED: { source: string; destination: string }[] = [
  { source: '/enjoy-life', destination: '/long-term' },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  async redirects() {
    return [
      ...GHOSTS.map((g) => ({ ...g, permanent: true })),
      // permanent:false => 307. See the BENCHED comment above. Do not "tidy" this
      // into the GHOSTS map; the temporary status is load-bearing.
      ...BENCHED.map((b) => ({ ...b, permanent: false })),
    ];
  },
};

export default nextConfig;

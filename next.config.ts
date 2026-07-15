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
  { source: '/long-term', destination: '/pricing' },
  // /enjoy-life IS A REAL PAGE AGAIN (Jacob, July 2026) and is deliberately not in this
  // list. The old one sold the 20% value share; Richard killed the share, so the page lost
  // its spine and became a redirect. It has been rebuilt around taking nothing instead,
  // which is a harder argument and a truer one. /economics and /long-term stay dead.
  { source: '/proof', destination: '/work' },
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
 * /work — BENCHED July 2026. Both images in the drag-to-compare were fabricated mockups,
 * not screenshots, while the page said in body copy "This is a real build. Not a mockup,
 * not a concept." The "after" carried a 555 fake phone number and an invented ESA licence
 * number. Promise 05 is "No screenshots of results we did not produce." This was the one
 * page we put in the nav BECAUSE it supposedly carried real evidence.
 *
 * It comes back when, and only when, both panels are real screenshots: the "after" from
 * the live topchoiceelectrical.com, the "before" from Tim's old site off DreamHost. When
 * it does: delete the entry below, restore the nav and footer links, and rewrite the
 * WorkShowcase copy that this page could not previously support. */
const BENCHED: { source: string; destination: string }[] = [
  { source: '/work', destination: '/how-it-works' },
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

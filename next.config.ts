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

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  async redirects() {
    return GHOSTS.map((g) => ({ ...g, permanent: true }));
  },
};

export default nextConfig;

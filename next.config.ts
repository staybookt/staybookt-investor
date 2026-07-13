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
  // Enjoy Life is dead as a page. It was the last one in the old skin, and it told
  // the same story a fourth time after milestone 3, the pricing Year Two section
  // and About. The value-share calculator on /pricing carries it now.
  { source: '/enjoy-life', destination: '/pricing' },
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

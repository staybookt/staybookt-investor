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
  // WAS -> /how-it-works. That page is retiring (see BENCHED below); repointed to the
  // homepage, which now carries the journey these three used to send people to read.
  { source: '/platform', destination: '/' },
  { source: '/why-a-website', destination: '/' },
  { source: '/is-this-for-me', destination: '/' },
  { source: '/economics', destination: '/pricing' },
  // /whats-included MERGED INTO /pricing (Jacob + Richard, Jul 23 2026). The chart page was
  // the stronger of the two pricing-ish pages, so it became /pricing. Permanent so Google
  // drops /whats-included and passes its equity to the merged page.
  { source: '/whats-included', destination: '/pricing' },
  // /long-term WAS its own real page (Richard, review round 2, July 2026), then got merged
  // into /founders (Jul 30 2026): Richard's feedback on its content ("my suggestions would
  // come after the quotes... I like the combo") led to combining the two rather than keeping
  // both. See its 307 in BENCHED below — temporary, not permanent, same volatility discipline
  // as every route on this file that has moved more than once. /economics stays dead.
  { source: '/proof', destination: '/journeys' },
  { source: '/work', destination: '/journeys' },
  { source: '/success-stories', destination: '/journeys' },
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
 * The page moved to /long-term, and /long-term has now merged into /founders (Jul 30 2026,
 * see below) — repointed directly to /founders so this does not chain through a dead middle
 * hop. If /founders proves stable as the final home for this content, this can become a 308. */
const BENCHED: { source: string; destination: string }[] = [
  { source: '/enjoy-life', destination: '/founders' },
  // /how-it-works RETIRED (Jacob + Richard, Jul 30 2026): its content is now the homepage
  // journey (HomeJourney.tsx). 307 not 308 on purpose, same discipline as every other
  // volatile route on this file — this is a same-day call, not yet a month-proven one.
  // Promote to GHOSTS (permanent) once it has survived a review cycle.
  { source: '/how-it-works', destination: '/' },
  // /long-term RETIRED (Jacob + Richard, Jul 30 2026): merged into /founders as the
  // "why this matters long-term" section, right after the founders are introduced. Richard's
  // feedback on the content itself ("my suggestions would come after the quotes... I like the
  // combo") was the trigger — once his added paragraphs were in and reviewed, folding the
  // whole page into About Us rather than keeping two pages was the follow-up call. 307, same
  // not-yet-month-proven discipline as /how-it-works above.
  { source: '/long-term', destination: '/founders#long-term-value' },
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

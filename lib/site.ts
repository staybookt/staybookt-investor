// Central site config. Change these in one place; every section reads from here.

// Live booking page. Every "Book a call" CTA across the site routes here.
export const CAL_LINK = 'https://cal.com/team/staybookt/talk-to-a-founder';
export const EMAIL = 'info@staybookt.com';

// Phone: a Twilio number for call + text. Not provisioned yet, so we leave it
// null and render nothing rather than ship a fake number. Set both once live.
export const PHONE_DISPLAY: string | null = null;
export const PHONE_HREF: string | null = null;

// Confirmed public ladder. Get Found (one-time) + StayBookt (monthly) +
// Enjoy Life (invite-only, 5% of new business). Numbers live here so nothing drifts.
export const PRICING = {
  build: '$1,750',
  care: '$199',
  performance: '5%',
} as const;

// The three ways to work with us, ranked by how much of the business we run.
// Single source of truth: home + pricing page both read this, so numbers never drift.
export type Tier = {
  name: string;
  scope: string;
  tagline: string;
  upfront: string;
  upfrontNote: string;
  recurring: string | null;
  commission: string | null;
  terms: string;
  recommended?: boolean;
  points: string[];
};

export const TIERS: Tier[] = [
  {
    name: 'Get Found',
    scope: 'The website',
    tagline: 'A site that gets you found and makes you look like the pro you are.',
    upfront: '$1,750',
    upfrontNote: 'one-time',
    recurring: null,
    commission: null,
    terms: 'Pay once. The site is yours to keep.',
    points: [
      'Custom, mobile-first website',
      'Google Business Profile rebuilt',
      'Search and reviews foundation',
      'Tap-to-call and booking wired in',
    ],
  },
  {
    name: 'StayBookt',
    scope: 'We run the front of your business',
    tagline: 'We run the front of your business. You just do the work.',
    upfront: '$1,750',
    upfrontNote: 'to build',
    recurring: '$199/mo',
    commission: null,
    terms: 'The front office, run for you. Cancel anytime.',
    recommended: true,
    points: [
      'Everything in Get Found',
      'We answer your phone and texts, 24/7',
      'We capture every lead and book the jobs',
      'We chase quotes, follow-ups, and past customers',
    ],
  },
  {
    name: 'Enjoy Life',
    scope: 'A partnership, by invitation',
    tagline: 'We turn the business into an asset you can walk away from.',
    upfront: 'By invitation',
    upfrontNote: 'invite-only',
    recurring: null,
    commission: '5%',
    terms: 'Invite-only. The 5% is only on the new business we generate.',
    points: [
      'Everything in StayBookt',
      'Systems built for a clean exit or a family handoff',
      'We turn a job into a sellable, inheritable asset',
      'We share the upside: 5% of the new business we generate',
    ],
  },
];

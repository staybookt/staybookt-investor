// Central site config. Change these in one place; every section reads from here.

// FALLBACK: the cal.com/jacobcharendoff/staybookt page does not exist yet (404).
// Until Jacob creates it, every CTA routes to email so nothing dead-ends.
// One-line flip back to the cal.com URL once the booking page is live.
export const CAL_LINK = 'mailto:info@staybookt.com?subject=Booking%20a%2030-minute%20call%20with%20StayBookt';
export const EMAIL = 'info@staybookt.com';

// Phone: a Twilio number for call + text. Not provisioned yet, so we leave it
// null and render nothing rather than ship a fake number. Set both once live.
export const PHONE_DISPLAY: string | null = null;
export const PHONE_HREF: string | null = null;

// Lowest upfront across the tiers, used for the hero "Starting at ___ to launch".
export const PRICING = {
  build: '$2,000',
  care: '$149',
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
    upfront: '$5,000',
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
    name: 'Get Booked',
    scope: 'Website + management',
    tagline: 'We keep it running and turn found into booked.',
    upfront: '$3,000',
    upfrontNote: 'to build',
    recurring: '$149/mo',
    commission: '5%',
    terms: '6-month minimum. The 5% is only on new business we bring you.',
    recommended: true,
    points: [
      'Everything in Get Found',
      'We keep your site and Google profile current',
      'We capture every lead and book the jobs',
      'A review after every job, plus a simple weekly summary',
    ],
  },
  {
    name: 'Stay Booked',
    scope: 'We run the front of your business',
    tagline: 'We run the front of your business. You just do the work.',
    upfront: '$2,000',
    upfrontNote: 'to build',
    recurring: '$249/mo',
    commission: '5%',
    terms: '6-month minimum. The 5% is only on new business we bring you.',
    points: [
      'Everything in Get Booked',
      'We answer your phone and texts, 24/7',
      'We chase quotes, follow-ups, and past customers',
      'Least to pay upfront, the most we run for you',
    ],
  },
];

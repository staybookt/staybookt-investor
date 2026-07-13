// Central site config. Change these in one place; every section reads from here.

// Live booking page. Every "Book a call" CTA across the site routes here.
export const CAL_LINK = 'https://cal.com/team/staybookt/talk-to-a-founder';
// Internal landing page that explains the Pulse read and embeds the calendar.
export const START_LINK = '/start';
export const EMAIL = 'info@staybookt.com';

// Phone: a Twilio number for call + text. Not provisioned yet, so we leave it
// null and render nothing rather than ship a fake number. Set both once live.
export const PHONE_DISPLAY: string | null = null;
export const PHONE_HREF: string | null = null;

// Confirmed public pricing (July 13 2026). ONE plan: Get Found + StayBookt bundled
// at $199/mo, nothing upfront, 12-month term, 90-day money-back guarantee.
// Enjoy Life stays invite-only (5% of NEW business only) after year one.
// Numbers live here so nothing drifts.
export const PRICING = {
  monthly: '$199',
  upfront: 'Nothing upfront',
  term: '12-month term',
  guarantee: '90-day money-back',
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
    name: 'Get Found + StayBookt',
    scope: 'One plan. Everything you need.',
    tagline: 'We get you found, then run the whole front office for you.',
    upfront: 'Nothing upfront',
    upfrontNote: 'no build fee, no setup fee',
    recurring: '$199/mo',
    commission: null,
    terms: '12-month term. Ninety days to change your mind, or we refund every month you paid.',
    recommended: true,
    points: [
      'A fast website, built and hosted, yours to keep',
      'Google Business Profile rebuilt, ranked locally, reviews building',
      'We answer every call and text, 24/7, in your voice',
      'We book the jobs and chase every quote until it closes',
      'We bring past customers back for repeat work',
      'One short brief each morning. No software to learn',
    ],
  },
  {
    name: 'Enjoy Life',
    scope: 'A partnership, by invitation',
    tagline: 'We turn the business into an asset you can keep, pass on, or sell.',
    upfront: 'By invitation',
    upfrontNote: 'after your first year',
    recurring: null,
    commission: '5%',
    terms: 'Invite-only. The 5% is only on the new business we generate.',
    points: [
      'Everything in the plan',
      'Systems built for a clean exit or a family handoff',
      'We turn a job into a sellable, inheritable asset',
      'We share the upside: 5% of the new business we generate',
    ],
  },
];

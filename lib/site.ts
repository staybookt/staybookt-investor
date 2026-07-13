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
// Enjoy Life stays invite-only after year one, and is a VALUE share, not a revenue share.
// Numbers live here so nothing drifts.
export const PRICING = {
  monthly: '$199',
  upfront: 'Nothing upfront',
  term: '12-month term',
  guarantee: '90-day money-back',
  // Enjoy Life is a VALUE share, not a revenue share. We take 20% of the increase
  // in enterprise value above an agreed baseline, paid only on a sale/handoff/settle.
  valueShare: '20% of the increase in value above baseline',
} as const;

// The two ways to work with us. Single source of truth: every page reads from here,
// so numbers never drift.
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
    recurring: 'No extra monthly',
    commission: '20% of the increase in value',
    terms:
      'Invite-only. We agree a baseline valuation up front and take 20% of the increase above it, paid only when you sell, hand it on, or settle up. No sale, no fee. No broker fee either.',
    points: [
      'Everything in the plan. No extra monthly fee, ever',
      'We build the recurring service work buyers pay a premium for',
      'We get the business running without you, which is what moves the number',
      'We clean the books and add the crew to grow into',
      'We run the sale or the family handoff, with no broker fee',
      'We take 20% of the increase in value. No sale, no fee',
    ],
  },
];

// Central site config. Change these in one place; every section reads from here.

// Live booking page. Every "Book a call" CTA across the site routes here.
export const CAL_LINK = 'https://cal.com/team/staybookt/talk-to-a-founder';
// Internal landing page that explains the pre-call work and embeds the calendar.
export const START_LINK = '/start';
export const EMAIL = 'info@staybookt.com';

// Phone. The single NAP number for StayBookt: it must be byte-identical here, in
// the JSON-LD, on the Google Business Profile, and in every directory listing.
// Do not reformat it in one place and not the others.
//
// July 13 2026: this is Richard's cell, standing in as the business line until a
// real number is provisioned. Swap the three constants below when that happens.
// Nothing else in the codebase needs to change.
export const PHONE_DISPLAY = '(905) 717-8264';
export const PHONE_HREF = 'tel:+19057178264';
// E.164, for schema.org and anywhere a machine reads it rather than a human.
export const PHONE_E164 = '+1-905-717-8264';

// Confirmed public pricing. ONE plan: Get Found + StayBookt bundled at $199/mo,
// nothing upfront, NO LOCK-IN, 90-day money-back guarantee.
//
// THE 12-MONTH TERM IS DEAD (Jacob, July 13 2026). We had been advertising a year
// lock-in AND a thirty-day exit, which cannot both be true. The exit won. We do not
// advertise a term anywhere, in any copy, ever again. Cancel any time on thirty
// days' notice, no penalty and no exit fee. The 90-day money-back sits on top of
// that, and it is UNCONDITIONAL: any reason, no "if we have not delivered" test.
// A conditional refund is a judgment call we make and the customer loses, which is
// exactly the thing our buyer has been burned by before.
//
// Price is quoted PLUS applicable taxes, said out loud so month one is not a surprise.
// Volume is UNLIMITED: no per-minute billing, no overage. Say it, because every
// answering service on earth bills per minute and the silence reads as a trap.
//
// Enjoy Life stays invite-only after year one, and it is a 20% VALUE share on the
// increase above an agreed baseline. It is not 5% of revenue. That number is dead.
export const PRICING = {
  monthly: '$199',
  upfront: 'Nothing upfront',
  term: 'No lock-in. Cancel any time on thirty days notice',
  tax: 'plus applicable taxes',
  volume: 'Unlimited calls and texts. No per-minute billing, no overage',
  guarantee: '90-day money-back, for any reason',
  // Enjoy Life is a VALUE share, not a revenue share. We take 20% of the increase
  // in enterprise value above an agreed baseline, paid only on a sale/handoff/settle.
  valueShare: '20% of the increase in value above baseline',
} as const;

// The two ways to work with us. Single source of truth: every page reads this,
// so the numbers never drift.
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
    terms:
      'No lock-in. Cancel any time on thirty days notice, no penalty. And for the first ninety days, change your mind for any reason and we refund every month you paid.',
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

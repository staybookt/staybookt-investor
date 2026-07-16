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
// THE 20% VALUE SHARE IS DEAD (Richard, July 14 2026). We are not asking for a
// share of the business's value. It was confusing, it was a barrier at the point
// of sale, and we do not need it to get the company going. We can grow into that
// conversation later, with clients who already trust us, or never.
// Enjoy Life survives as the OUTCOME and the third rung of the ladder. It is what
// the owner gets. It is not a fee, and there is no valuation attached to it.
export const PRICING = {
  monthly: '$199',
  upfront: 'Nothing upfront',
  term: 'No lock-in. Cancel any time on thirty days notice',
  tax: 'plus applicable taxes',
  volume: 'Unlimited calls and texts. No per-minute billing, no overage',
  guarantee: '90-day money-back, for any reason',
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
    scope: 'The point of the whole thing',
    tagline: 'A business that keeps running when you step away, and a life you actually get to have.',
    upfront: 'No extra cost',
    upfrontNote: 'it is what the plan is for',
    recurring: 'Included',
    commission: null,
    terms:
      'Not a product and not a fee. It is what you end up with: a business that keeps booking and earning when you are not standing in the middle of it, and the choice of what to do next.',
    points: [
      'The recurring work that makes the business steady, not seasonal',
      'An operation that holds for a week while you are somewhere else',
      'Clean books and a record of every customer, job and dollar',
      'Go back to the part of the work you actually like',
      'Or hand it on, or sell it, entirely your call',
      'No fee, no share, no obligation. It is just yours',
    ],
  },
];

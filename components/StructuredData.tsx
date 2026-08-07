/* JSON-LD structured data: Organization + FAQPage. Helps Google understand
 * the company and surface FAQ rich results.
 *
 * THE REFUND IS UNCONDITIONAL. This file used to carry the "if we have not
 * delivered" version while three pages carried the unconditional one, which meant
 * the single worst wording was the one Google indexed. Never reintroduce a
 * condition here. There is also NO TERM: cancel any time on thirty days notice.
 * This file is what Google actually reads, so it has to say what the pages say.
 *
 * NAP: the name, phone and email here must match the site, the Google Business
 * Profile and every directory listing exactly. Both read from lib/site so there
 * is one source of truth and nothing drifts. */

import { EMAIL, PHONE_E164 } from '@/lib/site';

const FAQ: [string, string][] = [
  [
    'What if I want to cancel?',
    'There is no term and no lock-in. Cancel any time on thirty days notice, with no penalty and no exit fee. On top of that, for the first ninety days you can change your mind for any reason at all and we refund every month you paid. You do not have to prove we failed. Whenever you leave, you keep everything that matters: the website code, the domain, the Google Business Profile login, the customer list, and your reviews.',
  ],
  [
    'What if you go out of business?',
    'Your domain is registered to you. Your website lives under your own account. Your Google Business Profile is yours. Your customer list is yours. If we vanish, you keep everything that matters.',
  ],
  [
    'Is it just a website, or do you run it too?',
    'Both, together, in one plan. We build your website and then run the whole front office around it: answering calls, booking jobs, chasing quotes, and keeping your reputation growing. A site nobody maintains goes stale within a year. Running it is the point.',
  ],
  [
    'Is $199/mth USD really all of it?',
    /* THIS SAID "Yes." /pricing and /terms were both changed to name TWO costs the day we
       started taking payments, and this file was missed. It answered the same question with
       the opposite word, in the one place that is eligible for a Google rich result: the
       flat "Yes" could surface in search while the honest answer sat on the page. This file
       is what Google actually reads, so it has to say what the pages say. */
    /* Byte-matched to Richard's FAQ doc + the /pricing answer (doc-sync, Jul 28 late). */
    'Almost. It is $199/mth USD plus tax, and two things sit outside that. Your domain registration, about twenty dollars a year, passed through at cost and yours anyway. And if you take card payments, Stripe or Square charge their own fee, around 2.9% plus thirty cents, taken out of what you collect like any card processing. That fee is theirs, not ours: we do not mark it up, and we take no cut of it. No build fee, no setup fee, no add-ons, no per-minute billing, no overage. And no back end either: no commission on your jobs, no share of your revenue, and no share of what the business is worth if you sell it.',
  ],
  [
    'What is included in the plan?',
    'Getting found and running it, together: your website and Google presence, an AI receptionist with a real person behind it, booking, quote follow-up, reviews, and a short daily brief. One plan, $199/mth USD plus applicable taxes, nothing upfront, no lock-in, with ninety days to change your mind for any reason.',
  ],
  [
    'Is there a limit on calls and texts?',
    'No. Calls and texts are unlimited, with no per-minute billing and no overage charges, however busy the season gets.',
  ],
  /* "What if the AI gets a price wrong?" REMOVED from the schema (Richard, Jul 28): the
     question was deleted from every page — automated pricing makes buyers nervous and
     consultants do not want it — and the schema must never advertise a question the
     site no longer answers. */
  [
    'Who is StayBookt for?',
    'Owner-run service, consulting and agent businesses where a lot of the business still runs through the owner. If you are already a big operation with a full front desk, you probably do not need us.',
  ],
];

export default function StructuredData() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'StayBookt',
      url: 'https://www.staybookt.com',
      email: EMAIL,
      telephone: PHONE_E164,
      description:
        'StayBookt answers the phone, books the jobs and chases the quotes for owner-operated service businesses. We build and run your website and Google presence, answer every call and text 24/7, and hand you one short brief each morning. One plan, $199/mth USD, nothing upfront.',
      /* WAS Canada + United States. We have one client, in Ontario. Prices are CAD, the
         terms are governed by Ontario law and the consent language is CASL only. Claiming a
         US practice in the schema is claiming a business we do not have. Add the US back the
         day there is a US client. */
      areaServed: [{ '@type': 'Country', name: 'Canada' }],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: PHONE_E164,
          email: EMAIL,
          /* A SECOND US claim, on the contact point. The audit caught the one above and
             missed this one; found by re-grepping after the fix instead of trusting it.
             Same reason: one client, in Ontario. */
          areaServed: ['CA'],
          availableLanguage: ['English'],
        },
      ],
      founder: [
        { '@type': 'Person', name: 'Jacob Charendoff' },
        { '@type': 'Person', name: 'Richard Roos' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ];
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

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
    'There is no term and no lock-in. Cancel any time on thirty days notice, with no penalty and no exit fee. On top of that, for the first ninety days you can change your mind for any reason at all and we refund every month you paid. You do not have to prove we failed. Whenever you leave, you keep everything that matters: the website code, the domain, the Google Business Profile login, the customer list, and the review tools.',
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
    'Is $199 a month really all of it?',
    'Yes. There is no build fee, no setup fee, no per-minute billing and no overage. We do not take a commission on your jobs, a share of your revenue, or a share of what your business is worth. $199 a month plus applicable taxes is the entire commercial relationship.',
  ],
  [
    'What is included in the plan?',
    'Getting found and running it, together: your website and Google presence, an AI receptionist with a real person behind it, booking, quote follow-up, reviews, and a short daily brief. One plan, $199 a month plus applicable taxes, nothing upfront, no lock-in, with ninety days to change your mind for any reason.',
  ],
  [
    'Is there a limit on calls and texts?',
    'No. Calls and texts are unlimited, with no per-minute billing and no overage charges, however busy the season gets.',
  ],
  [
    'What if the AI gets a price wrong?',
    'It quotes from your playbook: your prices, your jobs, your service area. Anything it is not sure about, anything unusual and anything high-stakes gets pulled by a real person before it ever reaches your customer. If a wrong number does get out, we bring it straight to you, you decide what you want to honour, and we go back to the customer and sort it out. You are never the one making that call.',
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
        'StayBookt answers the phone, books the jobs and chases the quotes for owner-operated service businesses. We build and run your website and Google presence, answer every call and text 24/7, and hand you one short brief each morning. One plan, $199 a month, nothing upfront.',
      areaServed: [{ '@type': 'Country', name: 'Canada' }, { '@type': 'Country', name: 'United States' }],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: PHONE_E164,
          email: EMAIL,
          areaServed: ['CA', 'US'],
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

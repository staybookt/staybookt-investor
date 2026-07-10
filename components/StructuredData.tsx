/* JSON-LD structured data: Organization + FAQPage. Helps Google understand
 * the company and surface FAQ rich results. Keep answers in sync with the page. */

const FAQ: [string, string][] = [
  [
    'What if I want to cancel?',
    'The plan runs on a 12-month term, then continues month to month. Whenever you leave, you keep everything that matters: the website code, the Google Business Profile login, the customer list, and the review tools. No locked-in dependencies.',
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
    'How exactly do you count new business?',
    'Form fills tagged at the source. Calls tracked through your Google Business Profile. New customers reconciled against your existing pipeline so we never double-count. The report goes out every month before the invoice.',
  ],
  [
    'What is included in the plan?',
    'Getting found and running it, together: your website and Google presence, an AI receptionist with a real person behind it, booking, quote follow-up, reviews, and a short daily brief. One simple monthly plan, rolling out to clients through 2026.',
  ],
];

export default function StructuredData() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'StayBookt',
      url: 'https://www.staybookt.com',
      email: 'info@staybookt.com',
      description:
        'StayBookt gets service businesses found and runs their whole front office: website, an AI receptionist with a real person behind it, booking, quotes, reviews, and a daily brief. One simple monthly plan.',
      areaServed: [{ '@type': 'Country', name: 'Canada' }, { '@type': 'Country', name: 'United States' }],
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

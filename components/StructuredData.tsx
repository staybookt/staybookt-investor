/* JSON-LD structured data: Organization + FAQPage. Helps Google understand
 * the company and surface FAQ rich results. Keep answers in sync with the page. */

const FAQ: [string, string][] = [
  [
    'What if I want to cancel?',
    'You cancel any month. We hand you the website code, the Google Business Profile login, the customer list, and the review request keys. No locked-in dependencies.',
  ],
  [
    'What if you go out of business?',
    'Your domain is registered to you. Your website lives under your own account. Your Google Business Profile is yours. Your customer list is yours. If we vanish, you keep everything that matters.',
  ],
  [
    'Can I just buy the website without the monthly?',
    'You can, but a site without care drifts. The profile goes stale, review requests stop, page speed slips. After a year, an unmaintained site is about as useful as no site. The monthly is what stops that.',
  ],
  [
    'How exactly do you count new business?',
    'Form fills tagged at the source. Calls tracked through your Google Business Profile. New customers reconciled against your existing pipeline so we never double-count. The report goes out every month before the invoice.',
  ],
  [
    'What about the back-office platform you mention?',
    'It is on the roadmap, rolling out through 2026 for our first clients. Booking, follow-up, review flow, the Monday brief. Pricing for each layer gets set as it ships. The website is what you pay for today.',
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
        'StayBookt builds and runs websites for Ontario service businesses under $1M. We get you found, book the work, and keep the calendar full. Paid for by the results.',
      areaServed: { '@type': 'State', name: 'Ontario, Canada' },
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

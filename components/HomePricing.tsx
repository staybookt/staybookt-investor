// HomePricing — the three-step ladder: Get Found, StayBookt, Enjoy Life.
// Middle card is the featured dark card. Pass detailed to show includes lists.
// Server component: no client hooks, no motion.

import Link from 'next/link';
import { CAL_LINK } from '@/lib/site';

type Plan = {
  name: string;
  price: string;
  priceNote?: string;
  chip?: string;
  promise: string;
  cta: string;
  featured?: boolean;
  includes: string[];
};

const PLANS: Plan[] = [
  {
    name: 'Get Found',
    price: '$1,750',
    priceNote: 'one-time',
    promise:
      'The visibility foundation. A website that gets you found, and it is yours to keep.',
    cta: 'Get started',
    includes: [
      'Marketing-firm-quality website (yours to keep)',
      'Google Business Profile built + optimized',
      'Local SEO, AEO, and GEO',
      'Listings + NAP consistency',
      'Review + referral setup',
    ],
  },
  {
    name: 'StayBookt',
    price: '$199',
    priceNote: 'per month',
    promise: 'The operating layer. Your whole front office, run for you.',
    cta: 'Book a 30-minute call',
    featured: true,
    includes: [
      '24/7 AI receptionist (calls + texts)',
      'Self-serve booking',
      'CRM',
      'Quote tool (send, track, chase)',
      'Review + referral engine',
      'Operating dashboard + AI analyst',
      'Daily brief',
    ],
  },
  {
    name: 'Enjoy Life',
    price: 'By invitation',
    chip: 'Invite only',
    promise:
      'The partnership. We help you turn the business into an asset you can sell or pass on, and we share the upside.',
    cta: 'Book a 30-minute call',
    includes: [
      'Everything in StayBookt',
      'Systems that make the business sellable + inheritable',
      'Positioning for exit or succession',
      'We share the upside (5% of the new business we generate)',
    ],
  },
];

export default function HomePricing({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="bg-paper py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-hvac">
          Pricing
        </p>
        <h2 className="mt-4 font-display tracking-[-0.03em] text-ink text-3xl sm:text-4xl md:text-5xl">
          Three steps. Be seen, be run, be free.
        </h2>
        <p className="mt-5 text-lg text-[#475569] max-w-2xl">
          Start with getting found. Add the operating layer when you are ready.
          The partnership is by invitation.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:items-start">
          {PLANS.map((plan) => {
            const isDark = plan.featured;
            return (
              <div
                key={plan.name}
                className={
                  isDark
                    ? 'rounded-2xl bg-ink text-white p-8 shadow-sm'
                    : 'rounded-2xl bg-paper border border-[#E5E7EB] p-8'
                }
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={
                      isDark
                        ? 'font-display tracking-[-0.03em] text-white text-xl'
                        : 'font-display tracking-[-0.03em] text-ink text-xl'
                    }
                  >
                    {plan.name}
                  </h3>
                  {plan.chip ? (
                    <span
                      className={
                        isDark
                          ? 'rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white'
                          : 'rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-mute'
                      }
                    >
                      {plan.chip}
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span
                    className={
                      isDark
                        ? 'font-display tracking-[-0.03em] text-white text-4xl'
                        : 'font-display tracking-[-0.03em] text-ink text-4xl'
                    }
                  >
                    {plan.price}
                  </span>
                  {plan.priceNote ? (
                    <span
                      className={
                        isDark ? 'text-sm text-platinum' : 'text-sm text-mute'
                      }
                    >
                      {plan.priceNote}
                    </span>
                  ) : null}
                </div>

                <p
                  className={
                    isDark
                      ? 'mt-4 text-platinum leading-relaxed'
                      : 'mt-4 text-[#475569] leading-relaxed'
                  }
                >
                  {plan.promise}
                </p>

                {detailed ? (
                  <ul className="mt-6 space-y-3">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hvac"
                        />
                        <span
                          className={
                            isDark
                              ? 'text-sm text-platinum leading-relaxed'
                              : 'text-sm text-[#475569] leading-relaxed'
                          }
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <Link
                  href={CAL_LINK}
                  className={
                    isDark
                      ? 'mt-8 inline-flex rounded-full bg-white text-ink px-6 py-3 text-sm font-semibold hover:bg-white/90'
                      : 'mt-8 inline-flex rounded-full bg-ink text-white px-6 py-3 text-sm font-semibold hover:bg-ink/90'
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-mute">
          Prices in CAD, plus applicable taxes.
        </p>
      </div>
    </section>
  );
}

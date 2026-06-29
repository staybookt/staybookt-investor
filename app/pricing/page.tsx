import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK, PRICING } from '@/lib/site';

export const metadata = {
  title: 'Pricing · StayBookt',
  description:
    'Simple pricing: a one-time build to get you live and found, a flat monthly to keep it running, and a small share of the new revenue we help you win. Executive results you can actually afford.',
};

const TIERS = [
  { name: 'Build', price: PRICING.build, unit: 'one-time', blurb: 'We design, build, and launch your site, set up your Google profile, and get you found. Yours, live, in weeks.', points: ['Custom mobile-first site', 'Google Business Profile setup', 'Search and reviews foundation', 'Tap-to-call and booking wired in'] },
  { name: 'Care', price: PRICING.care, unit: 'per month', blurb: 'We keep everything running, updated, and converting. As the operating layer ships, we turn each piece on for you.', points: ['Site and profile maintenance', 'Lead capture and booking', 'Reviews requested after jobs', 'The Monday brief'], highlight: true },
  { name: 'Performance', price: PRICING.performance, unit: 'of new revenue we drive', blurb: 'A small share of the incremental revenue we help you win, measured and agreed up front. We win when you win.', points: ['Measured, attributed, agreed', 'No surprise invoices', 'Aligns us with your growth', 'Capped, never open-ended'] },
];

export default function PricingPage() {
  return (
    <>
      <TopNav active="pricing" />
      <main className="bg-ink-deep">
        <section className="px-6 pb-10 pt-36 sm:px-12 sm:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-elec-light">Pricing</p>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-6xl">
              Executive results you can actually afford.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-platinum-soft sm:text-lg">
              Big companies pay half a million a year for someone to run the customer side of the business. You get the
              same system, built and run by us, for a fraction of one hire.
            </p>
          </div>
        </section>

        <section className="px-6 py-8 sm:px-12">
          <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`flex flex-col rounded-2xl border p-7 ${
                  t.highlight ? 'border-elec/40 bg-elec/[0.06]' : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">{t.name}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl tracking-tight text-white">{t.price}</span>
                  <span className="text-[13px] text-mute">{t.unit}</span>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-platinum-soft">{t.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[13px] text-platinum-soft">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${t.highlight ? 'bg-elec' : 'bg-hvac'}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] text-mute">
            Most owners run Build plus Care. Performance is optional and only applies to revenue we can measure and that
            we agree on together. No long lock-in.
          </p>
        </section>

        <section className="px-6 py-20 sm:px-12">
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl tracking-tight text-white">Not sure what you need?</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-platinum-soft">That is what the call is for. 30 minutes, no pitch deck, just a straight read on your business.</p>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="mt-7 inline-block rounded-lg bg-gradient-to-r from-elec to-hvac px-8 py-4 text-base font-bold text-ink transition-transform hover:-translate-y-0.5">Book a 30-minute call</a>
            <p className="mt-5 text-[13px] text-mute">Prefer to see it first? <Link href="/platform" className="text-elec-light underline-offset-2 hover:underline">Tour the platform →</Link></p>
          </div>
        </section>
      </main>
    </>
  );
}

import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'Pricing',
  alternates: { canonical: '/pricing' },
  description:
    'Three simple parts. Get Found: a one-time build. StayBookt: a flat monthly to run it. Enjoy Life: a small share of the new revenue we bring you. We only make money when you do.',
};

const PILLARS = [
  {
    tag: 'Get found',
    role: 'Build it',
    price: '$1,750',
    unit: 'one time',
    body: 'We build your site, set up your Google profile, and get you showing up when customers nearby search for what you do. Yours to keep.',
  },
  {
    tag: 'StayBookt',
    role: 'Run it',
    price: '$199',
    unit: 'per month',
    body: 'We run the front office: the site, the bookings, the follow-up, the reviews. Every month, handled, so you never touch it.',
  },
  {
    tag: 'Enjoy Life',
    role: 'Grow it',
    price: '5%',
    unit: 'of new revenue',
    body: 'A small share of the new business we bring you. If the phone does not ring more, this line is zero. We only win when you win.',
  },
];

export default function PricingPage() {
  return (
    <>
      <TopNav active="pricing" />
      <main className="bg-ink-deep">
        <section className="px-6 pb-8 pt-36 sm:px-12 sm:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-mute">How we get paid</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl">
              We only make money <span className="text-white">when you do.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-platinum-soft sm:text-lg">
              Three simple parts. A one-time build, a flat monthly to run it, and a small share of the new business we
              actually bring you. If the phone does not ring more, that last part is nothing.
            </p>
          </div>
        </section>

        <section className="px-6 py-8 sm:px-12">
          <div className="mx-auto grid max-w-5xl items-stretch gap-5 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.tag} className="flex h-full flex-col rounded-2xl border border-white/10 p-7">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">{p.role}</p>
                <h2 className="mt-2 font-display text-2xl tracking-tight text-white">{p.tag}</h2>
                <div className="mt-5 flex items-baseline gap-2 border-t border-white/8 pt-5">
                  <span className="font-display text-4xl tracking-tight text-white">{p.price}</span>
                  <span className="text-[13px] text-mute">{p.unit}</span>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-platinum-soft">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:bg-white/90"
            >
              Book a 30-minute call
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] text-mute">
            All prices in CAD, plus applicable taxes. The 5% applies only to the new business we generate, measured and
            agreed up front.
          </p>
        </section>

        <section className="border-y border-white/8 px-6 py-12 sm:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">How we count new business</p>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-platinum-soft">
              Form fills tagged at the source. Calls tracked through your Google Business Profile. New customers
              reconciled against your existing book so we never double-count. You see exactly what we count, and the
              report goes out every month before the invoice.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-12">
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl tracking-tight text-white">Not sure it is for you?</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-platinum-soft">That is what the call is for. 30 minutes, no pitch deck, and we tell you straight whether it is a fit.</p>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="mt-7 inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:bg-white/90">Book a 30-minute call</a>
            <p className="mt-5 text-[13px] text-mute">Prefer to see it first? <Link href="/platform" className="text-elec underline-offset-2 hover:underline">Tour the platform →</Link></p>
          </div>
        </section>
      </main>
    </>
  );
}

import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK, TIERS } from '@/lib/site';

export const metadata = {
  title: 'Pricing',
  alternates: { canonical: '/pricing' },
  description:
    'Finally, a company that only makes money when you do. A fee to build it, a flat monthly to run it, and a small share of the new business we actually bring you. Pick the tier that fits.',
};

export default function PricingPage() {
  return (
    <>
      <TopNav active="pricing" />
      <main className="bg-ink-deep">
        <section className="px-6 pb-8 pt-36 sm:px-12 sm:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-elec-light">How we get paid</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl">
              Finally, a company that only makes money{' '}
              <span className="bg-gradient-to-r from-elec-light to-hvac-light bg-clip-text text-transparent">when you do.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-platinum-soft sm:text-lg">
              A fee to build it, a flat monthly to run it, and a small share of the new business we actually bring you.
              The more of your business we run, the less it costs to start.
            </p>
          </div>
        </section>

        <section className="px-6 py-8 sm:px-12">
          <div className="mx-auto grid max-w-5xl items-start gap-5 lg:grid-cols-3">
            {TIERS.map((t, i) => (
              <div
                key={t.name}
                className={`flex h-full flex-col rounded-2xl border p-7 ${
                  t.recommended ? 'border-elec/50 bg-elec/[0.07]' : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
                    {String(i + 1).padStart(2, '0')} · {t.scope}
                  </p>
                  {t.recommended && (
                    <span className="rounded-full bg-elec/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-elec-light">
                      Most popular
                    </span>
                  )}
                </div>
                <h2 className="font-display text-2xl tracking-tight text-white">{t.name}</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-platinum-soft">{t.tagline}</p>

                <div className="mt-5 border-t border-white/8 pt-5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl tracking-tight text-white">{t.upfront}</span>
                    <span className="text-[13px] text-mute">{t.upfrontNote}</span>
                  </div>
                  {t.recurring && (
                    <p className="mt-2 text-[14px] text-platinum">
                      + <span className="font-semibold text-white">{t.recurring}</span>
                    </p>
                  )}
                  {t.commission && (
                    <p className="mt-1 text-[14px] text-platinum">
                      + <span className="font-semibold text-hvac-light">{t.commission}</span> of new business we bring you
                    </p>
                  )}
                  <p className="mt-3 text-[12px] leading-snug text-mute">{t.terms}</p>
                </div>

                <ul className="mt-5 space-y-2">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[13px] text-platinum-soft">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${t.recommended ? 'bg-elec' : 'bg-hvac'}`} />
                      {p}
                    </li>
                  ))}
                </ul>

                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-block rounded-lg px-5 py-3 text-center text-sm font-bold transition-transform hover:-translate-y-0.5 ${
                    t.recommended ? 'bg-gradient-to-r from-elec to-hvac text-ink' : 'border border-white/15 text-white hover:bg-white/5'
                  }`}
                >
                  Book a call
                </a>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] text-mute">
            All prices in CAD. The 5% applies only to new business we bring you, measured and agreed up front. No long lock-in past the six months.
          </p>
        </section>

        <section className="border-y border-white/8 bg-white/[0.02] px-6 py-12 sm:px-12">
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
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl tracking-tight text-white">Not sure which tier?</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-platinum-soft">That is what the call is for. 30 minutes, no pitch deck, and we tell you straight which one fits.</p>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="mt-7 inline-block rounded-lg bg-gradient-to-r from-elec to-hvac px-8 py-4 text-base font-bold text-ink transition-transform hover:-translate-y-0.5">Book a 30-minute call</a>
            <p className="mt-5 text-[13px] text-mute">Prefer to see it first? <Link href="/platform" className="text-elec-light underline-offset-2 hover:underline">Tour the platform →</Link></p>
          </div>
        </section>
      </main>
    </>
  );
}

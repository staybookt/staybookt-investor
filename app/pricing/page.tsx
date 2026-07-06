import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import HomePricing from '@/components/HomePricing';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'Pricing',
  alternates: { canonical: '/pricing' },
  description:
    'Get Found: your visibility, built, one-time. StayBookt: the front office, run for you, monthly. Enjoy Life: an invite-only partnership for owners building toward an exit or succession. We only make money when you do.',
};

export default function PricingPage() {
  return (
    <>
      <TopNav active="pricing" />
      <main className="bg-paper text-ink">
        <section className="px-6 pb-4 pt-36 sm:px-12 sm:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-mute">Pricing</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
              We only make money when you do.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg">
              A ladder, not a menu. Get found, then let us run it. And for a select few, a partnership
              that turns the business into an asset you can walk away from.
            </p>
          </div>
        </section>

        {/* The three columns, shared with the homepage */}
        <HomePricing detailed />

        <section className="border-t border-[#E5E7EB] bg-cream px-6 py-16 sm:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">
              How we count new business
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#475569]">
              Form fills tagged at the source. Calls tracked through your Google Business Profile. New
              customers reconciled against your existing book so we never double-count. You see exactly
              what we count, and the report goes out every month before the invoice.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-12">
          <div className="mx-auto max-w-2xl rounded-3xl bg-ink p-8 text-center text-white sm:p-12">
            <h2 className="font-display text-3xl tracking-tight text-white">Not sure it is for you?</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-platinum-soft">
              That is what the call is for. 30 minutes, no pitch deck, and we tell you straight whether
              it is a fit.
            </p>
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:bg-white/90"
            >
              Book a 30-minute call
            </a>
            <p className="mt-5 text-[13px] text-platinum-soft">
              Prefer to see it first?{' '}
              <Link href="/how-it-works" className="text-elec-light underline-offset-2 hover:underline">
                See how it works {'→'}
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

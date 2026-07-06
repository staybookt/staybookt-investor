import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import HomePricing from '@/components/HomePricing';
import SiteFooter from '@/components/SiteFooter';
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
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Pricing</p>
            <h1 className="display-1 mt-4 text-ink">
              We only make money when you do.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
              A ladder, not a menu. Get found, then let us run it. And for a select few, a partnership
              that turns the business into an asset you can walk away from.
            </p>
          </div>
        </section>

        {/* The three columns, shared with the homepage */}
        <HomePricing detailed />

        <section className="bg-cream px-6 py-24 sm:px-12 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">How we count new business</p>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-body">
              Form fills tagged at the source. Calls tracked through your Google Business Profile. New
              customers reconciled against your existing book so we never double-count. You see exactly
              what we count, and the report goes out every month before the invoice.
            </p>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-12 sm:py-32">
          <div className="panel-ink mx-auto max-w-4xl p-8 text-center sm:p-12">
            <h2 className="display-3 text-white">Not sure it is for you?</h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-platinum-soft">
              That is what the call is for. 30 minutes, no pitch deck, and we tell you straight whether
              it is a fit.
            </p>
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ondark mt-7"
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

        <SiteFooter />
      </main>
    </>
  );
}

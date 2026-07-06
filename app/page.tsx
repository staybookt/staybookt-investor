import { TopNav } from '@/components/TopNav';
import Hero from '@/components/Hero';
import ImpactMatrix from '@/components/ImpactMatrix';
import LogicCases from '@/components/LogicCases';
import HomePricing from '@/components/HomePricing';
import { CAL_LINK, EMAIL } from '@/lib/site';
import Link from 'next/link';

const SHARE_DESCRIPTION =
  'StayBookt builds and runs the entire front office for service businesses, and only gets paid when it brings you work. So the business runs without you, and you get your life back.';

// Lifestyle still (Pexels, licensed). One-line swap to change it.
const LIFE_IMG =
  'https://images.pexels.com/photos/34534420/pexels-photo-34534420.jpeg?auto=compress&cs=tinysrgb&w=1600';

export const metadata = {
  title: 'StayBookt. Enjoy Life.',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'StayBookt. Enjoy Life.',
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StayBookt. Enjoy Life.',
    description: SHARE_DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <main id="top" className="relative bg-paper text-ink">
      <TopNav />

      {/* 00 — HERO: the feeling (dark, cinematic) */}
      <Hero />

      {/* 01 — WHAT IT IS: the product, mapped to enjoy-life */}
      <div id="m1">
        <ImpactMatrix />
      </div>

      {/* 02 — WHY: the most compelling logic, as dark cards */}
      <LogicCases />

      {/* 03 — PRICING: three columns */}
      <HomePricing />

      {/* 04 — PROOF: gated until real, attributed quotes exist (placeholders removed from live). */}

      {/* 05 — LONG-TERM teaser */}
      <section className="bg-cream px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-mute">
            The long game
          </p>
          <h2
            className="mt-6 font-display tracking-[-0.03em] text-ink"
            style={{ fontSize: 'clamp(30px, 4.4vw, 52px)', lineHeight: 1.04 }}
          >
            We build a business you could sell.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#475569]">
            The same systems that give you your week back also turn your business into an asset
            you can sell or pass on. That is the whole point of Enjoy Life.
          </p>
          <div className="mt-9">
            <Link
              href="/long-term"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream"
            >
              How that works <span aria-hidden>{'→'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 06 — LIFESTYLE band: the payoff, made real */}
      <section className="relative overflow-hidden">
        <img
          src={LIFE_IMG}
          alt="An owner enjoying an evening off while the business runs without him"
          className="h-[58vh] min-h-[380px] w-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,8,17,0.55) 0%, rgba(5,8,17,0.30) 40%, rgba(5,8,17,0.82) 100%)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p
            className="max-w-2xl text-center font-display tracking-[-0.02em] text-white"
            style={{ fontSize: 'clamp(28px, 4.4vw, 52px)', lineHeight: 1.04 }}
          >
            You built it for this.
          </p>
        </div>
      </section>

      {/* 07 — CLOSER: the promise, one ask (dark) */}
      <section className="bg-ink px-6 py-28 sm:py-40 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="font-display tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(36px, 5.2vw, 64px)', lineHeight: 1.0 }}
          >
            We only make money when you do.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-platinum-soft">
            We build it, we run it, and we only get paid when it brings you work. Built for a
            business your size, and priced for one. So you get back to the work, and the life, you
            built this for.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-white/90"
            >
              Book a 30-minute call
            </a>
            <p className="text-sm text-mute">
              30 minutes with a founder. No pitch deck. Or email{' '}
              <a href={`mailto:${EMAIL}`} className="text-platinum-soft transition-colors hover:text-white">
                {EMAIL}
              </a>
              .
            </p>
          </div>

          <p className="mt-20 font-display text-3xl tracking-tight">
            <span className="text-white">Stay</span>
            <span className="wordmark-gradient">Bookt</span>
            <span className="text-[#7C3AED]">.</span>{' '}
            <span className="text-hvac">Enjoy Life.</span>
          </p>
        </div>
      </section>

      <FooterBlock />
    </main>
  );
}

function FooterBlock() {
  const linkCls = 'text-mute transition-colors hover:text-ink';
  return (
    <footer className="border-t border-[#E5E7EB] bg-paper px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-xl tracking-tight text-ink">
              <span>Stay</span>
              <span className="wordmark-gradient">Bookt</span>
              <span className="text-[#7C3AED]">.</span>
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">
              Built and run for service businesses.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-ink transition-colors hover:opacity-70"
            >
              Book a 30-minute call
            </a>
            <a href={`mailto:${EMAIL}`} className="text-sm text-mute transition-colors hover:text-ink">
              {EMAIL}
            </a>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-[#E5E7EB] pt-8 text-xs text-mute sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/why-a-website" className={linkCls}>Why a website</Link>
            <Link href="/how-it-works" className={linkCls}>How it works</Link>
            <Link href="/pricing" className={linkCls}>Pricing</Link>
            <Link href="/enjoy-life" className={linkCls}>Enjoy Life</Link>
            <Link href="/long-term" className={linkCls}>Long-term value</Link>
            <Link href="/founders" className={linkCls}>Founders</Link>
          </div>
          <p>{'©'} 2026 StayBookt Inc. Toronto, ON.</p>
        </div>
      </div>
    </footer>
  );
}

import { TopNav } from '@/components/TopNav';
import Hero from '@/components/Hero';
import LogicCases from '@/components/LogicCases';
import CaughtCall from '@/components/CaughtCall';
import { BookingApple, QuotesApple, RepeatApple } from '@/components/WalkthroughGraphics';
import Wordmark from '@/components/Wordmark';
import SiteFooter from '@/components/SiteFooter';
import { CAL_LINK, EMAIL } from '@/lib/site';
import Link from 'next/link';
import type { ComponentType } from 'react';

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

// One idea per screen. The reused product graphics are built for dark
// surfaces, so each visual sits in a dark panel-ink tile while the section
// background alternates paper / cream. No borders. Just tint and air.
type Moment = {
  eyebrow: string;
  headline: string;
  support: string;
  Visual: ComponentType;
};

const MOMENTS: Moment[] = [
  {
    eyebrow: 'It picks up',
    headline: 'Answers every call. Day or night.',
    support:
      'A real-sounding receptionist picks up every call and text, so no job ever goes to voicemail again.',
    Visual: CaughtCall,
  },
  {
    eyebrow: 'It books',
    headline: 'Books the job while you sleep.',
    support:
      'Customers book themselves straight into your calendar. You wake up to a full day, not a full inbox.',
    Visual: BookingApple,
  },
  {
    eyebrow: 'It follows up',
    headline: 'Chases every quote, so none slip.',
    support:
      'Every quote gets sent, tracked, and followed up until it is won or lost. Nothing you quote gets forgotten.',
    Visual: QuotesApple,
  },
  {
    eyebrow: 'It grows',
    headline: 'Brings your best customers back.',
    support:
      'Reviews get requested and past customers get nudged, on their own, so repeat work keeps coming.',
    Visual: RepeatApple,
  },
];

function FeatureMoment({ moment, index }: { moment: Moment; index: number }) {
  const visualLeft = index % 2 === 1;
  const bg = index % 2 === 0 ? 'bg-paper' : 'bg-cream';
  const { Visual } = moment;

  const Copy = (
    <div className={visualLeft ? 'lg:order-2' : 'lg:order-1'}>
      <p className="eyebrow">{moment.eyebrow}</p>
      <h2 className="display-2 mt-5">{moment.headline}</h2>
      <p className="text-body mt-6 max-w-md">{moment.support}</p>
    </div>
  );

  const VisualTile = (
    <div className={visualLeft ? 'lg:order-1' : 'lg:order-2'}>
      <div className="panel-ink flex items-center justify-center px-6 py-12 sm:px-10 sm:py-16">
        <Visual />
      </div>
    </div>
  );

  return (
    <section className={`${bg} px-6 py-24 sm:py-32`}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {Copy}
        {VisualTile}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main id="top" className="bg-paper text-ink">
      <TopNav />

      {/* 00 — HERO: the feeling */}
      <Hero />

      {/* 01 — FEATURE MOMENTS: one idea per screen */}
      {MOMENTS.map((moment, i) => (
        <FeatureMoment key={moment.headline} moment={moment} index={i} />
      ))}

      {/* 02 — WHY: the logic, as dark cards */}
      <LogicCases />

      {/* 03 — PRICING TEASER: full ladder lives on /pricing */}
      <section className="bg-cream px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Pricing</p>
          <h2 className="display-2 mt-5">Three steps. Be seen, be run, be free.</h2>
          <p className="text-body mx-auto mt-6 max-w-2xl">
            Get found for $1,750 to build. We run the whole front office for $199 a month. And for a
            select few, a partnership.
          </p>
          <div className="mt-9">
            <Link href="/pricing" className="btn btn-onlight">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* 04 — LONG-TERM teaser */}
      <section className="bg-paper px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">The long game</p>
          <h2 className="display-2 mt-5">We build a business you could sell.</h2>
          <p className="text-body mx-auto mt-6 max-w-2xl">
            The same systems that give you your week back also turn your business into an asset you
            can sell or pass on. That is the whole point of Enjoy Life.
          </p>
          <div className="mt-9">
            <Link href="/long-term" className="btn btn-ghost">
              How that works
            </Link>
          </div>
        </div>
      </section>

      {/* 05 — LIFESTYLE band: the payoff, made real */}
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
          <p className="display-2 max-w-2xl text-center text-white">You built it for this.</p>
        </div>
      </section>

      {/* 06 — CLOSER: the promise, one ask */}
      <section className="bg-ink px-6 py-24 sm:py-32 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display-2 text-white">We only make money when you do.</h2>
          <p className="text-platinum-soft mx-auto mt-7 max-w-xl text-lg leading-relaxed">
            We build it, we run it, and we only get paid when it brings you work. Built for a
            business your size, and priced for one. So you get back to the work, and the life, you
            built this for.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-ondark">
              Book a 30-minute call
            </a>
            <p className="text-sm text-mute">
              30 minutes with a founder. No pitch deck. Or email{' '}
              <a
                href={`mailto:${EMAIL}`}
                className="text-platinum-soft transition-colors hover:text-white"
              >
                {EMAIL}
              </a>
              .
            </p>
          </div>

          <div className="mt-20">
            <Wordmark onDark period tagline size="lg" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

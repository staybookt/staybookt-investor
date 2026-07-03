import { TopNav } from '@/components/TopNav';
import Hero from '@/components/Hero';
import Wordmark from '@/components/Wordmark';
import ScrollReveal from '@/components/ScrollReveal';
import HomeCanvas from '@/components/HomeCanvas';
import Spine from '@/components/Spine';
import Frame from '@/components/Frame';
import PlatformWalkthrough from '@/components/PlatformWalkthrough';
import AlignedGrowth from '@/components/AlignedGrowth';
import { CAL_LINK, EMAIL } from '@/lib/site';
import Image from 'next/image';
import Link from 'next/link';

const SHARE_DESCRIPTION =
  'StayBookt builds and runs the entire front office for service businesses up to $5M, and only gets paid when it brings you work. So the business runs without you, and you get your life back.';

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

function Grad({ children }: { children: React.ReactNode }) {
  return <span className="text-brand-gradient">{children}</span>;
}

export default function HomePage() {
  return (
    <main id="top" className="relative text-white">
      <HomeCanvas />
      <Spine />
      <TopNav />

      {/* 00 — HERO: the feeling */}
      <div id="m0" data-i="0">
        <Hero />
      </div>

      {/* 01 — WATCH IT RUN: pinned platform walkthrough */}
      <PlatformWalkthrough />

      {/* 02 — SEE IT IS REAL */}
      <Moment i={2} eyebrow="02 / See it is real">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display tracking-[-0.03em] leading-[1.02] text-white" style={{ fontSize: 'clamp(34px, 5vw, 62px)' }}>
              This one is <Grad>already running.</Grad>
            </h2>
            <p className="mt-7 max-w-xl text-platinum-soft text-lg leading-relaxed">
              We built and we run Top Choice Electrical. Real business, real site, real bookings coming in.
            </p>
            <blockquote className="mt-8 border-l-2 border-hvac/60 pl-5 max-w-xl">
              <p className="text-platinum text-lg italic leading-snug mb-2">
                {'“'}My old site never once sent me a lead. Now people show up to the first call already knowing who I am.{'”'}
              </p>
              <cite className="not-italic text-mute text-sm font-semibold">Tim Ciszkowski, Top Choice Electrical</cite>
            </blockquote>
            <Link href="/work" className="mt-8 inline-flex items-center gap-2 text-elec font-semibold text-sm hover:gap-3 transition-all">
              See the work <span aria-hidden>{'→'}</span>
            </Link>
          </div>
          <Frame accent>
            <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.04] px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 text-[10px] tracking-wide text-mute">topchoiceelectrical.com</span>
            </div>
            <div className="relative aspect-[16/10] w-full bg-ink">
              <Image
                src="/photos/tce-after.png"
                alt="Top Choice Electrical, a live site StayBookt built and runs"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </Frame>
        </div>
      </Moment>

      {/* 03 — THE CLOSE: aligned incentives, one ask */}
      <Moment i={3} eyebrow="03 / The deal" purple>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display tracking-[-0.03em] leading-[1.0] text-white" style={{ fontSize: 'clamp(38px, 5.4vw, 66px)' }}>
              We only make money <Grad>when you do.</Grad>
            </h2>
            <p className="mt-7 max-w-xl text-platinum-soft text-lg leading-relaxed">
              A build fee, a flat monthly, and a small share of the new business we bring in. If the phone does not ring
              more, we have not earned a cent.
            </p>
            <p className="mt-4 max-w-xl text-mute text-base leading-relaxed">
              No agency retainer, no lock-in, nothing new to learn. We build it, we run it, and we grow with you.
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: '#c4b5fd' }}>
              Priced so an owner your size can actually say yes. So you get back to the work, and the life, you built
              this for.
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-elec to-hvac px-8 py-4 text-base font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_-8px_rgba(6,182,212,0.7)] sm:text-lg"
              >
                Book a 30-minute call
                <span aria-hidden className="transition-transform group-hover:translate-x-1">{'→'}</span>
              </a>
              <p className="text-mute text-sm">
                30 minutes with a founder. No pitch deck. Or email{' '}
                <a href={`mailto:${EMAIL}`} className="text-platinum-soft hover:text-white transition-colors">{EMAIL}</a>.
              </p>
            </div>
          </div>

          <Frame accent>
            <div className="px-5 py-7 sm:px-7 sm:py-9">
              <AlignedGrowth />
            </div>
          </Frame>
        </div>

        <p className="mt-24 text-center font-display text-3xl tracking-tight">
          <span className="text-white">Stay</span>
          <span className="wordmark-gradient">Bookt</span>
          <span style={{ color: '#7C3AED' }}>.</span>{' '}
          <span className="text-brand-gradient">Enjoy Life.</span>
        </p>
      </Moment>

      <FooterBlock />
    </main>
  );
}

/* Helpers */

function Moment({
  i,
  eyebrow,
  purple,
  children,
}: {
  i: number;
  eyebrow: string;
  purple?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={`m${i}`} data-i={i} className="relative scroll-mt-24 px-6 sm:px-12 lg:pl-28 py-28 sm:py-40">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase font-semibold mb-12">
            <span className={purple ? '' : 'text-elec'} style={{ color: purple ? '#a78bfa' : undefined }}>{eyebrow}</span>
          </p>
          {children}
        </div>
      </ScrollReveal>
    </section>
  );
}

function FooterBlock() {
  return (
    <footer className="relative px-6 sm:px-12 lg:pl-28 py-16 border-t border-divider/40">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-12">
            <div>
              <Wordmark size="sm" onDark />
              <p className="text-mute text-sm mt-3 max-w-md leading-relaxed">Built and run for service businesses up to $5M.</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3">
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="text-platinum hover:text-white text-sm font-semibold transition-colors">Book a 30-minute call</a>
              <a href={`mailto:${EMAIL}`} className="text-mute hover:text-platinum-soft text-sm transition-colors">{EMAIL}</a>
            </div>
          </div>
          <FooterBottomRow />
        </div>
      </ScrollReveal>
    </footer>
  );
}

function FooterBottomRow() {
  const wrap = 'pt-8 border-t border-divider/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-mute';
  const linkRow = 'flex flex-wrap items-center gap-x-6 gap-y-2';
  const linkCls = 'hover:text-platinum-soft transition-colors';
  return (
    <div className={wrap}>
      <div className={linkRow}>
        <Link href="/how-it-works" className={linkCls}>How it works</Link>
        <Link href="/platform" className={linkCls}>Platform</Link>
        <Link href="/work" className={linkCls}>Proof</Link>
        <Link href="/is-this-for-me" className={linkCls}>Is it for me?</Link>
        <Link href="/pricing" className={linkCls}>Pricing</Link>
        <Link href="/about" className={linkCls}>About</Link>
      </div>
      <p>{'©'} 2026 StayBookt Inc. Toronto, ON.</p>
    </div>
  );
}

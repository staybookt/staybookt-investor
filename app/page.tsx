import { TopNav } from '@/components/TopNav';
import Hero from '@/components/Hero';
import Wordmark from '@/components/Wordmark';
import ScrollReveal from '@/components/ScrollReveal';
import HomeCanvas from '@/components/HomeCanvas';
import Spine from '@/components/Spine';
import Frame from '@/components/Frame';
import { ReceptionistScreen } from '@/components/PlatformPreview';
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

const FORKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/is-this-for-me', label: 'Is it for me?' },
  { href: '/pricing', label: 'Pricing' },
];

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

      {/* 01 — WATCH IT RUN */}
      <Moment i={1} eyebrow="01 / Watch it run">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display tracking-[-0.03em] leading-[1.02] text-white" style={{ fontSize: 'clamp(34px, 5vw, 60px)' }}>
              The phone rings. <Grad>It is already handled.</Grad>
            </h2>
            <p className="mt-6 max-w-xl text-platinum-soft text-lg leading-relaxed">
              A customer texts at 9pm. StayBookt answers, quotes, and books the job while you are at dinner. You wake up to it done.
            </p>
            <p className="mt-6 font-display text-2xl sm:text-3xl tracking-tight leading-snug max-w-md">
              Booked at 2:14 a.m. You heard about it <Grad>over coffee.</Grad>
            </p>
            <Link href="/platform" className="mt-7 inline-flex items-center gap-2 text-elec font-semibold text-sm hover:gap-3 transition-all">
              See everything we run <span aria-hidden>{'→'}</span>
            </Link>
          </div>
          <Frame accent>
            <ReceptionistScreen />
          </Frame>
        </div>
      </Moment>

      {/* 02 — SEE IT IS REAL */}
      <Moment i={2} eyebrow="02 / See it is real">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display tracking-[-0.03em] leading-[1.02] text-white" style={{ fontSize: 'clamp(34px, 5vw, 60px)' }}>
              This one is <Grad>already running.</Grad>
            </h2>
            <p className="mt-6 max-w-xl text-platinum-soft text-lg leading-relaxed">
              We built and we run Top Choice Electrical. Real business, real site, real bookings coming in.
            </p>
            <blockquote className="mt-7 border-l-2 border-hvac/60 pl-5 max-w-xl">
              <p className="text-platinum text-lg italic leading-snug mb-2">
                {'“'}My old site never once sent me a lead. Now people show up to the first call already knowing who I am.{'”'}
              </p>
              <cite className="not-italic text-mute text-sm font-semibold">Tim Ciszkowski, Top Choice Electrical</cite>
            </blockquote>
            <Link href="/work" className="mt-7 inline-flex items-center gap-2 text-elec font-semibold text-sm hover:gap-3 transition-all">
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

      {/* 03 — THE DEAL + FORK */}
      <Moment i={3} eyebrow="03 / The deal" purple>
        <h2 className="font-display tracking-[-0.03em] leading-[1.0] text-white max-w-4xl" style={{ fontSize: 'clamp(38px, 6vw, 72px)' }}>
          We only make money <Grad>when you do.</Grad>
        </h2>
        <p className="mt-6 max-w-2xl text-platinum-soft text-lg leading-relaxed">
          A build fee, a flat monthly, and 5% of the new business we bring in. If the phone does not ring more, we have not earned it.
        </p>
        <p className="mt-4 max-w-2xl text-mute text-base leading-relaxed">
          No agency retainer, no lock-in, no new system to learn. We run it. You do the work you are good at.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
          {FORKS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group flex items-center justify-between rounded-2xl border border-divider/60 bg-paper/[0.03] px-5 py-5 hover:border-elec/40 hover:bg-paper/[0.05] transition-colors"
            >
              <span className="font-display text-lg tracking-tight text-white">{f.label}</span>
              <span aria-hidden className="text-elec transition-transform group-hover:translate-x-1">{'→'}</span>
            </Link>
          ))}
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl bg-gradient-to-r from-elec to-hvac px-5 py-5 text-ink transition-transform hover:-translate-y-0.5"
          >
            <span className="font-display text-lg tracking-tight font-bold">Book a call</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">{'→'}</span>
          </a>
        </div>

        <p className="mt-6 text-mute text-sm">
          30 minutes with a founder. No pitch deck. Or email{' '}
          <a href={`mailto:${EMAIL}`} className="text-platinum-soft hover:text-white transition-colors">{EMAIL}</a>.
        </p>

        <p className="mt-20 text-center font-display text-3xl tracking-tight">
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
    <section id={`m${i}`} data-i={i} className="relative scroll-mt-24 px-6 sm:px-12 lg:pl-28 py-24 sm:py-32">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <p
            className="font-mono text-[11px] tracking-[0.28em] uppercase font-semibold mb-10"
            style={{ color: purple ? '#a78bfa' : undefined }}
          >
            <span className={purple ? '' : 'text-elec'}>{eyebrow}</span>
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

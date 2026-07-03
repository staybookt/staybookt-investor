import { TopNav } from '@/components/TopNav';
import Hero from '@/components/Hero';
import Wordmark from '@/components/Wordmark';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxOrbs from '@/components/ParallaxOrbs';
import { PreviewPill, ReceptionistScreen } from '@/components/PlatformPreview';
import { CAL_LINK, EMAIL } from '@/lib/site';
import Image from 'next/image';
import Link from 'next/link';

const SHARE_DESCRIPTION =
  'StayBookt builds and runs the website and front office for service businesses up to $5M. The phone gets answered, the jobs get booked, and you get your life back. Paid for by the results.';

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

const DEEP_GRAD: React.CSSProperties = {
  backgroundImage: 'linear-gradient(96deg, #0891B2 0%, #047857 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

function Grad({ children, deep }: { children: React.ReactNode; deep?: boolean }) {
  if (deep) return <span style={DEEP_GRAD}>{children}</span>;
  return <span className="text-brand-gradient">{children}</span>;
}

const FORKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/is-this-for-me', label: 'Is it for me?' },
  { href: '/pricing', label: 'Pricing' },
];

export default function HomePage() {
  return (
    <main id="top" className="relative text-white scroll-stage">
      <ParallaxOrbs />
      <TopNav />

      {/* 1 — HERO: the feeling */}
      <Hero />

      {/* 2 — WATCH IT WORK: one live artifact, almost no words */}
      <Moment tone="dark">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Eyebrow tone="dark">Watch it run</Eyebrow>
          <PreviewPill />
        </div>
        <div className="max-w-2xl">
          <ReceptionistScreen />
        </div>
        <p className="mt-8 font-display text-2xl sm:text-3xl tracking-tight leading-snug max-w-2xl">
          A lead came in at 2 a.m. It was booked <Grad>before you woke up.</Grad>
        </p>
        <Link href="/platform" className="inline-flex items-center gap-2 text-elec font-semibold text-sm mt-6 hover:gap-3 transition-all">
          See everything we run <span aria-hidden>{'→'}</span>
        </Link>
      </Moment>

      {/* 3 — SEE IT'S REAL: a live client site, not a claim */}
      <Moment tone="cream">
        <Eyebrow tone="cream">Real, and live right now</Eyebrow>
        <div className="max-w-3xl overflow-hidden rounded-xl border border-stone-300 bg-white shadow-2xl shadow-stone-400/30">
          <div className="flex items-center gap-1.5 border-b border-stone-200 bg-stone-100 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            <span className="ml-3 text-[10px] tracking-wide text-stone-400">topchoiceelectrical.com</span>
          </div>
          <div className="relative aspect-[16/9] w-full bg-stone-900">
            <Image
              src="/photos/tce-after.png"
              alt="Top Choice Electrical, a live site StayBookt built and runs"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 768px"
            />
          </div>
        </div>
        <blockquote className="mt-8 border-l-2 border-emerald-600 pl-5 max-w-2xl">
          <p className="text-stone-800 text-lg sm:text-xl italic leading-snug mb-2">
            {'“'}My old site never sent me a lead. People show up to the first call already knowing who I am.{'”'}
          </p>
          <cite className="not-italic text-stone-500 text-sm font-semibold">Tim Ciszkowski, Top Choice Electrical</cite>
        </blockquote>
        <Link href="/work" className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm mt-7 hover:gap-3 transition-all">
          See the work <span aria-hidden>{'→'}</span>
        </Link>
      </Moment>

      {/* 4 — THE DEAL + THE FORK */}
      <Moment tone="dark">
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-5 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 84px)' }}>
          We only make money <Grad>when you do.</Grad>
        </h2>
        <p className="text-platinum-soft text-base sm:text-lg mb-12 max-w-2xl leading-relaxed">
          Paid on the new business we bring you. That is the whole deal.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {FORKS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group flex items-center justify-between rounded-2xl border border-divider/60 bg-paper/[0.03] px-6 py-5 hover:border-elec/40 hover:bg-paper/[0.05] transition-colors"
            >
              <span className="font-display text-lg sm:text-xl tracking-tight text-white">{f.label}</span>
              <span aria-hidden className="text-elec transition-transform group-hover:translate-x-1">{'→'}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-elec to-hvac text-ink font-bold px-8 py-4 rounded-lg text-base transition-transform hover:-translate-y-0.5"
          >
            Book a 30-minute call
            <span aria-hidden>{'→'}</span>
          </a>
          <p className="text-mute text-sm">
            30 minutes with a founder. No pitch deck. Or email{' '}
            <a href={`mailto:${EMAIL}`} className="text-platinum-soft hover:text-white transition-colors">{EMAIL}</a>.
          </p>
        </div>
      </Moment>

      <FooterBlock />
    </main>
  );
}

/* Helpers */

function Moment({ children, tone, id }: { children: React.ReactNode; tone: 'dark' | 'cream'; id?: string }) {
  const bg = tone === 'cream' ? 'bg-stone-50' : 'bg-ink-deep';
  const textColor = tone === 'cream' ? 'text-stone-900' : 'text-white';
  const scrollMt = id ? 'scroll-mt-24' : '';
  return (
    <section id={id} className={`relative px-6 sm:px-12 py-16 sm:py-24 ${scrollMt} ${bg} ${textColor}`}>
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">{children}</div>
      </ScrollReveal>
    </section>
  );
}

function Eyebrow({ children, tone }: { children: React.ReactNode; tone: 'cream' | 'dark' }) {
  const color = tone === 'cream' ? 'text-stone-500' : 'text-elec';
  return <p className={`font-mono text-[10px] sm:text-[11px] tracking-[0.32em] uppercase font-bold mb-7 ${color}`}>{children}</p>;
}

function FooterBlock() {
  return (
    <footer className="px-6 sm:px-12 py-16 border-t border-divider/40 bg-ink-deep">
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

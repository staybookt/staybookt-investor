import { TopNav } from '@/components/TopNav';
import Hero from '@/components/Hero';
import Wordmark from '@/components/Wordmark';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxOrbs from '@/components/ParallaxOrbs';
import { PreviewPill, ReceptionistScreen } from '@/components/PlatformPreview';
import { CAL_LINK, EMAIL } from '@/lib/site';
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

/* Gradient accent for a headline phrase. deep = darker, for light/cream backgrounds. */
function Grad({ children, deep }: { children: React.ReactNode; deep?: boolean }) {
  if (deep) return <span style={DEEP_GRAD}>{children}</span>;
  return <span className="text-brand-gradient">{children}</span>;
}

const BEATS = [
  { tag: 'Get found', body: 'A site that ranks, converts, and looks like the pro you are. Google profile rebuilt.' },
  { tag: 'Get booked', body: 'Every call and text answered in seconds. Jobs land straight on your calendar.' },
  { tag: 'Stay booked', body: 'Reviews, follow-up, and repeat work, running on their own in the background.' },
];

const FORKS = [
  { href: '/how-it-works', label: 'How it works', body: 'The operating loop, and the product it runs on.' },
  { href: '/is-this-for-me', label: 'Is it for me?', body: 'The signals we build for. Read the list and see.' },
  { href: '/pricing', label: 'Pricing', body: 'Three ways to work with us. Paid on results.' },
];

export default function HomePage() {
  return (
    <main id="top" className="relative text-white scroll-stage">
      <ParallaxOrbs />
      <TopNav />

      {/* 1 — HERO: the 5-second hook */}
      <Hero />

      {/* 2 — WHAT WE DO: shown, not told */}
      <Moment tone="dark">
        <div className="flex items-center justify-between gap-4 mb-7">
          <Eyebrow tone="dark">What we do</Eyebrow>
          <PreviewPill />
        </div>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-4 max-w-3xl" style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}>
          Get found. Book the work. <Grad>Stay booked.</Grad>
        </h2>
        <p className="text-platinum-soft text-base sm:text-lg mb-10 max-w-2xl leading-relaxed">
          We build and run the website and the front office. You do the work. We run everything in front of it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {BEATS.map((b) => (
            <div key={b.tag} className="rounded-2xl border border-divider/60 bg-paper/[0.03] p-6 hover:border-elec/40 transition-colors">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-elec mb-3">{b.tag}</p>
              <p className="text-platinum-soft text-sm sm:text-base leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>

        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute mb-4">Here is one piece of it, live</p>
        <div className="max-w-2xl">
          <ReceptionistScreen />
        </div>
        <Link href="/how-it-works" className="inline-flex items-center gap-2 text-elec font-semibold text-sm mt-8 hover:gap-3 transition-all">
          See how it all works <span aria-hidden>{'→'}</span>
        </Link>
      </Moment>

      {/* 3 — WHY IT PAYS FOR ITSELF: the hook */}
      <Moment tone="cream">
        <Eyebrow tone="cream">Why it pays for itself</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-6 max-w-4xl text-stone-900" style={{ fontSize: 'clamp(38px, 6.4vw, 84px)' }}>
          A product that gets paid to <Grad deep>hustle like you.</Grad>
        </h2>
        <p className="text-stone-600 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
          We only make money when you do. You get the revenue operation a big company pays an executive half a million a year to run, for less than a part-time hire. If we do not grow your business, we do not earn the last line.
        </p>
        <blockquote className="border-l-2 border-emerald-600 pl-5 max-w-2xl mb-8">
          <p className="text-stone-800 text-lg sm:text-xl italic leading-snug mb-2">
            {'“'}My old site sat there and never sent me a lead. The new one gives me instant credibility. People show up to the first call already knowing who I am.{'”'}
          </p>
          <cite className="not-italic text-stone-500 text-sm font-semibold">Tim Ciszkowski, Top Choice Electrical</cite>
        </blockquote>
        <Link href="/work" className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm hover:gap-3 transition-all">
          See the proof <span aria-hidden>{'→'}</span>
        </Link>
      </Moment>

      {/* 4 — THE FORK: dig in or book */}
      <Moment tone="dark">
        <Eyebrow tone="dark">Where to next</Eyebrow>
        <h2 className="font-display tracking-[-0.035em] leading-[0.95] mb-5 max-w-3xl" style={{ fontSize: 'clamp(40px, 7vw, 84px)' }}>
          Want to <Grad>dig in?</Grad>
        </h2>
        <p className="text-platinum-soft text-base sm:text-lg mb-10 max-w-2xl leading-relaxed">
          Pick what you want to see, or just book a call and we will map it to your business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {FORKS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group rounded-2xl border border-divider/60 bg-paper/[0.03] p-6 hover:border-elec/40 hover:bg-paper/[0.05] transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-xl sm:text-2xl tracking-tight text-white">{f.label}</h3>
                <span aria-hidden className="text-elec transition-transform group-hover:translate-x-1">{'→'}</span>
              </div>
              <p className="text-platinum-soft text-sm leading-relaxed">{f.body}</p>
            </Link>
          ))}
        </div>

        <div className="rounded-3xl border border-divider/60 bg-gradient-to-b from-white/[0.04] to-transparent p-8 sm:p-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-elec">30 minutes with a founder</p>
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2 py-0.5">Free</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight mb-3">Tell us about your business.</h3>
          <p className="text-platinum-soft text-base leading-relaxed mb-7 max-w-xl">
            No pitch deck, no homework. We learn what you do and tell you straight whether we can help. If it is a fit, a proposal goes out the next day.
          </p>
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-elec to-hvac text-ink font-bold px-7 py-3.5 rounded-lg text-base transition-transform hover:-translate-y-0.5"
          >
            Book a 30-minute call
            <span aria-hidden>{'→'}</span>
          </a>
          <p className="text-mute text-sm mt-5">
            Or email <a href={`mailto:${EMAIL}`} className="text-platinum-soft hover:text-white transition-colors">{EMAIL}</a>.
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
              <p className="text-mute text-sm mt-3 max-w-md leading-relaxed">Get found. Get booked. Stay booked. Built and run for service businesses up to $5M.</p>
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

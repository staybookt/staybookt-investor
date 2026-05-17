'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Wordmark from './Wordmark';

/* === Reveal wrapper — fades + slides children up on scroll into view === */
export function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* === Animated counter — counts up to target on view === */
export function Counter({ value, prefix = '', suffix = '', duration = 2 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
      else setN(value);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
}

/* === Section 1 — Hero === */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
      {/* Decorative gradient orbs */}
      <motion.div
        className="orb"
        style={{ width: 600, height: 600, background: 'var(--elec)', top: '-10%', right: '-10%' }}
        animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb"
        style={{ width: 500, height: 500, background: 'var(--plumb)', bottom: '-15%', right: '15%' }}
        animate={{ scale: [1.1, 1, 1.1], x: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb"
        style={{ width: 450, height: 450, background: 'var(--hvac)', bottom: '0%', right: '-5%' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-8 sm:px-16 py-6 flex items-center justify-between">
        <Wordmark size="md" onDark animate />
        <span className="text-xs tracking-[0.2em] font-semibold text-platinum-soft">INVESTOR BRIEF · 2026</span>
      </nav>

      <div className="relative z-10 px-8 sm:px-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-white text-[88px] sm:text-[140px] leading-[0.9] tracking-[-0.05em]">
            Operating
          </h1>
          <h1 className="font-display text-platinum text-[88px] sm:text-[140px] leading-[0.9] tracking-[-0.05em]">
            layer.
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 text-platinum-soft text-lg sm:text-2xl font-display tracking-tight max-w-3xl"
        >
          The embedded ops team for regulated trades.
          <br />
          <span className="text-mute-dark text-base sm:text-lg">Electrical. HVAC. Plumbing. Canada, starting with Ontario.</span>
        </motion.p>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-platinum-soft text-xs tracking-widest"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SCROLL
      </motion.div>
    </section>
  );
}

/* === Section 2 — The Why === */
export function TheWhy() {
  return (
    <section id="why" className="relative min-h-screen flex items-center bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto w-full">
        <Reveal>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-elec uppercase mb-12">
            Why we exist
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[64px] sm:text-[110px] leading-[0.95] tracking-[-0.04em]">
            Trades stall
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <h2 className="font-display text-elec text-[64px] sm:text-[110px] leading-[0.95] tracking-[-0.04em]">
            at $1M.
          </h2>
        </Reveal>
        <Reveal delay={0.5} className="mt-20 max-w-3xl">
          <p className="text-mute text-lg sm:text-xl leading-relaxed">
            An owner-operator electrician doing $1M in revenue should have a marketing lead, an ops manager, a bookkeeper, and a recruiter on payroll. They have themselves. The phone keeps ringing while they're on a panel upgrade. Quotes go cold.
          </p>
          <p className="text-ink text-xl sm:text-2xl font-semibold mt-8 leading-relaxed">
            StayBookt is the team and the tooling they can't hire.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === Section 3 — Photography (Tim's work, full-bleed parallax) === */
export function Photography() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/photos/IMG_1140.jpg"
          alt="Top Choice Electrical work — Newmarket home"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      {/* Dark gradient overlay for caption legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 px-8 sm:px-16 pb-16">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-4">First embedded client</p>
          <h3 className="font-display text-white text-5xl sm:text-7xl tracking-tight">Top Choice Electrical</h3>
          <p className="mt-3 text-platinum-soft text-base sm:text-lg max-w-2xl">
            Tim Ciszkowski · Newmarket, Ontario · 22 years on the tools · ESA certified
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === Section 4 — Five problems (numbered editorial layout) === */
export function Problems() {
  const items = [
    { n: '01', name: 'The phone', desc: 'Leads bleed to whoever picks up first.', stat: '38%', sub: 'after-hours calls to voicemail', color: 'var(--plumb)' },
    { n: '02', name: 'The quote', desc: 'Quotes sent. No follow-up. Pipeline rots.', stat: '$8K', sub: 'avg ticket lost per stale quote', color: 'var(--elec)' },
    { n: '03', name: 'The website', desc: "Visitor lands, can't tell what they do, leaves.", stat: '< 2%', sub: 'conversion on template sites', color: 'var(--hvac)' },
    { n: '04', name: 'The back office', desc: 'Invoicing slips. Books drift. Margins shrink.', stat: '15h', sub: '/wk owner spends on books', color: 'var(--mute)' },
    { n: '05', name: 'The ceiling', desc: "Owner is the bottleneck. Can't scale past themselves.", stat: '$2M', sub: 'where solo trades stall', color: 'white' },
  ];
  return (
    <section id="problems" className="relative bg-ink text-white py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto w-full">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-8">Five problems</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-tight mb-20">
            Where their revenue leaks.
          </h2>
        </Reveal>
        <div className="space-y-px bg-divider">
          {items.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="bg-ink grid grid-cols-12 gap-4 sm:gap-8 py-8 sm:py-12 items-center hover:bg-ink-soft transition-colors">
                <div className="col-span-2 sm:col-span-1 font-display text-2xl sm:text-3xl" style={{ color: p.color }}>
                  {p.n}
                </div>
                <div className="col-span-10 sm:col-span-3 font-display text-xl sm:text-3xl tracking-tight">
                  {p.name}
                </div>
                <div className="col-span-12 sm:col-span-5 text-mute-dark text-base sm:text-lg">
                  {p.desc}
                </div>
                <div className="col-span-6 sm:col-span-2 font-display text-3xl sm:text-4xl text-right" style={{ color: p.color }}>
                  {p.stat}
                </div>
                <div className="col-span-6 sm:col-span-1 text-mute text-xs sm:text-sm">
                  {p.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Section 5 — The Flywheel (rotating SVG) === */
export function Flywheel() {
  const stages = [
    { name: 'FIND', desc: 'SEO · GBP · Ads', color: 'var(--elec)' },
    { name: 'CAPTURE', desc: 'Missed-call recovery · Callbacks', color: 'var(--elec)' },
    { name: 'QUOTE', desc: 'On-site quote · Follow-up automation', color: 'var(--plumb)' },
    { name: 'DELIVER', desc: 'Permits · Scheduling · Invoicing', color: 'var(--plumb)' },
    { name: 'RETAIN', desc: 'Reviews · Referrals · Repeat outreach', color: 'var(--hvac)' },
  ];
  return (
    <section id="flywheel" className="relative bg-cream text-ink py-32 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto w-full">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-hvac font-semibold uppercase mb-8">The journey</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-tight mb-6">
            Every trade leaks
          </h2>
          <h2 className="font-display text-5xl sm:text-7xl tracking-tight text-mute mb-20">
            at one of five stages.
          </h2>
        </Reveal>

        <div className="relative aspect-square max-w-3xl mx-auto">
          {/* Rotating outer ring */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <circle cx="200" cy="200" r="180" fill="none" stroke="var(--divider-lt)" strokeWidth="1" />
              {stages.map((s, i) => {
                const angle = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
                const x = 200 + Math.cos(angle) * 180;
                const y = 200 + Math.sin(angle) * 180;
                return <circle key={i} cx={x} cy={y} r="10" fill={s.color} />;
              })}
            </svg>
          </motion.div>

          {/* Center StayBookt OS */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-ink flex flex-col items-center justify-center border-4 border-cream shadow-2xl">
              <Wordmark size="md" onDark />
              <span className="text-hvac text-[10px] sm:text-xs tracking-[0.3em] font-semibold mt-1">OPERATING LAYER</span>
            </div>
          </div>

          {/* Stage labels positioned around the circle */}
          {stages.map((s, i) => {
            const angle = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
            const r = 0.65; // 65% from center
            const x = 50 + Math.cos(angle) * r * 50;
            const y = 50 + Math.sin(angle) * r * 50;
            return (
              <Reveal key={i} delay={0.3 + i * 0.1}>
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="font-display text-xs sm:text-base tracking-[0.2em] font-bold" style={{ color: s.color }}>
                    {s.name}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.8} className="mt-16 text-center">
          <p className="text-elec font-semibold text-base sm:text-lg italic">
            Most agencies own one stage. We own all five.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === Section 6 — TAM with animated counter === */
export function TAM() {
  return (
    <section id="tam" className="relative bg-ink text-white min-h-screen flex items-center py-32 overflow-hidden">
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--hvac)', top: '20%', left: '-10%', opacity: 0.3 }} />
      <div className="orb" style={{ width: 400, height: 400, background: 'var(--plumb)', bottom: '10%', right: '-5%', opacity: 0.25 }} />

      <div className="px-8 sm:px-16 max-w-7xl mx-auto w-full relative">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-hvac font-semibold uppercase mb-8">The market</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[120px] sm:text-[240px] leading-none text-center tracking-[-0.06em]">
            $<Counter value={135} duration={2.5} />M
          </h2>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="text-center text-2xl sm:text-3xl font-display text-platinum-soft mt-8">
            ARR opportunity in Canada.
          </p>
        </Reveal>
        <Reveal delay={0.7}>
          <p className="text-center text-mute-dark italic text-sm sm:text-base mt-12 max-w-3xl mx-auto">
            Electrical · HVAC · Plumbing. Sub-$5M revenue. Bottom-up from 115,000 Canadian trades, 5% Ontario penetration, $5K average monthly retainer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === Section 7 — The Ask / Closer === */
export function Ask() {
  return (
    <section id="ask" className="relative bg-ink text-white min-h-screen flex items-center justify-center py-32 overflow-hidden">
      {/* Closing gradient sweep */}
      <motion.div
        className="orb"
        style={{ width: 800, height: 800, background: 'var(--elec)', top: '-20%', right: '-20%', opacity: 0.3 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb"
        style={{ width: 600, height: 600, background: 'var(--plumb)', bottom: '0%', left: '-10%', opacity: 0.25 }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb"
        style={{ width: 500, height: 500, background: 'var(--hvac)', top: '40%', right: '20%', opacity: 0.2 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 text-center px-8">
        <Reveal>
          <h2 className="font-display text-[80px] sm:text-[180px] leading-none tracking-[-0.05em]">
            Talk to us.
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <a href="mailto:jacob@staybookt.com" className="block mt-16 text-2xl sm:text-3xl font-display text-platinum hover:text-white transition-colors">
            jacob@staybookt.com
          </a>
          <a href="tel:647-680-2324" className="block mt-3 text-lg sm:text-xl text-mute-dark hover:text-platinum-soft transition-colors">
            647.680.2324
          </a>
        </Reveal>
        <Reveal delay={0.6}>
          <div className="mt-24 inline-flex items-center gap-3 text-xs tracking-[0.3em] text-mute-dark">
            <span className="w-8 h-px bg-mute-dark" />
            <Wordmark size="sm" onDark />
            <span className="w-8 h-px bg-mute-dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Wordmark from './Wordmark';
import { Reveal, Counter } from './Sections';

/* === Sticky right-side section nav (dot rail) === */
const NAV_SECTIONS = [
  { id: 'top', label: 'Top' },
  { id: 'why', label: 'Problem' },
  { id: 'os', label: 'OS' },
  { id: 'playbook', label: '90 days' },
  { id: 'weekly', label: 'Cadence' },
  { id: 'before-after', label: 'Proof' },
  { id: 'case', label: 'Tim' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'competitive', label: 'Field' },
  { id: 'why-now', label: 'Market' },
  { id: 'pipeline-v2', label: 'Pipeline' },
  { id: 'unit-econ', label: 'Math' },
  { id: 'pricing-v3', label: 'Pricing' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'team', label: 'Team' },
  { id: 'ask', label: 'Ask' },
];

export function SideNav() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const handler = () => {
      const mid = window.innerHeight / 2;
      let current = 'top';
      for (const s of NAV_SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3" aria-label="Section navigation">
      {NAV_SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative flex items-center justify-end gap-3 h-4"
            aria-label={`Jump to ${s.label}`}
          >
            <span className={`text-[11px] tracking-[0.2em] font-semibold transition-all ${isActive ? 'text-white opacity-100' : 'text-platinum-soft opacity-0 group-hover:opacity-70'}`}>
              {s.label.toUpperCase()}
            </span>
            <span className={`block rounded-full transition-all ${isActive ? 'w-3 h-3 bg-white' : 'w-1.5 h-1.5 bg-platinum-soft/40 group-hover:bg-platinum'}`} />
          </a>
        );
      })}
    </nav>
  );
}

/* === Marquee strip — vertical names + revenue scrolling === */
export function VerticalMarquee() {
  const items = [
    { name: 'ELECTRICAL', color: 'var(--elec)' },
    { name: '$1.2M avg ARR', color: 'white' },
    { name: 'HVAC', color: 'var(--hvac)' },
    { name: '$1.8M avg ARR', color: 'white' },
    { name: 'PLUMBING', color: 'var(--plumb)' },
    { name: '$900K avg ARR', color: 'white' },
    { name: 'ONTARIO FIRST', color: 'var(--platinum)' },
    { name: '115,000 trades', color: 'white' },
  ];
  return (
    <section className="relative bg-ink py-8 overflow-hidden border-y border-divider">
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items, ...items, ...items].map((it, i) => (
          <span key={i} className="font-display text-2xl sm:text-4xl tracking-[-0.02em]" style={{ color: it.color }}>
            {it.name} <span className="text-divider mx-2">·</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

/* === Section — Tim Case Study (real proof) === */
export function TimCase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const stats = [
    { label: 'Lead capture', before: '~5/mo', after: '40+/mo', delta: '+700%' },
    { label: 'Quote follow-up', before: 'manual / spotty', after: 'automated, same-day', delta: '100%' },
    { label: 'Google rating volume', before: '3 reviews', after: '50+ targeted', delta: 'in 90 days' },
    { label: 'Time on books / phones', before: '15 hr/wk', after: '< 2 hr/wk', delta: '–87%' },
  ];

  return (
    <section id="case" ref={ref} className="relative bg-cream text-ink py-32 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Proof — Wave 1 client</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            We didn&apos;t pitch this.
          </h2>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] text-mute mb-16">
            We&apos;re running it.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink">
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image
                  src="/photos/IMG_5375.jpg"
                  alt="Tim Ciszkowski — Top Choice Electrical"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent text-white">
                <p className="text-xs tracking-[0.25em] text-elec font-semibold uppercase mb-2">Tim Ciszkowski</p>
                <p className="font-display text-2xl tracking-tight">Owner, Top Choice Electrical</p>
                <p className="text-platinum-soft text-sm mt-1">Newmarket, ON · ESA licensed · 22 yrs</p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.3}>
              <blockquote className="font-display text-2xl sm:text-3xl leading-snug tracking-tight text-ink mb-10">
                &ldquo;I&apos;m on the tools all day. StayBookt runs everything else &mdash; the site, the leads, the follow-up. I just show up and do the work.&rdquo;
                <footer className="mt-4 text-sm text-mute font-sans font-normal tracking-normal">— Tim, after 60 days embedded</footer>
              </blockquote>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.4 + i * 0.08}>
                  <div className="bg-paper border border-divider-lt rounded-xl p-5 hover:border-elec/60 transition-colors">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-mute font-semibold mb-3">{s.label}</p>
                    <div className="flex items-baseline gap-2 text-sm text-mute mb-1">
                      <span className="line-through opacity-60">{s.before}</span>
                      <span className="text-elec">→</span>
                      <span className="text-ink font-semibold">{s.after}</span>
                    </div>
                    <p className="font-display text-2xl text-elec tracking-tight">{s.delta}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.7}>
              <p className="text-mute text-sm mt-8 italic">
                Wave 1 contract: 90-day pilot, Mar–May 2026. New site, lead-capture stack, GBP rebuild, ESA-aligned messaging, weekly ops standups. Tim now considering Wave 2 expansion to a second trade vertical.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Lighthouse + see it live — folded in from old LiveTimEmbed section */}
        <Reveal delay={0.5}>
          <div className="mt-16 grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Lighthouse scores card */}
            <div className="lg:col-span-7 bg-paper border border-divider-lt rounded-2xl p-6 sm:p-8">
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-1">Google Lighthouse — production</p>
                  <p className="font-display text-xl tracking-tight">Same stack we ship to every client.</p>
                </div>
                <span className="text-xs tracking-[0.2em] uppercase font-bold text-hvac">98 / 99 / 100 / 100</span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Performance', value: 98, color: 'var(--hvac)' },
                  { label: 'Accessibility', value: 99, color: 'var(--plumb)' },
                  { label: 'Best Practices', value: 100, color: 'var(--elec)' },
                  { label: 'SEO', value: 100, color: 'var(--hvac)' },
                ].map((s) => (
                  <MiniRing key={s.label} {...s} />
                ))}
              </div>
            </div>

            {/* See it live card */}
            <a
              href="https://www.topchoiceelectrical.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:col-span-5 group bg-ink text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:bg-ink-soft transition-colors"
            >
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-elec font-semibold mb-2">See it live</p>
                <p className="font-display text-2xl tracking-tight mb-3">topchoiceelectrical.ca</p>
                <p className="text-platinum-soft text-sm leading-relaxed">
                  The actual site we shipped for Tim. Fielding real calls today. Open it in a new tab and click around.
                </p>
              </div>
              <div className="mt-6 inline-flex items-center gap-3 text-elec font-semibold text-sm group-hover:gap-4 transition-all">
                Open the live site
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0 -7L10 14M5 7h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                </svg>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* === Section — How it works (3 pillars) === */
export function HowItWorks() {
  const pillars = [
    {
      n: '01',
      tag: 'BRAND',
      color: 'var(--elec)',
      title: 'A storefront they would hire themselves.',
      body: 'Custom site, real photography, ESA / HVAC / plumber-code accurate copy. Built on the same stack we use for SaaS — Next.js, Tailwind, instant Lighthouse 95+.',
      proof: 'Tim Lighthouse: 98 / 99 / 100 / 100',
    },
    {
      n: '02',
      tag: 'OPERATIONS',
      color: 'var(--plumb)',
      title: 'Leads do not leak. Quotes do not rot.',
      body: 'Missed-call recovery, callback forms, automated quote follow-ups, GBP review pipelines. Everything ringed to the owner phone so no lead dies because they were on a panel.',
      proof: '0 → 40+ leads / mo on Tim in 60 days',
    },
    {
      n: '03',
      tag: 'GROWTH',
      color: 'var(--hvac)',
      title: 'Compounding visibility, not paid spikes.',
      body: 'SEO, GBP, citations, review velocity, retargeting. Owner gets a Monday brief: this many leads, this much pipeline, this many reviews. Numbers, not vibes.',
      proof: 'Local pack ranks: 3 services live, 9 pending',
    },
  ];

  return (
    <section id="how" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="orb" style={{ width: 400, height: 400, background: 'var(--plumb)', top: '10%', left: '-10%', opacity: 0.15 }} />

      <div className="px-8 sm:px-16 max-w-7xl mx-auto relative">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-plumb font-semibold uppercase mb-6">How it works</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Three layers.
          </h2>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] text-mute-dark mb-20">
            One embedded team.
          </h2>
        </Reveal>

        <div className="space-y-px bg-divider">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.12}>
              <div className="bg-ink grid grid-cols-12 gap-6 sm:gap-10 py-10 sm:py-16 items-start group hover:bg-ink-soft transition-colors">
                <div className="col-span-12 sm:col-span-2">
                  <div className="font-display text-3xl mb-2" style={{ color: p.color }}>{p.n}</div>
                  <div className="text-[11px] tracking-[0.25em] font-semibold" style={{ color: p.color }}>{p.tag}</div>
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-snug mb-4">{p.title}</h3>
                  <p className="text-platinum-soft text-base sm:text-lg leading-relaxed">{p.body}</p>
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <div className="border-l-2 pl-5 py-2" style={{ borderColor: p.color }}>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-mute font-semibold mb-2">Live evidence</p>
                    <p className="font-display text-lg sm:text-xl tracking-tight" style={{ color: p.color }}>{p.proof}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Section — Pricing (3 tiers) === */
export function Pricing() {
  const tiers = [
    {
      name: 'Lift',
      tagline: 'For owners stuck at $300K – $700K.',
      monthly: '$2,500',
      suffix: '/mo',
      setup: '$5K setup',
      color: 'var(--hvac)',
      features: ['New site + brand', 'Lead capture stack', 'GBP + review engine', 'Monthly ops brief'],
      cta: 'Common entry point',
    },
    {
      name: 'Embed',
      tagline: 'For $700K – $2M owner-operators.',
      monthly: '$4,999',
      suffix: '/mo + 5% growth',
      setup: '$8K setup',
      color: 'var(--elec)',
      features: ['Everything in Lift', 'Missed-call recovery', 'Quote follow-up automation', 'Weekly standup + reporting', 'Dedicated Slack channel'],
      cta: 'Tim is here',
      featured: true,
    },
    {
      name: 'Scale',
      tagline: 'For $2M+ trades adding crews.',
      monthly: '$8,500',
      suffix: '/mo + 5% growth',
      setup: '$12K setup',
      color: 'var(--plumb)',
      features: ['Everything in Embed', 'Recruiting & onboarding', 'Multi-location stack', 'Fractional ops manager (5h/wk)', 'Quarterly board prep'],
      cta: 'Wave 3 onwards',
    },
  ];

  return (
    <section id="pricing" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Pricing</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Retainer + growth share.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-16">
            We win when they win.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className={`relative rounded-2xl p-8 sm:p-10 h-full flex flex-col ${t.featured ? 'bg-ink text-white shadow-2xl scale-[1.02]' : 'bg-paper text-ink border border-divider-lt'}`}>
                {t.featured && (
                  <span className="absolute -top-3 left-8 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] font-semibold uppercase" style={{ background: t.color, color: '#0A0E1A' }}>
                    Tim tier
                  </span>
                )}
                <div className="mb-6">
                  <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: t.color }}>{t.name}</p>
                  <p className={`text-sm ${t.featured ? 'text-platinum-soft' : 'text-mute'} leading-relaxed`}>{t.tagline}</p>
                </div>
                <div className="mb-6 pb-6 border-b border-current/10">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl tracking-[-0.03em]">{t.monthly}</span>
                    <span className={`text-sm ${t.featured ? 'text-platinum-soft' : 'text-mute'}`}>{t.suffix}</span>
                  </div>
                  <p className={`text-xs mt-2 ${t.featured ? 'text-mute-dark' : 'text-mute'}`}>+ {t.setup}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.color }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: t.color }}>
                  → {t.cta}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5}>
          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-display text-4xl text-elec tracking-tight"><Counter value={60} suffix="K" prefix="$" duration={2} /></p>
              <p className="text-xs tracking-[0.2em] uppercase text-mute font-semibold mt-2">Avg client ARR target</p>
            </div>
            <div>
              <p className="font-display text-4xl text-plumb tracking-tight"><Counter value={5} suffix="%" duration={2} /></p>
              <p className="text-xs tracking-[0.2em] uppercase text-mute font-semibold mt-2">Growth share — only above baseline</p>
            </div>
            <div>
              <p className="font-display text-4xl text-hvac tracking-tight"><Counter value={90} suffix="d" duration={2} /></p>
              <p className="text-xs tracking-[0.2em] uppercase text-mute font-semibold mt-2">Pilot before annual commit</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* === Section — Moat === */
export function Moat() {
  const moats = [
    {
      n: 'Domain depth',
      desc: 'We understand ESA licensing, TSSA codes, and what passes municipal inspection. Agencies do not. SaaS does not.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      n: 'Embedded ops, not advice',
      desc: 'McKinsey sends slides. We answer the missed call. The hands-on layer is what trades pay for and what stays sticky.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      n: 'Vertical wedge',
      desc: 'Electrical → HVAC → Plumbing. Same buyer profile, same channels, same compliance gravity. We own one industry before going horizontal.',
      icon: 'M3 7l9-4 9 4M3 7l9 4 9-4M3 7v10l9 4 9-4V7',
    },
    {
      n: 'Receipts, not pitches',
      desc: 'Tim site is live. The lead numbers are real. Every Wave 2 prospect sees a working playbook before they sign.',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    },
  ];

  return (
    <section id="moat" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="orb" style={{ width: 600, height: 600, background: 'var(--elec)', top: '-15%', right: '-10%', opacity: 0.18 }} />

      <div className="px-8 sm:px-16 max-w-7xl mx-auto relative">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Why us, why now</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            The moat is the work.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute-dark mb-20">
            Not the deck.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
          {moats.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.1}>
              <div className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-elec/10 border border-elec/40 text-elec flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-2xl tracking-tight mb-2">{m.n}</h3>
                  <p className="text-platinum-soft text-base leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Section — Competition 2x2 === */
export function Competition() {
  const players = [
    { name: 'Jobber / Housecall Pro', x: '70%', y: '85%', us: false, label: 'SaaS' },
    { name: 'Generic agencies', x: '20%', y: '70%', us: false, label: 'Brand only' },
    { name: 'McKinsey / consultants', x: '15%', y: '25%', us: false, label: 'Slides' },
    { name: 'ServiceTitan', x: '85%', y: '60%', us: false, label: 'Enterprise SaaS' },
    { name: 'StayBookt', x: '72%', y: '18%', us: true, label: 'You are here' },
  ];

  return (
    <section id="comp" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-plumb font-semibold uppercase mb-6">The field</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Trade tech is loud.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-16">
            Nobody is in the truck.
          </h2>
        </Reveal>

        <div className="relative aspect-[5/4] sm:aspect-[16/9] max-w-5xl mx-auto bg-paper border border-divider-lt rounded-2xl p-8 sm:p-12">
          <span className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-8 -rotate-90 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-semibold text-mute origin-center">
            Embedded ops →
          </span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-semibold text-mute">
            Vertical depth →
          </span>

          <div className="absolute inset-8 sm:inset-12">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-divider-lt" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-divider-lt" />

            {players.map((p) => (
              <Reveal key={p.name} delay={0.3}>
                <div className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: p.x, top: p.y }}>
                  <div
                    className={`rounded-full mx-auto mb-2 ${p.us ? 'w-5 h-5 ring-4 ring-elec/30' : 'w-3 h-3 bg-mute-dark/40'}`}
                    style={p.us ? { background: 'var(--elec)' } : {}}
                  />
                  <p className={`text-xs sm:text-sm font-semibold ${p.us ? 'text-elec' : 'text-mute'}`}>{p.name}</p>
                  <p className={`text-[10px] tracking-wider uppercase mt-0.5 ${p.us ? 'text-ink' : 'text-mute-dark'}`}>{p.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.6}>
          <p className="mt-10 text-center text-mute text-sm sm:text-base max-w-2xl mx-auto italic">
            Software hands them a tool. Agencies hand them a website. We hand them a team. Nobody else operates inside the business with vertical-specific muscle.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === Section — Pipeline (deals in motion) === */
export function Pipeline() {
  const rows = [
    { stage: 'LIVE', client: 'Top Choice Electrical', tier: 'Embed', vertical: 'Electrical', region: 'Newmarket, ON', mrr: '$4,999', color: 'var(--elec)' },
    { stage: 'WAVE 2', client: 'Confidential — HVAC owner', tier: 'Embed', vertical: 'HVAC', region: 'York Region, ON', mrr: '$5K target', color: 'var(--hvac)' },
    { stage: 'WAVE 2', client: 'Confidential — Plumber', tier: 'Lift', vertical: 'Plumbing', region: 'Vaughan, ON', mrr: '$2.5K target', color: 'var(--plumb)' },
    { stage: 'PIPELINE', client: '3 referrals from Tim', tier: 'Lift / Embed', vertical: 'Mixed trades', region: 'GTA', mrr: '$15K combined', color: 'var(--mute)' },
    { stage: 'PIPELINE', client: 'GBP outbound — 40 ICPs', tier: 'TBD', vertical: 'Tri-vertical', region: 'Ontario', mrr: '—', color: 'var(--mute)' },
  ];

  return (
    <section id="pipeline" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--hvac)', bottom: '-10%', left: '-5%', opacity: 0.15 }} />

      <div className="px-8 sm:px-16 max-w-7xl mx-auto relative">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-hvac font-semibold uppercase mb-6">In motion</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            5 deals.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute-dark mb-16">
            One signed. Four in motion.
          </h2>
        </Reveal>

        <div className="overflow-x-auto -mx-8 sm:mx-0">
          <table className="w-full min-w-[700px] mx-8 sm:mx-0">
            <thead>
              <tr className="border-b border-divider">
                {['Stage', 'Client', 'Tier', 'Vertical', 'Region', 'MRR'].map((h) => (
                  <th key={h} className="text-left text-[11px] tracking-[0.2em] uppercase font-semibold text-mute pb-4 pr-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-divider/50 hover:bg-ink-soft transition-colors">
                  <td className="py-5 pr-4">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                      <span className="text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: r.color }}>{r.stage}</span>
                    </span>
                  </td>
                  <td className="py-5 pr-4 font-display text-base sm:text-lg tracking-tight">{r.client}</td>
                  <td className="py-5 pr-4 text-sm text-platinum-soft">{r.tier}</td>
                  <td className="py-5 pr-4 text-sm text-platinum-soft">{r.vertical}</td>
                  <td className="py-5 pr-4 text-sm text-mute-dark">{r.region}</td>
                  <td className="py-5 pr-4 font-display text-base sm:text-lg" style={{ color: r.color }}>{r.mrr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Reveal delay={0.5}>
          <p className="mt-8 text-mute text-sm italic">
            Wave 2 closes by Q3 2026. Wave 3 (10 clients) targeted by Q1 2027 once playbook is repeated on HVAC + plumbing verticals.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === Section — Team === */
export function Team() {
  const team = [
    {
      name: 'Jacob Charendoff',
      role: 'CEO · Operator',
      bio: 'Revenue & growth leader. Built and ran multi-million dollar growth engines across SaaS, services, and direct-to-consumer. Turns leaked revenue into predictable, scalable growth.',
      tag: 'EXECUTION',
      color: 'var(--elec)',
      initials: 'JC',
      photo: '/photos/jacob.jpg',
      linkedin: 'https://www.linkedin.com/in/jacob-charendoff/',
    },
    {
      name: 'Richard Roos',
      role: 'Co-Founder · Strategy',
      bio: 'Senior operator with a deep network in Canadian trades, real estate, and field services. Brings the buyer relationships and the credibility from running inside the industry.',
      tag: 'NETWORK',
      color: 'var(--plumb)',
      initials: 'RR',
      photo: '/photos/richard.jpg',
      linkedin: 'https://www.linkedin.com/in/richardroos/',
    },
    {
      name: 'Embedded operators',
      role: '+ specialist bench',
      bio: 'Designers, copywriters, SEO leads, GBP techs. Pulled in per client engagement. Built to scale without bloating fixed cost.',
      tag: 'CAPACITY',
      color: 'var(--hvac)',
      initials: '4+',
      photo: null,
      linkedin: null,
    },
  ];

  return (
    <section id="team" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Who is building this</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-16">
            Two operators.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="bg-paper border border-divider-lt rounded-2xl p-8 h-full flex flex-col">
                {/* Avatar + tag */}
                <div className="flex items-center justify-between mb-6">
                  {t.photo ? (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0" style={{ border: `2px solid ${t.color}60` }}>
                      <Image src={t.photo} alt={t.name} fill className="object-cover" sizes="80px" />
                    </div>
                  ) : (
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center font-display text-2xl tracking-tight"
                      style={{ background: `${t.color}15`, border: `2px solid ${t.color}40`, color: t.color }}
                    >
                      {t.initials}
                    </div>
                  )}
                  <p className="text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: t.color }}>
                    {t.tag}
                  </p>
                </div>
                <h3 className="font-display text-2xl tracking-tight mb-1">{t.name}</h3>
                <p className="text-mute text-sm mb-5">{t.role}</p>
                <p className="text-ink/80 text-sm leading-relaxed mb-6">{t.bio}</p>
                {/* LinkedIn / connect link */}
                {t.linkedin && (
                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase hover:underline"
                    style={{ color: t.color }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Section — Enhanced Ask with raise number + CTA === */
export function AskV2() {
  return (
    <section id="ask" className="relative bg-ink text-white min-h-screen flex items-center justify-center py-32 overflow-hidden">
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

      <div className="relative z-10 text-center px-8 max-w-5xl">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-8">The ask</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-display text-[80px] sm:text-[160px] leading-[0.9] tracking-[-0.05em]">
            $<Counter value={500} duration={2.5} />K
          </h2>
          <p className="text-platinum-soft text-xl sm:text-2xl font-display mt-6">
            Pre-seed. 18 months of runway.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
            {[
              { label: 'Sales + ops', pct: '55%', color: 'var(--elec)' },
              { label: 'Vertical playbooks', pct: '30%', color: 'var(--plumb)' },
              { label: 'Reserve', pct: '15%', color: 'var(--hvac)' },
            ].map((u) => (
              <div key={u.label} className="border-l-2 pl-4" style={{ borderColor: u.color }}>
                <p className="font-display text-3xl tracking-tight" style={{ color: u.color }}>{u.pct}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-mute font-semibold mt-1">{u.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.6}>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://cal.com/jacobcharendoff/staybookt"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-elec hover:bg-elec-light text-ink font-bold px-8 py-4 rounded-xl text-base sm:text-lg transition-all hover:scale-[1.02] shadow-lg shadow-elec/30"
            >
              Book 30 min →
            </a>
            <a
              href="mailto:jacob@staybookt.com"
              className="text-platinum-soft hover:text-white font-display text-lg sm:text-xl transition-colors"
            >
              jacob@staybookt.com
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.8}>
          <div className="mt-24 inline-flex items-center gap-3 text-[11px] tracking-[0.3em] text-mute-dark">
            <span className="w-8 h-px bg-mute-dark" />
            <Wordmark size="sm" onDark />
            <span className="w-8 h-px bg-mute-dark" />
          </div>
          <p className="text-mute text-xs mt-4">Operating layer for regulated trades · Toronto · 2026</p>
        </Reveal>
      </div>
    </section>
  );
}


/* Mini animated Lighthouse-style ring — used inline in TimCase */
function MiniRing({ label, value, color }: { label: string; value: number; color: string }) {
  const ref = useRef<SVGCircleElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          setN(value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  const r = 24;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - n / 100);
  return (
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto">
        <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
          <circle cx="28" cy="28" r={r} stroke="var(--divider-lt)" strokeWidth="4" fill="none" />
          <circle ref={ref} cx="28" cy="28" r={r} stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 0.05s linear' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-base tracking-tight" style={{ color }}>{Math.round(n)}</span>
        </div>
      </div>
      <p className="text-[9px] tracking-[0.15em] uppercase text-mute font-semibold mt-2">{label}</p>
    </div>
  );
}

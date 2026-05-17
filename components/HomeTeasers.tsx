'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Reveal, Counter } from './Sections';

/* ============================================================
 * Homepage teaser components
 * Each one summarizes a sub-page and links to it.
 * Built for skimmers — investor gets the whole pitch in 90 sec.
 * ============================================================ */

/* === Manifesto — the Apple moment =========================== */
export function Manifesto() {
  return (
    <section className="relative bg-cream text-ink py-32 sm:py-48 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-10">
            The thing we want you to understand
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-display text-[40px] sm:text-[80px] leading-[1.02] tracking-[-0.04em]">
            We are not a software company.
            <br />
            <span className="text-mute">We are the operating team</span>
            <br />
            <span className="text-elec">that runs your revenue engine.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-12 text-mute text-base sm:text-lg max-w-2xl leading-relaxed">
            Tools are commodities. Teams are not. Software is the toolkit we use to run the playbook &mdash; it is not the product. The product is the people running it, the cadence they hold, and the system they execute on every client. Every client. Every week.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === Mechanism teaser ====================================== */
export function MechanismTeaser() {
  return (
    <section className="relative bg-ink text-white py-24 overflow-hidden">
      <div className="orb" style={{ width: 400, height: 400, background: 'var(--elec)', top: '20%', right: '-10%', opacity: 0.12 }} />
      <div className="px-8 sm:px-16 max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">The mechanism</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl sm:text-6xl tracking-[-0.04em] leading-tight mb-6">
                One playbook.
                <br />
                Seven stages.
              </h2>
              <p className="text-platinum-soft text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                Find · Capture · Quote · Deliver · Measure · Reputation · Referral &mdash; run by our team, every week, for every client. The <span className="wordmark-gradient">StayBookt</span> OS is how we deliver the same outcome to client #2 or client #100.
              </p>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-3 text-elec font-semibold text-sm hover:gap-4 transition-all border-b border-elec/40 pb-1"
              >
                See the full playbook
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-6">
            <MiniFlywheel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MiniFlywheel() {
  const stages = [
    { name: 'FIND', color: '#06B6D4' },
    { name: 'CAPTURE', color: '#0EA5E9' },
    { name: 'QUOTE', color: '#10B981' },
    { name: 'DELIVER', color: '#059669' },
    { name: 'MEASURE', color: '#14B8A6' },
    { name: 'REPUTATION', color: '#2563EB' },
    { name: 'REFERRAL', color: '#4F46E5' },
  ];
  const size = 380;
  const cx = size / 2;
  const cy = size / 2;
  const r = 130;
  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          <circle cx={cx} cy={cy} r={r + 14} fill="none" stroke="var(--divider)" strokeWidth="1" strokeDasharray="3 8" opacity="0.5" />
        </svg>
      </motion.div>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 w-full h-full">
        {stages.map((s, i) => {
          const angle = -Math.PI / 2 + (i / stages.length) * Math.PI * 2;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return (
            <g key={s.name}>
              <circle cx={x} cy={y} r="6" fill={s.color} />
              <text
                x={cx + (r + 36) * Math.cos(angle)}
                y={cy + (r + 36) * Math.sin(angle)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={s.color}
                fontSize="13"
                fontWeight="700"
                letterSpacing="2"
              >
                {s.name}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="56" fill="#0A0E1A" stroke="var(--divider)" strokeWidth="1" />
        <text x={cx} y={cy - 6} textAnchor="middle" fill="var(--elec)" fontSize="9" fontWeight="700" letterSpacing="3">
          STAYBOOKT
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="white" fontSize="18" fontWeight="700">
          OS
        </text>
      </svg>
    </div>
  );
}

/* === Proof teaser ========================================== */
export function ProofTeaser() {
  return (
    <section className="relative bg-cream text-ink py-24">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink">
              <Image
                src="/photos/IMG_5375.jpg"
                alt="Tim Ciszkowski — Top Choice Electrical"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink/95 via-ink/50 to-transparent text-white">
                <p className="text-xs tracking-[0.25em] text-elec font-semibold uppercase mb-1">Wave 1 · LIVE</p>
                <p className="font-display text-xl">Top Choice Electrical</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-xs tracking-[0.3em] text-plumb font-semibold uppercase mb-6">Receipts</p>
              <h2 className="font-display text-4xl sm:text-6xl tracking-[-0.04em] leading-tight mb-6">
                Tim is the proof.
              </h2>
              <p className="text-ink/75 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                60 days into the engagement. Owner-operator electrician in Newmarket. The playbook ran. The numbers moved. Here&apos;s what happened.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { stat: '0 → 40+', label: 'leads / month', color: 'var(--elec)' },
                  { stat: '–87%', label: 'admin hours', color: 'var(--plumb)' },
                  { stat: '3 → 50+', label: 'reviews / 90d', color: 'var(--hvac)' },
                ].map((s) => (
                  <div key={s.label} className="border-l-2 pl-3" style={{ borderColor: s.color }}>
                    <p className="font-display text-xl tracking-tight" style={{ color: s.color }}>{s.stat}</p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-mute font-semibold mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <Link
                href="/proof"
                className="inline-flex items-center gap-3 text-plumb font-semibold text-sm hover:gap-4 transition-all border-b border-plumb/40 pb-1"
              >
                Read the case study
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === Opportunity teaser ==================================== */
export function OpportunityTeaser() {
  return (
    <section className="relative bg-ink text-white py-24 overflow-hidden">
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--hvac)', top: '10%', left: '-10%', opacity: 0.12 }} />
      <div className="px-8 sm:px-16 max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-6">
            <p className="text-xs tracking-[0.3em] text-hvac font-semibold uppercase mb-6">Market + timing</p>
            <h2 className="font-display text-[80px] sm:text-[140px] leading-none tracking-[-0.06em] mb-4">
              $<Counter value={108} duration={2.5} />M
            </h2>
            <p className="text-platinum text-xl sm:text-2xl font-display tracking-tight">
              Canadian ARR opportunity.
            </p>
          </Reveal>
          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <p className="text-platinum-soft text-base sm:text-lg leading-relaxed mb-6">
                Smart money is rolling up the trades. ServiceTitan IPO. Wrench Group at $3B+. Apollo + Apex consolidating HVAC. The tools layer is funded. The roll-up layer is funded.
              </p>
              <p className="text-white text-lg sm:text-xl font-semibold mb-8 leading-snug">
                The owner-operator still answers the phone himself. That&apos;s our wedge.
              </p>
              <Link
                href="/opportunity"
                className="inline-flex items-center gap-3 text-hvac font-semibold text-sm hover:gap-4 transition-all border-b border-hvac/40 pb-1"
              >
                See the market
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === Economics teaser ====================================== */
export function EconomicsTeaser() {
  const [clients, setClients] = useState(20);
  const arr = clients * 800 * 12; // simplified
  const arrFmt = arr >= 1_000_000 ? `$${(arr / 1_000_000).toFixed(2)}M` : `$${(arr / 1000).toFixed(0)}K`;

  return (
    <section className="relative bg-cream text-ink py-24">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">The math</p>
              <h2 className="font-display text-4xl sm:text-6xl tracking-[-0.04em] leading-tight mb-6">
                Drag the slider.
                <br />
                <span className="text-mute">Watch ARR move.</span>
              </h2>
              <p className="text-ink/70 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
                $99/mo retainer + 10% commission on online leads, 5% step-down after $10K cumulative. Unit economics work at 10 clients. Compounding at 30. Defensible at 100.
              </p>
              <Link
                href="/economics"
                className="inline-flex items-center gap-3 text-elec font-semibold text-sm hover:gap-4 transition-all border-b border-elec/40 pb-1"
              >
                Play with the full model
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-6">
            <div className="bg-paper border border-divider-lt rounded-2xl p-6 sm:p-8">
              <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-2">Active clients</p>
              <p className="font-display text-3xl text-elec tracking-tight mb-4">{clients}</p>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={clients}
                onChange={(e) => setClients(Number(e.target.value))}
                className="w-full h-1.5 rounded-full outline-none cursor-pointer accent-current bg-divider-lt"
                style={{ accentColor: 'var(--elec)' }}
              />
              <div className="mt-6 pt-6 border-t border-divider-lt">
                <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-2">ARR at this client count</p>
                <p className="font-display text-5xl sm:text-6xl text-ink tracking-[-0.04em]">{arrFmt}</p>
                <p className="text-mute text-xs mt-2">Simplified: $800/mo blended × 12 × {clients}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* === Team teaser =========================================== */
export function TeamTeaser() {
  const team = [
    { name: 'Jacob Charendoff', tag: 'EXECUTION', initials: 'JC', color: 'var(--elec)', role: 'Co-Founder', expertise: ['Revenue & Growth', 'Tech', 'GTM'], photo: '/photos/jacob.jpg' },
    { name: 'Richard Roos', tag: 'NETWORK', initials: 'RR', color: 'var(--plumb)', role: 'Co-Founder', expertise: ['Operations', 'Finance', 'BD'], photo: '/photos/richard.jpg' },
  ];
  return (
    <section className="relative bg-ink text-white py-24 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs tracking-[0.3em] text-plumb font-semibold uppercase mb-6">Who is building this</p>
              <h2 className="font-display text-4xl sm:text-6xl tracking-[-0.04em] leading-tight mb-6">
                Two operators.
              </h2>
              <p className="text-platinum-soft text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                Built and ran multi-million-dollar revenue engines across SaaS, services, and trades. Now we&apos;re putting all of it inside one operating team for the businesses that need it most.
              </p>
              <Link
                href="/team"
                className="inline-flex items-center gap-3 text-plumb font-semibold text-sm hover:gap-4 transition-all border-b border-plumb/40 pb-1"
              >
                Meet the founders
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-5">
              {team.map((t) => (
                <div key={t.name} className="bg-ink-soft border border-divider rounded-2xl p-6 flex items-center gap-5">
                  {t.photo ? (
                    <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden" style={{ border: `2px solid ${t.color}60` }}>
                      <Image src={t.photo} alt={t.name} fill className="object-cover" sizes="64px" />
                    </div>
                  ) : (
                    <div
                      className="w-16 h-16 shrink-0 rounded-full flex items-center justify-center font-display text-lg"
                      style={{ background: `${t.color}15`, border: `2px solid ${t.color}40`, color: t.color }}
                    >
                      {t.initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1" style={{ color: t.color }}>
                      {t.tag}
                    </p>
                    <p className="font-display text-lg tracking-tight">{t.name}</p>
                    <p className="text-mute text-xs mt-0.5 mb-2">{t.role}</p>
                    {t.expertise && (
                      <div className="flex flex-wrap gap-1">
                        {t.expertise.map((e) => (
                          <span
                            key={e}
                            className="text-[9px] tracking-wider uppercase font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ background: `${t.color}18`, color: t.color, border: `1px solid ${t.color}40` }}
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* === UpNext — cross-page navigation =========================== */
const PAGE_ORDER = [
  { href: '/how-it-works', label: 'How it works', tagline: 'See the playbook we run, every client, every week.' },
  { href: '/proof', label: 'Proof', tagline: 'Tim Ciszkowski. 60 days in. The numbers, the transformation.' },
  { href: '/opportunity', label: 'Opportunity', tagline: '$108M Canadian TAM. The PE rollup wave that\'s already happening.' },
  { href: '/economics', label: 'Economics', tagline: 'Three lines of revenue. Play with the unit econ slider.' },
  { href: '/team', label: 'Team', tagline: 'Two operators. The people running it.' },
];

export function UpNext({ current }: { current: string }) {
  const currentIdx = PAGE_ORDER.findIndex((p) => p.href === current);
  const next = PAGE_ORDER[(currentIdx + 1) % PAGE_ORDER.length];
  const prev = currentIdx === 0 ? PAGE_ORDER[PAGE_ORDER.length - 1] : PAGE_ORDER[currentIdx - 1];

  return (
    <section className="relative bg-ink text-white py-20 border-t border-divider">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase text-mute font-semibold mb-6">Keep reading</p>
        <div className="grid md:grid-cols-2 gap-5">
          <Link
            href={prev.href}
            className="group bg-ink-soft border border-divider hover:border-elec/40 rounded-2xl p-7 transition-all"
          >
            <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">← Previously</p>
            <h3 className="font-display text-2xl tracking-tight mb-2 group-hover:text-elec transition-colors">{prev.label}</h3>
            <p className="text-platinum-soft text-sm leading-relaxed">{prev.tagline}</p>
          </Link>
          <Link
            href={next.href}
            className="group bg-ink-soft border border-divider hover:border-elec/40 rounded-2xl p-7 transition-all"
          >
            <p className="text-[10px] tracking-[0.25em] uppercase text-elec font-semibold mb-3">Up next →</p>
            <h3 className="font-display text-2xl tracking-tight mb-2 group-hover:text-elec transition-colors">{next.label}</h3>
            <p className="text-platinum-soft text-sm leading-relaxed">{next.tagline}</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* === Footer ================================================ */
export function SiteFooter() {
  return (
    <footer className="bg-ink-deep border-t border-divider text-platinum-soft py-16 px-8 sm:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Link grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="font-display text-base mb-2"><span className="wordmark-gradient">StayBookt</span></p>
            <p className="text-xs text-mute leading-relaxed">
              The embedded ops team for small residential + light-commercial service businesses.
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">The brief</p>
            <ul className="space-y-1.5 text-xs">
              {[
                { href: '/how-it-works', label: 'How it works' },
                { href: '/proof', label: 'Proof' },
                { href: '/opportunity', label: 'Opportunity' },
                { href: '/economics', label: 'Economics' },
                { href: '/team', label: 'Team' },
              ].map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-white">{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">Live client</p>
            <a
              href="https://tce-website-three.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-white inline-flex items-center gap-1.5"
            >
              Top Choice Electrical
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3" />
              </svg>
            </a>
            <p className="text-[10px] text-mute mt-2 leading-relaxed">
              Newmarket, ON · ESA licensed · Wave 1 client since March 2026
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">Contact</p>
            <p className="text-xs">
              <a href="mailto:jacob@staybookt.com" className="hover:text-white">jacob@staybookt.com</a>
            </p>
            <p className="text-xs mt-1 text-mute">Toronto · Ontario · Canada</p>
          </div>
        </div>

        {/* Bottom — legal strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] text-mute tracking-wide">
          <p>© 2026 <span className="wordmark-gradient">StayBookt</span> Inc. · This brief is for accredited investor review only.</p>
          <p>Built in Toronto · Last updated May 2026</p>
        </div>
      </div>
    </footer>
  );
}

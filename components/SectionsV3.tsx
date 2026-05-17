'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Reveal, Counter } from './Sections';

/* ============================================================
 * SectionsV3 — substance pass
 * Pulls from Richard's deck:
 *   - "Making the phone ring so you StayBookt" tagline
 *   - Real pipeline names (Tim, XNL, Janbar, We Fix HVAC)
 *   - Richard's pricing structure (setup + 10% commission step-down)
 *   - Phased roadmap (Ph I/II/III/IV)
 *   - Right-to-win positioning
 *   - Customer journey: FIND → CAPTURE → QUOTE → DELIVER → RETAIN
 * Killer interactive moments:
 *   - BeforeAfterSlider (drag handle)
 *   - LiveTimEmbed (iframe of topchoiceelectrical.ca)
 *   - LighthouseScores (animated SVG donuts)
 *   - UnitEconomics (interactive ARR projection widget)
 * Cuts: VerticalMarquee, rotating Flywheel, abstract 2x2, "Receipts not pitches" meta point
 * ============================================================ */

/* === BEFORE / AFTER DRAG SLIDER ============================== */
export function BeforeAfterTCE() {
  const [pct, setPct] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);

  const onDrag = (clientX: number) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const p = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPct(p);
  };

  useEffect(() => {
    let dragging = false;
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      onDrag(x);
    };
    const onDown = () => { dragging = true; };
    const onUp = () => { dragging = false; };
    const el = wrapRef.current;
    if (!el) return;
    el.addEventListener('mousedown', onDown);
    el.addEventListener('touchstart', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('touchstart', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <section id="before-after" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Drag the handle</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            What 60 days looks like.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute-dark mb-12">
            Same business. Same owner. New operating layer.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            ref={wrapRef}
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-paper border border-divider-lt shadow-2xl"
          >
            {/* AFTER — full image (our build) */}
            <div className="absolute inset-0">
              <img
                src="/photos/tce-after.png"
                alt="Top Choice Electrical — after StayBookt"
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              {/* fallback placeholder block if image missing */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-elec/30 via-ink to-plumb/30 flex items-center justify-center">
                <span className="text-white/30 text-sm tracking-[0.3em]">AFTER — tce-after.png</span>
              </div>
            </div>

            {/* BEFORE — clipped image (the old site) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
            >
              <img
                src="/photos/tce-before.png"
                alt="Top Choice Electrical — before StayBookt"
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-mute/20 via-ink/90 to-mute/30 flex items-center justify-center">
                <span className="text-white/30 text-sm tracking-[0.3em]">BEFORE — tce-before.png</span>
              </div>
            </div>

            {/* Divider line + handle */}
            <div
              className="absolute top-0 bottom-0 w-px bg-white pointer-events-none"
              style={{ left: `${pct}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center pointer-events-none"
              style={{ left: `${pct}%` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#0A0E1A" strokeWidth={2.4} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5l-5 7 5 7M16 5l5 7-5 7" />
              </svg>
            </div>

            {/* Corner labels */}
            <span className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-mute/90 text-white text-[10px] tracking-[0.25em] font-semibold uppercase shadow">
              Before · March 2026
            </span>
            <span className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-elec text-ink text-[10px] tracking-[0.25em] font-semibold uppercase shadow">
              After · May 2026
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {[
              { stat: '0 → 40+', label: 'leads / month', color: 'var(--elec)' },
              { stat: '98 / 99 / 100 / 100', label: 'Lighthouse score', color: 'var(--plumb)' },
              { stat: '< 60 days', label: 'from contract to live', color: 'var(--hvac)' },
            ].map((s) => (
              <div key={s.label} className="border-l-2 pl-5 py-2" style={{ borderColor: s.color }}>
                <p className="font-display text-3xl tracking-[-0.03em]" style={{ color: s.color }}>{s.stat}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-mute font-semibold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* === LIVE TIM SITE EMBED + LIGHTHOUSE ======================= */
export function LiveTimEmbed() {
  const scores = [
    { label: 'Performance', value: 98, color: 'var(--hvac)' },
    { label: 'Accessibility', value: 99, color: 'var(--plumb)' },
    { label: 'Best Practices', value: 100, color: 'var(--elec)' },
    { label: 'SEO', value: 100, color: 'var(--hvac)' },
  ];

  return (
    <section id="live-demo" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Live · not a mockup</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Click around. It&apos;s real.
          </h2>
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-mute mb-12 max-w-3xl">
            Tim&apos;s site is in production at topchoiceelectrical.ca — fielding real calls today.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Live iframe — left 8 cols */}
          <Reveal delay={0.2} className="lg:col-span-8">
            <div className="rounded-2xl overflow-hidden border border-divider-lt shadow-xl bg-paper">
              <div className="flex items-center gap-2 px-4 py-3 bg-ink border-b border-divider">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-platinum-soft text-xs font-mono">topchoiceelectrical.ca</span>
                <a
                  href="https://www.topchoiceelectrical.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-platinum-soft hover:text-white text-xs"
                >
                  Open ↗
                </a>
              </div>
              <iframe
                src="https://www.topchoiceelectrical.ca"
                title="Top Choice Electrical — live"
                className="w-full bg-white"
                style={{ height: '680px' }}
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* Lighthouse donuts — right 4 cols */}
          <Reveal delay={0.35} className="lg:col-span-4">
            <div className="bg-paper border border-divider-lt rounded-2xl p-6">
              <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold mb-1">Google Lighthouse</p>
              <p className="font-display text-lg tracking-tight mb-6 text-ink">Production scores</p>
              <div className="grid grid-cols-2 gap-4">
                {scores.map((s) => (
                  <LighthouseRing key={s.label} {...s} />
                ))}
              </div>
              <p className="text-[11px] text-mute mt-6 italic">
                Run on production URL. Same stack we ship to every client.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LighthouseRing({ label, value, color }: { label: string; value: number; color: string }) {
  const ref = useRef<SVGCircleElement>(null);
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / 1500, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setAnimated(eased * value);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - animated / 100);

  return (
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r={r} stroke="var(--divider-lt)" strokeWidth="4" fill="none" />
          <circle
            ref={ref}
            cx="32"
            cy="32"
            r={r}
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl tracking-tight" style={{ color }}>{Math.round(animated)}</span>
        </div>
      </div>
      <p className="text-[10px] tracking-[0.15em] uppercase text-mute font-semibold mt-2">{label}</p>
    </div>
  );
}

/* === 5-STAGE CUSTOMER JOURNEY (replaces rotating flywheel) === */
export function CustomerJourney() {
  const stages = [
    {
      stage: 'FIND',
      color: 'var(--elec)',
      what: 'SEO + Google Business Profile + paid demand',
      tim: '#1 local pack rank for "Newmarket electrician" in 47 days',
    },
    {
      stage: 'CAPTURE',
      color: 'var(--elec)',
      what: 'Tap-to-call, callback form, missed-call SMS recovery',
      tim: 'After-hours: 38% → 0% to voicemail',
    },
    {
      stage: 'QUOTE',
      color: 'var(--plumb)',
      what: 'On-site quote workflow + automated follow-up cadence',
      tim: '0 stale quotes in 60 days. Avg follow-up: same day.',
    },
    {
      stage: 'DELIVER',
      color: 'var(--plumb)',
      what: 'Scheduling, permits, invoicing, ESA compliance',
      tim: '15 hr/wk on admin → < 2 hr/wk',
    },
    {
      stage: 'RETAIN',
      color: 'var(--hvac)',
      what: 'Review velocity, repeat-customer outreach, referral loops',
      tim: '3 reviews → 50+ targeted in 90 days',
    },
  ];

  return (
    <section id="journey" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="orb" style={{ width: 400, height: 400, background: 'var(--plumb)', top: '20%', right: '-10%', opacity: 0.15 }} />

      <div className="px-8 sm:px-16 max-w-7xl mx-auto relative">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-plumb font-semibold uppercase mb-6">The customer journey</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Find. Capture. Quote.
          </h2>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] text-mute-dark mb-16">
            Deliver. Retain.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-px bg-divider">
          {stages.map((s, i) => (
            <Reveal key={s.stage} delay={i * 0.08}>
              <div className="bg-ink h-full p-6 sm:p-7 hover:bg-ink-soft transition-colors group">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-xs text-mute">0{i + 1}</span>
                  <span className="font-display text-base tracking-[0.2em] font-bold" style={{ color: s.color }}>
                    {s.stage}
                  </span>
                </div>
                <p className="text-platinum text-sm leading-relaxed mb-6 min-h-[3.5rem]">{s.what}</p>
                <div className="pt-5 border-t border-divider/60">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-mute font-semibold mb-1.5">Tim, live</p>
                  <p className="text-sm leading-snug" style={{ color: s.color }}>{s.tim}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6}>
          <p className="mt-10 text-center text-mute text-sm sm:text-base max-w-3xl mx-auto italic">
            Most agencies own one stage. SaaS owns one stage. We own all five — same team, same Slack channel, same weekly report.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === PRICING V2 — RICHARD'S MODEL ============================ */
/* === PricingV3 — the commercial ladder ==========================
 * One service: the StayBookt OS. Three steps to engage:
 *   1. Pilot ($1,500) — low-friction front door, credits to Foundation
 *   2. Foundation ($4,950 one-time) — 4-6 week buildout, 100% money-back before day 90
 *   3. Subscription — Operating Engine ($1,999/mo) OR Operating Layer ($3,499/mo)
 * Plus modifiers: 10% performance kicker (opt-in), 15% annual commit discount.
 * Each tier visually shows which flywheel stages it activates.
 * ============================================================== */
export function PricingV3() {
  const stagesAll = [
    { num: '01', name: 'FIND', color: '#06B6D4' },
    { num: '02', name: 'CAPTURE', color: '#0EA5E9' },
    { num: '03', name: 'QUOTE', color: '#10B981' },
    { num: '04', name: 'DELIVER', color: '#059669' },
    { num: '05', name: 'MEASURE', color: '#14B8A6' },
    { num: '06', name: 'REPUTATION', color: '#2563EB' },
    { num: '07', name: 'REFERRAL', color: '#4F46E5' },
  ];

  return (
    <section id="pricing" className="relative bg-ink text-white py-32 overflow-hidden">
      {/* Atmospheric dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">
            Pricing &amp; revenue model
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[40px] sm:text-[72px] leading-[0.98] tracking-[-0.04em] mb-4">
            One service.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="font-display text-[40px] sm:text-[72px] leading-[0.98] tracking-[-0.04em] text-mute mb-8">
            Two ways to run it.
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-platinum-soft text-base sm:text-lg max-w-2xl leading-relaxed mb-16">
            Pricing is the operating system. Every tier maps directly to flywheel stages activated. Start small, grow into the layer.
          </p>
        </Reveal>

        {/* ============== STEP 1 — The Pilot front door ============== */}
        <Reveal delay={0.35}>
          <div className="mb-6 rounded-2xl border border-elec/40 bg-gradient-to-r from-elec/[0.10] to-transparent p-7 sm:p-9 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, #06B6D4 0%, #10B981 50%, #4F46E5 100%)' }}
            />
            <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-elec mb-3">
                  Step 01 · The Pilot
                </p>
                <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-3">
                  Get in the door for $1,500.
                </h3>
                <p className="text-platinum-soft text-base leading-relaxed max-w-2xl mb-4">
                  A real paid pilot, not a free trial. GBP rebuild + lead-gen audit + 30 days of capture systems live + first content shipped. Audited proof of concept in 30 days.
                </p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-elec font-semibold">
                  → 100% credited toward Foundation if you continue
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-5xl sm:text-6xl tracking-[-0.04em] text-elec">$1,500</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mt-1">
                  one-time · 30 days
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ============== STEP 2 — Foundation onboarding ============== */}
        <Reveal delay={0.4}>
          <div className="mb-12 rounded-2xl border border-divider/60 bg-ink-soft/30 p-7 sm:p-9">
            <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-platinum-soft mb-3">
                  Step 02 · Foundation
                </p>
                <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-3">
                  The 4-6 week buildout.
                </h3>
                <p className="text-platinum-soft text-base leading-relaxed max-w-2xl mb-4">
                  Custom Next.js site, GBP rebuild, full lead capture infrastructure, brand kit, baseline review automation. Activates the systems every subscription tier runs on.
                </p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-platinum-soft font-semibold">
                  → 100% money-back guarantee if cancelled before day 90
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-5xl sm:text-6xl tracking-[-0.04em] text-platinum">$4,950</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mt-1">
                  one-time · 4-6 weeks
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ============== STEP 3 — Subscription tiers ============== */}
        <Reveal delay={0.45}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-mute font-bold mb-6">
            Step 03 · Pick your subscription
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {/* TIER 1 — Operating Engine */}
          <Reveal delay={0.5}>
            <div className="relative rounded-2xl border border-divider/60 bg-ink-soft/30 p-7 sm:p-9 h-full flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-platinum-soft">
                  Tier 01 · Operating Engine
                </p>
                <span className="text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-1 rounded bg-divider/40 text-mute">
                  4 of 7 stages
                </span>
              </div>
              <h3 className="font-display text-3xl tracking-tight leading-tight mb-2">
                Leads, ops, and the front office.
              </h3>
              <div className="flex items-baseline gap-2 mb-5 mt-3">
                <span className="font-display text-5xl tracking-[-0.04em] text-platinum">$1,999</span>
                <span className="text-mute text-sm">/mo</span>
              </div>

              {/* Stage indicator dots */}
              <div className="mb-6">
                <p className="text-[9px] tracking-[0.2em] uppercase font-semibold text-mute mb-3">
                  Flywheel stages active
                </p>
                <div className="flex gap-2">
                  {stagesAll.map((s, i) => {
                    const active = i < 4;
                    return (
                      <div key={s.num} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full h-2 rounded-full mb-1.5"
                          style={{
                            background: active ? s.color : 'transparent',
                            border: active ? 'none' : '1px dashed rgba(148,163,184,0.25)',
                            boxShadow: active ? `0 0 8px ${s.color}77` : 'none',
                          }}
                        />
                        <p
                          className="text-[8px] tracking-[0.15em] uppercase font-bold"
                          style={{ color: active ? s.color : 'rgba(148,163,184,0.4)' }}
                        >
                          {s.name.slice(0, 3)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-mute mb-3">
                What runs every week
              </p>
              <ul className="space-y-2 text-sm text-platinum-soft mb-6 flex-1">
                <li className="flex items-start gap-2"><span className="text-elec mt-1.5">·</span><span>Local SEO + GBP content shipping</span></li>
                <li className="flex items-start gap-2"><span className="text-elec mt-1.5">·</span><span>Missed-call SMS recovery + callback monitoring</span></li>
                <li className="flex items-start gap-2"><span className="text-elec mt-1.5">·</span><span>Quote follow-up cadence (24h / 72h / 7d)</span></li>
                <li className="flex items-start gap-2"><span className="text-elec mt-1.5">·</span><span>Scheduling automation + pre-arrival SMS</span></li>
                <li className="flex items-start gap-2"><span className="text-elec mt-1.5">·</span><span>Invoice tracking</span></li>
              </ul>

              <div className="pt-5 border-t border-divider/40">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-mute mb-2">
                  Target customer
                </p>
                <p className="text-sm text-platinum">$500K-$1.5M revenue · has leads, drowning in ops</p>
                <p className="text-[11px] text-mute italic mt-3">
                  Replaces SEO agency + bookings coordinator. ~60% of combined cost.
                </p>
              </div>
            </div>
          </Reveal>

          {/* TIER 2 — Operating Layer (featured) */}
          <Reveal delay={0.6}>
            <div className="relative rounded-2xl border border-elec/40 bg-gradient-to-b from-elec/[0.10] via-elec/[0.04] to-transparent shadow-[0_24px_60px_-20px_rgba(6,182,212,0.4)] p-7 sm:p-9 h-full flex flex-col md:-translate-y-2">
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #06B6D4 0%, #10B981 25%, #14B8A6 50%, #2563EB 75%, #4F46E5 100%)' }}
              />
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec">
                  Tier 02 · Operating Layer
                </p>
                <span className="text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-1 rounded bg-elec/20 text-elec border border-elec/30">
                  All 7 stages · recommended
                </span>
              </div>
              <h3 className="font-display text-3xl tracking-tight leading-tight mb-2">
                The full embedded operating team.
              </h3>
              <div className="flex items-baseline gap-2 mb-5 mt-3">
                <span className="font-display text-5xl tracking-[-0.04em] text-white">$3,499</span>
                <span className="text-mute text-sm">/mo</span>
              </div>

              {/* Stage indicator dots — all 7 active */}
              <div className="mb-6">
                <p className="text-[9px] tracking-[0.2em] uppercase font-semibold text-elec/80 mb-3">
                  Flywheel stages active
                </p>
                <div className="flex gap-2">
                  {stagesAll.map((s) => (
                    <div key={s.num} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full h-2 rounded-full mb-1.5"
                        style={{
                          background: s.color,
                          boxShadow: `0 0 10px ${s.color}88`,
                        }}
                      />
                      <p
                        className="text-[8px] tracking-[0.15em] uppercase font-bold"
                        style={{ color: s.color }}
                      >
                        {s.name.slice(0, 3)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec/80 mb-3">
                Everything in Tier 1 +
              </p>
              <ul className="space-y-2 text-sm text-platinum mb-6 flex-1">
                <li className="flex items-start gap-2"><span className="text-elec mt-1.5">·</span><span>Monday brief in the owner&apos;s inbox</span></li>
                <li className="flex items-start gap-2"><span className="text-elec mt-1.5">·</span><span>Live KPI dashboard + monthly QBR</span></li>
                <li className="flex items-start gap-2"><span className="text-elec mt-1.5">·</span><span>Review velocity automation + photo case studies</span></li>
                <li className="flex items-start gap-2"><span className="text-elec mt-1.5">·</span><span>Referral incentive program</span></li>
                <li className="flex items-start gap-2"><span className="text-elec mt-1.5">·</span><span>Past-customer database + annual maintenance reminders</span></li>
              </ul>

              <div className="pt-5 border-t border-elec/20">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec mb-2">
                  Target customer
                </p>
                <p className="text-sm text-white">$1M-$3M revenue · ready to break the $1M ceiling</p>
                <p className="text-[11px] text-platinum-soft italic mt-3">
                  Replaces office manager ($60K loaded) + agency + brand consultant. ~50% of combined cost.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ============== Modifiers — performance kicker + annual commit ============== */}
        <Reveal delay={0.7}>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-divider/40 bg-ink-soft/20 p-6">
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-elec mb-3">
                + Performance kicker (opt-in)
              </p>
              <p className="font-display text-xl tracking-tight mb-2">
                10% on online leads above $5K/mo baseline
              </p>
              <p className="text-sm text-platinum-soft leading-relaxed">
                Capped at 50% of base subscription per month. Toggleable per client. Aligns our incentive with their growth without ever feeling predatory.
              </p>
            </div>
            <div className="rounded-2xl border border-divider/40 bg-ink-soft/20 p-6">
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-elec mb-3">
                + Annual commit
              </p>
              <p className="font-display text-xl tracking-tight mb-2">
                15% off when paid annual
              </p>
              <p className="text-sm text-platinum-soft leading-relaxed">
                Cancel anytime on monthly. Lock the rate for a year and save. The moat compounds with time — we reward customers who let it.
              </p>
            </div>
          </div>
        </Reveal>

        {/* The thesis */}
        <Reveal delay={0.8}>
          <div className="mt-14 p-6 rounded-2xl border border-divider/40 bg-ink-soft/20">
            <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">
              The thesis
            </p>
            <p className="text-platinum text-base sm:text-lg leading-relaxed">
              Pricing is the operating system. Each tier maps to flywheel stages activated. Pilot earns the right to Foundation. Foundation earns the right to subscribe. Subscription earns the right to upgrade. <span className="wordmark-gradient">StayBookt</span> isn&apos;t a product menu — it&apos;s a value-delivery arc, priced as one.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* === PHASED ROADMAP (Wave 1 pilot → Wave 2 commercial → scale) ====== */
export function Roadmap() {
  const phases = [
    {
      n: 'I',
      title: 'Wave 1 · Pilot',
      desc: 'Tim Ciszkowski, Top Choice Electrical. No-cost proof-of-system mission. OS calibrated against one real business. Outcomes validated.',
      status: 'COMPLETE',
      statusColor: '#10B981',
      eta: 'Mar–May 2026',
    },
    {
      n: 'II',
      title: 'Wave 2 · Commercial launch',
      desc: 'First 10 paying clients at standard pricing. Pilot → Foundation → Operating Engine conversion funnel proven. ARR forecasted at $200K end-of-year.',
      status: 'LAUNCHING',
      statusColor: '#06B6D4',
      eta: 'Q1 2026',
    },
    {
      n: 'III',
      title: 'Scale + RevOps platform',
      desc: '50 clients cumulative. ARR $1.5M+. Internal RevOps platform replacing duct-tape stack — Phase II software layer ships. ON-wide coverage.',
      status: 'PLANNED',
      statusColor: '#14B8A6',
      eta: 'Year 2 — 2027',
    },
    {
      n: 'IV',
      title: 'NA expansion',
      desc: '150+ clients across CA + US Northeast / Texas. AI layer for predictive scheduling, churn signals. FSM integrations (ServiceTitan, Jobber, Housecall Pro).',
      status: 'PLANNED',
      statusColor: '#4F46E5',
      eta: 'Years 3–5',
    },
  ];

  return (
    <section id="roadmap" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">The roadmap</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-6">
            Pilot. Launch. Scale.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-platinum-soft text-base sm:text-lg max-w-2xl leading-relaxed mb-16">
            Wave 1 was the proof-of-system mission. Wave 2 is commercial launch. The next 18 months get us to a $1.5M ARR base in Canada — and into US expansion prep.
          </p>
        </Reveal>

        <div className="relative">
          {/* horizontal connector line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-divider" />

          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {phases.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.12}>
                <div className="relative">
                  {/* Phase node */}
                  <div className="hidden md:flex w-16 h-16 rounded-full bg-ink border-2 items-center justify-center mb-6 relative z-10" style={{ borderColor: p.statusColor }}>
                    <span className="font-display text-2xl tracking-tight" style={{ color: p.statusColor }}>{p.n}</span>
                  </div>
                  <div className="md:hidden font-display text-2xl tracking-tight mb-3" style={{ color: p.statusColor }}>Phase {p.n}</div>

                  <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-semibold mb-3 px-2 py-1 rounded-full" style={{ background: `${p.statusColor}20`, color: p.statusColor }}>
                    {p.status}
                  </span>
                  <h3 className="font-display text-xl tracking-tight mb-3">{p.title}</h3>
                  <p className="text-platinum-soft text-sm leading-relaxed mb-4">{p.desc}</p>
                  <p className="text-mute text-[11px] tracking-[0.15em] uppercase font-semibold">{p.eta}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* === COMPETITIVE LANDSCAPE — real names, real $$ ============= */
export function CompetitiveLandscapeV2() {
  const rows = [
    { name: 'ServiceTitan', cat: 'Enterprise FSM', traction: '$9.3B market cap (NASDAQ: TTAN)', gap: 'Software only. $400+/mo per tech. Built for $5M+ shops, not $1M owner-ops.', us: false },
    { name: 'Jobber', cat: 'Mid-market FSM', traction: '~$330M raised · 200K+ users', gap: 'Tool, not team. Owner still wears every hat. Conversion to paid loops on training & adoption.', us: false },
    { name: 'Housecall Pro', cat: 'SMB FSM', traction: '$170M+ raised', gap: 'Same SaaS limitation. No content, no SEO, no operating muscle.', us: false },
    { name: 'Local agencies', cat: 'Marketing only', traction: 'Highly fragmented', gap: 'Build a site, hand it over. No FSM. No ops. No accountability beyond month 1.', us: false },
    { name: 'McKinsey / consultants', cat: 'Strategy', traction: 'Out of reach', gap: 'Wrong economics — $400/hr deck-writers, not $5K/mo operators.', us: false },
    { name: 'StayBookt', cat: 'Operating layer', traction: '1 live, 3 in motion, $1B+ NA TAM', gap: 'Wedge: website. Moat: operating team. Compounding: the playbook itself.', us: true },
  ];

  return (
    <section id="competitive" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-plumb font-semibold uppercase mb-6">The field</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            They have software.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-12">
            We have software + the team that runs it.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="overflow-x-auto -mx-8 sm:mx-0">
            <table className="w-full min-w-[800px] mx-8 sm:mx-0">
              <thead>
                <tr className="border-b border-divider-lt">
                  {['Player', 'Category', 'Traction', 'Where they leave the gap'].map((h) => (
                    <th key={h} className="text-left text-[11px] tracking-[0.2em] uppercase font-semibold text-mute pb-4 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} className={`border-b border-divider-lt/60 ${r.us ? 'bg-elec/5' : 'hover:bg-divider-lt/30'} transition-colors`}>
                    <td className="py-5 pr-4">
                      <span className={`font-display text-lg tracking-tight ${r.us ? 'text-elec' : 'text-ink'}`}>
                        {r.us && r.name === 'StayBookt' ? <span className="wordmark-gradient">StayBookt</span> : r.name}
                      </span>
                      {r.us && <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold bg-elec text-ink">Us</span>}
                    </td>
                    <td className="py-5 pr-4 text-sm text-mute">{r.cat}</td>
                    <td className="py-5 pr-4 text-sm text-ink/80">{r.traction}</td>
                    <td className="py-5 pr-4 text-sm text-ink/70 leading-snug">{r.gap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mt-10 text-mute text-sm italic max-w-3xl">
            Richard&apos;s read: &ldquo;There are no pure-play competitors offering our vertically integrated customer journey solution for our ICP. We are in a rare position to set the market.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === TAMBreakdown — the math, side-by-side ====================
 * The big number ($1B+) deserves a breakdown so investors can audit it
 * line by line. Canada vs. United States, with the same ACV applied.
 * Beachhead → expansion framing baked in. Every number references a
 * source in the Sources component below.
 * ================================================================ */
export function TAMBreakdown() {
  const rows = [
    {
      geo: 'Canada',
      tag: 'Beachhead',
      businesses: '~120K',
      icp: '~15K',
      acv: '$9K',
      arr: '~$135M',
      note: 'StatCan NAICS 238 + ICP filter on ON / BC / AB owner-operators under $5M revenue',
      us: false,
    },
    {
      geo: 'United States',
      tag: 'Expansion',
      businesses: '~600K',
      icp: '~80K',
      acv: '$9K',
      arr: '~$720M',
      note: 'US Census SUSB NAICS 238 + ICP filter on residential / light-commercial',
      us: false,
    },
    {
      geo: 'North America',
      tag: 'Total addressable',
      businesses: '~720K',
      icp: '~95K',
      acv: '$9K',
      arr: '$1B+',
      note: 'Combined CA + US trades market. Beachhead Canada → NA expansion over 5–7 years.',
      us: true,
    },
  ];

  return (
    <section className="relative bg-ink text-white py-24 sm:py-32 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-elec font-semibold mb-6">
            The math
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[36px] sm:text-[56px] leading-[1.0] tracking-[-0.04em] max-w-4xl mb-6">
            $1B+ North American ARR.
            <br />
            <span className="text-mute">Audit the line items.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-platinum-soft text-base sm:text-lg max-w-2xl leading-relaxed mb-12 sm:mb-16">
            Trades businesses × ICP-fit owner-operators × $9K average annual contract value. Every number is sourced — citations below.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="overflow-x-auto rounded-2xl border border-divider/40 bg-ink-soft/20">
            <table className="w-full min-w-[820px]">
              <thead>
                <tr className="border-b border-divider/50">
                  {['Geography', 'Trades businesses', 'ICP-fit', 'ACV', 'Serviceable ARR'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] tracking-[0.2em] uppercase font-semibold text-mute px-5 py-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.geo}
                    className={`border-b border-divider/30 ${r.us ? 'bg-elec/[0.06]' : ''}`}
                  >
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-display text-xl ${r.us ? 'text-white' : 'text-platinum'}`}
                        >
                          {r.geo}
                        </span>
                        <span
                          className={`text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-1 rounded ${
                            r.us
                              ? 'bg-elec/20 text-elec border border-elec/30'
                              : 'bg-divider/30 text-mute'
                          }`}
                        >
                          {r.tag}
                        </span>
                      </div>
                      <p className="text-[10px] text-mute-dark font-mono mt-2 max-w-md leading-relaxed">
                        {r.note}
                      </p>
                    </td>
                    <td className={`px-5 py-5 font-mono text-sm ${r.us ? 'text-white' : 'text-platinum-soft'}`}>
                      {r.businesses}
                    </td>
                    <td className={`px-5 py-5 font-mono text-sm ${r.us ? 'text-white' : 'text-platinum-soft'}`}>
                      {r.icp}
                    </td>
                    <td className={`px-5 py-5 font-mono text-sm ${r.us ? 'text-white' : 'text-platinum-soft'}`}>
                      {r.acv}
                    </td>
                    <td className="px-5 py-5">
                      <span
                        className={`font-display text-2xl tracking-tight ${
                          r.us ? 'text-elec' : 'text-platinum'
                        }`}
                      >
                        {r.arr}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mt-10 text-mute text-sm italic max-w-3xl">
            Honest caveat: TAM is the opportunity, not the plan. Year-1 traction is ON. Year-2 expansion is the rest of Canada. Year-3+ is US Northeast and Texas. NA-wide is the 5–7 year arc.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === Sources — citation row for every claim on /opportunity ====
 * Investors who care will read this. Investors who don't will at
 * least see that we cared enough to put it on the page.
 * ============================================================== */
export function Sources() {
  const sources = [
    {
      id: '01',
      claim: 'Canadian trades business counts',
      citation: 'Statistics Canada — Canadian Business Register, NAICS 238 (Specialty Trade Contractors)',
      url: 'https://www150.statcan.gc.ca/n1/en/catalogue/33-10-0036-01',
    },
    {
      id: '02',
      claim: 'US trades business counts',
      citation: 'US Census Bureau — Statistics of U.S. Businesses (SUSB), NAICS 238',
      url: 'https://www.census.gov/programs-surveys/susb.html',
    },
    {
      id: '03',
      claim: 'Industry sizing benchmarks',
      citation: 'ServiceTitan S-1 (Dec 2024) — total addressable market for trades software',
      url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001638833',
    },
    {
      id: '04',
      claim: 'StayBookt $9K ACV',
      citation: 'Internal pricing model — $99/mo retainer × 12 + 10% commission on online lead value (projected to ICP average)',
      url: null,
    },
    {
      id: '05',
      claim: 'PE consolidation & roll-up activity',
      citation: 'Apollo + Apex (HVAC roll-up, 2023); Wrench Group ($3B+ revenue); ServiceTitan IPO ($9.3B market cap, Dec 2024)',
      url: null,
    },
  ];

  return (
    <section className="relative bg-ink-deep text-white py-20 sm:py-24 border-t border-divider/40">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-mute font-semibold mb-6">
            Sources &amp; citations
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight mb-10 max-w-3xl">
            Every number on this page is sourced.
          </h2>
        </Reveal>

        <div className="space-y-4">
          {sources.map((s, i) => (
            <Reveal key={s.id} delay={0.15 + i * 0.05}>
              <div className="grid grid-cols-[40px_220px_1fr] gap-4 sm:gap-6 items-start py-4 border-b border-divider/30 last:border-b-0">
                <p className="font-mono text-[10px] text-mute pt-1">{s.id}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase font-bold text-platinum-soft pt-1">
                  {s.claim}
                </p>
                <div>
                  <p className="text-sm text-platinum-soft leading-relaxed">{s.citation}</p>
                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-elec hover:text-elec-light mt-2 transition-colors"
                    >
                      <span>Verify source</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6}>
          <p className="mt-12 text-mute text-xs italic max-w-3xl">
            All TAM estimates are honest projections, not paid market research. We&apos;d rather show our math than pretend the number came from McKinsey. If any of these references look thin to you, we&apos;d love to hear what data source would.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === MOAT — three theses for why we compound ====================
 * Closes /opportunity. Frames defensibility as a forward-looking thesis
 * (compounding moats), not a defensive backward-looking claim. At pre-seed
 * the strongest moat story is "here's how the moat builds with every client."
 * ================================================================ */
export function Moat() {
  const theses = [
    {
      num: '01',
      title: 'Switching cost compounds with embedment',
      lede: 'Every week a client runs inside StayBookt, more of their revenue engine lives in our hands.',
      detail:
        'Their site, CRM, review pipeline, Monday brief, and Friday cadence are all ours. Replacing us means rebuilding all of it — and rebuilding the team that runs it. The longer they stay, the higher the cost of leaving.',
      color: '#06B6D4',
    },
    {
      num: '02',
      title: 'The hybrid is structurally hard to copy',
      lede: 'Software companies can\'t operate. Agencies can\'t ship software. We do both.',
      detail:
        'Jobber will not pivot to embedded services — their margin model can\'t support it. Agencies can\'t hold a 7-stage software product roadmap. The hybrid requires patience, operating discipline, and a willingness to ship slower than pure SaaS. Most competitors structurally can\'t.',
      color: '#10B981',
    },
    {
      num: '03',
      title: 'The playbook gets sharper with every client',
      lede: 'By client 30, our 7-stage OS is calibrated against 30 real businesses. New entrants start at zero.',
      detail:
        'Every Monday brief, every missed-call recovery, every quote-to-booking ratio refines the playbook for client N+1. A competitor starting today faces the same learning curve we already paid for — and we keep extending it. Operating data compounds in ways pure software can\'t.',
      color: '#4F46E5',
    },
  ];

  return (
    <section className="relative bg-ink text-white py-32 sm:py-40 overflow-hidden">
      {/* Atmospheric dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-elec font-semibold mb-6">
            Defensibility
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[40px] sm:text-[72px] leading-[0.98] tracking-[-0.04em] max-w-4xl mb-6">
            Why we compound.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-platinum-soft text-base sm:text-lg max-w-2xl leading-relaxed mb-16 sm:mb-20">
            At pre-seed, a moat is a thesis about how defensibility builds — not a wall we&apos;ve already built. Three theses, each compounding with every client we run.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {theses.map((t, i) => (
            <Reveal key={t.num} delay={0.3 + i * 0.1}>
              <div className="relative rounded-2xl border border-divider/60 bg-ink-soft/30 p-7 sm:p-8 h-full overflow-hidden">
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: t.color, opacity: 0.7 }}
                />
                {/* Giant editorial numeral */}
                <div
                  className="absolute -top-4 -right-2 font-display text-[160px] sm:text-[200px] leading-none tracking-[-0.06em] pointer-events-none select-none"
                  style={{ color: `${t.color}11` }}
                  aria-hidden="true"
                >
                  {t.num}
                </div>

                <div className="relative">
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase font-bold mb-5"
                    style={{ color: t.color }}
                  >
                    Thesis · {t.num}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight mb-4">
                    {t.title}
                  </h3>
                  <p className="text-platinum text-base leading-snug mb-5 font-semibold">
                    {t.lede}
                  </p>
                  <p className="text-platinum-soft text-sm leading-relaxed">
                    {t.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.7}>
          <p className="mt-14 text-center text-mute text-sm italic max-w-3xl mx-auto">
            None of these moats exist at one client. All three compound from client two onward. The raise buys us the runway to reach client thirty — where the moat becomes visible.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === MARKET + WHY NOW (PE rollup context) ==================== */
export function WhyNow() {
  const movers = [
    { name: 'ServiceTitan', detail: 'IPO Dec 2024 · $9.3B mkt cap', vibe: 'Enterprise FSM goes public' },
    { name: 'Wrench Group', detail: 'Leonard Green PE rollup · 50+ acquisitions', vibe: 'PE consolidating HVAC + plumbing' },
    { name: 'Apollo + Apex Service Partners', detail: 'Multi-billion HVAC/plumbing platform', vibe: 'Same playbook, bigger trades' },
    { name: 'Jobber + Housecall Pro', detail: '$500M+ combined raised', vibe: 'Tooling layer well-funded — operating layer wide open' },
  ];

  return (
    <section id="why-now" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--hvac)', top: '10%', left: '-10%', opacity: 0.18 }} />
      <div className="orb" style={{ width: 400, height: 400, background: 'var(--plumb)', bottom: '0%', right: '-5%', opacity: 0.15 }} />

      <div className="px-8 sm:px-16 max-w-7xl mx-auto relative">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-hvac font-semibold uppercase mb-6">Market + timing</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[80px] sm:text-[180px] leading-none tracking-[-0.06em] mb-4">
            $<Counter value={108} duration={2.5} />M
          </h2>
          <p className="text-platinum-soft text-2xl sm:text-3xl font-display tracking-tight mb-2">
            Canadian ARR opportunity.
          </p>
          <p className="text-mute text-sm sm:text-base max-w-2xl">
            1.8M residential + light commercial service businesses · 1% penetration · $500/mo blended revenue.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-20 mb-10">
            <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-3">Why now</p>
            <h3 className="font-display text-3xl sm:text-5xl tracking-[-0.03em] max-w-3xl">
              Smart money is consolidating trades. They&apos;re missing the operating layer.
            </h3>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {movers.map((m, i) => (
            <Reveal key={m.name} delay={0.5 + i * 0.08}>
              <div className="border-l-2 border-elec/60 pl-5 py-2">
                <p className="font-display text-xl tracking-tight mb-1">{m.name}</p>
                <p className="text-elec text-sm font-semibold mb-2">{m.detail}</p>
                <p className="text-platinum-soft text-sm leading-snug">{m.vibe}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1}>
          <p className="mt-12 text-platinum text-base sm:text-lg leading-relaxed max-w-3xl">
            Tools layer is funded. Roll-up layer is funded. The owner-operator still wakes up at 7am and answers the phone himself. That&apos;s our wedge.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === PIPELINE V2 — REAL NAMES ================================ */
export function PipelineV2() {
  const rows = [
    { stage: 'LIVE', client: 'Top Choice Electrical', region: 'Newmarket, ON', vertical: 'Electrical', tier: 'Website + maint.', mrr: '$99 + 10%', color: 'var(--hvac)' },
    { stage: 'IN BUILD', client: 'XNL HR & Consulting', region: 'Ontario', vertical: 'HR / professional services', tier: 'Website Ph I', mrr: 'TBD', color: 'var(--elec)' },
    { stage: 'EARLY', client: 'Janbar Electric', region: 'Ontario', vertical: 'Electrical', tier: 'Discussion', mrr: 'TBD', color: 'var(--plumb)' },
    { stage: 'EARLY', client: 'We Fix HVAC', region: 'Ontario', vertical: 'HVAC', tier: 'Discussion', mrr: 'TBD', color: 'var(--plumb)' },
    { stage: 'OUTBOUND', client: 'LinkedIn campaign + referral mining', region: 'Canada', vertical: 'Tri-vertical', tier: 'Top-of-funnel', mrr: '—', color: 'var(--mute)' },
  ];

  return (
    <section id="pipeline-v2" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">In motion · May 2026</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            1 live. 1 in build.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-12">
            2 in conversation. Outbound on.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="overflow-x-auto -mx-8 sm:mx-0">
            <table className="w-full min-w-[700px] mx-8 sm:mx-0">
              <thead>
                <tr className="border-b border-divider-lt">
                  {['Stage', 'Client', 'Region', 'Vertical', 'Scope', 'MRR'].map((h) => (
                    <th key={h} className="text-left text-[11px] tracking-[0.2em] uppercase font-semibold text-mute pb-4 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-divider-lt/60 hover:bg-divider-lt/20 transition-colors">
                    <td className="py-5 pr-4">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                        <span className="text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: r.color }}>{r.stage}</span>
                      </span>
                    </td>
                    <td className="py-5 pr-4 font-display text-lg tracking-tight">{r.client}</td>
                    <td className="py-5 pr-4 text-sm text-mute">{r.region}</td>
                    <td className="py-5 pr-4 text-sm text-ink/80">{r.vertical}</td>
                    <td className="py-5 pr-4 text-sm text-ink/80">{r.tier}</td>
                    <td className="py-5 pr-4 font-display text-base" style={{ color: r.color }}>{r.mrr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* === UNIT ECONOMICS — INTERACTIVE WIDGET ===================== */
export function UnitEconomics() {
  const [clients, setClients] = useState(30);
  const [tier2Mix, setTier2Mix] = useState(30); // % of clients on Operating Layer (Tier 2)
  const [kickerOptIn, setKickerOptIn] = useState(40); // % of clients who opt in to performance kicker
  const [annualMix, setAnnualMix] = useState(50); // % of clients on annual commit

  // Fixed pricing
  const TIER1_MONTHLY = 1999;
  const TIER2_MONTHLY = 3499;
  const FOUNDATION_FEE = 4950;
  const ANNUAL_DISCOUNT = 0.15;
  // Kicker assumption: $1.5K avg monthly kicker (between baseline and 50% cap)
  const AVG_KICKER_MONTHLY = 1500;

  const tier1Count = Math.round(clients * (1 - tier2Mix / 100));
  const tier2Count = clients - tier1Count;

  // Effective monthly per tier (factoring annual commit discount on the % that took it)
  const annualFactor = 1 - (annualMix / 100) * ANNUAL_DISCOUNT;
  const tier1Effective = TIER1_MONTHLY * annualFactor;
  const tier2Effective = TIER2_MONTHLY * annualFactor;

  // Base subscription ARR
  const subscriptionARR = (tier1Count * tier1Effective + tier2Count * tier2Effective) * 12;
  // Kicker revenue (40% of clients, $1.5K/mo avg)
  const kickerARR = clients * (kickerOptIn / 100) * AVG_KICKER_MONTHLY * 12;
  // Foundation revenue (assume all clients pay it in year)
  const foundationRevenue = clients * FOUNDATION_FEE;

  const totalARR = subscriptionARR + kickerARR;
  const year1Total = totalARR + foundationRevenue;

  const fmt = (n: number) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n / 1000)}K`;

  const blendedARPU = totalARR / Math.max(clients, 1);

  return (
    <section id="unit-econ" className="relative bg-ink text-white py-32 overflow-hidden">
      {/* Atmospheric dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">
            Unit economics · drag the sliders
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Run the math.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-mute mb-16">
            Watch ARR move with client count, tier mix, and kicker adoption.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Sliders */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="space-y-8">
              <Slider
                label="Total active clients"
                value={clients}
                min={5}
                max={200}
                step={5}
                suffix=" clients"
                onChange={setClients}
                color="#06B6D4"
              />
              <Slider
                label="% on Operating Layer (Tier 2, $3,499/mo)"
                value={tier2Mix}
                min={0}
                max={100}
                step={5}
                suffix="%"
                onChange={setTier2Mix}
                color="#4F46E5"
              />
              <Slider
                label="% opted into performance kicker"
                value={kickerOptIn}
                min={0}
                max={100}
                step={5}
                suffix="%"
                onChange={setKickerOptIn}
                color="#10B981"
              />
              <Slider
                label="% on annual commit (15% discount)"
                value={annualMix}
                min={0}
                max={100}
                step={5}
                suffix="%"
                onChange={setAnnualMix}
                color="#14B8A6"
              />
            </div>
          </Reveal>

          {/* Live result */}
          <Reveal delay={0.4} className="lg:col-span-5">
            <div className="bg-ink-soft border border-divider rounded-2xl p-8 sticky top-24">
              <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">
                Annual recurring revenue
              </p>
              <p className="font-display text-6xl sm:text-7xl tracking-[-0.04em] text-elec mb-2">
                {fmt(totalARR)}
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-mute font-semibold mb-6">
                + {fmt(foundationRevenue)} one-time foundation revenue
              </p>

              <div className="space-y-3 pt-6 border-t border-divider">
                <Row label="Tier 1 clients (Operating Engine)" value={`${tier1Count}`} />
                <Row label="Tier 2 clients (Operating Layer)" value={`${tier2Count}`} />
                <Row label="Subscription ARR" value={fmt(subscriptionARR)} />
                <Row label="Performance kicker ARR" value={fmt(kickerARR)} />
                <Row label="Blended ARPU" value={`$${Math.round(blendedARPU / 1000)}K/yr`} />
              </div>

              <div className="mt-6 pt-6 border-t border-divider">
                <p className="text-[10px] tracking-[0.25em] uppercase text-elec font-bold mb-2">
                  Year-1 total revenue
                </p>
                <p className="font-display text-3xl tracking-tight text-white">
                  {fmt(year1Total)}
                </p>
                <p className="text-[10px] text-mute italic mt-1">
                  Subscription ARR + kicker + one-time Foundation fees
                </p>
              </div>

              <p className="text-mute text-xs mt-6 italic leading-relaxed">
                Assumptions: $1,999 Tier 1, $3,499 Tier 2, $4,950 Foundation per client. Performance kicker estimated at $1.5K/mo per opt-in client (between baseline and 50% cap). Annual commit applies 15% discount to subscription revenue only.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label, value, min, max, step, prefix = '', suffix = '', onChange, color,
}: {
  label: string; value: number; min: number; max: number; step: number;
  prefix?: string; suffix?: string; onChange: (n: number) => void; color: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3 gap-4">
        <label className="text-platinum-soft text-sm leading-snug">{label}</label>
        <span className="font-display text-2xl tracking-tight whitespace-nowrap" style={{ color }}>
          {prefix}{value.toLocaleString()}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none bg-divider h-1.5 rounded-full outline-none cursor-pointer accent-current"
        style={{ accentColor: color }}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-mute text-sm">{label}</span>
      <span className="font-mono text-platinum text-sm">{value}</span>
    </div>
  );
}


/* === SIDE-BY-SIDE LIVE SCROLL COMPARISON ===================== */
/* Both sites in iframes, CSS-translateY animation cycles them
   from top of page to bottom and back, sync'd. B&W by default,
   color on hover. */
export function SideBySideTCE() {
  return (
    <section id="before-after" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Before · after</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            What 60 days looks like.
          </h2>
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-mute-dark mb-12">
            Same business. Same owner. New front door.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid md:grid-cols-2 gap-5 lg:gap-8">
            <SiteFrame
              label="Before · the old site"
              tag="topchoiceelectrical.com"
              url="https://www.topchoiceelectrical.com/"
              isOld
            />
            <SiteFrame
              label="After · StayBookt"
              tag="topchoiceelectrical.ca"
              url="https://tce-website-three.vercel.app/"
            />
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {[
              { stat: '0 → 40+', label: 'leads / month', color: 'var(--elec)' },
              { stat: '98 / 99 / 100 / 100', label: 'Lighthouse score', color: 'var(--plumb)' },
              { stat: '< 60 days', label: 'from contract to live', color: 'var(--hvac)' },
            ].map((s) => (
              <div key={s.label} className="border-l-2 pl-5 py-2" style={{ borderColor: s.color }}>
                <p className="font-display text-3xl tracking-[-0.03em]" style={{ color: s.color }}>{s.stat}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-mute font-semibold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mt-8 text-center text-mute text-xs tracking-[0.2em] uppercase font-semibold">
            Hover any frame to pause &nbsp;·&nbsp; click to open in a new tab
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SiteFrame({ label, tag, url, isOld = false }: { label: string; tag: string; url: string; isOld?: boolean }) {
  const [hover, setHover] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.48);

  // The iframe renders at 1440 width. We scale it down to fit the column.
  // Responsive scale: measure container width, scale iframe to fit.
  const iframeNaturalWidth = 1440;
  const iframeNaturalHeight = 5200;
  const visibleHeight = 580;
  const travel = -(iframeNaturalHeight - visibleHeight / scale) * scale;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      // Scale iframe natural width to fit container, capped at 0.48
      const s = Math.min(0.48, w / iframeNaturalWidth);
      setScale(s);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Label strip above */}
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: isOld ? 'var(--mute)' : 'var(--elec)' }}>
          {label.split('StayBookt').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="wordmark-gradient">StayBookt</span>}
            </span>
          ))}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-mute hover:text-white font-mono inline-flex items-center gap-1.5"
        >
          {tag}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3M5 7h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
          </svg>
        </a>
      </div>

      {/* Browser-frame container */}
      <div ref={wrapRef} className="rounded-2xl overflow-hidden border border-divider bg-paper shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 bg-ink/95 border-b border-divider">
          <span className="w-2 h-2 rounded-full bg-red-500/80" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <span className="w-2 h-2 rounded-full bg-green-500/80" />
          <span className="ml-3 text-[10px] text-mute font-mono truncate">{url}</span>
        </div>

        {/* Cropped viewport with auto-scrolling iframe */}
        <div
          className="relative overflow-hidden bg-paper"
          style={{
            height: visibleHeight,
            filter: hover ? 'grayscale(0)' : 'grayscale(0.55) contrast(0.95)',
            transition: 'filter 0.5s ease',
          }}
        >
          <motion.div
            animate={hover ? { y: 0 } : { y: [0, travel, travel, 0, 0] }}
            transition={{
              duration: 32,
              repeat: hover ? 0 : Infinity,
              ease: 'linear',
              times: [0, 0.45, 0.5, 0.95, 1],
            }}
            style={{
              width: iframeNaturalWidth,
              height: iframeNaturalHeight,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <iframe
              src={url}
              title={label}
              style={{
                width: iframeNaturalWidth,
                height: iframeNaturalHeight,
                border: 'none',
                pointerEvents: 'none',
              }}
              loading="lazy"
            />
          </motion.div>

          {/* Click overlay to open in new tab */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`Open ${tag} in new tab`}
          />
        </div>
      </div>
    </div>
  );
}

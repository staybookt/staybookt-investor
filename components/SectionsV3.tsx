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
export function PricingV3() {
  return (
    <section id="pricing-v3" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Revenue model</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Three lines of revenue.
          </h2>
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-mute mb-16">
            Setup. Recurring. Growth share.
          </h2>
        </Reveal>

        {/* Wedge / Moat / Fund stack visual */}
        <Reveal delay={0.15}>
          <div className="mb-12 grid lg:grid-cols-3 gap-3 bg-paper border border-divider-lt rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-elec/5 border border-elec/30">
              <div className="w-12 h-12 rounded-lg bg-elec/20 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--elec)" strokeWidth={2} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec mb-1">Wedge</p>
                <p className="font-display text-base text-ink">Website</p>
                <p className="text-xs text-mute leading-snug">Cheap. Fast. Instant value. They’re in.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-plumb/5 border border-plumb/30">
              <div className="w-12 h-12 rounded-lg bg-plumb/20 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--plumb)" strokeWidth={2} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-plumb mb-1">Moat</p>
                <p className="font-display text-base text-ink">Software</p>
                <p className="text-xs text-mute leading-snug">Their book lives here. Switching cost: vertical.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-hvac/5 border border-hvac/30">
              <div className="w-12 h-12 rounded-lg bg-hvac/20 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--hvac)" strokeWidth={2} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-hvac mb-1">Fund</p>
                <p className="font-display text-base text-ink">Consulting</p>
                <p className="text-xs text-mute leading-snug">High-touch. Funds growth. Seeds next 10 clients.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Website */}
          <Reveal delay={0.1}>
            <div className="bg-paper border border-divider-lt rounded-2xl p-8 h-full flex flex-col">
              <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-3 text-elec">Website</p>
              <p className="font-display text-3xl tracking-tight mb-5">Custom build · we host</p>
              <ul className="space-y-3 text-sm flex-1 mb-6">
                <li className="flex items-baseline gap-3"><span className="font-mono text-elec shrink-0 w-20">$2,500</span><span>creation fee</span></li>
                <li className="flex items-baseline gap-3"><span className="font-mono text-elec shrink-0 w-20">10%</span><span>commission on online leads (net of creation fee)</span></li>
                <li className="flex items-baseline gap-3"><span className="font-mono text-elec shrink-0 w-20">5%</span><span>step-down after $10K in cumulative fees</span></li>
                <li className="flex items-baseline gap-3"><span className="font-mono text-elec shrink-0 w-20">$99/mo</span><span>SEO + maintenance</span></li>
              </ul>
              <p className="text-[11px] tracking-[0.2em] uppercase text-mute font-semibold">→ Tim is here</p>
            </div>
          </Reveal>

          {/* Software — featured */}
          <Reveal delay={0.2}>
            <div className="bg-ink text-white rounded-2xl p-8 h-full flex flex-col shadow-2xl scale-[1.02] relative">
              <span className="absolute -top-3 left-8 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] font-semibold uppercase bg-plumb text-white">
                Largest line · in build
              </span>
              <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-3 text-plumb">Software</p>
              <p className="font-display text-3xl tracking-tight mb-5">RevOps platform</p>
              <ul className="space-y-3 text-sm flex-1 mb-6">
                <li className="flex items-baseline gap-3"><span className="font-mono text-plumb shrink-0 w-20">$199/mo</span><span>Core</span></li>
                <li className="flex items-baseline gap-3"><span className="font-mono text-plumb shrink-0 w-20">$299/mo</span><span>Core+</span></li>
                <li className="flex items-baseline gap-3"><span className="font-mono text-plumb shrink-0 w-20">$349/mo</span><span>Premium</span></li>
                <li className="flex items-baseline gap-3"><span className="font-mono text-plumb shrink-0 w-20">+$69/mo</span><span>Lead-gen optimization add-on</span></li>
              </ul>
              <p className="text-[11px] tracking-[0.2em] uppercase text-plumb font-semibold">→ Phase II — funding plan in progress</p>
            </div>
          </Reveal>

          {/* Consulting */}
          <Reveal delay={0.3}>
            <div className="bg-paper border border-divider-lt rounded-2xl p-8 h-full flex flex-col">
              <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-3 text-hvac">Consulting</p>
              <p className="font-display text-3xl tracking-tight mb-5">Fractional CRO + ops</p>
              <ul className="space-y-3 text-sm flex-1 mb-6">
                <li className="flex items-baseline gap-3"><span className="font-mono text-hvac shrink-0 w-20">Per-engagement</span></li>
                <li className="flex items-baseline gap-3"><span className="text-mute">Revenue operations</span></li>
                <li className="flex items-baseline gap-3"><span className="text-mute">Growth strategy + acquisition</span></li>
                <li className="flex items-baseline gap-3"><span className="text-mute">HR / hiring playbook</span></li>
              </ul>
              <p className="text-[11px] tracking-[0.2em] uppercase text-mute font-semibold">→ High-touch, low volume</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.5}>
          <div className="mt-12 p-6 bg-paper border border-divider-lt rounded-xl">
            <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">The thesis</p>
            <p className="text-ink text-base sm:text-lg leading-relaxed">
              Website is the wedge — cheap to ship, immediate value, sticky. Software is the moat — once they run their book inside StayBookt, switching cost goes vertical. Consulting funds growth without burning runway and seeds the next 10 clients.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* === PHASED ROADMAP (Ph I/II/III/IV) ========================= */
export function Roadmap() {
  const phases = [
    {
      n: 'I',
      title: 'White-label website',
      desc: 'Cheap-to-ship, instant-value wedge. Tim is the proof. 3 more in Wave 2.',
      status: 'LIVE',
      statusColor: 'var(--hvac)',
      eta: 'Shipped May 2026',
    },
    {
      n: 'II',
      title: 'RevOps software · core',
      desc: 'Lead-to-project workflow. QuickBooks integration. Funding plan in motion.',
      status: 'IN BUILD',
      statusColor: 'var(--elec)',
      eta: 'Q4 2026 target',
    },
    {
      n: 'III',
      title: 'AI + analytics layer',
      desc: 'Predictive scheduling, churn signals, automated reporting, intelligent routing.',
      status: 'PLANNED',
      statusColor: 'var(--plumb)',
      eta: '2027',
    },
    {
      n: 'IV',
      title: 'FSM integrations',
      desc: 'ServiceTitan (enterprise) + a mid-market FSM. We absorb their workflow, keep the customer.',
      status: 'PLANNED',
      statusColor: 'var(--mute)',
      eta: '2027–2028',
    },
  ];

  return (
    <section id="roadmap" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Product roadmap</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-16">
            Four phases.
          </h2>
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
    { name: 'StayBookt', cat: 'Operating layer', traction: '1 live, 3 in motion, $135M Canadian TAM', gap: 'Wedge: website. Moat: RevOps software. Lock: embedded team.', us: true },
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
                      <span className={`font-display text-lg tracking-tight ${r.us ? 'text-elec' : 'text-ink'}`}>{r.name}</span>
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
  const [clients, setClients] = useState(20);
  const [monthly, setMonthly] = useState(300);
  const [commission, setCommission] = useState(10);
  const [growthLift, setGrowthLift] = useState(5000); // avg new revenue lifted per client per month

  // Math: monthly retainer + (commission % × growth lift)
  const perClientMonthly = monthly + (commission / 100) * growthLift;
  const arr = perClientMonthly * 12 * clients;
  const arrFormatted = arr >= 1_000_000
    ? `$${(arr / 1_000_000).toFixed(2)}M`
    : `$${(arr / 1000).toFixed(0)}K`;

  return (
    <section id="unit-econ" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--elec)', bottom: '-15%', right: '-10%', opacity: 0.15 }} />

      <div className="px-8 sm:px-16 max-w-7xl mx-auto relative">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Unit economics · play with it</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Run the math.
          </h2>
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-mute-dark mb-16">
            Drag the sliders. Watch ARR move.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Sliders — left */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="space-y-8">
              <Slider label="Active clients" value={clients} min={1} max={100} step={1} suffix=" clients" onChange={setClients} color="var(--elec)" />
              <Slider label="Monthly retainer per client" value={monthly} min={99} max={1500} step={25} prefix="$" suffix="/mo" onChange={setMonthly} color="var(--plumb)" />
              <Slider label="Commission on online leads" value={commission} min={0} max={15} step={1} suffix="%" onChange={setCommission} color="var(--hvac)" />
              <Slider label="Growth lift per client (new monthly revenue we generate for them)" value={growthLift} min={1000} max={20000} step={500} prefix="$" suffix="/mo" onChange={setGrowthLift} color="var(--elec)" />
            </div>
          </Reveal>

          {/* Live result — right */}
          <Reveal delay={0.4} className="lg:col-span-5">
            <div className="bg-ink-soft border border-divider rounded-2xl p-8 sticky top-24">
              <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">Annual recurring revenue</p>
              <p className="font-display text-6xl sm:text-7xl tracking-[-0.04em] text-elec mb-6">{arrFormatted}</p>

              <div className="space-y-3 pt-6 border-t border-divider">
                <Row label="Per-client monthly (retainer + commission share)" value={`$${Math.round(perClientMonthly).toLocaleString()}/mo`} />
                <Row label="Per-client annual" value={`$${Math.round(perClientMonthly * 12).toLocaleString()}/yr`} />
                <Row label="Clients × annual" value={`${clients} × $${Math.round(perClientMonthly * 12).toLocaleString()}`} />
              </div>

              <p className="text-mute text-xs mt-6 italic">
                Assumes commission is paid on the growth lift only. Real Tim contract: $99/mo + 10% on online leads with 5% step-down after $10K cumulative.
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

  // The iframe renders at 1440 width. We scale it down to fit the column.
  // The iframe is 5000px tall — we animate translateY upward to scroll it,
  // then back down, in a loop. CSS transform-only (works cross-origin).
  const iframeNaturalWidth = 1440;
  const iframeNaturalHeight = 5200;
  const scale = 0.48; // scale to fit ~600px column at full screen
  const visibleHeight = 580;
  const travel = -(iframeNaturalHeight - visibleHeight / scale) * scale;

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Label strip above */}
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: isOld ? 'var(--mute)' : 'var(--elec)' }}>
          {label}
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
      <div className="rounded-2xl overflow-hidden border border-divider bg-paper shadow-2xl">
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

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/* Concept dashboard for the "What's next" section. Numbers are ILLUSTRATIVE
 * and clearly labelled as a concept preview — not real client data. */

function Counter({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

const TILES = [
  { label: 'New leads', value: 23, prefix: '', suffix: '', note: 'this week' },
  { label: 'Booked jobs', value: 14, prefix: '', suffix: '', note: 'this week' },
  { label: 'Revenue', value: 87.4, prefix: '$', suffix: 'K', decimals: 1, note: 'tracked' },
  { label: 'Conversion', value: 68, prefix: '', suffix: '%', note: 'lead to job' },
];

// Illustrative weekly revenue trend (relative heights 0-100).
const TREND = [28, 34, 30, 46, 52, 60, 72, 84];

function areaPath(points: number[], w: number, h: number) {
  const step = w / (points.length - 1);
  const pts = points.map((p, i) => [i * step, h - (p / 100) * h] as const);
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${line} L${w},${h} L0,${h} Z`;
  return { line, area };
}

const PIPELINE = [
  { label: 'New', pct: 34, className: 'bg-elec' },
  { label: 'Quoted', pct: 26, className: 'bg-plumb' },
  { label: 'Booked', pct: 24, className: 'bg-hvac' },
  { label: 'Done', pct: 16, className: 'bg-emerald-400' },
];

export default function ConceptDashboard() {
  const reduce = useReducedMotion();
  const W = 560;
  const H = 150;
  const { line, area } = areaPath(TREND, W, H);

  return (
    <div className="relative rounded-3xl border border-divider/60 bg-ink-deep/80 overflow-hidden shadow-2xl">
      {/* soft gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.45), rgba(6,182,212,0) 70%)' }}
      />
      {/* header */}
      <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-5 border-b border-divider/40 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-elec to-hvac flex items-center justify-center text-ink text-sm font-bold">S</div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">Your operating layer</p>
            <p className="text-mute text-[11px] leading-tight">Week of June 8</p>
          </div>
        </div>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full px-2.5 py-1">Concept · illustrative</span>
      </div>

      <div className="p-6 sm:p-8 relative">
        {/* metric tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {TILES.map((t) => (
            <div key={t.label} className="bg-paper/[0.03] border border-divider/40 rounded-xl p-4">
              <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-mute mb-2">{t.label}</p>
              <p className="font-display text-2xl sm:text-3xl tracking-tight leading-none text-white">
                <Counter to={t.value} prefix={t.prefix} suffix={t.suffix} decimals={t.decimals ?? 0} />
              </p>
              <p className="text-[10px] text-mute mt-1.5">{t.note}</p>
            </div>
          ))}
        </div>

        {/* trend chart */}
        <div className="bg-paper/[0.03] border border-divider/40 rounded-xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-mute">Revenue trend</p>
            <p className="text-[10px] text-emerald-400 font-medium">+18% vs last week</p>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="none" role="img" aria-label="Illustrative upward revenue trend">
            <defs>
              <linearGradient id="cd-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(16,185,129,0.35)" />
                <stop offset="100%" stopColor="rgba(16,185,129,0)" />
              </linearGradient>
              <linearGradient id="cd-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#cd-area)" />
            <motion.path
              d={line}
              fill="none"
              stroke="url(#cd-line)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? undefined : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </div>

        {/* pipeline bar */}
        <div className="bg-paper/[0.03] border border-divider/40 rounded-xl p-5">
          <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-mute mb-3">Pipeline</p>
          <div className="flex h-3 rounded-full overflow-hidden mb-3">
            {PIPELINE.map((seg) => (
              <motion.div
                key={seg.label}
                className={seg.className}
                initial={reduce ? undefined : { width: 0 }}
                whileInView={{ width: `${seg.pct}%` }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: `${seg.pct}%` }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {PIPELINE.map((seg) => (
              <div key={seg.label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-sm ${seg.className}`} aria-hidden />
                <span className="text-[11px] text-platinum-soft">{seg.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

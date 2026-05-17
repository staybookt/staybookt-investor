'use client';
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';

/* ============================================================
 * FlywheelOS — the homepage centerpiece.
 * 7-stage StayBookt Operating System with sticky flywheel + scrolling
 * detail cards, each with its own custom data viz.
 *
 * Stages grouped into 3 acts:
 *   Demand  (amber)  : FIND, CAPTURE
 *   Conversion+Exec (yellow-green → emerald): QUOTE, DELIVER
 *   Compounding (teal → blue): MEASURE, REPUTATION, REFERRAL
 * ============================================================ */

type Stage = {
  id: string;
  num: string;
  name: string;
  oneLiner: string;
  color: string;          // accent
  group: string;          // act label
  ships: string[];        // what we ship
  proof: { label: string; value: string };
  viz: (active: boolean) => React.ReactNode;
};

/* ---------- Mini data viz components (per stage) ---------- */

const VizFind = ({ active }: { active: boolean }) => {
  // Animated donut from 0 → 87% (representing 0 → 40+ leads target)
  const r = 56;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 160 160" className="w-full max-w-[260px]">
      <circle cx="80" cy="80" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
      <motion.circle
        cx="80" cy="80" r={r}
        stroke="var(--elec)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        strokeDasharray={c}
        transform="rotate(-90 80 80)"
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: active ? c * (1 - 0.87) : c }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <text x="80" y="76" textAnchor="middle" fontSize="24" fontWeight="700" fill="white" fontFamily="'Helvetica Neue', sans-serif">40+</text>
      <text x="80" y="98" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="2">LEADS / MO</text>
    </svg>
  );
};

const VizCapture = ({ active }: { active: boolean }) => {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-[280px]">
      {/* Before bar */}
      <text x="20" y="20" fontSize="10" fill="rgba(255,255,255,0.5)" letterSpacing="1.5">BEFORE</text>
      <rect x="20" y="28" width="160" height="22" rx="3" fill="rgba(245,158,11,0.15)" />
      <motion.rect
        x="20" y="28" rx="3"
        height="22"
        fill="var(--elec)"
        initial={{ width: 0 }}
        animate={{ width: active ? 160 * 0.38 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <text x="190" y="44" fontSize="12" fill="var(--elec)" fontWeight="700" fontFamily="'Helvetica Neue', sans-serif">38%</text>
      {/* After bar */}
      <text x="20" y="76" fontSize="10" fill="rgba(255,255,255,0.5)" letterSpacing="1.5">AFTER STAYBOOKT</text>
      <rect x="20" y="84" width="160" height="22" rx="3" fill="rgba(16,185,129,0.15)" />
      <motion.rect
        x="20" y="84" rx="3"
        height="22"
        fill="var(--hvac)"
        initial={{ width: 0 }}
        animate={{ width: active ? 2 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <text x="190" y="100" fontSize="12" fill="var(--hvac)" fontWeight="700" fontFamily="'Helvetica Neue', sans-serif">0%</text>
      <text x="20" y="130" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="1">% after-hours calls to voicemail</text>
    </svg>
  );
};

const VizQuote = ({ active }: { active: boolean }) => {
  // 3 concentric rings representing cadence: 24h / 72h / 7d
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
      {[
        { r: 80, delay: 0, label: '7d', anchor: 'middle', tx: 100, ty: 28 },
        { r: 56, delay: 0.2, label: '72h', anchor: 'middle', tx: 100, ty: 56 },
        { r: 32, delay: 0.4, label: '24h', anchor: 'middle', tx: 100, ty: 86 },
      ].map((ring) => (
        <motion.circle
          key={ring.r}
          cx="100" cy="100" r={ring.r}
          fill="none"
          stroke="#7AB420"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.7 : 0 }}
          transition={{ duration: 1.2, delay: ring.delay }}
        />
      ))}
      <text x="100" y="32" textAnchor="middle" fontSize="11" fill="#7AB420" letterSpacing="1.5" fontWeight="700">7D</text>
      <text x="100" y="60" textAnchor="middle" fontSize="11" fill="#7AB420" letterSpacing="1.5" fontWeight="700">72H</text>
      <text x="100" y="90" textAnchor="middle" fontSize="11" fill="#7AB420" letterSpacing="1.5" fontWeight="700">24H</text>
      <circle cx="100" cy="120" r="4" fill="#7AB420" />
      <text x="100" y="148" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="1">FOLLOW-UP CADENCE</text>
    </svg>
  );
};

const VizDeliver = ({ active }: { active: boolean }) => {
  // Time-saved gauge
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-[280px]">
      <text x="20" y="22" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="1.5">OWNER ADMIN / WEEK</text>
      {/* 15h bar */}
      <text x="20" y="46" fontSize="11" fill="rgba(255,255,255,0.7)">Before</text>
      <rect x="80" y="36" width="140" height="14" rx="3" fill="rgba(16,185,129,0.1)" />
      <motion.rect
        x="80" y="36" rx="3"
        height="14"
        fill="var(--hvac)"
        initial={{ width: 0 }}
        animate={{ width: active ? 140 : 0 }}
        transition={{ duration: 1, delay: 0.1 }}
      />
      <motion.text
        x={228} y="47"
        fontSize="11"
        fill="var(--hvac)"
        fontWeight="700"
        textAnchor="start"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 0.8 }}
      >15h</motion.text>
      {/* <2h bar */}
      <text x="20" y="86" fontSize="11" fill="rgba(255,255,255,0.7)">After</text>
      <rect x="80" y="76" width="140" height="14" rx="3" fill="rgba(16,185,129,0.1)" />
      <motion.rect
        x="80" y="76" rx="3"
        height="14"
        fill="var(--hvac)"
        initial={{ width: 0 }}
        animate={{ width: active ? 140 * (2/15) : 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      <motion.text
        x={80 + 140*(2/15) + 8} y="87"
        fontSize="11"
        fill="var(--hvac)"
        fontWeight="700"
        textAnchor="start"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 1.2 }}
      >&lt;2h</motion.text>
      <text x="20" y="124" fontSize="20" fontWeight="700" fill="var(--hvac)" fontFamily="'Helvetica Neue', sans-serif">–87%</text>
    </svg>
  );
};

const VizMeasure = ({ active }: { active: boolean }) => {
  // 4-tile mini dashboard
  const tiles = [
    { label: 'LEADS', value: '40' },
    { label: 'BOOKED', value: '28' },
    { label: 'REVIEWS', value: '12' },
    { label: 'MRR', value: '$5K' },
  ];
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-[280px]">
      <text x="20" y="20" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="1.5">MONDAY BRIEF · WEEK 8</text>
      {tiles.map((t, i) => {
        const x = 20 + (i % 2) * 105;
        const y = 32 + Math.floor(i / 2) * 50;
        return (
          <motion.g key={t.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
            transition={{ delay: 0.1 + i * 0.12 }}
          >
            <rect x={x} y={y} width="95" height="42" rx="4" fill="rgba(19,143,173,0.1)" stroke="rgba(19,143,173,0.3)" />
            <text x={x + 8} y={y + 14} fontSize="8" fill="rgba(255,255,255,0.5)" letterSpacing="1.5">{t.label}</text>
            <text x={x + 8} y={y + 34} fontSize="18" fill="white" fontWeight="700">{t.value}</text>
          </motion.g>
        );
      })}
    </svg>
  );
};

const VizReputation = ({ active }: { active: boolean }) => {
  // Star rating climb — animated line from 3 to 50
  const points = [
    [0, 92], [25, 88], [50, 78], [75, 60], [100, 35], [125, 18], [150, 8],
  ];
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0] + 30} ${p[1] + 20}`).join(' ');
  return (
    <svg viewBox="0 0 220 140" className="w-full max-w-[280px]">
      <text x="20" y="18" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="1.5">GOOGLE REVIEWS · 90 DAYS</text>
      {/* Y axis */}
      <line x1="30" y1="20" x2="30" y2="115" stroke="rgba(255,255,255,0.1)" />
      <line x1="30" y1="115" x2="195" y2="115" stroke="rgba(255,255,255,0.1)" />
      <motion.path
        d={pathD}
        fill="none"
        stroke="var(--plumb)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Start/end labels */}
      <text x="30" y="125" fontSize="9" fill="rgba(255,255,255,0.5)">Day 0</text>
      <text x="158" y="125" fontSize="9" fill="rgba(255,255,255,0.5)">Day 90</text>
      <motion.text
        x="38" y="125" fontSize="11" fill="var(--plumb)" fontWeight="700"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 0.8 }}
      >3</motion.text>
      <motion.text
        x="178" y="40" fontSize="14" fill="var(--plumb)" fontWeight="700"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 1.6 }}
      >50+</motion.text>
    </svg>
  );
};

const VizReferral = ({ active }: { active: boolean }) => {
  // Branching tree: 1 client → 3
  return (
    <svg viewBox="0 0 220 160" className="w-full max-w-[260px]">
      {/* Source node */}
      <motion.circle
        cx="110" cy="30" r="10"
        fill="#2563EB"
        initial={{ scale: 0 }}
        animate={{ scale: active ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <text x="110" y="55" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.7)">Happy Tim</text>
      {/* Connection lines + child nodes */}
      {[
        { x: 40, name: 'Referral A' },
        { x: 110, name: 'Referral B' },
        { x: 180, name: 'Referral C' },
      ].map((child, i) => (
        <motion.g key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ delay: 0.4 + i * 0.2 }}
        >
          <motion.line
            x1="110" y1="40" x2={child.x} y2="110"
            stroke="rgba(37,99,235,0.4)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 + i * 0.2 }}
          />
          <circle cx={child.x} cy="115" r="7" fill="var(--plumb)" />
          <text x={child.x} y="138" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.7)">{child.name}</text>
        </motion.g>
      ))}
    </svg>
  );
};

/* ---------- Stage data ---------- */

const STAGES: Stage[] = [
  {
    id: 'find',
    num: '01',
    name: 'FIND',
    oneLiner: 'Get the right phone ringing.',
    color: '#F59E0B',
    group: 'DEMAND',
    ships: ['Custom-built site', 'Google Business Profile rebuild', 'Local SEO + 25 citations', 'Monthly content cadence'],
    proof: { label: 'Tim, today', value: '#1 local pack rank · "Newmarket electrician" · 47 days' },
    viz: (a) => <VizFind active={a} />,
  },
  {
    id: 'capture',
    num: '02',
    name: 'CAPTURE',
    oneLiner: 'Never miss a lead.',
    color: '#F59E0B',
    group: 'DEMAND',
    ships: ['Tap-to-call sticky bar', 'Callback form on every page', 'Missed-call SMS recovery', 'After-hours alert system'],
    proof: { label: 'Tim, today', value: 'After-hours voicemail rate: 38% → 0%' },
    viz: (a) => <VizCapture active={a} />,
  },
  {
    id: 'quote',
    num: '03',
    name: 'QUOTE',
    oneLiner: 'Turn calls into bookings.',
    color: '#7AB420',
    group: 'CONVERSION',
    ships: ['On-site quote workflow', '24h / 72h / 7d follow-up cadence', 'Quote-to-booking dashboard', 'Lost-quote reason capture'],
    proof: { label: 'Tim, today', value: '0 stale quotes in 60 days · same-day avg follow-up' },
    viz: (a) => <VizQuote active={a} />,
  },
  {
    id: 'deliver',
    num: '04',
    name: 'DELIVER',
    oneLiner: 'Run the work and the back office.',
    color: '#10B981',
    group: 'EXECUTION',
    ships: ['Scheduling + permit pulls', 'Invoicing + QuickBooks sync', 'Customer pre-arrival SMS', 'ESA / municipal compliance'],
    proof: { label: 'Tim, today', value: 'Owner admin / week: 15hr → < 2hr' },
    viz: (a) => <VizDeliver active={a} />,
  },
  {
    id: 'measure',
    num: '05',
    name: 'MEASURE',
    oneLiner: 'Understand the business.',
    color: '#138FAD',
    group: 'COMPOUNDING',
    ships: ['Monday brief in the owner\'s inbox', 'Live KPI dashboard', 'Monthly board-style review', 'Lead source attribution'],
    proof: { label: 'Tim, today', value: 'Weekly brief + monthly QBR · 8 weeks running' },
    viz: (a) => <VizMeasure active={a} />,
  },
  {
    id: 'reputation',
    num: '06',
    name: 'REPUTATION',
    oneLiner: 'Build the brand.',
    color: '#2563EB',
    group: 'COMPOUNDING',
    ships: ['Post-job review request automation', 'Review-of-the-week feature', 'Photo-led case studies', 'Press / directory listings'],
    proof: { label: 'Tim, today', value: 'Google reviews: 3 → 50+ in 90 days' },
    viz: (a) => <VizReputation active={a} />,
  },
  {
    id: 'referral',
    num: '07',
    name: 'REFERRAL',
    oneLiner: 'Turn 1 into 3.',
    color: '#2563EB',
    group: 'COMPOUNDING',
    ships: ['Referral incentive program', 'Annual maintenance reminders', 'Quarterly check-in cadence', 'Past-customer DB activation'],
    proof: { label: 'Tim, today', value: '3 referrals to date · CAC trending toward zero' },
    viz: (a) => <VizReferral active={a} />,
  },
];

/* ---------- 7-segment Flywheel SVG ---------- */

function Wheel7({ activeIdx }: { activeIdx: number }) {
  const size = 480;
  const cx = size / 2;
  const cy = size / 2;
  const rInner = 110;
  const rOuter = 200;
  const gap = 0.018;
  const segAngle = (Math.PI * 2) / STAGES.length;

  const segmentPath = (i: number) => {
    const start = -Math.PI / 2 + segAngle * i + gap;
    const end = -Math.PI / 2 + segAngle * (i + 1) - gap;
    const x1 = cx + rOuter * Math.cos(start);
    const y1 = cy + rOuter * Math.sin(start);
    const x2 = cx + rOuter * Math.cos(end);
    const y2 = cy + rOuter * Math.sin(end);
    const x3 = cx + rInner * Math.cos(end);
    const y3 = cy + rInner * Math.sin(end);
    const x4 = cx + rInner * Math.cos(start);
    const y4 = cy + rInner * Math.sin(start);
    return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;
  };

  const labelPos = (i: number) => {
    const mid = -Math.PI / 2 + segAngle * i + segAngle / 2;
    const rMid = (rInner + rOuter) / 2;
    return { x: cx + rMid * Math.cos(mid), y: cy + rMid * Math.sin(mid) };
  };

  return (
    <div className="relative w-full max-w-[480px] mx-auto aspect-square">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(245,158,11,0.18)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0)" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={rInner + 30} fill="url(#hubGlow)" />

        {STAGES.map((s, i) => {
          const isActive = i === activeIdx;
          const isPast = i < activeIdx;
          return (
            <motion.path
              key={s.id}
              d={segmentPath(i)}
              fill={s.color}
              stroke={s.color}
              strokeWidth={isActive ? 2 : 1}
              initial={false}
              animate={{
                fillOpacity: isActive ? 0.34 : isPast ? 0.18 : 0.05,
                strokeOpacity: isActive ? 1 : isPast ? 0.7 : 0.25,
              }}
              transition={{ duration: 0.4 }}
            />
          );
        })}

        {STAGES.map((s, i) => {
          const lp = labelPos(i);
          const isActive = i === activeIdx;
          return (
            <g key={s.id + '-label'} pointerEvents="none">
              <text
                x={lp.x} y={lp.y - 6}
                textAnchor="middle"
                fill={isActive ? s.color : 'rgba(255,255,255,0.55)'}
                fontFamily="'Helvetica Neue', sans-serif"
                fontWeight="700"
                fontSize="14"
                letterSpacing="2"
              >{s.name}</text>
              <text
                x={lp.x} y={lp.y + 12}
                textAnchor="middle"
                fill={isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)'}
                fontFamily="'Helvetica Neue', sans-serif"
                fontWeight="500"
                fontSize="9"
                letterSpacing="2"
              >{s.num}</text>
            </g>
          );
        })}

        {/* Center hub — stage counter (the wheel IS the progress bar) */}
        <motion.circle
          cx={cx} cy={cy} r={rInner - 6}
          fill="#0A0E1A"
          initial={false}
          animate={{ stroke: STAGES[activeIdx].color }}
          transition={{ duration: 0.4 }}
          strokeWidth="1.5"
          strokeOpacity="0.55"
        />
        <text
          x={cx} y={cy - 32}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          letterSpacing="3"
          fill="rgba(255,255,255,0.5)"
        >STAGE</text>
        <motion.text
          x={cx} y={cy + 14}
          textAnchor="middle"
          fontSize="56"
          fontWeight="700"
          fill="white"
          fontFamily="'Helvetica Neue', sans-serif"
          initial={false}
          key={`num-${activeIdx}`}
          animate={{ opacity: 1 }}
        >{(activeIdx + 1).toString().padStart(2, '0')}</motion.text>
        <text
          x={cx} y={cy + 38}
          textAnchor="middle"
          fontSize="10"
          letterSpacing="3"
          fill="rgba(255,255,255,0.4)"
          fontWeight="600"
        >/ {STAGES.length.toString().padStart(2, '0')}</text>
        <motion.text
          x={cx} y={cy + 60}
          textAnchor="middle"
          fontSize="8"
          letterSpacing="3"
          fontWeight="700"
          initial={false}
          animate={{ fill: STAGES[activeIdx].color }}
          transition={{ duration: 0.4 }}
        >{STAGES[activeIdx].group}</motion.text>

        {/* Active outer tick */}
        {(() => {
          const start = -Math.PI / 2 + segAngle * activeIdx + gap;
          const end = -Math.PI / 2 + segAngle * (activeIdx + 1) - gap;
          const rTick = rOuter + 8;
          const x1 = cx + rTick * Math.cos(start);
          const y1 = cy + rTick * Math.sin(start);
          const x2 = cx + rTick * Math.cos(end);
          const y2 = cy + rTick * Math.sin(end);
          return (
            <motion.path
              d={`M ${x1} ${y1} A ${rTick} ${rTick} 0 0 1 ${x2} ${y2}`}
              stroke={STAGES[activeIdx].color}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={false}
              animate={{ opacity: 1 }}
            />
          );
        })()}
      </svg>
    </div>
  );
}

/* ---------- Main FlywheelOS section ---------- */

export function FlywheelOS() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  /* Pinned-scroll pattern: outer container is tall (one viewport per stage),
     inner is sticky. Scroll progress through the outer determines which
     stage is shown in the single right-hand panel. This is the parallax
     mechanic — one frame, content swaps, wheel stays put. */
  const { scrollYProgress } = useScroll({
    target: scrollerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(0.9999, latest));
    const idx = Math.min(STAGES.length - 1, Math.floor(clamped * STAGES.length));
    setActiveIdx(idx);
  });

  return (
    <section id="os" className="relative bg-ink text-white overflow-hidden">
      {/* Section header */}
      <div className="px-8 sm:px-16 max-w-7xl mx-auto pt-24 pb-12">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.3em] uppercase text-elec font-semibold mb-6"
        >
          The mechanism
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[40px] sm:text-[72px] leading-[0.98] tracking-[-0.04em] max-w-4xl"
        >
          One playbook.
          <br />
          <span className="text-mute">Seven stages.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 text-platinum-soft text-base sm:text-lg leading-relaxed max-w-2xl"
        >
          Find, capture, quote, deliver, measure, reputation, referral — run by our team, every week, for every client.
        </motion.p>

        {/* Entry cue — sets expectation that this is a scroll-driven walkthrough */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-mute font-semibold"
        >
          <span className="w-8 h-px bg-elec/60" />
          <span>Scroll · 7 stages · 3 acts</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          >↓</motion.span>
        </motion.div>
      </div>

      {/* ================================================================
          DESKTOP — Pinned-scroll parallax. Outer is tall (one viewport per
          stage); inner is sticky to the viewport. The right panel swaps
          content as scroll progress advances through the section. The
          wheel and the stage card share ONE frame the whole time.
          ================================================================ */}
      <div
        ref={scrollerRef}
        className="relative hidden lg:block"
        style={{ height: `${STAGES.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div className="px-8 sm:px-16 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-12 gap-14 items-center">
              {/* LEFT — wheel + 3-act legend (single, stationary) */}
              <div className="col-span-5">
                <Wheel7 activeIdx={activeIdx} />
                <div className="mt-8 grid grid-cols-3 gap-3 text-center max-w-[480px] mx-auto">
                  {[
                    { label: 'Demand', color: '#F59E0B', stages: '01 · 02' },
                    { label: 'Execution', color: '#10B981', stages: '03 · 04' },
                    { label: 'Compounding', color: '#2563EB', stages: '05 · 06 · 07' },
                  ].map((g) => (
                    <div key={g.label} className="border-l-2 pl-3 py-1" style={{ borderColor: g.color }}>
                      <p className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: g.color }}>{g.label}</p>
                      <p className="text-[10px] text-mute-dark font-mono mt-1">{g.stages}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — single stage panel, content cross-fades by activeIdx */}
              <div className="col-span-7 relative min-h-[560px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <StageCard stage={STAGES[activeIdx]} active total={STAGES.length} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom progress dots — slim row of 7 showing scroll position */}
            <div className="mt-12 flex justify-center gap-2">
              {STAGES.map((s, i) => (
                <motion.span
                  key={s.id}
                  className="h-1 rounded-full transition-all"
                  initial={false}
                  animate={{
                    width: i === activeIdx ? 24 : 8,
                    backgroundColor: i === activeIdx ? s.color : i < activeIdx ? `${s.color}99` : 'rgba(255,255,255,0.12)',
                  }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          MOBILE — Stacked vertical list. The pinned parallax doesn't read
          on small screens; better to give a clean linear walkthrough.
          ================================================================ */}
      <div className="lg:hidden px-6 sm:px-10 max-w-2xl mx-auto pb-16 space-y-12">
        {STAGES.map((s) => (
          <div key={s.id} className="rounded-2xl border border-divider/40 bg-ink-soft/30 p-6">
            <StageCard stage={s} active total={STAGES.length} />
          </div>
        ))}
      </div>

      {/* Exit frame — sibling of both desktop and mobile, runs at all sizes */}
      <div className="px-8 sm:px-16 max-w-7xl mx-auto pb-24">

        {/* Exit frame — closes the walkthrough so the user knows it's over,
            then hands off to TimCase (the proof of what this produced). */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mt-24 sm:mt-32 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-mute font-semibold mb-6">
            <span className="w-8 h-px bg-elec/60" />
            <span>End of walkthrough · 07 / 07</span>
            <span className="w-8 h-px bg-elec/60" />
          </div>
          <h3 className="font-display text-[36px] sm:text-[56px] leading-[1.02] tracking-[-0.03em] mb-6">
            That&apos;s the OS.
            <br />
            <span className="text-mute">Here&apos;s what it produced.</span>
          </h3>
          <p className="text-platinum-soft text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            One playbook, one live client, 60 days in. Tim Brennan, Newmarket electrician — keep scrolling.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/proof"
              className="inline-flex items-center gap-3 text-sm font-semibold hero-cta text-white border border-white/30 px-7 py-3.5 rounded-xl transition-all"
            >
              <span className="relative z-10">See the receipts</span>
              <span className="relative z-10">↓</span>
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-3 text-sm font-semibold text-platinum-soft hover:text-white px-3 py-3.5 transition-colors"
            >
              <span>Or read the full playbook</span>
              <span>→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- One stage card ---------- */

function StageCard({ stage, active, total }: { stage: Stage; active: boolean; total: number }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0.35, scale: active ? 1 : 0.98 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Pagination eyebrow — "STAGE 01 / 07 · DEMAND" */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-mute font-semibold">
          STAGE {stage.num} / {total.toString().padStart(2, '0')}
        </span>
        <span className="w-1 h-1 rounded-full" style={{ background: stage.color, opacity: 0.6 }} />
        <span className="text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: stage.color }}>
          {stage.group}
        </span>
      </div>

      <h3 className="font-display text-4xl sm:text-6xl tracking-[-0.03em] leading-[1.02] mb-3" style={{ color: stage.color }}>
        {stage.name}
      </h3>
      <p className="text-platinum text-xl sm:text-2xl tracking-tight font-display mb-8">
        {stage.oneLiner}
      </p>

      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-mute mb-3">What we ship</p>
          <ul className="space-y-2.5">
            {stage.ships.map((ship) => (
              <li key={ship} className="flex items-start gap-3 text-sm text-platinum leading-snug">
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: stage.color }} />
                <span>{ship}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center">
          {stage.viz(active)}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-divider">
        <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-1" style={{ color: stage.color }}>
          {stage.proof.label}
        </p>
        <p className="text-platinum text-sm sm:text-base">{stage.proof.value}</p>
      </div>
    </motion.div>
  );
}

'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Reveal } from './Sections';

/* ============================================================
 * StayBookt OS — the centerpiece
 * Five stages of the playbook. Click any stage. Detail panel
 * shows: deliverables, tools, KPIs, owner, Tim's live number.
 *
 * This is the product. Tech is the toolkit. Team runs the
 * playbook. Each stage replicates client-to-client.
 * ============================================================ */

interface Stage {
  id: string;
  name: string;
  short: string;
  color: string;
  oneLiner: string;
  owner: string;
  deliverables: string[];
  tools: string[];
  kpis: { metric: string; target: string }[];
  tim: { metric: string; value: string };
}

const STAGES: Stage[] = [
  {
    id: 'find',
    name: 'FIND',
    short: 'Get the right phone ringing',
    color: 'var(--elec)',
    oneLiner: 'Demand engine. SEO, Google Business Profile, citations, local content, paid retargeting.',
    owner: 'Growth Lead',
    deliverables: [
      'Custom Next.js site with vertical-specific copy',
      'Google Business Profile build + ongoing posts',
      'Local SEO + citations across 25+ directories',
      'Monthly content cadence (3 service-deep pages / mo)',
    ],
    tools: ['Next.js + Vercel', 'Ahrefs / Local Falcon', 'GBP API', 'Schema.org JSON-LD'],
    kpis: [
      { metric: 'Local pack rank', target: 'Top 3 in <90 days' },
      { metric: 'Organic sessions', target: '+200% by month 3' },
      { metric: 'GBP impressions', target: '5x baseline' },
    ],
    tim: { metric: 'Local pack rank, "Newmarket electrician"', value: '#1 in 47 days' },
  },
  {
    id: 'capture',
    name: 'CAPTURE',
    short: 'Never miss a lead',
    color: 'var(--elec)',
    oneLiner: 'Every signal becomes a conversation. Tap-to-call, callback forms, missed-call SMS recovery, after-hours bot.',
    owner: 'Ops Lead',
    deliverables: [
      'Mobile-first tap-to-call bar (sticky)',
      'Callback form on every service page',
      'Missed-call SMS auto-recovery (Twilio)',
      'After-hours form-to-text alert system',
    ],
    tools: ['Twilio', 'Formspree → Slack', 'CallRail (Phase II)', 'GA4 conversion events'],
    kpis: [
      { metric: 'After-hours response rate', target: '> 95% within 1 hour' },
      { metric: 'Form-to-call conversion', target: '> 30%' },
      { metric: 'Lead acknowledgment time', target: '< 5 min' },
    ],
    tim: { metric: 'After-hours calls to voicemail', value: '38% → 0%' },
  },
  {
    id: 'quote',
    name: 'QUOTE',
    short: 'Turn calls into bookings',
    color: 'var(--plumb)',
    oneLiner: 'Quoting + follow-up automation. On-site quote workflow, automated nudge cadence, no quote rots.',
    owner: 'Ops Lead',
    deliverables: [
      'Branded on-site quote template',
      'Automated 24h / 72h / 7d follow-up cadence',
      'Quote-to-booking dashboard for the owner',
      'Lost-quote reason capture (Phase II)',
    ],
    tools: ['HubSpot / Pipedrive', 'Gmail API for cadences', 'Stripe quote links', 'StayBookt CRM (Ph II)'],
    kpis: [
      { metric: 'Quote follow-up coverage', target: '100%' },
      { metric: 'Quote-to-booking ratio', target: '+40% above baseline' },
      { metric: 'Avg time-to-quote', target: '< 24h after visit' },
    ],
    tim: { metric: 'Stale quotes after 60 days embedded', value: '0' },
  },
  {
    id: 'deliver',
    name: 'DELIVER',
    short: 'Run the back office for them',
    color: 'var(--plumb)',
    oneLiner: 'Scheduling, permits, invoicing, ESA / TSSA paperwork. Owner stays on the tools.',
    owner: 'Ops Lead + Tech bench',
    deliverables: [
      'Job scheduling templates + reminders',
      'Permit pull workflow (ESA, municipal)',
      'Invoicing automation (QuickBooks sync, Ph II)',
      'Customer pre-arrival SMS + on-the-way notice',
    ],
    tools: ['Google Calendar API', 'QuickBooks (Ph II)', 'Twilio SMS', 'Notion ops portal'],
    kpis: [
      { metric: 'Owner hours on admin / week', target: '< 3 hours' },
      { metric: 'Invoice-to-paid cycle', target: '< 14 days' },
      { metric: 'Inspection pass rate', target: '100%' },
    ],
    tim: { metric: 'Owner admin hours / week', value: '15h → < 2h' },
  },
  {
    id: 'retain',
    name: 'RETAIN',
    short: 'Turn one job into three',
    color: 'var(--hvac)',
    oneLiner: 'Review velocity, referral loops, repeat-customer outreach. Compounding visibility, not paid spikes.',
    owner: 'Growth Lead',
    deliverables: [
      'Post-job review request automation (SMS + email)',
      'Quarterly check-in emails to past customers',
      'Referral incentive program',
      'Annual maintenance reminder cadence',
    ],
    tools: ['SMS automation (Twilio)', 'Gmail API', 'GBP review API (Ph II)', 'Customer DB'],
    kpis: [
      { metric: 'Reviews / month', target: '> 5' },
      { metric: 'Repeat customer rate', target: '> 25%' },
      { metric: 'Referral attribution', target: '> 15% of new leads' },
    ],
    tim: { metric: 'Google reviews in 90 days', value: '3 → 50+' },
  },
];


/* === The interactive flywheel — circular SVG nav =========== */
function Flywheel({
  stages,
  activeId,
  onSelect,
}: {
  stages: Stage[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  // Geometry
  const size = 560; // viewBox size
  const cx = size / 2;
  const cy = size / 2;
  const rInner = 110; // inner hub radius
  const rOuter = 240; // outer ring radius
  const gap = 0.012; // gap between segments in radians

  const segAngle = (Math.PI * 2) / stages.length;

  // Build SVG path for a donut segment
  const segmentPath = (startAngle: number, endAngle: number) => {
    const s = startAngle + gap;
    const e = endAngle - gap;
    const x1 = cx + rOuter * Math.cos(s);
    const y1 = cy + rOuter * Math.sin(s);
    const x2 = cx + rOuter * Math.cos(e);
    const y2 = cy + rOuter * Math.sin(e);
    const x3 = cx + rInner * Math.cos(e);
    const y3 = cy + rInner * Math.sin(e);
    const x4 = cx + rInner * Math.cos(s);
    const y4 = cy + rInner * Math.sin(s);
    const largeArc = e - s > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  // Label position (mid-radius)
  const labelPos = (i: number) => {
    const midAngle = -Math.PI / 2 + segAngle * i + segAngle / 2;
    const rMid = (rInner + rOuter) / 2;
    return {
      x: cx + rMid * Math.cos(midAngle),
      y: cy + rMid * Math.sin(midAngle),
      angle: midAngle,
    };
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
      {/* Wheel — left 5 cols */}
      <div className="lg:col-span-5">
        <div className="relative w-full max-w-[480px] mx-auto">
          {/* Slow rotating decorative ring (purely cosmetic) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            style={{ originX: '50%', originY: '50%' }}
          >
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
              <circle
                cx={cx}
                cy={cy}
                r={rOuter + 14}
                fill="none"
                stroke="var(--divider)"
                strokeWidth="1"
                strokeDasharray="2 8"
                opacity="0.5"
              />
            </svg>
          </motion.div>

          {/* Static interactive wheel */}
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full relative">
            {/* Outer rotation arrow hint */}
            <defs>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(245, 158, 11, 0.15)" />
                <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
              </radialGradient>
            </defs>

            {/* Hub glow */}
            <circle cx={cx} cy={cy} r={rInner + 30} fill="url(#hubGlow)" />

            {/* Segments */}
            {stages.map((s, i) => {
              const startAngle = -Math.PI / 2 + segAngle * i;
              const endAngle = -Math.PI / 2 + segAngle * (i + 1);
              const isActive = s.id === activeId;
              return (
                <g key={s.id}>
                  <motion.path
                    d={segmentPath(startAngle, endAngle)}
                    fill={isActive ? s.color : 'rgba(255,255,255,0.04)'}
                    stroke={isActive ? s.color : 'var(--divider)'}
                    strokeWidth={isActive ? 2 : 1}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelect(s.id)}
                    initial={false}
                    animate={{
                      fillOpacity: isActive ? 0.18 : 0.04,
                      strokeOpacity: isActive ? 1 : 0.5,
                    }}
                    whileHover={{ fillOpacity: 0.12 }}
                    transition={{ duration: 0.25 }}
                  />
                  {/* Label */}
                  {(() => {
                    const lp = labelPos(i);
                    return (
                      <g
                        style={{ cursor: 'pointer', pointerEvents: 'none' }}
                        transform={`translate(${lp.x}, ${lp.y})`}
                      >
                        <text
                          textAnchor="middle"
                          dominantBaseline="middle"
                          dy="-8"
                          fill={isActive ? s.color : 'white'}
                          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
                          fontWeight="700"
                          fontSize="22"
                          letterSpacing="2"
                        >
                          {s.name}
                        </text>
                        <text
                          textAnchor="middle"
                          dominantBaseline="middle"
                          dy="14"
                          fill={isActive ? 'rgba(255,255,255,0.85)' : 'rgba(199,199,204,0.55)'}
                          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
                          fontWeight="500"
                          fontSize="10"
                        >
                          {`0${i + 1}`}
                        </text>
                      </g>
                    );
                  })()}
                </g>
              );
            })}

            {/* Center hub */}
            <circle cx={cx} cy={cy} r={rInner - 4} fill="#0A0E1A" stroke="var(--divider)" strokeWidth="1" />
            <text
              x={cx}
              y={cy - 14}
              textAnchor="middle"
              fill="rgba(245, 158, 11, 1)"
              fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
              fontSize="10"
              fontWeight="700"
              letterSpacing="3"
            >
              STAYBOOKT
            </text>
            <text
              x={cx}
              y={cy + 6}
              textAnchor="middle"
              fill="white"
              fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
              fontSize="22"
              fontWeight="700"
              letterSpacing="-0.5"
            >
              OS
            </text>
            <text
              x={cx}
              y={cy + 28}
              textAnchor="middle"
              fill="rgba(199,199,204,0.6)"
              fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
              fontSize="9"
              letterSpacing="2"
            >
              THE PLAYBOOK
            </text>

            {/* Active stage indicator arc */}
            {(() => {
              const idx = stages.findIndex((s) => s.id === activeId);
              const startA = -Math.PI / 2 + segAngle * idx + gap;
              const endA = -Math.PI / 2 + segAngle * (idx + 1) - gap;
              const rTick = rOuter + 8;
              const x1 = cx + rTick * Math.cos(startA);
              const y1 = cy + rTick * Math.sin(startA);
              const x2 = cx + rTick * Math.cos(endA);
              const y2 = cy + rTick * Math.sin(endA);
              return (
                <path
                  d={`M ${x1} ${y1} A ${rTick} ${rTick} 0 0 1 ${x2} ${y2}`}
                  stroke={stages[idx].color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })()}
          </svg>
        </div>
        <p className="text-center text-mute text-xs mt-4 tracking-[0.15em] uppercase font-semibold">
          Click a stage →
        </p>
      </div>

      {/* Stage stub buttons — right 7 cols, for keyboard / mobile */}
      <div className="lg:col-span-7">
        <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-1 gap-2">
          {stages.map((s, i) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => onSelect(s.id)}
                className={`relative text-left px-4 sm:px-5 py-3 sm:py-4 rounded-xl border transition-all ${
                  isActive ? 'bg-ink-soft border-elec/40 shadow-lg' : 'bg-ink border-divider hover:border-divider/80 hover:bg-ink-soft/50'
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0 transition-transform"
                    style={{ background: s.color, transform: isActive ? 'scale(1.6)' : 'scale(1)' }}
                  />
                  <span className="font-mono text-[10px] text-mute">0{i + 1}</span>
                  <span
                    className="font-display text-base sm:text-xl tracking-[0.05em] font-bold"
                    style={{ color: isActive ? s.color : 'white' }}
                  >
                    {s.name}
                  </span>
                  <span className={`text-[11px] sm:text-sm leading-tight ml-2 ${isActive ? 'text-platinum' : 'text-mute'}`}>
                    {s.short}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function StayBooktOS() {
  const [activeId, setActiveId] = useState<string>('find');
  const active = STAGES.find((s) => s.id === activeId)!;

  return (
    <section id="os" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="orb" style={{ width: 600, height: 600, background: 'var(--elec)', top: '-15%', right: '-10%', opacity: 0.12 }} />
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--plumb)', bottom: '-10%', left: '-5%', opacity: 0.1 }} />

      <div className="px-8 sm:px-16 max-w-7xl mx-auto relative">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">The mechanism</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            The StayBookt OS.
          </h2>
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-mute-dark mb-4 max-w-3xl">
            One playbook. Five stages. Run by our team, every week, for every client.
          </h2>
          <p className="text-mute text-base sm:text-lg max-w-3xl leading-relaxed mb-16">
            We are not a software company. We are an operating team. The software, the website, the GBP — those are tools. The product is the playbook and the people who run it. <span className="text-platinum">Click any stage to see how we deliver it.</span>
          </p>
        </Reveal>

        {/* The flywheel — interactive circular nav */}
        <Reveal delay={0.2}>
          <Flywheel stages={STAGES} activeId={activeId} onSelect={setActiveId} />
        </Reveal>

        {/* Detail panel */}
        <Reveal delay={0.35}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-10 bg-ink-soft border border-divider rounded-2xl p-8 sm:p-10"
            >
              {/* Header column */}
              <div className="lg:col-span-12 pb-6 mb-2 border-b border-divider">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span
                    className="font-display text-3xl sm:text-4xl tracking-[0.1em] font-bold"
                    style={{ color: active.color }}
                  >
                    {active.name}
                  </span>
                  <span className="text-platinum text-lg sm:text-xl tracking-tight">— {active.short}.</span>
                </div>
                <p className="text-platinum-soft text-sm sm:text-base leading-relaxed mt-4 max-w-4xl">
                  {active.oneLiner}
                </p>
              </div>

              {/* Deliverables */}
              <div className="lg:col-span-4">
                <p className="text-[10px] tracking-[0.25em] uppercase text-elec font-semibold mb-4">
                  What we ship
                </p>
                <ul className="space-y-3">
                  {active.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-platinum leading-snug">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-elec shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* KPIs */}
              <div className="lg:col-span-4">
                <p className="text-[10px] tracking-[0.25em] uppercase text-plumb font-semibold mb-4">
                  How we measure it
                </p>
                <ul className="space-y-4">
                  {active.kpis.map((k) => (
                    <li key={k.metric}>
                      <p className="text-platinum text-sm leading-tight mb-1">{k.metric}</p>
                      <p className="font-display text-base text-plumb tracking-tight">{k.target}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Owner + Tools + Tim proof */}
              <div className="lg:col-span-4 space-y-7">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-hvac font-semibold mb-3">
                    Who owns this stage
                  </p>
                  <p className="font-display text-xl tracking-tight">{active.owner}</p>
                  <p className="text-mute text-xs mt-1">+ specialist bench, per client</p>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-mute-dark font-semibold mb-3">
                    Tools in the stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.tools.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-ink border border-divider text-platinum-soft font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-divider">
                  <p className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: active.color }}>
                    Tim, today
                  </p>
                  <p className="text-platinum text-sm mb-1.5">{active.tim.metric}</p>
                  <p className="font-display text-2xl sm:text-3xl tracking-tight" style={{ color: active.color }}>
                    {active.tim.value}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>

        {/* Below — the recap */}
        <Reveal delay={0.6}>
          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
            <div className="border-l-2 border-elec pl-5 py-2 text-left">
              <p className="font-display text-3xl text-elec tracking-tight">1 playbook</p>
              <p className="text-mute text-sm mt-1">Same five stages, every client.</p>
            </div>
            <div className="border-l-2 border-plumb pl-5 py-2 text-left">
              <p className="font-display text-3xl text-plumb tracking-tight">3 named owners</p>
              <p className="text-mute text-sm mt-1">Growth, Ops, Tech bench — per engagement.</p>
            </div>
            <div className="border-l-2 border-hvac pl-5 py-2 text-left">
              <p className="font-display text-3xl text-hvac tracking-tight">Weekly cadence</p>
              <p className="text-mute text-sm mt-1">Monday brief. Slack. Monthly board.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* === 90-DAY PLAYBOOK — onboarding cadence ==================== */
export function NinetyDayPlaybook() {
  const milestones = [
    {
      when: 'DAY 0',
      title: 'Kickoff call',
      what: 'Owner walks us through the business. We audit the current funnel end-to-end. Define the 90-day target.',
      ship: 'Diagnostic memo · Slack channel created',
      color: 'var(--elec)',
    },
    {
      when: 'WEEK 1',
      title: 'Site v1 + brand',
      what: 'New site live with vertical copy + photography. GBP rebuilt. Tap-to-call wired. Lead capture forms shipped.',
      ship: 'Live website · GBP live · Lead alerts firing',
      color: 'var(--elec)',
    },
    {
      when: 'DAY 30',
      title: 'Lead engine on',
      what: 'SEO foundations in. Local pack tracked. Missed-call recovery live. Quote follow-up cadence running.',
      ship: 'First Monday brief · 3 service pages indexed · 10+ leads tracked',
      color: 'var(--plumb)',
    },
    {
      when: 'DAY 60',
      title: 'Compounding',
      what: 'Review pipeline producing volume. Quote follow-up data informing optimization. Pipeline visibility for the owner.',
      ship: 'Pipeline dashboard · Review velocity report · Optimization plan',
      color: 'var(--plumb)',
    },
    {
      when: 'DAY 90',
      title: 'Renewal + expansion',
      what: 'Quarterly review with the owner. Demonstrate ROI. Define next 90 days. Decide on tier upgrade or new vertical.',
      ship: 'QBR document · Annual contract or month-to-month decision',
      color: 'var(--hvac)',
    },
  ];

  return (
    <section id="playbook" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">The 90-day playbook</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            How a client onboards.
          </h2>
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-mute mb-16 max-w-3xl">
            Same cadence, every time. Client #1 or client #100.
          </h2>
        </Reveal>

        <div className="relative">
          {/* Horizontal connector */}
          <div className="hidden md:block absolute top-12 left-[5%] right-[5%] h-px bg-divider-lt" />

          <div className="grid md:grid-cols-5 gap-6 md:gap-4">
            {milestones.map((m, i) => (
              <Reveal key={m.when} delay={i * 0.1}>
                <div className="relative">
                  {/* Node */}
                  <div
                    className="hidden md:flex w-24 h-24 rounded-full mx-auto items-center justify-center mb-6 relative z-10 bg-paper border-2 shadow"
                    style={{ borderColor: m.color }}
                  >
                    <span className="font-display text-xs tracking-[0.15em] font-bold" style={{ color: m.color }}>
                      {m.when}
                    </span>
                  </div>
                  <div className="md:hidden font-display text-base font-bold tracking-[0.15em] mb-3" style={{ color: m.color }}>
                    {m.when}
                  </div>

                  <h3 className="font-display text-xl tracking-tight mb-3 text-center md:text-center">
                    {m.title}
                  </h3>
                  <p className="text-ink/70 text-sm leading-relaxed mb-4 text-center md:text-left">
                    {m.what}
                  </p>
                  <div className="border-t border-divider-lt pt-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-mute mb-2">
                      Shipped by then
                    </p>
                    <p className="text-xs text-ink/80 leading-snug">{m.ship}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.6}>
          <p className="mt-16 text-center text-mute italic max-w-2xl mx-auto">
            Same milestones across electrical, HVAC, plumbing. The vertical changes. The playbook does not.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* === WHAT WE SHIP EVERY WEEK ================================ */
export function WeeklyOps() {
  const cadence = [
    {
      day: 'MONDAY',
      title: 'Owner brief',
      desc: 'One-page summary in their inbox by 9am: leads this week, pipeline status, what we shipped, what we are shipping.',
      icon: '📄',
    },
    {
      day: 'TUE–THU',
      title: 'Execution',
      desc: 'Content shipped. SEO work. Quote cadence runs. Reviews pursued. Lead routing tuned. Owner stays on the tools.',
      icon: '⚙️',
    },
    {
      day: 'FRIDAY',
      title: 'Slack standup',
      desc: '15-minute video or voice. Owner + Growth Lead + Ops Lead. What worked, what did not, what is next week.',
      icon: '💬',
    },
    {
      day: 'MONTHLY',
      title: 'Board-style review',
      desc: '60-min QBR-lite. Leads, pipeline, reviews, ROI, plan for next 30. Sent as a doc the owner can forward to their accountant.',
      icon: '📊',
    },
  ];

  return (
    <section id="weekly" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="orb" style={{ width: 400, height: 400, background: 'var(--hvac)', top: '20%', right: '-10%', opacity: 0.12 }} />

      <div className="px-8 sm:px-16 max-w-7xl mx-auto relative">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-hvac font-semibold uppercase mb-6">The cadence</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            What we ship,
          </h2>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] text-mute-dark mb-12">
            every week.
          </h2>
          <p className="text-platinum-soft text-base sm:text-lg max-w-3xl leading-relaxed mb-16">
            Tim does not buy software from us. He buys a team that runs his revenue engine — and shows up on a predictable rhythm. Here is the week, every week.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cadence.map((c, i) => (
            <Reveal key={c.day} delay={i * 0.08}>
              <div className="bg-ink-soft border border-divider rounded-2xl p-6 h-full">
                <div className="text-3xl mb-4">{c.icon}</div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-elec font-semibold mb-2">{c.day}</p>
                <h3 className="font-display text-xl tracking-tight mb-3">{c.title}</h3>
                <p className="text-platinum-soft text-sm leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === CUSTOMER OUTCOMES — what every client gets =============== */
export function CustomerOutcomes() {
  const outcomes = [
    {
      n: '01',
      tag: 'TOP LINE',
      title: 'Revenue grows because the front door is open 24/7.',
      benefit: 'More inbound, faster response, higher quote-to-book conversion. The phone rings — and it gets answered every single time.',
      tim: { metric: 'Tim, today', value: '5 → 40+ leads / mo · 0 voicemails after hours' },
      thesis: 'Long-term: 25–40% top-line lift in year one for owner-operators who were leaving leads on the table.',
      color: 'var(--elec)',
    },
    {
      n: '02',
      tag: 'OPERATIONAL SANITY',
      title: 'The owner gets their nights and weekends back.',
      benefit: 'Quoting, scheduling, follow-up, invoicing — automated or owned by our team. Owner stays on the tools and stops being the bottleneck.',
      tim: { metric: 'Tim, today', value: '15 hr/wk on admin → < 2 hr/wk' },
      thesis: 'Long-term: owner moves from operator-stuck to operator-by-choice. The business can survive a vacation. Then a second crew. Then a second location.',
      color: 'var(--plumb)',
    },
    {
      n: '03',
      tag: 'COMPOUNDING REPUTATION',
      title: 'Reviews, referrals, repeat customers — on autopilot.',
      benefit: 'Every job triggers a review request. Every past customer gets remembered. Every happy customer becomes a referral source. Demand stops being something you buy.',
      tim: { metric: 'Tim, today', value: '3 reviews → 50+ in 90 days · #1 local pack' },
      thesis: 'Long-term: customer acquisition cost trends toward zero. Reputation becomes the moat. Paid spend becomes optional, not required.',
      color: 'var(--hvac)',
    },
    {
      n: '04',
      tag: 'ENTERPRISE VALUE',
      title: 'The business goes from "a job" to "an asset."',
      benefit: 'Documented processes. Predictable revenue. Clean books. Quarterly board-style reviews. A buyer or lender can see exactly what they’re looking at.',
      tim: { metric: 'Tim, today', value: 'Monday brief · monthly QBR · documented playbook' },
      thesis: 'Long-term: when the owner decides to sell, retire, or pass it on, the business commands a higher multiple because someone else can step in and run it.',
      color: 'var(--elec)',
    },
  ];

  return (
    <section id="outcomes" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">What the owner walks away with</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Four outcomes.
          </h2>
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-mute mb-4 max-w-3xl">
            One for every leak we just plugged.
          </h2>
          <p className="text-mute text-base sm:text-lg max-w-3xl leading-relaxed mb-16">
            Tim is the early proof. The pattern repeats every time we run the playbook end-to-end — because the playbook does not care which vertical the business is in. It cares whether the front door, the back office, the reputation engine, and the books are all running.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {outcomes.map((o, i) => (
            <Reveal key={o.n} delay={i * 0.1}>
              <div className="bg-paper border border-divider-lt rounded-2xl p-8 sm:p-10 h-full flex flex-col">
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-mono text-xs text-mute">{o.n}</span>
                  <span className="text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: o.color }}>
                    {o.tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl tracking-[-0.02em] leading-snug mb-5">
                  {o.title}
                </h3>
                <p className="text-ink/75 text-base leading-relaxed mb-6">
                  {o.benefit}
                </p>

                <div className="mt-auto pt-6 border-t border-divider-lt">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: o.color }}>
                    {o.tim.metric}
                  </p>
                  <p className="font-display text-lg sm:text-xl tracking-tight mb-5" style={{ color: o.color }}>
                    {o.tim.value}
                  </p>
                  <p className="text-mute text-xs sm:text-sm leading-relaxed italic">
                    {o.thesis}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Closing line — ties to enterprise value */}
        <Reveal delay={0.6}>
          <div className="mt-14 p-8 bg-ink text-white rounded-2xl">
            <p className="text-elec text-[11px] tracking-[0.25em] uppercase font-semibold mb-3">The bigger picture</p>
            <p className="font-display text-2xl sm:text-3xl tracking-[-0.02em] leading-snug max-w-4xl">
              We don’t sell software. We don’t sell websites. We sell the difference between owning a job and owning an asset.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

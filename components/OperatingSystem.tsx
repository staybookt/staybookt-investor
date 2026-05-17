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

        {/* Stage tabs */}
        <Reveal delay={0.2}>
          <div className="grid grid-cols-5 gap-2 mb-10">
            {STAGES.map((s, i) => {
              const isActive = s.id === activeId;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className={`relative text-left p-4 sm:p-6 rounded-xl border transition-all ${
                    isActive ? 'bg-ink-soft border-elec/40 shadow-lg' : 'bg-ink border-divider hover:border-divider/80 hover:bg-ink-soft/50'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] text-mute">0{i + 1}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? 'scale-150' : ''}`}
                      style={{ background: s.color }}
                    />
                  </div>
                  <p
                    className="font-display text-base sm:text-2xl tracking-[0.05em] font-bold mb-1"
                    style={{ color: isActive ? s.color : 'white' }}
                  >
                    {s.name}
                  </p>
                  <p className={`text-[11px] sm:text-xs leading-tight ${isActive ? 'text-platinum' : 'text-mute'}`}>
                    {s.short}
                  </p>
                </button>
              );
            })}
          </div>
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

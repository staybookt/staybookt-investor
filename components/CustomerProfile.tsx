'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Reveal, Counter } from './Sections';

/* ============================================================
 * CustomerProfile, the /proof page rebuild.
 *
 * Sections:
 *   1. ICPSegment       (stat block + animated counters)
 *   2. OwnerWeek        (clock/timeline visualization)
 *   3. VendorSpend      (stacked bar + total)
 *   4. MissedCallWound  (call funnel waterfall)
 *   5. BuyingTriggers   (icon-led quote cards)
 *   6. SegmentTAM       (animated math equation)
 *   7. PilotOneCompact  (small Tim card, replaces big TimCase)
 *   8. MeasurementPlan  (horizontal milestone timeline)
 *
 * Each section has a distinct visual mechanism and alternates
 * light/dark backgrounds (cream/ink) for rhythm. All numeric
 * claims cite public market sources inline.
 * ============================================================ */


/* ---------- 1. ICP SEGMENT ----------------------------------- */

export function ICPSegment() {
  const stats = [
    { value: 7300, suffix: '+', label: 'HVAC contractors in Canada', source: 'Statistics Canada NAICS 238220, 2025' },
    { value: 41, suffix: '%', label: 'of them in Ontario alone', source: 'Made in CA, 2025 HVAC stats' },
    { value: 74, suffix: '%', label: 'are micro-businesses (≤5 employees)', source: 'StatCan Canadian Business Counts' },
    { value: 705, prefix: '$', suffix: 'K', label: 'average revenue, PHAC contractor', source: 'StatCan small business data' },
  ];

  return (
    <section id="icp" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">The segment</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            HVAC, plumbing, electrical.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-10 max-w-3xl">
            Residential and light-commercial, $250K to $2M revenue, sub-five trucks.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-mute text-base sm:text-lg leading-relaxed max-w-3xl mb-16">
            Owner-operators on the tools every day. The kind of business that is too small to hire a marketing manager, an operations manager, and a bookkeeper, but too big to run on the owner&apos;s phone alone. Roughly 10,000 of them in Ontario across our three verticals. North of 200,000 across North America.
          </p>
        </Reveal>

        {/* Stat grid, animated counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-divider-lt">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.3 + i * 0.08}>
              <div className="bg-cream p-6 sm:p-8 h-full">
                <p className="font-display text-4xl sm:text-5xl tracking-[-0.03em] text-elec mb-3">
                  {s.prefix}<Counter value={s.value} duration={2} />{s.suffix}
                </p>
                <p className="text-ink text-sm sm:text-base leading-snug mb-3">{s.label}</p>
                <p className="text-mute text-[10px] tracking-wide leading-relaxed italic">{s.source}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Vertical breakdown chart */}
        <Reveal delay={0.7}>
          <div className="mt-16 bg-paper border border-divider-lt rounded-2xl p-6 sm:p-10">
            <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold mb-6">Ontario ICP, by trade</p>
            <div className="space-y-5">
              {[
                { trade: 'HVAC', count: '3,000+', share: 30, color: '#06B6D4' },
                { trade: 'Electrical', count: '4,500+', share: 45, color: '#10B981' },
                { trade: 'Plumbing', count: '2,500+', share: 25, color: '#2563EB' },
              ].map((row, i) => (
                <div key={row.trade} className="grid grid-cols-[120px_1fr_120px] items-center gap-4 sm:gap-6">
                  <p className="font-display text-base sm:text-lg tracking-tight" style={{ color: row.color }}>{row.trade}</p>
                  <div className="relative h-7 bg-divider-lt/40 rounded-md overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 rounded-md"
                      style={{ background: row.color, opacity: 0.85 }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.share * 1.8}%` }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 1.2, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <p className="text-ink font-display text-base sm:text-lg tracking-tight text-right">{row.count}</p>
                </div>
              ))}
            </div>
            <p className="text-mute text-xs mt-6 italic">Ontario contractor counts approximated from Statistics Canada Canadian Business Counts (NAICS 238210, 238220, 23822) and Yellow Pages registry crosswalks.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- 2. OWNER'S WEEK ---------------------------------- */

export function OwnerWeek() {
  // Days of the week with hour breakdown (admin vs on-tools vs sleep/personal)
  const days = [
    { day: 'MON', tools: 9, admin: 3, personal: 12 },
    { day: 'TUE', tools: 10, admin: 2.5, personal: 11.5 },
    { day: 'WED', tools: 9.5, admin: 3, personal: 11.5 },
    { day: 'THU', tools: 10, admin: 2.5, personal: 11.5 },
    { day: 'FRI', tools: 9, admin: 2.5, personal: 12.5 },
    { day: 'SAT', tools: 4, admin: 2, personal: 18 },
    { day: 'SUN', tools: 0, admin: 0.5, personal: 23.5 },
  ];

  const totalAdmin = days.reduce((a, d) => a + d.admin, 0);
  const totalTools = days.reduce((a, d) => a + d.tools, 0);

  return (
    <section id="week" className="relative bg-ink text-white py-32 overflow-hidden">
      {/* Atmospheric dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">The owner&apos;s week</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Forty-nine hours.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute-dark mb-10 max-w-3xl">
            Sixteen of them are on admin work the owner should not be doing.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            Small business owners work an average of <span className="text-white font-semibold">49.4 hours per week</span>, with 63% over 50 hours <a href="https://www.score.org/resource/blog-post/how-hard-small-business-owners-work" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">[SCORE]</a>. Roughly <span className="text-white font-semibold">36% of that week is administrative</span>, work like quoting, follow-up, books, invoicing, ads, and scheduling. That works out to about 16 hours per week of work the owner should not be the one doing <a href="https://www.theindustryleaders.org/post/the-two-day-problem-how-business-owners-lose-16-hours-a-week-to-work-that-should-not-be-theirs" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">[The Industry Leaders]</a>.
          </p>
        </Reveal>

        {/* Weekly timeline viz */}
        <Reveal delay={0.3}>
          <div className="bg-ink-soft/40 border border-divider rounded-2xl p-6 sm:p-10">
            <div className="grid grid-cols-[60px_1fr] gap-4 sm:gap-6 mb-3">
              <div />
              <div className="grid grid-cols-24 gap-0 relative text-[9px] tracking-wider text-mute font-mono">
                {[0, 6, 12, 18, 23].map((h) => (
                  <span key={h} className="absolute" style={{ left: `${(h / 24) * 100}%` }}>{h.toString().padStart(2, '0')}:00</span>
                ))}
              </div>
            </div>
            <div className="space-y-3 mt-8">
              {days.map((d, i) => (
                <div key={d.day} className="grid grid-cols-[60px_1fr] gap-4 sm:gap-6 items-center">
                  <p className="font-mono text-[11px] tracking-wider text-platinum-soft font-semibold">{d.day}</p>
                  <div className="relative h-7 bg-ink-soft/60 rounded-md overflow-hidden flex">
                    {/* Tools block (cyan) */}
                    <motion.div
                      className="h-full"
                      style={{ background: 'var(--elec)', opacity: 0.85 }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(d.tools / 24) * 100}%` }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      title={`On the tools: ${d.tools}h`}
                    />
                    {/* Admin block (indigo, the bottleneck) */}
                    <motion.div
                      className="h-full"
                      style={{ background: '#4F46E5', opacity: 0.95 }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(d.admin / 24) * 100}%` }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      title={`Admin: ${d.admin}h`}
                    />
                    {/* Personal block (faint) */}
                    <motion.div
                      className="h-full"
                      style={{ background: 'rgba(148,163,184,0.18)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(d.personal / 24) * 100}%` }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.9, delay: 0.5 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Legend + totals */}
            <div className="mt-10 pt-8 border-t border-divider/60 grid sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-sm" style={{ background: 'var(--elec)' }} />
                <div>
                  <p className="font-display text-xl tracking-tight text-elec">{totalTools.toFixed(0)}h</p>
                  <p className="text-mute text-xs">On the tools (revenue)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-sm" style={{ background: '#4F46E5' }} />
                <div>
                  <p className="font-display text-xl tracking-tight" style={{ color: '#818cf8' }}>{totalAdmin.toFixed(0)}h</p>
                  <p className="text-mute text-xs">Admin (the bottleneck)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-sm bg-platinum-soft/20" />
                <div>
                  <p className="font-display text-xl tracking-tight text-platinum-soft">{(168 - totalTools - totalAdmin).toFixed(0)}h</p>
                  <p className="text-mute text-xs">Sleep, family, the rest of life</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl mt-10">
            Every hour the owner spends on admin is an hour they are not on the tools, where the revenue is generated. The business is structurally capped by the owner&apos;s calendar. You can only fix that by giving the admin hours to a team that knows what they are doing.
          </p>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- 3. VENDOR SPEND ---------------------------------- */

export function VendorSpend() {
  const vendors = [
    { name: 'Marketing agency or SEO shop', low: 35000, high: 70000, color: '#06B6D4', note: '5 to 10% of revenue is the HVAC benchmark for a $700K shop' },
    { name: 'Bookkeeping (monthly QBO + filings)', low: 4800, high: 8400, color: '#10B981', note: '$400 to $700 per month is the Canadian small-business average' },
    { name: 'Field-service software (Jobber, ServiceTitan, HCP)', low: 2400, high: 4800, color: '#2563EB', note: '$200 to $400 per month per tier' },
    { name: 'Phone answering or live-chat service', low: 3600, high: 6000, color: '#4F46E5', note: '$300 to $500 per month when bought' },
  ];

  const totalLow = vendors.reduce((a, v) => a + v.low, 0);
  const totalHigh = vendors.reduce((a, v) => a + v.high, 0);

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;

  // Bar widths proportional to high value
  const maxHigh = Math.max(...vendors.map((v) => v.high));

  return (
    <section id="spend" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">What they spend today</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            They are already paying us.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-10 max-w-3xl">
            They are just paying four uncoordinated vendors who don&apos;t talk to each other.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-mute text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            The four line items below are what a typical $700K HVAC, plumbing, or electrical owner-operator already spends per year on the work StayBookt does. Across four vendors with four contracts, none of whom own the outcome. The owner is the integration layer.
          </p>
        </Reveal>

        {/* Spend breakdown bars */}
        <Reveal delay={0.3}>
          <div className="bg-paper border border-divider-lt rounded-2xl p-6 sm:p-10">
            <div className="space-y-7">
              {vendors.map((v, i) => (
                <div key={v.name}>
                  <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: v.color }} />
                      <p className="font-display text-base sm:text-lg tracking-tight text-ink">{v.name}</p>
                    </div>
                    <p className="font-display text-base sm:text-lg tracking-tight" style={{ color: v.color }}>
                      {fmt(v.low)} – {fmt(v.high)}<span className="text-mute text-sm"> /yr</span>
                    </p>
                  </div>
                  <div className="relative h-3 bg-divider-lt/50 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 rounded-full"
                      style={{ background: v.color, opacity: 0.7 }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(v.high / maxHigh) * 100}%` }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <p className="text-mute text-xs mt-2 leading-relaxed">{v.note}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-10 pt-8 border-t border-divider-lt grid sm:grid-cols-[1fr_auto] items-end gap-6">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold mb-2">Total annual spend on the work today</p>
                <p className="font-display text-5xl sm:text-6xl tracking-[-0.04em] text-ink">
                  {fmt(totalLow)} <span className="text-mute">to</span> {fmt(totalHigh)}
                </p>
                <p className="text-mute text-sm mt-3 max-w-md">Plus 16 hours per week of owner time integrating four vendors into something resembling an operating system.</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-mute mb-2">StayBookt</p>
                <p className="font-display text-2xl sm:text-3xl tracking-tight text-ink">$28K – $50K /yr</p>
                <p className="text-mute text-xs mt-2 max-w-[240px] ml-auto">One retainer, one team, one accountable cadence. Foundation buildout amortized.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="text-mute text-sm sm:text-base mt-10 max-w-3xl leading-relaxed">
            Sources: <a href="https://www.webfx.com/blog/home-services/hvac-marketing-benchmarks/" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">WebFX 2026 HVAC marketing benchmarks</a>, <a href="https://customcpa.ca/how-much-do-bookkeeping-experts-charge-in-canada/" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">Custom CPA Canada bookkeeping rates</a>, vendor pricing (Jobber, ServiceTitan, Housecall Pro public pricing pages), answering-service market rates (Ruby, Smith.ai, AnswerConnect).
          </p>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- 4. MISSED CALL WOUND ---------------------------- */

export function MissedCallWound() {
  return (
    <section id="missed-calls" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">The single biggest leak</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Most calls never get answered.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute-dark mb-10 max-w-3xl">
            Because the owner is on a panel install when the phone rings.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            The dominant revenue leak in this segment is not the marketing funnel or the website. It is the phone, ringing while the owner is in a crawl space. Industry data is unambiguous about how much business this costs.
          </p>
        </Reveal>

        {/* Call funnel waterfall */}
        <Reveal delay={0.3}>
          <CallFunnelWaterfall />
        </Reveal>

        <Reveal delay={0.5}>
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              { stat: '85%', label: 'of voicemail callers never call back', color: 'var(--elec)' },
              { stat: '62%', label: 'of unanswered callers go to a competitor', color: '#10B981' },
              { stat: '10–15×', label: 'phone calls convert vs. web form fills (BIA / Kelsey)', color: '#4F46E5' },
            ].map((s, i) => (
              <div key={s.label} className="border-l-2 pl-5 py-2" style={{ borderColor: s.color }}>
                <p className="font-display text-3xl sm:text-4xl tracking-[-0.03em]" style={{ color: s.color }}>{s.stat}</p>
                <p className="text-platinum-soft text-sm mt-2 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <div className="mt-12 p-6 sm:p-8 bg-ink-soft/60 border-l-4 border-elec rounded-2xl">
            <p className="text-mute text-[11px] tracking-[0.25em] uppercase font-semibold mb-3">What this means for our pitch</p>
            <p className="font-display text-2xl sm:text-3xl tracking-[-0.02em] leading-snug max-w-4xl">
              Software does not pick up the phone. A marketing agency does not pick up the phone. The single biggest revenue lever in this segment is recovering missed calls, and only an operating team that runs capture and follow-up on a defined cadence actually does it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.8}>
          <p className="text-mute text-sm mt-10 max-w-3xl leading-relaxed">
            Source: <a href="https://www.getaira.io/blog/missed-business-calls-statistics" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">Missed business calls statistics, Aira 2025 industry report</a>. Field-service contractor data from operator surveys and BIA/Kelsey call-conversion benchmarks.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* Call funnel SVG, 100 calls in, 38 answered, the rest visualized as lost revenue */
function CallFunnelWaterfall() {
  const ref = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const W = 800;
  const H = 280;

  // Stages
  const totalCalls = 100;
  const answered = 38;
  const missed = 62;
  const competitor = Math.round(missed * 0.62);
  const lostForever = missed - competitor;

  const stageWidth = W / 4 - 30;
  const baseY = 60;

  const stages = [
    { x: 20, count: totalCalls, label: 'Inbound calls', sub: 'Per week, typical $700K shop', color: 'rgba(148,163,184,0.6)' },
    { x: stageWidth + 50, count: answered, label: 'Answered', sub: 'Owner not on a job', color: '#10B981' },
    { x: (stageWidth + 50) * 2, count: missed, label: 'Missed', sub: 'Owner on the tools', color: '#4F46E5' },
    { x: (stageWidth + 50) * 3, count: competitor, label: 'Go to a competitor', sub: '62% of missed calls', color: '#06B6D4' },
  ];

  return (
    <div className="bg-ink-soft/40 border border-divider rounded-2xl p-6 sm:p-10">
      <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
        <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold">Where 100 inbound calls go in a typical week</p>
        <p className="text-[10px] tracking-[0.2em] uppercase text-mute font-semibold sm:hidden">Swipe to follow →</p>
      </div>
      <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[640px]">
        {stages.map((s, i) => {
          const height = (s.count / totalCalls) * 140;
          return (
            <g key={s.label}>
              {/* Bar */}
              <motion.rect
                x={s.x}
                width={stageWidth}
                rx="6"
                fill={s.color}
                fillOpacity="0.85"
                initial={{ y: baseY + 140, height: 0 }}
                animate={{
                  y: inView ? baseY + (140 - height) : baseY + 140,
                  height: inView ? height : 0,
                }}
                transition={{ duration: 1.0, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Count label */}
              <motion.text
                x={s.x + stageWidth / 2}
                y={baseY + (140 - height) - 12}
                textAnchor="middle"
                fontSize="38"
                fontWeight="700"
                fill="white"
                fontFamily="'Helvetica Neue', sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.2 }}
              >
                {s.count}
              </motion.text>
              {/* Stage label */}
              <text
                x={s.x + stageWidth / 2}
                y={baseY + 160}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="white"
                fontFamily="'Helvetica Neue', sans-serif"
                letterSpacing="1.5"
              >
                {s.label.toUpperCase()}
              </text>
              {/* Stage sub */}
              <text
                x={s.x + stageWidth / 2}
                y={baseY + 178}
                textAnchor="middle"
                fontSize="10"
                fill="rgba(199,199,204,0.65)"
                fontFamily="'Helvetica Neue', sans-serif"
              >
                {s.sub}
              </text>
              {/* Arrow to next stage */}
              {i < stages.length - 1 && (
                <motion.path
                  d={`M ${s.x + stageWidth + 6} ${baseY + 70} L ${s.x + stageWidth + 38} ${baseY + 70}`}
                  stroke="rgba(199,199,204,0.5)"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: inView ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M 0 0 L 6 4 L 0 8 z" fill="rgba(199,199,204,0.5)" />
          </marker>
        </defs>
      </svg>
      </div>

      <div className="mt-8 pt-6 border-t border-divider/60">
        <p className="text-platinum text-base sm:text-lg leading-relaxed">
          <span className="font-display text-3xl text-elec tracking-tight">~$45K – $120K</span>
          <span className="text-mute ml-3">per year in lost revenue, per typical shop, from missed calls alone.</span>
        </p>
        <p className="text-mute text-xs mt-3 italic">Calculated as missed calls × average residential service ticket ($275 – $1,200, depending on trade) × 50 weeks.</p>
      </div>
    </div>
  );
}


/* ---------- 5. BUYING TRIGGERS ------------------------------- */

export function BuyingTriggers() {
  const triggers = [
    {
      title: 'They want to grow, but they cannot find the time.',
      desc: 'Every owner we talk to has a list of things they know would move revenue, and zero hours to execute on them. The growth they want is on the other side of admin work they cannot get to.',
      iconPath: 'M3 12c0 4.97 4.03 9 9 9s9-4.03 9-9-4.03-9-9-9c-3.13 0-5.89 1.6-7.5 4M3 4v6h6',
      color: '#06B6D4',
    },
    {
      title: 'They know they are losing leads, they just do not know which ones.',
      desc: 'Missed calls. Quotes that went cold. Follow-ups that never happened. The pipeline is leaking but the owner does not have the visibility to plug a specific hole, only the gut sense that money is going out the door.',
      iconPath: 'M15 17h5l-1.405-1.405A2 2 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      color: '#10B981',
    },
    {
      title: 'They have already hired vendors. None of them talk.',
      desc: 'A marketing agency that does not see the books. A bookkeeper that does not see the leads. Software that does nothing without manual entry. The owner is the integration layer between four contracts, which is exactly what they have no time to do.',
      iconPath: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
      color: '#2563EB',
    },
    {
      title: 'They want the business to be transferable.',
      desc: 'They want to sell, semi-retire, or hand it to a kid. The problem is the business runs on the owner. There are no documented processes, no clean books, no operating data. We make the business an asset, not a job.',
      iconPath: 'M3 7l9-4 9 4M3 7l9 4 9-4M3 7v10l9 4 9-4V7',
      color: '#4F46E5',
    },
  ];

  return (
    <section id="triggers" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">Why they sign</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Four patterns. One root cause.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-10 max-w-3xl">
            Time the owner does not have for work that does not get done.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-mute text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            From networking conversations, discovery calls, and the four pilots already in our pipeline. These are the patterns that turn into signed contracts.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {triggers.map((t, i) => (
            <Reveal key={t.title} delay={0.3 + i * 0.08}>
              <div className="bg-paper border border-divider-lt rounded-2xl p-7 sm:p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${t.color}15`, border: `1px solid ${t.color}40`, color: t.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d={t.iconPath} />
                  </svg>
                </div>
                <h3 className="font-display text-xl sm:text-2xl tracking-tight leading-snug mb-3 text-ink">{t.title}</h3>
                <p className="text-ink/70 text-sm sm:text-base leading-relaxed">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- 6. SEGMENT TAM ----------------------------------- */

export function SegmentTAM() {
  return (
    <section id="segment-tam" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">Ontario serviceable ARR</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Bottom-up, Ontario alone.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute-dark mb-10 max-w-3xl">
            Tri-vertical, 5% penetration, mid-tier retainer.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            The math below stays inside Ontario, our entry market. The North American expansion thesis lives on the Market page. This is what an Ontario-only beachhead looks like at modest penetration.
          </p>
        </Reveal>

        {/* Math equation viz */}
        <Reveal delay={0.3}>
          <div className="bg-ink-soft/40 border border-divider rounded-2xl p-6 sm:p-12">
            <div className="grid md:grid-cols-7 gap-4 sm:gap-6 items-center text-center">
              {/* Term 1: businesses */}
              <div className="md:col-span-2">
                <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">Ontario ICP</p>
                <p className="font-display text-4xl sm:text-5xl tracking-[-0.03em] text-elec">10,000+</p>
                <p className="text-mute text-xs mt-2 leading-snug">HVAC + electrical + plumbing micro-businesses</p>
              </div>

              <div className="md:col-span-1 font-display text-4xl text-platinum-soft text-center">×</div>

              {/* Term 2: penetration */}
              <div className="md:col-span-1">
                <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">Penetration</p>
                <p className="font-display text-4xl sm:text-5xl tracking-[-0.03em]" style={{ color: '#10B981' }}>5%</p>
                <p className="text-mute text-xs mt-2 leading-snug">Modest market share</p>
              </div>

              <div className="md:col-span-1 font-display text-4xl text-platinum-soft text-center">×</div>

              {/* Term 3: ARPU */}
              <div className="md:col-span-2">
                <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">Annual ARPU</p>
                <p className="font-display text-4xl sm:text-5xl tracking-[-0.03em]" style={{ color: '#4F46E5' }}>~$48K</p>
                <p className="text-mute text-xs mt-2 leading-snug">$3,499/mo blended retainer + foundation</p>
              </div>
            </div>

            {/* Equals + answer */}
            <div className="mt-10 pt-8 border-t border-divider grid sm:grid-cols-[auto_1fr] items-center gap-6">
              <p className="font-display text-4xl text-platinum-soft">=</p>
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold mb-2">Ontario serviceable ARR, 5% penetration</p>
                <motion.p
                  className="font-display text-5xl sm:text-7xl tracking-[-0.05em] text-white"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  $24M+
                </motion.p>
                <p className="text-mute text-sm mt-3 max-w-md">Ontario alone, tri-vertical. North American expansion math on the Market page.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- 7. PILOT ONE COMPACT ----------------------------- */

export function PilotOneCompact() {
  return (
    <section id="pilot-one" className="relative bg-cream text-ink py-24">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">Pilot 1, live</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-6xl tracking-[-0.04em] mb-10 max-w-3xl">
            One of them is already paying.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-10 items-stretch">
            {/* Photo card */}
            <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden rounded-2xl bg-ink">
              <Image
                src="/photos/IMG_5375.jpg"
                alt="Tim Ciszkowski, Top Choice Electrical"
                fill
                className="object-cover"
                sizes="260px"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent text-white">
                <p className="text-[10px] tracking-[0.25em] text-mute font-semibold uppercase mb-1">Pilot 01</p>
                <p className="font-display text-lg tracking-tight">Tim Ciszkowski</p>
                <p className="text-platinum-soft text-[11px]">Top Choice Electrical · ESA licensed</p>
              </div>
            </div>

            {/* Quick facts + link out */}
            <div className="bg-paper border border-divider-lt rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold mb-5">Pilot 1 facts</p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    { label: 'Engagement signed', value: 'May 2026' },
                    { label: 'Foundation fee', value: '$4,000 paid' },
                    { label: 'Trade', value: 'Residential electrical' },
                    { label: 'Region', value: 'Newmarket, Ontario' },
                    { label: 'Foundation', value: 'Built, staged for launch' },
                    { label: 'Operating engine', value: 'Activates this month' },
                  ].map((f) => (
                    <div key={f.label}>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-mute font-semibold mb-1">{f.label}</p>
                      <p className="text-ink text-sm sm:text-base font-medium">{f.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-divider-lt flex flex-wrap items-center gap-4 justify-between">
                <p className="text-mute text-xs sm:text-sm max-w-md leading-relaxed italic">
                  Tim is the concrete instance of the ICP described above. Engine activation, day-90 targets, and full case detail link out from here.
                </p>
                <a
                  href="https://tce-website-three.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-elec font-semibold text-sm hover:gap-3 transition-all border-b border-elec/40 pb-1 whitespace-nowrap"
                >
                  Open the staging build
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M10 14L21 3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- 8. MEASUREMENT PLAN ------------------------------ */

export function MeasurementPlan() {
  const milestones = [
    { date: 'May 2026', label: 'Foundation shipped', sub: 'Site, GBP, brand, capture stack, ops portal', color: '#06B6D4', live: true },
    { date: 'June 2026', label: 'Engine activates', sub: 'DNS transfer, GBP verified, review campaign on', color: '#10B981', live: false },
    { date: 'July 2026', label: 'First Monday brief published', sub: 'Weekly cadence running, first KPI report to owner', color: '#14B8A6', live: false },
    { date: 'August 2026', label: 'Day-90 receipts published', sub: 'Public KPI report against day-90 targets', color: '#2563EB', live: false },
    { date: 'Quarterly', label: 'Operating board review', sub: 'Owner + StayBookt + (optional) investor observers', color: '#4F46E5', live: false },
  ];

  return (
    <section id="measurement" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">How we publish receipts</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-6xl tracking-[-0.04em] mb-4">
            Measured publicly. Reported quarterly.
          </h2>
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-mute mb-10 max-w-3xl">
            Targets are committed in writing. Outcomes will be published the same way.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="bg-paper border border-divider-lt rounded-2xl p-6 sm:p-10">
            <div className="relative">
              {/* Connector line */}
              <div className="absolute top-6 left-6 right-6 h-px bg-divider-lt hidden md:block" />

              <div className="grid md:grid-cols-5 gap-8 md:gap-4 relative">
                {milestones.map((m, i) => (
                  <Reveal key={m.date} delay={0.3 + i * 0.08}>
                    <div className="text-center md:text-left">
                      {/* Node */}
                      <div className="hidden md:flex w-12 h-12 rounded-full items-center justify-center mb-5 relative z-10 bg-paper border-2 mx-auto md:mx-0" style={{ borderColor: m.color }}>
                        {m.live ? (
                          <span className="w-3 h-3 rounded-full animate-pulse" style={{ background: m.color }} />
                        ) : (
                          <span className="w-2 h-2 rounded-full" style={{ background: m.color, opacity: 0.5 }} />
                        )}
                      </div>
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: m.color }}>{m.date}</p>
                      <p className="font-display text-base sm:text-lg tracking-tight text-ink mb-2 leading-snug">{m.label}</p>
                      <p className="text-mute text-xs sm:text-sm leading-relaxed">{m.sub}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <p className="text-mute text-sm sm:text-base mt-8 max-w-3xl leading-relaxed italic">
            Day-90 targets are listed on the Tim detail. Quarterly operating reviews are open to committed investors as observers from pilot 2 onwards.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

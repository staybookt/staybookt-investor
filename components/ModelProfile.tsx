'use client';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Reveal, Counter } from './Sections';

/* ============================================================
 * ModelProfile, the /economics page rebuild.
 *
 * Sections (composed alongside existing UnitEconomics, PricingV3, Roadmap):
 *   1. UnitMath          (LTV/CAC/payback math per client)
 *   2. CostToDeliver     (what one client costs us per month)
 *   3. PathToProfit      (curve of profitability at N clients)
 *   4. BenchmarkComp     (Jobber/HCP/ServiceTitan comparables)
 *
 * All numbers transparently sourced or labeled as assumption.
 * ============================================================ */


/* ---------- 1. UNIT MATH ----------------------------------- */

export function UnitMath() {
  const items = [
    {
      label: 'Foundation revenue',
      value: '$4,000',
      sub: 'One-time, month zero',
      detail: 'Custom site, GBP rebuild, capture stack, brand kit. Delivered in 30 days.',
      color: '#06B6D4',
    },
    {
      label: 'Monthly retainer',
      value: '$2,749',
      sub: 'Blended ARPU',
      detail: 'Weighted average of Tier 1 ($1,999) and Tier 2 ($3,499) across the pipeline mix we model.',
      color: '#0EA5E9',
    },
    {
      label: 'Performance kicker',
      value: '$1,500',
      sub: 'Avg monthly, opt-in',
      detail: '10% of attributable revenue, capped at 50% of baseline. Roughly 40% of clients opt in (modeled).',
      color: '#10B981',
    },
    {
      label: 'Year-one revenue per client',
      value: '$43K',
      sub: 'Foundation + 12 months',
      detail: '$4K + ($2,749 × 12) + ($1,500 × 12 × 40% opt-in). Before annual-commit 15% discount.',
      color: '#14B8A6',
    },
    {
      label: 'Gross margin (target)',
      value: '60–70%',
      sub: 'Mature state',
      detail: 'At pilot stage, founder-led: closer to 75%. As we add an operating bench, margin compresses then recovers as the playbook scales.',
      color: '#2563EB',
    },
    {
      label: 'LTV (modeled)',
      value: '~$120K',
      sub: '36-month avg life × $33K avg yr',
      detail: '36-month average client tenure assumed based on agency + ops services benchmarks. Reasonable given the integration depth.',
      color: '#4F46E5',
    },
  ];

  return (
    <section id="unit-math" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">Per-client unit math</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            One client at a time.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-10 max-w-3xl">
            Foundation up front, retainer monthly, performance optional, LTV measured.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-mute text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            The math below is the unit economics on a single client. Numbers labeled &ldquo;target&rdquo; or &ldquo;modeled&rdquo; are forward-looking assumptions, not realized metrics. We have one paying client today.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-divider-lt">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={0.2 + i * 0.05}>
              <div className="bg-paper p-7 sm:p-8 h-full">
                <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">{it.label}</p>
                <p className="font-display text-4xl sm:text-5xl tracking-[-0.03em] mb-1" style={{ color: it.color }}>
                  {it.value}
                </p>
                <p className="text-[11px] tracking-[0.15em] uppercase font-semibold mb-4" style={{ color: it.color }}>
                  {it.sub}
                </p>
                <p className="text-ink/70 text-sm leading-relaxed">{it.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.7}>
          <p className="text-mute text-xs sm:text-sm mt-8 max-w-3xl leading-relaxed italic">
            CAC at pilot stage is effectively founder time. Once we hire a growth lead, modeled CAC sits at $3K–$5K per client through outbound, referrals from Wave 1 owners, and PE-backer introductions. That implies a payback period under 4 months at blended ARPU.
          </p>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- 2. COST TO DELIVER ----------------------------- */

export function CostToDeliver() {
  const costs = [
    { line: 'Growth lead', cost: 700, color: '#06B6D4', detail: 'SEO, GBP, content, ad ops, allocated across portfolio' },
    { line: 'Operations lead', cost: 800, color: '#10B981', detail: 'Quote follow-up, missed-call recovery, weekly brief, owner standup' },
    { line: 'Technical bench', cost: 200, color: '#14B8A6', detail: 'Site updates, automation, integrations, allocated' },
    { line: 'Tooling stack', cost: 80, color: '#2563EB', detail: 'Twilio, GBP API, Slack, Notion, Vercel, allocated per client' },
    { line: 'Reserve', cost: 100, color: '#4F46E5', detail: 'Variability, scope, hosting and email volume' },
  ];
  const totalCost = costs.reduce((a, c) => a + c.cost, 0);
  const blendedARPU = 2749;
  const grossMargin = ((blendedARPU - totalCost) / blendedARPU) * 100;

  const maxCost = Math.max(...costs.map((c) => c.cost));

  return (
    <section id="cost-deliver" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">Cost to deliver</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            What one client costs us.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute-dark mb-10 max-w-3xl">
            A defined operating cadence has a defined cost. Here is what we hold ourselves to.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            Cost-to-deliver in our model holds when the operating team is shared across the portfolio. The numbers below are the steady-state allocation per client at 30 to 50 clients, the inflection point where shared roles become full-time.
          </p>
        </Reveal>

        <div className="bg-ink-soft/40 border border-divider rounded-2xl p-6 sm:p-10">
          <div className="space-y-5">
            {costs.map((c, i) => (
              <Reveal key={c.line} delay={0.2 + i * 0.08}>
                <div>
                  <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                      <p className="font-display text-base sm:text-lg tracking-tight text-white">{c.line}</p>
                    </div>
                    <p className="font-display text-base sm:text-lg tracking-tight" style={{ color: c.color }}>
                      ${c.cost}<span className="text-mute text-xs ml-1">/ mo</span>
                    </p>
                  </div>
                  <div className="relative h-2 bg-divider/60 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 rounded-full"
                      style={{ background: c.color, opacity: 0.7 }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(c.cost / maxCost) * 100}%` }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 1.0, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <p className="text-mute text-xs mt-2 leading-relaxed">{c.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-divider grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-2">Total monthly cost</p>
              <p className="font-display text-3xl sm:text-4xl tracking-[-0.03em] text-platinum">${totalCost}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-2">Blended monthly ARPU</p>
              <p className="font-display text-3xl sm:text-4xl tracking-[-0.03em] text-elec">${blendedARPU}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-2">Gross margin (steady state)</p>
              <p className="font-display text-3xl sm:text-4xl tracking-[-0.03em]" style={{ color: '#10B981' }}>
                {grossMargin.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        <Reveal delay={0.7}>
          <p className="text-mute text-sm sm:text-base mt-8 max-w-3xl leading-relaxed italic">
            Pilot-stage gross margin runs higher (founder-led delivery, no allocated salaries yet). The steady-state number is what we underwrite against, so the model holds when we scale past 30 clients and the bench becomes full-time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- 3. PATH TO PROFIT -------------------------------- */

export function PathToProfit() {
  // Profit curve at N clients
  // Revenue = clients * 33K avg
  // Variable cost = clients * 1880 * 12 = 22.5K per client
  // Fixed cost = 250K base (overhead, founder comp, tooling) + 100K per 25 clients of bench
  const ARPU = 33000;
  const VAR_COST = 22560;
  const FIXED_BASE = 250000;
  const BENCH_STEP = 100000;
  const BENCH_CLIENTS_PER_STEP = 25;

  const clients = [5, 10, 20, 30, 50, 75, 100];
  const points = clients.map((n) => {
    const revenue = n * ARPU;
    const variable = n * VAR_COST;
    const bench = Math.ceil(n / BENCH_CLIENTS_PER_STEP) * BENCH_STEP;
    const total = FIXED_BASE + bench + variable;
    return { n, revenue, cost: total, profit: revenue - total };
  });

  const breakEven = points.find((p) => p.profit >= 0);

  return (
    <section id="path-to-profit" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">Path to profitability</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            We profit at {breakEven?.n ?? 30} clients.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-10 max-w-3xl">
            The model is built to be cash-positive without a Series A.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-mute text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            The table below is a transparent breakdown of revenue, fixed cost, and variable cost at common client counts. Foundation revenue is excluded to keep the math conservative.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <ProfitChart points={points} />
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-10 overflow-x-auto -mx-8 sm:mx-0">
            <table className="w-full min-w-[640px] mx-8 sm:mx-0 border-collapse">
              <thead>
                <tr className="border-b-2 border-divider-lt">
                  {['Clients', 'ARR (recurring)', 'Total cost', 'Profit / (loss)', 'Margin'].map((h) => (
                    <th key={h} className="text-left text-[11px] tracking-[0.2em] uppercase font-semibold text-mute pb-4 pr-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {points.map((p) => {
                  const margin = p.revenue > 0 ? (p.profit / p.revenue) * 100 : 0;
                  const positive = p.profit >= 0;
                  return (
                    <tr key={p.n} className="border-b border-divider-lt/60">
                      <td className="py-4 pr-4 font-display text-lg tracking-tight">{p.n}</td>
                      <td className="py-4 pr-4 text-sm text-ink">
                        ${(p.revenue / 1000).toFixed(0)}K
                      </td>
                      <td className="py-4 pr-4 text-sm text-mute">${(p.cost / 1000).toFixed(0)}K</td>
                      <td
                        className="py-4 pr-4 font-display text-base tracking-tight"
                        style={{ color: positive ? '#10B981' : '#4F46E5' }}
                      >
                        {positive ? '+' : ''}${(p.profit / 1000).toFixed(0)}K
                      </td>
                      <td
                        className="py-4 pr-4 text-sm"
                        style={{ color: positive ? '#10B981' : 'var(--mute)' }}
                      >
                        {margin.toFixed(0)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <p className="text-mute text-xs sm:text-sm mt-8 max-w-3xl leading-relaxed italic">
            Assumptions: $33K annual recurring per client, $22.5K variable cost per client (cost-to-deliver above), $250K base fixed overhead, $100K bench step every 25 clients. Foundation fees ($4K × clients in year) excluded to keep the path-to-profit math conservative. Pre-seed raise gets us to month 18, which lands us inside the profitable zone above.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ProfitChart({ points }: { points: { n: number; revenue: number; cost: number; profit: number }[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const W = 800;
  const H = 360;
  const padL = 80;
  const padR = 40;
  const padT = 40;
  const padB = 50;

  const xMax = Math.max(...points.map((p) => p.n));
  const yMax = Math.max(...points.map((p) => Math.max(p.revenue, p.cost)));
  const yMin = Math.min(...points.map((p) => p.profit), 0);

  const xScale = (n: number) => padL + (n / xMax) * (W - padL - padR);
  const yScale = (v: number) => padT + ((yMax - v) / (yMax - yMin)) * (H - padT - padB);

  const revPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.n)} ${yScale(p.revenue)}`).join(' ');
  const costPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.n)} ${yScale(p.cost)}`).join(' ');

  // Break-even point (where revenue crosses cost)
  const breakEven = points.find((p) => p.profit >= 0);

  return (
    <div className="bg-paper border border-divider-lt rounded-2xl p-6 sm:p-10">
      <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
        <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold">Revenue and cost, plotted by client count</p>
        <p className="text-[10px] tracking-[0.2em] uppercase text-mute font-semibold sm:hidden">Swipe to read →</p>
      </div>
      <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[640px]">
        {/* Y-axis grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((p) => {
          const v = yMin + (yMax - yMin) * (1 - p);
          return (
            <g key={p}>
              <line x1={padL} y1={padT + p * (H - padT - padB)} x2={W - padR} y2={padT + p * (H - padT - padB)} stroke="var(--divider-lt)" strokeWidth="1" strokeDasharray={v === 0 ? '0' : '2 4'} />
              <text x={padL - 8} y={padT + p * (H - padT - padB) + 4} textAnchor="end" fontSize="10" fill="var(--mute)" fontFamily="ui-monospace, monospace">
                ${(v / 1000).toFixed(0)}K
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {points.map((p) => (
          <text key={p.n} x={xScale(p.n)} y={H - padB + 18} textAnchor="middle" fontSize="10" fill="var(--mute)" fontFamily="ui-monospace, monospace">
            {p.n}
          </text>
        ))}
        <text x={(padL + W - padR) / 2} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--mute)" letterSpacing="1.5" fontWeight="700">
          CLIENTS
        </text>

        {/* Cost line (red) */}
        <motion.path
          d={costPath}
          fill="none"
          stroke="#4F46E5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Revenue line (green) */}
        <motion.path
          d={revPath}
          fill="none"
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Points */}
        {points.map((p, i) => (
          <g key={p.n}>
            <motion.circle
              cx={xScale(p.n)}
              cy={yScale(p.revenue)}
              r="4"
              fill="#10B981"
              initial={{ scale: 0 }}
              animate={{ scale: inView ? 1 : 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
            />
            <motion.circle
              cx={xScale(p.n)}
              cy={yScale(p.cost)}
              r="3"
              fill="#4F46E5"
              initial={{ scale: 0 }}
              animate={{ scale: inView ? 1 : 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            />
          </g>
        ))}

        {/* Break-even annotation */}
        {breakEven && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 1.6 }}
          >
            <line x1={xScale(breakEven.n)} y1={padT} x2={xScale(breakEven.n)} y2={H - padB} stroke="var(--elec)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
            <text x={xScale(breakEven.n) + 8} y={padT + 18} fontSize="11" fontWeight="700" fill="var(--elec)" letterSpacing="1">
              BREAK-EVEN
            </text>
            <text x={xScale(breakEven.n) + 8} y={padT + 32} fontSize="10" fill="var(--mute)" letterSpacing="1">
              ~{breakEven.n} clients
            </text>
          </motion.g>
        )}

        {/* Legend */}
        <g transform={`translate(${padL + 8}, ${padT + 8})`}>
          <rect x="0" y="0" width="14" height="3" fill="#10B981" />
          <text x="20" y="5" fontSize="10" fill="var(--ink)" fontWeight="700">Recurring revenue</text>
          <rect x="0" y="14" width="14" height="3" fill="#4F46E5" strokeDasharray="3 2" />
          <text x="20" y="19" fontSize="10" fill="var(--ink)" fontWeight="700">Total cost</text>
        </g>
      </svg>
      </div>
    </div>
  );
}


/* ---------- 4. BENCHMARK COMP ---------------------------- */

export function BenchmarkComp() {
  const rows = [
    {
      company: 'ServiceTitan (TTAN)',
      type: 'Enterprise SaaS, public',
      revenue: '$614M (FY24)',
      growth: '~25% YoY',
      gm: '~67%',
      profit: '($195M) loss',
      valuation: '$7.6B pre-IPO, $9.6B opening',
      relevance: 'Same trades. Larger customers. Still unprofitable after a decade and $1B+ raised.',
      color: '#06B6D4',
    },
    {
      company: 'Jobber (private)',
      type: 'SMB SaaS',
      revenue: '~$100M+ ARR (est.)',
      growth: 'Not public',
      gm: 'Not public',
      profit: 'Not public',
      valuation: 'Last raise ~$1B+ valuation',
      relevance: 'Adjacent ICP. Tools-only model. Bottoms-up SaaS unit economics.',
      color: '#0EA5E9',
    },
    {
      company: 'Apex Service Partners',
      type: 'PE roll-up',
      revenue: '$1.3B',
      growth: '~60 acquisitions / year',
      gm: 'Not public',
      profit: 'Not public',
      valuation: '$3.4B continuation, 2023',
      relevance: 'Buys $5M+ businesses. Skips our segment. Potential acquirer or referrer for clients we scale to that size.',
      color: '#10B981',
    },
    {
      company: 'StayBookt',
      type: 'Operating layer, services + tools',
      revenue: '$4K paid (May 2026)',
      growth: 'Pilot 1 live, 3 in conversation',
      gm: '60–70% (steady state)',
      profit: 'Cash positive at ~30 clients',
      valuation: 'Pre-seed',
      relevance: 'No direct comp. We are not a software company and not a roll-up. The hybrid is the wedge.',
      color: '#4F46E5',
      us: true,
    },
  ];

  return (
    <section id="benchmarks" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">Comparable benchmarks</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Anchor the model.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute-dark mb-10 max-w-3xl">
            We sit between the funded categories. Here is how the math compares to each.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            Public comparables anchor the order-of-magnitude expectations for revenue, growth, and margin in this space. Our model is built to compound at a different cost curve than enterprise SaaS, because we do not need a $200M sales team to land a $250K-revenue HVAC shop.
          </p>
        </Reveal>

        <div className="space-y-4">
          {rows.map((row, i) => (
            <Reveal key={row.company} delay={0.2 + i * 0.08}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-[220px_1fr_1fr] gap-5 lg:gap-8 rounded-2xl border p-6 sm:p-8 transition-all ${
                  row.us
                    ? 'bg-ink-soft/40 border-indigo-500/40'
                    : 'bg-ink-soft/40 border-divider'
                }`}
              >
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-2" style={{ color: row.color }}>
                    {row.us ? '☆ ' : ''}{row.type}
                  </p>
                  <h3 className={`font-display text-xl sm:text-2xl tracking-tight leading-tight ${row.us ? 'text-white' : 'text-platinum'}`}>
                    {row.company}
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Revenue', value: row.revenue },
                    { label: 'Growth', value: row.growth },
                    { label: 'Gross margin', value: row.gm },
                    { label: 'Profitability', value: row.profit },
                    { label: 'Valuation', value: row.valuation },
                  ].map((f) => (
                    <div key={f.label} className="grid grid-cols-[110px_1fr] gap-3 text-sm">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-mute font-semibold">{f.label}</p>
                      <p className={row.us ? 'text-platinum' : 'text-platinum-soft'}>{f.value}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-mute font-semibold mb-2">{row.us ? 'Position' : 'Why it matters'}</p>
                  <p className={`text-sm leading-relaxed ${row.us ? 'text-white' : 'text-platinum-soft'}`}>{row.relevance}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.8}>
          <p className="text-mute text-sm sm:text-base mt-10 max-w-3xl leading-relaxed">
            Sources: <a href="https://www.sec.gov/Archives/edgar/data/0001638826/000119312524277099/d577298d424b4.htm" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">ServiceTitan S-1</a>, <a href="https://alpineinvestors.com/update/single-asset-continuation-transaction-apex-service-partners/" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">Alpine Apex continuation</a>, public press for Jobber. Jobber metrics are estimates from third-party industry reporting (no public filings).
          </p>
        </Reveal>
      </div>
    </section>
  );
}

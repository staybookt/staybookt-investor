'use client';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Reveal, Counter } from './Sections';

/* ============================================================
 * MarketProfile, the /opportunity page rebuild.
 *
 * Sections:
 *   1. CapitalFlow   (timeline of where smart money landed)
 *   2. TwoLayers     (positioning chart: software vs consolidation vs StayBookt)
 *   3. SilverTsunami (owner-succession demographics + timing)
 *   4. NamedComp     (comp landscape with real named players)
 *   5. MoatFour      (four defensibility theses, refreshed)
 *
 * Each section has its own visualization. Cited inline.
 * ============================================================ */


/* ---------- 1. CAPITAL FLOW ---------------------------------- */

export function CapitalFlow() {
  const events = [
    {
      date: 'Dec 2024',
      headline: 'ServiceTitan IPO',
      detail: 'Cloud SaaS for HVAC, plumbing, electrical. Priced at $71, opened at $101 on Nasdaq (TTAN). Pre-IPO valuation $7.6B. FY2024 revenue $614M.',
      stat: '$9.6B',
      statSub: 'opening market cap',
      color: '#06B6D4',
    },
    {
      date: 'Oct 2023',
      headline: 'Apex Service Partners $3.4B continuation',
      detail: 'One of the largest single-business continuation transactions in PE history. Alpine Investors + Partners Group. Apex now ~300 businesses, $1.3B annual revenue, 107 brands.',
      stat: '$3.4B',
      statSub: 'single-asset continuation',
      color: '#10B981',
    },
    {
      date: '2025',
      headline: 'Apex adds 60 more businesses',
      detail: 'In a single year. Largest residential HVAC/plumbing/electrical roll-up in the United States, by deal volume.',
      stat: '60',
      statSub: 'add-ons in one year',
      color: '#14B8A6',
    },
    {
      date: 'Sep 2025',
      headline: 'Wrench Group $1.3B refinancing',
      detail: 'Led by Blue Owl and Oak Hill. Signals continued sponsor support for platform expansion. Wrench operates HVAC, plumbing, electrical across the southeast US.',
      stat: '$1.3B',
      statSub: 'debt refinancing',
      color: '#2563EB',
    },
  ];

  return (
    <section id="capital" className="relative bg-ink text-white py-32 overflow-hidden">
      {/* Atmospheric */}
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
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Where the smart money landed</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Capital is already here.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute-dark mb-10 max-w-3xl">
            The trades are no longer a sleepy sector. They are a category every operator-investor is funding.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            The four events below, all in the last two years, anchor the thesis. The category is funded at both ends. The middle, where the actual operating work happens for sub-$2M owner-operators, is empty.
          </p>
        </Reveal>

        {/* Timeline of events */}
        <Reveal delay={0.3}>
          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-6 sm:left-8 top-2 bottom-2 w-px bg-divider" />
            <div className="space-y-8">
              {events.map((e, i) => (
                <Reveal key={e.headline} delay={0.1 + i * 0.1}>
                  <div className="grid grid-cols-[48px_1fr] sm:grid-cols-[64px_1fr] gap-5 sm:gap-8 items-start">
                    {/* Node */}
                    <div className="relative pt-2">
                      <motion.div
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative z-10 bg-ink-soft border-2"
                        style={{ borderColor: e.color }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                      </motion.div>
                    </div>

                    {/* Card */}
                    <div className="bg-ink-soft/60 border border-divider rounded-2xl p-6 sm:p-8">
                      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
                        <p className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: e.color }}>
                          {e.date}
                        </p>
                        <p className="font-display text-3xl sm:text-4xl tracking-[-0.03em]" style={{ color: e.color }}>
                          {e.stat}
                          <span className="text-mute text-xs ml-2 font-sans tracking-normal normal-case">{e.statSub}</span>
                        </p>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl tracking-tight text-white mb-3 leading-snug">{e.headline}</h3>
                      <p className="text-platinum-soft text-sm sm:text-base leading-relaxed">{e.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.8}>
          <p className="text-mute text-sm sm:text-base mt-12 max-w-3xl leading-relaxed">
            Sources: <a href="https://www.sec.gov/Archives/edgar/data/0001638826/000119312524277099/d577298d424b4.htm" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">ServiceTitan S-1 (SEC)</a>, <a href="https://alpineinvestors.com/update/single-asset-continuation-transaction-apex-service-partners/" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">Alpine Investors press release</a>, <a href="https://www.craftflow.com/dossier/what-companies-has-apex-service-partners-acquired" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">Apex Service Partners acquisitions tracker (Craft)</a>, <a href="https://ctacquisitions.com/guides/private-equity-hvac-2026/" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">PE in HVAC 2026 industry report</a>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- 2. TWO LAYERS, ONE GAP ---------------------------- */

export function TwoLayers() {
  return (
    <section id="two-layers" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">The two funded layers</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Software above. Consolidation above.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-10 max-w-3xl">
            The owner-operator is the gap between them.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-mute text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            The chart below maps the two layers of trades capital against business size. ServiceTitan and Jobber sell to operators that already have a dispatcher. Apex and Sila acquire operators that already have $5M+ EBITDA. Nobody is serving the $250K to $2M owner-operator, because that segment is too small for enterprise software and too small for roll-up acquisition. That is the segment we run.
          </p>
        </Reveal>

        {/* Positioning chart */}
        <Reveal delay={0.3}>
          <PositioningChart />
        </Reveal>

        <Reveal delay={0.7}>
          <p className="text-mute text-sm sm:text-base mt-10 max-w-3xl leading-relaxed">
            ServiceTitan public revenue ~$614M FY24 ($7.6B pre-IPO valuation). Apex Service Partners ~$1.3B revenue across ~300 acquired businesses. Both verticals target operators at the top of the size distribution. The bottom 74% of contractors (StatCan: micro-businesses, ≤5 employees) is uncovered.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PositioningChart() {
  const W = 960;
  const H = 480;
  const padL = 160;
  const padR = 60;
  const padT = 50;
  const padB = 80;

  const players = [
    // Software layer (top of vertical axis = serves larger businesses)
    { name: 'ServiceTitan', x: 0.45, y: 0.18, size: 'lg', layer: 'software', color: '#06B6D4', sub: '$7.6B val' },
    { name: 'Jobber', x: 0.30, y: 0.30, size: 'md', layer: 'software', color: '#06B6D4', sub: '$600M+ raised' },
    { name: 'Housecall Pro', x: 0.25, y: 0.40, size: 'md', layer: 'software', color: '#06B6D4', sub: '' },
    { name: 'Workiz', x: 0.20, y: 0.50, size: 'sm', layer: 'software', color: '#06B6D4', sub: '' },
    // Consolidation layer (top-right = serves larger + acquires)
    { name: 'Apex Service Partners', x: 0.78, y: 0.20, size: 'lg', layer: 'rollup', color: '#10B981', sub: '$3.4B fund' },
    { name: 'Sila Services', x: 0.85, y: 0.30, size: 'md', layer: 'rollup', color: '#10B981', sub: 'Goldman Sachs' },
    { name: 'Wrench Group', x: 0.72, y: 0.30, size: 'md', layer: 'rollup', color: '#10B981', sub: '$1.3B refi' },
    { name: 'Service Logic', x: 0.80, y: 0.40, size: 'md', layer: 'rollup', color: '#10B981', sub: 'Bain Capital' },
    { name: 'Authority Brands', x: 0.70, y: 0.45, size: 'sm', layer: 'rollup', color: '#10B981', sub: 'Apax' },
    // StayBookt in the gap (middle-low, where small owner-operators live)
    { name: 'StayBookt', x: 0.50, y: 0.75, size: 'us', layer: 'us', color: '#4F46E5', sub: 'The gap' },
  ];

  const xScale = (x: number) => padL + x * (W - padL - padR);
  const yScale = (y: number) => padT + y * (H - padT - padB);

  return (
    <div className="bg-paper border border-divider-lt rounded-2xl p-6 sm:p-10 overflow-x-auto">
      <p className="text-[11px] tracking-[0.25em] uppercase text-mute font-semibold mb-6">Trades capital, plotted by business size and depth of service</p>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[820px]">
        {/* Quadrant background tints */}
        <rect x={padL} y={padT} width={(W - padL - padR) * 0.5} height={(H - padT - padB) * 0.55} fill="#06B6D4" fillOpacity="0.05" />
        <rect x={padL + (W - padL - padR) * 0.55} y={padT} width={(W - padL - padR) * 0.45} height={(H - padT - padB) * 0.55} fill="#10B981" fillOpacity="0.05" />
        <rect x={padL} y={padT + (H - padT - padB) * 0.60} width={W - padL - padR} height={(H - padT - padB) * 0.40} fill="#4F46E5" fillOpacity="0.08" />

        {/* Axes */}
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--divider-lt)" strokeWidth="1.5" />
        <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="var(--divider-lt)" strokeWidth="1.5" />

        {/* Y-axis title */}
        <text x={20} y={padT - 8} fontSize="10" fontWeight="700" fill="var(--ink)" letterSpacing="2">
          BUSINESS SIZE
        </text>

        {/* Y-axis labels */}
        <text x={padL - 14} y={padT + 12} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--mute)" letterSpacing="1.5">
          ENTERPRISE
        </text>
        <text x={padL - 14} y={padT + 26} textAnchor="end" fontSize="9" fill="var(--mute-dark)" letterSpacing="1">
          $50M+ revenue
        </text>

        <text x={padL - 14} y={(padT + H - padB) / 2 - 6} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--mute)" letterSpacing="1.5">
          MID-MARKET
        </text>
        <text x={padL - 14} y={(padT + H - padB) / 2 + 8} textAnchor="end" fontSize="9" fill="var(--mute-dark)" letterSpacing="1">
          $5M+ EBITDA
        </text>

        <text x={padL - 14} y={H - padB - 18} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--mute)" letterSpacing="1.5">
          OWNER-OPERATOR
        </text>
        <text x={padL - 14} y={H - padB - 4} textAnchor="end" fontSize="9" fill="var(--mute-dark)" letterSpacing="1">
          $250K–$2M revenue
        </text>

        {/* X-axis title and labels */}
        <text x={padL} y={H - padB + 30} fontSize="10" fontWeight="700" fill="var(--mute)" letterSpacing="1.5">
          TOOL ONLY
        </text>
        <text x={(padL + W - padR) / 2} y={H - padB + 30} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--mute)" letterSpacing="1.5">
          OPERATING WORK
        </text>
        <text x={W - padR} y={H - padB + 30} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--mute)" letterSpacing="1.5">
          FULL BUYOUT
        </text>
        <text x={(padL + W - padR) / 2} y={H - padB + 56} textAnchor="middle" fontSize="9" fill="var(--mute-dark)" letterSpacing="1">
          Depth of service →
        </text>

        {/* Quadrant labels */}
        <text x={padL + (W - padL - padR) * 0.25} y={padT + 28} textAnchor="middle" fontSize="11" fontWeight="700" fill="#06B6D4" letterSpacing="2">
          SOFTWARE LAYER
        </text>
        <text x={padL + (W - padL - padR) * 0.77} y={padT + 28} textAnchor="middle" fontSize="11" fontWeight="700" fill="#10B981" letterSpacing="2">
          CONSOLIDATION LAYER
        </text>
        <text x={(padL + W - padR) / 2} y={H - padB - 12} textAnchor="middle" fontSize="11" fontWeight="700" fill="#4F46E5" letterSpacing="2">
          OPERATING LAYER (THE GAP)
        </text>

        {/* Players */}
        {players.map((p, i) => {
          const cx = xScale(p.x);
          const cy = yScale(p.y);
          const r = p.size === 'lg' ? 14 : p.size === 'md' ? 10 : p.size === 'sm' ? 7 : 18;
          const isUs = p.layer === 'us';
          return (
            <motion.g
              key={p.name}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glow for us */}
              {isUs && (
                <circle cx={cx} cy={cy} r={r + 12} fill={p.color} fillOpacity="0.18" />
              )}
              <circle cx={cx} cy={cy} r={r} fill={p.color} fillOpacity={isUs ? 1 : 0.85} stroke={p.color} strokeWidth={isUs ? 2 : 1} />
              {isUs && (
                <circle cx={cx} cy={cy} r={r - 6} fill="white" />
              )}
              <text
                x={cx}
                y={cy - r - 8}
                textAnchor="middle"
                fontSize={isUs ? '14' : '11'}
                fontWeight="700"
                fill={isUs ? p.color : 'var(--ink)'}
                fontFamily="'Helvetica Neue', sans-serif"
                letterSpacing={isUs ? '0' : '0.3'}
              >
                {p.name}
              </text>
              {p.sub && (
                <text
                  x={cx}
                  y={cy + r + 16}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--mute-dark)"
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.5"
                >
                  {p.sub}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}


/* ---------- 3. SILVER TSUNAMI ----------------------------------- */

export function SilverTsunami() {
  const stats = [
    { value: 52, suffix: '%', label: 'of US employer-businesses owned by people 55 or older', source: 'US Census + SBA' },
    { value: 46, suffix: '%', label: 'of small-business owners have no succession plan', source: 'Gallup, 2024' },
    { value: 1.4, prefix: '~', suffix: 'M', label: 'businesses approaching exit with no buyer in place', source: 'Inc. / Teamshares' },
    { value: 4, suffix: '%', label: 'of small businesses survive to a fourth generation', source: 'Family business research' },
  ];

  return (
    <section id="silver-tsunami" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">The timing window</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            The owners are aging out.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-10 max-w-3xl">
            And most of them have no succession plan and no buyer.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-mute text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            The boomer-owned segment of the trades is approaching a forced exit event. Owners are retiring without ready buyers, and the roll-up firms above only acquire businesses with $5M+ EBITDA. The sub-$2M owner-operator either sells to a competitor for a pittance, hands it to a family member who does not want it, or closes the doors. We make the business sellable.
          </p>
        </Reveal>

        {/* Stat grid */}
        <Reveal delay={0.3}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-divider-lt">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
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
        </Reveal>

        {/* Closing claim card */}
        <Reveal delay={0.7}>
          <div className="mt-14 p-8 bg-ink text-white rounded-2xl">
            <p className="text-elec text-[11px] tracking-[0.25em] uppercase font-semibold mb-3">What this means for the thesis</p>
            <p className="font-display text-2xl sm:text-3xl tracking-[-0.02em] leading-snug max-w-4xl">
              We are not building a marketing agency or a CRM. We are building the operating layer that makes a $700K HVAC business into an asset somebody can buy. The wave of forced exits creates a buyer of last resort that only takes $5M+ businesses. We are the path from $700K to $5M. We are also the path to sale of the business as an asset.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.8}>
          <p className="text-mute text-sm sm:text-base mt-8 max-w-3xl leading-relaxed">
            Sources: <a href="https://news.gallup.com/poll/657362/small-business-owners-lack-succession-plan.aspx" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">Gallup 2024 succession survey</a>, <a href="https://www.teamshares.com/resources/silver-tsunami/" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">Teamshares silver tsunami analysis</a>, <a href="https://www.inc.com/melissa-angell/succession-planning-is-tough-but-a-solution-for-aging-entrepreneurs-is-hiding-in-plain-sight/91304150" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">Inc. succession reporting</a>, <a href="https://leaguepark.com/generational-shift-driving-owners-to-sell-their-plumbing-businesses/" target="_blank" rel="noopener noreferrer" className="text-elec hover:underline">League Park generational shift in plumbing</a>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- 4. NAMED COMP ----------------------------------- */

export function NamedComp() {
  const rows = [
    {
      category: 'Enterprise software',
      players: ['ServiceTitan (TTAN)', 'Jobber', 'Housecall Pro', 'Workiz', 'Service Fusion'],
      target: 'Operators $1M to $50M with dispatch teams',
      pitch: 'Replace paper with software. Owner runs the software.',
      gap: 'Does not pick up the phone. Does not run the work.',
      us: false,
      color: '#06B6D4',
    },
    {
      category: 'Consolidation (PE roll-ups)',
      players: ['Apex Service Partners', 'Sila Services', 'Wrench Group', 'Service Logic', 'Astara', 'Authority Brands'],
      target: 'Operators $5M+ EBITDA, ready for full acquisition',
      pitch: 'Buy the business, install operating leverage, exit at a multiple.',
      gap: 'Skips the segment that needs operators most. Sub-$2M owners cannot get acquired.',
      us: false,
      color: '#10B981',
    },
    {
      category: 'Vertical marketing agencies',
      players: ['Hook Agency', 'Service Direct', 'Blue Corona', 'WebFX home services'],
      target: 'Operators with budget for outsourced marketing',
      pitch: 'Run ads and SEO. Hand the leads to the owner.',
      gap: 'Owns demand only. Capture, follow-up, delivery, reputation all left to the owner.',
      us: false,
      color: '#14B8A6',
    },
    {
      category: 'StayBookt',
      players: ['Operating layer for owner-operators'],
      target: 'Residential and light-commercial trades, $250K to $2M',
      pitch: 'Run revenue and operations on a defined weekly cadence. One retainer, one team.',
      gap: 'Currently empty. Nobody else builds for this segment.',
      us: true,
      color: '#4F46E5',
    },
  ];

  return (
    <section id="named-comp" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">The comp set, by name</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Three categories already pitch the trades.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute-dark mb-10 max-w-3xl">
            Each one covers a slice. None of them cover the operating work.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            Investors at our stage want to see the named players, not buckets. Below: the actual competitors in each category we sit next to, who they target, and the gap each one leaves for us.
          </p>
        </Reveal>

        <div className="space-y-4">
          {rows.map((row, i) => (
            <Reveal key={row.category} delay={0.2 + i * 0.1}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-[200px_1fr_1fr_1fr] gap-5 lg:gap-8 rounded-2xl border p-6 sm:p-8 transition-all ${
                  row.us
                    ? 'bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/40 shadow-[0_18px_44px_-16px_rgba(79,70,229,0.4)]'
                    : 'bg-ink-soft/40 border-divider'
                }`}
              >
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-3" style={{ color: row.color }}>
                    {row.us ? '☆ ' : ''}{row.category}
                  </p>
                  <ul className="space-y-1">
                    {row.players.map((p) => (
                      <li key={p} className={`text-sm leading-snug ${row.us ? 'text-white font-medium' : 'text-platinum'}`}>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-mute mb-2">Target customer</p>
                  <p className={`text-sm leading-relaxed ${row.us ? 'text-platinum' : 'text-platinum-soft'}`}>{row.target}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-mute mb-2">Pitch</p>
                  <p className={`text-sm leading-relaxed ${row.us ? 'text-platinum' : 'text-platinum-soft'}`}>{row.pitch}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-mute mb-2">{row.us ? 'Position' : 'Gap they leave'}</p>
                  <p className={`text-sm leading-relaxed ${row.us ? 'text-white' : 'text-platinum-soft'}`}>{row.gap}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- 5. MOAT FOUR ----------------------------------- */

export function MoatFour() {
  const moats = [
    {
      title: 'Vertical depth, not horizontal sprawl.',
      desc: 'We understand ESA licensing, TSSA codes, how a panel job actually gets quoted, and what passes municipal inspection. A horizontal marketing agency does not. A horizontal CRM does not. The work compounds inside one vertical before it goes wide.',
      iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      color: '#06B6D4',
    },
    {
      title: 'Switching cost grows weekly.',
      desc: 'A client moves from us to a replacement by rebuilding their site, GBP, lead capture stack, brief cadence, review system, and operator relationships. Every week we run for them is another week of switching cost. By month six, replacing us is a six-month project.',
      iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: '#10B981',
    },
    {
      title: 'Playbook compounds across clients.',
      desc: 'The cost to deliver client N+1 is lower than client N. Every cohort improves the playbook for the next. By client 50, our operating team is faster, sharper, and more vertical-specific than any agency or in-house team an owner could hire on their own.',
      iconPath: 'M3 7l9-4 9 4M3 7l9 4 9-4M3 7v10l9 4 9-4V7',
      color: '#14B8A6',
    },
    {
      title: 'Roll-up adjacency.',
      desc: 'The PE roll-up wave is buying $5M+ businesses but skipping the $250K to $2M segment. We are the path that takes a $700K business and makes it acquisition-ready inside three years. Roll-ups become a partner, a referrer, and an eventual buyer for our clients.',
      iconPath: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
      color: '#4F46E5',
    },
  ];

  return (
    <section id="moat" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">Defensibility</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Four moats.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-10 max-w-3xl">
            One compounds with every client. One compounds with every week. The other two are structural.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {moats.map((m, i) => (
            <Reveal key={m.title} delay={0.2 + i * 0.1}>
              <div className="bg-paper border border-divider-lt rounded-2xl p-7 sm:p-8 h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${m.color}15`, border: `1px solid ${m.color}40`, color: m.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d={m.iconPath} />
                  </svg>
                </div>
                <h3 className="font-display text-xl sm:text-2xl tracking-tight leading-snug mb-3 text-ink">{m.title}</h3>
                <p className="text-ink/70 text-sm sm:text-base leading-relaxed">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

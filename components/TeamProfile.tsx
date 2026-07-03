'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Reveal } from './Sections';

/* ============================================================
 * TeamProfile, the /team page rebuild.
 *
 * Sections:
 *   1. FoundersDeep    (Jacob + Richard, real bios)
 *   2. OwnershipMap    (what each owns at StayBookt)
 *   3. RichardPortfolio (the roll-up inside track)
 *   4. OperatingBench  (specialists per engagement)
 *   5. HiringPlan      (next hires tied to raise stages)
 * ============================================================ */


/* ---------- 1. FOUNDERS DEEP ----------------------------- */

export function FoundersDeep() {
  const founders = [
    {
      name: 'Jacob Charendoff',
      role: 'Co-Founder · Revenue, Technology, GTM',
      photo: '/photos/jacob.jpg',
      initials: 'JC',
      color: '#06B6D4',
      linkedin: 'https://www.linkedin.com/in/jacob-charendoff/',
      bio: 'Built and run revenue inside operating teams across SaaS, services, and trades. Multi-million-dollar revenue engines, end to end. Founder-led growth, conversion engineering, product-led GTM, and the kind of tech execution that ships a Lighthouse-100 site in a week. Has sat in service-business kitchens long enough to know what the owner actually pays for.',
      owns: ['Revenue model + pricing', 'Technology stack + build', 'Growth + marketing engine', 'Demand generation + sales'],
    },
    {
      name: 'Richard Roos',
      role: 'Co-Founder · Operations, Finance, Business Development',
      photo: '/photos/richard.jpg',
      initials: 'RR',
      color: '#4F46E5',
      linkedin: 'https://www.linkedin.com/in/richardroos/',
      bio: 'Senior operator with deep relationships across Canadian trades, real estate, and field services. Actively building a roll-up portfolio of service businesses inside our exact ICP. That portfolio is the inside track: it gives StayBookt direct access to operators, deal flow, and an obvious eventual buyer for clients we scale past $5M.',
      owns: ['Operating cadence + delivery', 'Finance + unit economics', 'Business development + partnerships', 'Owner relationships + referrals'],
    },
  ];

  return (
    <section id="founders" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">The two of us</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Two founders.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-10 max-w-3xl">
            One runs revenue and the engine. The other runs operations and the network.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-mute text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            We have both built and run revenue inside operating teams for a decade. We are not consultants. We are not first-time founders. The work we are doing for trades clients now is the work we have already done at scale inside SaaS, services, and field-service businesses.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={0.2 + i * 0.12}>
              <div className="bg-paper border border-divider-lt rounded-2xl p-8 sm:p-10 h-full flex flex-col">
                {/* Header: photo + name + role */}
                <div className="flex items-center gap-5 mb-6">
                  {f.photo ? (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0" style={{ border: `2px solid ${f.color}60` }}>
                      <Image src={f.photo} alt={f.name} fill className="object-cover" sizes="96px" />
                    </div>
                  ) : (
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center font-display text-2xl tracking-tight shrink-0"
                      style={{ background: `${f.color}15`, border: `2px solid ${f.color}40`, color: f.color }}
                    >
                      {f.initials}
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl tracking-tight mb-1">{f.name}</h3>
                    <p className="text-[11px] tracking-[0.18em] uppercase font-semibold leading-snug" style={{ color: f.color }}>
                      {f.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-ink/75 text-sm sm:text-base leading-relaxed mb-6">{f.bio}</p>

                {/* Owns */}
                <div className="mt-auto pt-6 border-t border-divider-lt">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">What they own at StayBookt</p>
                  <ul className="space-y-2">
                    {f.owns.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-sm text-ink/80 leading-snug">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: f.color }} />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* LinkedIn */}
                {f.linkedin && (
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase hover:underline self-start"
                    style={{ color: f.color }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- 2. OWNERSHIP MAP ------------------------------ */

export function OwnershipMap() {
  const lanes = [
    {
      pillar: 'Revenue',
      owner: 'Jacob',
      detail: 'Pricing, packaging, the demand engine, growth content, conversion paths, founder-led sales.',
      color: '#06B6D4',
    },
    {
      pillar: 'Technology',
      owner: 'Jacob',
      detail: 'Site builds, ops portal, automation stack, integrations, all engineering.',
      color: '#0EA5E9',
    },
    {
      pillar: 'Operations',
      owner: 'Richard',
      detail: 'Weekly cadence, owner standups, quote follow-up, the playbook in motion.',
      color: '#10B981',
    },
    {
      pillar: 'Finance',
      owner: 'Richard',
      detail: 'Bookkeeping, unit economics, cap table, runway, board materials.',
      color: '#14B8A6',
    },
    {
      pillar: 'Business development',
      owner: 'Richard',
      detail: 'Roll-up partner relationships, owner-operator network, referral pipeline.',
      color: '#2563EB',
    },
    {
      pillar: 'Hiring',
      owner: 'Both',
      detail: 'Joint accountability. Jacob hires growth and tech roles. Richard hires ops and finance roles.',
      color: '#4F46E5',
    },
  ];

  return (
    <section id="ownership" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">Who owns what</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Clear lanes.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute-dark mb-10 max-w-3xl">
            Six pillars of the business. Each one has one accountable owner.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lanes.map((l, i) => (
            <Reveal key={l.pillar} delay={0.2 + i * 0.06}>
              <div className="bg-ink-soft/40 border border-divider rounded-2xl p-6 sm:p-7 h-full flex flex-col">
                <div className="flex items-baseline justify-between mb-3">
                  <p className="text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: l.color }}>
                    {l.pillar}
                  </p>
                  <p className="font-display text-sm tracking-wider" style={{ color: l.color }}>
                    {l.owner}
                  </p>
                </div>
                <p className="text-platinum-soft text-sm leading-relaxed">{l.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- 3. RICHARD'S ROLL-UP PORTFOLIO -------------- */

export function RichardPortfolio() {
  return (
    <section id="rollup" className="relative bg-cream text-ink py-32 overflow-hidden">
      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">The inside track</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Richard is building a roll-up portfolio.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-10 max-w-3xl">
            Inside our exact ICP. That makes StayBookt a network business, not a stranger pitching cold.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid lg:grid-cols-3 gap-6 mb-14">
            <div className="bg-paper border border-divider-lt rounded-2xl p-7">
              <p className="text-[10px] tracking-[0.25em] uppercase text-mute font-semibold mb-3">What it is</p>
              <p className="font-display text-xl tracking-tight mb-3 text-ink">A live roll-up portfolio</p>
              <p className="text-ink/75 text-sm leading-relaxed">
                Richard is actively acquiring service businesses in HVAC, plumbing, and electrical inside Canada. His own operator-investor portfolio.
              </p>
            </div>
            <div className="bg-paper border border-divider-lt rounded-2xl p-7">
              <p className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: '#10B981' }}>What it gives us</p>
              <p className="font-display text-xl tracking-tight mb-3 text-ink">Distribution + credibility</p>
              <p className="text-ink/75 text-sm leading-relaxed">
                Direct access to owner-operators who already trust Richard. Pre-warmed introductions instead of cold outbound. Real industry credibility, not pitch-deck credibility.
              </p>
            </div>
            <div className="bg-paper border border-divider-lt rounded-2xl p-7">
              <p className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: '#4F46E5' }}>What it implies for clients</p>
              <p className="font-display text-xl tracking-tight mb-3 text-ink">An eventual buyer</p>
              <p className="text-ink/75 text-sm leading-relaxed">
                Clients we scale past $5M EBITDA become candidates for Richard&apos;s roll-up. That is a real exit path for owners, not a hypothetical one.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="bg-ink text-white rounded-2xl p-7 sm:p-10 border-l-4 border-elec">
            <p className="text-mute text-[11px] tracking-[0.25em] uppercase font-semibold mb-3">Why this matters at pre-seed</p>
            <p className="font-display text-2xl sm:text-3xl tracking-[-0.02em] leading-snug max-w-4xl">
              Most pre-seed teams pitching trades are outsiders. Richard is an insider. His existing portfolio gives us pipeline, validation, and a buyer-of-last-resort all in one. We are not the company asking for permission to enter the market. We are already running in it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------- 4. OPERATING BENCH ------------------------- */

export function OperatingBench() {
  const bench = [
    { role: 'SEO + content lead', when: 'Per engagement', detail: 'Site copy, GBP content, local SEO. Pulled in for the foundation build and the monthly cadence.' },
    { role: 'Brand + photography', when: 'Foundation only', detail: 'Logo, color, photo direction. One-time pull for each client at foundation buildout.' },
    { role: 'Engineering + automation', when: 'Per engagement', detail: 'Site updates, lead capture wiring, Twilio + Slack workflows, integrations.' },
    { role: 'Vertical advisor', when: 'On call', detail: 'Domain expert per vertical (HVAC / plumbing / electrical). Used for compliance, copy review, and quoting nuance.' },
    { role: 'Bookkeeping partner', when: 'Optional', detail: 'For clients who want consolidated finance through us. Sub-contracted Canadian QBO partner.' },
  ];

  return (
    <section id="bench" className="relative bg-ink text-white py-32 overflow-hidden">
      <div className="relative px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">The bench</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Two founders, plus the specialists we pull per client.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl mb-14">
            The cost-to-deliver math on /economics assumes the bench is shared across the portfolio. Each role below is a specialist we engage on a per-client or per-engagement basis until volume justifies a full-time hire. This is what makes the unit economics scale without bloating fixed cost.
          </p>
        </Reveal>

        <div className="space-y-3">
          {bench.map((b, i) => (
            <Reveal key={b.role} delay={0.2 + i * 0.07}>
              <div className="grid grid-cols-1 sm:grid-cols-[240px_140px_1fr] gap-3 sm:gap-6 items-start sm:items-center bg-ink-soft/40 border border-divider rounded-xl p-5 sm:p-6">
                <p className="font-display text-base sm:text-lg tracking-tight text-white">{b.role}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-mute">{b.when}</p>
                <p className="text-platinum-soft text-sm leading-relaxed">{b.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- 5. HIRING PLAN -------------------------------- */

export function HiringPlan() {
  const hires = [
    {
      stage: 'Pilot phase (now, 1–5 clients)',
      hires: ['No new full-time hires. Founder-led delivery.', 'Specialist bench engaged per client.'],
      milestone: 'Pilot 1 → 5 paying clients',
      color: '#06B6D4',
    },
    {
      stage: 'Pre-seed deployment (6–15 clients)',
      hires: ['1 growth lead (full-time)', '1 ops lead (full-time)', 'Bench retained for vertical specialists'],
      milestone: 'Cost-to-deliver model holds at portfolio scale',
      color: '#10B981',
    },
    {
      stage: 'Seed-ready (16–40 clients)',
      hires: ['2 ops leads', '1 senior engineer', '1 BD/partnerships hire', '1 finance / operating analyst'],
      milestone: 'Cash-positive zone, profitability inflection',
      color: '#14B8A6',
    },
    {
      stage: 'Series A (40+ clients)',
      hires: ['Vertical GMs (HVAC, plumbing, electrical)', 'Senior leadership across go-to-market'],
      milestone: 'Geographic + vertical expansion',
      color: '#2563EB',
    },
  ];

  return (
    <section id="hiring" className="relative bg-cream text-ink py-32">
      <div className="px-8 sm:px-16 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-mute font-semibold uppercase mb-6">Hiring tied to raise stages</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] mb-4">
            Each hire is justified by client count.
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-mute mb-10 max-w-3xl">
            No premature full-time hires. The bench scales until volume forces a permanent seat.
          </h2>
        </Reveal>

        <div className="space-y-4">
          {hires.map((h, i) => (
            <Reveal key={h.stage} delay={0.2 + i * 0.08}>
              <div className="grid lg:grid-cols-[280px_1fr_280px] gap-5 lg:gap-8 bg-paper border border-divider-lt rounded-2xl p-6 sm:p-8">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-2" style={{ color: h.color }}>
                    Stage
                  </p>
                  <p className="font-display text-lg sm:text-xl tracking-tight leading-snug text-ink">{h.stage}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-mute mb-3">Hires</p>
                  <ul className="space-y-1.5">
                    {h.hires.map((hire) => (
                      <li key={hire} className="flex items-start gap-2 text-sm text-ink/80 leading-snug">
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: h.color }} />
                        <span>{hire}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-mute mb-2">Milestone unlock</p>
                  <p className="text-ink/80 text-sm leading-relaxed">{h.milestone}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

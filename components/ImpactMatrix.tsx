// ImpactMatrix — the "what you get" capabilities mapped to the payoffs that
// give owners their life back. Desktop renders a full dot-matrix table;
// mobile collapses to stacked capability cards with green payoff pills.
// Server component: no client hooks, no motion.

type PayoffKey = 'P1' | 'P2' | 'P3' | 'P4' | 'P5';

type Payoff = {
  key: PayoffKey;
  short: string;
  full: string;
};

type Capability = {
  name: string;
  description: string;
  payoffs: PayoffKey[];
};

const PAYOFFS: Payoff[] = [
  { key: 'P1', short: 'Bigger pipeline', full: 'Bigger pipeline, less stress' },
  { key: 'P2', short: 'Less admin', full: 'Reduced admin, more time for life' },
  { key: 'P3', short: 'Less chaos', full: 'Less chaos, less stress' },
  { key: 'P4', short: 'Growth', full: 'Grow your business, hit your financial goals' },
  { key: 'P5', short: 'Better service', full: 'Better service, more wins' },
];

const CAPABILITIES: Capability[] = [
  {
    name: 'Website',
    description: 'A marketing-firm-quality website that gets you found.',
    payoffs: ['P1', 'P4', 'P5'],
  },
  {
    name: 'AI Receptionist',
    description: 'Calls and texts answered 24/7, so no lead slips.',
    payoffs: ['P1', 'P2', 'P4', 'P5'],
  },
  {
    name: 'Self-Serve Booking',
    description: 'Customers book themselves, straight into your calendar.',
    payoffs: ['P1', 'P2', 'P4', 'P5'],
  },
  {
    name: 'CRM',
    description: 'Every customer and job in one place, not buried in your phone.',
    payoffs: ['P3', 'P4'],
  },
  {
    name: 'Quote Tool',
    description: 'Send, track, and chase quotes so nothing you quote gets forgotten.',
    payoffs: ['P2', 'P3', 'P4', 'P5'],
  },
  {
    name: 'Operating Dashboard',
    description: 'One screen that shows how the business is actually running.',
    payoffs: ['P3', 'P4'],
  },
  {
    name: 'AI Analyst',
    description: 'Reads your numbers and tells you what to do next.',
    payoffs: ['P3', 'P4'],
  },
  {
    name: 'Review Management',
    description: 'Turns finished jobs into 5-star reviews, automatically.',
    payoffs: ['P1', 'P2', 'P4'],
  },
  {
    name: 'Repeat Business',
    description: 'Brings past customers back on their own.',
    payoffs: ['P1', 'P2', 'P4'],
  },
  {
    name: 'Daily Reporting',
    description: 'A short daily brief so you always know where things stand.',
    payoffs: ['P2', 'P3', 'P4'],
  },
];

function payoffLabel(key: PayoffKey): Payoff {
  return PAYOFFS.find((p) => p.key === key) as Payoff;
}

export default function ImpactMatrix() {
  return (
    <section className="bg-paper py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-hvac">
          What StayBookt does
        </p>
        <h2 className="mt-4 font-display tracking-[-0.03em] text-ink text-3xl sm:text-4xl md:text-5xl max-w-3xl">
          Everything your front office needs. So you can get back to your life.
        </h2>
        <p className="mt-5 text-lg text-[#475569] max-w-2xl">
          One platform runs the whole operation. Here is what you get, and what
          each piece gives you back.
        </p>

        {/* Desktop matrix */}
        <div className="mt-14 hidden md:block">
          <div className="grid grid-cols-[minmax(0,2.4fr)_repeat(5,minmax(0,1fr))] items-stretch">
            {/* Header row */}
            <div className="border-b border-[#E5E7EB] pb-4" />
            {PAYOFFS.map((p) => (
              <div
                key={p.key}
                title={p.full}
                className="border-b border-[#E5E7EB] pb-4 px-2 text-center"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-mute">
                  {p.short}
                </span>
              </div>
            ))}

            {/* Capability rows */}
            {CAPABILITIES.map((cap) => (
              <div key={cap.name} className="contents">
                <div className="border-b border-[#E5E7EB] py-6 pr-6">
                  <p className="font-display tracking-[-0.03em] text-ink text-lg">
                    {cap.name}
                  </p>
                  <p className="mt-1 text-sm text-[#475569] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
                {PAYOFFS.map((p) => {
                  const filled = cap.payoffs.includes(p.key);
                  return (
                    <div
                      key={p.key}
                      className="border-b border-[#E5E7EB] py-6 flex items-center justify-center"
                    >
                      <span
                        title={filled ? payoffLabel(p.key).full : undefined}
                        aria-hidden="true"
                        className={
                          filled
                            ? 'h-2 w-2 rounded-full bg-hvac'
                            : 'h-2 w-2 rounded-full bg-[#E5E7EB]'
                        }
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stacked cards */}
        <div className="mt-12 space-y-4 md:hidden">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.name}
              className="rounded-2xl border border-[#E5E7EB] p-6"
            >
              <p className="font-display tracking-[-0.03em] text-ink text-lg">
                {cap.name}
              </p>
              <p className="mt-1 text-sm text-[#475569] leading-relaxed">
                {cap.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cap.payoffs.map((key) => (
                  <span
                    key={key}
                    className="rounded-full bg-hvac/10 px-2.5 py-1 text-[11px] font-semibold text-hvac"
                  >
                    {payoffLabel(key).short}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Reveal from '@/components/v4/Reveal';

/* Hybrid centerpiece: the customer journey fused with the Secret Sauce tie.
 * Each phase shows the tools that power it and the life payoff they unlock,
 * ending at Enjoy Life. Accents live in the Bookt cyan-teal-green-blue range. */
type Phase = { phase: string; payoff: string; tools: string[]; color: string; dest?: boolean };

const PHASES: Phase[] = [
  { phase: 'Get found', payoff: 'A bigger pipeline, less stress.', tools: ['Website', 'AI receptionist', 'Self-serve booking', 'Reviews'], color: '#0ea5e9' },
  { phase: 'Run without you', payoff: 'Less admin and chaos, more time.', tools: ['CRM', 'Quotes', 'Dashboard', 'Daily brief'], color: '#06b6d4' },
  { phase: 'Grow the value', payoff: 'Grow the business, hit your goals.', tools: ['AI analyst', 'Repeat business'], color: '#14b8a6' },
  { phase: 'Enjoy life', payoff: 'Your time, your options, your life back.', tools: [], color: '#10b981', dest: true },
];

export default function JourneyMap() {
  return (
    <section className="jmap">
      <div className="wrap">
        <Reveal className="eyebrow" as="div">
          <span style={{ color: '#86868b' }}>The secret sauce</span>
        </Reveal>
        <Reveal>
          <h2>Every piece, pulling you toward one thing: your life back.</h2>
        </Reveal>
        <div className="jmap-track">
          {PHASES.map((p, i) => (
            <Reveal key={p.phase} className={`jmap-stop${p.dest ? ' dest' : ''}`} delay={i === 0 ? undefined : ((i > 3 ? 3 : i) as 1 | 2 | 3)}>
              <span className="jmap-dot" style={{ background: p.color, boxShadow: `0 0 0 5px ${p.color}22, 0 0 24px ${p.color}88` }} />
              <span className="jmap-phase">{p.phase}</span>
              <span className="jmap-payoff">{p.payoff}</span>
              {p.tools.length > 0 && (
                <span className="jmap-tools">
                  {p.tools.map((t) => (
                    <span key={t} className="jmap-tool">{t}</span>
                  ))}
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

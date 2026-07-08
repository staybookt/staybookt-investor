import Reveal from '@/components/v4/Reveal';

/* The three StayBookt principles = the ladder = the customer's arc.
 * Each stage leads with the OUTCOME (what it means for them), then how we
 * add the value, then what they get. Tools are proof, shown last.
 * CX-first: designed around the customer's journey, not our feature list. */
type Stage = {
  num: string;
  name: string;
  outcome: string;
  value: string;
  deliver: string[];
  color: string;
  dest?: boolean;
};

const STAGES: Stage[] = [
  {
    num: '01',
    name: 'Get Found',
    outcome: 'Be the one they call.',
    value: 'We put you at the top of Google and answer every call and text, so the jobs you were quietly losing start landing.',
    deliver: ['Website', 'Google profile', 'AI receptionist', 'Self-serve booking'],
    color: '#0ea5e9',
  },
  {
    num: '02',
    name: 'StayBookt',
    outcome: 'The business runs without you.',
    value: 'We run the day to day — scheduling, quoting, follow-up, reviews, reporting — so you are out of the admin and back on the work that matters.',
    deliver: ['CRM', 'Quotes', 'Operating dashboard', 'Review engine', 'Daily brief'],
    color: '#06b6d4',
  },
  {
    num: '03',
    name: 'Enjoy Life',
    outcome: 'A business worth something. And your time back.',
    value: 'We grow the value in what you have built and hand you the choice: keep it, pass it on, or sell.',
    deliver: ['AI analyst', 'Repeat business', 'Growth & succession'],
    color: '#10b981',
    dest: true,
  },
];

const CSS = `
.jl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:clamp(46px,6vw,72px);position:relative;}
.jl-grid::before{content:'';position:absolute;top:13px;left:16%;right:16%;height:2px;background:linear-gradient(90deg,#0ea5e9,#06b6d4 45%,#14b8a6 72%,#10b981);opacity:.55;}
.jl-card{position:relative;background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.012));border:1px solid rgba(255,255,255,.09);border-radius:22px;padding:26px 24px 24px;display:flex;flex-direction:column;text-align:left;}
.jl-card.dest{border-color:rgba(16,185,129,.36);background:linear-gradient(180deg,rgba(16,185,129,.09),rgba(16,185,129,.02));}
.jl-dot{width:26px;height:26px;border-radius:50%;position:relative;z-index:1;display:block;}
.jl-num{position:absolute;top:24px;right:24px;font-size:12px;font-weight:700;letter-spacing:.12em;color:rgba(255,255,255,.28);}
.jl-stage{display:block;margin-top:18px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;}
.jl-outcome{display:block;margin-top:9px;font-size:clamp(20px,2vw,25px);font-weight:600;letter-spacing:-.02em;line-height:1.16;color:#f5f5f7;}
.jl-card.dest .jl-outcome{color:#34d399;}
.jl-value{display:block;margin-top:13px;font-size:15px;line-height:1.5;color:#a1a1aa;}
.jl-deliver{margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,.09);}
.jl-deliver .dl{display:block;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#71717a;margin-bottom:11px;}
.jl-pills{display:flex;flex-wrap:wrap;gap:7px;}
.jl-pill{font-size:12.5px;color:#d4d4d8;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:5px 11px;}
@media(max-width:820px){.jl-grid{grid-template-columns:1fr;gap:16px;}.jl-grid::before{display:none;}}
`;

export default function JourneyMap() {
  return (
    <section className="jmap">
      <style>{CSS}</style>
      <div className="wrap">
        <Reveal className="eyebrow" as="div">
          <span style={{ color: '#86868b' }}>The StayBookt ladder</span>
        </Reveal>
        <Reveal>
          <h2>Three steps. One outcome: your life back.</h2>
        </Reveal>
        <div className="jl-grid">
          {STAGES.map((s, i) => (
            <Reveal
              key={s.name}
              className={`jl-card${s.dest ? ' dest' : ''}`}
              delay={i === 0 ? undefined : ((i > 3 ? 3 : i) as 1 | 2 | 3)}
            >
              <span className="jl-dot" style={{ background: s.color, boxShadow: `0 0 0 5px ${s.color}22, 0 0 22px ${s.color}88` }} />
              <span className="jl-num">{s.num}</span>
              <span className="jl-stage" style={{ color: s.color }}>{s.name}</span>
              <span className="jl-outcome">{s.outcome}</span>
              <span className="jl-value">{s.value}</span>
              <div className="jl-deliver">
                <span className="dl">What you get</span>
                <div className="jl-pills">
                  {s.deliver.map((d) => (
                    <span key={d} className="jl-pill">{d}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

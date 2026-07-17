'use client';

import { useEffect, useRef, useState } from 'react';
import { min } from '@/lib/css';

/* THE RANGEFINDER.
 *
 * This page already said "one of us saw this from the outside, one of us saw it from the
 * inside" and then printed two quotes side by side. It TOLD you the thesis. The homepage and
 * /how-it-works are the gold standard because they SHOW it, and /long-term earned its keep
 * the same way. This is that treatment for the founding story.
 *
 * The metaphor is not decoration, it is the argument. A rangefinder shows you two offset
 * images and you turn the barrel until they line up — the moment they align IS the moment
 * it's in focus. That is literally the partnership thesis from [founders-lens]: Jacob saw the
 * leaks from outside, alongside owners. Richard saw the machinery from inside, at scale. Same
 * pattern, opposite ends. The company is the overlap.
 *
 * So: six dots — the same six jobs the homepage flywheel turns. In the outside lens they
 * drift away untouched. In the inside lens they are held in a system. As you scroll the two
 * lenses converge, and where they intersect the dots resolve, aligned and caught. The reader
 * arrives at the thesis by watching it happen instead of being told.
 *
 * cv (converge, 0..1) rides scroll CONTINUOUSLY across the whole film, independent of the
 * beat. That is deliberate and it is the recurring bug class in this codebase: a beat driven
 * only by discrete steps makes most arrow presses land on nothing, which reads as a broken
 * page. Richard navigates by keyboard. Every press must move something.
 */

const OUT_Q =
  'Every owner I worked with tried to buy their way out of it. Another tool, another login, another thing that promised to fix it. None of them ever did the work. They just handed you one more job.';
const IN_Q =
  'In talking to entrepreneurs, one theme kept coming up: they didn’t have enough time to grow their business and enjoy the rewards they’d hoped for. StayBookt is our answer to ‘not enough time.’';

/* The same six the flywheel turns. Deliberate: this is the pattern both of them saw, so it
   had better be the pattern the rest of the site shows. */
const JOBS = ['The call', 'The quote', 'The review', 'The follow-up', 'The job', 'The brief'];

const BEATS = [
  { k: 'Two ends', h: 'Two people, at opposite ends of the same problem.', s: 'One of us was outside it, standing next to the owner. One of us was inside it, running the machine. Neither of us was looking for a company.' },
  { k: 'The outside lens', h: 'From outside, you watch it leak.', s: OUT_Q, who: 'Jacob Charendoff', role: 'A decade alongside service business owners. Health, hospitality, SaaS, retail, home services.' },
  { k: 'The inside lens', h: 'From inside, you watch it get caught.', s: IN_Q, who: 'Richard Roos', role: 'Two decades inside operationally rigorous service businesses at scale. Thousands of units across North America. Twenty years a CPA.' },
  { k: 'The overlap', h: 'It was the same pattern the whole time.', s: 'A big company does not win because it is smarter. It wins because someone is paid to catch every one of these. That is not a tool. That is a payroll, and it is the one thing an owner has never been able to buy. The overlap is the company.' },
];

const B = [0, 0.3, 0.58, 1];
const CY = 214;
const R = 132;

export default function FoundersLens() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const [cv, setCv] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReduce(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduce) return;
    let raf = 0;
    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / total));
      let b = 0;
      for (let i = 1; i < B.length; i++) if (p >= B[i]) b = i;
      setBeat(b);
      /* Converge over the first 88% so the last stretch HOLDS the resolved image instead of
         still creeping. The payoff needs air to land in. */
      setCv(Math.max(0, Math.min(1, p / 0.88)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  /* Lenses start clear of each other and end deeply overlapped. */
  const sep = 168 - 96 * cv;           // half-distance between centres
  const lx = 450 - sep;
  const rx = 450 + sep;
  const focus = Math.max(0, (cv - 0.42) / 0.58); // the vesica only resolves once they meet

  /* THE STATIC TWIN. Everything the film says, in text, for a screen reader and for
     reduced-motion. The film itself is aria-hidden. Same pattern as RemovalTest — a
     scroll-scrubbed SVG is unreadable to AT, and this page is the founding story: it is
     not decoration we can afford to drop. */
  const Static = () => (
    <div className={reduce ? 'fl-static' : 'sr-only'}>
      <h3>Two people, at opposite ends of the same problem.</h3>
      {BEATS.map((b) => (
        <div key={b.k} className="fl-st-beat">
          <h4>{b.k}: {b.h}</h4>
          <p>{b.s}</p>
          {b.who && <p><b>{b.who}.</b> {b.role}</p>}
        </div>
      ))}
      <p>The six things both of them watched: {JOBS.join(', ')}.</p>
    </div>
  );

  if (reduce) {
    return (
      <section className="fl-track fl-flat">
        <style>{min(CSS)}</style>
        <div className="wrap"><Static /></div>
      </section>
    );
  }

  return (
    <section ref={trackRef} className="fl-track">
      <style>{min(CSS)}</style>
      <Static />
      <div className="fl-stage" data-beat={beat} aria-hidden="true">
        <div className="fl-in">
          <div className="fl-eyebrow">Why we built this</div>

          <svg className="fl-svg" viewBox="0 0 900 430" fill="none">
            <defs>
              <clipPath id="fl-clipL"><circle cx={lx} cy={CY} r={R} /></clipPath>
              <clipPath id="fl-clipR"><circle cx={rx} cy={CY} r={R} /></clipPath>
              <radialGradient id="fl-glow">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.20 * focus} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* OUTSIDE — the jobs drift off, untouched. They leave the lens as cv rises,
                because that is what "you watch it leak" means. */}
            <g clipPath="url(#fl-clipL)">
              <circle cx={lx} cy={CY} r={R} fill="rgba(245,158,11,.045)" />
              {JOBS.map((j, i) => {
                const a = (i / JOBS.length) * Math.PI * 2 - Math.PI / 2;
                /* Both lenses START identical: the same six, on the same 58px ring. That is
                   the entire point — they were looking at ONE pattern. Only then do these
                   drift out and fade, because from outside you watch it leak. Starting them
                   clustered at 26 made the outside lens a meaningless blob next to the
                   inside lens's ring, and killed the comparison before it could land. */
                const drift = 58 + 54 * cv * (1 - focus);
                return (
                  <circle key={j} cx={lx + Math.cos(a) * drift} cy={CY + Math.sin(a) * drift}
                    r={5} fill="#f59e0b" opacity={0.85 - 0.5 * cv * (1 - focus)} />
                );
              })}
            </g>

            {/* INSIDE — the same six, held on a ring. Nothing drifts. */}
            <g clipPath="url(#fl-clipR)">
              <circle cx={rx} cy={CY} r={R} fill="rgba(34,211,238,.05)" />
              <circle cx={rx} cy={CY} r={58} stroke="rgba(34,211,238,.3)" strokeWidth={1} />
              {JOBS.map((j, i) => {
                const a = (i / JOBS.length) * Math.PI * 2 - Math.PI / 2;
                return (
                  <circle key={j} cx={rx + Math.cos(a) * 58} cy={CY + Math.sin(a) * 58}
                    r={5} fill="#22d3ee" opacity={0.9} />
                );
              })}
            </g>

            {/* THE VESICA. The intersection of the two lenses, and the only thing on this page
                that is ever fully in focus. */}
            <g clipPath="url(#fl-clipL)">
              <g clipPath="url(#fl-clipR)">
                <circle cx={450} cy={CY} r={R} fill="url(#fl-glow)" />
                {focus > 0.02 && JOBS.map((j, i) => {
                  const a = (i / JOBS.length) * Math.PI * 2 - Math.PI / 2;
                  const rr = 44 * focus;
                  return (
                    <circle key={j} cx={450 + Math.cos(a) * rr} cy={CY + Math.sin(a) * rr}
                      r={4.5 * focus} fill="#5eead4" opacity={focus} />
                  );
                })}
              </g>
            </g>

            <circle cx={lx} cy={CY} r={R} stroke="rgba(245,158,11,.5)" strokeWidth={1.5} />
            <circle cx={rx} cy={CY} r={R} stroke="rgba(34,211,238,.5)" strokeWidth={1.5} />

            <text x={lx} y={CY - R - 16} textAnchor="middle" fontSize="12.5" fontWeight="700"
              letterSpacing="1.4" fill="#c99a4a" fontFamily="-apple-system,sans-serif">THE OUTSIDE LENS</text>
            <text x={rx} y={CY - R - 16} textAnchor="middle" fontSize="12.5" fontWeight="700"
              letterSpacing="1.4" fill="#5bc7d8" fontFamily="-apple-system,sans-serif">THE INSIDE LENS</text>
            <text x={lx} y={CY + R + 26} textAnchor="middle" fontSize="13.5" fontWeight="600"
              fill="#8b93a5" fontFamily="-apple-system,sans-serif" opacity={1 - focus * 0.75}>Jacob</text>
            <text x={rx} y={CY + R + 26} textAnchor="middle" fontSize="13.5" fontWeight="600"
              fill="#8b93a5" fontFamily="-apple-system,sans-serif" opacity={1 - focus * 0.75}>Richard</text>
            <text x={450} y={CY + R + 26} textAnchor="middle" fontSize="13.5" fontWeight="700"
              fill="#5eead4" fontFamily="-apple-system,sans-serif" opacity={focus}>In focus</text>
          </svg>

          <div className="fl-copy">
            {BEATS.map((b, i) => (
              <div key={b.k} className={`fl-b fl-b${i}`}>
                <div className="fl-k">{b.k}</div>
                <h3>{b.h}</h3>
                <p className={b.who ? 'q' : ''}>{b.who ? `“${b.s}”` : b.s}</p>
                {b.who && <div className="fl-who"><b>{b.who}</b><span>{b.role}</span></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.fl-track{position:relative;height:clamp(1900px,290vh,2500px);background:#050506;}
.fl-flat{height:auto;padding:clamp(48px,7vw,84px) 0;}
.fl-stage{position:sticky;top:0;height:100vh;min-height:560px;overflow:hidden;display:flex;
  align-items:center;justify-content:center;color:#f5f5f7;}
.fl-in{width:min(1080px,92%);display:flex;flex-direction:column;align-items:center;gap:clamp(10px,1.6vh,18px);}
.fl-eyebrow{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#6b7280;}
.fl-svg{display:block;width:min(760px,100%);height:auto;}
.fl-copy{position:relative;width:min(660px,100%);height:clamp(178px,25vh,214px);}
.fl-b{position:absolute;inset:0;text-align:center;opacity:0;transform:translateY(10px);
  transition:opacity .5s ease,transform .5s ease;pointer-events:none;}
.fl-stage[data-beat="0"] .fl-b0,.fl-stage[data-beat="1"] .fl-b1,
.fl-stage[data-beat="2"] .fl-b2,.fl-stage[data-beat="3"] .fl-b3{opacity:1;transform:none;}
.fl-k{font-size:11.5px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#5eead4;margin-bottom:8px;}
/* BLACK ON BLACK. The page sets .abt h1,.abt h2,.abt h3 to color:var(--v4-ink) for its
   cream sections — near-black. This film inherits #f5f5f7 from .fl-stage, but INHERITANCE
   ALWAYS LOSES TO A DIRECT RULE, so every headline in here rendered #06080d on a #050506
   stage: invisible. Caught by screenshotting it, not by reading it. Scoped under .fl-stage
   so it out-specifies .abt h3 rather than relying on source order. */
.fl-stage .fl-b h3{color:#f5f5f7;font-size:clamp(21px,2.7vw,31px);font-weight:600;letter-spacing:-.03em;line-height:1.15;margin:0 0 10px;}
.fl-b p{font-size:clamp(14px,1.5vw,16.5px);line-height:1.55;color:#a6adbb;margin:0;}
.fl-b p.q{font-style:italic;color:#d4dae4;}
.fl-who{margin-top:12px;display:flex;flex-direction:column;gap:2px;}
.fl-who b{font-size:14px;color:#f5f5f7;}
.fl-who span{font-size:12.5px;color:#7c8496;}
.fl-static{color:#c8cfdb;}
/* Same trap: .abt h3 would paint this near-black on the .fl-track black. */
.fl-track .fl-static h3{font-size:clamp(22px,3vw,32px);color:#f5f5f7;letter-spacing:-.03em;margin:0 0 20px;}
.fl-st-beat{margin-bottom:20px;}
.fl-track .fl-st-beat h4{font-size:17px;color:#f5f5f7;margin:0 0 6px;}
.fl-st-beat p{margin:0 0 6px;line-height:1.6;}
@media (max-width:640px){
  .fl-stage{min-height:0;}
  .fl-copy{height:clamp(196px,32vh,240px);}
}
`;

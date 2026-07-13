'use client';

import { useEffect, useRef, useState } from 'react';

/* ============================================================
 * THREE TUESDAYS
 *
 * The Apple move: stop having three sections and start having one object.
 *
 * After the day plays out (TheDay), it collapses into a single board. Same
 * eight times, same eight rows, three worlds. The reader flips between them
 * and the whole argument lands in about four seconds, without scrolling
 * anywhere or having to remember anything.
 *
 * This replaces the old BigDay and FixedDay sections, which said the same
 * thing across three consecutive timelines.
 * ========================================================== */

type Row = { t: string; h: string; tag: string; k: 'ok' | 'bad' | 'lost' | 'none' };

type World = {
  id: string;
  label: string;
  rows: Row[];
  cost: string;
  costTone: 'bad' | 'good';
  cap: string;
  capEm?: string;
};

const WORLDS: World[] = [
  {
    id: 'yours',
    label: 'Yours',
    cost: '3 calls missed · 1 quote unsent · 1 review unasked · 1 job lost · 2 hrs of admin',
    costTone: 'bad',
    cap: 'And that was',
    capEm: 'a good day.',
    rows: [
      { t: '6:10 AM', h: 'The day starts well. Nobody is calling yet.', tag: '—', k: 'none' },
      { t: '8:30 AM', h: 'The phone rings. Your hands are full.', tag: 'Missed', k: 'bad' },
      { t: '11:15 AM', h: 'You promise a quote by tonight.', tag: 'Owed', k: 'bad' },
      { t: '1:40 PM', h: 'She would have left five stars.', tag: 'Not asked', k: 'bad' },
      { t: '3:20 PM', h: 'Two more calls. Both to voicemail.', tag: 'Missed', k: 'bad' },
      { t: '6:47 PM', h: 'It rings out. She calls the next name.', tag: 'Lost', k: 'lost' },
      { t: '9:00 PM', h: 'The laptop comes out. The second shift.', tag: 'Admin', k: 'bad' },
      { t: '11:10 PM', h: 'Tomorrow is the same day.', tag: '—', k: 'none' },
    ],
  },
  {
    id: 'theirs',
    label: 'A hundred-person company',
    cost: 'Nothing missed. Nobody stayed late.',
    costTone: 'good',
    cap: 'Nobody in that building thinks this is remarkable.',
    capEm: 'It is just Tuesday.',
    rows: [
      { t: '6:10 AM', h: 'The owner has a coffee and reads the numbers.', tag: '—', k: 'none' },
      { t: '8:30 AM', h: 'Answered on the second ring. Booked.', tag: 'Reception', k: 'ok' },
      { t: '11:15 AM', h: 'Quote out that afternoon. Then chased.', tag: 'Sales', k: 'ok' },
      { t: '1:40 PM', h: 'Review asked for while she is still delighted.', tag: 'Customer care', k: 'ok' },
      { t: '3:20 PM', h: 'Both answered. Both booked. Nobody notices.', tag: 'Reception', k: 'ok' },
      { t: '6:47 PM', h: 'After hours. Answered anyway. Booked.', tag: 'The service', k: 'ok' },
      { t: '9:00 PM', h: 'Nobody is working. The office shut at five.', tag: '—', k: 'none' },
      { t: '11:10 PM', h: 'The owner is asleep. The business is fine.', tag: 'The system', k: 'ok' },
    ],
  },
  {
    id: 'fixed',
    label: 'Yours, with StayBookt',
    cost: 'Nothing missed. You finished at half five.',
    costTone: 'good',
    cap: 'Same business. Same you.',
    capEm: 'The third Tuesday, at your size.',
    rows: [
      { t: '6:10 AM', h: 'The day starts well. Nobody is calling yet.', tag: '—', k: 'none' },
      { t: '8:30 AM', h: 'We answered. Booked her in for Thursday.', tag: 'StayBookt', k: 'ok' },
      { t: '11:15 AM', h: 'The quote went out before you finished the job.', tag: 'StayBookt', k: 'ok' },
      { t: '1:40 PM', h: 'Review asked for while she was still smiling.', tag: 'StayBookt', k: 'ok' },
      { t: '3:20 PM', h: 'Both calls answered. Both booked.', tag: 'StayBookt', k: 'ok' },
      { t: '6:47 PM', h: 'Answered on the second ring. Booked.', tag: 'StayBookt', k: 'ok' },
      { t: '9:00 PM', h: 'You are not working. There is nothing to do.', tag: '—', k: 'none' },
      { t: '5:30 PM', h: 'Because your day ended at half five.', tag: 'Yours', k: 'ok' },
    ],
  },
];

const CSS = `
/* ===== THREE TUESDAYS: one board, three worlds ===== */
.tt{background:#050506;color:#f5f5f7;padding:clamp(80px,11vw,150px) 0;position:relative;overflow:hidden;}
.tt::before{content:'';position:absolute;inset:0;pointer-events:none;transition:background 1s ease;background:radial-gradient(60% 55% at 50% 0%,rgba(239,68,68,.10),transparent 62%);}
.tt[data-w="theirs"]::before{background:radial-gradient(60% 55% at 50% 0%,rgba(56,189,248,.12),transparent 62%);}
.tt[data-w="fixed"]::before{background:radial-gradient(60% 55% at 50% 0%,rgba(16,185,129,.13),transparent 62%);}
.tt .wrap{position:relative;}
.tt .hd{text-align:center;max-width:640px;margin:0 auto;}
.tt .hd .eyebrow{color:#86868b;}
.tt .hd h2{margin-top:14px;font-size:clamp(30px,4.6vw,60px);line-height:1.03;letter-spacing:-.035em;font-weight:600;color:#f5f5f7;}
.tt .hd p{margin-top:16px;font-size:clamp(16px,1.85vw,20px);line-height:1.6;color:#aeb4c0;}

/* the switch */
.tt-sw{margin:clamp(30px,4vw,44px) auto 0;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.10);border-radius:999px;padding:5px;width:fit-content;max-width:100%;}
.tt-sw button{font-family:inherit;font-size:13.5px;font-weight:600;color:#9aa0ab;background:transparent;border:0;border-radius:999px;padding:10px 18px;cursor:pointer;transition:background .3s,color .3s;white-space:nowrap;}
.tt-sw button:hover{color:#f5f5f7;}
.tt-sw button.on{background:#f5f5f7;color:#050506;}

/* the board */
.tt-board{margin:clamp(30px,4vw,44px) auto 0;max-width:820px;border:1px solid rgba(255,255,255,.09);border-radius:24px;overflow:hidden;background:rgba(255,255,255,.02);}
.tt-row{display:grid;grid-template-columns:92px minmax(0,1fr) 132px;gap:14px;align-items:center;padding:16px 22px;border-top:1px solid rgba(255,255,255,.06);}
.tt-row:first-child{border-top:0;}
.tt-row .tm{font-size:12.5px;font-weight:700;letter-spacing:.08em;color:#6f7681;}
.tt-row .h{font-size:clamp(14.5px,1.7vw,17px);font-weight:500;color:#e4e8ee;transition:color .4s;}
.tt-row .tg{justify-self:end;font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:5px 10px;white-space:nowrap;transition:color .4s,background .4s;}
.tt-row .tg[data-k="bad"]{color:#f59e0b;background:rgba(245,158,11,.12);}
.tt-row .tg[data-k="lost"]{color:#ef4444;background:rgba(239,68,68,.14);}
.tt-row .tg[data-k="ok"]{color:#5eead4;background:rgba(94,234,212,.11);}
.tt-row .tg[data-k="none"]{color:#565c66;background:transparent;}
@media(max-width:720px){
  .tt-row{grid-template-columns:74px minmax(0,1fr);gap:10px;padding:14px 16px;}
  .tt-row .tg{grid-column:2;justify-self:start;margin-top:4px;}
}

/* the cost line */
.tt-cost{margin-top:20px;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;text-align:center;}
.tt-cost .k{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#6f7681;}
.tt-cost .v{font-size:clamp(14px,1.7vw,17px);font-weight:600;transition:color .4s;}
.tt[data-tone="bad"] .tt-cost .v{color:#ef4444;}
.tt[data-tone="good"] .tt-cost .v{color:#5eead4;}

.tt-cap{margin:clamp(28px,4vw,40px) auto 0;text-align:center;font-size:clamp(20px,2.7vw,34px);font-weight:600;letter-spacing:-.025em;line-height:1.25;color:#f5f5f7;max-width:26ch;}
.tt-cap .em{color:#f59e0b;}
.tt[data-w="theirs"] .tt-cap .em{color:#38bdf8;}
.tt[data-w="fixed"] .tt-cap .em{color:#5eead4;}

/* ===== THE SENTENCE ===== */
.stmt{background:#050506;color:#f5f5f7;min-height:78vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:clamp(90px,14vw,180px) clamp(20px,4vw,40px);position:relative;overflow:hidden;}
.stmt::before{content:'';position:absolute;inset:0;background:radial-gradient(52% 46% at 50% 50%,rgba(94,234,212,.09),transparent 68%);pointer-events:none;}
.stmt .in{position:relative;max-width:900px;}
.stmt h2{font-size:clamp(34px,6vw,84px);font-weight:600;letter-spacing:-.04em;line-height:1.02;color:#f5f5f7;opacity:0;transform:translateY(16px);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1);}
.stmt.on h2{opacity:1;transform:none;}
.stmt h2 .em{color:#5eead4;}
.stmt p{margin:clamp(28px,4vw,42px) auto 0;font-size:clamp(17px,2vw,22px);line-height:1.6;color:#8f97a4;max-width:44ch;opacity:0;transform:translateY(14px);transition:opacity .9s .45s cubic-bezier(.16,1,.3,1),transform .9s .45s cubic-bezier(.16,1,.3,1);}
.stmt.on p{opacity:1;transform:none;}
.stmt p b{color:#f5f5f7;font-weight:600;}
@media(prefers-reduced-motion:reduce){.stmt h2,.stmt p{opacity:1;transform:none;}}
`;

export function ThreeTuesdays() {
  const [w, setW] = useState(0);
  const world = WORLDS[w];

  return (
    <>
      <style>{CSS}</style>
      <section className="tt" data-w={world.id} data-tone={world.costTone}>
        <div className="wrap">
          <div className="hd">
            <div className="eyebrow">The same eight hours</div>
            <h2>Three Tuesdays.</h2>
            <p>
              Same customers. Same calls. Same 6:47 in the evening. The only thing that changes is
              whether anybody was there to catch it.
            </p>
          </div>

          <div className="tt-sw" role="group" aria-label="Choose a Tuesday">
            {WORLDS.map((x, n) => (
              <button key={x.id} type="button" className={n === w ? 'on' : ''} onClick={() => setW(n)}>
                {x.label}
              </button>
            ))}
          </div>

          <div className="tt-board">
            {world.rows.map((r) => (
              <div className="tt-row" key={r.t}>
                <span className="tm">{r.t}</span>
                <span className="h">{r.h}</span>
                <span className="tg" data-k={r.k}>
                  {r.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="tt-cost">
            <span className="k">What the day cost</span>
            <span className="v">{world.cost}</span>
          </div>

          <p className="tt-cap">
            {world.cap} <span className="em">{world.capEm}</span>
          </p>
        </div>
      </section>
    </>
  );
}

/* The one sentence they leave with. Nothing else on the screen. */
export function Statement() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) el.classList.add('on'); }),
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="stmt" ref={ref}>
      <div className="in">
        <h2>
          The difference was never talent.
          <br />
          <span className="em">It was five salaries.</span>
        </h2>
        <p>
          Richard ran the Tuesday where nothing gets dropped. Jacob stood in the room where
          everything does. <b>StayBookt is the bridge.</b>
        </p>
      </div>
    </section>
  );
}

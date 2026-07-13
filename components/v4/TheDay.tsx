'use client';

import { useEffect, useRef, useState } from 'react';

/* ============================================================
 * A TUESDAY
 * The signature experience of the About page.
 *
 * The homepage is a film. How it works is a map. This is a DAY.
 * A scroll-pinned day in the life of an owner-operator: the clock
 * advances, the beats play, and a ledger on the right fills up with
 * everything the day quietly cost them. It ends on the tally.
 *
 * Driven by a direct, position-based scroll listener (same proven
 * pattern as JourneyMap) rather than a scroll-scrub library, which
 * lagged on desktop and was removed from this codebase.
 * ========================================================== */

type Beat = {
  t: string;
  h: string;
  s: string;
  k: 'good' | 'leak' | 'lost' | 'end';
  led?: string;
};

const DAY: Beat[] = [
  {
    t: '6:10 AM',
    h: 'Van loaded. First coffee.',
    s: 'This is the part you actually love. Nobody is calling yet.',
    k: 'good',
  },
  {
    t: '8:30 AM',
    h: 'Hands inside a panel. The phone rings.',
    s: 'You cannot answer it. It goes to voicemail. She does not leave one.',
    k: 'leak',
    led: 'Missed call',
  },
  {
    t: '11:15 AM',
    h: '&ldquo;Can you quote me for the rewire?&rdquo;',
    s: 'You tell her you will send it tonight. You mean it, too.',
    k: 'leak',
    led: 'Quote owed',
  },
  {
    t: '1:40 PM',
    h: 'Job done. She is thrilled with it.',
    s: 'She would have left you five stars today. Nobody asked her to.',
    k: 'leak',
    led: 'Review never asked',
  },
  {
    t: '3:20 PM',
    h: 'Two more calls while you are up a ladder.',
    s: 'Both go to voicemail. One of them was the big one. You will never know which.',
    k: 'leak',
    led: '2 more missed calls',
  },
  {
    t: '6:47 PM',
    h: 'The last call of the day.',
    s: 'It rings out. Twenty seconds later she calls the next name on the list. He picks up.',
    k: 'lost',
    led: 'A job, gone',
  },
  {
    t: '9:00 PM',
    h: 'Laptop on the couch.',
    s: 'The quote you promised. Two invoices. The follow-ups you never got to. This is the second shift.',
    k: 'leak',
    led: '2 hours of admin',
  },
  {
    t: '11:10 PM',
    h: 'Bed.',
    s: 'Tomorrow is the same day. So is the one after that.',
    k: 'end',
  },
];

/* The same Tuesday, run again. */
const FIXED: { t: string; h: string }[] = [
  { t: '8:30 AM', h: 'We answered. Booked her in for Thursday.' },
  { t: '11:15 AM', h: 'Quote sent before you were back in the van.' },
  { t: '1:40 PM', h: 'Review asked for while she was still smiling. Five stars.' },
  { t: '3:20 PM', h: 'Both calls answered. Both booked.' },
  { t: '6:47 PM', h: 'Answered on the second ring. Booked. You never even knew it happened.' },
  { t: '9:00 PM', h: 'You are not working. There is nothing left to do.' },
  { t: '5:30 PM', h: 'Because your day ended at half five.' },
];

const CSS = `
/* ===== A TUESDAY ===== */
.day-track{position:relative;height:760vh;background:#050506;}
.day-stage{position:sticky;top:0;height:100vh;min-height:620px;overflow:hidden;display:flex;flex-direction:column;color:#f5f5f7;}
.day-stage::before{content:'';position:absolute;inset:0;background:radial-gradient(70% 55% at 50% 0%,rgba(14,165,233,.10),transparent 62%);pointer-events:none;transition:background 1.2s ease;}
.day-stage[data-mood="dusk"]::before{background:radial-gradient(70% 55% at 50% 0%,rgba(245,158,11,.12),transparent 62%);}
.day-stage[data-mood="night"]::before{background:radial-gradient(70% 60% at 50% 100%,rgba(239,68,68,.10),transparent 62%);}

.day-in{position:relative;z-index:2;flex:1;display:grid;grid-template-columns:88px minmax(0,1fr) minmax(0,300px);gap:clamp(20px,4vw,56px);align-items:center;width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
@media(max-width:900px){
  .day-in{grid-template-columns:56px minmax(0,1fr);gap:18px;}
  .day-led{display:none;}
}

/* the clock rail */
.day-rail{position:relative;height:60vh;min-height:340px;}
.day-rail .ln{position:absolute;left:11px;top:0;bottom:0;width:2px;background:rgba(255,255,255,.10);border-radius:2px;}
.day-rail .fill{position:absolute;left:11px;top:0;width:2px;border-radius:2px;background:linear-gradient(180deg,#38bdf8,#f59e0b 62%,#ef4444);height:calc(var(--dp,0) * 100%);}
.day-rail .dot{position:absolute;left:4px;top:calc(var(--dp,0) * 100%);width:16px;height:16px;border-radius:50%;background:#f5f5f7;transform:translateY(-50%);box-shadow:0 0 0 5px rgba(245,245,247,.12);transition:background .6s ease,box-shadow .6s ease;}
.day-stage[data-mood="night"] .day-rail .dot{background:#ef4444;box-shadow:0 0 0 5px rgba(239,68,68,.16);}
.day-rail .tk{position:absolute;left:34px;font-size:10.5px;font-weight:700;letter-spacing:.1em;color:#565c66;transform:translateY(-50%);white-space:nowrap;transition:color .4s ease;}
.day-rail .tk.on{color:#f5f5f7;}
@media(max-width:900px){.day-rail .tk{display:none;}}

/* the beat */
.day-beats{position:relative;min-height:300px;}
.day-b{position:absolute;left:0;right:0;top:50%;transform:translateY(calc(-50% + 14px));opacity:0;transition:opacity .55s ease,transform .55s ease;pointer-events:none;}
.day-b.on{opacity:1;transform:translateY(-50%);}
.day-b .tm{font-size:13px;font-weight:700;letter-spacing:.18em;color:#38bdf8;transition:color .5s;}
.day-b.leak .tm{color:#f59e0b;}
.day-b.lost .tm{color:#ef4444;}
.day-b.end .tm{color:#8f97a4;}
.day-b h3{margin-top:14px;font-size:clamp(28px,4.4vw,56px);font-weight:600;letter-spacing:-.035em;line-height:1.04;color:#f5f5f7;max-width:18ch;}
.day-b p{margin-top:18px;font-size:clamp(16px,1.9vw,21px);line-height:1.5;color:#aeb4c0;max-width:40ch;}

/* the ledger */
.day-led{align-self:center;}
.day-led .lh{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#6f7681;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.09);}
.day-led ul{list-style:none;margin:0;padding:0;}
.day-led li{display:flex;align-items:center;gap:10px;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:14.5px;color:#c7ccd6;opacity:0;transform:translateX(10px);transition:opacity .5s ease,transform .5s ease;}
.day-led li.on{opacity:1;transform:none;}
.day-led li i{width:6px;height:6px;border-radius:50%;background:#f59e0b;flex:0 0 auto;}
.day-led li.lost i{background:#ef4444;}
.day-led li.lost{color:#fff;font-weight:600;}

/* the tally */
.day-tally{position:absolute;inset:0;z-index:3;display:flex;align-items:center;justify-content:center;padding:0 24px;opacity:0;pointer-events:none;transition:opacity .7s ease;background:linear-gradient(180deg,rgba(5,5,6,.72),rgba(5,5,6,.94));}
.day-stage[data-tally="1"] .day-tally{opacity:1;}
.day-tally .box{max-width:620px;text-align:center;}
.day-tally .k{font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8f97a4;}
.day-tally h3{margin-top:16px;font-size:clamp(30px,4.6vw,58px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#f5f5f7;}
.day-tally .rows{margin-top:30px;display:grid;gap:1px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.09);border-radius:18px;overflow:hidden;}
.day-tally .rw{background:#08090b;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;font-size:14.5px;color:#c7ccd6;}
.day-tally .rw b{font-weight:600;color:#fff;}
.day-tally .rw.bad b{color:#ef4444;}
.day-tally .end{margin-top:26px;font-size:clamp(17px,2vw,22px);font-weight:600;letter-spacing:-.02em;color:#f5f5f7;}
.day-tally .end .g{color:#f59e0b;}

/* scroll cue */
.day-cue{position:absolute;left:0;right:0;bottom:26px;z-index:2;text-align:center;font-size:11.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#4d535c;transition:opacity .5s;}
.day-stage[data-tally="1"] .day-cue{opacity:0;}

@media(prefers-reduced-motion:reduce){
  .day-track{height:auto;}
  .day-stage{position:static;height:auto;min-height:0;padding:80px 0;}
  .day-b{position:static;opacity:1;transform:none;margin-bottom:48px;}
  .day-led li{opacity:1;transform:none;}
  .day-tally{position:static;opacity:1;background:none;padding:40px 0 0;}
}

/* ===== THE SAME TUESDAY, FIXED ===== */
.fix{background:var(--v4-cream);padding:clamp(80px,11vw,140px) 0;}
.fix .hd{max-width:640px;}
.fix .hd h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.04;letter-spacing:-.035em;font-weight:600;color:var(--v4-ink);}
.fix .hd p{margin-top:16px;font-size:17px;line-height:1.6;color:#6b7280;}
.fix ol{list-style:none;margin:clamp(36px,5vw,52px) 0 0;padding:0;}
.fix li{display:grid;grid-template-columns:96px 24px minmax(0,1fr);gap:14px;align-items:center;padding:18px 0;border-top:1px solid #e6e6e1;opacity:0;transform:translateY(10px);transition:opacity .6s ease,transform .6s ease;}
.fix.on li{opacity:1;transform:none;}
.fix li .tm{font-size:13px;font-weight:700;letter-spacing:.08em;color:#9298a1;}
.fix li .ck{width:24px;height:24px;border-radius:50%;background:rgba(16,185,129,.14);display:flex;align-items:center;justify-content:center;}
.fix li .h{font-size:clamp(16px,1.9vw,20px);font-weight:600;letter-spacing:-.015em;color:var(--v4-ink);}
.fix li:last-child .tm{color:#059669;}
.fix li:last-child .h{color:#059669;}
.fix .out{margin-top:clamp(34px,4vw,48px);font-size:clamp(20px,2.6vw,32px);font-weight:600;letter-spacing:-.025em;line-height:1.25;color:var(--v4-ink);max-width:26ch;}
.fix .out .g{background:linear-gradient(100deg,#06b6d4,#10b981 55%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent;}
@media(max-width:640px){.fix li{grid-template-columns:74px 20px minmax(0,1fr);gap:10px;}}
@media(prefers-reduced-motion:reduce){.fix li{opacity:1;transform:none;}}
`;

export function TheDay() {
  const trackRef = useRef<HTMLElement | null>(null);
  const [i, setI] = useState(0);
  const [dp, setDp] = useState(0);
  const [tally, setTally] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setI(DAY.length - 1);
      setDp(1);
      setTally(true);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-r.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        // Last 18% of the track is the tally.
        const dayP = Math.min(p / 0.82, 1);
        setDp(dayP);
        setI(Math.min(DAY.length - 1, Math.floor(dayP * DAY.length)));
        setTally(p > 0.86);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const mood = i <= 1 ? 'day' : i <= 5 ? 'dusk' : 'night';
  const leaks = DAY.filter((b) => b.led);

  return (
    <>
      <style>{CSS}</style>
      <section ref={trackRef} className="day-track" aria-label="A Tuesday in the life of an owner-operator">
        <div className="day-stage" data-mood={mood} data-tally={tally ? '1' : '0'} style={{ ['--dp' as string]: dp }}>
          <div className="day-in">
            {/* clock rail */}
            <div className="day-rail">
              <span className="ln" />
              <span className="fill" />
              <span className="dot" />
              {DAY.map((b, n) => (
                <span
                  key={b.t}
                  className={`tk${n === i ? ' on' : ''}`}
                  style={{ top: `${(n / (DAY.length - 1)) * 100}%` }}
                >
                  {b.t}
                </span>
              ))}
            </div>

            {/* the beat */}
            <div className="day-beats">
              {DAY.map((b, n) => (
                <div key={b.t} className={`day-b ${b.k}${n === i ? ' on' : ''}`}>
                  <div className="tm">{b.t}</div>
                  <h3 dangerouslySetInnerHTML={{ __html: b.h }} />
                  <p>{b.s}</p>
                </div>
              ))}
            </div>

            {/* the ledger */}
            <div className="day-led">
              <div className="lh">What the day cost you</div>
              <ul>
                {leaks.map((b) => {
                  const idx = DAY.indexOf(b);
                  return (
                    <li key={b.led} className={`${b.k === 'lost' ? 'lost' : ''}${i >= idx ? ' on' : ''}`}>
                      <i />
                      <span>{b.led}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* the tally */}
          <div className="day-tally">
            <div className="box">
              <div className="k">Tuesday, in full</div>
              <h3>You worked seventeen hours. Five of them were not the work.</h3>
              <div className="rows">
                <div className="rw">
                  <span>Calls that rang out</span>
                  <b>3</b>
                </div>
                <div className="rw">
                  <span>Quotes promised and not sent</span>
                  <b>1</b>
                </div>
                <div className="rw">
                  <span>Five-star reviews never asked for</span>
                  <b>1</b>
                </div>
                <div className="rw bad">
                  <span>Jobs that went to the next name on the list</span>
                  <b>1</b>
                </div>
              </div>
              <p className="end">
                And that was <span className="g">a good day.</span>
              </p>
            </div>
          </div>

          <div className="day-cue">Scroll through the day</div>
        </div>
      </section>
    </>
  );
}

/* The same Tuesday, run again, with us in the front. */
export function FixedDay() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) el.classList.add('on'); }),
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="fix" ref={ref}>
      <div className="wrap narrow">
        <div className="hd">
          <div className="eyebrow">The same Tuesday</div>
          <h2>Now run it again, with us in the front.</h2>
          <p>
            Same customers. Same calls. Same jobs. The only thing that changed is that somebody was
            there to catch them.
          </p>
        </div>
        <ol>
          {FIXED.map((f, n) => (
            <li key={f.t} style={{ transitionDelay: `${n * 90}ms` }}>
              <span className="tm">{f.t}</span>
              <span className="ck" aria-hidden>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
                </svg>
              </span>
              <span className="h">{f.h}</span>
            </li>
          ))}
        </ol>
        <p className="out">
          Same Tuesday. Same business. <span className="g">Same you.</span>
        </p>
      </div>
    </section>
  );
}

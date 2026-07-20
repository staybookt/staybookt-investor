'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { min } from '@/lib/css';

/* THE TWO DAYS: the film on /growth.
 *
 * The previous film here drew the five money mechanisms as one revenue stream with five
 * leaks along it. It argued fine and looked wrong: a horizontal line with five points
 * wired off it reads as a cousin of the RemovalTest diagram on /long-term, and the two
 * pages were starting to rhyme. Jacob called it (July 2026): this page needed its own
 * picture, not a second wire drawing.
 *
 * So there is no diagram at all now. Scroll scrubs TIME. One workday, 7:00 AM to
 * 9:00 PM, and the reader lives it twice at once: every moment that matters plays out
 * in two lanes, the day it slips in amber and the day it is caught in emerald. The
 * argument is the same five mechanisms with the same cited numbers, but the reader
 * watches a clock instead of a pipe. Visual vocabulary deliberately NOT used here,
 * because the rest of the site owns it: nodes, wires, streams, pipes, orbit rings,
 * flow diagrams. This film is typographic and scenic: a clock, a sky, moment cards.
 *
 * TWO THINGS MOVE ON EVERY PRESS OF THE ENTIRE FILM, so no press anywhere can land on
 * nothing (the rule that cost hours on the homepage film twice):
 *   - the clock readout, ticking 7:00 AM toward 9:00 PM off the eased progress
 *   - the sky behind the stage, warming dawn to midday to golden hour to dusk
 * The sky is four low-alpha washes over the site's near-black, cross-faded by scroll.
 * The base never leaves #050506, so white and grey type keep their contrast at every
 * hour of the day; the washes are tint, not daylight. On top of that, each moment runs
 * its own continuous locals: the card rises, the slip lane lands, the caught lane
 * answers, the citation settles in.
 *
 * TIME IS PIECEWISE LINEAR ON PURPOSE. The five moments sit at 8:10, 11:30, 2:00,
 * 4:45 and 7:30, which are not evenly spaced on a real clock, but each moment deserves
 * the same reading time. So the track is cut into even-ish segments (B) and the clock
 * runs each segment between the matching hours (TB): it moves on every press, monotonic
 * always, faster through the empty stretches of the day and slower while a moment is on
 * stage. Nobody reads a clock for its velocity; everybody notices a dead press.
 *
 * BUILT ON THE SAME CHASSIS AS EVERY FILM: damped driver (K = 0.12, see JourneyMap for
 * why that constant), measure-the-stage viewport fix, px-clamped track (~40-50 arrow
 * presses at 40px each, ~8-10 a moment, and a bigger monitor costs fewer, never more),
 * snap markers rendered from B, static twin for readers and reduced motion. If you
 * change a law here you are diverging from three other films that all obey it. Do not.
 *
 * THE NUMBERS IN THE CITATIONS ARE NOT OURS. Every figure is the published, external
 * research already cited on this page, source named right under it, linked in the
 * Sources list below the film. No invented totals, no named customers, no fake jobs:
 * the end of the day is one line and zero arithmetic.
 */

type Mo = {
  t: string;    // the clock time this moment arrives
  sc: string;   // the scene, one line
  h: string;    // headline (the established section headline, verbatim)
  slip: string; // left lane: the day it slips
  ct: string;   // right lane: the day it is caught
  f: string;    // the cited figure
  src: string;  // its source, named
};

/* Index 0 is the opening beat, 1 through 5 are the five moments. The headline, slip
   line, caught line and figure of each moment are the page's established copy: same
   claims, same citations, nothing new promised. */
const MOMS: Mo[] = [
  {
    t: '7:00 AM',
    sc: 'Two owners start the same day.',
    h: 'Five moments will decide how this day ends.',
    slip: 'Same trade, same town, same phone that will not stop. On this side of the page, each moment slips past while the day is busy being the day.',
    ct: 'On this side, the same moments land in a system that answers while the owner works. The clock runs on scroll. Watch it.',
    f: '',
    src: '',
  },
  {
    t: '8:10 AM',
    sc: 'A call comes in with both hands busy.',
    h: 'The call that rings out is a job that rings next door.',
    slip: 'The caller has a problem today and a short list of numbers to try. When yours goes to voicemail, most of them just dial the next name, and the job goes with them.',
    ct: 'Every call and text answered, 24 hours a day, in your voice.',
    f: 'A live person answered 37.8% of working-hours calls to real small businesses across 58 industries. The other 62% got voicemail or nothing.',
    src: '411 Locals, 2024',
  },
  {
    t: '11:30 AM',
    sc: 'A new lead wants an answer now.',
    h: 'The fastest answer usually wins the job.',
    slip: 'A homeowner with a leak messages three companies and hires the one that gets back first. Speed reads as competence before you have said a word about your work.',
    ct: 'The first voice they hear back is yours, even with both hands full.',
    f: 'Firms that tried to reach a new lead within an hour were nearly seven times as likely to qualify it. The average company took 42 hours.',
    src: 'Harvard Business Review, 2011',
  },
  {
    t: '2:00 PM',
    sc: 'The quote from last Thursday is still open.',
    h: 'Quotes do not close themselves.',
    slip: 'You price the job, send the quote, and get buried in the week. The customer had two questions and nobody to ask, so the paper sat there until it went cold.',
    ct: 'Every quote you send, chased until you have a yes or a no.',
    f: 'Across home-service contractors on ServiceTitan, only 37% of estimates close on the first visit. The rest close in the follow-up, or never.',
    src: 'ServiceTitan',
  },
  {
    t: '4:45 PM',
    sc: 'The job is finished. The review moment.',
    h: 'Reviews are compounding interest on being found.',
    slip: 'Every review makes you a little easier to find, which brings a few more jobs, which bring a few more reviews. The gap between asking and hoping compounds for years.',
    ct: 'A review asked for after every finished job, and every one answered.',
    f: '88% of consumers would use a business that replies to all of its reviews, against 47% for one that replies to none.',
    src: 'BrightLocal, 2024',
  },
  {
    t: '7:30 PM',
    sc: 'The customer from last spring is due back.',
    h: 'The cheapest job you will ever win is the second one.',
    slip: 'A past customer already trusts you and already has your number. Most of them do not leave, they just drift, and their next job goes to whoever shows up in a search.',
    ct: 'Past customers brought back before they drift, for the work they are due.',
    f: 'Raising customer retention by 5% increases profits by 25% to 95%, and a new customer costs five to twenty-five times as much as keeping one.',
    src: 'Harvard Business Review, citing Bain & Company, 2014',
  },
];

/* The end of the day. One line, no totals, no arithmetic. */
const END =
  'One owner spends this evening chasing what slipped. The other one caught it hours ago, and the evening is just the evening.';

/* Track fractions (B) and the clock hours they map to (TB). Segment i of the track runs
   the clock from TB[i] to TB[i + 1]; moment i arrives at B[i]. Even-ish segments so
   every moment gets ~8-10 presses, whatever the clock says. */
const B = [0, 0.08, 0.27, 0.46, 0.65, 0.84, 1];
const TB = [7, 8 + 10 / 60, 11.5, 14, 16.75, 19.5, 21];

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

const seg = (p: number) => {
  let i = 0;
  while (i < 5 && p >= B[i + 1]) i++;
  return i;
};

const hourOf = (p: number) => {
  const i = seg(p);
  const lp = clamp01((p - B[i]) / (B[i + 1] - B[i]));
  return TB[i] + (TB[i + 1] - TB[i]) * lp;
};

/* 7.5 renders as 7:30 AM, 21 as 9:00 PM. Tabular numerals in the CSS keep it from
   jittering sideways as the minutes spin. */
const fmt = (p: number) => {
  const t = hourOf(p);
  let h = Math.floor(t);
  let m = Math.round((t - h) * 60);
  if (m === 60) { h += 1; m = 0; }
  return { d: (h > 12 ? h - 12 : h) + ':' + (m < 10 ? '0' + m : String(m)), mer: h < 12 ? 'AM' : 'PM' };
};

const CSS = `
.td-track{position:relative;--trk:clamp(2200px,320vh,3000px);height:var(--trk);background:#050506;}
/* iOS: 100vh is the LARGE viewport (URL bar hidden). 100svh is the one actually visible.
   Never put svh on the track: its clamp() height is the film's whole travel. */
.td-stage{position:sticky;top:0;height:100vh;height:100svh;min-height:600px;overflow:hidden;display:flex;
  flex-direction:column;align-items:center;justify-content:center;color:#f5f5f7;
  --mp:0;--r0:0;--r1:0;--r2:0;--r3:0;--ep:0;--skyA:0;--skyB:0;--skyC:0;--skyD:0;}
/* THE SKY. Four washes over the same near-black, cross-faded by the eased progress.
   Alphas stay low on purpose: the base never leaves #050506, so #fff, #aeb6c4 and
   #8a8f98 hold 4.5:1 and better at every hour. Tint, not daylight. */
.td-sky{position:absolute;inset:0;pointer-events:none;}
.td-sky i{position:absolute;inset:0;}
.td-sky .sa{background:radial-gradient(95% 62% at 50% 0%,rgba(251,113,133,.15),rgba(251,146,60,.08) 46%,transparent 72%);opacity:var(--skyA);}
.td-sky .sb{background:radial-gradient(95% 62% at 50% 0%,rgba(96,165,250,.13),rgba(147,197,253,.05) 46%,transparent 72%);opacity:var(--skyB);}
.td-sky .sc{background:radial-gradient(95% 62% at 50% 0%,rgba(245,158,11,.16),rgba(217,119,6,.07) 50%,transparent 76%);opacity:var(--skyC);}
.td-sky .sd{background:radial-gradient(95% 62% at 50% 0%,rgba(99,102,241,.15),rgba(30,27,75,.3) 55%,transparent 82%);opacity:var(--skyD);}
.td-in{position:relative;z-index:2;width:min(1040px,94%);display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2vh,22px);}
/* THE CLOCK. The one continuous readout of the whole film: it moves on every press. */
.td-k{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#8a8f98;}
.td-clock{margin-top:6px;font-variant-numeric:tabular-nums;font-size:clamp(44px,7vw,84px);font-weight:600;letter-spacing:-.04em;line-height:1;color:#fff;}
.td-clock span{font-size:.34em;font-weight:600;letter-spacing:.06em;color:#8a8f98;margin-left:.2em;}
/* THE CARD. Fixed slots and min-heights so the stage never jumps between moments. */
.td-card{width:100%;max-width:920px;text-align:center;opacity:var(--r0);transform:translateY(calc(10px * (1 - var(--r0))));}
.td-mo{min-height:1.4em;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#8a8f98;}
.td-mo b{color:#f5f5f7;font-weight:700;letter-spacing:.12em;font-variant-numeric:tabular-nums;}
.td-h{margin:8px auto 0;min-height:2.15em;max-width:30ch;font-size:clamp(21px,2.9vw,36px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#fff;}
/* THE TWO LANES. Amber is the day it slips, emerald is the day it is caught: the
   Matrix's you-colour against the running-of-it hue, same as everywhere on the site. */
.td-lanes{margin-top:clamp(10px,1.8vh,18px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(14px,2.4vw,26px);text-align:left;min-height:10em;}
.td-lane{border-top:2px solid;padding-top:10px;}
.td-lane h5{margin:0;font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;}
.td-lane p{margin:7px 0 0;font-size:clamp(13.5px,1.45vw,15.5px);line-height:1.5;color:#aeb6c4;max-width:46ch;}
.td-slip{border-color:rgba(245,158,11,.55);opacity:var(--r1);transform:translateY(calc(8px * (1 - var(--r1))));}
.td-slip h5{color:#fbbf24;}
.td-catch{border-color:rgba(52,211,153,.55);opacity:var(--r2);transform:translateY(calc(8px * (1 - var(--r2))));}
.td-catch h5{color:#34d399;}
/* The cite row: the only numbers in the film, and every one is somebody else's. */
.td-cite{margin:10px auto 0;min-height:3.4em;max-width:62ch;font-size:12.5px;line-height:1.5;color:#8a8f98;opacity:var(--r3);}
.td-cite b{display:block;margin-top:3px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:10.5px;color:#8a8f98;}
/* 9:00 PM. The two days end differently, in one line. */
.td-end{min-height:1.6em;max-width:58ch;text-align:center;font-size:clamp(14px,1.5vw,17px);line-height:1.5;font-weight:500;color:#f5f5f7;opacity:var(--ep);transform:translateY(calc(8px * (1 - var(--ep))));}
.td-end b{font-weight:700;font-variant-numeric:tabular-nums;}
.td-dots{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;}
.td-dots span{font-variant-numeric:tabular-nums;font-size:11.5px;font-weight:600;letter-spacing:.1em;color:#f5f5f7;opacity:.3;transition:opacity .4s;}
.td-stage[data-beat="1"] .td-dots .d0,.td-stage[data-beat="2"] .td-dots .d1,.td-stage[data-beat="3"] .td-dots .d2,.td-stage[data-beat="4"] .td-dots .d3,.td-stage[data-beat="5"] .td-dots .d4{opacity:1;}
@media(max-width:760px){
  /* Lanes stack: the day it slips above, the day it is caught below. Everything here
     is real CSS pixels (no SVG scale factor on this film), floor 13px. */
  .td-lanes{grid-template-columns:1fr;gap:14px;min-height:16em;}
  .td-lane p{font-size:13.5px;max-width:none;}
  .td-clock{font-size:42px;}
  .td-h{font-size:20px;}
  .td-mo{font-size:13px;}
  .td-cite{font-size:13px;min-height:4.8em;}
  .td-dots{gap:10px;}
  .td-dots span{font-size:13px;letter-spacing:.04em;}
}
/* Landscape phones and short windows: keyed on height, because a phone on its side is
   844px WIDE. */
@media(max-height:640px){.td-stage{min-height:0;}}
/* THE STATIC TWIN. Shown when the reader asked for reduced motion; .sr-only otherwise.
   The whole day, every moment both ways, every citation, in order. If the film vanished
   tomorrow this would still argue. */
.td-flat{height:auto;padding:clamp(64px,9vw,110px) 0;}
.td-flat .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.td-static h3{font-size:clamp(24px,3.4vw,42px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#fff;max-width:24ch;}
.td-st{margin-top:clamp(26px,3vw,38px);}
.td-st h4{font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;color:#fff;}
.td-st p{margin-top:8px;font-size:15.5px;line-height:1.6;color:#aeb6c4;max-width:62ch;}
.td-st p b{font-weight:700;}
.td-st p.sl b{color:#fbbf24;}
.td-st p.ct b{color:#34d399;}
.td-st p.fg{font-size:13.5px;color:#8a8f98;}
.td-st-end{margin-top:clamp(26px,3vw,38px);font-size:16.5px;line-height:1.6;font-weight:500;color:#fff;max-width:58ch;}
/* MOBILE SNAP - one flick, one moment. Markers at EXACTLY the segment boundaries in B,
   rendered from B itself so they cannot drift from the driver. PROXIMITY, NEVER
   MANDATORY: mandatory on a track this long traps a reader who only wants past the
   film. No scroll-padding and no scroll-margin, deliberately: the target is a
   zero-size marker inside a track whose stage is sticky at top 0, so nothing can hide
   under the fixed nav. DESKTOP IS UNTOUCHED: the snap rules live in the
   max-width:760px block only. */
.td-snap{position:absolute;left:0;width:0;height:0;pointer-events:none;}
@media (max-width:760px){
  html{scroll-snap-type:y proximity;}
  .td-snap{scroll-snap-align:start;}
}
`;

export default function GrowthFilm() {
  const trackRef = useRef<HTMLElement | null>(null);
  /* The pinned stage, measured by the driver instead of window.innerHeight: iOS
     Safari's URL bar changes innerHeight by 60-90px mid-scroll and the film lurches. */
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [reduce, setReduce] = useState(false);
  const [beat, setBeat] = useState(0);
  const [mp, setMp] = useState(0);
  const [pp, setPp] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReduce(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduce) return; // reduced motion: no driver, no pin, no scrub.
    /* DAMPED, NOT DIRECT. Scroll sets a TARGET; the rendered progress eases toward it
       every frame, so a phone flick cannot jump the day to 9:00 PM. K = 0.12 matches
       JourneyMap and RemovalTest: ~0.4s to settle, composes with ArrowScroll's 0.2
       without double-easing into mush. The loop runs only while moving, then STOPS.
       The clock, the sky and the card states all read this eased value: nothing in
       the film reads raw scroll. */
    const K = 0.12;
    let raf = 0;
    let running = false;
    let cur = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const stage = stageRef.current;
      const vh = stage ? stage.offsetHeight : window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      return total > 0 ? scrolled / total : 0;
    };
    const apply = (p: number) => {
      const i = seg(p);
      setBeat(i);
      setMp(clamp01((p - B[i]) / (B[i + 1] - B[i])));
      setPp(p);
    };
    const tick = () => {
      const t = measure();
      const d = t - cur;
      /* 0.0004 of the track is under a pixel: settled, stop the loop. Idle costs nothing. */
      if (Math.abs(d) < 0.0004) {
        cur = t;
        apply(cur);
        running = false;
        return;
      }
      cur += d * K;
      apply(cur);
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    /* First paint is exact, never eased: a reload halfway down must not swoop. */
    cur = measure();
    apply(cur);
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [reduce]);

  /* Everything below reads the EASED value (pp, mp), never raw scroll. */
  const hr = hourOf(pp);
  const ck = fmt(pp);
  const sky = {
    a: clamp01(1 - Math.abs(hr - 7) / 2.6),     // dawn, full at 7:00
    b: clamp01(1 - Math.abs(hr - 12.6) / 3.8),  // midday
    c: clamp01(1 - Math.abs(hr - 17.4) / 2.4),  // golden hour
    d: clamp01((hr - 18.6) / 2.4),              // dusk, full at 9:00
  };
  /* Per-moment locals, all off mp: the card rises, the slip lane lands, the caught lane
     answers, the citation settles. Stacked so every press inside a moment moves one of
     them, and the clock and sky move regardless. */
  const r0 = clamp01(mp * 4);
  const r1 = clamp01((mp - 0.1) / 0.3);
  const r2 = clamp01((mp - 0.45) / 0.3);
  const r3 = clamp01((mp - 0.72) / 0.2);
  const ep = clamp01((pp - 0.95) / 0.045);
  const style = {
    '--mp': mp, '--r0': r0, '--r1': r1, '--r2': r2, '--r3': r3, '--ep': ep,
    '--skyA': sky.a, '--skyB': sky.b, '--skyC': sky.c, '--skyD': sky.d,
  } as CSSProperties;
  const copy = MOMS[beat];

  /* The whole day, every moment both ways, every citation. Shown for reduced motion,
     .sr-only otherwise. The film is aria-hidden, so this twin is the page for screen
     readers. Do not conditionally mount copy in this component. */
  const Static = () => (
    <div className={reduce ? 'td-static' : 'sr-only'}>
      <h3>One workday, 7:00 AM to 9:00 PM. Five moments, and every one plays out both ways.</h3>
      {MOMS.slice(1).map((m) => (
        <div key={m.t} className="td-st">
          <h4>{m.t}. {m.sc}</h4>
          <p>{m.h}</p>
          <p className="sl"><b>The day it slips:</b> {m.slip}</p>
          <p className="ct"><b>The day it is caught:</b> {m.ct}</p>
          <p className="fg">{m.f} ({m.src})</p>
        </div>
      ))}
      <p className="td-st-end">9:00 PM. {END}</p>
    </div>
  );

  /* Reduced motion: no track, no pin, no scrub. Just the day, in order. */
  if (reduce) {
    return (
      <section className="td-track td-flat" aria-label="The two days: one workday, played both ways">
        <style>{min(CSS)}</style>
        <div className="wrap"><Static /></div>
      </section>
    );
  }

  return (
    <section className="td-track" ref={trackRef} aria-label="The two days: one workday, played both ways">
      <style>{min(CSS)}</style>
      {/* SNAP MARKERS. Zero-size, aria-hidden, positioned off B and --trk so they land
          on the same boundaries the driver uses. The reduced-motion branch returns
          above, so they never render there. */}
      {B.map((f, i) => (
        <i key={i} aria-hidden="true" className="td-snap" style={{ top: 'calc((var(--trk) - 100svh) * ' + f + ')' }} />
      ))}
      <Static />
      <div ref={stageRef} className="td-stage" style={style} data-beat={beat} aria-hidden="true">
        <div className="td-sky">
          <i className="sa" /><i className="sb" /><i className="sc" /><i className="sd" />
        </div>
        <div className="td-in">
          <div>
            <div className="td-k">The Two Days</div>
            <div className="td-clock">{ck.d}<span>{ck.mer}</span></div>
          </div>
          <div className="td-card">
            <div className="td-mo"><b>{copy.t}</b> &middot; {copy.sc}</div>
            <div className="td-h">{copy.h}</div>
            <div className="td-lanes">
              <div className="td-lane td-slip">
                <h5>The day it slips</h5>
                <p>{copy.slip}</p>
              </div>
              <div className="td-lane td-catch">
                <h5>The day it is caught</h5>
                <p>{copy.ct}</p>
              </div>
            </div>
            <div className="td-cite">
              {copy.f}
              <b>{copy.src}</b>
            </div>
          </div>
          <p className="td-end"><b>9:00 PM.</b> {END}</p>
          <div className="td-dots">
            {MOMS.slice(1).map((m, i) => (
              <span key={m.t} className={'d' + i}>{m.t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

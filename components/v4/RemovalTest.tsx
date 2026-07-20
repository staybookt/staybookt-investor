'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { min } from '@/lib/css';

/* THE REMOVAL TEST — the cinematic core of /long-term.
 *
 * Jacob: "the homepage and how it works have an immersive experience... they do a beautiful
 * job of showing and telling, engaging the user through the page instead of forcing reading."
 * He was right that /long-term was a memo sitting inside a cinematic site: eyebrow, headline,
 * two paragraphs, a table, four times over. Matching type clamps did not fix that and was
 * never going to.
 *
 * THE IDEA. The page argues that owner-dependence is the discount. That is not a sentence,
 * it is a picture: six things a business needs, every one of them wired back to one person.
 * So we draw it, then we take the person out and let the reader watch the lights go off.
 * That darkness IS the discount. Then five wires re-route to StayBookt, the lights come back,
 * and the owner is still connected but no longer load-bearing. Same argument. No reading.
 *
 * NO PHOTOGRAPHY, on purpose (Jacob's call): the only three Pexels IDs in this codebase are
 * spoken for, and this diagram is more on-brand than a seventh stock photo would be.
 *
 * EVERY BEAT HAS A CONTINUOUS VARIABLE. This is not a style preference, it is the bug that
 * cost hours on the homepage film twice: a beat whose only driver is a discrete step makes
 * two arrow presses out of three land on nothing, and the page reads as broken rather than
 * slow. Beat 0 = the pulse travelling the wires. Beat 1 = the owner lifting out + the wires
 * retracting. Beat 2 = the wires redrawing. If you add a beat, give it something continuous
 * or do not add it.
 *
 * TRACK LENGTH. Clamped in PIXELS, not vh — same fix as the homepage film, same reason.
 * Richard navigates with the DOWN ARROW KEY (~40px/press), and a vh track means a BIGGER
 * MONITOR COSTS MORE PRESSES: 360vh was ~50 presses at 900px and ~59 at 1200px. Backwards.
 * Clamped, this is ~22-29 presses at any viewport and a big screen costs fewer.
 * Measure this film in PRESSES, never pixels, and test it with the keyboard — a scrollbar
 * drag covers the whole track in one gesture and hides the cost completely.
 *
 * THE RULE THIS PAGE EXISTS UNDER: no valuation numbers. The lights going out say "worth
 * less" without ever putting a figure on it, which is exactly why the metaphor earns its
 * place. Do not add a counter, a multiple, or a range. */

type Driver = { k: string; you: string; sb: string; x: number; y: number };

/* Short labels live in the SVG. The long copy lives in the HTML panel below it and swaps
   with the beat, which is the same split the beat-1 wheel uses on the homepage. */
const D: Driver[] = [
  { k: 'Keeps running', you: 'Every call lands on your mobile. Up a ladder, it rings out.', sb: 'Answered, booked and followed up whether you are there or not.', x: 96, y: 132 },
  { k: 'They come back', you: 'You mean to call them. You are on a job. You do not.', sb: 'Past customers brought back for the work they are due.', x: 237, y: 84 },
  { k: 'The list is yours', you: 'Your head, your phone, a notebook.', sb: 'Every customer and job in one record. Exported whenever you ask.', x: 378, y: 62 },
  { k: 'Work arrives', you: 'Word of mouth, and whoever happens to call.', sb: 'Found on search, on the map, and when somebody asks an AI.', x: 522, y: 62 },
  { k: 'Reputation', you: 'Four reviews. The newest one is from 2023.', sb: 'A review asked for after every finished job, and every one answered.', x: 663, y: 84 },
  { k: 'Handover', you: 'Only you know the prices, the rules, the history.', sb: 'Written down. That is what the playbook is, and it is yours.', x: 804, y: 132 },
];

const HUB = { x: 450, y: 372 };

/* Cubic from each node down into the hub. Long enough that the retract reads as a wire
   pulling loose rather than a line simply vanishing. */
const path = (d: Driver) =>
  `M ${d.x} ${d.y} C ${d.x} ${d.y + 130}, ${HUB.x} ${HUB.y - 140}, ${HUB.x} ${HUB.y}`;

/* THE PHONE GETS ITS OWN GEOMETRY, not a bigger font.
 *
 * The desktop box is 900 units wide. On a 390px phone that scales to 0.43, so the node labels
 * rendered at about 7px and the core picture of this page read as grey noise. A font bump
 * alone cannot fix it: six nodes strung across 900 units sit ~140 units apart, and type large
 * enough to read at 0.43 is wide enough to collide with its neighbours.
 *
 * So below 760px the film is redrawn in a 420x440 box: three rows of two, hub underneath.
 * A narrower box means a far bigger scale factor, so the SAME picture arrives about 2.3x
 * larger. Nothing about the story changes - six things, all wired to one person, the owner
 * lifts out, the wires re-route. Only where the six sit on the page.
 *
 * Considered and rejected: dropping the in-SVG labels on mobile and listing them as HTML
 * underneath. It reads fine as a list and not at all as a diagram - the whole argument is
 * that these six converge on one point, and a list has no convergence in it.
 *
 * DESKTOP IS UNTOUCHED. D, HUB, path() and the desktop viewBox above are exactly as they
 * were. Everything mobile lives in M / MHUB / mpath / MLEN below. */
const M: Driver[] = D.map((d, i) => ({ ...d, x: i % 2 === 0 ? 110 : 310, y: 56 + Math.floor(i / 2) * 110 }));
const MHUB = { x: 210, y: 380 };
const mpath = (d: Driver) =>
  `M ${d.x} ${d.y} C ${d.x} ${d.y + 70}, ${MHUB.x} ${MHUB.y - 75}, ${MHUB.x} ${MHUB.y}`;

/* Desktop uses one --len (420) for all six because its wires are all roughly that long.
   The mobile wires are not: the bottom row runs ~145 units and the top row ~340, so a shared
   length would make the short wires vanish a third of the way into the retract and come back
   late. Measure each one instead. */
const clen = (d: Driver) => {
  const c: number[][] = [[d.x, d.y], [d.x, d.y + 70], [MHUB.x, MHUB.y - 75], [MHUB.x, MHUB.y]];
  let L = 0, px = c[0][0], py = c[0][1];
  for (let i = 1; i <= 24; i++) {
    const t = i / 24, u = 1 - t;
    const x = u * u * u * c[0][0] + 3 * u * u * t * c[1][0] + 3 * u * t * t * c[2][0] + t * t * t * c[3][0];
    const y = u * u * u * c[0][1] + 3 * u * u * t * c[1][1] + 3 * u * t * t * c[2][1] + t * t * t * c[3][1];
    L += Math.hypot(x - px, y - py); px = x; py = y;
  }
  return Math.round(L) + 6;   // a hair of slack so --wire:1 is fully retracted
};
const MLEN: number[] = M.map(clen);

const BEATS = [
  { k: 'Right now', h: 'Every one of these runs through you.', s: 'Six things decide whether this is a business or a job with a van. Today, all six are wired to one person.' },
  { k: 'Take a week off', h: 'And here is what a buyer sees.', s: 'A buyer is not looking at your van or your tools. They are looking at what happens when you are not standing there.' },
  /* WAS "Five of those wires stop being yours." Richard: "why is it not 6?" Because it was
     simply wrong: setLit relights ALL SIX in beat 2, and beat 0 above says "all six are wired
     to one person". I wrote a number the picture contradicts.
     It now mirrors beat 0 word for word, which is what the drop-the-mic wants: the film opens
     on "Every one of these runs through you" and closes on the exact inverse. */
  { k: 'The difference', h: 'Not one of them runs through you now.', s: 'The lights stay on whether you are on a roof or on a beach. You are still connected, and nothing falls over when you step away.' },
];

const B = [0, 0.34, 0.68, 1];
const clamp = (n: number) => Math.min(Math.max(n, 0), 1);

const CSS = `
.rt-track{position:relative;--trk:clamp(1500px,230vh,2100px);height:var(--trk);background:#050506;}
/* iOS. 100vh is the LARGE viewport (URL bar hidden), so the pinned stage stood ~86px
   taller than the screen and the beat labels along the bottom sat under Safari's bar.
   100svh is the small viewport, which is the one that is always actually visible. The
   100vh line above it is the fallback for browsers that never heard of svh. On desktop
   the two are identical. NEVER do this to the track: the track's clamp() height is the
   film's entire travel, and in svh it would shrink and the film would collapse. */
.rt-stage{position:sticky;top:0;height:100vh;height:100svh;min-height:600px;overflow:hidden;display:flex;
  flex-direction:column;align-items:center;justify-content:center;color:#f5f5f7;
  --p0:0;--lift:0;--wire:0;}
.rt-stage::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(60% 50% at 50% 8%,rgba(79,70,229,.16),transparent 64%);}

.rt-in{position:relative;z-index:2;width:min(1040px,94%);display:flex;flex-direction:column;align-items:center;gap:clamp(14px,2.4vh,28px);}
.rt-svg{width:100%;height:auto;max-height:46vh;overflow:visible;}

/* WIRES. dashoffset is the whole trick: 0 = connected, full = retracted. Beat 0 runs a
   travelling pulse along them so the diagram is alive before anything has happened. */
.rt-w{fill:none;stroke-width:1.6;stroke-linecap:round;}
.rt-w.base{stroke:rgba(255,255,255,.12);}
.rt-w.live{stroke:#22d3ee;stroke-dasharray:var(--len);stroke-dashoffset:calc(var(--len) * var(--wire));
  filter:drop-shadow(0 0 6px rgba(34,211,238,.5));transition:stroke .5s ease;}
.rt-stage[data-beat="2"] .rt-w.live{stroke:#34d399;filter:drop-shadow(0 0 6px rgba(52,211,153,.55));}
.rt-w.pulse{stroke:#a5f3fc;stroke-width:2.6;stroke-linecap:round;opacity:calc(.9 * (1 - var(--wire)));
  stroke-dasharray:26 999;stroke-dashoffset:calc(-1 * var(--len) * var(--p0));}
.rt-stage[data-beat="1"] .rt-w.pulse,.rt-stage[data-beat="2"] .rt-w.pulse{opacity:0;}

/* NODES. Lit is the default state: the point of beat 1 is losing it. */
.rt-n{transition:fill .45s ease,opacity .45s ease;}
.rt-lbl{font-size:13px;font-weight:600;font-family:-apple-system,sans-serif;transition:fill .45s ease;}

/* THE HUB. Lifts and fades on beat 1, driven continuously by --lift so every press moves it. */
/* The hub translated 96px, which pushed it out of the SVG box and onto the copy below.
   52px plus a faster fade: it is gone before it can collide. */
.rt-hub{transform:translateY(calc(52px * var(--lift)));opacity:calc(1 - 1.15 * var(--lift));transition:none;}
.rt-hub-r{fill:rgba(34,211,238,.14);stroke:#22d3ee;stroke-width:1.5;}
.rt-hub-t{font-size:15px;font-weight:700;fill:#e2e7ef;font-family:-apple-system,sans-serif;}
/* WAS opacity:var(--lift), which meant StayBookt faded IN across beat 1 — visible behind
   the owner while the lights were still going out, spoiling the only reveal this film has.
   --lift belongs to the removal. Beat 2 has its own continuous var: --wire runs 1 -> 0 as
   the wires redraw, so (1 - wire) is beat 2's own 0 -> 1. Keep these two separate. */
.rt-sb{opacity:0;transition:none;}
.rt-stage[data-beat="2"] .rt-sb{opacity:calc(1 - var(--wire));}
.rt-sb-r{fill:rgba(52,211,153,.16);stroke:#34d399;stroke-width:1.5;}
.rt-sb-t{font-size:14px;font-weight:700;fill:#d1fae5;font-family:-apple-system,sans-serif;}

/* COPY PANEL */
.rt-copy{text-align:center;max-width:60ch;}
.rt-k{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#8a8f98;}
.rt-h{margin-top:10px;font-size:clamp(24px,3.4vw,44px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#fff;}
.rt-s{margin:12px auto 0;font-size:clamp(14.5px,1.6vw,18px);line-height:1.5;color:#aeb6c4;max-width:52ch;}

/* THE LINE THAT LANDS. On beat 1 each dark node gets its "you, today" truth. This is the
   best writing on the page and it used to sit greyed out in a table column. */
.rt-truth{min-height:2.6em;margin-top:6px;font-size:clamp(13.5px,1.4vw,16px);line-height:1.4;color:#f59e0b;font-weight:500;}
.rt-stage[data-beat="2"] .rt-truth{color:#34d399;}

.rt-dots{display:flex;gap:22px;justify-content:center;}
.rt-dots span{font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#f5f5f7;opacity:.32;transition:opacity .4s;}
.rt-stage[data-beat="0"] .rt-dots .d0,.rt-stage[data-beat="1"] .rt-dots .d1,.rt-stage[data-beat="2"] .rt-dots .d2{opacity:1;}

@media(max-width:760px){
  /* These sizes are in 420x440 viewBox units, not pixels - see the mobile geometry note
     above. On a 390x844 phone the box lands at scale ~.80, so 21 units is ~17px on glass.
     It was ~7px before. Do not "fix" these numbers by reading them as CSS pixels. */
  .rt-svg{max-height:42vh;}
  .rt-lbl{font-size:21px;}
  .rt-hub-t{font-size:26px;}
  .rt-sb-t{font-size:20px;}
  .rt-dots{gap:12px;}
  .rt-dots span{font-size:10px;letter-spacing:.1em;}
}
/* Landscape phones and short windows: the min-height floor on a 390px-tall screen pushes
   the stage past the viewport and the pin math skews. Keyed on height, not width, because
   a phone on its side is 844px WIDE. */
@media(max-height:640px){.rt-stage{min-height:0;}}
@media(prefers-reduced-motion:reduce){.rt-hub,.rt-sb{transition:none;}}

/* THE STATIC TWIN. Shown when the reader asked for reduced motion; .sr-only otherwise.
   The track collapses: no 100vh stage, no sticky, no scrub. */
.rt-flat{height:auto;padding:clamp(64px,9vw,110px) 0;}
.rt-flat .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.rt-static h3{font-size:clamp(24px,3.4vw,42px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#fff;max-width:18ch;}
.rt-st-beat{margin-top:clamp(26px,3vw,38px);}
.rt-st-beat h4{font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;color:#fff;}
.rt-st-beat p{margin-top:8px;font-size:16px;line-height:1.6;color:#aeb6c4;max-width:60ch;}
.rt-st-list{margin:clamp(30px,3.6vw,44px) 0 0;padding:0;list-style:none;display:grid;gap:14px;}
.rt-st-list li{font-size:15.5px;line-height:1.6;color:#aeb6c4;max-width:70ch;
  padding-left:16px;border-left:2px solid rgba(255,255,255,.14);}
.rt-st-list b{color:#fff;font-weight:600;}

/* MOBILE SNAP - one swipe, one beat.
   A phone flick with iOS momentum covers 1,000-2,000px, which is most or all of this
   1,500-2,100px track, so the removal test played start to finish in one gesture and the
   lights went out and came back before anyone could see it happen. These four markers sit
   at EXACTLY the three beat boundaries in B plus the end of the travel, so the film
   settles on a beat. They are rendered from B itself and cannot drift from the driver.
   PROXIMITY, NEVER MANDATORY. Mandatory on a track this long traps a reader who is only
   trying to get past the film.
   WebKit bug 243582: iOS suppresses momentum scrolling inside a snap container. That is
   the desired behaviour here, not a bug to route around. Do not "fix" it.
   No scroll-padding-top and no scroll-margin-top, deliberately: the snap target is a
   zero-size marker inside a track whose stage is sticky at top 0 and fills the viewport,
   so nothing can hide under the 64px fixed nav, and offsetting by the nav height would
   only land the film 64px off its own beat boundary.
   DESKTOP IS UNTOUCHED: the snap rules live in the max-width:760px block and nowhere else. */
.rt-snap{position:absolute;left:0;width:0;height:0;pointer-events:none;}
@media (max-width:760px){
  html{scroll-snap-type:y proximity;}
  .rt-snap{scroll-snap-align:start;}
}
`;

export default function RemovalTest() {
  const trackRef = useRef<HTMLElement | null>(null);
  /* The pinned stage, measured by the driver below instead of window.innerHeight. */
  const stageRef = useRef<HTMLDivElement | null>(null);
  /* THE FILM IS THE ARGUMENT, SO IT CANNOT BE THE ONLY COPY OF IT.
   * Two people were locked out of this page and it was the same root cause both times:
   *   - reduced motion: the CSS killed the transitions but the driver still ran, so someone
   *     who asked the OS for less movement got ~2,000px of pinned, scrubbing film that now
   *     SNAPPED between states instead of easing. Worse than doing nothing.
   *   - screen readers: only BEATS[beat] was ever mounted, so a linear reader heard beat 0
   *     and moved on. All twelve driver lines — the actual substance, the thing the page says
   *     IS the chart — existed only at a scroll offset they will never reach.
   * One fix for both: a static twin that renders EVERY beat and all twelve lines. Reduced
   * motion shows it and unpins the track; everyone else gets it .sr-only behind the film.
   * If you add a beat, add it to BEATS and it appears in both. Do not conditionally mount
   * copy in this component again. */
  const [reduce, setReduce] = useState(false);
  /* Defaults to FALSE so the server render and the first client render both draw the desktop
     box and React has nothing to complain about. The phone layout arrives on mount. */
  const [mobile, setMobile] = useState(false);
  const [beat, setBeat] = useState(0);
  const [p0, setP0] = useState(0);
  const [lift, setLift] = useState(0);
  const [wire, setWire] = useState(0);
  const [lit, setLit] = useState(6);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReduce(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width:760px)');
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduce) return;   // reduced motion: no driver, no pin, no scrub.
    /* DAMPED, NOT DIRECT. Same fix as the homepage film, same reason.
       This used to map scroll position straight to state, once per frame. On a phone one
       flick covers most of this track, so the owner lifted out and the wires re-routed
       inside a single gesture and the argument never landed. Scroll now sets a TARGET and
       the RENDERED progress eases toward it every frame; the continuous vars (--p0, --lift,
       --wire) AND the discrete light count all read the eased value, so the film keeps
       moving after the thumb leaves the glass.
       K = 0.12 matches JourneyMap: ~0.4s to settle, and it composes with ArrowScroll's 0.2
       scroll easing rather than double-easing into mush. See the long note in JourneyMap.
       The loop runs only while it is moving, then STOPS. Idle costs nothing. */
    const K = 0.12;
    let raf = 0;
    let running = false;
    let cur = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      /* MEASURE THE STAGE, NOT THE WINDOW. window.innerHeight changes by 60-90px as
         iOS Safari's URL bar shows and hides, so progress was divided by a number that
         moved mid-scroll and the pinned film lurched. The sticky stage is the thing that
         is actually pinned, so its rendered height is the real viewport term. */
      const stage = stageRef.current;
      const vh = stage ? stage.offsetHeight : window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      return total > 0 ? scrolled / total : 0;
    };
    const apply = (p: number) => {
        const b = p < B[1] ? 0 : p < B[2] ? 1 : 2;
        const lp = clamp((p - B[b]) / (B[b + 1] - B[b]));
        setBeat(b);
        /* Beat 0: the pulse travels. Beat 1: the owner lifts and the wires retract. Beat 2:
           the wires redraw to StayBookt. Nothing here is a timer, so the reader sets the
           pace, and nothing here is discrete-only, so no press lands on nothing. */
        setP0(b === 0 ? lp : b > 0 ? 1 : 0);
        setLift(b === 0 ? 0 : b === 1 ? lp : 1);
        setWire(b === 0 ? 0 : b === 1 ? lp : 1 - lp);
        /* The lights go out one at a time across beat 1, then come back across beat 2. The
           count is discrete but it rides on top of the continuous retract above. */
        setLit(b === 0 ? 6 : b === 1 ? 6 - Math.min(6, Math.floor(lp * 7)) : Math.min(6, Math.floor(lp * 7)));
    };
    const tick = () => {
      const t = measure();
      const d = t - cur;
      /* 0.0004 of the track is under a pixel: settled, so stop the loop. */
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
    /* First paint is exact, never eased: a reload halfway down the film must not swoop. */
    cur = measure();
    apply(cur);
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [reduce]);

  const style = { '--p0': p0, '--lift': lift, '--wire': wire } as CSSProperties;
  /* One object so there is exactly one place the two layouts differ. Desktop values are the
     literals that were inline before. */
  const g = mobile
    ? { vb: '0 0 420 440', nodes: M, wire: mpath, len: (i: number) => MLEN[i], hub: MHUB, hubR: 54, hubDy: 8, lblDy: -30, rOn: 11, rOff: 7, halo: 20 }
    : { vb: '0 0 900 430', nodes: D, wire: path, len: (_i: number) => 420, hub: HUB, hubR: 34, hubDy: 5, lblDy: -26, rOn: 9, rOff: 6, halo: 17 };
  const copy = BEATS[beat];
  /* On beat 1 the truth line follows the light that just went out. On beat 2 it follows the
     one that just came back. Either way it is the node the eye is already on. */
  const idx = beat === 0 ? -1 : beat === 1 ? Math.min(5, 6 - lit - 1) : Math.min(5, lit - 1);
  const truth = idx < 0 ? '' : beat === 1 ? D[idx].you : D[idx].sb;

  /* EVERY beat and all twelve driver lines. Shown for reduced motion, .sr-only otherwise.
     This is the whole page in text — if the film vanished tomorrow this would still argue. */
  const Static = () => (
    <div className={reduce ? 'rt-static' : 'sr-only'}>
      <h3>Six things decide whether this is a business or a job with a van.</h3>
      {BEATS.map((b) => (
        <div key={b.k} className="rt-st-beat">
          <h4>{b.k}: {b.h}</h4>
          <p>{b.s}</p>
        </div>
      ))}
      <ul className="rt-st-list">
        {D.map((d) => (
          <li key={d.k}>
            <b>{d.k}.</b> Today: {d.you} With StayBookt: {d.sb}
          </li>
        ))}
      </ul>
    </div>
  );

  /* Reduced motion: no track, no pin, no scrub — just the argument, in order. */
  if (reduce) {
    return (
      <section className="rt-track rt-flat" aria-label="What happens when you take yourself out of the business">
        <style>{min(CSS)}</style>
        <div className="wrap"><Static /></div>
      </section>
    );
  }

  return (
    <section className="rt-track" ref={trackRef} aria-label="What happens when you take yourself out of the business">
      <style>{min(CSS)}</style>
      {/* SNAP MARKERS. Invisible, zero-size, aria-hidden: snap targets and nothing else.
          Positioned off B so they land on the same boundaries the driver uses, and off
          --trk so they land inside the same track height. The travel is the track minus
          the pinned stage, which is what the driver divides by. The reduced-motion branch
          returns above this, so they never render there. */}
      {B.map((f, i) => (
        <i key={i} aria-hidden="true" className="rt-snap" style={{ top: `calc((var(--trk) - 100svh) * ${f})` }} />
      ))}
      <Static />
      <div ref={stageRef} className="rt-stage" style={style} data-beat={beat} aria-hidden="true">
        <div className="rt-in">
          {/* The stage is aria-hidden and the Static twin above carries every word, so this
              no longer needs role="img". Its old label summarised beats 0-1, named none of
              the six things, and never mentioned the resolution — which is the point of the
              film. A label that describes half a picture is worse than no label on a picture
              that has a text twin. */}
          <svg className="rt-svg" viewBox={g.vb} aria-hidden="true">
            {g.nodes.map((d) => (
              <path key={`b${d.k}`} className="rt-w base" d={g.wire(d)} />
            ))}
            {g.nodes.map((d, i) => {
              const on = beat === 1 ? i >= 6 - lit : beat === 2 ? i < lit : true;
              return (
                <g key={`w${d.k}`} style={{ '--len': g.len(i) } as CSSProperties}>
                  {on && <path className="rt-w live" d={g.wire(d)} />}
                  {beat === 0 && <path className="rt-w pulse" d={g.wire(d)} />}
                </g>
              );
            })}
            {g.nodes.map((d, i) => {
              const on = beat === 1 ? i >= 6 - lit : beat === 2 ? i < lit : true;
              return (
                <g key={d.k}>
                  <circle className="rt-n" cx={d.x} cy={d.y} r={on ? g.rOn : g.rOff}
                          fill={on ? (beat === 2 ? '#34d399' : '#22d3ee') : '#3f3f46'} />
                  {on && <circle cx={d.x} cy={d.y} r={g.halo} fill={beat === 2 ? 'rgba(52,211,153,.16)' : 'rgba(34,211,238,.16)'} />}
                  <text className="rt-lbl" x={d.x} y={d.y + g.lblDy} textAnchor="middle"
                        fill={on ? '#e2e7ef' : '#5c6470'}>{d.k}</text>
                </g>
              );
            })}
            <g className="rt-hub">
              <circle className="rt-hub-r" cx={g.hub.x} cy={g.hub.y} r={g.hubR} />
              <text className="rt-hub-t" x={g.hub.x} y={g.hub.y + g.hubDy} textAnchor="middle">You</text>
            </g>
            <g className="rt-sb">
              <circle className="rt-sb-r" cx={g.hub.x} cy={g.hub.y} r={g.hubR} />
              <text className="rt-sb-t" x={g.hub.x} y={g.hub.y + g.hubDy} textAnchor="middle">StayBookt</text>
            </g>
          </svg>

          <div className="rt-copy">
            <div className="rt-k">{copy.k}</div>
            <div className="rt-h">{copy.h}</div>
            <div className="rt-s">{copy.s}</div>
            <div className="rt-truth">{truth}</div>
          </div>

          <div className="rt-dots">
            <span className="d0">Right now</span>
            <span className="d1">Take a week off</span>
            <span className="d2">The difference</span>
          </div>
        </div>
      </div>
    </section>
  );
}

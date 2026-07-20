'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { min } from '@/lib/css';

/* THE FIVE LEAKS: the film that replaced the /growth wall of text.
 *
 * The draft page argued five money mechanisms in five dense sections. Same argument,
 * drawn: one revenue stream, five points where money visibly leaks out of it in amber
 * (the Matrix's you-colour, the colour of work and money that are still yours to lose),
 * and at each beat StayBookt catches the leak and seals it in emerald. By beat five all
 * five are sealed and the whole stream runs green. The reader watches the money stop
 * leaking instead of reading that it does.
 *
 * BUILT ON THE RemovalTest CHASSIS, deliberately: same damped driver (K = 0.12, see the
 * long note in JourneyMap for why that constant), same measure-the-stage viewport fix,
 * same px-clamped track, same mobile-gets-its-own-geometry move, same static twin, same
 * snap markers rendered from B. If you change a law here, you are diverging from three
 * other films that all obey it. Do not.
 *
 * EVERY BEAT HAS A CONTINUOUS VARIABLE, the rule that cost hours on the homepage film
 * twice. Each beat runs three at once off its local progress:
 *   --dr  drip travel: the amber leak visibly drips for the whole beat
 *   --sl  the seal: the emerald ring draws around the leak and the catch line fades in
 *   --fp  global flow: the dashes on the revenue line itself move on EVERY press of the
 *         entire film, so no press anywhere can land on nothing
 * On the last beat --sl also drives the whole line turning emerald, which is the payoff.
 *
 * TRACK LENGTH IS CLAMPED IN PIXELS, NOT vh. Richard reviews with the DOWN ARROW KEY at
 * ~40px a press, and a vh track makes a bigger monitor cost MORE presses, which is
 * backwards. This clamp lands at roughly 38-49 presses for five beats (~8-10 a beat) at
 * any viewport, and a big screen costs fewer. Measure this film in presses, never
 * pixels, and test it with the keyboard: a scrollbar drag hides the toll completely.
 *
 * THE NUMBERS IN THE CAPTIONS ARE NOT OURS. Every figure is the published, external
 * research already cited on this page, source named right under it, linked in the
 * Sources list below the film. No invented numbers, no ROI claim, no upgraded product
 * claims: what-we-do lines say only what /whats-included already says. */

type Beat = {
  k: string;   // eyebrow
  n: string;   // short node label in the SVG
  h: string;   // headline (the existing section headline, verbatim)
  s: string;   // the leak, 1-2 lines
  c: string;   // the catch: what we do, fades in with the seal
  f: string;   // the cited figure
  src: string; // its source, named
};

const BEATS: Beat[] = [
  {
    k: 'The first leak',
    n: 'Missed calls',
    h: 'The call that rings out is a job that rings next door.',
    s: 'The caller has a problem today and a short list of numbers to try. When yours goes to voicemail, most of them just dial the next name, and the job goes with them.',
    c: 'Sealed: every call and text answered, 24 hours a day, in your voice.',
    f: 'A live person answered 37.8% of working-hours calls to real small businesses across 58 industries. The other 62% got voicemail or nothing.',
    src: '411 Locals, 2024',
  },
  {
    k: 'The second leak',
    n: 'Slow response',
    h: 'The fastest answer usually wins the job.',
    s: 'A homeowner with a leak messages three companies and hires the one that gets back first. Speed reads as competence before you have said a word about your work.',
    c: 'Sealed: the first voice they hear back is yours, even with both hands full.',
    f: 'Firms that tried to reach a new lead within an hour were nearly seven times as likely to qualify it. The average company took 42 hours.',
    src: 'Harvard Business Review, 2011',
  },
  {
    k: 'The third leak',
    n: 'Unchased quotes',
    h: 'Quotes do not close themselves.',
    s: 'You price the job, send the quote, and get buried in Tuesday. The customer had two questions and nobody to ask, so the paper sat there until it went cold.',
    c: 'Sealed: every quote you send, chased until you have a yes or a no.',
    f: 'Across home-service contractors on ServiceTitan, only 37% of estimates close on the first visit. The rest close in the follow-up, or never.',
    src: 'ServiceTitan',
  },
  {
    k: 'The fourth leak',
    n: 'Reviews',
    h: 'Reviews are compounding interest on being found.',
    s: 'Every review makes you a little easier to find, which brings a few more jobs, which bring a few more reviews. The gap between asking and hoping compounds for years.',
    c: 'Sealed: a review asked for after every finished job, and every one answered.',
    f: '88% of consumers would use a business that replies to all of its reviews, against 47% for one that replies to none.',
    src: 'BrightLocal, 2024',
  },
  {
    k: 'The fifth leak',
    n: 'Repeat work',
    h: 'The cheapest job you will ever win is the second one.',
    s: 'A past customer already trusts you and already has your number. Most of them do not leave, they just drift, and their next job goes to whoever shows up in a search.',
    c: 'Sealed: past customers brought back before they drift, for the work they are due.',
    f: 'Raising customer retention by 5% increases profits by 25% to 95%, and a new customer costs five to twenty-five times as much as keeping one.',
    src: 'Harvard Business Review, citing Bain & Company, 2014',
  },
];

/* DESKTOP GEOMETRY. One horizontal revenue stream, five leak points along it. */
const NX = [120, 285, 450, 615, 780];
const LY = 150; // the line
const leak = (x: number) =>
  'M ' + x + ' ' + LY + ' C ' + x + ' 215, ' + (x + 46) + ' 262, ' + (x + 46) + ' 330';

/* THE PHONE GETS ITS OWN GEOMETRY, not a bigger font: the RemovalTest lesson. Five
 * labels strung across a 900-unit box render at ~7px on a 390px screen and collide long
 * before they are legible. So below 760px the stream is redrawn VERTICAL in a 420x470
 * box: revenue flows top to bottom, the five leaks spill to the right, labels sit beside
 * their node at 21 viewBox units. At 390px the SVG renders ~366px wide, scale ~0.87, so
 * the labels land at ~18px on glass. Do not read these font numbers as CSS pixels.
 * DESKTOP IS UNTOUCHED: NX, LY and leak() above are exactly what they were. */
const MX = 72;
const MY = [60, 145, 230, 315, 400];
const mleak = (y: number) =>
  'M ' + MX + ' ' + y + ' C 150 ' + (y + 8) + ', 240 ' + (y + 26) + ', 330 ' + (y + 44);

const B = [0, 0.2, 0.4, 0.6, 0.8, 1];
const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

const CSS = `
.gf-track{position:relative;--trk:clamp(2200px,320vh,3000px);height:var(--trk);background:#050506;}
/* iOS: 100vh is the LARGE viewport (URL bar hidden). 100svh is the one actually visible.
   Never put svh on the track: its clamp() height is the film's whole travel. */
.gf-stage{position:sticky;top:0;height:100vh;height:100svh;min-height:600px;overflow:hidden;display:flex;
  flex-direction:column;align-items:center;justify-content:center;color:#f5f5f7;
  --dr:0;--sl:0;--fp:0;}
.gf-stage::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(60% 50% at 50% 8%,rgba(245,158,11,.09),transparent 64%);}
.gf-stage[data-beat="4"]::before{background:radial-gradient(60% 50% at 50% 8%,rgba(16,185,129,.1),transparent 64%);}

.gf-in{position:relative;z-index:2;width:min(1040px,94%);display:flex;flex-direction:column;align-items:center;gap:clamp(12px,2.2vh,26px);}
.gf-svg{width:100%;height:auto;max-height:44vh;overflow:visible;}

/* THE STREAM. A faint rail plus dashes that move on every press of the whole film. */
.gf-rail{fill:none;stroke:rgba(255,255,255,.14);stroke-width:2;stroke-linecap:round;}
.gf-flow{fill:none;stroke:#f59e0b;stroke-width:2.4;stroke-linecap:round;opacity:.8;
  stroke-dasharray:7 17;stroke-dashoffset:calc(-1 * var(--fp) * 480);}
/* The payoff: on the last beat the whole stream turns emerald as the seal completes. */
.gf-flow2{fill:none;stroke:#34d399;stroke-width:2.4;stroke-linecap:round;opacity:0;
  stroke-dasharray:7 17;stroke-dashoffset:calc(-1 * var(--fp) * 480);
  filter:drop-shadow(0 0 6px rgba(52,211,153,.5));}
.gf-stage[data-beat="4"] .gf-flow2{opacity:var(--sl);}
.gf-stage[data-beat="4"] .gf-flow{opacity:calc(.8 * (1 - var(--sl)));}

/* THE LEAKS. Amber, the you-colour: this is money that is still yours to lose. */
.gf-lk{fill:none;stroke:#f59e0b;stroke-width:2;stroke-linecap:round;transition:opacity .45s ease;}
.gf-dp{fill:none;stroke:#fbbf24;stroke-width:3.2;stroke-linecap:round;
  stroke-dasharray:10 22;stroke-dashoffset:calc(-1 * var(--dr) * 128);transition:opacity .45s ease;}
.gf-nd.todo .gf-lk{opacity:.18;}
.gf-nd.todo .gf-dp{opacity:0;}
.gf-nd.act .gf-lk{opacity:calc(.9 * (1 - var(--sl)));filter:drop-shadow(0 0 5px rgba(245,158,11,.45));}
.gf-nd.act .gf-dp{opacity:calc(1 - var(--sl));}
.gf-nd.done .gf-lk,.gf-nd.done .gf-dp{opacity:0;}

/* THE SEAL. An emerald ring draws around the leak point, then holds its check. */
.gf-ring{fill:none;stroke:#34d399;stroke-width:2;stroke-dasharray:101;
  filter:drop-shadow(0 0 6px rgba(52,211,153,.5));}
.gf-nd.todo .gf-ring{stroke-dashoffset:101;}
.gf-nd.act .gf-ring{stroke-dashoffset:calc(101 * (1 - var(--sl)));}
.gf-nd.done .gf-ring{stroke-dashoffset:0;}
.gf-ck{fill:none;stroke:#34d399;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;transition:opacity .3s ease;}
.gf-nd.todo .gf-ck{opacity:0;}
.gf-nd.act .gf-ck{opacity:var(--sl);}
.gf-nd.done .gf-ck{opacity:1;}
.gf-dot{transition:fill .45s ease;}
.gf-lbl{font-size:13px;font-weight:600;font-family:-apple-system,sans-serif;transition:fill .45s ease;}

/* COPY PANEL. Fixed slots so the stage never jumps between beats. */
.gf-copy{text-align:center;max-width:64ch;}
.gf-k{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#8a8f98;}
.gf-h{margin-top:10px;min-height:2.1em;font-size:clamp(22px,3.1vw,40px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#fff;}
.gf-s{margin:10px auto 0;min-height:4.6em;font-size:clamp(14px,1.55vw,17px);line-height:1.5;color:#aeb6c4;max-width:56ch;}
/* The catch line rides the seal: same continuous var, so it settles in as the ring draws. */
.gf-c{margin:8px auto 0;min-height:1.6em;font-size:clamp(13.5px,1.4vw,16px);line-height:1.45;font-weight:500;color:#34d399;
  opacity:var(--sl);transform:translateY(calc(6px * (1 - var(--sl))));}
/* The cite row: the only numbers in the film, and every one is somebody else's. */
.gf-cite{margin:12px auto 0;min-height:3.4em;max-width:62ch;font-size:12.5px;line-height:1.5;color:#8a8f98;}
.gf-cite b{display:block;margin-top:3px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:10.5px;color:#8a8f98;}

.gf-dots{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;}
.gf-dots span{font-size:11.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#f5f5f7;opacity:.32;transition:opacity .4s;}
.gf-stage[data-beat="0"] .gf-dots .d0,.gf-stage[data-beat="1"] .gf-dots .d1,.gf-stage[data-beat="2"] .gf-dots .d2,
.gf-stage[data-beat="3"] .gf-dots .d3,.gf-stage[data-beat="4"] .gf-dots .d4{opacity:1;}

@media(max-width:760px){
  /* Sizes here are 420x470 viewBox units, not pixels: at 390px the box renders at
     scale ~0.87, so 21 units is ~18px on glass. Do not "fix" them as CSS pixels. */
  .gf-svg{max-height:40vh;}
  .gf-lbl{font-size:21px;}
  .gf-dots{gap:10px;}
  .gf-dots span{font-size:10px;letter-spacing:.08em;}
  .gf-s{min-height:6em;}
  .gf-cite{min-height:4.8em;}
}
/* Landscape phones and short windows: keyed on height, because a phone on its side is
   844px WIDE. */
@media(max-height:640px){.gf-stage{min-height:0;}}

/* THE STATIC TWIN. Shown when the reader asked for reduced motion; .sr-only otherwise.
   Every beat, every catch, every stat, in order. If the film vanished tomorrow this
   would still argue. */
.gf-flat{height:auto;padding:clamp(64px,9vw,110px) 0;}
.gf-flat .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.gf-static h3{font-size:clamp(24px,3.4vw,42px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#fff;max-width:22ch;}
.gf-st-beat{margin-top:clamp(26px,3vw,38px);}
.gf-st-beat h4{font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;color:#fff;}
.gf-st-beat p{margin-top:8px;font-size:15.5px;line-height:1.6;color:#aeb6c4;max-width:62ch;}
.gf-st-beat p.ct{color:#34d399;font-weight:500;}
.gf-st-beat p.fg{font-size:13.5px;color:#8a8f98;}

/* MOBILE SNAP - one flick, one beat. Six markers at EXACTLY the five beat boundaries in
   B plus the end of the travel, rendered from B itself so they cannot drift from the
   driver. PROXIMITY, NEVER MANDATORY: mandatory on a track this long traps a reader who
   only wants past the film. WebKit bug 243582 (iOS suppresses momentum inside a snap
   container) is the desired behaviour here, not a bug to route around. No scroll-padding
   and no scroll-margin, deliberately: the target is a zero-size marker inside a track
   whose stage is sticky at top 0, so nothing can hide under the fixed nav.
   DESKTOP IS UNTOUCHED: the snap rules live in the max-width:760px block only. */
.gf-snap{position:absolute;left:0;width:0;height:0;pointer-events:none;}
@media (max-width:760px){
  html{scroll-snap-type:y proximity;}
  .gf-snap{scroll-snap-align:start;}
}
`;

export default function GrowthFilm() {
  const trackRef = useRef<HTMLElement | null>(null);
  /* The pinned stage, measured by the driver instead of window.innerHeight: iOS
     Safari's URL bar changes innerHeight by 60-90px mid-scroll and the film lurches. */
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [reduce, setReduce] = useState(false);
  /* Defaults FALSE so server render and first client render agree (desktop box). */
  const [mobile, setMobile] = useState(false);
  const [beat, setBeat] = useState(0);
  const [dr, setDr] = useState(0);
  const [sl, setSl] = useState(0);
  const [fp, setFp] = useState(0);

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
    if (!el || reduce) return; // reduced motion: no driver, no pin, no scrub.
    /* DAMPED, NOT DIRECT. Scroll sets a TARGET; the rendered progress eases toward it
       every frame, so a phone flick cannot jump the film to its last frame. K = 0.12
       matches JourneyMap and RemovalTest: ~0.4s to settle, composes with ArrowScroll's
       0.2 without double-easing into mush. The loop runs only while moving, then STOPS. */
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
      const b = p < B[1] ? 0 : p < B[2] ? 1 : p < B[3] ? 2 : p < B[4] ? 3 : 4;
      const lp = clamp01((p - B[b]) / (B[b + 1] - B[b]));
      setBeat(b);
      /* Three continuous variables per beat, all off lp, so no press lands on nothing:
         the drip travels for the whole beat, the seal draws across its back half, and
         the flow dashes on the stream ride overall progress through the entire film. */
      setDr(lp);
      setSl(clamp01((lp - 0.5) / 0.45));
      setFp(p);
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

  const style = { '--dr': dr, '--sl': sl, '--fp': fp } as CSSProperties;
  const copy = BEATS[beat];

  /* One object, one place the two layouts differ (the RemovalTest pattern). */
  const g = mobile
    ? {
        vb: '0 0 420 470',
        rail: 'M ' + MX + ' 24 L ' + MX + ' 446',
        pt: (i: number) => ({ x: MX, y: MY[i] }),
        lk: (i: number) => mleak(MY[i]),
        lbl: (i: number) => ({ x: MX + 34, y: MY[i] - 16, a: 'start' as const }),
        rOn: 10, rOff: 7, ring: 17,
      }
    : {
        vb: '0 0 900 430',
        rail: 'M 30 ' + LY + ' L 870 ' + LY,
        pt: (i: number) => ({ x: NX[i], y: LY }),
        lk: (i: number) => leak(NX[i]),
        lbl: (i: number) => ({ x: NX[i], y: LY - 30, a: 'middle' as const }),
        rOn: 9, rOff: 6, ring: 16,
      };

  /* EVERY beat, catch and stat. Shown for reduced motion, .sr-only otherwise. The film
     is aria-hidden, so this twin is the page for screen readers. Do not conditionally
     mount copy in this component. */
  const Static = () => (
    <div className={reduce ? 'gf-static' : 'sr-only'}>
      <h3>Five places money leaks out of a service business, and the seal on each one.</h3>
      {BEATS.map((b) => (
        <div key={b.k} className="gf-st-beat">
          <h4>{b.n}: {b.h}</h4>
          <p>{b.s}</p>
          <p className="ct">{b.c}</p>
          <p className="fg">{b.f} ({b.src})</p>
        </div>
      ))}
    </div>
  );

  /* Reduced motion: no track, no pin, no scrub. Just the argument, in order. */
  if (reduce) {
    return (
      <section className="gf-track gf-flat" aria-label="The five leaks, and what seals each one">
        <style>{min(CSS)}</style>
        <div className="wrap"><Static /></div>
      </section>
    );
  }

  return (
    <section className="gf-track" ref={trackRef} aria-label="The five leaks, and what seals each one">
      <style>{min(CSS)}</style>
      {/* SNAP MARKERS. Zero-size, aria-hidden, positioned off B and --trk so they land
          on the same boundaries the driver uses. The reduced-motion branch returns
          above, so they never render there. */}
      {B.map((f, i) => (
        <i key={i} aria-hidden="true" className="gf-snap" style={{ top: `calc((var(--trk) - 100svh) * ${f})` }} />
      ))}
      <Static />
      <div ref={stageRef} className="gf-stage" style={style} data-beat={beat} aria-hidden="true">
        <div className="gf-in">
          <svg className="gf-svg" viewBox={g.vb} aria-hidden="true">
            <path className="gf-rail" d={g.rail} />
            <path className="gf-flow" d={g.rail} />
            <path className="gf-flow2" d={g.rail} />
            {BEATS.map((b, i) => {
              const cls = i < beat ? 'done' : i === beat ? 'act' : 'todo';
              const p = g.pt(i);
              const l = g.lbl(i);
              const done = i < beat || (i === beat && sl >= 1);
              return (
                <g key={b.n} className={'gf-nd ' + cls}>
                  <path className="gf-lk" d={g.lk(i)} />
                  <path className="gf-dp" d={g.lk(i)} />
                  <circle className="gf-ring" cx={p.x} cy={p.y} r={g.ring}
                          transform={'rotate(-90 ' + p.x + ' ' + p.y + ')'} />
                  <circle className="gf-dot" cx={p.x} cy={p.y} r={i === beat ? g.rOn : g.rOff}
                          fill={done ? '#34d399' : i === beat ? '#f59e0b' : '#3f3f46'} />
                  <path className="gf-ck"
                        d={'M ' + (p.x - 5) + ' ' + p.y + ' l 3.5 4 l 7 -8.5'} />
                  <text className="gf-lbl" x={l.x} y={l.y} textAnchor={l.a}
                        fill={done ? '#a7f3d0' : i === beat ? '#f5f5f7' : '#5c6470'}>{b.n}</text>
                </g>
              );
            })}
          </svg>

          <div className="gf-copy">
            <div className="gf-k">{copy.k}</div>
            <div className="gf-h">{copy.h}</div>
            <div className="gf-s">{copy.s}</div>
            <div className="gf-c">{copy.c}</div>
            <div className="gf-cite">
              {copy.f}
              <b>{copy.src}</b>
            </div>
          </div>

          <div className="gf-dots">
            {BEATS.map((b, i) => (
              <span key={b.n} className={'d' + i}>{b.n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

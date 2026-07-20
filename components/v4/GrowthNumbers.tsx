'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { min } from '@/lib/css';

/* THE NUMBERS: the keynote take, now on ONE PINNED STAGE.
 *
 * Take one was five dense text sections. Takes two and three were scroll-scrubbed
 * films, and Jacob rejected both: annoying to drive, not unique to this page. Take
 * four made THE CITED FIGURE THE VISUAL, one thought per full screen at keynote
 * scale, and Jacob liked it but called the cost: each figure charged a full viewport
 * of travel, so five figures plus the hinge cost six screens of scrolling for six
 * sentences.
 *
 * THIS TAKE keeps the keynote figures and collapses the travel. One sticky stage,
 * 100svh, inside a short track (~150vh of pinned travel, clamped in px so a big
 * monitor costs FEWER presses, see JourneyMap's track-length note). Six stops: five
 * figures and the hinge. The figures ADVANCE IN PLACE.
 *
 * MOTION LAW, and the two rejections it steers between:
 *   - NOT SCRUBBED. The stops are discrete. Crossing a boundary plays one eased
 *     transition (~600ms scale and fade, outgoing leaves fast, incoming arrives a
 *     beat late) and then the stop HOLDS. Jacob rejected scrub-feel twice; nothing
 *     here maps scroll distance to animation timeline.
 *   - NOT DEAD EITHER. This site's law is that every arrow press visibly does
 *     something (see the beat-1 postmortem in JourneyMap). So inside a stop the
 *     figure and caption layers carry a continuous micro-parallax off the damped
 *     progress: the caption drifts a touch faster than the figure, transform-only,
 *     a few px per press. Presses between boundaries produce motion, boundaries
 *     produce the advance.
 *   - DAMPED, NOT DIRECT. Same driver shape as JourneyMap: scroll sets a target,
 *     rAF eases the rendered value toward it, K = 0.12, and the loop STOPS at
 *     settle. Idle costs nothing. Never leave a permanent rAF loop running here.
 *
 * COUNT-UP fires once per figure on first arrival at its stop, ~900ms ease-out
 * cubic, then never again. No aria-live on it, on purpose: a screen reader gets the
 * real text in DOM order and is never shouted at by sixty intermediate values.
 *
 * SSR AND NO-JS RENDER THE FLAT TWIN. The component ships as stacked static
 * sections (all five figures, captions and sources readable in DOM order, final
 * strings in the prerendered HTML, findable with JavaScript off). A mount effect
 * upgrades it to the pinned stage ONLY when the reader has not asked for reduced
 * motion. prefers-reduced-motion therefore gets: no pin, no count-up, no parallax,
 * no snap markers, just the six thoughts in order. The five figure strings are
 * checked by the prerender greps; state starts at 1 so the server prints them.
 *
 * THE NUMBERS ARE NOT OURS. Every figure is published external research, source
 * named on its own stop and linked in the Sources list at the bottom of the page.
 * The dropped stats stay dropped: see the note in app/growth/page.tsx.
 *
 * MOBILE: six zero-size snap markers sit at the centre of each stop's slice of the
 * track, inside the site's max-width:760px proximity regime only, so a flick lands
 * on a stop instead of between two. Desktop scrolls free.
 */

type Stat = {
  key: string;
  eye: string;
  fig: (p: number) => string;
  small?: boolean;
  line: string;
  src: string;
};

/* ONE LINE PER FIGURE. The old second line (what StayBookt does about it) is gone
   from the stage: the strongest sentence carries the stop, and YourMath below
   carries the so-what. The figure functions receive the EASED progress (0 to 1)
   and must return the exact final string at p = 1. The prerender checks grep for
   those strings. */
const STATS: Stat[] = [
  {
    key: 'missed',
    eye: 'Missed calls',
    fig: (p) => Math.round(62 * p) + '%',
    line: 'of calls to home-service businesses are never answered live.',
    src: '411 Locals, 2024. A live person answered 37.8% of working-hours calls to real small businesses across 58 industries.',
  },
  {
    key: 'speed',
    eye: 'Speed to lead',
    fig: (p) => Math.round(7 * p) + 'x',
    line: 'more likely to win the lead when you answer within the hour. The average business takes 42 hours.',
    src: 'Harvard Business Review, 2011. Audit of 2,241 companies: firms responding within an hour were nearly seven times as likely to qualify the lead.',
  },
  {
    key: 'quotes',
    eye: 'Unchased quotes',
    fig: (p) => Math.round(37 * p) + '%',
    line: 'of home-service estimates close on the first visit. The rest close in the follow-up, or never.',
    src: 'ServiceTitan, Follow-Ups 101, across home-service contractors on the platform.',
  },
  {
    key: 'reviews',
    eye: 'Reviews',
    fig: (p) => Math.round(88 * p) + '%',
    line: 'of consumers would use a business that replies to all of its reviews. For one that replies to none, 47%.',
    src: 'BrightLocal, Local Consumer Review Survey, 2024.',
  },
  {
    key: 'repeat',
    eye: 'Repeat customers',
    fig: (p) => Math.round(25 * p) + '-' + Math.round(95 * p) + '%',
    small: true,
    line: 'more profit from raising customer retention by just five percent.',
    src: 'Harvard Business Review, citing Bain & Company, 2014. A new customer costs five to twenty-five times as much as keeping one.',
  },
];

const STOPS = 6; // five figures + the hinge

const CSS = `
.gnx{position:relative;background:#050506;color:#f5f5f7;}
/* FLAT IS THE DEFAULT. This is what the server, JavaScript-off, and
   prefers-reduced-motion all get: six stacked thoughts, no pin, no travel tax. */
.gnx-stop{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;padding:clamp(64px,9vh,100px) clamp(20px,4vw,40px) 30px;}
.gnx-body{display:flex;flex-direction:column;align-items:center;}
.gn-eye{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#8a8f98;}
/* THE FIGURE. Keynote scale, gradient on the number itself, tabular so digits do
   not jitter sideways while they count. Giant display text, so the on-dark
   gradient's quietest stop clears the WCAG large-text bar with room. */
.gn-fig{margin-top:clamp(8px,1.6vh,18px);font-family:var(--font-display),'Inter Tight','Helvetica Neue',Arial,sans-serif;font-size:clamp(96px,22vw,260px);line-height:.95;font-weight:700;letter-spacing:-.05em;font-variant-numeric:tabular-nums;background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
/* The range figure is six characters wide; it gets its own smaller ramp so it
   never clips a phone. */
.gn-fig-sm{font-size:clamp(64px,15vw,180px);}
.gn-line{margin:clamp(14px,2.4vh,26px) auto 0;max-width:36ch;font-size:clamp(18px,2.2vw,25px);font-weight:600;letter-spacing:-.02em;line-height:1.4;color:#fff;}
/* The source: small and quiet at the bottom of its stop. #8a8f98 on #050506 is
   6.27:1. */
.gn-src{margin:24px auto 0;max-width:60ch;font-size:12.5px;line-height:1.5;color:#8a8f98;}
.gn-pre{font-size:clamp(19px,2.4vw,30px);font-weight:600;letter-spacing:-.02em;line-height:1.35;color:#aeb6c4;max-width:30ch;}
.gnx-rail{display:none;}
.gnx-snap{position:absolute;left:0;width:0;height:0;pointer-events:none;}

/* LIVE: the pinned stage. Added on mount, never for reduced motion.
   TRACK LENGTH is clamped in PX, not vh, for the reason documented at length in
   JourneyMap: Richard drives with the down arrow (~40px a press) and a vh track
   bills a bigger monitor MORE presses. Clamped, the whole six-stop sequence costs
   ~25-35 presses at any viewport, ~4-6 a stop, under two viewports of travel. */
.gnx-live{--gnx-t:clamp(1000px,150vh,1400px);height:calc(100vh + var(--gnx-t));height:calc(100svh + var(--gnx-t));}
/* 100vh then 100svh: same iOS URL-bar reasoning as JourneyMap's stage. */
.gnx-live .gnx-stage{position:sticky;top:0;height:100vh;height:100svh;min-height:560px;overflow:hidden;}
/* THE ADVANCE. Discrete stops, eased hand-off: the outgoing stop LEAVES FAST and
   the incoming one ARRIVES A BEAT LATE, same doubled-caption fix as JourneyMap's
   heads, so the stage is briefly quiet rather than briefly double-printed. */
.gnx-live .gnx-stop{position:absolute;inset:0;padding:0 clamp(20px,4vw,40px);opacity:0;transform:scale(.965);transition:opacity .24s ease,transform .24s ease;pointer-events:none;}
.gnx-live .gnx-stop.on{opacity:1;transform:none;pointer-events:auto;transition:opacity .55s ease .14s,transform .62s cubic-bezier(.16,1,.3,1) .14s;}
.gnx-live .gnx-body{margin:auto 0;padding-top:clamp(48px,7vh,80px);}
.gnx-live .gnx-stop .gn-src{margin:0 auto;padding:22px 0 44px;}
/* MICRO-PARALLAX. --mp runs -0.5..0.5 through a stop off the damped driver. The
   caption drifts a touch more than the figure, so depth reads between the layers
   and every press inside a stop still moves the picture. Transform-only, no
   transition: the damping IS the easing. */
.gnx-live .gnx-fw{transform:translate3d(0,calc(var(--mp,0) * -10px),0);}
.gnx-live .gnx-cw{transform:translate3d(0,calc(var(--mp,0) * -24px),0);}
/* THE RAIL. Six quiet ticks, the active one lit. Indicator only: pointer-events
   none, aria-hidden, so it owes no tap target. */
.gnx-live .gnx-rail{display:flex;position:absolute;left:0;right:0;bottom:20px;z-index:3;justify-content:center;gap:9px;pointer-events:none;}
.gnx-rail i{width:14px;height:2px;border-radius:1px;background:rgba(255,255,255,.16);transition:background .3s ease;}
.gnx-rail i.a{background:#f5f5f7;}
@media (max-width:760px){
html{scroll-snap-type:y proximity;}
.gnx-snap{scroll-snap-align:start;}
.gn-fig-sm{font-size:clamp(48px,14vw,64px);}
}
/* Landscape phones and short windows: keyed on height, a sideways phone is 844px
   WIDE. Same floor-release as JourneyMap. */
@media (max-height:640px){
.gnx-live .gnx-stage{min-height:0;}
}
@media (prefers-reduced-motion:reduce){
.gnx *{transition:none !important;}
}
`;

export default function GrowthNumbers() {
  const trackRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  /* live=false is the SSR truth: the flat twin. The effect upgrades to the pinned
     stage only when the OS has not asked for reduced motion. */
  const [live, setLive] = useState(false);
  const [idx, setIdx] = useState(0);
  const [mp, setMp] = useState(0);
  /* Counts start at 1 so the server prints the five final figure strings. */
  const [counts, setCounts] = useState<number[]>([1, 1, 1, 1, 1]);
  const fired = useRef<boolean[]>([false, false, false, false, false]);
  const countRafs = useRef<number[]>([0, 0, 0, 0, 0]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setLive(!mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    if (!live) return;
    const el = trackRef.current;
    if (!el) return;
    /* Rewind the figures so the first arrival counts up from zero. One-shot per
       figure; fired[] survives re-runs so nothing ever counts twice. */
    setCounts((prev) => prev.map((c, i) => (fired.current[i] ? c : 0)));
    const rafs = countRafs.current;
    const fire = (i: number) => {
      if (i > 4 || fired.current[i]) return;
      fired.current[i] = true;
      const t0 = performance.now();
      const D = 900;
      const step = (now: number) => {
        const t = Math.min((now - t0) / D, 1);
        const e = 1 - Math.pow(1 - t, 3);
        setCounts((prev) => {
          const n = prev.slice();
          n[i] = e;
          return n;
        });
        if (t < 1) rafs[i] = requestAnimationFrame(step);
      };
      rafs[i] = requestAnimationFrame(step);
    };
    /* DAMPED DRIVER, same shape and constant as JourneyMap. K = 0.12: ~8 frames
       to 63%, composes with ArrowScroll's own 0.2 ease instead of doubling into
       mush. The loop measures only while moving, then STOPS. */
    const K = 0.12;
    let raf = 0;
    let running = false;
    let cur = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      /* Measure the stage, not the window: iOS Safari's URL bar moves
         window.innerHeight mid-scroll. See JourneyMap. */
      const stage = stageRef.current;
      const vh = stage ? stage.offsetHeight : window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      return {
        p: total > 0 ? scrolled / total : 0,
        seen: r.top < vh * 0.6 && r.bottom > 0,
      };
    };
    const apply = (p: number, seen: boolean) => {
      const i = Math.min(STOPS - 1, Math.floor(p * STOPS));
      const q = Math.min(Math.max(p * STOPS - i, 0), 1);
      setIdx(i);
      setMp(q - 0.5);
      if (seen) fire(i);
    };
    const tick = () => {
      const m = measure();
      const d = m.p - cur;
      /* Under half a thousandth of the track is sub-pixel: settled, stop. */
      if (Math.abs(d) < 0.0005) {
        cur = m.p;
        apply(cur, m.seen);
        running = false;
        return;
      }
      cur += d * K;
      apply(cur, m.seen);
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    /* First paint is exact, never eased: a reload halfway down must not swoop. */
    const m0 = measure();
    cur = m0.p;
    apply(cur, m0.seen);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      rafs.forEach((r) => cancelAnimationFrame(r));
    };
  }, [live]);

  const stageStyle = { '--mp': String(mp) } as CSSProperties;

  return (
    <section ref={trackRef} className={'gnx' + (live ? ' gnx-live' : '')}>
      <style>{min(CSS)}</style>
      {/* SNAP MARKERS. Zero-size, aria-hidden, one at the centre of each stop's
          slice of the travel, so a phone flick settles ON a stop (parallax
          centred, --mp 0) instead of between two. Live mode only: the flat twin
          has nothing to land between. */}
      {live &&
        Array.from({ length: STOPS }, (_, i) => (
          <i
            key={i}
            aria-hidden="true"
            className="gnx-snap"
            style={{ top: 'calc(var(--gnx-t) * ' + ((i + 0.5) / STOPS).toFixed(4) + ')' }}
          />
        ))}
      <div ref={stageRef} className="gnx-stage" style={stageStyle} data-stop={idx}>
        {STATS.map((s, i) => (
          <div key={s.key} className={'gnx-stop' + (live && idx === i ? ' on' : '')}>
            <div className="gnx-body">
              <div className="gnx-fw">
                <div className="gn-eye">{s.eye}</div>
                <div className={'gn-fig' + (s.small ? ' gn-fig-sm' : '')}>{s.fig(counts[i])}</div>
              </div>
              <div className="gnx-cw">
                <p className="gn-line">{s.line}</p>
              </div>
            </div>
            <p className="gn-src">{s.src}</p>
          </div>
        ))}
        {/* THE HINGE between their numbers and the reader's: same scale treatment
            on the one word that changes hands. */}
        <div className={'gnx-stop' + (live && idx === 5 ? ' on' : '')}>
          <div className="gnx-body">
            <div className="gnx-cw">
              <p className="gn-pre">Those are the industry&rsquo;s numbers. Here are</p>
            </div>
            <div className="gnx-fw">
              <div className="gn-fig">yours.</div>
            </div>
          </div>
        </div>
        <div className="gnx-rail" aria-hidden="true">
          {Array.from({ length: STOPS }, (_, i) => (
            <i key={i} className={idx === i ? 'a' : ''} />
          ))}
        </div>
      </div>
    </section>
  );
}

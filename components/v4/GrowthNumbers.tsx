'use client';

import { useEffect, useRef, useState } from 'react';
import { min } from '@/lib/css';

/* THE NUMBERS: the third take on /growth, and the first with no conceit at all.
 *
 * Take one was five dense text sections: a memo inside a cinematic site. Take two drew
 * the five mechanisms as a revenue stream with five leaks; take three scrubbed a clock
 * through one workday in two lanes. Jacob rejected both films: annoying to drive, and
 * not unique to this page. His brief for this take was one question, how would Apple
 * handle it, and the answer this component ships is: no metaphor, no scroll-scrubbed
 * film, no diagram. THE CITED FIGURE IS THE VISUAL. One thought per full screen, the
 * number at keynote scale in the brand gradient, one line of owner-voice copy under it,
 * the source quiet at the bottom.
 *
 * MOTION LAW, deliberately simpler than every film on this site: the figure counts up
 * ONCE when its screen enters view. IntersectionObserver, one-shot, ~900ms ease-out
 * cubic, then the rAF chain ends and nothing runs again. No damped driver, no scroll
 * scrubbing, no loops after settle. prefers-reduced-motion gets the final figures
 * instantly, no observer, no animation.
 *
 * SSR RENDERS THE FINAL FIGURES (state starts at 1). The five figure strings are in
 * the prerendered HTML as real text, findable and readable with JavaScript off; the
 * effect rewinds to 0 only when it is about to animate. The count-up carries no
 * aria-live, on purpose: a screen reader gets the real text in DOM order and is never
 * shouted at by sixty intermediate values.
 *
 * THE NUMBERS ARE NOT OURS. Every figure is published external research, source named
 * on its own screen and linked in the Sources list at the bottom of the page. Same
 * claims as /whats-included, nothing new promised. The dropped stats stay dropped:
 * see the note in app/growth/page.tsx.
 *
 * MOBILE: these screens join the site's snap regime, scroll-snap-align:start inside
 * the max-width:760px block only, proximity never mandatory, so each thought lands
 * cleanly on a phone flick. Desktop scrolls free.
 */

type Stat = {
  key: string;
  eye: string;
  fig: (p: number) => string;
  small?: boolean;
  line: string;
  does: string;
  src: string;
};

/* The figure functions receive the EASED progress (0 to 1) and must return the exact
   final string at p = 1. The prerender checks grep for those strings. */
const STATS: Stat[] = [
  {
    key: 'missed',
    eye: 'Missed calls',
    fig: (p) => Math.round(62 * p) + '%',
    line: 'of calls to home-service businesses are never answered live.',
    does: 'StayBookt answers every call and text, 24 hours a day, in your voice. The caller never dials the next name on the list.',
    src: '411 Locals, 2024. A live person answered 37.8% of working-hours calls to real small businesses across 58 industries.',
  },
  {
    key: 'speed',
    eye: 'Speed to lead',
    fig: (p) => Math.round(7 * p) + 'x',
    line: 'more likely to win the lead when you answer within the hour. The average business takes 42 hours.',
    does: 'With StayBookt, the first voice they hear back is yours, even with both hands full.',
    src: 'Harvard Business Review, 2011. Audit of 2,241 companies: firms responding within an hour were nearly seven times as likely to qualify the lead.',
  },
  {
    key: 'quotes',
    eye: 'Unchased quotes',
    fig: (p) => Math.round(37 * p) + '%',
    line: 'of home-service estimates close on the first visit. The rest close in the follow-up, or never.',
    does: 'Every quote you send, chased until you have a yes or a no.',
    src: 'ServiceTitan, Follow-Ups 101, across home-service contractors on the platform.',
  },
  {
    key: 'reviews',
    eye: 'Reviews',
    fig: (p) => Math.round(88 * p) + '%',
    line: 'of consumers would use a business that replies to all of its reviews. For one that replies to none, 47%.',
    does: 'A review asked for after every finished job, and every one answered.',
    src: 'BrightLocal, Local Consumer Review Survey, 2024.',
  },
  {
    key: 'repeat',
    eye: 'Repeat customers',
    fig: (p) => Math.round(25 * p) + '-' + Math.round(95 * p) + '%',
    small: true,
    line: 'more profit from raising customer retention by just five percent.',
    does: 'Past customers brought back before they drift, for the work they are due.',
    src: 'Harvard Business Review, citing Bain & Company, 2014. A new customer costs five to twenty-five times as much as keeping one.',
  },
];

/* One-shot resolve. Returns a ref for the screen and its eased progress. Starts at 1
   so the server renders the final figure; rewinds to 0 only when it will animate. */
function useResolve() {
  const ref = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done) return;
          done = true;
          io.disconnect();
          const t0 = performance.now();
          const D = 900;
          const tick = (now: number) => {
            const t = Math.min((now - t0) / D, 1);
            setP(1 - Math.pow(1 - t, 3));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.35 }
    );
    setP(0);
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, p };
}

const CSS = `
.gn-sec{position:relative;min-height:100svh;background:#050506;color:#f5f5f7;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 clamp(20px,4vw,40px);}
.gn-body{margin:auto 0;padding-top:clamp(56px,8vh,90px);display:flex;flex-direction:column;align-items:center;}
.gn-eye{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#8a8f98;}
/* THE FIGURE. Keynote scale, gradient on the number itself, tabular so digits do not
   jitter sideways while they count. Giant display text, so the on-dark gradient's
   quietest stop clears the WCAG large-text bar with room. */
.gn-fig{margin-top:clamp(8px,1.6vh,18px);font-family:var(--font-display),'Inter Tight','Helvetica Neue',Arial,sans-serif;font-size:clamp(96px,22vw,260px);line-height:.95;font-weight:700;letter-spacing:-.05em;font-variant-numeric:tabular-nums;background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
/* The range figure is six characters wide; it gets its own smaller ramp so it never
   clips a phone. */
.gn-fig-sm{font-size:clamp(64px,15vw,180px);}
.gn-line{margin:clamp(14px,2.4vh,26px) auto 0;max-width:36ch;font-size:clamp(18px,2.2vw,25px);font-weight:600;letter-spacing:-.02em;line-height:1.4;color:#fff;}
.gn-does{margin:12px auto 0;max-width:46ch;font-size:clamp(14.5px,1.5vw,17px);line-height:1.55;color:#aeb6c4;}
/* The source: small and quiet at the bottom of its screen. #8a8f98 on #050506 is
   6.27:1. */
.gn-src{margin:0 auto;padding:26px 0 24px;max-width:60ch;font-size:12.5px;line-height:1.5;color:#8a8f98;}
.gn-pre{font-size:clamp(19px,2.4vw,30px);font-weight:600;letter-spacing:-.02em;line-height:1.35;color:#aeb6c4;max-width:30ch;}
/* MOBILE SNAP. Same regime as the rest of the site: proximity, never mandatory, and
   only inside the phone block. Desktop scrolls free. */
@media (max-width:760px){
html{scroll-snap-type:y proximity;}
.gn-sec{scroll-snap-align:start;}
.gn-fig-sm{font-size:clamp(48px,14vw,64px);}
}
`;

function StatScreen({ s }: { s: Stat }) {
  const { ref, p } = useResolve();
  return (
    <section className="gn-sec" ref={ref}>
      <div className="gn-body">
        <div className="gn-eye">{s.eye}</div>
        <div className={'gn-fig' + (s.small ? ' gn-fig-sm' : '')}>{s.fig(p)}</div>
        <p className="gn-line">{s.line}</p>
        <p className="gn-does">{s.does}</p>
      </div>
      <p className="gn-src">{s.src}</p>
    </section>
  );
}

/* The hinge between their numbers and the reader's: same scale treatment on the one
   word that changes hands. */
function TurnScreen() {
  const { ref, p } = useResolve();
  return (
    <section className="gn-sec" ref={ref}>
      <div
        className="gn-body"
        style={{ opacity: 0.15 + 0.85 * p, transform: 'translateY(' + Math.round(12 * (1 - p)) + 'px)' }}
      >
        <p className="gn-pre">Those are the industry&rsquo;s numbers. Here are</p>
        <div className="gn-fig">yours.</div>
      </div>
    </section>
  );
}

export default function GrowthNumbers() {
  return (
    <>
      <style>{min(CSS)}</style>
      {STATS.map((s) => (
        <StatScreen key={s.key} s={s} />
      ))}
      <TurnScreen />
    </>
  );
}

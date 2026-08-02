'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { min } from '@/lib/css';

/* THE DASHBOARD IN THE HEADER — round 6 (Jacob, Aug 2 2026), reacting to round 5's standalone
 * "From chaos to clarity" section (checklist card, five animated counters, its own headline).
 * His call: pull the mechanism UP into the hero itself, as a horizontal CRM-style dashboard
 * strip — "red before, then StayBookt comes in, then goes to green" — matching the horizontal
 * formatting the site already uses (the pricing page's `.facts` row, the homepage Journeys'
 * `.el .choices` row): a single strip, side by side, not a stacked list.
 *
 * This retires ChaosClarity.tsx as the live homepage component (the file stays in the repo,
 * same convention as HeroPayoff.tsx from earlier rounds — its <Counter> logic is the direct
 * ancestor of this one). The standalone headline/paragraph/card is gone; the hero's own H1 +
 * subhead already carry the thesis ("Less busywork. More time growing the business."), so this
 * bar is pure proof, not a second explanation of the same idea.
 *
 * MECHANISM: unlike ChaosClarity (which waited for an IntersectionObserver because it lived
 * below the fold), this sits inside the hero, visible at t=0 — so it just starts on mount, timed
 * to land AFTER the hero's own headline choreography (see app/page.tsx's sbHeroIn/sbEnjoyIn
 * keyframes) finishes, so it doesn't compete with "What You Love" for attention. Same
 * self-contained rAF <Counter> as ChaosClarity: no scroll position ever read, so none of
 * ProductScrub.tsx's abandoned-pin risk applies here either.
 *
 * ROUND 7, same day (Jacob): "revert the background to white so it matches the rest of the
 * site" — the dark glass bar (round 6's guess at "reads as part of the photo") is gone. White
 * card, real border, real shadow — the SAME elevated-white-card-over-a-scene treatment already
 * proven on this exact page (GetFoundScene/ReputationScene/AdminScene in HomeJourney.tsx: white
 * bg, `#ececf0` border, `0 44px 90px -44px rgba(0,0,0,.4)` shadow), not a new pattern. That's
 * what "matches our UI/UX more closely" means literally here: reuse the token, don't invent one.
 * Also per round 7: "the transformation piece happens way too fast." The count duration and the
 * red-to-green color transition are both slowed substantially (900ms counters -> 2.4s, .6s color
 * ease -> 1.3s, tighter 220ms stagger -> 300ms) so five numbers landing reads as a considered
 * reveal, not a flicker. */

type Stat = { id: string; label: string; from: number; to: number; prefix?: string; suffix?: string };

const STATS: Stat[] = [
  { id: 'call', label: 'Missed calls', from: 4, to: 0 },
  { id: 'inbox', label: 'Unread inbox', from: 83, to: 0 },
  { id: 'invoice', label: 'Overdue', from: 4280, to: 0, prefix: '$' },
  { id: 'review', label: 'Reviews this month', from: 0, to: 5 },
  { id: 'admin', label: 'Hours on admin', from: 6, to: 0, suffix: 'h' },
];

function Counter({ from, to, prefix = '', suffix = '', start, delay, duration = 900 }: {
  from: number; to: number; prefix?: string; suffix?: string; start: boolean; delay: number; duration?: number;
}) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (!start) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    let t0 = 0;
    const step = (now: number) => {
      if (!t0) t0 = now + delay;
      const t = Math.min(1, Math.max(0, (now - t0) / duration));
      const eased = 1 - (1 - t) ** 3;
      setVal(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start]);
  const shown = Math.round(val).toLocaleString();
  return <span className="hd-num">{prefix}{shown}{suffix}</span>;
}

export default function HeroDashboard() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    // Runs once on mount — the hero is visible immediately, no scroll gate needed. The delay
    // baked into each Counter (below) is what keeps this from competing with the headline.
    setOn(true);
  }, []);

  return (
    <div className="hd-wrap">
      <style>{min(CSS)}</style>
      <div className="hd-cap">While you were out</div>
      <div className={`hd-bar${on ? ' on' : ''}`}>
        {STATS.map((s, i) => (
          <div className="hd-seg" key={s.id} style={{ '--i': i } as CSSProperties}>
            <Counter from={s.from} to={s.to} prefix={s.prefix} suffix={s.suffix} start={on} delay={i * 300 + 2600} duration={2400} />
            <span className="hd-lbl">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const CSS = `
.hd-wrap{margin-top:clamp(30px,4.5vw,48px);opacity:0;transform:translateY(16px);filter:blur(6px);}
@media(prefers-reduced-motion:no-preference){
  .hd-wrap{animation:hdIn 1.1s cubic-bezier(.16,1,.3,1) 2.1s forwards;}
}
@media(prefers-reduced-motion:reduce){.hd-wrap{opacity:1;transform:none;filter:blur(0);}}
@keyframes hdIn{to{opacity:1;transform:none;filter:blur(0);}}

.hd-cap{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.62);
  text-align:center;margin-bottom:12px;text-shadow:0 2px 10px rgba(0,0,0,.3);}

/* WHITE, ELEVATED — round 7 (Jacob): reuses the exact card token already proven elsewhere on
   this page for "white surface floating over a photographic/dark scene" (GetFoundScene /
   ReputationScene / AdminScene in HomeJourney.tsx), rather than the round 6 dark-glass guess. */
.hd-bar{display:flex;max-width:760px;margin:0 auto;background:#fff;
  border:1px solid #ececf0;border-radius:20px;
  overflow-x:auto;overflow-y:hidden;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;
  box-shadow:0 44px 90px -44px rgba(0,0,0,.4);}
.hd-bar::-webkit-scrollbar{display:none;}
.hd-seg{flex:1 0 132px;scroll-snap-align:start;padding:20px 16px;text-align:center;
  border-left:1px solid #ececf0;}
.hd-seg:first-child{border-left:0;}
/* Color eases red -> green once its own Counter has landed. The class flips to .on almost
   immediately after mount (no scroll gate), so the delay lives entirely in transition-delay —
   same approach as ChaosClarity.tsx's .cc-num. Round 7: slowed from .6s/220ms-stagger to
   1.3s/300ms-stagger, tuned to land with the Counter's own new 2.4s duration (see the delay
   math on the <Counter> calls above — this transition-delay is deliberately kept in sync with
   it) so the color settles right as the number itself finishes, not ahead of or behind it. */
.hd-num{display:block;font-variant-numeric:tabular-nums;font-size:clamp(23px,2.6vw,29px);font-weight:700;
  letter-spacing:-.02em;color:#dc2626;}
.hd-bar.on .hd-seg .hd-num{color:#059669;transition:color 1.3s ease;transition-delay:calc(var(--i) * .3s + 5s);}
.hd-lbl{display:block;margin-top:5px;font-size:12px;color:#69707d;white-space:nowrap;}

@media(max-width:640px){
  .hd-bar{max-width:100%;}
  .hd-seg{flex:0 0 126px;}
}
`;

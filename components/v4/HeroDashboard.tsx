'use client';

import { useEffect, useState, type CSSProperties, type ReactNode, type KeyboardEvent } from 'react';
import { min } from '@/lib/css';

/* THE DASHBOARD — full history:
 *
 * Round 6 (Jacob): pull round 5's standalone "chaos to clarity" section up into the hero
 * itself, as a horizontal CRM-style strip — "red before, green after."
 * Round 7 (Jacob): white elevated card, slowed count/color transitions.
 * Round 8 (Jacob): "background still on the muskoka chairs... lack of icons... looks bush
 * league." Pulled out of the (then-photo) hero onto cream, icon badges added.
 * Round 9: the photo hero retired; homepage hero matches the locked /journeys format.
 * Round 10 (Jacob): "more cinematic, more engaging, more interactive" — segments became
 * real controls (hover/tap "how" line), icons spring in, hue-tinted hover lift.
 *
 * ROUND 11 (Jacob, Aug 2 2026): "spacing issues... still doesn't feel as cinematic,
 * dramatic, elevated as possible — referencing the homepage [vs the journeys page]."
 * The real gap was STRUCTURAL, not stylistic: /journeys composes its whole first
 * viewport as ONE scene (.jl-fold: 100svh flex column — pill, headline, sub, then a big
 * supporting graphic that fills the rest of the fold, entering at 2.15s as the final
 * beat of one choreography). The homepage was a headline, dead air, then a small strip
 * in a separate section that revealed whenever the observer happened to fire. So:
 *   - This component moved BACK inside the hero fold (app/page.tsx wraps hero copy +
 *     this in a .jl-fold-equivalent). Round 8's complaint was the PHOTO behind it, not
 *     the hero itself; the photo is gone.
 *   - Entrance timing is the Journeys graphic's, verbatim: wrapper rises in at 2.15s
 *     (after pill .05s / hl1 .2s / hl2 1s / sub 1.7s), so the fold reads as one film.
 *     Mount-timed again — it is above the fold at t=0, no scroll gate to wait for.
 *   - Scaled up to graphic presence (wider bar, bigger numbers, taller segments) and
 *     given an ambient brand-gradient glow behind it, same device as the hero
 *     headline's own hl2 glow and .hjc-num's price glow — it reads as the fold's
 *     centerpiece artifact, not a widget.
 * All of round 10's interactivity (hover/tap "how" line, keyboard, springs) survives. */

type Stat = { id: string; label: string; from: number; to: number; prefix?: string; suffix?: string; icon: string; how: string };

const STATS: Stat[] = [
  { id: 'call', label: 'Missed calls', from: 4, to: 0, icon: 'phone', how: 'Every call, answered, day or night.' },
  { id: 'inbox', label: 'Unread inbox', from: 83, to: 0, icon: 'mail', how: 'Nothing sits unread for long.' },
  { id: 'invoice', label: 'Overdue', from: 4280, to: 0, prefix: '$', icon: 'cash', how: 'We chase it until it is paid.' },
  { id: 'review', label: 'Reviews this month', from: 0, to: 5, icon: 'star', how: 'We ask after every job, every time.' },
  { id: 'admin', label: 'Hours on admin', from: 6, to: 0, suffix: 'h', icon: 'clock', how: 'Done while you are out, not by you.' },
];

/* Same drawing convention as RoleIcon in HomeJourney.tsx: 24x24 viewBox, currentColor
   stroke, round caps/joins — one icon language for the whole page. */
function StatIcon({ id }: { id: string }) {
  const c = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<string, ReactNode> = {
    phone: <path {...c} d="M15.5 13.5c-1.6 1.6-4 .8-5.6-.8-1.6-1.6-2.4-4-.8-5.6l1-1-2.2-2.6-1.2 1.1c-1.9 1.9-1 5.6 1.9 8.5s6.6 3.8 8.5 1.9l1.1-1.2-2.6-2.2-1.1 1z" />,
    mail: <><rect {...c} x="3" y="5.5" width="18" height="13" rx="2.2" /><path {...c} d="M4 7l8 6 8-6" /></>,
    cash: <><circle {...c} cx="12" cy="12" r="8.2" /><path {...c} d="M12 7.3v9.4M14.8 9.6c0-1.3-1.2-2.3-2.8-2.3s-2.8 1-2.8 2.3 1.2 1.9 2.8 2.4 2.8 1 2.8 2.3-1.2 2.3-2.8 2.3-2.8-1-2.8-2.3" /></>,
    star: <path {...c} d="M12 3.3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.2l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3.3z" />,
    clock: <><circle {...c} cx="12" cy="12" r="8.2" /><path {...c} d="M12 7.5V12l3.2 1.9" /></>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">{paths[id]}</svg>;
}

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
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => {
    // Mount-timed again (round 11): this lives inside the hero fold, visible at t=0.
    // The choreography lives in the delays below — wrapper at 2.15s, then icons, then
    // counters — mirroring how /journeys' map enters after its headline settles.
    setOn(true);
  }, []);

  const toggle = (i: number) => setOpenIdx((cur) => (cur === i ? null : i));
  const onKey = (i: number) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i); }
  };

  return (
    <div className={`hd-fold${on ? ' on' : ''}`}>
      <style>{min(CSS)}</style>
      <div className="hd-cap">While you were out</div>
      <div className="hd-glow" aria-hidden="true" />
      <div className="hd-bar">
        {STATS.map((s, i) => (
          <div
            className={`hd-seg${openIdx === i ? ' open' : ''}`}
            key={s.id}
            style={{ '--i': i } as CSSProperties}
            role="button"
            tabIndex={0}
            aria-expanded={openIdx === i}
            onClick={() => toggle(i)}
            onKeyDown={onKey(i)}
          >
            <span className="hd-ic"><StatIcon id={s.icon} /></span>
            <Counter from={s.from} to={s.to} prefix={s.prefix} suffix={s.suffix} start={on} delay={i * 260 + 2900} duration={2400} />
            <span className="hd-lbl">{s.label}</span>
            <span className="hd-how">{s.how}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const CSS = `
/* ONE FOLD (round 11): this block is the hero fold's supporting graphic, exactly like
   .jl-mapwrap on /journeys — margin-top instead of section padding, entrance at the
   SAME 2.15s beat the Journeys map uses, after the headline choreography settles. The
   old .hd-sec section wrapper (own background + section padding) is gone; the fold in
   app/page.tsx owns the layout now. */
.hd-fold{position:relative;margin:clamp(30px,5vh,54px) auto 0;width:100%;max-width:920px;
  padding:0 clamp(14px,3vw,32px);
  opacity:0;transform:translateY(26px);}
@media(prefers-reduced-motion:no-preference){
  .hd-fold{animation:hdIn 1s cubic-bezier(.16,1,.3,1) 2.15s forwards;}
}
@media(prefers-reduced-motion:reduce){.hd-fold{opacity:1;transform:none;}}
@keyframes hdIn{to{opacity:1;transform:none;}}

.hd-cap{font-size:12.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;
  text-align:center;margin-bottom:16px;}

/* AMBIENT GLOW (round 11): the same brand-gradient bloom device the hero's own "What
   You Love" line and the price reveal already use (.hl2::before / .hjc-num::before),
   sized for the bar — makes the artifact read as lit, not pasted on the cream. */
.hd-glow{position:absolute;inset:-30% -6% -34%;z-index:0;pointer-events:none;
  background:radial-gradient(52% 58% at 50% 58%,rgba(16,185,129,.16),rgba(79,70,229,.1) 52%,transparent 74%);
  filter:blur(48px);opacity:0;transform:scale(.8);}
@media(prefers-reduced-motion:no-preference){
  .hd-fold.on .hd-glow{animation:hdGlow 1.6s ease 2.4s forwards;}
}
@keyframes hdGlow{to{opacity:1;transform:scale(1);}}

.hd-bar{position:relative;z-index:1;display:flex;background:#fff;
  border:1px solid #ececf0;border-radius:22px;
  overflow-x:auto;overflow-y:hidden;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;
  box-shadow:0 44px 90px -44px rgba(0,0,0,.4);}
.hd-bar::-webkit-scrollbar{display:none;}

/* INTERACTIVE (round 10, kept): each segment is a real control. Hover/open lifts it and
   tints with its own brand hue (--hc, one source of truth with the icon badge). */
.hd-seg{flex:1 0 148px;scroll-snap-align:start;padding:26px 18px 22px;text-align:center;
  border-left:1px solid #ececf0;cursor:pointer;outline:none;
  transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s ease,background .35s ease;}
.hd-seg:first-child{border-left:0;}
.hd-seg:hover,.hd-seg.open{transform:translateY(-3px);background:#fbfbfa;
  box-shadow:0 14px 28px -18px rgba(6,12,20,.28);}
.hd-seg:focus-visible{box-shadow:0 0 0 2px var(--hc,#4f46e5);}

/* Icon badges: same tokens as HomeJourney.tsx's .hjc-job .hjc-ic cycle. */
.hd-ic{display:flex;align-items:center;justify-content:center;width:38px;height:38px;
  border-radius:12px;margin:0 auto 12px;border:1px solid transparent;
  opacity:0;transform:scale(.4);}
.hd-seg:nth-child(1){--hc:#0ea5e9;}
.hd-seg:nth-child(2){--hc:#10b981;}
.hd-seg:nth-child(3){--hc:#4f46e5;}
.hd-seg:nth-child(4){--hc:#7c3aed;}
.hd-seg:nth-child(5){--hc:#0ea5e9;}
.hd-seg:nth-child(1) .hd-ic{color:#38bdf8;background:rgba(14,165,233,.1);border-color:rgba(14,165,233,.22);}
.hd-seg:nth-child(2) .hd-ic{color:#34d399;background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.22);}
.hd-seg:nth-child(3) .hd-ic{color:#818cf8;background:rgba(79,70,229,.12);border-color:rgba(79,70,229,.24);}
.hd-seg:nth-child(4) .hd-ic{color:#a78bfa;background:rgba(124,58,237,.1);border-color:rgba(124,58,237,.22);}
.hd-seg:nth-child(5) .hd-ic{color:#38bdf8;background:rgba(14,165,233,.1);border-color:rgba(14,165,233,.22);}

/* CINEMATIC (round 10, retimed round 11): badge springs in (same overshoot curve as
   .dpin/jlPop on /journeys) staggered just ahead of its own Counter — after the 2.15s
   wrapper entrance, so the order is: fold rises, icons pop one by one, numbers count. */
.hd-fold.on .hd-seg .hd-ic{animation:hdPop .55s cubic-bezier(.34,1.56,.64,1) forwards;
  animation-delay:calc(var(--i) * .26s + 2.55s);}
@keyframes hdPop{0%{opacity:0;transform:scale(.4);}65%{opacity:1;transform:scale(1.14);}100%{opacity:1;transform:scale(1);}}

/* Color eases red -> green once its own Counter has landed. transition-delay kept in
   sync by hand with the Counter math above (i*260+2900 start, 2400ms run -> lands at
   i*260+5300ms). */
.hd-num{display:block;font-variant-numeric:tabular-nums;font-size:clamp(24px,2.8vw,33px);font-weight:700;
  letter-spacing:-.025em;color:#dc2626;}
.hd-fold.on .hd-bar .hd-seg .hd-num{color:#059669;transition:color 1.3s ease;transition-delay:calc(var(--i) * .26s + 5.3s);}
.hd-lbl{display:block;margin-top:6px;font-size:12.5px;color:#69707d;white-space:nowrap;}

/* The "how" micro-copy: collapsed by default, same slide-open grammar as .sb-clook
   .cli .cl-desc in app/page.tsx. */
.hd-how{display:block;max-height:0;overflow:hidden;opacity:0;margin-top:0;
  font-size:12px;line-height:1.4;color:#52565e;
  transition:max-height .4s ease,opacity .4s ease,margin-top .4s ease;}
.hd-seg:hover .hd-how,.hd-seg.open .hd-how{max-height:52px;opacity:1;margin-top:8px;}

@media(prefers-reduced-motion:reduce){
  .hd-seg{transition:none;}
  .hd-seg .hd-ic{animation:none;opacity:1;transform:none;}
  .hd-glow{animation:none;opacity:0;}
}
@media(max-width:640px){
  .hd-seg{flex:0 0 132px;padding:22px 14px 18px;}
}
`;

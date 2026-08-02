'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type KeyboardEvent } from 'react';
import { min } from '@/lib/css';

/* THE DASHBOARD — full history:
 *
 * Round 6 (Jacob): pull round 5's standalone "chaos to clarity" section up into the hero
 * itself, as a horizontal CRM-style strip — "red before, green after."
 * Round 7 (Jacob): the dark-glass guess didn't match the rest of the site. White elevated
 * card (same token as GetFoundScene/ReputationScene/AdminScene in HomeJourney.tsx), and
 * the count/color transition slowed down substantially.
 * Round 8 (Jacob): "background still on the muskoka chairs... lack of icons... looks bush
 * league." Pulled out of the hero into its own cream section (see app/page.tsx), on-view
 * IntersectionObserver reveal instead of a mount timer, per-stat icon badges added.
 * Round 9: the photo hero itself retired — irrelevant to this file, noted for the record.
 *
 * ROUND 10 (Jacob, Aug 2 2026): "what can you do if you were Apple to elevate this
 * experience, make it more cinematic, more engaging, more interactive?" Three real moves,
 * not decoration:
 *   1. INTERACTIVE: each segment is now a real control (button semantics, keyboard
 *      operable, aria-expanded). Hover on desktop or tap on mobile reveals a one-line
 *      "how" underneath the label — the same click-to-expand grammar the site already
 *      uses on .sb-clook .cli (PAGE_CSS in app/page.tsx: a collapsed description that
 *      slides open), not a new interaction pattern.
 *   2. CINEMATIC: the icon badges spring into place (overshoot easing, the same
 *      cubic-bezier(.34,1.56,.64,1) spring already used for .dpin/.jlPop on /journeys)
 *      staggered just ahead of their own counter, so the reveal reads as one choreographed
 *      beat — icon arrives, then its number counts down — rather than five numbers
 *      appearing simultaneously.
 *   3. ENGAGING: hovering/opening a segment lifts it and tints its border with its own
 *      brand hue (read off the same --i-cycled palette the icon badge already uses), so
 *      the strip responds to attention instead of sitting inert once the counters land. */

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
  return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">{paths[id]}</svg>;
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }), { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggle = (i: number) => setOpenIdx((cur) => (cur === i ? null : i));
  const onKey = (i: number) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i); }
  };

  return (
    <section className={`hd-sec${on ? ' on' : ''}`} ref={ref}>
      <style>{min(CSS)}</style>
      <div className="wrap">
        <div className="hd-cap">While you were out</div>
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
              <Counter from={s.from} to={s.to} prefix={s.prefix} suffix={s.suffix} start={on} delay={i * 260 + 700} duration={2400} />
              <span className="hd-lbl">{s.label}</span>
              <span className="hd-how">{s.how}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CSS = `
/* SPACING FIX, round 10 (Jacob: "spacing looks off"). Top padding here was stacking on
   top of the hero's own padding-bottom (app/page.tsx .v4 header.scene), leaving a ~150px
   dead gap between the subhead and this section's own cap once the photo hero (which
   needed that breathing room to not crowd the scrim) was retired in round 9. Tightened
   here; the hero's padding-bottom was tightened to match in app/page.tsx. */
.hd-sec{background:var(--v4-cream,#f6f6f3);padding:clamp(20px,3vw,32px) 0 clamp(28px,4vw,44px);}

.hd-cap{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;
  text-align:center;margin-bottom:18px;
  opacity:0;transform:translateY(10px);transition:opacity .7s ease,transform .7s ease;}
.hd-sec.on .hd-cap{opacity:1;transform:none;}

.hd-bar{display:flex;max-width:760px;margin:0 auto;background:#fff;
  border:1px solid #ececf0;border-radius:20px;
  overflow-x:auto;overflow-y:hidden;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;
  box-shadow:0 44px 90px -44px rgba(0,0,0,.4);
  opacity:0;transform:translateY(18px);transition:opacity .8s .1s ease,transform .8s .1s ease;}
.hd-sec.on .hd-bar{opacity:1;transform:none;}
.hd-bar::-webkit-scrollbar{display:none;}

/* INTERACTIVE, round 10: each segment is a real control now (role=button). Hover/open
   lifts it and tints the border with its own brand hue, read off the same --hc custom
   prop the icon badge below already sets per segment — one source of truth for "this
   segment's color," not two. */
.hd-seg{flex:1 0 132px;scroll-snap-align:start;padding:22px 16px 20px;text-align:center;
  border-left:1px solid #ececf0;cursor:pointer;outline:none;
  transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s ease,background .35s ease;}
.hd-seg:first-child{border-left:0;}
.hd-seg:hover,.hd-seg.open{transform:translateY(-3px);background:#fbfbfa;
  box-shadow:0 14px 28px -18px rgba(6,12,20,.28);}
.hd-seg:focus-visible{box-shadow:0 0 0 2px var(--hc,#4f46e5);}

/* Icon badges: same tokens as HomeJourney.tsx's .hjc-job:nth-child(n) .hjc-ic cycle, so
   this strip and the price reveal read as the same design system. Each rule also sets
   --hc, the segment's own hue, reused by the hover/focus states above. */
.hd-ic{display:flex;align-items:center;justify-content:center;width:34px;height:34px;
  border-radius:11px;margin:0 auto 10px;border:1px solid transparent;
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

/* CINEMATIC, round 10: the badge springs in (overshoot easing, same curve as .dpin/jlPop
   on /journeys) staggered just ahead of its own Counter (delay = i*260+700 below), so the
   badge visibly arrives, THEN its number starts counting — one choreographed beat per
   segment instead of five numbers landing at once. */
.hd-sec.on .hd-seg .hd-ic{animation:hdPop .55s cubic-bezier(.34,1.56,.64,1) forwards;
  animation-delay:calc(var(--i) * .26s + .35s);}
@keyframes hdPop{0%{opacity:0;transform:scale(.4);}65%{opacity:1;transform:scale(1.14);}100%{opacity:1;transform:scale(1);}}

/* Color eases red -> green once its own Counter has landed. transition-delay is kept in
   sync by hand with the Counter's own delay+duration math above (i*260+700 start,
   2400ms run -> lands at i*260+3100ms). */
.hd-num{display:block;font-variant-numeric:tabular-nums;font-size:clamp(21px,2.4vw,27px);font-weight:700;
  letter-spacing:-.02em;color:#dc2626;}
.hd-sec.on .hd-bar .hd-seg .hd-num{color:#059669;transition:color 1.3s ease;transition-delay:calc(var(--i) * .26s + 3.1s);}
.hd-lbl{display:block;margin-top:5px;font-size:12px;color:#69707d;white-space:nowrap;}

/* The "how" micro-copy: collapsed by default, same slide-open grammar as .sb-clook .cli
   .cl-desc in app/page.tsx (max-height 0 -> a real value, opacity, margin-top). */
.hd-how{display:block;max-height:0;overflow:hidden;opacity:0;margin-top:0;
  font-size:11.5px;line-height:1.4;color:#52565e;
  transition:max-height .4s ease,opacity .4s ease,margin-top .4s ease;}
.hd-seg:hover .hd-how,.hd-seg.open .hd-how{max-height:52px;opacity:1;margin-top:7px;}

@media(prefers-reduced-motion:reduce){
  .hd-cap,.hd-bar,.hd-seg{transition:none;}
  .hd-seg .hd-ic{animation:none;opacity:1;transform:none;}
}
@media(max-width:640px){
  .hd-bar{max-width:100%;}
  .hd-seg{flex:0 0 126px;}
}
`;

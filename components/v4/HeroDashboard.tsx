'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { min } from '@/lib/css';

/* THE HERO DEVICE — TODAY / TOMORROW (round 12, Richard's homepage feedback doc,
 * Aug 2 2026). His ask, verbatim: "What about a today / tomorrow graphic that shows less
 * paperwork, nights/weekends back, doing meaningful work, customer building — transaction
 * to deep relationships, growing your business, less stress, sleeping better."
 *
 * Jacob's call: EVOLVE the round 6-11 "While you were out" dashboard into this rather
 * than bolt a second graphic into the fold. What survives from that build: the one-fold
 * choreography (wrapper rises at the same 2.15s beat as the Journeys map, after the
 * headline settles), the white elevated bar, the per-segment icon badges cycling the
 * brand hues, the ambient gradient glow, and the red-to-green state grammar. What
 * changes: the five CRM counters become Richard's seven outcomes, and the device is now
 * a real two-state machine — a Today / Tomorrow segmented control that auto-advances
 * from Today (red) to Tomorrow (green) once, then belongs to the visitor: click either
 * state and every segment tweens/crossfades to it, staggered left to right.
 *
 * Prior rounds' history (chaos-to-clarity section -> hero bar -> own section -> back
 * into the fold) lives in git and in the staybookt memory files; ChaosClarity.tsx and
 * HeroPayoff.tsx remain in the repo unused, same convention as always. */

type Seg = {
  id: string; icon: string; label: string;
  today: string; tomorrow: string;
  /* numeric segments tween; word segments crossfade */
  num?: { from: number; to: number; suffix?: string };
};

/* Richard's seven outcomes, in his order. */
const SEGS: Seg[] = [
  { id: 'paper', icon: 'doc', label: 'Paperwork each week', today: '6h', tomorrow: '0h', num: { from: 6, to: 0, suffix: 'h' } },
  { id: 'nights', icon: 'cal', label: 'Nights & weekends', today: 'Working', tomorrow: 'Yours' },
  /* "Meaningful" -> "What you love" (live-site review, Aug 2 2026): "Meaningful" floated
     without a noun; this ties the tomorrow state straight back to the headline sitting two
     inches above it — you built the business to do What You Love, and this is the segment
     where you get it back. Richard's outcome ("doing meaningful work") still carried, in
     the site's own words. */
  { id: 'work', icon: 'heart', label: 'Your work', today: 'Busywork', tomorrow: 'What you love' },
  { id: 'cust', icon: 'people', label: 'Customers', today: 'Transactions', tomorrow: 'Relationships' },
  { id: 'grow', icon: 'chart', label: 'Your business', today: 'Stalled', tomorrow: 'Growing' },
  { id: 'stress', icon: 'wave', label: 'Stress', today: 'High', tomorrow: 'Low' },
  { id: 'sleep', icon: 'moon', label: 'Sleep', today: 'Broken', tomorrow: 'Sound' },
];

/* Same drawing convention as RoleIcon in HomeJourney.tsx: 24x24 viewBox, currentColor
   stroke, round caps/joins — one icon language for the whole page. */
function SegIcon({ id }: { id: string }) {
  const c = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<string, ReactNode> = {
    doc: <><path {...c} d="M13.5 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9.5z" /><path {...c} d="M13.5 4v5.5H19M9 13.5h6M9 16.5h4" /></>,
    cal: <><rect {...c} x="4" y="5" width="16" height="15" rx="2.2" /><path {...c} d="M4 9.5h16M8.5 3.5v3M15.5 3.5v3" /></>,
    heart: <path {...c} d="M12 20.5s-7.2-4.6-7.2-10.2a4.1 4.1 0 0 1 7.2-2 4.1 4.1 0 0 1 7.2 2C19.2 15.9 12 20.5 12 20.5z" />,
    people: <><path {...c} d="M16 19v-1.8a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 17.2V19" /><circle {...c} cx="9.5" cy="7.6" r="3.1" /><path {...c} d="M21 19v-1.8a3.6 3.6 0 0 0-2.7-3.5M15.2 4.7a3.1 3.1 0 0 1 0 5.9" /></>,
    chart: <><path {...c} d="M4 19.5h16" /><path {...c} d="M6.5 15.5v-3M11 15.5V9M15.5 15.5V6.5M20 15.5v-11" opacity=".9" /></>,
    wave: <path {...c} d="M3 12c1.8 0 1.8-3.5 3.6-3.5S8.4 15.5 10.2 15.5 12 8.5 13.8 8.5 15.6 12 17.4 12 19.2 12 21 12" />,
    moon: <path {...c} d="M20 14.5A8.3 8.3 0 0 1 9.5 4 8.3 8.3 0 1 0 20 14.5z" />,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">{paths[id]}</svg>;
}

/* Numeric tween toward whichever value the current mode demands. Unlike the old one-shot
   Counter, this re-runs on every mode change — that is what makes the control feel like a
   real machine and not a played-once video. */
function NumVal({ from, to, suffix = '', mode, delay }: { from: number; to: number; suffix?: string; mode: 'today' | 'tomorrow'; delay: number }) {
  const target = mode === 'tomorrow' ? to : from;
  const [val, setVal] = useState(from);
  const valRef = useRef(from);
  valRef.current = val;
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
      return;
    }
    const startVal = valRef.current;
    if (startVal === target) return;
    let raf = 0;
    let t0 = 0;
    const D = 1100;
    const step = (now: number) => {
      if (!t0) t0 = now + delay;
      const t = Math.min(1, Math.max(0, (now - t0) / D));
      const eased = 1 - (1 - t) ** 3;
      setVal(startVal + (target - startVal) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    /* BACKSTOP (Aug 2 2026): Chrome throttles rAF to zero for occluded/backgrounded
       windows, which froze this tween mid-flight during automated review. A visible
       visitor never hits it, but the guarantee costs one timer: whatever happens to the
       animation frames, the value LANDS. */
    const backstop = setTimeout(() => setVal(target), delay + D + 200);
    return () => { cancelAnimationFrame(raf); clearTimeout(backstop); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return <>{Math.round(val).toLocaleString()}{suffix}</>;
}

export default function HeroDashboard() {
  const [on, setOn] = useState(false);
  const [mode, setMode] = useState<'today' | 'tomorrow'>('today');
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchedRef = useRef(false);

  useEffect(() => {
    setOn(true);
    // Auto-advance ONCE: the fold rises at 2.15s; hold Today long enough to register,
    // then play the transformation. A visitor click cancels the autopilot for good.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    autoRef.current = setTimeout(() => {
      if (!touchedRef.current) setMode('tomorrow');
    }, reduce ? 600 : 3600);
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  }, []);

  const pick = (m: 'today' | 'tomorrow') => {
    touchedRef.current = true;
    if (autoRef.current) clearTimeout(autoRef.current);
    setMode(m);
  };

  return (
    <div className={`hd-fold${on ? ' on' : ''} ${mode === 'tomorrow' ? 'tm' : 'td'}`}>
      <style>{min(CSS)}</style>
      <div className="hd-switch" role="tablist" aria-label="Today or tomorrow">
        <span className="hd-thumb" aria-hidden="true" />
        <button type="button" role="tab" aria-selected={mode === 'today'} className={mode === 'today' ? 'on' : ''} onClick={() => pick('today')}>Today</button>
        <button type="button" role="tab" aria-selected={mode === 'tomorrow'} className={mode === 'tomorrow' ? 'on' : ''} onClick={() => pick('tomorrow')}>Tomorrow</button>
      </div>
      <div className="hd-glow" aria-hidden="true" />
      <div className="hd-bar">
        {SEGS.map((s, i) => (
          <div className="hd-seg" key={s.id} style={{ '--i': i } as CSSProperties}>
            <span className="hd-ic"><SegIcon id={s.icon} /></span>
            {s.num ? (
              <span className="hd-val hd-nm"><NumVal from={s.num.from} to={s.num.to} suffix={s.num.suffix} mode={mode} delay={i * 140} /></span>
            ) : (
              <span className="hd-val hd-wd">
                <span className="w-td">{s.today}</span>
                <span className="w-tm">{s.tomorrow}</span>
              </span>
            )}
            <span className="hd-lbl">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const CSS = `
/* ONE FOLD: this block is the hero fold's supporting graphic, same 2.15s entrance beat
   as the Journeys map. Widened to hold Richard's seven outcomes side by side. */
.hd-fold{position:relative;margin:clamp(26px,4.5vh,48px) auto 0;width:100%;max-width:1080px;
  padding:0 clamp(14px,3vw,32px);
  opacity:0;transform:translateY(26px);}
@media(prefers-reduced-motion:no-preference){
  .hd-fold{animation:hdIn 1s cubic-bezier(.16,1,.3,1) 2.15s forwards;}
}
@media(prefers-reduced-motion:reduce){.hd-fold{opacity:1;transform:none;}}
@keyframes hdIn{to{opacity:1;transform:none;}}

/* THE CONTROL. A real segmented control, not a caption: Today | Tomorrow with a sliding
   thumb. It auto-advances once, then belongs to the visitor. */
.hd-switch{position:relative;z-index:2;display:flex;width:fit-content;margin:0 auto 18px;
  background:#fff;border:1px solid #ececf0;border-radius:999px;padding:4px;
  box-shadow:0 10px 26px -18px rgba(6,12,20,.35);}
.hd-switch button{position:relative;z-index:1;appearance:none;background:none;border:0;cursor:pointer;
  font-family:inherit;font-size:13.5px;font-weight:700;letter-spacing:.02em;
  padding:8px 22px;border-radius:999px;color:#69707d;transition:color .35s ease;}
.hd-switch button.on{color:#fff;}
.hd-thumb{position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:999px;
  background:#dc2626;transition:transform .55s cubic-bezier(.16,1,.3,1),background .55s ease;}
.hd-fold.tm .hd-thumb{transform:translateX(100%);background:#059669;}

/* AMBIENT GLOW: same brand-gradient bloom device as the headline's own hl2 glow. */
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

.hd-seg{flex:1 0 128px;scroll-snap-align:start;padding:24px 12px 20px;text-align:center;
  border-left:1px solid #ececf0;}
.hd-seg:first-child{border-left:0;}

/* Icon badges: same tokens as HomeJourney.tsx's .hjc-job .hjc-ic cycle, extended two
   more steps of the same four-hue rotation for seven segments. */
.hd-ic{display:flex;align-items:center;justify-content:center;width:38px;height:38px;
  border-radius:12px;margin:0 auto 12px;border:1px solid transparent;
  opacity:0;transform:scale(.4);}
.hd-seg:nth-child(1) .hd-ic{color:#38bdf8;background:rgba(14,165,233,.1);border-color:rgba(14,165,233,.22);}
.hd-seg:nth-child(2) .hd-ic{color:#34d399;background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.22);}
.hd-seg:nth-child(3) .hd-ic{color:#818cf8;background:rgba(79,70,229,.12);border-color:rgba(79,70,229,.24);}
.hd-seg:nth-child(4) .hd-ic{color:#a78bfa;background:rgba(124,58,237,.1);border-color:rgba(124,58,237,.22);}
.hd-seg:nth-child(5) .hd-ic{color:#38bdf8;background:rgba(14,165,233,.1);border-color:rgba(14,165,233,.22);}
.hd-seg:nth-child(6) .hd-ic{color:#34d399;background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.22);}
.hd-seg:nth-child(7) .hd-ic{color:#818cf8;background:rgba(79,70,229,.12);border-color:rgba(79,70,229,.24);}

/* Badges spring in after the fold's 2.15s entrance — same overshoot curve as /journeys'
   destination pin. */
.hd-fold.on .hd-seg .hd-ic{animation:hdPop .55s cubic-bezier(.34,1.56,.64,1) forwards;
  animation-delay:calc(var(--i) * .18s + 2.5s);}
@keyframes hdPop{0%{opacity:0;transform:scale(.4);}65%{opacity:1;transform:scale(1.14);}100%{opacity:1;transform:scale(1);}}

/* Values: red in Today, green in Tomorrow, staggered left to right so the flip reads as
   a wave, not a repaint. Numeric segments tween in JS with the same per-index delay. */
.hd-val{display:flex;align-items:center;justify-content:center;height:34px;position:relative;
  font-weight:700;letter-spacing:-.02em;color:#dc2626;
  transition:color .9s ease;transition-delay:calc(var(--i) * .14s);}
.hd-fold.tm .hd-val{color:#059669;}
.hd-nm{font-variant-numeric:tabular-nums;font-size:clamp(22px,2.4vw,30px);}
.hd-wd{font-size:clamp(15px,1.55vw,18.5px);}
.hd-wd .w-td,.hd-wd .w-tm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  white-space:nowrap;transition:opacity .55s ease,transform .55s ease;transition-delay:calc(var(--i) * .14s);}
.hd-wd .w-td{opacity:1;transform:none;}
.hd-wd .w-tm{opacity:0;transform:translateY(8px);}
.hd-fold.tm .hd-wd .w-td{opacity:0;transform:translateY(-8px);}
.hd-fold.tm .hd-wd .w-tm{opacity:1;transform:none;}
.hd-lbl{display:block;margin-top:6px;font-size:12px;color:#69707d;white-space:nowrap;}

@media(prefers-reduced-motion:reduce){
  .hd-seg .hd-ic{animation:none;opacity:1;transform:none;}
  .hd-glow{animation:none;opacity:0;}
  .hd-val,.hd-wd .w-td,.hd-wd .w-tm,.hd-thumb{transition:none;}
}
@media(max-width:720px){
  .hd-seg{flex:0 0 122px;padding:20px 10px 16px;}
}
`;

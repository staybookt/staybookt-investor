'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { min } from '@/lib/css';

/* THE HERO DEVICE, TAKE 3 — "THE STAGE" (Jacob, Aug 2 2026: "not super sharp high end
 * elevated apple-y... we can make this better and wayyy more cinematic, but how?").
 *
 * The diagnosis of take 2 (the seven-segment bar): it was a data table. Seven equal
 * columns, hairline dividers, small colored words — honest, but tables are not cinema,
 * and no amount of springs or glows fixes a layout whose grammar is "spreadsheet."
 * Apple's grammar is the opposite: ONE subject at a time, at scale, with light and
 * material, in sequence. So the bar became a stage:
 *
 *   - One outcome plays at a time, at hero scale: the phase eyebrow (TODAY, red dot)
 *     over a giant value ("6h"), one mechanism line under it — then the light changes,
 *     the eyebrow crossfades to TOMORROW, and the value morphs to the answer ("0h") in
 *     the brand gradient. Tomorrow is not flat data-green anymore; it is the same
 *     gradient the headline's "What You Love" wears, which is the point: tomorrow IS
 *     the thing the headline promised.
 *   - The seven outcomes auto-play as a loop (Richard's full today/tomorrow picture,
 *     told as a film instead of a chart). A rail of the seven icon chips sits under the
 *     stage: it is the overview at a glance, the progress indicator, and the remote —
 *     click any chip to jump to that beat.
 *   - Material: glass (blur + translucent white) over the ambient brand glow, deep soft
 *     shadow. Pauses on hover, the way considered things do.
 *   - prefers-reduced-motion: no timers, no morphs — the stage sits on its beat in the
 *     tomorrow state and the rail still jumps between beats instantly.
 *
 * Richard's seven outcomes (his homepage feedback doc) are unchanged in substance and
 * order; each gained a one-line mechanism so every beat says HOW, not just what.
 * Take 2's history (and take 1's, and the five-counter CRM bar before that) lives in
 * git and the staybookt memory files. */

type Beat = {
  id: string; icon: string; label: string;
  today: string; tomorrow: string;
  /* numeric beats tween the same span; word beats crossfade two spans */
  num?: { from: number; to: number; suffix?: string };
  line: string;
};

const BEATS: Beat[] = [
  { id: 'paper', icon: 'doc', label: 'Paperwork each week', today: '6h', tomorrow: '0h', num: { from: 6, to: 0, suffix: 'h' }, line: 'Quotes followed up, invoices chased, the numbers sent to your phone.' },
  { id: 'nights', icon: 'cal', label: 'Nights & weekends', today: 'Working', tomorrow: 'Yours', line: 'The phone is answered at 2 a.m. You are asleep.' },
  { id: 'work', icon: 'heart', label: 'Your work', today: 'Busywork', tomorrow: 'What you love', line: 'The admin comes off your plate. The craft goes back on it.' },
  { id: 'cust', icon: 'people', label: 'Customers', today: 'Transactions', tomorrow: 'Relationships', line: 'Reviews asked after every job, replies in your voice, past customers brought back.' },
  { id: 'grow', icon: 'chart', label: 'Your business', today: 'Stalled', tomorrow: 'Growing', line: 'Time to work on the business, not just in it.' },
  { id: 'stress', icon: 'wave', label: 'Stress', today: 'High', tomorrow: 'Low', line: 'Nothing slips. Nothing sits unread.' },
  { id: 'sleep', icon: 'moon', label: 'Sleep', today: 'Broken', tomorrow: 'Sound', line: 'The business runs while you rest.' },
];

/* Same drawing convention as RoleIcon in HomeJourney.tsx: 24x24 viewBox, currentColor
   stroke, round caps/joins — one icon language for the whole page. */
function BeatIcon({ id }: { id: string }) {
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

/* Numeric value for the paperwork beat: tweens between today/tomorrow on phase change,
   with a timer backstop so the landing value is guaranteed even if rAF is throttled. */
function NumVal({ from, to, suffix = '', phase }: { from: number; to: number; suffix?: string; phase: 'today' | 'tomorrow' }) {
  const target = phase === 'tomorrow' ? to : from;
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
    const D = 750;
    const step = (now: number) => {
      if (!t0) t0 = now;
      const t = Math.min(1, (now - t0) / D);
      const eased = 1 - (1 - t) ** 3;
      setVal(startVal + (target - startVal) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const backstop = setTimeout(() => setVal(target), D + 200);
    return () => { cancelAnimationFrame(raf); clearTimeout(backstop); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return <>{Math.round(val)}{suffix}</>;
}

const HOLD_TODAY = 1500;
const HOLD_TOMORROW = 2400;

export default function HeroDashboard() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [beat, setBeat] = useState(0);
  const [phase, setPhase] = useState<'today' | 'tomorrow'>('today');
  const [paused, setPaused] = useState(false);
  const reduceRef = useRef(false);

  useEffect(() => {
    setOn(true);
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceRef.current) { setPhase('tomorrow'); setReady(false); return; }
    // Hold the first TODAY until the fold's 2.15s entrance has finished, so the film's
    // first morph is seen, not missed.
    const t = setTimeout(() => setReady(true), 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready || paused || reduceRef.current) return;
    const t = setTimeout(() => {
      if (phase === 'today') {
        setPhase('tomorrow');
      } else {
        setBeat((b) => (b + 1) % BEATS.length);
        setPhase('today');
      }
    }, phase === 'today' ? HOLD_TODAY : HOLD_TOMORROW);
    return () => clearTimeout(t);
  }, [ready, paused, phase, beat]);

  const jump = (i: number) => {
    setBeat(i);
    setPhase(reduceRef.current ? 'tomorrow' : 'today');
    setReady(true);
  };

  const b = BEATS[beat];

  return (
    <div className={`hd-fold${on ? ' on' : ''}`}>
      <style>{min(CSS)}</style>
      <div className="hd-glow" aria-hidden="true" />
      <div
        className={`hd-stage ${phase === 'tomorrow' ? 'tm' : 'td'}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-live="polite"
      >
        <div className="st-phase" aria-hidden="true">
          <span className="ph-td"><i />Today</span>
          <span className="ph-tm"><i />Tomorrow</span>
        </div>
        <div className="st-lbl">{b.label}</div>
        <div className="st-val" key={b.id}>
          {b.num ? (
            <span className="v one"><NumVal from={b.num.from} to={b.num.to} suffix={b.num.suffix} phase={phase} /></span>
          ) : (
            <>
              <span className="v v-td">{b.today}</span>
              <span className="v v-tm">{b.tomorrow}</span>
            </>
          )}
        </div>
        <p className="st-line" key={`l-${b.id}`}>{b.line}</p>
      </div>
      <div className="hd-rail" role="tablist" aria-label="The seven things that change">
        {BEATS.map((s, i) => (
          <button
            type="button"
            key={s.id}
            role="tab"
            aria-selected={i === beat}
            aria-label={s.label}
            className={`rl${i === beat ? ' on' : ''}`}
            style={{ '--i': i } as CSSProperties}
            onClick={() => jump(i)}
          >
            <BeatIcon id={s.icon} />
          </button>
        ))}
      </div>
    </div>
  );
}

const CSS = `
/* ONE FOLD: the stage is the hero fold's supporting graphic, same 2.15s entrance beat as
   the Journeys map. */
.hd-fold{position:relative;margin:clamp(24px,4vh,44px) auto 0;width:100%;max-width:880px;
  padding:0 clamp(14px,3vw,32px);
  opacity:0;transform:translateY(26px);}
@media(prefers-reduced-motion:no-preference){
  .hd-fold{animation:hdIn 1s cubic-bezier(.16,1,.3,1) 2.15s forwards;}
}
@media(prefers-reduced-motion:reduce){.hd-fold{opacity:1;transform:none;}}
@keyframes hdIn{to{opacity:1;transform:none;}}

/* AMBIENT GLOW: the same brand-gradient bloom the headline's "What You Love" wears.
   Brightens a step when the stage is in its tomorrow phase — the light changes with
   the story. */
.hd-glow{position:absolute;inset:-26% -4% -30%;z-index:0;pointer-events:none;
  background:radial-gradient(52% 58% at 50% 55%,rgba(16,185,129,.15),rgba(79,70,229,.1) 52%,transparent 74%);
  filter:blur(48px);opacity:0;transform:scale(.8);transition:opacity 1.2s ease;}
@media(prefers-reduced-motion:no-preference){
  .hd-fold.on .hd-glow{animation:hdGlow 1.6s ease 2.4s forwards;}
}
@keyframes hdGlow{to{opacity:1;transform:scale(1);}}

/* THE STAGE. Glass, not paper: translucent white over the glow, real blur, hairline
   light edge, one deep soft shadow. */
.hd-stage{position:relative;z-index:1;text-align:center;
  min-height:clamp(230px,30vh,300px);display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:clamp(24px,3vw,38px) clamp(18px,4vw,48px);
  background:rgba(255,255,255,.66);
  backdrop-filter:blur(22px) saturate(1.4);-webkit-backdrop-filter:blur(22px) saturate(1.4);
  border:1px solid rgba(255,255,255,.85);border-radius:30px;
  box-shadow:0 1px 2px rgba(6,12,20,.05),0 60px 120px -50px rgba(6,12,20,.5);}

/* Phase eyebrow: TODAY (rust dot) crossfading to TOMORROW (emerald dot). */
.st-phase{position:relative;height:18px;width:100%;font-size:11.5px;font-weight:700;
  letter-spacing:.22em;text-transform:uppercase;}
.st-phase span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:8px;
  transition:opacity .5s ease;}
.st-phase i{width:6px;height:6px;border-radius:50%;}
.st-phase .ph-td{color:#b45333;}
.st-phase .ph-td i{background:#dc2626;box-shadow:0 0 10px 1px rgba(220,38,38,.55);}
.st-phase .ph-tm{color:#047857;}
.st-phase .ph-tm i{background:#10b981;box-shadow:0 0 10px 1px rgba(16,185,129,.6);}
.hd-stage.td .ph-tm{opacity:0;}
.hd-stage.tm .ph-td{opacity:0;}

.st-lbl{margin-top:14px;font-size:clamp(14px,1.6vw,17px);font-weight:600;color:#52565e;letter-spacing:-.01em;}

/* THE VALUE. Hero scale — this is the shot. Today is a muted rust, deliberately dimmer
   than the room; tomorrow takes the SAME brand gradient as the headline's payoff line,
   because tomorrow is the thing the headline promised. */
.st-val{position:relative;margin-top:6px;height:clamp(64px,10vw,120px);width:100%;
  font-weight:700;letter-spacing:-.035em;line-height:1;
  font-size:clamp(46px,7.2vw,96px);font-variant-numeric:tabular-nums;}
.st-val .v{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;white-space:nowrap;}
.st-val .v-td{color:#c2410c;opacity:1;filter:blur(0);transform:none;
  transition:opacity .55s ease,filter .55s ease,transform .55s ease;}
.st-val .v-tm{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;
  opacity:0;filter:blur(10px);transform:translateY(14px) scale(.96);
  transition:opacity .65s ease,filter .65s ease,transform .65s cubic-bezier(.16,1,.3,1);}
.hd-stage.tm .v-td{opacity:0;filter:blur(10px);transform:translateY(-14px) scale(1.04);}
.hd-stage.tm .v-tm{opacity:1;filter:blur(0);transform:none;}
/* the numeric beat is one span that tweens; it just changes wardrobe with the phase */
.st-val .one{color:#c2410c;transition:color .5s ease;}
.hd-stage.tm .one{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* the mechanism line: how it happens, one sentence, quiet. */
.st-line{margin:14px auto 0;max-width:52ch;font-size:clamp(13.5px,1.5vw,15.5px);line-height:1.55;color:#69707d;
  animation:stLine .6s ease;}
@keyframes stLine{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}

/* THE RAIL. The seven outcomes at a glance, the progress indicator, and the remote.
   Same icon hue rotation as the price reveal's job icons. */
.hd-rail{position:relative;z-index:1;display:flex;justify-content:center;gap:clamp(8px,1.2vw,14px);
  margin-top:18px;}
.hd-rail .rl{appearance:none;cursor:pointer;font-family:inherit;
  width:clamp(40px,4.4vw,48px);height:clamp(40px,4.4vw,48px);border-radius:14px;
  display:flex;align-items:center;justify-content:center;
  background:rgba(255,255,255,.6);border:1px solid rgba(6,12,20,.08);color:#8a8f98;
  transition:transform .3s cubic-bezier(.16,1,.3,1),background .3s ease,color .3s ease,border-color .3s ease,box-shadow .3s ease;}
.hd-rail .rl:hover{transform:translateY(-2px);color:#52565e;}
.hd-rail .rl.on{background:#fff;transform:translateY(-2px);
  box-shadow:0 12px 26px -14px rgba(6,12,20,.35);}
.hd-rail .rl:nth-child(1).on{color:#0284c7;border-color:rgba(14,165,233,.45);}
.hd-rail .rl:nth-child(2).on{color:#059669;border-color:rgba(16,185,129,.5);}
.hd-rail .rl:nth-child(3).on{color:#4f46e5;border-color:rgba(79,70,229,.45);}
.hd-rail .rl:nth-child(4).on{color:#7c3aed;border-color:rgba(124,58,237,.45);}
.hd-rail .rl:nth-child(5).on{color:#0284c7;border-color:rgba(14,165,233,.45);}
.hd-rail .rl:nth-child(6).on{color:#059669;border-color:rgba(16,185,129,.5);}
.hd-rail .rl:nth-child(7).on{color:#4f46e5;border-color:rgba(79,70,229,.45);}
.hd-rail .rl:focus-visible{outline:2px solid #4f46e5;outline-offset:2px;}

@media(prefers-reduced-motion:reduce){
  .st-phase span,.st-val .v,.st-val .one,.hd-rail .rl{transition:none;}
  .st-line{animation:none;}
}
@media(max-width:640px){
  .hd-stage{min-height:210px;border-radius:24px;}
  .st-val{height:64px;font-size:clamp(38px,11vw,54px);}
}
`;

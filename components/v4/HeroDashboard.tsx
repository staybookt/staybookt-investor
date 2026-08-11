'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { min } from '@/lib/css';

/* THE HERO DEVICE, TAKE 4 — "THE KEYNOTE" (Jacob, Aug 2 2026, on take 3's white glass
 * stage: "just isn't making me excited, it's confusing, and looks incongruent with the
 * design of the rest of the site... more like an Apple keynote").
 *
 * Both notes were right, and they were the same note. A keynote happens in a dark room:
 * this site's OWN cinematic grammar is the dark slab — the price reveal (#050506 + a
 * radial brand glow + the gradient $199), the journey scenes, the finale takeovers. A
 * white glass card was a new, foreign object. So the stage is now a SCREEN: the price
 * slab's exact material (same near-black, same internal glow device, same gradient for
 * the payoff type), floating over the cream fold with the brand bloom behind it. The
 * homepage now opens and closes on sibling dark artifacts — a system, not a widget.
 *
 * And the confusion fix: take 3 showed one state at a time, so a lone giant "High" read
 * as a riddle. Keynote comparison grammar instead — the trajectory IS the shot:
 *   TODAY: the rust value alone, big.
 *   TOMORROW: the rust value shrinks into a small struck-through "was" chip as the
 *   gradient answer blooms beneath it. Both states in frame; the change is the star.
 * A hairline progress line runs along the stage floor so it reads as a playing film,
 * not a stuck widget. Pauses on hover. The 7-chip rail lives on the screen's bottom
 * edge: overview, progress, and remote.
 *
 * Take 3's rAF number tween is deleted — the was/answer comparison carries the numeric
 * beat too, which also removes the occluded-window rAF fragility entirely.
 * Richard's seven outcomes (his homepage feedback doc): unchanged in substance/order. */

type Beat = {
  id: string; icon: string; label: string;
  today: string; tomorrow: string;
  line: string;
};

const BEATS: Beat[] = [
  /* "Hard to say paperwork is zero... say 10 hours... position the after as < 5 hours to
     show a more than 50% reduction" (Richard, website review doc, Aug 3 2026). */
  { id: 'paper', icon: 'doc', label: 'Paperwork each week', today: '10 hours', tomorrow: 'Under 5', line: 'Quotes followed up, invoices chased, the numbers sent to your phone.' },
  { id: 'nights', icon: 'cal', label: 'Nights & weekends', today: 'Working', tomorrow: 'Yours', line: 'The phone is answered at 2 a.m. You are asleep.' },
  { id: 'work', icon: 'heart', label: 'Your work', today: 'Busywork', tomorrow: 'What you love', line: 'The admin comes off your plate. The craft goes back on it.' },
  /* "Customers => Customer Relationships; Transactional => Deep" (Richard, same doc). */
  { id: 'cust', icon: 'people', label: 'Customer relationships', today: 'Transactional', tomorrow: 'Deep', line: 'Reviews asked after every job, replies in your voice, past customers brought back.' },
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

const HOLD_TODAY = 1600;
const HOLD_TOMORROW = 2700;

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
    // Hold the first TODAY until the fold's 2.15s entrance finishes, so the film's
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
        className={`hd-stage ${phase === 'tomorrow' ? 'tm' : 'td'}${paused ? ' hold' : ''}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-live="polite"
      >
        <div className="st-light" aria-hidden="true" />
        <div className="st-phase" aria-hidden="true">
          <span className="ph-td"><i />Today</span>
          <span className="ph-tm"><i />Tomorrow</span>
        </div>
        <div className="st-lbl">{b.label}</div>
        <div className="st-scene" key={b.id}>
          <div className="st-was">{b.today}</div>
          <div className="st-big">
            <span className="v v-td">{b.today}</span>
            <span className="v v-tm">{b.tomorrow}</span>
          </div>
        </div>
        <p className="st-line" key={`l-${b.id}`}>{b.line}</p>
        {!reduceRef.current && <div className="st-prog" key={`p-${b.id}-${ready ? 'r' : 'w'}`} aria-hidden="true" />}
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
    </div>
  );
}

const CSS = `
/* ONE FOLD: the screen is the hero fold's supporting graphic, same 2.15s entrance beat
   as the Journeys map. */
/* container-type: the stage now lives in a half-width hero column (Option 1, Aug 10),
   so type must size against the CONTAINER, not the viewport — 7vw of a 1440 screen was
   92px inside a 556px box, and nowrap + overflow:hidden cut statements off (Richard). */
.hd-fold{container-type:inline-size;position:relative;margin:clamp(22px,3.6vh,40px) auto 0;width:100%;max-width:880px;
  padding:0 clamp(14px,3vw,32px);
  opacity:0;transform:translateY(26px);}
@media(prefers-reduced-motion:no-preference){
  .hd-fold{animation:hdIn 1s cubic-bezier(.16,1,.3,1) 2.15s forwards;}
}
@media(prefers-reduced-motion:reduce){.hd-fold{opacity:1;transform:none;}}
@keyframes hdIn{to{opacity:1;transform:none;}}

/* The brand bloom BEHIND the screen — a dark object floating over cream with light
   leaking out from behind it, the classic product-shot read. */
.hd-glow{position:absolute;inset:-14% -3% -18%;z-index:0;pointer-events:none;
  background:radial-gradient(55% 62% at 50% 52%,rgba(16,185,129,.22),rgba(79,70,229,.15) 55%,transparent 76%);
  filter:blur(52px);opacity:0;transform:scale(.85);}
@media(prefers-reduced-motion:no-preference){
  .hd-fold.on .hd-glow{animation:hdGlow 1.6s ease 2.4s forwards;}
}
@keyframes hdGlow{to{opacity:1;transform:scale(1);}}

/* THE SCREEN. The price slab's exact material: near-black, rounded, its own internal
   radial glow. This is where the site already says "the payoff happens here." */
.hd-stage{position:relative;z-index:1;text-align:center;overflow:hidden;
  display:flex;flex-direction:column;align-items:center;
  padding:clamp(22px,2.8vw,34px) clamp(18px,4vw,48px) 0;
  background:#050506;border-radius:30px;color:#fff;
  border:1px solid rgba(255,255,255,.08);
  box-shadow:0 2px 4px rgba(6,12,20,.2),0 70px 130px -55px rgba(6,12,20,.75);}

/* the stage lighting: a soft interior glow that lives red-ish in TODAY and blooms to
   the brand emerald/indigo in TOMORROW — the light changes with the story. */
.st-light{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(62% 60% at 50% 38%,rgba(220,38,38,.13),transparent 68%);
  opacity:1;transition:opacity .9s ease;}
.hd-stage::after{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(62% 62% at 50% 42%,rgba(16,185,129,.17),rgba(79,70,229,.12) 55%,transparent 75%);
  opacity:0;transition:opacity .9s ease;}
.hd-stage.tm .st-light{opacity:0;}
.hd-stage.tm::after{opacity:1;}

/* Phase eyebrow: TODAY (red dot) crossfading to TOMORROW (emerald dot). */
.st-phase{position:relative;z-index:1;height:18px;width:100%;font-size:11.5px;font-weight:700;
  letter-spacing:.22em;text-transform:uppercase;}
.st-phase span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:8px;
  transition:opacity .5s ease;}
.st-phase i{width:6px;height:6px;border-radius:50%;}
.st-phase .ph-td{color:#f87171;}
.st-phase .ph-td i{background:#ef4444;box-shadow:0 0 12px 2px rgba(239,68,68,.6);}
.st-phase .ph-tm{color:#34d399;}
.st-phase .ph-tm i{background:#10b981;box-shadow:0 0 12px 2px rgba(16,185,129,.7);}
.hd-stage.td .ph-tm{opacity:0;}
.hd-stage.tm .ph-td{opacity:0;}

.st-lbl{position:relative;z-index:1;margin-top:12px;font-size:clamp(14px,1.6vw,17px);font-weight:600;
  color:#c7ccd6;letter-spacing:-.01em;}

/* THE SCENE — keynote comparison grammar. TODAY: the rust value alone, big. TOMORROW:
   it shrinks into a small struck-through "was" as the gradient answer blooms beneath.
   Both states in frame; the change is the star. */
.st-scene{position:relative;z-index:1;margin-top:4px;width:100%;
  height:clamp(96px,15vw,150px);}
/* Short viewports (125%-scaled laptops): condense the device so the fold below it still
   fits — pairs with the .po1 short-viewport rules on the homepage. */
@media(max-height:660px){
  .hd-stage{padding-top:16px;}
  .st-scene{height:clamp(84px,12vw,112px);}
  .st-line{margin-top:6px;}
}
.st-was{position:absolute;left:0;right:0;top:0;height:26px;display:flex;align-items:center;justify-content:center;
  font-size:clamp(14px,1.8vw,18px);font-weight:600;color:#7d8494;text-decoration:line-through;
  text-decoration-color:rgba(239,68,68,.55);text-decoration-thickness:2px;
  opacity:0;transform:translateY(14px);transition:opacity .5s .15s ease,transform .5s .15s ease;}
.hd-stage.tm .st-was{opacity:1;transform:none;}
.st-big{position:absolute;left:0;right:0;top:26px;bottom:0;
  font-weight:700;letter-spacing:-.035em;line-height:1;
  font-size:clamp(38px,12cqw,84px);font-variant-numeric:tabular-nums;}
.st-big .v{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;white-space:nowrap;}
.st-big .v-td{color:#f87171;opacity:1;filter:blur(0);transform:none;
  transition:opacity .5s ease,filter .5s ease,transform .55s cubic-bezier(.4,0,.6,1);}
.st-big .v-tm{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;
  opacity:0;filter:blur(14px);transform:translateY(20px) scale(.92);
  transition:opacity .7s .1s ease,filter .7s .1s ease,transform .7s .1s cubic-bezier(.16,1,.3,1);}
.hd-stage.tm .v-td{opacity:0;filter:blur(6px);transform:translateY(-34px) scale(.4);}
.hd-stage.tm .v-tm{opacity:1;filter:blur(0);transform:none;}

/* the mechanism line: how it happens, one sentence, quiet. */
.st-line{position:relative;z-index:1;margin:10px auto 0;max-width:54ch;
  font-size:clamp(13.5px,1.5vw,15.5px);line-height:1.55;color:#8b93a5;
  /* two lines are RESERVED whether the beat's line needs them or not — the frame used to
     grow when the subtext wrapped, a visible size "glitch" between beats (Richard, 8-10). */
  min-height:calc(2 * 1.55em);
  animation:stLine .6s ease;}
@keyframes stLine{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}

/* the film's progress: a hairline of light running the floor of each beat. Communicates
   "this is playing" without a single extra word. Pauses with the film on hover. */
.st-prog{position:relative;z-index:1;margin-top:clamp(14px,1.8vw,20px);height:2px;width:min(320px,60%);
  border-radius:2px;background:rgba(255,255,255,.1);overflow:hidden;}
.st-prog::before{content:'';position:absolute;inset:0;transform-origin:left;transform:scaleX(0);
  background:linear-gradient(90deg,#ef4444 0%,#f59e0b 32%,#10b981 55%,#4f46e5 100%);
  animation:stProg 4.3s linear forwards;}
.hd-stage.hold .st-prog::before{animation-play-state:paused;}
@keyframes stProg{to{transform:scaleX(1);}}

/* THE RAIL on the screen's bottom edge: overview at a glance, progress, and the remote. */
.hd-rail{position:relative;z-index:1;display:flex;justify-content:center;gap:clamp(6px,1vw,12px);
  padding:clamp(14px,1.8vw,20px) 0 clamp(18px,2.2vw,24px);}
.hd-rail .rl{appearance:none;cursor:pointer;font-family:inherit;
  width:clamp(38px,4.2vw,46px);height:clamp(38px,4.2vw,46px);border-radius:13px;
  display:flex;align-items:center;justify-content:center;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:#6a7180;
  transition:transform .3s cubic-bezier(.16,1,.3,1),background .3s ease,color .3s ease,border-color .3s ease;}
.hd-rail .rl:hover{transform:translateY(-2px);color:#aeb6c4;}
.hd-rail .rl.on{background:rgba(255,255,255,.12);transform:translateY(-2px);}
.hd-rail .rl:nth-child(1).on{color:#38bdf8;border-color:rgba(56,189,248,.55);}
.hd-rail .rl:nth-child(2).on{color:#34d399;border-color:rgba(52,211,153,.55);}
.hd-rail .rl:nth-child(3).on{color:#818cf8;border-color:rgba(129,140,248,.55);}
.hd-rail .rl:nth-child(4).on{color:#a78bfa;border-color:rgba(167,139,250,.55);}
.hd-rail .rl:nth-child(5).on{color:#38bdf8;border-color:rgba(56,189,248,.55);}
.hd-rail .rl:nth-child(6).on{color:#34d399;border-color:rgba(52,211,153,.55);}
.hd-rail .rl:nth-child(7).on{color:#818cf8;border-color:rgba(129,140,248,.55);}
.hd-rail .rl:focus-visible{outline:2px solid #818cf8;outline-offset:2px;}

@media(prefers-reduced-motion:reduce){
  .st-phase span,.st-big .v,.st-was,.hd-rail .rl,.st-light,.hd-stage::after{transition:none;}
  .st-line{animation:none;}
}
@media(max-width:640px){
  .hd-stage{border-radius:24px;}
  .st-scene{height:96px;}
  .st-big{font-size:clamp(34px,10vw,48px);}
}
`;

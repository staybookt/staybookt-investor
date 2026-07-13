'use client';

import { useEffect, useRef, useState } from 'react';
import { START_LINK } from '@/lib/site';

/* Set pieces for /how-it-works.
 *
 * 1. AccountBrain  — the intake becoming an answer. Replaces a static checklist.
 * 2. Arrival       — the pinnacle of the journey. Full-bleed, cinematic, and the
 *                    only place on the page that asks for anything.
 *
 * IntersectionObserver play-once. No scroll-scrubbing: it was removed from this
 * codebase for desktop lag. */

const px = (id: string, w = 2000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const ARRIVE_IMG = px('30660768');

function useOnView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('on');
            obs.disconnect();
          }
        }),
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ============================================================
 * 1. THE ACCOUNT BRAIN
 * Four facts get learned, one at a time. They feed a node.
 * Then the node answers a customer, in the owner's words,
 * using those exact four facts. Show it, do not claim it.
 * ========================================================== */
const FACTS = [
  { k: 'What you charge', v: '$180 for the visit' },
  { k: 'Jobs you take', v: 'No panel swaps' },
  { k: 'Where you go', v: 'Newmarket to Barrie' },
  { k: 'How you talk', v: 'Straight. No fluff.' },
];

export function AccountBrain() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.disconnect();
          if (reduce) {
            setStep(FACTS.length + 1);
            return;
          }
          for (let i = 0; i <= FACTS.length + 1; i++) {
            timers.push(setTimeout(() => setStep(i), 380 + i * 620));
          }
        }),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
      timers = [];
    };
  }, []);

  const learned = Math.min(Math.max(step, 0), FACTS.length);
  const answering = step >= FACTS.length;
  const answered = step > FACTS.length;

  return (
    <div className={`ab${answered ? ' done' : ''}`} ref={ref}>
      <style>{AB_CSS}</style>

      {/* the intake */}
      <div className="ab-col ab-facts">
        <div className="ab-lbl">What we learn</div>
        {FACTS.map((f, i) => (
          <div className={`abf${i < learned ? ' on' : ''}${i === learned && !answering ? ' now' : ''}`} key={f.k}>
            <span className="abf-tick" aria-hidden>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
              </svg>
            </span>
            <span className="abf-k">{f.k}</span>
            <span className="abf-v">{f.v}</span>
          </div>
        ))}
      </div>

      {/* the brain */}
      <div className="ab-col ab-core">
        <div className={`ab-node${answering ? ' hot' : ''}`} aria-hidden>
          <span className="r r1" />
          <span className="r r2" />
          <span className="r r3" />
          <span className="ab-inner">
            <b>{learned}</b>
            <i>/ 4</i>
          </span>
        </div>
        <div className="ab-core-t">Your playbook</div>
        <div className="ab-core-s">Everything we do runs on this.</div>
      </div>

      {/* the proof */}
      <div className="ab-col ab-phone">
        <div className="ab-lbl">Two weeks later, 9:14 PM</div>
        <div className="abp">
          <div className={`abb them${step >= 0 ? ' in' : ''}`}>
            Hey, how much to look at a dead outlet in my kitchen?
          </div>
          {answering && !answered && (
            <div className="abb typing">
              <i /><i /><i />
            </div>
          )}
          {answered && (
            <div className="abb us in">
              It&apos;s $180 for the visit, and you&apos;re well inside our area. I can have someone
              there Thursday morning. Want me to lock it in?
            </div>
          )}
          {answered && <div className="abb sys">Booked &middot; Thursday, 8:30 AM</div>}
        </div>
        <div className={`ab-cap${answered ? ' on' : ''}`}>
          Your price. Your area. Your words. <b>You were on a roof.</b>
        </div>
      </div>
    </div>
  );
}

const AB_CSS = `
.ab{display:grid;grid-template-columns:minmax(0,1fr) 168px minmax(0,1fr);gap:clamp(20px,3vw,40px);align-items:center;margin-top:clamp(40px,5vw,64px);}
@media(max-width:940px){.ab{grid-template-columns:1fr;gap:32px;}.ab-core{order:-1;}}
.ab-lbl{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#9298a1;margin-bottom:14px;}

/* facts */
.abf{position:relative;display:grid;grid-template-columns:22px minmax(0,1fr) auto;gap:12px;align-items:center;padding:15px 14px;border-radius:14px;border:1px solid #e9e9e5;background:#fff;margin-bottom:10px;opacity:.42;transform:translateY(6px);transition:opacity .5s ease,transform .5s ease,border-color .5s ease,box-shadow .5s ease;overflow:hidden;}
.abf.on{opacity:1;transform:none;border-color:rgba(16,185,129,.4);box-shadow:0 14px 30px -22px rgba(16,185,129,.55);}
.abf.now::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(16,185,129,.16),transparent);animation:abscan 1s ease-out;pointer-events:none;}
@keyframes abscan{from{transform:translateX(-100%);}to{transform:translateX(100%);}}
.abf-tick{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#eceef1;color:#fff;transition:background .45s ease;}
.abf.on .abf-tick{background:#10b981;}
.abf-k{font-size:15px;font-weight:600;color:var(--v4-ink);}
.abf-v{font-size:13.5px;font-weight:600;color:#059669;background:rgba(16,185,129,.1);border-radius:999px;padding:4px 11px;white-space:nowrap;opacity:0;transition:opacity .5s ease .15s;}
.abf.on .abf-v{opacity:1;}
@media(max-width:520px){.abf{grid-template-columns:22px minmax(0,1fr);}.abf-v{grid-column:2;justify-self:start;margin-top:6px;}}

/* core */
.ab-core{text-align:center;}
.ab-node{position:relative;width:104px;height:104px;margin:0 auto;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#06b6d4,#10b981 55%,#4f46e5);box-shadow:0 22px 44px -20px rgba(16,185,129,.65);transition:transform .6s cubic-bezier(.16,1,.3,1);}
.ab-node.hot{transform:scale(1.06);}
.ab-node .r{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(16,185,129,.45);animation:abring 2.8s ease-out infinite;}
.ab-node .r2{animation-delay:.9s;}
.ab-node .r3{animation-delay:1.8s;}
@keyframes abring{0%{transform:scale(1);opacity:.7;}100%{transform:scale(1.75);opacity:0;}}
.ab-inner{position:relative;color:#fff;font-weight:700;letter-spacing:-.02em;display:flex;align-items:baseline;gap:2px;}
.ab-inner b{font-size:30px;}
.ab-inner i{font-style:normal;font-size:14px;opacity:.75;}
.ab-core-t{margin-top:18px;font-size:17px;font-weight:600;letter-spacing:-.02em;color:var(--v4-ink);}
.ab-core-s{margin-top:5px;font-size:13.5px;line-height:1.45;color:#9298a1;}

/* phone */
.abp{background:#f2f2f5;border:1px solid #e9e9e5;border-radius:20px;padding:16px 14px;display:flex;flex-direction:column;gap:9px;min-height:238px;}
.abb{max-width:88%;padding:10px 14px;border-radius:18px;font-size:14px;line-height:1.4;opacity:0;transform:translateY(8px);}
.abb.in{animation:abpop .45s cubic-bezier(.16,1,.3,1) forwards;}
@keyframes abpop{to{opacity:1;transform:none;}}
.abb.them{align-self:flex-start;background:#e5e5ea;color:#111;border-bottom-left-radius:5px;}
.abb.us{align-self:flex-end;background:#10b981;color:#fff;border-bottom-right-radius:5px;}
.abb.sys{align-self:center;background:transparent;color:#059669;font-size:12px;font-weight:600;opacity:1;transform:none;padding:2px;}
.abb.typing{align-self:flex-end;background:#e5e5ea;display:flex;gap:4px;padding:12px 14px;opacity:1;transform:none;}
.abb.typing i{width:6px;height:6px;border-radius:50%;background:#9298a1;animation:abtype 1.1s ease-in-out infinite;}
.abb.typing i:nth-child(2){animation-delay:.15s;}
.abb.typing i:nth-child(3){animation-delay:.3s;}
@keyframes abtype{0%,60%,100%{opacity:.3;transform:translateY(0);}30%{opacity:1;transform:translateY(-3px);}}
.ab-cap{margin-top:14px;font-size:14.5px;line-height:1.5;color:#7a818b;opacity:0;transition:opacity .6s ease;}
.ab-cap b{font-weight:600;color:var(--v4-ink);}
.ab-cap.on{opacity:1;}
@media(prefers-reduced-motion:reduce){.ab *{animation:none !important;transition:none !important;}.abb{opacity:1;transform:none;}}
`;

/* ============================================================
 * 2. THE ARRIVAL
 * The map ends. This is what it was all for, and the only ask.
 * ========================================================== */
export function Arrival() {
  const ref = useOnView<HTMLElement>(0.25);
  return (
    <section className="arr" ref={ref}>
      <style>{ARR_CSS}</style>
      <img src={ARRIVE_IMG} alt="" loading="lazy" decoding="async" />
      <div className="arr-ov" />
      <div className="arr-in">
        <span className="arr-dot" aria-hidden />
        <div className="arr-k">The end of the map</div>
        <h2>
          Go enjoy the life
          <br />
          you built it for.
        </h2>
        <p>
          The phone gets answered. The jobs get booked. The reviews stack up. And the business no
          longer needs you standing in the middle of it.
        </p>
        <div className="arr-f">That was always the point.</div>
        <div className="arr-cta">
          <a href={START_LINK}>Start the journey</a>
          <span className="arr-note">Thirty minutes with a founder. Free, and yours to keep.</span>
        </div>
      </div>
    </section>
  );
}

const ARR_CSS = `
.arr{position:relative;min-height:min(94vh,860px);display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;background:#050506;}
.arr>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.12);transition:transform 3.4s cubic-bezier(.16,1,.3,1),opacity 1.6s ease;opacity:0;}
.arr.on>img{transform:scale(1);opacity:1;}
.arr-ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,6,.72) 0%,rgba(5,5,6,.34) 34%,rgba(5,5,6,.5) 66%,rgba(5,5,6,.9) 100%);}
.arr-in{position:relative;z-index:1;width:100%;max-width:1080px;padding:clamp(90px,12vw,150px) clamp(20px,4vw,40px);}
.arr-dot{display:block;width:22px;height:22px;margin:0 auto;border-radius:50%;background:#f59e0b;box-shadow:0 0 0 0 rgba(245,158,11,.55);opacity:0;transform:scale(.5);transition:opacity .7s ease .2s,transform .7s cubic-bezier(.16,1,.3,1) .2s;}
.arr.on .arr-dot{opacity:1;transform:none;animation:arrpulse 2.6s ease-out .9s infinite;}
@keyframes arrpulse{0%{box-shadow:0 0 0 0 rgba(245,158,11,.5);}100%{box-shadow:0 0 0 26px rgba(245,158,11,0);}}
.arr-k{margin-top:22px;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#e2c496;opacity:0;transform:translateY(12px);transition:opacity .8s ease .35s,transform .8s cubic-bezier(.16,1,.3,1) .35s;}
.arr h2{margin-top:16px;font-size:clamp(40px,7.4vw,104px);font-weight:600;letter-spacing:-.04em;line-height:.98;color:#fff;text-shadow:0 4px 44px rgba(0,0,0,.5);opacity:0;transform:translateY(20px);transition:opacity 1s ease .5s,transform 1s cubic-bezier(.16,1,.3,1) .5s;}
.arr p{margin:26px auto 0;font-size:clamp(17px,2.1vw,23px);line-height:1.5;color:#e6e9ee;max-width:44ch;text-shadow:0 2px 26px rgba(0,0,0,.6);opacity:0;transform:translateY(16px);transition:opacity 1s ease .75s,transform 1s cubic-bezier(.16,1,.3,1) .75s;}
.arr-f{margin-top:30px;font-size:clamp(18px,2.2vw,26px);font-weight:600;letter-spacing:-.02em;color:#f5c877;opacity:0;transform:translateY(14px);transition:opacity 1s ease 1s,transform 1s cubic-bezier(.16,1,.3,1) 1s;}
.arr-cta{margin-top:clamp(30px,4vw,42px);display:flex;flex-direction:column;align-items:center;gap:14px;opacity:0;transform:translateY(14px);transition:opacity 1s ease 1.25s,transform 1s cubic-bezier(.16,1,.3,1) 1.25s;}
.arr-cta a{display:inline-flex;align-items:center;background:#fff;color:#050506;font-size:15px;font-weight:600;border-radius:999px;padding:16px 34px;text-decoration:none;box-shadow:0 20px 44px -22px rgba(0,0,0,.8);transition:transform .3s ease;}
.arr-cta a:hover{transform:translateY(-2px);}
.arr-note{font-size:14.5px;color:#c3c8d0;text-shadow:0 1px 18px rgba(0,0,0,.7);}
.arr.on .arr-k,.arr.on h2,.arr.on p,.arr.on .arr-f,.arr.on .arr-cta{opacity:1;transform:none;}
@media(prefers-reduced-motion:reduce){.arr *{transition:none !important;animation:none !important;opacity:1 !important;transform:none !important;}}
`;

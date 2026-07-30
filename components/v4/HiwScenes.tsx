'use client';

import { useEffect, useRef, useState } from 'react';
import { START_LINK } from '@/lib/site';
import { min } from '@/lib/css';

/* Set pieces for /how-it-works.
 *
 * 1. AccountBrain — the intake becoming an answer.
 * 2. NightShift   — the machine working while the owner sleeps. This is the one
 *                   thing they actually buy.
 * 3. Arrival      — the pinnacle of the journey, and the only ask on the page.
 *
 * IntersectionObserver play-once. No scroll-scrubbing: it was removed from this
 * codebase for desktop lag.
 *
 * HONESTY RULE: these are illustrations of the service, not screenshots of a
 * customer's account, and the page says so. We illustrate what the service does.
 * We never invent a result it produced. */


/* WAS the dock again — Richard (Images doc, Jul 28): "Repeating image for the first that
   comes up — trying to find something that relates to a business consultant." His preferred
   pick was the glass-wall strategy meeting ("feels more like background image to support
   text"). Pexels 4623501, same shot family as his doc embed. */
const ARRIVE_IMG = '/hiw-arrival.jpg';

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

/* Play a sequence of steps once, on view. Returns the current step index. */
function useSequence(steps: number, gap = 700, delay = 300) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(-1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.disconnect();
          if (reduce) {
            setStep(steps);
            return;
          }
          for (let i = 0; i <= steps; i++) {
            timers.push(setTimeout(() => setStep(i), delay + i * gap));
          }
        }),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [steps, gap, delay]);
  return { ref, step };
}

/* ============================================================
 * 1. THE ACCOUNT BRAIN
 * Four facts get learned, one at a time. They feed a node.
 * Then the node answers a customer, in the owner's words,
 * using those exact four facts. Show it, do not claim it.
 * ========================================================== */
const FACTS = [
  { k: 'What you charge', v: '$180 for the visit' },
  { k: 'Jobs you take', v: 'No new construction' },
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
      <style>{min(AB_CSS)}</style>

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

      <div className="ab-col ab-phone">
        {/* The FAQ on this same page says "About 30 days from the first call." The scene
            used to say "Two weeks later", so the story contradicted the fact four screens
            below it. The fact wins. */}
        <div className="ab-lbl">A month in, 9:14 PM</div>
        <div className="abp">
          <div className={`abb them${step >= 0 ? ' in' : ''}`}>
            Hey, how much to look at a leaking pipe under my sink?
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
          That was your price, your area and your words. <b>You were on another job the whole time.</b>
        </div>
      </div>
    </div>
  );
}

const AB_CSS = `
.ab{display:grid;grid-template-columns:minmax(0,1fr) 168px minmax(0,1fr);gap:clamp(20px,3vw,40px);align-items:center;margin-top:clamp(40px,5vw,64px);}
@media(max-width:940px){.ab{grid-template-columns:1fr;gap:32px;}.ab-core{order:-1;}}
.ab-lbl{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#69707d;margin-bottom:14px;}
.abf{position:relative;display:grid;grid-template-columns:22px minmax(0,1fr) auto;gap:12px;align-items:center;padding:15px 14px;border-radius:14px;border:1px solid #e9e9e5;background:#fff;margin-bottom:10px;opacity:.42;transform:translateY(6px);transition:opacity .5s ease,transform .5s ease,border-color .5s ease,box-shadow .5s ease;overflow:hidden;}
.abf.on{opacity:1;transform:none;border-color:rgba(16,185,129,.4);box-shadow:0 14px 30px -22px rgba(16,185,129,.55);}
.abf.now::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(16,185,129,.16),transparent);animation:abscan 1s ease-out;pointer-events:none;}
@keyframes abscan{from{transform:translateX(-100%);}to{transform:translateX(100%);}}
.abf-tick{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#eceef1;color:#fff;transition:background .45s ease;}
.abf.on .abf-tick{background:#10b981;}
.abf-k{font-size:15px;font-weight:600;color:var(--v4-ink);}
.abf-v{font-size:13.5px;font-weight:600;color:#047857;background:rgba(16,185,129,.1);border-radius:999px;padding:4px 11px;white-space:nowrap;opacity:0;transition:opacity .5s ease .15s;}
.abf.on .abf-v{opacity:1;}
@media(max-width:520px){.abf{grid-template-columns:22px minmax(0,1fr);}.abf-v{grid-column:2;justify-self:start;margin-top:6px;}}
.ab-core{text-align:center;}
.ab-node{position:relative;width:104px;height:104px;margin:0 auto;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--sb-grad);box-shadow:0 22px 44px -20px rgba(16,185,129,.65);transition:transform .6s cubic-bezier(.16,1,.3,1);}
.ab-node.hot{transform:scale(1.06);}
.ab-node .r{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(16,185,129,.45);animation:abring 2.8s ease-out infinite;}
.ab-node .r2{animation-delay:.9s;}
.ab-node .r3{animation-delay:1.8s;}
@keyframes abring{0%{transform:scale(1);opacity:.7;}100%{transform:scale(1.75);opacity:0;}}
.ab-inner{position:relative;color:#fff;font-weight:700;letter-spacing:-.02em;display:flex;align-items:baseline;gap:2px;}
.ab-inner b{font-size:30px;}
.ab-inner i{font-style:normal;font-size:14px;opacity:.75;}
.ab-core-t{margin-top:18px;font-size:17px;font-weight:600;letter-spacing:-.02em;color:var(--v4-ink);}
.ab-core-s{margin-top:5px;font-size:13.5px;line-height:1.45;color:#69707d;}
.abp{background:#f2f2f5;border:1px solid #e9e9e5;border-radius:20px;padding:16px 14px;display:flex;flex-direction:column;gap:9px;min-height:238px;}
.abb{max-width:88%;padding:10px 14px;border-radius:18px;font-size:14px;line-height:1.4;opacity:0;transform:translateY(8px);}
.abb.in{animation:abpop .45s cubic-bezier(.16,1,.3,1) forwards;}
@keyframes abpop{to{opacity:1;transform:none;}}
.abb.them{align-self:flex-start;background:#e5e5ea;color:#111;border-bottom-left-radius:5px;}
.abb.us{align-self:flex-end;background:#10b981;color:#fff;border-bottom-right-radius:5px;}
.abb.sys{align-self:center;background:transparent;color:#047857;font-size:12px;font-weight:600;opacity:1;transform:none;padding:2px;}
.abb.typing{align-self:flex-end;background:#e5e5ea;display:flex;gap:4px;padding:12px 14px;opacity:1;transform:none;}
.abb.typing i{width:6px;height:6px;border-radius:50%;background:#9298a1;animation:abtype 1.1s ease-in-out infinite;}
.abb.typing i:nth-child(2){animation-delay:.15s;}
.abb.typing i:nth-child(3){animation-delay:.3s;}
@keyframes abtype{0%,60%,100%{opacity:.3;transform:translateY(0);}30%{opacity:1;transform:translateY(-3px);}}
.ab-cap{margin-top:14px;font-size:14.5px;line-height:1.5;color:#69707d;opacity:0;transition:opacity .6s ease;}
.ab-cap b{font-weight:600;color:var(--v4-ink);}
.ab-cap.on{opacity:1;}
@media(prefers-reduced-motion:reduce){.ab *{animation:none !important;transition:none !important;}.abb{opacity:1;transform:none;}}
`;

/* ============================================================
 * 2. THE NIGHT SHIFT
 *
 * This is the owner's phone. He is asleep. The green bubbles are
 * going out from his line and he did not send a single one.
 *
 * Two things it had to fix. It did not read as a phone, and it was
 * over before you finished scrolling past it, which made the most
 * important object on the site the easiest one to miss. So: a real
 * iMessage thread, and it pins while it plays.
 *
 * One phone. Nothing else. Everything that happened overnight is in
 * the thread, because everything that happened overnight WAS the thread.
 * ========================================================== */

type Msg = { side: 'them' | 'us' | 'sys'; text: string; tag?: string };

const THREAD: Msg[] = [
  /* WAS "Hey, my kitchen sink is leaking everywhere. Can someone come out?" (Richard's
     feedback via Jacob, round 14, Jul 30 2026: "examples are skewed to home services").
     Reworded to an urgent scheduling request that does not name a trade, so it reads
     naturally whether the "us" on the other end is a home service, a consultant fitting
     in a session, or an agent fitting in a showing. The reply below ("$180 for the
     visit") was left as-is: generic enough already, and this is a text-message mockup,
     not marketing copy — a full rewrite of the whole exchange for three different
     pricing models (flat visit fee / session / commission) was more than this specific
     complaint asked for. */
  { side: 'them', text: 'Hey, any chance you could fit me in this week? Kind of urgent.' },
  { side: 'us', text: 'It’s $180 for the visit and you’re well inside our area. I can do Thursday 8:30 AM.', /* WAS 'Sent by StayBookt · 9 seconds'. We have never measured a response time. The
     illustration disclaimer on this page covers "this is not a customer's screenshot";
     it does not cover "this is how fast we are". An illustration of an invented
     capability is still a claim. The scene's argument is that it happened at 6:47 PM
     while you were under a sink. The stopwatch added nothing. */
    /* WAS 'Sent by StayBookt'. This is the OWNER'S phone (see the header above) and the tag
       is an annotation FOR HIM. But it sits exactly where iMessage puts "Delivered", so an
       owner-operator read it as his CUSTOMER seeing our name on his message — and said so:
       "so my customers see your name, not mine?" That contradicts what we promise in three
       places ("Your number stays your number. Nothing changes for your customers").
       We meant one thing; the label said another. This version cannot be misread, and it is
       the scene's whole argument anyway: the green bubbles went out from his line and he did
       not send one of them. */
    tag: 'You did not send this' },
  { side: 'them', text: 'That works. Please book it.' },
  { side: 'us', text: 'Done. Thursday 8:30 AM. You’ll get a confirmation and a reminder the night before.' },
  { side: 'sys', text: '2:14 AM · Call answered. Triaged, not an emergency. Booked 7:00 AM.' },
];

export function NightShift() {
  const { ref, step } = useSequence(THREAD.length, 900, 500);
  const shown = Math.min(Math.max(step, 0), THREAD.length);
  const typing = step >= 0 && step < THREAD.length && THREAD[shown]?.side === 'us';
  const done = step >= THREAD.length;

  return (
    <div className="ns-hold" ref={ref}>
      <style>{min(NS_CSS)}</style>

      <div className="ns">
        <div className="nsp">
          <div className="nsp-notch" aria-hidden />
          <div className="nsp-screen">
            <div className="nsp-bar">
              <span className="nsp-back" aria-hidden>&#8249;</span>
              <span className="nsp-av" aria-hidden>?</span>
              <span className="nsp-who">
                <b>Unknown Number</b>
                <i>+1 (905) 555-0147</i>
              </span>
            </div>

            <div className="nsp-body">
              <div className="nsp-day">Tuesday 6:47 PM</div>

              {THREAD.map((m, i) => (
                <div className={`nsb ${m.side}${i < shown ? ' in' : ''}`} key={m.text}>
                  {m.side === 'sys' ? (
                    <span className="nsb-sys">{m.text}</span>
                  ) : (
                    <>
                      <span className="nsb-b">{m.text}</span>
                      {m.tag && <span className="nsb-tag">{m.tag}</span>}
                    </>
                  )}
                </div>
              ))}

              {typing && (
                <div className="nsb us in">
                  <span className="nsb-b typing"><i /><i /><i /></span>
                </div>
              )}
            </div>

            <div className="nsp-foot">You never picked up your phone.</div>
          </div>
        </div>

        <div className={`ns-foot${done ? ' in' : ''}`}>
          You were asleep for <span className="g">all of it.</span>
        </div>

        <p className="ns-fine">
          Illustration of the service. Not a screenshot of a customer&apos;s account.
        </p>
      </div>
    </div>
  );
}

const NS_CSS = `
/* The hold gives the phone room to pin. Without it the whole sequence played
   out behind you while you were already reading something else. */
.ns-hold{width:min(360px,100%);min-height:135vh;}
.ns{position:sticky;top:clamp(80px,11vh,120px);}
@media(max-width:640px){.ns-hold{min-height:0;}.ns{position:static;}}

.nsp{position:relative;width:100%;background:#0a0a0c;border-radius:46px;padding:11px;box-shadow:0 60px 110px -45px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.06);}
.nsp-notch{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:118px;height:27px;background:#0a0a0c;border-radius:0 0 17px 17px;z-index:3;}
.nsp-screen{background:#f2f2f7;border-radius:36px;overflow:hidden;display:flex;flex-direction:column;height:500px;}

/* The blur here sits on a 94%-opaque bar inside a static phone mockup, over a screen that
   never moves, so on a phone it is a compositing cost with no visible result. Solid below
   760px, unchanged on desktop. See the phone pass at the end of globals.css. */
.nsp-bar{background:rgba(247,247,250,.94);backdrop-filter:blur(12px);padding:32px 14px 9px;display:flex;align-items:center;gap:9px;border-bottom:1px solid #d9d9de;}
@media(max-width:760px){.nsp-bar{background:#f7f7fa;backdrop-filter:none;-webkit-backdrop-filter:none;}}
.nsp-back{color:#0a84ff;font-size:25px;line-height:1;font-weight:300;}
.nsp-av{width:30px;height:30px;border-radius:50%;background:#c7c7cc;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex:0 0 auto;}
.nsp-who b{display:block;font-size:13.5px;font-weight:600;color:#000;letter-spacing:-.01em;}
.nsp-who i{display:block;font-style:normal;font-size:11px;color:#8e8e93;margin-top:1px;}

.nsp-body{flex:1;padding:12px 12px 8px;display:flex;flex-direction:column;overflow:hidden;}
.nsp-day{text-align:center;font-size:10.5px;font-weight:600;color:#8e8e93;padding:2px 0 10px;}

.nsb{display:flex;flex-direction:column;max-width:84%;margin-bottom:8px;opacity:0;transform:translateY(10px) scale(.95);transition:opacity .45s cubic-bezier(.16,1,.3,1),transform .45s cubic-bezier(.16,1,.3,1);}
.nsb.in{opacity:1;transform:none;}
.nsb.them{align-self:flex-start;align-items:flex-start;}
.nsb.us{align-self:flex-end;align-items:flex-end;}
.nsb.sys{align-self:center;align-items:center;max-width:96%;margin-top:6px;}
.nsb-b{display:inline-block;padding:8px 13px;border-radius:19px;font-size:13.5px;line-height:1.35;}
.nsb.them .nsb-b{background:#e9e9eb;color:#000;border-bottom-left-radius:5px;}
/* WAS SMS green (#34c759) — the reasoning was "a stranger texting a business line
   is not on iMessage," which is technically correct but read wrong: Jacob, Jul 30
   2026, wants the real iPhone blue. #0a84ff is not a new color for this mockup —
   it is the exact same blue already used two lines up for .nsp-back, the phone's
   own iOS back-chevron — so this just makes the bubble match a color already
   sitting in the same screen instead of introducing a second one. */
.nsb.us .nsb-b{background:#0a84ff;color:#fff;border-bottom-right-radius:5px;}
.nsb-tag{margin-top:4px;font-size:9.5px;font-weight:700;color:#047857;letter-spacing:.02em;}
.nsb-sys{display:block;text-align:center;font-size:10.5px;line-height:1.45;font-weight:600;color:#8e8e93;padding:0 10px;}
.nsb-b.typing{display:flex;gap:3px;align-items:center;padding:11px 14px;background:#0a84ff;}
.nsb-b.typing i{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.9);animation:nstype 1.1s ease-in-out infinite;}
.nsb-b.typing i:nth-child(2){animation-delay:.15s;}
.nsb-b.typing i:nth-child(3){animation-delay:.3s;}
@keyframes nstype{0%,60%,100%{opacity:.35;transform:translateY(0);}30%{opacity:1;transform:translateY(-2px);}}

.nsp-foot{background:rgba(247,247,250,.94);border-top:1px solid #d9d9de;padding:12px 14px 16px;text-align:center;font-size:11px;font-weight:600;color:#8e8e93;}

.ns-foot{margin-top:22px;text-align:center;font-size:clamp(18px,2.1vw,23px);font-weight:600;letter-spacing:-.025em;color:var(--v4-ink);opacity:0;transition:opacity .9s ease .2s;}
.ns-foot.in{opacity:1;}
.ns-foot .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.ns-fine{margin:12px 0 0;text-align:center;font-size:11.5px;line-height:1.5;color:#9aa0a8;}
@media(prefers-reduced-motion:reduce){.ns *{transition:none !important;animation:none !important;}.nsb,.ns-foot{opacity:1;transform:none;}}
`;

/* ============================================================
 * 3. THE ARRIVAL
 * The map ends. This is what it was all for, and the only ask.
 * ========================================================== */
export function Arrival() {
  const ref = useOnView<HTMLElement>(0.25);
  return (
    <section className="arr" ref={ref}>
      <style>{min(ARR_CSS)}</style>
      {/* Same photo, same size, as the closing scene in HeroCta.tsx: 2000x2835 measured from
          what Pexels serves at w=2000. object-fit:cover still decides what you see; these
          two numbers only stop the layout shifting when the image arrives. */}
      <img src={ARRIVE_IMG} alt="" width={2000} height={2835} loading="lazy" decoding="async" />
      <div className="arr-ov" />
      <div className="arr-in">
        <span className="arr-dot" aria-hidden />
        <div className="arr-k">The end of the map</div>
        {/* RICHARD'S RESTRUCTURE (Images doc, Jul 28): "I don't love that we have two image
            folds at the bottom... After the animation I would have the saying below with an
            image and the CTA. Then the FAQ after that." So this scene IS the close now:
            his saying, no subtext ("we just showed that above"), straight to the button
            with the founder note under it. HeroCta was REMOVED from /how-it-works in the
            same commit — putting it back recreates the double fold he called clumsy. */}
        <h2>
          Do what you love.
          <br />
          We&apos;ll run the rest.
        </h2>
        <div className="arr-cta">
          <a href={START_LINK} data-cta="hiw_arrival">Get Started</a>
          <span className="arr-note">Thirty minutes with a founder. It&rsquo;s free.</span>
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
.arr-dot{display:block;width:22px;height:22px;margin:0 auto;border-radius:50%;background:#a78bfa;box-shadow:0 0 0 0 rgba(167,139,250,.55);opacity:0;transform:scale(.5);transition:opacity .7s ease .2s,transform .7s cubic-bezier(.16,1,.3,1) .2s;}
.arr.on .arr-dot{opacity:1;transform:none;animation:arrpulse 2.6s ease-out .9s infinite;}
@keyframes arrpulse{0%{box-shadow:0 0 0 0 rgba(167,139,250,.5);}100%{box-shadow:0 0 0 26px rgba(167,139,250,0);}}
.arr-k{margin-top:22px;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#c4b5fd;opacity:0;transform:translateY(12px);transition:opacity .8s ease .35s,transform .8s cubic-bezier(.16,1,.3,1) .35s;}
.arr h2{margin-top:16px;font-size:clamp(40px,7.4vw,104px);font-weight:600;letter-spacing:-.04em;line-height:.98;color:#fff;text-shadow:0 4px 44px rgba(0,0,0,.5);opacity:0;transform:translateY(20px);transition:opacity 1s ease .5s,transform 1s cubic-bezier(.16,1,.3,1) .5s;}
.arr p{margin:26px auto 0;font-size:clamp(17px,2.1vw,23px);line-height:1.5;color:#e6e9ee;max-width:44ch;text-shadow:0 2px 26px rgba(0,0,0,.6);opacity:0;transform:translateY(16px);transition:opacity 1s ease .75s,transform 1s cubic-bezier(.16,1,.3,1) .75s;}
.arr-f{margin-top:30px;font-size:clamp(18px,2.2vw,26px);font-weight:600;letter-spacing:-.02em;color:#c4b5fd;opacity:0;transform:translateY(14px);transition:opacity 1s ease 1s,transform 1s cubic-bezier(.16,1,.3,1) 1s;}
.arr-cta{margin-top:clamp(30px,4vw,42px);display:flex;flex-direction:column;align-items:center;gap:14px;opacity:0;transform:translateY(14px);transition:opacity 1s ease 1.25s,transform 1s cubic-bezier(.16,1,.3,1) 1.25s;}
.arr-cta a{display:inline-flex;align-items:center;background:#fff;color:#050506;font-size:15px;font-weight:600;border-radius:999px;padding:16px 34px;text-decoration:none;box-shadow:0 20px 44px -22px rgba(0,0,0,.8);transition:transform .3s ease;}
.arr-cta a:hover{transform:translateY(-2px);}
.arr-note{font-size:14.5px;color:#c3c8d0;text-shadow:0 1px 18px rgba(0,0,0,.7);}
.arr.on .arr-k,.arr.on h2,.arr.on p,.arr.on .arr-f,.arr.on .arr-cta{opacity:1;transform:none;}
@media(prefers-reduced-motion:reduce){.arr *{transition:none !important;animation:none !important;opacity:1 !important;transform:none !important;}}
`;

'use client';

/* THE HOMEPAGE JOURNEY — replaces the old abstract 4-beat pinned film (JourneyMap.tsx:
 * Get Found / StayBookt / Enjoy Life / cost, told through a wheel graphic and photo
 * cross-dissolves). Jacob + Richard's call (Jul 30 2026): the CONCRETE customer journey
 * that was already built for /how-it-works — a real search-results climb, a real "phone
 * rings at 2am, it's handled" scene, an honest Enjoy Life choice card, each with a
 * whispered owner-voice line — is the stronger story, and it belongs on the homepage,
 * not buried a click away. /how-it-works is retiring because this IS how-it-works now.
 *
 * SIMPLIFIED from the HowItWorks.tsx version on purpose:
 *   - No numbered "How we do it" step lists under each milestone. Apple doesn't caption
 *     its own demo; the scene + one promise line carries it. That depth already lives on
 *     /pricing (the included ledger).
 *   - No "First, we learn your business" precursor / AccountBrain scene. Implied by the
 *     scenes themselves; a first-time visitor does not need onboarding mechanics before
 *     they have decided this is for them.
 *   - No FAQ, no numbered proof band. Those live on HomeFaq (below) and /journeys.
 *
 * MECHANICALLY simpler too, and this is the more important cut: this is an ORDINARY
 * scrolling section with a damped, hand-drawn SVG trail (ported verbatim from
 * HowItWorks.tsx), not a pinned/scroll-scrubbed track. No clamp()-budgeted height, no
 * keyboard-press math, no beat-boundary snapping. See [[staybookt-scroll-films-keyboard]]
 * for why the old mechanism was a recurring bug class worth retiring, not just relocating.
 *
 * The pricing beat ("five jobs, one number") survives — Richard's own homepage rubric
 * says "tell me I can afford it" belongs in the first fifteen seconds, not gated behind
 * a click. It is a STATIC, on-view reveal now (timer-staggered, IntersectionObserver-
 * triggered, same pattern as AccountBrain/NightShift in HiwScenes.tsx), not scroll-scrubbed.
 * Content is a straight port of JourneyMap.tsx's PJOBS + $199/mth figure. */

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { NightShift } from './HiwScenes';
import { min } from '@/lib/css';

type Stop = {
  id: string; n: string; label: string; promise: string; voice: string; accent: string; accentD: string;
  side: 'left' | 'right'; surface: 'getfound' | 'staybookt' | 'enjoy'; beat: string;
};

/* Content is the same three milestones as HowItWorks.tsx's STOPS, byte-matched, minus
 * the `steps` field (dropped per the simplification above). Keep in sync if either
 * copy is edited: this is the one that ships now, but the sentences originated there.
 *
 * `side` (left/right alternation) — went through two wrong fixes before landing here.
 * Round 1 (Jacob: "the map looks sloppy") deleted the zigzag for one straight rail —
 * fixed the collision, killed the swerve. Round 2 (Jacob: "I loved the zig-zag, make it
 * look like Maps nav") brought the swerve back but confined the road to a timid center
 * gutter — fixed the collision again, but read as too linear, lost the wide "wraps
 * around the section" swoop he actually liked.
 *
 * Round 3, the real fix (Jacob: "start straight, veer left around the bend of the first
 * block, cross over, veer right around the next"): the layout goes back to exactly what
 * was live originally — each block near-full-width, the pin at the block's own far edge,
 * order-swapped by `side`. What was actually wrong was never the layout, it was the
 * curve: the old math bent HORIZONTALLY right as it arrived at the next pin, and the
 * next pin sits beside that block's own headline — so the sweep sliced across the exact
 * row the headline sits on. build() below now bends the corner INSIDE the empty gap
 * between one block's bottom and the next block's top (measured from their actual
 * rendered rects, not guessed), and arrives at each pin moving straight down instead of
 * sideways. Same wide edge-to-edge swerve, the turn just happens in the whitespace.
 *
 * `beat` was `beat` + a separate `result` line (Jacob, round 4: "simplify, be more
 * specific about what we do and how we do it"). The two usually said the same thing
 * twice — milestone 1's beat already ended on "found on search, the map, and AI
 * recommendations," then result repeated "found on search, the map, and AI answers."
 * `result` is gone; each `beat` is now the one sentence that carries both the mechanism
 * and the outcome. */
const STOPS: Stop[] = [
  {
    id: 'found', n: '1', label: 'Get found', promise: 'Impossible to miss.', voice: 'Finally. The phone is ringing again.',
    accent: '#0ea5e9', accentD: '#0284c7', side: 'left', surface: 'getfound',
    beat: 'We build the site, fix the Google listing, and get you showing up first: on search, on the map, and in AI answers.',
  },
  {
    id: 'run', n: '2', label: 'StayBookt', promise: 'Every lead gets worked.', voice: 'It is 2 a.m. I am asleep. It is handled.',
    accent: '#10b981', accentD: '#059669', side: 'right', surface: 'staybookt',
    beat: 'We catch the missed call, book the job, chase the quote, win the review, and rebook the second one. Nothing gets dropped.',
  },
  {
    id: 'free', n: '3', label: 'Enjoy life', promise: 'You choose.', voice: 'I could actually sell this. Or not. My call.',
    accent: '#7c3aed', accentD: '#6d28d9', side: 'left', surface: 'enjoy',
    beat: 'After a year, the business books and earns whether you are standing in the middle of it or not. Keep the part you love, hand it off, or sell it: your call.',
  },
];

/* The five people you cannot hire, ported verbatim from JourneyMap.tsx. Same argument as
 * the FiveSalaries ledger on /pricing. Do not add a sixth: the pricing argument on
 * /pricing rests on the number five. */
const PJOBS: { r: string; d: string; ic: string }[] = [
  { r: 'Receptionist', d: 'Answers, every single time', ic: 'phone' },
  { r: 'Scheduler', d: 'Books it, confirms it, reminds them', ic: 'cal' },
  { r: 'Assistant', d: 'Chases the quote, and answers when you ask', ic: 'quote' },
  { r: 'Collections', d: 'Chases the invoice until it is paid', ic: 'cash' },
  { r: 'Marketer', d: 'Gets you found, asks for the reviews', ic: 'mega' },
];

function RoleIcon({ id }: { id: string }) {
  const c = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<string, ReactNode> = {
    phone: <path {...c} d="M15.5 13.5c-1.6 1.6-4 .8-5.6-.8-1.6-1.6-2.4-4-.8-5.6l1-1-2.2-2.6-1.2 1.1c-1.9 1.9-1 5.6 1.9 8.5s6.6 3.8 8.5 1.9l1.1-1.2-2.6-2.2-1.1 1z" />,
    cal: <><rect {...c} x="4" y="5" width="16" height="15" rx="2.2" /><path {...c} d="M4 9.5h16M8.5 3.5v3M15.5 3.5v3" /></>,
    quote: <><path {...c} d="M13.5 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9.5z" /><path {...c} d="M13.5 4v5.5H19M9 13.5h6M9 16.5h4" /></>,
    cash: <><rect {...c} x="3" y="7" width="18" height="10" rx="2" /><circle {...c} cx="12" cy="12" r="2.4" /><path {...c} d="M6.5 9.5v0M17.5 14.5v0" /></>,
    mega: <><path {...c} d="M4 10.5v3a1 1 0 0 0 1 1h2l6 3.5V6L7 9.5H5a1 1 0 0 0-1 1z" /><path {...c} d="M17 9a4 4 0 0 1 0 6" /></>,
  };
  return <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">{paths[id]}</svg>;
}

/* Get Found scene: results climb, you land at #1, an AI assistant names you.
 * Ported verbatim from HowItWorks.tsx (GetFoundScene). */
function GetFoundScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) el.classList.add('on'); }), { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="gf" ref={ref}>
      <div className="gfwin">
        <div className="gftop">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9298a1" strokeWidth={2}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
          <span className="q">plumber near me</span>
        </div>
        <div className="gflist">
          <div className="srow r1"><span className="pin" /><span className="nm">City Wide Plumbing</span><span className="rt">&#9733; 4.1</span></div>
          <div className="srow r2"><span className="pin" /><span className="nm">Drain &amp; Sons</span><span className="rt">&#9733; 3.8</span></div>
          <div className="srow r3"><span className="pin" /><span className="nm">Rapid Rooter</span><span className="rt">&#9733; 4.0</span></div>
          <div className="srow tc"><span className="badge">#1</span><span className="pin" /><span className="nm">Redwater Plumbing</span><span className="rt">&#9733; 4.9 &middot; Open now</span></div>
        </div>
      </div>
      <div className="ai">
        <div className="k">Asked an AI assistant</div>
        <div className="q2">&ldquo;Who is a good plumber near me?&rdquo;</div>
        <div className="a2">Redwater Plumbing. 4.9 stars, open now, and one tap to call.</div>
      </div>
      <div className="chips">
        <span className="chip">New text &middot; booked</span>
        <span className="chip">Missed call &middot; caught</span>
      </div>
    </div>
  );
}

/* Enjoy Life scene: an honest outcome card, then three plain choices.
 * Ported verbatim from HowItWorks.tsx (EnjoyLifeScene) — no fabricated valuation number. */
function EnjoyLifeScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [choice, setChoice] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) el.classList.add('on'); }),
      { threshold: 0.45 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const CH = [
    { l: 'Keep it, and love it', d: 'Go back to the part of the work you actually enjoy. Most owners pick this one.', icon: 'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z' },
    { l: 'Hand it off', d: 'Pass over an operation that already works, instead of a job only you know how to do.', icon: 'M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6' },
    { l: 'Sell it', d: 'A business that keeps booking when you are not there is one a buyer actually wants.', icon: 'M12 3v18M5 10l7-7 7 7' },
  ];
  return (
    <div className="el" ref={ref}>
      <div className="valcard">
        <div className="k">After a year of this</div>
        <div className="hd">The business keeps booking and earning when you are not standing in the middle of it.</div>
        <div className="ns">
          What you do with that is entirely your call, and it costs you nothing. We take no
          commission on your jobs, no share of your revenue, and no share of what the business is
          worth if you ever sell it.
        </div>
      </div>
      <div className="choices">
        {CH.map((c, i) => (
          <button key={c.l} type="button" className={`choice${choice === i ? ' on' : ''}`} onMouseEnter={() => setChoice(i)} onClick={() => setChoice(i)}>
            <span className="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={c.icon} /></svg></span>
            <div className="cl">{c.l}</div>
            <div className="cd">{c.d}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StopBody({ s }: { s: Stop }) {
  return (
    <div className="body">
      <div className="plabel">Milestone {s.n} &middot; {s.label}</div>
      <div className="promise">{s.promise}</div>
      <div className="voice">&ldquo;{s.voice}&rdquo;</div>
      <div className="beat">{s.beat}</div>
      {s.id === 'free' && (
        <a className="jgo" href="/long-term">What it is worth later <span>&rarr;</span></a>
      )}
      <div className="stage">
        {s.surface === 'getfound' && <GetFoundScene />}
        {s.surface === 'staybookt' && <NightShift />}
        {s.surface === 'enjoy' && <EnjoyLifeScene />}
      </div>
    </div>
  );
}

/* Edge-anchored, alternating — this is the layout Jacob actually liked ("the swerving
 * thing that wrapped around the section"): each block runs close to full width, and the
 * pin sits at the far LEFT edge for a "left" stop or the far RIGHT edge for a "right"
 * one, order-swapped via CSS. What changed is NOT the layout — it is how build() below
 * draws the line BETWEEN two pins on opposite edges. See the comment on build(). */
function StopBlock({ s, obsRef, pointRef }: { s: Stop; obsRef: (el: HTMLDivElement | null) => void; pointRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div className={`jstop ${s.side}`} id={s.id} ref={obsRef} style={{ '--acc': s.accent, '--acd': s.accentD } as CSSProperties}>
      <div className="node" ref={pointRef}>{s.n}</div>
      <StopBody s={s} />
    </div>
  );
}

/* THE PRICING REVEAL. Timer-staggered, on-view (same technique as AccountBrain/NightShift
 * in HiwScenes.tsx), NOT scroll-scrubbed. The five jobs land one at a time, hold, then the
 * price settles in below and the jobs dim rather than vanish — the "five salaries, one
 * number" argument survives without the old absolute-positioned collapse animation. */
function PriceReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(-1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        if (reduce) { setStep(PJOBS.length + 1); return; }
        for (let i = 0; i <= PJOBS.length + 1; i++) {
          timers.push(setTimeout(() => setStep(i), 400 + i * 420));
        }
      }),
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => { obs.disconnect(); timers.forEach(clearTimeout); };
  }, []);
  const landed = Math.min(Math.max(step, 0), PJOBS.length);
  const priced = step > PJOBS.length;
  return (
    <section className={`hjc${priced ? ' priced' : ''}`} ref={ref}>
      <div className="wrap">
        <div className="eyebrow">What it costs</div>
        <h2>Five jobs. One number.</h2>
        <div className="hjc-jobs">
          {PJOBS.map((j, i) => (
            <div className={`hjc-job${i < landed ? ' on' : ''}`} key={j.r}>
              <span className="hjc-ic"><RoleIcon id={j.ic} /></span>
              <span className="hjc-txt">
                <span className="hjc-r">{j.r}</span>
                <span className="hjc-d">{j.d}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="hjc-num">
          <div className="hjc-fig"><span className="hjc-dol">$</span><span className="hjc-price">199</span><span className="hjc-per">/mth</span></div>
          <p className="hjc-sub">Nothing upfront. Cancel on thirty days notice.</p>
        </div>
        <a className="hjc-cta" href="/pricing" data-cta="home_journey_price">See the full plan <span aria-hidden>&rarr;</span></a>
      </div>
    </section>
  );
}

const CSS = `
/* ===== JOURNEY (ordinary scroll, damped hand-drawn trail — not pinned) ===== */
.hj-jrny{padding:clamp(56px,7vw,96px) 0 clamp(70px,9vw,120px);background:linear-gradient(180deg,#f6f6f3 0%,#f6f8fb 40%,#f4f1fb 100%);}
/* LEFT-ALIGNED, matching the section-intro pattern the rest of the site uses (About's
   "Two founders. One mission." — .abt-us .us-lead: eyebrow, h2, a real paragraph, not
   centered). Jacob, Jul 30 2026: this used to be a centered one-line teaser, which read
   as an afterthought next to the map below it. Widened to 680 and given a second
   sentence so it actually tees the section up instead of just labeling it. */
.hj-jrny .jhead{text-align:left;max-width:680px;margin:0 0 clamp(36px,5vw,60px);}
.hj-jrny .jhead .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.hj-jrny .jhead h2{font-size:clamp(30px,4.4vw,54px);font-weight:600;letter-spacing:-.03em;line-height:1.05;margin-top:14px;color:var(--v4-ink,#06080d);}
/* Same technique as the real hero's second line (app/page.tsx .v4 header.scene h1 .g)
   and .hjc-price below — one gradient-text move, reused everywhere it means "the payoff." */
.hj-jrny .jhead h2 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.hj-jrny .jhead p{margin-top:16px;font-size:clamp(16px,1.9vw,20px);color:#69707d;line-height:1.6;max-width:56ch;}
.hj-jmap{position:relative;max-width:940px;margin:0 auto;}
.hj-jsvg{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;overflow:visible;}
/* THE ROAD, Maps-style: a dashed grey "not yet driven" line underneath, and a solid
   gradient route filling in on top as you scroll — the same visual grammar as a walking
   route in Maps, dashed ahead / solid behind you. */
.hj-jsvg .bg{fill:none;stroke:#c9cdd6;stroke-width:3;stroke-linecap:round;stroke-dasharray:1 13;}
.hj-jsvg .tr{fill:none;stroke:url(#hjgrad);stroke-width:4;stroke-linecap:round;}
.hj-jsvg .jdot{fill:#fff;stroke:#10b981;stroke-width:3;filter:drop-shadow(0 3px 10px rgba(16,185,129,.5));}
/* THE CURRENT-LOCATION PUCK. A ring that expands and fades around the travel dot on a
   loop, same read as a live-location blip on a nav app: "this is where you are, right
   now, moving." Radius/opacity are CSS-animatable SVG properties in evergreen Chrome. */
.hj-jsvg .jring{fill:none;stroke:#10b981;stroke-width:2.5;opacity:0;animation:hjring 1.8s ease-out infinite;}
@keyframes hjring{0%{r:8.5;opacity:.5;}100%{r:22;opacity:0;}}
.hj-jrows{position:relative;z-index:1;}
@media(prefers-reduced-motion:reduce){.hj-jsvg .tr{stroke-dashoffset:0 !important;}.hj-jsvg .jring{animation:none;opacity:0;}}

/* Bookends sit dead center — the road only swerves between two edge-anchored
   milestones; the single start and end points don't need a side to swerve toward. */
.hj-jstart,.hj-jend{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;}
.hj-jstart{padding-bottom:clamp(26px,4vw,44px);}
.hj-jend{padding-top:clamp(30px,5vw,52px);}
.hj-jstart .sdot{width:16px;height:16px;border-radius:50%;background:var(--v4-ink,#06080d);position:relative;z-index:2;}
.hj-jend .edot{width:20px;height:20px;border-radius:50%;background:#7c3aed;position:relative;z-index:2;box-shadow:0 0 0 6px rgba(124,58,237,.16);}
.hj-jstart .st{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#69707d;}
.hj-jstart .sh{margin-top:3px;font-size:clamp(17px,2vw,20px);font-weight:600;color:var(--v4-ink,#06080d);}
.hj-jend .eh{font-size:clamp(18px,2.2vw,24px);font-weight:600;letter-spacing:-.02em;color:var(--v4-ink,#06080d);max-width:16ch;}

/* THE ROAD IS BACK TO EDGE-TO-EDGE (Jacob, round 3: "it's too linear, I loved the
   swerving thing that wrapped around the section"). Each block runs close to full
   width; the pin sits at the block's own far edge (left for a "left" stop, right for
   a "right" one, order-swapped) — same layout that was live before the center-lane
   attempt. The fix for the collision lives in build()'s curve math now, not in
   shrinking the swerve down to a timid center gutter. */
.jstop{display:grid;gap:clamp(16px,3vw,40px);align-items:start;padding:clamp(30px,5vw,54px) 0;opacity:.45;transform:translateY(14px);transition:opacity .6s ease,transform .6s ease;}
.jstop.left{grid-template-columns:56px minmax(0,1fr);}
.jstop.right{grid-template-columns:minmax(0,1fr) 56px;}
.jstop.right .node{order:2;}
.jstop.right .body{order:1;}
.jstop.on{opacity:1;transform:none;}
.jstop .node{width:46px;height:46px;border-radius:50%;background:#e6e8ec;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;margin:0 auto;border:4px solid #f6f6f3;position:relative;z-index:2;transition:background .5s ease;box-shadow:0 4px 16px -6px rgba(6,12,20,.3);}
.jstop.on .node{background:var(--acc);animation:hjpulse 1.4s ease-out .1s 1;}
@keyframes hjpulse{0%{box-shadow:0 0 0 0 rgba(0,0,0,.3);}100%{box-shadow:0 0 0 22px rgba(0,0,0,0);}}
@media(prefers-reduced-motion:reduce){.jstop{opacity:1;transform:none;}.jstop.on .node{animation:none;}}
.jstop .plabel{font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--acd);}
.jstop .promise{margin-top:8px;font-size:clamp(28px,4vw,50px);font-weight:600;line-height:1.02;letter-spacing:-.03em;color:var(--v4-ink,#06080d);}
.jstop .voice{margin-top:14px;font-size:clamp(16px,1.9vw,20px);font-style:italic;color:#5b616b;max-width:34ch;}
.jstop .beat{margin-top:16px;font-size:clamp(15px,1.6vw,17px);line-height:1.5;color:#69707d;max-width:48ch;}
.jstop .jgo{display:flex;width:fit-content;align-items:center;gap:8px;margin-top:16px;padding:9px 16px;
  border:1px solid rgba(6,12,20,.14);border-radius:999px;background:#fff;
  font-size:14px;font-weight:600;color:var(--v4-ink,#06080d);text-decoration:none;
  transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;}
.jstop .jgo span{color:var(--acd);transition:transform .25s ease;}
.jstop .jgo:hover{border-color:var(--acd);transform:translateY(-1px);box-shadow:0 12px 26px -18px rgba(6,12,20,.5);}
.jstop .jgo:hover span{transform:translateX(3px);}
.jstop .stage{position:relative;margin:30px 0 6px;display:flex;justify-content:flex-start;}
.jstop.right .stage{justify-content:flex-end;}
.jstop.right .body{text-align:right;}
.jstop.right .voice,.jstop.right .beat{margin-left:auto;}
.jstop .stage::before{content:'';position:absolute;inset:-8% -6% 2% -6%;background:radial-gradient(50% 55% at 42% 45%,rgba(0,0,0,.06),transparent 72%);filter:blur(40px);z-index:0;}
.jstop .stage>*{position:relative;z-index:1;}
@media(max-width:640px){
  .jstop.left,.jstop.right{grid-template-columns:40px minmax(0,1fr);gap:16px;}
  .jstop.right .node{order:0;}.jstop.right .body{order:0;text-align:left;}
  .jstop.right .stage{justify-content:center;}
  .jstop.right .voice,.jstop.right .beat{margin-left:0;}
  .jstop .node{width:38px;height:38px;font-size:15px;}.jstop .stage{justify-content:center;}
}

/* corner mini-map HUD */
.hj-hud{position:fixed;right:22px;bottom:22px;z-index:30;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border:1px solid #ececf0;border-radius:16px;padding:14px 16px 14px 14px;box-shadow:0 20px 50px -24px rgba(6,12,20,.4);display:flex;gap:12px;align-items:stretch;opacity:0;transform:translateY(10px);transition:opacity .4s ease,transform .4s ease;pointer-events:none;}
.hj-hud.show{opacity:1;transform:none;}
.hj-hud .track{position:relative;width:4px;border-radius:2px;background:#e6e8ec;}
.hj-hud .track i{position:absolute;left:0;top:0;width:4px;border-radius:2px;height:calc(var(--p,0)*100%);background:linear-gradient(180deg,#0ea5e9,#10b981 55%,#7c3aed);}
.hj-hud .track .dot{position:absolute;left:-4px;top:calc(var(--p,0)*100%);width:12px;height:12px;border-radius:50%;background:#fff;border:2px solid var(--v4-ink,#06080d);transform:translateY(-50%);box-shadow:0 2px 6px rgba(0,0,0,.25);}
.hj-hud .labs{display:flex;flex-direction:column;justify-content:space-between;font-size:11px;font-weight:600;}
.hj-hud .labs span{color:#69707d;transition:color .3s;}
.hj-hud .labs span.on{color:var(--v4-ink,#06080d);}
@media(max-width:720px){.hj-hud{display:none;}}

/* ===== SCENE: Get Found (search climb) ===== */
.gf{width:min(430px,100%);}
.gf .gfwin{background:#fff;border-radius:18px;border:1px solid #ececf0;box-shadow:0 44px 90px -44px rgba(0,0,0,.4);overflow:hidden;}
.gf .gftop{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #f1f1f4;font-size:13.5px;color:#42474f;}
.gf .gftop .q{flex:1;background:#f4f5f7;border-radius:999px;padding:8px 14px;color:#42474f;font-weight:500;}
.gf .gflist{position:relative;height:296px;margin:14px;}
.gf .srow{position:absolute;left:0;right:0;height:64px;border-radius:14px;border:1px solid #ececf0;background:#fff;display:flex;align-items:center;gap:12px;padding:0 15px;transition:top .9s cubic-bezier(.16,1,.3,1),box-shadow .6s ease,border-color .6s ease,opacity .6s ease;box-shadow:0 4px 14px -12px rgba(0,0,0,.2);}
.gf .srow .pin{width:9px;height:9px;border-radius:50%;background:#c4c8ce;flex:0 0 auto;}
.gf .srow .nm{font-size:14.5px;font-weight:600;color:var(--v4-ink,#06080d);white-space:nowrap;}
.gf .srow .rt{margin-left:auto;font-size:12px;color:#69707d;white-space:nowrap;}
.gf .srow .badge{position:absolute;top:-8px;left:14px;background:#0ea5e9;color:#fff;font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:999px;opacity:0;transition:opacity .5s .8s;}
.gf .srow.tc{top:222px;}.gf.on .srow.tc{top:0;border-color:rgba(14,165,233,.5);box-shadow:0 16px 34px -12px rgba(14,165,233,.45);}
.gf.on .srow.tc .pin{background:#0ea5e9;}.gf.on .srow.tc .badge{opacity:1;}
.gf .srow.r1{top:0;}.gf.on .srow.r1{top:74px;opacity:.6;}
.gf .srow.r2{top:74px;}.gf.on .srow.r2{top:148px;opacity:.6;}
.gf .srow.r3{top:148px;}.gf.on .srow.r3{top:222px;opacity:.6;}
.gf .ai{margin-top:14px;background:#0b0f14;border-radius:16px;padding:14px 16px;opacity:0;transform:translateY(8px);transition:opacity .6s 1s ease,transform .6s 1s ease;}
.gf.on .ai{opacity:1;transform:none;}
.gf .ai .k{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#5eead4;}
.gf .ai .q2{margin-top:7px;font-size:13.5px;color:#c7ccd6;}
.gf .ai .a2{margin-top:8px;font-size:14.5px;color:#fff;font-weight:500;line-height:1.4;}
.gf .chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;}
.gf .chip{font-size:11.5px;font-weight:600;color:#047857;background:rgba(16,185,129,.12);border-radius:999px;padding:6px 12px;opacity:0;transform:translateY(6px);transition:opacity .5s ease,transform .5s ease;}
.gf.on .chip{opacity:1;transform:none;}
.gf.on .chip:nth-child(1){transition-delay:1.1s;}.gf.on .chip:nth-child(2){transition-delay:1.25s;}

/* ===== SCENE: Enjoy Life (honest outcome + choices) ===== */
.el{width:min(520px,100%);}
.el .valcard{background:#0b0f14;color:#fff;border-radius:20px;padding:26px 26px 24px;box-shadow:0 50px 100px -44px rgba(0,0,0,.6);text-align:left;}
.el .valcard .k{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9aa0ab;}
.el .valcard .hd{margin-top:10px;font-size:clamp(20px,2.4vw,27px);font-weight:600;letter-spacing:-.025em;line-height:1.25;color:#fff;}
.el .valcard .ns{margin-top:12px;font-size:13.5px;line-height:1.6;color:#9aa0ab;}
.el .choices{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px;}
.el .choice{display:flex;flex-direction:column;background:#fff;border:1px solid #ececf0;border-radius:16px;padding:18px 16px 16px;text-align:left;cursor:pointer;font-family:inherit;transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;}
.el .choice:hover,.el .choice.on{border-color:#7c3aed;transform:translateY(-3px);box-shadow:0 18px 34px -18px rgba(124,58,237,.4);}
.el .choice .ci{width:36px;height:36px;border-radius:10px;background:rgba(124,58,237,.12);display:flex;align-items:center;justify-content:center;color:#6d28d9;}
.el .choice .cl{margin-top:13px;font-size:16px;font-weight:600;color:var(--v4-ink,#06080d);}
.el .choice .cd{margin-top:8px;font-size:12.5px;line-height:1.45;color:#69707d;}
@media(max-width:520px){.el .choices{grid-template-columns:1fr;}}

/* ===== WHAT IT COSTS — the one dark section left on the page, on purpose (Jacob, round
   4: relight everything else, keep this one the contrast slab so the payoff still lands
   as a payoff). Round 4 also asked for it to look more like the brand: the $199 used to
   be plain white and every job icon was the same teal, disconnected from the actual
   brand palette. Now the number carries the brand gradient (sweeping in on reveal, same
   background-position trick as .fa-cta's hover), and the five icons cycle through the
   four brand hues instead of repeating one color five times. ===== */
.hjc{background:#050506;padding:clamp(90px,12vw,150px) 0;text-align:center;position:relative;overflow:hidden;}
.hjc::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(60% 60% at 50% 0%,rgba(16,185,129,.14),transparent 62%);}
.hjc .wrap{position:relative;z-index:1;max-width:620px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.hjc .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#86868b;}
.hjc h2{margin-top:14px;font-size:clamp(28px,3.6vw,44px);font-weight:600;letter-spacing:-.03em;color:#f5f5f7;}
.hjc-jobs{display:flex;flex-direction:column;align-items:center;gap:12px;margin-top:clamp(36px,5vw,54px);transition:opacity .8s ease;}
.hjc.priced .hjc-jobs{opacity:.5;}
.hjc-job{opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);
  display:flex;align-items:center;gap:14px;width:min(340px,86%);margin:0 auto;text-align:left;}
.hjc-job.on{opacity:1;transform:none;}
.hjc-ic{flex:0 0 auto;width:44px;height:44px;border-radius:14px;display:grid;place-items:center;border:1px solid transparent;}
/* Five jobs, four brand hues (cyan/emerald/indigo/violet) — cycles rather than repeats,
   so the reveal itself paints through the palette on its way to the gradient number. */
.hjc-job:nth-child(1) .hjc-ic{color:#38bdf8;background:rgba(14,165,233,.1);border-color:rgba(14,165,233,.22);}
.hjc-job:nth-child(2) .hjc-ic{color:#34d399;background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.22);}
.hjc-job:nth-child(3) .hjc-ic{color:#818cf8;background:rgba(79,70,229,.12);border-color:rgba(79,70,229,.24);}
.hjc-job:nth-child(4) .hjc-ic{color:#a78bfa;background:rgba(124,58,237,.1);border-color:rgba(124,58,237,.22);}
.hjc-job:nth-child(5) .hjc-ic{color:#38bdf8;background:rgba(14,165,233,.1);border-color:rgba(14,165,233,.22);}
.hjc-txt{display:flex;flex-direction:column;min-width:0;}
.hjc-r{font-size:19px;font-weight:600;letter-spacing:-.02em;color:#f5f5f7;}
.hjc-d{margin-top:2px;font-size:13px;color:#8b93a5;}
.hjc-num{position:relative;margin-top:34px;opacity:0;transform:translateY(16px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1);}
.hjc.priced .hjc-num{opacity:1;transform:none;}
/* THE GLOW. A soft brand-gradient blob behind the number, blurred and dim until the
   figure settles in, then blooms — the "big moment" gets a beat of visual weight behind
   it instead of sitting flat on the black. */
.hjc-num::before{content:'';position:absolute;inset:-30% -10%;z-index:-1;background:radial-gradient(55% 60% at 50% 55%,rgba(16,185,129,.28),rgba(79,70,229,.16) 55%,transparent 75%);filter:blur(46px);opacity:0;transform:scale(.75);transition:opacity 1.1s ease,transform 1.1s cubic-bezier(.16,1,.3,1);}
.hjc.priced .hjc-num::before{opacity:1;transform:scale(1);}
.hjc-fig{display:flex;align-items:flex-start;justify-content:center;gap:2px;font-weight:700;letter-spacing:-.055em;line-height:.88;font-size:clamp(64px,10vw,120px);font-variant-numeric:tabular-nums;}
.hjc-dol{font-size:.34em;font-weight:600;margin-top:.16em;color:#8b93a5;}
/* THE SWEEP. background-size is wider than the text, parked off to one side; when
   .priced lands, it slides into place — the same technique as .fa-cta's hover sweep,
   just triggered by the reveal instead of a pointer. */
.hjc-price{background:var(--sb-grad);background-size:230% 100%;background-position:100% 50%;-webkit-background-clip:text;background-clip:text;color:transparent;transition:background-position 1.3s cubic-bezier(.16,1,.3,1);}
.hjc.priced .hjc-price{background-position:0% 50%;}
.hjc-per{align-self:flex-end;margin-bottom:.2em;margin-left:8px;font-size:.16em;font-weight:600;color:#8b93a5;}
.hjc-sub{margin:14px auto 0;font-size:clamp(15px,1.7vw,18px);font-weight:600;color:#d7dce4;}
.hjc-cta{display:inline-flex;align-items:center;gap:9px;margin-top:30px;background:#fff;color:#050506;font-size:15px;font-weight:600;border-radius:999px;padding:15px 30px;text-decoration:none;transition:transform .3s ease,box-shadow .3s ease;}
.hjc-cta:hover{transform:translateY(-1px);box-shadow:0 18px 36px -18px rgba(16,185,129,.5);}
@media(prefers-reduced-motion:reduce){.hjc-job,.hjc-num,.hjc-jobs,.hjc-num::before,.hjc-price{transition:none;}}
`;

export default function HomeJourney() {
  const [active, setActive] = useState(0);
  const [hudOn, setHudOn] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const bgRef = useRef<SVGPathElement | null>(null);
  const trailRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const lenRef = useRef(0);
  const pRef = useRef(0);
  const pts = useRef<Record<string, HTMLElement | null>>({});
  const stopEls = useRef<Record<string, HTMLDivElement | null>>({});

  const apply = (p: number) => {
    const trail = trailRef.current, dot = dotRef.current, ring = ringRef.current, L = lenRef.current;
    if (!trail || !L) return;
    trail.style.strokeDashoffset = String(L * (1 - p));
    if (dot || ring) {
      const pt = trail.getPointAtLength(L * Math.max(0, Math.min(1, p)));
      if (dot) { dot.setAttribute('cx', String(pt.x)); dot.setAttribute('cy', String(pt.y)); }
      if (ring) { ring.setAttribute('cx', String(pt.x)); ring.setAttribute('cy', String(pt.y)); }
    }
  };

  const build = () => {
    const map = mapRef.current, svg = svgRef.current, trail = trailRef.current, bg = bgRef.current;
    if (!map || !svg || !trail || !bg) return;
    const mr = map.getBoundingClientRect();
    const W = map.clientWidth, H = map.clientHeight;
    const order = ['start', 'found', 'run', 'free', 'end'];
    const P = order.map((k) => {
      const el = pts.current[k];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - mr.left, y: r.top + r.height / 2 - mr.top };
    }).filter(Boolean) as { x: number; y: number }[];
    if (P.length < 2) return;

    /* The actual top/bottom of each milestone's rendered block (not just its pin),
     * relative to the map. This is how the corner below finds the real empty gap
     * between two blocks instead of guessing a percentage of the distance between
     * their pins — the gap's height changes with viewport (clamp() padding), so a
     * guess drifts off target exactly when it matters. rowOrder mirrors STOPS. */
    const rowOrder = ['found', 'run', 'free'];
    const rows = rowOrder.map((k) => {
      const el = stopEls.current[k];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top - mr.top, bottom: r.bottom - mr.top };
    });

    let d = `M ${P[0].x.toFixed(1)} ${P[0].y.toFixed(1)}`;
    for (let i = 1; i < P.length; i++) {
      const a = P[i - 1], b = P[i];
      const aRow = rows[i - 2] ?? null; // the block point `a` belongs to, if any
      const bRow = rows[i - 1] ?? null; // the block point `b` belongs to, if any
      /* THE CORNER. Leave `a` straight down, do the entire left-right swerve at one
       * fixed height (crossY), arrive at `b` straight down. Old version bent toward
       * `b`'s own x/y together, so the sideways motion finished exactly AT the next
       * pin — which sits beside that block's headline, so the line sliced the text.
       * Putting both control points at the SAME crossY, picked from the real gap
       * between blocks, means the sideways motion happens and finishes in the
       * whitespace, and the last stretch into `b` is a plain vertical drop. */
      let crossY: number;
      if (aRow && bRow) {
        crossY = (aRow.bottom + bRow.top) / 2;
      } else if (bRow) {
        crossY = Math.max(a.y + 30, bRow.top - 24); // start -> first milestone
      } else if (aRow) {
        crossY = Math.min(b.y - 30, aRow.bottom + 24); // last milestone -> end
      } else {
        crossY = a.y + (b.y - a.y) * 0.5;
      }
      crossY = Math.min(Math.max(crossY, a.y + 16), b.y - 16);
      d += ` C ${a.x.toFixed(1)} ${crossY.toFixed(1)}, ${b.x.toFixed(1)} ${crossY.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    bg.setAttribute('d', d);
    trail.setAttribute('d', d);
    const L = trail.getTotalLength();
    lenRef.current = L;
    trail.style.strokeDasharray = String(L);
    apply(pRef.current);
  };

  useLayoutEffect(() => {
    build();
    const t1 = setTimeout(build, 300);
    const t2 = setTimeout(build, 1200);
    const ro = new ResizeObserver(() => build());
    if (mapRef.current) ro.observe(mapRef.current);
    window.addEventListener('resize', build);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pRef.current = 1;
      apply(1);
    }
    return () => { clearTimeout(t1); clearTimeout(t2); ro.disconnect(); window.removeEventListener('resize', build); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { el.style.setProperty('--p', '1'); return; }
    /* Damped, not direct — same K as every other trail/film on the site, so the
       whole site moves at one rate. Ordinary scroll, no pin, no snap: this is a
       section that scrolls past like any other. */
    const K = 0.12;
    let raf = 0;
    let running = false;
    let cur = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setHudOn(r.top < vh * 0.5 && r.bottom > vh * 0.4);
      return Math.min(Math.max((vh * 0.55 - r.top) / r.height, 0), 1);
    };
    const draw = (p: number) => {
      pRef.current = p;
      el.style.setProperty('--p', String(p));
      apply(p);
    };
    const tick = () => {
      const t = measure();
      const d = t - cur;
      if (Math.abs(d) < 0.0004) { cur = t; draw(cur); running = false; return; }
      cur += d * K;
      draw(cur);
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => { if (running) return; running = true; raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', onScroll, { passive: true });
    cur = measure();
    draw(cur);
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          const idx = STOPS.findIndex((s) => s.id === (e.target as HTMLElement).id);
          if (idx >= 0) setActive(idx);
        }
      }),
      { rootMargin: '-30% 0px -45% 0px', threshold: 0 },
    );
    Object.values(stopEls.current).forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{min(CSS)}</style>

      <div className={`hj-hud${hudOn ? ' show' : ''}`} aria-hidden="true">
        <div className="track"><i /><span className="dot" /></div>
        <div className="labs">
          {STOPS.map((s, i) => <span key={s.id} className={active >= i ? 'on' : ''}>{s.label}</span>)}
        </div>
      </div>

      <section className="hj-jrny">
        <div className="wrap">
          {/* Round 6 (Jacob, Jul 30 2026): considered promoting "Here's what changes" to
             * the page-level hero and demoting the real hero ("You built your business to
             * Enjoy Life") down here — decided against it, the hero's emotional hook has
             * to come first and the mid-page line only works as a payoff to tension the
             * hero already built. Landed here instead: name the three milestones outright,
             * in their own labels ("Get found" / "StayBookt" / "Enjoy life" below), as a
             * triptych that extends the "StayBookt. Enjoy Life." tagline already sitting
             * in the nav and page title rather than duplicating it.
             *
             * Round 7 (Jacob, same day): two fixes. (1) The wrap was an accident, not a
             * choice — "Enjoy" was bleeding onto line one and orphaning "Life." alone on
             * line two, which breaks [[staybookt-hero-format]], the site's own locked rule
             * that a headline is a deliberate 2-line break with the punchline ALONE on
             * line 2. Forced the break and gave the gradient-text treatment used on the
             * real hero's second line (`.g`, same --sb-grad technique as `header.scene h1
             * .g` in app/page.tsx and `.hjc-price` below). (2) The subhead was narrating
             * the section instead of saying something — "here is exactly what happens"
             * describes the copy rather than being copy. Replaced with three short
             * present-tense beats, one per milestone, ending on a deliberate double
             * meaning ("your call" = the phone AND the decision, echoing milestone 3's own
             * voice line "my call").
             *
             * Round 8 (Jacob, same day): "StayBookt." itself — the wordmark, not just the
             * payoff word — always gets the gradient treatment wherever it appears as
             * display copy, same as the nav logo. Three concepts on one line ("Get Found.
             * StayBookt. Enjoy Life.") didn't fit cleanly, so "Get Found." dropped —
             * milestone 1 already carries that label two lines down — leaving the header
             * as exactly the site's own tagline, both halves gradient, split across the
             * two locked lines: wordmark on line 1, payoff on line 2.
             *
             * Round 9 (Jacob, same day): "Enjoy Life." on line 2 was now redundant — the
             * hero directly above already paid off on those exact words, so saying them
             * again immediately below read as an echo, not a second beat. Swapped for "Do
             * more of what you love."
             *
             * Round 10 (Jacob, same day): resolved the redundancy from the other end
             * instead. The hero's own payoff line changed — "Enjoy Life" moved out of
             * app/page.tsx's h1 entirely, replaced there by "What You Love" (see the round
             * 10 comment in page.tsx). That freed "Enjoy Life." back up here: it no longer
             * echoes anything above it, so this line reverts to exactly the site's own
             * tagline — round 8's version. "Do more of what you love." moved to the hero
             * instead of living in two places at once.
             *
             * Round 11 (Jacob, same day): only "StayBookt." — the wordmark — gets the
             * gradient, per the round 8 rule. "Enjoy Life." is plain dark text now: it's
             * the rest of the tagline, not a second brand mark, so it does not get the same
             * treatment. Subhead expanded from one short beat line to two plain sentences
             * that actually say what StayBookt does (answers the phone, books the job,
             * chases the invoice — pulled from the same three jobs named in the price
             * ledger below) before pointing at the map.
             *
             * Round 12 (Jacob, same day): dropped the forced line break — "StayBookt.
             * Enjoy Life." is short enough (22 characters) to sit on one line at this
             * section's font size, same way it already does in the nav wordmark, so the
             * forced 2-line split here was unnecessary; it wraps on its own if a viewport
             * ever gets too narrow to hold it. */}
          <div className="jhead">
            <div className="eyebrow">The three milestones</div>
            <h2><span className="g">StayBookt.</span> Enjoy Life.</h2>
            <p>
              StayBookt answers your phone, books the job, and chases the invoice, day or
              night. Here is exactly what changes at each of the three milestones, and what
              it means for you.
            </p>
          </div>
          <div className="hj-jmap" ref={mapRef}>
            <svg className="hj-jsvg" ref={svgRef} preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="hjgrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0ea5e9" />
                  <stop offset="0.55" stopColor="#10b981" />
                  <stop offset="1" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <path className="bg" ref={bgRef} d="" />
              <path className="tr" ref={trailRef} d="" />
              <circle className="jring" ref={ringRef} r="8.5" cx="-10" cy="-10" />
              <circle className="jdot" ref={dotRef} r="8.5" cx="-10" cy="-10" />
            </svg>

            <div className="hj-jrows">
              <div className="hj-jstart">
                <span className="sdot" ref={(el) => { pts.current.start = el; }} />
                <div>
                  <div className="st">Day one &middot; You are here</div>
                  <div className="sh">The phone barely rings.</div>
                </div>
              </div>

              {STOPS.map((s) => (
                <StopBlock
                  key={s.id}
                  s={s}
                  obsRef={(el) => { stopEls.current[s.id] = el; }}
                  pointRef={(el) => { pts.current[s.id] = el; }}
                />
              ))}

              <div className="hj-jend">
                <span className="edot" ref={(el) => { pts.current.end = el; }} />
                <div className="eh">Twelve months later.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PriceReveal />
    </>
  );
}

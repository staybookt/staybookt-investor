'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { min } from '@/lib/css';

/* THE GROWTH QUIZ IS THE PAGE: one unified journey with a trail of receipts.
 *
 * REBUILT A SIXTH TIME (Jacob, July 2026): the gated card-flow is gone, and so is
 * its cold-open Start card. "The quiz IS the page, a unified journey, not a
 * click-and-start." The page opens ON question one: landing means already being in
 * the journey. When a question is answered, its card condenses into a compact
 * receipt row that stacks at the top of the experience and stays visible: the
 * trail. The next question rises into focus beneath it. The reader always sees
 * where they have been; the page visibly builds. After the last input the finale
 * assembles from the trail: the industry's revealed figures in one column, the
 * reader's own numbers and arithmetic in the other. Content height grows and the
 * page scrolls naturally as the trail accumulates; that is the journey. Nothing
 * advances on scroll. The reveals flow on their own once the figure has landed
 * (see MOTION below); the steppers and the finale still wait for a deliberate
 * act, because inputs need deliberate submission.
 *
 * WHY A QUIZ: guess before reveal makes the figures land. The reader commits to
 * 40% and then watches 62% count up; the gap between their guess and the
 * published number IS the argument, and no scroll choreography ever did that.
 *
 * THE MIRROR, NOT THE PROMISE. READ THIS BEFORE "IMPROVING" ANYTHING.
 * The old leak calculator is a documented, forbidden anti-pattern on this site, and
 * the reason is precise: it baked OUR assumptions into hidden multipliers (recovery
 * rates, close rates, annualisation) and produced dollar claims we could not back. It
 * fabricated precision and printed it as the reader's number.
 *
 * THE ARITHMETIC HERE IS ALLOWED BECAUSE IT DOES NONE OF THAT:
 *   - Three inputs, all the OWNER'S own numbers. The only number of ours anywhere in
 *     the arithmetic is the public $199 price.
 *   - Every displayed figure is derivable from those inputs by arithmetic a reader can
 *     check in their head: a division against 199, a multiply by four weeks, a multiply
 *     of two of their own numbers. NO recovery-rate multipliers, NO annualised loss
 *     claims, NO percentages of ours, NO "you will recover X", NO "you are losing X a
 *     year". The quotes line says "asked-for work", which is literally what it is: work
 *     they were asked to price, at their own average ticket.
 *   - A disclosure sits under the output saying exactly what this is: their arithmetic,
 *     not our promise, because we do not know their close rate and will not pretend to.
 *   - This lives on /growth, a private noindexed test page.
 * If you add a coefficient that is not the reader's own input or the public price, you
 * have rebuilt the leak calculator and it is banned. Do not.
 *
 * THE SCORE LINE judges the reader's three QUIZ GUESSES only ("You called 2 of 3."),
 * never their business. The stack-up sets the industry's published numbers beside
 * theirs and draws no conclusion for them.
 *
 * MOTION, THE SEAMLESS FLOW (Jacob, July 2026): no Next button anywhere. On answer
 * the four options condense immediately, ~350ms: the picked option and the correct
 * one shrink up toward the incoming trail row, the others fade out. The reveal then
 * owns the screen: the question quiets to a small kicker line, and the figure, its
 * one line and its source sit in generous air, roughly double the question rhythm.
 * The figure counts up once, ~900ms ease-out cubic. Then the reveal dwells ~2800ms,
 * a thin hairline under the figure filling so the auto-advance is legible, and
 * condenses itself into the trail while the next question rises, ~600ms ease. Any
 * click, tap or keypress during the dwell skips ahead immediately. The dwell PAUSES
 * while the card is hovered or anything on the page has focus-visible. A pick made
 * by keyboard (detail 0) gets NO timer at all: a quiet Continue control takes focus
 * and the reader advances with Enter or Space at their own pace. prefers-reduced-
 * motion gets NO auto-advance and NO count-up, instant reveal plus that same quiet
 * control, because auto-motion is exactly what the setting refuses; CSS media query
 * plus a matchMedia check cover both halves. The finale's rows assemble with a short
 * stagger, echoing the trail they came from. No aria-live on the count, on purpose:
 * a screen reader gets the final text in DOM order and is never shouted at by sixty
 * intermediate values. Nothing animates on initial page load: the landing state is
 * simply there.
 *
 * BACK IS THE TRAIL: every trail row is a real button. Tapping a question's row
 * reopens that question for a fresh answer; tapping the numbers row reopens the
 * steppers. Everything downstream recomputes from state. At the finale, the rows
 * that assembled into the stack-up stay tappable for the same purpose.
 *
 * ACCESSIBILITY LAWS, from the site audits: options are real buttons in a group
 * labelled by the question heading; answered options go aria-disabled (not disabled)
 * so keyboard focus is never dropped; focus moves to the active card's heading on
 * every advance, reopen or return, never on initial load; trail rows and every other
 * control run 48px or better; works at 390px. Quiet grey on this dark section is
 * #8a8f98 (6.27:1 on #050506); mid grey is #aeb6c4; the emerald #34d399 clears 10:1;
 * the amber #f59e0b clears 9:1. #6b7280 is BANNED everywhere.
 *
 * STATE IS REACT STATE. A refresh restarts the journey from question one. Accepted:
 * this is a private draft for two founders, not a saved form. Question one renders on
 * the server, so the prerender checks can see its heading and its four options; the
 * trail and later cards are client state and cannot be grepped from the HTML.
 *
 * SEVENTH PASS, THE HAND-OFF (Jacob, July 2026): the page grew the standard
 * .pg-hero above this section, and the hero's sub-line is the instruction. The
 * page h1 lives there now, so every card heading here is an h2 (the outline runs
 * h1 hero, h2 cards) and the old "Internal draft" eyebrow became a stage kicker:
 * "Question 1 of 3" on the questions, then "Your numbers", then "The stack-up".
 * The hero's emerald wash continues faintly across this section's top so hero and
 * quiz read as one surface, and this section no longer carries its own nav
 * clearance: the hero does. Nothing else about the journey changed, and there is
 * still no gate.
 */

const PRICE = 199;
const W = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const word = (n: number) => (n >= 0 && n < W.length ? W[n] : String(n));
const capW = (n: number) => {
  const w = word(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
};
const money = (n: number) => '$' + n.toLocaleString('en-US');

type Question = {
  key: string;
  eye: string;
  question: string;
  options: string[];
  answer: string;
  /* The revealed figure as it reads in the trail and the stack-up: for retention the
     reveal is the 25-95% range, not the bare answer option. */
  stack: string;
  fig: (p: number) => string;
  small?: boolean;
  line: string;
  src: string;
};

/* Every figure is published external research, named quietly on its card and linked
   in full in the Sources list below the quiz. The dropped stats stay dropped: see the
   note in app/growth/page.tsx. */
const QUESTIONS: Question[] = [
  {
    key: 'missed',
    eye: 'Missed calls',
    question: 'What share of calls to home-service businesses ring out unanswered?',
    options: ['25%', '40%', '62%', '75%'],
    answer: '62%',
    stack: '62%',
    fig: (p) => Math.round(62 * p) + '%',
    line: 'of calls to home-service businesses are never answered live.',
    src: '411 Locals, 2024',
  },
  {
    key: 'speed',
    eye: 'Speed to lead',
    question: 'Answering a new lead within the hour makes you how much more likely to win it than waiting a day?',
    options: ['2x', '4x', '7x', '10x'],
    answer: '7x',
    stack: '7x',
    fig: (p) => Math.round(7 * p) + 'x',
    line: 'more likely to win the lead when you answer within the hour. The average business takes 42 hours.',
    src: 'Harvard Business Review, 2011',
  },
  {
    key: 'retention',
    eye: 'Repeat customers',
    question: 'Raising customer retention five percent raises profit by up to?',
    options: ['10%', '25%', '50%', '95%'],
    answer: '95%',
    stack: '25-95%',
    fig: (p) => Math.round(25 * p) + '-' + Math.round(95 * p) + '%',
    small: true,
    line: 'more profit from raising customer retention by just five percent.',
    src: 'Bain & Company, via Harvard Business Review, 2014',
  },
];

type Field = {
  key: 'job' | 'missed' | 'quotes';
  label: string;
  hint: string;
  minV: number;
  maxV: number;
  step: number;
  isMoney: boolean;
};

const FIELDS: Field[] = [
  { key: 'job', label: 'Your average job', hint: 'What a typical finished job is worth to you', minV: 50, maxV: 5000, step: 50, isMoney: true },
  { key: 'missed', label: 'Calls you miss in a week', hint: 'Rang out, went to voicemail, came in while you were on the tools', minV: 0, maxV: 40, step: 1, isMoney: false },
  { key: 'quotes', label: 'Quotes unchased in a month', hint: 'Sent, then buried. No yes, no no', minV: 0, maxV: 50, step: 1, isMoney: false },
];

/* Stages of the journey: three questions, the reader's numbers, the stack-up. */
const STAGES = 5;

const CSS = `
/* ONE PAGE GROWING, not screens swapping. The section is normal flow: the trail
   stacks at the top, the active card holds focus beneath it, and the content height
   grows as the journey builds. The .pg-hero above carries the fixed nav's 64px
   clearance now, so this top padding is only the hand-off gap, kept tight on
   purpose: hero into question one, no dead band. The ::before is the hero's
   emerald wash carrying on, faint and decorative, over the same #050506 the hero
   sits on, so the seam between header and quiz is invisible. */
.gq{position:relative;background:#050506;color:#f5f5f7;min-height:100svh;padding:clamp(8px,1.6vh,18px) 0 clamp(56px,8vh,96px);}
.gq::before{content:'';position:absolute;top:0;left:0;right:0;height:340px;pointer-events:none;background:radial-gradient(64% 100% at 50% 0%,rgba(16,185,129,.05),transparent 72%);}
.gq-wrap{position:relative;z-index:1;width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);display:flex;flex-direction:column;align-items:center;text-align:center;}
.gq-eye{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#8a8f98;}
/* THE TRAIL. Answered cards condense into these receipt rows and stay visible.
   Every row is a real button: tapping it reopens that card. */
.gq-trail{width:100%;max-width:720px;margin:clamp(16px,2.6vh,26px) auto 0;display:flex;flex-direction:column;gap:8px;}
.gq-tr{display:flex;align-items:center;gap:12px;width:100%;min-height:48px;padding:10px 16px;border:1px solid #23262e;border-radius:14px;background:#0b0c10;color:#aeb6c4;font-family:inherit;font-size:14.5px;line-height:1.45;text-align:left;cursor:pointer;transition:border-color .2s ease,background .2s ease;animation:gq-condense .6s ease both;}
.gq-tr:hover{border-color:#3a3e49;background:#101218;}
.gq-tr:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
.gq-tr b{font-weight:700;color:#fff;font-variant-numeric:tabular-nums;}
@keyframes gq-condense{from{opacity:0;transform:translateY(14px) scale(.97);}to{opacity:1;transform:none;}}
/* Right and wrong marks, shared by the trail and the stack-up. Decorative; the
   words beside them carry the meaning. */
.gq .mk{flex:0 0 auto;font-size:14px;line-height:1.6;}
.gq .mk.ok{color:#34d399;}
.gq .mk.miss{color:#f59e0b;}
.gq .mk.nt{color:#8a8f98;}
/* THE ACTIVE CARD. Rises into focus beneath the trail; the landing state renders
   without animation. */
.gq-card{width:100%;display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:clamp(26px,4.5vh,50px);}
.gq-card.anim{animation:gq-in .6s ease both;}
@keyframes gq-in{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:none;}}
.gq-h{margin:14px auto 0;font-size:clamp(27px,3.8vw,50px);font-weight:600;letter-spacing:-.03em;line-height:1.08;color:#fff;max-width:24ch;outline:none;transition:font-size .3s ease;}
.gq-h .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
/* During the reveal the question quiets to a small kicker line above the figure.
   Same h2 element, so the outline and the focus target never change. */
.gq-h.quiet{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;line-height:1.5;color:#8a8f98;max-width:none;}
.gq-h.quiet .g{background:none;-webkit-background-clip:border-box;background-clip:border-box;color:#8a8f98;}
.gq-sub{margin:16px auto 0;font-size:clamp(15.5px,1.7vw,18px);line-height:1.6;color:#aeb6c4;max-width:52ch;}
/* THE QUIET CONTINUE. The only forward control left anywhere. Invisible in the
   auto flow until the card is hovered or it holds focus; always visible (.vis)
   for keyboard picks, reduced motion and the steppers, which need deliberate
   submission. 48px tap target, quiet grey at 6.27:1 on #050506. */
.gq-go{margin-top:clamp(18px,3vh,32px);min-height:48px;padding:12px 24px;border:1px solid transparent;border-radius:999px;background:transparent;color:#8a8f98;font-family:inherit;font-size:13.5px;font-weight:600;letter-spacing:.04em;cursor:pointer;opacity:0;transition:opacity .2s ease,color .2s ease,border-color .2s ease;}
.gq-go.vis{opacity:1;border-color:#23262e;}
.gq-go:focus-visible,.gq-card:hover .gq-go{opacity:1;}
.gq-go:hover{color:#aeb6c4;border-color:#3a3e49;}
.gq-go:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
/* OPTIONS. Real buttons; after the pick they resolve in place: the correct one goes
   emerald, the reader's wrong pick keeps a light outline, the rest fall back. They
   go aria-disabled, never disabled, so keyboard focus is not dropped. */
.gq-opts{margin-top:clamp(20px,3.5vh,34px);display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;width:100%;max-width:640px;}
@media(max-width:560px){.gq-opts{grid-template-columns:1fr 1fr;}}
.gq-opt{min-height:56px;border-radius:16px;border:1px solid #2c2f38;background:#15171d;color:#f5f5f7;font-family:inherit;font-size:19px;font-weight:600;cursor:pointer;transition:background .2s ease,border-color .2s ease,color .2s ease,opacity .2s ease;}
.gq-opt:hover{background:#1c1f27;border-color:#3a3e49;}
.gq-opt:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
.gq-opt.ok{border-color:#34d399;color:#34d399;background:#0b0c10;cursor:default;}
.gq-opt.my{border-color:#aeb6c4;background:#15171d;cursor:default;}
.gq-opt.dim{opacity:.4;cursor:default;}
.gq-opt.ok:hover,.gq-opt.my:hover,.gq-opt.dim:hover{background:#15171d;}
.gq-opt.ok:hover{background:#0b0c10;}
/* THE CONDENSE, ~350ms on answer: the picked option and the correct one shrink up
   toward the incoming trail row; the rest fade out. Then the reveal owns the
   screen. */
.gq-opts.going .gq-opt{pointer-events:none;}
.gq-opts.going .gq-opt.ok,.gq-opts.going .gq-opt.my{animation:gq-shrink .35s ease both;}
.gq-opts.going .gq-opt.dim{animation:gq-fade .35s ease both;}
@keyframes gq-shrink{to{opacity:0;transform:translateY(-30px) scale(.55);}}
@keyframes gq-fade{to{opacity:0;}}
/* THE REVEAL. Figure, one line, source, in air: roughly double the question
   rhythm. The hairline under the figure fills across the dwell so the
   auto-advance is legible, not mysterious. */
.gq-reveal{display:flex;flex-direction:column;align-items:center;width:100%;animation:gq-in .35s ease both;}
.gq-reveal .gq-fig{margin-top:clamp(26px,5.5vh,54px);}
.gq-reveal .gq-line{margin-top:clamp(22px,4.2vh,40px);}
.gq-reveal .gq-srcline{margin-top:clamp(14px,2.8vh,26px);}
.gq-bar{margin-top:clamp(20px,3.6vh,36px);width:min(220px,56%);height:2px;border-radius:999px;background:#23262e;overflow:hidden;}
.gq-bar i{display:block;width:100%;height:100%;background:#34d399;transform:scaleX(0);transform-origin:left center;}
/* THE FIGURE. Keynote scale, gradient on the number, tabular so digits do not
   jitter sideways while they count. Giant display text, so the gradient's quietest
   stop clears the WCAG large-text bar with room. */
.gq-fig{margin-top:clamp(12px,2.6vh,24px);font-family:var(--font-display),'Inter Tight','Helvetica Neue',Arial,sans-serif;font-size:clamp(96px,22vw,240px);line-height:.95;font-weight:700;letter-spacing:-.05em;font-variant-numeric:tabular-nums;background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.gq-fig-sm{font-size:clamp(56px,14vw,170px);}
@media(max-width:760px){.gq-fig{font-size:clamp(48px,16vw,84px);}.gq-fig-sm{font-size:clamp(38px,12vw,64px);}}
.gq-line{margin:clamp(10px,2vh,18px) auto 0;max-width:36ch;font-size:clamp(17px,2vw,23px);font-weight:600;letter-spacing:-.02em;line-height:1.4;color:#fff;}
.gq-srcline{margin:12px auto 0;max-width:60ch;font-size:12.5px;line-height:1.5;color:#8a8f98;}
/* THE INPUTS. Salvaged from YourMath: 48px minimum tap targets (these run 52), real
   buttons and a real number input per field, visible focus. Non-negotiable. */
.gq-fields{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,22px);width:100%;max-width:940px;margin:clamp(22px,4vh,40px) auto 0;text-align:left;}
@media(max-width:860px){.gq-fields{grid-template-columns:1fr;}}
.gq-f{border:1px solid #23262e;border-radius:18px;background:#0b0c10;padding:18px 18px 16px;}
.gq-f .lb{display:block;font-size:14.5px;font-weight:600;color:#f5f5f7;}
.gq-f .ht{display:block;margin-top:4px;font-size:12.5px;line-height:1.45;color:#8a8f98;}
.gq-row{margin-top:12px;display:flex;align-items:stretch;gap:10px;}
.gq-btn{flex:0 0 52px;min-width:48px;min-height:52px;border-radius:14px;border:1px solid #2c2f38;background:#15171d;color:#f5f5f7;font-size:24px;font-weight:600;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease,border-color .2s ease;}
.gq-btn:hover{background:#1c1f27;border-color:#3a3e49;}
.gq-btn:active{background:#23262f;}
.gq-btn:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
.gq-btn:disabled{opacity:.35;cursor:default;}
.gq-val{position:relative;flex:1 1 auto;min-width:0;display:flex;align-items:center;}
.gq-val .cur{position:absolute;left:12px;font-size:16px;font-weight:600;color:#8a8f98;pointer-events:none;}
.gq-in{width:100%;min-height:52px;border:1px solid #2c2f38;border-radius:14px;background:#0b0c10;font-family:inherit;font-size:21px;font-weight:600;color:#fff;text-align:center;-moz-appearance:textfield;appearance:textfield;}
.gq-in::-webkit-outer-spin-button,.gq-in::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
.gq-in:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
/* THE STACK-UP. The trail rows assemble into two quiet columns, industry beside
   theirs, with a short stagger echoing the trail they came from. No verdict. The
   question rows stay tappable so an answer can still be changed from here. */
.gq-cols{margin-top:clamp(20px,3.5vh,34px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(14px,2vw,22px);width:100%;max-width:940px;text-align:left;}
@media(max-width:720px){.gq-cols{grid-template-columns:1fr;}}
.gq-col{border:1px solid #23262e;border-radius:18px;background:#0b0c10;padding:20px 22px;}
.gq-col .hd{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#8a8f98;}
.gq-col ul{list-style:none;margin:10px 0 0;padding:0;}
.gq-col li{font-size:clamp(14px,1.5vw,16.5px);line-height:1.5;color:#aeb6c4;animation:gq-in .45s ease both;}
.gq-col li.tx{padding:10px 0;display:flex;gap:10px;}
.gq-col li b{font-weight:700;color:#fff;font-variant-numeric:tabular-nums;}
.gq-col li:nth-child(2){animation-delay:.08s;}
.gq-col li:nth-child(3){animation-delay:.16s;}
.gq-col li:nth-child(4){animation-delay:.24s;}
.gq-col li:nth-child(5){animation-delay:.32s;}
.gq-qr{display:flex;align-items:center;gap:10px;width:100%;min-height:48px;margin:0;padding:8px 10px 8px 0;border:0;border-radius:12px;background:transparent;color:#aeb6c4;font-family:inherit;font-size:inherit;line-height:inherit;text-align:left;cursor:pointer;transition:background .2s ease;}
.gq-qr:hover{background:#15171d;}
.gq-qr:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
.gq-qr .you{display:block;margin-top:2px;font-size:12.5px;color:#8a8f98;}
.gq-fig.gq-fig-col{margin-top:18px;font-size:clamp(44px,6.5vw,96px);}
.gq-col .late{animation:gq-in .45s ease both;animation-delay:.3s;}
.gq-cap-col{margin:10px 0 0;max-width:40ch;font-size:clamp(15px,1.6vw,19px);font-weight:600;letter-spacing:-.02em;line-height:1.45;color:#fff;}
.gq-covers{margin:12px 0 0;max-width:56ch;font-size:clamp(14.5px,1.6vw,17px);line-height:1.55;color:#aeb6c4;}
.gq-covers b{font-weight:700;color:#fff;font-variant-numeric:tabular-nums;white-space:nowrap;}
.gq-covers.quiet{color:#8a8f98;}
.gq-note{margin:16px 0 0;font-size:13px;line-height:1.6;color:#8a8f98;max-width:62ch;}
.gq-score{margin-top:20px;font-size:14px;line-height:1.5;color:#8a8f98;}
.gq-close{margin:12px auto 0;max-width:56ch;font-size:clamp(15px,1.7vw,18px);line-height:1.55;color:#aeb6c4;}
/* REDUCED MOTION: no condense, no rise, no stagger, no reveal slide. The count-ups
   and the auto-advance are killed in JS by the matchMedia check. */
@media(prefers-reduced-motion:reduce){.gq-tr,.gq-card.anim,.gq-col li,.gq-col .late,.gq-opts.going .gq-opt,.gq-reveal{animation:none;}.gq-h{transition:none;}}
`;

/* The count-up. Runs once per mount, ~900ms ease-out cubic, then holds the final
   string and reports done, which is what arms the dwell timer. Instant when
   reduced motion is on. Plain text, no aria-live. */
function Fig({
  fig,
  small,
  instant,
  onDone,
}: {
  fig: (p: number) => string;
  small?: boolean;
  instant: boolean;
  onDone?: () => void;
}) {
  const [p, setP] = useState(instant ? 1 : 0);
  const ran = useRef(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    if (instant) {
      setP(1);
      doneRef.current?.();
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const u = Math.min(1, (t - t0) / 900);
      setP(1 - Math.pow(1 - u, 3));
      if (u < 1) raf = requestAnimationFrame(tick);
      else doneRef.current?.();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [instant]);
  return <div className={'gq-fig' + (small ? ' gq-fig-sm' : '')}>{fig(p)}</div>;
}

export default function GrowthQuiz() {
  /* active is the card holding focus; furthest is how far the journey has built.
     Reopening a trail row drops active below furthest; completing it returns to
     furthest, and everything downstream recomputes from state. */
  const [active, setActive] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [moved, setMoved] = useState(false);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [v, setV] = useState<{ job: number; missed: number; quotes: number }>({
    job: 400,
    missed: 3,
    quotes: 4,
  });
  const [reduced, setReduced] = useState(false);
  /* THE FLOW MACHINE for a question card. step: null (options open), 'condense'
     (~350ms, options folding away), 'reveal' (figure owns the screen). manual
     means no timer for this reveal: reduced motion, or a pick made by keyboard.
     hovered and focusPause hold the dwell; dwellRef accumulates elapsed dwell ms
     across pauses; advancedRef guards the advance to exactly once per reveal. */
  const [step, setStep] = useState<null | 'condense' | 'reveal'>(null);
  const [countDone, setCountDone] = useState(false);
  const [manual, setManual] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusPause, setFocusPause] = useState(false);
  const headRef = useRef<HTMLHeadingElement | null>(null);
  const goRef = useRef<HTMLButtonElement | null>(null);
  const barRef = useRef<HTMLElement | null>(null);
  const navved = useRef(false);
  const advancedRef = useRef(false);
  const dwellRef = useRef(0);
  const kbRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  /* Focus lands on the active card's heading on every advance, reopen or return,
     never on initial load. */
  useEffect(() => {
    if (navved.current) headRef.current?.focus();
  }, [active]);

  const resetFlow = () => {
    setStep(null);
    setCountDone(false);
    setManual(false);
    dwellRef.current = 0;
  };

  const advance = () => {
    navved.current = true;
    setMoved(true);
    resetFlow();
    if (active < furthest) {
      setActive(furthest);
      return;
    }
    const n = Math.min(STAGES - 1, active + 1);
    setFurthest(n);
    setActive(n);
  };

  /* The single gate every path to the next card goes through during a reveal:
     timer, click-to-skip, keypress-to-skip and the quiet Continue all land here,
     and only the first one counts. */
  const advanceOnce = () => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    advance();
  };

  const reopen = (stage: number, qKey?: string) => {
    navved.current = true;
    setMoved(true);
    advancedRef.current = true;
    resetFlow();
    if (qKey) {
      setPicks((p) => {
        const c = { ...p };
        delete c[qKey];
        return c;
      });
    }
    setActive(stage);
  };

  /* The pick. Detail 0 means keyboard activation: that reveal gets no timer and
     the quiet Continue takes focus, so the reader advances at their own pace. */
  const pick = (qKey: string, o: string, detail: number) => {
    advancedRef.current = false;
    dwellRef.current = 0;
    setCountDone(false);
    kbRef.current = detail === 0;
    setManual(reduced || detail === 0);
    setPicks((p) => ({ ...p, [qKey]: o }));
    setStep(reduced ? 'reveal' : 'condense');
  };

  /* Condense runs ~350ms, then the reveal owns the screen. */
  useEffect(() => {
    if (step !== 'condense') return;
    const t = setTimeout(() => setStep('reveal'), 350);
    return () => clearTimeout(t);
  }, [step]);

  /* A keyboard pick hands focus to the quiet Continue once the reveal is up. */
  useEffect(() => {
    if (step === 'reveal' && kbRef.current) goRef.current?.focus();
  }, [step]);

  /* THE DWELL, auto flow only: ~2800ms after the count-up lands, driving the
     hairline from the same clock, then the flow advances itself. Pausing (hover
     or focus-visible anywhere) tears the loop down; dwellRef keeps the elapsed
     time, so resuming continues instead of restarting. */
  useEffect(() => {
    if (step !== 'reveal' || !countDone || manual || hovered || focusPause) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      dwellRef.current += t - last;
      last = t;
      const u = Math.min(1, dwellRef.current / 2800);
      if (barRef.current) barRef.current.style.transform = 'scaleX(' + u + ')';
      if (u >= 1) {
        advanceOnce();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, countDone, manual, hovered, focusPause]);

  /* Focus-visible anywhere on the page holds the dwell: a keyboard user tabbing
     through the trail is never advanced out from under their focus. */
  useEffect(() => {
    if (step !== 'reveal') return;
    const onIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      try {
        setFocusPause(!!t && typeof t.matches === 'function' && t.matches(':focus-visible'));
      } catch {
        setFocusPause(true);
      }
    };
    const onOut = () => setFocusPause(false);
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    return () => {
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
    };
  }, [step]);

  /* Any keypress during the auto dwell skips ahead, except keys that are
     navigation or modifiers, and never while something holds visible focus:
     that Enter belongs to the focused control. */
  useEffect(() => {
    if (step !== 'reveal' || manual) return;
    const onKey = (e: KeyboardEvent) => {
      if (['Tab', 'Shift', 'Control', 'Alt', 'Meta', 'Escape'].includes(e.key)) return;
      if (focusPause) return;
      advanceOnce();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, manual, focusPause]);

  const set = (f: Field, next: number) => {
    const n = Math.min(f.maxV, Math.max(f.minV, Math.round(next)));
    setV((p) => ({ ...p, [f.key]: Number.isFinite(n) ? n : p[f.key] }));
  };

  /* Every figure below is the reader's own inputs plus the public price. Nothing
     else. See the block at the top of this file before touching. */
  const { job, missed, quotes } = v;
  const months = Math.floor(job / PRICE);
  const jobsForMonth = job > 0 ? Math.ceil(PRICE / job) : 0;
  const missedMonthly = missed * 4;
  const quoteValue = quotes * job;
  const score = QUESTIONS.filter((q) => picks[q.key] === q.answer).length;

  const covers =
    months >= 1 ? (
      <>
        One job at <b>{money(job)}</b> covers {word(months)} {months === 1 ? 'month' : 'months'} of StayBookt.
      </>
    ) : (
      <>
        {capW(jobsForMonth)} jobs at <b>{money(job)}</b> cover a month of StayBookt.
      </>
    );

  const caption =
    quotes > 0
      ? quotes === 1
        ? 'your one unchased quote, priced at your own average job.'
        : 'of asked-for work in your ' + quotes + ' unchased quotes each month.'
      : 'is your average job.';

  const numbersSummary = (
    <>
      Your numbers: <b>{money(job)}</b> avg job, <b>{missed}</b> missed {missed === 1 ? 'call' : 'calls'}/wk,{' '}
      <b>{quotes}</b> unchased {quotes === 1 ? 'quote' : 'quotes'}/mo
    </>
  );

  /* THE TRAIL: a receipt row for every completed card that is not currently open.
     Hidden at the finale, where the same rows assemble into the stack-up. */
  const trail: ReactNode[] = [];
  if (active < STAGES - 1) {
    for (let s = 0; s < STAGES - 1; s++) {
      if (s === active || s >= furthest) continue;
      if (s <= 2) {
        const q = QUESTIONS[s];
        const picked = picks[q.key];
        const right = picked === q.answer;
        trail.push(
          <button
            key={q.key}
            type="button"
            className="gq-tr"
            onClick={() => reopen(s, q.key)}
            aria-label={'Reopen the ' + q.eye.toLowerCase() + ' question and answer it again'}
          >
            <span className={'mk ' + (right ? 'ok' : 'miss')} aria-hidden="true">
              {right ? '✓' : '●'}
            </span>
            <span>
              {q.eye}: <b>{q.stack}</b>{' '}
              {picked ? (right ? '(you called it)' : '(you said ' + picked + ')') : '(no answer yet)'}
            </span>
          </button>
        );
      } else {
        trail.push(
          <button
            key="numbers"
            type="button"
            className="gq-tr"
            onClick={() => reopen(3)}
            aria-label="Reopen your numbers and adjust them"
          >
            <span className="mk nt" aria-hidden="true">
              {'●'}
            </span>
            <span>{numbersSummary}</span>
          </button>
        );
      }
    }
  }

  const returnLabel = furthest === STAGES - 1 ? 'Back to the stack-up' : 'Return';

  const card = (() => {
    if (active <= 2) {
      const q = QUESTIONS[active];
      const picked = picks[q.key];
      const revealed = !!picked && step !== 'condense';
      return (
        <>
          <h2
            className={'gq-h' + (revealed ? ' quiet' : '')}
            tabIndex={-1}
            ref={headRef}
            id={'gq-q-' + q.key}
          >
            {q.question}
          </h2>
          {!revealed && (
            <div
              className={'gq-opts' + (step === 'condense' ? ' going' : '')}
              role="group"
              aria-labelledby={'gq-q-' + q.key}
            >
              {q.options.map((o) => {
                const cls =
                  'gq-opt' +
                  (picked ? (o === q.answer ? ' ok' : o === picked ? ' my' : ' dim') : '');
                return (
                  <button
                    key={o}
                    type="button"
                    className={cls}
                    aria-disabled={picked ? true : undefined}
                    onClick={(e) => {
                      if (!picked) pick(q.key, o, e.detail);
                    }}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          )}
          {revealed && (
            <div className="gq-reveal">
              <Fig
                fig={q.fig}
                small={q.small}
                instant={reduced}
                onDone={() => setCountDone(true)}
              />
              {!manual && (
                <div className="gq-bar" aria-hidden="true">
                  <i ref={barRef} />
                </div>
              )}
              <p className="gq-line">{q.line}</p>
              <p className="gq-srcline">{q.src}</p>
              <button
                type="button"
                ref={goRef}
                className={'gq-go' + (manual ? ' vis' : '')}
                onClick={(e) => {
                  e.stopPropagation();
                  advanceOnce();
                }}
              >
                {active < furthest ? returnLabel : 'Continue'}
              </button>
            </div>
          )}
        </>
      );
    }

    if (active === 3) {
      return (
        <>
          <h2 className="gq-h" tabIndex={-1} ref={headRef}>
            Now three numbers <span className="g">only you know.</span>
          </h2>
          <p className="gq-sub">
            Rough is fine. The arithmetic happens on your screen and goes nowhere.
          </p>
          <div className="gq-fields">
            {FIELDS.map((f) => {
              const val = v[f.key];
              return (
                <div className="gq-f" key={f.key}>
                  <label className="lb" htmlFor={'gq-' + f.key}>
                    {f.label}
                  </label>
                  <span className="ht">{f.hint}</span>
                  <div className="gq-row">
                    <button
                      type="button"
                      className="gq-btn"
                      onClick={() => set(f, val - f.step)}
                      disabled={val <= f.minV}
                      aria-label={'Decrease ' + f.label.toLowerCase()}
                    >
                      &minus;
                    </button>
                    <div className="gq-val">
                      {f.isMoney && (
                        <span className="cur" aria-hidden="true">
                          $
                        </span>
                      )}
                      <input
                        id={'gq-' + f.key}
                        className="gq-in"
                        type="number"
                        inputMode="numeric"
                        min={f.minV}
                        max={f.maxV}
                        step={f.step}
                        value={val}
                        onChange={(e) => set(f, Number(e.target.value))}
                      />
                    </div>
                    <button
                      type="button"
                      className="gq-btn"
                      onClick={() => set(f, val + f.step)}
                      disabled={val >= f.maxV}
                      aria-label={'Increase ' + f.label.toLowerCase()}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Inputs need deliberate submission: no timer here, ever. The
              affordance is quiet but always present. */}
          <button type="button" className="gq-go vis" onClick={advance}>
            {active < furthest ? returnLabel : 'Continue'}
          </button>
        </>
      );
    }

    /* THE FINALE. The trail assembles into the stack-up: the reader's three
       revealed figures, still wearing their marks and their guesses, become the
       industry column beside two more published stats; their own inputs and their
       arithmetic, at keynote scale, become the other. No verdict. */
    return (
      <>
        <h2 className="gq-h" tabIndex={-1} ref={headRef}>
          The industry&apos;s numbers, <span className="g">beside yours.</span>
        </h2>
        <div className="gq-cols">
          <div className="gq-col">
            <div className="hd">The industry</div>
            <ul>
              {QUESTIONS.map((q, i) => {
                const picked = picks[q.key];
                const right = picked === q.answer;
                return (
                  <li key={q.key}>
                    <button
                      type="button"
                      className="gq-qr"
                      onClick={() => reopen(i, q.key)}
                      aria-label={'Reopen the ' + q.eye.toLowerCase() + ' question and answer it again'}
                    >
                      <span className={'mk ' + (right ? 'ok' : 'miss')} aria-hidden="true">
                        {right ? '✓' : '●'}
                      </span>
                      <span>
                        <b>{q.stack}</b> {q.line}
                        <span className="you">
                          {picked
                            ? right
                              ? 'You called it.'
                              : 'You said ' + picked + '. Tap to change it.'
                            : 'You left this one open. Tap to answer it.'}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
              <li className="tx">
                <span className="mk nt" aria-hidden="true">
                  {'●'}
                </span>
                <span>
                  <b>37%</b> of estimates close on the first visit. The rest close in the
                  follow-up, or never. (ServiceTitan)
                </span>
              </li>
              <li className="tx">
                <span className="mk nt" aria-hidden="true">
                  {'●'}
                </span>
                <span>
                  <b>88%</b> of consumers would use a business that replies to all of its
                  reviews. (BrightLocal, 2024)
                </span>
              </li>
            </ul>
          </div>
          <div className="gq-col">
            <div className="hd">Yours</div>
            <ul>
              <li>
                <button
                  type="button"
                  className="gq-qr"
                  onClick={() => reopen(3)}
                  aria-label="Reopen your numbers and adjust them"
                >
                  <span className="mk nt" aria-hidden="true">
                    {'●'}
                  </span>
                  <span>
                    {numbersSummary}
                    <span className="you">Tap to adjust them.</span>
                  </span>
                </button>
              </li>
              <li className="tx">
                <span className="mk nt" aria-hidden="true">
                  {'●'}
                </span>
                <span>
                  {missed > 0 ? (
                    <>
                      You miss <b>{missed}</b> {missed === 1 ? 'call' : 'calls'} a week, which is{' '}
                      <b>{missedMonthly}</b> a month.
                    </>
                  ) : (
                    <>No missed calls in a week.</>
                  )}
                </span>
              </li>
            </ul>
            <div className="gq-fig gq-fig-col late">{money(quotes > 0 ? quoteValue : job)}</div>
            <p className="gq-cap-col late">{caption}</p>
            <p className="gq-covers late">{covers}</p>
            {quotes === 0 && (
              <p className="gq-covers quiet late">
                No unchased quotes on the table, so the figure above is simply your average job.
              </p>
            )}
            <p className="gq-note late">
              This is your arithmetic, not our promise. We do not know your close rate, your
              margins or your market, and we are not going to pretend we do. The numbers above
              are your inputs, multiplied and divided where you can check them in your head.
            </p>
          </div>
        </div>
        <p className="gq-score">You called {score} of 3.</p>
        <p className="gq-close">
          Every industry figure above is published research, linked just below. Your column
          came from you, and stayed on your screen.
        </p>
      </>
    );
  })();

  /* The stage kicker. The quiet line that took over the old h1's orienting role:
     it names where the reader is, inside the card, above its h2. The hero above
     already says "internal draft", so this section stopped repeating it. */
  const kicker =
    active <= 2 ? 'Question ' + (active + 1) + ' of 3' : active === 3 ? 'Your numbers' : 'The stack-up';

  /* During a reveal the card itself is the skip control: hover holds the dwell,
     a click or tap anywhere on it advances immediately. Outside a reveal these
     handlers do nothing. */
  const inReveal = active <= 2 && !!picks[QUESTIONS[active].key] && step !== 'condense';

  return (
    <section className="gq" aria-label="The growth quiz">
      <style>{min(CSS)}</style>
      <div className="gq-wrap">
        {trail.length > 0 && <div className="gq-trail">{trail}</div>}
        <div
          key={active}
          className={'gq-card' + (moved ? ' anim' : '')}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            if (inReveal) advanceOnce();
          }}
        >
          <div className="gq-eye">{kicker}</div>
          {card}
        </div>
      </div>
    </section>
  );
}

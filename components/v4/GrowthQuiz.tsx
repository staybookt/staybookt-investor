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
 * reader's own numbers and arithmetic in the other. Content height grows as the
 * trail accumulates; that is the journey. A held reveal advances on the reader's
 * next scroll intent (see MOTION below); the steppers and the finale still wait
 * for a deliberate act, because inputs need deliberate submission.
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
 * The figure counts up once, ~900ms ease-out cubic. Then the reveal HOLDS. The old
 * ~2800ms dwell timer and its hairline are GONE (Jacob, July 2026): the reveal waits
 * indefinitely, a small chevron pulsing gently beneath it, and the reader's NEXT
 * SCROLL is the advance. One gesture, one transition: a wheel tick past a small
 * threshold, a touch swipe up, ArrowDown, PageDown, Space or Enter, and the reveal
 * condenses into the trail while the next question rises, the same 350/600ms
 * motion. A ~700ms debounce after each advance keeps wheel momentum from
 * double-firing. A click or tap on the card still advances, and a pick made by
 * keyboard (detail 0) still hands focus to the quiet Continue control so the reader
 * can advance with Enter or Space at their own pace.
 *
 * SCROLL IS CONTAINED while the journey is live: wheel and touchmove over the stage
 * are consumed, and scroll keys are swallowed, so a scroll can never blow past the
 * quiz into the closer below, and a gesture on an unanswered question
 * does nothing at all. The quiz sets document.body.dataset.quizActive = '1' for the
 * same window, and ArrowScroll.tsx bails on that flag so an arrow press advances
 * the quiz instead of double-scrolling the page. Both the containment and the flag
 * end the moment the finale is reached: from there the page scrolls normally,
 * stack-up into the closing CTA. prefers-reduced-motion gets NO
 * gesture capture and NO count-up: instant reveal, normal page scrolling, and the
 * quiet Continue control, because hijacking scroll is exactly what that setting
 * refuses; CSS media query plus a matchMedia check cover both halves. The finale's
 * rows assemble with a short
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
 * control run 48px or better; works at 390px. Quiet grey on this LIGHT section is
 * #69707d (4.60:1 on the cream #f6f6f3, 4.98:1 on the white cards); ink is #06080d;
 * the emerald is its light-surface variant #046c4e (5.9:1 on cream) and the amber is
 * #b45309 (4.6:1 on cream); focus rings are #059669 (3.6:1, clears the 3:1 non-text
 * bar). #6b7280 is BANNED everywhere, and so is --sb-grad on a light surface: its
 * cyan stop fails contrast on cream, so every figure and headline highlight here
 * uses --sb-grad-ink, whose quietest stop clears the large-text bar on cream.
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
 *
 * EIGHTH PASS, TWO HELD SCREENS (Jacob, July 2026): after the third reveal the
 * trail of receipts and the "Your numbers" steppers used to land on one screen
 * together, and it read cluttered. The journey now lands on a RESULTS OVERVIEW
 * that owns the viewport alone: the three receipt rows and the quiet score line,
 * held with the chevron cue like any reveal, and the reader's NEXT scroll brings
 * the calculator screen, kicker, heading, steppers and deliberate Continue, with
 * no trail beside it. The top trail now shows only on the question screens; the
 * results screen carries the receipts itself, so nothing ever doubles. Stage
 * count went five to six. The finale, the reopen behaviour, the arithmetic and
 * the containment are unchanged.
 *
 * NINTH PASS, THE HELD STAGE (Jacob, July 2026): the site's film grammar arrived.
 * The section is now a sticky stage, position sticky, top 0, height 100svh, the
 * exact pin the JourneyMap film uses, so once the compact hero above hands off,
 * every moment, question, reveal, results, calculator, finale, owns the FULL
 * viewport: no nav-height reservation, no half screens. The scroll that brings
 * the stage up IS the call to action: the hero closes on a quiet "Scroll to
 * start" line, a wheel tick or a down key carries the reader to the pin, and a
 * window-level scroll clamp snaps any momentum that tries to blow past it, so a
 * hard trackpad flick cannot escape the journey mid-way. While pinned, scrolling
 * UP still releases naturally back to the hero; scrolling down is the gesture
 * grammar, one moment at a time, exactly as before. The gesture listeners moved
 * from the section to the window for this: the old section-scoped listeners let
 * a wheel over the fixed nav, or momentum that started on the hero, sail past
 * the whole quiz. The clamp and the window listeners close that hole. The nav
 * sheet check (body overflow hidden) keeps the mobile menu scrollable.
 *
 * THE SOURCE BEAT, same pass: the reveal used to print figure, line and source
 * in one breath. Now the small quiet source line fades in ~400ms AFTER the count
 * lands, its own beat inside the hold, and the chevron cue and the scroll
 * advance arm only once the source is up, so where the number came from gets
 * its dwell before the reader can move on. Reduced motion shows it instantly,
 * as it shows everything instantly.
 *
 * THE RELEASE: reduced motion, and the finale, both unpin the stage to normal
 * flow (.gq-rel): height auto, no overflow clip, no containment, stack-up into
 * the closing CTA. If a moment ever outgrows a small viewport the
 * stage scrolls internally (overflow-y auto, auto margins on the card, so the
 * top of the content is always reachable) and the gesture capture stands down
 * for native scroll while it does.
 *
 * TENTH PASS, THE HARD STOP (July 2026): the desktop fix. The ninth pass
 * contained scroll with preventDefault plus a snap-back clamp, and on a real
 * desktop it did not hold: Chrome only honours a cancel on the FIRST wheel
 * event of a scroll sequence, so trackpad momentum that began up on the hero
 * arrived at the pin uncancelable, sailed straight past the quiz into the
 * white sources section, and the window clamp could only snap back after the
 * overshoot had painted. The page visibly blew through the journey and
 * jumped back: the quiz read as broken. The fix stops depending on
 * preventDefault for containment. While the journey is live, the body flag
 * this quiz already sets (data-quiz-active, the one ArrowScroll reads) also
 * takes everything BELOW the quiz out of the document flow, so the page
 * simply ENDS at the stage: the browser's own scroll limit is the pin, and
 * no momentum, flick, scrollbar drag or programmatic scroll can ever land
 * past it. Wheel and touch events still fire at the scroll limit, so the
 * armed-reveal advance keeps working exactly as before; the gesture
 * listeners and the clamp stay on as belt and braces. The flag clears the
 * moment the finale is reached (and is never set under reduced motion), and
 * the closing CTA returns to the flow right where the reader is about to
 * scroll into it.
 *
 * ELEVENTH PASS, THE LIGHT BODY (Jacob, live review, July 2026): every other
 * page on the site runs a dark .pg-hero into a light body, and this page ran
 * dark into dark. The whole journey, questions, reveals, results, calculator,
 * finale, now lives on the site's cream #f6f6f3 in the white-card language the
 * matrix uses on /whats-included: white surfaces, #ececeb borders, ink text,
 * #69707d quiet grey. Keynote figures and headline highlights switched from
 * --sb-grad to --sb-grad-ink, because --sb-grad's cyan stop fails contrast on
 * a light ground. Three more moves in the same pass:
 *   - THE RESULTS MOMENT: the score is no longer a small line under the rows.
 *     It lands first, keynote scale, counting up to its "2 of 3"; the three
 *     receipts stagger in beneath it 120ms apart once the count lands, then
 *     one line of verdict copy that adapts to the score, warm at every score,
 *     no shame at zero. It judges the three GUESSES only, as ever.
 *   - SCROLL TO THE FINALE: the calculator no longer demands a Continue
 *     click. The defaults count as inputs, so once the reader settles, the
 *     next scroll advances to the finale like every other moment. Inputs stay
 *     deliberate: the advance never fires while a field holds focus, and a
 *     short settle window after the last interaction has to pass before the
 *     scroll arms. Keyboard and reduced-motion readers keep the quiet
 *     Continue, and a reopen from the finale keeps its visible Return.
 *   - THE SOURCES SECTION BELOW THE QUIZ IS GONE: every reveal carries its
 *     source line, and the finale names its sources inline, so the bottom
 *     list restated what the journey had already cited.
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

/* Every figure is published external research, named quietly on its card: the
   reveal's source line IS the citation, and the finale repeats it inline. The old
   Sources list below the quiz is gone (eleventh pass). The dropped stats stay
   dropped: see the note in app/growth/page.tsx. */
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

/* Stages of the journey: three questions, the results overview, the reader's
   numbers, the stack-up. */
const STAGES = 6;

const CSS = `
/* THE HELD STAGE (ninth pass). The section is a track and the stage inside it is
   the film pin: sticky, top 0, one viewport tall, the exact grammar JourneyMap
   uses. Once the hero above scrolls off, the stage owns the full screen and every
   moment centres inside it. 100vh then 100svh, same iOS reason as the films: svh
   is the viewport that is always actually visible, vh is the fallback. The 64px
   top padding is the fixed nav's clearance, carried here now that the stage, not
   the hero, sits under it. overflow-y auto plus the auto margins on the card mean
   a moment that outgrows a short screen scrolls internally instead of clipping,
   and overscroll-behavior keeps that internal scroll from chaining to the page.
   THE LIGHT BODY (eleventh pass): the section is the site's cream #f6f6f3, the
   standard light body every dark .pg-hero hands into, so the seam between the
   dark header and this section is the same seam every other page runs. The old
   emerald ::before wash existed to blend dark into dark and is gone with it. */
.gq{position:relative;background:#f6f6f3;color:#06080d;}
.gq-stage{position:sticky;top:0;height:100vh;height:100svh;overflow-y:auto;overscroll-behavior:contain;display:flex;flex-direction:column;padding:calc(64px + clamp(4px,1vh,10px)) 0 clamp(12px,2.5vh,22px);}
/* THE RELEASE. Reduced motion, and the journey's finale, both unpin the stage to
   normal flow: the finale can run as tall as it is, and the page scrolls on into
   the sources and the closing CTA. */
.gq.gq-rel .gq-stage{position:static;height:auto;min-height:100svh;overflow:visible;padding-bottom:clamp(56px,8vh,96px);}
/* THE HARD STOP (tenth pass, the desktop fix). While the journey is live the
   quiz sets data-quiz-active on the body, and that flag takes everything below
   the quiz, the closing CTA inside main and the footer after it, out of the
   flow entirely. The document ends at the stage, so the
   browser's own scroll limit IS the pin: no wheel momentum, flick, scrollbar
   drag or programmatic scroll can land past the quiz, with no preventDefault
   involved. Chrome only honours a cancel on the first wheel event of a scroll
   sequence, so the ninth pass's listener containment could not stop momentum
   that began on the hero; this can. The flag clears at the finale and is never
   set under reduced motion, so released and reduced readers keep the full
   page. */
body[data-quiz-active] .gq~*{display:none;}
body[data-quiz-active] .gro main~footer{display:none;}
/* The mobile CallBar is fixed over the bottom 66px of every viewport under 768px
   (CallBar.tsx reserves body padding for it, which a pinned stage cannot use), so
   the stage reserves the same zone itself: every centred moment, and the
   calculator's Continue, stays clear of the bar. */
@media(max-width:767px){.gq-stage{padding-bottom:calc(74px + env(safe-area-inset-bottom));}.gq-f{padding:14px 14px 12px;}}
/* No min-height:0 here, deliberately: when a moment outgrows a short screen the
   wrap must GROW to its content so the stage's scrollHeight is real and the
   bottom padding (the mobile CallBar reserve) stays respected. min-height:0
   locked the wrap to the leftover space and let tall content spill under the
   CallBar instead of scrolling clear of it. */
.gq-wrap{position:relative;z-index:1;width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);flex:1 0 auto;display:flex;flex-direction:column;align-items:center;text-align:center;}
.gq-eye{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#69707d;}
/* THE TRAIL. Answered cards condense into these receipt rows and stay visible.
   Every row is a real button: tapping it reopens that card. White cards on the
   cream, #ececeb borders: the matrix's light-surface card language. */
.gq-trail{width:100%;max-width:720px;margin:clamp(16px,2.6vh,26px) auto 0;display:flex;flex-direction:column;gap:8px;}
.gq-tr{display:flex;align-items:center;gap:12px;width:100%;min-height:48px;padding:10px 16px;border:1px solid #ececeb;border-radius:14px;background:#fff;color:#69707d;font-family:inherit;font-size:14.5px;line-height:1.45;text-align:left;cursor:pointer;transition:border-color .2s ease,background .2s ease;animation:gq-condense .6s ease both;box-shadow:0 2px 6px -2px rgba(6,12,20,.06);}
.gq-tr:hover{border-color:#d9d9d3;background:#fbfbfa;}
.gq-tr:focus-visible{outline:2px solid #059669;outline-offset:2px;}
.gq-tr b{font-weight:700;color:#06080d;font-variant-numeric:tabular-nums;}
@keyframes gq-condense{from{opacity:0;transform:translateY(14px) scale(.97);}to{opacity:1;transform:none;}}
/* Right and wrong marks, shared by the trail and the stack-up. Decorative; the
   words beside them carry the meaning. Light-surface variants: emerald #046c4e,
   amber #b45309, both past 4.5:1 on cream and white. */
.gq .mk{flex:0 0 auto;font-size:14px;line-height:1.6;}
.gq .mk.ok{color:#046c4e;}
.gq .mk.miss{color:#b45309;}
.gq .mk.nt{color:#69707d;}
/* THE ACTIVE CARD. Centred in the held stage's full viewport; the auto margins,
   not justify-content, do the centring, so if the card ever outgrows a short
   screen the top stays reachable through the stage's internal scroll. Rises into
   focus beneath the trail; the landing state renders without animation. */
.gq-card{width:100%;display:flex;flex-direction:column;align-items:center;text-align:center;margin-top:auto;margin-bottom:auto;padding:clamp(14px,2.5vh,30px) 0;}
.gq-card.anim{animation:gq-in .6s ease both;}
@keyframes gq-in{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:none;}}
.gq-h{margin:14px auto 0;font-size:clamp(27px,3.8vw,50px);font-weight:600;letter-spacing:-.03em;line-height:1.08;color:#06080d;max-width:24ch;outline:none;transition:font-size .3s ease;}
.gq-h .g{background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;}
/* During the reveal the question quiets to a small kicker line above the figure.
   Same h2 element, so the outline and the focus target never change. */
.gq-h.quiet{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;line-height:1.5;color:#69707d;max-width:none;}
.gq-h.quiet .g{background:none;-webkit-background-clip:border-box;background-clip:border-box;color:#69707d;}
.gq-sub{margin:16px auto 0;font-size:clamp(15.5px,1.7vw,18px);line-height:1.6;color:#69707d;max-width:52ch;}
/* THE QUIET CONTINUE. The only forward control left anywhere. Invisible in the
   scroll flow until the card is hovered or it holds focus; always visible (.vis)
   for keyboard picks, reduced motion and reopens from the finale, which need a
   deliberate way back. 48px tap target, quiet grey at 4.60:1 on the cream. */
.gq-go{margin-top:clamp(18px,3vh,32px);min-height:48px;padding:12px 24px;border:1px solid transparent;border-radius:999px;background:transparent;color:#69707d;font-family:inherit;font-size:13.5px;font-weight:600;letter-spacing:.04em;cursor:pointer;opacity:0;transition:opacity .2s ease,color .2s ease,border-color .2s ease;}
.gq-go.vis{opacity:1;border-color:#ececeb;}
.gq-go:focus-visible,.gq-card:hover .gq-go{opacity:1;}
.gq-go:hover{color:#06080d;border-color:#d9d9d3;}
.gq-go:focus-visible{outline:2px solid #059669;outline-offset:2px;}
/* OPTIONS. Real buttons; after the pick they resolve in place: the correct one goes
   emerald, the reader's wrong pick keeps a light outline, the rest fall back. They
   go aria-disabled, never disabled, so keyboard focus is not dropped. */
.gq-opts{margin-top:clamp(20px,3.5vh,34px);display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;width:100%;max-width:640px;}
@media(max-width:560px){.gq-opts{grid-template-columns:1fr 1fr;}}
.gq-opt{min-height:56px;border-radius:16px;border:1px solid #ececeb;background:#fff;color:#06080d;font-family:inherit;font-size:19px;font-weight:600;cursor:pointer;transition:background .2s ease,border-color .2s ease,color .2s ease,opacity .2s ease;box-shadow:0 2px 6px -2px rgba(6,12,20,.06);}
.gq-opt:hover{background:#fbfbfa;border-color:#d9d9d3;}
.gq-opt:focus-visible{outline:2px solid #059669;outline-offset:2px;}
.gq-opt.ok{border-color:#046c4e;color:#046c4e;background:rgba(4,108,78,.06);cursor:default;}
.gq-opt.my{border-color:#b45309;color:#b45309;background:rgba(245,158,11,.1);cursor:default;}
.gq-opt.dim{opacity:.55;cursor:default;}
.gq-opt.my:hover,.gq-opt.dim:hover{background:#fff;}
.gq-opt.my:hover{background:rgba(245,158,11,.1);}
.gq-opt.ok:hover{background:rgba(4,108,78,.06);border-color:#046c4e;}
/* THE CONDENSE, ~350ms on answer: the picked option and the correct one shrink up
   toward the incoming trail row; the rest fade out. Then the reveal owns the
   screen. */
.gq-opts.going .gq-opt{pointer-events:none;}
.gq-opts.going .gq-opt.ok,.gq-opts.going .gq-opt.my{animation:gq-shrink .35s ease both;}
.gq-opts.going .gq-opt.dim{animation:gq-fade .35s ease both;}
@keyframes gq-shrink{to{opacity:0;transform:translateY(-30px) scale(.55);}}
@keyframes gq-fade{to{opacity:0;}}
/* THE REVEAL. Figure, one line, source, in air: roughly double the question
   rhythm. The region is focusable so a keyboard reader can land on it and
   advance in place; the chevron beneath it pulses gently once the count lands,
   the quiet cue that the next scroll brings the next question. */
.gq-reveal{display:flex;flex-direction:column;align-items:center;width:100%;animation:gq-in .35s ease both;}
.gq-reveal:focus-visible{outline:2px solid #059669;outline-offset:10px;border-radius:12px;}
.gq-reveal .gq-fig{margin-top:clamp(26px,5.5vh,54px);}
.gq-reveal .gq-line{margin-top:clamp(22px,4.2vh,40px);}
.gq-reveal .gq-srcline{margin-top:clamp(14px,2.8vh,26px);}
.gq-cue{margin-top:clamp(20px,3.6vh,36px);height:14px;color:#69707d;opacity:0;transition:opacity .3s ease;}
.gq-cue.on{opacity:1;animation:gq-cue 2.4s ease-in-out infinite;}
.gq-cue svg{display:block;}
@keyframes gq-cue{0%,100%{opacity:.45;transform:translateY(0);}50%{opacity:.95;transform:translateY(5px);}}
/* THE FIGURE. Keynote scale, gradient on the number, tabular so digits do not
   jitter sideways while they count. Giant display text on the LIGHT ground, so
   the gradient is --sb-grad-ink, never --sb-grad: the ink gradient's quietest
   stop clears the WCAG large-text bar on cream, the bright one's cyan does not. */
.gq-fig{margin-top:clamp(12px,2.6vh,24px);font-family:var(--font-display),'Inter Tight','Helvetica Neue',Arial,sans-serif;font-size:clamp(96px,22vw,240px);line-height:.95;font-weight:700;letter-spacing:-.05em;font-variant-numeric:tabular-nums;background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;}
.gq-fig-sm{font-size:clamp(56px,14vw,170px);}
/* THE SCORE FIGURE (eleventh pass). "2 of 3" is wide, so it runs a step under the
   headline figures and still lands keynote. */
.gq-fig.gq-fig-score{font-size:clamp(64px,15vw,180px);}
@media(max-width:760px){.gq-fig{font-size:clamp(48px,16vw,84px);}.gq-fig-sm{font-size:clamp(38px,12vw,64px);}.gq-fig.gq-fig-score{font-size:clamp(40px,13vw,72px);}}
.gq-line{margin:clamp(10px,2vh,18px) auto 0;max-width:36ch;font-size:clamp(17px,2vw,23px);font-weight:600;letter-spacing:-.02em;line-height:1.4;color:#06080d;}
/* THE SOURCE BEAT. The source line is part of the hold: it starts silent and
   fades in ~400ms after the count lands (the JS owns the delay, .on is the cue),
   so where the number came from gets its own quiet moment before the chevron
   invites the next scroll. Small quiet type on purpose: 12.5px #69707d runs
   4.60:1 on the cream. */
.gq-srcline{margin:12px auto 0;max-width:60ch;font-size:12.5px;line-height:1.5;color:#69707d;opacity:0;transform:translateY(6px);transition:opacity .6s ease,transform .6s ease;}
.gq-srcline.on{opacity:1;transform:none;}
/* THE INPUTS. Salvaged from YourMath: 48px minimum tap targets (these run 52), real
   buttons and a real number input per field, visible focus. Non-negotiable. */
.gq-fields{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,22px);width:100%;max-width:940px;margin:clamp(22px,4vh,40px) auto 0;text-align:left;}
@media(max-width:860px){.gq-fields{grid-template-columns:1fr;}}
.gq-f{border:1px solid #ececeb;border-radius:18px;background:#fff;padding:18px 18px 16px;box-shadow:0 2px 6px -2px rgba(6,12,20,.06);}
.gq-f .lb{display:block;font-size:14.5px;font-weight:600;color:#06080d;}
.gq-f .ht{display:block;margin-top:4px;font-size:12.5px;line-height:1.45;color:#69707d;}
.gq-row{margin-top:12px;display:flex;align-items:stretch;gap:10px;}
.gq-btn{flex:0 0 52px;min-width:48px;min-height:52px;border-radius:14px;border:1px solid #ececeb;background:#fff;color:#06080d;font-size:24px;font-weight:600;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease,border-color .2s ease;}
.gq-btn:hover{background:#fbfbfa;border-color:#d9d9d3;}
.gq-btn:active{background:#f2f2ef;}
.gq-btn:focus-visible{outline:2px solid #059669;outline-offset:2px;}
.gq-btn:disabled{opacity:.35;cursor:default;}
.gq-val{position:relative;flex:1 1 auto;min-width:0;display:flex;align-items:center;}
.gq-val .cur{position:absolute;left:12px;font-size:16px;font-weight:600;color:#69707d;pointer-events:none;}
.gq-in{width:100%;min-height:52px;border:1px solid #ececeb;border-radius:14px;background:#fff;font-family:inherit;font-size:21px;font-weight:600;color:#06080d;text-align:center;-moz-appearance:textfield;appearance:textfield;}
.gq-in::-webkit-outer-spin-button,.gq-in::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
.gq-in:focus-visible{outline:2px solid #059669;outline-offset:2px;}
/* THE STACK-UP. The trail rows assemble into two quiet columns, industry beside
   theirs, with a short stagger echoing the trail they came from. No verdict. The
   question rows stay tappable so an answer can still be changed from here. */
.gq-cols{margin-top:clamp(20px,3.5vh,34px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(14px,2vw,22px);width:100%;max-width:940px;text-align:left;}
@media(max-width:720px){.gq-cols{grid-template-columns:1fr;}}
.gq-col{border:1px solid #ececeb;border-radius:18px;background:#fff;padding:20px 22px;box-shadow:0 2px 6px -2px rgba(6,12,20,.06);}
.gq-col .hd{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#69707d;}
.gq-col ul{list-style:none;margin:10px 0 0;padding:0;}
.gq-col li{font-size:clamp(14px,1.5vw,16.5px);line-height:1.5;color:#69707d;animation:gq-in .45s ease both;}
.gq-col li.tx{padding:10px 0;display:flex;gap:10px;}
.gq-col li b{font-weight:700;color:#06080d;font-variant-numeric:tabular-nums;}
.gq-col li:nth-child(2){animation-delay:.08s;}
.gq-col li:nth-child(3){animation-delay:.16s;}
.gq-col li:nth-child(4){animation-delay:.24s;}
.gq-col li:nth-child(5){animation-delay:.32s;}
.gq-qr{display:flex;align-items:center;gap:10px;width:100%;min-height:48px;margin:0;padding:8px 10px 8px 0;border:0;border-radius:12px;background:transparent;color:#69707d;font-family:inherit;font-size:inherit;line-height:inherit;text-align:left;cursor:pointer;transition:background .2s ease;}
.gq-qr:hover{background:#f6f6f3;}
.gq-qr:focus-visible{outline:2px solid #059669;outline-offset:2px;}
.gq-qr .you{display:block;margin-top:2px;font-size:12.5px;color:#69707d;}
.gq-fig.gq-fig-col{margin-top:18px;font-size:clamp(44px,6.5vw,96px);}
.gq-col .late{animation:gq-in .45s ease both;animation-delay:.3s;}
.gq-cap-col{margin:10px 0 0;max-width:40ch;font-size:clamp(15px,1.6vw,19px);font-weight:600;letter-spacing:-.02em;line-height:1.45;color:#06080d;}
.gq-covers{margin:12px 0 0;max-width:56ch;font-size:clamp(14.5px,1.6vw,17px);line-height:1.55;color:#69707d;}
.gq-covers b{font-weight:700;color:#06080d;font-variant-numeric:tabular-nums;white-space:nowrap;}
.gq-covers.quiet{color:#69707d;}
.gq-note{margin:16px 0 0;font-size:13px;line-height:1.6;color:#69707d;max-width:62ch;}
.gq-score{margin-top:20px;font-size:14px;line-height:1.5;color:#69707d;}
.gq-close{margin:12px auto 0;max-width:56ch;font-size:clamp(15px,1.7vw,18px);line-height:1.55;color:#69707d;}
/* THE RESULTS MOMENT (eleventh pass). The score lands first at keynote scale and
   counts up; once the count lands the three receipts stagger in beneath it, 120ms
   apart (inline animation-delay per row), and one adaptive line of verdict copy
   rises last. The verdict is ink, not grey: it is the line of the moment. */
.gq-verdict{margin:clamp(14px,2.4vh,22px) auto 0;max-width:44ch;font-size:clamp(16px,1.8vw,20px);font-weight:600;letter-spacing:-.01em;line-height:1.5;color:#06080d;animation:gq-in .45s ease both;animation-delay:.36s;}
/* REDUCED MOTION: no condense, no rise, no stagger, no reveal slide, no chevron
   pulse, no pinned stage and no delayed source: flat stacked flow, everything
   simply there. The count-ups and the gesture capture are killed in JS by the
   matchMedia check; the JS also adds .gq-rel, these rules are the CSS half. */
@media(prefers-reduced-motion:reduce){.gq-tr,.gq-card.anim,.gq-col li,.gq-col .late,.gq-opts.going .gq-opt,.gq-reveal,.gq-cue,.gq-verdict{animation:none;}.gq-h{transition:none;}.gq-stage{position:static;height:auto;min-height:100svh;overflow:visible;}.gq-srcline{opacity:1;transform:none;transition:none;}}
`;

/* The count-up. Runs once per mount, ~900ms ease-out cubic, then holds the final
   string and reports done, which is what arms the scroll advance and lights the
   chevron. Instant when reduced motion is on. Plain text, no aria-live. */
function Fig({
  fig,
  small,
  cls,
  instant,
  onDone,
}: {
  fig: (p: number) => string;
  small?: boolean;
  cls?: string;
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
  return <div className={'gq-fig' + (small ? ' gq-fig-sm' : '') + (cls ? ' ' + cls : '')}>{fig(p)}</div>;
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
     (~350ms, options folding away), 'reveal' (figure owns the screen, HOLDS until
     the reader advances it). manual means the quiet Continue leads this reveal:
     reduced motion, or a pick made by keyboard. advancedRef guards the advance to
     exactly once per reveal; holdRef mirrors "a reveal is held and its count has
     landed" for the gesture listeners; lastAdvRef timestamps each advance for the
     ~700ms momentum debounce; wheelAccRef accumulates wheel delta toward one
     tick; touchRef tracks one swipe per touch. */
  const [step, setStep] = useState<null | 'condense' | 'reveal'>(null);
  const [countDone, setCountDone] = useState(false);
  /* srcOn is the SOURCE BEAT: flips ~400ms after the count lands, fades the
     source line in, lights the chevron and arms the scroll advance. */
  const [srcOn, setSrcOn] = useState(false);
  const [manual, setManual] = useState(false);
  const headRef = useRef<HTMLHeadingElement | null>(null);
  const goRef = useRef<HTMLButtonElement | null>(null);
  const secRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const navved = useRef(false);
  const advancedRef = useRef(false);
  const kbRef = useRef(false);
  const holdRef = useRef(false);
  const lastAdvRef = useRef(0);
  const wheelAccRef = useRef(0);
  const touchRef = useRef<{ y: number; fired: boolean } | null>(null);
  const advRef = useRef<() => void>(() => {});
  /* SCROLL TO THE FINALE (eleventh pass): the steppers advance on scroll like
     every other moment, but inputs stay deliberate. fieldFocusRef is true while
     any stepper control holds focus (the advance never fires then), and
     lastFieldRef timestamps the last interaction with the fields, so a short
     settle window has to pass before the scroll re-arms. */
  const fieldFocusRef = useRef(false);
  const lastFieldRef = useRef(0);
  const fieldsRef = useRef<HTMLDivElement | null>(null);

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

  /* The results moment and the calculator are held screens with no pick of their
     own, so landing on either re-arms the one-advance guard; the ~700ms debounce
     still keeps the wheel momentum that carried the reader in from blowing
     straight through. */
  useEffect(() => {
    if (active === 3 || active === 4) advancedRef.current = false;
  }, [active]);

  const resetFlow = () => {
    setStep(null);
    setCountDone(false);
    setSrcOn(false);
    setManual(false);
  };

  const advance = () => {
    navved.current = true;
    setMoved(true);
    lastAdvRef.current = performance.now();
    wheelAccRef.current = 0;
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
     wheel tick, swipe, advance keys, click and the quiet Continue all land here,
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
    setCountDone(false);
    setSrcOn(false);
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

  /* THE SOURCE BEAT. ~400ms after the count lands the source line fades in, and
     only then do the chevron and the scroll advance arm: the hold includes where
     the number came from, on purpose. Reduced motion gets it instantly, like
     everything else. */
  useEffect(() => {
    if (step !== 'reveal' || !countDone) return;
    if (reduced) {
      setSrcOn(true);
      return;
    }
    const t = setTimeout(() => setSrcOn(true), 400);
    return () => clearTimeout(t);
  }, [step, countDone, reduced]);

  /* THE RESULTS MOMENT arms the same way a reveal does: the score count lands,
     the receipts get their 120ms stagger and the verdict its rise, and only
     then do the chevron and the scroll advance arm, so the moment cannot be
     scrolled through mid-assembly. Reduced motion arms instantly. */
  useEffect(() => {
    if (active !== 3 || !countDone) return;
    if (reduced) {
      setSrcOn(true);
      return;
    }
    const t = setTimeout(() => setSrcOn(true), 800);
    return () => clearTimeout(t);
  }, [active, countDone, reduced]);

  /* SCROLL IS THE ADVANCE, AND SCROLL IS CONTAINED (ninth pass: at the WINDOW,
     with a PIN). While the journey is live (finale not yet reached, reduced
     motion off) the listeners live on the window, because the section-scoped
     listeners of the earlier passes had a hole: a wheel over the fixed nav, or
     momentum that started on the hero, never touched the section and sailed
     past the whole quiz. The grammar now runs in three zones:

     ABOVE THE PIN (the hero still showing): scrolling is native, that scroll IS
     the CTA. A wheel tick big enough to cross the pin lands exactly on it, a
     down key glides to it, and the window scroll clamp snaps back anything,
     momentum, scrollbar drag, anything, that gets past. The stage cannot be
     blown through.

     AT THE PIN (the stage owns the screen): wheel down and swipe up are
     consumed. While a reveal is held AND its source beat has landed, the first
     scroll intent advances: a wheel tick past a small threshold, a touch swipe
     up of 40px, ArrowDown, PageDown, Space or Enter. One gesture is one
     transition; advanceOnce guards each reveal and the ~700ms debounce keeps
     momentum from double-firing. On an unanswered question the gestures are
     consumed and do nothing: answering stays tap, click or keyboard on the
     options. Enter and Space on a real control are left to that control.

     BACK UP AND OUT: wheel up, swipe down and the up keys are left native, so
     the reader can always return to the hero; ArrowScroll bails on the
     quizActive flag, so an up arrow walks back at the browser's own step. The
     nav sheet check (body overflow hidden) leaves the mobile menu alone, and
     if the stage ever scrolls internally (short screens) the capture stands
     down for native scroll. The moment the finale is reached this whole effect
     tears down and the page scrolls normally again, stack-up into sources into
     the closing CTA. */
  const journeyDone = furthest === STAGES - 1;
  useEffect(() => {
    if (reduced || journeyDone) return;
    document.body.dataset.quizActive = '1';
    const sec = secRef.current;
    const stage = stageRef.current;
    const navOpen = () => document.body.style.overflow === 'hidden';
    const rectTop = () => (sec ? sec.getBoundingClientRect().top : 0);
    const pinned = () => rectTop() <= 1;
    const pinY = () => window.scrollY + rectTop();
    const overflowing = () =>
      !!stage && stage.scrollHeight > stage.clientHeight + 2;
    /* ready: a moment is held and armed, the ~700ms advance debounce has
       passed, no stepper field holds focus, and the ~900ms settle window since
       the last field interaction has passed (both stepper guards are inert
       outside the calculator screen; the refs stay false/null/stale
       elsewhere). fieldBusy checks the focus flag AND document.activeElement
       against the fields container, belt and braces, so a focused input
       blocks the advance even if a focus event was ever missed. */
    const fieldBusy = () => {
      if (fieldFocusRef.current) return true;
      const f = fieldsRef.current;
      const a = document.activeElement;
      return !!(f && a && f.contains(a));
    };
    const ready = () =>
      holdRef.current &&
      performance.now() - lastAdvRef.current > 700 &&
      !fieldBusy() &&
      performance.now() - lastFieldRef.current > 900;
    /* THE CLAMP. The one line that makes a hard flick escape-proof: any scroll
       that ends up past the pin while the journey is live is snapped back to
       it, whatever produced it. 'instant', because globals.css sets smooth. */
    const onScroll = () => {
      if (navOpen()) return;
      const py = pinY();
      if (window.scrollY > py + 1) window.scrollTo({ top: py, behavior: 'instant' });
    };
    const onWheel = (e: WheelEvent) => {
      if (navOpen()) return;
      if (!pinned()) {
        const top = rectTop();
        if (e.deltaY > 0 && e.deltaY >= top) {
          e.preventDefault();
          window.scrollTo({ top: pinY(), behavior: 'instant' });
        }
        return;
      }
      if (e.deltaY <= 0) {
        wheelAccRef.current = 0;
        return;
      }
      if (overflowing()) return;
      e.preventDefault();
      if (!ready()) return;
      wheelAccRef.current += e.deltaY;
      if (wheelAccRef.current >= 24) {
        wheelAccRef.current = 0;
        advRef.current();
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      touchRef.current = { y: e.touches[0].clientY, fired: false };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (navOpen()) return;
      if (!pinned()) return;
      const t = touchRef.current;
      if (!t) return;
      const dy = t.y - e.touches[0].clientY;
      if (dy < 0) return;
      if (overflowing()) return;
      e.preventDefault();
      if (t.fired || !ready()) return;
      if (dy > 40) {
        t.fired = true;
        advRef.current();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (navOpen()) return;
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      const onControl =
        !!t && typeof t.closest === 'function' && !!t.closest('button,a,[role=button]');
      if (onControl && (e.key === ' ' || e.key === 'Enter')) return;
      const down = !e.shiftKey && [' ', 'ArrowDown', 'PageDown'].includes(e.key);
      if (!pinned()) {
        if (down) {
          e.preventDefault();
          window.scrollTo({ top: pinY(), behavior: 'smooth' });
        }
        return;
      }
      if (down) {
        e.preventDefault();
        if (ready()) advRef.current();
        return;
      }
      if (e.key === 'Enter' && !e.shiftKey && ready()) advRef.current();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      delete document.body.dataset.quizActive;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
    };
  }, [reduced, journeyDone]);

  const set = (f: Field, next: number) => {
    lastFieldRef.current = performance.now();
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
     Shown only while a QUESTION is open: the results overview carries the same
     receipts itself (so nothing doubles), the calculator screen owns its viewport
     alone, and at the finale the rows assemble into the stack-up. Stage 3, the
     results overview, never gets a receipt row of its own: it IS the receipts. */
  const trail: ReactNode[] = [];
  if (active <= 2) {
    for (let s = 0; s < STAGES - 1; s++) {
      if (s === active || s >= furthest || s === 3) continue;
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
            onClick={() => reopen(4)}
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
            <div
              className="gq-reveal"
              tabIndex={0}
              role="group"
              aria-label="The answer, revealed. Scroll down, or press Enter, to continue."
            >
              <Fig
                fig={q.fig}
                small={q.small}
                instant={reduced}
                onDone={() => setCountDone(true)}
              />
              <p className="gq-line">{q.line}</p>
              {/* The source beat: fades in ~400ms after the count lands, its own
                  quiet moment inside the hold. */}
              <p className={'gq-srcline' + (srcOn ? ' on' : '')}>{q.src}</p>
              {/* The chevron cue: decorative, lights once the source beat has
                  landed, and only while the scroll gestures are actually armed. */}
              {!manual && !journeyDone && (
                <div className={'gq-cue' + (srcOn ? ' on' : '')} aria-hidden="true">
                  <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                    <path
                      d="M2 2l9 8 9-8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              <button
                type="button"
                ref={goRef}
                className={'gq-go' + (manual || journeyDone ? ' vis' : '')}
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
      /* THE RESULTS MOMENT (eighth pass gave it the screen alone; the eleventh
         made it land). The score is the moment: "You called" quiets above it as
         this card's kicker, the count runs up to its "2 of 3" at keynote scale,
         and only once the count lands do the three receipts stagger in beneath,
         120ms apart, with one adaptive line of verdict copy after them. The
         verdict speaks to the score, warm owner voice at every score, no shame
         at zero, and it judges the reader's three GUESSES only, as ever. The
         rows are the same reopen buttons the trail uses. The screen holds like
         a reveal: the chevron and the scroll advance arm only after the
         assembly (see the results-moment effect); reduced motion gets it all
         instantly, with the visible Continue and no gesture capture. No
         aria-live on the count, as ever: a screen reader gets the final text in
         DOM order. */
      const verdict =
        score === 3
          ? 'Three for three. You watch this industry more closely than most owners ever get to.'
          : score === 2
            ? 'Two of three. You know this industry better than most of the people selling to it.'
            : score === 1
              ? 'One of three. The published numbers run ahead of almost everyone who guesses.'
              : 'The published numbers surprised you. They surprise almost everyone, and that is rather the point.';
      return (
        <>
          <h2 className="gq-h quiet" tabIndex={-1} ref={headRef}>
            You called
          </h2>
          <Fig
            cls="gq-fig-score"
            fig={(p) => Math.round(score * p) + ' of 3'}
            instant={reduced}
            onDone={() => setCountDone(true)}
          />
          {countDone && (
            <>
              <div
                className="gq-trail"
                role="group"
                aria-label="Your three answers. Each one is a button that reopens its question."
              >
                {QUESTIONS.map((q, i) => {
                  const picked = picks[q.key];
                  const right = picked === q.answer;
                  return (
                    <button
                      key={q.key}
                      type="button"
                      className="gq-tr"
                      style={reduced ? undefined : { animationDelay: i * 0.12 + 's' }}
                      onClick={() => reopen(i, q.key)}
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
                })}
              </div>
              <p className="gq-verdict">{verdict}</p>
              {!reduced && (
                <div className={'gq-cue' + (srcOn ? ' on' : '')} aria-hidden="true">
                  <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                    <path
                      d="M2 2l9 8 9-8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              <button
                type="button"
                className={'gq-go' + (reduced ? ' vis' : '')}
                onClick={(e) => {
                  e.stopPropagation();
                  advanceOnce();
                }}
              >
                Continue
              </button>
            </>
          )}
        </>
      );
    }

    if (active === 4) {
      return (
        <>
          <h2 className="gq-h" tabIndex={-1} ref={headRef}>
            Now three numbers <span className="g">only you know.</span>
          </h2>
          <p className="gq-sub">
            Rough is fine. The arithmetic happens on your screen and goes nowhere.
          </p>
          {/* SCROLL TO THE FINALE (eleventh pass): the defaults count as
              answers, so the next scroll advances like every other moment. The
              capture handlers keep the inputs deliberate: while any control in
              here holds focus the advance is off, and every interaction
              restarts the ~900ms settle window (see ready() in the gesture
              effect). */}
          <div
            className="gq-fields"
            ref={fieldsRef}
            onPointerDownCapture={() => {
              lastFieldRef.current = performance.now();
            }}
            onFocusCapture={() => {
              fieldFocusRef.current = true;
              lastFieldRef.current = performance.now();
            }}
            onBlurCapture={() => {
              fieldFocusRef.current = false;
              lastFieldRef.current = performance.now();
            }}
          >
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
          {/* The chevron says what the whole page has been saying: the next
              scroll is the advance. It stands down when the gestures do
              (reduced motion, or a reopen after the finale). */}
          {!reduced && !journeyDone && (
            <div className="gq-cue on" aria-hidden="true">
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                <path
                  d="M2 2l9 8 9-8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          {/* The quiet Continue stays for keyboard and reduced-motion readers,
              and shows outright when the gestures are off: reduced motion, or a
              reopen from the finale, where it is the only way back. */}
          <button
            type="button"
            className={'gq-go' + (reduced || journeyDone ? ' vis' : '')}
            onClick={advance}
          >
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
                        <b>{q.stack}</b> {q.line} ({q.src})
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
                  onClick={() => reopen(4)}
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
          Every industry figure above is published research, named right beside it. Your
          column came from you, and stayed on your screen.
        </p>
      </>
    );
  })();

  /* The stage kicker. The quiet line that took over the old h1's orienting role:
     it names where the reader is, inside the card, above its h2. The hero above
     already says "internal draft", so this section stopped repeating it. */
  const kicker =
    active <= 2
      ? 'Question ' + (active + 1) + ' of 3'
      : active === 3
        ? 'Your results'
        : active === 4
          ? 'Your numbers'
          : 'The stack-up';

  /* During a reveal the card itself is also a control: a click or tap anywhere
     on it advances immediately. Outside a reveal these handlers do nothing. The
     refs below mirror render state for the gesture listeners, same pattern as
     doneRef in Fig: holdRef arms them only while a reveal is held and its count
     has landed, advRef always points at the current advanceOnce. */
  const inReveal = active <= 2 && !!picks[QUESTIONS[active].key] && step !== 'condense';
  /* A reveal arms only after its SOURCE BEAT has landed, so the source always
     gets its dwell. The results moment arms the same way, once its count and
     its stagger have assembled (srcOn doubles as that beat). The calculator
     holds from the moment it is active: its own guards, the field-focus check
     and the settle window, live inside ready() in the gesture effect. */
  holdRef.current =
    (inReveal && step === 'reveal' && countDone && srcOn) ||
    (active === 3 && srcOn) ||
    active === 4;
  advRef.current = advanceOnce;

  /* Released: reduced motion (flat stacked flow) or the finale (the page opens
     back up). Either way the stage unpins to normal flow. */
  const released = reduced || journeyDone;

  return (
    <section
      className={'gq' + (released ? ' gq-rel' : '')}
      aria-label="The growth quiz"
      ref={secRef}
    >
      <style>{min(CSS)}</style>
      <div className="gq-stage" ref={stageRef}>
        <div className="gq-wrap">
          {trail.length > 0 && <div className="gq-trail">{trail}</div>}
          <div
            key={active}
            className={'gq-card' + (moved ? ' anim' : '')}
            onClick={() => {
              if (inReveal) advanceOnce();
            }}
          >
            {/* The results card's quiet h2 IS its kicker, so the eye is skipped
                there: one line, one focus target, no doubling. */}
            {active !== 3 && <div className="gq-eye">{kicker}</div>}
            {card}
          </div>
        </div>
      </div>
    </section>
  );
}

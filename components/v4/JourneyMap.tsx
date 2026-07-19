'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { min } from '@/lib/css';

/* The Secret Sauce: one scroll-pinned four-beat film, fully scroll-scrubbed.
 * Get Found (linear climb) -> StayBookt (wheel + blurbs) -> Enjoy Life (continuous
 * cross-dissolve + push-in) -> What it costs (five jobs collapse into one number).
 * Nothing on a timer.
 *
 * BEAT 3 USED TO BE THE GET STARTED CTA CARD. Two changes, July 14 2026 (Jacob):
 *
 * 1. The price moved INTO the film, after Enjoy Life. It briefly lived below the
 *    film as its own timed section and it played too fast, because a timer decides
 *    the pace instead of the reader. In here it is scroll-scrubbed like everything
 *    else, so "too fast" is impossible by construction: the reader sets the pace
 *    with the scroll wheel, and the five jobs arrive exactly as fast as they look.
 *
 * 2. Get Started came OUT of the film and is now a static banner under the track
 *    (see HeroCta). A conversion block should not be a beat you have to scrub
 *    through, and the film now ends on the number, which is the note to end on.
 *
 * Beat 3 also gets a wider slice of the track than it did as a CTA, because five
 * things now have to arrive inside it and then resolve. */

/* Enjoy Life (beat 2) was 24% of the track and went by too fast to read. It is now
 * 32%, and the whole track is longer, so every beat has more room. */
/* TRACK LENGTH — read this before changing any number in this file.
 *
 * Richard navigates with the DOWN ARROW KEY on a desktop. Chrome moves ~40px per press, so
 * the only honest unit for this film is PRESSES, not pixels. He said it three times and I
 * measured the wrong thing twice before I understood him.
 *
 * 620vh was 98 presses. 460vh was 68 at a 757px viewport — but he is on a big monitor, and
 * that is where the real bug was: THE TRACK WAS IN vh, SO A BIGGER SCREEN COST MORE PRESSES.
 * 81 at 900px. 94 at 1050px. Backwards. A bigger screen should never mean more work.
 *
 * Clamped in px, it now costs ~38-46 presses at ANY viewport, and a big monitor costs FEWER
 * because it subtracts more from a fixed track. That is the right shape.
 *
 * "Seems fine if using the scroll bar" is the tell: a drag covers 3,240px in one gesture and
 * hides the toll. The keyboard is the honest test. Test with the arrow key.
 *
 * BEAT BUDGET. Presses are allocated to how much actually CHANGES in a beat, not by feel:
 *   b0 climb      ~7   continuous, nothing discrete
 *   b1 flywheel   ~11  six wheel steps -> one every 1.9 presses
 *   b2 enjoy life ~11  three scenes    -> one every 3.6 presses  (WAS one every 8.6 — this
 *                      was Richard's actual complaint. "After the flywheel type graphic" is
 *                      THIS beat. It took 32% of the film to show three photographs, and its
 *                      cross-dissolve and push-in move ~0.6% per press: real motion, below
 *                      the threshold anyone can perceive. Eight presses of nothing reads as
 *                      a broken page, and he was right to call it.)
 *   b3 the price  ~16  seven pj steps at ~1.2 presses each, then the $199 holds ~7 presses
 *                      while --pjp reveals the terms line. Do not starve this one: the jobs
 *                      arriving IS the payoff. */
const B = [0, 0.16, 0.41, 0.65, 1]; // beat boundaries

/* The five people you cannot hire. Same argument as the FiveSalaries ledger on
 * /pricing, but as a moment instead of a card: they arrive one at a time, hold,
 * then collapse into the one number that replaces all of them. */
/* THESE FIVE MUST BE JOBS WE ACTUALLY DO. It used to say Dispatcher and Bookkeeper,
 * and /whats-included says in plain words that we do not dispatch a crew and are not
 * your bookkeeper. Scheduler and collections clerk are real salaries and are things
 * we genuinely do. Do not put the other two back. */
const PJOBS: { r: string; d: string; ic: string }[] = [
  { r: 'Receptionist', d: 'Answers, every single time', ic: 'phone' },
  { r: 'Scheduler', d: 'Books it, confirms it, reminds them', ic: 'cal' },
  /* WAS "Estimator" (Richard, review, July 2026). We do not estimate. We facilitate:
     we answer a price question from the owner's playbook and we chase the quote THEY
     sent. We do not draft quotes (benched, July 2026). Calling that an estimator claims
     a judgement we do not make and could not deliver.

     Assistant also absorbs the conversational aid, which Richard rightly spotted was
     missing from the five, so it stays at FIVE. That number is not decoration: the whole
     pricing argument on /pricing is "it was never software, it was five salaries." A
     sixth role would quietly break the sentence the price rests on. */
  { r: 'Assistant', d: 'Chases the quote, and answers when you ask', ic: 'quote' },
  { r: 'Collections', d: 'Chases the invoice until it is paid', ic: 'cash' },
  { r: 'Marketer', d: 'Gets you found, asks for the reviews', ic: 'mega' },
];

/* One small line-icon per role, so the five jobs read as a team and not a list.
 * currentColor so the icon inherits the chip's tint. */
function RoleIcon({ id }: { id: string }) {
  const c = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<string, ReactNode> = {
    phone: <path {...c} d="M15.5 13.5c-1.6 1.6-4 .8-5.6-.8-1.6-1.6-2.4-4-.8-5.6l1-1-2.2-2.6-1.2 1.1c-1.9 1.9-1 5.6 1.9 8.5s6.6 3.8 8.5 1.9l1.1-1.2-2.6-2.2-1.1 1z" />,
    cal: <><rect {...c} x="4" y="5" width="16" height="15" rx="2.2" /><path {...c} d="M4 9.5h16M8.5 3.5v3M15.5 3.5v3" /></>,
    quote: <><path {...c} d="M13.5 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9.5z" /><path {...c} d="M13.5 4v5.5H19M9 13.5h6M9 16.5h4" /></>,
    cash: <><rect {...c} x="3" y="7" width="18" height="10" rx="2" /><circle {...c} cx="12" cy="12" r="2.4" /><path {...c} d="M6.5 9.5v0M17.5 14.5v0" /></>,
    mega: <><path {...c} d="M4 10.5v3a1 1 0 0 0 1 1h2l6 3.5V6L7 9.5H5a1 1 0 0 0-1 1z" /><path {...c} d="M17 9a4 4 0 0 1 0 6" /></>,
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">{paths[id]}</svg>
  );
}

const CSS = `
.sscx-track{position:relative;height:clamp(2000px,300vh,2900px);background:#050506;}
/* REDUCED MOTION: collapse the track and unpin the stage. The film resolves to its last
   frame (see the driver) and simply sits there. No 2,000px of scroll to get past a thing
   that is not moving, and nothing scrubs under a reader who asked it not to. */
.sscx-flat{height:auto;}
.sscx-flat .sscx-stage{position:static;height:auto;min-height:0;padding:clamp(60px,8vw,100px) 0;}
/* iOS. 100vh is the LARGE viewport (URL bar hidden), so the pinned stage stood ~86px
   taller than the screen and the beat labels along the bottom sat under Safari's bar.
   100svh is the small viewport, which is the one that is always actually visible. The
   100vh line above it is the fallback for browsers that never heard of svh. On desktop
   the two are identical. NEVER do this to the track: the track's clamp() height is the
   film's entire travel, and in svh it would shrink and the film would collapse. */
.sscx-stage{position:sticky;top:0;height:100vh;height:100svh;min-height:600px;overflow:hidden;display:flex;flex-direction:column;color:#f5f5f7;--acc:#0ea5e9;--cp:0;--o0:1;--o1:0;--o2:0;--lz:0;}
.sscx-stage[data-beat="1"]{--acc:#22d3ee;}
.sscx-stage[data-beat="2"]{--acc:#ffd9a3;}
.sscx-stage[data-beat="3"]{--acc:#f5f5f7;}

/* ENJOY LIFE — full-stage film: continuous cross-dissolve (--oN) + push-in (--lz) */
.sscx-film{position:absolute;inset:0;z-index:0;opacity:0;transition:opacity .7s ease;pointer-events:none;background:linear-gradient(160deg,#1b1408,#0a0f0c 70%);}
.sscx-stage[data-beat="2"] .sscx-film{opacity:1;}
.sscx-film .scene{position:absolute;inset:0;background-size:cover;background-position:center;transform:scale(calc(1.02 + .16 * var(--lz)));}
.sscx-film .e0{opacity:var(--o0);}
.sscx-film .e1{opacity:var(--o1);}
.sscx-film .e2{opacity:var(--o2);}
.sscx-film .grain{position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:overlay;opacity:.08;}
.sscx-film .vig{position:absolute;inset:0;background:radial-gradient(120% 100% at 50% 42%,transparent 40%,rgba(0,0,0,.66));}
.sscx-film .scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,6,8,.55),rgba(0,0,0,.28) 40%,rgba(4,8,6,.9));}
.sscx-film .scrim2{position:absolute;inset:0;background:radial-gradient(62% 42% at 50% 46%,rgba(0,0,0,.46),transparent 72%);}
.sscx-film .whisper{position:absolute;bottom:8%;left:0;right:0;text-align:center;font-size:13px;color:#e6ede7;text-shadow:0 1px 22px rgba(0,0,0,.85);opacity:0;transition:opacity .5s ease;}
.sscx-stage[data-beat="2"] .sscx-film .whisper{opacity:1;}

.sscx-tint{position:absolute;inset:0;z-index:1;transition:opacity .7s ease,background .8s ease;pointer-events:none;background:radial-gradient(80% 55% at 78% 0%,rgba(14,165,233,.16),transparent 60%);}
.sscx-stage[data-beat="1"] .sscx-tint{background:radial-gradient(90% 75% at 50% 0%,rgba(34,211,238,.14),transparent 62%);}
.sscx-stage[data-beat="2"] .sscx-tint{opacity:0;}
.sscx-stage[data-beat="3"] .sscx-tint{background:radial-gradient(80% 60% at 50% 0%,rgba(255,255,255,.05),transparent 62%);}
.sscx-ctabg{position:absolute;inset:0;z-index:0;opacity:0;transition:opacity .7s ease;pointer-events:none;background:radial-gradient(120% 95% at 50% 118%,rgba(16,185,129,.34),transparent 58%),radial-gradient(95% 70% at 50% -12%,rgba(14,165,233,.26),transparent 60%),linear-gradient(180deg,#071a22,#05130e);}
.sscx-stage[data-beat="3"] .sscx-ctabg{opacity:1;}

.sscx-top{position:relative;z-index:3;display:flex;align-items:center;justify-content:center;padding:22px 32px 0;}
.sscx-bars{display:flex;gap:6px;width:100%;max-width:320px;}
.sscx-seg{flex:1;height:2.5px;border-radius:2px;background:rgba(255,255,255,.14);overflow:hidden;}
.sscx-seg i{display:block;height:100%;width:0;background:var(--acc);transition:background .8s;}
.sscx-mid{position:relative;z-index:3;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(10px,2vh,20px);padding:1vh 24px;}
.sscx-phase{font-size:13px;font-weight:700;letter-spacing:.2em;color:var(--acc);text-align:center;transition:color .8s ease,opacity .5s ease;text-shadow:0 1px 18px rgba(0,0,0,.5);}
/* the beat-3 label changes mid-beat (problem -> price), so soften the swap */
.sscx-stage[data-pj="5"] .sscx-phase{opacity:.25;}
.sscx-headwrap{position:relative;text-align:center;width:100%;min-height:2.4em;font-size:clamp(30px,4.8vw,60px);line-height:1.04;}
.sscx-stage[data-beat="3"] .sscx-headwrap{display:none;}
/* THE HAND-OFF. Incoming and outgoing used to share one curve, so for half a second
   both captions were on screen printed on top of each other. That is the sloppiness.
   Now the outgoing caption LEAVES FAST (.24s) and the incoming one ARRIVES LATE
   (.55s, delayed .2s), so the screen is briefly empty rather than briefly doubled. */
.sscx-head{position:absolute;left:0;right:0;top:50%;padding:0 24px;font-size:inherit;font-weight:600;letter-spacing:-.03em;line-height:inherit;opacity:0;transform:translateY(calc(-50% + 12px));transition:opacity .24s ease,transform .24s ease;}
.sscx-stage[data-beat="0"] .h0,.sscx-stage[data-beat="1"] .h1,.sscx-head.on{opacity:1;transform:translateY(-50%);transition:opacity .55s ease .2s,transform .7s cubic-bezier(.16,1,.3,1) .2s;}
.sscx-stage[data-beat="2"] .sscx-head{text-shadow:0 2px 40px rgba(0,0,0,.8);}

/* the line of context under an Enjoy Life caption. Same crossfade pattern as the
   captions: all three are stacked and only the live one is shown. */
.sscx-lifesub{position:relative;width:100%;min-height:3.4em;margin-top:14px;opacity:0;transition:opacity .6s ease;pointer-events:none;}
.sscx-stage[data-beat="2"] .sscx-lifesub{opacity:1;}
.sscx-lifesub p{position:absolute;left:0;right:0;top:0;margin:0 auto;padding:0 24px;max-width:46ch;
  font-size:clamp(14.5px,1.5vw,17px);font-weight:400;line-height:1.5;color:#dbe2dd;
  text-shadow:0 1px 20px rgba(0,0,0,.9);opacity:0;transform:translateY(8px);
  transition:opacity .24s ease,transform .24s ease;}
/* same hand-off as the caption, a beat behind it */
.sscx-lifesub p.on{opacity:1;transform:none;transition:opacity .55s ease .32s,transform .7s cubic-bezier(.16,1,.3,1) .32s;}
@media(max-width:760px){.sscx-lifesub{min-height:5em;}}
.sscx-panels{position:relative;width:100%;height:clamp(320px,46vh,470px);}
.sscx-stage[data-beat="3"] .sscx-panels{height:auto;}
.sscx-p{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.975);transition:opacity .55s ease,transform .55s ease;pointer-events:none;}
.sscx-stage[data-beat="0"] .p0,.sscx-stage[data-beat="1"] .p1,.sscx-stage[data-beat="3"] .p3{opacity:1;transform:none;pointer-events:auto;}
.sscx-stage[data-beat="3"] .p3{position:relative;}

/* SUB-PROGRESS DOTS. The beat-1 set is GONE (Richard: "Where the words are below the
   flywheel graphic there is a floating blue dot that creates confusion with the words. I
   think this should be eliminated."). He is right twice over: bottom:12% put the cyan
   active dot on top of the copy, AND the dots became redundant the moment the orbit ring
   started showing the same six steps continuously. Two progress indicators for one thing,
   one of them sitting on the words.
   The beat-2 set stays: those scenes crossfade and have no ring behind them. */
.sscx-sub{position:absolute;left:0;right:0;bottom:12%;z-index:3;display:flex;gap:9px;justify-content:center;opacity:0;transition:opacity .5s ease;pointer-events:none;}
.sscx-stage[data-beat="2"] .sscx-sub.sub-life{opacity:1;}
.sscx-sub span{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.3);transition:transform .3s ease,background .3s ease;}
.sscx-sub.sub-life span.a{background:#ffd9a3;transform:scale(1.4);}

/* beat 0 — GET FOUND: climb rides scroll continuously via --cp (0..1) */
.b1{width:min(600px,94%);}
.b1 .sb{display:flex;align-items:center;gap:12px;background:#111114;border:1px solid #26262c;border-radius:999px;padding:15px 22px;margin-bottom:18px;}
.b1 .sb span{font-size:16px;color:#d4d4d8;}
.b1 .pack{position:relative;height:356px;}
.b1 .rw{position:absolute;left:0;right:0;height:64px;display:flex;align-items:center;gap:14px;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:0 20px;background:#0a0a0c;transition:box-shadow .5s,border-color .5s,background .5s;}
.b1 .rw .d{width:9px;height:9px;border-radius:50%;background:#555;flex:0 0 auto;}
.b1 .rw .nm{font-size:17px;white-space:nowrap;}
.b1 .rw .mini{margin-left:auto;font-size:13px;color:#6b6b74;}
.b1 .rw.a{top:calc(78px * var(--cp));opacity:.5;}
.b1 .rw.b{top:calc(78px + 78px * var(--cp));opacity:.42;}
.b1 .rw.c{top:calc(156px + 78px * var(--cp));opacity:.34;}
.b1 .rw.tc{top:calc(258px * (1 - var(--cp)));opacity:calc(.4 + .6 * var(--cp));}
.b1 .rw.tc .d{background:#0ea5e9;box-shadow:0 0 11px #0ea5e9;}
.b1 .rw.tc .nm{font-weight:600;}
.b1 .rw.tc .rvw{font-size:13px;color:#ffd479;margin-left:14px;white-space:nowrap;opacity:0;transition:opacity .45s ease;}
.b1 .rw.tc .acts{margin-left:auto;display:flex;gap:8px;opacity:0;transition:opacity .45s ease;}
.b1 .rw.tc .acts .bt{font-size:12.5px;font-weight:700;color:#04150e;background:#0ea5e9;border-radius:999px;padding:7px 15px;}
.b1 .rw.tc .acts .bt.o{background:transparent;color:#0ea5e9;border:1px solid #0ea5e9;}
.b1 .rw.tc .badge{font-size:10.5px;font-weight:700;color:#04150e;background:#0ea5e9;border-radius:999px;padding:5px 11px;opacity:0;transition:opacity .45s ease;}
.b1 .fc{position:absolute;left:0;right:0;bottom:0;text-align:center;font-size:14px;font-weight:600;color:#34d399;opacity:0;transform:translateY(6px);transition:opacity .45s ease,transform .45s ease;}
.sscx-stage[data-s0="1"] .b1 .rw.tc,.sscx-stage[data-s0="2"] .b1 .rw.tc{box-shadow:0 0 36px -6px rgba(14,165,233,.6);border-color:rgba(14,165,233,.6);background:rgba(14,165,233,.10);}
.sscx-stage[data-s0="1"] .b1 .rw.tc .rvw,.sscx-stage[data-s0="2"] .b1 .rw.tc .rvw,.sscx-stage[data-s0="1"] .b1 .rw.tc .badge,.sscx-stage[data-s0="2"] .b1 .rw.tc .badge{opacity:1;}
.sscx-stage[data-s0="2"] .b1 .rw.tc .acts{opacity:1;}
.sscx-stage[data-s0="2"] .b1 .fc{opacity:1;transform:none;}

/* beat 1 — STAYBOOKT: the wheel (everything at a glance) + blurbs that pop on scroll */
.b2{position:relative;width:min(680px,96%);display:flex;flex-direction:column;align-items:center;gap:clamp(14px,2.4vh,24px);}
.b2 svg.orbit{display:block;width:min(430px,88%);height:auto;}
.b2 svg.orbit .ring{fill:none;stroke:#22d3ee;opacity:.75;stroke-dasharray:741.4;
  stroke-dashoffset:calc(741.4 * (1 - var(--sp,0)));transition:stroke-dashoffset .12s linear;}
@media(prefers-reduced-motion:reduce){.b2 svg.orbit .ring{transition:none;}}
.b2 .wbl{position:relative;width:100%;height:clamp(40px,6vh,52px);}
.b2 .wb{position:absolute;left:0;right:0;top:0;text-align:center;font-size:clamp(15px,1.95vw,20px);font-weight:500;letter-spacing:-.01em;color:#d4dae4;opacity:0;transform:translateY(9px);transition:opacity .4s ease,transform .4s ease;}
.sscx-stage[data-beat="1"][data-sc="0"] .b2 .wb0,
.sscx-stage[data-beat="1"][data-sc="1"] .b2 .wb1,
.sscx-stage[data-beat="1"][data-sc="2"] .b2 .wb2,
.sscx-stage[data-beat="1"][data-sc="3"] .b2 .wb3,
.sscx-stage[data-beat="1"][data-sc="4"] .b2 .wb4,
.sscx-stage[data-beat="1"][data-sc="5"] .b2 .wb5{opacity:1;transform:none;}

/* beat 3 — WHAT IT COSTS. The five jobs and the number share ONE space, so the
   number does not appear beside them, it REPLACES them. Driven by data-pj (0..6),
   which is scroll position, not a clock. */
/* The box has to be TALLER than the stack it holds. At 42vh the five jobs came to
   roughly 415px inside a 300px box, so they overflowed top and bottom and
   "Receptionist" collided with the WHAT IT COSTS label above it. */
.b4{position:relative;width:min(760px,94%);min-height:clamp(390px,54vh,520px);display:flex;align-items:center;justify-content:center;text-align:center;}

.pj-jobs{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(6px,1vw,12px);
  transition:opacity .9s ease,transform 1s cubic-bezier(.16,1,.3,1),filter .9s ease;}
.sscx-stage[data-pj="5"] .pj-jobs,.sscx-stage[data-pj="6"] .pj-jobs{opacity:0;transform:scale(.9) translateY(8px);filter:blur(8px);}
.pj-job{opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);
  display:flex;align-items:center;gap:clamp(12px,1.6vw,18px);width:min(340px,86%);margin:0 auto;text-align:left;}
.pj-ic{flex:0 0 auto;width:clamp(42px,4.4vw,52px);height:clamp(42px,4.4vw,52px);border-radius:14px;display:grid;place-items:center;
  color:#5eead4;background:rgba(94,234,212,.08);border:1px solid rgba(94,234,212,.18);box-shadow:inset 0 1px 0 rgba(255,255,255,.06);}
.pj-txt{display:flex;flex-direction:column;min-width:0;}
.sscx-stage[data-pj="0"] .pj0,
.sscx-stage[data-pj="1"] .pj0,.sscx-stage[data-pj="1"] .pj1,
.sscx-stage[data-pj="2"] .pj0,.sscx-stage[data-pj="2"] .pj1,.sscx-stage[data-pj="2"] .pj2,
.sscx-stage[data-pj="3"] .pj0,.sscx-stage[data-pj="3"] .pj1,.sscx-stage[data-pj="3"] .pj2,.sscx-stage[data-pj="3"] .pj3,
.sscx-stage[data-pj="4"] .pj-job,.sscx-stage[data-pj="5"] .pj-job,.sscx-stage[data-pj="6"] .pj-job{opacity:1;transform:none;}
.pj-r{display:block;font-size:clamp(20px,2.6vw,32px);font-weight:600;letter-spacing:-.035em;line-height:1.1;color:#f5f5f7;}
.pj-d{display:block;margin-top:2px;font-size:clamp(12px,1.25vw,14px);color:#8b93a5;}

.pj-num{position:relative;z-index:2;opacity:0;transform:translateY(22px) scale(.94);filter:blur(7px);pointer-events:none;
  transition:opacity 1.1s cubic-bezier(.16,1,.3,1),transform 1.25s cubic-bezier(.16,1,.3,1),filter 1s ease;}
.sscx-stage[data-pj="6"] .pj-num{opacity:1;transform:none;filter:none;pointer-events:auto;}
.pj-fig{display:flex;align-items:flex-start;justify-content:center;gap:2px;color:#fff;font-weight:700;letter-spacing:-.055em;line-height:.88;
  font-size:clamp(86px,14vw,180px);font-variant-numeric:tabular-nums;text-shadow:0 8px 60px rgba(0,0,0,.5);}
.pj-dol{font-size:.34em;font-weight:600;margin-top:.16em;color:#8b93a5;}
.pj-per{align-self:flex-end;margin-bottom:.2em;margin-left:8px;font-size:.13em;font-weight:600;letter-spacing:0;color:#8b93a5;}
.pj-sub{margin:14px auto 0;font-size:clamp(16px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;color:#d7dce4;}
/* THE TERMS LINE RIDES THE TAIL OF BEAT 3. pj saturates at 6 by lp 0.545 and was the only
   thing this beat changed, so the last 45% of it was dead scroll: ~13 arrow presses that
   moved the page and changed nothing. That is what Richard kept hitting.
   (No backticks in this comment: the whole CSS block is a template literal, so a backtick
   here closes the string and the file stops compiling. It cost a build to learn that.)
   --pjp is beat 3's continuous 0..1. The big number still lands at 0.545 and still holds,
   but this line now settles in underneath from 0.60 to 0.88, so the hold has motion and the
   last thing read before the FAQ is the terms. The short linear transition only smooths rAF
   jitter; the reveal itself is scroll position, not a timer. */
.sscx-stage[data-pj="6"] .pj-sub{
  opacity:clamp(0, (var(--pjp,0) - .60) * 3.6, 1);
  transform:translateY(calc(12px * (1 - clamp(0, (var(--pjp,0) - .60) * 3.6, 1))));
  transition:opacity .12s linear, transform .12s linear;
}

/* dots */
.sscx-dots{position:relative;z-index:3;display:flex;gap:24px;justify-content:center;padding:14px 20px 28px;flex-wrap:wrap;}
.sscx-dots span{font-size:12px;font-weight:600;color:#f5f5f7;opacity:.4;transition:opacity .4s;text-shadow:0 1px 14px rgba(0,0,0,.6);}
.sscx-stage[data-beat="0"] .sscx-dots .d0,.sscx-stage[data-beat="1"] .sscx-dots .d1,.sscx-stage[data-beat="2"] .sscx-dots .d2,.sscx-stage[data-beat="3"] .sscx-dots .d3{opacity:1;}

/* Landscape phones and short windows: a 600px floor on a 390px-tall screen pushes the
   stage past the viewport and the pin math skews. Keyed on height, not width, because a
   phone on its side is 844px WIDE. */
@media (max-height:640px){
  .sscx-stage{min-height:0;}
}
@media (prefers-reduced-motion: reduce){
  .sscx-stage *{transition:none !important;}
}
@media (max-width:640px){
  .sscx-top{padding:16px 18px 0;}
  .sscx-dots{gap:14px;}
  .sscx-headwrap{min-height:3.4em;}
  .sscx-panels{height:clamp(300px,46vh,470px);}
  .sscx-sub{bottom:13%;}
  .b1 .sb{padding:12px 18px;}
  .b1 .sb span{font-size:14px;}
  .b1 .pack{height:300px;}
  .b1 .rw{height:56px;padding:0 15px;border-radius:14px;gap:11px;}
  .b1 .rw .nm{font-size:14.5px;}
  .b1 .rw.tc .rvw{display:none;}
  .b1 .rw.tc .acts .bt{padding:6px 11px;font-size:11px;}
  .b1 .rw.a{top:calc(66px * var(--cp));}
  .b1 .rw.b{top:calc(66px + 66px * var(--cp));}
  .b1 .rw.c{top:calc(132px + 66px * var(--cp));}
  .b1 .rw.tc{top:calc(220px * (1 - var(--cp)));}
}
`;

const WHEEL: { lbl: string; blurb: string; dx: number; dy: number; lx: number; ly: number; a: 'start' | 'middle' | 'end' }[] = [
  { lbl: 'Missed call', blurb: '6:47 PM, under a sink. We answered it.', dx: 230, dy: 42, lx: 230, ly: 20, a: 'middle' },
  { lbl: 'Quote to send', blurb: 'Sent Thursday. We chased it until it closed.', dx: 332, dy: 101, lx: 356, ly: 105, a: 'start' },
  { lbl: 'Review to chase', blurb: 'Your best job all month. We asked for the review.', dx: 332, dy: 219, lx: 356, ly: 223, a: 'start' },
  { lbl: 'The day ahead', blurb: 'Your morning brief, before your first coffee.', dx: 230, dy: 278, lx: 230, ly: 306, a: 'middle' },
  { lbl: 'Job to log', blurb: 'Every job on record, without you lifting a finger.', dx: 128, dy: 219, lx: 104, ly: 223, a: 'end' },
  { lbl: 'Visit to book', blurb: 'Booked, confirmed, and on the calendar.', dx: 128, dy: 101, lx: 104, ly: 105, a: 'end' },
];

/* Enjoy Life is not just about leaving the business. Two of these four beats are
 * about the life you get back INSIDE the work: the part you actually love. */
/* ENJOY LIFE. Three scenes, not four (Jacob, July 14 2026).
 *
 * The fourth was a vertical crop of a man with a circular saw, with a product logo
 * visible in it. It cover-cropped badly, it was the sloppiest frame in the film, and
 * it was doing the same job as the craftsman shot. Gone.
 *
 * Each scene now carries a caption AND a line of context, because the captions on
 * their own were pretty and vague. The caption is the feeling. The line underneath
 * is what we actually did to make it possible. */
const LIFE: { img: string; cap: string; sub: string }[] = [
  {
    img: '8623946',
    cap: 'Take the two weeks.',
    sub: 'The phone still gets answered and the jobs still get booked. You are not on call from a beach.',
  },
  {
    img: '3846255',
    cap: 'Back to the part you love.',
    sub: 'The craft, and bringing the next one up. Not the paperwork at nine at night.',
  },
  {
    img: '4835776',
    cap: 'A day that is finally yours.',
    sub: 'Nothing was dropped while you were gone. You read about it tomorrow, in thirty seconds.',
  },
];

export default function JourneyMap() {
  const trackRef = useRef<HTMLElement | null>(null);
  /* The pinned stage, measured by the driver below instead of window.innerHeight. */
  const stageRef = useRef<HTMLDivElement | null>(null);
  /* REDUCED MOTION. The CSS killed the transitions (.sscx-stage * {transition:none}) but the
   * driver kept running, so a reader who asked the OS for less movement still got ~1,800px of
   * pinned, scrubbing film — now SNAPPING between states instead of easing, which is worse
   * than leaving it alone. Bail out of the driver entirely and resolve to the last beat, the
   * same way /how-it-works has always done it (HowItWorks.tsx: `if (reduce) { set --p 1 }`).
   * Unlike RemovalTest, this film already renders every beat's copy into the DOM and hides it
   * with opacity, so screen readers were never locked out here — only the vestibular. */
  const [reduce, setReduce] = useState(false);
  const [beat, setBeat] = useState(0);
  const [cp, setCp] = useState(0);
  const [s0, setS0] = useState(0);
  const [sc, setSc] = useState(0);
  /* Continuous progress THROUGH beat 1. See the driver below: beat 1 was the only beat
     with nothing continuous in it, so most arrow presses landed on nothing. */
  const [sp, setSp] = useState(0);
  const [life, setLife] = useState(0);
  const [lo, setLo] = useState<[number, number, number]>([1, 0, 0]);
  const [lz, setLz] = useState(0);
  const [pj, setPj] = useState(0);
  const [pjp, setPjp] = useState(0);
  const [fills, setFills] = useState<[number, number, number, number]>([0, 0, 0, 0]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReduce(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (reduce) {
      /* Resolve to the end state: the film's last frame, no pin, no scrub. */
      setBeat(3); setCp(1); setS0(2); setSp(1); setSc(5); setLife(2);
      setPj(6); setPjp(1); setLo([0, 0, 1]); setLz(1); setFills([100, 100, 100, 100]);
      return;
    }
    let raf = 0;
    const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
    const POS = [0, 0.5, 1];
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        /* MEASURE THE STAGE, NOT THE WINDOW. window.innerHeight changes by 60-90px as
           iOS Safari's URL bar shows and hides, so progress was divided by a number that
           moved mid-scroll and the pinned film lurched. The sticky stage is the thing that
           is actually pinned, so its rendered height is the real viewport term. */
        const stage = stageRef.current;
        const vh = stage ? stage.offsetHeight : window.innerHeight;
        const total = el.offsetHeight - vh;
        const scrolled = Math.min(Math.max(-r.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        const b = p < B[1] ? 0 : p < B[2] ? 1 : p < B[3] ? 2 : 3;
        const lp = Math.min(Math.max((p - B[b]) / (B[b + 1] - B[b]), 0), 0.9999);
        const climb = b === 0 ? clamp((lp - 0.1) / 0.55) : 1;
        const lifeP = b === 2 ? lp : b < 2 ? 0 : 1;
        setBeat(b);
        setCp(climb);
        setS0(climb > 0.98 ? 2 : climb > 0.7 ? 1 : 0);
        /* THE FILM FELT BROKEN IN BEAT 1 (Richard, review, July 2026: "you have to hit
           down arrow 2x without anything happening which makes it seem like the page is
           stuck or your keyboard is not working").

           He was right, and it was measurable. Beat 1 is 742px of scroll and `sc` was the
           ONLY thing it changed: six discrete steps, so one step every ~124px. A down
           arrow is ~40px. Two presses out of every three moved the page and changed
           nothing on screen, which reads as a dead page, not a slow one.

           Every other beat already had something continuous: beat 0 has the climb, beat 2
           crossfades the scenes, beat 3 counts the jobs in. Beat 1 had nothing. So it gets
           `sp`, a continuous 0..1 through the beat, which fills the orbit ring. Now every
           press moves something, and the six steps land on top of motion instead of
           replacing it. */
        setSp(b === 1 ? lp : b < 1 ? 0 : 1);
        setSc(b < 1 ? 0 : b > 1 ? 5 : Math.min(5, Math.floor(lp * 6)));
        setLife(b < 2 ? 0 : b > 2 ? 2 : Math.min(2, Math.floor(lp * 3)));
        /* pj 0..4 = the jobs arriving · 5 = they collapse · 6 = the number has landed.
           Scroll position, not a timer, so the reader sets the pace. */
        /* The multiplier is FRONT-LOADED on purpose. At 7.4 the number only landed
           at 81% of the beat, which left roughly 190px of scroll with $199 on screen
           before the track ran out: the entire payoff went past in less than a screen.
           At 11 the five jobs are all in by ~36% and the number is up by ~55%, so it
           holds for nearly half the beat. The reveal IS the point. Let it sit there. */
        setPj(b < 3 ? 0 : Math.min(6, Math.floor(lp * 11)));
        /* THE HOLD WAS COSTING 13 DEAD KEYPRESSES. `pj` saturates at 6 once lp >= 6/11
           (0.545), and `pj` was the ONLY thing beat 3 changed. So the last 45% of the beat
           moved the page and changed nothing on screen: the exact failure fixed in beat 1
           one beat earlier, reintroduced by the front-loaded multiplier above.
           Keeping the hold was right, the reveal IS the point. Paying for it with dead
           scroll was not. `pjp` runs continuously through the beat and settles the card, so
           the number still sits there for half the beat and every press still moves
           something. Do not remove this without shortening beat 3. */
        setPjp(b < 3 ? 0 : lp);
        /* Falloff was 3, which made each scene snap in and out. At 1.9 the scenes
           overlap for longer and genuinely dissolve into one another. */
        setLo(POS.map((pp) => clamp(1 - Math.abs(lifeP - pp) * 1.9)) as [number, number, number]);
        setLz(lifeP);
        const seg = (i: number) => clamp((p - B[i]) / (B[i + 1] - B[i])) * 100;
        setFills([seg(0), seg(1), seg(2), seg(3)]);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const stageStyle = {
    '--cp': cp,
    '--sp': sp,
    '--pjp': pjp,
    '--o0': lo[0],
    '--o1': lo[1],
    '--o2': lo[2],
    '--lz': lz,
  } as CSSProperties;

  return (
    <section ref={trackRef} className={`sscx-track${reduce ? ' sscx-flat' : ''}`}>
      <style>{min(CSS)}</style>
      <div ref={stageRef} className="sscx-stage" style={stageStyle} data-beat={beat} data-s0={s0} data-sc={sc} data-life={life} data-pj={pj}>
        {/* ENJOY LIFE — full-stage cinematic film, behind everything */}
        <div className="sscx-film">
          {LIFE.map((l, i) => (
            <div
              key={l.img}
              className={`scene e${i}`}
              style={{ backgroundImage: `url(https://images.pexels.com/photos/${l.img}/pexels-photo-${l.img}.jpeg?auto=compress&cs=tinysrgb&w=1600)` }}
            />
          ))}
          <svg className="grain"><filter id="sscxG"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#sscxG)" /></svg>
          <div className="vig" />
          <div className="scrim" />
          <div className="scrim2" />
          {/* "And a business worth more than ever" is an unprovable valuation claim, and the
              last living piece of the 20% value-share framing. The $420,000 counter and the
              "what is the valuation at the end" FAQ were both removed for exactly this. We
              take no share of what the business is worth, so we do not get to promise it. */}
          <div className="whisper">The work you love, and the life you built it for.</div>
        </div>

        <div className="sscx-tint" />
        <div className="sscx-ctabg" />

        <div className="sscx-top">
          <div className="sscx-bars">
            {fills.map((f, i) => (
              <div className="sscx-seg" key={i}><i style={{ width: `${f}%` }} /></div>
            ))}
          </div>
        </div>

        <div className="sscx-mid">
          <div className="sscx-phase">
            {/* Beat 3's label FLIPS with the reveal. While the five job titles are
                stacking up, the screen is not showing what it costs, it is showing the
                problem: five people you would have to hire. Calling that "WHAT IT COSTS"
                answers a question the reader has not been asked yet and spoils the turn.
                So the label names the problem first (the five people you would otherwise hire),
                and becomes the answer at the exact
                moment the number lands. The label is part of the payoff. */}
            {beat === 0
              ? 'GET FOUND'
              : beat === 1
                ? 'STAYBOOKT'
                : beat === 2
                  ? 'ENJOY LIFE'
                  : pj >= 6
                    ? 'WHAT IT COSTS'
                    : 'THE TEAM YOU’D HAVE TO HIRE'}
          </div>

          <div className="sscx-headwrap">
            <div className="sscx-head h0">Be the one they call.</div>
            <div className="sscx-head h1">You run the business. We run the busywork.</div>
            {LIFE.map((l, i) => (
              <div key={l.cap} className={`sscx-head lc${beat === 2 && life === i ? ' on' : ''}`}>{l.cap}</div>
            ))}
          </div>

          {/* the caption tells you the feeling. this tells you what we did. */}
          <div className="sscx-lifesub" aria-hidden={beat !== 2}>
            {LIFE.map((l, i) => (
              <p key={l.sub} className={beat === 2 && life === i ? 'on' : ''}>{l.sub}</p>
            ))}
          </div>

          <div className="sscx-panels">
            {/* BEAT 0 — GET FOUND */}
            <div className="sscx-p p0">
              <div className="b1">
                <div className="sb">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8a8a90" strokeWidth={2}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
                  <span>plumber near me</span>
                </div>
                <div className="pack">
                  <div className="rw a"><span className="d" /><span className="nm">City Wide Plumbing</span><span className="mini">★ 4.1</span></div>
                  <div className="rw b"><span className="d" /><span className="nm">Drain &amp; Sons</span><span className="mini">★ 3.8</span></div>
                  <div className="rw c"><span className="d" /><span className="nm">Rapid Rooter</span><span className="mini">★ 4.0</span></div>
                  <div className="rw tc">
                    <span className="d" />
                    <span className="nm">Redwater Plumbing</span>
                    <span className="rvw">★ 4.9 &middot; Open now</span>
                    <span className="acts"><span className="bt">Call</span><span className="bt o">Book</span></span>
                    <span className="badge">#1</span>
                  </div>
                  <div className="fc">✓ First call, booked</div>
                </div>
              </div>
            </div>

            {/* BEAT 1 — STAYBOOKT (the wheel + scroll blurbs) */}
            <div className="sscx-p p1">
              <div className="b2">
                <svg className="orbit" viewBox="0 0 460 320" fill="none">
                  <g stroke="rgba(120,140,150,.16)" strokeWidth={1}>
                    {WHEEL.map((w, i) => (
                      <line key={i} x1="230" y1="160" x2={w.dx} y2={w.dy} />
                    ))}
                  </g>
                  <circle cx="230" cy="160" r="118" stroke="rgba(255,255,255,.07)" strokeWidth={1} />
                  {/* The one thing in this beat that moves on EVERY scroll tick. Circumference
                      of r=118 is 741.4, so the dash offset is the beat's progress made visible.
                      Do not remove it without giving this beat something else continuous. */}
                  <circle className="ring" cx="230" cy="160" r="118" strokeWidth={2} strokeLinecap="round" transform="rotate(-90 230 160)" />
                  <circle cx="230" cy="160" r="54" fill="rgba(16,185,129,.09)" stroke="rgba(52,211,153,.45)" strokeWidth={1.4} />
                  <text x="230" y="156" textAnchor="middle" fill="#34d399" fontSize="16" fontWeight="600" fontFamily="-apple-system,sans-serif">You</text>
                  <text x="230" y="174" textAnchor="middle" fill="#7c8a83" fontSize="11" fontFamily="-apple-system,sans-serif">in control</text>
                  {WHEEL.map((w, i) => {
                    const on = i <= sc;
                    const act = i === sc;
                    return (
                      <g key={w.lbl}>
                        {act && <circle cx={w.dx} cy={w.dy} r="13" fill="rgba(34,211,238,.18)" />}
                        <circle cx={w.dx} cy={w.dy} r={act ? 6.5 : 5.5} fill={on ? '#22d3ee' : '#f59e0b'} style={{ transition: 'fill .4s ease' }} />
                        <text x={w.lx} y={w.ly} textAnchor={w.a} fontSize="13.5" fontWeight="600" fontFamily="-apple-system,sans-serif" fill={on ? '#e2e7ef' : '#c99a4a'} style={{ transition: 'fill .4s ease' }}>{w.lbl}</text>
                      </g>
                    );
                  })}
                </svg>
                <div className="wbl">
                  {WHEEL.map((w, i) => (
                    <div key={w.lbl} className={`wb wb${i}`}>{w.blurb}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* BEAT 3 — WHAT IT COSTS. The five people you cannot hire arrive one at
                a time as you scroll, hold, then collapse into the one number that
                replaces all of them. The Get Started CTA that used to live here is now
                a static banner below the film. */}
            <div className="sscx-p p3">
              <div className="b4">
                <div className="pj-jobs" aria-hidden={pj >= 6}>
                  {PJOBS.map((j, i) => (
                    <div className={`pj-job pj${i}`} key={j.r}>
                      <span className="pj-ic"><RoleIcon id={j.ic} /></span>
                      <span className="pj-txt">
                        <span className="pj-r">{j.r}</span>
                        <span className="pj-d">{j.d}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pj-num">
                  <div className="pj-fig">
                    <span className="pj-dol">$</span>199<span className="pj-per">/mo</span>
                  </div>
                  {/* SAID "Cancel any time." full stop. Every other surface on this site says "Cancel
                      any time ON THIRTY DAYS NOTICE" (pricing, the promises, both FAQs, the
                      schema). This was the one place we dropped the qualifier, and it was the
                      loudest place on the site: the beat right under the price.

                      Richard read it as us not really offering cancel-any-time. He was reading
                      it correctly. The terms did not change; this line was overstating them.
                      Do not shorten this again to make it fit. */}
                  <p className="pj-sub">Nothing upfront. Cancel on thirty days notice.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The beat-1 wheel dots were removed: the orbit ring shows the same progress and
            the active dot sat on top of the copy. See the .sscx-sub comment. */}
        {/* Enjoy Life moment dots */}
        <div className="sscx-sub sub-life">
          {LIFE.map((l, i) => (
            <span key={l.img} className={life === i ? 'a' : ''} />
          ))}
        </div>

        <div className="sscx-dots">
          <span className="d0">Get Found</span>
          <span className="d1">StayBookt</span>
          <span className="d2">Enjoy Life</span>
          <span className="d3">What it costs</span>
        </div>
      </div>
    </section>
  );
}

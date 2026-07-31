'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { min } from '@/lib/css';

/* THE REMOVAL TEST — the cinematic core of /long-term.
 *
 * Jacob: "the homepage and how it works have an immersive experience... they do a beautiful
 * job of showing and telling, engaging the user through the page instead of forcing reading."
 * He was right that /long-term was a memo sitting inside a cinematic site: eyebrow, headline,
 * two paragraphs, a table, four times over. Matching type clamps did not fix that and was
 * never going to.
 *
 * THE IDEA. The page argues that owner-dependence is the discount. That is not a sentence,
 * it is a picture: six things a business needs, every one of them wired back to one person.
 * So we draw it, then we take the person out and let the reader watch the lights go off.
 * That darkness IS the discount. Then five wires re-route to StayBookt, the lights come back,
 * and the owner is still connected but no longer load-bearing. Same argument. No reading.
 *
 * NO PHOTOGRAPHY, on purpose (Jacob's call): the only three Pexels IDs in this codebase are
 * spoken for, and this diagram is more on-brand than a seventh stock photo would be.
 *
 * EVERY BEAT HAS A CONTINUOUS VARIABLE. This is not a style preference, it is the bug that
 * cost hours on the homepage film twice: a beat whose only driver is a discrete step makes
 * two arrow presses out of three land on nothing, and the page reads as broken rather than
 * slow. Beat 0 = the pulse travelling the wires. Beat 1 = the owner lifting out + the wires
 * retracting. Beat 2 = the wires redrawing. If you add a beat, give it something continuous
 * or do not add it.
 *
 * TRACK LENGTH. Clamped in PIXELS, not vh — same fix as the homepage film, same reason.
 * Richard navigates with the DOWN ARROW KEY (~40px/press), and a vh track means a BIGGER
 * MONITOR COSTS MORE PRESSES: 360vh was ~50 presses at 900px and ~59 at 1200px. Backwards.
 * Clamped, this is ~32-44 presses at any viewport (was ~22-29 before the opening beat below
 * added its own ~22% of the track) and a big screen still costs fewer.
 * Measure this film in PRESSES, never pixels, and test it with the keyboard — a scrollbar
 * drag covers the whole track in one gesture and hides the cost completely.
 *
 * THE OPENING BEAT (Jul 30 2026). /founders used to run a separate dark text section
 * ("the one fact": eyebrow, headline, paragraph) THEN this film. Two sections trying to
 * look like one — matching background colour, matching glow — kept reading as a seam no
 * matter how closely the glow was tuned, because they WERE two things: two DOM sections,
 * two scroll contexts. Jacob: "make this the opening parallax scene to the animation and
 * have it all look like one unified experience." So the claim is not a section before the
 * film, it is the film's own beat -1: same sticky stage, same track, same driver. There is
 * nothing left to unify because there is nothing left to seam.
 * Its continuous variable is --intro (0 to 1, driven by B0 below): the SVG fades and grows
 * in as the reader moves through the claim, arriving fully drawn exactly as beat 0's pulse
 * starts — the picture materialising as the argument resolves into it. Same rule as every
 * other beat: give it something continuous or do not add it.
 * Its copy deliberately does NOT repeat beat 1's "here is what a buyer sees" framing — the
 * old standalone section made almost that exact point, which is redundant read back to back
 * with beat 1 now that they share one film. The opening line states the stakes and hands off
 * to the diagram ("watch what happens to all six"), it does not pre-empt the buyer beat.
 *
 * THE OPENING BEAT, ROUND 2 (same day). Jacob, after seeing it live: "big bold gradient
 * highlight like a headline essentially then fade into the animation stuff, seamless
 * beautiful transitions." Originally the headline just sat there in plain white while --intro
 * faded the diagram in behind it — correct mechanically, flat as an entrance. Now --intro's
 * own 0-1 range is split into two beats-within-the-beat, both still driven off the one
 * scroll-scrubbed value (nothing new to test, no new discrete state):
 *   --introA = the FIRST half of --intro (0->1, then holds at 1). The claim's payoff clause
 *   gets the exact gradient text-clip the homepage hero uses on its own punchline (var(--sb-
 *   grad), background-clip:text), plus the same radial-gradient bloom the hero's hl2 glows in
 *   with (see .abt .pg-hero .hero-h1 .hl2::before) — same colours, same blur, scroll-driven
 *   instead of keyframed. Headline alone, scaled up, nothing else on screen.
 *   --introB = the SECOND half (0->1). The headline settles back to its normal scale as the
 *   eyebrow, paragraph AND the diagram all fade/grow in together — "fade into the animation
 *   stuff" is literal: --introB is what the SVG's opacity/scale reads now, not raw --intro, so
 *   the diagram doesn't start forming until the headline has already had its moment alone.
 *
 * THE RULE THIS PAGE EXISTS UNDER: no valuation numbers. The lights going out say "worth
 * less" without ever putting a figure on it, which is exactly why the metaphor earns its
 * place. Do not add a counter, a multiple, or a range. */

type Driver = { k: string; you: string; sb: string; x: number; y: number };

/* Short labels live in the SVG. The long copy lives in the HTML panel below it and swaps
   with the beat, which is the same split the beat-1 wheel uses on the homepage. */
const D: Driver[] = [
  { k: 'Keeps running', you: 'Every call lands on your mobile. Up a ladder, it rings out.', sb: 'Answered, booked and followed up whether you are there or not.', x: 96, y: 132 },
  { k: 'They come back', you: 'You mean to call them. You are on a job. You do not.', sb: 'Past customers brought back for the work they are due.', x: 237, y: 84 },
  { k: 'The list is yours', you: 'Your head, your phone, a notebook.', sb: 'Every customer and job in one record. Exported whenever you ask.', x: 378, y: 62 },
  { k: 'Work arrives', you: 'Word of mouth, and whoever happens to call.', sb: 'Found on search, on the map, and when somebody asks an AI.', x: 522, y: 62 },
  { k: 'Reputation', you: 'Four reviews. The newest one is from 2023.', sb: 'A review asked for after every finished job, and every one answered.', x: 663, y: 84 },
  { k: 'Handover', you: 'Only you know the prices, the rules, the history.', sb: 'Written down. That is what the playbook is, and it is yours.', x: 804, y: 132 },
];

const HUB = { x: 450, y: 372 };

/* Cubic from each node down into the hub. Long enough that the retract reads as a wire
   pulling loose rather than a line simply vanishing. */
const path = (d: Driver) =>
  `M ${d.x} ${d.y} C ${d.x} ${d.y + 130}, ${HUB.x} ${HUB.y - 140}, ${HUB.x} ${HUB.y}`;

/* THE PHONE GETS ITS OWN GEOMETRY, not a bigger font.
 *
 * The desktop box is 900 units wide. On a 390px phone that scales to 0.43, so the node labels
 * rendered at about 7px and the core picture of this page read as grey noise. A font bump
 * alone cannot fix it: six nodes strung across 900 units sit ~140 units apart, and type large
 * enough to read at 0.43 is wide enough to collide with its neighbours.
 *
 * So below 760px the film is redrawn in a 420x440 box: three rows of two, hub underneath.
 * A narrower box means a far bigger scale factor, so the SAME picture arrives about 2.3x
 * larger. Nothing about the story changes - six things, all wired to one person, the owner
 * lifts out, the wires re-route. Only where the six sit on the page.
 *
 * Considered and rejected: dropping the in-SVG labels on mobile and listing them as HTML
 * underneath. It reads fine as a list and not at all as a diagram - the whole argument is
 * that these six converge on one point, and a list has no convergence in it.
 *
 * DESKTOP IS UNTOUCHED. D, HUB, path() and the desktop viewBox above are exactly as they
 * were. Everything mobile lives in M / MHUB / mpath / MLEN below. */
const M: Driver[] = D.map((d, i) => ({ ...d, x: i % 2 === 0 ? 110 : 310, y: 56 + Math.floor(i / 2) * 110 }));
const MHUB = { x: 210, y: 380 };
const mpath = (d: Driver) =>
  `M ${d.x} ${d.y} C ${d.x} ${d.y + 70}, ${MHUB.x} ${MHUB.y - 75}, ${MHUB.x} ${MHUB.y}`;

/* Desktop uses one --len (420) for all six because its wires are all roughly that long.
   The mobile wires are not: the bottom row runs ~145 units and the top row ~340, so a shared
   length would make the short wires vanish a third of the way into the retract and come back
   late. Measure each one instead. */
const clen = (d: Driver) => {
  const c: number[][] = [[d.x, d.y], [d.x, d.y + 70], [MHUB.x, MHUB.y - 75], [MHUB.x, MHUB.y]];
  let L = 0, px = c[0][0], py = c[0][1];
  for (let i = 1; i <= 24; i++) {
    const t = i / 24, u = 1 - t;
    const x = u * u * u * c[0][0] + 3 * u * u * t * c[1][0] + 3 * u * t * t * c[2][0] + t * t * t * c[3][0];
    const y = u * u * u * c[0][1] + 3 * u * u * t * c[1][1] + 3 * u * t * t * c[2][1] + t * t * t * c[3][1];
    L += Math.hypot(x - px, y - py); px = x; py = y;
  }
  return Math.round(L) + 6;   // a hair of slack so --wire:1 is fully retracted
};
const MLEN: number[] = M.map(clen);

type Beat = { k: string; h: ReactNode; s: ReactNode; eyebrow?: string };

const BEATS: Beat[] = [
  { k: 'Right now', h: 'Every one of these runs through you.', s: 'Six things decide whether this is a business or a job with a van. Today, all six are wired to one person.' },
  { k: 'Take a week off', h: 'And here is what a buyer sees.', s: 'A buyer is not looking at your van or your tools. They are looking at what happens when you are not standing there.' },
  /* WAS "Five of those wires stop being yours." Richard: "why is it not 6?" Because it was
     simply wrong: setLit relights ALL SIX in beat 2, and beat 0 above says "all six are wired
     to one person". I wrote a number the picture contradicts.
     It now mirrors beat 0 word for word, which is what the drop-the-mic wants: the film opens
     on "Every one of these runs through you" and closes on the exact inverse. */
  { k: 'The difference', h: 'Not one of them runs through you now.', s: 'The lights stay on whether you are on a roof or on a beach. You are still connected, and nothing falls over when you step away.' },
];

/* BEAT -1. The claim the rest of the film proves. Ported from /founders' old standalone
   "one fact" section — see the opening-beat note above for why it lives here now instead. */
const INTRO: Beat = {
  k: 'The claim',
  eyebrow: 'Build long-term wealth, not a job.',
  /* Split like the hero's hl1/hl2: the setup plain, the payoff clause gradient-lit. Only
     .rt-hl and .rt-hl-plain get any special treatment, and only at data-beat="-1" — see the
     "OPENING BEAT, ROUND 2" note above. */
  h: (
    <>
      <span className="rt-hl-plain">If it cannot run without you,</span>
      <span className="rt-hl">there is nothing to hand anyone.</span>
    </>
  ),
  /* Short one-liner, on purpose — the locked hero format (.pg-hero .wrap p.sub) is a single
     nowrap line, not a two-sentence paragraph. "Six things" now lives in the eyebrow's job
     of setting up the picture the diagram itself shows, not repeated in prose here too. */
  s: 'Watch what happens to all six the moment you step out of it.',
};

const B = [0, 0.34, 0.68, 1];
/* Share of the WHOLE track spent on the opening beat before the three beats above begin.
   Everything below that reads B[] keeps reading it unchanged — p is rescaled to p2 first
   (see apply()), so the three-beat math is byte-for-byte what it was before this beat
   existed and inherits none of the new beat's risk. */
const B0 = 0.22;
/* Snap markers for the WHOLE track: intro start, the three old B[] boundaries rescaled into
   the post-intro remainder, and the end. Replaces a bare B.map() for the same reason B0
   exists — B[] alone no longer spans the full track. */
const SNAP = [0, B0, B0 + (1 - B0) * B[1], B0 + (1 - B0) * B[2], 1];
const clamp = (n: number) => Math.min(Math.max(n, 0), 1);

/* The three topics, in order — the orientation HUD reads position off this ("01 / 03 — Right
   now") and renders the jump row. Matches BEATS[].k. */
const CHAPTERS = ['Right now', 'Take a week off', 'The difference'];

const CSS = `
/* --trk grew by 1/(1-B0) (roughly *1.28) so the three original beats keep the exact press
   budget they had before B0's opening beat was added on top — see B0 above. */
.rt-track{position:relative;--trk:clamp(1925px,295vh,2700px);height:var(--trk);background:#050506;}
/* iOS. 100vh is the LARGE viewport (URL bar hidden), so the pinned stage stood ~86px
   taller than the screen and the beat labels along the bottom sat under Safari's bar.
   100svh is the small viewport, which is the one that is always actually visible. The
   100vh line above it is the fallback for browsers that never heard of svh. On desktop
   the two are identical. NEVER do this to the track: the track's clamp() height is the
   film's entire travel, and in svh it would shrink and the film would collapse. */
.rt-stage{position:sticky;top:0;height:100vh;height:100svh;min-height:600px;overflow:hidden;display:flex;
  flex-direction:column;align-items:center;justify-content:center;color:#f5f5f7;
  --p0:0;--lift:0;--wire:0;--intro:0;--introA:0;--introB:0;--acc:#22d3ee;}
/* The HUD accent follows the film: cyan while the lights are the owner's, green once they
   re-route to StayBookt in beat 2. Same colours the wires and nodes already use. */
.rt-stage[data-beat="2"]{--acc:#34d399;}
.rt-stage::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(60% 50% at 50% 8%,rgba(79,70,229,.16),transparent 64%);}

.rt-in{position:relative;z-index:2;width:min(1040px,94%);display:flex;flex-direction:column;align-items:center;gap:clamp(14px,2.4vh,28px);}
/* Fades and grows in across the SECOND half of the opening beat only (--introB 0->1), after
   the headline has had its solo gradient moment on --introA — see "OPENING BEAT, ROUND 2"
   above. Fully drawn the moment beat 0's pulse starts. --introB is pinned at 1 for every other
   beat, so max-height/opacity/scale are all no-ops past the intro, identical to before.
   Floored at 20% opacity / half its box, not 0 — see the "FLOORED, NOT 0-100" note on the
   copy-panel rules below for why nothing in this beat animates from true invisibility. */
.rt-svg{width:100%;height:auto;overflow:visible;transition:none;
  max-height:calc(23vh + 23vh * var(--introB));
  opacity:calc(.2 + .8 * var(--introB));transform:scale(calc(.94 + .06 * var(--introB)));}

/* WIRES. dashoffset is the whole trick: 0 = connected, full = retracted. Beat 0 runs a
   travelling pulse along them so the diagram is alive before anything has happened. */
.rt-w{fill:none;stroke-width:1.6;stroke-linecap:round;}
.rt-w.base{stroke:rgba(255,255,255,.12);}
.rt-w.live{stroke:#22d3ee;stroke-dasharray:var(--len);stroke-dashoffset:calc(var(--len) * var(--wire));
  filter:drop-shadow(0 0 6px rgba(34,211,238,.5));transition:stroke .5s ease;}
.rt-stage[data-beat="2"] .rt-w.live{stroke:#34d399;filter:drop-shadow(0 0 6px rgba(52,211,153,.55));}
.rt-w.pulse{stroke:#a5f3fc;stroke-width:2.6;stroke-linecap:round;opacity:calc(.9 * (1 - var(--wire)));
  stroke-dasharray:26 999;stroke-dashoffset:calc(-1 * var(--len) * var(--p0));}
.rt-stage[data-beat="1"] .rt-w.pulse,.rt-stage[data-beat="2"] .rt-w.pulse{opacity:0;}

/* NODES. Lit is the default state: the point of beat 1 is losing it. */
.rt-n{transition:fill .45s ease,opacity .45s ease;}
.rt-lbl{font-size:13px;font-weight:600;font-family:-apple-system,sans-serif;transition:fill .45s ease;}

/* THE HUB. Lifts and fades on beat 1, driven continuously by --lift so every press moves it. */
/* The hub translated 96px, which pushed it out of the SVG box and onto the copy below.
   52px plus a faster fade: it is gone before it can collide. */
.rt-hub{transform:translateY(calc(52px * var(--lift)));opacity:calc(1 - 1.15 * var(--lift));transition:none;}
.rt-hub-r{fill:rgba(34,211,238,.14);stroke:#22d3ee;stroke-width:1.5;}
.rt-hub-t{font-size:15px;font-weight:700;fill:#e2e7ef;font-family:-apple-system,sans-serif;}
/* WAS opacity:var(--lift), which meant StayBookt faded IN across beat 1 — visible behind
   the owner while the lights were still going out, spoiling the only reveal this film has.
   --lift belongs to the removal. Beat 2 has its own continuous var: --wire runs 1 -> 0 as
   the wires redraw, so (1 - wire) is beat 2's own 0 -> 1. Keep these two separate. */
.rt-sb{opacity:0;transition:none;}
.rt-stage[data-beat="2"] .rt-sb{opacity:calc(1 - var(--wire));}
.rt-sb-r{fill:rgba(52,211,153,.16);stroke:#34d399;stroke-width:1.5;}
.rt-sb-t{font-size:14px;font-weight:700;fill:#d1fae5;font-family:-apple-system,sans-serif;}

/* COPY PANEL */
.rt-copy{text-align:center;max-width:60ch;}
/* Only the opening beat sets copy.eyebrow, so this only ever renders there. Same 13px/700/
   .18em/#69707d as every other eyebrow on the site (globals.css' 11px base is not what
   actually ships anywhere — see .abt .eyebrow, .hjc .eyebrow, etc). */
.rt-kick{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;margin-bottom:8px;}
.rt-h{font-size:clamp(24px,3.4vw,44px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#fff;}
.rt-s{margin:12px auto 0;font-size:clamp(14.5px,1.6vw,18px);line-height:1.5;color:#aeb6c4;max-width:52ch;}

/* THE OPENING BEAT'S TWO-PHASE REVEAL. Scoped to [data-beat="-1"] only — every other beat's
   .rt-kick/.rt-h/.rt-s are untouched by any of this. See "OPENING BEAT, ROUND 2" at the top
   of the file. --introA drives the headline's own solo moment, --introB drives the settle +
   handoff into the diagram (see .rt-svg above).
   FLOORED, NOT 0-100 (same day, round 3): --intro/--introA/--introB all start at exactly 0 the
   ENTIRE time this section is scrolling into view from below — position:sticky means .rt-stage
   is on screen, scrolling up like normal content, for up to a full viewport height BEFORE the
   pin engages and scroll progress through the track starts moving at all. Every one of these
   opacities going to true 0 meant the section rendered as a solid black rectangle for that
   whole approach — Jacob: "now it's just a blank screen." Fixed by never letting anything
   bottom out at invisible: eyebrow/paragraph/diagram floor at 35-45% and the payoff clause
   floors at 55%, softly blurred rather than gone, so there is always something to look at the
   instant the section appears on screen — the --introA/--introB choreography still fully plays
   out once scrolling continues, it just no longer has an invisible starting line. */
/* OPENING BEAT, ROUND 4 (same day). Jacob: "this section should literally act like a header
   section of a page, except in dark mode — same font size, same gradient styling, same
   everything." Round 2/3 invented its own smaller type scale and a scale()-based "big" trick
   instead of just USING the site's one locked hero format (.abt .pg-hero, home/how-it-works/
   founders all share it) — that's why it read as a cramped, bespoke treatment instead of a
   real header. Every rule below is the hero's own values, copied verbatim (font-size clamps,
   the eyebrow pill's exact padding/radius/gradient-border technique, the sub's nowrap sizing),
   recoloured for a dark canvas instead of invented fresh. If the locked hero format changes,
   change it here too. */
.rt-stage[data-beat="-1"] .rt-copy{order:1;max-width:1120px;}
.rt-stage[data-beat="-1"] .rt-svg{order:2;margin-top:clamp(28px,4vw,52px);}
/* THE EYEBROW PILL — identical construction to .abt .pg-hero .wrap .eyebrow: a gradient
   border via the padding-box/border-box double-background trick (border-image can't do this on
   a fully-rounded pill, it ignores border-radius), recoloured for dark: white fill -> #050506
   fill, near-black text -> light text. Floored/faded exactly like round 3, not re-litigated. */
.rt-stage[data-beat="-1"] .rt-kick{display:inline-block;font-size:12.5px;font-weight:700;
  letter-spacing:.15em;text-transform:uppercase;color:#d7dae2;border:1.5px solid transparent;
  border-radius:999px;padding:9px 18px;margin-bottom:0;
  background:linear-gradient(#050506,#050506) padding-box,var(--sb-grad) border-box;
  box-shadow:0 6px 18px -10px rgba(0,0,0,.55);
  opacity:calc(.4 + .6 * var(--introB));transform:translateY(calc(10px * (1 - var(--introB))));transition:none;}
/* THE HEADLINE — hero's own h1 clamp, not a smaller one, and no scale() trick: this IS the
   size, same as every other page's h1. hl1/hl2 are block-level exactly like the hero's, which
   is what stacks them onto two lines without needing an explicit <br/>. */
.rt-stage[data-beat="-1"] .rt-h{margin-top:20px;font-size:clamp(20px,6.4vw,88px);line-height:1.02;
  letter-spacing:-.03em;font-weight:600;transform:none;}
/* NOT white-space:nowrap, unlike the hero's own hl1/hl2 — the hero's copy is always authored
   short enough to fit one line at 88px ("improve lives."); this beat's payoff clause ("there is
   nothing to hand anyone.") is longer and Jacob's copy call, not something to shorten to fit a
   CSS rule. Wraps naturally inside .rt-copy's max-width instead of clipping off the edge. */
.rt-hl-plain,.rt-hl{display:block;}
/* The setup clause just fades up with --introA — no gradient, that's reserved for the payoff,
   same split as the hero's hl1 (plain) / hl2 (gradient/.g). */
.rt-hl-plain{opacity:calc(.45 + .55 * var(--introA));transition:none;}
/* The payoff clause: hero's own .g — var(--sb-grad) text-clip — plus the same radial-gradient
   bloom colours/blur the hero's hl2 glows in with (.abt .pg-hero .hero-h1 .hl2::before),
   scroll-driven off --introA instead of a keyframe delay. */
.rt-hl{position:relative;background:var(--sb-grad);-webkit-background-clip:text;
  background-clip:text;color:transparent;opacity:calc(.55 + .45 * var(--introA));
  filter:blur(calc(6px * (1 - var(--introA))));transition:none;}
.rt-hl::before{content:'';position:absolute;inset:-40% -12%;z-index:-1;pointer-events:none;
  background:radial-gradient(56% 62% at 50% 54%,rgba(16,185,129,.32),rgba(79,70,229,.2) 46%,transparent 72%);
  filter:blur(36px);opacity:calc(.3 + .55 * var(--introA));transform:scale(calc(.85 + .15 * var(--introA)));transition:none;}
/* THE SUB — hero's own sub sizing: nowrap, no ch cap, same clamp. INTRO.s was shortened to a
   true one-liner to fit this (see the "Short one-liner, on purpose" note on INTRO above). */
.rt-stage[data-beat="-1"] .rt-s{margin:22px auto 0;font-size:clamp(13px,3.1vw,21px);line-height:1.4;
  white-space:nowrap;max-width:none;color:#9ba2ae;
  opacity:calc(.4 + .6 * var(--introB));transform:translateY(calc(10px * (1 - var(--introB))));transition:none;}

/* THE LINE THAT LANDS. On beat 1 each dark node gets its "you, today" truth. This is the
   best writing on the page and it used to sit greyed out in a table column. */
.rt-truth{min-height:2.6em;margin-top:6px;font-size:clamp(13.5px,1.4vw,16px);line-height:1.4;color:#a78bfa;font-weight:500;}
.rt-stage[data-beat="2"] .rt-truth{color:#34d399;}

/* ORIENTATION HUD. Same language as the homepage film (JourneyMap sscx-nav): the three topics
   become one navigable index — NN / 03 readout, live topic name, each part jumpable, inactive
   ones dimmed — so the reader knows where they are and that they can move. This replaces both
   the old decorative dot row AND the kicker that used to sit atop the copy panel repeating the
   same word, which is the redundancy Emma flagged as noise (p13). */
/* Hidden during the opening beat: nothing to orient within yet, the three real chapters
   start at beat 0. Fades in rather than popping once the diagram (and beat 0) arrives. */
.rt-nav{display:flex;flex-direction:column;align-items:center;gap:9px;transition:opacity .4s ease;}
.rt-stage[data-beat="-1"] .rt-nav{opacity:0;pointer-events:none;}
.rt-nav-meta{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;justify-content:center;}
.rt-idx{font-size:12px;font-weight:500;letter-spacing:.04em;color:#6b7280;font-variant-numeric:tabular-nums;}
.rt-idx b{color:var(--acc);font-weight:700;transition:color .5s ease;}
.rt-cur{font-size:12px;font-weight:600;letter-spacing:.02em;color:#c9ced8;}
.rt-hint{font-size:11px;color:#5f6672;letter-spacing:.02em;}
@media(max-width:640px){.rt-hint{display:none;}}
.rt-dots{display:flex;gap:clamp(14px,2.4vw,26px);justify-content:center;flex-wrap:wrap;}
.rt-dots button{position:relative;font:inherit;font-size:12px;font-weight:600;color:#f5f5f7;opacity:.34;
  background:none;border:0;padding:5px 2px 8px;cursor:pointer;letter-spacing:.01em;transition:opacity .4s ease;}
.rt-dots button::after{content:'';position:absolute;left:2px;right:2px;bottom:0;height:2px;border-radius:2px;
  background:var(--acc);opacity:0;transform:scaleX(.35);transition:opacity .4s ease,transform .4s ease;}
.rt-dots button:hover{opacity:.72;}
@media(hover:none){.rt-dots button:hover{opacity:.34;}}
.rt-stage[data-beat="0"] .rt-dots .d0,.rt-stage[data-beat="1"] .rt-dots .d1,.rt-stage[data-beat="2"] .rt-dots .d2{opacity:1;}
.rt-stage[data-beat="0"] .rt-dots .d0::after,.rt-stage[data-beat="1"] .rt-dots .d1::after,.rt-stage[data-beat="2"] .rt-dots .d2::after{opacity:1;transform:none;}

@media(max-width:760px){
  /* These sizes are in 420x440 viewBox units, not pixels - see the mobile geometry note
     above. On a 390x844 phone the box lands at scale ~.80, so 21 units is ~17px on glass.
     It was ~7px before. Do not "fix" these numbers by reading them as CSS pixels. */
  .rt-svg{max-height:42vh;}
  .rt-lbl{font-size:21px;}
  .rt-hub-t{font-size:26px;}
  .rt-sb-t{font-size:20px;}
  .rt-dots{gap:14px;}
  .rt-dots button{font-size:11px;}
}
/* Landscape phones and short windows: the min-height floor on a 390px-tall screen pushes
   the stage past the viewport and the pin math skews. Keyed on height, not width, because
   a phone on its side is 844px WIDE. */
@media(max-height:640px){.rt-stage{min-height:0;}}
@media(prefers-reduced-motion:reduce){.rt-hub,.rt-sb{transition:none;}}

/* THE STATIC TWIN. Shown when the reader asked for reduced motion; .sr-only otherwise.
   The track collapses: no 100vh stage, no sticky, no scrub. */
.rt-flat{height:auto;padding:clamp(64px,9vw,110px) 0;}
.rt-flat .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.rt-st-kick{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;margin-bottom:10px;}
.rt-static h3{font-size:clamp(24px,3.4vw,42px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#fff;max-width:18ch;}
.rt-st-lead{margin-top:14px;font-size:16px;line-height:1.6;color:#aeb6c4;max-width:60ch;}
.rt-st-beat{margin-top:clamp(26px,3vw,38px);}
.rt-st-beat h4{font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;color:#fff;}
.rt-st-beat p{margin-top:8px;font-size:16px;line-height:1.6;color:#aeb6c4;max-width:60ch;}
.rt-st-list{margin:clamp(30px,3.6vw,44px) 0 0;padding:0;list-style:none;display:grid;gap:14px;}
.rt-st-list li{font-size:15.5px;line-height:1.6;color:#aeb6c4;max-width:70ch;
  padding-left:16px;border-left:2px solid rgba(255,255,255,.14);}
.rt-st-list b{color:#fff;font-weight:600;}

/* MOBILE SNAP - one swipe, one beat.
   A phone flick with iOS momentum covers 1,000-2,000px, which is most or all of this
   1,500-2,100px track, so the removal test played start to finish in one gesture and the
   lights went out and came back before anyone could see it happen. These four markers sit
   at EXACTLY the three beat boundaries in B plus the end of the travel, so the film
   settles on a beat. They are rendered from B itself and cannot drift from the driver.
   PROXIMITY, NEVER MANDATORY. Mandatory on a track this long traps a reader who is only
   trying to get past the film.
   WebKit bug 243582: iOS suppresses momentum scrolling inside a snap container. That is
   the desired behaviour here, not a bug to route around. Do not "fix" it.
   No scroll-padding-top and no scroll-margin-top, deliberately: the snap target is a
   zero-size marker inside a track whose stage is sticky at top 0 and fills the viewport,
   so nothing can hide under the 64px fixed nav, and offsetting by the nav height would
   only land the film 64px off its own beat boundary.
   DESKTOP IS UNTOUCHED: the snap rules live in the max-width:760px block and nowhere else. */
.rt-snap{position:absolute;left:0;width:0;height:0;pointer-events:none;}
@media (max-width:760px){
  html{scroll-snap-type:y proximity;}
  .rt-snap{scroll-snap-align:start;}
}
`;

export default function RemovalTest({ anchorId }: { anchorId?: string } = {}) {
  const trackRef = useRef<HTMLElement | null>(null);
  /* The pinned stage, measured by the driver below instead of window.innerHeight. */
  const stageRef = useRef<HTMLDivElement | null>(null);
  /* THE FILM IS THE ARGUMENT, SO IT CANNOT BE THE ONLY COPY OF IT.
   * Two people were locked out of this page and it was the same root cause both times:
   *   - reduced motion: the CSS killed the transitions but the driver still ran, so someone
   *     who asked the OS for less movement got ~2,000px of pinned, scrubbing film that now
   *     SNAPPED between states instead of easing. Worse than doing nothing.
   *   - screen readers: only BEATS[beat] was ever mounted, so a linear reader heard beat 0
   *     and moved on. All twelve driver lines — the actual substance, the thing the page says
   *     IS the chart — existed only at a scroll offset they will never reach.
   * One fix for both: a static twin that renders EVERY beat and all twelve lines. Reduced
   * motion shows it and unpins the track; everyone else gets it .sr-only behind the film.
   * If you add a beat, add it to BEATS and it appears in both. Do not conditionally mount
   * copy in this component again. */
  const [reduce, setReduce] = useState(false);
  /* Defaults to FALSE so the server render and the first client render both draw the desktop
     box and React has nothing to complain about. The phone layout arrives on mount. */
  const [mobile, setMobile] = useState(false);
  /* beat starts at -1: the opening claim, before any of the three original beats begin.
     See B0/INTRO above. */
  const [beat, setBeat] = useState(-1);
  const [p0, setP0] = useState(0);
  const [lift, setLift] = useState(0);
  const [wire, setWire] = useState(0);
  const [lit, setLit] = useState(6);
  const [intro, setIntro] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReduce(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width:760px)');
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduce) return;   // reduced motion: no driver, no pin, no scrub.
    /* DAMPED, NOT DIRECT. Same fix as the homepage film, same reason.
       This used to map scroll position straight to state, once per frame. On a phone one
       flick covers most of this track, so the owner lifted out and the wires re-routed
       inside a single gesture and the argument never landed. Scroll now sets a TARGET and
       the RENDERED progress eases toward it every frame; the continuous vars (--p0, --lift,
       --wire) AND the discrete light count all read the eased value, so the film keeps
       moving after the thumb leaves the glass.
       K = 0.12 matches JourneyMap: ~0.4s to settle, and it composes with ArrowScroll's 0.2
       scroll easing rather than double-easing into mush. See the long note in JourneyMap.
       The loop runs only while it is moving, then STOPS. Idle costs nothing. */
    const K = 0.12;
    let raf = 0;
    let running = false;
    let cur = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      /* MEASURE THE STAGE, NOT THE WINDOW. window.innerHeight changes by 60-90px as
         iOS Safari's URL bar shows and hides, so progress was divided by a number that
         moved mid-scroll and the pinned film lurched. The sticky stage is the thing that
         is actually pinned, so its rendered height is the real viewport term. */
      const stage = stageRef.current;
      const vh = stage ? stage.offsetHeight : window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      return total > 0 ? scrolled / total : 0;
    };
    const apply = (p: number) => {
        /* --intro rides the WHOLE track's progress, not just the opening beat's slice, so it
           is already 1 (not clamped-then-stuck) the instant p passes B0 — no separate branch
           needed to hold it there. */
        setIntro(clamp(p / B0));
        if (p < B0) {
          /* THE OPENING BEAT. Nothing has happened yet: hub lit, wires idle, no pulse — the
             exact "before beat 0" state the old code already defaulted to. Only --intro moves. */
          setBeat(-1);
          setP0(0); setLift(0); setWire(0); setLit(6);
          return;
        }
        /* Beyond this point p2 replays the ORIGINAL 0..1 progress across the three beats
           below, byte-for-byte the same math this file has always run — B0 above is the
           only thing that changed, everything past it is untouched. */
        const p2 = (p - B0) / (1 - B0);
        const b = p2 < B[1] ? 0 : p2 < B[2] ? 1 : 2;
        const lp = clamp((p2 - B[b]) / (B[b + 1] - B[b]));
        setBeat(b);
        /* Beat 0: the pulse travels. Beat 1: the owner lifts and the wires retract. Beat 2:
           the wires redraw to StayBookt. Nothing here is a timer, so the reader sets the
           pace, and nothing here is discrete-only, so no press lands on nothing. */
        setP0(b === 0 ? lp : b > 0 ? 1 : 0);
        setLift(b === 0 ? 0 : b === 1 ? lp : 1);
        setWire(b === 0 ? 0 : b === 1 ? lp : 1 - lp);
        /* The lights go out one at a time across beat 1, then come back across beat 2. The
           count is discrete but it rides on top of the continuous retract above. */
        setLit(b === 0 ? 6 : b === 1 ? 6 - Math.min(6, Math.floor(lp * 7)) : Math.min(6, Math.floor(lp * 7)));
    };
    const tick = () => {
      const t = measure();
      const d = t - cur;
      /* 0.0004 of the track is under a pixel: settled, so stop the loop. */
      if (Math.abs(d) < 0.0004) {
        cur = t;
        apply(cur);
        running = false;
        return;
      }
      cur += d * K;
      apply(cur);
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    /* First paint is exact, never eased: a reload halfway down the film must not swoop. */
    cur = measure();
    apply(cur);
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [reduce]);

  /* Jump to a topic. The film is scroll-scrubbed, so it is just a scroll to the beat boundary
     (a hair inside it); the damped driver eases the film into place. No-op under reduced motion,
     where the track is collapsed and every beat is already on one static page. */
  const jumpTo = (i: number) => {
    const el = trackRef.current;
    if (!el || reduce) return;
    const stage = stageRef.current;
    const vh = stage ? stage.offsetHeight : window.innerHeight;
    const total = el.offsetHeight - vh;
    if (total <= 0) return;
    const absTop = el.getBoundingClientRect().top + window.scrollY;
    /* B[i] is a fraction of the post-intro remainder, not of the whole track — rescale by
       B0 the same way apply() does, just inverted. */
    const p = Math.min(B0 + (1 - B0) * (B[i] + 0.02), 0.999);
    window.scrollTo({ top: Math.round(absTop + total * p), behavior: 'smooth' });
  };

  /* --intro's own 0-1 range split at its midpoint into two sub-phases — see "OPENING BEAT,
     ROUND 2" at the top of the file. Derived here, not a separate scroll-driven state: both
     are pure functions of --intro, so there is nothing new for the driver's damping/easing to
     get wrong, only new CSS reading the same eased value differently. */
  const introA = clamp(intro * 2);
  const introB = clamp(intro * 2 - 1);
  const style = { '--p0': p0, '--lift': lift, '--wire': wire, '--intro': intro, '--introA': introA, '--introB': introB } as CSSProperties;
  /* One object so there is exactly one place the two layouts differ. Desktop values are the
     literals that were inline before. */
  const g = mobile
    ? { vb: '0 0 420 440', nodes: M, wire: mpath, len: (i: number) => MLEN[i], hub: MHUB, hubR: 54, hubDy: 8, lblDy: -30, rOn: 11, rOff: 7, halo: 20 }
    : { vb: '0 0 900 430', nodes: D, wire: path, len: (_i: number) => 420, hub: HUB, hubR: 34, hubDy: 5, lblDy: -26, rOn: 9, rOff: 6, halo: 17 };
  const copy = beat === -1 ? INTRO : BEATS[beat];
  /* On beat 1 the truth line follows the light that just went out. On beat 2 it follows the
     one that just came back. Either way it is the node the eye is already on. beat -1 (the
     opening claim) and beat 0 (the pulse, nothing has gone dark yet) both show nothing. */
  const idx = beat <= 0 ? -1 : beat === 1 ? Math.min(5, 6 - lit - 1) : Math.min(5, lit - 1);
  const truth = idx < 0 ? '' : beat === 1 ? D[idx].you : D[idx].sb;

  /* EVERY beat and all twelve driver lines. Shown for reduced motion, .sr-only otherwise.
     This is the whole page in text — if the film vanished tomorrow this would still argue. */
  const Static = () => (
    <div className={reduce ? 'rt-static' : 'sr-only'}>
      <p className="rt-st-kick">{INTRO.eyebrow}</p>
      <h3>{INTRO.h}</h3>
      <p className="rt-st-lead">{INTRO.s}</p>
      {BEATS.map((b) => (
        <div key={b.k} className="rt-st-beat">
          <h4>{b.k}: {b.h}</h4>
          <p>{b.s}</p>
        </div>
      ))}
      <ul className="rt-st-list">
        {D.map((d) => (
          <li key={d.k}>
            <b>{d.k}.</b> Today: {d.you} With StayBookt: {d.sb}
          </li>
        ))}
      </ul>
    </div>
  );

  /* Reduced motion: no track, no pin, no scrub — just the argument, in order. */
  if (reduce) {
    return (
      <section className="rt-track rt-flat" id={anchorId} aria-label="What happens when you take yourself out of the business">
        <style>{min(CSS)}</style>
        <div className="wrap"><Static /></div>
      </section>
    );
  }

  return (
    <section className="rt-track" id={anchorId} ref={trackRef} aria-label="What happens when you take yourself out of the business">
      <style>{min(CSS)}</style>
      {/* SNAP MARKERS. Invisible, zero-size, aria-hidden: snap targets and nothing else.
          Positioned off SNAP (the whole track's boundaries, opening beat included — see B0
          above) so they land on the same boundaries the driver uses, and off --trk so they
          land inside the same track height. The travel is the track minus the pinned stage,
          which is what the driver divides by. The reduced-motion branch returns above this,
          so they never render there. */}
      {SNAP.map((f, i) => (
        <i key={i} aria-hidden="true" className="rt-snap" style={{ top: `calc((var(--trk) - 100svh) * ${f})` }} />
      ))}
      <Static />
      <div ref={stageRef} className="rt-stage" style={style} data-beat={beat} aria-hidden="true">
        <div className="rt-in">
          {/* The stage is aria-hidden and the Static twin above carries every word, so this
              no longer needs role="img". Its old label summarised beats 0-1, named none of
              the six things, and never mentioned the resolution — which is the point of the
              film. A label that describes half a picture is worse than no label on a picture
              that has a text twin. */}
          <svg className="rt-svg" viewBox={g.vb} aria-hidden="true">
            {g.nodes.map((d) => (
              <path key={`b${d.k}`} className="rt-w base" d={g.wire(d)} />
            ))}
            {g.nodes.map((d, i) => {
              const on = beat === 1 ? i >= 6 - lit : beat === 2 ? i < lit : true;
              return (
                <g key={`w${d.k}`} style={{ '--len': g.len(i) } as CSSProperties}>
                  {on && <path className="rt-w live" d={g.wire(d)} />}
                  {beat === 0 && <path className="rt-w pulse" d={g.wire(d)} />}
                </g>
              );
            })}
            {g.nodes.map((d, i) => {
              const on = beat === 1 ? i >= 6 - lit : beat === 2 ? i < lit : true;
              return (
                <g key={d.k}>
                  <circle className="rt-n" cx={d.x} cy={d.y} r={on ? g.rOn : g.rOff}
                          fill={on ? (beat === 2 ? '#34d399' : '#22d3ee') : '#3f3f46'} />
                  {on && <circle cx={d.x} cy={d.y} r={g.halo} fill={beat === 2 ? 'rgba(52,211,153,.16)' : 'rgba(34,211,238,.16)'} />}
                  <text className="rt-lbl" x={d.x} y={d.y + g.lblDy} textAnchor="middle"
                        fill={on ? '#e2e7ef' : '#5c6470'}>{d.k}</text>
                </g>
              );
            })}
            <g className="rt-hub">
              <circle className="rt-hub-r" cx={g.hub.x} cy={g.hub.y} r={g.hubR} />
              <text className="rt-hub-t" x={g.hub.x} y={g.hub.y + g.hubDy} textAnchor="middle">You</text>
            </g>
            <g className="rt-sb">
              <circle className="rt-sb-r" cx={g.hub.x} cy={g.hub.y} r={g.hubR} />
              <text className="rt-sb-t" x={g.hub.x} y={g.hub.y + g.hubDy} textAnchor="middle">StayBookt</text>
            </g>
          </svg>

          <div className="rt-copy">
            {copy.eyebrow && <div className="rt-kick">{copy.eyebrow}</div>}
            <div className="rt-h">{copy.h}</div>
            <div className="rt-s">{copy.s}</div>
            <div className="rt-truth">{truth}</div>
          </div>

          {/* Orientation HUD. The stage is aria-hidden and the Static twin carries every word,
              so these buttons are a pointer affordance only (tabIndex -1, not in the AT tree);
              a keyboard/screen-reader reader gets the linear twin, where jumping is moot. */}
          <div className="rt-nav">
            <div className="rt-nav-meta">
              {/* beat is -1 during the opening claim, but .rt-nav is opacity:0 + pointer-events:
                  none there (see .rt-stage[data-beat="-1"] .rt-nav above) — this text is never
                  actually seen at beat -1, these guards just keep it sane while invisible
                  rather than rendering "00 / 03" or an undefined chapter name. */}
              <span className="rt-idx"><b>{String(Math.max(beat, 0) + 1).padStart(2, '0')}</b> / 03</span>
              <span className="rt-cur">{beat >= 0 ? CHAPTERS[beat] : CHAPTERS[0]}</span>
              <span className="rt-hint">Jump to any part</span>
            </div>
            <div className="rt-dots">
              {CHAPTERS.map((c, i) => (
                <button key={c} type="button" tabIndex={-1} className={`d${i}`} onClick={() => jumpTo(i)}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

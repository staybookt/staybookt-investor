'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

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
 * TRACK LENGTH. 360vh, deliberately shorter than the homepage film's 460vh. This is a
 * supporting page. Roughly 50 arrow presses end to end.
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

const BEATS = [
  { k: 'Right now', h: 'Every one of these runs through you.', s: 'Six things decide whether this is a business or a job with a van. Today, all six are wired to one person.' },
  { k: 'Take a week off', h: 'And here is what a buyer sees.', s: 'Not your van. Not your tools. They are looking at what happens when you are not standing there.' },
  { k: 'The difference', h: 'Five of those wires stop being yours.', s: 'The lights stay on whether you are on a roof or on a beach. You are still connected. You are just not the thing holding it up.' },
];

const B = [0, 0.34, 0.68, 1];
const clamp = (n: number) => Math.min(Math.max(n, 0), 1);

const CSS = `
.rt-track{position:relative;height:360vh;background:#050506;}
.rt-stage{position:sticky;top:0;height:100vh;min-height:600px;overflow:hidden;display:flex;
  flex-direction:column;align-items:center;justify-content:center;color:#f5f5f7;
  --p0:0;--lift:0;--wire:0;}
.rt-stage::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(60% 50% at 50% 8%,rgba(79,70,229,.16),transparent 64%);}

.rt-in{position:relative;z-index:2;width:min(1040px,94%);display:flex;flex-direction:column;align-items:center;gap:clamp(14px,2.4vh,28px);}
.rt-svg{width:100%;height:auto;max-height:46vh;overflow:visible;}

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
.rt-k{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#8a8f98;}
.rt-h{margin-top:10px;font-size:clamp(24px,3.4vw,44px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#fff;}
.rt-s{margin:12px auto 0;font-size:clamp(14.5px,1.6vw,18px);line-height:1.5;color:#aeb6c4;max-width:52ch;}

/* THE LINE THAT LANDS. On beat 1 each dark node gets its "you, today" truth. This is the
   best writing on the page and it used to sit greyed out in a table column. */
.rt-truth{min-height:2.6em;margin-top:6px;font-size:clamp(13.5px,1.4vw,16px);line-height:1.4;color:#f59e0b;font-weight:500;}
.rt-stage[data-beat="2"] .rt-truth{color:#34d399;}

.rt-dots{display:flex;gap:22px;justify-content:center;}
.rt-dots span{font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#f5f5f7;opacity:.32;transition:opacity .4s;}
.rt-stage[data-beat="0"] .rt-dots .d0,.rt-stage[data-beat="1"] .rt-dots .d1,.rt-stage[data-beat="2"] .rt-dots .d2{opacity:1;}

@media(max-width:760px){
  .rt-svg{max-height:38vh;}
  .rt-lbl{font-size:17px;}
  .rt-dots{gap:12px;}
  .rt-dots span{font-size:10px;letter-spacing:.1em;}
}
@media(prefers-reduced-motion:reduce){.rt-hub,.rt-sb{transition:none;}}
`;

export default function RemovalTest() {
  const trackRef = useRef<HTMLElement | null>(null);
  const [beat, setBeat] = useState(0);
  const [p0, setP0] = useState(0);
  const [lift, setLift] = useState(0);
  const [wire, setWire] = useState(0);
  const [lit, setLit] = useState(6);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = el.offsetHeight - vh;
        const scrolled = Math.min(Math.max(-r.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        const b = p < B[1] ? 0 : p < B[2] ? 1 : 2;
        const lp = clamp((p - B[b]) / (B[b + 1] - B[b]));
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
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const style = { '--p0': p0, '--lift': lift, '--wire': wire } as CSSProperties;
  const copy = BEATS[beat];
  /* On beat 1 the truth line follows the light that just went out. On beat 2 it follows the
     one that just came back. Either way it is the node the eye is already on. */
  const idx = beat === 0 ? -1 : beat === 1 ? Math.min(5, 6 - lit - 1) : Math.min(5, lit - 1);
  const truth = idx < 0 ? '' : beat === 1 ? D[idx].you : D[idx].sb;

  return (
    <section className="rt-track" ref={trackRef} aria-label="What happens when you take yourself out of the business">
      <style>{CSS}</style>
      <div className="rt-stage" style={style} data-beat={beat}>
        <div className="rt-in">
          <svg className="rt-svg" viewBox="0 0 900 430" role="img"
               aria-label="Six things a business needs, each wired back to the owner. Take the owner out and they go dark.">
            {D.map((d) => (
              <path key={`b${d.k}`} className="rt-w base" d={path(d)} />
            ))}
            {D.map((d, i) => {
              const on = beat === 1 ? i >= 6 - lit : beat === 2 ? i < lit : true;
              return (
                <g key={`w${d.k}`} style={{ '--len': 420 } as CSSProperties}>
                  {on && <path className="rt-w live" d={path(d)} />}
                  {beat === 0 && <path className="rt-w pulse" d={path(d)} />}
                </g>
              );
            })}
            {D.map((d, i) => {
              const on = beat === 1 ? i >= 6 - lit : beat === 2 ? i < lit : true;
              return (
                <g key={d.k}>
                  <circle className="rt-n" cx={d.x} cy={d.y} r={on ? 9 : 6}
                          fill={on ? (beat === 2 ? '#34d399' : '#22d3ee') : '#3f3f46'} />
                  {on && <circle cx={d.x} cy={d.y} r="17" fill={beat === 2 ? 'rgba(52,211,153,.16)' : 'rgba(34,211,238,.16)'} />}
                  <text className="rt-lbl" x={d.x} y={d.y - 26} textAnchor="middle"
                        fill={on ? '#e2e7ef' : '#5c6470'}>{d.k}</text>
                </g>
              );
            })}
            <g className="rt-hub">
              <circle className="rt-hub-r" cx={HUB.x} cy={HUB.y} r="34" />
              <text className="rt-hub-t" x={HUB.x} y={HUB.y + 5} textAnchor="middle">You</text>
            </g>
            <g className="rt-sb">
              <circle className="rt-sb-r" cx={HUB.x} cy={HUB.y} r="34" />
              <text className="rt-sb-t" x={HUB.x} y={HUB.y + 5} textAnchor="middle">StayBookt</text>
            </g>
          </svg>

          <div className="rt-copy">
            <div className="rt-k">{copy.k}</div>
            <div className="rt-h">{copy.h}</div>
            <div className="rt-s">{copy.s}</div>
            <div className="rt-truth">{truth}</div>
          </div>

          <div className="rt-dots">
            <span className="d0">Right now</span>
            <span className="d1">Take a week off</span>
            <span className="d2">The difference</span>
          </div>
        </div>
      </div>
    </section>
  );
}

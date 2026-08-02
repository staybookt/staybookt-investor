'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Reveal from '@/components/v4/Reveal';
import { START_LINK } from '@/lib/site';

/* THE ANSWER FIELD (Jacob, Aug 2 2026) — take 4 on the homepage hero device.
 *
 * Takes 1-3 all failed the same test: they weren't the third sibling of the winding
 * Journeys map and the fanned About Us polaroids, they were decoration bolted next to a
 * headline. Take 3, "The Clearing" (ruled hairlines that wipe away on load), was live and
 * Jacob killed it on sight: "looks ridiculous... nothing that even comes close to the
 * About Us and Journeys ones." The actual problem, diagnosed against real screenshots of
 * all three pages: Journeys and About Us are PERMANENT, content-carrying objects sitting
 * under the subhead. The Clearing was a one-shot animation that resolved to near-empty
 * space — three faint marks — the only one of the three devices that left nothing behind.
 *
 * This is a dense, permanent field of short reader-facing phrases — what "What You Love"
 * actually means, phrase by phrase — sitting in the same slot the siblings' devices
 * occupy. One phrase is always lit in the brand gradient (auto-cycling through five
 * anchors until the reader touches one, then it follows them). Hover or tap any phrase on
 * desktop and it also rewrites the headline itself: "You built your business to do
 * Saturday mornings." The reader's own reason, set in your gradient, inside your own
 * headline — something neither sibling page can do, because neither one is about the
 * reader.
 *
 * Third grammar, on purpose: Journeys is geography (a path), About Us is photography (an
 * object), this is language. Zero new photography, zero SVG path math — text and CSS.
 *
 * WHY THIS IS ITS OWN CLIENT COMPONENT, NOT LEFT AS PLAIN JSX IN page.tsx: the headline
 * (h1) and the field live ~120px apart in the DOM (subhead + CTA sit between them, same
 * as every sibling page), but they share one piece of state — the active phrase. That
 * only works if both are rendered by the same component. So this file owns the h1,
 * subhead and CTA pill too now (moved here verbatim from page.tsx, same classNames, same
 * CSS in PAGE_CSS — nothing about their styling changed) plus the field below them.
 *
 * MOBILE SAFETY: hl2 is `white-space:nowrap` and its clamp() was tuned tight for the
 * original 14-character "What You Love" (see the hl1 comment in page.tsx history — a
 * +44% length change on that line clipped mid-word at 1549px). Swapped-in phrases can run
 * up to 18 characters, so hl2 gets a per-phrase font-size scale (--hl2Scale, floors at
 * .6) to keep it inside the width the original proved safe down to 320px. And on phones
 * (<768px, checked live via matchMedia, not guessed) the headline never changes at all —
 * only the field lights up. Hover doesn't exist there, and a nowrap headline is exactly
 * the wrong thing to gamble on a screen with no headroom. Verified in Chrome at 375 /
 * 768 / 1024 / 1456 / 1920 before shipping — see the memory file for numbers. */

const DEFAULT_TEXT = 'What You Love';

type Phrase = { text: string; anchor?: boolean };

/* 18 reader phrases, 5 marked anchor (larger, full-ink at rest, and the set the field
 * auto-cycles through in gradient before anyone touches it). Deliberately specific and a
 * little odd rather than generic ("freedom", "balance", "more time") — that genericness is
 * exactly what sank take 1, the icon cluster. All <=18 characters so the headline swap
 * never has to shrink past .78 scale. */
const PHRASES: Phrase[] = [
  { text: 'Saturday mornings', anchor: true },
  { text: 'Actual weekends' },
  { text: 'Dinner, no phone' },
  { text: 'Coaching the team' },
  { text: 'Sleeping past six', anchor: true },
  { text: 'Gym before nine' },
  { text: 'October fishing' },
  { text: 'Real date nights' },
  { text: 'A slow Sunday' },
  { text: 'Quiet coffee' },
  { text: 'My own retirement', anchor: true },
  { text: 'Walking the dog' },
  { text: 'At the recital' },
  { text: 'The finished deck' },
  { text: 'A real vacation', anchor: true },
  { text: 'Watching the game' },
  { text: 'Home by six' },
  { text: 'A day fully off', anchor: true },
];

const ANCHOR_INDICES = PHRASES.reduce<number[]>((acc, p, i) => (p.anchor ? [...acc, i] : acc), []);

function scaleFor(text: string) {
  const base = DEFAULT_TEXT.length; // 14
  return Math.max(0.6, Math.min(1, base / Math.max(text.length, base)));
}

export default function HeroAnswerField() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [displayText, setDisplayText] = useState(DEFAULT_TEXT);
  const [fading, setFading] = useState(false);
  const interactedRef = useRef(false);
  /* BUG FOUND LIVE (Jacob, Aug 2 2026, verified via Chrome JS eval): this used to default to
     `useRef(false)` and only get set correctly inside a useEffect below. A click firing before
     that effect runs — which happens on a fast interaction right after mount, confirmed by
     clicking a phrase 200ms after navigation — silently dropped the headline swap even on a
     real desktop viewport, because applyHeadline() bailed on the still-default `false`. Refs
     don't affect SSR output, only behavior, so it's safe to read window synchronously here:
     no hydration mismatch risk. */
  const isDesktopRef = useRef(typeof window !== 'undefined' ? window.matchMedia('(min-width:768px)').matches : false);
  const swapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width:768px)');
    const update = () => { isDesktopRef.current = mq.matches; };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (interactedRef.current) { clearInterval(id); return; }
      setActiveIndex((prev) => {
        const curPos = ANCHOR_INDICES.indexOf(prev ?? -1);
        const next = ANCHOR_INDICES[(curPos + 1) % ANCHOR_INDICES.length];
        applyHeadline(next);
        return next;
      });
    }, 3400);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyHeadline(i: number) {
    if (!isDesktopRef.current) return;
    setFading(true);
    if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current);
    swapTimeoutRef.current = setTimeout(() => {
      setDisplayText(PHRASES[i].text);
      setFading(false);
    }, 150);
  }

  function select(i: number) {
    interactedRef.current = true;
    setActiveIndex(i);
    applyHeadline(i);
  }

  const hl2Style = { ['--hl2Scale' as string]: scaleFor(displayText) } as CSSProperties;

  return (
    <>
      <Reveal>
        <h1 className="hero-h1">
          <span className="hl1">You built your business to do</span>
          <span className={`hl2${fading ? ' fading' : ''}`} style={hl2Style}>
            <span className="g">{displayText}</span><span className="pd">.</span>
          </span>
        </h1>
      </Reveal>
      <Reveal>
        <p className="sub">Every call, answered. Every invoice, chased.</p>
      </Reveal>
      <Reveal>
        <div className="cta">
          <a href={START_LINK} className="pill pill-white" style={{ padding: '14px 28px', fontSize: 15 }} data-cta="hero">Get Started</a>
        </div>
      </Reveal>
      <Reveal>
        <div className="answer-field">
          <p className="af-cap">What&rsquo;s yours?</p>
          <ul className="af-grid">
            {PHRASES.map((p, i) => (
              <li key={p.text}>
                <button
                  type="button"
                  className={`af-item${p.anchor ? ' anchor' : ''}${activeIndex === i ? ' active' : ''}`}
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
                  onClick={() => select(i)}
                >
                  {p.text}.
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </>
  );
}

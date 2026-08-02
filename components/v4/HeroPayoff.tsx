'use client';

import { useEffect, useRef, useState } from 'react';
import { useStaticFallback } from '@/lib/useReducedMotion';
import { min } from '@/lib/css';

/* THE PAYOFF — standalone section, homepage, replacing the hero-embedded device (takes 1-7,
 * see app/page.tsx for the full history). Three parallel Apple-lens agents were dispatched to
 * independently diagnose why seven rounds inside the hero all failed; without seeing each
 * other's answer, all three landed on the same root cause: this was never a hero decoration,
 * it's a PAYOFF, and a payoff played at t=0 before any promise has been made just reads as
 * decoration. So it gets its own section, its own scroll real estate, and — the second
 * unanimous verdict — it stops being thin-stroke outline SVG. Outline art at this scale reads
 * as a wireframe diagram no matter how it's animated; five FILLED, textured cards with real
 * depth (blur, shadow, rotation, layering) and a FILLED silhouette illustration (not a
 * gradient-stroked line drawing) is what actually reads as crafted.
 *
 * NOTE (round 3, same day): this component is NOT rendered on the homepage anymore. Jacob's
 * own call after seeing it live: "definitely not Apple quality" — the hand-drawn chair
 * silhouette regressed from take 7's line art (a filled shape has nowhere to hide bad
 * proportions the way a stroke outline does) and the notification-card visual language read as
 * generic SaaS dashboard chrome. The photo swap below (round 2) fixed the illustration but not
 * the card chrome. Left in the repo, unrendered, in case the card/timeline concept is useful
 * elsewhere later — do not re-wire this into page.tsx without addressing the card-chrome
 * critique first.
 *
 * THE CONCEPT, kept from take 7 because it was never the problem: five real pain points that
 * hold across home-service owners, real-estate agents and consultants — a missed call, no
 * incoming reviews, an invoice nobody chased, an inbox nobody triaged, no visibility into what
 * is actually working — pile up and are cleared, one at a time, while the payoff (the dock,
 * golden hour, StayBookt's single most-repeated brand image) resolves from a dim, desaturated
 * scene into full warm light underneath them. Concrete artifacts of a Tuesday, not a generic
 * icon legend — the "laundry list" failure mode of an earlier take (the Answer Field).
 *
 * MECHANISM. `position: sticky` + a hand-rolled requestAnimationFrame driver reading scroll
 * position off getBoundingClientRect — the SAME proven pattern as RemovalTest.tsx, not
 * framer-motion's `useScroll`, which was tried on ProductScrub.tsx elsewhere on this exact site
 * and abandoned: it lagged on desktop and rendered copy dark mid-scrub. Track length is
 * clamped in PIXELS, not vh, for the same reason as RemovalTest — Richard reviews by arrow key
 * (~40px/press) and a vh track makes a bigger monitor cost more presses. This film is shorter
 * than RemovalTest's three-beat argument (one continuous idea, five retirements, not three
 * beats), so it's budgeted at roughly 18-22 presses.
 *
 * Reduced motion AND narrow viewports (<820px, useStaticFallback, same hook ProductScrub uses)
 * get a static end-state render: no pin, no scroll driver, cards gone, scene fully lit. */

type Card = {
  id: string;
  time: string;
  title: string;
  body: string;
  kind: 'call' | 'review' | 'invoice' | 'email' | 'report';
  left: string;
  top: string;
  rot: number;
  depth: 0 | 1 | 2; // 0 = front/crisp, 2 = back/blurred
};

const CARDS: Card[] = [
  { id: 'call', time: '7:42 AM', title: 'Missed call', body: '(905) 555-0142 · no voicemail', kind: 'call', left: '15%', top: '8%', rot: -8, depth: 0 },
  { id: 'report', time: '9:00 AM', title: "Last week's numbers", body: 'No idea what actually worked', kind: 'report', left: '47%', top: '2%', rot: -11, depth: 2 },
  { id: 'review', time: '9:15 AM', title: '3-star review', body: '"Called twice, never heard back."', kind: 'review', left: '66%', top: '9%', rot: 6, depth: 1 },
  { id: 'invoice', time: '11:03 AM', title: 'Invoice #1184', body: '$4,280 outstanding · 46 days', kind: 'invoice', left: '27%', top: '24%', rot: -4, depth: 0 },
  { id: 'email', time: '1:20 PM', title: '17 unread', body: '4 are quote requests', kind: 'email', left: '75%', top: '27%', rot: 9, depth: 0 },
];

/* Retirement windows across the track's 0..1 progress. Overlap slightly so the pile clears as
 * a wave, not a metronome. Order follows the clock, not the visual layout — the same "one
 * Tuesday" logic that fixed the Answer Field's laundry-list problem. */
const WINDOWS: Record<string, [number, number]> = {
  call: [0.06, 0.28],
  report: [0.18, 0.4],
  review: [0.32, 0.54],
  invoice: [0.46, 0.68],
  email: [0.6, 0.82],
};

function clamp(n: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, n));
}

function CardArt({ kind }: { kind: Card['kind'] }) {
  if (kind === 'call') {
    return (
      <span className="pc-glyph pc-glyph-call" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path
            d="M6.6 3.5c.6-.2 1.2 0 1.5.6l1.2 2.4c.3.5.2 1.1-.3 1.5L7.8 9.2c1 2.3 2.8 4.1 5.1 5.1l1.2-1.2c.4-.4 1-.5 1.5-.3l2.4 1.2c.6.3.8.9.6 1.5l-.6 1.9c-.2.6-.8 1-1.4.9-5.2-.7-9.4-4.9-10.1-10.1-.1-.6.3-1.2.9-1.4z"
            fill="#06080d"
            fillOpacity=".82"
          />
        </svg>
      </span>
    );
  }
  if (kind === 'review') {
    return (
      <span className="pc-stars" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <svg key={i} viewBox="0 0 20 20" width="12" height="12">
            <path
              d="M10 1.5l2.4 5 5.5.6-4.1 3.7 1.1 5.4L10 13.6l-4.9 2.6 1.1-5.4-4.1-3.7 5.5-.6z"
              fill={i < 1 ? '#e0a23a' : '#06080d'}
              fillOpacity={i < 1 ? 1 : 0.22}
            />
          </svg>
        ))}
      </span>
    );
  }
  if (kind === 'email') {
    return null; // corner-fold handled in CSS, no separate glyph
  }
  if (kind === 'report') {
    return (
      <svg className="pc-spark" viewBox="0 0 120 34" width="120" height="34" aria-hidden="true">
        <path d="M2 10 L26 14 L50 9 L74 20 L98 17 L118 24" fill="none" stroke="#06080d" strokeOpacity=".5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

export default function HeroPayoff() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const staticMode = useStaticFallback();
  const [pv, setPv] = useState<Record<string, number>>({ call: 0, report: 0, review: 0, invoice: 0, email: 0 });
  const [light, setLight] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || staticMode) return;
    const K = 0.14;
    let raf = 0;
    let running = false;
    let cur = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const stage = stageRef.current;
      const vh = stage ? stage.offsetHeight : window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      return total > 0 ? scrolled / total : 0;
    };
    const apply = (p: number) => {
      const next: Record<string, number> = {};
      for (const k of Object.keys(WINDOWS)) {
        const [a, b] = WINDOWS[k];
        next[k] = clamp((p - a) / (b - a));
      }
      setPv(next);
      // Scene brightens across the whole track and holds fully lit for the last stretch.
      setLight(clamp(p / 0.88));
    };
    const tick = () => {
      const t = measure();
      const d = t - cur;
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
    cur = measure();
    apply(cur);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [staticMode]);

  const cardStyle = (c: Card): React.CSSProperties => {
    const p = staticMode ? 1 : pv[c.id] ?? 0;
    const gone = p; // 0 = fully present, 1 = fully retired
    return {
      left: c.left,
      top: c.top,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ['--rot' as any]: `${c.rot}deg`,
      opacity: 1 - gone,
      transform: `translate(-50%,-50%) rotate(${c.rot + gone * (c.rot > 0 ? 10 : -10)}deg) translateY(${-gone * 70}px) scale(${1 - gone * 0.12})`,
      filter: `blur(${gone * 5}px)`,
    };
  };

  return (
    <section className="pf-track" ref={trackRef} aria-label="What StayBookt clears off your day">
      <style>{min(CSS)}</style>
      <div className="pf-stage" ref={stageRef}>
        <div className="pf-scene" style={{ ['--light' as never]: staticMode ? 1 : light }}>
          {/* THE REAL PHOTO, NOT AN ILLUSTRATION (round 2, same day). Jacob's read on the
              CSS-drawn chair silhouette: "definitely not Apple quality" — correct, and the
              specific failure was predictable in hindsight. A filled silhouette built from
              rounded rects has nowhere to hide its proportions the way a stroke outline does;
              it read as two grey headrests, a regression from take 7's line art, not an
              improvement. Hand-illustrating this site's signature image was never going to
              out-craft the actual photograph of it. Same closer-dock.jpg used as the default
              HeroCta close and half of About Us's polaroid roll — not new photography, the
              site's single most-loved asset, finally given real weight as the section's
              literal payoff instead of a small closing photo. Graded from dim/desaturated at
              rest to full color as the cards clear, via CSS filter, so the "light coming on"
              beat survives without a hand-drawn sun/sky standing in for a real one. */}
          <img className="pf-photo" src="/closer-dock.jpg" alt="" aria-hidden="true" />
          <div className="pf-vignette" />
        </div>

        <div className="pf-caption">
          <span>One Tuesday.</span>
        </div>

        {!staticMode && (
          <div className="pf-pile" aria-hidden="true">
            {CARDS.map((c) => (
              <div key={c.id} className={`pf-card pf-d${c.depth} pf-k-${c.kind}`} style={cardStyle(c)}>
                <div className="pf-cardhead">
                  <CardArt kind={c.kind} />
                  <span className="pf-time">{c.time}</span>
                </div>
                <div className="pf-title">{c.title}</div>
                <div className="pf-body">{c.body}</div>
                {c.kind === 'invoice' && <div className="pf-torn" />}
                {c.kind === 'email' && <div className="pf-fold" />}
              </div>
            ))}
          </div>
        )}

        {staticMode && (
          <div className="pf-static-note">
            <span>Every missed call, every unread inbox, every invoice nobody chased — cleared. This is the life you get back.</span>
          </div>
        )}
      </div>
    </section>
  );
}

const CSS = `
.pf-track{position:relative;--trk:clamp(1150px,150vh,1650px);height:var(--trk);background:#f6f6f3;}
@media(max-width:819px){.pf-track{height:auto;}}
.pf-stage{position:sticky;top:0;height:100vh;height:100svh;min-height:600px;overflow:hidden;
  display:flex;align-items:center;justify-content:center;}
@media(max-width:819px){.pf-stage{position:static;height:auto;min-height:0;padding:clamp(50px,10vw,90px) 0;}}

.pf-scene{position:absolute;inset:0;overflow:hidden;background:#0b0d10;}
.pf-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 12%;
  filter:saturate(calc(.15 + var(--light,0) * .95)) brightness(calc(.6 + var(--light,0) * .5))
    contrast(calc(1.02 + var(--light,0) * .04));
  transform:scale(calc(1.08 - var(--light,0) * .04));
  transition:filter .2s linear,transform .2s linear;}
.pf-vignette{position:absolute;inset:0;
  background:radial-gradient(120% 90% at 50% 60%,rgba(6,8,13,0) 40%,rgba(6,8,13,.55) 100%);
  opacity:calc(1 - var(--light,0) * .55);transition:opacity .2s linear;pointer-events:none;}

.pf-caption{position:absolute;left:0;right:0;bottom:clamp(28px,5vh,56px);text-align:center;
  font-family:var(--font-voice,Georgia,serif);font-style:italic;font-size:clamp(16px,2vw,20px);
  color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.35);opacity:.85;pointer-events:none;}

.pf-pile{position:absolute;inset:0;}
.pf-card{position:absolute;width:min(230px,62vw);background:rgba(255,255,255,.86);
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border:1px solid rgba(255,255,255,.6);border-radius:14px;padding:14px 16px 16px;
  box-shadow:0 26px 54px -20px rgba(6,12,20,.45),0 2px 6px rgba(6,12,20,.08);
  will-change:transform,opacity,filter;}
.pf-d0{z-index:3;}
.pf-d1{z-index:2;opacity:.94;}
.pf-d2{z-index:1;filter:blur(1px);opacity:.82;}
.pf-cardhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.pf-glyph{display:inline-flex;}
.pf-time{font-size:10.5px;font-weight:700;letter-spacing:.04em;color:#8a8f98;}
.pf-title{font-size:14px;font-weight:700;color:#06080d;line-height:1.25;}
.pf-body{margin-top:3px;font-size:12px;color:#5c6470;line-height:1.4;}
.pf-stars{display:inline-flex;gap:1px;}
.pf-spark{display:block;margin-top:2px;}

.pf-k-invoice{padding-bottom:22px;}
.pf-torn{position:absolute;left:0;right:0;bottom:0;height:10px;background:#f6f6f3;
  clip-path:polygon(0% 0%,4% 100%,9% 0%,14% 100%,19% 0%,24% 100%,29% 0%,34% 100%,39% 0%,
    44% 100%,49% 0%,54% 100%,59% 0%,64% 100%,69% 0%,74% 100%,79% 0%,84% 100%,89% 0%,
    94% 100%,100% 0%,100% 100%,0% 100%);}
.pf-fold{position:absolute;top:0;right:0;width:20px;height:20px;
  background:linear-gradient(135deg,rgba(6,12,20,0) 48%,rgba(6,12,20,.14) 50%,#f6f6f3 52%);
  border-top-right-radius:14px;}

.pf-static-note{position:relative;z-index:2;max-width:520px;margin:0 auto;padding:0 24px;
  text-align:center;font-size:clamp(15px,2vw,18px);line-height:1.5;color:#fff;
  text-shadow:0 2px 14px rgba(0,0,0,.4);}

@media(max-width:819px){
  .pf-scene{position:relative;height:clamp(280px,54vw,360px);border-radius:20px;overflow:hidden;}
  .pf-photo{filter:none;transform:none;}
  .pf-vignette{opacity:.15;}
  .pf-caption{position:static;margin-top:18px;color:#06080d;text-shadow:none;}
  .pf-static-note{color:#06080d;text-shadow:none;margin-top:14px;}
}
`;

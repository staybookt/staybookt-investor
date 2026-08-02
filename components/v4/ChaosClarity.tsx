'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { min } from '@/lib/css';

/* THE BIG IDEA, stated visually — new section, homepage, between the hero and HomeJourney
 * (Jacob, Aug 2 2026, immediately after round 3 shipped): "something more unique, more tech,
 * more iconography, more morphing — chaos to clarity — the journeys example is absolutely top
 * tier, simple, clear, shows not tells."
 *
 * This is NOT another attempt at HeroPayoff.tsx's rejected build. That build failed for two
 * specific, diagnosed reasons: a hand-drawn CSS chair silhouette that read as "grey headrests"
 * (a filled shape has nowhere to hide bad proportions), and white glass notification cards that
 * read as generic SaaS dashboard chrome, not Apple. The PILE concept itself — five real problems,
 * scattered, resolving — was never the problem. This reuses that concept but resolves it into
 * AdminScene's exact checklist chrome from HomeJourney.tsx (proven, already shipped, never
 * flagged) instead of inventing new card styling or hand-drawn art.
 *
 * MECHANISM: the same on-view stagger every scene in HomeJourney.tsx already uses — one
 * IntersectionObserver toggling a single `.on` class, CSS transitions doing the rest. NOT a
 * pinned scroll-scrub, NOT a hand-rolled rAF driver. That mechanism class (sticky + rAF) is
 * exactly what ProductScrub.tsx abandoned ("lagged on desktop, rendered copy dark mid-scrub")
 * and what this session's own HeroPayoff.tsx inherited without complaint — it was never the
 * risk. The five problem-rows live in ONE fixed DOM position (their clarity slot, inside a
 * single checklist card); each row is displaced FROM that slot via a CSS transform pre-`.on`
 * (translate/rotate/scale, scattered and slightly spilling past the card's edges) and snaps
 * home when `.on` lands. No absolute-position juggling, no JS-driven per-frame math — a pure
 * transform reset, which is the one thing CSS reliably animates well.
 *
 * The five rows are the same five pain points locked in earlier this session and already
 * proven on the page: missed call, unread inbox, no reviews, unpaid invoice, no visibility
 * into what's working. Concrete artifacts, not a generic icon legend. */

type Row = {
  id: string;
  label: string;
  before: string;
  after: string;
  dx: number; // scattered offset, px
  dy: number;
  rot: number; // degrees
};

const ROWS: Row[] = [
  { id: 'call', label: 'Missed call', before: '(905) 555-0142 · no voicemail', after: 'Answered before it hits voicemail', dx: -78, dy: -54, rot: -9 },
  { id: 'inbox', label: '17 unread', before: '4 are quote requests', after: 'Sorted, quotes flagged, nothing sits', dx: 84, dy: -20, rot: 7 },
  { id: 'review', label: 'No reviews this month', before: 'Nobody asked', after: 'Asked for, answered, working for you', dx: -66, dy: 22, rot: -6 },
  { id: 'invoice', label: 'Invoice #1184', before: '$4,280 outstanding · 46 days', after: 'Followed up until it is paid', dx: 90, dy: 64, rot: 8 },
  { id: 'report', label: "This week's numbers", before: 'No idea what actually worked', after: 'Sent to your phone, before you ask', dx: -54, dy: 108, rot: -7 },
];

const IC = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const ICONS: Record<string, ReactNode> = {
  call: <path {...IC} d="M15.5 13.5c-1.6 1.6-4 .8-5.6-.8-1.6-1.6-2.4-4-.8-5.6l1-1-2.2-2.6-1.2 1.1c-1.9 1.9-1 5.6 1.9 8.5s6.6 3.8 8.5 1.9l1.1-1.2-2.6-2.2-1.1 1z" />,
  inbox: <><path {...IC} d="M4 6h16v12H4z" /><path {...IC} d="M4 6l8 7 8-7" /></>,
  review: <path {...IC} d="M12 3.5l2.5 5.2 5.7.6-4.2 3.9 1.1 5.6L12 15.9l-5.1 2.9 1.1-5.6-4.2-3.9 5.7-.6z" />,
  invoice: <><path {...IC} d="M6.5 3.5h8L18.5 8v12.5h-12z" /><path {...IC} d="M14.5 3.5v4.5H19M9 12.5h6M9 15.5h6" /></>,
  report: <path {...IC} d="M3 19 7 12 11 15 15 8 21 12" />,
};

export default function ChaosClarity() {
  const secRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) el.classList.add('on'); }),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="cc" ref={secRef}>
      <style>{min(CSS)}</style>
      <div className="wrap cc-wrap">
        <div className="cc-head">
          <div className="eyebrow">The big idea</div>
          <h2>
            <span className="hl">From chaos</span>
            <span className="hl g">to clarity.</span>
          </h2>
          <p>
            Every missed call, unread inbox, and unpaid invoice is time that isn&rsquo;t going
            toward growing the business. We clear it, so what&rsquo;s left is the work you love
            and the revenue that grows it.
          </p>
        </div>

        <div className="cc-card" aria-hidden="true">
          <div className="cc-top">While you were out</div>
          <div className="cc-list">
            {ROWS.map((r, i) => (
              <div
                className="cc-row"
                key={r.id}
                style={{ '--dx': `${r.dx}px`, '--dy': `${r.dy}px`, '--rot': `${r.rot}deg`, '--i': i } as CSSProperties}
              >
                <span className="cc-ic"><svg width="18" height="18" viewBox="0 0 24 24">{ICONS[r.id]}</svg></span>
                <span className="cc-txt">
                  <b>{r.label}</b>
                  <i className="cc-before">{r.before}</i>
                  <i className="cc-after">{r.after}</i>
                </span>
                <span className="cc-chk">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.cc{background:#f6f6f3;padding:clamp(70px,10vw,120px) 0 clamp(40px,6vw,64px);overflow:visible;}
.cc-wrap{max-width:820px;margin:0 auto;padding:0 clamp(20px,4vw,32px);}
.cc-head{text-align:left;max-width:640px;}
.cc-head .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.cc-head h2{margin-top:14px;font-size:clamp(30px,4.4vw,54px);font-weight:600;letter-spacing:-.03em;line-height:1.04;}
.cc-head h2 .hl{display:block;color:var(--v4-ink,#06080d);}
.cc-head h2 .hl.g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.cc-head p{margin-top:16px;font-size:clamp(16px,1.9vw,20px);color:#69707d;line-height:1.6;max-width:52ch;}

.cc-card{position:relative;margin:clamp(48px,7vw,80px) auto 0;max-width:520px;background:#fff;
  border-radius:20px;border:1px solid #ececf0;box-shadow:0 44px 90px -44px rgba(0,0,0,.4);
  padding:22px 24px 24px;overflow:visible;}
.cc-top{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8a8f98;}
.cc-list{margin-top:16px;display:flex;flex-direction:column;gap:16px;}

/* Each row lives in its clarity slot in the DOM; pre-.on it is displaced via transform to a
   scattered, slightly-tilted position (spilling a little past the card's own edges on purpose —
   the mess is meant to look like it does not fit in one tidy place yet) and settles home when
   the section's single IntersectionObserver adds .on. Same class of animation as .jstop/.gf/.rp
   elsewhere on this page: transform + opacity, transitioned, nothing scroll-driven. */
.cc-row{display:flex;align-items:flex-start;gap:12px;padding:10px 12px;border-radius:12px;
  background:#fff;box-shadow:0 14px 30px -18px rgba(6,12,20,.28);
  transform:translate(var(--dx),var(--dy)) rotate(var(--rot)) scale(.95);
  opacity:.88;filter:blur(1.5px);
  transition:transform .8s cubic-bezier(.16,1,.3,1),opacity .6s ease,filter .6s ease,box-shadow .6s ease;
  transition-delay:calc(var(--i) * .09s);position:relative;z-index:1;}
.cc.on .cc-row{transform:none;opacity:1;filter:blur(0);box-shadow:none;}
.cc-ic{flex:0 0 auto;width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;
  background:rgba(79,70,229,.1);color:#4338ca;margin-top:1px;}
.cc-txt{display:flex;flex-direction:column;min-width:0;flex:1;}
.cc-txt b{font-size:14.5px;font-weight:600;color:var(--v4-ink,#06080d);}
.cc-before{margin-top:2px;font-style:normal;font-size:12px;color:#a7abb3;transition:opacity .4s ease,max-height .4s ease;}
.cc-after{margin-top:2px;font-style:normal;font-size:12.5px;color:#8a8f98;max-height:0;opacity:0;overflow:hidden;transition:opacity .5s ease,max-height .5s ease;transition-delay:calc(var(--i) * .09s + .35s);}
.cc.on .cc-before{opacity:0;max-height:0;}
.cc.on .cc-after{opacity:1;max-height:20px;}
.cc-chk{flex:0 0 auto;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  color:transparent;background:transparent;margin-top:3px;transition:color .4s ease,background .4s ease;transition-delay:calc(var(--i) * .09s + .35s);}
.cc.on .cc-chk{color:#fff;background:#10b981;}

@media(prefers-reduced-motion:reduce){
  .cc-row,.cc-before,.cc-after,.cc-chk{transition:none;}
  .cc-row{transform:none;opacity:1;filter:blur(0);}
  .cc-before{opacity:0;max-height:0;}
  .cc-after{opacity:1;max-height:20px;}
  .cc-chk{color:#fff;background:#10b981;}
}
@media(max-width:520px){
  .cc-card{margin-left:8px;margin-right:8px;}
  .cc-row{transform:translate(calc(var(--dx) * .5),calc(var(--dy) * .6)) rotate(calc(var(--rot) * .6)) scale(.97);}
}
`;

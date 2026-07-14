'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { START_LINK } from '@/lib/site';

const HERO_H = 'See the difference.';
const HERO_SUB = 'Same owner. Same trade. Same phone number. What changed is everything a customer sees first, and that is what makes the phone ring.';

const CLAIM = 'A site that makes a 22-year operator look like the most established name in town, and turns a stranger searching at 9 PM into a booked job by morning.';

const CRAFT: { t: string; b: string }[] = [
  /* These four used to restate the website bullets that /whats-included and
     /how-it-works already own, for a third time. This page's job is EVIDENCE, not
     another list. What is left is the two things only a real build can say. */
  { t: 'This is a real build.', b: 'Not a mockup, not a concept. A site we shipped for an owner-operator, and the one before it is what he actually had.' },
  { t: 'Loads in under a second.', b: 'Fast on any phone, because a homeowner in a jam does not wait around for a slow site.' },
  { t: 'Every page, one tap from a call.', b: 'A big call button and self-serve booking everywhere, so a ready customer never slips away.' },
  { t: 'Yours to keep.', b: 'The site, the domain, the Google profile rebuilt to match. All in your name, always.' },
];

const CSS = `
.wk{background:#fff;color:var(--v4-ink);}
.wk .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.wk .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.wk h1,.wk h2,.wk h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.wk-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 30px;text-decoration:none;transition:transform .3s ease;}
.wk-btn:hover{transform:translateY(-1px);}

/* hero */
.wk-hero{text-align:center;padding:clamp(140px,18vh,210px) 0 clamp(48px,6vw,72px);position:relative;overflow:hidden;background:#050506;}
.wk-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(62% 52% at 50% 0%,rgba(14,165,233,.16),transparent 62%);pointer-events:none;}
.wk-hero .wrap{position:relative;}
.wk-hero .eyebrow{color:#c9cdd6;}
.wk-hero h1{margin-top:18px;font-size:clamp(46px,7.4vw,104px);line-height:.98;color:#f5f5f7;}
.wk-hero p.lead{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.45;color:#aeb4c0;max-width:40ch;}

/* compare */
.wk-compare{padding:clamp(24px,4vw,52px) 0 clamp(70px,9vw,120px);}
.wk-compare .tag{text-align:center;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#0284c7;margin-bottom:18px;}
.cmp-frame{max-width:1040px;margin:0 auto;border-radius:18px;overflow:hidden;background:#0b0b0d;box-shadow:0 60px 130px -50px rgba(6,12,20,.55);border:1px solid rgba(0,0,0,.06);}
.cmp-bar{display:flex;align-items:center;gap:7px;padding:12px 16px;background:#141418;}
.cmp-bar .dot{width:11px;height:11px;border-radius:50%;background:rgba(255,255,255,.16);}
.cmp-bar .pill{margin:0 auto;display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:5px 16px;color:#8a8f98;font-size:11px;letter-spacing:.02em;}
.cmp-bar .pill svg{width:11px;height:11px;}
.cmp-bar .spacer{width:46px;}
.cmp{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;cursor:ew-resize;touch-action:none;user-select:none;background:#0b0b0d;}
.cmp img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;display:block;pointer-events:none;-webkit-user-drag:none;}
.cmp .after{clip-path:inset(0 0 0 var(--x));}
.cmp .lab{position:absolute;top:16px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:rgba(0,0,0,.5);padding:6px 12px;border-radius:999px;backdrop-filter:blur(6px);z-index:4;transition:opacity .3s;}
.cmp .lab.b{left:16px;}
.cmp .lab.a{right:16px;background:rgba(2,132,199,.85);}
.cmp .div{position:absolute;top:0;bottom:0;left:var(--x);width:2px;background:#fff;transform:translateX(-1px);z-index:5;box-shadow:0 0 0 1px rgba(0,0,0,.12);}
.cmp .handle{position:absolute;top:50%;left:var(--x);width:44px;height:44px;border-radius:50%;background:#fff;transform:translate(-50%,-50%);z-index:6;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px -8px rgba(0,0,0,.5);}
.cmp .handle svg{width:20px;height:20px;color:#0b0b0d;}
.wk-compare .hint{text-align:center;margin-top:18px;font-size:13.5px;color:#9298a1;}
@media(prefers-reduced-motion:reduce){.cmp .lab{transition:none;}}

/* claim */
.wk-claim{background:var(--v4-cream);text-align:center;padding:clamp(90px,13vw,160px) 0;}
.wk-claim p{font-size:clamp(26px,3.8vw,50px);font-weight:600;letter-spacing:-.03em;line-height:1.14;color:var(--v4-ink);max-width:20ch;margin:0 auto;}
.wk-claim p .g{background:linear-gradient(100deg,#06b6d4,#10b981 55%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* craft */
.wk-craft{padding:clamp(90px,12vw,150px) 0;}
.wk-craft .head{text-align:center;margin-bottom:clamp(44px,6vw,68px);}
.wk-craft .head h2{font-size:clamp(32px,5vw,60px);line-height:1.02;}
.wk-craft .head p{margin:16px auto 0;font-size:clamp(17px,1.9vw,20px);color:#52565e;max-width:34ch;}
.wk-craft .grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,56px) clamp(40px,6vw,90px);max-width:900px;margin:0 auto;}
.wk-craft .item h3{font-size:clamp(19px,2vw,23px);letter-spacing:-.02em;}
.wk-craft .item p{margin-top:10px;font-size:16px;line-height:1.55;color:#52565e;max-width:38ch;}
@media(max-width:720px){.wk-craft .grid{grid-template-columns:1fr;gap:32px;}}

/* cta */
.wk-cta{text-align:center;padding:clamp(110px,15vw,200px) 0;background:#0b0f14;}
.wk-cta h2{font-size:clamp(38px,6vw,84px);line-height:1.0;color:#fff;max-width:14ch;margin:0 auto;}
.wk-cta p{margin:22px auto 0;font-size:clamp(16px,1.9vw,20px);color:#9aa0ab;max-width:34ch;}
.wk-cta .b{margin-top:34px;}
.wk-cta .b a{background:#fff;color:#0b0f14;}
`;

function Compare() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [x, setX] = useState(50);
  const dragging = useRef(false);
  const played = useRef(false);

  const setFromClient = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setX(Math.min(98, Math.max(2, pct)));
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !played.current) {
            played.current = true;
            if (reduce) { setX(55); return; }
            const start = performance.now();
            const dur = 1600;
            const from = 85, mid = 15, end = 44;
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / dur);
              const ease = 1 - Math.pow(1 - t, 3);
              const val = t < 0.6 ? from + (mid - from) * (ease / 0.83) : mid + (end - mid) * ((t - 0.6) / 0.4);
              setX(val);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="cmp-frame">
      <div className="cmp-bar">
        <span className="dot" /><span className="dot" /><span className="dot" />
        <span className="pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          your-business.com
        </span>
        <span className="spacer" />
      </div>
      <div
        ref={ref}
        className="cmp"
        style={{ '--x': `${x}%` } as CSSProperties}
        onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); setFromClient(e.clientX); }}
        onPointerMove={(e) => { if (dragging.current) setFromClient(e.clientX); }}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
      >
        <img className="before" src="/photos/tce-before.png" alt="A tired, dated trades website before StayBookt" />
        <img className="after" src="/photos/tce-after.png" alt="The same business, rebuilt by StayBookt" />
        <span className="lab b" style={{ opacity: x > 20 ? 1 : 0 }}>Before</span>
        <span className="lab a" style={{ opacity: x < 80 ? 1 : 0 }}>After</span>
        <span className="div" />
        <span className="handle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7l-5 5 5 5M15 7l5 5-5 5" /></svg>
        </span>
      </div>
    </div>
  );
}

export default function WorkShowcase() {
  return (
    <div className="wk">
      <style>{CSS}</style>

      <header className="wk-hero">
        <div className="wrap">
          <div className="eyebrow">The work</div>
          <h1>{HERO_H}</h1>
          <p className="lead">{HERO_SUB}</p>
        </div>
      </header>

      <section className="wk-compare">
        <div className="wrap">
          <div className="tag">Electrician &middot; York Region</div>
          <Compare />
          <div className="hint">Drag to compare. What we started with, and what we built.</div>
        </div>
      </section>

      <section className="wk-claim">
        <div className="wrap">
          <p>The kind of site that makes you the <span className="g">obvious call</span> in your town.</p>
        </div>
      </section>

      <section className="wk-craft">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Under the hood</div>
            <h2>Built to book work, not just to look good.</h2>
            <p>{CLAIM}</p>
          </div>
          <div className="grid">
            {CRAFT.map((c) => (
              <div className="item" key={c.t}>
                <h3>{c.t}</h3>
                <p>{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-cta">
        <div className="wrap">
          <h2>Yours could look like this.</h2>
          <p>We take on a small number of owners at a time. See if you are a fit.</p>
          <div className="b"><a className="wk-btn" href={START_LINK}>Pick a time</a></div>
        </div>
      </section>
    </div>
  );
}

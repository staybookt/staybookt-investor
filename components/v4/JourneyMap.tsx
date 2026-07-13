'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { START_LINK } from '@/lib/site';

/* The Secret Sauce: one scroll-pinned four-beat film, fully scroll-scrubbed.
 * Get Found (linear climb) -> StayBookt (wheel + blurbs) -> Enjoy Life (continuous
 * cross-dissolve + push-in) -> Get Started (CTA card). Nothing on a timer. */

const B = [0, 0.24, 0.5, 0.8, 1]; // beat boundaries

const CSS = `
.sscx-track{position:relative;height:440vh;background:#050506;}
.sscx-stage{position:sticky;top:0;height:100vh;min-height:600px;overflow:hidden;display:flex;flex-direction:column;color:#f5f5f7;--acc:#0ea5e9;--cp:0;--o0:1;--o1:0;--o2:0;--o3:0;--lz:0;}
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
.sscx-film .e3{opacity:var(--o3);}
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
.sscx-phase{font-size:13px;font-weight:700;letter-spacing:.2em;color:var(--acc);text-align:center;transition:color .8s ease;text-shadow:0 1px 18px rgba(0,0,0,.5);}
.sscx-headwrap{position:relative;text-align:center;width:100%;min-height:2.4em;font-size:clamp(30px,4.8vw,60px);line-height:1.04;}
.sscx-stage[data-beat="3"] .sscx-headwrap{display:none;}
.sscx-head{position:absolute;left:0;right:0;top:50%;padding:0 24px;font-size:inherit;font-weight:600;letter-spacing:-.03em;line-height:inherit;opacity:0;transform:translateY(calc(-50% + 12px));transition:opacity .5s ease,transform .5s ease;}
.sscx-stage[data-beat="0"] .h0,.sscx-stage[data-beat="1"] .h1,.sscx-head.on{opacity:1;transform:translateY(-50%);}
.sscx-stage[data-beat="2"] .sscx-head{text-shadow:0 2px 40px rgba(0,0,0,.8);}
.sscx-panels{position:relative;width:100%;height:clamp(320px,46vh,470px);}
.sscx-stage[data-beat="3"] .sscx-panels{height:auto;}
.sscx-p{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.975);transition:opacity .55s ease,transform .55s ease;pointer-events:none;}
.sscx-stage[data-beat="0"] .p0,.sscx-stage[data-beat="1"] .p1,.sscx-stage[data-beat="3"] .p3{opacity:1;transform:none;pointer-events:auto;}
.sscx-stage[data-beat="3"] .p3{position:relative;}

/* sub-progress dots */
.sscx-sub{position:absolute;left:0;right:0;bottom:12%;z-index:3;display:flex;gap:9px;justify-content:center;opacity:0;transition:opacity .5s ease;pointer-events:none;}
.sscx-stage[data-beat="1"] .sscx-sub.sub-sc,.sscx-stage[data-beat="2"] .sscx-sub.sub-life{opacity:1;}
.sscx-sub span{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.3);transition:transform .3s ease,background .3s ease;}
.sscx-sub.sub-life span.a{background:#ffd9a3;transform:scale(1.4);}
.sscx-sub.sub-sc span.a{background:#22d3ee;transform:scale(1.4);}

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
.b2 .wbl{position:relative;width:100%;height:clamp(40px,6vh,52px);}
.b2 .wb{position:absolute;left:0;right:0;top:0;text-align:center;font-size:clamp(15px,1.95vw,20px);font-weight:500;letter-spacing:-.01em;color:#d4dae4;opacity:0;transform:translateY(9px);transition:opacity .4s ease,transform .4s ease;}
.sscx-stage[data-beat="1"][data-sc="0"] .b2 .wb0,
.sscx-stage[data-beat="1"][data-sc="1"] .b2 .wb1,
.sscx-stage[data-beat="1"][data-sc="2"] .b2 .wb2,
.sscx-stage[data-beat="1"][data-sc="3"] .b2 .wb3,
.sscx-stage[data-beat="1"][data-sc="4"] .b2 .wb4,
.sscx-stage[data-beat="1"][data-sc="5"] .b2 .wb5{opacity:1;transform:none;}

/* beat 3 — GET STARTED: a self-contained, tightly-centered CTA card */
.b4{width:min(600px,92%);text-align:center;}
.b4 .cta-h{font-size:clamp(40px,6.4vw,80px);font-weight:600;letter-spacing:-.04em;line-height:1;color:#f5f5f7;opacity:0;transform:translateY(12px);transition:opacity .6s ease,transform .6s ease;}
.b4 .cta-sub{margin:22px auto 0;font-size:clamp(15px,1.7vw,18px);color:#d7dce4;line-height:1.55;max-width:44ch;opacity:0;transform:translateY(12px);transition:opacity .6s ease,transform .6s ease;}
.b4 .cta-btn{display:inline-flex;align-items:center;gap:9px;margin-top:34px;background:#f5f5f7;color:#050506;font-size:16px;font-weight:600;border-radius:999px;padding:16px 30px;text-decoration:none;box-shadow:0 22px 54px -18px rgba(0,0,0,.65);opacity:0;transform:translateY(12px);transition:opacity .6s ease,transform .35s ease,box-shadow .35s ease;}
.b4 .cta-btn .ci{transition:transform .35s ease;}
.b4 .cta-btn:hover{transform:translateY(-2px);box-shadow:0 30px 66px -18px rgba(0,0,0,.72);}
.b4 .cta-btn:hover .ci{transform:translateX(3px);}
.sscx-stage[data-beat="3"] .b4 .cta-h{opacity:1;transform:none;transition-delay:.1s;}
.sscx-stage[data-beat="3"] .b4 .cta-sub{opacity:1;transform:none;transition-delay:.28s;}
.sscx-stage[data-beat="3"] .b4 .cta-btn{opacity:1;transform:none;transition-delay:.46s;}

/* dots */
.sscx-dots{position:relative;z-index:3;display:flex;gap:24px;justify-content:center;padding:14px 20px 28px;flex-wrap:wrap;}
.sscx-dots span{font-size:12px;font-weight:600;color:#f5f5f7;opacity:.4;transition:opacity .4s;text-shadow:0 1px 14px rgba(0,0,0,.6);}
.sscx-stage[data-beat="0"] .sscx-dots .d0,.sscx-stage[data-beat="1"] .sscx-dots .d1,.sscx-stage[data-beat="2"] .sscx-dots .d2,.sscx-stage[data-beat="3"] .sscx-dots .d3{opacity:1;}

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
const LIFE: { img: string; cap: string }[] = [
  { img: '38293529', cap: 'Back on the tools. Not the phone.' },
  { img: '3846255', cap: 'Time to bring the next one up.' },
  { img: '8623946', cap: 'Home in time for dinner.' },
  { img: '4835776', cap: 'A day that is finally yours.' },
];

export default function JourneyMap() {
  const trackRef = useRef<HTMLElement | null>(null);
  const [beat, setBeat] = useState(0);
  const [cp, setCp] = useState(0);
  const [s0, setS0] = useState(0);
  const [sc, setSc] = useState(0);
  const [life, setLife] = useState(0);
  const [lo, setLo] = useState<[number, number, number, number]>([1, 0, 0, 0]);
  const [lz, setLz] = useState(0);
  const [fills, setFills] = useState<[number, number, number, number]>([0, 0, 0, 0]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
    const POS = [0, 1 / 3, 2 / 3, 1];
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
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
        setSc(b < 1 ? 0 : b > 1 ? 5 : Math.min(5, Math.floor(lp * 6)));
        setLife(b < 2 ? 0 : b > 2 ? 3 : Math.min(3, Math.floor(lp * 4)));
        setLo(POS.map((pp) => clamp(1 - Math.abs(lifeP - pp) * 3)) as [number, number, number, number]);
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
  }, []);

  const stageStyle = {
    '--cp': cp,
    '--o0': lo[0],
    '--o1': lo[1],
    '--o2': lo[2],
    '--o3': lo[3],
    '--lz': lz,
  } as CSSProperties;

  return (
    <section ref={trackRef} className="sscx-track">
      <style>{CSS}</style>
      <div className="sscx-stage" style={stageStyle} data-beat={beat} data-s0={s0} data-sc={sc} data-life={life}>
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
          <div className="whisper">The work you love. The life you built it for. And a business worth more than ever.</div>
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
            {beat === 0 ? 'GET FOUND' : beat === 1 ? 'STAYBOOKT' : beat === 2 ? 'ENJOY LIFE' : 'NO PITCH · NO PRESSURE'}
          </div>

          <div className="sscx-headwrap">
            <div className="sscx-head h0">Be the one they call.</div>
            <div className="sscx-head h1">You run the business. We run the busywork.</div>
            {LIFE.map((l, i) => (
              <div key={l.cap} className={`sscx-head lc${beat === 2 && life === i ? ' on' : ''}`}>{l.cap}</div>
            ))}
          </div>

          <div className="sscx-panels">
            {/* BEAT 0 — GET FOUND */}
            <div className="sscx-p p0">
              <div className="b1">
                <div className="sb">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8a8a90" strokeWidth={2}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
                  <span>electrician near me</span>
                </div>
                <div className="pack">
                  <div className="rw a"><span className="d" /><span className="nm">City Wide Electric</span><span className="mini">★ 4.1</span></div>
                  <div className="rw b"><span className="d" /><span className="nm">Sparky &amp; Sons</span><span className="mini">★ 3.8</span></div>
                  <div className="rw c"><span className="d" /><span className="nm">Rapid Volt</span><span className="mini">★ 4.0</span></div>
                  <div className="rw tc">
                    <span className="d" />
                    <span className="nm">Top Choice Electrical</span>
                    <span className="rvw">★ 4.9 · 312 reviews</span>
                    <span className="acts"><span className="bt">Call</span><span className="bt o">Book</span></span>
                    <span className="badge">#1</span>
                  </div>
                  <div className="fc">✓ First call — booked</div>
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

            {/* BEAT 3 — GET STARTED.
                This used to describe the OLD offer ("we show you where the calls, quotes
                and jobs are slipping through") while /start described the new one. Two
                different offers on the same website. */}
            <div className="sscx-p p3">
              <div className="b4">
                <div className="cta-h">Get Started.</div>
                <p className="cta-sub">
                  Before we meet, we try to hire you. We call your line, we text your listing, and we
                  try to book a job. Then we spend thirty minutes showing you exactly what happened.
                  Free, no pitch, and yours to keep whether you hire us or not.
                </p>
                <a className="cta-btn" href={START_LINK}>
                  Pick a time
                  <svg className="ci" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* StayBookt wheel dots */}
        <div className="sscx-sub sub-sc">
          {WHEEL.map((w, i) => (
            <span key={w.lbl} className={sc === i ? 'a' : ''} />
          ))}
        </div>
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
          <span className="d3">Get Started</span>
        </div>
      </div>
    </section>
  );
}

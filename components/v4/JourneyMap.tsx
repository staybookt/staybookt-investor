'use client';

import { useEffect, useRef, useState } from 'react';
import { START_LINK } from '@/lib/site';

/* The Secret Sauce: one scroll-pinned four-beat film, fully scroll-scrubbed.
 * Get Found -> StayBookt -> Enjoy Life -> Get Started.
 * NOTHING is on a timer. Every change is driven by scroll position only. */

const CSS = `
.sscx-track{position:relative;height:520vh;background:#050506;}
.sscx-stage{position:sticky;top:0;height:100vh;min-height:600px;overflow:hidden;display:flex;flex-direction:column;color:#f5f5f7;--acc:#0ea5e9;}
.sscx-stage[data-beat="1"]{--acc:#22d3ee;}
.sscx-stage[data-beat="2"]{--acc:#ffd9a3;}
.sscx-stage[data-beat="3"]{--acc:#f5f5f7;}

/* full-stage cinematic film for ENJOY LIFE (behind the text) */
.sscx-film{position:absolute;inset:0;z-index:0;opacity:0;transition:opacity .7s ease;pointer-events:none;background:linear-gradient(160deg,#1b1408,#0a0f0c 70%);}
.sscx-stage[data-beat="2"] .sscx-film{opacity:1;}
.sscx-film .scene{position:absolute;inset:0;opacity:0;background-size:cover;background-position:center;transition:opacity .8s ease;transform:scale(1.02);}
.sscx-stage[data-beat="2"][data-life="0"] .sscx-film .e0,
.sscx-stage[data-beat="2"][data-life="1"] .sscx-film .e1,
.sscx-stage[data-beat="2"][data-life="2"] .sscx-film .e2,
.sscx-stage[data-beat="2"][data-life="3"] .sscx-film .e3{opacity:1;}
.sscx-film .grain{position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:overlay;opacity:.08;}
.sscx-film .vig{position:absolute;inset:0;background:radial-gradient(120% 100% at 50% 42%,transparent 40%,rgba(0,0,0,.66));}
.sscx-film .scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,6,8,.55),rgba(0,0,0,.28) 40%,rgba(4,8,6,.9));}
.sscx-film .scrim2{position:absolute;inset:0;background:radial-gradient(62% 42% at 50% 46%,rgba(0,0,0,.46),transparent 72%);}
.sscx-film .whisper{position:absolute;bottom:8%;left:0;right:0;text-align:center;font-size:13px;color:#e6ede7;text-shadow:0 1px 22px rgba(0,0,0,.85);opacity:0;transition:opacity .5s ease;}
.sscx-stage[data-beat="2"] .sscx-film .whisper{opacity:1;}

.sscx-tint{position:absolute;inset:0;z-index:1;transition:opacity .7s ease,background .8s ease;pointer-events:none;background:radial-gradient(80% 55% at 78% 0%,rgba(14,165,233,.16),transparent 60%);}
.sscx-stage[data-beat="1"] .sscx-tint{background:radial-gradient(90% 75% at 50% 0%,rgba(16,185,129,.16),transparent 62%);}
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
.sscx-head{position:absolute;left:0;right:0;top:50%;padding:0 24px;font-size:inherit;font-weight:600;letter-spacing:-.03em;line-height:inherit;opacity:0;transform:translateY(calc(-50% + 12px));transition:opacity .5s ease,transform .5s ease;}
.sscx-stage[data-beat="0"] .h0,.sscx-stage[data-beat="1"] .h1,.sscx-stage[data-beat="3"] .h3,.sscx-head.on{opacity:1;transform:translateY(-50%);}
.sscx-stage[data-beat="2"] .sscx-head{text-shadow:0 2px 40px rgba(0,0,0,.8);}
.sscx-panels{position:relative;width:100%;height:clamp(320px,44vh,460px);}
.sscx-p{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.975);transition:opacity .55s ease,transform .55s ease;pointer-events:none;}
.sscx-stage[data-beat="0"] .p0,.sscx-stage[data-beat="1"] .p1,.sscx-stage[data-beat="3"] .p3{opacity:1;transform:none;pointer-events:auto;}
.sscx-p.p3{align-items:flex-start;padding-top:4px;}

/* enjoy-life sub-progress dots */
.sscx-life{position:absolute;left:0;right:0;bottom:13.5%;z-index:3;display:flex;gap:10px;justify-content:center;opacity:0;transition:opacity .5s ease;pointer-events:none;}
.sscx-stage[data-beat="2"] .sscx-life{opacity:1;}
.sscx-life span{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.32);transition:transform .3s ease,background .3s ease;}
.sscx-life span.a{background:#ffd9a3;transform:scale(1.35);}

/* beat 1 — GET FOUND: climb scrubs with scroll (data-s0: 0 initial, 1 ranked, 2 booked) */
.b1{width:min(600px,94%);}
.b1 .sb{display:flex;align-items:center;gap:12px;background:#111114;border:1px solid #26262c;border-radius:999px;padding:15px 22px;margin-bottom:18px;}
.b1 .sb span{font-size:16px;color:#d4d4d8;}
.b1 .pack{position:relative;height:356px;}
.b1 .rw{position:absolute;left:0;right:0;height:64px;display:flex;align-items:center;gap:14px;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:0 20px;background:#0a0a0c;transition:top .8s cubic-bezier(.5,0,.2,1),opacity .5s,box-shadow .5s,border-color .5s,background .5s;}
.b1 .rw .d{width:9px;height:9px;border-radius:50%;background:#555;flex:0 0 auto;}
.b1 .rw .nm{font-size:17px;white-space:nowrap;}
.b1 .rw .mini{margin-left:auto;font-size:13px;color:#6b6b74;}
.b1 .rw.a{top:0;opacity:.5;}.b1 .rw.b{top:78px;opacity:.42;}.b1 .rw.c{top:156px;opacity:.34;}
.b1 .rw.tc{top:258px;opacity:.4;}
.b1 .rw.tc .d{background:#0ea5e9;box-shadow:0 0 11px #0ea5e9;}
.b1 .rw.tc .nm{font-weight:600;}
.b1 .rw.tc .rvw{font-size:13px;color:#ffd479;margin-left:14px;white-space:nowrap;opacity:0;transition:opacity .45s ease;}
.b1 .rw.tc .acts{margin-left:auto;display:flex;gap:8px;opacity:0;transition:opacity .45s ease;}
.b1 .rw.tc .acts .bt{font-size:12.5px;font-weight:700;color:#04150e;background:#0ea5e9;border-radius:999px;padding:7px 15px;}
.b1 .rw.tc .acts .bt.o{background:transparent;color:#0ea5e9;border:1px solid #0ea5e9;}
.b1 .rw.tc .badge{font-size:10.5px;font-weight:700;color:#04150e;background:#0ea5e9;border-radius:999px;padding:5px 11px;opacity:0;transition:opacity .45s ease;}
.b1 .fc{position:absolute;left:0;right:0;bottom:0;text-align:center;font-size:14px;font-weight:600;color:#34d399;opacity:0;transform:translateY(6px);transition:opacity .45s ease,transform .45s ease;}
.sscx-stage[data-s0="1"] .b1 .rw.tc,.sscx-stage[data-s0="2"] .b1 .rw.tc{top:0;opacity:1;box-shadow:0 0 36px -6px rgba(14,165,233,.6);border-color:rgba(14,165,233,.6);background:rgba(14,165,233,.10);}
.sscx-stage[data-s0="1"] .b1 .rw.a,.sscx-stage[data-s0="2"] .b1 .rw.a{top:78px;}
.sscx-stage[data-s0="1"] .b1 .rw.b,.sscx-stage[data-s0="2"] .b1 .rw.b{top:156px;}
.sscx-stage[data-s0="1"] .b1 .rw.c,.sscx-stage[data-s0="2"] .b1 .rw.c{top:234px;}
.sscx-stage[data-s0="1"] .b1 .rw.tc .rvw,.sscx-stage[data-s0="2"] .b1 .rw.tc .rvw,.sscx-stage[data-s0="1"] .b1 .rw.tc .badge,.sscx-stage[data-s0="2"] .b1 .rw.tc .badge{opacity:1;}
.sscx-stage[data-s0="2"] .b1 .rw.tc .acts{opacity:1;}
.sscx-stage[data-s0="2"] .b1 .fc{opacity:1;transform:none;}

/* beat 2 — STAYBOOKT: each busywork item flips as scroll passes it (class flg per job) */
.b2{width:min(690px,96%);}
.b2 svg{display:block;width:100%;height:auto;}
.b2 .pipA,.b2 .lbP{transition:opacity .5s ease;}
.b2 .pipT,.b2 .lbH{opacity:0;transition:opacity .5s ease;}
.b2 .flg .pipA,.b2 .flg .lbP{opacity:0;}
.b2 .flg .pipT,.b2 .flg .lbH{opacity:1;}

/* beat 4 — GET STARTED (the CTA card): reveal on scroll (data-s3) */
.b4{width:min(600px,92%);text-align:center;}
.b4 .cta-sub{font-size:clamp(15px,1.7vw,18px);color:#d7dce4;line-height:1.55;max-width:46ch;margin:0 auto;opacity:0;transform:translateY(10px);transition:opacity .5s ease,transform .5s ease;}
.b4 .cta-btn{display:inline-block;margin-top:30px;background:#f5f5f7;color:#050506;font-size:16px;font-weight:600;border-radius:999px;padding:16px 38px;text-decoration:none;box-shadow:0 22px 54px -18px rgba(0,0,0,.65);opacity:0;transform:translateY(10px);transition:opacity .5s ease,transform .5s ease;}
.b4 .cta-btn:hover{transform:translateY(-1px);}
.sscx-stage[data-s3="1"] .b4 .cta-sub,.sscx-stage[data-s3="1"] .b4 .cta-btn{opacity:1;transform:none;}

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
  .sscx-panels{height:clamp(300px,44vh,470px);}
  .sscx-life{bottom:15%;}
  .b1 .sb{padding:12px 18px;}
  .b1 .sb span{font-size:14px;}
  .b1 .pack{height:300px;}
  .b1 .rw{height:56px;padding:0 15px;border-radius:14px;gap:11px;}
  .b1 .rw .nm{font-size:14.5px;}
  .b1 .rw.tc .rvw{display:none;}
  .b1 .rw.tc .acts .bt{padding:6px 11px;font-size:11px;}
  .b1 .rw.a{top:0;}.b1 .rw.b{top:66px;}.b1 .rw.c{top:132px;}.b1 .rw.tc{top:220px;}
  .sscx-stage[data-s0="1"] .b1 .rw.tc,.sscx-stage[data-s0="2"] .b1 .rw.tc{top:0;}
  .sscx-stage[data-s0="1"] .b1 .rw.a,.sscx-stage[data-s0="2"] .b1 .rw.a{top:66px;}
  .sscx-stage[data-s0="1"] .b1 .rw.b,.sscx-stage[data-s0="2"] .b1 .rw.b{top:132px;}
  .sscx-stage[data-s0="1"] .b1 .rw.c,.sscx-stage[data-s0="2"] .b1 .rw.c{top:198px;}
  .b2{width:100%;}
}
`;

const JOBS: { t: string; p: string; lx: number; ly: number; dx: number; dy: number; a: 'start' | 'middle' | 'end' }[] = [
  { t: 'Calls answered', p: 'Missed call', lx: 230, ly: 22, dx: 230, dy: 42, a: 'middle' },
  { t: 'Quotes chased', p: 'Quote to send', lx: 356, ly: 105, dx: 332, dy: 101, a: 'start' },
  { t: 'Reviews earned', p: 'Review to chase', lx: 356, ly: 223, dx: 332, dy: 219, a: 'start' },
  { t: 'Daily brief', p: 'What is on today?', lx: 230, ly: 306, dx: 230, dy: 278, a: 'middle' },
  { t: 'Records kept', p: 'Log the job', lx: 104, ly: 223, dx: 128, dy: 219, a: 'end' },
  { t: 'Jobs scheduled', p: 'Book the visit', lx: 104, ly: 105, dx: 128, dy: 101, a: 'end' },
];

const LIFE: { img: string; cap: string }[] = [
  { img: '13727103', cap: 'Golf with your mates.' },
  { img: '8623946', cap: 'Away with the family.' },
  { img: '5086620', cap: 'A night out, just the two of you.' },
  { img: '4835776', cap: 'A day that is finally yours.' },
];

export default function JourneyMap() {
  const trackRef = useRef<HTMLElement | null>(null);
  const [beat, setBeat] = useState(0);
  const [s0, setS0] = useState(0);
  const [flipped, setFlipped] = useState(0);
  const [life, setLife] = useState(0);
  const [s3, setS3] = useState(0);
  const [fills, setFills] = useState<[number, number, number, number]>([0, 0, 0, 0]);

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
        const b = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;
        const lp = Math.min(Math.max((p - b * 0.25) / 0.25, 0), 0.9999);
        setBeat(b);
        setS0(b === 0 ? (lp < 0.4 ? 0 : lp < 0.72 ? 1 : 2) : 2);
        setFlipped(b < 1 ? 0 : b > 1 ? 6 : Math.min(6, Math.floor(lp * 7)));
        setLife(b < 2 ? 0 : b > 2 ? 3 : Math.min(3, Math.floor(lp * 4)));
        setS3(b === 3 && lp > 0.12 ? 1 : 0);
        const seg = (i: number) => Math.min(Math.max((p - i * 0.25) / 0.25, 0), 1) * 100;
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

  return (
    <section ref={trackRef} className="sscx-track">
      <style>{CSS}</style>
      <div className="sscx-stage" data-beat={beat} data-s0={s0} data-life={life} data-s3={s3}>
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
          <div className="whisper">Meanwhile, the business runs on. Worth more than ever.</div>
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
            {beat === 0 ? 'GET FOUND' : beat === 1 ? 'STAYBOOKT' : beat === 2 ? 'ENJOY LIFE' : 'NO PITCH · NO LOCK-IN'}
          </div>

          <div className="sscx-headwrap">
            <div className="sscx-head h0">Be the one they call.</div>
            <div className="sscx-head h1">You run the business. We run the busywork.</div>
            {LIFE.map((l, i) => (
              <div key={l.cap} className={`sscx-head lc${beat === 2 && life === i ? ' on' : ''}`}>{l.cap}</div>
            ))}
            <div className="sscx-head h3">Get Started.</div>
          </div>

          <div className="sscx-panels">
            {/* BEAT 1 — GET FOUND */}
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

            {/* BEAT 2 — STAYBOOKT */}
            <div className="sscx-p p1">
              <div className="b2">
                <svg width="460" height="320" viewBox="0 0 460 320" fill="none">
                  <g stroke="rgba(34,211,238,.2)" strokeWidth={1}>
                    <line x1="230" y1="160" x2="230" y2="42" /><line x1="230" y1="160" x2="332" y2="101" /><line x1="230" y1="160" x2="332" y2="219" />
                    <line x1="230" y1="160" x2="230" y2="278" /><line x1="230" y1="160" x2="128" y2="219" /><line x1="230" y1="160" x2="128" y2="101" />
                  </g>
                  <circle cx="230" cy="160" r="118" stroke="rgba(255,255,255,.08)" strokeWidth={1} />
                  <circle cx="230" cy="160" r="56" fill="rgba(16,185,129,.1)" stroke="rgba(52,211,153,.5)" strokeWidth={1.4} />
                  <text x="230" y="157" textAnchor="middle" fill="#34d399" fontSize="17" fontWeight="600" fontFamily="-apple-system,sans-serif">You</text>
                  <text x="230" y="175" textAnchor="middle" fill="#7c8a83" fontSize="11" fontFamily="-apple-system,sans-serif">in control</text>
                  {JOBS.map((j, i) => (
                    <g key={j.t} className={i < flipped ? 'flg' : undefined}>
                      <circle className="pipA" cx={j.dx} cy={j.dy} r="5.5" fill="#f59e0b" />
                      <circle className="pipT" cx={j.dx} cy={j.dy} r="5.5" fill="#22d3ee" />
                      <text className="lbP" x={j.lx} y={j.ly} textAnchor={j.a} fill="#c99a4a" fontSize="13" fontWeight="600" fontFamily="-apple-system,sans-serif">{j.p}</text>
                      <text className="lbH" x={j.lx} y={j.ly} textAnchor={j.a} fill="#e6e6ea" fontSize="13" fontWeight="600" fontFamily="-apple-system,sans-serif">{'✓ ' + j.t}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* BEAT 4 — GET STARTED */}
            <div className="sscx-p p3">
              <div className="b4">
                <p className="cta-sub">
                  A free 30 minutes with a founder, not a sales rep. We show you where the calls,
                  quotes, and jobs are slipping through, and what it is costing you. The read is
                  yours to keep, whether you hire us or not.
                </p>
                <a className="cta-btn" href={START_LINK}>Pick a time</a>
              </div>
            </div>
          </div>
        </div>

        {/* enjoy-life sub-progress */}
        <div className="sscx-life">
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

'use client';

import { useEffect, useRef, useState } from 'react';

/* The Secret Sauce, as one scroll-pinned three-beat film. */

const CSS = `
.sscx-track{position:relative;height:340vh;background:#050506;}
.sscx-stage{position:sticky;top:0;height:100vh;min-height:600px;overflow:hidden;display:flex;flex-direction:column;color:#f5f5f7;--acc:#0ea5e9;}
.sscx-stage[data-beat="1"]{--acc:#22d3ee;}
.sscx-stage[data-beat="2"]{--acc:#34d399;}
.sscx-tint{position:absolute;inset:0;transition:background 1s ease;pointer-events:none;background:radial-gradient(80% 55% at 78% 0%,rgba(14,165,233,.16),transparent 60%);}
.sscx-stage[data-beat="1"] .sscx-tint{background:radial-gradient(80% 60% at 50% 6%,rgba(6,182,212,.15),transparent 60%);}
.sscx-stage[data-beat="2"] .sscx-tint{background:radial-gradient(90% 75% at 50% 0%,rgba(16,185,129,.16),transparent 62%);}
.sscx-top{position:relative;z-index:3;display:flex;align-items:center;justify-content:center;padding:22px 32px 0;}
.sscx-bars{display:flex;gap:6px;width:100%;max-width:280px;}
.sscx-seg{flex:1;height:2.5px;border-radius:2px;background:rgba(255,255,255,.12);overflow:hidden;}
.sscx-seg i{display:block;height:100%;width:0;background:var(--acc);transition:background .8s;}
.sscx-mid{position:relative;z-index:3;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(12px,2.4vh,30px);padding:1vh 24px;}
.sscx-phase{font-size:13px;font-weight:700;letter-spacing:.2em;color:var(--acc);text-align:center;transition:color .8s ease;}
.sscx-headwrap{position:relative;text-align:center;width:100%;min-height:2.15em;font-size:clamp(30px,4.8vw,62px);line-height:1.03;}
.sscx-head{position:absolute;left:0;right:0;top:50%;padding:0 20px;font-size:inherit;font-weight:600;letter-spacing:-.03em;line-height:inherit;opacity:0;transform:translateY(calc(-50% + 14px));transition:opacity .6s ease,transform .6s ease;}
.sscx-stage[data-beat="0"] .h0,.sscx-stage[data-beat="1"] .h1,.sscx-stage[data-beat="2"] .h2{opacity:1;transform:translateY(-50%);}
.sscx-panels{position:relative;width:100%;height:clamp(360px,56vh,620px);}
.sscx-p{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.965);transition:opacity .7s ease,transform .7s ease;pointer-events:none;}
.sscx-stage[data-beat="0"] .p0,.sscx-stage[data-beat="1"] .p1,.sscx-stage[data-beat="2"] .p2{opacity:1;transform:none;}

/* beat 1 — climb from the bottom to #1 */
.b1{width:min(600px,94%);}
.b1 .sb{display:flex;align-items:center;gap:12px;background:#111114;border:1px solid #26262c;border-radius:999px;padding:15px 22px;margin-bottom:18px;}
.b1 .sb span{font-size:16px;color:#d4d4d8;}
.b1 .pack{position:relative;height:356px;}
.b1 .rw{position:absolute;left:0;right:0;height:64px;display:flex;align-items:center;gap:14px;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:0 20px;background:#0a0a0c;transition:top .9s cubic-bezier(.5,0,.2,1),opacity .6s,box-shadow .6s,border-color .6s;}
.b1 .rw .d{width:9px;height:9px;border-radius:50%;background:#555;flex:0 0 auto;}
.b1 .rw .nm{font-size:17px;white-space:nowrap;}
.b1 .rw .mini{margin-left:auto;font-size:13px;color:#6b6b74;}
.b1 .rw.a{top:0;opacity:.5;}.b1 .rw.b{top:78px;opacity:.42;}.b1 .rw.c{top:156px;opacity:.34;}
.b1 .rw.tc{top:258px;opacity:.4;}
.b1 .rw.tc .d{background:#0ea5e9;box-shadow:0 0 11px #0ea5e9;}
.b1 .rw.tc .nm{font-weight:600;}
.b1 .rw.tc .rvw{font-size:13px;color:#ffd479;margin-left:14px;white-space:nowrap;opacity:0;transition:opacity .5s .9s;}
.b1 .rw.tc .acts{margin-left:auto;display:flex;gap:8px;opacity:0;transition:opacity .5s 1.3s;}
.b1 .rw.tc .acts .bt{font-size:12.5px;font-weight:700;color:#04150e;background:#0ea5e9;border-radius:999px;padding:7px 15px;}
.b1 .rw.tc .acts .bt.o{background:transparent;color:#0ea5e9;border:1px solid #0ea5e9;}
.b1 .rw.tc .badge{font-size:10.5px;font-weight:700;color:#04150e;background:#0ea5e9;border-radius:999px;padding:5px 11px;opacity:0;transition:opacity .5s .7s;}
.b1 .fc{position:absolute;left:0;right:0;bottom:0;text-align:center;font-size:14px;font-weight:600;color:#34d399;opacity:0;transform:translateY(6px);transition:opacity .5s 2.1s,transform .5s 2.1s;}
.sscx-stage.armed[data-beat="0"] .b1 .rw.tc{top:0;opacity:1;box-shadow:0 0 36px -6px rgba(14,165,233,.6);border-color:rgba(14,165,233,.6);background:rgba(14,165,233,.10);}
.sscx-stage.armed[data-beat="0"] .b1 .rw.a{top:78px;}
.sscx-stage.armed[data-beat="0"] .b1 .rw.b{top:156px;}
.sscx-stage.armed[data-beat="0"] .b1 .rw.c{top:234px;}
.sscx-stage.armed[data-beat="0"] .b1 .rw.tc .rvw,.sscx-stage.armed[data-beat="0"] .b1 .rw.tc .acts,.sscx-stage.armed[data-beat="0"] .b1 .rw.tc .badge{opacity:1;}
.sscx-stage.armed[data-beat="0"] .b1 .fc{opacity:1;transform:none;}

/* beat 2 — busywork handed off (amber to-do -> teal handled) */
.b2{width:min(690px,96%);}
.b2 svg{display:block;width:100%;height:auto;}
.b2 .arc{transform-origin:230px 160px;animation:sscxspin 6s linear infinite;}
.b2 .pipA,.b2 .lbP{transition:opacity .5s;}
.b2 .pipT,.b2 .lbH{opacity:0;transition:opacity .5s;}
.sscx-stage[data-beat="1"] .b2 .pipA,.sscx-stage[data-beat="1"] .b2 .lbP{opacity:0;}
.sscx-stage[data-beat="1"] .b2 .pipT,.sscx-stage[data-beat="1"] .b2 .lbH{opacity:1;}
.sscx-stage[data-beat="1"] .b2 .jc0,.sscx-stage[data-beat="1"] .b2 .jp0,.sscx-stage[data-beat="1"] .b2 .jh0{transition-delay:.4s;}
.sscx-stage[data-beat="1"] .b2 .jc1,.sscx-stage[data-beat="1"] .b2 .jp1,.sscx-stage[data-beat="1"] .b2 .jh1{transition-delay:1s;}
.sscx-stage[data-beat="1"] .b2 .jc2,.sscx-stage[data-beat="1"] .b2 .jp2,.sscx-stage[data-beat="1"] .b2 .jh2{transition-delay:1.6s;}
.sscx-stage[data-beat="1"] .b2 .jc3,.sscx-stage[data-beat="1"] .b2 .jp3,.sscx-stage[data-beat="1"] .b2 .jh3{transition-delay:2.2s;}
.sscx-stage[data-beat="1"] .b2 .jc4,.sscx-stage[data-beat="1"] .b2 .jp4,.sscx-stage[data-beat="1"] .b2 .jh4{transition-delay:2.8s;}
.sscx-stage[data-beat="1"] .b2 .jc5,.sscx-stage[data-beat="1"] .b2 .jp5,.sscx-stage[data-beat="1"] .b2 .jh5{transition-delay:3.4s;}

/* beat 3 — enjoy life: real moments cross-dissolving in the stage */
.b3{position:absolute;inset:0;overflow:hidden;border-radius:24px;}
.b3 .scene{position:absolute;inset:0;opacity:0;background-size:cover;background-position:center;animation:sscxkb 13s ease-in-out infinite alternate;}
.sscx-stage[data-beat="2"] .b3 .scene{animation:sscxkb 13s ease-in-out infinite alternate, sscxfade 12s ease-in-out infinite;}
.b3 .e0{animation-delay:0s;}
.b3 .e1{animation-delay:3s;}
.b3 .e2{animation-delay:6s;}
.b3 .e3{animation-delay:9s;}
.b3 .grain{position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:overlay;opacity:.1;}
.b3 .vig{position:absolute;inset:0;background:radial-gradient(120% 100% at 50% 45%,transparent 45%,rgba(0,0,0,.55));}
.b3 .scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.14) 46%,rgba(4,8,6,.78));}
.b3 .bloom{position:absolute;top:44%;left:50%;width:170px;height:170px;border-radius:50%;transform:translate(-50%,-50%) scale(.15);opacity:0;background:radial-gradient(closest-side,rgba(255,236,196,.95),rgba(255,196,120,.3) 45%,transparent 72%);}
.sscx-stage[data-beat="2"] .b3 .bloom{animation:sscxbloom 1.7s ease forwards;}
.b3 .life{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 30px;}
.b3 .promise{opacity:0;font-size:clamp(18px,2.4vw,27px);color:#fff;font-weight:600;text-shadow:0 2px 30px rgba(0,0,0,.6);transition:opacity 1.1s ease 1.1s;}
.sscx-stage[data-beat="2"] .b3 .promise{opacity:1;}
.b3 .whisper{position:absolute;bottom:7%;left:0;right:0;text-align:center;font-size:12.5px;color:#cfe0d5;opacity:0;transition:opacity 1s ease 1.6s;}
.sscx-stage[data-beat="2"] .b3 .whisper{opacity:1;}

/* dots */
.sscx-dots{position:relative;z-index:3;display:flex;gap:26px;justify-content:center;padding:14px 20px 28px;}
.sscx-dots span{font-size:12px;font-weight:600;color:#f5f5f7;opacity:.4;transition:opacity .4s;}
.sscx-stage[data-beat="0"] .sscx-dots .d0,.sscx-stage[data-beat="1"] .sscx-dots .d1,.sscx-stage[data-beat="2"] .sscx-dots .d2{opacity:1;}

@keyframes sscxspin{to{transform:rotate(360deg);}}
@keyframes sscxkb{from{transform:scale(1.04);}to{transform:scale(1.12);}}
@keyframes sscxfade{0%{opacity:0;}3%{opacity:1;}22%{opacity:1;}27%{opacity:0;}100%{opacity:0;}}
@keyframes sscxbloom{0%{transform:translate(-50%,-50%) scale(.15);opacity:0;}40%{opacity:.95;}100%{transform:translate(-50%,-50%) scale(3.4);opacity:0;}}

@media (prefers-reduced-motion: reduce){
  .sscx-stage *{animation:none !important;transition:none !important;}
  .b1 .rw.tc{top:0 !important;opacity:1 !important;}
  .b1 .rw.a{top:78px !important;}.b1 .rw.b{top:156px !important;}.b1 .rw.c{top:234px !important;}
  .b1 .rw.tc .rvw,.b1 .rw.tc .acts,.b1 .rw.tc .badge,.b1 .fc{opacity:1 !important;transform:none !important;}
  .b2 .pipT,.b2 .lbH{opacity:1 !important;}.b2 .pipA,.b2 .lbP{opacity:0 !important;}
  .b3 .e0{opacity:1 !important;}.b3 .promise,.b3 .whisper{opacity:1 !important;}
  .sscx-head{transition:none !important;}
}
@media (max-width:640px){
  .sscx-top{padding:16px 18px 0;}
  .sscx-dots{gap:16px;}
  .sscx-headwrap{min-height:3.2em;}
  .sscx-panels{height:clamp(320px,46vh,480px);}
  .b1 .sb{padding:12px 18px;}
  .b1 .sb span{font-size:14px;}
  .b1 .pack{height:300px;}
  .b1 .rw{height:56px;padding:0 15px;border-radius:14px;gap:11px;}
  .b1 .rw .nm{font-size:14.5px;}
  .b1 .rw.tc .rvw{display:none;}
  .b1 .rw.tc .acts .bt{padding:6px 11px;font-size:11px;}
  .b1 .rw.a{top:0;}.b1 .rw.b{top:66px;}.b1 .rw.c{top:132px;}.b1 .rw.tc{top:220px;}
  .sscx-stage.armed[data-beat="0"] .b1 .rw.tc{top:0;}
  .sscx-stage.armed[data-beat="0"] .b1 .rw.a{top:66px;}.sscx-stage.armed[data-beat="0"] .b1 .rw.b{top:132px;}.sscx-stage.armed[data-beat="0"] .b1 .rw.c{top:198px;}
  .b2{width:100%;}
}
`;

const JOBS: { t: string; p: string; lx: number; ly: number; dx: number; dy: number; a: 'start' | 'middle' | 'end' }[] = [
  { t: 'Calls answered', p: 'Missed call', lx: 230, ly: 22, dx: 230, dy: 42, a: 'middle' },
  { t: 'Quotes chased', p: 'Quote to send', lx: 356, ly: 105, dx: 332, dy: 101, a: 'start' },
  { t: 'Reviews earned', p: 'Review to chase', lx: 356, ly: 223, dx: 332, dy: 219, a: 'start' },
  { t: 'Daily brief', p: 'What’s on today?', lx: 230, ly: 306, dx: 230, dy: 278, a: 'middle' },
  { t: 'Records kept', p: 'Log the job', lx: 104, ly: 223, dx: 128, dy: 219, a: 'end' },
  { t: 'Jobs scheduled', p: 'Book the visit', lx: 104, ly: 105, dx: 128, dy: 101, a: 'end' },
];

export default function JourneyMap() {
  const trackRef = useRef<HTMLElement | null>(null);
  const [beat, setBeat] = useState(0);
  const [fills, setFills] = useState<[number, number, number]>([0, 0, 0]);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);

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
        const BOUNDS = [0, 0.32, 0.62, 1];
        const b = p < BOUNDS[1] ? 0 : p < BOUNDS[2] ? 1 : 2;
        setBeat(b);
        const seg = (i: number) =>
          Math.min(Math.max((p - BOUNDS[i]) / (BOUNDS[i + 1] - BOUNDS[i]), 0), 1) * 100;
        setFills([seg(0), seg(1), seg(2)]);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setArmed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={trackRef} className="sscx-track">
      <style>{CSS}</style>
      <div ref={stageRef} className={`sscx-stage${armed ? ' armed' : ''}`} data-beat={beat}>
        <div className="sscx-tint" />

        <div className="sscx-top">
          <div className="sscx-bars">
            {fills.map((f, i) => (
              <div className="sscx-seg" key={i}><i style={{ width: `${f}%` }} /></div>
            ))}
          </div>
        </div>

        <div className="sscx-mid">
          <div className="sscx-phase">
            {beat === 0 ? 'GET FOUND' : beat === 1 ? 'STAYBOOKT' : 'ENJOY LIFE'}
          </div>

          <div className="sscx-headwrap">
            <div className="sscx-head h0">Be the one they call.</div>
            <div className="sscx-head h1">You run the business. We run the busywork.</div>
            <div className="sscx-head h2">Now go enjoy it.</div>
          </div>

          <div className="sscx-panels">
            {/* BEAT 1 — GET FOUND: climb from the bottom to #1 */}
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

            {/* BEAT 2 */}
            <div className="sscx-p p1">
              <div className="b2">
                <svg width="460" height="320" viewBox="0 0 460 320" fill="none">
                  <g stroke="rgba(34,211,238,.2)" strokeWidth={1}>
                    <line x1="230" y1="160" x2="230" y2="42" /><line x1="230" y1="160" x2="332" y2="101" /><line x1="230" y1="160" x2="332" y2="219" />
                    <line x1="230" y1="160" x2="230" y2="278" /><line x1="230" y1="160" x2="128" y2="219" /><line x1="230" y1="160" x2="128" y2="101" />
                  </g>
                  <circle cx="230" cy="160" r="118" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
                  <circle className="arc" cx="230" cy="160" r="118" stroke="#22d3ee" strokeWidth={2} strokeLinecap="round" strokeDasharray="80 662" />
                  <circle cx="230" cy="160" r="56" fill="rgba(16,185,129,.1)" stroke="rgba(52,211,153,.5)" strokeWidth={1.4} />
                  <text x="230" y="157" textAnchor="middle" fill="#34d399" fontSize="17" fontWeight="600" fontFamily="-apple-system,sans-serif">You</text>
                  <text x="230" y="175" textAnchor="middle" fill="#7c8a83" fontSize="11" fontFamily="-apple-system,sans-serif">in control</text>
                  {JOBS.map((j, i) => (
                    <g key={j.t}>
                      <circle className={`pipA jc${i}`} cx={j.dx} cy={j.dy} r="5.5" fill="#f59e0b" />
                      <circle className={`pipT jc${i}`} cx={j.dx} cy={j.dy} r="5.5" fill="#22d3ee" />
                      <text className={`lbP jp${i}`} x={j.lx} y={j.ly} textAnchor={j.a} fill="#c99a4a" fontSize="13" fontWeight="600" fontFamily="-apple-system,sans-serif">{j.p}</text>
                      <text className={`lbH jh${i}`} x={j.lx} y={j.ly} textAnchor={j.a} fill="#e6e6ea" fontSize="13" fontWeight="600" fontFamily="-apple-system,sans-serif">{'✓ ' + j.t}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* BEAT 3 — ENJOY LIFE: real moments */}
            <div className="sscx-p p2">
              <div className="b3">
                <div className="scene e0" style={{ backgroundImage: 'url(https://images.pexels.com/photos/13727103/pexels-photo-13727103.jpeg?auto=compress&cs=tinysrgb&w=1600)' }} />
                <div className="scene e1" style={{ backgroundImage: 'url(https://images.pexels.com/photos/12932171/pexels-photo-12932171.jpeg?auto=compress&cs=tinysrgb&w=1600)' }} />
                <div className="scene e2" style={{ backgroundImage: 'url(https://images.pexels.com/photos/8623946/pexels-photo-8623946.jpeg?auto=compress&cs=tinysrgb&w=1600)' }} />
                <div className="scene e3" style={{ backgroundImage: 'url(https://images.pexels.com/photos/4835776/pexels-photo-4835776.jpeg?auto=compress&cs=tinysrgb&w=1600)' }} />
                <svg className="grain"><filter id="sscxG"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#sscxG)" /></svg>
                <div className="vig" /><div className="scrim" />
                <div className="bloom" />
                <div className="life">
                  <div className="promise">You built your business to enjoy your life.</div>
                </div>
                <div className="whisper">Meanwhile: handled, and worth more than ever.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sscx-dots">
          <span className="d0">Get Found</span>
          <span className="d1">StayBookt</span>
          <span className="d2">Enjoy Life</span>
        </div>
      </div>
    </section>
  );
}

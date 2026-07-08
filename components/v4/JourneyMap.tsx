'use client';

import { useEffect, useRef, useState } from 'react';

/* The Secret Sauce, as one scroll-pinned three-beat film.
 * Track is 300vh; the stage pins (sticky) and the active beat advances with
 * native scroll (we only READ scroll progress, never hijack it).
 * Beat 1 Get Found (cyan) -> rise to #1. Beat 2 StayBookt (teal) -> busywork
 * handled, you in control. Beat 3 Enjoy Life (green) -> bloom to the life,
 * land on the opening promise. Motion is transform/opacity only (60fps),
 * and prefers-reduced-motion collapses to clean static states. */

const CSS = `
.sscx-track{position:relative;height:300vh;background:#050506;}
.sscx-stage{position:sticky;top:0;height:100vh;min-height:600px;overflow:hidden;display:flex;flex-direction:column;color:#f5f5f7;--acc:#0ea5e9;}
.sscx-tint{position:absolute;inset:0;transition:background 1s ease;pointer-events:none;background:radial-gradient(80% 55% at 78% 0%,rgba(14,165,233,.16),transparent 60%);}
.sscx-stage[data-beat="1"] .sscx-tint{background:radial-gradient(80% 60% at 50% 6%,rgba(6,182,212,.15),transparent 60%);}
.sscx-stage[data-beat="2"] .sscx-tint{background:radial-gradient(90% 75% at 50% 0%,rgba(16,185,129,.16),transparent 62%);}
.sscx-top{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;padding:24px 32px 0;gap:18px;}
.sscx-bars{display:flex;gap:6px;flex:1;max-width:280px;}
.sscx-seg{flex:1;height:2.5px;border-radius:2px;background:rgba(255,255,255,.12);overflow:hidden;}
.sscx-seg i{display:block;height:100%;width:0;background:var(--acc);}
.sscx-eye{font-size:12px;font-weight:700;letter-spacing:.16em;color:var(--acc);transition:color .8s;white-space:nowrap;}
.sscx-headwrap{position:relative;z-index:3;text-align:center;padding:5vh 30px 0;min-height:150px;}
.sscx-head{position:absolute;left:0;right:0;padding:0 30px;font-size:clamp(28px,4.4vw,60px);font-weight:600;letter-spacing:-.03em;line-height:1.04;opacity:0;transform:translateY(12px);transition:opacity .6s ease,transform .6s ease;}
.sscx-stage[data-beat="0"] .h0,.sscx-stage[data-beat="1"] .h1,.sscx-stage[data-beat="2"] .h2{opacity:1;transform:none;}
.sscx-panels{position:relative;z-index:3;flex:1;}
.sscx-p{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.965);transition:opacity .7s ease,transform .7s ease;pointer-events:none;padding:0 24px;}
.sscx-stage[data-beat="0"] .p0,.sscx-stage[data-beat="1"] .p1,.sscx-stage[data-beat="2"] .p2{opacity:1;transform:none;}

/* beat 1 */
.b1{width:min(360px,88%);}
.b1 .sb{display:flex;align-items:center;gap:9px;background:#111114;border:1px solid #26262c;border-radius:999px;padding:9px 15px;margin-bottom:13px;}
.b1 .sb span{font-size:12.5px;color:#d4d4d8;}
.b1 .pack{position:relative;height:180px;}
.b1 .row{position:absolute;left:0;right:0;height:46px;display:flex;align-items:center;gap:10px;border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:0 14px;transition:top .9s cubic-bezier(.5,0,.2,1);}
.b1 .row span.d{width:7px;height:7px;border-radius:50%;background:#555;}
.b1 .row .nm{font-size:12.5px;}
.b1 .r-cw{top:62px;opacity:.5;}.b1 .r-sp{top:120px;opacity:.4;}
.b1 .r-tc{top:120px;background:rgba(14,165,233,.10);border-color:rgba(14,165,233,.3);box-shadow:none;transition:top .9s cubic-bezier(.5,0,.2,1),box-shadow .6s,border-color .6s;}
.b1 .r-tc span.d{background:#0ea5e9;box-shadow:0 0 9px #0ea5e9;}
.b1 .r-tc .nm{font-weight:600;}.b1 .r-tc .st{font-size:10.5px;color:#8fb7cf;}
.b1 .badge{margin-left:auto;font-size:8.5px;font-weight:700;color:#04150e;background:#0ea5e9;border-radius:999px;padding:3px 9px;opacity:0;transition:opacity .5s .5s;}
.b1 .booked{position:absolute;right:0;bottom:-10px;display:flex;align-items:center;gap:6px;background:rgba(16,185,129,.14);border:1px solid rgba(16,185,129,.5);color:#34d399;font-size:11px;font-weight:600;border-radius:999px;padding:5px 12px;opacity:0;transform:translateY(6px);transition:opacity .5s 1s,transform .5s 1s;}
.sscx-stage[data-beat="0"] .b1 .r-tc{top:6px;box-shadow:0 0 30px -6px rgba(14,165,233,.6);border-color:rgba(14,165,233,.6);}
.sscx-stage[data-beat="0"] .b1 .r-cw{top:62px;}.sscx-stage[data-beat="0"] .b1 .r-sp{top:120px;}
.sscx-stage[data-beat="0"] .b1 .badge{opacity:1;}
.sscx-stage[data-beat="0"] .b1 .booked{opacity:1;transform:none;}

/* beat 2 */
.b2 svg{max-width:100%;height:auto;}
.b2 .arc{transform-origin:165px 150px;animation:sscxspin 6s linear infinite;}
.b2 .job{opacity:0;transition:opacity .5s;}
.sscx-stage[data-beat="1"] .b2 .job{opacity:1;}
.sscx-stage[data-beat="1"] .b2 .job.j0{transition-delay:.3s;}
.sscx-stage[data-beat="1"] .b2 .job.j1{transition-delay:.8s;}
.sscx-stage[data-beat="1"] .b2 .job.j2{transition-delay:1.3s;}
.sscx-stage[data-beat="1"] .b2 .job.j3{transition-delay:1.8s;}
.sscx-stage[data-beat="1"] .b2 .job.j4{transition-delay:2.3s;}
.sscx-stage[data-beat="1"] .b2 .job.j5{transition-delay:2.8s;}
.b2 .chk{opacity:0;transition:opacity .4s;}
.sscx-stage[data-beat="1"] .b2 .chk{opacity:1;}
.sscx-stage[data-beat="1"] .b2 .chk.c0{transition-delay:.6s;}.sscx-stage[data-beat="1"] .b2 .chk.c1{transition-delay:1.1s;}
.sscx-stage[data-beat="1"] .b2 .chk.c2{transition-delay:1.6s;}.sscx-stage[data-beat="1"] .b2 .chk.c3{transition-delay:2.1s;}
.sscx-stage[data-beat="1"] .b2 .chk.c4{transition-delay:2.6s;}.sscx-stage[data-beat="1"] .b2 .chk.c5{transition-delay:3.1s;}

/* beat 3 */
.b3{position:absolute;inset:0;overflow:hidden;}
.b3 .scene{position:absolute;inset:0;opacity:0;animation:sscxkb 9s ease-in-out infinite alternate;}
.sscx-stage[data-beat="2"] .b3 .scene{animation:sscxkb 9s ease-in-out infinite alternate, sscxfade 9s ease-in-out infinite;}
.b3 .s0{background:radial-gradient(80% 70% at 76% 10%,rgba(255,222,150,.5),transparent 55%),linear-gradient(180deg,#243a26,#16241a 70%,#101c22);}
.b3 .s1{background:radial-gradient(70% 60% at 50% 55%,rgba(255,180,110,.5),rgba(120,60,30,.2) 45%,transparent 70%),linear-gradient(180deg,#1c130d,#241811 60%,#140d09);animation-delay:3s;}
.b3 .s2{background:linear-gradient(180deg,#f0b978,#c98a63 14%,#3f5f6b 40%,#20323b 70%,#101c22);animation-delay:6s;}
.b3 .grain{position:absolute;inset:0;mix-blend-mode:overlay;opacity:.1;}
.b3 .vig{position:absolute;inset:0;background:radial-gradient(120% 100% at 50% 45%,transparent 45%,rgba(0,0,0,.55));}
.b3 .scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,.12) 50%,rgba(4,8,6,.7));}
.b3 .bloom{position:absolute;top:44%;left:50%;width:170px;height:170px;border-radius:50%;transform:translate(-50%,-50%) scale(.15);opacity:0;background:radial-gradient(closest-side,rgba(255,236,196,.95),rgba(255,196,120,.3) 45%,transparent 72%);}
.sscx-stage[data-beat="2"] .b3 .bloom{animation:sscxbloom 1.7s ease forwards;}
.b3 .life{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 30px;}
.b3 .promise{opacity:0;font-size:clamp(15px,1.9vw,20px);color:#f0ead9;font-weight:500;transition:opacity 1.1s ease 1.1s;}
.sscx-stage[data-beat="2"] .b3 .promise{opacity:1;}
.b3 .whisper{position:absolute;bottom:8%;left:0;right:0;text-align:center;font-size:12.5px;color:#9fb8a6;opacity:0;transition:opacity 1s ease 1.6s;}
.sscx-stage[data-beat="2"] .b3 .whisper{opacity:1;}

/* dots */
.sscx-dots{position:relative;z-index:3;display:flex;gap:26px;justify-content:center;padding:14px 20px 30px;}
.sscx-dots span{font-size:12px;font-weight:600;color:#f5f5f7;opacity:.4;transition:opacity .4s;}
.sscx-stage[data-beat="0"] .sscx-dots .d0,.sscx-stage[data-beat="1"] .sscx-dots .d1,.sscx-stage[data-beat="2"] .sscx-dots .d2{opacity:1;}

@keyframes sscxspin{to{transform:rotate(360deg);}}
@keyframes sscxkb{from{transform:scale(1.04);}to{transform:scale(1.12);}}
@keyframes sscxfade{0%,4%{opacity:0;}8%,30%{opacity:1;}37%,100%{opacity:0;}}
.b3 .s1{animation-name:sscxkb,sscxfade;}
@keyframes sscxbloom{0%{transform:translate(-50%,-50%) scale(.15);opacity:0;}40%{opacity:.95;}100%{transform:translate(-50%,-50%) scale(3.4);opacity:0;}}

@media (prefers-reduced-motion: reduce){
  .sscx-stage *{animation:none !important;transition:none !important;}
  .b1 .r-tc{top:6px !important;}.b1 .badge,.b1 .booked{opacity:1 !important;transform:none !important;}
  .b2 .job,.b2 .chk{opacity:1 !important;}
  .b3 .s0{opacity:1 !important;}.b3 .promise,.b3 .whisper{opacity:1 !important;}
  .sscx-head{transition:none !important;}
}
@media (max-width:640px){
  .sscx-top{padding:18px 20px 0;}
  .sscx-headwrap{min-height:120px;padding-top:4vh;}
  .sscx-dots{gap:16px;}
}
`;

const JOBS: { t: string; x: number; y: number; a: 'start' | 'middle' | 'end' }[] = [
  { t: 'Calls answered', x: 165, y: 58, a: 'middle' },
  { t: 'Quotes chased', x: 276, y: 108, a: 'start' },
  { t: 'Reviews earned', x: 276, y: 196, a: 'start' },
  { t: 'Daily brief', x: 165, y: 250, a: 'middle' },
  { t: 'Records kept', x: 54, y: 196, a: 'end' },
  { t: 'Jobs scheduled', x: 54, y: 108, a: 'end' },
];

export default function JourneyMap() {
  const trackRef = useRef<HTMLElement | null>(null);
  const [beat, setBeat] = useState(0);
  const [fills, setFills] = useState<[number, number, number]>([0, 0, 0]);

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
        const b = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
        setBeat(b);
        const seg = (i: number) => Math.min(Math.max((p - i / 3) / (1 / 3), 0), 1) * 100;
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

  return (
    <section ref={trackRef} className="sscx-track">
      <style>{CSS}</style>
      <div className="sscx-stage" data-beat={beat}>
        <div className="sscx-tint" />

        <div className="sscx-top">
          <div className="sscx-bars">
            {fills.map((f, i) => (
              <div className="sscx-seg" key={i}><i style={{ width: `${f}%` }} /></div>
            ))}
          </div>
          <div className="sscx-eye">
            {beat === 0 ? '01 · GET FOUND' : beat === 1 ? '02 · STAYBOOKT' : '03 · ENJOY LIFE'}
          </div>
        </div>

        <div className="sscx-headwrap">
          <div className="sscx-head h0">Be the one they call.</div>
          <div className="sscx-head h1">You run the business. We run the busywork.</div>
          <div className="sscx-head h2">Now go enjoy it.</div>
        </div>

        <div className="sscx-panels">
          {/* BEAT 1 */}
          <div className="sscx-p p0">
            <div className="b1">
              <div className="sb">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8a8a90" strokeWidth={2}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
                <span>electrician near me</span>
              </div>
              <div className="pack">
                <div className="row r-cw"><span className="d" /><span className="nm">City Wide Electric</span></div>
                <div className="row r-sp"><span className="d" /><span className="nm">Sparky &amp; Sons</span></div>
                <div className="row r-tc">
                  <span className="d" />
                  <span className="nm">Top Choice Electrical <span className="st">★ 4.9</span></span>
                  <span className="badge">#1</span>
                </div>
                <div className="booked">✓ Job booked</div>
              </div>
            </div>
          </div>

          {/* BEAT 2 */}
          <div className="sscx-p p1">
            <div className="b2">
              <svg width="330" height="300" viewBox="0 0 330 300" fill="none">
                <g stroke="rgba(34,211,238,.2)" strokeWidth={1}>
                  <line x1="165" y1="150" x2="165" y2="66" /><line x1="165" y1="150" x2="270" y2="104" /><line x1="165" y1="150" x2="270" y2="196" />
                  <line x1="165" y1="150" x2="165" y2="234" /><line x1="165" y1="150" x2="60" y2="196" /><line x1="165" y1="150" x2="60" y2="104" />
                </g>
                <circle cx="165" cy="150" r="92" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
                <circle className="arc" cx="165" cy="150" r="92" stroke="#22d3ee" strokeWidth={2} strokeLinecap="round" strokeDasharray="70 500" />
                <circle cx="165" cy="150" r="42" fill="rgba(16,185,129,.1)" stroke="rgba(52,211,153,.5)" strokeWidth={1.4} />
                <text x="165" y="146" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="600" fontFamily="-apple-system,sans-serif">You</text>
                <text x="165" y="162" textAnchor="middle" fill="#7c8a83" fontSize="9.5" fontFamily="-apple-system,sans-serif">in control</text>
                {JOBS.map((j, i) => (
                  <g key={j.t}>
                    <text className={`job j${i}`} x={j.a === 'start' ? j.x + 14 : j.a === 'end' ? j.x - 14 : j.x} y={j.y + 4} textAnchor={j.a} fill="#e6e6ea" fontSize="11.5" fontWeight="600" fontFamily="-apple-system,sans-serif">{j.t}</text>
                    <circle className={`chk c${i}`} cx={j.x} cy={j.y} r="5" fill="#22d3ee" />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* BEAT 3 */}
          <div className="sscx-p p2">
            <div className="b3">
              <div className="scene s0" />
              <div className="scene s1" />
              <div className="scene s2" />
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

        <div className="sscx-dots">
          <span className="d0">Get Found</span>
          <span className="d1">StayBookt</span>
          <span className="d2">Enjoy Life</span>
        </div>
      </div>
    </section>
  );
}

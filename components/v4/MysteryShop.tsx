'use client';

import { useEffect, useRef } from 'react';

/* THE MYSTERY SHOP
 * Before the call, we try to hire the business. This is the call sheet we bring.
 * Rows reveal in sequence on view (IntersectionObserver, play once).
 * Results are deliberately blank: we do not know them yet. That is the point. */

type Row = {
  t: string;
  act: string;
  sub: string;
  fields: string[];
};

const ROWS: Row[] = [
  {
    t: '09:12',
    act: 'We call your main line.',
    sub: 'From a number you have never seen, like any new customer.',
    fields: ['Rings before answer', 'Who picked up', 'Voicemail?'],
  },
  {
    t: '09:14',
    act: 'We text the number on your listing.',
    sub: 'A short question. The kind a real customer sends.',
    fields: ['Time to first reply', 'Reply at all?'],
  },
  {
    t: '09:20',
    act: 'We look for you the way a customer does.',
    sub: 'Same search, same phone, same three seconds of patience.',
    fields: ['Where you appear', 'Reviews', 'Who is above you'],
  },
  {
    t: '09:31',
    act: 'We try to actually book the job.',
    sub: 'All the way to the end. We find out where it stops.',
    fields: ['Could we book?', 'Where it broke'],
  },
];

export default function MysteryShop() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('on');
            obs.disconnect();
          }
        }),
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="ms" ref={ref}>
      <style>{CSS}</style>

      <div className="ms-card">
        <div className="ms-head">
          <span className="ms-tag">
            <i className="rec" aria-hidden />
            Call sheet
          </span>
          <span className="ms-meta">Prepared before your call. Not by a bot.</span>
        </div>

        <div className="ms-rows">
          {ROWS.map((r, i) => (
            <div className="ms-row" key={r.t} style={{ transitionDelay: `${i * 180}ms` }}>
              <div className="ms-t">{r.t}</div>
              <div className="ms-what">
                <div className="ms-act">{r.act}</div>
                <div className="ms-sub">{r.sub}</div>
              </div>
              <div className="ms-res">
                {r.fields.map((f) => (
                  <div className="ms-f" key={f}>
                    <span className="ms-fk">{f}</span>
                    <span className="ms-fv" aria-label="Filled in with your actual result" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="ms-foot">
          <span className="ms-fill" />
          We fill the right-hand column in with whatever actually happens. Not a projection. Not a
          benchmark. <b>Your business, on a normal Tuesday.</b>
        </div>
      </div>

      <p className="ms-kick">
        We do not editorialize it. <span className="g">We just play you the tape.</span>
      </p>
    </div>
  );
}

const CSS = `
.ms{margin-top:clamp(40px,5vw,60px);}
.ms-card{background:#fff;border:1px solid #e8e8ec;border-radius:26px;overflow:hidden;box-shadow:0 44px 90px -56px rgba(6,12,20,.55);}
.ms-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px clamp(18px,2.6vw,30px);border-bottom:1px solid #f0f0f3;background:#fbfbfc;}
.ms-tag{display:inline-flex;align-items:center;gap:9px;font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#5b6070;}
.ms-tag .rec{width:8px;height:8px;border-radius:50%;background:#ef4444;box-shadow:0 0 0 0 rgba(239,68,68,.5);animation:msrec 2s ease-out infinite;}
@keyframes msrec{0%{box-shadow:0 0 0 0 rgba(239,68,68,.5);}70%{box-shadow:0 0 0 8px rgba(239,68,68,0);}100%{box-shadow:0 0 0 0 rgba(239,68,68,0);}}
.ms-meta{font-size:13px;color:#9298a1;text-align:right;}
@media(max-width:640px){.ms-meta{display:none;}}

.ms-rows{padding:6px clamp(18px,2.6vw,30px);}
.ms-row{display:grid;grid-template-columns:62px minmax(0,1.25fr) minmax(0,1fr);gap:clamp(14px,2.4vw,30px);align-items:start;padding:22px 0;border-top:1px solid #f2f2f5;opacity:0;transform:translateY(14px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);}
.ms-row:first-child{border-top:0;}
.ms.on .ms-row{opacity:1;transform:none;}
.ms-t{font-size:13px;font-weight:600;color:#a9aeb8;font-variant-numeric:tabular-nums;padding-top:2px;}
.ms-act{font-size:clamp(17px,1.85vw,20px);font-weight:600;letter-spacing:-.02em;color:var(--v4-ink);line-height:1.3;}
.ms-sub{margin-top:6px;font-size:14.5px;line-height:1.5;color:#8a8f98;max-width:40ch;}
.ms-res{display:grid;gap:8px;}
.ms-f{display:flex;align-items:center;gap:10px;}
.ms-fk{flex:0 0 auto;font-size:12.5px;font-weight:600;color:#6b7280;}
.ms-fv{flex:1 1 auto;height:20px;min-width:44px;border-radius:6px;border:1px dashed #d2d6dd;background:repeating-linear-gradient(135deg,rgba(16,185,129,.05) 0 6px,transparent 6px 12px);}
@media(max-width:820px){.ms-row{grid-template-columns:52px minmax(0,1fr);}.ms-res{grid-column:2;margin-top:12px;}}

.ms-foot{display:flex;align-items:flex-start;gap:12px;padding:20px clamp(18px,2.6vw,30px);border-top:1px solid #f0f0f3;background:#fbfbfc;font-size:14.5px;line-height:1.55;color:#6b7280;}
.ms-foot b{font-weight:600;color:var(--v4-ink);}
.ms-fill{flex:0 0 auto;width:18px;height:18px;margin-top:1px;border-radius:5px;border:1px dashed #cfd4dc;background:repeating-linear-gradient(135deg,rgba(16,185,129,.08) 0 5px,transparent 5px 10px);}

.ms-kick{margin-top:clamp(26px,3.4vw,38px);font-size:clamp(20px,2.6vw,30px);font-weight:600;letter-spacing:-.025em;line-height:1.28;color:var(--v4-ink);max-width:30ch;}
.ms-kick .g{background:linear-gradient(100deg,#06b6d4,#10b981 55%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent;}
@media(prefers-reduced-motion:reduce){.ms-row{opacity:1;transform:none;transition:none;}.ms-tag .rec{animation:none;}}
`;

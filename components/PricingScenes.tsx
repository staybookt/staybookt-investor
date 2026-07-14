'use client';

import { useEffect, useRef, useState } from 'react';

/* Two set pieces for /pricing.
 *
 * 1. FiveSalaries — the ledger. The five jobs the front office actually is, named
 *    out loud, against $199. This is the About page's sentence ("It was five
 *    salaries") shown as a thing rather than argued as a claim.
 * 2. ValueShare  — drag the slider, see who keeps what. Makes the 20% concrete,
 *    and makes it obvious the owner keeps the overwhelming majority.
 *
 * IntersectionObserver play-once. No scroll-scrubbing (removed for desktop lag). */

type Seat = { r: string; d: string; low: number; high: number };

/* THE FIVE JOBS. We used to price these roles out at ~$240,000 a year and set that
 * against $2,388. That is the exact slide every marketing agency uses, and it
 * backfires on the one buyer we want: the owner who has already been burned by one.
 * Our own fine print conceded the number was theatre ("not claiming to replace five
 * hires on day one"), which tells the reader not to trust it.
 *
 * So the dollars are gone. The ARGUMENT survives without them, and it is stronger
 * naked: it was never software, it was five jobs, and they still have to get done.
 * DO NOT put a salary total back on this page. */
const fmt = (n: number) => '$' + Math.round(n).toLocaleString();

const SEATS: Seat[] = [
  { r: 'Receptionist', d: 'Answers the phone, every time', low: 42000, high: 52000 },
  { r: 'Dispatcher', d: 'Books it, confirms it, reminds them', low: 48000, high: 60000 },
  { r: 'Estimator', d: 'Sends the quote, chases the yes', low: 55000, high: 70000 },
  { r: 'Marketer', d: 'Gets you found, builds the reviews', low: 55000, high: 75000 },
  { r: 'Bookkeeper', d: 'Chases the invoice, reads it back', low: 40000, high: 55000 },
];

export function FiveSalaries() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.disconnect();
          if (reduce) {
            setStep(SEATS.length + 1);
            return;
          }
          for (let i = 0; i <= SEATS.length + 1; i++) {
            timers.push(setTimeout(() => setStep(i), 200 + i * 480));
          }
        }),
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const shown = Math.min(Math.max(step, 0), SEATS.length);
  const settled = step > SEATS.length;

  return (
    <div className={`fsal${settled ? ' settled' : ''}`} ref={ref}>
      <style>{FS_CSS}</style>

      <div className="fs-head">
        <span className="fs-k">The front office you cannot afford</span>
        <span className="fs-yr">Five jobs, every day</span>
      </div>

      <div className="fs-rows">
        {SEATS.map((s, i) => (
          <div className={`fs-row${i < shown ? ' in' : ''}`} key={s.r}>
            <span className="fs-av">{s.r.slice(0, 1)}</span>
            <span className="fs-t">
              <b>{s.r}</b>
              <i>{s.d}</i>
            </span>
          </div>
        ))}
      </div>

      <div className="fs-total">
        <span>Five jobs. One front office.</span>
        <b>You</b>
      </div>

      <div className="fs-vs">
        <span />
        <em>or</em>
        <span />
      </div>

      <div className="fs-sb">
        <div className="fs-sb-l">
          <span className="fs-k g">StayBookt</span>
          <div className="fs-sb-t">All five jobs. Done.</div>
        </div>
        <div className="fs-sb-r">
          <b>$199</b>
          <span>a month</span>
        </div>
      </div>

      <p className="fs-kick">
        It is not a discount on a receptionist. <span className="g">It is a different way of
        buying the same outcome.</span>
      </p>
      <p className="fs-fine">
        We are not claiming to replace five hires on day one, and we are not going to put a big
        scary salary number next to our price to make it look small. That is the work. It still has
        to get done. Right now you are the one doing it, at nine at night.
      </p>
    </div>
  );
}

const FS_CSS = `
.fsal{--g:linear-gradient(100deg,#06b6d4,#10b981 55%,#4f46e5);background:#fff;border:1px solid #e9e9e5;border-radius:26px;padding:clamp(22px,3vw,36px);box-shadow:0 50px 100px -60px rgba(6,12,20,.55);}
.fs-head{display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding-bottom:18px;border-bottom:1px solid #f0f0f3;}
.fs-k{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#8a8f98;}
.fs-k.g{background:var(--g);-webkit-background-clip:text;background-clip:text;color:transparent;}
.fs-yr{font-size:12.5px;color:#a9aeb8;}
.fs-rows{padding-top:6px;}
.fs-row{display:grid;grid-template-columns:34px minmax(0,1fr);gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid #f5f5f7;opacity:0;transform:translateY(10px);transition:opacity .55s cubic-bezier(.16,1,.3,1),transform .55s cubic-bezier(.16,1,.3,1),filter .6s ease;}
.fs-row.in{opacity:1;transform:none;}
.fsal.settled .fs-row{opacity:.4;filter:saturate(.2);}
.fs-av{width:34px;height:34px;border-radius:50%;background:rgba(245,158,11,.14);color:#b45309;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;}
.fs-t b{display:block;font-size:15.5px;font-weight:600;color:var(--v4-ink,#06080d);}
.fs-t i{display:block;margin-top:2px;font-style:normal;font-size:13px;color:#9298a1;}
.fs-total{display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:20px 0 4px;transition:opacity .6s ease,filter .6s ease;}
.fsal.settled .fs-total{opacity:.4;filter:saturate(.2);}
.fs-total span{font-size:15px;font-weight:600;color:#6b7280;}
.fs-total b{font-size:clamp(26px,3.4vw,36px);font-weight:700;letter-spacing:-.03em;color:#b45309;}
.fs-vs{display:flex;align-items:center;gap:16px;margin:22px 0;}
.fs-vs span{flex:1;height:1px;background:#eaeaee;}
.fs-vs em{font-style:normal;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#c0c4c8;}
.fs-sb{display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;border:1px solid rgba(16,185,129,.35);border-radius:20px;padding:clamp(18px,2.4vw,26px);background:linear-gradient(180deg,rgba(16,185,129,.06),rgba(79,70,229,.04));opacity:0;transform:translateY(12px) scale(.99);transition:opacity .7s cubic-bezier(.16,1,.3,1) .1s,transform .7s cubic-bezier(.16,1,.3,1) .1s,box-shadow .7s ease;}
.fsal.settled .fs-sb{opacity:1;transform:none;box-shadow:0 26px 54px -34px rgba(16,185,129,.6);}
.fs-sb-t{margin-top:6px;font-size:clamp(19px,2.2vw,26px);font-weight:600;letter-spacing:-.025em;color:var(--v4-ink,#06080d);}
.fs-sb-r{text-align:right;}
.fs-sb-r b{display:block;font-size:clamp(30px,4.4vw,46px);font-weight:700;letter-spacing:-.03em;color:#059669;font-variant-numeric:tabular-nums;}
.fs-sb-r span{display:block;margin-top:2px;font-size:13.5px;color:#6b7280;}
.fs-kick{margin:clamp(24px,3vw,32px) 0 0;font-size:clamp(19px,2.3vw,28px);font-weight:600;letter-spacing:-.025em;line-height:1.28;color:var(--v4-ink,#06080d);max-width:30ch;}
.fs-kick .g{background:var(--g);-webkit-background-clip:text;background-clip:text;color:transparent;}
.fs-fine{margin:16px 0 0;font-size:13px;line-height:1.55;color:#9298a1;max-width:64ch;}
@media(max-width:520px){.fs-sb{flex-direction:column;align-items:flex-start;}.fs-sb-r{text-align:left;}}
@media(prefers-reduced-motion:reduce){.fsal *{transition:none !important;}.fs-row{opacity:1;transform:none;}.fs-sb{opacity:1;transform:none;}}
`;

/* ============================================================
 * 2. THE VALUE SHARE — drag it, see who keeps what.
 * ========================================================== */
export function ValueShare() {
  const [today, setToday] = useState(600000);
  /* Illustrative only. A business that runs without the owner, with recurring
   * revenue and clean books, is worth more than one that does not. We show a
   * conservative 1.6x on the baseline as the built value. */
  const built = Math.round(today * 1.6);
  const increase = built - today;
  const ours = Math.round(increase * 0.2);
  const yours = built - ours;
  const pctOurs = (ours / built) * 100;

  return (
    <div className="vsh">
      <style>{VS_CSS}</style>

      <div className="vsh-ctl">
        <label htmlFor="vsh">What is the business worth today?</label>
        <output>{fmt(today)}</output>
        <input
          id="vsh"
          type="range"
          min={250000}
          max={2000000}
          step={25000}
          value={today}
          onChange={(e) => setToday(Number(e.target.value))}
        />
        <div className="vsh-ends">
          <span>$250K</span>
          <span>$2M</span>
        </div>
      </div>

      <div className="vsh-bars">
        <div className="vsh-bar">
          <div className="vsh-lab">
            <span>Today</span>
            <b>{fmt(today)}</b>
          </div>
          <div className="vsh-track">
            <i className="base" style={{ width: `${(today / built) * 100}%` }} />
          </div>
        </div>

        <div className="vsh-bar">
          <div className="vsh-lab">
            <span>After we build it</span>
            <b>{fmt(built)}</b>
          </div>
          <div className="vsh-track">
            <i className="base" style={{ width: `${(today / built) * 100}%` }} />
            <i className="grow" style={{ left: `${(today / built) * 100}%`, width: `${(increase / built) * 100}%` }} />
            <i className="ours" style={{ left: `${100 - pctOurs}%`, width: `${pctOurs}%` }} />
          </div>
        </div>
      </div>

      <div className="vsh-out">
        <div className="vsh-you">
          <span>You keep</span>
          <b>{fmt(yours)}</b>
          <i>Everything it was already worth, plus 80% of everything we added.</i>
        </div>
        <div className="vsh-us">
          <span>We take</span>
          <b>{fmt(ours)}</b>
          <i>20% of the increase. Only when you cash it in.</i>
        </div>
      </div>

      <p className="vsh-fine">
        Illustrative. The uplift shown is a conservative 1.6x on the baseline, which is what tends to
        happen when a business gains recurring revenue, clean books, and the ability to run without
        its owner. Your real baseline gets agreed independently and in writing on day one. If the
        number does not move, we do not get paid.
      </p>
    </div>
  );
}

const VS_CSS = `
.vsh{background:#fff;border:1px solid #e9e9e5;border-radius:26px;padding:clamp(22px,3vw,36px);box-shadow:0 50px 100px -60px rgba(6,12,20,.5);text-align:left;}
.vsh-ctl label{display:block;font-size:13px;font-weight:600;color:#6b7280;}
.vsh-ctl output{display:block;margin-top:6px;font-size:clamp(28px,3.6vw,40px);font-weight:700;letter-spacing:-.03em;color:var(--v4-ink,#06080d);font-variant-numeric:tabular-nums;}
.vsh-ctl input[type=range]{width:100%;margin:18px 0 6px;accent-color:#10b981;height:6px;}
.vsh-ends{display:flex;justify-content:space-between;font-size:12px;color:#a9aeb8;}

.vsh-bars{margin-top:clamp(22px,3vw,30px);display:flex;flex-direction:column;gap:18px;}
.vsh-lab{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:8px;}
.vsh-lab span{font-size:13px;font-weight:600;color:#6b7280;}
.vsh-lab b{font-size:16px;font-weight:700;color:var(--v4-ink,#06080d);font-variant-numeric:tabular-nums;}
.vsh-track{position:relative;height:22px;border-radius:999px;background:#f1f1f4;overflow:hidden;}
.vsh-track i{position:absolute;top:0;bottom:0;transition:width .35s cubic-bezier(.16,1,.3,1),left .35s cubic-bezier(.16,1,.3,1);}
.vsh-track .base{left:0;background:#cbd2da;}
.vsh-track .grow{background:linear-gradient(90deg,#10b981,#34d399);}
.vsh-track .ours{background:repeating-linear-gradient(135deg,#4f46e5 0 6px,#6366f1 6px 12px);}

.vsh-out{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:clamp(24px,3vw,32px);}
@media(max-width:600px){.vsh-out{grid-template-columns:1fr;}}
.vsh-out>div{border-radius:18px;padding:18px 20px;}
.vsh-you{background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.28);}
.vsh-us{background:rgba(79,70,229,.06);border:1px solid rgba(79,70,229,.24);}
.vsh-out span{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6b7280;}
.vsh-out b{display:block;margin-top:7px;font-size:clamp(24px,3vw,34px);font-weight:700;letter-spacing:-.03em;font-variant-numeric:tabular-nums;}
.vsh-you b{color:#047857;}
.vsh-us b{color:#4338ca;}
.vsh-out i{display:block;margin-top:8px;font-style:normal;font-size:13.5px;line-height:1.5;color:#6b7280;}
.vsh-fine{margin:20px 0 0;font-size:13px;line-height:1.55;color:#9298a1;max-width:70ch;}
@media(prefers-reduced-motion:reduce){.vsh-track i{transition:none;}}
`;

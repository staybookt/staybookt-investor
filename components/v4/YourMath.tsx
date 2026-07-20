'use client';

import { useState, type ReactNode } from 'react';
import { min } from '@/lib/css';

/* YOUR MATH: the mirror, not the promise.
 *
 * READ THIS BEFORE "IMPROVING" ANYTHING. The old leak calculator is a documented,
 * forbidden anti-pattern on this site, and the reason is precise: it baked OUR
 * assumptions into hidden multipliers (recovery rates, close rates, annualisation) and
 * produced dollar claims we could not back. It fabricated precision and printed it as
 * the reader's number.
 *
 * THIS COMPONENT IS ALLOWED BECAUSE IT DOES NONE OF THAT:
 *   - Three inputs, all the OWNER'S own numbers. The only number of ours anywhere in
 *     the arithmetic is the public $199 price.
 *   - Every displayed figure is derivable from those inputs by arithmetic a reader can
 *     check in their head: a division against 199, a multiply by four weeks, a multiply
 *     of two of their own numbers. NO recovery-rate multipliers, NO annualised loss
 *     claims, NO percentages of ours, NO "you will recover X", NO "you are losing X a
 *     year". The quotes line says "asked-for work", which is literally what it is: work
 *     they were asked to price, at their own average ticket.
 *   - A disclosure sits under the output saying exactly what this is: their arithmetic,
 *     not our promise, because we do not know their close rate and will not pretend to.
 *   - This lives on /growth, a private noindexed test page.
 * If you add a coefficient that is not the reader's own input or the public price, you
 * have rebuilt the leak calculator and it is banned. Do not.
 *
 * ACCESSIBILITY LAWS, from the site audits: real buttons and a real number input per
 * field (keyboard operable, focus visible), 48px tap targets, works at 390px, and the
 * quiet grey is #69707d (4.5:1 or better on this background). #6b7280 is BANNED. */

const PRICE = 199;

const W = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const word = (n: number) => (n >= 0 && n < W.length ? W[n] : String(n));
const money = (n: number) => '$' + n.toLocaleString('en-US');

type Field = {
  key: 'job' | 'missed' | 'quotes';
  label: string;
  hint: string;
  minV: number;
  maxV: number;
  step: number;
  isMoney: boolean;
};

const FIELDS: Field[] = [
  { key: 'job', label: 'Your average job', hint: 'What a typical finished job is worth to you', minV: 50, maxV: 5000, step: 50, isMoney: true },
  { key: 'missed', label: 'Calls you miss in a week', hint: 'Rang out, went to voicemail, came in while you were on the tools', minV: 0, maxV: 40, step: 1, isMoney: false },
  { key: 'quotes', label: 'Quotes unchased in a month', hint: 'Sent, then buried. No yes, no no', minV: 0, maxV: 50, step: 1, isMoney: false },
];

const CSS = `
.ym{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);padding:clamp(80px,11vw,140px) 0;}
.ym .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.ym .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.ym h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);font-weight:600;letter-spacing:-.035em;line-height:1.03;color:var(--v4-ink,#06080d);max-width:16ch;}
.ym h2 .g{background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;}
.ym-lead{margin-top:20px;font-size:clamp(16px,1.8vw,19px);line-height:1.62;color:#42474f;max-width:58ch;}

.ym-card{margin-top:clamp(36px,4.6vw,56px);background:#fff;border:1px solid #e6e6e1;border-radius:24px;
  box-shadow:0 40px 80px -46px rgba(6,12,20,.35),0 2px 6px -2px rgba(6,12,20,.06);
  padding:clamp(22px,3vw,40px);}

.ym-fields{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.2vw,28px);}
@media(max-width:860px){.ym-fields{grid-template-columns:1fr;}}
.ym-f{border:1px solid #e6e6e1;border-radius:16px;padding:16px 16px 14px;}
.ym-f .lb{display:block;font-size:14.5px;font-weight:600;color:var(--v4-ink,#06080d);}
.ym-f .ht{display:block;margin-top:3px;font-size:12.5px;line-height:1.45;color:#69707d;}
.ym-row{margin-top:12px;display:flex;align-items:stretch;gap:8px;}
/* 48px tap targets, real buttons, visible focus. Non-negotiable. */
.ym-btn{flex:0 0 48px;min-width:48px;min-height:48px;border-radius:12px;border:1px solid #cfd3cd;
  background:#f6f6f3;color:var(--v4-ink,#06080d);font-size:22px;font-weight:600;line-height:1;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:background .2s ease,border-color .2s ease;}
.ym-btn:hover{background:#ecece8;border-color:#b9beb7;}
.ym-btn:active{background:#e2e2dd;}
.ym-btn:focus-visible{outline:2px solid #059669;outline-offset:2px;}
.ym-btn:disabled{opacity:.35;cursor:default;}
.ym-val{position:relative;flex:1 1 auto;min-width:0;display:flex;align-items:center;}
.ym-val .cur{position:absolute;left:12px;font-size:16px;font-weight:600;color:#69707d;pointer-events:none;}
.ym-in{width:100%;min-height:48px;border:1px solid #cfd3cd;border-radius:12px;background:#fff;
  font-family:inherit;font-size:19px;font-weight:600;color:var(--v4-ink,#06080d);text-align:center;
  -moz-appearance:textfield;appearance:textfield;}
.ym-in::-webkit-outer-spin-button,.ym-in::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
.ym-in:focus-visible{outline:2px solid #059669;outline-offset:2px;}

/* THE ECHO. Their numbers, said back. The figures carry the ink gradient because they
   are the point; everything around them stays quiet. */
.ym-out{margin-top:clamp(24px,3vw,36px);border-top:1px solid #e6e6e1;padding-top:clamp(20px,2.6vw,30px);}
.ym-line{padding:12px 0;font-size:clamp(17px,2.1vw,23px);font-weight:600;letter-spacing:-.02em;line-height:1.45;color:var(--v4-ink,#06080d);max-width:34ch;}
.ym-line b{font-weight:700;background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;white-space:nowrap;}
.ym-line.quiet{font-weight:500;color:#42474f;}
.ym-note{margin-top:clamp(18px,2.2vw,26px);font-size:13.5px;line-height:1.6;color:#69707d;max-width:64ch;}
`;

export default function YourMath() {
  const [v, setV] = useState<{ job: number; missed: number; quotes: number }>({
    job: 400,
    missed: 3,
    quotes: 4,
  });

  const set = (f: Field, next: number) => {
    const n = Math.min(f.maxV, Math.max(f.minV, Math.round(next)));
    setV((p) => ({ ...p, [f.key]: Number.isFinite(n) ? n : p[f.key] }));
  };

  const { job, missed, quotes } = v;

  /* Every figure below is the reader's own inputs plus the public price. Nothing else. */
  const months = Math.floor(job / PRICE);           // whole months one job covers
  const jobsForMonth = job > 0 ? Math.ceil(PRICE / job) : 0; // jobs to cover one month
  const missedMonthly = missed * 4;                 // their weekly count, four weeks
  const quoteValue = quotes * job;                  // their count times their ticket

  const lines: { key: string; quiet?: boolean; jsx: ReactNode }[] = [];

  if (months >= 1) {
    lines.push({
      key: 'cover',
      jsx: (
        <>One job at <b>{money(job)}</b> covers {word(months)} month{months === 1 ? '' : 's'} of StayBookt.</>
      ),
    });
  } else {
    lines.push({
      key: 'cover',
      jsx: (
        <>It takes {word(jobsForMonth)} jobs at <b>{money(job)}</b> to cover a month of StayBookt.</>
      ),
    });
  }

  if (missed > 0) {
    lines.push({
      key: 'missed',
      jsx: (
        <>
          If even one of those <b>{missedMonthly}</b> missed calls a month was a job, that is{' '}
          <b>{money(job)}</b> against $199.
        </>
      ),
    });
  } else {
    lines.push({
      key: 'missed',
      quiet: true,
      jsx: <>No missed calls in a week. Nothing leaking there, and this line is not for you.</>,
    });
  }

  if (quotes > 0) {
    lines.push({
      key: 'quotes',
      jsx: (
        <>
          Your {quotes === 1 ? 'one unchased quote carries' : String(quotes) + ' unchased quotes carry'}{' '}
          <b>{money(quoteValue)}</b> of asked-for work a month.
        </>
      ),
    });
  } else {
    lines.push({
      key: 'quotes',
      quiet: true,
      jsx: <>No unchased quotes on the table. Nothing to add up.</>,
    });
  }

  return (
    <section className="ym" aria-label="Your math, not ours">
      <style>{min(CSS)}</style>
      <div className="wrap">
        <div className="eyebrow">The arithmetic</div>
        <h2>Your math, <span className="g">not ours.</span></h2>
        <p className="ym-lead">
          Anyone who quotes you a savings figure off a website made it up. So this does no
          projecting at all. Put in your own three numbers and it says them back, next to the
          one number of ours that is public: $199 a month.
        </p>

        <div className="ym-card">
          <div className="ym-fields">
            {FIELDS.map((f) => {
              const val = v[f.key];
              return (
                <div className="ym-f" key={f.key}>
                  <label className="lb" htmlFor={'ym-' + f.key}>{f.label}</label>
                  <span className="ht">{f.hint}</span>
                  <div className="ym-row">
                    <button
                      type="button"
                      className="ym-btn"
                      onClick={() => set(f, val - f.step)}
                      disabled={val <= f.minV}
                      aria-label={'Decrease ' + f.label.toLowerCase()}
                    >
                      &minus;
                    </button>
                    <div className="ym-val">
                      {f.isMoney && <span className="cur" aria-hidden="true">$</span>}
                      <input
                        id={'ym-' + f.key}
                        className="ym-in"
                        type="number"
                        inputMode="numeric"
                        min={f.minV}
                        max={f.maxV}
                        step={f.step}
                        value={val}
                        onChange={(e) => set(f, Number(e.target.value))}
                      />
                    </div>
                    <button
                      type="button"
                      className="ym-btn"
                      onClick={() => set(f, val + f.step)}
                      disabled={val >= f.maxV}
                      aria-label={'Increase ' + f.label.toLowerCase()}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ym-out" aria-live="polite">
            {lines.map((l) => (
              <p key={l.key} className={'ym-line' + (l.quiet ? ' quiet' : '')}>{l.jsx}</p>
            ))}
            <p className="ym-note">
              This is your arithmetic, not our promise. We do not know your close rate, your
              margins or your market, and we are not going to pretend we do. The numbers above
              are your inputs, multiplied and divided where you can check them in your head.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

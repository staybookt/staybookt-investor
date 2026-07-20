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
 * RESTYLED FOR THE KEYNOTE TAKE (July 2026). The logic and the inputs are untouched;
 * only the output changed clothes. The section is dark now, the inputs sit compact at
 * the top, and THE READER'S OWN NUMBER renders in the same giant gradient type as the
 * five stat screens above it. Their figure is the biggest thing on the page, which is
 * the whole argument. It updates instantly as the inputs change: no count-up here, no
 * transition lag, because a calculator that lags feels like it is thinking up an
 * answer instead of doing arithmetic.
 *
 * ACCESSIBILITY LAWS, from the site audits: real buttons and a real number input per
 * field (keyboard operable, focus visible), 48px tap targets, works at 390px. The
 * quiet grey on this dark section is #8a8f98 (6.27:1 on #050506); the mid grey is
 * #aeb6c4. #6b7280 is BANNED everywhere, and light-section greys do not belong here.
 */

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
/* PRESENTATION PASS (July 2026, with the pinned-stage GrowthNumbers). Logic and
   inputs untouched, per the block above. The section now centres itself in about
   one viewport as the finale of the sequence, the steppers grew into large quiet
   controls, and the spacing loosened. min-height, not height: on a phone the three
   stacked fields plus the payoff are taller than a screen and must never clip. */
.ym{background:#050506;color:#f5f5f7;display:flex;align-items:center;min-height:100vh;min-height:100svh;padding:clamp(70px,9vw,110px) 0;}
.ym .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);text-align:center;}
.ym .eyebrow{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#8a8f98;}
.ym h2{margin:14px auto 0;font-size:clamp(30px,4.4vw,56px);font-weight:600;letter-spacing:-.035em;line-height:1.03;color:#fff;max-width:16ch;}
.ym h2 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.ym-lead{margin:18px auto 0;font-size:clamp(15.5px,1.7vw,18px);line-height:1.6;color:#aeb6c4;max-width:56ch;}
/* THE INPUTS. Compact, at the top, out of the way of the payoff. */
.ym-fields{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,22px);max-width:940px;margin:clamp(36px,5vw,54px) auto 0;text-align:left;}
@media(max-width:860px){.ym-fields{grid-template-columns:1fr;}}
.ym-f{border:1px solid #23262e;border-radius:18px;background:#0b0c10;padding:18px 18px 16px;}
.ym-f .lb{display:block;font-size:14.5px;font-weight:600;color:#f5f5f7;}
.ym-f .ht{display:block;margin-top:4px;font-size:12.5px;line-height:1.45;color:#8a8f98;}
.ym-row{margin-top:12px;display:flex;align-items:stretch;gap:10px;}
/* 48px tap targets minimum (these run 52), real buttons, visible focus. Non-negotiable. */
.ym-btn{flex:0 0 52px;min-width:48px;min-height:52px;border-radius:14px;border:1px solid #2c2f38;background:#15171d;color:#f5f5f7;font-size:24px;font-weight:600;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease,border-color .2s ease;}
.ym-btn:hover{background:#1c1f27;border-color:#3a3e49;}
.ym-btn:active{background:#23262f;}
.ym-btn:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
.ym-btn:disabled{opacity:.35;cursor:default;}
.ym-val{position:relative;flex:1 1 auto;min-width:0;display:flex;align-items:center;}
.ym-val .cur{position:absolute;left:12px;font-size:16px;font-weight:600;color:#8a8f98;pointer-events:none;}
.ym-in{width:100%;min-height:52px;border:1px solid #2c2f38;border-radius:14px;background:#0b0c10;font-family:inherit;font-size:21px;font-weight:600;color:#fff;text-align:center;-moz-appearance:textfield;appearance:textfield;}
.ym-in::-webkit-outer-spin-button,.ym-in::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
.ym-in:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
/* THE PAYOFF. The reader's own number in the same keynote type as the five screens
   above. It snaps, never eases: arithmetic, not theatre. */
.ym-out{margin-top:clamp(44px,6vw,72px);}
.ym-k{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#8a8f98;}
.ym-big{margin-top:clamp(8px,1.6vh,18px);font-family:var(--font-display),'Inter Tight','Helvetica Neue',Arial,sans-serif;font-size:clamp(96px,22vw,260px);line-height:.95;font-weight:700;letter-spacing:-.05em;font-variant-numeric:tabular-nums;background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.ym-cap{margin:clamp(12px,2vh,22px) auto 0;max-width:34ch;font-size:clamp(18px,2.2vw,25px);font-weight:600;letter-spacing:-.02em;line-height:1.4;color:#fff;}
.ym-lines{margin:clamp(24px,3vw,36px) auto 0;max-width:56ch;}
.ym-line{padding:7px 0;font-size:clamp(15px,1.7vw,18.5px);line-height:1.55;color:#aeb6c4;}
.ym-line b{font-weight:700;color:#fff;font-variant-numeric:tabular-nums;white-space:nowrap;}
.ym-line.quiet{color:#8a8f98;}
.ym-note{margin:clamp(22px,2.6vw,32px) auto 0;font-size:13px;line-height:1.6;color:#8a8f98;max-width:62ch;}
/* "$5,000" is six characters; the phone ramp keeps it inside 390px. */
@media(max-width:760px){.ym-big{font-size:clamp(56px,17vw,80px);}}
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

  const cap =
    months >= 1
      ? 'covers ' + word(months) + ' month' + (months === 1 ? '' : 's') + ' of StayBookt.'
      : 'means ' + word(jobsForMonth) + ' jobs cover a month of StayBookt.';

  const lines: { key: string; quiet?: boolean; jsx: ReactNode }[] = [];

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
          <div className="ym-k">Your average job</div>
          <div className="ym-big">{money(job)}</div>
          <p className="ym-cap">{cap}</p>
          <div className="ym-lines">
            {lines.map((l) => (
              <p key={l.key} className={'ym-line' + (l.quiet ? ' quiet' : '')}>{l.jsx}</p>
            ))}
          </div>
          <p className="ym-note">
            This is your arithmetic, not our promise. We do not know your close rate, your
            margins or your market, and we are not going to pretend we do. The numbers above
            are your inputs, multiplied and divided where you can check them in your head.
          </p>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { min } from '@/lib/css';

/* THE GROWTH QUIZ: one held card, seven steps, and the mirror at the end.
 *
 * This replaced GrowthNumbers (the pinned keynote stage) and the standalone YourMath
 * section. Jacob rejected three scroll-driven versions of this page as confusing to
 * drive; the approved design holds ONE card in the viewport and swaps its content.
 * Nothing advances on scroll. Nothing advances on a timer. The reader taps, clicks or
 * presses a key, and that is the only way through.
 *
 * WHY A QUIZ: guess before reveal makes the figures land. The reader commits to 40%
 * and then watches 62% count up; the gap between their guess and the published number
 * IS the argument, and no scroll choreography ever did that.
 *
 * THE MIRROR, NOT THE PROMISE. READ THIS BEFORE "IMPROVING" ANYTHING.
 * The old leak calculator is a documented, forbidden anti-pattern on this site, and
 * the reason is precise: it baked OUR assumptions into hidden multipliers (recovery
 * rates, close rates, annualisation) and produced dollar claims we could not back. It
 * fabricated precision and printed it as the reader's number.
 *
 * THE ARITHMETIC HERE IS ALLOWED BECAUSE IT DOES NONE OF THAT:
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
 * THE SCORE LINE judges the reader's three QUIZ GUESSES only ("You called 2 of 3."),
 * never their business. The stack-up card sets the industry's published numbers beside
 * theirs and draws no conclusion for them.
 *
 * MOTION: card swaps are a ~350ms fade with a slight slide, played on the incoming
 * card. The three reveal figures count up once, ~900ms ease-out cubic, and never
 * again. prefers-reduced-motion gets instant swaps and no count-ups, via both the CSS
 * media query and a matchMedia check for the JS-driven count. No aria-live on the
 * count, on purpose: a screen reader gets the final text in DOM order and is never
 * shouted at by sixty intermediate values.
 *
 * ACCESSIBILITY LAWS, from the site audits: options are real buttons in a group
 * labelled by the question heading; answered options go aria-disabled (not disabled)
 * so keyboard focus is never dropped; focus moves to the new card's heading on every
 * advance; tap targets run 48px or better; works at 390px. Quiet grey on this dark
 * section is #8a8f98 (6.27:1 on #050506); mid grey is #aeb6c4; the emerald #34d399
 * clears 10:1. #6b7280 is BANNED everywhere.
 *
 * STATE IS REACT STATE. A refresh restarts the quiz from the cold open. Accepted:
 * this is a private draft for two founders, not a saved form.
 */

const PRICE = 199;
const W = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const word = (n: number) => (n >= 0 && n < W.length ? W[n] : String(n));
const capW = (n: number) => {
  const w = word(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
};
const money = (n: number) => '$' + n.toLocaleString('en-US');

type Question = {
  key: string;
  eye: string;
  question: string;
  options: string[];
  answer: string;
  fig: (p: number) => string;
  small?: boolean;
  line: string;
  src: string;
};

/* Every figure is published external research, named quietly on its card and linked
   in full in the Sources list below the quiz. The dropped stats stay dropped: see the
   note in app/growth/page.tsx. */
const QUESTIONS: Question[] = [
  {
    key: 'missed',
    eye: 'Missed calls',
    question: 'What share of calls to home-service businesses ring out unanswered?',
    options: ['25%', '40%', '62%', '75%'],
    answer: '62%',
    fig: (p) => Math.round(62 * p) + '%',
    line: 'of calls to home-service businesses are never answered live.',
    src: '411 Locals, 2024',
  },
  {
    key: 'speed',
    eye: 'Speed to lead',
    question: 'Answering a new lead within the hour makes you how much more likely to win it than waiting a day?',
    options: ['2x', '4x', '7x', '10x'],
    answer: '7x',
    fig: (p) => Math.round(7 * p) + 'x',
    line: 'more likely to win the lead when you answer within the hour. The average business takes 42 hours.',
    src: 'Harvard Business Review, 2011',
  },
  {
    key: 'retention',
    eye: 'Repeat customers',
    question: 'Raising customer retention five percent raises profit by up to?',
    options: ['10%', '25%', '50%', '95%'],
    answer: '95%',
    fig: (p) => Math.round(25 * p) + '-' + Math.round(95 * p) + '%',
    small: true,
    line: 'more profit from raising customer retention by just five percent.',
    src: 'Bain & Company, via Harvard Business Review, 2014',
  },
];

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

const CARDS = 7;

const CSS = `
/* ONE HELD CARD. The section is the viewport; the card content swaps in place.
   64px of top padding keeps the card clear of the fixed nav. overflow-y on the view
   is a safety net for short phones: the flow itself must reach every word. */
.gq{position:relative;background:#050506;color:#f5f5f7;height:100vh;height:100svh;min-height:560px;display:flex;flex-direction:column;padding-top:64px;}
.gq-bar{position:relative;flex:0 0 auto;display:flex;align-items:center;justify-content:center;height:48px;}
.gq-prog{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#8a8f98;}
.gq-back{position:absolute;left:clamp(10px,3vw,32px);top:0;min-width:48px;min-height:48px;display:flex;align-items:center;justify-content:center;border:0;background:transparent;color:#8a8f98;font-size:22px;line-height:1;cursor:pointer;border-radius:12px;transition:color .2s ease;}
.gq-back:hover{color:#fff;}
.gq-back:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
.gq-view{flex:1 1 auto;min-height:0;overflow-y:auto;display:flex;}
.gq-card{margin:auto;width:100%;max-width:1120px;padding:14px clamp(20px,4vw,40px) 44px;display:flex;flex-direction:column;align-items:center;text-align:center;}
/* THE SWAP. ~350ms fade with a slight slide on the incoming card. Reduced motion
   gets the instant version via the media query below. */
@keyframes gq-in{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
.gq-card.anim{animation:gq-in .35s ease both;}
@media(prefers-reduced-motion:reduce){.gq-card.anim{animation:none;}}
.gq-eye{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#8a8f98;}
.gq-h{margin:14px auto 0;font-size:clamp(27px,3.8vw,50px);font-weight:600;letter-spacing:-.03em;line-height:1.08;color:#fff;max-width:24ch;outline:none;}
.gq-h .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.gq-sub{margin:16px auto 0;font-size:clamp(15.5px,1.7vw,18px);line-height:1.6;color:#aeb6c4;max-width:52ch;}
.gq-cta{margin-top:clamp(22px,3.5vh,38px);min-height:48px;padding:12px 34px;border-radius:999px;border:0;background:#fff;color:#0b0c10;font-family:inherit;font-size:15.5px;font-weight:600;cursor:pointer;transition:transform .2s ease;}
.gq-cta:hover{transform:translateY(-1px);}
.gq-cta:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
/* OPTIONS. Real buttons; after the pick they resolve in place: the correct one goes
   emerald, the reader's wrong pick keeps a light outline, the rest fall back. They
   go aria-disabled, never disabled, so keyboard focus is not dropped. */
.gq-opts{margin-top:clamp(20px,3.5vh,34px);display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;width:100%;max-width:640px;}
@media(max-width:560px){.gq-opts{grid-template-columns:1fr 1fr;}}
.gq-opt{min-height:56px;border-radius:16px;border:1px solid #2c2f38;background:#15171d;color:#f5f5f7;font-family:inherit;font-size:19px;font-weight:600;cursor:pointer;transition:background .2s ease,border-color .2s ease,color .2s ease,opacity .2s ease;}
.gq-opt:hover{background:#1c1f27;border-color:#3a3e49;}
.gq-opt:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
.gq-opt.ok{border-color:#34d399;color:#34d399;background:#0b0c10;cursor:default;}
.gq-opt.my{border-color:#aeb6c4;background:#15171d;cursor:default;}
.gq-opt.dim{opacity:.4;cursor:default;}
.gq-opt.ok:hover,.gq-opt.my:hover,.gq-opt.dim:hover{background:#15171d;}
.gq-opt.ok:hover{background:#0b0c10;}
/* THE FIGURE. Keynote scale, gradient on the number, tabular so digits do not
   jitter sideways while they count. Giant display text, so the gradient's quietest
   stop clears the WCAG large-text bar with room. */
.gq-fig{margin-top:clamp(12px,2.6vh,24px);font-family:var(--font-display),'Inter Tight','Helvetica Neue',Arial,sans-serif;font-size:clamp(96px,22vw,240px);line-height:.95;font-weight:700;letter-spacing:-.05em;font-variant-numeric:tabular-nums;background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.gq-fig-sm{font-size:clamp(56px,14vw,170px);}
@media(max-width:760px){.gq-fig{font-size:clamp(48px,16vw,84px);}.gq-fig-sm{font-size:clamp(38px,12vw,64px);}}
.gq-line{margin:clamp(10px,2vh,18px) auto 0;max-width:36ch;font-size:clamp(17px,2vw,23px);font-weight:600;letter-spacing:-.02em;line-height:1.4;color:#fff;}
.gq-srcline{margin:12px auto 0;max-width:60ch;font-size:12.5px;line-height:1.5;color:#8a8f98;}
/* THE INPUTS. Salvaged from YourMath: 48px minimum tap targets (these run 52), real
   buttons and a real number input per field, visible focus. Non-negotiable. */
.gq-fields{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,22px);width:100%;max-width:940px;margin:clamp(22px,4vh,40px) auto 0;text-align:left;}
@media(max-width:860px){.gq-fields{grid-template-columns:1fr;}}
.gq-f{border:1px solid #23262e;border-radius:18px;background:#0b0c10;padding:18px 18px 16px;}
.gq-f .lb{display:block;font-size:14.5px;font-weight:600;color:#f5f5f7;}
.gq-f .ht{display:block;margin-top:4px;font-size:12.5px;line-height:1.45;color:#8a8f98;}
.gq-row{margin-top:12px;display:flex;align-items:stretch;gap:10px;}
.gq-btn{flex:0 0 52px;min-width:48px;min-height:52px;border-radius:14px;border:1px solid #2c2f38;background:#15171d;color:#f5f5f7;font-size:24px;font-weight:600;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease,border-color .2s ease;}
.gq-btn:hover{background:#1c1f27;border-color:#3a3e49;}
.gq-btn:active{background:#23262f;}
.gq-btn:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
.gq-btn:disabled{opacity:.35;cursor:default;}
.gq-val{position:relative;flex:1 1 auto;min-width:0;display:flex;align-items:center;}
.gq-val .cur{position:absolute;left:12px;font-size:16px;font-weight:600;color:#8a8f98;pointer-events:none;}
.gq-in{width:100%;min-height:52px;border:1px solid #2c2f38;border-radius:14px;background:#0b0c10;font-family:inherit;font-size:21px;font-weight:600;color:#fff;text-align:center;-moz-appearance:textfield;appearance:textfield;}
.gq-in::-webkit-outer-spin-button,.gq-in::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
.gq-in:focus-visible{outline:2px solid #34d399;outline-offset:2px;}
/* THE REVEAL. Their arithmetic in the keynote type. It renders instantly, no
   count-up: arithmetic, not theatre. */
.gq-cap{margin:clamp(10px,2vh,18px) auto 0;max-width:34ch;font-size:clamp(17px,2.1vw,24px);font-weight:600;letter-spacing:-.02em;line-height:1.4;color:#fff;}
.gq-covers{margin:14px auto 0;max-width:56ch;font-size:clamp(15px,1.7vw,18.5px);line-height:1.55;color:#aeb6c4;}
.gq-covers b{font-weight:700;color:#fff;font-variant-numeric:tabular-nums;white-space:nowrap;}
.gq-covers.quiet{color:#8a8f98;}
.gq-note{margin:clamp(16px,2.4vh,26px) auto 0;font-size:13px;line-height:1.6;color:#8a8f98;max-width:62ch;}
/* THE STACK-UP. Two quiet columns, industry beside theirs. No verdict. */
.gq-cols{margin-top:clamp(20px,3.5vh,34px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(14px,2vw,22px);width:100%;max-width:900px;text-align:left;}
@media(max-width:720px){.gq-cols{grid-template-columns:1fr;}}
.gq-col{border:1px solid #23262e;border-radius:18px;background:#0b0c10;padding:20px 22px;}
.gq-col .hd{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#8a8f98;}
.gq-col ul{list-style:none;margin:12px 0 0;padding:0;}
.gq-col li{padding:7px 0;font-size:clamp(14px,1.5vw,16.5px);line-height:1.5;color:#aeb6c4;}
.gq-col li b{font-weight:700;color:#fff;font-variant-numeric:tabular-nums;}
.gq-score{margin-top:18px;font-size:14px;line-height:1.5;color:#8a8f98;}
.gq-close{margin:14px auto 0;max-width:56ch;font-size:clamp(15px,1.7vw,18px);line-height:1.55;color:#aeb6c4;}
`;

/* The count-up. Runs once per mount, ~900ms ease-out cubic, then holds the final
   string. Instant when reduced motion is on. Plain text, no aria-live. */
function Fig({ fig, small, instant }: { fig: (p: number) => string; small?: boolean; instant: boolean }) {
  const [p, setP] = useState(instant ? 1 : 0);
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    if (instant) {
      setP(1);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const u = Math.min(1, (t - t0) / 900);
      setP(1 - Math.pow(1 - u, 3));
      if (u < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [instant]);
  return <div className={'gq-fig' + (small ? ' gq-fig-sm' : '')}>{fig(p)}</div>;
}

export default function GrowthQuiz() {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [v, setV] = useState<{ job: number; missed: number; quotes: number }>({
    job: 400,
    missed: 3,
    quotes: 4,
  });
  const [reduced, setReduced] = useState(false);
  const headRef = useRef<HTMLHeadingElement | null>(null);
  const navved = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  /* Focus lands on the new card's heading on every user-driven advance or back,
     never on initial load. */
  useEffect(() => {
    if (navved.current) headRef.current?.focus();
  }, [step]);

  const go = (n: number) => {
    navved.current = true;
    setStep(Math.max(0, Math.min(CARDS - 1, n)));
  };

  const set = (f: Field, next: number) => {
    const n = Math.min(f.maxV, Math.max(f.minV, Math.round(next)));
    setV((p) => ({ ...p, [f.key]: Number.isFinite(n) ? n : p[f.key] }));
  };

  /* Every figure below is the reader's own inputs plus the public price. Nothing
     else. See the block at the top of this file before touching. */
  const { job, missed, quotes } = v;
  const months = Math.floor(job / PRICE);
  const jobsForMonth = job > 0 ? Math.ceil(PRICE / job) : 0;
  const missedMonthly = missed * 4;
  const quoteValue = quotes * job;
  const score = QUESTIONS.filter((q) => picks[q.key] === q.answer).length;

  const covers =
    months >= 1 ? (
      <>
        One job at <b>{money(job)}</b> covers {word(months)} {months === 1 ? 'month' : 'months'} of StayBookt.
      </>
    ) : (
      <>
        {capW(jobsForMonth)} jobs at <b>{money(job)}</b> cover a month of StayBookt.
      </>
    );

  const card = (() => {
    if (step === 0) {
      return (
        <>
          <div className="gq-eye">Internal draft</div>
          <h2 className="gq-h" tabIndex={-1} ref={headRef}>
            How well do you know the <span className="g">money in your business?</span>
          </h2>
          <p className="gq-sub">
            Three guesses against published research, then your own numbers said back to you.
          </p>
          <button type="button" className="gq-cta" onClick={() => go(1)}>
            Start
          </button>
        </>
      );
    }

    if (step >= 1 && step <= 3) {
      const q = QUESTIONS[step - 1];
      const picked = picks[q.key];
      return (
        <>
          <div className="gq-eye">{q.eye}</div>
          <h2 className="gq-h" tabIndex={-1} ref={headRef} id={'gq-q-' + q.key}>
            {q.question}
          </h2>
          <div className="gq-opts" role="group" aria-labelledby={'gq-q-' + q.key}>
            {q.options.map((o) => {
              const cls =
                'gq-opt' +
                (picked ? (o === q.answer ? ' ok' : o === picked ? ' my' : ' dim') : '');
              return (
                <button
                  key={o}
                  type="button"
                  className={cls}
                  aria-disabled={picked ? true : undefined}
                  onClick={() => {
                    if (!picked) setPicks((p) => ({ ...p, [q.key]: o }));
                  }}
                >
                  {o}
                </button>
              );
            })}
          </div>
          {picked && (
            <>
              <Fig fig={q.fig} small={q.small} instant={reduced} />
              <p className="gq-line">{q.line}</p>
              <p className="gq-srcline">{q.src}</p>
              <button type="button" className="gq-cta" onClick={() => go(step + 1)}>
                Next
              </button>
            </>
          )}
        </>
      );
    }

    if (step === 4) {
      return (
        <>
          <div className="gq-eye">Your numbers</div>
          <h2 className="gq-h" tabIndex={-1} ref={headRef}>
            Now three numbers <span className="g">only you know.</span>
          </h2>
          <p className="gq-sub">
            Rough is fine. The arithmetic happens on your screen and goes nowhere.
          </p>
          <div className="gq-fields">
            {FIELDS.map((f) => {
              const val = v[f.key];
              return (
                <div className="gq-f" key={f.key}>
                  <label className="lb" htmlFor={'gq-' + f.key}>
                    {f.label}
                  </label>
                  <span className="ht">{f.hint}</span>
                  <div className="gq-row">
                    <button
                      type="button"
                      className="gq-btn"
                      onClick={() => set(f, val - f.step)}
                      disabled={val <= f.minV}
                      aria-label={'Decrease ' + f.label.toLowerCase()}
                    >
                      &minus;
                    </button>
                    <div className="gq-val">
                      {f.isMoney && (
                        <span className="cur" aria-hidden="true">
                          $
                        </span>
                      )}
                      <input
                        id={'gq-' + f.key}
                        className="gq-in"
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
                      className="gq-btn"
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
          <button type="button" className="gq-cta" onClick={() => go(5)}>
            Continue
          </button>
        </>
      );
    }

    if (step === 5) {
      return (
        <>
          <div className="gq-eye">The arithmetic</div>
          <h2 className="gq-h" tabIndex={-1} ref={headRef}>
            Your math, <span className="g">not ours.</span>
          </h2>
          <div className="gq-fig">{money(quotes > 0 ? quoteValue : job)}</div>
          <p className="gq-cap">
            {quotes > 0
              ? quotes === 1
                ? 'your one unchased quote, priced at your own average job.'
                : 'of asked-for work in your ' + quotes + ' unchased quotes each month.'
              : 'is your average job.'}
          </p>
          <p className="gq-covers">{covers}</p>
          {quotes === 0 && (
            <p className="gq-covers quiet">
              No unchased quotes on the table, so the figure above is simply your average job.
            </p>
          )}
          <p className="gq-note">
            This is your arithmetic, not our promise. We do not know your close rate, your
            margins or your market, and we are not going to pretend we do. The numbers above
            are your inputs, multiplied and divided where you can check them in your head.
          </p>
          <button type="button" className="gq-cta" onClick={() => go(6)}>
            Next
          </button>
        </>
      );
    }

    return (
      <>
        <div className="gq-eye">The stack-up</div>
        <h2 className="gq-h" tabIndex={-1} ref={headRef}>
          The industry&apos;s numbers, <span className="g">beside yours.</span>
        </h2>
        <div className="gq-cols">
          <div className="gq-col">
            <div className="hd">The industry</div>
            <ul>
              <li>
                <b>62%</b> of calls to home-service businesses are never answered live.
              </li>
              <li>
                <b>7x</b> more likely to win the lead when you answer within the hour.
              </li>
              <li>
                <b>37%</b> of estimates close on the first visit. The rest close in the
                follow-up, or never. (ServiceTitan)
              </li>
              <li>
                <b>88%</b> of consumers would use a business that replies to all of its
                reviews. (BrightLocal, 2024)
              </li>
              <li>
                <b>25-95%</b> more profit from raising retention five percent.
              </li>
            </ul>
          </div>
          <div className="gq-col">
            <div className="hd">Yours</div>
            <ul>
              <li>
                Your average job is <b>{money(job)}</b>.
              </li>
              <li>
                {missed > 0 ? (
                  <>
                    You miss <b>{missed}</b> {missed === 1 ? 'call' : 'calls'} a week, which is{' '}
                    <b>{missedMonthly}</b> a month.
                  </>
                ) : (
                  <>No missed calls in a week.</>
                )}
              </li>
              <li>
                {quotes > 0 ? (
                  <>
                    <b>{quotes}</b> {quotes === 1 ? 'quote sits' : 'quotes sit'} unchased a
                    month, carrying <b>{money(quoteValue)}</b> of asked-for work.
                  </>
                ) : (
                  <>No unchased quotes on the table.</>
                )}
              </li>
              <li>{covers}</li>
            </ul>
          </div>
        </div>
        <p className="gq-score">You called {score} of 3 on the quiz.</p>
        <p className="gq-close">
          Every industry figure above is published research, linked just below. Yours came
          from you, and the disclosure from the last card still applies.
        </p>
      </>
    );
  })();

  return (
    <section className="gq" aria-label="The growth quiz">
      <style>{min(CSS)}</style>
      <div className="gq-bar">
        {step > 0 && (
          <button type="button" className="gq-back" onClick={() => go(step - 1)} aria-label="Back to the previous card">
            &larr;
          </button>
        )}
        <div className="gq-prog">{(step + 1) + ' of ' + CARDS}</div>
      </div>
      <div className="gq-view">
        <div key={step} className="gq-card anim">
          {card}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { min } from '@/lib/css';

/* THE PAYROLL SWAP — extracted to its own client component (Jul 30 2026 pricing pass).
 *
 * Was a static, boxed card sitting inline in /pricing (border+radius+shadow — the exact "card
 * chrome" this site's own standing rule bans: never box copy in a white card, use plain type +
 * hairline row dividers instead). It was also the one flagship-adjacent page with zero motion,
 * while the homepage tells this identical "five salaries -> $199" story as a scroll-triggered
 * reveal (HomeJourney.tsx's PriceReveal / .hjc-num). This ports that same technique here: one
 * IntersectionObserver, fires once, adds a class, CSS transition-delays do the staggering. No
 * scroll-scrubbing, no rAF — same "on-view, timer-staggered" pattern the header comment in
 * HomeJourney.tsx names explicitly, just re-themed for a light page instead of the dark hero.
 *
 * CURRENCY SWITCHED TO US$ (Jacob's call, Aug 4 2026, on Richard's "we need to declare"
 * comment: charge in US$, the far bigger market). Figures are real median US pay per role —
 * BLS Occupational Employment and Wage Statistics, May 2025 medians annualized (hourly
 * median x 2080, rounded to the nearest $1,000): marketing specialists $37.87/hr -> $79K,
 * receptionists $18.27 -> $38K, production/planning/expediting clerks (scheduler) $28.68
 * -> $60K, secretaries and admin assistants $22.86 -> $48K, billing and posting clerks
 * $23.32 -> $49K. Sum is exact: 79 + 38 + 60 + 48 + 49 = 274.
 * Marketer moved to the top to match the homepage PJOBS ordering (Richard, Aug 3 doc).
 */
const ROLES: { role: string; pay: string }[] = [
  { role: 'A marketer', pay: '$79,000' },
  { role: 'A receptionist', pay: '$38,000' },
  { role: 'A scheduler', pay: '$60,000' },
  { role: 'An assistant', pay: '$48,000' },
  { role: 'A collections clerk', pay: '$49,000' },
];

const CSS = `
.prc-swap{background:#fff;padding:clamp(80px,11vw,140px) 0;border-top:1px solid #e6e6e1;}
.prc-swap .inner{max-width:720px;margin:0 auto;}
.prc-swap .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
/* max-width 22ch, was 16ch: Richard's replacement question (66 chars) wrapped into FOUR
   56px lines at 16ch. 22ch holds it to three. */
.prc-swap h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.03;max-width:22ch;font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.prc-swap .lede{margin-top:24px;font-size:clamp(17px,2vw,21px);line-height:1.6;color:#42474f;max-width:56ch;}

/* the rows themselves: plain type, hairline dividers, no card. Each row and the final line
   carry their own transition-delay so one IntersectionObserver + one class toggle is enough
   to stagger the whole sequence — no per-row JS state needed. */
.pswap .rows{margin-top:clamp(38px,5vw,56px);}
.pswap .srow{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:15px 0;
  border-bottom:1px solid #ededea;opacity:0;transform:translateY(14px);
  transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);}
.pswap.on .srow{opacity:1;transform:none;}
.pswap .srow:nth-child(1){transition-delay:.05s;}
.pswap .srow:nth-child(2){transition-delay:.22s;}
.pswap .srow:nth-child(3){transition-delay:.39s;}
.pswap .srow:nth-child(4){transition-delay:.56s;}
.pswap .srow:nth-child(5){transition-delay:.73s;}
.pswap .rname{font-size:clamp(15px,1.9vw,18px);font-weight:500;color:#6b7280;}
.pswap .rpay{font-size:clamp(15px,1.9vw,18px);font-weight:600;color:#9aa0a8;white-space:nowrap;}
.pswap .rpay s{text-decoration:line-through;text-decoration-thickness:2px;text-decoration-color:transparent;
  transition:text-decoration-color .5s ease .15s;}
.pswap.on .srow .rpay s{text-decoration-color:#c3c8d0;}
.pswap .rpay em{font-style:normal;font-weight:500;color:#b6bcc4;font-size:.8em;}
.pswap .total{border-bottom:0;padding-top:20px;transition-delay:.9s;}
.pswap .total .rname{font-weight:700;color:var(--v4-ink);}
.pswap .total .rpay{color:var(--v4-ink);font-size:clamp(17px,2.2vw,22px);}
.pswap.on .total .rpay s{transition-delay:.9s;}
.pswap .total .rpay s{text-decoration-thickness:2.5px;}

/* the payoff line: same gradient-sweep-text trick as HomeJourney's .hjc-price (a 230%-wide
   gradient parked off to the right, slides on), plus a soft glow bloom behind it — both
   ported from the homepage's own price reveal, not invented fresh. No box, no dark footer
   bar: it sits directly on the white section behind one plain hairline like the rows above. */
.pswap .swap-us{position:relative;display:flex;align-items:baseline;justify-content:space-between;
  gap:16px;margin-top:22px;padding-top:clamp(22px,3vw,30px);border-top:1px solid #ededea;
  opacity:0;transform:translateY(14px);
  transition:opacity .9s cubic-bezier(.16,1,.3,1) 1.1s,transform .9s cubic-bezier(.16,1,.3,1) 1.1s;}
.pswap.on .swap-us{opacity:1;transform:none;}
.pswap .swap-us::before{content:'';position:absolute;inset:-60% -8%;z-index:-1;
  background:radial-gradient(55% 60% at 20% 50%,rgba(79,70,229,.2),rgba(16,185,129,.14) 55%,transparent 75%);
  filter:blur(40px);opacity:0;transform:scale(.8);
  transition:opacity 1.1s ease 1.2s,transform 1.1s cubic-bezier(.16,1,.3,1) 1.2s;}
.pswap.on .swap-us::before{opacity:1;transform:scale(1);}
.pswap .usl{font-size:clamp(15px,1.9vw,18px);font-weight:600;color:var(--v4-ink);}
.pswap .usp{font-size:clamp(30px,4.4vw,48px);font-weight:700;letter-spacing:-.03em;white-space:nowrap;
  background:var(--sb-grad);background-size:230% 100%;background-position:100% 50%;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  transition:background-position 1.2s cubic-bezier(.16,1,.3,1) 1.25s;}
.pswap.on .usp{background-position:0% 50%;}
.pswap .usp em{font-style:normal;font-size:.4em;font-weight:600;color:#8b93a5;-webkit-text-fill-color:#8b93a5;letter-spacing:0;}
.prc-swap .src{margin-top:20px;font-size:13px;line-height:1.55;color:#9aa0a8;max-width:56ch;}

@media(max-width:520px){.pswap .rname,.pswap .rpay{font-size:15px;}}
@media(prefers-reduced-motion:reduce){
  .pswap .srow,.pswap .swap-us,.pswap .swap-us::before,.pswap .usp{transition:none;}
  .pswap .srow,.pswap .swap-us{opacity:1;transform:none;}
  .pswap .rpay s{text-decoration-color:#c3c8d0;}
  .pswap .swap-us::before{opacity:1;transform:scale(1);}
  .pswap .usp{background-position:0% 50%;}
}
`;

export default function PayrollSwap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOn(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setOn(true);
          obs.disconnect();
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="prc-swap" ref={ref}>
      <style>{min(CSS)}</style>
      <div className="wrap">
        <div className="inner">
          {/* RICHARD'S REPLACEMENT (website review doc, Aug 3 2026): "Not sold on the Why so
              Cheap? tagline" — his Undeniable Value block ships verbatim below, dashes swapped
              for commas per the no-dash rule. */}
          <div className="eyebrow">Undeniable value</div>
          <h2>What if you had a team that helped you do everything you do today?</h2>
          <p className="lede">
            Big companies have the luxury of many people and departments doing the work. Small
            and medium sized companies can&rsquo;t justify those roles, so the owner does it all, at
            all hours of the day. The power of StayBookt is that we are giving you technology
            that provides the support of 5 different skills on your payroll, for only $199/mth USD.
          </p>

          <div className={`pswap${on ? ' on' : ''}`}>
            <div className="rows">
              {ROLES.map((r) => (
                <div className="srow" key={r.role}>
                  <span className="rname">{r.role}</span>
                  <span className="rpay">
                    <s>{r.pay}</s>
                    <em>&nbsp;/year</em>
                  </span>
                </div>
              ))}
              <div className="srow total">
                <span className="rname">Five people on payroll</span>
                <span className="rpay">
                  <s>$274,000</s>
                  <em>&nbsp;/year</em>
                </span>
              </div>
            </div>
            <div className="swap-us">
              <span className="usl">All five jobs, done for you</span>
              {/* /mth: one price format sitewide for compact labels. Prose sentences say
                  "$199 a month"; every compact label says "$199/mth". */}
              <span className="usp">
                $199
                <em>&nbsp;/mth USD</em>
              </span>
            </div>
          </div>

          <p className="src">
            Each figure is median US pay for that role (US Bureau of Labor Statistics, 2025). We
            are not five new hires. We are the outcome those hires would give you, bought a
            different way. All prices in US dollars.
          </p>
        </div>
      </div>
    </section>
  );
}

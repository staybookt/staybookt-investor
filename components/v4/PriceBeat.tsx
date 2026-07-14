'use client';

import { useEffect, useRef, useState } from 'react';
import { START_LINK } from '@/lib/site';

/* THE PRICE BEAT.
 *
 * This replaced the three-column "What we do / What you do / What it costs" card
 * that used to sit between the hero and the journey (Jacob, July 14 2026). That
 * card was the only piece of UI on the homepage: film above it, film below it, and
 * a spec sheet with bullet dots in the middle. It did not clash on wording, it
 * clashed because it was a component.
 *
 * It was also doing three unrelated jobs, and each had a better home:
 *   - "What we do" was redundant. The journey beats below it already ARE that.
 *   - "What you do" is the payoff, not a feature. It belongs at the landing.
 *   - "What it costs" deserved its own screen, which is this.
 *
 * WHY THERE IS ONLY ONE LINE UNDER THE NUMBER. The old card carried five bullets:
 * plus tax, no lock-in, ninety days, unlimited, no share of your business. Every
 * one is DEFENSIVE, and a wall of defence on a homepage reads as anxiety. We only
 * needed them when the 20% value share existed and had to be disclosed up front or
 * we were hiding it. The value share is dead, so there is no catch to get ahead of.
 * The four other lines are stated in full on /pricing and /whats-included, both one
 * click away in the nav. DO NOT re-add them here.
 *
 * The animation is the pricing page's argument turned into a moment: the five jobs
 * you cannot hire rise one at a time, hold, then collapse into a single number. It
 * earns the price instead of declaring it. */

const JOBS: { r: string; d: string }[] = [
  { r: 'Receptionist', d: 'Answers, every single time' },
  { r: 'Dispatcher', d: 'Books it, confirms it, reminds them' },
  { r: 'Estimator', d: 'Sends the quote, chases the yes' },
  { r: 'Marketer', d: 'Gets you found, builds the reviews' },
  { r: 'Bookkeeper', d: 'Chases the invoice, reads it back' },
];

export default function PriceBeat() {
  const ref = useRef<HTMLElement | null>(null);
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
            setStep(JOBS.length + 2);
            return;
          }
          // 0..4 the jobs arrive · 5 they hold and collapse · 6 the number lands
          for (let i = 0; i <= JOBS.length + 1; i++) {
            timers.push(setTimeout(() => setStep(i), 260 + i * 520));
          }
        }),
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const collapsing = step >= JOBS.length;
  const landed = step >= JOBS.length + 1;

  return (
    <section
      className={`pb${collapsing ? ' collapsing' : ''}${landed ? ' landed' : ''}`}
      ref={ref}
    >
      <style>{CSS}</style>
      <div className="wrap">
        <div className="pb-k">What it costs</div>

        <div className="pb-stage">
          {/* the five people you cannot hire */}
          <div className="pb-jobs" aria-hidden={landed}>
            {JOBS.map((j, i) => (
              <div className={`pb-job${step >= i ? ' in' : ''}`} key={j.r}>
                <span className="pb-r">{j.r}</span>
                <span className="pb-d">{j.d}</span>
              </div>
            ))}
          </div>

          {/* and the one number they collapse into */}
          <div className="pb-num">
            <div className="pb-fig">
              <span className="pb-dol">$</span>199<span className="pb-per">/mo</span>
            </div>
            <p className="pb-sub">Nothing upfront. Cancel any time.</p>
            <div className="pb-cta">
              <a href="/pricing" className="pb-link">
                See the pricing <span aria-hidden>&rarr;</span>
              </a>
              <a href={START_LINK} className="pb-pill">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.pb{position:relative;background:#050506;padding:clamp(90px,13vh,140px) 0;overflow:hidden;}
.pb::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(46% 40% at 50% 50%,rgba(16,185,129,.13),transparent 68%);
  opacity:0;transition:opacity 1.4s ease;}
.pb.landed::before{opacity:1;}
.pb .wrap{position:relative;z-index:1;width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);text-align:center;}

.pb-k{font-size:11.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#5c6470;
  transition:color .8s ease;}
.pb.landed .pb-k{color:#5eead4;}

/* one stage. the jobs and the number occupy the SAME space, so the number does not
   appear next to them, it replaces them. */
.pb-stage{position:relative;margin-top:clamp(34px,4.6vw,54px);min-height:380px;
  display:flex;align-items:center;justify-content:center;}
@media(max-width:640px){.pb-stage{min-height:340px;}}

.pb-jobs{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:clamp(9px,1.3vw,15px);transition:opacity .85s ease,transform .95s cubic-bezier(.16,1,.3,1),filter .85s ease;}
.pb.collapsing .pb-jobs{opacity:0;transform:scale(.9) translateY(6px);filter:blur(7px);}

.pb-job{opacity:0;transform:translateY(16px);
  transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);}
.pb-job.in{opacity:1;transform:none;}
.pb-r{display:block;font-size:clamp(26px,3.6vw,44px);font-weight:600;letter-spacing:-.035em;line-height:1.1;color:#f5f5f7;}
.pb-d{display:block;margin-top:3px;font-size:clamp(12.5px,1.3vw,14.5px);color:#6f7787;}

.pb-num{position:relative;z-index:2;opacity:0;transform:translateY(20px) scale(.94);filter:blur(6px);
  transition:opacity 1s cubic-bezier(.16,1,.3,1) .12s,transform 1.15s cubic-bezier(.16,1,.3,1) .12s,filter .9s ease .12s;
  pointer-events:none;}
.pb.landed .pb-num{opacity:1;transform:none;filter:none;pointer-events:auto;}

.pb-fig{display:flex;align-items:flex-start;justify-content:center;gap:2px;color:#fff;font-weight:700;
  letter-spacing:-.055em;line-height:.88;font-size:clamp(92px,15vw,190px);font-variant-numeric:tabular-nums;}
.pb-dol{font-size:.34em;font-weight:600;margin-top:.16em;color:#8b93a5;}
.pb-per{align-self:flex-end;margin-bottom:.2em;margin-left:8px;font-size:.13em;font-weight:600;letter-spacing:0;color:#8b93a5;}

.pb-sub{margin:16px auto 0;font-size:clamp(17px,2vw,22px);font-weight:600;letter-spacing:-.02em;color:#c7ccd6;}

.pb-cta{margin-top:clamp(26px,3.2vw,36px);display:flex;align-items:center;justify-content:center;gap:22px;flex-wrap:wrap;}
.pb-link{font-size:15px;font-weight:600;color:#5eead4;text-decoration:none;transition:opacity .3s ease;}
.pb-link:hover{opacity:.75;}
.pb-pill{display:inline-flex;align-items:center;background:#f5f5f7;color:#050506;font-size:15px;font-weight:600;
  border-radius:999px;padding:14px 28px;text-decoration:none;transition:transform .3s ease;}
.pb-pill:hover{transform:translateY(-1px);}

@media(prefers-reduced-motion:reduce){
  .pb-jobs{display:none;}
  .pb-num,.pb-job{opacity:1;transform:none;filter:none;transition:none;}
  .pb::before{opacity:1;}
}
`;

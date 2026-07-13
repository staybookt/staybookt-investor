'use client';

import { useState } from 'react';

/* THE PROMISE BOARD.
 *
 * The About page's one object. Anybody can publish values. The only thing that
 * makes a promise mean anything is what it costs you to keep it, so every
 * promise here opens to show the price we pay for it.
 *
 * The last one is the important one: we have no testimonials on this site,
 * and that fact is the proof of the promise rather than a hole in it. */

type Vow = {
  n: string;
  h: string;
  p: string;
  cost: string;
};

const PROMISES: Vow[] = [
  {
    n: '01',
    h: 'We are operators, not a software company.',
    p: 'We do not hand you a dashboard and wish you luck. We answer the phone. We chase the quote. We ask for the review. If you ever feel like you are operating software, we have built the wrong thing.',
    cost: 'It costs us the thing every software company is chasing. We cannot take a thousand clients this year, because a thousand clients means a thousand businesses we would actually have to run. We will grow slowly, on purpose, and we will turn work away before we take work we cannot do properly.',
  },
  {
    n: '02',
    h: 'The owner stays in charge.',
    p: 'We take the busywork, not the business. Your prices. Your standards. Your name on the van. Your customers, in your voice. We are staff, not a partner who quietly takes the wheel.',
    cost: 'It costs us the easy optimisations. We will not raise your prices because the model says we can, or take jobs you would have turned down, or talk to your customers in a way you would not. Some of those things would make us more money. We do not get to do them.',
  },
  {
    n: '03',
    h: 'We would rather lose the sale.',
    p: 'Before we ever meet you, we do the work: we call your line, we text your listing, we search for you the way a customer does, and we try to book a job. Then we tell you what we found, straight, even when what we found is that you do not need us.',
    cost: 'It costs us hours of unpaid work on people who will never pay us, and it costs us the deals a sharper pitch would have closed. We will say “you are fine, do not hire us” on a call we have already spent a morning preparing for. That is the deal.',
  },
  {
    n: '04',
    h: 'We only get properly paid if you actually get free.',
    p: 'The monthly fee keeps the lights on. The real money comes from the value we build in your business, and only when you cash it in. We agree what it is worth on day one, and we take a share of the increase, and nothing else.',
    cost: 'It costs us certainty. If the business does not become more valuable, we are not paid for the part that matters, no matter how hard we worked or how good our excuses are. We carry that risk instead of handing it to you.',
  },
  {
    n: '05',
    h: 'We will never fake proof.',
    p: 'No invented testimonials. No borrowed logos. No screenshots of results we did not produce. Where we illustrate the service, we say so, in writing, on the page.',
    cost: 'Look around this website. There is not a single customer quote on it, because we have not earned one yet. That absence is the most expensive thing on this site, and it is staying there until somebody real says something real.',
  },
];

export function Promises() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="prm">
      <style>{CSS}</style>
      {PROMISES.map((p, i) => (
        <div className={`pr${open === i ? ' open' : ''}`} key={p.n}>
          <button type="button" onClick={() => setOpen(open === i ? null : i)}>
            <span className="pr-n">{p.n}</span>
            <span className="pr-h">{p.h}</span>
            <span className="pr-pl" aria-hidden>+</span>
          </button>

          <div className="pr-body">
            <div className="pr-in">
              <p className="pr-p">{p.p}</p>
              <div className="pr-cost">
                <div className="pr-ck">What it costs us</div>
                <p>{p.cost}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const CSS = `
.prm{margin-top:clamp(40px,5vw,60px);max-width:900px;}
.pr{border-top:1px solid rgba(255,255,255,.12);}
.pr:last-child{border-bottom:1px solid rgba(255,255,255,.12);}
.pr button{width:100%;display:grid;grid-template-columns:52px minmax(0,1fr) 34px;gap:16px;align-items:center;
  background:transparent;border:0;color:#fff;font-family:inherit;text-align:left;
  padding:clamp(24px,3vw,32px) 0;cursor:pointer;transition:opacity .3s ease;}
.pr button:hover{opacity:.75;}
.pr-n{font-size:13px;font-weight:700;letter-spacing:.1em;color:#5c6470;}
.pr-h{font-size:clamp(19px,2.5vw,30px);font-weight:600;letter-spacing:-.028em;line-height:1.2;}
.pr-pl{width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.2);color:#9ba2ae;
  display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:300;line-height:1;
  transition:transform .45s cubic-bezier(.16,1,.3,1),background .35s ease,color .35s ease,border-color .35s ease;}
.pr.open .pr-pl{transform:rotate(45deg);background:#10b981;border-color:transparent;color:#fff;
  box-shadow:0 10px 24px -10px rgba(16,185,129,.9);}

.pr-body{max-height:0;overflow:hidden;transition:max-height .55s cubic-bezier(.16,1,.3,1);}
.pr.open .pr-body{max-height:640px;}
.pr-in{padding:0 0 clamp(30px,3.6vw,40px) 68px;}
@media(max-width:640px){.pr button{grid-template-columns:40px minmax(0,1fr) 30px;gap:12px;}.pr-in{padding-left:52px;}}
.pr-p{margin:0;font-size:clamp(16px,1.85vw,19px);line-height:1.6;color:#c7ccd6;max-width:58ch;}

/* the teeth */
.pr-cost{margin-top:24px;border-left:3px solid #f59e0b;padding:2px 0 2px 20px;max-width:58ch;}
.pr-ck{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#f5c877;}
.pr-cost p{margin:9px 0 0;font-size:clamp(15px,1.75vw,18px);line-height:1.6;color:#9ba2ae;}
@media(prefers-reduced-motion:reduce){.pr-body,.pr-pl,.pr button{transition:none;}}
`;

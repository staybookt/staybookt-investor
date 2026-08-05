'use client';

import { useState } from 'react';
import { START_LINK } from '@/lib/site';
import { min } from '@/lib/css';
import { track } from '@/lib/analytics';

/* THE MONEY QUESTIONS, ON THE MONEY PAGE.
 *
 * These used to live in the /how-it-works FAQ, which meant a buyer standing on the
 * pricing page looking at the number had to leave it to find out whether there was a
 * contract. Moved here (Jacob, July 14 2026).
 *
 * TERRITORY. Every page owns one, and nothing is said twice:
 *   /how-it-works    → how the thing runs
 *   /whats-included  → who does what, and what is mine
 *   /pricing         → money
 *
 * If you are about to add a money question anywhere else, add it here instead. */

type Q = { k: string; c: string; q: string; a: string };

const QS: Q[] = [
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'Is there a contract?',
    a: 'No. There is no term and nothing to be trapped in. Cancel any time on thirty days notice, with no penalty and no exit fee. We build your website before you have paid us a dollar, so the risk of this sits with us, which is where it belongs. We have to earn the next month, and the one after that, forever.',
  },
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'What if I want out in month seven?',
    a: 'Then you are out in month seven. Thirty days notice, no penalty, no exit fee, no argument. And you do not leave empty-handed: the website, the domain, your Google Business Profile, your customer list and your reviews all go with you.',
  },
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'What if it just does not work?',
    a: 'For the first ninety days you can change your mind for any reason at all, and we refund every month you paid. You do not have to prove we failed and we do not get to decide whether your reason is good enough. You email us and say so. The website is yours either way.',
  },
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'Is there a limit on calls and texts?',
    a: 'No. Unlimited calls and texts, with no per-minute billing and no overage charges, however busy the season gets. Every answering service on earth bills you by the minute. Charging you more in your busiest month is a strange way to say we are on your side.',
  },
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'Is $199 really the whole number?',
    /* WAS: domain only, "That is the entire list." Jacob confirmed the client absorbs card
       processing fees, which made that sentence false. Two items now, both named, with the
       rate. The point of this answer is that we would rather tell you now than have you find
       it on an invoice later, and that only works if the list is actually complete. */
    a: 'Almost. Here is everything, including the two things that sit outside it. It is $199/mth USD, plus applicable taxes. Two things sit outside that. Your domain registration, about twenty dollars a year, passed through at cost, and yours anyway. And if you take card payments, Stripe or Square charge their own fee, in the region of 2.9% plus thirty cents, which comes out of what you collect exactly as it would with any card processing. That fee is theirs, not ours: we do not mark it up and we take no cut of it. That is the entire list. There is no build fee, no setup fee, no menu of add-ons, no per-minute billing and no overage. And there is no back end: no commission on your jobs, no share of your revenue, and no share of what the business is worth if you ever sell it. We will tell you about twenty dollars and a card fee now rather than let you find them on an invoice later.',
  },
  {
    k: 'The catch',
    c: '#7c3aed',
    q: 'So where is the catch?',
    a: 'There is not one. We are two people rather than a hundred, so we are not paying for a sales team, an office or an ad budget. We build everything before you pay us, we grow slowly on purpose, and twenty clients we actually run properly beats a thousand we do not. If we ever start behaving like the agency that burned you, you can leave in thirty days and take everything with you.',
  },
];

export default function PricingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="pfq">
      <style>{min(CSS)}</style>
      <div className="wrap">
        <div className="fgrid">
          <div className="faside">
            {/* Just say FAQ. Earlier versions of this tried to be clever ("The questions
                behind the list", "Ask the awkward one", "The short answers") and every one
                of them wrapped into a broken-looking fragment on screen and made a reader
                stop and decode a section label. Every FAQ on this site now reads the same,
                and reads plainly (Jacob, live review, July 2026). Do not make it cute again. */}
            <div className="eyebrow">FAQ</div>
            <h2>
              Questions, <span className="g">answered</span><span className="pd">.</span>
            </h2>
            <p className="fa-p">
              Every question a person asks before they hand somebody two hundred dollars a month,
              answered here rather than on the call.
            </p>
            <a className="fa-cta" href={START_LINK} data-cta="faq_pricing">
              Get Started <span aria-hidden>&rarr;</span>
            </a>
            <div className="fa-links">
              <a href="/whats-included">See everything included</a>
              <a href="/how-it-works">See how it actually runs</a>
            </div>
          </div>

          <div className="list">
            {QS.map((x, i) => (
              <div
                key={x.q}
                className={`pfq-q${open === i ? ' open' : ''}`}
                style={{ ['--fc' as string]: x.c }}
              >
                <button
                  type="button"
                  onClick={() => {
                    /* Only the opening counts. Which objections people actually
                       have is the question; closing one answers nothing. */
                    if (open !== i) track('faq_open', { question: x.q, faq: 'pricing' });
                    setOpen(open === i ? null : i);
                  }}
                  aria-expanded={open === i}
                >
                  <span>
                    <span className="fk">{x.k}</span>
                    <span className="fq">{x.q}</span>
                  </span>
                  <span className="pl" aria-hidden>+</span>
                </button>
                <div className="fbody">
                  <p>{x.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.pfq{padding:clamp(90px,12vw,150px) 0;background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);}
.pfq .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.pfq .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.pfq .fgrid{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(32px,6vw,84px);align-items:start;}
@media(max-width:900px){.pfq .fgrid{grid-template-columns:1fr;gap:36px;}}
.pfq .faside{position:sticky;top:clamp(96px,12vh,130px);}
@media(max-width:900px){.pfq .faside{position:static;}}
.pfq h2{font-size:clamp(34px,4.6vw,60px);font-weight:600;letter-spacing:-.035em;line-height:1.0;margin:14px 0 0;max-width:9ch;}
.pfq h2 .g{background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;}
.pfq .fa-p{margin-top:20px;font-size:16.5px;line-height:1.6;color:#69707d;max-width:32ch;}
.pfq .fa-cta{display:inline-flex;align-items:center;gap:9px;margin-top:26px;background:var(--v4-ink,#06080d);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 28px;text-decoration:none;transition:gap .3s ease,transform .3s ease;}
.pfq .fa-cta:hover{gap:14px;transform:translateY(-1px);}
.pfq .fa-links{display:flex;flex-direction:column;gap:10px;margin-top:26px;}
.pfq .fa-links a{font-size:14.5px;font-weight:600;color:#0369a1;text-decoration:none;width:fit-content;border-bottom:1px solid transparent;transition:border-color .25s ease;}
.pfq .fa-links a:hover{border-color:#0369a1;}

.pfq .list{display:flex;flex-direction:column;gap:8px;}
.pfq-q{--fc:#4f46e5;position:relative;background:transparent;border:1px solid transparent;border-radius:18px;
  transition:background .35s ease,border-color .35s ease,box-shadow .35s ease,transform .35s ease;}
.pfq-q::after{content:'';position:absolute;left:clamp(16px,2vw,22px);right:clamp(16px,2vw,22px);bottom:0;height:1px;background:#e2e2dc;transition:opacity .3s ease;}
.pfq-q:last-child::after{opacity:0;}
.pfq-q:hover{background:rgba(255,255,255,.6);}
.pfq-q.open{background:#fff;border-color:#ececeb;box-shadow:0 26px 54px -34px rgba(6,12,20,.4);transform:translateY(-1px);}
.pfq-q.open::after{opacity:0;}
.pfq-q button{width:100%;display:grid;grid-template-columns:minmax(0,1fr) 34px;gap:16px;align-items:center;
  background:transparent;border:0;color:var(--v4-ink,#06080d);font-family:inherit;text-align:left;
  padding:clamp(20px,2.4vw,26px) clamp(16px,2vw,22px);cursor:pointer;}
.pfq-q .fk{display:block;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--fc);opacity:.85;}
.pfq-q .fq{display:block;margin-top:7px;font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;line-height:1.28;}
.pfq-q .pl{width:34px;height:34px;border-radius:50%;border:1px solid #dcdcd8;color:#8a8f98;
  display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:300;line-height:1;
  transition:transform .4s cubic-bezier(.16,1,.3,1),background .35s ease,color .35s ease,border-color .35s ease;}
.pfq-q:hover .pl{border-color:var(--fc);color:var(--fc);}
.pfq-q.open .pl{transform:rotate(45deg);background:var(--fc);border-color:transparent;color:#fff;box-shadow:0 8px 20px -8px var(--fc);}

/* max-height:0 + overflow:hidden CLIPS PIXELS. It does not touch the accessibility tree.
   So every collapsed answer here was still being read aloud, in full, while aria-expanded
   on the button said "collapsed" — the accordion did not exist to a screen reader, it was
   one wall of text that contradicted its own state. It also left anything focusable inside
   in the tab order, invisible.
   visibility:hidden fixes both and still animates. The 0s delay is load-bearing: opening,
   visible flips instantly so the height can animate; closing, it waits out the .55s so the
   body does not vanish on frame one. */
.pfq .fbody{max-height:0;overflow:hidden;visibility:hidden;
  transition:max-height .55s cubic-bezier(.16,1,.3,1),visibility 0s linear .55s;}
.pfq-q.open .fbody{max-height:520px;visibility:visible;
  transition:max-height .55s cubic-bezier(.16,1,.3,1),visibility 0s;}
.pfq .fbody p{margin:0;padding:0 clamp(16px,2vw,22px) clamp(22px,2.6vw,28px);font-size:16px;line-height:1.65;color:#52565e;max-width:62ch;}

@media(prefers-reduced-motion:reduce){.pfq .fbody,.pfq-q,.pfq-q .pl{transition:none;}}
`;

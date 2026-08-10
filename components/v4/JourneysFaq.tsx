'use client';

/* THE JOURNEYS LANDING FAQ — same .pfq pattern as every FAQ on the site (sticky aside,
 * "Questions, answered.", category kickers, single-open accordion).
 *
 * TERRITORY (the doctrine from PricingFaq): every page's FAQ owns its own ground.
 *   /pricing          → money
 *   /how-it-works     → how it runs
 *   /journeys/<one>   → that persona's objections
 *   /journeys (here)  → the stories themselves: which one, does it apply to me,
 *                       are they real, how do I start mine.
 *
 * NOTE ON "Are these real businesses?": this answer is where the illustrative-journeys
 * disclosure lives (Jacob deferred an on-page label; an honest FAQ answer covers it
 * without stamping the films). If this question is ever cut, the disclosure question
 * reopens — flag it before deleting. */

import { useState } from 'react';
import { START_LINK } from '@/lib/site';
import { min } from '@/lib/css';
import { track } from '@/lib/analytics';

type Q = { k: string; c: string; q: string; a: string };

const QS: Q[] = [
  {
    k: 'Where to start',
    c: '#06b6d4',
    q: 'Which journey should I start with?',
    a: 'Whichever week sounds like yours. Drowning in missed calls while you do the work, start with Marcus. Leads going cold while you deliver, Sean. Losing to whoever answers first, Kim. All three run the same spine, so you can’t pick wrong.',
  },
  {
    k: 'Your trade',
    c: '#4f46e5',
    q: 'My business isn’t one of these three.',
    a: 'The trade is the costume. The story underneath is the front of the business: calls, quotes, follow-up, reviews, invoices. If you run an owner-operated service business and the front of it runs through your phone, one of these weeks will look familiar.',
  },
  {
    k: 'The stories',
    c: '#10b981',
    q: 'Are these real businesses?',
    a: 'Marcus, Sean and Kim are composites, built from the real problems owners bring us and run through exactly what StayBookt does. The numbers show what the system is built to do, not one client’s measured results. When a client goes on the record, their real name and real numbers will be here.',
  },
  {
    k: 'Your journey',
    c: '#7c3aed',
    q: 'How do I start mine?',
    a: 'Thirty minutes to discuss how technology could improve your business, free. If it fits, we spend two weeks learning your business, your prices, your area, how you talk to a customer, and then the front office switches on. Every journey on this page starts at that same door.',
  },
];

export default function JourneysFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="jfq">
      <style>{min(CSS)}</style>
      <div className="jfq-wrap">
        <div className="jfq-grid">
          <div className="jfq-aside">
            <div className="jfq-eyebrow">FAQ</div>
            <h2>Questions, <span className="g">answered</span><span className="pd">.</span></h2>
            <p className="fa-p">The questions people ask while they&rsquo;re choosing a journey.</p>
            <a className="fa-cta" href={START_LINK} data-cta="faq_journeys">Get Started <span aria-hidden>&rarr;</span></a>
            <div className="fa-links">
              <a href="/pricing">The money questions live on Pricing</a>
              <a href="/how-it-works">See how it actually runs</a>
            </div>
          </div>
          <div className="jfq-list">
            {QS.map((x, i) => (
              <div key={x.q} className={`pfq-q${open === i ? ' open' : ''}`} style={{ ['--fc' as string]: x.c }}>
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => {
                    if (open !== i) track('faq_open', { question: x.q, faq: 'journeys' });
                    setOpen(open === i ? null : i);
                  }}
                >
                  <span><span className="fk">{x.k}</span><span className="fq">{x.q}</span></span>
                  <span className="pl" aria-hidden>+</span>
                </button>
                <div className="fbody"><p>{x.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.jfq{padding:clamp(70px,10vh,120px) 0;background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);}
.jfq .g{background:var(--sb-grad-ink,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));-webkit-background-clip:text;background-clip:text;color:transparent;}
.jfq .pd{color:#7c3aed;-webkit-text-fill-color:#7c3aed;}
.jfq-wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.jfq-eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.jfq-grid{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(32px,6vw,84px);align-items:start;}
@media(max-width:900px){.jfq-grid{grid-template-columns:1fr;gap:36px;}}
.jfq-aside{position:sticky;top:clamp(96px,12vh,130px);}
@media(max-width:900px){.jfq-aside{position:static;}}
.jfq h2{font-size:clamp(34px,4.6vw,60px);font-weight:600;letter-spacing:-.035em;line-height:1.0;margin:14px 0 0;max-width:9ch;}
.jfq .fa-p{margin-top:20px;font-size:16.5px;line-height:1.6;color:#69707d;max-width:32ch;}
.jfq .fa-cta{display:inline-flex;align-items:center;gap:9px;margin-top:26px;background:var(--v4-ink,#06080d);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 28px;text-decoration:none;transition:gap .3s ease,transform .3s ease;}
.jfq .fa-cta:hover{gap:14px;transform:translateY(-1px);}
.jfq .fa-links{display:flex;flex-direction:column;gap:10px;margin-top:26px;}
.jfq .fa-links a{font-size:14.5px;font-weight:600;color:#0369a1;text-decoration:none;width:fit-content;border-bottom:1px solid transparent;transition:border-color .25s ease;}
.jfq .fa-links a:hover{border-color:#0369a1;}
.jfq-list{display:flex;flex-direction:column;gap:8px;}
.jfq .pfq-q{--fc:#4f46e5;position:relative;background:transparent;border:1px solid transparent;border-radius:18px;transition:background .35s ease,border-color .35s ease,box-shadow .35s ease,transform .35s ease;}
.jfq .pfq-q::after{content:'';position:absolute;left:clamp(16px,2vw,22px);right:clamp(16px,2vw,22px);bottom:0;height:1px;background:#e2e2dc;transition:opacity .3s ease;}
.jfq .pfq-q:last-child::after{opacity:0;}
.jfq .pfq-q:hover{background:rgba(255,255,255,.6);}
.jfq .pfq-q.open{background:#fff;border-color:#ececeb;box-shadow:0 26px 54px -34px rgba(6,12,20,.4);transform:translateY(-1px);}
.jfq .pfq-q.open::after{opacity:0;}
.jfq .pfq-q button{width:100%;display:grid;grid-template-columns:minmax(0,1fr) 34px;gap:16px;align-items:center;background:transparent;border:0;color:var(--v4-ink,#06080d);font-family:inherit;text-align:left;padding:clamp(20px,2.4vw,26px) clamp(16px,2vw,22px);cursor:pointer;}
.jfq .pfq-q .fk{display:block;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--fc);opacity:.85;}
.jfq .pfq-q .fq{display:block;margin-top:7px;font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;line-height:1.28;}
.jfq .pfq-q .pl{width:34px;height:34px;border-radius:50%;border:1px solid #dcdcd8;color:#8a8f98;display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:300;line-height:1;transition:transform .4s cubic-bezier(.16,1,.3,1),background .35s ease,color .35s ease,border-color .35s ease;}
.jfq .pfq-q:hover .pl{border-color:var(--fc);color:var(--fc);}
.jfq .pfq-q.open .pl{transform:rotate(45deg);background:var(--fc);border-color:transparent;color:#fff;box-shadow:0 8px 20px -8px var(--fc);}
/* Emma V2: the + glyph sat optically off-center in its circle; a drawn plus is dead-center always. */
.jfq .pfq-q .pl{font-size:0;position:relative;}
.jfq .pfq-q .pl::before,.jfq .pfq-q .pl::after{content:'';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:currentColor;border-radius:1px;}
.jfq .pfq-q .pl::before{width:13px;height:1.5px;}
.jfq .pfq-q .pl::after{width:1.5px;height:13px;}

.jfq .fbody{max-height:0;overflow:hidden;visibility:hidden;transition:max-height .55s cubic-bezier(.16,1,.3,1),visibility 0s linear .55s;}
.jfq .pfq-q.open .fbody{max-height:520px;visibility:visible;transition:max-height .55s cubic-bezier(.16,1,.3,1),visibility 0s;}
.jfq .fbody p{margin:0;padding:0 clamp(16px,2vw,22px) clamp(22px,2.6vw,28px);font-size:16px;line-height:1.65;color:#52565e;max-width:62ch;}
@media(prefers-reduced-motion:reduce){.jfq .fbody,.jfq .pfq-q,.jfq .pfq-q .pl{transition:none;}}
`;

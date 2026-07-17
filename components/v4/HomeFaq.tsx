'use client';

import { useState } from 'react';
import { START_LINK } from '@/lib/site';

/* HOMEPAGE FAQ — the front-door greatest hits (Jacob, live review, July 2026).
 *
 * The homepage is the one page that has to be able to answer a stranger's first
 * questions without making them click away. This is NOT a fourth full FAQ: the
 * complete sets live where they belong (how the thing runs on /how-it-works, who
 * does what on /whats-included, money on /pricing). This is a curated cross-section,
 * the single highest-intent question from each of those, each pointing to the page
 * that carries the rest. Same accordion pattern as the other three, on purpose, so
 * the site reads as one thing.
 *
 * If you are tempted to grow this past five or six, do not. Put the new question on
 * its home page instead. The whole point of this block is that it is a taster. */

type Q = { k: string; c: string; q: string; a: string; more: { href: string; label: string } };

const QS: Q[] = [
  {
    k: 'The service', c: '#38bdf8',
    q: 'Is it AI, or a real person?',
    a: 'Both, on purpose. Anyone telling you it is all human is lying about the price. Anyone telling you it is all AI is lying about the quality. The AI handles the everyday calls, texts and bookings in your voice, and a real person on our team steps in on anything unusual before it ever reaches your customer.',
    more: { href: '/how-it-works', label: 'See how it runs' },
  },
  {
    k: 'The service', c: '#38bdf8',
    q: 'How does my phone actually get answered?',
    a: 'Your number stays your number. You forward your existing line to us, which takes about five minutes with your carrier and which you can undo yourself at any time. We never take control of your number and we never make you move it.',
    more: { href: '/how-it-works', label: 'See how it runs' },
  },
  {
    k: 'The money', c: '#818cf8',
    q: 'What does it cost, and is there a contract?',
    a: 'One plan: $199 a month, plus applicable taxes. Nothing upfront, no build fee, and no contract. Cancel any time on thirty days notice, and for the first ninety days you can change your mind for any reason and we refund every month you paid. There is no commission and no share of your revenue.',
    more: { href: '/pricing', label: 'See the pricing' },
  },
  {
    k: 'What is yours', c: '#34d399',
    q: 'What do I own if we ever part ways?',
    a: 'Everything that matters, and nothing is held hostage. The website is yours, your domain is in your name, your Google profile login is yours, and your customer list and reviews go with you. If we vanish tomorrow, you keep all of it.',
    more: { href: '/whats-included', label: 'See what is included' },
  },
  {
    k: 'The service', c: '#38bdf8',
    q: 'How long until I am live?',
    a: 'About thirty days from the first call. The first couple of weeks are us learning your business, your prices, your service area and how you talk, so that when we answer, it sounds like you and not a call center.',
    more: { href: '/how-it-works', label: 'See how it runs' },
  },
];

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="hfq">
      <style>{CSS}</style>
      <div className="wrap">
        <div className="fgrid">
          <div className="faside">
            <div className="eyebrow">FAQ</div>
            <h2>
              Questions, <span className="g">answered.</span>
            </h2>
            <p className="fa-p">
              The first things everyone asks, answered here. The full sets live on the pages they
              belong to.
            </p>
            <a className="fa-cta" href={START_LINK}>
              Get Started <span aria-hidden>&rarr;</span>
            </a>
          </div>

          <div className="list">
            {QS.map((x, i) => (
              <div
                key={x.q}
                className={`hfq-q${open === i ? ' open' : ''}`}
                style={{ ['--fc' as string]: x.c }}
              >
                <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                  <span>
                    <span className="fk">{x.k}</span>
                    <span className="fq">{x.q}</span>
                  </span>
                  <span className="pl" aria-hidden>+</span>
                </button>
                <div className="fbody">
                  <p>{x.a}</p>
                  <a className="fmore" href={x.more.href}>{x.more.label} <span aria-hidden>&rarr;</span></a>
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
.hfq{padding:clamp(90px,12vw,150px) 0;background:#050506;color:#f4f5f7;position:relative;}
.hfq::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(60% 60% at 50% 0%,rgba(16,185,129,.07),transparent 60%);}
.hfq .wrap{position:relative;z-index:1;width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.hfq .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.hfq .fgrid{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(32px,6vw,84px);align-items:start;}
@media(max-width:900px){.hfq .fgrid{grid-template-columns:1fr;gap:36px;}}
.hfq .faside{position:sticky;top:clamp(96px,12vh,130px);}
@media(max-width:900px){.hfq .faside{position:static;}}
.hfq h2{font-size:clamp(34px,4.6vw,60px);font-weight:600;letter-spacing:-.035em;line-height:1.0;margin:14px 0 0;max-width:9ch;color:#fff;}
.hfq h2 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.hfq .fa-p{margin-top:20px;font-size:16.5px;line-height:1.6;color:#9aa3b2;max-width:32ch;}
.hfq .fa-cta{display:inline-flex;align-items:center;gap:9px;margin-top:26px;background:var(--sb-grad);background-size:200% 100%;background-position:0% 50%;color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 28px;text-decoration:none;box-shadow:0 16px 40px -18px rgba(16,185,129,.7);transition:background-position .6s ease,gap .3s ease,transform .3s ease;}
.hfq .fa-cta:hover{background-position:100% 50%;gap:14px;transform:translateY(-1px);}

.hfq .list{display:flex;flex-direction:column;gap:8px;}
.hfq-q{--fc:#5eead4;position:relative;background:transparent;border:1px solid transparent;border-radius:18px;
  transition:background .35s ease,border-color .35s ease,box-shadow .35s ease,transform .35s ease;}
.hfq-q::after{content:'';position:absolute;left:clamp(16px,2vw,22px);right:clamp(16px,2vw,22px);bottom:0;height:1px;background:rgba(255,255,255,.08);transition:opacity .3s ease;}
.hfq-q:last-child::after{opacity:0;}
.hfq-q:hover{background:rgba(255,255,255,.03);}
.hfq-q.open{background:linear-gradient(180deg,#0d1219,#0a0d13);border-color:rgba(255,255,255,.09);box-shadow:0 30px 60px -34px rgba(0,0,0,.7);transform:translateY(-1px);}
.hfq-q.open::after{opacity:0;}
.hfq-q button{width:100%;display:grid;grid-template-columns:minmax(0,1fr) 34px;gap:16px;align-items:center;
  background:transparent;border:0;color:#f4f5f7;font-family:inherit;text-align:left;
  padding:clamp(20px,2.4vw,26px) clamp(16px,2vw,22px);cursor:pointer;}
.hfq-q .fk{display:block;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--fc);opacity:.9;}
.hfq-q .fq{display:block;margin-top:7px;font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;line-height:1.28;color:#f4f5f7;}
.hfq-q .pl{width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.18);color:#8a8f98;
  display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:300;line-height:1;
  transition:transform .4s cubic-bezier(.16,1,.3,1),background .35s ease,color .35s ease,border-color .35s ease;}
.hfq-q:hover .pl{border-color:var(--fc);color:var(--fc);}
.hfq-q.open .pl{transform:rotate(45deg);background:var(--fc);border-color:transparent;color:#04110d;box-shadow:0 8px 20px -8px var(--fc);}

/* max-height:0 + overflow:hidden CLIPS PIXELS. It does not touch the accessibility tree.
   So every collapsed answer here was still being read aloud, in full, while aria-expanded
   on the button said "collapsed" — the accordion did not exist to a screen reader, it was
   one wall of text that contradicted its own state. It also left anything focusable inside
   in the tab order, invisible.
   visibility:hidden fixes both and still animates. The 0s delay is load-bearing: opening,
   visible flips instantly so the height can animate; closing, it waits out the .55s so the
   body does not vanish on frame one. */
.hfq .fbody{max-height:0;overflow:hidden;visibility:hidden;
  transition:max-height .55s cubic-bezier(.16,1,.3,1),visibility 0s linear .55s;}
.hfq-q.open .fbody{max-height:520px;visibility:visible;
  transition:max-height .55s cubic-bezier(.16,1,.3,1),visibility 0s;}
.hfq .fbody p{margin:0;padding:0 clamp(16px,2vw,22px) 0;font-size:16px;line-height:1.65;color:#aeb6c4;max-width:62ch;}
.hfq .fbody .fmore{display:inline-block;margin:14px clamp(16px,2vw,22px) clamp(22px,2.6vw,28px);font-size:14px;font-weight:600;color:var(--fc);text-decoration:none;}
.hfq .fbody .fmore:hover{text-decoration:underline;}

@media(prefers-reduced-motion:reduce){.hfq .fbody,.hfq-q,.hfq-q .pl,.hfq .fa-cta{transition:none;}}
`;

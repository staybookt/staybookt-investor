'use client';

import { useState } from 'react';
import { START_LINK } from '@/lib/site';

/* WHAT'S INCLUDED — the objections, as an accordion.
 *
 * This replaced THREE prose sections (Jacob, July 14 2026): "Is it AI or a real
 * person" (three fat cards), "What you still do / What you own forever" (two
 * columns), and "What we do not do" (six cards). About twelve blocks of prose.
 *
 * None of them were sections. They were ANSWERS TO QUESTIONS a buyer is already
 * asking in his head, written out as paragraphs. So they are questions now, in the
 * same accordion pattern /how-it-works already uses, which means the site reads as
 * one thing instead of two.
 *
 * TERRITORY, and do not break this: /how-it-works owns the MONEY questions (cost,
 * contract, cancelling, call limits, month-seven exit). This page owns WHO DOES THE
 * WORK and WHAT IS MINE. Different questions, same pattern. The one deliberate
 * overlap is the wrong-price question, because it is the single biggest objection on
 * the site and a person auditing this page will ask it here, not go hunting.
 *
 * The best line we own is in here and it must not get softened:
 * "Anyone telling you it is all human is lying about the price. Anyone telling you
 *  it is all AI is lying about the quality." */

type Q = { k: string; c: string; q: string; a: string };

const QS: Q[] = [
  {
    k: 'Who does the work',
    c: '#0ea5e9',
    q: 'Is it AI, or a real person?',
    a: 'Both, on purpose. Anyone telling you it is all human is lying about the price. Anyone telling you it is all AI is lying about the quality. The AI does the everyday: the routine calls, texts, bookings, confirmations, reminders and follow-ups. It is trained on your prices, your service area, the jobs you take and how you talk to a customer. It is fast, it never sleeps, and it never gets tired at 11pm.',
  },
  {
    k: 'Who does the work',
    c: '#0ea5e9',
    q: 'What happens when it is out of its depth?',
    a: 'A person takes over. The AI knows when it is unsure, and anything unusual, anything high-stakes and anything off-script gets pulled by a real person on our team before it ever reaches your customer. That is the whole point of the safety net. You are never the one picking up the slack.',
  },
  {
    k: 'Who does the work',
    c: '#0ea5e9',
    q: 'What if it gets a price wrong?',
    a: 'It quotes from your playbook: your prices, your jobs, your service area, and anything outside that gets caught by a person before it goes out. If a wrong number ever does reach a customer, we bring it straight to you, you decide what you want to honour, and we are the ones who go back to them and sort it out. You will hear it from us before you hear it from them, and you are never the one making that phone call.',
  },
  {
    k: 'Who does the work',
    c: '#0ea5e9',
    q: 'What do I still have to do?',
    a: 'Short list, on purpose. If it grows, we have built the wrong thing. The work itself: you show up, you do the job, you get paid directly. The big calls: your prices, new services, who you hire, where you work. A couple of edge cases a week where we ask what you would do. And thirty seconds on the morning brief. That is it.',
  },
  {
    k: 'What is yours',
    c: '#10b981',
    q: 'What do I own if we ever part ways?',
    a: 'Everything that matters, and nothing here is held hostage. The website is yours, permanently. Your domain, in your name. Your Google Business Profile login. Your customer list, exported whenever you want it. Your reviews, which were always yours anyway. If we vanish tomorrow, you keep all of it.',
  },
  {
    k: 'What is yours',
    c: '#10b981',
    q: 'Do my customers become your customers?',
    a: 'No. Your number stays your number, and nothing changes for the people who call it. We answer in your voice, under your name, using your prices. Your customers pay you directly, the way they always have. We never sit between you and your money, and we never sit between you and the people who pay you.',
  },
  {
    k: 'What we do not do',
    c: '#f59e0b',
    q: 'Do you do my books?',
    a: 'No. We chase what is owed and we show you what came in. We are not your bookkeeper and we do not file your taxes.',
  },
  {
    k: 'What we do not do',
    c: '#f59e0b',
    q: 'Do you dispatch my crew?',
    a: 'No. We book the work and hand you a clean calendar. Who goes where, and in what truck, is still your call.',
  },
  {
    k: 'What we do not do',
    c: '#f59e0b',
    q: 'Do you spend my money on ads?',
    a: 'No. The plan is organic: your site, your Google presence, your reviews, your existing customers. If paid advertising ever makes sense, that is a separate conversation, and we will tell you honestly if we do not think you need it.',
  },
  {
    k: 'What we do not do',
    c: '#f59e0b',
    q: 'Do you promise me a number of leads?',
    a: 'No, and anyone who does is guessing. What we promise is that nothing that comes in gets dropped, and that you see the real numbers every month.',
  },
];

export default function IncludedFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="ifq">
      <style>{CSS}</style>
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
              Questions, <span className="g">answered.</span>
            </h2>
            <p className="fa-p">
              That is the whole list. If something on it is not what you need, tell us on the call
              and we will say so. We would rather lose the sale than sell you the wrong thing.
            </p>
            <a className="fa-cta" href={START_LINK}>
              Get Started <span aria-hidden>&rarr;</span>
            </a>
            <div className="fa-links">
              <a href="/how-it-works">What does it cost, and is there a contract?</a>
              <a href="/pricing">See the pricing</a>
            </div>
          </div>

          <div className="list">
            {QS.map((x, i) => (
              <div
                key={x.q}
                className={`ifq-q${open === i ? ' open' : ''}`}
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
.ifq{padding:clamp(90px,12vw,150px) 0;background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);}
.ifq .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.ifq .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.ifq .fgrid{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(32px,6vw,84px);align-items:start;}
@media(max-width:900px){.ifq .fgrid{grid-template-columns:1fr;gap:36px;}}
.ifq .faside{position:sticky;top:clamp(96px,12vh,130px);}
@media(max-width:900px){.ifq .faside{position:static;}}
.ifq h2{font-size:clamp(34px,4.6vw,60px);font-weight:600;letter-spacing:-.035em;line-height:1.0;margin:14px 0 0;max-width:9ch;}
.ifq h2 .g{background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;}
.ifq .fa-p{margin-top:20px;font-size:16.5px;line-height:1.6;color:#6b7280;max-width:32ch;}
.ifq .fa-cta{display:inline-flex;align-items:center;gap:9px;margin-top:26px;background:var(--v4-ink,#06080d);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 28px;text-decoration:none;transition:gap .3s ease,transform .3s ease;}
.ifq .fa-cta:hover{gap:14px;transform:translateY(-1px);}
.ifq .fa-links{display:flex;flex-direction:column;gap:10px;margin-top:26px;}
.ifq .fa-links a{font-size:14.5px;font-weight:600;color:#0284c7;text-decoration:none;width:fit-content;border-bottom:1px solid transparent;transition:border-color .25s ease;}
.ifq .fa-links a:hover{border-color:#0284c7;}

.ifq .list{display:flex;flex-direction:column;gap:8px;}
.ifq-q{--fc:#0ea5e9;position:relative;background:transparent;border:1px solid transparent;border-radius:18px;
  transition:background .35s ease,border-color .35s ease,box-shadow .35s ease,transform .35s ease;}
.ifq-q::after{content:'';position:absolute;left:clamp(16px,2vw,22px);right:clamp(16px,2vw,22px);bottom:0;height:1px;background:#e2e2dc;transition:opacity .3s ease;}
.ifq-q:last-child::after{opacity:0;}
.ifq-q:hover{background:rgba(255,255,255,.6);}
.ifq-q.open{background:#fff;border-color:#ececeb;box-shadow:0 26px 54px -34px rgba(6,12,20,.4);transform:translateY(-1px);}
.ifq-q.open::after{opacity:0;}
.ifq-q button{width:100%;display:grid;grid-template-columns:minmax(0,1fr) 34px;gap:16px;align-items:center;
  background:transparent;border:0;color:var(--v4-ink,#06080d);font-family:inherit;text-align:left;
  padding:clamp(20px,2.4vw,26px) clamp(16px,2vw,22px);cursor:pointer;}
.ifq-q .fk{display:block;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--fc);opacity:.85;}
.ifq-q .fq{display:block;margin-top:7px;font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;line-height:1.28;}
.ifq-q .pl{width:34px;height:34px;border-radius:50%;border:1px solid #dcdcd8;color:#8a8f98;
  display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:300;line-height:1;
  transition:transform .4s cubic-bezier(.16,1,.3,1),background .35s ease,color .35s ease,border-color .35s ease;}
.ifq-q:hover .pl{border-color:var(--fc);color:var(--fc);}
.ifq-q.open .pl{transform:rotate(45deg);background:var(--fc);border-color:transparent;color:#fff;box-shadow:0 8px 20px -8px var(--fc);}

.ifq .fbody{max-height:0;overflow:hidden;transition:max-height .55s cubic-bezier(.16,1,.3,1);}
.ifq-q.open .fbody{max-height:460px;}
.ifq .fbody p{margin:0;padding:0 clamp(16px,2vw,22px) clamp(22px,2.6vw,28px);font-size:16px;line-height:1.65;color:#52565e;max-width:62ch;}

@media(prefers-reduced-motion:reduce){.ifq .fbody,.ifq-q,.ifq-q .pl{transition:none;}}
`;

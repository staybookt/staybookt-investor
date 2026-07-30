'use client';

import { useState } from 'react';
import { START_LINK } from '@/lib/site';
import { min } from '@/lib/css';
import { track } from '@/lib/analytics';

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
 * The both-on-purpose answer is the argument this page exists to make, and it must keep
 * saying that nobody can do this all with people at the price and nobody can do it all
 * with AI and keep the quality. Say it plainly.
 *
 * The mirrored version of it ("Anyone telling you... Anyone telling you...") was
 * flattened in the July 2026 voice pass. The construction was never the problem; the
 * site was running it about fifty times, which reads as a machine with a favourite
 * trick. Exactly one survives site-wide now: the /pricing h2. Do not put the mirror
 * back here. */

type Q = { k: string; c: string; q: string; a: string };

/* RESTRUCTURED PER RICHARD (FAQ doc, Jul 28): "this is really Pricing and Features...
 * feels like a features explanation." Product questions (AI/person, out-of-depth,
 * still-have-to-do, dispatch) MOVED to /how-it-works; "What if it gets a price wrong?"
 * DELETED ENTIRELY (Richard: automated pricing "will make them nervous and may be a
 * barrier... consultants aren't going to want this"); "Do you do my books?" deleted
 * (Richard: "I doubt we get this question"). This page is money-only now.
 *
 * TERMS SETTLED (Richard, Jul 28 follow-up): month-to-month + first-90-days money back,
 * in his own chip wording on the hero. The old "month seven" question was a relic of the
 * abandoned 6-month term and Richard's open comment nailed it ("This implies a 6 month
 * commitment... Our messaging is confusing") — retitled below so no term is implied. */
const QS: Q[] = [
  {
    k: 'What is yours',
    c: '#10b981',
    q: 'What do I own if we ever part ways?',
    /* DOC-SYNC (Jul 28, late): every answer below is BYTE-MATCHED to Richard's FAQ Google
       Doc after he accepted his suggestions — the doc is the master text and he diffs it
       against the site word-for-word. Do not "improve" these; edit the doc first. */
    a: 'All of it, and none of it is held hostage. The website is yours for good; the domain is in your name; and you keep your Google Business Profile login, your customer list exported whenever you want, and your reviews, which were always yours. If we disappeared tomorrow, you would keep it all.',
  },
  /* "Do my customers become your customers?" REMOVED ENTIRELY (Richard, Jul 23 2026). */
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'When does the $199 start?',
    /* Approved addition (Richard: "Ok to add" + "Agree with the start timing"). */
    a: 'When you go live, not before; we build everything up front, and the monthly fee starts once we are actually answering your calls and running the work.',
  },
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'Do I need a big advertising budget on top of this?',
    /* Richard's rewrite (Jul 28), VERBATIM — he diffs the doc against the site word-for-word. */
    a: 'No. The plan runs on what you already have: your site, your Google presence, your reviews, your existing customers. Our focus is on organic or earned traffic that has a higher closing ratio and a lower cost per lead. You can always choose to do paid ads, but our program does not require them.',
  },
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'Do you promise me a number of leads?',
    a: 'No, and anyone who does is guessing. What we promise is that nothing coming in gets dropped, and that you see the real numbers every month.',
  },
  /* THE MONEY + CATCH QUESTIONS, BLENDED IN (Jacob + Richard, Jul 23 2026). What's-Included and
     Pricing merged into one page, so their two FAQ sets become one. These moved over from the
     old PricingFaq; that component is no longer rendered. */
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'Is there a contract?',
    a: 'No. There is no term and nothing to be trapped in. Cancel any time on thirty days notice, with no penalty and no exit fee. We build your website before you have paid us a dollar, so the risk sits with us, which is where it belongs.',
  },
  {
    k: 'The money',
    c: '#4f46e5',
    /* WAS "What if I want out in month seven?" — a relic of the abandoned 6-month term.
       Richard's open comment: naming month seven implies a 6-month commitment. Retitled
       so the question works under month-to-month; answer body unchanged in substance. */
    q: 'What if I want out after a few months?',
    a: 'Then you are out: thirty days notice, no penalty, no exit fee, no argument. And you do not leave empty-handed: the website, the domain, your Google Business Profile, your customer list and your reviews all go with you.',
  },
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'What if it just does not work?',
    a: 'For the first 90 days, you can change your mind for any reason, and we refund every month you paid. You do not have to prove we failed, and we do not get to decide whether your reason is good enough. You email us and say so. The website is yours either way.',
  },
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'Is there a limit on calls and texts?',
    a: 'No. Unlimited calls and texts, with no per-minute billing and no overage charges, however busy the season gets. Charging you more in your busiest month is a strange way to say we are on your side.',
  },
  {
    k: 'The money',
    c: '#4f46e5',
    q: 'Is $199 really the whole number?',
    /* Richard, FAQ doc, Jul 28 10:14am: deleted the closing line "We would rather tell you
       about twenty dollars and a card fee now than have you find them on an invoice
       later." Answer ends on the back-end list now. */
    a: 'Almost. It is $199 CAD a month plus tax, and two things sit outside that. Your domain registration, about twenty dollars a year, passed through at cost and yours anyway. And if you take card payments, Stripe or Square charge their own fee, around 2.9% plus thirty cents, taken out of what you collect like any card processing. That fee is theirs, not ours: we do not mark it up, and we take no cut of it. No build fee, no setup fee, no add-ons, no per-minute billing, no overage. And no back end either: no commission on your jobs, no share of your revenue, and no share of what the business is worth if you sell it.',
  },
  {
    k: 'The catch',
    c: '#7c3aed',
    /* RICHARD'S SUGGESTED WORDING, VERBATIM (FAQ doc suggestion-mode, Jul 28 10:14-10:15am).
       Question rewritten as a real question, in the site's $199/mth price format ("Only
       $199 a month." was a statement); "where" replaced with "what's". Answer opens with
       the direct "None." then explains, same answer-first pattern as every other FAQ. The
       earlier paraphrase of this read to him as "not implemented" — he diffs word-for-word. */
    q: "Only $199/mth? So what's the catch?",
    a: 'None. We have leveraged technology to create a very efficient solution that allows relatively few people (very low overhead) and have built many aspects of the platform ourselves. This allows us to be able to offer exceptional value at very attractive pricing.',
  },
];

export default function IncludedFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="ifq">
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
              That is the whole list. If something on it is not a fit for you, tell us on the call.
            </p>
            <a className="fa-cta" href={START_LINK} data-cta="faq_included">
              Get Started <span aria-hidden>&rarr;</span>
            </a>
            <div className="fa-links">
              {/* Pointed at /how-it-works, where that question no longer lives: the money
                  questions moved to /pricing, and /how-it-works says so out loud. */}
              <a href="/pricing">What does it cost, and is there a contract?</a>
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
                <button
                  type="button"
                  onClick={() => {
                    /* Only the opening counts. Which objections people actually
                       have is the question; closing one answers nothing. */
                    if (open !== i) track('faq_open', { question: x.q, faq: 'included' });
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
.ifq{padding:clamp(90px,12vw,150px) 0;background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);}
.ifq .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.ifq .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.ifq .fgrid{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(32px,6vw,84px);align-items:start;}
@media(max-width:900px){.ifq .fgrid{grid-template-columns:1fr;gap:36px;}}
.ifq .faside{position:sticky;top:clamp(96px,12vh,130px);}
@media(max-width:900px){.ifq .faside{position:static;}}
.ifq h2{font-size:clamp(34px,4.6vw,60px);font-weight:600;letter-spacing:-.035em;line-height:1.0;margin:14px 0 0;max-width:9ch;}
.ifq h2 .g{background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;}
.ifq .fa-p{margin-top:20px;font-size:16.5px;line-height:1.6;color:#69707d;max-width:32ch;}
.ifq .fa-cta{display:inline-flex;align-items:center;gap:9px;margin-top:26px;background:var(--v4-ink,#06080d);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 28px;text-decoration:none;transition:gap .3s ease,transform .3s ease;}
.ifq .fa-cta:hover{gap:14px;transform:translateY(-1px);}
.ifq .fa-links{display:flex;flex-direction:column;gap:10px;margin-top:26px;}
.ifq .fa-links a{font-size:14.5px;font-weight:600;color:#0369a1;text-decoration:none;width:fit-content;border-bottom:1px solid transparent;transition:border-color .25s ease;}
.ifq .fa-links a:hover{border-color:#0369a1;}

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

/* max-height:0 + overflow:hidden CLIPS PIXELS. It does not touch the accessibility tree.
   So every collapsed answer here was still being read aloud, in full, while aria-expanded
   on the button said "collapsed" — the accordion did not exist to a screen reader, it was
   one wall of text that contradicted its own state. It also left anything focusable inside
   in the tab order, invisible.
   visibility:hidden fixes both and still animates. The 0s delay is load-bearing: opening,
   visible flips instantly so the height can animate; closing, it waits out the .55s so the
   body does not vanish on frame one. */
.ifq .fbody{max-height:0;overflow:hidden;visibility:hidden;
  transition:max-height .55s cubic-bezier(.16,1,.3,1),visibility 0s linear .55s;}
.ifq-q.open .fbody{max-height:460px;visibility:visible;
  transition:max-height .55s cubic-bezier(.16,1,.3,1),visibility 0s;}
.ifq .fbody p{margin:0;padding:0 clamp(16px,2vw,22px) clamp(22px,2.6vw,28px);font-size:16px;line-height:1.65;color:#52565e;max-width:62ch;}

@media(prefers-reduced-motion:reduce){.ifq .fbody,.ifq-q,.ifq-q .pl{transition:none;}}
`;

'use client';

import { useState } from 'react';

/* WHERE THIS IS GOING.
 *
 * Richard asked for three things: the CRM on What's included, the AI exec
 * assistant, and the old platform-tab visuals back, because they added
 * credibility and helped people understand the product. He is right on all three.
 *
 * But NONE of it ships today, and there is hard evidence about what happens when
 * you put a roadmap in the wrong place. On the old homepage the roadmap block is
 * the exact point where an ICP reader quit: "you just told me most of the good
 * stuff isn't built, why did I scroll seven screens for that."
 *
 * So the roadmap is FENCED. It sits after "what we do not do", it is dark against
 * a light page so the eye knows it is a different kind of claim, and it says out
 * loud that it is not here yet. It cannot leak into the list of what $199 buys
 * today. Do not move it up the page. */

type Screen = 'crm' | 'ea' | 'numbers';

const TABS: { k: Screen; n: string; h: string; p: string }[] = [
  {
    k: 'crm',
    n: 'The customer record',
    h: 'Every customer, every job, every dollar. One place.',
    p: 'Today it lives in your phone, your head, and QuickBooks. QuickBooks knows what you invoiced. It does not know that Patricia has called three times, that her quote has been open nine days, or that this is the third job you have done for the Okafors. We will.',
  },
  {
    k: 'ea',
    n: 'The assistant',
    h: 'Ask it in plain English. It goes and does it.',
    p: 'Not a dashboard you have to learn. A conversation you already know how to have. Ask it how last week went, tell it to send Patricia her invoice, ask who has not paid you. From the driver seat, with one thumb.',
  },
  {
    k: 'numbers',
    n: 'The numbers',
    h: 'What actually happened. Without you assembling it.',
    p: 'What came in, what got booked, what got quoted, what got paid, and what is quietly going cold. Read in thirty seconds, not built by you in an evening.',
  },
];

export default function Coming() {
  const [on, setOn] = useState<Screen>('crm');

  return (
    <section className="soon">
      <style>{CSS}</style>
      <div className="wrap">
        <div className="soon-head">
          <div className="eyebrow">Where this is going</div>
          <h2>
            The rest of it is being built. <span className="g">Your price does not move.</span>
          </h2>
          <p>
            Everything above this line is live and running today. Everything below it is being built
            through 2026 and rolls out to you as it ships, included, at no extra cost. We are showing
            it to you now so you know what you are buying into. Not because we are pretending it is
            here.
          </p>
        </div>

        <div className="soon-stage">
          <div className="soon-menu">
            {TABS.map((t) => (
              <button
                key={t.k}
                type="button"
                className={`sm${on === t.k ? ' on' : ''}`}
                onClick={() => setOn(t.k)}
              >
                <span className="sm-n">{t.n}</span>
                <span className="sm-h">{t.h}</span>
                <span className="sm-p">{t.p}</span>
              </button>
            ))}
          </div>

          <div className="soon-viz">
            <div className="chip">Not shipping today</div>
            {on === 'crm' && <Crm />}
            {on === 'ea' && <Ea />}
            {on === 'numbers' && <Numbers />}
          </div>
        </div>

        <p className="soon-fine">
          Illustrations of what we are building, not screenshots of a customer&apos;s account. If it
          is not on the list above, do not pay us for it yet.
        </p>
      </div>
    </section>
  );
}

/* ---------------- the customer record ---------------- */
function Crm() {
  const rows = [
    { n: 'Patricia Vaughan', m: '3 calls · last Tue', v: '$1,840', s: 'Quote open 9 days', t: 'warn' },
    { n: 'The Okafors', m: 'Customer since 2023', v: '$6,210', s: 'Third job', t: 'good' },
    { n: 'M. Delacroix', m: 'Booked Thursday', v: '$480', s: 'Confirmed', t: 'good' },
    { n: 'J. Whitfield', m: 'No contact 14 months', v: '$2,300', s: 'Gone quiet', t: 'cold' },
  ];
  return (
    <div className="win">
      <div className="win-top">
        <span className="win-ic" />
        <b>Customers</b>
        <span className="win-r">4 need you</span>
      </div>
      <div className="win-body">
        {rows.map((r) => (
          <div className="crow" key={r.n}>
            <span className="cav">{r.n.slice(0, 1)}</span>
            <span className="ct">
              <b>{r.n}</b>
              <i>{r.m}</i>
            </span>
            <span className="cv">
              <b>{r.v}</b>
              <i className={r.t}>{r.s}</i>
            </span>
          </div>
        ))}
        <div className="cnote">
          Lifetime value, every job, every conversation. Your books never knew any of this.
        </div>
      </div>
    </div>
  );
}

/* ---------------- the assistant ---------------- */
function Ea() {
  const msgs: { f: 'you' | 'it'; t: string }[] = [
    { f: 'you', t: 'How did we do last week?' },
    { f: 'it', t: '11 jobs booked, $14,200. Three leads recovered that would have been missed. Four new reviews, 4.9 average. One quote over $5k needs your call.' },
    { f: 'you', t: 'Send Patricia her invoice and chase the Okafor quote.' },
    { f: 'it', t: 'Invoice sent. Okafor quote nudged, politely, second time. I will chase again Friday unless they answer.' },
    { f: 'you', t: 'Who hasn’t paid me?' },
    { f: 'it', t: 'Two. $1,840 at 31 days, $610 at 12. Want me to escalate the first one?' },
  ];
  return (
    <div className="win">
      <div className="win-top">
        <span className="win-ic" />
        <b>Assistant</b>
        <span className="win-r">Always on</span>
      </div>
      <div className="win-body chat">
        {msgs.map((m, i) => (
          <div className={`bub ${m.f}`} key={i}>
            {m.t}
          </div>
        ))}
        <div className="cnote">No dashboard. No training. You already know how to do this.</div>
      </div>
    </div>
  );
}

/* ---------------- the numbers ---------------- */
function Numbers() {
  const stats = [
    { k: 'Booked last week', v: '11 jobs', s: '$14,200' },
    { k: 'Leads recovered', v: '3', s: 'would have been missed' },
    { k: 'Quotes chased', v: '9', s: '4 closed' },
    { k: 'Reviews added', v: '4', s: '4.9 average' },
  ];
  const bars = [38, 52, 44, 67, 58, 81, 74];
  return (
    <div className="win">
      <div className="win-top">
        <span className="win-ic" />
        <b>Last week</b>
        <span className="win-r">Read in 30 seconds</span>
      </div>
      <div className="win-body">
        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.k}>
              <span className="sk">{s.k}</span>
              <b>{s.v}</b>
              <i>{s.s}</i>
            </div>
          ))}
        </div>
        <div className="chart">
          {bars.map((h, i) => (
            <span key={i} className={i > 4 ? 'b hot' : 'b'} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="cnote">One quote over $5,000 is waiting on you. Everything else is handled.</div>
      </div>
    </div>
  );
}

const CSS = `
.soon{background:#050506;color:#f5f5f7;padding:clamp(80px,10vw,130px) 0;}
.soon .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.soon .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#86868b;}
.soon-head{max-width:66ch;}
.soon-head h2{margin-top:14px;font-size:clamp(28px,4vw,50px);font-weight:600;letter-spacing:-.035em;line-height:1.05;color:#f5f5f7;max-width:18ch;}
.soon-head h2 .g{background:linear-gradient(100deg,#06b6d4,#10b981 52%,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent;}
.soon-head p{margin-top:20px;font-size:clamp(16px,1.8vw,19px);line-height:1.62;color:#8b93a5;max-width:60ch;}

.soon-stage{margin-top:clamp(40px,5vw,60px);display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);gap:clamp(28px,5vw,60px);align-items:start;}
@media(max-width:900px){.soon-stage{grid-template-columns:1fr;gap:30px;}}

.soon-menu{display:flex;flex-direction:column;}
.sm{text-align:left;background:transparent;border:0;border-top:1px solid rgba(255,255,255,.12);
  padding:22px 0;cursor:pointer;font-family:inherit;width:100%;transition:opacity .3s ease;}
.sm:last-child{border-bottom:1px solid rgba(255,255,255,.12);}
.sm-n{display:block;font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#5c6470;transition:color .3s ease;}
.sm-h{display:block;margin-top:8px;font-size:clamp(19px,2.1vw,25px);font-weight:600;letter-spacing:-.025em;line-height:1.2;color:#5f6068;transition:color .3s ease;}
.sm-p{display:block;max-height:0;overflow:hidden;font-size:15px;line-height:1.6;color:#8b93a5;
  transition:max-height .45s cubic-bezier(.16,1,.3,1),margin .45s ease,opacity .35s ease;opacity:0;max-width:44ch;}
.sm.on .sm-n{color:#5eead4;}
.sm.on .sm-h{color:#f5f5f7;}
.sm.on .sm-p{max-height:200px;margin-top:12px;opacity:1;}
.sm:hover .sm-h{color:#a1a1aa;}
.sm.on:hover .sm-h{color:#f5f5f7;}

.soon-viz{position:relative;}
.chip{position:absolute;top:-11px;right:14px;z-index:2;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:#f5c877;background:#2a1f08;border:1px solid rgba(245,158,11,.45);border-radius:999px;padding:6px 12px;}

.win{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 50px 100px -50px rgba(0,0,0,.85);border:1px solid rgba(255,255,255,.1);}
.win-top{display:flex;align-items:center;gap:10px;padding:15px 18px;border-bottom:1px solid #f1f1f4;font-size:14.5px;font-weight:600;color:#06080d;}
.win-ic{width:24px;height:24px;border-radius:7px;background:linear-gradient(100deg,#06b6d4,#10b981 55%,#818cf8);flex:0 0 auto;}
.win-r{margin-left:auto;font-size:11.5px;font-weight:600;color:#059669;}
.win-body{padding:16px 18px 18px;}

.crow{display:grid;grid-template-columns:36px minmax(0,1fr) auto;gap:12px;align-items:center;padding:13px 0;border-bottom:1px solid #f4f4f6;}
.cav{width:36px;height:36px;border-radius:50%;background:#eef0f3;color:#5b6270;display:flex;align-items:center;justify-content:center;font-size:13.5px;font-weight:700;}
.ct b{display:block;font-size:14.5px;font-weight:600;color:#06080d;}
.ct i{display:block;margin-top:2px;font-style:normal;font-size:12.5px;color:#9298a1;}
.cv{text-align:right;}
.cv b{display:block;font-size:14.5px;font-weight:700;color:#06080d;font-variant-numeric:tabular-nums;}
.cv i{display:block;margin-top:3px;font-style:normal;font-size:11.5px;font-weight:600;}
.cv i.warn{color:#b45309;}
.cv i.good{color:#059669;}
.cv i.cold{color:#8b93a5;}
.cnote{margin-top:14px;font-size:12.5px;line-height:1.55;color:#9298a1;}

.chat{display:flex;flex-direction:column;gap:9px;}
.bub{max-width:86%;padding:10px 14px;border-radius:16px;font-size:13.5px;line-height:1.45;}
.bub.you{align-self:flex-end;background:#06080d;color:#fff;border-bottom-right-radius:5px;}
.bub.it{align-self:flex-start;background:#f0f1f4;color:#26292f;border-bottom-left-radius:5px;}

.stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}
.stat{border:1px solid #eeeef1;border-radius:12px;padding:12px 13px;}
.stat .sk{display:block;font-size:11px;color:#9298a1;}
.stat b{display:block;margin-top:5px;font-size:21px;font-weight:700;letter-spacing:-.02em;color:#06080d;}
.stat i{display:block;margin-top:2px;font-style:normal;font-size:11.5px;color:#059669;font-weight:600;}
.chart{display:flex;align-items:flex-end;gap:6px;height:70px;margin:16px 0 4px;}
.chart .b{flex:1;background:#e9e9ee;border-radius:4px 4px 0 0;}
.chart .b.hot{background:linear-gradient(180deg,#10b981,#06b6d4);}

.soon-fine{margin-top:clamp(28px,3.4vw,38px);font-size:12.5px;line-height:1.55;color:#5c6470;max-width:60ch;}
@media(prefers-reduced-motion:reduce){.sm,.sm-p{transition:none;}}
`;

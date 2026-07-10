'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { START_LINK } from '@/lib/site';

const HERO_H = 'You run the business. We run the busywork.';
const HERO_SUB = 'Here is exactly how that works. Every call answered, every job booked, every customer brought back. The work is the only thing left on your plate.';

// hero loop cards (honest illustration of the whole model)
const LOOP: { t: string; s: string; you?: boolean }[] = [
  { t: 'A customer needs you', s: 'They search, call, or text' },
  { t: 'We answer and book it', s: 'Quoted and on your calendar' },
  { t: 'You do the work', s: 'The only part that stays yours', you: true },
  { t: 'We bring them back', s: 'Reviews, then repeat jobs' },
];

const SHIFT_H = 'Right now, you are the system.';
const SHIFT_P = 'Every call, every quote, every follow-up runs through you. Miss one and the job is gone. StayBookt takes that whole layer off your plate, so running the business does not mean living on your phone.';

const LEARN_H = 'First, we learn your business.';
const LEARN_P = 'Before anything goes live, we sit down and learn how you actually work. What you charge. Which jobs you take and which you pass on. Your service area. How you talk to a customer. That becomes the playbook everything else runs on, so when we answer, it sounds like you, not a call center.';
const LEARN_ROWS = ['What you charge, job by job', 'The jobs you take and the ones you pass', 'Your service area and your hours', 'How you talk to a customer'];

type Step = { id: string; k: string; h: string; b: string; viz: 'map' | 'reception' | 'booking' | 'chase' | 'repeat' | 'none'; rev?: boolean };
const STEPS: Step[] = [
  { id: 'found', k: '01', h: 'They find you first.', b: 'Your site, your Google profile, and your reviews put you at the top when someone nearby searches for your trade.', viz: 'map' },
  { id: 'answered', k: '02', h: 'Every call gets answered.', b: 'Day or night, mid-job or asleep, every call and text is picked up, answered in your voice, and quoted on the spot.', viz: 'reception', rev: true },
  { id: 'booked', k: '03', h: 'The job gets booked.', b: 'Straight into your calendar, confirmed with the customer, with reminders so they actually show up. Nothing for you to type.', viz: 'booking' },
  { id: 'chased', k: '04', h: 'The quote gets chased.', b: 'Every quote goes out and gets followed up until you get a yes or a no. No more jobs lost because you were too busy to call back.', viz: 'chase', rev: true },
  { id: 'back', k: '05', h: 'They come back on their own.', b: 'After the job we ask for the review. Months later we reach out again, so past customers rebook you instead of googling someone else.', viz: 'repeat' },
];

const HONEST_H = 'AI does the work. A real person has its back.';
const HONEST_P = 'This is not magic, and it is not an overseas call center. AI handles the everyday calls, texts, and bookings. When something is unusual or high-stakes, a person on our team steps in before it ever reaches your customer. You are never the fallback.';

const BRIEF_H = 'One short read a day. That is the whole job.';
const BRIEF_P = 'No software to log into, no dashboard to learn. Each morning you get a plain-language brief: what is booked, what needs a decision, what came in overnight. Thirty seconds, then go run your day.';

const SPEC: { group: string; items: string[] }[] = [
  { group: 'Get found', items: ['A fast, mobile website, built and hosted', 'Your Google profile rebuilt and kept current', 'Local search and map setup', 'Tap-to-call and booking on every page', 'A steady stream of real reviews'] },
  { group: 'Run the front office', items: ['Every call and text answered, 24/7, in your voice', 'Quotes given on the spot, jobs booked to your calendar', 'Quotes chased until they close', 'Every customer, job, and conversation in one place', 'One inbox, off your personal phone and email'] },
  { group: 'Grow it', items: ['Past customers brought back for repeat work', 'Finished jobs turned into five-star reviews', 'A running read on where money is leaking'] },
  { group: 'Stay in control', items: ['One short brief each morning', 'You approve the calls that matter', 'Cancel any time, the site is yours to keep'] },
];

const FAQ: { q: string; a: string }[] = [
  { q: 'Is it AI or a real person answering?', a: 'Both, on purpose. AI handles the everyday calls, texts, and bookings so nothing gets missed. When something is unusual or high-stakes, a real person on our team steps in before it reaches your customer. You are never the one picking up the slack.' },
  { q: 'How does it know how to talk about my business?', a: 'That is what the first couple of weeks are for. We learn your prices, your service area, the jobs you take, and how you talk to a customer. Everything after that runs on your playbook, not a generic script.' },
  { q: 'Do I have to learn any software?', a: 'No. That is the whole point. We run it. You get a short brief each morning and approve the occasional thing. There is no app you are forced to live in.' },
  { q: 'What if I already have a website?', a: 'We will look at it. If it is doing the job, we build around it. If it is holding you back, we replace it. You are not stuck with something that does not convert.' },
  { q: 'Do I keep my phone number?', a: 'Yes. Your number stays yours. We make sure the calls and texts you cannot pick up still get answered and booked.' },
  { q: 'Who owns the website and domain?', a: 'The site is yours to keep. If you already own your domain it stays in your name. If we set one up for you, we walk through the handover on the call. Nothing holds you hostage.' },
  { q: 'How long until I am live?', a: 'About two weeks from the first call.' },
  { q: 'Is there a contract?', a: 'No lock-in. Cancel any time, and the site is yours to keep.' },
  { q: 'Do you take a cut of my jobs?', a: 'No. It is a flat monthly fee to run everything. The only place we ever share upside is an invite-only tier, and that is only on brand-new business we generate for you.' },
];

const CSS = `
.hiw{background:#fff;color:var(--v4-ink);}
.hiw .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.hiw .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.hiw h1,.hiw h2,.hiw h3,.hiw h4{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.hiw-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 30px;text-decoration:none;transition:transform .3s ease;}
.hiw-btn:hover{transform:translateY(-1px);}
.hiw-btn.ghost{background:transparent;color:var(--v4-ink);border:1px solid rgba(0,0,0,.18);}
.hiw .g{background:linear-gradient(100deg,#06b6d4,#10b981 55%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* hero */
.hiw-hero{position:relative;background:#fff;text-align:center;padding:clamp(120px,16vh,180px) 0 clamp(50px,7vw,84px);overflow:hidden;}
.hiw-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(52% 42% at 50% 6%,rgba(6,182,212,.08),transparent 60%);pointer-events:none;}
.hiw-hero .wrap{position:relative;}
.hiw-hero h1{margin-top:18px;font-size:clamp(42px,6.6vw,88px);line-height:1.0;max-width:15ch;margin-left:auto;margin-right:auto;}
.hiw-hero p.lead{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.45;color:#52565e;max-width:44ch;}
.hiw-hero .cta{margin-top:34px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}

/* hero loop diagram (illustrative) */
.hiw-loop{margin:clamp(56px,7vw,92px) auto 0;max-width:1000px;}
.hiw-loop .row{display:flex;align-items:stretch;justify-content:center;gap:0;flex-wrap:nowrap;}
.hiw-loop .card{flex:1 1 0;min-width:0;background:#fff;border:1px solid #ececec;border-radius:20px;padding:22px 18px;text-align:left;box-shadow:0 20px 44px -30px rgba(6,12,20,.25);}
.hiw-loop .card.you{border-color:transparent;background:linear-gradient(180deg,#0b0f14,#12181f);color:#fff;box-shadow:0 24px 50px -26px rgba(6,182,212,.45);}
.hiw-loop .card .n{font-size:12px;font-weight:700;letter-spacing:.06em;color:#0284c7;}
.hiw-loop .card.you .n{color:#5eead4;}
.hiw-loop .card .t{margin-top:8px;font-size:clamp(15px,1.5vw,18px);font-weight:600;letter-spacing:-.01em;line-height:1.2;}
.hiw-loop .card .s{margin-top:6px;font-size:13.5px;line-height:1.35;color:#7b7f88;}
.hiw-loop .card.you .s{color:#9fb3bd;}
.hiw-loop .arr{flex:0 0 34px;display:flex;align-items:center;justify-content:center;color:#c4c8ce;}
.hiw-loop .loopback{margin-top:14px;text-align:center;font-size:13px;font-weight:600;letter-spacing:.02em;color:#0284c7;display:flex;align-items:center;justify-content:center;gap:8px;}
.hiw-loop .cap{margin-top:16px;text-align:center;font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:#b3b7be;}
@media(max-width:760px){.hiw-loop .row{flex-direction:column;gap:0;}.hiw-loop .arr{flex:0 0 30px;transform:rotate(90deg);}}

/* sticky chapter rail */
.hiw-rail{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.82);backdrop-filter:saturate(180%) blur(16px);-webkit-backdrop-filter:saturate(180%) blur(16px);border-bottom:1px solid #ececec;}
.hiw-rail .rail-in{display:flex;gap:clamp(14px,3vw,38px);justify-content:center;flex-wrap:wrap;padding:15px 20px;}
.hiw-rail a{font-size:13.5px;font-weight:600;color:#9298a1;text-decoration:none;transition:color .3s ease;white-space:nowrap;}
.hiw-rail a.on{color:var(--v4-ink);}
.hiw-rail a:hover{color:#52565e;}
@media(max-width:640px){.hiw-rail .rail-in{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;}}

/* the shift */
.hiw-shift{padding:clamp(90px,13vw,150px) 0;text-align:center;}
.hiw-shift h2{margin-top:16px;font-size:clamp(34px,5.4vw,68px);line-height:1.02;max-width:16ch;margin-left:auto;margin-right:auto;}
.hiw-shift p{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.5;color:#52565e;max-width:46ch;}

/* learn (centerpiece) */
.hiw-learn{padding:clamp(80px,11vw,140px) 0;background:var(--v4-cream);}
.hiw-learn .grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,6vw,80px);align-items:center;}
.hiw-learn h2{font-size:clamp(32px,4.6vw,60px);line-height:1.02;max-width:12ch;}
.hiw-learn p{margin-top:22px;font-size:clamp(17px,1.9vw,21px);line-height:1.5;color:#52565e;max-width:40ch;}
.learncard{background:#fff;border:1px solid #e9e9e5;border-radius:24px;padding:clamp(24px,3vw,34px);box-shadow:0 30px 60px -40px rgba(6,12,20,.35);}
.learncard .lc-top{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#0284c7;}
.learncard .lc-h{margin-top:6px;font-size:20px;font-weight:600;letter-spacing:-.02em;color:var(--v4-ink);}
.learncard ul{list-style:none;margin:20px 0 0;padding:0;display:flex;flex-direction:column;gap:0;}
.learncard li{display:flex;gap:12px;align-items:center;padding:15px 0;border-top:1px solid #f0f0ec;font-size:15.5px;color:#33373e;}
.learncard li:first-child{border-top:0;}
.learncard li svg{flex:0 0 auto;}
@media(max-width:820px){.hiw-learn .grid{grid-template-columns:1fr;gap:40px;}.hiw-learn h2{max-width:18ch;}}

/* flow */
.hiw-flow{padding:clamp(40px,6vw,80px) 0 clamp(50px,8vw,100px);}
.hiw-flow .flowhead{text-align:center;margin-bottom:clamp(8px,2vw,20px);}
.hiw-flow .flowhead h2{margin-top:16px;font-size:clamp(34px,5.4vw,64px);line-height:1.02;}
.hiw-flow .illus{text-align:center;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#b3b7be;margin-bottom:clamp(20px,3vw,30px);}
.hiw-flow .step{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,6vw,90px);align-items:center;padding:clamp(52px,7vw,110px) 0;}
.hiw-flow .step.rev .txt{order:2;}
.hiw-flow .step.solo{grid-template-columns:1fr;text-align:center;background:#0b0f14;border-radius:32px;padding:clamp(72px,10vw,120px) clamp(24px,5vw,60px);margin:clamp(24px,4vw,44px) 0;}
.hiw-flow .step.solo .k{color:#5eead4;}
.hiw-flow .step.solo h3,.hiw-flow .step.solo p{color:#fff;}
.hiw-flow .step.solo h3{max-width:20ch;margin:0 auto;}
.hiw-flow .step.solo p{max-width:36ch;margin:18px auto 0;color:#9fb3bd;}
.hiw-flow .step .k{font-size:14px;font-weight:700;letter-spacing:.14em;color:#c2c6cc;}
.hiw-flow .step h3{margin-top:12px;font-size:clamp(28px,4vw,54px);line-height:1.03;max-width:14ch;}
.hiw-flow .step p{margin-top:18px;font-size:clamp(17px,1.9vw,21px);line-height:1.5;color:#52565e;max-width:34ch;}
.hiw-flow .viz{position:relative;display:flex;justify-content:center;}
.hiw-flow .viz::before{content:'';position:absolute;inset:-10% -8%;background:radial-gradient(58% 58% at 50% 45%,rgba(6,182,212,.1),transparent 70%);filter:blur(26px);z-index:0;}
.hiw-flow .viz>*{position:relative;z-index:1;}
.hiw-flow .viz .appwin{width:min(430px,100%);}
@media(max-width:820px){.hiw-flow .step{grid-template-columns:1fr;gap:36px;}.hiw-flow .step.rev .txt{order:0;}}

/* honest beat */
.hiw-honest{text-align:center;padding:clamp(90px,13vw,160px) 0;background:#fff;}
.hiw-honest .eyebrow{color:#0284c7;}
.hiw-honest h2{margin-top:16px;font-size:clamp(32px,5vw,64px);line-height:1.02;max-width:18ch;margin-left:auto;margin-right:auto;}
.hiw-honest p{margin:26px auto 0;font-size:clamp(18px,2.1vw,22px);line-height:1.55;color:#52565e;max-width:50ch;}

/* brief moment */
.hiw-brief{text-align:center;padding:clamp(80px,11vw,140px) 0;background:var(--v4-cream);}
.hiw-brief h2{margin-top:16px;font-size:clamp(32px,4.8vw,62px);line-height:1.02;max-width:16ch;margin-left:auto;margin-right:auto;}
.hiw-brief p{margin:24px auto 0;font-size:clamp(17px,1.9vw,21px);line-height:1.5;color:#52565e;max-width:42ch;}
.hiw-brief .viz{position:relative;display:flex;justify-content:center;margin-top:clamp(44px,5vw,60px);}
.hiw-brief .viz .appwin{width:min(480px,92vw);}

/* signature stat */
.hiw-stat{text-align:center;padding:clamp(100px,15vw,190px) 0;background:#fff;}
.hiw-stat h2{font-size:clamp(46px,8.5vw,118px);line-height:.96;letter-spacing:-.045em;}
.hiw-stat p{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);color:#52565e;max-width:34ch;}

/* proof */
.hiw-proof{background:var(--v4-cream);text-align:center;padding:clamp(44px,6vw,64px) 0;}
.hiw-proof p{font-size:clamp(16px,1.8vw,19px);color:#52565e;}
.hiw-proof a{color:#0284c7;font-weight:600;text-decoration:none;}

/* spec */
.hiw-spec{padding:clamp(90px,12vw,150px) 0;}
.hiw-spec h2{text-align:center;font-size:clamp(34px,5vw,60px);margin:0 auto;}
.hiw-spec .sub{text-align:center;margin:16px auto 0;color:#8a8f98;font-size:16px;}
.hiw-spec .cols{margin-top:clamp(48px,6vw,72px);display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(24px,3vw,44px);}
.hiw-spec .grp{font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#0284c7;padding-bottom:14px;border-bottom:1px solid #e5e5e2;}
.hiw-spec ul{list-style:none;margin:16px 0 0;padding:0;display:flex;flex-direction:column;gap:14px;}
.hiw-spec li{font-size:14.5px;line-height:1.45;color:#33373e;display:flex;gap:9px;align-items:flex-start;}
.hiw-spec li svg{flex:0 0 auto;margin-top:2px;}
@media(max-width:900px){.hiw-spec .cols{grid-template-columns:1fr 1fr;}}
@media(max-width:560px){.hiw-spec .cols{grid-template-columns:1fr;}}

/* faq */
.hiw-faq{padding:clamp(90px,12vw,150px) 0;background:var(--v4-cream);}
.hiw-faq h2{text-align:center;font-size:clamp(34px,5vw,60px);margin:0 auto clamp(44px,5vw,60px);}
.hiw-faq .list{max-width:760px;margin:0 auto;}
.hiw-q{border-bottom:1px solid #e2e2df;}
.hiw-q button{width:100%;background:transparent;border:0;color:var(--v4-ink);font-family:inherit;font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.01em;text-align:left;padding:24px 40px 24px 0;cursor:pointer;position:relative;}
.hiw-q button .pl{position:absolute;right:2px;top:50%;transform:translateY(-50%);font-size:24px;font-weight:300;color:#9aa0a8;transition:transform .3s ease,color .3s ease;line-height:1;}
.hiw-q.open button .pl{transform:translateY(-50%) rotate(45deg);color:#0284c7;}
.hiw-q .ans{max-height:0;overflow:hidden;transition:max-height .35s ease;}
.hiw-q.open .ans{max-height:280px;}
.hiw-q .ans p{padding:0 0 24px;margin:0;font-size:16.5px;line-height:1.6;color:#52565e;max-width:64ch;}

/* closer */
.hiw-close{text-align:center;padding:clamp(110px,15vw,200px) 0;background:#fff;}
.hiw-close h2{font-size:clamp(38px,6vw,84px);line-height:1.0;max-width:16ch;margin:0 auto;}
.hiw-close .price{margin:24px auto 0;font-size:clamp(16px,1.9vw,20px);color:#52565e;}
.hiw-close .price a{color:#0284c7;text-decoration:none;font-weight:600;}
.hiw-close .cta{margin-top:36px;}
`;

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function LoopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 018-8 8 8 0 017 4M20 12a8 8 0 01-8 8 8 8 0 01-7-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 3v5h-5M5 21v-5h5" />
    </svg>
  );
}

function ReceptionistPhone() {
  return (
    <div className="phone"><div className="notch" /><div className="screen">
      <div className="ph-bar"><div className="ph-ava">TC</div><div><div className="ph-name">Top Choice</div><div className="ph-sub">StayBookt receptionist</div></div></div>
      <div className="ph-body">
        <div className="bub sys">Missed call &middot; 6:47 PM</div>
        <div className="bub us">Hi, this is Top Choice. Sorry we missed you! What can we help with?</div>
        <div className="bub them">Panel keeps tripping. Someone today?</div>
        <div className="bub us">2 to 4 PM is open. Book it?</div>
        <div className="bub them">Yes please</div>
        <div className="bub us ok">Booked. We will text on the way.</div>
      </div>
      <div className="ph-tag">Answered &middot; booked &middot; hands-free</div>
    </div></div>
  );
}

function viz(kind: string): ReactNode {
  if (kind === 'reception') return <div className="sbwrap"><ReceptionistPhone /></div>;
  if (kind === 'map') {
    return (
      <div className="sbwrap"><div className="appwin">
        <div className="aw-top"><span className="aw-ic" />electrician near me</div>
        <div className="aw-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="gbiz first"><span className="rank">#1</span><div className="bn">Top Choice Electrical</div><div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733; <span>4.9 &middot; Open now</span></div></div>
          <div className="gbiz dim"><div className="bn">City Wide Electric</div><div className="stars">&#9733;&#9733;&#9733;&#9733; <span>4.1</span></div></div>
          <div className="gbiz dim"><div className="bn">Rapid Volt</div><div className="stars">&#9733;&#9733;&#9733;&#9733; <span>4.0</span></div></div>
        </div>
      </div></div>
    );
  }
  if (kind === 'booking') {
    return (
      <div className="sbwrap"><div className="appwin">
        <div className="aw-top"><span className="aw-ic" />Book a visit</div>
        <div className="aw-body">
          <div className="bk-days"><div className="d">Mon<b>7</b></div><div className="d on">Tue<b>8</b></div><div className="d">Wed<b>9</b></div><div className="d">Thu<b>10</b></div><div className="d">Fri<b>11</b></div></div>
          <div className="bk-slots"><div className="s x">8 to 10</div><div className="s">10 to 12</div><div className="s x">12 to 2</div><div className="s sel">2 to 4 PM</div><div className="s">4 to 6</div><div className="s">6 to 8</div></div>
          <div className="bk-conf">Booked: Tue 2 to 4 PM. Added to your calendar and theirs.</div>
        </div>
      </div></div>
    );
  }
  if (kind === 'chase') {
    return (
      <div className="sbwrap"><div className="appwin">
        <div className="aw-top"><span className="aw-ic" />Quote #1042<span className="aw-r" style={{ color: '#86868b' }}>$1,850</span></div>
        <div className="aw-body">
          <div className="bi"><span className="bic" style={{ background: '#0ea5e9' }} /><div><b>Quote sent</b> &middot; panel upgrade &middot; Mon</div></div>
          <div className="bi"><span className="bic" style={{ background: '#06b6d4' }} /><div><b>Followed up</b> &middot; Wed morning</div></div>
          <div className="bi"><span className="bic" style={{ background: '#14b8a6' }} /><div><b>Followed up</b> &middot; Fri, quick reminder</div></div>
          <div className="bi"><span className="bic" style={{ background: '#10b981' }} /><div><b>Accepted.</b> Booked for next Tuesday.</div></div>
          <div className="sub" style={{ marginTop: 14 }}>You never had to chase it.</div>
        </div>
      </div></div>
    );
  }
  if (kind === 'brief') {
    return (
      <div className="sbwrap"><div className="appwin brief-l">
        <div className="aw-top"><span className="aw-ic" />Your morning brief<span className="aw-r" style={{ color: '#86868b' }}>Tue, 7:00 AM</span></div>
        <div className="aw-body">
          <div className="bi"><span className="bic" style={{ background: '#0ea5e9' }} /><div><b>3 jobs today.</b> First at 8:30, all confirmed.</div></div>
          <div className="bi"><span className="bic" style={{ background: '#06b6d4' }} /><div><b>2 quotes open.</b> We are chasing both.</div></div>
          <div className="bi"><span className="bic" style={{ background: '#14b8a6' }} /><div><b>$4,200 collected</b> yesterday.</div></div>
          <div className="bi"><span className="bic" style={{ background: '#10b981' }} /><div><b>New 5-star review</b> from Sandra M.</div></div>
          <div className="sub" style={{ marginTop: 14 }}>That is it. Go run your day.</div>
        </div>
      </div></div>
    );
  }
  if (kind === 'repeat') {
    return (
      <div className="sbwrap"><div className="appwin">
        <div className="aw-top"><span className="aw-ic" />Bring them back</div>
        <div className="aw-body">
          <div className="rp-camp">Winter tune-up reminder</div>
          <div className="rp-meta">Sent automatically to 214 past customers.</div>
          <div className="rp-bar"><i /></div>
          <div className="rp-res"><span className="sub">18 rebooked</span><span><b>$9,400</b> in repeat work</span></div>
        </div>
      </div></div>
    );
  }
  return null;
}

function StepRow({ s }: { s: Step }) {
  return (
    <div className={`step${s.viz === 'none' ? ' solo' : ''}${s.rev ? ' rev' : ''}`} id={s.id}>
      <div className="txt">
        <div className="k">{s.k}</div>
        <h3>{s.h}</h3>
        <p>{s.b}</p>
      </div>
      {s.viz !== 'none' && <div className="viz">{viz(s.viz)}</div>}
    </div>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState('learn');
  const [openF, setOpenF] = useState<number | null>(0);

  useEffect(() => {
    const ids = ['learn', ...STEPS.map((s) => s.id)];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const loopNodes: ReactNode[] = [];
  LOOP.forEach((c, i) => {
    loopNodes.push(
      <div key={c.t} className={`card${c.you ? ' you' : ''}`}>
        <div className="n">{c.you ? 'YOURS' : `0${i + 1}`}</div>
        <div className="t">{c.t}</div>
        <div className="s">{c.s}</div>
      </div>,
    );
    if (i < LOOP.length - 1) loopNodes.push(<div key={`a${i}`} className="arr"><ArrowIcon /></div>);
  });

  return (
    <div className="hiw">
      <style>{CSS}</style>

      {/* HERO */}
      <header className="hiw-hero">
        <div className="wrap">
          <div className="eyebrow">How it works</div>
          <h1>{HERO_H}</h1>
          <p className="lead">{HERO_SUB}</p>
          <div className="cta">
            <a className="hiw-btn" href={START_LINK}>Pick a time</a>
            <a className="hiw-btn ghost" href="#learn">Walk the flow</a>
          </div>

          <div className="hiw-loop">
            <div className="row">{loopNodes}</div>
            <div className="loopback"><LoopIcon /> and the cycle repeats, every customer</div>
            <div className="cap">Illustration of the flow</div>
          </div>
        </div>
      </header>

      {/* RAIL */}
      <nav className="hiw-rail">
        <div className="rail-in">
          {[{ id: 'learn', l: 'Learns you' }, { id: 'found', l: 'Found' }, { id: 'answered', l: 'Answered' }, { id: 'booked', l: 'Booked' }, { id: 'chased', l: 'Chased' }, { id: 'back', l: 'Brought back' }].map((c) => (
            <a key={c.id} href={`#${c.id}`} className={active === c.id ? 'on' : ''}>{c.l}</a>
          ))}
        </div>
      </nav>

      {/* THE SHIFT */}
      <section className="hiw-shift">
        <div className="wrap">
          <div className="eyebrow">The shift</div>
          <h2>{SHIFT_H}</h2>
          <p>{SHIFT_P}</p>
        </div>
      </section>

      {/* LEARN (centerpiece) */}
      <section className="hiw-learn" id="learn">
        <div className="wrap">
          <div className="grid">
            <div>
              <div className="eyebrow">Step one</div>
              <h2 style={{ marginTop: 14 }}>{LEARN_H}</h2>
              <p>{LEARN_P}</p>
            </div>
            <div className="learncard">
              <div className="lc-top">Your business, learned</div>
              <div className="lc-h">The playbook everything runs on</div>
              <ul>{LEARN_ROWS.map((r) => <li key={r}><Check /> {r}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="hiw-flow">
        <div className="wrap">
          <div className="flowhead">
            <div className="eyebrow">Then it runs</div>
            <h2>Every customer, handled start to finish.</h2>
          </div>
          <div className="illus">Screens below are illustrations of the flow</div>
          {STEPS.map((s) => <StepRow key={s.id} s={s} />)}
        </div>
      </section>

      {/* HONEST */}
      <section className="hiw-honest">
        <div className="wrap">
          <div className="eyebrow">The honest part</div>
          <h2>{HONEST_H}</h2>
          <p>{HONEST_P}</p>
        </div>
      </section>

      {/* BRIEF */}
      <section className="hiw-brief">
        <div className="wrap">
          <div className="eyebrow">What you see</div>
          <h2>{BRIEF_H}</h2>
          <p>{BRIEF_P}</p>
          <div className="viz">{viz('brief')}</div>
        </div>
      </section>

      {/* SIGNATURE STAT */}
      <section className="hiw-stat">
        <div className="wrap">
          <h2>Nothing <span className="g">slips through.</span></h2>
          <p>Every call, every quote, every follow-up. Handled while you work.</p>
        </div>
      </section>

      {/* PROOF */}
      <section className="hiw-proof">
        <div className="wrap">
          <p>We run this exact flow ourselves. <a href="/work">Top Choice Electrical and XNL, live now &rarr;</a></p>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="hiw-spec" id="included">
        <div className="wrap">
          <h2>Everything included.</h2>
          <p className="sub">All of it, run for you. No add-ons, no upsells.</p>
          <div className="cols">
            {SPEC.map((g) => (
              <div key={g.group}>
                <div className="grp">{g.group}</div>
                <ul>{g.items.map((it) => <li key={it}><Check /> {it}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="hiw-faq">
        <div className="wrap">
          <h2>Questions, answered.</h2>
          <div className="list">
            {FAQ.map((f, i) => (
              <div key={f.q} className={`hiw-q${openF === i ? ' open' : ''}`}>
                <button type="button" onClick={() => setOpenF(openF === i ? null : i)}>
                  {f.q}<span className="pl">+</span>
                </button>
                <div className="ans"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSER */}
      <section className="hiw-close">
        <div className="wrap">
          <h2>You do the work. We will run the rest.</h2>
          <p className="price">$1,750 to get found. $199 a month to run it. No lock-in. <a href="/pricing">See full pricing</a></p>
          <div className="cta"><a className="hiw-btn" href={START_LINK}>Pick a time</a></div>
        </div>
      </section>
    </div>
  );
}

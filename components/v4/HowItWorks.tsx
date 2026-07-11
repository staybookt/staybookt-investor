'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { START_LINK } from '@/lib/site';
import Receptionist from './Receptionist';
import PlayOnView from './PlayOnView';

const HERO_H = 'You run the business. We run the busywork.';
const HERO_SUB = 'One guided journey, three milestones. Follow the path and watch what StayBookt does at every stop.';
const JNOTE = 'Get Found and StayBookt come together as one simple monthly plan. Enjoy Life is the invitation you earn, once your first year has built the systems, the reputation, and the revenue.';

const LEARN_H = 'First, we learn your business.';
const LEARN_P = 'Before the journey starts, we sit down and learn how you actually work. What you charge. Which jobs you take and which you pass on. Your service area. How you talk to a customer. That becomes the playbook everything else runs on, so when we answer, it sounds like you, not a call center.';
const LEARN_ROWS = ['What you charge, job by job', 'The jobs you take and the ones you pass', 'Your service area and your hours', 'How you talk to a customer'];

type Stop = {
  id: string; n: string; label: string; promise: string; voice: string; accent: string; accentD: string;
  side: 'left' | 'right'; surface: 'getfound' | 'staybookt' | 'enjoy'; beat: string; result: string; steps: { t: string; b: string }[];
};
const STOPS: Stop[] = [
  {
    id: 'found', n: '1', label: 'Get found', promise: 'Impossible to miss.', voice: 'Finally. The phone is ringing again.',
    accent: '#0ea5e9', accentD: '#0284c7', side: 'left', surface: 'getfound',
    beat: 'We build your site, analyze your numbers, and get you found on search, the map, and AI recommendations.',
    result: 'Inbox full, texts flowing, phone ringing.',
    steps: [
      { t: 'We build you a proper website.', b: 'Fast, works on a phone, made to turn a visitor into a call. Built and hosted for you, nothing to manage.' },
      { t: 'We fix your Google listing.', b: 'The thing that pops up when someone searches your trade. We fill it out, keep it current, and get Google to trust it.' },
      { t: 'We get you ranked, and recommended.', b: 'Your details match everywhere so you climb the map, and you show up when someone asks an AI assistant for your trade nearby.' },
      { t: 'We build your reviews.', b: 'Every finished job becomes a five-star review. More reviews means you climb higher and get picked more often.' },
    ],
  },
  {
    id: 'run', n: '2', label: 'StayBookt', promise: 'Every lead, maximized.', voice: 'It is 2 a.m. I am asleep. It is handled.',
    accent: '#10b981', accentD: '#059669', side: 'right', surface: 'staybookt',
    beat: 'We catch the missed call, book the job, chase the quote, win the review, and rebook the second job.',
    result: 'Nothing leaks. Every customer worth everything they are worth.',
    steps: [
      { t: 'We answer every call and text.', b: 'Day or night, in your voice. AI handles the everyday ones. A real person steps in on anything unusual, before it reaches your customer.' },
      { t: 'We book, confirm, and remind.', b: 'Straight onto your calendar, confirmed with the customer, with reminders so they actually show up.' },
      { t: 'We quote and chase.', b: 'Every quote goes out and gets followed up until you get a yes or a no. We chase unpaid invoices so the money lands.' },
      { t: 'We grow every customer.', b: 'Reviews and referrals from the happy ones. The right upsell. Follow-up maintenance booked before they drift.' },
      { t: 'We hand you one short brief a day.', b: 'What is booked, what needs a decision, what came in. Thirty seconds, then go run your day.' },
    ],
  },
  {
    id: 'free', n: '3', label: 'Enjoy life', promise: 'You choose.', voice: 'I could actually sell this. Or not. My call.',
    accent: '#f59e0b', accentD: '#b45309', side: 'left', surface: 'enjoy',
    beat: 'After 12 months, we run a real valuation, in dollars and in freedom. Then you decide what to do with it.',
    result: 'Sell it, hand it to family, or just do the part you love.',
    steps: [
      { t: 'We build toward a number.', b: 'Everything in the first year is engineered so the business is worth more, and provable, by the time we value it.' },
      { t: 'We value what matters.', b: 'The financials, and the freedom: how much the business depends on you, and how well it runs without you.' },
      { t: 'You take the driver seat.', b: 'Sell to a buyer, hand it to a family member, or step back to the part of the work you actually love.' },
      { t: 'It was always the point.', b: 'You built this business to enjoy your life. This is where that finally happens.' },
    ],
  },
];

const START_H = 'See where you are leaking. Free.';
const START_P = 'A free 30 minutes with a founder, not a sales rep. We show you where the calls, quotes, and jobs are slipping through, and what it is costing you. Yours to keep, whether you hire us or not.';

const FAQ: { q: string; a: string }[] = [
  { q: 'Is it AI or a real person answering?', a: 'Both, on purpose. AI handles the everyday calls, texts, and bookings so nothing gets missed. When something is unusual or high-stakes, a real person on our team steps in before it reaches your customer. You are never the one picking up the slack.' },
  { q: 'How does it know how to talk about my business?', a: 'That is what the first couple of weeks are for. We learn your prices, your service area, the jobs you take, and how you talk to a customer. Everything after that runs on your playbook, not a generic script.' },
  { q: 'Do I have to learn any software?', a: 'No. That is the whole point. We run it. You get a short brief each morning and approve the occasional thing. There is no app you are forced to live in.' },
  { q: 'What if I already have a website?', a: 'We will look at it. If it is doing the job, we build around it. If it is holding you back, we replace it. You are not stuck with something that does not convert.' },
  { q: 'Do I keep my phone number?', a: 'Yes. Your number stays yours. We make sure the calls and texts you cannot pick up still get answered and booked.' },
  { q: 'Who owns the website and domain?', a: 'The site is yours to keep. If you already own your domain it stays in your name. If we set one up for you, we walk through the handover on the call. Nothing holds you hostage.' },
  { q: 'How long until I am live?', a: 'About 30 days from the first call.' },
  { q: 'Is there a contract?', a: 'We keep the terms simple and walk you through them on the call. Whatever happens, the website is always yours to keep.' },
  { q: 'What is the valuation at the end?', a: 'After your first year, we value the business on two axes: what it is worth in dollars, and how well it runs and grows without you glued to it. Then you decide what to do with it. There is no obligation to sell.' },
];

const CSS = `
.hiw{background:#fff;color:var(--v4-ink);}
.hiw .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.hiw .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.hiw h1,.hiw h2,.hiw h3,.hiw h4{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.hiw-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 30px;text-decoration:none;transition:transform .3s ease;}
.hiw-btn:hover{transform:translateY(-1px);}
.hiw-btn.ghost{background:transparent;color:var(--v4-ink);border:1px solid rgba(0,0,0,.18);}

/* hero */
.hiw-hero{position:relative;background:#050506;text-align:center;padding:clamp(140px,18vh,210px) 0 clamp(70px,9vw,110px);overflow:hidden;}
.hiw-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(62% 52% at 50% 0%,rgba(14,165,233,.16),transparent 62%);pointer-events:none;}
.hiw-hero .wrap{position:relative;}
.hiw-hero .eyebrow{color:#c9cdd6;}
.hiw-hero h1{margin-top:18px;font-size:clamp(42px,6.6vw,88px);line-height:1.0;max-width:15ch;margin-left:auto;margin-right:auto;color:#f5f5f7;}
.hiw-hero p.lead{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.45;color:#aeb4c0;max-width:44ch;}
.hiw-hero .cta{margin-top:34px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.hiw-hero .hiw-btn{background:#f5f5f7;color:#050506;}
.hiw-hero .hiw-btn.ghost{background:transparent;color:#f5f5f7;border-color:rgba(255,255,255,.3);}
.hiw-hero .jnote{margin:36px auto 0;font-size:14.5px;line-height:1.55;color:#8f97a4;max-width:58ch;}

/* learn */
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

/* ===== JOURNEY MAP (weaving SVG trail, warming arc) ===== */
.hiw-jrny{padding:clamp(56px,7vw,96px) 0 clamp(70px,9vw,120px);background:linear-gradient(180deg,#f6f8fb 0%,#f9faf7 42%,#fdf7ee 100%);}
.hiw-jrny .jhead{text-align:center;max-width:640px;margin:0 auto clamp(30px,4vw,52px);}
.hiw-jrny .jhead h2{font-size:clamp(30px,4.4vw,54px);line-height:1.05;margin-top:14px;}
.hiw-jrny .jhead p{margin-top:16px;font-size:clamp(16px,1.8vw,19px);color:#7a828f;line-height:1.5;}
.jmap{position:relative;max-width:940px;margin:0 auto;}
.jsvg{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;overflow:visible;}
.jsvg .bg{fill:none;stroke:rgba(10,14,26,.1);stroke-width:2.5;stroke-linecap:round;}
.jsvg .tr{fill:none;stroke:url(#jgrad);stroke-width:3.4;stroke-linecap:round;}
.jsvg .jdot{fill:#fff;stroke:#10b981;stroke-width:3;filter:drop-shadow(0 3px 10px rgba(16,185,129,.5));}
.jrows{position:relative;z-index:1;}
@media(prefers-reduced-motion:reduce){.jsvg .tr{stroke-dashoffset:0 !important;}}

.jstart,.jend{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;}
.jstart{padding-bottom:clamp(26px,4vw,44px);}
.jend{padding-top:clamp(30px,5vw,52px);}
.jstart .sdot{width:16px;height:16px;border-radius:50%;background:var(--v4-ink);position:relative;z-index:2;}
.jend .edot{width:20px;height:20px;border-radius:50%;background:#f59e0b;position:relative;z-index:2;box-shadow:0 0 0 6px rgba(245,158,11,.16);}
.jstart .st{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9298a1;}
.jstart .sh{margin-top:3px;font-size:clamp(17px,2vw,20px);font-weight:600;color:var(--v4-ink);}
.jend .eh{font-size:clamp(18px,2.2vw,24px);font-weight:600;letter-spacing:-.02em;color:var(--v4-ink);max-width:16ch;}

.jstop{display:grid;gap:clamp(16px,3vw,40px);align-items:start;padding:clamp(30px,5vw,54px) 0;opacity:.45;transform:translateY(14px);transition:opacity .6s ease,transform .6s ease;}
.jstop.left{grid-template-columns:56px minmax(0,1fr);}
.jstop.right{grid-template-columns:minmax(0,1fr) 56px;}
.jstop.right .node{order:2;}
.jstop.right .body{order:1;}
.jstop.on{opacity:1;transform:none;}
.jstop .node{width:46px;height:46px;border-radius:50%;background:#e6e8ec;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;margin:0 auto;border:4px solid #fff;position:relative;z-index:2;transition:background .5s ease;box-shadow:0 4px 16px -6px rgba(6,12,20,.3);}
.jstop.on .node{background:var(--acc);animation:jpulse 1.4s ease-out .1s 1;}
@keyframes jpulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--acc) 55%,transparent);}100%{box-shadow:0 0 0 22px rgba(0,0,0,0);}}
@media(prefers-reduced-motion:reduce){.jstop{opacity:1;transform:none;}.jstop.on .node{animation:none;}}
.jstop .plabel{font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--acd);}
.jstop .promise{margin-top:8px;font-size:clamp(28px,4vw,50px);font-weight:600;line-height:1.02;letter-spacing:-.03em;}
.jstop .voice{margin-top:14px;font-size:clamp(16px,1.9vw,20px);font-style:italic;color:#5b616b;max-width:34ch;}
.jstop .beat{margin-top:16px;font-size:clamp(15px,1.6vw,17px);line-height:1.5;color:#6b7280;max-width:48ch;}
.jstop .result{display:inline-block;margin-top:16px;font-size:14.5px;font-weight:600;color:var(--acd);}
.jstop .stage{position:relative;margin:30px 0 6px;display:flex;justify-content:flex-start;}
.jstop.right .stage{justify-content:flex-end;}
.jstop.right .body{text-align:right;}
.jstop.right .voice,.jstop.right .beat{margin-left:auto;}
.jstop.right .steps ol{margin-left:auto;}
.jstop .stage::before{content:'';position:absolute;inset:-8% -6% 2% -6%;background:radial-gradient(50% 55% at 42% 45%,color-mix(in srgb,var(--acc) 20%,transparent),transparent 72%);filter:blur(40px);z-index:0;}
.jstop .stage>*{position:relative;z-index:1;}
.jstop .detail{margin-top:26px;}
.jstop.right .detail{display:flex;flex-direction:column;align-items:flex-end;}
.jstop .toggle{display:inline-flex;align-items:center;gap:9px;background:#fff;border:1px solid #e2e2df;color:var(--v4-ink);font-family:inherit;font-size:14px;font-weight:600;border-radius:999px;padding:10px 18px;cursor:pointer;transition:border-color .25s ease;}
.jstop .toggle:hover{border-color:var(--acc);}
.jstop .toggle .pl{font-size:17px;line-height:1;color:var(--acc);transition:transform .3s ease;}
.jstop .detail.open .toggle .pl{transform:rotate(45deg);}
.jstop .steps{max-height:0;overflow:hidden;transition:max-height .55s cubic-bezier(.16,1,.3,1),margin .4s ease;}
.jstop .detail.open .steps{max-height:1200px;margin-top:24px;}
.jstop .steps ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:16px;max-width:60ch;}
.jstop .steps li{display:grid;grid-template-columns:30px 1fr;gap:13px;align-items:start;text-align:left;}
.jstop .steps .num{width:30px;height:30px;border-radius:50%;background:var(--acc);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13.5px;font-weight:700;flex:0 0 auto;}
.jstop .steps .sc{font-size:15px;line-height:1.5;color:#42474f;}
.jstop .steps .sc b{color:var(--v4-ink);font-weight:600;}
@media(max-width:640px){
  .jstop.left,.jstop.right{grid-template-columns:40px minmax(0,1fr);gap:16px;}
  .jstop.right .node{order:0;}.jstop.right .body{order:0;text-align:left;}
  .jstop.right .stage{justify-content:center;}.jstop.right .detail{align-items:flex-start;}
  .jstop.right .voice,.jstop.right .beat,.jstop.right .steps ol{margin-left:0;}
  .jstop .node{width:38px;height:38px;font-size:15px;}.jstop .stage{justify-content:center;}
}

/* corner mini-map HUD */
.jhud{position:fixed;right:22px;bottom:22px;z-index:30;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border:1px solid #ececf0;border-radius:16px;padding:14px 16px 14px 14px;box-shadow:0 20px 50px -24px rgba(6,12,20,.4);display:flex;gap:12px;align-items:stretch;opacity:0;transform:translateY(10px);transition:opacity .4s ease,transform .4s ease;pointer-events:none;}
.jhud.show{opacity:1;transform:none;}
.jhud .track{position:relative;width:4px;border-radius:2px;background:#e6e8ec;}
.jhud .track i{position:absolute;left:0;top:0;width:4px;border-radius:2px;height:calc(var(--p,0)*100%);background:linear-gradient(180deg,#0ea5e9,#10b981 55%,#f59e0b);}
.jhud .track .dot{position:absolute;left:-4px;top:calc(var(--p,0)*100%);width:12px;height:12px;border-radius:50%;background:#fff;border:2px solid var(--v4-ink);transform:translateY(-50%);box-shadow:0 2px 6px rgba(0,0,0,.25);}
.jhud .labs{display:flex;flex-direction:column;justify-content:space-between;font-size:11px;font-weight:600;}
.jhud .labs span{color:#9298a1;transition:color .3s;}
.jhud .labs span.on{color:var(--v4-ink);}
@media(max-width:720px){.jhud{display:none;}}

/* ===== SCENE: Get Found (search climb) ===== */
.gf{width:min(430px,100%);}
.gf .gfwin{background:#fff;border-radius:18px;border:1px solid #ececf0;box-shadow:0 44px 90px -44px rgba(0,0,0,.4);overflow:hidden;}
.gf .gftop{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #f1f1f4;font-size:13.5px;color:#42474f;}
.gf .gftop .q{flex:1;background:#f4f5f7;border-radius:999px;padding:8px 14px;color:#42474f;font-weight:500;}
.gf .gflist{position:relative;height:296px;margin:14px;}
.gf .srow{position:absolute;left:0;right:0;height:64px;border-radius:14px;border:1px solid #ececf0;background:#fff;display:flex;align-items:center;gap:12px;padding:0 15px;transition:top .9s cubic-bezier(.16,1,.3,1),box-shadow .6s ease,border-color .6s ease,opacity .6s ease;box-shadow:0 4px 14px -12px rgba(0,0,0,.2);}
.gf .srow .pin{width:9px;height:9px;border-radius:50%;background:#c4c8ce;flex:0 0 auto;}
.gf .srow .nm{font-size:14.5px;font-weight:600;color:var(--v4-ink);white-space:nowrap;}
.gf .srow .rt{margin-left:auto;font-size:12px;color:#9298a1;white-space:nowrap;}
.gf .srow .badge{position:absolute;top:-8px;left:14px;background:#0ea5e9;color:#fff;font-size:9.5px;font-weight:700;padding:2px 8px;border-radius:999px;opacity:0;transition:opacity .5s .8s;}
.gf .srow.tc{top:222px;}.gf.on .srow.tc{top:0;border-color:rgba(14,165,233,.5);box-shadow:0 16px 34px -12px rgba(14,165,233,.45);}
.gf.on .srow.tc .pin{background:#0ea5e9;}.gf.on .srow.tc .badge{opacity:1;}
.gf .srow.r1{top:0;}.gf.on .srow.r1{top:74px;opacity:.6;}
.gf .srow.r2{top:74px;}.gf.on .srow.r2{top:148px;opacity:.6;}
.gf .srow.r3{top:148px;}.gf.on .srow.r3{top:222px;opacity:.6;}
.gf .ai{margin-top:14px;background:#0b0f14;border-radius:16px;padding:14px 16px;opacity:0;transform:translateY(8px);transition:opacity .6s 1s ease,transform .6s 1s ease;}
.gf.on .ai{opacity:1;transform:none;}
.gf .ai .k{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#5eead4;}
.gf .ai .q2{margin-top:7px;font-size:13.5px;color:#c7ccd6;}
.gf .ai .a2{margin-top:8px;font-size:14.5px;color:#fff;font-weight:500;line-height:1.4;}
.gf .chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;}
.gf .chip{font-size:11.5px;font-weight:600;color:#059669;background:rgba(16,185,129,.12);border-radius:999px;padding:6px 12px;opacity:0;transform:translateY(6px);transition:opacity .5s ease,transform .5s ease;}
.gf.on .chip{opacity:1;transform:none;}
.gf.on .chip:nth-child(1){transition-delay:1.1s;}.gf.on .chip:nth-child(2){transition-delay:1.25s;}

/* ===== SCENE: Enjoy Life (valuation) ===== */
.el{width:min(470px,100%);}
.el .valcard{background:#0b0f14;color:#fff;border-radius:20px;padding:26px 26px 24px;box-shadow:0 50px 100px -44px rgba(0,0,0,.6);text-align:left;}
.el .valcard .k{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9aa0ab;}
.el .valcard .num{margin-top:8px;font-size:clamp(40px,7vw,58px);font-weight:700;letter-spacing:-.03em;line-height:1;background:linear-gradient(100deg,#f59e0b,#fbbf24 60%,#fde68a);-webkit-background-clip:text;background-clip:text;color:transparent;}
.el .valcard .ns{margin-top:6px;font-size:13px;color:#9aa0ab;}
.el .valcard .meterlab{display:flex;justify-content:space-between;margin-top:22px;font-size:12.5px;color:#c7ccd6;}
.el .valcard .meter{margin-top:8px;height:9px;border-radius:999px;background:rgba(255,255,255,.1);overflow:hidden;}
.el .valcard .meter i{display:block;height:100%;width:var(--m,0%);border-radius:999px;background:linear-gradient(90deg,#10b981,#f59e0b);transition:width 1.4s cubic-bezier(.16,1,.3,1) .3s;}
.el .choices{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px;}
.el .choice{background:#fff;border:1px solid #ececf0;border-radius:16px;padding:16px 14px;text-align:left;cursor:pointer;font-family:inherit;transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;}
.el .choice:hover,.el .choice.on{border-color:#f59e0b;transform:translateY(-3px);box-shadow:0 18px 34px -18px rgba(245,158,11,.4);}
.el .choice .ci{width:30px;height:30px;border-radius:9px;background:rgba(245,158,11,.14);display:flex;align-items:center;justify-content:center;color:#b45309;}
.el .choice .cl{margin-top:11px;font-size:15px;font-weight:600;color:var(--v4-ink);}
.el .choice .cd{max-height:0;overflow:hidden;font-size:12.5px;line-height:1.4;color:#6b7280;transition:max-height .35s ease,margin .35s ease;}
.el .choice:hover .cd,.el .choice.on .cd{max-height:80px;margin-top:7px;}
@media(max-width:520px){.el .choices{grid-template-columns:1fr;}.el .choice .cd{max-height:80px;margin-top:7px;}}

/* ===== interactive leak slider ===== */
.leak{margin-top:26px;background:#fff;border:1px solid #ececf0;border-radius:18px;padding:20px 22px;max-width:460px;box-shadow:0 20px 44px -30px rgba(6,12,20,.3);text-align:left;}
.jstop.right .leak{margin-left:auto;}
.leak .lk-top{font-size:13px;font-weight:600;color:#42474f;}
.leak input[type=range]{width:100%;margin:16px 0 4px;accent-color:#10b981;height:6px;}
.leak .lk-row{display:flex;justify-content:space-between;align-items:baseline;}
.leak .lk-calls{font-size:13px;color:#6b7280;}
.leak .lk-val{font-size:clamp(24px,3.4vw,32px);font-weight:700;letter-spacing:-.02em;color:#059669;}
.leak .lk-note{margin-top:6px;font-size:11.5px;color:#9298a1;}

/* get started */
.hiw-start{text-align:center;padding:clamp(90px,13vw,160px) 0;background:#fff;}
.hiw-start h2{margin-top:16px;font-size:clamp(34px,5.4vw,72px);line-height:1.0;max-width:16ch;margin-left:auto;margin-right:auto;}
.hiw-start p{margin:26px auto 0;font-size:clamp(18px,2.1vw,22px);line-height:1.55;color:#52565e;max-width:48ch;}
.hiw-start .cta{margin-top:34px;}

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

/* Get Found scene: results climb, you land at #1, an AI assistant names you. */
function GetFoundScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) el.classList.add('on'); }), { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="gf" ref={ref}>
      <div className="gfwin">
        <div className="gftop">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9298a1" strokeWidth={2}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
          <span className="q">electrician near me</span>
        </div>
        <div className="gflist">
          <div className="srow r1"><span className="pin" /><span className="nm">City Wide Electric</span><span className="rt">&#9733; 4.1</span></div>
          <div className="srow r2"><span className="pin" /><span className="nm">Sparky &amp; Sons</span><span className="rt">&#9733; 3.8</span></div>
          <div className="srow r3"><span className="pin" /><span className="nm">Rapid Volt</span><span className="rt">&#9733; 4.0</span></div>
          <div className="srow tc"><span className="badge">#1</span><span className="pin" /><span className="nm">Top Choice Electrical</span><span className="rt">&#9733; 4.9 &middot; Open now</span></div>
        </div>
      </div>
      <div className="ai">
        <div className="k">Asked an AI assistant</div>
        <div className="q2">&ldquo;Who is a good electrician near me?&rdquo;</div>
        <div className="a2">Top Choice Electrical &mdash; 4.9 stars, open now, and one tap to call.</div>
      </div>
      <div className="chips">
        <span className="chip">New text &middot; booked</span>
        <span className="chip">Missed call &middot; caught</span>
      </div>
    </div>
  );
}

/* Enjoy Life scene: valuation counts up, then you choose your path. */
function EnjoyLifeScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [val, setVal] = useState(0);
  const [choice, setChoice] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let played = false;
    const obs = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !played) {
        played = true;
        el.classList.add('on');
        const target = 420000;
        if (reduce) { setVal(target); return; }
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          const ease = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(target * ease));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }), { threshold: 0.45 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const CH = [
    { l: 'Sell it', d: 'A business that runs on its own is one a buyer actually wants.', icon: 'M12 3v18M5 10l7-7 7 7' },
    { l: 'Hand it off', d: 'Pass a clean, self-running operation to a family member.', icon: 'M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6' },
    { l: 'Just enjoy it', d: 'Step back to the part of the work you actually love.', icon: 'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z' },
  ];
  return (
    <div className="el" ref={ref} style={{ '--m': '78%' } as CSSProperties}>
      <div className="valcard">
        <div className="k">Your business, valued</div>
        <div className="num">${val.toLocaleString()}</div>
        <div className="ns">Up from a business that could not run without you.</div>
        <div className="meterlab"><span>Time back in your week</span><span>12 hrs</span></div>
        <div className="meter"><i /></div>
      </div>
      <div className="choices">
        {CH.map((c, i) => (
          <button key={c.l} type="button" className={`choice${choice === i ? ' on' : ''}`} onMouseEnter={() => setChoice(i)} onClick={() => setChoice(i)}>
            <span className="ci"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={c.icon} /></svg></span>
            <div className="cl">{c.l}</div>
            <div className="cd">{c.d}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Interactive: how much are missed calls costing you */
function LeakSlider() {
  const [calls, setCalls] = useState(8);
  const monthly = Math.round((calls * 4.3 * 250 * 0.7) / 10) * 10;
  return (
    <div className="leak">
      <div className="lk-top">How many calls do you miss in a week?</div>
      <input type="range" min={0} max={20} value={calls} onChange={(e) => setCalls(Number(e.target.value))} />
      <div className="lk-row">
        <span className="lk-calls">{calls} missed / week</span>
        <span className="lk-val">${monthly.toLocaleString()}/mo</span>
      </div>
      <div className="lk-note">Roughly what we would recover, at an average job of $250. A real number comes from your data.</div>
    </div>
  );
}

function StopBlock({ s, open, onToggle, obsRef, pointRef }: { s: Stop; open: boolean; onToggle: () => void; obsRef: (el: HTMLDivElement | null) => void; pointRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div className={`jstop ${s.side}`} id={s.id} ref={obsRef} style={{ '--acc': s.accent, '--acd': s.accentD } as CSSProperties}>
      <div className="node" ref={pointRef}>{s.n}</div>
      <div className="body">
        <div className="plabel">Milestone {s.n} &middot; {s.label}</div>
        <div className="promise">{s.promise}</div>
        <div className="voice">&ldquo;{s.voice}&rdquo;</div>
        <div className="beat">{s.beat}</div>
        <div className="result">&rarr; {s.result}</div>

        <div className="stage">
          {s.surface === 'getfound' && <GetFoundScene />}
          {s.surface === 'staybookt' && <PlayOnView><Receptionist /></PlayOnView>}
          {s.surface === 'enjoy' && <EnjoyLifeScene />}
        </div>

        {s.surface === 'staybookt' && <LeakSlider />}

        <div className={`detail${open ? ' open' : ''}`}>
          <button type="button" className="toggle" onClick={onToggle}>
            See exactly how we do it <span className="pl">+</span>
          </button>
          <div className="steps">
            <ol>
              {s.steps.map((st, i) => (
                <li key={st.t}><span className="num">{i + 1}</span><span className="sc"><b>{st.t}</b> {st.b}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [openF, setOpenF] = useState<number | null>(0);
  const [openStop, setOpenStop] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const [hudOn, setHudOn] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const bgRef = useRef<SVGPathElement | null>(null);
  const trailRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const lenRef = useRef(0);
  const pRef = useRef(0);
  const pts = useRef<Record<string, HTMLElement | null>>({});
  const stopEls = useRef<Record<string, HTMLDivElement | null>>({});

  const apply = (p: number) => {
    const trail = trailRef.current, dot = dotRef.current, L = lenRef.current;
    if (!trail || !L) return;
    trail.style.strokeDashoffset = String(L * (1 - p));
    if (dot) {
      const pt = trail.getPointAtLength(L * Math.max(0, Math.min(1, p)));
      dot.setAttribute('cx', String(pt.x));
      dot.setAttribute('cy', String(pt.y));
    }
  };

  const build = () => {
    const map = mapRef.current, svg = svgRef.current, trail = trailRef.current, bg = bgRef.current;
    if (!map || !svg || !trail || !bg) return;
    const mr = map.getBoundingClientRect();
    const W = map.clientWidth, H = map.clientHeight;
    const order = ['start', 'found', 'run', 'free', 'end'];
    const P = order.map((k) => {
      const el = pts.current[k];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - mr.left, y: r.top + r.height / 2 - mr.top };
    }).filter(Boolean) as { x: number; y: number }[];
    if (P.length < 2) return;
    let d = `M ${P[0].x.toFixed(1)} ${P[0].y.toFixed(1)}`;
    for (let i = 1; i < P.length; i++) {
      const a = P[i - 1], b = P[i];
      const my = (a.y + b.y) / 2;
      d += ` C ${a.x.toFixed(1)} ${my.toFixed(1)}, ${b.x.toFixed(1)} ${my.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    bg.setAttribute('d', d);
    trail.setAttribute('d', d);
    const L = trail.getTotalLength();
    lenRef.current = L;
    trail.style.strokeDasharray = String(L);
    apply(pRef.current);
  };

  useLayoutEffect(() => {
    build();
    const t1 = setTimeout(build, 300);
    const t2 = setTimeout(build, 1200);
    const ro = new ResizeObserver(() => build());
    if (mapRef.current) ro.observe(mapRef.current);
    window.addEventListener('resize', build);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pRef.current = 1;
      apply(1);
    }
    return () => { clearTimeout(t1); clearTimeout(t2); ro.disconnect(); window.removeEventListener('resize', build); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = mapRef.current;
    const root = rootRef.current;
    if (!el || !root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { root.style.setProperty('--p', '1'); return; }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(Math.max((vh * 0.55 - r.top) / r.height, 0), 1);
        pRef.current = p;
        root.style.setProperty('--p', String(p));
        apply(p);
        setHudOn(r.top < vh * 0.5 && r.bottom > vh * 0.4);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          const idx = STOPS.findIndex((s) => s.id === (e.target as HTMLElement).id);
          if (idx >= 0) setActive(idx);
        }
      }),
      { rootMargin: '-30% 0px -45% 0px', threshold: 0 },
    );
    Object.values(stopEls.current).forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="hiw" ref={rootRef}>
      <style>{CSS}</style>

      {/* HUD */}
      <div className={`jhud${hudOn ? ' show' : ''}`} aria-hidden="true">
        <div className="track"><i /><span className="dot" /></div>
        <div className="labs">
          {STOPS.map((s, i) => <span key={s.id} className={active >= i ? 'on' : ''}>{s.label}</span>)}
        </div>
      </div>

      {/* HERO */}
      <header className="hiw-hero">
        <div className="wrap">
          <div className="eyebrow">How it works</div>
          <h1>{HERO_H}</h1>
          <p className="lead">{HERO_SUB}</p>
          <div className="cta">
            <a className="hiw-btn" href={START_LINK}>Pick a time</a>
            <a className="hiw-btn ghost" href="#found">Start the journey</a>
          </div>
          <p className="jnote">{JNOTE}</p>
        </div>
      </header>

      {/* LEARN */}
      <section className="hiw-learn" id="learn">
        <div className="wrap">
          <div className="grid">
            <div>
              <div className="eyebrow">Before the journey</div>
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

      {/* THE JOURNEY MAP */}
      <section className="hiw-jrny">
        <div className="wrap">
          <div className="jhead">
            <div className="eyebrow">The journey</div>
            <h2>Follow the path.</h2>
            <p>Every customer, and your whole business, travels this route. Here is what happens at each stop.</p>
          </div>
          <div className="jmap" ref={mapRef}>
            <svg className="jsvg" ref={svgRef} preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="jgrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0ea5e9" />
                  <stop offset="0.55" stopColor="#10b981" />
                  <stop offset="1" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <path className="bg" ref={bgRef} d="" />
              <path className="tr" ref={trailRef} d="" />
              <circle className="jdot" ref={dotRef} r="8.5" cx="-10" cy="-10" />
            </svg>

            <div className="jrows">
              <div className="jstart">
                <span className="sdot" ref={(el) => { pts.current.start = el; }} />
                <div>
                  <div className="st">Day one &middot; You are here</div>
                  <div className="sh">The phone barely rings.</div>
                </div>
              </div>

              {STOPS.map((s) => (
                <StopBlock
                  key={s.id}
                  s={s}
                  open={openStop === s.id}
                  onToggle={() => setOpenStop(openStop === s.id ? null : s.id)}
                  obsRef={(el) => { stopEls.current[s.id] = el; }}
                  pointRef={(el) => { pts.current[s.id] = el; }}
                />
              ))}

              <div className="jend">
                <span className="edot" ref={(el) => { pts.current.end = el; }} />
                <div className="eh">Go enjoy the life you built it for.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GET STARTED */}
      <section className="hiw-start" id="start">
        <div className="wrap">
          <div className="eyebrow">Get started</div>
          <h2>{START_H}</h2>
          <p>{START_P}</p>
          <div className="cta"><a className="hiw-btn" href={START_LINK}>Pick a time</a></div>
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
          <p className="price">One simple monthly plan gets you found and runs your business. <a href="/pricing">See the pricing</a></p>
          <div className="cta"><a className="hiw-btn" href={START_LINK}>Pick a time</a></div>
        </div>
      </section>
    </div>
  );
}

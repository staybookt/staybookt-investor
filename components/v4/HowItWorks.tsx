'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { START_LINK } from '@/lib/site';
import { AccountBrain, NightShift, Arrival } from './HiwScenes';
import { min } from '@/lib/css';
import { track } from '@/lib/analytics';

/* THE PEXELS PHOTO HERO IS GONE. This page and /whats-included were the only two
 * running a full-bleed still at min(88vh,820px) while the other six sat on a 190px
 * dark header, and that gap is most of why the set read as two different websites.
 * The header is the shared .pg-hero in globals.css now. The film moments on this site
 * are the homepage and /long-term, and this page still has the scroll-driven SVG
 * trail directly under the header, which is the motion that was earning its keep. */

/* Split so the second half can carry the brand gradient. The whole promise of the page
   is the second sentence, so that is the half that gets the colour. */
/* Two-stage hero, matching the homepage (Jul 23 2026): the solid clause lands, then the
   gradient payoff. Light hero, gradient path drawing itself underneath. */
const HERO_H_A = 'The whole front office,';
const HERO_H_B = 'off your plate';

/* The hero graphic: the front office running. Each row is a thing the front office handles,
   flipping to a handled state. Illustrative task types only, no invented numbers. */
const OFC_ICON: Record<string, string> = {
  call: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z',
  job: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  quote: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  review: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z',
  invoice: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h6',
};
/* THE ENGINE. Recognizable work streams in from every edge and dissolves into the core.
   sx/sy = the off-stage edge each chip flies from; dur/cd stagger the stream. */
const CHIPS: { ic: string; c: string; sx: number; sy: number; dur: string; cd: string }[] = [
  { ic: 'call', c: '#06b6d4', sx: -400, sy: -130, dur: '3.8s', cd: '0s' },
  { ic: 'quote', c: '#0ea5e9', sx: 400, sy: -170, dur: '4.1s', cd: '-.45s' },
  { ic: 'invoice', c: '#4f46e5', sx: -380, sy: 150, dur: '3.6s', cd: '-.9s' },
  { ic: 'review', c: '#7c3aed', sx: 400, sy: 150, dur: '4s', cd: '-1.35s' },
  { ic: 'job', c: '#10b981', sx: -70, sy: -280, dur: '3.7s', cd: '-1.8s' },
  { ic: 'call', c: '#06b6d4', sx: 110, sy: 280, dur: '4.2s', cd: '-2.25s' },
  { ic: 'quote', c: '#0ea5e9', sx: -430, sy: 20, dur: '3.9s', cd: '-2.7s' },
  { ic: 'invoice', c: '#4f46e5', sx: 430, sy: -30, dur: '3.7s', cd: '-3.15s' },
  { ic: 'review', c: '#7c3aed', sx: 40, sy: 290, dur: '4s', cd: '-3.6s' },
];

const LEARN_H = 'First, we learn your business.';
const LEARN_P = 'We learn how you actually work: what you charge, which jobs you take, where you go, and how you talk to a customer. That becomes the playbook everything runs on, so when we answer, it sounds like you, not a call center.';

type Stop = {
  id: string; n: string; label: string; promise: string; voice: string; accent: string; accentD: string;
  side: 'left' | 'right'; surface: 'getfound' | 'staybookt' | 'enjoy'; beat: string; result: string; steps: { t: string; b: string }[];
};
const STOPS: Stop[] = [
  {
    id: 'found', n: '1', label: 'Get found', promise: 'Impossible to miss.', voice: 'Finally. The phone is ringing again.',
    accent: '#0ea5e9', accentD: '#0284c7', side: 'left', surface: 'getfound',
    /* "analyze your numbers" was Pulse residue. We are not the bookkeeper and there is no
       analytics product described anywhere else on this site, so it promised a service
       that does not exist.

       "Inbox full, texts flowing, phone ringing" is a promised volume of leads, which our
       own FAQ calls guessing: "Do you promise me a number of leads? No, and anyone who does
       is guessing." The result is the mechanism now. We can promise to make you findable.
       We cannot promise a full inbox. */
    beat: 'We build your site, fix your Google listing, and get you found on search, the map, and AI recommendations.',
    result: 'Found on search, the map, and AI answers.',
    steps: [
      { t: 'We build you a proper website.', b: 'Fast, mobile, built to turn a visitor into a call.' },
      { t: 'We fix your Google listing.', b: 'Filled out, kept current, and trusted by Google.' },
      { t: 'We get you ranked, and recommended.', b: 'You climb the map, and show up when someone asks an AI for what you do nearby.' },
      { t: 'We ask for the review.', b: 'Right when the job is fresh, the only time people say yes.' },
    ],
  },
  {
    id: 'run', n: '2', label: 'StayBookt', promise: 'Every lead gets worked.', voice: 'It is 2 a.m. I am asleep. It is handled.',
    accent: '#10b981', accentD: '#059669', side: 'right', surface: 'staybookt',
    beat: 'We catch the missed call, book the job, chase the quote, win the review, and rebook the second job.',
    result: 'Nothing gets dropped, and every customer is worked to full value.',
    steps: [
      { t: 'We answer every call and text.', b: 'Day or night, in your voice. A real person steps in on anything unusual.' },
      { t: 'We book, confirm, and remind.', b: 'Straight onto your calendar, so they actually show up.' },
      { t: 'We chase what is owed.', b: 'Every quote followed up, every unpaid invoice chased, until the money lands.' },
      { t: 'We grow every customer.', b: 'Reviews, referrals, the right upsell, repeat work booked before they drift.' },
      { t: 'We hand you one short brief a day.', b: 'What is booked, what needs you, what came in. Thirty seconds.' },
    ],
  },
  {
    id: 'free', n: '3', label: 'Enjoy life', promise: 'You choose.', voice: 'I could actually sell this. Or not. My call.',
    accent: '#7c3aed', accentD: '#6d28d9', side: 'left', surface: 'enjoy',
    /* This milestone used to end in a valuation, because a valuation was how we
     * justified taking 20% of the increase in value. That fee is dead (Richard,
     * July 14 2026), so the valuation framing goes with it. Enjoy Life is now
     * purely the outcome: a business that runs without you, and no cut taken. */
    /* The banned phrase survived HERE, on the beat, which is the line that renders large,
       while the fix landed on the step below. Check the line that ships, not the nearest one. */
    beat: 'After a year, the business books and earns whether you are standing in the middle of it or not. What you do with that is your call. Most owners just want the good half of the job back.',
    result: 'Do the part you love, hand it to family, or sell it.',
    steps: [
      /* "runs without you" is banned language (see app/layout.tsx) and it survived here.
         The whole control-preserving voice is "You run the business. We run the busywork"
         and "we take the busywork, not the business". This one line sidelined the owner. */
      { t: 'We build something that keeps running when you step away.', b: 'The phone answered, jobs booked, money landing without you standing there.' },
      { t: 'The work gets steady, not seasonal.', b: 'Recurring jobs and repeat customers, so the year never restarts at zero.' },
      { t: 'You are the one deciding.', b: 'Keep it, hand it to family, or sell. You never have to.' },
      { t: 'And we take no cut of it.', b: 'No commission, no revenue share, no share of the sale. The monthly fee is the whole deal.' },
    ],
  },
];

const FAQ: { k: string; c: string; q: string; a: string }[] = [
  { k: 'The service', c: '#0ea5e9', q: 'How does it know how to talk about my business?', a: 'That is what the first couple of weeks are for. We learn your prices, your service area, the jobs you take, and how you talk to a customer. Everything after that runs on your playbook, not a generic script.' },
  { k: 'The service', c: '#0ea5e9', q: 'What if I already have a website?', a: 'We will look at it. If it is doing the job, we build around it. If it is holding you back, we replace it. You are not stuck with something that never brings you a call.' },
  { k: 'The service', c: '#0ea5e9', q: 'How does my phone actually get answered?', a: 'Your number stays your number, and nothing changes for the people who call it. You forward your existing line to us, which takes about five minutes with your carrier and which you can undo yourself at any time. We never take control of your number and we never make you move it. If you would rather we did not touch the phone at all and only handled texts, web forms and Google messages, we can do that too, and we will tell you honestly what you are giving up.' },
  { k: 'The service', c: '#0ea5e9', q: 'How long until I am live?', a: 'About 30 days from the first call.' },
  /* This used to be "What is the valuation at the end?", and it described valuing
   * the business after year one. That only ever existed to justify the 20% value
   * share, which is dead (Richard, July 14 2026). It was the last surviving piece
   * of the fee anywhere on a live page. The honest question a reader actually has
   * now is the opposite one, so we answer that instead. */
];

const CSS = `
.hiw{background:#fff;color:var(--v4-ink);}
.hiw .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.hiw .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.hiw h1,.hiw h2,.hiw h3,.hiw h4{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.hiw-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 30px;text-decoration:none;transition:transform .3s ease;}
.hiw-btn:hover{transform:translateY(-1px);}
.hiw-btn.ghost{background:transparent;color:var(--v4-ink);border:1px solid rgba(0,0,0,.18);}

/* HERO. Everything else is .pg-hero in globals.css. No buttons: the nav carries
   Get Started, and the ask belongs at the arrival, not before the story starts.
   The Scroll cue went with the full-height still. It existed because an 88vh
   motionless photograph gave a visitor nothing to react to. A 190px header is
   plainly a header with a page under it.
   Cyan: this page opens on Get Found and is the mechanism of being found. */
.pg-hero{--hero-hue:6,182,212;}

/* LIGHT HERO — match the homepage (Jul 23 2026). The shared .pg-hero is dark; here we flip it
   to the cream light hero: gradient-border eyebrow pill, two-stage animated headline, a subhead,
   and a supporting graphic — the front office running and getting handled, which is exactly what
   the headline promises. .hiw .pg-hero (0,2,0) beats the global .pg-hero (0,1,0). Nav is solidTop. */
.hiw .pg-hero{background:var(--v4-cream);color:var(--v4-ink);min-height:auto;padding:clamp(102px,13vh,150px) 0 clamp(46px,7vw,84px);text-align:center;}
.hiw .pg-hero::before{display:none;}
.hiw .pg-hero .wrap{max-width:1120px;}
.hiw .pg-hero .wrap .eyebrow{display:inline-block;color:#42474f;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad) border-box;border-radius:999px;padding:9px 18px;box-shadow:0 6px 18px -10px rgba(6,12,20,.25);}
.hiw .pg-hero .wrap h1{margin:22px auto 0;max-width:none;font-size:clamp(20px,6.4vw,84px);line-height:1.02;letter-spacing:-.03em;text-align:center;color:var(--v4-ink);}
.hiw .pg-hero .wrap h1 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.hiw .pg-hero .wrap h1 .pd{color:var(--v4-violet);-webkit-text-fill-color:var(--v4-violet);}
.hiw .pg-hero .hero-h1 .hl1,.hiw .pg-hero .hero-h1 .hl2{display:block;white-space:nowrap;}
/* SUBHEAD = ONE LINE, ALWAYS (global rule). No max-width, nowrap, vw-scaled font. */
.hiw .pg-hero .wrap p.sub{margin:22px auto 0;max-width:none;white-space:nowrap;font-size:clamp(13px,3.1vw,21px);line-height:1.4;color:#52565e;text-align:center;}

/* ===== THE ENGINE (Jacob, Jul 24 2026 — bigger, bolder, cinematic). The front office as a
   reactor: recognizable work streams in from every edge as glowing tiles, dissolves into a big
   glowing StayBookt core (hot white seed, rotating sheen, rotating brand-gradient halo, breathing
   light field), and shockwave rings pulse back out = handled. Fixed 760x480 stage, scaled to fit. ===== */
.hiw .eng-wrap{--sc:1;position:relative;width:calc(760px*var(--sc));height:calc(480px*var(--sc));margin:clamp(20px,3.5vw,44px) auto 0;}
@media(max-width:840px){.hiw .eng-wrap{--sc:.8;}}
@media(max-width:560px){.hiw .eng-wrap{--sc:.6;}}
@media(max-width:400px){.hiw .eng-wrap{--sc:.48;}}
.hiw .engine{position:absolute;top:0;left:0;width:760px;height:480px;transform:scale(var(--sc));transform-origin:top left;overflow:hidden;}
/* the light field the reactor sits in */
.hiw .engine .field{position:absolute;left:50%;top:50%;width:720px;height:460px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle at 50% 50%,rgba(16,185,129,.24),rgba(79,70,229,.18) 40%,transparent 66%);filter:blur(4px);}
/* shockwave rings that pulse outward = handled, dispatched */
.hiw .engine .ring{position:absolute;left:50%;top:50%;width:140px;height:140px;transform:translate(-50%,-50%);border-radius:40px;border:2px solid rgba(16,185,129,.5);opacity:0;}
/* rotating brand-gradient halo ring around the core */
.hiw .engine .halo{position:absolute;left:50%;top:50%;width:224px;height:224px;transform:translate(-50%,-50%);border-radius:60px;background:conic-gradient(from 0deg,#06b6d4,#10b981,#4f46e5,#7c3aed,#06b6d4);-webkit-mask:radial-gradient(transparent 60%,#000 63%);mask:radial-gradient(transparent 60%,#000 63%);opacity:.5;}
/* the core */
.hiw .engine .core{position:absolute;left:50%;top:50%;width:140px;height:140px;transform:translate(-50%,-50%);border-radius:34px;background:linear-gradient(135deg,#06b6d4,#10b981 44%,#4f46e5 76%,#7c3aed);box-shadow:0 0 70px -2px rgba(16,185,129,.7),0 0 150px 0 rgba(79,70,229,.55),inset 0 3px 10px rgba(255,255,255,.45);overflow:hidden;}
.hiw .engine .core .sheen{position:absolute;inset:-45%;background:conic-gradient(from 0deg,rgba(255,255,255,0) 0deg,rgba(255,255,255,.6) 40deg,rgba(255,255,255,0) 120deg);}
.hiw .engine .core .seed{position:absolute;left:50%;top:50%;width:30px;height:30px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,#fff,rgba(255,255,255,.82));box-shadow:0 0 28px 6px rgba(255,255,255,.85);}
/* incoming work: glowing recognizable tiles that fly in and dissolve into the core */
.hiw .engine .chip{position:absolute;left:50%;top:50%;margin:-26px 0 0 -26px;width:52px;height:52px;border-radius:15px;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 12px 26px -8px rgba(6,12,20,.45),0 0 24px -4px var(--tc,rgba(6,12,20,.3));opacity:0;}
.hiw .engine .chip svg{width:26px;height:26px;}

@media(prefers-reduced-motion:no-preference){
  .hiw .pg-hero .hero-h1 .hl1,.hiw .pg-hero .hero-h1 .hl2{opacity:0;filter:blur(10px);transform:translateY(18px);}
  .hiw .pg-hero .hero-h1 .hl1{animation:hiwHeroIn .9s cubic-bezier(.16,1,.3,1) .15s forwards;}
  .hiw .pg-hero .hero-h1 .hl2{animation:hiwHeroIn 1s cubic-bezier(.16,1,.3,1) .8s forwards;}
  .hiw .pg-hero .wrap p.sub{opacity:0;filter:blur(6px);transform:translateY(12px);animation:hiwHeroIn .85s cubic-bezier(.16,1,.3,1) 1.3s forwards;}
  .hiw .engine .field{animation:engBreathe 4.5s ease-in-out infinite;}
  .hiw .engine .halo{animation:engSpinC 14s linear infinite;}
  .hiw .engine .core{animation:engPulse 4.5s ease-in-out infinite;}
  .hiw .engine .core .sheen{animation:engSpin 6s linear infinite;}
  .hiw .engine .ring{animation:engRing 3.6s ease-out infinite;}
  .hiw .engine .ring.r2{animation-delay:-1.2s;}
  .hiw .engine .ring.r3{animation-delay:-2.4s;}
  .hiw .engine .chip{animation:engChip var(--dur,3.8s) cubic-bezier(.4,0,.5,1) var(--cd,0s) infinite;}
}
@keyframes hiwHeroIn{to{opacity:1;filter:blur(0);transform:none;}}
@keyframes engChip{0%{transform:translate(var(--sx),var(--sy)) scale(1.06);opacity:0;}12%{opacity:1;}64%{opacity:1;}86%{transform:translate(0,0) scale(.2);opacity:0;}100%{transform:translate(0,0) scale(.2);opacity:0;}}
@keyframes engRing{0%{transform:translate(-50%,-50%) scale(1);opacity:.55;}70%{opacity:0;}100%{transform:translate(-50%,-50%) scale(3.1);opacity:0;}}
@keyframes engPulse{0%,100%{box-shadow:0 0 70px -2px rgba(16,185,129,.7),0 0 150px 0 rgba(79,70,229,.55),inset 0 3px 10px rgba(255,255,255,.45);}50%{box-shadow:0 0 104px 6px rgba(16,185,129,.85),0 0 210px 12px rgba(79,70,229,.7),inset 0 3px 10px rgba(255,255,255,.5);}}
@keyframes engBreathe{0%,100%{opacity:.85;transform:translate(-50%,-50%) scale(1);}50%{opacity:1;transform:translate(-50%,-50%) scale(1.09);}}
@keyframes engSpin{to{transform:rotate(360deg);}}
@keyframes engSpinC{from{transform:translate(-50%,-50%) rotate(0);}to{transform:translate(-50%,-50%) rotate(360deg);}}

/* learn */
.hiw-learn{padding:clamp(80px,11vw,140px) 0;background:var(--v4-cream);}
.hiw-learn .lhead{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,5vw,64px);align-items:end;}
.hiw-learn h2{font-size:clamp(32px,4.6vw,60px);line-height:1.02;max-width:12ch;}
.hiw-learn p{font-size:clamp(16px,1.8vw,19px);line-height:1.55;color:#52565e;max-width:46ch;}
@media(max-width:820px){.hiw-learn .lhead{grid-template-columns:1fr;gap:20px;align-items:start;}.hiw-learn h2{max-width:18ch;}}

/* ===== JOURNEY MAP (weaving SVG trail, warming arc) ===== */
.hiw-jrny{padding:clamp(56px,7vw,96px) 0 clamp(70px,9vw,120px);background:linear-gradient(180deg,#f6f8fb 0%,#f9faf7 42%,#f4f1fb 100%);}
.hiw-jrny .jhead{text-align:center;max-width:640px;margin:0 auto clamp(30px,4vw,52px);}
.hiw-jrny .jhead h2{font-size:clamp(30px,4.4vw,54px);line-height:1.05;margin-top:14px;}
.hiw-jrny .jhead p{margin-top:16px;font-size:clamp(16px,1.8vw,19px);color:#69707d;line-height:1.5;}
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
.jend .edot{width:20px;height:20px;border-radius:50%;background:#7c3aed;position:relative;z-index:2;box-shadow:0 0 0 6px rgba(124,58,237,.16);}
.jstart .st{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#69707d;}
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
.jstop .beat{margin-top:16px;font-size:clamp(15px,1.6vw,17px);line-height:1.5;color:#69707d;max-width:48ch;}
.jstop .result{display:inline-block;margin-top:16px;font-size:14.5px;font-weight:600;color:var(--acd);}
/* display:flex (not inline-flex) + fit-content so the pill drops onto its own line
   instead of running along beside .result, which is inline-block. */
.jstop .jgo{display:flex;width:fit-content;align-items:center;gap:8px;margin-top:16px;padding:9px 16px;
  border:1px solid rgba(6,12,20,.14);border-radius:999px;background:#fff;
  font-size:14px;font-weight:600;color:var(--v4-ink,#06080d);text-decoration:none;
  transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;}
.jstop .jgo span{color:var(--acd);transition:transform .25s ease;}
.jstop .jgo:hover{border-color:var(--acd);transform:translateY(-1px);box-shadow:0 12px 26px -18px rgba(6,12,20,.5);}
.jstop .jgo:hover span{transform:translateX(3px);}
.jstop .stage{position:relative;margin:30px 0 6px;display:flex;justify-content:flex-start;}
.jstop.right .stage{justify-content:flex-end;}
.jstop.right .body{text-align:right;}
.jstop.right .voice,.jstop.right .beat{margin-left:auto;}
.jstop.right .steps ol{margin-left:auto;}
.jstop .stage::before{content:'';position:absolute;inset:-8% -6% 2% -6%;background:radial-gradient(50% 55% at 42% 45%,color-mix(in srgb,var(--acc) 20%,transparent),transparent 72%);filter:blur(40px);z-index:0;}
.jstop .stage>*{position:relative;z-index:1;}
.jstop .detail{margin-top:26px;}
.jstop.right .detail{display:flex;flex-direction:column;align-items:flex-end;}
/* Steps are always visible now (Richard, Jul 23 2026): the "See exactly how we do it"
   toggle is gone. Hiding the mechanism behind a click was the opposite of what this
   page is for. A small label heads the list instead of a button. */
.jstop .steps-h{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--acd);margin-bottom:2px;}
.jstop .steps{overflow:hidden;margin-top:16px;}
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

.jfine{margin:clamp(34px,4vw,48px) auto 0;text-align:center;font-size:12.5px;line-height:1.5;color:#9aa0a8;max-width:56ch;}

/* corner mini-map HUD */
.jhud{position:fixed;right:22px;bottom:22px;z-index:30;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border:1px solid #ececf0;border-radius:16px;padding:14px 16px 14px 14px;box-shadow:0 20px 50px -24px rgba(6,12,20,.4);display:flex;gap:12px;align-items:stretch;opacity:0;transform:translateY(10px);transition:opacity .4s ease,transform .4s ease;pointer-events:none;}
.jhud.show{opacity:1;transform:none;}
.jhud .track{position:relative;width:4px;border-radius:2px;background:#e6e8ec;}
.jhud .track i{position:absolute;left:0;top:0;width:4px;border-radius:2px;height:calc(var(--p,0)*100%);background:linear-gradient(180deg,#0ea5e9,#10b981 55%,#7c3aed);}
.jhud .track .dot{position:absolute;left:-4px;top:calc(var(--p,0)*100%);width:12px;height:12px;border-radius:50%;background:#fff;border:2px solid var(--v4-ink);transform:translateY(-50%);box-shadow:0 2px 6px rgba(0,0,0,.25);}
.jhud .labs{display:flex;flex-direction:column;justify-content:space-between;font-size:11px;font-weight:600;}
.jhud .labs span{color:#69707d;transition:color .3s;}
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
.gf .srow .rt{margin-left:auto;font-size:12px;color:#69707d;white-space:nowrap;}
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
.gf .chip{font-size:11.5px;font-weight:600;color:#047857;background:rgba(16,185,129,.12);border-radius:999px;padding:6px 12px;opacity:0;transform:translateY(6px);transition:opacity .5s ease,transform .5s ease;}
.gf.on .chip{opacity:1;transform:none;}
.gf.on .chip:nth-child(1){transition-delay:1.1s;}.gf.on .chip:nth-child(2){transition-delay:1.25s;}

/* ===== SCENE: Enjoy Life (valuation) ===== */
.el{width:min(520px,100%);}
.el .valcard{background:#0b0f14;color:#fff;border-radius:20px;padding:26px 26px 24px;box-shadow:0 50px 100px -44px rgba(0,0,0,.6);text-align:left;}
.el .valcard .k{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9aa0ab;}
/* .num, .meterlab and .meter are gone with the invented $420,000 valuation and the
   invented "12 hrs back" meter. The card now says a true thing instead of a
   fabricated number. Do not reintroduce a figure here. */
.el .valcard .hd{margin-top:10px;font-size:clamp(20px,2.4vw,27px);font-weight:600;letter-spacing:-.025em;line-height:1.25;color:#fff;}
.el .valcard .ns{margin-top:12px;font-size:13.5px;line-height:1.6;color:#9aa0ab;}
.el .choices{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px;}
/* ALL THREE ARE FULL CARDS NOW. The description used to be collapsed to max-height:0 until a
   card was hovered or selected, so at rest two of the three showed only an icon and a one-line
   label — they read as small and half-empty, which is what Emma flagged (p9). The copy is
   always visible now, so the three are equal, complete cards; hover/selection just lifts and
   accents the one you are on. Bigger icon and padding to match. */
.el .choice{display:flex;flex-direction:column;background:#fff;border:1px solid #ececf0;border-radius:16px;padding:18px 16px 16px;text-align:left;cursor:pointer;font-family:inherit;transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;}
.el .choice:hover,.el .choice.on{border-color:#7c3aed;transform:translateY(-3px);box-shadow:0 18px 34px -18px rgba(124,58,237,.4);}
.el .choice .ci{width:36px;height:36px;border-radius:10px;background:rgba(124,58,237,.12);display:flex;align-items:center;justify-content:center;color:#6d28d9;}
.el .choice .cl{margin-top:13px;font-size:16px;font-weight:600;color:var(--v4-ink);}
.el .choice .cd{margin-top:8px;font-size:12.5px;line-height:1.45;color:#69707d;}
@media(max-width:520px){.el .choices{grid-template-columns:1fr;}}

/* ===== FAQ — two columns, sticky ask on the left, cards on the right ===== */
.hiw-faq{padding:clamp(90px,12vw,150px) 0;background:var(--v4-cream);}
.hiw-faq .fgrid{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(32px,6vw,84px);align-items:start;}
@media(max-width:900px){.hiw-faq .fgrid{grid-template-columns:1fr;gap:36px;}}
.hiw-faq .faside{position:sticky;top:clamp(96px,12vh,130px);}
@media(max-width:900px){.hiw-faq .faside{position:static;}}
.hiw-faq h2{font-size:clamp(34px,4.6vw,60px);line-height:1.0;margin:14px 0 0;max-width:9ch;}
.hiw-faq h2 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.hiw-faq .fa-p{margin-top:20px;font-size:16.5px;line-height:1.6;color:#69707d;max-width:30ch;}
.hiw-faq .fa-cta{display:inline-flex;align-items:center;gap:9px;margin-top:26px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 28px;text-decoration:none;transition:gap .3s ease,transform .3s ease;}
.hiw-faq .fa-cta:hover{gap:14px;transform:translateY(-1px);}
.hiw-faq .fa-links{display:flex;flex-direction:column;gap:10px;margin-top:26px;}
.hiw-faq .fa-links a{font-size:14.5px;font-weight:600;color:#0369a1;text-decoration:none;width:fit-content;border-bottom:1px solid transparent;transition:border-color .25s ease;}
.hiw-faq .fa-links a:hover{border-color:#0369a1;}

.hiw-faq .list{display:flex;flex-direction:column;gap:8px;}
.hiw-q{--fc:#0ea5e9;position:relative;background:transparent;border:1px solid transparent;border-radius:18px;transition:background .35s ease,border-color .35s ease,box-shadow .35s ease,transform .35s ease;}
.hiw-q::after{content:'';position:absolute;left:clamp(16px,2vw,22px);right:clamp(16px,2vw,22px);bottom:0;height:1px;background:#e2e2dc;transition:opacity .3s ease;}
.hiw-q:last-child::after{opacity:0;}
.hiw-q:hover{background:rgba(255,255,255,.6);}
.hiw-q.open{background:#fff;border-color:#ececeb;box-shadow:0 26px 54px -34px rgba(6,12,20,.4);transform:translateY(-1px);}
.hiw-q.open::after{opacity:0;}
.hiw-q button{width:100%;display:grid;grid-template-columns:minmax(0,1fr) 34px;gap:16px;align-items:center;background:transparent;border:0;color:var(--v4-ink);font-family:inherit;text-align:left;padding:clamp(20px,2.4vw,26px) clamp(16px,2vw,22px);cursor:pointer;}
.hiw-q .fk{display:block;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--fc);opacity:.85;}
.hiw-q .fq{display:block;margin-top:7px;font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;line-height:1.28;}
.hiw-q .pl{width:34px;height:34px;border-radius:50%;border:1px solid #dcdcd8;color:#8a8f98;display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:300;line-height:1;transition:transform .4s cubic-bezier(.16,1,.3,1),background .35s ease,color .35s ease,border-color .35s ease;}
.hiw-q:hover .pl{border-color:var(--fc);color:var(--fc);}
.hiw-q.open .pl{transform:rotate(45deg);background:var(--fc);border-color:transparent;color:#fff;box-shadow:0 8px 20px -8px var(--fc);}
.hiw-q .ans{max-height:0;overflow:hidden;transition:max-height .45s cubic-bezier(.16,1,.3,1);}
.hiw-q.open .ans{max-height:420px;}
.hiw-q .ans p{margin:0 clamp(16px,2vw,22px) clamp(22px,2.4vw,26px);padding-left:16px;border-left:2px solid var(--fc);font-size:16.5px;line-height:1.62;color:#52565e;max-width:60ch;}
@media(prefers-reduced-motion:reduce){.hiw-q,.hiw-q .pl,.hiw-q .ans{transition:none;}}
`;

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
          <span className="q">plumber near me</span>
        </div>
        <div className="gflist">
          <div className="srow r1"><span className="pin" /><span className="nm">City Wide Plumbing</span><span className="rt">&#9733; 4.1</span></div>
          <div className="srow r2"><span className="pin" /><span className="nm">Drain &amp; Sons</span><span className="rt">&#9733; 3.8</span></div>
          <div className="srow r3"><span className="pin" /><span className="nm">Rapid Rooter</span><span className="rt">&#9733; 4.0</span></div>
          <div className="srow tc"><span className="badge">#1</span><span className="pin" /><span className="nm">Redwater Plumbing</span><span className="rt">&#9733; 4.9 &middot; Open now</span></div>
        </div>
      </div>
      <div className="ai">
        <div className="k">Asked an AI assistant</div>
        <div className="q2">&ldquo;Who is a good plumber near me?&rdquo;</div>
        <div className="a2">Redwater Plumbing. 4.9 stars, open now, and one tap to call.</div>
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
  /* THE INVENTED VALUATION IS GONE (July 14 2026). This used to animate a counter
   * up to $420,000 and label it "Your business, valued", next to a "Time back in
   * your week: 12 hrs" meter. Both numbers were made up, and they were rendered as
   * though they were data.
   *
   * On a site whose entire position is that we never fake proof and never promise a
   * number, that was the single most dishonest object we shipped. It was also
   * residue from the 20% value share, which is dead: we do not value the customer's
   * business, because we do not take a cut of it.
   *
   * Do not put a number back in this card. */
  const [choice, setChoice] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) el.classList.add('on'); }),
      { threshold: 0.45 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const CH = [
    { l: 'Keep it, and love it', d: 'Go back to the part of the work you actually enjoy. Most owners pick this one.', icon: 'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z' },
    { l: 'Hand it off', d: 'Pass over an operation that already works, instead of a job only you know how to do.', icon: 'M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6' },
    { l: 'Sell it', d: 'A business that keeps booking when you are not there is one a buyer actually wants.', icon: 'M12 3v18M5 10l7-7 7 7' },
  ];
  return (
    <div className="el" ref={ref} style={{ '--m': '78%' } as CSSProperties}>
      <div className="valcard">
        <div className="k">After a year of this</div>
        <div className="hd">The business keeps booking and earning when you are not standing in the middle of it.</div>
        <div className="ns">
          What you do with that is entirely your call, and it costs you nothing. We take no
          commission on your jobs, no share of your revenue, and no share of what the business is
          worth if you ever sell it.
        </div>
      </div>
      <div className="choices">
        {CH.map((c, i) => (
          <button key={c.l} type="button" className={`choice${choice === i ? ' on' : ''}`} onMouseEnter={() => setChoice(i)} onClick={() => setChoice(i)}>
            <span className="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={c.icon} /></svg></span>
            <div className="cl">{c.l}</div>
            <div className="cd">{c.d}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StopBlock({ s, obsRef, pointRef }: { s: Stop; obsRef: (el: HTMLDivElement | null) => void; pointRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div className={`jstop ${s.side}`} id={s.id} ref={obsRef} style={{ '--acc': s.accent, '--acd': s.accentD } as CSSProperties}>
      <div className="node" ref={pointRef}>{s.n}</div>
      <div className="body">
        <div className="plabel">Milestone {s.n} &middot; {s.label}</div>
        <div className="promise">{s.promise}</div>
        <div className="voice">&ldquo;{s.voice}&rdquo;</div>
        <div className="beat">{s.beat}</div>
        <div className="result">&rarr; {s.result}</div>
        {/* Milestone 3 is the only one whose payoff needs an argument behind it, and the
            argument is a whole page (/long-term, formerly /enjoy-life). This scene is the
            feeling; the page is the reasoning. Do not paste the page's argument in here. */}
        {s.id === 'free' && (
          <a className="jgo" href="/long-term">What it is worth later <span>&rarr;</span></a>
        )}

        <div className="stage">
          {s.surface === 'getfound' && <GetFoundScene />}
          {s.surface === 'staybookt' && <NightShift />}
          {s.surface === 'enjoy' && <EnjoyLifeScene />}
        </div>

        <div className="detail open">
          <div className="steps-h">How we do it</div>
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
      /* UX audit (Emma Beatty p8): the old S-curve put both control points at the
         vertical midpoint, which swung the line across the centre of each milestone
         and cut straight through the body text (worst on Milestone 3). Instead, hold
         the source node's x down through its content, then hook across to the next
         node only near the bottom of the segment. The line now runs beside the text
         in the gutter rather than through it. */
      const corner = Math.min(Math.max((b.y - a.y) * 0.45, 40), 130);
      d += ` C ${a.x.toFixed(1)} ${(b.y - corner).toFixed(1)}, ${a.x.toFixed(1)} ${b.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
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
    /* DAMPED, NOT DIRECT. Same treatment as the two pinned films (JourneyMap, RemovalTest),
       for the same reason: this trail was drawn straight from scroll position once per frame,
       so a phone flick drew the whole three-milestone path in one gesture and the trail read
       as a static line rather than something the reader was pulling along. Scroll now sets a
       TARGET and the rendered progress eases toward it at K per frame, so the dot keeps
       travelling after the thumb leaves the glass.
       K = 0.12, the same constant as the films, so the whole site moves at one rate and it
       still composes with ArrowScroll's 0.2 scroll easing instead of double-easing into mush.
       NO SNAP MARKERS HERE. This is not a pinned beat track: it is an ordinary section that
       scrolls past, with no beat boundaries to settle on, and snap points on a page people
       are reading straight through would fight them. Snap belongs only to the film tracks.
       The loop runs only while it is moving, then STOPS. Idle costs nothing. */
    const K = 0.12;
    let raf = 0;
    let running = false;
    let cur = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setHudOn(r.top < vh * 0.5 && r.bottom > vh * 0.4);
      return Math.min(Math.max((vh * 0.55 - r.top) / r.height, 0), 1);
    };
    const draw = (p: number) => {
      pRef.current = p;
      root.style.setProperty('--p', String(p));
      apply(p);
    };
    const tick = () => {
      const t = measure();
      const d = t - cur;
      /* 0.0004 of the trail is well under a pixel: settled, so stop the loop. */
      if (Math.abs(d) < 0.0004) {
        cur = t;
        draw(cur);
        running = false;
        return;
      }
      cur += d * K;
      draw(cur);
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    /* First paint is exact, never eased: a reload halfway down must not swoop. */
    cur = measure();
    draw(cur);
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
      <style>{min(CSS)}</style>

      {/* HUD */}
      <div className={`jhud${hudOn ? ' show' : ''}`} aria-hidden="true">
        <div className="track"><i /><span className="dot" /></div>
        <div className="labs">
          {STOPS.map((s, i) => <span key={s.id} className={active >= i ? 'on' : ''}>{s.label}</span>)}
        </div>
      </div>

      {/* HERO — light, homepage-style (Jul 23 2026). Two-stage headline fade, then a gradient
          path draws itself with three nodes, previewing the journey the full map details below.
          No subhead, no buttons: the nav carries Get Started, the ask belongs at the arrival. */}
      <header className="pg-hero hiw-hero">
        <div className="wrap">
          <div className="eyebrow">How it works</div>
          <h1 className="hero-h1">
            <span className="hl1">{HERO_H_A}</span>
            <span className="hl2"><span className="g">{HERO_H_B}</span><span className="pd">.</span></span>
          </h1>
          <p className="sub">Every call, answered. Every job, booked.</p>
          <div className="eng-wrap" aria-hidden="true">
            <div className="engine">
              <div className="field" />
              <div className="ring r1" />
              <div className="ring r2" />
              <div className="ring r3" />
              <div className="halo" />
              <div className="core"><span className="sheen" /><span className="seed" /></div>
              {CHIPS.map((ch, i) => (
                <div
                  className="chip"
                  key={i}
                  style={{ backgroundColor: ch.c, ['--tc' as string]: ch.c, ['--sx' as string]: `${ch.sx}px`, ['--sy' as string]: `${ch.sy}px`, ['--dur' as string]: ch.dur, ['--cd' as string]: ch.cd } as CSSProperties}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={OFC_ICON[ch.ic]} /></svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* LEARN — the account brain */}
      <section className="hiw-learn" id="learn">
        <div className="wrap">
          <div className="lhead">
            <div>
              <div className="eyebrow">Before we start</div>
              <h2 style={{ marginTop: 14 }}>{LEARN_H}</h2>
            </div>
            <p>{LEARN_P}</p>
          </div>
          <AccountBrain />
        </div>
      </section>

      {/* THE JOURNEY MAP */}
      <section className="hiw-jrny">
        <div className="wrap">
          <div className="jhead">
            <div className="eyebrow">The three milestones</div>
            <h2>Follow the path.</h2>
            <p>Every customer, and your whole business, travels this route.</p>
          </div>
          <div className="jmap" ref={mapRef}>
            <svg className="jsvg" ref={svgRef} preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="jgrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0ea5e9" />
                  <stop offset="0.55" stopColor="#10b981" />
                  <stop offset="1" stopColor="#7c3aed" />
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
                  obsRef={(el) => { stopEls.current[s.id] = el; }}
                  pointRef={(el) => { pts.current[s.id] = el; }}
                />
              ))}

              <div className="jend">
                <span className="edot" ref={(el) => { pts.current.end = el; }} />
                <div className="eh">Twelve months later.</div>
              </div>
            </div>
          </div>

          {/* The illustration footnote is gone (Jacob, July 2026; Richard asked twice).
              Promise 05 was amended in the same commit, because that promise was the thing
              this line made true. See the longer note in app/page.tsx.
              The rule that survives: we illustrate what the service DOES, never what it
              ACHIEVED. No invented results on this page, footnote or no footnote. */}
        </div>
      </section>

      {/* THE ARRIVAL — the pinnacle of the journey, and where the CTA lives.
          One peak, one button. */}
      <Arrival />

      {/* FAQ — the last word. */}
      <section className="hiw-faq">
        <div className="wrap">
          <div className="fgrid">
            <div className="faside">
              <div className="eyebrow">FAQ</div>
              <h2>
                Questions, <span className="g">answered</span><span className="pd">.</span>
              </h2>
              <p className="fa-p">
                How the thing actually runs, in plain English. What it costs, what you own, and
                what we do not do all live on the <a href="/pricing">pricing page</a>.
              </p>
              <a className="fa-cta" href={START_LINK} data-cta="faq_how_it_works">
                Ask a founder directly <span aria-hidden>&rarr;</span>
              </a>
              <div className="fa-links">
                <a href="/pricing">See the pricing</a>
              </div>
            </div>

            <div className="list">
              {FAQ.map((f, i) => (
                <div
                  key={f.q}
                  className={`hiw-q${openF === i ? ' open' : ''}`}
                  style={{ '--fc': f.c } as CSSProperties}
                >
                  <button
                    type="button"
                    onClick={() => {
                      /* Only the opening counts. Which objections people actually
                         have is the question; closing one answers nothing. */
                      if (openF !== i) track('faq_open', { question: f.q, faq: 'how_it_works' });
                      setOpenF(openF === i ? null : i);
                    }}
                  >
                    <span>
                      <span className="fk">{f.k}</span>
                      <span className="fq">{f.q}</span>
                    </span>
                    <span className="pl" aria-hidden>+</span>
                  </button>
                  <div className="ans"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

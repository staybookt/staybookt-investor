'use client';

import { useEffect, useState, type ReactNode, type CSSProperties } from 'react';
import { START_LINK } from '@/lib/site';

const HERO_H = 'You run the business. We run the busywork.';
const HERO_SUB = 'It happens in three moves. We get you found, we run the day to day, and you get your life back. Here is exactly how each one works.';

// hero journey (mirrors the homepage: Get Found -> StayBookt -> Enjoy Life)
const JOURNEY: { k: string; t: string; s: string; c: string }[] = [
  { k: 'Phase one', t: 'Get Found', s: 'Be the one they call', c: '#0ea5e9' },
  { k: 'Phase two', t: 'StayBookt', s: 'We run the busywork', c: '#10b981' },
  { k: 'Phase three', t: 'Enjoy Life', s: 'Get your life back', c: '#f59e0b' },
];

const LEARN_H = 'First, we learn your business.';
const LEARN_P = 'Before any of it goes live, we sit down and learn how you actually work. What you charge. Which jobs you take and which you pass on. Your service area. How you talk to a customer. That becomes the playbook everything else runs on, so when we answer, it sounds like you, not a call center.';
const LEARN_ROWS = ['What you charge, job by job', 'The jobs you take and the ones you pass', 'Your service area and your hours', 'How you talk to a customer'];

type Phase = { id: string; label: string; promise: string; means: string; offer: string; accent: string; viz: 'map' | 'reception' | 'repeat'; rev?: boolean; steps: { t: string; b: string }[] };
const PHASES: Phase[] = [
  {
    id: 'found', label: 'Phase one · Get found', promise: 'Be the one they call.', accent: '#0ea5e9', viz: 'map',
    means: 'When someone nearby needs your trade, you are the name they find first, and the one they call. Not the other guy down the road.',
    offer: 'Part of your monthly plan',
    steps: [
      { t: 'We build you a proper website.', b: 'Fast, works on a phone, and made to turn a visitor into a call. Built and hosted for you, nothing to manage.' },
      { t: 'We fix your Google listing.', b: 'The thing that pops up when someone searches your trade. We fill it out, keep it current, and get Google to trust it.' },
      { t: 'We get you ranked locally.', b: 'Your name, address, and number match everywhere online. That is what pushes you up the map results, above the competition.' },
      { t: 'We build your reviews.', b: 'Every finished job becomes a five-star review. More reviews means you climb higher and get picked more often.' },
      { t: 'We make it one tap to reach you.', b: 'Every page has a big call button and a way to book on the spot, so a ready customer never slips away.' },
    ],
  },
  {
    id: 'run', label: 'Phase two · StayBookt', promise: 'We run the busywork.', accent: '#10b981', viz: 'reception', rev: true,
    means: 'Every call, quote, and booking handled for you, in your voice. You stop living on your phone, and you stay in control the whole time.',
    offer: 'Part of your monthly plan',
    steps: [
      { t: 'We answer every call and text.', b: 'Day or night, mid-job or asleep, answered in your voice and quoted on the spot. AI handles the everyday ones. A real person on our team steps in on anything unusual, before it reaches your customer.' },
      { t: 'We book the job.', b: 'Straight onto your calendar, confirmed with the customer, with reminders so they actually show up.' },
      { t: 'We send and chase your quotes.', b: 'Every quote goes out and gets followed up until you get a yes or a no. No job lost because you were too busy to call back.' },
      { t: 'We keep it all in one place.', b: 'Every customer, job, and conversation on record, without you typing a thing. Off your personal phone and email.' },
      { t: 'We hand you one short brief a day.', b: 'What is booked, what needs a decision, what came in. Thirty seconds, then go run your day. No software to learn.' },
    ],
  },
  {
    id: 'free', label: 'Phase three · Enjoy life', promise: 'Go enjoy the life you built it for.', accent: '#f59e0b', viz: 'repeat',
    means: 'Your time back, and a business worth more. It is what your first year with us builds toward, and it comes by invitation.',
    offer: 'By invitation, after your first year',
    steps: [
      { t: 'We bring old customers back.', b: 'Months after a job, we reach out so past customers rebook you instead of googling someone else. Repeat work, on its own.' },
      { t: 'Your reputation keeps compounding.', b: 'Reviews keep coming, your ranking keeps climbing, and new work keeps arriving without you chasing it.' },
      { t: 'The business stops depending on you.', b: 'Because the finding, answering, and booking all run without you in the middle, you get your evenings and weekends back.' },
      { t: 'And it is worth more.', b: 'A business that runs without the owner glued to it is one you can actually keep, pass on, or sell.' },
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
  { q: 'Do you take a cut of my jobs?', a: 'No. It is one simple monthly plan to run everything. The only place we ever share upside is the invite-only Enjoy Life tier, and that comes later, once we have a track record together.' },
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
.hiw-hero{position:relative;background:#fff;text-align:center;padding:clamp(120px,16vh,180px) 0 clamp(50px,7vw,80px);overflow:hidden;}
.hiw-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(52% 42% at 50% 6%,rgba(6,182,212,.08),transparent 60%);pointer-events:none;}
.hiw-hero .wrap{position:relative;}
.hiw-hero h1{margin-top:18px;font-size:clamp(42px,6.6vw,88px);line-height:1.0;max-width:15ch;margin-left:auto;margin-right:auto;}
.hiw-hero p.lead{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.45;color:#52565e;max-width:46ch;}
.hiw-hero .cta{margin-top:34px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}

/* hero journey (3 phases) */
.hiw-journey{margin:clamp(56px,7vw,92px) auto 0;max-width:960px;}
.hiw-journey .row{display:flex;align-items:stretch;justify-content:center;gap:0;flex-wrap:nowrap;}
.hiw-journey .jcard{flex:1 1 0;min-width:0;background:#fff;border:1px solid #ececec;border-radius:22px;padding:26px 22px;text-align:left;box-shadow:0 22px 46px -30px rgba(6,12,20,.25);border-top:3px solid var(--jc);}
.hiw-journey .jcard .jk{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--jc);}
.hiw-journey .jcard .jt{margin-top:10px;font-size:clamp(20px,2.4vw,27px);font-weight:600;letter-spacing:-.02em;line-height:1.1;}
.hiw-journey .jcard .js{margin-top:8px;font-size:14.5px;line-height:1.35;color:#7b7f88;}
.hiw-journey .jarr{flex:0 0 30px;display:flex;align-items:center;justify-content:center;color:#c4c8ce;}
.hiw-journey .jnote{margin:24px auto 0;text-align:center;font-size:15px;line-height:1.55;color:#6b7079;max-width:56ch;}
.hiw-journey .jnote b{color:var(--v4-ink);font-weight:600;}
@media(max-width:760px){.hiw-journey .row{flex-direction:column;}.hiw-journey .jarr{flex:0 0 26px;transform:rotate(90deg);}}

/* sticky chapter rail */
.hiw-rail{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.82);backdrop-filter:saturate(180%) blur(16px);-webkit-backdrop-filter:saturate(180%) blur(16px);border-bottom:1px solid #ececec;}
.hiw-rail .rail-in{display:flex;gap:clamp(14px,3vw,38px);justify-content:center;flex-wrap:wrap;padding:15px 20px;}
.hiw-rail a{font-size:13.5px;font-weight:600;color:#9298a1;text-decoration:none;transition:color .3s ease;white-space:nowrap;}
.hiw-rail a.on{color:var(--v4-ink);}
.hiw-rail a:hover{color:#52565e;}
@media(max-width:640px){.hiw-rail .rail-in{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;}}

/* learn (precursor) */
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

/* phase chapter */
.hiw-phase{padding:clamp(84px,11vw,150px) 0;}
.hiw-phase.alt{background:var(--v4-cream);}
.hiw-phase .plabel{font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--acc);}
.hiw-phase .promise{margin-top:14px;font-size:clamp(32px,5.2vw,66px);line-height:1.0;letter-spacing:-.035em;max-width:15ch;}
.hiw-phase .means{margin-top:20px;font-size:clamp(18px,2vw,22px);line-height:1.5;color:#52565e;max-width:44ch;}
.hiw-phase .offer{display:inline-flex;align-items:center;margin-top:22px;font-size:13px;font-weight:600;padding:8px 15px;border-radius:999px;border:1px solid var(--acc);color:var(--acc);}
.hiw-phase .body{margin-top:clamp(44px,5vw,68px);display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(38px,6vw,84px);align-items:center;}
.hiw-phase.rev .body .steps{order:2;}
.hiw-phase .how{font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9298a1;margin-bottom:22px;}
.hiw-steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:clamp(20px,2.4vw,28px);}
.hiw-steps li{display:grid;grid-template-columns:34px 1fr;gap:16px;align-items:start;}
.hiw-steps .num{width:34px;height:34px;border-radius:50%;background:var(--acc);color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;flex:0 0 auto;box-shadow:0 8px 18px -8px var(--acc);}
.hiw-steps .sc{font-size:clamp(16px,1.75vw,18px);line-height:1.5;color:#33373e;}
.hiw-steps .sc b{color:var(--v4-ink);font-weight:600;}
.hiw-phase .viz{position:relative;display:flex;justify-content:center;}
.hiw-phase .viz::before{content:'';position:absolute;inset:-10% -8%;background:radial-gradient(58% 58% at 50% 45%,color-mix(in srgb,var(--acc) 16%,transparent),transparent 70%);filter:blur(26px);z-index:0;}
.hiw-phase .viz>*{position:relative;z-index:1;}
.hiw-phase .viz .appwin{width:min(420px,100%);}
.hiw-phase .illus{margin-top:16px;text-align:center;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#b3b7be;position:relative;z-index:1;}
@media(max-width:860px){.hiw-phase .body{grid-template-columns:1fr;gap:44px;}.hiw-phase.rev .body .steps{order:0;}}

/* proof */
.hiw-proof{background:#0b0f14;text-align:center;padding:clamp(60px,8vw,90px) 0;}
.hiw-proof p{font-size:clamp(18px,2.1vw,24px);color:#e8eaee;font-weight:600;letter-spacing:-.02em;max-width:24ch;margin:0 auto;line-height:1.25;}
.hiw-proof a{color:#5eead4;font-weight:600;text-decoration:none;}
.hiw-proof .sub{margin-top:14px;font-size:15px;color:#9aa0ab;font-weight:400;letter-spacing:0;}

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
function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
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

function PhaseBlock({ p, alt }: { p: Phase; alt: boolean }) {
  return (
    <section className={`hiw-phase${alt ? ' alt' : ''}${p.rev ? ' rev' : ''}`} id={p.id} style={{ '--acc': p.accent } as CSSProperties}>
      <div className="wrap">
        <div className="plabel">{p.label}</div>
        <div className="promise">{p.promise}</div>
        <div className="means">{p.means}</div>
        <div className="offer">{p.offer}</div>
        <div className="body">
          <div className="steps">
            <div className="how">How we do it</div>
            <ul className="hiw-steps">
              {p.steps.map((s, i) => (
                <li key={s.t}>
                  <span className="num">{i + 1}</span>
                  <span className="sc"><b>{s.t}</b> {s.b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="viz">{viz(p.viz)}</div>
            <div className="illus">Illustration</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState('learn');
  const [openF, setOpenF] = useState<number | null>(0);

  useEffect(() => {
    const ids = ['learn', 'found', 'run', 'free', 'start'];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const journeyNodes: ReactNode[] = [];
  JOURNEY.forEach((c, i) => {
    journeyNodes.push(
      <div key={c.t} className="jcard" style={{ '--jc': c.c } as CSSProperties}>
        <div className="jk">{c.k}</div>
        <div className="jt">{c.t}</div>
        <div className="js">{c.s}</div>
      </div>,
    );
    if (i < JOURNEY.length - 1) journeyNodes.push(<div key={`a${i}`} className="jarr"><ArrowIcon /></div>);
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
            <a className="hiw-btn ghost" href="#learn">Walk the journey</a>
          </div>
          <div className="hiw-journey">
            <div className="row">{journeyNodes}</div>
            <p className="jnote"><b>Get Found and StayBookt come together as one simple monthly plan.</b> Enjoy Life is the invitation you earn, once we have built the systems, the reputation, and the revenue over your first year.</p>
          </div>
        </div>
      </header>

      {/* RAIL */}
      <nav className="hiw-rail">
        <div className="rail-in">
          {[{ id: 'learn', l: 'Learns you' }, { id: 'found', l: 'Get found' }, { id: 'run', l: 'StayBookt' }, { id: 'free', l: 'Enjoy life' }, { id: 'start', l: 'Get started' }].map((c) => (
            <a key={c.id} href={`#${c.id}`} className={active === c.id ? 'on' : ''}>{c.l}</a>
          ))}
        </div>
      </nav>

      {/* LEARN (precursor) */}
      <section className="hiw-learn" id="learn">
        <div className="wrap">
          <div className="grid">
            <div>
              <div className="eyebrow">Before any of it</div>
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

      {/* THREE PHASES */}
      {PHASES.map((p, i) => <PhaseBlock key={p.id} p={p} alt={i % 2 === 1} />)}

      {/* PROOF */}
      <section className="hiw-proof">
        <div className="wrap">
          <p>We run this exact journey ourselves.</p>
          <div className="sub"><a href="/work">Top Choice Electrical and XNL, live right now &rarr;</a></div>
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

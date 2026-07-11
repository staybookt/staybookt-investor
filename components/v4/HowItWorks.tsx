'use client';

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
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
  id: string; n: string; label: string; promise: string; accent: string; accentD: string;
  beats: string[]; result: string; hero: boolean; steps: { t: string; b: string }[];
};
const STOPS: Stop[] = [
  {
    id: 'found', n: '1', label: 'Get found', promise: 'Impossible to miss.', accent: '#0ea5e9', accentD: '#0284c7', hero: false,
    beats: [
      'We build your website and analyze your numbers to find where work is leaking.',
      'We get you found on search, the map, and the new one that matters: AI recommendations.',
    ],
    result: 'Inbox full, texts flowing, phone ringing.',
    steps: [
      { t: 'We build you a proper website.', b: 'Fast, works on a phone, and made to turn a visitor into a call. Built and hosted for you, nothing to manage.' },
      { t: 'We fix your Google listing.', b: 'The thing that pops up when someone searches your trade. We fill it out, keep it current, and get Google to trust it.' },
      { t: 'We get you ranked, and recommended.', b: 'Your details match everywhere online so you climb the map results, and you show up when someone asks an AI assistant for your trade nearby.' },
      { t: 'We build your reviews.', b: 'Every finished job becomes a five-star review. More reviews means you climb higher and get picked more often.' },
    ],
  },
  {
    id: 'run', n: '2', label: 'StayBookt', promise: 'Every lead, maximized.', accent: '#10b981', accentD: '#059669', hero: true,
    beats: [
      'We catch the missed calls, engage the customer, and book the job. Reminders and confirmations so they show up.',
      'We send the quote, chase what is unpaid, and turn happy jobs into reviews and referrals.',
      'We suggest the right add-on, then schedule the maintenance and rebook the second job when it counts.',
    ],
    result: 'Nothing leaks. Every customer worth everything they are worth.',
    steps: [
      { t: 'We answer every call and text.', b: 'Day or night, mid-job or asleep, answered in your voice. AI handles the everyday ones. A real person steps in on anything unusual, before it reaches your customer.' },
      { t: 'We book, confirm, and remind.', b: 'Straight onto your calendar, confirmed with the customer, with reminders so they actually show up.' },
      { t: 'We quote and chase.', b: 'Every quote goes out and gets followed up until you get a yes or a no. We chase unpaid invoices so the money actually lands.' },
      { t: 'We grow every customer.', b: 'Reviews and referrals from the happy ones. The right upsell and cross-sell. Follow-up maintenance booked before they drift.' },
      { t: 'We hand you one short brief a day.', b: 'What is booked, what needs a decision, what came in. Thirty seconds, then go run your day. No software to learn.' },
    ],
  },
  {
    id: 'free', n: '3', label: 'Enjoy life', promise: 'You choose.', accent: '#f59e0b', accentD: '#b45309', hero: false,
    beats: [
      'After 12 months, once the leaks are closed and the operation runs with discipline, we run a real valuation of your business.',
      'Not just the dollar figure, but how well it gives you your time back and can run and grow on its own.',
    ],
    result: 'Sell it, hand it to family, or just do the part you love.',
    steps: [
      { t: 'We build toward a number.', b: 'Everything in the first year is engineered so the business is worth more, and provable, by the time we value it.' },
      { t: 'We value what matters.', b: 'The financials, and the freedom: how much the business depends on you, and how well it runs and grows without you in the middle.' },
      { t: 'You take the driver seat.', b: 'Sell to a buyer, hand it to a family member, or step back to the part of the work you actually love. Your call.' },
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

/* ===== THE JOURNEY MAP (drawing trail) ===== */
.hiw-jrny{background:#fff;padding:clamp(56px,7vw,96px) 0 clamp(70px,9vw,120px);}
.hiw-jrny .jhead{text-align:center;max-width:640px;margin:0 auto clamp(30px,4vw,52px);}
.hiw-jrny .jhead h2{font-size:clamp(30px,4.4vw,54px);line-height:1.05;margin-top:14px;}
.hiw-jrny .jhead p{margin-top:16px;font-size:clamp(16px,1.8vw,19px);color:#7a828f;line-height:1.5;}
.jmap{position:relative;max-width:920px;margin:0 auto;}
.jmap .rail{position:absolute;left:29px;top:14px;bottom:44px;width:3px;background:#e9e9ee;border-radius:2px;}
.jmap .fill{position:absolute;left:29px;top:14px;width:3px;height:calc(var(--p,0) * (100% - 58px));background:linear-gradient(180deg,#0ea5e9,#10b981 55%,#f59e0b);border-radius:2px;}
.jmap .marker{position:absolute;left:23px;top:calc(14px + var(--p,0) * (100% - 58px));width:15px;height:15px;border-radius:50%;background:#fff;border:3px solid var(--v4-ink);box-shadow:0 3px 12px rgba(0,0,0,.28);transform:translateY(-50%);z-index:3;}
.jstart{display:grid;grid-template-columns:60px 1fr;gap:clamp(14px,2.5vw,28px);align-items:center;padding-bottom:clamp(24px,3vw,34px);}
.jstart .sdot{width:16px;height:16px;border-radius:50%;background:var(--v4-ink);margin:0 auto;position:relative;z-index:2;}
.jstart .st{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9298a1;}
.jstart .sh{margin-top:3px;font-size:clamp(17px,2vw,20px);font-weight:600;color:var(--v4-ink);}
.jstop{display:grid;grid-template-columns:60px 1fr;gap:clamp(14px,2.5vw,28px);align-items:start;padding:clamp(30px,4.5vw,54px) 0;opacity:.5;transition:opacity .55s ease;}
.jstop.on{opacity:1;}
.jstop .node{width:44px;height:44px;border-radius:50%;background:#e6e8ec;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;margin:0 auto;border:4px solid #fff;position:relative;z-index:2;transition:background .5s ease,box-shadow .5s ease;box-shadow:0 0 0 0 var(--acc);}
.jstop.on .node{background:var(--acc);box-shadow:0 10px 24px -8px var(--acc);}
.jstop .plabel{font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--acd);}
.jstop .promise{margin-top:8px;font-size:clamp(28px,4vw,50px);font-weight:600;line-height:1.02;letter-spacing:-.03em;}
.jstop .beats{list-style:none;margin:22px 0 0;padding:0;display:flex;flex-direction:column;gap:13px;max-width:52ch;}
.jstop .beats li{display:grid;grid-template-columns:9px 1fr;gap:13px;align-items:start;font-size:clamp(16px,1.7vw,18px);line-height:1.5;color:#42474f;}
.jstop .beats .b{width:9px;height:9px;border-radius:50%;background:var(--acc);margin-top:8px;}
.jstop .result{display:inline-block;margin-top:22px;font-size:15px;font-weight:600;color:var(--acd);}
.jstop .stophero{position:relative;margin:32px 0 6px;display:flex;justify-content:flex-start;}
.jstop .stophero::before{content:'';position:absolute;inset:-8% -6% 2% -6%;background:radial-gradient(50% 55% at 40% 45%,color-mix(in srgb,var(--acc) 22%,transparent),transparent 72%);filter:blur(38px);z-index:0;}
.jstop .stophero>*{position:relative;z-index:1;}
.jstop .detail{margin-top:26px;}
.jstop .toggle{display:inline-flex;align-items:center;gap:9px;background:#fff;border:1px solid #e2e2df;color:var(--v4-ink);font-family:inherit;font-size:14px;font-weight:600;border-radius:999px;padding:10px 18px;cursor:pointer;transition:border-color .25s ease;}
.jstop .toggle:hover{border-color:var(--acc);}
.jstop .toggle .pl{font-size:17px;line-height:1;color:var(--acc);transition:transform .3s ease;}
.jstop .detail.open .toggle .pl{transform:rotate(45deg);}
.jstop .steps{max-height:0;overflow:hidden;transition:max-height .55s cubic-bezier(.16,1,.3,1),margin .4s ease;}
.jstop .detail.open .steps{max-height:1200px;margin-top:24px;}
.jstop .steps ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:16px;max-width:60ch;}
.jstop .steps li{display:grid;grid-template-columns:30px 1fr;gap:13px;align-items:start;}
.jstop .steps .num{width:30px;height:30px;border-radius:50%;background:var(--acc);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13.5px;font-weight:700;flex:0 0 auto;}
.jstop .steps .sc{font-size:15px;line-height:1.5;color:#42474f;}
.jstop .steps .sc b{color:var(--v4-ink);font-weight:600;}
@media(max-width:640px){
  .jmap .rail,.jmap .fill{left:19px;}
  .jmap .marker{left:13px;}
  .jstop,.jstart{grid-template-columns:40px 1fr;gap:16px;}
  .jstop .node{width:36px;height:36px;font-size:15px;}
  .jstop .stophero{justify-content:center;}
}

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

function StopBlock({ s, open, onToggle, obsRef }: { s: Stop; open: boolean; onToggle: () => void; obsRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div className="jstop" id={s.id} ref={obsRef} style={{ '--acc': s.accent, '--acd': s.accentD } as CSSProperties}>
      <div className="node">{s.n}</div>
      <div className="body">
        <div className="plabel">Milestone {s.n} · {s.label}</div>
        <div className="promise">{s.promise}</div>
        <ul className="beats">
          {s.beats.map((b) => <li key={b}><span className="b" /><span>{b}</span></li>)}
        </ul>
        <div className="result">&rarr; {s.result}</div>

        {s.hero && (
          <div className="stophero"><PlayOnView><Receptionist /></PlayOnView></div>
        )}

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
  const mapRef = useRef<HTMLDivElement | null>(null);
  const stopEls = useRef<Record<string, HTMLDivElement | null>>({});

  // Draw the trail: set --p (0..1) on the map as it scrolls through the viewport.
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(Math.max((vh * 0.55 - r.top) / r.height, 0), 1);
        el.style.setProperty('--p', String(p));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Light up each stop as it enters view (stays lit once passed).
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on'); }),
      { rootMargin: '-30% 0px -45% 0px', threshold: 0 },
    );
    Object.values(stopEls.current).forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

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
            <div className="rail" />
            <div className="fill" />
            <div className="marker" />
            <div className="jstart">
              <div className="sdot" />
              <div>
                <div className="st">Day one · You are here</div>
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
              />
            ))}
          </div>
        </div>
      </section>

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

'use client';

import { useEffect, useState } from 'react';
import { START_LINK } from '@/lib/site';
import CloserLook from '@/components/v4/CloserLook';

const CHAPTERS = [
  { id: 'model', label: 'The model' },
  { id: 'getfound', label: 'Get found' },
  { id: 'runday', label: 'Run the day' },
  { id: 'enjoy', label: 'Enjoy life' },
  { id: 'start', label: 'Getting started' },
  { id: 'included', label: "What's included" },
];

const YOU = ['The work itself', 'Your crew', 'Your customers', 'The calls worth taking', 'What to charge', 'Who to hire'];
const WE = ['Answering the phone and texts', 'Booking the jobs', 'Sending and chasing quotes', 'Following up', 'Asking for reviews', 'Keeping the records', 'Your morning brief'];

const TIMELINE: { n: string; h: string; b: string }[] = [
  { n: '01', h: 'A 30-minute call.', b: 'Free. We look at where the work is slipping and what it is costing you. You keep that read whether you hire us or not.' },
  { n: '02', h: 'Week one, we build.', b: 'Your new site and a rebuilt Google presence. You review, we launch.' },
  { n: '03', h: 'Week two, we go live.', b: 'The receptionist, booking, and CRM switch on. We wire up your calls and texts so nothing gets missed again.' },
  { n: '04', h: 'From then on, we run it.', b: 'Every morning you get one short brief. That is the only thing you have to read.' },
];

const SPEC: { group: string; items: string[] }[] = [
  { group: 'Get found', items: ['Custom, mobile-first website, built and hosted', 'Google Business Profile rebuilt and optimized', 'Local search and map-pack setup', 'Name, address, number consistent everywhere', 'Review and reputation foundation', 'Tap-to-call and self-serve booking on every page'] },
  { group: 'Run it', items: ['AI receptionist: answers every call and text, 24/7', 'Quotes on the spot, jobs booked into your real calendar', 'Self-serve online booking', 'CRM: every customer, job, and conversation in one place', 'Quotes sent and chased until they close', 'Operating dashboard: the whole business at a glance', 'One central inbox, off your personal email'] },
  { group: 'Grow it', items: ['AI analyst: finds where money is leaking', 'Review engine: finished jobs become five-star reviews', 'Reactivation: past customers brought back on their own'] },
  { group: 'Enjoy life', items: ['One short morning brief, every day', 'Systems built for a clean sale or handoff (invite tier)', 'We share the upside: 5% of new business (invite tier)'] },
];

const FAQ: { q: string; a: string }[] = [
  { q: 'Do I have to learn any software?', a: 'No. That is the whole point. We run it. You get a short brief each morning and approve the occasional thing. There is no app you are forced to live in.' },
  { q: 'What if I already have a website?', a: 'We will look at it. If it is doing the job, we build around it. If it is holding you back, we replace it. You are not stuck with something that does not convert.' },
  { q: 'Do I keep my phone number?', a: 'Yes. Your number stays yours. We make sure the calls and texts you cannot pick up still get answered and booked.' },
  { q: 'Who owns the website and domain?', a: 'The site is yours to keep. If you already own your domain it stays in your name; if we set one up, we walk through the handover on the call. Nothing holds you hostage.' },
  { q: 'How long until I am live?', a: 'About two weeks from the first call.' },
  { q: 'Is there a contract?', a: 'No lock-in. Cancel any time. The site is yours to keep.' },
  { q: 'Will it sound like a robot to my customers?', a: 'No. It answers in your business voice, books the job, and hands off to you when it should. To the customer, it just feels like you finally pick up.' },
  { q: 'What trades do you work with?', a: 'Owner-operated home service: electrical, plumbing, HVAC, and the like.' },
  { q: 'Do you take a cut of my jobs?', a: 'No. It is a flat $199 a month to run it. The only place we share upside is the invite-only tier, and that is only on new business we generate.' },
];

const CSS = `
.hiw{background:#fff;color:var(--v4-ink);}
.hiw .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.hiw .eyebrow{font-size:12.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.hiw h1,.hiw h2,.hiw h3,.hiw h4{font-weight:600;letter-spacing:-.03em;color:var(--v4-ink);}
.hiw-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:14px 28px;text-decoration:none;transition:transform .3s ease;}
.hiw-btn:hover{transform:translateY(-1px);}
.hiw-btn.ghost{background:transparent;color:var(--v4-ink);border:1px solid rgba(0,0,0,.18);}

/* hero */
.hiw-hero{background:#fff;text-align:center;padding:clamp(110px,16vh,180px) 0 0;}
.hiw-hero h1{margin-top:16px;font-size:clamp(44px,7vw,92px);line-height:1.02;}
.hiw-hero p.lead{margin:24px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.5;color:#52565e;max-width:44ch;}
.hiw-hero .cta{margin-top:32px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.hiw-stage{position:relative;max-width:900px;margin:clamp(50px,7vw,96px) auto 0;padding-bottom:clamp(70px,9vw,120px);animation:hiwrise .9s cubic-bezier(.2,.7,.2,1) both;}
.hiw-stage .browser{max-width:740px;margin:0 auto;}
.hiw-stage .phone{position:absolute;left:1%;bottom:clamp(30px,5vw,70px);width:210px;z-index:2;}
.hiw-stage .phone .screen{height:430px;}
@keyframes hiwrise{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:none;}}
@media(max-width:760px){.hiw-stage .phone{display:none;}.hiw-stage{padding-bottom:40px;}}

/* sticky chapter rail */
.hiw-rail{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.8);backdrop-filter:saturate(180%) blur(16px);-webkit-backdrop-filter:saturate(180%) blur(16px);border-bottom:1px solid #ececec;}
.hiw-rail .rail-in{display:flex;gap:clamp(14px,3vw,36px);justify-content:center;flex-wrap:wrap;padding:15px 20px;}
.hiw-rail a{font-size:13.5px;font-weight:600;color:#8a8f98;text-decoration:none;transition:color .3s ease;white-space:nowrap;}
.hiw-rail a.on{color:var(--v4-ink);}
.hiw-rail a:hover{color:#52565e;}
@media(max-width:640px){.hiw-rail .rail-in{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;}}

/* sections */
.hiw-sec{padding:clamp(78px,11vw,140px) 0;}
.hiw-sec.cream{background:var(--v4-cream);}
.hiw-ch{font-size:12.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;}
.hiw-ch.cyan{color:#0284c7;}.hiw-ch.teal{color:#0891b2;}.hiw-ch.green{color:#059669;}

/* model */
.hiw-model{text-align:center;}
.hiw-model h2{font-size:clamp(32px,5vw,64px);line-height:1.05;max-width:20ch;margin:0 auto;}
.hiw-model p{margin:26px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.55;color:#52565e;max-width:52ch;}

/* you / we */
.hiw-split h2{text-align:center;font-size:clamp(30px,4.6vw,56px);line-height:1.06;max-width:18ch;margin:0 auto;}
.hiw-cols{margin-top:clamp(44px,6vw,72px);display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.hiw-col{background:#fff;border:1px solid #ececea;border-radius:22px;padding:clamp(26px,3.4vw,40px);box-shadow:0 20px 50px -34px rgba(0,0,0,.28);}
.hiw-col .lbl{font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#8a8f98;}
.hiw-col.we .lbl{color:#059669;}
.hiw-col ul{list-style:none;margin:20px 0 0;padding:0;display:flex;flex-direction:column;gap:14px;}
.hiw-col li{font-size:clamp(15px,1.7vw,18px);color:#33373e;display:flex;align-items:flex-start;gap:11px;line-height:1.4;}
.hiw-col li::before{content:'';margin-top:8px;width:6px;height:6px;border-radius:50%;flex:0 0 auto;background:#c2c6cc;}
.hiw-col.we li::before{background:#10b981;}
.hiw-kick{text-align:center;margin-top:34px;font-size:clamp(16px,1.9vw,20px);color:#52565e;}
@media(max-width:720px){.hiw-cols{grid-template-columns:1fr;}}

/* get found chapter */
.hiw-gf .blk{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,80px);align-items:center;margin-top:clamp(56px,7vw,96px);}
.hiw-gf .blk:nth-child(even) .txt{order:2;}
.hiw-gf .blk h3{font-size:clamp(26px,3.4vw,44px);line-height:1.08;max-width:16ch;}
.hiw-gf .blk p{margin-top:16px;font-size:clamp(16px,1.8vw,19px);line-height:1.55;color:#52565e;max-width:40ch;}
.hiw-gf .viz{display:flex;align-items:center;justify-content:center;}
@media(max-width:820px){.hiw-gf .blk{grid-template-columns:1fr;}.hiw-gf .blk:nth-child(even) .txt{order:0;}}

/* enjoy */
.hiw-enjoy{text-align:center;}
.hiw-enjoy h2{font-size:clamp(30px,4.6vw,56px);line-height:1.06;max-width:14ch;margin:0 auto;}
.hiw-enjoy p{margin:24px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.55;color:#52565e;max-width:50ch;}
.hiw-enjoy .door{display:inline-block;margin-top:26px;color:#0284c7;font-weight:600;font-size:15px;text-decoration:none;}

/* timeline */
.hiw-tl{text-align:center;}
.hiw-tl h2{font-size:clamp(30px,4.6vw,52px);line-height:1.06;max-width:18ch;margin:0 auto;}
.hiw-steps{margin-top:clamp(48px,6vw,72px);display:grid;grid-template-columns:repeat(4,1fr);gap:18px;text-align:left;}
.hiw-step{position:relative;padding-top:26px;}
.hiw-step::before{content:'';position:absolute;top:5px;left:0;right:0;height:2px;background:linear-gradient(90deg,#0891b2,rgba(8,145,178,.12));}
.hiw-step .n{font-size:12px;font-weight:700;letter-spacing:.14em;color:#0891b2;}
.hiw-step h4{margin-top:12px;font-size:clamp(18px,2vw,22px);}
.hiw-step p{margin-top:10px;font-size:14.5px;line-height:1.5;color:#6e7178;}
@media(max-width:820px){.hiw-steps{grid-template-columns:1fr 1fr;}}
@media(max-width:520px){.hiw-steps{grid-template-columns:1fr;}}

/* spec */
.hiw-spec h2{text-align:center;font-size:clamp(30px,4.6vw,52px);margin:0 auto;}
.hiw-spec .sub{text-align:center;margin:16px auto 0;color:#8a8f98;font-size:16px;}
.hiw-spec .cols{margin-top:clamp(44px,6vw,64px);display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(24px,3vw,40px);}
.hiw-spec .grp{font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#0284c7;padding-bottom:14px;border-bottom:1px solid #e5e5e2;}
.hiw-spec ul{list-style:none;margin:16px 0 0;padding:0;display:flex;flex-direction:column;gap:14px;}
.hiw-spec li{font-size:14.5px;line-height:1.45;color:#33373e;display:flex;gap:9px;align-items:flex-start;}
.hiw-spec li svg{flex:0 0 auto;margin-top:2px;}
@media(max-width:900px){.hiw-spec .cols{grid-template-columns:1fr 1fr;}}
@media(max-width:560px){.hiw-spec .cols{grid-template-columns:1fr;}}

/* faq */
.hiw-faq h2{text-align:center;font-size:clamp(30px,4.6vw,52px);margin:0 auto clamp(40px,5vw,56px);}
.hiw-faq .list{max-width:760px;margin:0 auto;}
.hiw-q{border-bottom:1px solid #e5e5e2;}
.hiw-q button{width:100%;background:transparent;border:0;color:var(--v4-ink);font-family:inherit;font-size:clamp(16px,1.9vw,20px);font-weight:600;letter-spacing:-.01em;text-align:left;padding:22px 40px 22px 0;cursor:pointer;position:relative;}
.hiw-q button .pl{position:absolute;right:2px;top:50%;transform:translateY(-50%);font-size:22px;font-weight:400;color:#9aa0a8;transition:transform .3s ease,color .3s ease;line-height:1;}
.hiw-q.open button .pl{transform:translateY(-50%) rotate(45deg);color:#0284c7;}
.hiw-q .ans{max-height:0;overflow:hidden;transition:max-height .35s ease;}
.hiw-q.open .ans{max-height:240px;}
.hiw-q .ans p{padding:0 0 22px;margin:0;font-size:16px;line-height:1.6;color:#52565e;max-width:62ch;}

/* closer */
.hiw-close{text-align:center;padding:clamp(96px,13vw,170px) 0;background:var(--v4-cream);}
.hiw-close h2{font-size:clamp(34px,5.4vw,72px);line-height:1.03;max-width:16ch;margin:0 auto;}
.hiw-close .price{margin:20px auto 0;font-size:clamp(16px,1.9vw,20px);color:#52565e;}
.hiw-close .price a{color:#0284c7;text-decoration:none;font-weight:600;}
.hiw-close .cta{margin-top:34px;}
`;

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
    </svg>
  );
}

function Dashboard() {
  return (
    <div className="sbwrap">
      <div className="browser">
        <div className="bz-bar"><span className="bz-dot" style={{ background: '#ff5f57' }} /><span className="bz-dot" style={{ background: '#febc2e' }} /><span className="bz-dot" style={{ background: '#28c840' }} /><span className="bz-url">staybookt.com/ops</span></div>
        <div className="aw-body">
          <div className="stats">
            <div className="stat"><div className="lbl">Booked this week</div><div className="val">14</div></div>
            <div className="stat"><div className="lbl">Revenue MTD</div><div className="val">$38.4k <small>▒12%</small></div></div>
            <div className="stat"><div className="lbl">Quotes out</div><div className="val">6</div></div>
            <div className="stat"><div className="lbl">Reviews</div><div className="val">9 <small>★</small></div></div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div className="cn">Today · 3 jobs</div><div className="cm">First at 8:30 AM · all confirmed</div></div><span className="pill g">On track</span></div>
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div className="cn">M. Lowe · 2–4 PM</div><div className="cm">Panel upgrade · Riverdale</div></div><span className="pill">Next up</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReceptionistPhone() {
  return (
    <div className="phone"><div className="notch" /><div className="screen">
      <div className="ph-bar"><div className="ph-ava">TC</div><div><div className="ph-name">Top Choice</div><div className="ph-sub">StayBookt receptionist</div></div></div>
      <div className="ph-body">
        <div className="bub sys">Missed call · 6:47 PM</div>
        <div className="bub us">Hi, this is Top Choice. Sorry we missed you! What can we help with?</div>
        <div className="bub them">Panel keeps tripping. Someone today?</div>
        <div className="bub us">2–4 PM is open. Book it?</div>
        <div className="bub them">Yes please</div>
        <div className="bub us ok">Booked. We will text on the way.</div>
      </div>
      <div className="ph-tag">Answered · booked · hands-free</div>
    </div></div>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState('model');
  const [openF, setOpenF] = useState<number | null>(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    CHAPTERS.forEach((c) => { const el = document.getElementById(c.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="hiw">
      <style>{CSS}</style>

      {/* HERO */}
      <header className="hiw-hero">
        <div className="wrap">
          <div className="eyebrow">How it works</div>
          <h1>How it all actually runs.</h1>
          <p className="lead">
            Not a tool you have to learn. An operator that runs the front of your business, so you
            can go do the work.
          </p>
          <div className="cta">
            <a className="hiw-btn" href={START_LINK}>Pick a time</a>
            <a className="hiw-btn ghost" href="#included">See what is included</a>
          </div>
          <div className="hiw-stage">
            <Dashboard />
            <ReceptionistPhone />
          </div>
        </div>
      </header>

      {/* CHAPTER RAIL */}
      <nav className="hiw-rail">
        <div className="rail-in">
          {CHAPTERS.map((c) => (
            <a key={c.id} href={`#${c.id}`} className={active === c.id ? 'on' : ''}>{c.label}</a>
          ))}
        </div>
      </nav>

      {/* MODEL */}
      <section className="hiw-sec hiw-model" id="model">
        <div className="wrap">
          <h2>StayBookt is not software you run. It is a team that runs it for you.</h2>
          <p>Most tools hand you more work: another login, another thing to check at night. We do the opposite. The software does the job in the background. You get your time back, not a second job.</p>
        </div>
      </section>

      {/* YOU / WE */}
      <section className="hiw-sec cream hiw-split">
        <div className="wrap">
          <h2>You keep the business. We take the busywork.</h2>
          <div className="hiw-cols">
            <div className="hiw-col you">
              <div className="lbl">Still yours</div>
              <ul>{YOU.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="hiw-col we">
              <div className="lbl">Off your plate</div>
              <ul>{WE.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
          <p className="hiw-kick">You never signed up to answer the phone at 9 PM. So you do not.</p>
        </div>
      </section>

      {/* GET FOUND */}
      <section className="hiw-sec hiw-gf" id="getfound">
        <div className="wrap">
          <div className="hiw-ch cyan">Get found</div>

          <div className="blk">
            <div className="txt">
              <h3>A site that makes you the obvious choice.</h3>
              <p>Fast, built for mobile first, and made to turn a visitor into a booked job instead of a bounce. Tap-to-call and self-serve booking on every page.</p>
            </div>
            <div className="viz">
              <div className="sbwrap"><div className="appwin" style={{ width: 360 }}>
                <div className="site-hero">
                  <div className="sh-nav"><b>Top Choice Electrical</b><span>Services · Reviews · Book</span></div>
                  <h5>Licensed electricians.<br />Same-day service.</h5>
                  <p>Panel upgrades, EV chargers, emergency calls.</p>
                  <div className="sh-row"><span className="sh-btn">Book now</span><span className="sh-stars">★★★★★ 4.9 · 312 reviews</span></div>
                </div>
              </div></div>
            </div>
          </div>

          <div className="blk">
            <div className="txt">
              <h3>When someone nearby searches, you are who they find.</h3>
              <p>We rebuild your Google Business Profile, then make your name, address, and number match everywhere, so Google trusts you and puts you in the local map pack.</p>
            </div>
            <div className="viz">
              <div className="sbwrap"><div className="appwin" style={{ width: 360 }}>
                <div className="aw-top"><span className="aw-ic" />electrician near me</div>
                <div className="aw-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div className="gbiz first"><span className="rank">#1</span><div className="bn">Top Choice Electrical</div><div className="stars">★★★★★ <span>4.9 · Open now</span></div></div>
                  <div className="gbiz dim"><div className="bn">City Wide Electric</div><div className="stars">★★★★ <span>4.1</span></div></div>
                  <div className="gbiz dim"><div className="bn">Rapid Volt</div><div className="stars">★★★★ <span>4.0</span></div></div>
                </div>
              </div></div>
            </div>
          </div>

          <div className="blk">
            <div className="txt">
              <h3>Every finished job becomes a five-star review.</h3>
              <p>The review ask goes out on its own after each job, replies get handled, and your rating climbs. That rating is what wins the next call.</p>
            </div>
            <div className="viz">
              <div className="sbwrap"><div className="appwin" style={{ width: 360 }}>
                <div className="aw-top"><span className="aw-ic" />Reputation<span className="aw-r">+9 this month</span></div>
                <div className="aw-body">
                  <div className="rv-big"><b>4.9</b> <span className="st">★★★★★</span> · 312 reviews</div>
                  <div className="rv-item"><span className="st">★★★★★</span> Booked online at 9 PM, fixed by noon. Unreal.<div className="who">— Sandra M.</div></div>
                  <div className="rv-item"><span className="st">★★★★★</span> Texted me a quote in minutes. No chasing.<div className="who">— R. Okafor</div></div>
                </div>
              </div></div>
            </div>
          </div>
        </div>
      </section>

      {/* RUN THE DAY — live product tour */}
      <div id="runday">
        <CloserLook />
      </div>

      {/* ENJOY LIFE */}
      <section className="hiw-sec cream hiw-enjoy" id="enjoy">
        <div className="wrap">
          <div className="hiw-ch green">Enjoy life</div>
          <h2 style={{ marginTop: 14 }}>The point of all of it.</h2>
          <p>When the front office runs itself, two things happen. You get your nights and weekends back. And the business becomes something you can sell or hand down, because it no longer lives only in your head.</p>
          <a className="door" href="/long-term">See how it becomes an asset →</a>
        </div>
      </section>

      {/* GETTING STARTED */}
      <section className="hiw-sec hiw-tl" id="start">
        <div className="wrap">
          <div className="eyebrow">Getting started</div>
          <h2 style={{ marginTop: 14 }}>Live in about two weeks. Here is the path.</h2>
          <div className="hiw-steps">
            {TIMELINE.map((s) => (
              <div className="hiw-step" key={s.n}>
                <div className="n">{s.n}</div>
                <h4>{s.h}</h4>
                <p>{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="hiw-sec cream hiw-spec" id="included">
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
      <section className="hiw-sec hiw-faq">
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
          <h2>Go do the work. We will run the rest.</h2>
          <p className="price">$1,750 to get found. $199 a month to run it. No lock-in. <a href="/pricing">See full pricing</a></p>
          <div className="cta"><a className="hiw-btn" href={START_LINK}>Pick a time</a></div>
        </div>
      </section>
    </div>
  );
}

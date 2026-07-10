'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { START_LINK } from '@/lib/site';

const LEAD = "A customer needs you. Here's everything that happens next, and the one small part that stays yours.";
const IDEA = "StayBookt isn't another app to check. It's a team that runs the front of your business, so the only thing you open is a 30-second brief.";

const STEPS: { id: string; k: string; h: string; b: string; viz: 'map' | 'reception' | 'booking' | 'brief' | 'repeat' | 'none'; layout: 'row' | 'center' | 'solo'; rev?: boolean }[] = [
  { id: 'found', k: '01', h: "You're the one they find.", b: 'They search. Your profile, your site, and your reviews put you first.', viz: 'map', layout: 'row' },
  { id: 'answered', k: '02', h: 'It gets answered.', b: '8 PM, mid-job, or asleep. The receptionist picks up in your voice, quotes, and books it.', viz: 'reception', layout: 'row', rev: true },
  { id: 'booked', k: '03', h: 'Straight into your calendar.', b: 'Confirmed with the customer. No phone tag, nothing for you to type.', viz: 'booking', layout: 'row' },
  { id: 'brief', k: '04', h: 'The only screen you open.', b: 'Every job and customer in one place. Each morning, one 30-second read.', viz: 'brief', layout: 'center' },
  { id: 'yours', k: '05', h: 'This part stays yours.', b: 'The craft. The crew. The customer. You do the work. We do the rest.', viz: 'none', layout: 'solo' },
  { id: 'repeat', k: '06', h: 'It keeps paying you back.', b: 'Reviews climb on their own. Months later, past customers come back on their own.', viz: 'repeat', layout: 'row' },
];

const SPEC: { group: string; items: string[] }[] = [
  { group: 'Get found', items: ['Custom, mobile-first website, built and hosted', 'Google Business Profile rebuilt and optimized', 'Local search and map-pack setup', 'Name, address, number consistent everywhere', 'Review and reputation foundation', 'Tap-to-call and self-serve booking on every page'] },
  { group: 'Run it', items: ['AI receptionist: answers every call and text, 24/7', 'Quotes on the spot, jobs booked into your calendar', 'Self-serve online booking', 'CRM: every customer, job, and conversation in one place', 'Quotes sent and chased until they close', 'Operating dashboard: the whole business at a glance', 'One central inbox, off your personal email'] },
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
.hiw .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.hiw h1,.hiw h2,.hiw h3,.hiw h4{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.hiw-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:15px 30px;text-decoration:none;transition:transform .3s ease;}
.hiw-btn:hover{transform:translateY(-1px);}
.hiw-btn.ghost{background:transparent;color:var(--v4-ink);border:1px solid rgba(0,0,0,.18);}

/* hero */
.hiw-hero{position:relative;background:#fff;text-align:center;padding:clamp(120px,16vh,190px) 0 clamp(70px,9vw,110px);overflow:hidden;}
.hiw-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(50% 40% at 50% 8%,rgba(6,182,212,.08),transparent 60%);pointer-events:none;}
.hiw-hero .wrap{position:relative;}
.hiw-hero h1{margin-top:18px;font-size:clamp(46px,7.4vw,100px);line-height:.98;max-width:14ch;margin-left:auto;margin-right:auto;}
.hiw-hero p.lead{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.45;color:#52565e;max-width:42ch;}
.hiw-hero .cta{margin-top:34px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.hiw-hero .herophone{position:relative;margin:clamp(56px,7vw,96px) auto 0;width:300px;max-width:82%;animation:hiwrise 1s cubic-bezier(.2,.7,.2,1) both;}
.hiw-hero .herophone::before{content:'';position:absolute;inset:-14% -30%;background:radial-gradient(55% 55% at 50% 45%,rgba(6,182,212,.14),transparent 70%);filter:blur(30px);z-index:0;}
.hiw-hero .herophone>*{position:relative;z-index:1;}
@keyframes hiwrise{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:none;}}

/* sticky chapter rail */
.hiw-rail{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.82);backdrop-filter:saturate(180%) blur(16px);-webkit-backdrop-filter:saturate(180%) blur(16px);border-bottom:1px solid #ececec;}
.hiw-rail .rail-in{display:flex;gap:clamp(16px,3vw,40px);justify-content:center;flex-wrap:wrap;padding:15px 20px;}
.hiw-rail a{font-size:13.5px;font-weight:600;color:#9298a1;text-decoration:none;transition:color .3s ease;white-space:nowrap;}
.hiw-rail a.on{color:var(--v4-ink);}
.hiw-rail a:hover{color:#52565e;}
@media(max-width:640px){.hiw-rail .rail-in{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;}}

/* the idea */
.hiw-idea{padding:clamp(90px,13vw,150px) 0;text-align:center;}
.hiw-idea h2{margin-top:16px;font-size:clamp(34px,5.4vw,72px);line-height:1.02;max-width:16ch;margin-left:auto;margin-right:auto;}
.hiw-idea p{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.5;color:#52565e;max-width:48ch;}

/* the flow */
.hiw-flow{padding:clamp(30px,5vw,60px) 0 clamp(60px,9vw,120px);}
.hiw-flow.tail{padding-top:clamp(60px,9vw,120px);}
.hiw-flow .flowhead{text-align:center;margin-bottom:clamp(20px,4vw,44px);}
.hiw-flow .flowhead h2{margin-top:16px;font-size:clamp(34px,5.4vw,66px);line-height:1.02;}
.hiw-flow .step{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,6vw,96px);align-items:center;padding:clamp(56px,8vw,120px) 0;}
.hiw-flow .step.rev .txt{order:2;}
.hiw-flow .step .k{font-size:14px;font-weight:700;letter-spacing:.14em;color:#c2c6cc;}
.hiw-flow .step h3{margin-top:12px;font-size:clamp(30px,4.2vw,58px);line-height:1.02;max-width:14ch;}
.hiw-flow .step p{margin-top:18px;font-size:clamp(17px,1.9vw,21px);line-height:1.5;color:#52565e;max-width:34ch;}
.hiw-flow .viz{position:relative;display:flex;justify-content:center;}
.hiw-flow .viz::before{content:'';position:absolute;inset:-10% -8%;background:radial-gradient(58% 58% at 50% 45%,rgba(6,182,212,.11),transparent 70%);filter:blur(26px);z-index:0;}
.hiw-flow .viz>*{position:relative;z-index:1;}
.hiw-flow .viz .appwin{width:min(430px,100%);}
.hiw-flow .viz .phone{width:300px;}
/* centered big moment */
.hiw-flow .step.center{grid-template-columns:1fr;text-align:center;}
.hiw-flow .step.center .txt{order:0;}
.hiw-flow .step.center h3{max-width:18ch;margin:0 auto;}
.hiw-flow .step.center p{max-width:40ch;margin:18px auto 0;}
.hiw-flow .step.center .viz{margin-top:clamp(40px,5vw,60px);}
.hiw-flow .step.center .viz .appwin{width:min(480px,92vw);}
/* solo statement */
.hiw-flow .step.solo{grid-template-columns:1fr;text-align:center;background:var(--v4-cream);border-radius:32px;padding:clamp(72px,10vw,130px) clamp(24px,5vw,60px);margin:clamp(24px,4vw,48px) 0;}
.hiw-flow .step.solo .txt{order:0;}
.hiw-flow .step.solo h3{max-width:22ch;margin:0 auto;font-size:clamp(32px,4.6vw,62px);}
.hiw-flow .step.solo p{max-width:38ch;margin:18px auto 0;}
@media(max-width:820px){.hiw-flow .step{grid-template-columns:1fr;gap:40px;}.hiw-flow .step.rev .txt{order:0;}}

/* signature stat band */
.hiw-stat{text-align:center;padding:clamp(100px,15vw,200px) 0;background:#fff;}
.hiw-stat h2{font-size:clamp(48px,9vw,128px);line-height:.94;letter-spacing:-.045em;}
.hiw-stat .g{background:linear-gradient(100deg,#06b6d4,#10b981 55%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent;}
.hiw-stat p{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);color:#52565e;max-width:34ch;}

/* proof strip */
.hiw-proof{background:var(--v4-cream);text-align:center;padding:clamp(44px,6vw,68px) 0;}
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
.hiw-q.open .ans{max-height:240px;}
.hiw-q .ans p{padding:0 0 24px;margin:0;font-size:16.5px;line-height:1.6;color:#52565e;max-width:62ch;}

/* closer */
.hiw-close{text-align:center;padding:clamp(110px,15vw,200px) 0;background:#fff;}
.hiw-close h2{font-size:clamp(38px,6vw,88px);line-height:1.0;max-width:15ch;margin:0 auto;}
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

function viz(kind: string): ReactNode {
  if (kind === 'reception') return <div className="sbwrap"><ReceptionistPhone /></div>;
  if (kind === 'map') {
    return (
      <div className="sbwrap"><div className="appwin">
        <div className="aw-top"><span className="aw-ic" />electrician near me</div>
        <div className="aw-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="gbiz first"><span className="rank">#1</span><div className="bn">Top Choice Electrical</div><div className="stars">★★★★★ <span>4.9 · Open now</span></div></div>
          <div className="gbiz dim"><div className="bn">City Wide Electric</div><div className="stars">★★★★ <span>4.1</span></div></div>
          <div className="gbiz dim"><div className="bn">Rapid Volt</div><div className="stars">★★★★ <span>4.0</span></div></div>
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
          <div className="bk-slots"><div className="s x">8–10</div><div className="s">10–12</div><div className="s x">12–2</div><div className="s sel">2–4 PM</div><div className="s">4–6</div><div className="s">6–8</div></div>
          <div className="bk-conf">Booked: Tue 2–4 PM. Added to your calendar and theirs.</div>
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
          <div className="rp-res"><span className="sub">18 rebooked</span><span><b>$9,400</b> recovered</span></div>
        </div>
      </div></div>
    );
  }
  return null;
}

function Step({ s }: { s: (typeof STEPS)[number] }) {
  return (
    <div className={`step ${s.layout}${s.rev ? ' rev' : ''}`} id={s.id}>
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
  const [active, setActive] = useState('found');
  const [openF, setOpenF] = useState<number | null>(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    STEPS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const incoming = STEPS.slice(0, 3);
  const rest = STEPS.slice(3);

  return (
    <div className="hiw">
      <style>{CSS}</style>

      {/* HERO */}
      <header className="hiw-hero">
        <div className="wrap">
          <div className="eyebrow">How it works</div>
          <h1>One job, start to finish.</h1>
          <p className="lead">{LEAD}</p>
          <div className="cta">
            <a className="hiw-btn" href={START_LINK}>Pick a time</a>
            <a className="hiw-btn ghost" href="#found">Walk the flow</a>
          </div>
          <div className="herophone"><ReceptionistPhone /></div>
        </div>
      </header>

      {/* RAIL */}
      <nav className="hiw-rail">
        <div className="rail-in">
          {[{ id: 'found', l: 'Found' }, { id: 'answered', l: 'Answered' }, { id: 'booked', l: 'Booked' }, { id: 'brief', l: 'Your brief' }, { id: 'yours', l: 'Your part' }, { id: 'repeat', l: 'Won back' }].map((c) => (
            <a key={c.id} href={`#${c.id}`} className={active === c.id ? 'on' : ''}>{c.l}</a>
          ))}
        </div>
      </nav>

      {/* THE IDEA */}
      <section className="hiw-idea">
        <div className="wrap">
          <div className="eyebrow">The idea</div>
          <h2>It runs in the background. You just show up.</h2>
          <p>{IDEA}</p>
        </div>
      </section>

      {/* THE FLOW — incoming */}
      <section className="hiw-flow">
        <div className="wrap">
          <div className="flowhead">
            <div className="eyebrow">The flow</div>
            <h2>Follow one job, start to finish.</h2>
          </div>
          {incoming.map((s) => <Step key={s.id} s={s} />)}
        </div>
      </section>

      {/* SIGNATURE STAT */}
      <section className="hiw-stat">
        <div className="wrap">
          <h2>Nothing <span className="g">slips through.</span></h2>
          <p>Every call, every quote, every follow-up. Handled while you work.</p>
        </div>
      </section>

      {/* THE FLOW — rest */}
      <section className="hiw-flow tail">
        <div className="wrap">
          {rest.map((s) => <Step key={s.id} s={s} />)}
        </div>
      </section>

      {/* PROOF */}
      <section className="hiw-proof">
        <div className="wrap">
          <p>We run this exact flow ourselves. <a href="/work">Top Choice Electrical and XNL HR, live now →</a></p>
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
          <h2>Go do the work. We will run the rest.</h2>
          <p className="price">$1,750 to get found. $199 a month to run it. No lock-in. <a href="/pricing">See full pricing</a></p>
          <div className="cta"><a className="hiw-btn" href={START_LINK}>Pick a time</a></div>
        </div>
      </section>
    </div>
  );
}

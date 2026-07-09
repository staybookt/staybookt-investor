'use client';

import { useEffect, useState } from 'react';
import { START_LINK } from '@/lib/site';

const CHAPTERS = [
  { id: 'model', label: 'The model' },
  { id: 'getfound', label: 'Get found' },
  { id: 'runday', label: 'Run the day' },
  { id: 'enjoy', label: 'Enjoy life' },
  { id: 'start', label: 'Getting started' },
  { id: 'included', label: "What's included" },
];

const YOU = [
  'The work itself',
  'Your crew',
  'Your customers',
  'The calls worth taking',
  'What to charge',
  'Who to hire',
];
const WE = [
  'Answering the phone and texts',
  'Booking the jobs',
  'Sending and chasing quotes',
  'Following up',
  'Asking for reviews',
  'Keeping the records',
  'Your morning brief',
];

const GETFOUND: { h: string; b: string; kind: 'site' | 'map' | 'rev' }[] = [
  {
    h: 'A site that makes you the obvious choice.',
    b: 'Fast, built for mobile first, and made to turn a visitor into a booked job instead of a bounce. Tap-to-call and self-serve booking on every page.',
    kind: 'site',
  },
  {
    h: 'When someone nearby searches, you are who they find.',
    b: 'We rebuild and optimize your Google Business Profile, then make your name, address, and number match everywhere, so Google trusts you and puts you in the local map pack.',
    kind: 'map',
  },
  {
    h: 'Every finished job becomes a five-star review.',
    b: 'The review ask goes out on its own after each job, replies get handled, and your rating climbs. That rating is what wins the next call.',
    kind: 'rev',
  },
];

const TOOLS: { group: string; label: string; desc: string }[] = [
  { group: 'GET FOUND', label: 'Your website', desc: 'Fast, ranks on Google, and turns visitors into booked jobs.' },
  { group: 'GET FOUND', label: 'AI receptionist', desc: 'Answers, quotes, and books every call and text, day or night.' },
  { group: 'RUN IT', label: 'Self-serve booking', desc: 'Customers book themselves straight into your real calendar.' },
  { group: 'RUN IT', label: 'CRM', desc: 'Every customer, job, and conversation in one place.' },
  { group: 'RUN IT', label: 'Quotes', desc: 'Send it fast, chase it automatically, close it.' },
  { group: 'RUN IT', label: 'Operating dashboard', desc: 'The whole business at a glance, running itself.' },
  { group: 'GROW IT', label: 'AI analyst', desc: 'Spots what is leaking and where the money is hiding.' },
  { group: 'GROW IT', label: 'Review engine', desc: 'Turns finished jobs into five-star reputation, automatically.' },
  { group: 'GROW IT', label: 'Repeat business', desc: 'Brings past customers back on their own.' },
  { group: 'ENJOY LIFE', label: 'Daily brief', desc: 'One morning read. Then your day is yours.' },
];

const TIMELINE: { n: string; h: string; b: string }[] = [
  { n: '01', h: 'A 30-minute call.', b: 'Free. We look at where the work is slipping and what it is costing you. You keep that read whether you hire us or not.' },
  { n: '02', h: 'Week one, we build.', b: 'Your new site and a rebuilt Google presence. You review, we launch.' },
  { n: '03', h: 'Week two, we go live.', b: 'The receptionist, booking, and CRM switch on. We wire up your calls and texts so nothing gets missed again.' },
  { n: '04', h: 'From then on, we run it.', b: 'Every morning you get one short brief. That is the only thing you have to read.' },
];

const SPEC: { group: string; items: string[] }[] = [
  {
    group: 'Get found',
    items: [
      'Custom, mobile-first website, built and hosted',
      'Google Business Profile rebuilt and optimized',
      'Local search and map-pack setup',
      'Name, address, number consistent everywhere',
      'Review and reputation foundation',
      'Tap-to-call and self-serve booking on every page',
    ],
  },
  {
    group: 'Run it',
    items: [
      'AI receptionist: answers every call and text, 24/7',
      'Quotes on the spot, jobs booked into your real calendar',
      'Self-serve online booking',
      'CRM: every customer, job, and conversation in one place',
      'Quotes sent and chased until they close',
      'Operating dashboard: the whole business at a glance',
      'One central inbox, off your personal email',
    ],
  },
  {
    group: 'Grow it',
    items: [
      'AI analyst: finds where money is leaking',
      'Review engine: finished jobs become five-star reviews',
      'Reactivation: past customers brought back on their own',
    ],
  },
  {
    group: 'Enjoy life',
    items: [
      'One short morning brief, every day',
      'Systems built for a clean sale or handoff (invite tier)',
      'We share the upside: 5% of new business (invite tier)',
    ],
  },
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
.hiw{background:#050506;color:#f5f5f7;}
.hiw .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.hiw .eyebrow{font-size:12.5px;font-weight:700;letter-spacing:.2em;color:#86868b;text-transform:uppercase;}
.hiw h1,.hiw h2,.hiw h3{font-weight:600;letter-spacing:-.03em;color:#f5f5f7;}

/* hero */
.hiw-hero{padding:clamp(120px,20vh,220px) 0 clamp(60px,8vw,100px);text-align:center;position:relative;overflow:hidden;}
.hiw-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 0%,rgba(14,165,233,.12),transparent 62%);pointer-events:none;}
.hiw-hero .wrap{position:relative;}
.hiw-hero h1{margin-top:16px;font-size:clamp(44px,7vw,92px);line-height:1.02;}
.hiw-hero p{margin:24px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.5;color:#c7ccd6;max-width:46ch;}
.hiw-hero .cta{margin-top:34px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.hiw-btn{display:inline-block;background:#f5f5f7;color:#050506;font-size:15px;font-weight:600;border-radius:999px;padding:14px 28px;text-decoration:none;transition:transform .3s ease;}
.hiw-btn:hover{transform:translateY(-1px);}
.hiw-btn.ghost{background:transparent;color:#f5f5f7;border:1px solid rgba(255,255,255,.28);}

/* sticky chapter rail */
.hiw-rail{position:sticky;top:0;z-index:40;background:rgba(5,5,6,.82);backdrop-filter:saturate(160%) blur(14px);-webkit-backdrop-filter:saturate(160%) blur(14px);border-bottom:1px solid rgba(255,255,255,.07);}
.hiw-rail .rail-in{display:flex;gap:clamp(14px,3vw,36px);justify-content:center;flex-wrap:wrap;padding:15px 20px;}
.hiw-rail a{font-size:13.5px;font-weight:600;color:#86868b;text-decoration:none;transition:color .3s ease;white-space:nowrap;}
.hiw-rail a.on{color:#f5f5f7;}
.hiw-rail a:hover{color:#c7ccd6;}
@media(max-width:640px){.hiw-rail .rail-in{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;}}

/* generic section */
.hiw-sec{padding:clamp(80px,12vw,150px) 0;}
.hiw-ch{font-size:12.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;}
.hiw-ch.cyan{color:#38bdf8;}.hiw-ch.teal{color:#22d3ee;}.hiw-ch.green{color:#34d399;}

/* model statement */
.hiw-model{text-align:center;}
.hiw-model h2{font-size:clamp(32px,5vw,64px);line-height:1.05;max-width:20ch;margin:0 auto;}
.hiw-model p{margin:26px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.55;color:#aeb4c0;max-width:52ch;}

/* split you / we */
.hiw-split h2{text-align:center;font-size:clamp(30px,4.6vw,56px);line-height:1.06;max-width:18ch;margin:0 auto;}
.hiw-cols{margin-top:clamp(44px,6vw,72px);display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.hiw-col{background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.015));border:1px solid rgba(255,255,255,.09);border-radius:22px;padding:clamp(26px,3.4vw,40px);}
.hiw-col .lbl{font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#86868b;}
.hiw-col.we .lbl{color:#34d399;}
.hiw-col ul{list-style:none;margin:20px 0 0;padding:0;display:flex;flex-direction:column;gap:14px;}
.hiw-col li{font-size:clamp(15px,1.7vw,18px);color:#d4d9e2;display:flex;align-items:flex-start;gap:11px;line-height:1.4;}
.hiw-col li::before{content:'';margin-top:8px;width:6px;height:6px;border-radius:50%;flex:0 0 auto;background:#5f6672;}
.hiw-col.we li::before{background:#34d399;}
.hiw-kick{text-align:center;margin-top:34px;font-size:clamp(16px,1.9vw,20px);color:#c7ccd6;}
@media(max-width:720px){.hiw-cols{grid-template-columns:1fr;}}

/* get found chapter */
.hiw-gf .blk{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,72px);align-items:center;margin-top:clamp(56px,7vw,90px);}
.hiw-gf .blk:nth-child(even) .txt{order:2;}
.hiw-gf .blk h3{font-size:clamp(26px,3.4vw,42px);line-height:1.08;max-width:16ch;}
.hiw-gf .blk p{margin-top:16px;font-size:clamp(16px,1.8vw,19px);line-height:1.55;color:#aeb4c0;max-width:40ch;}
.hiw-gf .viz{background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.09);border-radius:24px;padding:clamp(22px,3vw,32px);min-height:260px;display:flex;align-items:center;justify-content:center;}
@media(max-width:820px){.hiw-gf .blk{grid-template-columns:1fr;}.hiw-gf .blk:nth-child(even) .txt{order:0;}}

/* mock: site */
.mk-site{width:100%;max-width:340px;background:#0d1218;border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden;}
.mk-site .bar{display:flex;gap:6px;padding:11px 14px;background:#11161d;border-bottom:1px solid rgba(255,255,255,.06);}
.mk-site .bar i{width:10px;height:10px;border-radius:50%;background:#333a44;}
.mk-site .body{padding:22px 20px;}
.mk-site .body h4{font-size:20px;font-weight:600;letter-spacing:-.02em;color:#fff;line-height:1.15;}
.mk-site .body p{margin-top:8px;font-size:12.5px;color:#9aa2b0;}
.mk-site .row{margin-top:16px;display:flex;align-items:center;gap:12px;}
.mk-site .book{background:#10b981;color:#04150e;font-size:12px;font-weight:700;padding:8px 15px;border-radius:999px;}
.mk-site .st{font-size:11.5px;color:#ffd479;}
/* mock: map */
.mk-map{width:100%;max-width:340px;display:flex;flex-direction:column;gap:10px;}
.mk-map .r{display:flex;align-items:center;gap:12px;background:#0d1218;border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:13px 15px;}
.mk-map .r.first{border-color:rgba(52,211,153,.45);box-shadow:0 8px 30px -14px rgba(16,185,129,.5);}
.mk-map .pin{width:26px;height:26px;border-radius:8px;background:#1b2a24;color:#34d399;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex:0 0 auto;}
.mk-map .nm{font-size:14px;font-weight:600;color:#e2e7ef;}
.mk-map .sub{font-size:11.5px;color:#8a92a0;margin-top:2px;}
.mk-map .r.dim{opacity:.5;}
.mk-map .tag{margin-left:auto;font-size:10px;font-weight:700;color:#04150e;background:#34d399;border-radius:999px;padding:3px 9px;}
/* mock: reviews */
.mk-rev{width:100%;max-width:340px;}
.mk-rev .big{font-size:15px;color:#e2e7ef;font-weight:600;}
.mk-rev .big b{font-size:30px;}
.mk-rev .big .s{color:#ffd479;}
.mk-rev .q{border-top:1px solid rgba(255,255,255,.08);padding:13px 0;font-size:13px;color:#c3c9d4;line-height:1.45;}
.mk-rev .q .s{color:#ffd479;font-size:11px;}
.mk-rev .q .w{color:#86868b;margin-top:3px;font-size:11.5px;}

/* run the day — tool grid */
.hiw-run{text-align:center;}
.hiw-run h2{font-size:clamp(30px,4.6vw,56px);line-height:1.06;max-width:16ch;margin:0 auto;}
.hiw-run .sub{margin:22px auto 0;font-size:clamp(16px,1.9vw,20px);color:#aeb4c0;max-width:46ch;}
.hiw-grid{margin-top:clamp(44px,6vw,68px);display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:left;}
.hiw-tool{background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.015));border:1px solid rgba(255,255,255,.09);border-radius:18px;padding:24px 22px;transition:border-color .3s ease,transform .3s ease,background .3s ease;}
.hiw-tool:hover{transform:translateY(-2px);border-color:rgba(56,189,248,.35);background:linear-gradient(180deg,rgba(56,189,248,.06),rgba(255,255,255,.02));}
.hiw-tool .g{font-size:11px;font-weight:700;letter-spacing:.14em;color:#38bdf8;}
.hiw-tool .l{margin-top:9px;font-size:19px;font-weight:600;letter-spacing:-.02em;color:#f5f5f7;}
.hiw-tool .d{margin-top:8px;font-size:14px;line-height:1.5;color:#9aa0ab;}
.hiw-run .never{margin-top:clamp(38px,5vw,54px);font-size:clamp(16px,1.9vw,20px);color:#c7ccd6;}
@media(max-width:900px){.hiw-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.hiw-grid{grid-template-columns:1fr;}}

/* enjoy strip */
.hiw-enjoy{text-align:center;}
.hiw-enjoy h2{font-size:clamp(30px,4.6vw,56px);line-height:1.06;max-width:14ch;margin:0 auto;}
.hiw-enjoy p{margin:24px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.55;color:#aeb4c0;max-width:50ch;}
.hiw-enjoy .door{display:inline-block;margin-top:26px;color:#38bdf8;font-weight:600;font-size:15px;text-decoration:none;}

/* timeline */
.hiw-tl{text-align:center;}
.hiw-tl h2{font-size:clamp(30px,4.6vw,52px);line-height:1.06;max-width:18ch;margin:0 auto;}
.hiw-steps{margin-top:clamp(48px,6vw,72px);display:grid;grid-template-columns:repeat(4,1fr);gap:18px;text-align:left;}
.hiw-step{position:relative;padding-top:26px;}
.hiw-step::before{content:'';position:absolute;top:5px;left:0;right:0;height:2px;background:linear-gradient(90deg,rgba(34,211,238,.5),rgba(34,211,238,.08));}
.hiw-step .n{font-size:12px;font-weight:700;letter-spacing:.14em;color:#22d3ee;}
.hiw-step h4{margin-top:12px;font-size:clamp(18px,2vw,22px);font-weight:600;letter-spacing:-.02em;color:#f5f5f7;}
.hiw-step p{margin-top:10px;font-size:14.5px;line-height:1.5;color:#9aa0ab;}
@media(max-width:820px){.hiw-steps{grid-template-columns:1fr 1fr;}}
@media(max-width:520px){.hiw-steps{grid-template-columns:1fr;}}

/* spec sheet */
.hiw-spec h2{text-align:center;font-size:clamp(30px,4.6vw,52px);margin:0 auto;}
.hiw-spec .sub{text-align:center;margin:16px auto 0;color:#86868b;font-size:16px;}
.hiw-spec .cols{margin-top:clamp(44px,6vw,64px);display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(24px,3vw,40px);}
.hiw-spec .grp{font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#38bdf8;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.1);}
.hiw-spec ul{list-style:none;margin:16px 0 0;padding:0;display:flex;flex-direction:column;gap:14px;}
.hiw-spec li{font-size:14.5px;line-height:1.45;color:#c7ccd6;display:flex;gap:9px;align-items:flex-start;}
.hiw-spec li svg{flex:0 0 auto;margin-top:2px;}
@media(max-width:900px){.hiw-spec .cols{grid-template-columns:1fr 1fr;}}
@media(max-width:560px){.hiw-spec .cols{grid-template-columns:1fr;}}

/* faq */
.hiw-faq h2{text-align:center;font-size:clamp(30px,4.6vw,52px);margin:0 auto clamp(40px,5vw,56px);}
.hiw-faq .list{max-width:760px;margin:0 auto;}
.hiw-q{border-bottom:1px solid rgba(255,255,255,.1);}
.hiw-q button{width:100%;background:transparent;border:0;color:#f5f5f7;font-family:inherit;font-size:clamp(16px,1.9vw,20px);font-weight:600;letter-spacing:-.01em;text-align:left;padding:22px 40px 22px 0;cursor:pointer;position:relative;}
.hiw-q button .pl{position:absolute;right:2px;top:50%;transform:translateY(-50%);font-size:22px;font-weight:400;color:#86868b;transition:transform .3s ease,color .3s ease;line-height:1;}
.hiw-q.open button .pl{transform:translateY(-50%) rotate(45deg);color:#38bdf8;}
.hiw-q .ans{max-height:0;overflow:hidden;transition:max-height .35s ease;}
.hiw-q.open .ans{max-height:220px;}
.hiw-q .ans p{padding:0 0 22px;margin:0;font-size:16px;line-height:1.6;color:#aeb4c0;max-width:62ch;}

/* closer */
.hiw-close{text-align:center;padding:clamp(96px,13vw,160px) 0;position:relative;overflow:hidden;}
.hiw-close::before{content:'';position:absolute;inset:0;background:radial-gradient(60% 60% at 50% 100%,rgba(16,185,129,.16),transparent 62%);pointer-events:none;}
.hiw-close .wrap{position:relative;}
.hiw-close h2{font-size:clamp(34px,5.4vw,74px);line-height:1.03;max-width:16ch;margin:0 auto;}
.hiw-close .price{margin:20px auto 0;font-size:clamp(16px,1.9vw,20px);color:#c7ccd6;}
.hiw-close .price a{color:#38bdf8;text-decoration:none;font-weight:600;}
.hiw-close .cta{margin-top:34px;}
`;

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth={2.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
    </svg>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState('model');
  const [openF, setOpenF] = useState<number | null>(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
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
          <p>
            Not a tool you have to learn. An operator that runs the front of your business, so you
            can go do the work. Here is every part, step by step.
          </p>
          <div className="cta">
            <a className="hiw-btn" href={START_LINK}>Pick a time</a>
            <a className="hiw-btn ghost" href="#included">See what is included</a>
          </div>
        </div>
      </header>

      {/* STICKY CHAPTER RAIL */}
      <nav className="hiw-rail">
        <div className="rail-in">
          {CHAPTERS.map((c) => (
            <a key={c.id} href={`#${c.id}`} className={active === c.id ? 'on' : ''}>{c.label}</a>
          ))}
        </div>
      </nav>

      {/* THE MODEL */}
      <section className="hiw-sec hiw-model" id="model">
        <div className="wrap">
          <h2>StayBookt is not software you run. It is a team that runs it for you.</h2>
          <p>
            Most tools hand you more work: another login, another thing to check at night. We do the
            opposite. The software does the job in the background. You get your time back, not a
            second job.
          </p>
        </div>
      </section>

      {/* YOU / WE */}
      <section className="hiw-sec hiw-split">
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
          {GETFOUND.map((blk) => (
            <div className="blk" key={blk.h}>
              <div className="txt">
                <h3>{blk.h}</h3>
                <p>{blk.b}</p>
              </div>
              <div className="viz">
                {blk.kind === 'site' && (
                  <div className="mk-site">
                    <div className="bar"><i /><i /><i /></div>
                    <div className="body">
                      <h4>Licensed electricians. Same-day service.</h4>
                      <p>Panel upgrades, EV chargers, emergency calls.</p>
                      <div className="row"><span className="book">Book now</span><span className="st">★★★★★ 4.9</span></div>
                    </div>
                  </div>
                )}
                {blk.kind === 'map' && (
                  <div className="mk-map">
                    <div className="r first"><span className="pin">1</span><div><div className="nm">Top Choice Electrical</div><div className="sub">★ 4.9 · Open now</div></div><span className="tag">You</span></div>
                    <div className="r dim"><span className="pin">2</span><div><div className="nm">City Wide Electric</div><div className="sub">★ 4.1</div></div></div>
                    <div className="r dim"><span className="pin">3</span><div><div className="nm">Rapid Volt</div><div className="sub">★ 4.0</div></div></div>
                  </div>
                )}
                {blk.kind === 'rev' && (
                  <div className="mk-rev">
                    <div className="big"><b>4.9</b> <span className="s">★★★★★</span> · 312 reviews</div>
                    <div className="q"><span className="s">★★★★★</span> Booked online at 9 PM, fixed by noon. Unreal.<div className="w">Sandra M.</div></div>
                    <div className="q"><span className="s">★★★★★</span> Texted me a quote in minutes. No chasing.<div className="w">R. Okafor</div></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RUN THE DAY */}
      <section className="hiw-sec hiw-run" id="runday">
        <div className="wrap">
          <div className="hiw-ch teal">Run the day</div>
          <h2 style={{ marginTop: 14 }}>Then we run the day. Every part of it.</h2>
          <p className="sub">This is the front office, working while you are on a job or asleep.</p>
          <div className="hiw-grid">
            {TOOLS.map((t) => (
              <div className="hiw-tool" key={t.label}>
                <div className="g">{t.group}</div>
                <div className="l">{t.label}</div>
                <div className="d">{t.desc}</div>
              </div>
            ))}
          </div>
          <p className="never">Answered in seconds. 24 hours a day. Whether you pick up or not.</p>
        </div>
      </section>

      {/* ENJOY LIFE */}
      <section className="hiw-sec hiw-enjoy" id="enjoy">
        <div className="wrap">
          <div className="hiw-ch green">Enjoy life</div>
          <h2 style={{ marginTop: 14 }}>The point of all of it.</h2>
          <p>
            When the front office runs itself, two things happen. You get your nights and weekends
            back. And the business becomes something you can sell or hand down, because it no longer
            lives only in your head.
          </p>
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

      {/* WHAT IS INCLUDED */}
      <section className="hiw-sec hiw-spec" id="included">
        <div className="wrap">
          <h2>Everything included.</h2>
          <p className="sub">All of it, run for you. No add-ons, no upsells.</p>
          <div className="cols">
            {SPEC.map((g) => (
              <div key={g.group}>
                <div className="grp">{g.group}</div>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}><Check /> {it}</li>
                  ))}
                </ul>
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
                  {f.q}
                  <span className="pl">+</span>
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

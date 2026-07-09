'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type Tool = { k: string; group: string; label: string; desc: string };

const TOOLS: Tool[] = [
  { k: 'site', group: 'GET FOUND', label: 'Your website', desc: 'Fast, ranks on Google, and turns visitors into booked jobs.' },
  { k: 'reception', group: 'GET FOUND', label: 'AI receptionist', desc: 'Answers, quotes, and books every call and text, day or night.' },
  { k: 'booking', group: 'RUN IT', label: 'Self-serve booking', desc: 'Customers book themselves straight into your real calendar.' },
  { k: 'crm', group: 'RUN IT', label: 'CRM', desc: 'Every customer, job, and conversation in one place.' },
  { k: 'quotes', group: 'RUN IT', label: 'Quotes', desc: 'Send it fast, chase it automatically, close it.' },
  { k: 'dash', group: 'RUN IT', label: 'Operating dashboard', desc: 'The whole business at a glance, running itself.' },
  { k: 'analyst', group: 'GROW IT', label: 'AI analyst', desc: 'Spots what is leaking and where the money is hiding.' },
  { k: 'reviews', group: 'GROW IT', label: 'Review engine', desc: 'Turns finished jobs into five-star reputation, automatically.' },
  { k: 'repeat', group: 'GROW IT', label: 'Repeat business', desc: 'Brings past customers back on their own.' },
  { k: 'brief', group: 'ENJOY LIFE', label: 'Daily brief', desc: 'One morning read. Then your day is yours.' },
];

export default function CloserLook() {
  const [active, setActive] = useState('site');
  const paused = useRef(false);

  useEffect(() => {
    const order = TOOLS.map((t) => t.k);
    const id = setInterval(() => {
      if (paused.current) return;
      setActive((prev) => order[(order.indexOf(prev) + 1) % order.length]);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const pick = (k: string) => {
    paused.current = true;
    setActive(k);
  };

  const P = (k: string, children: ReactNode) => (
    <div className={`vpanel${active === k ? ' on' : ''}`} data-k={k}>
      {children}
    </div>
  );

  return (
    <section className="sb-clook sbwrap" onMouseEnter={() => { paused.current = true; }}>
      <div className="wrap">
        <div className="cl-head">
          <div className="kicker">TAKE A CLOSER LOOK</div>
          <h2>The whole platform. One screen.</h2>
          <p>Ten tools working together. Click through and watch each one run.</p>
        </div>

        <div className="cl-stage">
          <div className="cl-menu">
            {TOOLS.map((t) => (
              <button key={t.k} type="button" className={`cli${active === t.k ? ' on' : ''}`} onClick={() => pick(t.k)}>
                <span className="ck">{t.group}</span>
                <span className="cl-lbl">{t.label}</span>
                <span className="cl-plus">+</span>
                <span className="cl-desc">{t.desc}</span>
              </button>
            ))}
          </div>

          <div className="cl-viz">
            {P('site',
              <div className="appwin">
                <div className="site-hero">
                  <div className="sh-nav"><b>Top Choice Electrical</b><span>Services · Reviews · Book</span></div>
                  <h5>Licensed electricians.<br />Same-day service.</h5>
                  <p>Panel upgrades, EV chargers, emergency calls. Done right, done today.</p>
                  <div className="sh-row"><span className="sh-btn">Book now</span><span className="sh-stars">★★★★★ 4.9 · 312 reviews</span></div>
                </div>
              </div>,
            )}

            {P('reception',
              <div className="phone"><div className="notch" /><div className="screen">
                <div className="ph-bar"><div className="ph-ava">TC</div><div><div className="ph-name">Top Choice Electrical</div><div className="ph-sub">StayBookt receptionist</div></div></div>
                <div className="ph-body">
                  <div className="bub sys">Missed call · (416) 555-0192</div>
                  <div className="bub us">Hi, this is Top Choice. Sorry we missed you! What can we help with?</div>
                  <div className="bub them">Panel keeps tripping. Someone today?</div>
                  <div className="bub us">We can. 2–4 PM is open today. Book it?</div>
                  <div className="bub them">Yes please</div>
                  <div className="bub us ok">Booked. We will text when we are on the way.</div>
                </div>
                <div className="ph-tag">Answered · quoted · booked · hands-free</div>
              </div></div>,
            )}

            {P('booking',
              <div className="appwin">
                <div className="aw-top"><span className="aw-ic" />Book a visit</div>
                <div className="aw-body">
                  <div className="bk-days">
                    <div className="d">Mon<b>7</b></div><div className="d on">Tue<b>8</b></div><div className="d">Wed<b>9</b></div><div className="d">Thu<b>10</b></div><div className="d">Fri<b>11</b></div>
                  </div>
                  <div className="bk-slots">
                    <div className="s x">8–10</div><div className="s">10–12</div><div className="s x">12–2</div><div className="s sel">2–4 PM</div><div className="s">4–6</div><div className="s">6–8</div>
                  </div>
                  <div className="bk-conf">Booked: Tue 2–4 PM. Added to your calendar and the customer&apos;s.</div>
                </div>
              </div>,
            )}

            {P('crm',
              <div className="appwin">
                <div className="aw-top"><span className="aw-ic" />Customer</div>
                <div className="aw-body">
                  <div className="crm-hd"><div className="av">SM</div><div><div className="nm">Sandra Mitchell</div><div className="mt">(416) 555-0192 · Riverdale</div></div></div>
                  <div className="crm-tags"><span>Repeat</span><span>Panel work</span><span>Referral source</span></div>
                  <div className="crm-row"><span>Panel upgrade</span><span className="amt">$2,400</span></div>
                  <div className="crm-row"><span>EV charger install</span><span className="amt">$1,850</span></div>
                  <div className="crm-row"><span>Emergency call-out</span><span className="amt">$390</span></div>
                  <div className="crm-foot">Last contact 3 days ago · $6,240 lifetime · 2 referrals</div>
                </div>
              </div>,
            )}

            {P('quotes',
              <div className="appwin">
                <div className="aw-top"><span className="aw-ic" />Quote #1042<span className="aw-r">● Auto-chasing</span></div>
                <div className="aw-body">
                  <div className="q-row"><span className="qd">200A panel upgrade</span><span className="qp">$1,800</span></div>
                  <div className="q-row"><span className="qd">Permit + inspection</span><span className="qp">$420</span></div>
                  <div className="q-row"><span className="qd">Labour (4 hrs)</span><span className="qp">$180</span></div>
                  <div className="q-total"><span>Total</span><span>$2,400</span></div>
                  <div className="q-status"><span className="qs on">Sent</span><span className="qs on">Viewed 2×</span><span className="qs on">Reminder sent</span></div>
                </div>
              </div>,
            )}

            {P('dash',
              <div className="browser" style={{ width: 440, maxWidth: '92%' }}>
                <div className="bz-bar"><span className="bz-dot" style={{ background: '#ff5f57' }} /><span className="bz-dot" style={{ background: '#febc2e' }} /><span className="bz-dot" style={{ background: '#28c840' }} /><span className="bz-url">staybookt.com/ops</span></div>
                <div className="aw-body">
                  <div className="stats">
                    <div className="stat"><div className="lbl">Booked this week</div><div className="val">14</div></div>
                    <div className="stat"><div className="lbl">Revenue MTD</div><div className="val">$38.4k <small>▲12%</small></div></div>
                    <div className="stat"><div className="lbl">Quotes out</div><div className="val">6</div></div>
                    <div className="stat"><div className="lbl">Reviews</div><div className="val">9 <small>★</small></div></div>
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div className="cn">Today · 3 jobs</div><div className="cm">First at 8:30 AM · all confirmed</div></div><span className="pill g">On track</span></div>
                    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div className="cn">M. Lowe · 2–4 PM</div><div className="cm">Panel upgrade · Riverdale</div></div><span className="pill">Next up</span></div>
                  </div>
                </div>
              </div>,
            )}

            {P('analyst',
              <div className="appwin">
                <div className="aw-top"><span className="aw-ic" />StayBookt Analyst</div>
                <div className="aw-body">
                  <div className="an-ins">You are losing about <span className="hl">$3,100 a month</span> to calls that come in after 6 PM.</div>
                  <div className="an-chart">
                    <div className="b" style={{ height: '30%' }} /><div className="b" style={{ height: '45%' }} /><div className="b" style={{ height: '38%' }} /><div className="b" style={{ height: '55%' }} /><div className="b hot" style={{ height: '82%' }} /><div className="b hot" style={{ height: '95%' }} /><div className="b hot" style={{ height: '70%' }} />
                  </div>
                  <div className="sub" style={{ marginBottom: 12 }}>Missed calls by hour · 6–9 PM is your leak.</div>
                  <div className="an-fix">Fix in place: after-hours receptionist recovered 22 calls last month.</div>
                </div>
              </div>,
            )}

            {P('reviews',
              <div className="appwin">
                <div className="aw-top"><span className="aw-ic" />Reputation<span className="aw-r">+9 this month</span></div>
                <div className="aw-body">
                  <div className="rv-big"><b>4.9</b> <span className="st">★★★★★</span> · 312 reviews</div>
                  <div className="rv-item"><span className="st">★★★★★</span> Booked online at 9 PM, fixed by noon. Unreal.<div className="who">— Sandra M.</div></div>
                  <div className="rv-item"><span className="st">★★★★★</span> Texted me a quote in minutes. No chasing.<div className="who">— R. Okafor</div></div>
                  <div className="rv-item"><span className="st">★★★★★</span> Showed up on time and did it right.<div className="who">— T. Bell</div></div>
                </div>
              </div>,
            )}

            {P('repeat',
              <div className="appwin">
                <div className="aw-top"><span className="aw-ic" />Bring them back</div>
                <div className="aw-body">
                  <div className="rp-camp">Winter tune-up reminder</div>
                  <div className="rp-meta">Sent automatically to 214 past customers.</div>
                  <div className="rp-bar"><i /></div>
                  <div className="rp-res"><span className="sub">18 rebooked</span><span><b>$9,400</b> recovered</span></div>
                </div>
              </div>,
            )}

            {P('brief',
              <div className="appwin brief-l">
                <div className="aw-top"><span className="aw-ic" />Your morning brief<span className="aw-r" style={{ color: '#86868b' }}>Tue, 7:00 AM</span></div>
                <div className="aw-body">
                  <div className="bi"><span className="bic" style={{ background: '#0ea5e9' }} /><div><b>3 jobs today.</b> First at 8:30, all confirmed.</div></div>
                  <div className="bi"><span className="bic" style={{ background: '#06b6d4' }} /><div><b>2 quotes open.</b> We are chasing both.</div></div>
                  <div className="bi"><span className="bic" style={{ background: '#14b8a6' }} /><div><b>$4,200 collected</b> yesterday.</div></div>
                  <div className="bi"><span className="bic" style={{ background: '#10b981' }} /><div><b>New 5★ review</b> from Sandra M.</div></div>
                  <div className="sub" style={{ marginTop: 14 }}>That is it. Go run your day. Or don&apos;t.</div>
                </div>
              </div>,
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

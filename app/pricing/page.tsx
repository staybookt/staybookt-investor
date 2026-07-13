import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import { FiveSalaries, ValueShare } from '@/components/PricingScenes';
import { START_LINK } from '@/lib/site';

const SHARE =
  'One plan. $199 a month, nothing upfront, ninety days to change your mind. It is not a discount on a receptionist. It is the five people you cannot hire.';

export const metadata = {
  title: 'Pricing',
  description: SHARE,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/pricing',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Pricing · StayBookt', description: SHARE },
};

const INCLUDED = [
  { t: 'A website that actually converts', b: 'Fast, built for a phone, hosted for you. Yours to keep.' },
  { t: 'Found on Google, the map, and AI', b: 'Your listing rebuilt, ranked locally, reviews building every week.' },
  { t: 'Every call and text answered', b: '24/7, in your voice. AI for the everyday, a real person for the unusual.' },
  { t: 'Jobs booked, quotes chased', b: 'Onto your calendar, confirmed, reminded. Every quote followed until yes or no.' },
  { t: 'Past customers brought back', b: 'Reviews, referrals, and the follow-up work booked before they drift.' },
  { t: 'One short brief each morning', b: 'Thirty seconds. No dashboard. No software to learn.' },
];

const THRESHOLDS = [
  {
    h: 'The business can run a week without you.',
    p: 'Calls answered, jobs booked, quotes chased, whether you are on the tools, on a beach, or in a hospital bed. This is the one that actually moves the number.',
  },
  {
    h: 'The revenue repeats.',
    p: 'Service agreements and returning customers, not a pile of one-off jobs. A buyer pays a premium for revenue that shows up again next year.',
  },
  {
    h: 'You want it.',
    p: 'Plenty of owners never want to sell or step back, and that is a perfectly good answer. The plan stays exactly the same, at exactly the same price.',
  },
];

const CSS = `
.prc{background:#fff;color:var(--v4-ink);}
.prc .wrap{width:100%;max-width:1100px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.prc .narrow{max-width:820px;margin:0 auto;}
.prc .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.prc h1,.prc h2,.prc h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.prc-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:16px 32px;text-decoration:none;transition:transform .3s ease;}
.prc-btn:hover{transform:translateY(-1px);}
.prc-btn.w{background:#fff;color:#050506;}

/* ===== 1. HERO — the number is the hero. No aurora, no gradient headline. ===== */
.prc-hero{position:relative;background:#050506;text-align:center;padding:clamp(150px,20vh,220px) 0 clamp(80px,10vw,120px);overflow:hidden;}
.prc-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(58% 48% at 50% 2%,rgba(16,185,129,.14),transparent 64%);pointer-events:none;}
.prc-hero .wrap{position:relative;z-index:1;}
.prc-hero .eyebrow{color:#c9cdd6;}
.prnum{display:flex;align-items:flex-start;justify-content:center;gap:6px;margin-top:20px;color:#fff;font-weight:700;letter-spacing:-.05em;line-height:.9;font-size:clamp(84px,15vw,200px);font-variant-numeric:tabular-nums;}
.prnum .d{font-size:.42em;font-weight:600;margin-top:.14em;color:#9aa0ab;}
.prnum .per{align-self:flex-end;margin-bottom:.16em;margin-left:10px;font-size:.14em;font-weight:600;letter-spacing:0;color:#9aa0ab;}
.prc-hero h1{margin-top:6px;font-size:clamp(34px,5.2vw,70px);line-height:1.02;color:#fff;}
.prc-hero .lead{margin:22px auto 0;font-size:clamp(17px,2vw,22px);line-height:1.5;color:#aeb4c0;max-width:44ch;}
.prfacts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;max-width:820px;margin:clamp(38px,5vw,52px) auto 0;text-align:left;}
@media(max-width:720px){.prfacts{grid-template-columns:1fr;}}
.prfacts>div{border-left:2px solid rgba(255,255,255,.16);padding:4px 0 4px 16px;}
.prfacts b{display:block;font-size:15px;font-weight:600;color:#fff;}
.prfacts span{display:block;margin-top:5px;font-size:14px;line-height:1.45;color:#98a0ae;}
.prlink{margin-top:clamp(32px,4vw,42px);font-size:15px;}
.prlink a{color:#5eead4;text-decoration:none;font-weight:600;}
.prlink a:hover{text-decoration:underline;}

/* ===== 2. THE LEDGER ===== */
.prc-led{background:var(--v4-cream);padding:clamp(90px,12vw,150px) 0;}
.prc-led .hd{max-width:760px;}
.prc-led h2{margin-top:14px;font-size:clamp(32px,5vw,64px);line-height:1.0;max-width:15ch;}
.prc-led .hd p{margin-top:22px;font-size:clamp(17px,1.95vw,21px);line-height:1.6;color:#52565e;max-width:52ch;}
.prc-led .stage{margin-top:clamp(40px,5vw,60px);max-width:880px;}

/* ===== 3. INCLUDED ===== */
.prc-inc{background:#050506;padding:clamp(90px,12vw,150px) 0;}
.prc-inc .eyebrow{color:#86868b;}
.prc-inc h2{margin-top:14px;font-size:clamp(30px,4.4vw,54px);line-height:1.04;color:#fff;max-width:16ch;}
.prc-inc .grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,3vw,36px) clamp(30px,5vw,64px);margin-top:clamp(40px,5vw,58px);}
@media(max-width:760px){.prc-inc .grid{grid-template-columns:1fr;}}
.prc-inc .it{display:grid;grid-template-columns:22px minmax(0,1fr);gap:14px;align-items:start;padding:18px 0;border-top:1px solid rgba(255,255,255,.09);}
.prc-inc .ck{width:22px;height:22px;border-radius:50%;background:rgba(16,185,129,.16);display:flex;align-items:center;justify-content:center;margin-top:2px;}
.prc-inc .it b{display:block;font-size:16.5px;font-weight:600;color:#f5f5f7;letter-spacing:-.01em;}
.prc-inc .it span{display:block;margin-top:6px;font-size:14.5px;line-height:1.5;color:#9aa0ab;}
.prc-inc .more{margin-top:clamp(32px,4vw,44px);font-size:15px;}
.prc-inc .more a{color:#5eead4;text-decoration:none;font-weight:600;}

/* ===== 4. GUARANTEE ===== */
.prc-gtee{background:#fff;padding:clamp(100px,13vw,170px) 0;text-align:center;}
.prc-gtee h2{font-size:clamp(34px,5.6vw,76px);line-height:1.0;max-width:14ch;margin:14px auto 0;}
.prc-gtee p{margin:26px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.6;color:#52565e;max-width:56ch;}

/* ===== 5. THE INVITATION ===== */
.prc-inv{background:#050506;padding:clamp(90px,12vw,150px) 0;}
.prc-inv .eyebrow{color:#86868b;}
.prc-inv h2{margin-top:14px;font-size:clamp(30px,4.6vw,58px);line-height:1.03;color:#fff;max-width:18ch;}
.prc-inv .p{margin-top:22px;font-size:clamp(17px,1.95vw,21px);line-height:1.6;color:#9ba2ae;max-width:56ch;}
.prc-inv ol{list-style:none;margin:clamp(38px,5vw,54px) 0 0;padding:0;max-width:800px;}
.prc-inv li{display:grid;grid-template-columns:38px minmax(0,1fr);gap:16px;padding:26px 0;border-top:1px solid rgba(255,255,255,.1);}
.prc-inv li .n{font-size:13px;font-weight:700;letter-spacing:.1em;color:#5c6470;padding-top:6px;}
.prc-inv li h3{font-size:clamp(19px,2.2vw,26px);line-height:1.25;color:#fff;}
.prc-inv li p{margin-top:10px;font-size:16px;line-height:1.6;color:#9ba2ae;max-width:54ch;}
.prc-inv .note{margin-top:clamp(34px,4vw,46px);padding-left:22px;border-left:3px solid #f59e0b;font-size:clamp(18px,2.1vw,24px);font-weight:600;letter-spacing:-.02em;line-height:1.35;color:#fff;max-width:44ch;}

/* ===== 6. VALUE SHARE ===== */
.prc-vs{background:var(--v4-cream);padding:clamp(90px,12vw,150px) 0;}
.prc-vs .hd{max-width:760px;}
.prc-vs h2{margin-top:14px;font-size:clamp(30px,4.6vw,58px);line-height:1.03;max-width:16ch;}
.prc-vs .hd p{margin-top:22px;font-size:clamp(17px,1.95vw,21px);line-height:1.6;color:#52565e;max-width:56ch;}
.prc-vs .stage{margin-top:clamp(40px,5vw,58px);max-width:880px;}
.prc-vs .cmp{margin-top:clamp(34px,4vw,46px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;max-width:880px;}
@media(max-width:760px){.prc-vs .cmp{grid-template-columns:1fr;}}
.prc-vs .cmp>div{background:#fff;border:1px solid #e9e9e5;border-radius:18px;padding:20px 22px;}
.prc-vs .cmp .who{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9298a1;}
.prc-vs .cmp .amt{margin-top:8px;font-size:clamp(20px,2.4vw,26px);font-weight:700;letter-spacing:-.025em;color:var(--v4-ink);}
.prc-vs .cmp .of{margin-top:6px;font-size:14px;line-height:1.5;color:#6b7280;}
.prc-vs .cmp .us{border-color:rgba(16,185,129,.4);box-shadow:0 20px 44px -30px rgba(16,185,129,.6);}
.prc-vs .cmp .us .amt{color:#059669;}

/* ===== 7. CLOSER ===== */
.prc-close{background:#050506;text-align:center;padding:clamp(100px,14vw,180px) 0;}
.prc-close h2{font-size:clamp(32px,5vw,66px);line-height:1.02;color:#fff;max-width:16ch;margin:0 auto;}
.prc-close p{margin:22px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.55;color:#aeb4c0;max-width:46ch;}
.prc-close .cta{margin-top:36px;}
`;

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={3.2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <main className="prc">
      <style>{CSS}</style>
      <Nav />

      {/* 1 — THE NUMBER */}
      <header className="prc-hero">
        <div className="wrap">
          <div className="eyebrow">Pricing</div>
          <div className="prnum">
            <span className="d">$</span>199
            <span className="per">a month</span>
          </div>
          <h1>Nothing upfront.</h1>
          <p className="lead">
            No build fee. No setup fee. No menu. One plan gets you found and runs your whole front
            office, and you have ninety days to change your mind.
          </p>
          <div className="prfacts">
            <div>
              <b>Nothing to pay to start</b>
              <span>We go to work before you have paid us a dollar.</span>
            </div>
            <div>
              <b>Ninety-day guarantee</b>
              <span>If we have not delivered, we refund every month you paid.</span>
            </div>
            <div>
              <b>The website is yours</b>
              <span>Yours to keep, even if you walk away.</span>
            </div>
          </div>
          <p className="prlink">
            <a href="/whats-included">See everything that is included &rarr;</a>
          </p>
        </div>
      </header>

      {/* 2 — THE LEDGER: the five salaries, counted out */}
      <section className="prc-led">
        <div className="wrap">
          <div className="hd">
            <div className="eyebrow">What you are actually buying</div>
            <h2>It was never software. It was five salaries.</h2>
            <p>
              A big company answers every call, books every job, chases every quote, earns every
              review, and reads the numbers back. Not because they are smarter. Because five people
              are paid to. You are doing all five jobs yourself, at nine at night. Here is what those
              five people cost.
            </p>
          </div>
          <div className="stage">
            <FiveSalaries />
          </div>
        </div>
      </section>

      {/* 3 — WHAT THE PLAN IS */}
      <section className="prc-inc">
        <div className="wrap">
          <div className="eyebrow">The plan</div>
          <h2>One plan. All of it.</h2>
          <div className="grid">
            {INCLUDED.map((i) => (
              <div className="it" key={i.t}>
                <span className="ck"><Check /></span>
                <div>
                  <b>{i.t}</b>
                  <span>{i.b}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="more">
            <a href="/whats-included">The full list, including what we do not do &rarr;</a>
          </p>
        </div>
      </section>

      {/* 4 — THE GUARANTEE */}
      <section className="prc-gtee">
        <div className="wrap narrow">
          <div className="eyebrow">Our guarantee</div>
          <h2>Ninety days to change your mind.</h2>
          <p>
            Give us ninety days. If we have not answered your calls, booked your jobs, and shown you
            the work in black and white, say the word and we refund every month you paid. No forms,
            no argument. The website is yours to keep either way. We ask for the year because that is
            how long it takes to build something worth keeping, not because we need you locked in.
          </p>
        </div>
      </section>

      {/* 5 — THE INVITATION */}
      <section className="prc-inv">
        <div className="wrap">
          <div className="eyebrow">Enjoy Life &middot; by invitation</div>
          <h2>&ldquo;By invitation&rdquo; is not a velvet rope.</h2>
          <p className="p">
            It is a threshold, and it costs nothing extra. Enjoy Life only works when there is
            actually something worth selling, and after a year of us running your front office there
            usually is. We are the ones who have to earn it. Here is what has to be true before we
            will raise it with you.
          </p>
          <ol>
            {THRESHOLDS.map((t, i) => (
              <li key={t.h}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{t.h}</h3>
                  <p>{t.p}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="note">
            You will never have to ask for it. If you get there, we will bring it up. If the year
            does not get you there, we will tell you that too.
          </div>
        </div>
      </section>

      {/* 6 — THE VALUE SHARE */}
      <section className="prc-vs">
        <div className="wrap">
          <div className="hd">
            <div className="eyebrow">How the value share works</div>
            <h2>We only get paid if you actually get free.</h2>
            <p>
              On day one we agree what the business is worth, independently and in writing. That is
              the baseline. Then we go to work on the things that move it. When you sell, hand it on,
              or settle up, we take twenty percent of the increase above that baseline, and nothing
              else. Drag it and see.
            </p>
          </div>

          <div className="stage">
            <ValueShare />
          </div>

          <div className="cmp">
            <div>
              <div className="who">A broker</div>
              <div className="amt">8&ndash;12%</div>
              <div className="of">Of your entire sale price, for showing up at the end.</div>
            </div>
            <div>
              <div className="who">A franchise</div>
              <div className="amt">6%</div>
              <div className="of">Of every dollar you earn, forever. And your name with it.</div>
            </div>
            <div className="us">
              <div className="who">StayBookt</div>
              <div className="amt">20% of the increase</div>
              <div className="of">Nothing if the number does not move. Your name stays yours.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — CLOSER */}
      <section className="prc-close">
        <div className="wrap">
          <h2>Not sure it is for you?</h2>
          <p>
            That is what the call is for. Thirty minutes with a founder, no pitch deck, and we tell
            you straight whether it is a fit.
          </p>
          <div className="cta">
            <a className="prc-btn w" href={START_LINK}>Pick a time</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

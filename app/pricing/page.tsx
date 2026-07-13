import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import { FiveSalaries, ValueShare } from '@/components/PricingScenes';
import { START_LINK } from '@/lib/site';

const SHARE =
  'Get Found and StayBookt. One plan, $199 a month, nothing upfront, ninety days to change your mind. It is not a discount on a receptionist. It is the five people you cannot hire.';

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

/* THE OFFER, ON ONE SCREEN.
 * The page used to be seven sections and you had to assemble the deal yourself
 * out of pieces scattered down a scroll. Now the entire thing is stated once, in
 * the hero, and everything below it only answers "how can that be true." */
const GETS = [
  'A website that actually converts. Yours to keep.',
  'Found on Google, the map, and AI assistants.',
  'Every call and text answered, 24/7, in your voice.',
  'Jobs booked. Quotes chased until yes or no.',
  'Past customers brought back for repeat work.',
  'One short brief each morning. No software to learn.',
];

const THRESHOLDS = [
  'The business can run a week without you.',
  'The revenue repeats, instead of starting from zero.',
  'You actually want it. Plenty of owners never do.',
];

const CSS = `
.prc{background:#fff;color:var(--v4-ink);}
.prc .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.prc .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.prc h1,.prc h2,.prc h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.prc-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:16px 34px;text-decoration:none;transition:transform .3s ease;}
.prc-btn:hover{transform:translateY(-1px);}
.prc-btn.w{background:#fff;color:#050506;}

/* ===== 1. THE OFFER. All of it, in one screen. ===== */
.prc-hero{position:relative;background:#050506;padding:clamp(140px,17vh,190px) 0 clamp(80px,10vw,120px);overflow:hidden;}
.prc-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(58% 46% at 50% 0%,rgba(16,185,129,.14),transparent 64%);pointer-events:none;}
.prc-hero .wrap{position:relative;z-index:1;}
.prc-hero .eyebrow{color:#c9cdd6;text-align:center;}

.plan{margin-top:16px;text-align:center;}
.plan .nm{font-size:clamp(24px,3.2vw,40px);font-weight:600;letter-spacing:-.03em;color:#fff;line-height:1.1;}
.plan .nm .sb{background:linear-gradient(100deg,#06b6d4,#10b981 52%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent;}
.prnum{display:flex;align-items:flex-start;justify-content:center;gap:4px;margin-top:14px;color:#fff;font-weight:700;letter-spacing:-.05em;line-height:.88;font-size:clamp(76px,13vw,164px);font-variant-numeric:tabular-nums;}
.prnum .d{font-size:.4em;font-weight:600;margin-top:.15em;color:#9aa0ab;}
.prnum .per{align-self:flex-end;margin-bottom:.18em;margin-left:10px;font-size:.15em;font-weight:600;letter-spacing:0;color:#9aa0ab;}
.plan .terms{margin-top:18px;font-size:clamp(16px,1.9vw,20px);line-height:1.55;color:#aeb4c0;max-width:52ch;margin-left:auto;margin-right:auto;}
.plan .terms b{color:#fff;font-weight:600;}

/* what you get, right here, not three sections away */
.gets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px 40px;max-width:860px;margin:clamp(40px,5vw,56px) auto 0;}
@media(max-width:720px){.gets{grid-template-columns:1fr;}}
.gets .g{display:grid;grid-template-columns:20px minmax(0,1fr);gap:12px;align-items:start;padding:13px 0;border-top:1px solid rgba(255,255,255,.09);font-size:15.5px;line-height:1.45;color:#dfe3e9;}
.gets .g svg{margin-top:4px;}
.prc-hero .more{margin-top:clamp(30px,4vw,40px);text-align:center;font-size:15px;}
.prc-hero .more a{color:#5eead4;text-decoration:none;font-weight:600;}
.prc-hero .more a:hover{text-decoration:underline;}
.prc-hero .cta{margin-top:clamp(30px,4vw,40px);text-align:center;}

/* ===== 2. WHY IT CAN BE $199 ===== */
.prc-led{background:var(--v4-cream);padding:clamp(80px,10vw,130px) 0;}
.prc-led .two{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(32px,5vw,72px);align-items:center;}
@media(max-width:940px){.prc-led .two{grid-template-columns:1fr;gap:36px;}}
.prc-led h2{margin-top:14px;font-size:clamp(30px,3.9vw,52px);line-height:1.02;max-width:13ch;}
.prc-led p{margin-top:20px;font-size:clamp(16px,1.75vw,19px);line-height:1.6;color:#52565e;max-width:44ch;}

/* ===== 3. YEAR TWO. The upside deal. ===== */
.prc-vs{background:#050506;padding:clamp(90px,12vw,150px) 0;}
.prc-vs .eyebrow{color:#86868b;}
.prc-vs h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.03;color:#fff;max-width:16ch;}
.prc-vs .p{margin-top:20px;font-size:clamp(16px,1.85vw,20px);line-height:1.6;color:#9ba2ae;max-width:58ch;}
.prc-vs .thr{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:clamp(30px,4vw,40px);}
@media(max-width:760px){.prc-vs .thr{grid-template-columns:1fr;}}
.prc-vs .thr div{border-left:2px solid rgba(245,158,11,.5);padding:2px 0 2px 14px;font-size:14.5px;line-height:1.5;color:#c7ccd6;}
.prc-vs .stage{margin-top:clamp(38px,4.5vw,52px);}
.prc-vs .cmp{margin-top:clamp(28px,3.4vw,38px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;}
@media(max-width:760px){.prc-vs .cmp{grid-template-columns:1fr;}}
.prc-vs .cmp>div{border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:18px 20px;}
.prc-vs .cmp .who{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#86868b;}
.prc-vs .cmp .amt{margin-top:7px;font-size:clamp(19px,2.2vw,24px);font-weight:700;letter-spacing:-.025em;color:#fff;}
.prc-vs .cmp .of{margin-top:6px;font-size:13.5px;line-height:1.5;color:#9aa0ab;}
.prc-vs .cmp .us{border-color:rgba(16,185,129,.45);background:rgba(16,185,129,.06);}
.prc-vs .cmp .us .amt{color:#5eead4;}

/* ===== 4. CLOSER ===== */
.prc-close{background:#fff;text-align:center;padding:clamp(100px,14vw,180px) 0;}
.prc-close h2{font-size:clamp(34px,5.4vw,72px);line-height:1.0;max-width:16ch;margin:0 auto;}
.prc-close p{margin:24px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.55;color:#52565e;max-width:46ch;}
.prc-close .cta{margin-top:36px;}
`;

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={3} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <main className="prc v4">
      <style>{CSS}</style>
      <Nav />

      {/* 1 — THE OFFER, COMPLETE, ON ONE SCREEN */}
      <header className="prc-hero">
        <div className="wrap">
          <div className="eyebrow">One plan</div>

          <div className="plan">
            <div className="nm">
              Get Found. <span className="sb">StayBookt.</span>
            </div>

            <div className="prnum">
              <span className="d">$</span>199
              <span className="per">a month</span>
            </div>

            <p className="terms">
              <b>Nothing upfront.</b> No build fee, no setup fee, no menu. <b>Ninety days to change
              your mind</b>, and we refund every month you paid. The website is yours either way.
            </p>

            <div className="gets">
              {GETS.map((g) => (
                <div className="g" key={g}>
                  <Tick />
                  <span>{g}</span>
                </div>
              ))}
            </div>

            <p className="more">
              <a href="/whats-included">The full list, including what we do not do &rarr;</a>
            </p>

            <div className="cta">
              <a className="prc-btn w" href={START_LINK}>Pick a time</a>
            </div>
          </div>
        </div>
      </header>

      {/* 2 — WHY IT CAN BE $199 */}
      <section className="prc-led">
        <div className="wrap">
          <div className="two">
            <div>
              <div className="eyebrow">Why it can be $199</div>
              <h2>It was never software. It was five salaries.</h2>
              <p>
                A big company answers every call, books every job, chases every quote and reads the
                numbers back. Not because they are smarter. Because five people are paid to. You are
                doing all five jobs yourself, at nine at night.
              </p>
            </div>
            <FiveSalaries />
          </div>
        </div>
      </section>

      {/* 3 — YEAR TWO: the upside deal, and the calculator */}
      <section className="prc-vs">
        <div className="wrap">
          <div className="eyebrow">Year two &middot; Enjoy Life</div>
          <h2>We only get paid if you actually get free.</h2>
          <p className="p">
            After your first year, if the business is worth selling, we help you sell it, hand it on,
            or step back from it. It costs nothing extra. We agree what it is worth today, in
            writing, then take twenty percent of the increase we create above that. Nothing else.
            Nothing if the number does not move. It is by invitation because these three things have
            to be true first:
          </p>

          <div className="thr">
            {THRESHOLDS.map((t) => (
              <div key={t}>{t}</div>
            ))}
          </div>

          <div className="stage">
            <ValueShare />
          </div>

          <div className="cmp">
            <div>
              <div className="who">A broker</div>
              <div className="amt">8&ndash;12%</div>
              <div className="of">Of your whole sale price, for showing up at the end.</div>
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

      {/* 4 — CLOSER */}
      <section className="prc-close">
        <div className="wrap">
          <h2>Not sure it is for you?</h2>
          <p>
            That is what the call is for. Thirty minutes with a founder, no pitch deck, and we tell
            you straight whether it is a fit.
          </p>
          <div className="cta">
            <a className="prc-btn" href={START_LINK}>Pick a time</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

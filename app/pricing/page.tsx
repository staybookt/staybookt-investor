import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import PricingFaq from '@/components/v4/PricingFaq';
import StartBanner from '@/components/v4/StartBanner';
import { START_LINK } from '@/lib/site';

const SHARE =
  'One plan, $199 a month, nothing upfront, no lock-in, ninety days to change your mind for any reason. It was never software. It was five salaries.';

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

/* THE PRICING PAGE DOES FOUR THINGS. Nothing else (Jacob, July 14 2026).
 *
 * 1. The number.
 * 2. Why it can be that number.
 * 3. The money objections, answered.
 * 4. The call.
 *
 * WHAT WAS REMOVED, AND WHY IT MUST NOT COME BACK:
 *
 * - A TWELVE-LINE LIST of everything included. Every line of it was a row in the
 *   comparison matrix on /whats-included. Two pages, one spec, said twice. It is now
 *   a single link. This page does not list the product.
 *
 * - THE FIVE-SALARIES LEDGER CARD. Two problems. It was broken: after the $240,000
 *   salary column came out, the five role rows rendered at opacity 0 and the card was
 *   a large empty white box with three bits of text floating in it. And it was
 *   redundant: "you are doing all five jobs at nine at night" is exactly what the
 *   amber "You, today" column of the matrix says, and the matrix says it better,
 *   because it has three other columns to say it against. The ARGUMENT survives here
 *   in words, because it is the best justification we have for the number. The table
 *   does not.
 *
 * - THE TERMS PARAGRAPH. Six sentences of bold-flecked prose in one dense block under
 *   the price. They are four discrete facts. They are now four discrete facts. */

const FACTS: { k: string; v: string }[] = [
  { k: 'Nothing upfront', v: 'No build fee, no setup fee, no menu. Plus applicable taxes.' },
  { k: 'No lock-in', v: 'Cancel any time on thirty days notice. No penalty, no exit fee.' },
  { k: 'Ninety days, any reason', v: 'Change your mind and we refund every month you paid.' },
  { k: 'Unlimited calls and texts', v: 'No per-minute billing and no overage, however busy it gets.' },
];

const CSS = `
.prc{background:#fff;color:var(--v4-ink);}
.prc .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.prc .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.prc h1,.prc h2,.prc h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.prc-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:16px 34px;text-decoration:none;transition:transform .3s ease;}
.prc-btn:hover{transform:translateY(-1px);}
.prc-btn.w{background:#fff;color:#050506;}

/* ===== 1. THE NUMBER ===== */
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

/* four facts. NOT a paragraph. */
.facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,1.6vw,20px);max-width:900px;margin:clamp(38px,5vw,54px) auto 0;text-align:left;}
@media(max-width:860px){.facts{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:520px){.facts{grid-template-columns:1fr;}}
.fact{padding-top:16px;border-top:1px solid rgba(255,255,255,.16);}
.fact:first-child{border-top-color:rgba(16,185,129,.6);}
.fact b{display:block;font-size:14.5px;font-weight:600;letter-spacing:-.01em;color:#fff;}
.fact span{display:block;margin-top:7px;font-size:13.5px;line-height:1.5;color:#8b93a5;}

.prc-hero .more{margin-top:clamp(34px,4.4vw,44px);text-align:center;font-size:15px;}
.prc-hero .more a{color:#5eead4;text-decoration:none;font-weight:600;}
.prc-hero .more a:hover{text-decoration:underline;}
.prc-hero .cta{margin-top:clamp(26px,3.2vw,34px);text-align:center;}

/* ===== 2. WHY IT CAN BE $199. The argument, in words. No table. ===== */
.prc-led{background:#fff;padding:clamp(90px,12vw,150px) 0;}
.prc-led .inner{max-width:760px;}
.prc-led h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.03;max-width:16ch;}
.prc-led p{margin-top:26px;font-size:clamp(17px,2vw,21px);line-height:1.65;color:#42474f;max-width:62ch;}
.prc-led p b{font-weight:600;color:var(--v4-ink);}
.prc-led .kick{margin-top:clamp(38px,4.6vw,52px);font-size:clamp(22px,2.9vw,36px);font-weight:600;letter-spacing:-.028em;line-height:1.2;color:var(--v4-ink);max-width:26ch;}
.prc-led .kick .g{background:linear-gradient(100deg,#0891b2,#059669 55%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent;}
`;

export default function PricingPage() {
  return (
    <main className="prc v4">
      <style>{CSS}</style>
      <Nav />

      {/* 1 — THE NUMBER */}
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

            <div className="facts">
              {FACTS.map((f) => (
                <div className="fact" key={f.k}>
                  <b>{f.k}</b>
                  <span>{f.v}</span>
                </div>
              ))}
            </div>

            <p className="more">
              {/* This page does not list the product. That is what /whats-included is. */}
              <a href="/whats-included">See everything the $199 buys &rarr;</a>
            </p>

            <div className="cta">
              <a className="prc-btn w" href={START_LINK}>Get Started</a>
            </div>
          </div>
        </div>
      </header>

      {/* 2 — WHY IT CAN BE $199 */}
      <section className="prc-led">
        <div className="wrap">
          <div className="inner">
            <div className="eyebrow">Why it can be $199</div>
            <h2>It was never software. It was five salaries.</h2>
            <p>
              A big company answers every call, books every job, chases every quote and reads the
              numbers back to itself. Not because it is smarter than you. Because{' '}
              <b>five people are paid to</b>: a receptionist, a dispatcher, an estimator, a marketer
              and a bookkeeper. That is not a tool. That is a payroll, and it is the one thing you
              have never been able to buy.
            </p>
            <p>
              You are doing all five of those jobs yourself, at nine at night, after a full day of
              the work you are actually good at. We are not selling you a sixth piece of software to
              help you do them faster.
            </p>
            <div className="kick">
              It is not a discount on a receptionist.{' '}
              <span className="g">It is a different way of buying the same outcome.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — THE MONEY QUESTIONS. They belong on the money page. */}
      <PricingFaq />

      {/* 4 — THE CALL. Same banner every page lands on. */}
      <StartBanner />

      <SiteFooter />
    </main>
  );
}

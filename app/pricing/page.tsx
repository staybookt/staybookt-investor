import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import PricingFaq from '@/components/v4/PricingFaq';
import HeroCta from '@/components/v4/HeroCta';
import { START_LINK } from '@/lib/site';
import { min } from '@/lib/css';

const SHARE =
  'One plan, $199 a month, nothing upfront, no lock-in, ninety days to change your mind for any reason. It was never software. It was five salaries.';

export const metadata = {
  title: 'Pricing',
  description: SHARE,
  alternates: { canonical: '/pricing' },
  openGraph: {
    /* Defining openGraph WITHOUT images suppresses the inherited app/opengraph-image.tsx,
       so this page shared as a bare grey rectangle. Every page needs its own images line. */
    images: ['/opengraph-image'],
    title: 'Pricing · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/pricing',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'Pricing · StayBookt', description: SHARE },
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
  { k: 'Nothing upfront', v: 'No build fee, no setup fee, no menu. $199 CAD, plus applicable taxes.' },
  { k: 'No lock-in', v: 'Cancel any time on thirty days notice. No penalty, no exit fee.' },
  { k: 'Ninety days, any reason', v: 'Change your mind and we refund every month you paid.' },
  { k: 'Unlimited calls and texts', v: 'No per-minute billing and no overage, however busy it gets.' },
];

const CSS = `
.prc{background:#fff;color:var(--v4-ink);}
.prc .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.prc .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.prc h1,.prc h2,.prc h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}
.prc-btn{display:inline-flex;align-items:center;gap:8px;background:var(--v4-ink);color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:16px 34px;text-decoration:none;transition:transform .3s ease;}
.prc-btn:hover{transform:translateY(-1px);}
.prc-btn.w{background:#fff;color:#050506;}

/* ===== 1. THE NUMBER ===== */
/* HERO. Everything else is .pg-hero in globals.css. Indigo: this is the page where
   the ask is the money, and indigo is the commitment rung. */
.pg-hero{--hero-hue:79,70,229;}

.plan{margin-top:16px;text-align:center;}
.plan .nm{font-size:clamp(24px,3.2vw,40px);font-weight:600;letter-spacing:-.03em;color:#fff;line-height:1.1;}
.plan .nm .sb{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.prnum{display:flex;align-items:flex-start;justify-content:center;gap:4px;margin-top:14px;color:#fff;font-weight:700;letter-spacing:-.05em;line-height:.88;font-size:clamp(76px,13vw,164px);font-variant-numeric:tabular-nums;}
.prnum .amt{display:inline-flex;align-items:flex-start;background:var(--sb-grad);
  -webkit-background-clip:text;background-clip:text;color:transparent;}
.prnum .amt .d{font-size:.4em;font-weight:600;margin-top:.15em;color:transparent;}
.prnum .per{align-self:flex-end;margin-bottom:.18em;margin-left:10px;font-size:.15em;font-weight:600;letter-spacing:0;color:#9aa0ab;}

/* four facts. NOT a paragraph. */
.facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,1.6vw,20px);max-width:900px;margin:clamp(38px,5vw,54px) auto 0;text-align:left;}
@media(max-width:860px){.facts{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:520px){.facts{grid-template-columns:1fr;}}
.fact{padding-top:16px;border-top:1px solid rgba(255,255,255,.16);}
.fact:first-child{border-top-color:rgba(16,185,129,.6);}
.fact b{display:block;font-size:14.5px;font-weight:600;letter-spacing:-.01em;color:#fff;}
.fact span{display:block;margin-top:7px;font-size:13.5px;line-height:1.5;color:#8b93a5;}

.pg-hero .more{margin-top:clamp(34px,4.4vw,44px);text-align:center;font-size:15px;}
.pg-hero .more a{color:#5eead4;text-decoration:none;font-weight:600;}
.pg-hero .more a:hover{text-decoration:underline;}
.pg-hero .cta{margin-top:clamp(26px,3.2vw,34px);text-align:center;}

/* ===== 2. WHY IT CAN BE $199. The argument, in words. No table. ===== */
.prc-led{background:#fff;padding:clamp(90px,12vw,150px) 0;}
.prc-led .inner{max-width:760px;}
.prc-led h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.03;max-width:16ch;}
.prc-led p{margin-top:26px;font-size:clamp(17px,2vw,21px);line-height:1.65;color:#42474f;max-width:62ch;}
.prc-led p b{font-weight:600;color:var(--v4-ink);}
.prc-led .kick{margin-top:clamp(38px,4.6vw,52px);font-size:clamp(22px,2.9vw,36px);font-weight:600;letter-spacing:-.028em;line-height:1.2;color:var(--v4-ink);max-width:26ch;}
.prc-led .kick .g{background:var(--sb-grad-ink);-webkit-background-clip:text;background-clip:text;color:transparent;}
`;

export default function PricingPage() {
  return (
    <div className="prc v4">
      <style>{min(CSS)}</style>
      <Nav />
      <main id="main" tabIndex={-1}>

      {/* 1 — THE NUMBER */}
      <header className="pg-hero">
        <div className="wrap">
          <div className="eyebrow">One plan</div>

          <div className="plan">
            {/* WAS a <div>. /pricing had NO h1 at all — its heading outline started at H2,
                on the page the entire pricing argument rests on, while every other page in the
                set has exactly one. "Get Found. StayBookt." is the page's title; it should be
                marked up as one. Purely semantic: .plan .nm carries all the styling. */}
            <h1 className="nm">
              Get Found. <span className="sb">StayBookt.</span>
            </h1>

            <div className="prnum">
              {/* $199 is the whole argument of this page, and it was plain white on
                  black: the one number we want remembered had no brand on it at all.
                  It is the wordmark's own gradient now. "a month" stays grey so the
                  number is the thing your eye lands on. */}
              <span className="amt"><span className="d">$</span>199</span>
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
              <a className="prc-btn w" href={START_LINK} data-cta="pricing">Get Started</a>
            </div>
          </div>
        </div>
      </header>

      {/* 2 — WHY IT CAN BE $199 */}
      <section className="prc-led">
        <div className="wrap">
          <div className="inner">
            {/* "Why it can be $199" (Richard: "I don't understand the lead in"). Neither did
                anyone else. It is an insider's sentence: it assumes you have already
                accepted the price and are curious about our cost base. Nobody arrives
                there. They arrive at "what is the catch at $199", so that is the question
                the section is now allowed to admit it is answering. */}
            <div className="eyebrow">Why so cheap</div>
            <h2>It was never software. It was five salaries.</h2>
            {/* THE FIVE ROLES MUST BE FIVE JOBS WE ACTUALLY DO. Two of them were not.
                This used to name a DISPATCHER and a BOOKKEEPER, and /whats-included says,
                in plain words, "Do you dispatch my crew? No" and "We are not your
                bookkeeper." So forty percent of our own price justification retracted
                itself two pages later, in front of the exact buyer who is scanning for
                the catch.
                The scheduler and the collections clerk are real salaries, and they are
                jobs we genuinely do. Do not put the dispatcher or the bookkeeper back. */}
            <p>
              A big company answers every call, books every job, chases every quote and chases the
              money. It is not smarter than you. It has{' '}
              <b>five people on payroll for it</b>: a receptionist, a scheduler, an assistant, a
              collections clerk and a marketer. That is a payroll, and it is the one thing you have
              never been able to buy.
            </p>
            <p>
              You are doing all five of those jobs yourself, at nine at night, after a full day of
              the work you are actually good at. We are not selling you a sixth piece of software to
              help you do them faster.
            </p>
            <div className="kick">
              You get the same outcome hiring would give you,{' '}
              <span className="g">bought a different way.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — THE MONEY QUESTIONS. They belong on the money page. */}
      <PricingFaq />

      {/* 4 — THE CALL. Same banner every page lands on. */}
      <HeroCta img="/close-pricing.jpg" />

      </main>

      <SiteFooter />
    </div>
  );
}

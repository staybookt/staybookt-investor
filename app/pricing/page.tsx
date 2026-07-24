import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import Matrix from '@/components/v4/Matrix';
import IncludedFaq from '@/components/v4/IncludedFaq';
import HeroCta from '@/components/v4/HeroCta';
import { min } from '@/lib/css';

const SHARE =
  'What you get for $199 a month: the whole list, what stays yours, and the things we do not do. Nothing upfront, no lock-in, ninety days to change your mind for any reason.';

export const metadata = {
  title: 'Pricing',
  description: SHARE,
  alternates: { canonical: '/pricing' },
  openGraph: {
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

/* PRICING = WHAT'S-INCLUDED, MERGED (Jacob + Richard, Jul 23 2026).
 *
 * What's-Included and Pricing were two pages arguing the same thing, and the chart page was
 * the stronger of the two, so it IS the pricing page now. The old /pricing (a "Get Found.
 * StayBookt." hero + a giant $199 + a prose ledger) is gone; /whats-included 308s here
 * (next.config). Structure:
 *   1. the headline "What you get for $199 a month." + the four terms chips
 *   2. the transfer chart (Matrix)
 *   3. why it can be $199 (the five-salaries argument), moved to AFTER the chart
 *   4. the money + service FAQ, blended into IncludedFaq
 *   5. the call
 *
 * The five-salaries block is still prose here. Rebuilding it as the crossed-out visual
 * Stephanie sketched is a fast-follow; it needs a call on whether to show (invented) salary
 * figures, given this site's standing rule against made-up numbers. */

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

/* HERO. Indigo: the money rung. The period after the gradient headline is the brand violet,
   matching the logo dot (Richard, Jul 23 2026 branding rule: a gradient word-set ends on the
   purple period). */
.pg-hero{--hero-hue:79,70,229;}
.pg-hero .wrap h1 .pd{color:var(--v4-violet);}

/* the four terms, right under the headline. Each carries its own brand-hue top-accent bar so
   the row reads as an informational overview, not clickable tabs (Emma p12). */
.facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,1.6vw,20px);max-width:900px;margin:clamp(30px,4vw,44px) auto 0;text-align:left;}
@media(max-width:860px){.facts{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:520px){.facts{grid-template-columns:1fr;}}
.fact{padding-top:13px;border-top:2px solid var(--fc,#38bdf8);}
.fact:nth-child(1){--fc:#38bdf8;}
.fact:nth-child(2){--fc:#818cf8;}
.fact:nth-child(3){--fc:#34d399;}
.fact:nth-child(4){--fc:#a78bfa;}
.fact b{display:block;font-size:14.5px;font-weight:600;letter-spacing:-.01em;color:#fff;}
.fact span{display:block;margin-top:7px;font-size:13.5px;line-height:1.5;color:#8b93a5;}

/* ===== WHY IT CAN BE $199 — after the chart. White, to break the cream run of the chart
   above and the FAQ below. ===== */
.prc-led{background:#fff;padding:clamp(80px,11vw,140px) 0;border-top:1px solid #e6e6e1;}
.prc-led .inner{max-width:760px;margin:0 auto;}
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

      {/* 1 — THE HEADLINE + THE TERMS */}
      <header className="pg-hero">
        <div className="wrap">
          <div className="eyebrow">Pricing</div>
          <h1>What you get for <span className="g">$199 a month</span><span className="pd">.</span></h1>
          <div className="facts">
            {FACTS.map((f) => (
              <div className="fact" key={f.k}>
                <b>{f.k}</b>
                <span>{f.v}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 2 — THE CHART. Thirteen jobs, on your plate today, on ours tomorrow, for $199. */}
      <Matrix />

      {/* 3 — WHY IT CAN BE $199. Moved to after the chart (Jul 23 2026): the reader has just
          seen everything they get, so the five-salaries argument now lands as "and here is why
          that number is even possible", not as a lead-in they have to accept on faith. */}
      <section className="prc-led">
        <div className="wrap">
          <div className="inner">
            <div className="eyebrow">Why so cheap</div>
            <h2>It was never software. It was five salaries.</h2>
            <p>
              A big company answers every call, books every job, chases every quote and chases the
              money. It is not smarter than you. It has <b>five people on payroll for it</b>: a
              receptionist, a scheduler, an assistant, a collections clerk and a marketer. That is
              the one thing you have never been able to buy.
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

      {/* 4 — THE QUESTIONS. Service, ownership, boundaries and money, blended into one set. */}
      <IncludedFaq />

      {/* 5 — THE CALL. Same banner every page lands on. */}
      <HeroCta img="/close-pricing.jpg" />

      </main>

      <SiteFooter />
    </div>
  );
}

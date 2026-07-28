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

/* Real median Canadian pay per role (Job Bank, 2025), rounded conservatively. These are
   market rates, not figures we invented; the whole site rule is no made-up numbers. Sum is
   exact: 44 + 50 + 52 + 56 + 54 = 256. */
const ROLES: { role: string; pay: string }[] = [
  { role: 'A receptionist', pay: '$44,000' },
  { role: 'A scheduler', pay: '$50,000' },
  { role: 'An assistant', pay: '$52,000' },
  { role: 'A collections clerk', pay: '$56,000' },
  { role: 'A marketer', pay: '$54,000' },
];

/* CHIP LABELS PER RICHARD (Jul 28 follow-up): "No lock-in" -> "Month-to-month" and the
   refund chip -> "First 90 days, money back". Same terms, plainer words — this also
   settled his 6-month / 90-vs-180 confusion: the terms ARE month-to-month with a
   90-day money-back, and now the labels say so in his words. */
const FACTS: { k: string; v: string }[] = [
  { k: 'Nothing upfront', v: 'No build fee, no setup fee, no menu. $199 CAD, plus applicable taxes.' },
  { k: 'Month-to-month', v: 'No term. Cancel any time on thirty days notice. No penalty, no exit fee.' },
  { k: 'First 90 days, money back', v: 'Change your mind for any reason and we refund every month you paid.' },
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

/* ===== THE PAYROLL SWAP — the five-salaries argument as a visual (Jul 23 2026).
   White section to break the cream chart above and the FAQ below. The five roles a big
   company puts on payroll to run its front office, each struck through at real median
   Canadian pay (Job Bank 2025), swapped for one line: $199 a month. The numbers are real
   and sourced; nothing here is invented, which is the standing site rule. The strike is a
   muted grey, not red: brand orange/red is retired, and the pop belongs to the $199. ===== */
.prc-swap{background:#fff;padding:clamp(80px,11vw,140px) 0;border-top:1px solid #e6e6e1;}
.prc-swap .inner{max-width:720px;margin:0 auto;}
.prc-swap h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.03;max-width:16ch;}
.prc-swap .lede{margin-top:24px;font-size:clamp(17px,2vw,21px);line-height:1.6;color:#42474f;max-width:56ch;}
.swap{margin-top:clamp(38px,5vw,56px);border:1px solid #e9e9e4;border-radius:20px;overflow:hidden;box-shadow:0 30px 70px -40px rgba(6,12,20,.35);}
.swap .srow{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:15px clamp(18px,3vw,28px);border-bottom:1px solid #f0f0ec;}
.swap .srow .rname{font-size:clamp(15px,1.9vw,18px);font-weight:500;color:#6b7280;}
.swap .srow .rpay{font-size:clamp(15px,1.9vw,18px);font-weight:600;color:#9aa0a8;white-space:nowrap;}
.swap .srow .rpay s{text-decoration:line-through;text-decoration-color:#c3c8d0;text-decoration-thickness:2px;}
.swap .srow .rpay em{font-style:normal;font-weight:500;color:#b6bcc4;font-size:.8em;}
.swap .srow.total{background:#faf9f7;border-bottom:0;}
.swap .srow.total .rname{font-weight:700;color:var(--v4-ink);}
.swap .srow.total .rpay{color:var(--v4-ink);font-size:clamp(17px,2.2vw,22px);}
.swap .srow.total .rpay s{text-decoration-thickness:2.5px;}
.swap .swap-us{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:clamp(22px,3vw,30px) clamp(18px,3vw,28px);background:var(--v4-ink);color:#fff;}
.swap .swap-us .usl{font-size:clamp(15px,1.9vw,18px);font-weight:600;}
.swap .swap-us .usp{font-size:clamp(30px,4.4vw,48px);font-weight:700;letter-spacing:-.03em;background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;white-space:nowrap;}
.swap .swap-us .usp em{font-style:normal;font-size:.4em;font-weight:600;color:#fff;-webkit-text-fill-color:#fff;letter-spacing:0;}
.prc-swap .swap-src{margin-top:20px;font-size:13px;line-height:1.55;color:#9aa0a8;max-width:56ch;}
@media(max-width:520px){.swap .srow,.swap .swap-us{padding-left:16px;padding-right:16px;}}
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

      {/* 3 — WHY IT CAN BE $199. The five-salaries argument, now a visual (Jul 23 2026):
          the five roles a big company puts on payroll to run its front office, each struck
          through at real median Canadian pay (Job Bank 2025), swapped for one line, $199 a
          month. Numbers are real and sourced; nothing invented (standing site rule). */}
      <section className="prc-swap">
        <div className="wrap">
          <div className="inner">
            <div className="eyebrow">Why so cheap</div>
            <h2>It was never software. It was five salaries.</h2>
            <p className="lede">
              A big company answers every call, books every job, chases every quote and chases the
              money. It is not smarter than you. It just has five people on payroll doing it, which
              is the one thing you could never buy.
            </p>

            <div className="swap">
              {ROLES.map((r) => (
                <div className="srow" key={r.role}>
                  <span className="rname">{r.role}</span>
                  <span className="rpay"><s>{r.pay}</s><em>&nbsp;/year</em></span>
                </div>
              ))}
              <div className="srow total">
                <span className="rname">Five people on payroll</span>
                <span className="rpay"><s>$256,000</s><em>&nbsp;/year</em></span>
              </div>
              <div className="swap-us">
                <span className="usl">All five jobs, done for you</span>
                {/* /mo not /month: one price format sitewide (Richard, Jul 28) —
                    prose says "$199 a month", compact labels say "$199/mo". */}
                <span className="usp">$199<em>&nbsp;/mo</em></span>
              </div>
            </div>

            <p className="swap-src">
              Each figure is median Canadian pay for that role (Job Bank, 2025). We are not five new
              hires. We are the outcome those hires would give you, bought a different way.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — THE CALL, BEFORE THE FAQ (Richard, Images doc Jul 28: "Does the CTA image
          have to be after the FAQ — I would rather have the CTA sooner. I don't love
          dragging everyone through the FAQs..."). Golf photo stays: "I like the golf
          image." His saying, no subtext. FAQ moves to last word, like /how-it-works. */}
      <HeroCta
        img="/close-pricing.jpg"
        heading={<>A solution that offers undeniable value.<br />And more time for simple pleasures.</>}
        sub={null}
      />

      {/* 5 — THE QUESTIONS. Service, ownership, boundaries and money, blended into one set. */}
      <IncludedFaq />

      </main>

      <SiteFooter />
    </div>
  );
}

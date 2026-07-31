import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import Matrix from '@/components/v4/Matrix';
import PayrollSwap from '@/components/v4/PayrollSwap';
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
 *   3. why it can be $199 (the five-salaries argument, PayrollSwap.tsx)
 *   4. the money + service FAQ, blended into IncludedFaq
 *   5. the call
 *
 * SAME-TREATMENT PASS (Jacob, Jul 30 2026): "the pricing page has not yet gotten the same
 * treatment as the homepage, about us, journeys." Two real gaps versus those pages: the hero
 * was the plain, unanimated variant of .pg-hero (no split hl1/hl2 reveal, no pill eyebrow, no
 * sub line — every other flagship page uses the canonical reveal, see /founders), and the
 * five-salaries argument was a boxed white card (border+radius+shadow), which is exactly the
 * "card chrome" this site's own rule bans elsewhere. Fixed: the hero below now runs the same
 * hl1/hl2/sub/graphic reveal as /founders (ported verbatim, re-hued indigo per this page's
 * existing --hero-hue), and the five-salaries section is now PayrollSwap.tsx, a scroll-
 * triggered reveal (same on-view/IntersectionObserver technique as the homepage's own
 * PriceReveal) with plain hairline rows instead of a card. */

/* CHIP LABELS PER RICHARD (Jul 28 follow-up): "No lock-in" -> "Month-to-month" and the
   refund chip -> "First 90 days, money back". Same terms, plainer words — this also
   settled his 6-month / 90-vs-180 confusion: the terms ARE month-to-month with a
   90-day money-back, and now the labels say so in his words.
   PRICE FORMAT FIX (Jacob, Jul 30 2026): "Nothing upfront" chip said "$199 CAD, plus
   applicable taxes" — dropped the stray currency code. No other price mention on the
   site uses one, and this is prose (a full sentence), so it takes the site-wide prose
   format "$199 a month" per the .usp comment below, not a bare figure. */
const FACTS: { k: string; v: string }[] = [
  { k: 'Nothing upfront', v: 'No build fee, no setup fee, no menu. $199 a month, plus applicable taxes.' },
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

/* THE CANONICAL HERO REVEAL, ported from /founders (same technique, same timings — Jul 30
   2026 same-treatment pass). This hero has no photo wall; the four terms chips below are its
   "supporting graphic" beat and stagger in from 2.15s the same way founders' memwall does. */
.prc .pg-hero .wrap .eyebrow{display:inline-block;font-size:12.5px;font-weight:700;letter-spacing:.15em;text-transform:none;color:#42474f;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad) border-box;border-radius:999px;padding:9px 18px;box-shadow:0 6px 18px -10px rgba(6,12,20,.25);}
.prc .pg-hero .wrap h1{margin:20px auto 0;font-size:clamp(20px,6.4vw,88px);line-height:1.02;letter-spacing:-.03em;font-weight:600;}
.prc .pg-hero .hero-h1 .hl1,.prc .pg-hero .hero-h1 .hl2{display:block;white-space:nowrap;}
.prc .pg-hero .wrap p.sub{margin:22px auto 0;font-size:clamp(13px,3.1vw,21px);line-height:1.4;color:#52565e;}
@media(prefers-reduced-motion:no-preference){
  .prc .pg-hero .hero-h1 .hl1{opacity:0;filter:blur(10px);transform:translateY(20px);animation:abtIn .9s cubic-bezier(.16,1,.3,1) .2s forwards;}
  .prc .pg-hero .hero-h1 .hl2{position:relative;opacity:0;filter:blur(32px);transform:translateY(16px) scale(1.35);transform-origin:center;animation:abtEnjoy 1.5s cubic-bezier(.19,1,.22,1) 1s forwards;}
  .prc .pg-hero .hero-h1 .hl2::before{content:'';position:absolute;inset:-34% -10%;z-index:-1;background:radial-gradient(56% 62% at 50% 54%,rgba(79,70,229,.32),rgba(16,185,129,.2) 46%,transparent 72%);filter:blur(36px);opacity:0;transform:scale(.7);animation:abtGlow 2s ease 1.05s forwards;}
  .prc .pg-hero .wrap p.sub{opacity:0;filter:blur(6px);transform:translateY(12px);animation:abtIn .9s cubic-bezier(.16,1,.3,1) 1.7s forwards;}
  .prc .facts{opacity:0;transform:translateY(16px);animation:abtIn .9s cubic-bezier(.16,1,.3,1) 2.15s forwards;}
}
@keyframes abtIn{to{opacity:1;filter:blur(0);transform:none;}}
@keyframes abtEnjoy{0%{opacity:0;filter:blur(32px);transform:translateY(16px) scale(1.35);}55%{opacity:1;}100%{opacity:1;filter:blur(0);transform:translateY(0) scale(1);}}
@keyframes abtGlow{0%{opacity:0;transform:scale(.7);}50%{opacity:.95;}100%{opacity:.62;transform:scale(1);}}

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
`;

export default function PricingPage() {
  return (
    <div className="prc v4">
      <style>{min(CSS)}</style>
      <Nav />
      <main id="main" tabIndex={-1}>

      {/* 1 — THE HEADLINE + THE TERMS. Same reveal as /founders: hl1 -> hl2 focus-pull ->
          sub -> facts (the "graphic" beat here, no photo wall on this page). */}
      <header className="pg-hero">
        <div className="wrap">
          <div className="eyebrow">Pricing</div>
          <h1 className="hero-h1">
            <span className="hl1">What you get for</span>
            <span className="hl2"><span className="g">$199 a month</span><span className="pd">.</span></span>
          </h1>
          <p className="sub">Every job on the list below, handled, no matter how busy it gets.</p>
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

      {/* 3 — WHY IT CAN BE $199. The five-salaries argument, scroll-triggered — see
          PayrollSwap.tsx for the mechanism and the card-chrome-removal rationale. */}
      <PayrollSwap />

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

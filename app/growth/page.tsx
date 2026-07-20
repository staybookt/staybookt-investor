import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import HeroCta from '@/components/v4/HeroCta';
import SiteFooter from '@/components/SiteFooter';
import GrowthFilm from '@/components/v4/GrowthFilm';
import YourMath from '@/components/v4/YourMath';
import { min } from '@/lib/css';

/* /growth: PRIVATE DRAFT. NOT A PUBLIC PAGE (Jacob + Richard, July 2026).
 *
 * Tamer's note on the site: it sells the owner their time back, and never once argues
 * that the same machine makes them more money. Fair. This page is the money argument,
 * built for the founders to iterate on before any of it goes anywhere public.
 *
 * REBUILT AS AN EXPERIENCE (Jacob, July 2026). The first draft was five dense text
 * sections: a memo sitting inside a cinematic site, the exact failure /long-term had
 * before the RemovalTest. The five money mechanisms are now a pinned scroll film
 * (GrowthFilm) in the site's established film grammar, and the arrival is YourMath, a
 * calculator that echoes the reader's own arithmetic back with zero hidden multipliers.
 *
 * PRIVATE MEANS THREE THINGS, ALL LOAD-BEARING:
 *   1. metadata.robots is noindex,nofollow. Do not remove it while this is a draft.
 *   2. It appears in NO nav, NO footer, NO sitemap (app/sitemap.ts is an explicit
 *      allowlist and /growth is not on it), and not in the homepage Go deeper grid.
 *   3. It is reachable only by typing /growth.
 *
 * THE RULES THIS PAGE LIVES UNDER, same as the rest of the site:
 *   - No invented numbers. Every figure in the film is an external, published stat,
 *     presented as external, with its source named inline and linked at the bottom.
 *   - No ROI promise, no "typical customer saves X", no revenue guarantee.
 *   - THE CALCULATOR IS NOT THE LEAK CALCULATOR. That anti-pattern is still banned,
 *     and the reason it was banned is what YourMath refuses to do: it has no hidden
 *     coefficients and makes no claim of ours. It multiplies and divides the reader's
 *     own three inputs against the public $199 price, and says so. See the comment
 *     block at the top of YourMath.tsx before touching it.
 *   - Product claims are ONLY what /whats-included already claims: answer 24/7, chase
 *     the quote YOU sent (we do not draft quotes), chase invoices, ask for and answer
 *     every review, bring past customers back. Nothing new is promised here.
 *
 * A STAT THAT WAS DROPPED, so nobody re-adds it: "85% of callers who hit voicemail
 * never call back" circulates everywhere and traces to nowhere reputable. Same for the
 * "80% of sales take five follow-ups" chestnut. If it cannot be sourced, it is not on
 * this page. */

export const metadata = {
  title: 'Growth (internal draft)',
  description: 'Internal working draft. The money argument, with cited public research.',
  robots: { index: false, follow: false },
};

const CSS = `
.gro{background:#fff;color:var(--v4-ink);}
.gro .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.gro .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.gro h1,.gro h2{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}

/* HERO. The standard .pg-hero. Emerald: this page is about what the running of the
   business produces, and emerald is the running-of-it hue. The h1 is a full sentence,
   longer than the standard 14ch, so it gets one extra-specific width override rather
   than a hand-rolled header. */
.gro .pg-hero{--hero-hue:16,185,129;}
.gro .pg-hero .wrap h1{max-width:22ch;font-size:clamp(38px,5.6vw,74px);}

/* THE DRAFT LINE. A sentence, not a warning box. */
.gro-draft{padding:26px 0;border-bottom:1px solid #e6e6e1;background:#f6f6f3;}
.gro-draft p{text-align:center;font-size:14.5px;line-height:1.6;color:#5c636e;max-width:72ch;margin:0 auto;}
.gro-draft p b{font-weight:600;color:var(--v4-ink);}

/* SOURCES. Small, plain, complete. */
.gro-src{padding:clamp(60px,8vw,100px) 0;border-top:1px solid #e6e6e1;background:#f6f6f3;}
.gro-src h2{margin-top:12px;font-size:clamp(24px,3vw,36px);line-height:1.1;}
.gro-src ul{margin-top:26px;max-width:760px;list-style:none;padding:0;}
.gro-src li{padding:14px 0;border-top:1px solid #e2e2dd;font-size:15px;line-height:1.6;color:#42474f;}
.gro-src li:first-child{border-top:0;}
.gro-src li b{font-weight:600;color:var(--v4-ink);}
.gro-src li a{color:#047857;font-weight:600;text-decoration:none;word-break:break-word;}
.gro-src li a:hover{text-decoration:underline;}
`;

const SOURCES: { name: string; title: string; year: string; url: string }[] = [
  {
    name: '411 Locals',
    title: 'Small Business Owners Do Not Answer 62% of Phone Calls',
    year: '2024',
    url: 'https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/',
  },
  {
    name: 'Harvard Business Review',
    title: 'The Short Life of Online Sales Leads (audit of 2,241 companies)',
    year: '2011',
    url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads',
  },
  {
    name: 'MIT / InsideSales.com',
    title: 'Lead Response Management Study',
    year: '2007',
    url: 'https://www.insidesales.com/response-time-matters/',
  },
  {
    name: 'ServiceTitan',
    title: 'Follow-Ups 101: Back 2 Basics',
    year: 'n.d.',
    url: 'https://www.servicetitan.com/blog/webinar-recap-follow-ups-101-back-2-basics',
  },
  {
    name: 'BrightLocal',
    title: 'Local Consumer Review Survey',
    year: '2024',
    url: 'https://www.brightlocal.com/research/local-consumer-review-survey-2024/',
  },
  {
    name: 'Harvard Business Review, citing Bain & Company',
    title: 'The Value of Keeping the Right Customers',
    year: '2014',
    url: 'https://hbr.org/2014/10/the-value-of-keeping-the-right-customers',
  },
];

export default function GrowthPage() {
  return (
    <div className="gro v4" id="top">
      <style>{min(CSS)}</style>
      <Nav />
      <main id="main" tabIndex={-1}>

      <header className="pg-hero">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">Internal draft</Reveal>
          <Reveal>
            <h1>
              The same system that gives you your time back{' '}
              <span className="g">grows your revenue.</span>
            </h1>
          </Reveal>
          <Reveal>
            <p>
              One workday, seven in the morning to nine at night. Five moments decide how it
              ends, and every one plays out both ways. Then the math is yours.
            </p>
          </Reveal>
        </div>
      </header>

      {/* THE DRAFT LINE. A sentence, on purpose, where both founders will see it first. */}
      <div className="gro-draft">
        <div className="wrap">
          <p>
            <b>This page is a working draft.</b> Jacob and Richard are iterating on it before
            anything here goes public. It is linked from nowhere, listed in no sitemap, and
            marked not to be indexed.
          </p>
        </div>
      </div>

      {/* THE FILM. The Two Days: scroll runs the clock through one workday, and five
          moments each play out both ways. The dense sections it replaced live on in the
          static twin and the Sources below. */}
      <GrowthFilm />

      {/* THE ARRIVAL. The reader's own numbers, said back. Never ours. */}
      <YourMath />

      {/* SOURCES. Every number in the film, findable. */}
      <section className="gro-src">
        <div className="wrap">
          <div className="eyebrow">Sources</div>
          <h2>Where every number on this page comes from.</h2>
          <ul>
            {SOURCES.map((s) => (
              <li key={s.url}>
                <b>{s.name}</b> ({s.year}). {s.title}.{' '}
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.url}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HeroCta />
      </main>
      <SiteFooter />
    </div>
  );
}

import Nav from '@/components/v4/Nav';
import HeroCta from '@/components/v4/HeroCta';
import SiteFooter from '@/components/SiteFooter';
import GrowthQuiz from '@/components/v4/GrowthQuiz';
import { min } from '@/lib/css';

/* /growth: PRIVATE DRAFT. NOT A PUBLIC PAGE (Jacob + Richard, July 2026).
 *
 * Tamer's note on the site: it sells the owner their time back, and never once argues
 * that the same machine makes them more money. Fair. This page is the money argument,
 * built for the founders to iterate on before any of it goes anywhere public.
 *
 * REBUILT A FIFTH TIME (Jacob, July 2026): THE QUIZ. Take one was five dense text
 * sections. Takes two and three were scroll-scrubbed films, rejected as annoying to
 * drive. Take four put the cited figures at keynote scale, one per viewport; take
 * four-and-a-half collapsed them onto a pinned stage. Jacob rejected all three
 * scroll-driven takes as confusing, and approved this instead: ONE held card that
 * swaps its content, advanced only by tap, click or keyboard. No pin, no snap
 * markers, no scroll driver, no travel tax. Guess before reveal makes the figures
 * land: the reader commits to an answer, then watches the published number count up
 * past it. The finale is their own arithmetic and a stack-up of the industry's
 * numbers beside theirs. The mirror-not-promise law is unchanged; see the block at
 * the top of GrowthQuiz.tsx. GrowthNumbers (the pinned stage) and the standalone
 * YourMath section are deleted; their salvage lives in GrowthQuiz.
 *
 * PRIVATE MEANS THREE THINGS, ALL LOAD-BEARING:
 *   1. metadata.robots is noindex,nofollow. Do not remove it while this is a draft.
 *   2. It appears in NO nav, NO footer, NO sitemap (app/sitemap.ts is an explicit
 *      allowlist and /growth is not on it), and not in the homepage Go deeper grid.
 *   3. It is reachable only by typing /growth.
 *
 * THE RULES THIS PAGE LIVES UNDER, same as the rest of the site:
 *   - No invented numbers. Every figure in the quiz is an external, published stat,
 *     presented as external, with its source named on its card and linked at the
 *     bottom.
 *   - No ROI promise, no "typical customer saves X", no revenue guarantee.
 *   - THE CALCULATOR IS NOT THE LEAK CALCULATOR. That anti-pattern is still banned,
 *     and the reason it was banned is what the quiz's arithmetic refuses to do: it
 *     has no hidden coefficients and makes no claim of ours. It multiplies and
 *     divides the reader's own three inputs against the public $199 price, and says
 *     so. See the comment block at the top of GrowthQuiz.tsx before touching it.
 *   - The quiz scores the reader's three GUESSES only, and never scores or judges
 *     their business.
 *   - Product claims are ONLY what /whats-included already claims: answer 24/7, chase
 *     the quote YOU sent (we do not draft quotes), chase invoices, ask for and answer
 *     every review, bring past customers back. Nothing new is promised here.
 *
 * A STAT THAT WAS DROPPED, so nobody re-adds it: "85% of callers who hit voicemail
 * never call back" circulates everywhere and traces to nowhere reputable. Same for the
 * "80% of sales take five follow-ups" chestnut. If it cannot be sourced, it is not on
 * this page.
 *
 * STATE NOTE: the quiz is React state. Refresh restarts it from the cold open, which
 * is accepted for a two-founder draft. The cold open renders on the server, so the
 * prerender checks can see it; the later cards are client state and cannot be grepped
 * from the HTML.
 */

export const metadata = {
  title: 'Growth (internal draft)',
  description: 'Internal working draft. The money argument, with cited public research.',
  robots: { index: false, follow: false },
};

const CSS = `
.gro{background:#fff;color:var(--v4-ink);}
.gro .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.gro .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
/* NO .pg-hero HERE. The quiz's cold-open card IS the hero; the section carries its
   own 64px clearance under the fixed nav. */
/* SOURCES. One quiet line-list, still linked. Every figure the quiz uses, findable. */
.gro-src{padding:clamp(44px,6vw,72px) 0;border-top:1px solid #e6e6e1;background:#f6f6f3;}
.gro-src ul{margin-top:18px;max-width:760px;list-style:none;padding:0;}
.gro-src li{padding:8px 0;font-size:13.5px;line-height:1.6;color:#5c636e;}
.gro-src li b{font-weight:600;color:var(--v4-ink);}
.gro-src li a{color:#047857;font-weight:600;text-decoration:none;}
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
        {/* THE QUIZ. One held card, seven steps: cold open, three guesses against
            published research, the reader's three inputs, their arithmetic at keynote
            scale, and the stack-up. Advanced only by tap, click or keyboard. */}
        <GrowthQuiz />

        {/* SOURCES. Every number in the quiz, findable. The link text is the paper,
            not the raw URL: quieter, same destination. */}
        <section className="gro-src">
          <div className="wrap">
            <div className="eyebrow">Sources</div>
            <ul>
              {SOURCES.map((s) => (
                <li key={s.url}>
                  <b>{s.name}</b> ({s.year}).{' '}
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>.
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

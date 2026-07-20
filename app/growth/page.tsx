import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import HeroCta from '@/components/v4/HeroCta';
import SiteFooter from '@/components/SiteFooter';
import { min } from '@/lib/css';

/* /growth — PRIVATE DRAFT. NOT A PUBLIC PAGE (Jacob + Richard, July 2026).
 *
 * Tamer's note on the site: it sells the owner their time back, and never once argues
 * that the same machine makes them more money. Fair. This page is the money argument,
 * built for the founders to iterate on before any of it goes anywhere public.
 *
 * PRIVATE MEANS THREE THINGS, ALL LOAD-BEARING:
 *   1. metadata.robots is noindex,nofollow. Do not remove it while this is a draft.
 *   2. It appears in NO nav, NO footer, NO sitemap (app/sitemap.ts is an explicit
 *      allowlist and /growth is not on it), and not in the homepage Go deeper grid.
 *   3. It is reachable only by typing /growth.
 *
 * THE RULES THIS PAGE LIVES UNDER, same as the rest of the site:
 *   - No invented numbers. Every figure on this page is an external, published stat,
 *     presented as external, with its source named inline and linked at the bottom.
 *   - No ROI promise, no "typical customer saves X", no revenue guarantee. The only
 *     arithmetic on the page is the reader's own.
 *   - No calculator. The leak calculator is a documented anti-pattern; it fabricated
 *     precision. Prose invites the reader to do their own math instead.
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
.gro h1,.gro h2,.gro h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}

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

/* SECTIONS — the gold rhythm from /long-term. */
.gro-sec{padding:clamp(80px,11vw,140px) 0;border-top:1px solid #e6e6e1;}
.gro-sec:first-of-type{border-top:0;}
.gro-sec h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.03;max-width:20ch;}
.gro-sec p{margin-top:22px;font-size:clamp(16.5px,1.9vw,20px);line-height:1.65;color:#42474f;max-width:62ch;}
.gro-sec p b{font-weight:600;color:var(--v4-ink);}

/* THE CITE ROW. Visually distinct on purpose: these are the only numbers on the page,
   and every one of them is somebody else's, so they sit in their own labelled box
   instead of flowing through our prose. Border carries the ink gradient token. */
.gro-cite{margin-top:clamp(30px,3.6vw,42px);max-width:680px;padding:clamp(18px,2.4vw,26px) clamp(18px,2.6vw,28px);
  background:#f6f6f3;border-left:3px solid transparent;border-image:var(--sb-grad-ink) 1;}
.gro-cite .fig{font-size:clamp(17px,2vw,21px);font-weight:600;letter-spacing:-.015em;line-height:1.5;color:var(--v4-ink);}
.gro-cite .src{margin-top:10px;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5c636e;}

/* THE ARITHMETIC. Their numbers, in their head. No calculator, ever. */
.gro-math{background:#050506;padding:clamp(80px,11vw,140px) 0;}
.gro-math .eyebrow{color:#8a8f98;}
.gro-math h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.03;color:#fff;max-width:16ch;}
.gro-math h2 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.gro-math p{margin-top:22px;font-size:clamp(16.5px,1.9vw,20px);line-height:1.65;color:#aeb6c4;max-width:60ch;}
.gro-math p b{color:#fff;font-weight:600;}

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
              Five places money leaks out of a service business, what we do about each one, and
              the published research on what each leak costs. Then the math is yours.
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

      {/* 1 — MISSED CALLS */}
      <section className="gro-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The first leak</Reveal>
          <Reveal><h2>The call that rings out is a job that rings next door.</h2></Reveal>
          <Reveal>
            <p>
              Nobody calls a service business to browse. The caller has a problem today, and a
              short list of numbers to try. When yours goes to voicemail, most of them just dial
              the next name, and the job goes with them. You never even find out it happened.
            </p>
          </Reveal>
          <Reveal>
            <p>
              <b>What we do about it:</b> every call and text answered, 24 hours a day, in your
              voice, with your prices and your rules. The caller gets a real answer while
              everyone else in town is letting it ring.
            </p>
          </Reveal>
          <Reveal>
            <div className="gro-cite">
              <div className="fig">
                Researchers phoned real small businesses across 58 industries during working
                hours. A live person answered 37.8% of the time. The other 62% of calls went to
                voicemail or to nothing at all.
              </div>
              <div className="src">411 Locals, 2024</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — SPEED TO LEAD */}
      <section className="gro-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The second leak</Reveal>
          <Reveal><h2>The fastest answer usually wins the job.</h2></Reveal>
          <Reveal>
            <p>
              A homeowner with a leak messages three companies and hires the one that gets back
              first. Speed reads as competence before you have said a word about your work. The
              research on this is old, famous, and brutal to slow responders.
            </p>
          </Reveal>
          <Reveal>
            <p>
              <b>What we do about it:</b> the phone and the inbox are covered around the clock,
              so the first voice a customer hears back is yours, even when you are under a sink
              with both hands full.
            </p>
          </Reveal>
          <Reveal>
            <div className="gro-cite">
              <div className="fig">
                Firms that tried to reach a new lead within an hour were nearly seven times as
                likely to qualify it as firms that waited even an hour longer. The average
                company took 42 hours to respond, and 23% never responded at all.
              </div>
              <div className="src">Harvard Business Review, 2011</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 — QUOTE FOLLOW-UP. Careful with the claim: we chase the quote YOU sent.
          We do not draft quotes. That row was removed from the matrix for exactly
          this reason. Do not upgrade the claim here. */}
      <section className="gro-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The third leak</Reveal>
          <Reveal><h2>Quotes do not close themselves.</h2></Reveal>
          <Reveal>
            <p>
              You price the job, send the quote, and get buried in Tuesday. The customer had two
              questions and nobody to ask them, so the paper sat there until it went cold. The
              quote you sent on Thursday and forgot about is the most expensive thing in your
              business.
            </p>
          </Reveal>
          <Reveal>
            <p>
              <b>What we do about it:</b> every quote you send gets followed up, politely and
              persistently, until you have a yes or a no. Same for the invoices, so the money
              from the jobs you already did actually lands.
            </p>
          </Reveal>
          <Reveal>
            <div className="gro-cite">
              <div className="fig">
                Across home-service contractors on ServiceTitan, only 37% of estimates close on
                the first visit. The rest close in the follow-up, or never.
              </div>
              <div className="src">ServiceTitan</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 — REVIEWS */}
      <section className="gro-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The fourth leak</Reveal>
          <Reveal><h2>Reviews are compounding interest on being found.</h2></Reveal>
          <Reveal>
            <p>
              Every review makes you a little easier to find, which brings a few more jobs, which
              bring a few more reviews. The businesses at the top of the map did that on purpose,
              one finished job at a time, and the gap between asking and hoping compounds for
              years.
            </p>
          </Reveal>
          <Reveal>
            <p>
              <b>What we do about it:</b> a review asked for after every finished job, at the
              right moment, and every review answered, good or bad, under your name. Real
              reviews only. We write the reply, and we never write the review.
            </p>
          </Reveal>
          <Reveal>
            <div className="gro-cite">
              <div className="fig">
                75% of consumers regularly read online reviews when researching local
                businesses. 88% would use a business that replies to all of its reviews, against
                47% for a business that replies to none.
              </div>
              <div className="src">BrightLocal Local Consumer Review Survey, 2024</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — RETENTION */}
      <section className="gro-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The fifth leak</Reveal>
          <Reveal><h2>The cheapest job you will ever win is the second one.</h2></Reveal>
          <Reveal>
            <p>
              A past customer already trusts you, already has your number, and costs nothing to
              reach. Most of them do not leave, they just drift, and the furnace you serviced
              three winters ago gets its next service from whoever shows up in a search. That
              work was yours to lose.
            </p>
          </Reveal>
          <Reveal>
            <p>
              <b>What we do about it:</b> past customers brought back before they drift, reminded
              at the right time about the work they are actually due for.
            </p>
          </Reveal>
          <Reveal>
            <div className="gro-cite">
              <div className="fig">
                Bain &amp; Company research found that raising customer retention by 5% increases
                profits by 25% to 95%, and that winning a new customer costs five to
                twenty-five times as much as keeping one you already have.
              </div>
              <div className="src">Harvard Business Review, citing Bain &amp; Company, 2014</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE ARITHMETIC. The reader's numbers. Never ours. No calculator, no counter,
          no "typical customer". The one hypothetical below is the reader's own average
          ticket, and the page says so. */}
      <section className="gro-math">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The arithmetic</Reveal>
          <Reveal><h2>Do the math with <span className="g">your numbers.</span></h2></Reveal>
          <Reveal>
            <p>
              We are not going to tell you what any of this is worth to your business, because we
              do not know your average ticket, and anyone who quotes you a savings figure off a
              website made it up.
            </p>
          </Reveal>
          <Reveal>
            <p>
              So use yours. <b>If your average job is four hundred dollars, one call that gets
              answered instead of missed covers two months of StayBookt.</b> One quote that
              closes because somebody chased it covers two more. Now look at the five leaks
              above, put your own numbers where the research is, and see what the year looks
              like.
            </p>
          </Reveal>
          <Reveal>
            <p>
              None of the figures on this page are ours. They are published research, linked
              below, and none of them is a promise about your business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SOURCES. Every number above, findable. */}
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

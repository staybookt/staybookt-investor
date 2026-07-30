import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import HeroCta from '@/components/v4/HeroCta';
import RemovalTest from '@/components/v4/RemovalTest';
import SiteFooter from '@/components/SiteFooter';
import { min } from '@/lib/css';

const SHARE =
  'Six things make an owner-operated business worth more than the jobs it does this month. Here they are, and here is which ones we do for you.';

export const metadata = {
  title: 'Long-term value',
  description: SHARE,
  alternates: { canonical: '/long-term' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Long-term value · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/long-term',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'Long-term value · StayBookt', description: SHARE },
};

/* THIS PAGE REPLACED /enjoy-life (Richard, review round 2, July 2026).
 *
 * The /enjoy-life version was the same argument wearing the wrong title. Richard:
 * "This feels like the weakest part of the site. Enjoy Life has a different connotation
 * than I think the page is doing so it feels clunky. The 4 points lack flow." And:
 * "We have done a great job messaging Enjoy Life embedded in the other pages... I would
 * focus on long-term value as a stand alone. By just focusing on this, the page will get
 * crisper."
 *
 * He was right about the diagnosis. The page was titled after a feeling and argued
 * economics, so the reader had to hold two ideas at once and neither landed. Enjoy Life is
 * the payoff and it lands everywhere else. This page does one job: what makes the thing
 * worth something later, and which parts of that we actually do.
 *
 * He also asked for the chart, and the chart is the point of the page: "I like a chart that
 * highlights the things that create long-term value and that StayBookt checks the box."
 *
 * KEPT from the old page (he said "I like some of the messaging"): the second-job engine,
 * "a buyer is not buying your van", "we take none of it", and the refusal to put a number
 * on anything. CUT: the three doors, and the Enjoy Life framing throughout.
 *
 * THE RULE THAT KILLED THE FIRST VERSION OF THIS PAGE, STILL IN FORCE: no valuation
 * numbers. Not one. Not a multiple, not a range, not "typically". State the mechanism,
 * never the number. The $420,000 counter and the valuation FAQ were both removed for this.
 */

const CSS = `
/* DESIGN SYSTEM NOTE. This page was hand-rolled and did not match the site: left-aligned
   where every interior page is centred, a 72px h1 against the standard 86-92px, a short hero
   against min(88vh,820px), and a pill badge eyebrow that only the homepage is supposed to
   have. It looked like a different site, because it was built off the old /enjoy-life, which
   was itself a one-off. Copying a one-off is how the drift spreads.
   The values below are lifted from /pricing and /how-it-works, which are the standard:
     eyebrow   13px / 700 / .18em / uppercase / #69707d (#c9cdd6 on dark)
     headings  600 / letter-spacing -.035em
     hero      the shared .pg-hero in globals.css, standard dark variant.
     h1        clamp(42px,6.6vw,86px), line-height 1.0, max 14ch, centred
     lead      clamp(18px,2.1vw,23px) / 1.45 / #c6cbd3
     h2        clamp(30px,4.4vw,56px), line-height 1.03
     section   clamp(80px,11vw,140px)
   The no-photo rule above still holds and is now moot: this page does not get a Pexels
   still, it gets the film. The site has exactly two lifestyle video headers, the homepage
   and this one, and both run the same public/hero-loop.mp4 through the same HeroMedia, so
   a phone gets the 38KB poster and only a viewport above 761px pays for the 1.24MB clip.
   No second asset, no second breakpoint to keep in sync. */
.lt{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);}
.lt .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.lt .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.lt h1,.lt h2,.lt h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}

/* HERO. The standard .pg-hero in globals.css. No hue override, so it takes the
   default wash. See the note at the header for why there is no photo. */

/* SECTIONS — clamp(80px,11vw,140px) is the gold rhythm. */
.lt-sec{padding:clamp(80px,11vw,140px) 0;border-top:1px solid #e6e6e1;}
.lt-sec:first-of-type{border-top:0;}
.lt-sec h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.03;max-width:18ch;}
.lt-sec p{margin-top:22px;font-size:clamp(16.5px,1.9vw,20px);line-height:1.65;color:#42474f;max-width:62ch;}
.lt-sec p b{font-weight:600;color:var(--v4-ink);}
.lt-kick{margin-top:clamp(34px,4vw,46px);padding-left:clamp(16px,2vw,22px);border-left:3px solid transparent;
  border-image:var(--sb-grad-ink) 1;font-size:clamp(20px,2.6vw,32px);font-weight:600;letter-spacing:-.025em;
  line-height:1.25;color:var(--v4-ink);max-width:24ch;}

.lt-none{background:#050506;padding:clamp(80px,11vw,140px) 0;}
.lt-none .eyebrow{color:#8a8f98;}
.lt-none h2{margin-top:14px;font-size:clamp(30px,4.4vw,56px);line-height:1.03;color:#fff;max-width:14ch;}
.lt-none h2 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.lt-none p{margin-top:22px;font-size:clamp(16.5px,1.9vw,20px);line-height:1.65;color:#aeb6c4;max-width:60ch;}
.lt-none p b{color:#fff;font-weight:600;}
`;

export default function LongTermPage() {
  return (
    <div className="lt v4" id="top">
      <style>{min(CSS)}</style>
      <Nav />
      <main id="main" tabIndex={-1}>

      {/* NO PHOTO HERE, ON PURPOSE. This page ran the same lifestyle clip as the
          homepage, then a stock photo of two vans. Both failed on inspection: the first
          pair were showroom-new Mercedes on an empty motorway, which reads as a van
          dealership advert, and the replacement fleet turned out to be liveried Canada
          Post vehicles, logo and phone number legible, which is a third party brand we
          cannot put behind our own headline.
          Neither was a near miss worth patching. A page arguing that the business is worth
          something does not get illustrated by somebody else's fleet, and the real
          centrepiece here is the RemovalTest film below. So it takes the same dark header
          every other page uses. If the right photo turns up it becomes .film again in one
          line. */}
      <header className="pg-hero">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">Long-term value</Reveal>
          <Reveal>
            <h1>One day, this has to be <span className="g">worth something</span><span className="pd">.</span></h1>
          </Reveal>
          <Reveal>
            <p>
              Not today. But every year you spend as the only person who can answer the phone is a
              year spent building a job instead of a business. Here is the difference, and the part
              of it we actually do.
            </p>
          </Reveal>
        </div>
      </header>

      {/* THE ONE FACT. This section used to be called "The trap" and opened on
          "There is no time, and there is nothing to sell. Same reason." Richard:
          "confusing without context below which I don't like." He was right: it was a riddle,
          and the answer arrived two paragraphs later. His own rewrite carried the logic
          properly, so the section leads with the fact now and the riddle is gone. */}
      <section className="lt-sec">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The one fact</Reveal>
          <Reveal><h2>If it cannot run without you, there is nothing to hand anyone.</h2></Reveal>
          {/* First paragraph removed (Jacob + Richard, Jul 23 2026): the headline already lands
              the fact; the "every call comes to you" build-up held the reader up from it. */}
          <Reveal>
            <p>
              A buyer is not buying your van and your customer list. <b>They are buying
              whether any of it works when you are not standing there.</b> The more the answer to
              every question is you, the harder it is to hand over, and the less anyone will pay for
              it. That is not our opinion. Ask anyone who buys these businesses for a living.
            </p>
          </Reveal>
          <Reveal><div className="lt-kick">Build long-term wealth, not a job.</div></Reveal>
          {/* ADDED (Richard's feedback, relayed by Jacob, Jul 30 2026, via an "Edit to the
              above:" rewrite): "my suggestions would come after the quotes... I like the
              combo." His call was to add this after the lt-kick pull-quote rather than
              replace the shorter paragraph above it — the short version lands the fact fast,
              this expands on why it is true and what a buyer actually checks for. Trimmed
              one line from his draft: it closed on "That is not our opinion. Ask anyone who
              buys these businesses for a living.", the same sentence already sitting at the
              end of the paragraph directly above the quote — kept once, not twice. Also
              fixed "shear will" -> "sheer will" and de-contracted ("don't" -> "do not") to
              match this section's own register, which already runs uncontracted. */}
          <Reveal>
            <p>
              If your business would go backwards without you, a buyer is not going to pay
              you a lot of money. So you need to plan today, to have a business to sell in
              the future.
            </p>
          </Reveal>
          <Reveal>
            <p>
              To maximize your business value, you do not want to be in a position where you
              are selling assets and a customer list. That happens when the business is run
              on your cell phone and the customers go away when you leave. Buyers want
              businesses that can work when the owner is not standing there. Otherwise, what
              are they buying?
            </p>
          </Reveal>
          <Reveal>
            <p>
              You need to demonstrate repeatable channel revenue, strong repeat business,
              healthy referral levels, day-to-day operations run by systems, not sheer will,
              and an impressive online presence associated with the business, not the owner.
              Most buyers do not want to buy a job. They want a business that has a path to
              grow.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE CHART BECAME A FILM (Jacob, July 2026).
          "The homepage and how it works have an immersive experience... they do a beautiful
          job of showing and telling, engaging the user through the page instead of forcing
          reading." He was right: this page was a memo sitting inside a cinematic site, and
          the chart Richard asked for was the strongest thing on it, buried under three
          sections of essay.
          RemovalTest IS the chart. Same six drivers, same "checks the box" logic Richard
          wanted, except the reader watches the lights go out instead of reading a table
          column. The "You, today" copy was the best writing on the page and it was greyed
          out in the quietest column; now it is what you see when the power goes off. */}
      <RemovalTest />

      {/* "WHAT COMPOUNDS" WAS HERE AND IS GONE (Richard, review round 3, July 2026).
          "I feel the What Compounds is out of place. It breaks the flow and I think detracts
          from what you have done above which feels like a 'drop the mic' presentation. Why do
          you think we need this?"
          The honest answer to his question: I kept it because he had said he liked that
          messaging on the old /enjoy-life. That is a reason to keep a sentence, not a reason
          to put it after the payoff. The film IS the argument now, and the second-job idea it
          carried already lives inside the film as driver 2 ("Past customers brought back for
          the work they are due"). Saying it again in prose, after the lights come back on, is
          explaining the joke.
          The page now goes: the one fact -> the film -> we take none of it -> the door. */}

      {/* "THE PART NOBODY BELIEVES / And we take none of it" SECTION REMOVED (Jacob, Jul 23
          2026): it was more dense text after the film's drop-the-mic, and the no-commission /
          no-share point is already made on pricing, the promises and the matrix. The page now
          goes: the one fact → the film → the door. */}

      {/* fromBlack: the RemovalTest film directly above ends on #050506, so the CTA still
          dissolves out of solid black. */}
      {/* Richard (Images doc, Jul 28): the campfire read "campsite", he wants a wealth
          angle — "a cottage that is nice but not Muskoka nice." Warm autumn lakeside
          cottage (Pexels 314670) + his two lines, no subtext. */}
      <HeroCta
        fromBlack
        img="/close-lt-cottage.jpg"
        heading={<>Create a memorable legacy.<br />Build your wealth.</>}
        sub={null}
      />
      </main>
      <SiteFooter />
    </div>
  );
}

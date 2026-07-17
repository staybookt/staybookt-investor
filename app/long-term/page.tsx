import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import HeroCta from '@/components/v4/HeroCta';
import RemovalTest from '@/components/v4/RemovalTest';
import SiteFooter from '@/components/SiteFooter';

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
     eyebrow   13px / 700 / .18em / uppercase / #8a8f98 (#c9cdd6 on dark)
     headings  600 / letter-spacing -.035em
     hero      centred, #050506, radial grade, clamp(140px,17vh,190px) top
     h1        clamp(42px,6.6vw,86px), line-height 1.0, max 14ch, centred
     lead      clamp(18px,2.1vw,23px) / 1.45 / #c6cbd3
     h2        clamp(30px,4.4vw,56px), line-height 1.03
     section   clamp(80px,11vw,140px)
   /pricing is the model rather than /how-it-works because this is an argument page with no
   photo. Do not add a photo hero here: the only three Pexels IDs in this codebase are all
   spoken for, and HeroCta at the bottom of THIS page already uses one of them. */
.lt{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);}
.lt .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.lt .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8a8f98;}
.lt h1,.lt h2,.lt h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}

/* HERO — the /pricing pattern exactly. */
.lt-hero{position:relative;background:#050506;padding:clamp(140px,17vh,190px) 0 clamp(80px,10vw,120px);overflow:hidden;text-align:center;}
.lt-hero::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(58% 46% at 50% 0%,rgba(79,70,229,.16),transparent 64%);}
.lt-hero .wrap{position:relative;z-index:1;}
.lt-hero .eyebrow{color:#c9cdd6;}
.lt-hero h1{margin-top:18px;font-size:clamp(42px,6.6vw,86px);line-height:1.0;max-width:14ch;
  margin-left:auto;margin-right:auto;color:#fff;text-shadow:0 4px 44px rgba(0,0,0,.6);}
.lt-hero h1 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.lt-hero p{margin:26px auto 0;font-size:clamp(18px,2.1vw,23px);line-height:1.45;color:#c6cbd3;max-width:46ch;}

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
    <main className="lt v4" id="top">
      <style>{CSS}</style>
      <Nav />

      <header className="lt-hero">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">Long-term value</Reveal>
          <Reveal>
            <h1>One day, this has to be <span className="g">worth something.</span></h1>
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
          <Reveal>
            <p>
              Every call comes to you. Every quote waits on you. On a Tuesday that is just the job.
              It only becomes the problem on the day you want to step back, hand it to your
              daughter, or sell it.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Because a buyer is not buying your van and your customer list. <b>They are buying
              whether any of it works when you are not standing there.</b> The more the answer to
              every question is you, the harder it is to hand over, and the less anyone will pay for
              it. That is not our opinion. Ask anyone who buys these businesses for a living.
            </p>
          </Reveal>
          <Reveal><div className="lt-kick">You do not own the business. You are the business.</div></Reveal>
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

      <section className="lt-none">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">The part nobody believes</Reveal>
          <Reveal><h2>And we take <span className="g">none of it.</span></h2></Reveal>
          <Reveal>
            <p>
              No commission on your jobs. No share of your revenue. No share of what the business
              sells for, if it ever sells. <b>$199 a month is the entire commercial relationship</b>,
              and it stays $199 whether the business doubles, triples, or you hand it to your
              daughter on a Tuesday.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Everyone else circling this industry wants a piece of the upside, because the upside is
              where the real money is. We would rather be easy to leave.
            </p>
          </Reveal>
          {/* THE RULE. Do not put a number here, ever. */}
          <Reveal>
            <p>
              <b>And we are not going to tell you what your business is worth.</b> We do not know,
              and anybody who puts a number on that on a website has made it up.
            </p>
          </Reveal>
        </div>
      </section>

      {/* fromBlack: .lt-none directly above is #050506. Without it the CTA's photo opens at
          a 60% scrim and hard-cuts out of solid black — the exact seam fromBlack dissolves. */}
      <HeroCta fromBlack />
      <SiteFooter />
    </main>
  );
}

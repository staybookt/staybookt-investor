import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import CalEmbed from '@/components/v4/CalEmbed';
import SiteFooter from '@/components/SiteFooter';

const SHARE_DESCRIPTION =
  'Thirty minutes with a founder. No pitch, no slides, no sales rep. Tell us what is going on and we will tell you straight whether we can help.';

export const metadata = {
  title: 'Book a call',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/start' },
  openGraph: {
    title: 'Book a call · StayBookt',
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com/start',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a call · StayBookt',
    description: SHARE_DESCRIPTION,
  },
};

/* THIS PAGE HAS ONE JOB: BOOK THE CALL. (Jacob, live review, July 2026.)
 *
 * It used to be a sales page with a calendar buried at the bottom as the fifth
 * section. Hero, then a mystery-shop "call sheet", then a minute-by-minute breakdown
 * of the thirty minutes, then the founder bios, and only then the booking form.
 *
 * Everyone who lands here pressed Get Started. They have already been sold, by the
 * homepage, which is the page whose job is selling. Answering that click with another
 * pitch is us talking when we should be listening.
 *
 * So: a headline that says exactly what you are booking, three facts, the calendar,
 * and the two faces you might be talking to. Nothing else.
 *
 * THE "WE TRY TO HIRE YOU" MYSTERY SHOP IS NOT ON THIS PAGE. It is a marketing idea
 * and it belongs on the marketing pages, where it still runs as a line under the
 * homepage hero. It does not belong in front of a person trying to pick a time.
 *
 * If you are about to add a section to this page, do not. Add it to the homepage. */

const FACTS: { k: string; v: string }[] = [
  { k: '30 minutes', v: 'That is the whole ask.' },
  { k: 'With a founder', v: 'Richard or Jacob. Never a sales rep.' },
  { k: 'No pitch', v: 'If you do not need us, we will say so.' },
];

const CSS = `
.st{background:#050506;color:#fff;}
.st .wrap{width:100%;max-width:1180px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}

.st-hero{position:relative;overflow:hidden;padding:clamp(108px,13vh,146px) 0 clamp(80px,10vw,120px);}
.st-hero::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(58% 60% at 10% 0%,rgba(16,185,129,.15),transparent 62%),
             radial-gradient(50% 60% at 92% 24%,rgba(79,70,229,.13),transparent 62%);}
.st-hero .wrap{position:relative;z-index:1;}

/* THE CALENDAR IS FULL WIDTH, AND THAT IS NOT A STYLE CHOICE.
   This was a two-column hero: copy left, calendar right in a ~486px column. Cal.com's
   booker switches to its STACKED MOBILE LAYOUT below roughly 768px of container width:
   the month grid, and then every single time slot in one long vertical list. It
   rendered 1,735px tall next to 500px of copy, so the hero became a mile-high white
   column beside an empty black one.

   No amount of styling fixes that. The embed needs the width to use its side-by-side
   desktop layout, and there is not 768px+ of room next to a column of text on an
   1180px page. So the copy sits above it and the calendar gets the whole width, which
   is what makes it compact. Do not put this back in a narrow column. */
.st-copy{text-align:center;max-width:720px;margin:0 auto;}

.st-k{display:inline-flex;align-items:center;gap:8px;font-size:11.5px;font-weight:700;
  letter-spacing:.2em;text-transform:uppercase;color:#9aa3b2;}
.st-k .dot{width:6px;height:6px;border-radius:50%;background:var(--sb-grad);box-shadow:0 0 10px 1px rgba(16,185,129,.7);}
.st-h{margin-top:16px;font-size:clamp(38px,5.2vw,70px);font-weight:600;letter-spacing:-.042em;
  line-height:1.0;color:#fff;max-width:14ch;margin-left:auto;margin-right:auto;}
.st-h .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.st-sub{margin:22px auto 0;font-size:clamp(16px,1.8vw,19px);line-height:1.6;color:#aeb6c4;max-width:48ch;}

.st-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(14px,2vw,24px);
  margin:clamp(32px,3.8vw,44px) auto 0;max-width:720px;}
@media(max-width:640px){.st-facts{grid-template-columns:1fr;gap:12px;}}
.st-f{text-align:left;padding-top:14px;border-top:1px solid rgba(255,255,255,.14);}
.st-f:first-child{border-top-color:rgba(16,185,129,.6);}
.st-f b{display:block;font-size:14.5px;font-weight:600;color:#fff;letter-spacing:-.01em;}
.st-f span{display:block;margin-top:6px;font-size:13.5px;line-height:1.45;color:#98a0ae;}

/* the calendar is the page. it is a real object, and it stays with you. */
/* wide enough for cal.com's desktop layout, which is what keeps it short */
.st-cal{background:#fff;border-radius:22px;padding:clamp(8px,1.2vw,14px);
  max-width:1080px;margin:clamp(40px,5vw,60px) auto 0;
  box-shadow:0 50px 110px -40px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.07);}

/* who is on the call. the only thing under the fold, because it is the only thing
   a person still wonders about once the calendar is in front of them. */
.st-who{border-top:1px solid rgba(255,255,255,.08);padding:clamp(60px,8vw,96px) 0 clamp(70px,9vw,110px);}
.st-who .k{font-size:11.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#6f7787;}
.st-who h2{margin-top:14px;font-size:clamp(24px,3vw,40px);font-weight:600;letter-spacing:-.035em;color:#fff;max-width:18ch;}
.st-two{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,56px);margin-top:clamp(32px,4vw,48px);max-width:900px;}
@media(max-width:760px){.st-two{grid-template-columns:1fr;gap:28px;}}
.st-p{display:flex;gap:16px;align-items:flex-start;}
.st-p img{width:76px;height:76px;flex:0 0 auto;border-radius:16px;object-fit:cover;object-position:center 18%;
  box-shadow:0 24px 44px -28px rgba(0,0,0,.8);}
.st-p img.hi{object-position:center top;}
.st-p .nm{font-size:17.5px;font-weight:600;letter-spacing:-.025em;color:#fff;}
.st-p .ro{margin-top:3px;font-size:13px;font-weight:600;color:#5eead4;}
.st-p .bi{margin-top:8px;font-size:14.5px;line-height:1.55;color:#98a0ae;max-width:34ch;}
.st-note{margin-top:clamp(32px,4vw,44px);font-size:14.5px;color:#79808e;}
.st-note a{color:#5eead4;text-decoration:none;font-weight:600;}
.st-note a:hover{text-decoration:underline;}
`;

export default function StartPage() {
  return (
    <main className="st v4" id="top">
      <style>{CSS}</style>
      <Nav />

      <section className="st-hero">
        <div className="wrap">
          <div className="st-copy">
            <Reveal as="div">
              <div className="st-k"><span className="dot" aria-hidden />Free &middot; no pitch</div>
            </Reveal>
            <Reveal>
              <h1 className="st-h">
                Thirty minutes with <span className="g">a founder.</span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="st-sub">
                No slides and no sales rep. Tell us what is going on in the business, and we will
                tell you straight whether we can help.
              </p>
            </Reveal>
            <Reveal>
              <div className="st-facts">
                {FACTS.map((f) => (
                  <div className="st-f" key={f.k}>
                    <b>{f.k}</b>
                    <span>{f.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="st-cal">
            <CalEmbed />
          </div>
        </div>
      </section>

      <section className="st-who">
        <div className="wrap">
          <Reveal as="div">
            <div className="k">Who is on the call</div>
          </Reveal>
          <Reveal>
            <h2>There are two of us. You get one of us.</h2>
          </Reveal>
          <div className="st-two">
            <Reveal className="st-p">
              <img src="/photos/richard.jpg" alt="Richard Roos, co-founder of StayBookt" width={76} height={76} />
              <div>
                <div className="nm">Richard Roos</div>
                <div className="ro">Operations, growth, and finance</div>
                <p className="bi">Two decades running the front of a service business at scale, and a CPA.</p>
              </div>
            </Reveal>
            <Reveal className="st-p">
              <img className="hi" src="/photos/jacob.jpg" alt="Jacob Charendoff, co-founder of StayBookt" width={76} height={76} />
              <div>
                <div className="nm">Jacob Charendoff</div>
                <div className="ro">Brand, product, and growth</div>
                <p className="bi">A decade standing next to owners across half a dozen industries.</p>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <p className="st-note">
              No handoff to a rep. No &ldquo;let me get you with someone.&rdquo;{' '}
              <a href="/founders">More about us &rarr;</a>
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

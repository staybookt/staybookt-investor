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
.st{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);}
.st .wrap{width:100%;max-width:1180px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}

/* DARK HERO, LIGHT BODY. This page was dark the whole way down, which is why the
   calendar needed a white box to sit inside, and why that box read as a picture frame
   around a dark photo (Jacob, live review, July 2026).

   Every other page here is dark hero then light body: home, how-it-works, pricing,
   what's included, about. /start was the only one fighting that, and it lost. Now it
   matches, and the calendar sits on cream like every other piece of content on this
   site, in the same white card the comparison chart uses. */
.st-hero{position:relative;overflow:hidden;background:#050506;
  padding:clamp(104px,13vh,140px) 0 clamp(56px,6vw,80px);}
.st-hero::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(58% 70% at 12% 0%,rgba(16,185,129,.16),transparent 62%),
             radial-gradient(52% 70% at 90% 10%,rgba(79,70,229,.14),transparent 62%);}
.st-hero .wrap{position:relative;z-index:1;}
.st-copy{text-align:center;max-width:720px;margin:0 auto;}

.st-k{display:inline-flex;align-items:center;gap:8px;font-size:11.5px;font-weight:700;
  letter-spacing:.2em;text-transform:uppercase;color:#9aa3b2;}
.st-k .dot{width:6px;height:6px;border-radius:50%;background:var(--sb-grad);box-shadow:0 0 10px 1px rgba(16,185,129,.7);}
.st-h{margin:16px auto 0;font-size:clamp(38px,5.2vw,68px);font-weight:600;letter-spacing:-.042em;
  line-height:1.0;color:#fff;max-width:14ch;}
.st-h .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.st-sub{margin:20px auto 0;font-size:clamp(16px,1.8vw,19px);line-height:1.6;color:#aeb6c4;max-width:48ch;}

.st-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(14px,2vw,24px);
  margin:clamp(30px,3.6vw,40px) auto 0;max-width:720px;}
@media(max-width:640px){.st-facts{grid-template-columns:1fr;gap:12px;}}
.st-f{text-align:left;padding-top:14px;border-top:1px solid rgba(255,255,255,.14);}
.st-f:first-child{border-top-color:rgba(16,185,129,.6);}
.st-f b{display:block;font-size:14.5px;font-weight:600;color:#fff;letter-spacing:-.01em;}
.st-f span{display:block;margin-top:6px;font-size:13.5px;line-height:1.45;color:#98a0ae;}

/* THE CALENDAR. Cream section, white card, exactly like the comparison chart.
   It must stay at least 768px wide: below that cal.com flips to its stacked mobile
   layout and renders every time slot in one 1,700px list. */
.st-book{padding:clamp(44px,5.5vw,70px) 0 clamp(70px,9vw,110px);}
.st-cal{background:#fff;border:1px solid #e6e6e1;border-radius:24px;padding:clamp(10px,1.4vw,16px);
  max-width:1080px;margin:0 auto;
  box-shadow:0 40px 80px -46px rgba(6,12,20,.35),0 2px 6px -2px rgba(6,12,20,.06);}

/* who is on the call. the only thing under the calendar, because it is the only thing
   a person still wonders about once the times are in front of them. */
.st-who{border-top:1px solid #e6e6e1;padding:clamp(56px,7vw,90px) 0 clamp(70px,9vw,110px);}
.st-who .k{font-size:11.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#8a8f98;}
.st-who h2{margin-top:14px;font-size:clamp(24px,3vw,40px);font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);max-width:18ch;}
.st-two{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,56px);margin-top:clamp(30px,3.6vw,44px);max-width:900px;}
@media(max-width:760px){.st-two{grid-template-columns:1fr;gap:28px;}}
.st-p{display:flex;gap:16px;align-items:flex-start;}
.st-p img{width:76px;height:76px;flex:0 0 auto;border-radius:16px;object-fit:cover;object-position:center 18%;
  box-shadow:0 24px 44px -28px rgba(6,12,20,.5);}
.st-p img.hi{object-position:center top;}
.st-p .nm{font-size:17.5px;font-weight:600;letter-spacing:-.025em;color:var(--v4-ink);}
.st-p .ro{margin-top:3px;font-size:13px;font-weight:600;color:#059669;}
.st-p .bi{margin-top:8px;font-size:14.5px;line-height:1.55;color:#6b7280;max-width:34ch;}
.st-note{margin-top:clamp(30px,3.6vw,42px);font-size:14.5px;color:#8a8f98;}
.st-note a{color:#0284c7;text-decoration:none;font-weight:600;}
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
        </div>
      </section>

      <section className="st-book" id="book">
        <div className="wrap">
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

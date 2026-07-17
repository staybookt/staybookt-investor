import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import CalEmbed from '@/components/v4/CalEmbed';
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';
import SiteFooter from '@/components/SiteFooter';
import { min } from '@/lib/css';

const SHARE_DESCRIPTION =
  'Thirty minutes with a founder. We will show you where the work is slipping, and what it would take to get your life back. No slides, no sales rep.';

export const metadata = {
  title: 'See where the work is slipping',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/start' },
  openGraph: {
    /* Defining openGraph WITHOUT images suppresses the inherited app/opengraph-image.tsx,
       so this page shared as a bare grey rectangle. Every page needs its own images line. */
    images: ['/opengraph-image'],
    title: 'See where the work is slipping · StayBookt',
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com/start',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'],
    card: 'summary_large_image',
    title: 'See where the work is slipping · StayBookt',
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
/* TIGHTENED so the calendar is actually in view on load. The hero was 565px and the
   calendar started at 635px on a 713px viewport, which meant we had moved it up the
   page and it was STILL one scroll away. A booking page whose calendar you have to go
   looking for is the thing we were fixing. Do not pad this back out. */
.st-hero{position:relative;overflow:hidden;background:#050506;
  padding:clamp(84px,10vh,104px) 0 clamp(34px,3.6vw,46px);}
.st-hero::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(58% 70% at 12% 0%,rgba(16,185,129,.16),transparent 62%),
             radial-gradient(52% 70% at 90% 10%,rgba(79,70,229,.14),transparent 62%);}
.st-hero .wrap{position:relative;z-index:1;}
.st-copy{text-align:center;max-width:720px;margin:0 auto;}

.st-k{display:inline-flex;align-items:center;gap:8px;font-size:11.5px;font-weight:700;
  letter-spacing:.2em;text-transform:uppercase;color:#9aa3b2;}
.st-k .dot{width:6px;height:6px;border-radius:50%;background:var(--sb-grad);box-shadow:0 0 10px 1px rgba(16,185,129,.7);}
.st-h{margin:12px auto 0;font-size:clamp(34px,4.4vw,56px);font-weight:600;letter-spacing:-.042em;
  line-height:1.02;color:#fff;max-width:15ch;}
.st-h .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.st-sub{margin:16px auto 0;font-size:clamp(15.5px,1.65vw,17.5px);line-height:1.55;color:#aeb6c4;max-width:50ch;}

.st-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(14px,2vw,24px);
  margin:clamp(22px,2.6vw,28px) auto 0;max-width:680px;}
@media(max-width:640px){.st-facts{grid-template-columns:1fr;gap:12px;}}
.st-f{text-align:left;padding-top:11px;border-top:1px solid rgba(255,255,255,.14);}
.st-f:first-child{border-top-color:rgba(16,185,129,.6);}
.st-f b{display:block;font-size:14.5px;font-weight:600;color:#fff;letter-spacing:-.01em;}
.st-f span{display:block;margin-top:6px;font-size:13.5px;line-height:1.45;color:#98a0ae;}

/* THE CALENDAR. Cream section, white card, exactly like the comparison chart.
   It must stay at least 768px wide: below that cal.com flips to its stacked mobile
   layout and renders every time slot in one 1,700px list. */
.st-book{padding:clamp(30px,3.6vw,44px) 0 clamp(60px,7vw,88px);}
.st-cal{background:#fff;border:1px solid #e6e6e1;border-radius:24px;padding:clamp(10px,1.4vw,16px);
.st-alt{margin:18px auto 0;text-align:center;font-size:15px;line-height:1.6;color:#6b7280;}
.st-alt a{color:var(--v4-ink,#06080d);font-weight:600;text-decoration:underline;text-underline-offset:2px;}
  max-width:1080px;margin:0 auto;
  box-shadow:0 40px 80px -46px rgba(6,12,20,.35),0 2px 6px -2px rgba(6,12,20,.06);}

/* who is on the call. the only thing under the calendar, because it is the only thing
   a person still wonders about once the times are in front of them. */
/* Jacob likes this and it stays. Tightened, not cut: it is the last thing on the page
   and it only has to answer one question, which is who am I actually going to meet. */
.st-who{border-top:1px solid #e6e6e1;padding:clamp(44px,5.5vw,68px) 0 clamp(56px,7vw,84px);}
.st-who .k{font-size:11.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#8a8f98;}
.st-who h2{margin-top:12px;font-size:clamp(22px,2.6vw,34px);font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);max-width:20ch;}
.st-two{display:grid;grid-template-columns:1fr 1fr;gap:clamp(22px,3.4vw,48px);margin-top:clamp(24px,2.8vw,34px);max-width:880px;}
@media(max-width:760px){.st-two{grid-template-columns:1fr;gap:28px;}}
.st-p{display:flex;gap:16px;align-items:flex-start;}
/* R13 ON RICHARD'S LIST ("your photo is cutting off your head") WAS ALREADY FIXED by
   the /start rebuild, which is what he was reviewing before. The old page had no
   object-position at all, so an 800x1071 portrait cover-cropped into a 76px square from
   the centre and took the top of Jacob's head off.
   Verified from the pixels, not the CSS: his head starts at row 33 of 1071 and the crop
   window shows rows 0-800. Richard's photo is already square (400x400) so the bias below
   is a no-op for him and harmless. Do not remove these. */
.st-p img{width:76px;height:76px;flex:0 0 auto;border-radius:16px;object-fit:cover;object-position:center 18%;
  box-shadow:0 24px 44px -28px rgba(6,12,20,.5);}
.st-p img.hi{object-position:center top;}
.st-p .nm{font-size:17.5px;font-weight:600;letter-spacing:-.025em;color:var(--v4-ink);}
.st-p .ro{margin-top:3px;font-size:13px;font-weight:600;color:#059669;}
.st-p .bi{margin-top:8px;font-size:14.5px;line-height:1.55;color:#6b7280;max-width:34ch;}
.st-note{margin-top:clamp(22px,2.8vw,32px);font-size:14px;color:#8a8f98;}
.st-note a{color:#0284c7;text-decoration:none;font-weight:600;}
.st-note a:hover{text-decoration:underline;}
`;

export default function StartPage() {
  return (
    <div className="st v4" id="top">
      <style>{min(CSS)}</style>
      <Nav />
      <main id="main" tabIndex={-1}>

      <section className="st-hero">
        <div className="wrap">
          <div className="st-copy">
            <Reveal as="div">
              <div className="st-k"><span className="dot" aria-hidden />Free &middot; no pitch</div>
            </Reveal>
            <Reveal>
              {/* Was "Thirty minutes with a founder." That is the logistics of the call, not
                  the reason to take it, and the logistics already live in the three facts
                  below (Jacob, live review, July 2026).

                  This is lifted from our own cal.com description, which had the promise in
                  it the whole time: "we'll show you exactly where you're losing work and
                  what it would take to get your life back." */}
              {/* WAS "See exactly where you are losing work" + "what it is costing you".
                  Both promised a measured number. We could make that promise when the call
                  came after a mystery shop; it does not any more. Privacy now says our prep
                  is public information only: the website, the Google listing, the reviews,
                  search. That is enough to show someone where the work is slipping. It is
                  not enough to cost it out to the dollar, and the leak calculator was killed
                  for exactly that overreach. */}
              <h1 className="st-h">
                See where the work is <span className="g">slipping.</span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="st-sub">
                Thirty minutes with a founder. No slides and no sales rep. We will show you what is
                slipping, and what it would take to get your life back.
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
          {/* THE ONLY WAY TO CONVERT ON THIS SITE WAS A THIRD-PARTY IFRAME WITH NOTHING BESIDE IT.
              Every "Get Started" on every page points here — nav, HeroCta, all three FAQs, the
              404. CalEmbed injects app.cal.com/embed/embed.js at runtime and renders into an
              empty div. If cal.com is slow, blocked, down, or simply not operable with a screen
              reader, /start was a 640px white box and the visitor had no way to reach us and
              nothing telling them one existed.
              This is not a JS error fallback — it is always visible, because the people most
              likely to need it are the ones for whom the embed silently fails to be usable
              rather than fails to load. /contact already had exactly this; the page that
              actually converts did not. */}
          <p className="st-alt">
            Rather not use the calendar? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call{' '}
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>. A founder answers either way.
          </p>
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
                <p className="bi">Two decades running the front of a service business, and a CPA.</p>
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
            {/* "No handoff to a rep. No 'let me get you with someone.'" is gone (Richard,
                review, July 2026). The facts at the top of this page already say "With a
                founder. Richard or Jacob. Never a sales rep." Saying it twice on one short
                page does not make it twice as true, it makes it sound like we are worried
                nobody believed it the first time.

                The link stays. It was the only part doing work. */}
            <p className="st-note">
              <a href="/founders">More about us &rarr;</a>
            </p>
          </Reveal>
        </div>
      </section>

      </main>

      <SiteFooter />
    </div>
  );
}

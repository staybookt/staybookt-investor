import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import CalEmbed from '@/components/v4/CalEmbed';
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';
import SiteFooter from '@/components/SiteFooter';
import { min } from '@/lib/css';

/* RICHARD'S GET STARTED REVISIONS (doc, relayed by Jacob, Aug 2 2026). Headline, sub,
   and the facts row all replaced with his copy — see the comments at each. His doc also
   included "why would you not take this call if you have spent this much time on the
   website?" — Jacob's call: that is Richard's rationale for the page closing harder,
   not a line for the page. Do not add it as copy. */
const SHARE_DESCRIPTION =
  'You can make more money. We have solutions. Thirty minutes to discuss how technology could improve your business. Free.';

export const metadata = {
  title: 'You can make more money. We have solutions.',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/start' },
  openGraph: {
    /* Defining openGraph WITHOUT images suppresses the inherited app/opengraph-image.tsx,
       so this page shared as a bare grey rectangle. Every page needs its own images line. */
    images: ['/opengraph-image'],
    title: 'You can make more money. We have solutions. · StayBookt',
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com/start',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'],
    card: 'summary_large_image',
    title: 'You can make more money. We have solutions. · StayBookt',
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

/* Facts row per Richard's revisions (Aug 2 2026): "You get a read" renamed to the thing
   it actually is, a Free Online Presence Assessment; and a fourth fact added, Honest
   Feedback — his copy, dash swapped for a colon per the no-dash rule. */
const FACTS: { k: string; v: string }[] = [
  { k: '30 minutes', v: 'That is the whole ask.' },
  { k: 'With a founder', v: 'Richard or Jacob. One of the two of us.' },
  { k: 'Free Online Presence Assessment', v: 'Where the work is slipping, and what we would do.' },
  { k: 'Honest Feedback', v: 'We will share our revenue operations experience with you, straight up.' },
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
/* THE ONE HEIGHT EXCEPTION ON THE SITE, and the comment above is the reason. The
   shared .pg-hero is clamp(140px,17vh,190px) top, which would put roughly 90px back
   on a page whose whole job is having the calendar in view on load. It keeps the
   base, the wash and the hue from the system and overrides the padding only.
   Indigo: /start is the booking, the same commitment rung as /pricing. */
.pg-hero.st-hero{padding:clamp(84px,10vh,104px) 0 clamp(34px,3.6vw,46px);--hero-hue:79,70,229;}
/* Was max-width:720px — fine when the headline was 27 characters, but Richard's line 1
   is 43 and nowrap, so it clipped at the container edge. The copy block is wide now and
   each child (sub 54ch, facts 920px) carries its own cap instead. */
.st-copy{text-align:center;max-width:1100px;margin:0 auto;}

/* 13px, was 11.5: sitewide eyebrow canon (consistency pass, Aug 4 2026). */
.st-k{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;
  letter-spacing:.2em;text-transform:uppercase;color:#9aa3b2;}
.st-k .dot{width:6px;height:6px;border-radius:50%;background:var(--sb-grad);box-shadow:0 0 10px 1px rgba(16,185,129,.7);}
/* Two-line headline per the locked global hero rule (punchline alone on line 2). Line 1
   ("You have opportunities to make more money.") is 43 characters — nowrap blocks,
   vw-scaled, same technique as the homepage's hl1/hl2.
   SPECIFICITY, learned the hard way (Aug 2 2026): globals.css line 804 sets
   ".pg-hero .wrap h1" at (0,2,1), which BEATS a bare .st-h class — this page's h1
   font-size has been dead CSS the whole time (the old "See where the work is slipping."
   actually rendered at globals' 6.6vw/86px, not the 56px written here). Verified via
   getComputedStyle in the live page: 84.48px. These rules carry .pg-hero.st-hero .wrap
   so they genuinely win; do not "simplify" them back down to .st-h. Same story for
   p.st-sub vs globals' ".pg-hero .wrap p". */
/* FULL FAMILY SIZE (Richard v2, 8-5-26): his new 24-char line 1 removes the length cap that
   held this hero at 48-52px for two rounds. Now the same ~84px class as every other hero. */
.pg-hero.st-hero .wrap h1.st-h{margin:12px auto 0;font-size:clamp(24px,6vw,84px);font-weight:600;
  letter-spacing:-.042em;line-height:1.06;color:#fff;max-width:none;}
.st-h .l1,.st-h .l2{display:block;white-space:nowrap;}
/* MOBILE (headless-iPhone audit, Aug 4 2026): the desktop nowrap lock crushed this hero to
   16px at 390px wide — SMALLER than its own subtext, inverted hierarchy. On a phone the
   lines wrap naturally and the type sizes back up to hero weight. */
@media(max-width:700px){
  .pg-hero.st-hero .wrap h1.st-h{font-size:clamp(27px,7.6vw,34px);line-height:1.12;}
  .st-h .l1,.st-h .l2{white-space:normal;}
}
.st-h .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
/* Sub bumped a step (Richard v2: "generally the font sizing looks a bit small and harder
   to read" on this page). */
.pg-hero.st-hero .wrap p.st-sub{margin:18px auto 0;font-size:clamp(16.5px,1.85vw,19.5px);line-height:1.55;color:#aeb6c4;max-width:54ch;}

/* Four facts now (Richard added Honest Feedback): 4-up on desktop, 2x2 on tablet,
   stacked on phone. Widened to fit the longer labels. */
.st-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(14px,2vw,24px);
  margin:clamp(22px,2.6vw,28px) auto 0;max-width:920px;}
@media(max-width:860px){.st-facts{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;max-width:560px;}}
@media(max-width:480px){.st-facts{grid-template-columns:1fr;gap:12px;}}
.st-f{text-align:left;padding-top:11px;border-top:1px solid rgba(255,255,255,.14);}
.st-f:first-child{border-top-color:rgba(16,185,129,.6);}
.st-f b{display:block;font-size:14.5px;font-weight:600;color:#fff;letter-spacing:-.01em;}
.st-f span{display:block;margin-top:6px;font-size:13.5px;line-height:1.45;color:#98a0ae;}

/* THE CALENDAR. Cream section, white card, exactly like the comparison chart.
   It must stay at least 768px wide: below that cal.com flips to its stacked mobile
   layout and renders every time slot in one 1,700px list. */
.st-book{padding:clamp(30px,3.6vw,44px) 0 clamp(60px,7vw,88px);}
.st-cal{background:#fff;border:1px solid #e6e6e1;border-radius:24px;padding:clamp(10px,1.4vw,16px);
  max-width:1080px;margin:0 auto;
  box-shadow:0 40px 80px -46px rgba(6,12,20,.35),0 2px 6px -2px rgba(6,12,20,.06);}

/* THE .st-alt RULES WERE PASTED INSIDE THE UNCLOSED .st-cal BLOCK AND NEVER APPLIED.
   .st-cal spans four lines; both .st-alt rules had been dropped in after line one, so
   they sat inside .st-cal's declaration block while max-width/margin/box-shadow below
   them still belonged to .st-cal. A declaration block is not a place a rule can live:
   legacy CSS treats it as a parse error, and under CSS nesting it resolves to
   ".st-cal .st-alt". .st-alt is a SIBLING of .st-cal (both are children of .wrap in
   .st-book), never a descendant, so under either reading it matched nothing and the
   fallback shipped with no styling at all: no centring, no size, no margin, and no
   underline on its own links.
   That is also why the reported 4.47:1 was never actually on screen. With the rule dead,
   .st-alt just inherited near-black var(--v4-ink) from .st and passed by accident. The
   colour below only becomes real now that the rule is a rule, which is exactly why the
   block had to be closed before the colour was worth changing.

   COLOUR: .st-alt and .st-p .bi sit on .st, the cream var(--v4-cream,#f6f6f3). Neither
   .st-book nor .st-who paints a background, so the cream is the real backdrop. Both were
   #6b7280, which is 4.47:1 on that cream: a near miss, but still a fail. #69707d is
   4.60:1. #6b7280 only clears 4.5:1 against pure white, which is not the background here.
   .st-alt is the "email or call us instead" fallback, so it is the accessibility
   affordance on this page. It failing contrast was the wrong failure to ship. */
.st-alt{margin:18px auto 0;text-align:center;font-size:15px;line-height:1.6;color:#69707d;}
.st-alt a{color:var(--v4-ink,#06080d);font-weight:600;text-decoration:underline;text-underline-offset:2px;}

/* who is on the call. the only thing under the calendar, because it is the only thing
   a person still wonders about once the times are in front of them. */
/* Jacob likes this and it stays. Tightened, not cut: it is the last thing on the page
   and it only has to answer one question, which is who am I actually going to meet. */
.st-who{border-top:1px solid #e6e6e1;padding:clamp(44px,5.5vw,68px) 0 clamp(56px,7vw,84px);}
.st-who .k{font-size:11.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#69707d;}
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
.st-p .ro{margin-top:3px;font-size:13px;font-weight:600;color:#047857;}
.st-p .bi{margin-top:8px;font-size:14.5px;line-height:1.55;color:#69707d;max-width:34ch;}
/* .st-note sits on .st, which is the cream var(--v4-cream,#f6f6f3). It was #8a8f98,
   which is 3.00:1 on that cream and fails the 4.5:1 WCAG AA bar for text. #69707d is
   4.60:1 on the cream. Same grey family, same restraint, it just clears the bar.
   Do not swap to #6b7280: it is 4.47:1 on cream and still fails. */
.st-note{margin-top:clamp(22px,2.8vw,32px);font-size:14px;color:#69707d;}
.st-note a{color:#0369a1;text-decoration:none;font-weight:600;}
.st-note a:hover{text-decoration:underline;}
`;

export default function StartPage() {
  return (
    <div className="st v4" id="top">
      <style>{min(CSS)}</style>
      <Nav />
      <main id="main" tabIndex={-1}>

      <section className="pg-hero st-hero">
        <div className="wrap">
          <div className="st-copy">
            <Reveal as="div">
              <div className="st-k"><span className="dot" aria-hidden />Free &middot; 30 minutes</div>
            </Reveal>
            <Reveal>
              {/* RICHARD'S HEADLINE (his Get Started doc, Aug 2 2026), replacing "See where
                  the work is slipping." — the money opportunity said first, the answer as
                  the punchline. History of the old line, kept for the record: it replaced
                  "Thirty minutes with a founder" (logistics, not a reason) and before that
                  "See exactly where you are losing work" (promised a measured number the
                  public-information-only prep could not honestly deliver). */}
              {/* v2 TAG (Richard, 8-5-26: "Should we change the tag to 'You can make more
                  money, We have solutions.'?" + his note that this page's type ran small).
                  His new 24-char line 1 is what UNLOCKS the size: the old 43-char line
                  physically capped the hero at 52px. Now it runs the full family size. */}
              <h1 className="st-h">
                <span className="l1">You can make more money,</span>
                <span className="l2">We have <span className="g">solutions</span><span className="pd">.</span></span>
              </h1>
            </Reveal>
            <Reveal>
              {/* Richard's sub, verbatim per Jacob's call (Aug 2 2026), his dash swapped for
                  a comma per the no-dash rule. */}
              <p className="st-sub">
                30 minutes with a founder walking the same path as you, with a passion to help
                entrepreneurs like you have more financial success and live a better life.
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

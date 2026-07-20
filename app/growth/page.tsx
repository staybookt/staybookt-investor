import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import GrowthQuiz from '@/components/v4/GrowthQuiz';
import { START_LINK } from '@/lib/site';
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
 * scroll-driven takes as confusing, and approved the quiz instead. Guess before
 * reveal makes the figures land: the reader commits to an answer, then watches the
 * published number count up past it.
 *
 * RESTRUCTURED A SIXTH TIME (Jacob, July 2026): THE UNIFIED JOURNEY. The gated
 * card-flow and its cold-open Start card are gone: "the quiz IS the page, a unified
 * journey, not a click-and-start." The page now opens ON question one, answered
 * cards condense into a visible trail of receipt rows, and the finale assembles the
 * stack-up from the reader's own trail. The mirror-not-promise law is unchanged; see
 * the block at the top of GrowthQuiz.tsx. GrowthNumbers (the pinned stage) and the
 * standalone YourMath section stay deleted; their salvage lives in GrowthQuiz.
 *
 * GIVEN ITS HEADER, SEVENTH PASS (Jacob, July 2026): the page now opens with the
 * standard .pg-hero every other page carries, emerald wash, at a compact height
 * whose reason is written beside the CSS below. The hero's sub-line IS the
 * instruction, and it hands straight into question one: no Start gate, no dead
 * band, the hero's wash continuing faintly into the quiz's dark surface. The
 * page h1 lives in the hero now; every quiz card heading is an h2, and a quiet
 * "Question 1 of 3" kicker keeps the stage named. The journey itself is untouched.
 *
 * THE HELD STAGE, NINTH PASS (Jacob, July 2026): the quiz became a sticky
 * full-viewport stage in the site's film grammar (see the ninth-pass block in
 * GrowthQuiz.tsx). The hero hands off and leaves: it closes on a quiet "Scroll
 * to start" line, the scroll itself is the CTA, and once the stage pins every
 * moment owns the whole screen. A window scroll clamp makes the containment
 * escape-proof, and each reveal now holds on its source for a beat before the
 * chevron invites the next scroll.
 *
 * THE LIGHT BODY, ELEVENTH PASS (Jacob, live review, July 2026): every other page
 * runs the dark .pg-hero into a light body, and this one ran dark into dark. The
 * whole quiz journey now lives on the site's cream (see the eleventh-pass block in
 * GrowthQuiz.tsx), the results screen became a real moment (keynote score count-up,
 * staggered receipts, adaptive verdict), the calculator advances on scroll like
 * every other moment, and the bottom Sources list is gone: each reveal cites
 * itself.
 *
 * PRIVATE MEANS THREE THINGS, ALL LOAD-BEARING:
 *   1. metadata.robots is noindex,nofollow. Do not remove it while this is a draft.
 *   2. It appears in NO nav, NO footer, NO sitemap (app/sitemap.ts is an explicit
 *      allowlist and /growth is not on it), and not in the homepage Go deeper grid.
 *   3. It is reachable only by typing /growth.
 *
 * THE RULES THIS PAGE LIVES UNDER, same as the rest of the site:
 *   - No invented numbers. Every figure in the quiz is an external, published stat,
 *     presented as external, with its source named in small type on its own reveal
 *     card and again inline at the stack-up. (The bottom Sources list is gone,
 *     July 2026: it restated what every reveal already cites. Do not re-add it;
 *     the citation lives with the figure.)
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
 * STATE NOTE: the quiz is React state. Refresh restarts the journey from question
 * one, which is accepted for a two-founder draft. The hero and question one render
 * on the server, so the prerender checks can see the h1, Q1's h2 and its four
 * options; the trail and the later cards are client state and cannot be grepped
 * from the HTML.
 */

/* NAMED, THIRTEENTH PASS (Jacob, July 2026): the draft became THE LEAK CHECK.
 * The page is a guided self-diagnosis: the reader guesses, the industry corrects
 * them, their own arithmetic convicts them. We never make the claim. Each question
 * now opens with a scene from the owner's day, each reveal closes on a verdict and
 * a bridge (see GrowthQuiz.tsx), and the page earns its own close below instead of
 * the generic HeroCta: the reader has just done the math, so the close harvests
 * exactly that and prices the fix against one job. Still private, still noindex. */
export const metadata = {
  title: 'The Leak Check · StayBookt',
  description: 'Internal working draft. The money argument, with cited public research.',
  robots: { index: false, follow: false },
};

const CSS = `
.gro{background:#f6f6f3;color:var(--v4-ink);}
.gro .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.gro .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
/* HERO. The shared .pg-hero from globals.css, emerald because this page argues the
   running-of-it. ONE deliberate exception to the one-height law, reason written down
   as that law requires: this header HANDS OFF AND LEAVES (ninth pass). The quiz
   below is a sticky full-viewport stage in the site's film grammar, so the hero's
   only job is the invitation and the instruction, compact, with the top of the
   stage visible beneath it. The scroll that brings the stage up IS the call to
   action, so the hero closes on a quiet "Scroll to start" line with a soft chevron
   instead of any button. The fixed nav's 64px clearance lives in the hero AND in
   the stage now (the stage owns the screen once pinned); the headline and sub run
   a step smaller than the standard hero scale, same reason as ever. */
.gro .pg-hero{--hero-hue:16,185,129;padding:calc(64px + clamp(40px,6vh,64px)) 0 clamp(30px,4.5vh,48px);}
.gro .pg-hero .wrap h1{font-size:clamp(34px,4.6vw,58px);max-width:22ch;}
.gro .pg-hero .wrap p{margin-top:18px;font-size:clamp(16px,1.9vw,20px);max-width:52ch;}
/* THE SCROLL CUE. Quiet, uppercase, #8a8f98 at 6.27:1 on #050506. The chevron
   pulses on opacity only, 2s period, same grammar as the quiz's cue; reduced
   motion stills it. */
.gro .pg-hero .wrap .gro-cue{display:flex;flex-direction:column;align-items:center;gap:9px;margin:clamp(26px,4.5vh,44px) auto 0;max-width:none;font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#8a8f98;}
.gro .pg-hero .wrap .gro-cue svg{display:block;animation:gro-cue 2s ease-in-out infinite;}
@keyframes gro-cue{0%,100%{opacity:.4;}50%{opacity:.95;}}
@media(prefers-reduced-motion:reduce){.gro .pg-hero .wrap .gro-cue svg{animation:none;}}
/* THE HARVEST CLOSE (thirteenth pass). HeroCta's visual language, this page's
   copy: the photo close, the same overlay grade, the one white button. Local
   because HeroCta's lines are hardcoded and this page has just earned a
   different close: the reader did the math, so the close says so and prices
   the fix against the job they just priced it with. No new claims: the $199
   and what the product does are already public on /pricing. */
.gro-close{position:relative;min-height:min(100vh,900px);display:flex;align-items:flex-end;overflow:hidden;color:#fff;background:#050506;}
.gro-close>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.gro-close-ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,6,.6) 0%,rgba(5,5,6,.18) 34%,rgba(5,5,6,.5) 72%,#050506 100%);}
.gro-close-in{position:relative;z-index:1;width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px) clamp(72px,9vw,110px);text-align:center;}
.gro-close-in h2{font-size:clamp(34px,5.4vw,74px);font-weight:600;letter-spacing:-.035em;line-height:1.03;color:#fff;max-width:15ch;margin:0 auto;text-shadow:0 2px 34px rgba(0,0,0,.55);}
.gro-close-in p{margin:20px auto 0;font-size:clamp(16px,1.9vw,20px);line-height:1.5;color:#eef1f5;max-width:44ch;text-shadow:0 1px 22px rgba(0,0,0,.6);}
.gro-close-btn{display:inline-flex;align-items:center;justify-content:center;margin-top:clamp(28px,3.6vw,38px);background:#fff;color:#050506;font-size:15.5px;font-weight:600;border-radius:999px;padding:16px 34px;text-decoration:none;box-shadow:0 18px 44px -18px rgba(0,0,0,.7);transition:transform .3s ease,box-shadow .3s ease;}
.gro-close-btn:hover{transform:translateY(-2px);box-shadow:0 26px 58px -18px rgba(0,0,0,.8);}
@media(prefers-reduced-motion:reduce){.gro-close-btn{transition:none;}}
`;

export default function GrowthPage() {
  return (
    <div className="gro v4" id="top">
      <style>{min(CSS)}</style>
      <Nav />
      <main id="main" tabIndex={-1}>
        {/* THE HEADER. The standard dark hero every other page opens with. Its
            sub-line IS the instruction: it reads as the invitation, and question
            one sits directly beneath it. Still no Start gate. */}
        <header className="pg-hero">
          <div className="wrap">
            <div className="eyebrow">The Leak Check · internal draft</div>
            <h1>You know the work. <span className="g">Do you know the money?</span></h1>
            <p>
              The Leak Check: three quick questions about the industry, then your own
              numbers. Two minutes, and the math at the end is yours, not ours.
            </p>
            {/* The CTA is the scroll itself: no button, just the invitation. */}
            <p className="gro-cue">
              Scroll to start
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
                <path
                  d="M2 2l9 8 9-8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </div>
        </header>

        {/* THE QUIZ IS THE PAGE. It opens on question one, condenses answered cards
            into a visible trail, and assembles its finale from that trail. A reveal
            holds until the reader's next scroll advances it, and scroll is contained
            inside the journey until the finale, so nothing blows past into the
            closer below; reduced-motion readers keep a quiet Continue and normal
            page scrolling. Every figure's citation lives on its reveal card and
            inline at the stack-up: there is no separate Sources block down here,
            deliberately (July 2026). */}
        <GrowthQuiz />

        {/* THE HARVEST CLOSE. This page only: the generic HeroCta gave way to a
            close that harvests the arithmetic the reader just did. Three lines,
            one button, nothing new claimed. The quiz's hard-stop containment
            (body[data-quiz-active] .gq~*) hides this exactly as it hid HeroCta
            until the finale releases the page. */}
        <section className="gro-close">
          <img src="/closer-dock.jpg" alt="" width={2000} height={2835} loading="lazy" decoding="async" />
          <div className="gro-close-ov" />
          <div className="gro-close-in">
            <h2>You just did the math.</h2>
            <p>
              We answer the calls, chase the quotes, and bring past customers back. $199 a
              month, and you have seen what one job covers.
            </p>
            <a className="gro-close-btn" href={START_LINK}>Get Started</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import SiteFooter from '@/components/SiteFooter';
import HeroCta from '@/components/v4/HeroCta';
import RemovalTest from '@/components/v4/RemovalTest';
import { min } from '@/lib/css';

/* WHAT THIS PAGE IS FOR.
 *
 * It used to open with Three Tuesdays, the five-salaries statement and the org
 * chart. All of that is the customer's problem, argued a third time after
 * how-it-works and pricing have already argued it. It was the sales pitch in an
 * About costume, and the four things an About page actually owes — why we exist,
 * who we are, why we are doing this, what we promise — were crammed underneath.
 *
 * So it is inverted. Belief. People. Origin. Promises. Nothing else.
 *
 * /LONG-TERM MERGED IN HERE (Jacob + Richard, Jul 30 2026). Richard's feedback on that
 * page's content was "my suggestions would come after the quotes... I like the combo... I
 * think it was a good suggestion" — his call on where his added paragraphs sit relative to
 * the page's own pull-quote. The follow-up call, once that content was in, was to stop
 * running it as a fourth standalone page and fold it into this one instead: read the
 * founders, trust the people, then hear the actual business case for why long-term value
 * is the whole point, one page instead of two. /long-term now 307s to
 * /founders#long-term-value — see next.config.ts. That page's RemovalTest film runs below;
 * its "one fact" copy no longer runs as a section before it — see RemovalTest.tsx's own
 * "THE OPENING BEAT" note for where that copy actually lives now. */

const SHARE =
  'You should not have to choose between doing the work and having a life. That is the whole reason StayBookt exists.';

export const metadata = {
  title: 'About us',
  description: SHARE,
  alternates: { canonical: '/founders' },
  openGraph: {
    /* Defining openGraph WITHOUT images suppresses the inherited app/opengraph-image.tsx,
       so this page shared as a bare grey rectangle. Every page needs its own images line. */
    images: ['/opengraph-image'],
    title: 'About us · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/founders',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'About us · StayBookt', description: SHARE },
};

const CSS = `
.abt{background:#fff;color:var(--v4-ink);}
.abt .wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.abt .narrow{max-width:820px;margin:0 auto;}
.abt .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.abt h1,.abt h2,.abt h3{font-weight:600;letter-spacing:-.035em;color:var(--v4-ink);}

/* ===== 1. THE BELIEF. The reason the company exists, said first. ===== */
/* HERO. Everything else is .pg-hero in globals.css, including the centring the note
   here used to argue for. This page was the tallest header on the site at
   clamp(150px,20vh,210px) and is now the same height as the other seven. Emerald:
   the two people who run it, same rung as what's included. */
.pg-hero{--hero-hue:16,185,129;}

/* LIGHT ANIMATED HEADER (Jul 24 2026) on the LOCKED hero system (home + how-it-works): eyebrow
   pill, two-line reveal-gradient headline (punchline alone on line 2), one-line subhead, then a
   supporting animation. Here the animation is Richard's rolling list of outcomes. Nav is solidTop.
   Richard's mission moved into the subhead; "improve lives" is the gradient payoff. */
.abt .pg-hero{background:var(--v4-cream);color:var(--v4-ink);min-height:auto;padding:clamp(84px,10vh,116px) 0 clamp(26px,4vw,56px);text-align:center;overflow-x:clip;}
.abt .pg-hero::before{display:none;}
.abt .pg-hero .wrap{max-width:1120px;}
.abt .pg-hero .wrap .eyebrow{display:inline-block;font-size:12.5px;font-weight:700;letter-spacing:.15em;color:#42474f;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad) border-box;border-radius:999px;padding:9px 18px;box-shadow:0 6px 18px -10px rgba(6,12,20,.25);}
.abt .pg-hero .wrap h1{margin:20px auto 0;max-width:none;font-size:clamp(20px,6.4vw,88px);line-height:1.02;letter-spacing:-.03em;font-weight:600;text-align:center;color:var(--v4-ink);}
.abt .pg-hero .hero-h1 .hl1,.abt .pg-hero .hero-h1 .hl2{display:block;white-space:nowrap;}
.abt .pg-hero .wrap h1 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.abt .pg-hero .wrap h1 .pd{color:var(--v4-violet);-webkit-text-fill-color:var(--v4-violet);}
.abt .pg-hero .wrap p.sub{margin:22px auto 0;max-width:none;white-space:nowrap;font-size:clamp(13px,3.1vw,21px);line-height:1.4;color:#52565e;text-align:center;}
/* supporting animation: THE MEMORY WALL. Polaroids of real life moments that develop in like
   film (washed white -> full photo) and assemble into a wall, painting the lives we improve.
   Placeholder photos for now; Richard's real "celebrating success" shots swap in here. */
.abt .memwall{display:flex;justify-content:center;align-items:flex-start;flex-wrap:nowrap;margin:clamp(28px,4vw,52px) auto 0;max-width:1180px;padding:0 clamp(8px,2vw,24px);}
.abt .memwall .mpol{--rot:0deg;flex:0 0 auto;background:#fff;padding:9px 9px 26px;border-radius:4px;box-shadow:0 28px 54px -24px rgba(6,12,20,.44),0 4px 10px -6px rgba(6,12,20,.2);width:min(clamp(108px,12.5vw,178px),23vh);transform:rotate(var(--rot));}
.abt .memwall .mpol img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:2px;}
.abt .memwall .m1{--rot:-8deg;margin-top:40px;margin-right:-28px;z-index:1;}
.abt .memwall .m2{--rot:5deg;margin-top:6px;margin-right:-28px;z-index:3;}
.abt .memwall .m3{--rot:-4deg;margin-top:50px;margin-right:-28px;z-index:2;}
.abt .memwall .m4{--rot:7deg;margin-top:14px;margin-right:-28px;z-index:4;}
.abt .memwall .m5{--rot:-6deg;margin-top:44px;margin-right:-28px;z-index:2;}
.abt .memwall .m6{--rot:4deg;margin-top:4px;margin-right:-28px;z-index:5;}
.abt .memwall .m7{--rot:-3deg;margin-top:48px;z-index:3;}
@media(max-width:760px){.abt .memwall{max-width:100%;}.abt .memwall .mpol{width:26vw;padding:7px 7px 20px;}}
@media(max-width:520px){.abt .memwall .m6,.abt .memwall .m7{display:none;}.abt .memwall .mpol{width:33vw;margin-right:-22px;}}

@media(prefers-reduced-motion:no-preference){
  /* THE CANONICAL HERO REVEAL — identical across homepage / how-it-works / about /
     journeys (Jacob, July 27 2026). Homepage timings verbatim: hl1 .2s -> hl2
     focus-pull 1s (1.5s, glow 1.05s) -> sub 1.7s -> graphic from 2.15s. Change all
     four together or none. */
  .abt .pg-hero .hero-h1 .hl1{opacity:0;filter:blur(10px);transform:translateY(20px);animation:abtIn .9s cubic-bezier(.16,1,.3,1) .2s forwards;}
  .abt .pg-hero .hero-h1 .hl2{position:relative;opacity:0;filter:blur(32px);transform:translateY(16px) scale(1.35);transform-origin:center;animation:abtEnjoy 1.5s cubic-bezier(.19,1,.22,1) 1s forwards;}
  .abt .pg-hero .hero-h1 .hl2::before{content:'';position:absolute;inset:-34% -10%;z-index:-1;background:radial-gradient(56% 62% at 50% 54%,rgba(16,185,129,.32),rgba(79,70,229,.2) 46%,transparent 72%);filter:blur(36px);opacity:0;transform:scale(.7);animation:abtGlow 2s ease 1.05s forwards;}
  .abt .pg-hero .wrap p.sub{opacity:0;filter:blur(6px);transform:translateY(12px);animation:abtIn .9s cubic-bezier(.16,1,.3,1) 1.7s forwards;}
  /* each polaroid rises + settles (mpolIn), then the photo inside develops from washed white to
     full (mDevelop) a beat later. Staggered so the wall assembles one memory at a time. */
  .abt .memwall .mpol{opacity:0;transform:translateY(30px) rotate(var(--rot)) scale(.94);animation:mpolIn .9s cubic-bezier(.16,1,.3,1) forwards;}
  .abt .memwall .mpol img{filter:brightness(2.1) contrast(.45) saturate(.12) blur(5px);opacity:.35;animation:mDevelop 1.5s ease forwards;}
  .abt .memwall .m1{animation-delay:2.15s;}.abt .memwall .m1 img{animation-delay:2.4s;}
  .abt .memwall .m2{animation-delay:2.27s;}.abt .memwall .m2 img{animation-delay:2.52s;}
  .abt .memwall .m3{animation-delay:2.39s;}.abt .memwall .m3 img{animation-delay:2.64s;}
  .abt .memwall .m4{animation-delay:2.51s;}.abt .memwall .m4 img{animation-delay:2.76s;}
  .abt .memwall .m5{animation-delay:2.63s;}.abt .memwall .m5 img{animation-delay:2.88s;}
  .abt .memwall .m6{animation-delay:2.75s;}.abt .memwall .m6 img{animation-delay:3s;}
  .abt .memwall .m7{animation-delay:2.87s;}.abt .memwall .m7 img{animation-delay:3.12s;}
}
@keyframes abtIn{to{opacity:1;filter:blur(0);transform:none;}}
@keyframes abtEnjoy{0%{opacity:0;filter:blur(32px);transform:translateY(16px) scale(1.35);}55%{opacity:1;}100%{opacity:1;filter:blur(0);transform:translateY(0) scale(1);}}
@keyframes abtGlow{0%{opacity:0;transform:scale(.7);}50%{opacity:.95;}100%{opacity:.62;transform:scale(1);}}
@keyframes mpolIn{to{opacity:1;transform:translateY(0) rotate(var(--rot)) scale(1);}}
@keyframes mDevelop{to{filter:none;opacity:1;}}


/* ===== 3. WHO WE ARE ===== */
.abt-us{padding:clamp(90px,12vw,150px) 0;background:var(--v4-cream);}
/* max-width raised 680 -> 820 and the box CENTERED (was margin:0 0, pinning it left — which
   made the "centered" pass only center text inside a left-pinned box). */
.abt-us .us-lead{max-width:820px;margin:0 auto clamp(44px,6vw,70px);}
.abt-us .us-lead h2{margin-top:14px;font-size:clamp(28px,4.2vw,54px);line-height:1.04;}
.abt-us .us-lead p{margin-top:16px;font-size:clamp(17px,1.9vw,20px);line-height:1.6;color:#69707d;}

/* THE TWO FOUNDERS, SIDE BY SIDE. Richard left, Jacob right. Identical elements in
   each card so the grid stays even. */
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(26px,4vw,56px);align-items:stretch;}
@media(max-width:820px){.fgrid{grid-template-columns:1fr;gap:48px;}}
/* equal-length cards: each card is a flex column and the quote bottom-aligns, so both cards end on
   the same line no matter how the copy wraps (Jacob, Jul 24 2026). */
.fcard{display:flex;flex-direction:column;}
/* GRADIENT PHOTO BORDER (Emma, p15 ①, her primary shown suggestion): the brand gradient as a
   decorative ring around each founder photo. The wrapper carries the gradient and a 3px pad; the
   image sits inside at a slightly smaller radius so the ring shows evenly. Shadow + hover-lift
   move to the wrapper so the whole framed photo lifts as one. */
.fcard .fimg{display:block;border-radius:24px;padding:3px;background:var(--sb-grad);
  box-shadow:0 34px 70px -40px rgba(6,12,20,.55);transition:transform .5s cubic-bezier(.16,1,.3,1);}
.fcard .fimg img{width:100%;aspect-ratio:1/1;object-fit:cover;object-position:center 18%;border-radius:21px;display:block;}
.fcard .fimg img.hi{object-position:center top;}
.fcard:hover .fimg{transform:translateY(-4px) scale(1.01);}
.fcard .nm{margin-top:22px;font-size:clamp(20px,2.2vw,26px);font-weight:600;letter-spacing:-.03em;color:var(--v4-ink);}
/* Roles BLACK, not green (Emma, p15 ②). She flagged the green as a contrast risk and asked for
   black; the gradient decorative role is carried by the photo border above, not the text. */
.fcard .ro{margin-top:12px;font-size:14px;font-weight:600;letter-spacing:.02em;color:var(--v4-ink);}
.fcard .bio{margin:18px 0 24px;font-size:15.5px;line-height:1.7;color:#69707d;}
/* WAS .fcard .fq — each founder's own quote beneath their bio (Richard, Jul 24 2026).
   REPLACED (Richard's About Us Quote doc, Aug 2 2026): "Replace the 2 quotes with one from
   both of us." The joint quote sits centered below the two cards, same brand-gradient left
   rule so it still reads as ours, not a generic testimonial. */
/* .us-q / .us-cite: the joint quote AS the section subtext (Richard, Aug 3 doc). Quote-sized
   prose, not a boxed figure. */
/* CENTERED STATEMENTS (Apple-lens pass, Aug 4 2026): mission, team, and long-term value all
   set text hard-left, leaving the right half of the container dead cream for ~3000px of
   scroll — the one page on the site whose statements were not centered. Headings center;
   long prose blocks center as a COLUMN but keep left-aligned text (centered ragged text at
   6+ lines is unreadable). */
.abt-us .us-lead{text-align:center;}
/* Gradient payoff paint for the section h2s (the global .g only covers hero h1s). */
.abt-us .us-lead h2 .g,.abt-ltv .ltv-h .g{background:var(--sb-grad);-webkit-background-clip:text;
  background-clip:text;color:transparent;padding-right:.04em;}
.abt-us .us-q{margin:18px auto 0;font-size:clamp(16px,1.8vw,19px);line-height:1.65;font-weight:500;
  letter-spacing:-.01em;color:var(--v4-ink);max-width:760px;text-align:left;}
.abt-us .us-cite{display:block;max-width:760px;margin:12px auto 0;font-size:14.5px;font-weight:600;
  color:#69707d;text-align:left;}

/* OUR MISSION — values strip. Plain rows, hairline dividers, no card chrome. Centered
   statement (see the centered-statements note above). */
.abt-values{padding:clamp(70px,9vw,110px) 0;background:#fff;border-top:1px solid #e6e6e1;text-align:center;}
.abt-values .eyebrow{color:#69707d;}
.abt-values .val-h{margin:14px auto 0;font-size:clamp(28px,4vw,52px);line-height:1.05;font-weight:600;
  letter-spacing:-.035em;color:var(--v4-ink);max-width:22ch;}
/* gradient payoff on "realize their dreams" — same paint-box padding fix as every other
   gradient phrase (negative tracking shaves the final glyph otherwise). */
/* .g is only defined for hero h1s globally — this h2 needs its own gradient paint. */
.abt-values .val-h .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;
  color:transparent;padding-right:.04em;}
.abt-values .val-lede{margin:20px auto 0;font-size:clamp(16px,1.8vw,19px);line-height:1.6;color:#42474f;max-width:56ch;}
.abt-values .val-rows{margin:clamp(34px,4.5vw,54px) auto 0;max-width:880px;text-align:left;}
/* STATEMENT ROWS, not a spec table (Jacob, Aug 4 2026: "elevate this"). The old rows set the
   value NAME at 18px against 17.5px body text — no hierarchy, nothing led. Now: a small
   gradient index numeral, the name at display size, the body as the supporting voice. Same
   hairlines, same no-card rule, real hierarchy. */
.abt-values .val-row .vn{display:block;margin-bottom:6px;font-size:13px;font-weight:700;
  font-style:normal;letter-spacing:.08em;background:var(--sb-grad);-webkit-background-clip:text;
  background-clip:text;color:transparent;font-variant-numeric:tabular-nums;}
/* CASCADE (Apple-lens): the five rows enter the viewport together, so without delays they
   revealed as one simultaneous pop. Staggered off the same .reveal transition. */
.abt-values .val-rows .val-row:nth-child(1){transition-delay:.05s;}
.abt-values .val-rows .val-row:nth-child(2){transition-delay:.16s;}
.abt-values .val-rows .val-row:nth-child(3){transition-delay:.27s;}
.abt-values .val-rows .val-row:nth-child(4){transition-delay:.38s;}
.abt-values .val-rows .val-row:nth-child(5){transition-delay:.49s;}
.abt-values .val-row{display:grid;grid-template-columns:minmax(210px,300px) 1fr;gap:14px 44px;
  align-items:start;padding:clamp(24px,3vw,32px) 0;border-bottom:1px solid #ededea;}
.abt-values .val-row:first-child{border-top:1px solid #ededea;}
.abt-values .val-row b{font-size:clamp(21px,2.4vw,29px);font-weight:600;color:var(--v4-ink);
  letter-spacing:-.025em;line-height:1.12;}
.abt-values .val-row span{font-size:clamp(15.5px,1.7vw,17.5px);line-height:1.6;color:#5a6069;
  padding-top:.35em;}
@media(max-width:560px){.abt-values .val-row{grid-template-columns:1fr;gap:6px;}
  .abt-values .val-row span{padding-top:0;}}

/* Long-term value: restored headline + kick (the old /long-term one-fact structure).
   Centered statement, prose column centered with left-aligned text (see the
   centered-statements note above). */
.abt-ltv{text-align:center;}
.abt-ltv .ltv-h{margin:14px auto 0;font-size:clamp(28px,4vw,52px);line-height:1.05;font-weight:600;
  letter-spacing:-.035em;color:var(--v4-ink);max-width:22ch;}
.abt-ltv .ltv-body{text-align:left;}
/* display:table centers the bar+quote as one unit; the bar itself is a VERTICAL slice of the
   brand gradient (a horizontal gradient sliced into a 3px left border reads as flat cyan —
   Apple-lens pass, Aug 4 2026). */
.abt-ltv .ltv-kick{display:table;margin:clamp(30px,4vw,42px) auto 0;padding-left:clamp(16px,2vw,22px);
  border-left:3px solid;border-image:linear-gradient(180deg,#06b6d4,#10b981 52%,#4f46e5) 1;
  font-size:clamp(19px,2.4vw,26px);font-weight:700;letter-spacing:-.02em;color:var(--v4-ink);
  text-align:left;}

/* .fjoint retired (quote moved into .us-q above). */
.fjoint-retired{margin:clamp(36px,5vw,56px) auto 0;max-width:760px;
  padding-left:clamp(16px,1.4vw,20px);border-left:3px solid transparent;border-image:var(--sb-grad-ink) 1;}
.fjoint blockquote{margin:0;font-size:clamp(16px,1.8vw,19px);line-height:1.65;font-weight:500;letter-spacing:-.01em;color:var(--v4-ink);}
.fjoint cite{display:block;margin-top:14px;font-style:normal;font-size:14.5px;font-weight:600;color:#69707d;}

/* The source portraits are 3:4. Cover-cropping them into a 1:1 card from the
   default centre lands the crop window on the chest and takes the top of the head
   off. .fcard img biases the window upward; Jacob's frame sits higher still, so he
   gets .hi (center top). */

/* ===== 4. WHY THIS MATTERS LONG-TERM — RETIRED AS A SECTION (Jul 30 2026). Ported from
   /long-term, then rebuilt FIVE times the same day chasing the same underlying problem: it was
   a standalone dark text section styled to look like it belonged to RemovalTest's film right
   below it (matching background, then a hand-tuned glow chasing RemovalTest's own glow), and
   no amount of colour-matching ever stopped reading as a seam, because it was genuinely two
   things — two DOM sections, two scroll contexts — trying to look like one.
   Jacob, after the glow still read as "a paper mache mix of garbage" tuned to a hair's width:
   "make this the opening parallax scene to the animation and have it all look like one unified
   experience." So its copy (eyebrow, headline, paragraph) now lives INSIDE RemovalTest.tsx as
   beat -1 — see "THE OPENING BEAT" at the top of that file for the full account, including why
   its body copy was tightened rather than ported verbatim (it was making almost the same point
   as the film's own "Take a week off" beat, redundant once they share one film).
   Nothing renders here anymore; the anchor id moved with the copy (RemovalTest anchorId=
   "long-term-value" below), so /long-term's redirect and HomeJourney.tsx's "what it is worth
   later" link still land on the right place. */

/* ===== 5. THE PROMISES. The one object on the page. ===== */
.abt-prm{background:#050506;padding:clamp(90px,12vw,150px) 0;}
.abt-prm .eyebrow{color:#86868b;}
.abt-prm h2{margin-top:14px;font-size:clamp(32px,4.8vw,62px);line-height:1.02;color:#fff;max-width:15ch;}
.abt-prm .lead{margin-top:24px;font-size:clamp(17px,1.95vw,21px);line-height:1.6;color:#9ba2ae;max-width:58ch;}
.abt-prm .lead b{color:#fff;font-weight:600;}

/* BOTH VOICES, OPENING THE PAGE. Two columns, Richard left and Jacob right, mirroring
   the two founder cards below so the page reads as one company of two people rather
   than two profiles. Gradient rule on each so they are unmistakably ours and not a
   pair of generic testimonial slabs. */
.abt-quote{padding:clamp(80px,10vw,130px) 0;background:#fff;}
.abt-quote .eyebrow{color:#69707d;}
.abt-quote .q2{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4.5vw,64px);align-items:start;margin-top:clamp(28px,3.6vw,44px);}
@media(max-width:820px){.abt-quote .q2{grid-template-columns:1fr;gap:44px;}}
.abt-quote .qq{margin:0;}
.abt-quote .lens{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#69707d;}
.abt-quote blockquote{margin:14px 0 0;padding-left:clamp(16px,2vw,22px);border-left:3px solid transparent;
  border-image:var(--sb-grad-ink) 1;
  font-size:clamp(18px,2.1vw,26px);font-weight:500;letter-spacing:-.02em;line-height:1.42;color:var(--v4-ink);}
.abt-quote figcaption{display:flex;flex-direction:column;gap:2px;margin-top:clamp(18px,2.2vw,24px);
  padding-left:clamp(19px,2vw,25px);}
.abt-quote figcaption .cn{font-size:15.5px;font-weight:600;letter-spacing:-.01em;color:var(--v4-ink);}
.abt-quote figcaption .cr{font-size:13.5px;font-weight:600;color:#69707d;}

/* LONG-TERM VALUE, Richard's own copy (About Us.docx, "Edit to the above"). Ported straight
   into RemovalTest's beat -1 first — measured that beat's content at 1716px tall against a
   100vh pinned/sticky stage with overflow:hidden. It would have clipped almost the whole
   thing. Plain, unpinned section instead: ordinary document flow, no height budget to blow.
   No card chrome (house rule) — hairline top border to separate it from the quotes above,
   plain type, nothing boxed. Sits between the founders' quotes and the RemovalTest film,
   which keeps its own headline and diagram exactly as they were; this doesn't touch either. */
.abt-ltv{padding:clamp(70px,9vw,110px) 0;background:var(--v4-cream,#f6f6f3);border-top:1px solid #e6e6e1;}
.abt-ltv .eyebrow{color:#69707d;}
/* Part II additions: section lede (matches .val-lede), the "A simple truth" block label,
   and the block's own strong lead line. */
.abt-ltv .ltv-lede{margin:20px auto 0;font-size:clamp(16px,1.8vw,19px);line-height:1.6;color:#42474f;max-width:56ch;}
.abt-ltv .ltv-truth-k{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;margin-bottom:14px;}
/* v2 (Richard, 8-5-26: "is there a font issue between paragraph 1 and 2/3?") — the lead
   line's larger size read as a mistake, not hierarchy. Same size as the body now; it leads
   by weight and ink only. */
.abt-ltv .ltv-truth-h{font-size:clamp(16px,1.7vw,19px);font-weight:600;letter-spacing:-.01em;
  line-height:1.6;color:var(--v4-ink);margin-bottom:4px;}
.abt-ltv .ltv-body{margin:clamp(30px,4vw,46px) auto 0;max-width:64ch;}
.abt-ltv .ltv-body p{font-size:clamp(16px,1.7vw,19px);line-height:1.6;color:#42474f;font-weight:400;}
/* Each paragraph sits inside its own Reveal wrapper div, so "p+p" never matched (no p has a
   p sibling) and "p:last-child" matched EVERY p (each is the last child of its wrapper) —
   headless-Chrome QA caught all four paragraphs rendering bold with no gaps. Select the
   WRAPPERS instead. */
.abt-ltv .ltv-body>*+*{margin-top:16px;}
.abt-ltv .ltv-body>*:last-child p{font-weight:600;color:var(--v4-ink);}
`;

export default function AboutPage() {
  return (
    /* .v4 carries every design token. Without it the nav wordmark's gradient
       resolves to nothing and, because the rule also sets color:transparent,
       the word "Bookt" disappears entirely. */
    <div className="abt v4">
      <style>{min(CSS)}</style>
      {/* solidTop: the hero is light now (Jul 24 2026), so the nav stays a solid dark bar. */}
      <Nav solidTop />
      <main id="main" tabIndex={-1}>

      {/* 1 — THE MISSION (Richard's About-Us feedback, Jul 24 2026). New light animated header
          matching home + how-it-works: eyebrow pill, the mission line, the StayBookt / Enjoy Life
          lockup, then a rolling list of the outcomes "Enjoy Life" actually means. */}
      <header className="pg-hero abt-hero">
        <div className="wrap">
          <div className="eyebrow">About us</div>
          <h1 className="hero-h1">
            <span className="hl1">We&rsquo;re on a mission to</span>
            <span className="hl2"><span className="g">improve lives</span><span className="pd">.</span></span>
          </h1>
          <p className="sub">For small business owners, and the families behind them.</p>
          <div className="memwall" aria-hidden="true">
            <div className="mpol m1"><img src="/close-founders.jpg" alt="" width={280} height={280} /></div>
            <div className="mpol m2"><img src="/closer-dock.jpg" alt="" width={280} height={280} /></div>
            <div className="mpol m3"><img src="/close-lt-cottage.jpg" alt="" width={280} height={280} /></div>
            <div className="mpol m4"><img src="/close-pricing.jpg" alt="" width={280} height={280} /></div>
            <div className="mpol m5"><img src="/close-work.jpg" alt="" width={280} height={280} /></div>
            {/* m6/m7 WERE repeats of m1/m2 (the wall had 7 slots and only 5 CTA photos, Jul 30
                2026). Richard (CTA and Images comments, Aug 2 2026): "the images at the top are
                doubled up... need to fix." Two more real closes from the site fill them — the
                girlfriends' day out (/whats-included close) and the lakeside campfire at dusk
                (the old /long-term close, a shot Richard picked himself) — so all seven
                polaroids are unique images used through the website. close-hiw (the slow-morning
                reading shot) was tried in m7 first and swapped same day: it was the only dark
                indoor frame in an otherwise outdoor golden-hour strip and read as the odd one
                out on the live-site review. */}
            <div className="mpol m6"><img src="/close-inc.jpg" alt="" width={280} height={280} /></div>
            <div className="mpol m7"><img src="/close-lt.jpg" alt="" width={280} height={280} /></div>
          </div>
        </div>
      </header>

      {/* 2 — OUR MISSION (Jacob, Aug 4 2026 live review: "the mission should go above the
          founder pics, then the founder pics, then the long-term value"). The page was saying
          "mission" three times in a row — hero, "One mission" header, values lede — with the
          actual mission buried mid-page. Now it is one movement, directly under the hero that
          announces it: Richard's mission paragraph (his Mission/Values doc, near-verbatim,
          dashes swapped) + the five values. */}
      <section className="abt-values">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">Our mission</Reveal>
          {/* <br/> before the payoff, same punchline-alone-on-line-2 rule as every hero. */}
          <Reveal><h2 className="val-h">Helping business owners<br /><span className="g">realize their dreams</span><span className="pd">.</span></h2></Reveal>
          <Reveal>
            <p className="val-lede">
              Every decision we make ties back to that one objective, from helping you run your
              business to successfully exiting it one day. And we believe how you do things
              matters greatly, so we are intentional in how we conduct ourselves. Five things we
              hold ourselves to:
            </p>
          </Reveal>
          <div className="val-rows">
            <Reveal className="val-row" as="div">
              <b><i className="vn">01</i>Humility</b>
              <span>We are always learning. Arrogance, personal or corporate, never gets in the way of progress.</span>
            </Reveal>
            <Reveal className="val-row" as="div">
              <b><i className="vn">02</i>Pursuit of excellence</b>
              <span>We take pride in the work, and the pursuit of a better way never ends.</span>
            </Reveal>
            <Reveal className="val-row" as="div">
              <b><i className="vn">03</i>Deep relationships</b>
              <span>We build for the long term. Nothing transactional, nothing short-term.</span>
            </Reveal>
            <Reveal className="val-row" as="div">
              <b><i className="vn">04</i>Candor</b>
              <span>We tell each other the truth, the good and the bad. Politics never outranks the work.</span>
            </Reveal>
            <Reveal className="val-row" as="div">
              <b><i className="vn">05</i>Partner mindset</b>
              <span>We win together, with our customers, partners, vendors, and employees. Win-win, or we pass.</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — TWO FOUNDERS, ONE MISSION (Richard, Jul 24 2026). One fold: photo, brief bio, and
          each founder's own quote beneath it. The inside/outside lens labels and the separate
          "why we built this" quote section are gone; the quotes live with the people who said
          them. Richard's and Jacob's quotes share the same vocabulary, so two people read as one
          company. */}
      <section className="abt-us">
        <div className="wrap">
          <div className="us-lead">
            <div className="eyebrow">The team</div>
            {/* Same headline grammar as the mission h2 above and every hero on the site:
                plain setup, gradient payoff, violet period (Jacob, Aug 4: the sections read
                dissonant when only the mission carried the gradient). */}
            <h2>Two founders. One <span className="g">mission</span><span className="pd">.</span></h2>
            {/* SUBTEXT IS THE JOINT QUOTE (Richard, website review doc, Aug 3 2026: "I don't
                love the subtext. What about using our quote as the subtext"). The standalone
                .fjoint figure below the cards was deleted in the same pass — one quote, one
                place. */}
            <p className="us-q">
              &ldquo;We started StayBookt rooted in a passion to help small to mid-sized business
              owners realize their dreams. Our solution helps businesses grow and allows the owner
              to get away from the day-to-day minutia and spend their time doing meaningful things,
              whether that is the work they love or having more time for passions outside work. We
              want to be your operating partner on the journey to building something great.&rdquo;
            </p>
            <span className="us-cite">Richard and Jacob</span>
          </div>

          {/* SIDE BY SIDE. Richard left, Jacob right (Jacob, live review, July 2026).
              These used to be two full-width rows stacked down the page, photo left and
              a quote right, which read as two separate profiles rather than one company
              of two people. Same elements in both cards, on purpose: the moment one card
              carries a quote and the other does not, the grid goes ragged.

              Both quotes moved to the top of the page, so the cards carry the credentials
              and nothing else. */}
          <div className="fgrid">
            <article className="fcard">
              <div className="fimg"><img src="/photos/richard.jpg" alt="Richard Roos, co-founder of StayBookt" width={280} height={280} /></div>
              <div className="nm">Richard Roos</div>
              <div className="ro">Operations, growth, and finance</div>
              <p className="bio">
                Two decades running operations inside fast-growing service businesses, including
                leading the growth of Venterra from $15M to $500M+ in revenue.{/* CONFIRMED by Jacob, July 2026. Checked with Richard; it stands. Do not soften or re-flag. */} A CPA who spent his
                career building the machine that answers every call and misses nothing.
              </p>
            </article>

            <article className="fcard">
              <div className="fimg"><img className="hi" src="/photos/jacob.jpg" alt="Jacob Charendoff, co-founder of StayBookt" width={280} height={280} /></div>
              <div className="nm">Jacob Charendoff</div>
              <div className="ro">Brand, product, and marketing</div>
              <p className="bio">
                A decade spent as an entrepreneur and alongside service business owners across health,
                hospitality, software, retail, and the trades. He works on the outside of the business:
                getting it found, making it easy to hire, then turning it into something the owner can
                hand off.
              </p>
            </article>
          </div>

          {/* The joint quote moved UP into the section subtext (Richard, Aug 3 doc) — it used
              to render here as its own .fjoint figure after the cards. */}
        </div>
      </section>

      {/* THE VALUES SECTION MOVED UP — it now renders as OUR MISSION between the hero and the
          founder cards (Jacob, Aug 4 2026). */}

      {/* THE PROMISES BOARD WAS REMOVED (Richard, Jul 24 2026: "delete this section"). It was the
          section between the founders and the close. The Promises component still exists, just not
          rendered here. */}

      {/* 3 — WHY THIS MATTERS LONG-TERM. Richard's real doc copy (About Us.docx, "Edit to the
          above"), back in a plain section of its own (Jul 31 2026) — tried folding it into
          RemovalTest's beat -1 first, measured real overflow (1716px of content inside a
          100vh pinned stage), reverted that attempt and put the prose here instead, in normal
          document flow where there's no fixed-height ceiling to hit. The anchor moved to this
          section (RemovalTest keeps rendering right after it, undecorated) so /long-term's
          redirect and HomeJourney.tsx's "what it is worth later" link still land in the right
          place. */}
      {/* STRUCTURE RESTORED (Richard, website review doc, Aug 3 2026: "bring back the previous
          structure you had. My comments were more about changing the text than the structure").
          The previous structure is the retired /long-term page's one-fact section: eyebrow ->
          big headline -> prose -> "Build long-term wealth, not a job." pull-quote. His four
          paragraphs stay verbatim as the prose. */}
      {/* PART II REWRITE (Richard, "About Us - Part II" doc, Aug 4 2026). His new section
          intro leads ("We think long-term..." + the legacy paragraph); his edited prose
          follows under the renamed block label — his doc: "Change 'The One Fact' to 'A
          Simple Truth'". Copy verbatim; two mechanical typo fixes flagged to Jacob
          ("shear"->"sheer", "on-line"->"online"). His new version contracts ("don't") —
          newer Richard beats older, ships as written. The old h2 ("If it cannot run without
          you, there is nothing to hand anyone.") is superseded by his new lead line and
          survives only in the film's screen-reader claim text. */}
      <section className="abt-ltv" id="long-term-value">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">Long-term value</Reveal>
          {/* <br/> before the payoff: the locked hero format puts the punchline ALONE on
              line 2 — without it this broke mid-phrase ("...long-term. For / ourselves..."). */}
          <Reveal><h2 className="ltv-h">We think long-term.<br /><span className="g">For ourselves and you</span><span className="pd">.</span></h2></Reveal>
          <Reveal>
            {/* v2 (Richard, 8-5-26): comma added after "so we get it"; nbsp joins "for you."
                so "you." can never orphan onto its own line (his "put 'you' on the line
                above"). */}
            <p className="ltv-lede">
              We are all in this to create something that builds legacy and provides for our
              loved ones when it&rsquo;s time to move on. So we get it, and want the same
              for&nbsp;you.
            </p>
          </Reveal>
          <div className="ltv-body">
            <Reveal className="ltv-truth-k" as="div">A simple truth</Reveal>
            <Reveal>
              <p className="ltv-truth-h">If your business would go backwards without you, a
                future buyer is not going to pay you a lot of money.</p>
            </Reveal>
            <Reveal>
              <p>To maximize your business value, you don&rsquo;t want to be in a position where
                you are selling assets and a customer list. That happens when the business is
                run on your cell phone and the customers go away when you leave. Buyers want
                businesses that can work when the owner is not standing there.</p>
            </Reveal>
            <Reveal>
              <p>You need to demonstrate repeatable channel revenue, strong repeat business,
                healthy referral levels, day-to-day operations run by systems, not sheer will,
                and an impressive online presence associated with the business, not the owner.
                Most buyers don&rsquo;t want to buy a job; they want a business that has a path to
                grow.</p>
            </Reveal>
            <Reveal>
              <p>That is not our opinion. Ask anyone who buys these businesses for a living.</p>
            </Reveal>
          </div>
          <Reveal><div className="ltv-kick">Build long-term wealth, not a job.</div></Reveal>
        </div>
      </section>
      <RemovalTest />

      {/* Close, Richard's copy: "We are your operating partner. To help you build something great."
          Subtext dropped. fromBlack IS BACK (Jul 30 2026): it was correctly dropped when the
          section right above this was the light cream founders section, but the /long-term merge
          just inserted RemovalTest directly above this CTA, and that film ends on solid #050506
          (see its own comment on /long-term's old HeroCta call, ported verbatim below) — without
          fromBlack this would fade in from cream over black, a visible seam. Image unchanged for
          now; Richard wants a celebrating-success shot, which needs a real asset. */}
      {/* Richard (CTA and Images comments, Aug 2 2026): his edit, split onto two lines —
          "We are your operating partner. / Helping you build something great." The .ln spans
          hold each line whole (nowrap blocks, see HeroCta.tsx), tight sizes them to fit. */}
      {/* IMAGE ROUND 3 (Richard v2, 8-5-26: the autumn cottage was "a little too puzzley" —
          he asked for a simple, more upscale cottage). New shot: dusk lakeside boathouse
          with a lit dock (Unsplash, same free-license sourcing as the dock photo). His
          business-partnership reference stays on file as the eventual replacement if he
          sources one. */}
      <HeroCta
        fromBlack
        img="/close-lt-lakehouse.jpg"
        heading={<><span className="ln">We are your operating partner.</span><span className="ln">Helping you build <span className="g">something great</span><span className="pd">.</span></span></>}
        headingClass="tight"
        sub={null}
      />

      </main>

      <SiteFooter />
    </div>
  );
}

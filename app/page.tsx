import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import HeroDashboard from '@/components/v4/HeroDashboard';
import HomeJourney from '@/components/v4/HomeJourney';
import HomeFaq from '@/components/v4/HomeFaq';
import HeroCta from '@/components/v4/HeroCta';
import SiteFooter from '@/components/SiteFooter';
import { min } from '@/lib/css';

const SHARE_DESCRIPTION =
  'StayBookt answers your phone, books your jobs and chases your quotes. You do the work. We run everything around it. $199/mth USD, nothing upfront, no lock-in.';


/* "What's included" was missing from here (Richard, review, July 2026). It is in the
   nav, it is the page /pricing sends people to, and it is the only page that answers
   "what do I actually get" — and the one place on the homepage that offers to take you
   deeper did not list it.

   The order mirrors the nav on purpose. A person should not have to learn a second
   ordering halfway down the page. */
export const metadata = {
  title: 'StayBookt. Enjoy Life.',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'StayBookt. Enjoy Life.',
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'StayBookt. Enjoy Life.', description: SHARE_DESCRIPTION },
};

const PAGE_CSS = `
.v4{--v4-muted:#86868b;}
.v4 h1,.v4 h2,.v4 h3{font-weight:600;}
.v4 .scene>video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.v4 .scene .reveal{opacity:1;transform:none;}
/* HERO — PHOTO RETIRED, ROUND 9 (Jacob, Aug 2 2026): "homepage should look like the
   journeys page for the formatting, get rid of the image behind the text." Round 3's
   full-bleed photo hero (see the history below — kept for the record, but no longer the
   live state) is gone. The homepage hero now matches the SAME locked, canonical hero every
   other page on the site already uses (see .jl-hero in app/journeys/page.tsx and .abt
   .pg-hero .wrap in app/founders/page.tsx: cream background, a light gradient-border pill,
   ink headline, muted-gray sub) — not a new pattern, the one every other page already
   proved. Nav goes back to its natural transparent-over-cream state.
   HERO — REAL PHOTO, ROUND 3 (Jacob, Aug 2 2026, HISTORICAL — superseded by round 9 above).
   The light cream hero (Jul 23) and seven rounds of a device tucked under the CTA (see the
   JSX comment below) were both retired at the time. Jacob's own "crazy idea" mid-build:
   stop trying to earn the payoff photo through a mechanism at all — just make it the
   hero's background, the way Apple actually builds most of its photographic heroes (one
   real image, confident type on top, no reveal gimmick). The dock-chairs photo
   (closer-dock.jpg, same asset as HeroCta's default close and half of About Us's polaroid
   roll) sat full-bleed behind the headline, darkened with a scrim so white type read clean
   at every width. That's the exact thing round 9 reverses. */
/* ONE FOLD, round 11 (Jacob: "spacing issues... still doesn't feel as cinematic, dramatic,
   elevated as possible — referencing [the journeys page]"). Rounds 8-10 kept adjusting
   paddings between the hero and a separate dashboard section; the actual difference from
   /journeys was structural. .jl-fold composes its entire first viewport as ONE scene:
   min-height 100svh, flex column, centered — pill, headline, sub, then the supporting
   graphic filling the rest of the fold, all entering as one choreography. This is that,
   verbatim (same clamp values as .jl-fold): the hero IS the fold, and HeroDashboard is
   its supporting graphic, back inside the header. Round 10's padding-bottom fix is
   superseded — flex centering owns the vertical rhythm now, no padding arithmetic. */
.v4 header.scene{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);
  min-height:100vh;min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:clamp(86px,11vh,120px) 0 clamp(18px,3vh,32px);position:relative;overflow:hidden;}
/* THE HOMEPAGE HERO HAD NO GUTTER ON A PHONE. This element is class="wrap inner".
   .v4 .wrap gives it padding:0 32px, and this rule is more specific, so a padding shorthand
   with 0 for the horizontal silently wiped it at phone width (nobody caught it because
   nobody had opened the site at 390px). Keep the horizontal padding here, or restate it if
   you ever change the vertical. Vertical padding moved to the fold (header.scene) above. */
.v4 header.scene .inner{position:relative;z-index:1;padding:0 clamp(20px,4vw,32px);text-align:center;max-width:1200px;margin:0 auto;width:100%;}
.v4 header.scene h1{max-width:none;margin:20px auto 0;font-size:clamp(20px,6.4vw,88px);letter-spacing:-.03em;line-height:1.02;text-align:center;color:var(--v4-ink,#06080d);}
/* SUBHEAD: was one-line/nowrap by global rule (Jacob Jul 23 2026). Richard's homepage
   feedback (Aug 2 2026) replaces it with TWO lines — his copy, his call, overrides the
   one-line rule per the Richard-overrides standing rule. Each line is its own block;
   wrapping allowed at phone widths since his lines are long. */
.v4 header.scene p.sub{margin:22px auto 0;color:#52565e;max-width:none;font-size:clamp(15px,1.8vw,19.5px);line-height:1.5;}
.v4 header.scene p.sub span{display:block;}
.v4 header.scene p.sub span+span{margin-top:6px;color:var(--v4-ink,#06080d);font-weight:600;}
/* Richard's line 2 is 80 characters — the old 60ch cap soft-wrapped it, so his "two lines"
   read as three on desktop (caught on the live-site review, Aug 2 2026). Desktop holds each
   of his lines whole; phones wrap naturally, where nowrap would overflow. */
@media(min-width:821px){.v4 header.scene p.sub span{white-space:nowrap;}}
.v4 header.scene .cta{justify-content:center;}
.ctanote{margin:20px auto 0;max-width:52ch;text-align:center;font-size:14.5px;line-height:1.6;color:rgba(255,255,255,.62);}
@media(max-width:640px){.ctanote{font-size:13.5px;max-width:36ch;}}
/* R1 (Richard): "Make 'For Owner-operated Service Businesses' more pronounced - key
   qualifier." It was a plain eyebrow, styled identically to the label above every other
   section on the site, so the one line that tells a stranger whether this is for them at
   all had the same weight as the word "Pricing".

   It is a badge now: bordered, brighter, with the brand dot, matching the treatment on
   /start. An object rather than a caption. It is the first qualifying question a visitor
   has and it should look like an answer. */
/* WAS a white-glass chip (.08 fill, .18 border). The eyebrow sits at 15vh, below the top of
   the overlay where the dusk photo is at its brightest, and a translucent-white chip over a
   bright frame is nearly invisible — the one line that qualifies the whole page washed out
   (Emma, p4 ②). It is a DARK glass chip now: the near-white text and the brand dot separate
   cleanly over any frame, and it still reads as glass (blur + border + shadow). */
/* GRADIENT BORDER (Emma, p4 ②, her suggested mockup): a dark glass chip with the brand gradient
   as its outline. Two backgrounds — the dark fill clipped to the padding box, the gradient to the
   border box — so a 1.5px transparent border shows the gradient ring. The old solid brand dot is
   dropped: the gradient ring is the brand signal now, and a dot plus a ring on one small pill is
   two of the same idea. */
/* PHOTO HERO RETIRED (round 9, Aug 2 2026) — the badge is the same light gradient-border
   pill every other locked hero on the site uses (see .jl-pill in app/journeys/page.tsx and
   .abt .pg-hero .wrap .eyebrow in app/founders/page.tsx): white fill, ink text, the brand
   gradient as the ring. The dark-glass version above only ever existed to stay legible over
   the photo; with the photo gone, it goes back to the shared token.
   MUCH BIGGER (Richard, homepage feedback doc, Aug 2 2026, his second ask for this): "That
   is the quick connection of relevance for the right people." Font, tracking, and padding
   all scaled up so it reads as the qualifying answer, not a caption. */
.v4 header.scene .eyebrow{display:inline-flex;align-items:center;
  font-size:clamp(13px,1.5vw,17.5px);font-weight:700;letter-spacing:.14em;color:#2b3038;
  border:2px solid transparent;
  background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad) border-box;
  border-radius:999px;padding:12px 26px;
  box-shadow:0 8px 22px -10px rgba(6,12,20,.3);}

/* THE HERO PAYOFF DEVICE (takes 1-7) MOVED OUT OF THE HERO (Jacob, Aug 2 2026). All the
   .hero-converge/.hc-* rules that used to live here are gone with it — the device is now its
   own component, HeroPayoff.tsx, with its own styles. See the JSX comment above the closing
   </header> for the full history and reasoning. */

/* headline gradient + brand-violet period on the light hero. (Jul 31 2026: tried filling "What
   You Love" with closer-dock.jpg via background-clip:text instead — Jacob's call after seeing
   it live was that the flat gradient reads better and the photo-mask was the dissonant part,
   not the polaroids below. Reverted same session; see staybookt-hero-photo-mask memory.) */
.v4 header.scene h1 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.v4 header.scene h1 .pd{color:var(--v4-violet);}

/* THE PROBLEMS FOLD (Richard 8-5-26 / Michelle). Centered statement + hairline problem rows,
   same no-card language as the About values strip. */
/* FOLD 1, ROUND 3 (Richard 8-6-26): one-viewport fit at 100% zoom, pill gone, his headline
   as big as its 48-char first line allows (48px cap = the physics; the char count sets the
   ceiling, same story as /start before his tag shortened), lede attached to the rows, and
   the rows as a before -> after transformation around a centered arrow spine. */
/* STAGED AS A HERO, NOT A SPEC SHEET (Jacob, live reaction Aug 6: the white table as the
   landing view read cheap). Same content, same one-viewport fit, still fully static — but
   on the CREAM page background, transformation rows as plain type with hairline dividers
   (no card chrome, no dark panel - Jacob, Aug 6). */
/* Top pad was fixed-nav clearance from the fold-1 era; the section sits under the hero
   now, so the clearance only pushed the mission line below the fold (Jacob, 8-10). */
.probs{padding:clamp(40px,5.5vh,60px) 0 clamp(36px,5vh,56px);background:var(--v4-cream,#f6f6f3);text-align:center;}
/* Richard's mission line (8-10) is ~69ch — at the old 48px cap it broke into a ragged
   three-line stack. 37px holds his two clauses to one clean line each. */
.probs .pr-eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.probs .pr-h{margin:12px auto 0;font-size:clamp(24px,2.55vw,37px);line-height:1.16;font-weight:600;
  letter-spacing:-.035em;color:var(--v4-ink);max-width:none;}
.probs .pr-h .g,.probs .pr-turn .g,.probs .pr-close .g{background:var(--sb-grad);-webkit-background-clip:text;
  background-clip:text;color:transparent;padding-right:.04em;}
/* lede + rows are ONE block (Richard: the lede "needs to feel attached to the bullet points
   more than the Tag Line"): tight vertical rhythm, no chrome. */
/* Jacob, Aug 6 round 2: NOT a dark panel. The section lives natively on the cream page -
   plain type, hairline ink dividers, struck-out problems vs bold ink answers, gradient
   reserved for the arrows + the WITH STAYBOOKT caption. Pop through contrast, not a slab. */
/* The turn line lives in the gap that keeps the chart out of fold one, so the space now
   carries a beat instead of reading as dead air (Richard, 8-12). */
.probs .pr-turn{margin:clamp(58px,12vh,120px) auto 0;font-size:clamp(23px,2.5vw,36px);line-height:1.14;
  font-weight:600;letter-spacing:-.03em;color:var(--v4-ink);}
.probs .pr-frame{margin:clamp(24px,3.4vh,38px) auto 0;max-width:920px;}
.probs .pr-block{position:relative;}
/* 56ch wrapped Richard's longer lede and orphaned "mission:" onto its own line (Jacob,
   8-10). Uncapped: the sentence is ~640px at full size and holds one line on desktop. */
/* PRONOUNCED (Richard 8-11): the insanely-great line is the fold's closing beat now -
   ink, larger, period not colon - and the chart below must NOT peek into fold one at the
   common laptop windows (the .pr-frame gap below handles that). */
.probs .pr-lede{margin:clamp(14px,2vh,20px) auto 0;font-size:clamp(16.5px,1.95vw,21px);line-height:1.5;color:var(--v4-ink);font-weight:500;max-width:none;padding:0 16px;}
/* Column captions: the device one fold below says TODAY / TOMORROW, the pricing chart says
   today / With StayBookt - this panel speaks the same axis. */
.probs .pr-cols{display:grid;grid-template-columns:1fr 40px 1fr;gap:14px;
  margin:clamp(14px,2.2vh,22px) auto 0;max-width:880px;font-size:11.5px;font-weight:700;
  letter-spacing:.16em;text-transform:uppercase;}
.probs .pr-cols .pc-l{text-align:right;color:#9aa1ad;}
.probs .pr-cols .pc-r{text-align:left;background:var(--sb-grad);-webkit-background-clip:text;
  background-clip:text;color:transparent;padding-right:.04em;}
.probs .pr-rows{margin:8px auto 0;max-width:880px;}
.probs .pr-row{display:grid;grid-template-columns:1fr 40px 1fr;gap:14px;align-items:center;
  padding:clamp(10px,1.5vh,14px) 0;border-bottom:1px solid rgba(6,8,13,.08);}
.probs .pr-row:first-child{border-top:1px solid rgba(6,8,13,.1);}
.probs .pr-row:last-child{border-bottom:0;}
/* The problems are STRUCK - the same erased-before language the journey receipts use. */
.probs .pr-was{text-align:right;font-size:clamp(14px,1.55vw,17px);line-height:1.4;color:#757e8c;
  text-decoration:line-through;text-decoration-color:rgba(214,72,78,.4);text-decoration-thickness:1.5px;}
.probs .pr-arr{text-align:center;font-size:clamp(15px,1.6vw,19px);
  background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.probs .pr-now{text-align:left;font-size:clamp(15px,1.7vw,18.5px);line-height:1.4;font-weight:700;
  letter-spacing:-.01em;color:var(--v4-ink);}
@media(hover:hover){.probs .pr-row{transition:background .25s ease;}
  .probs .pr-row:hover{background:rgba(6,8,13,.03);}}
.probs .pr-close{margin:clamp(20px,3.2vh,32px) auto 0;font-size:clamp(16px,1.9vw,21px);line-height:1.45;
  font-weight:600;color:var(--v4-ink);max-width:46ch;}
@media(max-width:600px){
  .probs .pr-h br{display:none;}
  .probs .pr-row{grid-template-columns:1fr;gap:2px;padding:12px 0;}
  .probs .pr-was{text-align:left;}
  .probs .pr-arr{display:none;}
  .probs .pr-now{text-align:left;}
  .probs .pr-now::before{content:'\\2192  ';color:#9aa1ad;font-weight:400;}
}

/* APPLE-GRADE ENTRANCE (Jacob, Jul 23 2026). Two-stage headline: the clause fades up from a soft
   blur, then "Enjoy Life" lands on its own a beat later; the subhead and pill follow; the
   polaroids rise in, staggered, last. Only under no-preference — reduced motion gets the final
   state instantly (the from-states live inside the media query, so no-JS/no-motion is visible). */
/* Line 1 "You built your business to", line 2 "Enjoy Life." alone (Jacob, Jul 23 2026). Each
   half is its own non-wrapping block. Container is wide enough (max-width 1200) that line 1
   holds at the 88px cap; vw sizing shrinks it to fit down to ~320px. */
.v4 header.scene .hero-h1 .hl1,.v4 header.scene .hero-h1 .hl2{display:block;white-space:nowrap;}
.v4 header.scene .hero-h1 .hl2{position:relative;}
/* CINEMATIC ENTRANCE (Jacob, Jul 23 2026 — "WAY more dramatic"). hl1 rises in; then "Enjoy Life."
   makes a focus-pull entrance: it scales down from 1.35 as a heavy blur clears, with a soft light
   bloom behind it. Sub, CTA, then the polaroids cascade in, staggered, last. Reduced motion gets
   the end state. overflow-x:clip contains the bloom so it never spawns a scrollbar. */
.v4 header.scene{overflow-x:clip;}
@media(prefers-reduced-motion:no-preference){
  .v4 header.scene .hero-h1 .hl1{opacity:0;filter:blur(10px);transform:translateY(20px);animation:sbHeroIn .9s cubic-bezier(.16,1,.3,1) .2s forwards;}
  .v4 header.scene .hero-h1 .hl2{opacity:0;filter:blur(32px);transform:translateY(16px) scale(1.35);transform-origin:center;animation:sbEnjoyIn 1.5s cubic-bezier(.19,1,.22,1) 1s forwards;}
  .v4 header.scene .hero-h1 .hl2::before{content:'';position:absolute;inset:-34% -10%;z-index:-1;background:radial-gradient(56% 62% at 50% 54%,rgba(16,185,129,.32),rgba(79,70,229,.2) 46%,transparent 72%);filter:blur(36px);opacity:0;transform:scale(.7);animation:sbGlow 2s ease 1.05s forwards;}
  .v4 header.scene p.sub{opacity:0;filter:blur(6px);transform:translateY(12px);animation:sbHeroIn .9s cubic-bezier(.16,1,.3,1) 1.7s forwards;}
  .v4 header.scene .cta{opacity:0;transform:translateY(12px);animation:sbHeroIn .9s cubic-bezier(.16,1,.3,1) 1.95s forwards;}
}
@keyframes sbHeroIn{to{opacity:1;filter:blur(0);transform:none;}}
@keyframes sbEnjoyIn{0%{opacity:0;filter:blur(32px);transform:translateY(16px) scale(1.35);}55%{opacity:1;}100%{opacity:1;filter:blur(0);transform:translateY(0) scale(1);}}
@keyframes sbGlow{0%{opacity:0;transform:scale(.7);}50%{opacity:.95;}100%{opacity:.62;transform:scale(1);}}

.v4 .kicker{font-size:14px;font-weight:600;letter-spacing:.02em;margin-bottom:14px;background:linear-gradient(90deg,#0ea5e9,#06b6d4 34%,#14b8a6 66%,#10b981);-webkit-background-clip:text;background-clip:text;color:transparent;}
.v4 .sbwrap,.v4 .sb-clook{--grad:linear-gradient(90deg,#0ea5e9,#06b6d4 34%,#14b8a6 66%,#10b981);}
.v4 .sb-clook{background:#fff;padding:clamp(80px,10vw,120px) 0;}
.v4 .sb-clook .cl-head{text-align:center;max-width:600px;margin:0 auto;}
.v4 .sb-clook .cl-head h2{font-size:clamp(30px,4.4vw,52px);letter-spacing:-.025em;line-height:1.08;color:var(--v4-ink);}
.v4 .sb-clook .cl-head p{margin-top:16px;font-size:clamp(17px,1.9vw,21px);color:#86868b;line-height:1.4;}
.v4 .sb-clook .cl-stage{display:grid;grid-template-columns:.82fr 1.18fr;gap:52px;align-items:start;margin-top:clamp(44px,5vw,60px);}
.v4 .sb-clook .cl-menu{display:flex;flex-direction:column;}
.v4 .sb-clook .cli{text-align:left;background:transparent;border:0;border-bottom:1px solid #e6e6ea;padding:17px 40px 17px 6px;cursor:pointer;position:relative;font-family:inherit;width:100%;}
.v4 .sb-clook .cli .ck{display:block;font-size:10.5px;font-weight:700;letter-spacing:.06em;color:#86868b;}
.v4 .sb-clook .cli .cl-lbl{display:block;font-size:21px;font-weight:600;letter-spacing:-.02em;color:#b9b9c0;margin-top:3px;transition:color .25s;}
.v4 .sb-clook .cli .cl-plus{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:24px;height:24px;border-radius:50%;border:1px solid #d0d0d7;color:#9a9aa2;display:flex;align-items:center;justify-content:center;font-size:16px;line-height:1;transition:.28s;}
.v4 .sb-clook .cli .cl-desc{display:block;max-height:0;overflow:hidden;font-size:15px;color:#86868b;line-height:1.46;transition:max-height .38s ease,margin .38s ease;}
.v4 .sb-clook .cli.on .cl-lbl{color:var(--v4-ink);}
.v4 .sb-clook .cli.on .cl-plus{background:var(--grad);border-color:transparent;color:#fff;transform:translateY(-50%) rotate(45deg);}
.v4 .sb-clook .cli.on .cl-desc{max-height:90px;margin-top:11px;}
.v4 .sb-clook .cli:hover .cl-lbl{color:#6a6a72;}
.v4 .sb-clook .cl-viz{position:sticky;top:max(84px,calc(50vh - 290px));min-height:540px;display:flex;align-items:center;justify-content:center;}
.v4 .sb-clook .cl-viz::before{content:'';position:absolute;inset:0;border-radius:32px;background:radial-gradient(75% 62% at 50% 42%,rgba(16,185,129,.07),transparent 72%);border:1px solid rgba(255,255,255,.06);pointer-events:none;}
.v4 .sb-clook .vpanel{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.97) translateY(10px);transition:.5s cubic-bezier(.2,.6,.2,1);pointer-events:none;}
.v4 .sb-clook .vpanel.on{opacity:1;transform:none;pointer-events:auto;}
@media(max-width:880px){.v4 .sb-clook .cl-stage{grid-template-columns:1fr;gap:12px;}.v4 .sb-clook .cl-viz{position:static;min-height:520px;order:-1;margin-bottom:20px;}}
.v4 .sb-clook .cl-viz .appwin{width:470px;}
.v4 .sb-clook .cl-viz .phone{width:264px;}
.v4 .sb-clook .cl-viz .phone .screen{height:472px;}
.v4 .sb-clook .cl-viz .phone .ph-body{gap:8px;padding:14px 12px;}
.v4 .sbwrap .phone{width:300px;max-width:82%;background:#0b0b0d;border-radius:44px;padding:12px;box-shadow:0 40px 80px -30px rgba(0,0,0,.45);position:relative;}
.v4 .sbwrap .phone .screen{background:#f2f2f5;border-radius:33px;overflow:hidden;height:600px;display:flex;flex-direction:column;}
.v4 .sbwrap .phone .notch{position:absolute;top:20px;left:50%;transform:translateX(-50%);width:120px;height:26px;background:#0b0b0d;border-radius:0 0 16px 16px;z-index:3;}
.v4 .sbwrap .ph-bar{background:#fff;padding:14px 16px 12px;border-bottom:1px solid #ececf0;display:flex;align-items:center;gap:10px;}
.v4 .sbwrap .ph-ava{width:34px;height:34px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;flex:0 0 auto;}
.v4 .sbwrap .ph-name{font-size:14px;font-weight:600;}
.v4 .sbwrap .ph-sub{font-size:11px;color:#86868b;}
.v4 .sbwrap .ph-body{flex:1;padding:16px 14px;display:flex;flex-direction:column;gap:9px;overflow:hidden;background:#f2f2f5;}
.v4 .sbwrap .bub{max-width:80%;padding:9px 13px;border-radius:18px;font-size:13.5px;line-height:1.35;}
.v4 .sbwrap .bub.them{align-self:flex-start;background:#e7e7ec;color:#111;border-bottom-left-radius:5px;}
.v4 .sbwrap .bub.us{align-self:flex-end;background:#0a84ff;color:#fff;border-bottom-right-radius:5px;}
.v4 .sbwrap .bub.sys{align-self:center;background:transparent;color:#86868b;font-size:11px;padding:2px;}
.v4 .sbwrap .bub.us.ok{background:#10b981;}
.v4 .sbwrap .ph-tag{background:#fff;border-top:1px solid #ececf0;padding:11px 14px;font-size:11px;color:#86868b;text-align:center;}
.v4 .sbwrap .gsearch{background:#fff;height:100%;display:flex;flex-direction:column;}
.v4 .sbwrap .gs-top{padding:14px 14px 10px;border-bottom:1px solid #eee;}
.v4 .sbwrap .gs-inp{border:1px solid #dcdce1;border-radius:999px;padding:8px 14px;font-size:12.5px;color:#333;}
.v4 .sbwrap .gs-map{height:96px;background:linear-gradient(135deg,#dbe8d5,#cfe0ea);}
.v4 .sbwrap .gs-list{padding:12px 14px;display:flex;flex-direction:column;gap:12px;}
.v4 .sbwrap .gbiz{border:1px solid #ececf0;border-radius:12px;padding:11px 12px;position:relative;}
.v4 .sbwrap .gbiz.first{border-color:rgba(16,185,129,.5);box-shadow:0 6px 20px -10px rgba(16,185,129,.4);}
.v4 .sbwrap .gbiz .rank{position:absolute;top:-8px;left:12px;background:#10b981;color:#fff;font-size:9px;font-weight:700;padding:2px 8px;border-radius:999px;}
.v4 .sbwrap .gbiz .bn{font-size:14px;font-weight:600;}
.v4 .sbwrap .gbiz .stars{font-size:11px;color:#f59e0b;margin-top:3px;}
.v4 .sbwrap .gbiz .stars span{color:#86868b;}
.v4 .sbwrap .gbiz .meta{font-size:11px;color:#86868b;margin-top:3px;}
.v4 .sbwrap .gbiz .acts{display:flex;gap:8px;margin-top:9px;}
.v4 .sbwrap .gbiz .acts .b{font-size:10.5px;font-weight:600;padding:5px 12px;border-radius:999px;border:1px solid #dcdce1;color:#0a84ff;}
.v4 .sbwrap .gbiz .acts .b.fill{background:#10b981;color:#fff;border-color:#10b981;}
.v4 .sbwrap .gbiz.dim{opacity:.62;}
.v4 .sbwrap .browser{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 40px 80px -34px rgba(0,0,0,.4);border:1px solid rgba(0,0,0,.05);}
.v4 .sbwrap .bz-bar{background:#f0f0f3;padding:11px 14px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #e6e6ea;}
.v4 .sbwrap .bz-dot{width:11px;height:11px;border-radius:50%;}
.v4 .sbwrap .bz-url{margin-left:12px;background:#fff;border:1px solid #e2e2e7;border-radius:7px;font-size:11px;color:#8a8a90;padding:4px 12px;flex:1;max-width:260px;}
.v4 .sbwrap .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.v4 .sbwrap .stat{background:var(--v4-cream);border:1px solid #eee;border-radius:12px;padding:12px 13px;}
.v4 .sbwrap .stat .lbl{font-size:10.5px;color:#86868b;}
.v4 .sbwrap .stat .val{font-size:22px;font-weight:600;letter-spacing:-.02em;margin-top:5px;color:var(--v4-ink);}
.v4 .sbwrap .stat .val small{font-size:12px;color:#10b981;font-weight:600;margin-left:4px;}
.v4 .sbwrap .card{background:#fff;border:1px solid #ececf0;border-radius:10px;padding:9px 10px;}
.v4 .sbwrap .card .cn{font-size:12px;font-weight:600;}
.v4 .sbwrap .card .cm{font-size:10.5px;color:#86868b;margin-top:3px;}
.v4 .sbwrap .pill{display:inline-block;font-size:9.5px;padding:2px 7px;border-radius:999px;background:rgba(14,165,233,.1);color:#0284c7;font-weight:600;white-space:nowrap;}
.v4 .sbwrap .pill.g{background:rgba(16,185,129,.12);color:#059669;}
@media(max-width:520px){.v4 .sbwrap .stats{grid-template-columns:repeat(2,1fr);}}
.v4 .sbwrap .appwin{width:410px;max-width:90%;background:#fff;border-radius:18px;border:1px solid #ececf0;box-shadow:0 44px 90px -44px rgba(0,0,0,.4);overflow:hidden;}
.v4 .sbwrap .aw-top{padding:14px 17px;border-bottom:1px solid #f1f1f4;display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:var(--v4-ink);}
.v4 .sbwrap .aw-ic{width:26px;height:26px;border-radius:8px;background:var(--grad);flex:0 0 auto;}
.v4 .sbwrap .aw-r{margin-left:auto;font-size:11px;font-weight:600;color:#10b981;}
.v4 .sbwrap .aw-body{padding:18px;}
.v4 .sbwrap .aw-body .sub{font-size:12.5px;color:#86868b;}
.v4 .sbwrap .site-hero{background:linear-gradient(180deg,#0f1720,#1a2733);color:#fff;padding:26px 20px 24px;text-align:left;}
.v4 .sbwrap .site-hero .sh-nav{display:flex;justify-content:space-between;font-size:11px;color:#c7d2da;margin-bottom:26px;}
.v4 .sbwrap .site-hero .sh-nav b{color:#fff;}
.v4 .sbwrap .site-hero h5{font-size:24px;font-weight:600;letter-spacing:-.02em;line-height:1.12;color:#fff;}
.v4 .sbwrap .site-hero p{font-size:13px;color:#c7d2da;margin-top:8px;}
.v4 .sbwrap .site-hero .sh-row{display:flex;gap:10px;align-items:center;margin-top:16px;}
.v4 .sbwrap .site-hero .sh-btn{background:#10b981;color:#04150e;font-size:12px;font-weight:700;padding:8px 16px;border-radius:999px;}
.v4 .sbwrap .site-hero .sh-stars{font-size:11px;color:#ffd479;}
.v4 .sbwrap .bk-days{display:flex;gap:7px;margin-bottom:14px;}
.v4 .sbwrap .bk-days .d{flex:1;text-align:center;font-size:11px;color:#86868b;border:1px solid #e9e9ee;border-radius:9px;padding:7px 0;}
.v4 .sbwrap .bk-days .d b{display:block;font-size:15px;color:var(--v4-ink);font-weight:600;margin-top:2px;}
.v4 .sbwrap .bk-days .d.on{border-color:transparent;background:var(--grad);color:#fff;}
.v4 .sbwrap .bk-days .d.on b{color:#fff;}
.v4 .sbwrap .bk-slots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.v4 .sbwrap .bk-slots .s{font-size:12px;text-align:center;border:1px solid #e2e2e8;border-radius:9px;padding:9px 0;color:#3b3b42;}
.v4 .sbwrap .bk-slots .s.sel{background:#0a0a0b;color:#fff;border-color:#0a0a0b;}
.v4 .sbwrap .bk-slots .s.x{color:#c2c2c9;text-decoration:line-through;}
.v4 .sbwrap .bk-conf{margin-top:14px;background:rgba(16,185,129,.1);color:#059669;font-size:12.5px;font-weight:600;padding:10px 12px;border-radius:10px;}
.v4 .sbwrap .crm-hd{display:flex;align-items:center;gap:12px;}
.v4 .sbwrap .crm-hd .av{width:44px;height:44px;border-radius:50%;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;flex:0 0 auto;}
.v4 .sbwrap .crm-hd .nm{font-size:16px;font-weight:600;color:var(--v4-ink);}
.v4 .sbwrap .crm-hd .mt{font-size:12px;color:#86868b;}
.v4 .sbwrap .crm-tags{display:flex;gap:6px;margin:12px 0;flex-wrap:wrap;}
.v4 .sbwrap .crm-tags span{font-size:10.5px;font-weight:600;padding:3px 9px;border-radius:999px;background:rgba(14,165,233,.1);color:#0284c7;}
.v4 .sbwrap .crm-row{display:flex;justify-content:space-between;font-size:12.5px;padding:9px 0;border-top:1px solid #f1f1f4;color:var(--v4-ink);}
.v4 .sbwrap .crm-row .amt{font-weight:600;}
.v4 .sbwrap .crm-foot{margin-top:12px;font-size:12px;color:#86868b;}
.v4 .sbwrap .q-row{display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid #f1f1f4;color:var(--v4-ink);}
.v4 .sbwrap .q-row .qd{color:#3b3b42;}
.v4 .sbwrap .q-row .qp{font-weight:600;}
.v4 .sbwrap .q-total{display:flex;justify-content:space-between;font-size:16px;font-weight:700;margin-top:10px;color:var(--v4-ink);}
.v4 .sbwrap .q-status{display:flex;gap:6px;margin-top:14px;flex-wrap:wrap;}
.v4 .sbwrap .q-status .qs{font-size:10.5px;font-weight:600;padding:4px 10px;border-radius:999px;background:#f0f0f3;color:#6a6a72;}
.v4 .sbwrap .q-status .qs.on{background:rgba(16,185,129,.12);color:#059669;}
.v4 .sbwrap .an-ins{font-size:16px;font-weight:600;line-height:1.35;letter-spacing:-.01em;color:var(--v4-ink);}
.v4 .sbwrap .an-ins .hl{background:linear-gradient(180deg,transparent 62%,rgba(245,158,11,.35) 62%);}
.v4 .sbwrap .an-chart{display:flex;align-items:flex-end;gap:6px;height:78px;margin:16px 0 8px;}
.v4 .sbwrap .an-chart .b{flex:1;background:#e6e6ec;border-radius:4px 4px 0 0;}
.v4 .sbwrap .an-chart .b.hot{background:var(--grad);}
.v4 .sbwrap .an-fix{font-size:12.5px;color:#059669;font-weight:600;background:rgba(16,185,129,.09);padding:9px 11px;border-radius:9px;}
.v4 .sbwrap .rv-big{font-size:15px;font-weight:600;color:var(--v4-ink);}
.v4 .sbwrap .rv-big b{font-size:26px;}
.v4 .sbwrap .rv-big .st{color:#f59e0b;}
.v4 .sbwrap .rv-item{border-top:1px solid #f1f1f4;padding:11px 0;font-size:12.5px;color:#3b3b42;}
.v4 .sbwrap .rv-item .st{color:#f59e0b;font-size:11px;}
.v4 .sbwrap .rv-item .who{color:#86868b;margin-top:2px;}
.v4 .sbwrap .rp-camp{font-size:15px;font-weight:600;color:var(--v4-ink);}
.v4 .sbwrap .rp-meta{font-size:12.5px;color:#86868b;margin:6px 0 14px;}
.v4 .sbwrap .rp-bar{height:10px;border-radius:999px;background:#eee;overflow:hidden;}
.v4 .sbwrap .rp-bar i{display:block;height:100%;width:64%;background:var(--grad);}
.v4 .sbwrap .rp-res{display:flex;justify-content:space-between;margin-top:12px;font-size:13px;color:var(--v4-ink);}
.v4 .sbwrap .rp-res b{font-weight:700;}
.v4 .sbwrap .brief-l .bi{display:flex;gap:12px;padding:11px 0;border-top:1px solid #f1f1f4;align-items:flex-start;font-size:14px;color:#2b2b30;}
.v4 .sbwrap .brief-l .bi:first-of-type{border-top:0;}
.v4 .sbwrap .brief-l .bic{width:8px;height:8px;border-radius:50%;margin-top:6px;flex:0 0 auto;}
/* proof line */
.v4 .proofline{background:#050506;padding:0 0 clamp(64px,9vw,104px);text-align:center;}
.v4 .proofline p{font-size:15px;color:#86868b;}
.v4 .proofline a{color:#38bdf8;font-weight:600;text-decoration:none;}
/* LADDER */
.v4 .price h2{font-weight:600;letter-spacing:-.025em;}
.v4 .price .seefull a{color:#0891b2;}
/* WAS the .whyus block (Richard quote band) — section deleted per Richard's own homepage
   feedback (Aug 2 2026), CSS removed with it. See the JSX comment where it lived. */
/* ===== CINEMATIC CONSISTENCY PASS ===== */
/* Base background flipped from #050506 to cream (Jacob, round 4): with dark mode
   confined to the price section now, a black base here was only ever visible as a
   flash on load or an iOS overscroll bounce, but it flashed black on a page that is
   light everywhere it's opaque — the base should match what visitors actually see. */
.v4{font-family:var(--font-display),'Inter Tight','Helvetica Neue',Arial,sans-serif;background:var(--v4-cream,#f6f6f3);}
.v4 p,.v4 a,.v4 span,.v4 div,.v4 li,.v4 blockquote,.v4 cite,.v4 button{font-family:inherit;}
.v4 .seam{background:linear-gradient(180deg,rgba(5,5,6,0) 0%,rgba(5,5,6,.55) 45%,#050506 88%) !important;}
.v4 .sb-clook{background:#050506;}
.v4 .sb-clook .cl-head h2{color:#f5f5f7;}
.v4 .sb-clook .cl-head p{color:#a1a1aa;}
.v4 .sb-clook .cli{border-bottom-color:rgba(255,255,255,.1);}
.v4 .sb-clook .cli .cl-lbl{color:#5f6068;}
.v4 .sb-clook .cli.on .cl-lbl{color:#f5f5f7;}
.v4 .sb-clook .cli:hover .cl-lbl{color:#a1a1aa;}
.v4 .sb-clook .cli .cl-plus{border-color:rgba(255,255,255,.22);color:#8a8a90;}
.v4 .sb-clook .cli .cl-desc{color:#9a9aa4;}
.v4 .price{background:#050506;}
.v4 .price h2{color:#f5f5f7;}
.v4 .price .eyebrow{color:#86868b;}
.v4 .price .seefull a{color:#38bdf8;}
.v4 .price .pill-ink{background:#f5f5f7;color:#050506;}
.v4 .price{text-align:center;}
.v4 .price .priceline{font-size:clamp(18px,2.2vw,25px);color:#c7ccd6;margin:18px auto 0;max-width:38ch;line-height:1.42;}
/* WAS "GO DEEPER / explore navigation" — the whole .explore section (Pricing / Journeys
   / About us card grid) removed Jul 30 2026 (Jacob: "get rid of this" — a second in-page
   nav duplicating the real nav bar). CSS below deleted with it; nothing renders .explore
   anymore. */

/* honesty footnote */
.v4 .illus{background:#050506;padding:0 0 clamp(50px,6vw,74px);}
.v4 .illus .wrap{text-align:center;font-size:12.5px;line-height:1.5;color:#5c6470;max-width:60ch;}


/* ===== PREVIEW O1 OVERRIDES (Emma landing Option 1: split hero, device right) ===== */
/* CTA LAST (Emre via Richard, 8-11): fades in after the dashboard entrance completes. */
.v4.po1 .po1-cta{opacity:0;animation:po1CtaIn .8s cubic-bezier(.16,1,.3,1) 3.25s forwards;}
@keyframes po1CtaIn{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
@media(prefers-reduced-motion:reduce){.v4.po1 .po1-cta{animation:none;opacity:1;}}
/* Selectors carry .v4.po1 because the base hero rules (.v4 header.scene h1 etc.) out-specify
   naive .po1 overrides — first deploy shipped an 88px nowrap headline into a half column. */
/* Jacob 8-10: the mission line must sit clearly inside the first viewport at 100% on a
   standard (often 125%-scaled Windows) laptop. Hero + mission-fold paddings trimmed ~100px. */
.v4.po1 header.scene{min-height:auto;padding:calc(64px + clamp(24px,3.6vh,40px)) 0 clamp(18px,2.6vh,30px);}
/* Short-viewport compression (Windows 125% scaling leaves ~614px): squeeze the hero so
   Richard's mission line lands whole in fold one even there. */
/* Matching tiers to HeroDashboard's (Richard, Aug 12): fold one must hold the hero AND
   the mission statement AND the insanely-great line on every common laptop window, not
   just tall ones. Verified 560px of viewport upward. */
@media(max-height:820px){
  .v4.po1 header.scene{padding:calc(64px + 22px) 0 16px;}
  .probs{padding-top:30px;}
  .probs .pr-h{margin-top:10px;}
  .probs .pr-lede{margin-top:12px;}
}
@media(max-height:700px){
  .v4.po1 header.scene{padding:calc(64px + 14px) 0 10px;}
  .probs .pr-turn{font-size:clamp(21px,2.25vw,31px);}
  .probs{padding-top:20px;}
  .probs .pr-h{margin-top:8px;font-size:clamp(22px,2.35vw,32px);}
  .probs .pr-lede{margin-top:9px;font-size:clamp(15.5px,1.7vw,18.5px);}
}
@media(max-height:620px){
  .v4.po1 header.scene{padding:calc(64px + 10px) 0 6px;}
  .probs{padding-top:14px;}
  .probs .pr-eyebrow{font-size:12px;}
  .probs .pr-h{margin-top:6px;font-size:clamp(20px,2.1vw,28px);}
  .probs .pr-lede{margin-top:7px;font-size:clamp(15px,1.6vw,17px);}
}
.v4.po1 header.scene .inner.po1-grid{display:grid;grid-template-columns:minmax(0,1.02fr) minmax(0,1fr);gap:clamp(28px,4vw,60px);align-items:center;text-align:left;}
.v4.po1 header.scene .po1-left h1{text-align:left;margin-top:0;font-size:clamp(28px,3.35vw,47px);}
.v4.po1 header.scene .po1-left p.sub{text-align:left;font-size:clamp(15px,1.5vw,17.5px);}
.v4.po1 header.scene p.sub span{white-space:normal;}
.v4.po1 .po1-btn{display:inline-block;margin-top:28px;background:#06080d;color:#fff;font-size:15px;font-weight:600;border-radius:999px;padding:14px 26px;text-decoration:none;transition:transform .25s ease,box-shadow .25s ease;}
.v4.po1 .po1-btn:hover{transform:translateY(-1px);box-shadow:0 14px 30px -14px rgba(6,8,13,.5);}
.v4.po1 .po1-right .hd-fold{margin:0;max-width:none;}
@media(max-width:860px){
  .v4.po1 header.scene .inner.po1-grid{grid-template-columns:1fr;text-align:center;gap:26px;}
  .v4.po1 header.scene .po1-left h1,.v4.po1 header.scene .po1-left p.sub{text-align:center;}
  .v4.po1 .po1-btn{margin-top:20px;}
}
`;

export default function HomePage() {
  return (
    <div id="top" className="v4 po1">
      <style>{min(PAGE_CSS)}</style>
      {/* solidTop, round 9 (Jacob, Aug 2 2026): Nav's transparent-over-dark-photo mode only
          made sense while the hero had round 3's photo behind it. Every other page with this
          cream hero (/journeys, /founders) already renders <Nav solidTop /> — this brings the
          homepage in line rather than leaving it as the one page still assuming a dark scene
          under the nav. */}
      <Nav solidTop />
      <main id="main" tabIndex={-1}>

      {/* 1 — THE PROBLEMS FOLD, NOW FOLD ONE (Richard, v2 8-5-26: "Should 'Why StayBookt
          exists' come before 'You built your business…'? … That would be my choice as it's
          the clearest statement and grabs people with the pain points they can relate to."
          Moved from fold 2; the ICP pill rides up with it, so the hero below flows straight
          into the Four Milestones as he wants. Copy unchanged from the v1 round. */}
      {/* FOLD 1, ROUND 3 (Richard, 8-6-26): pill REMOVED per his call; headline is his new
          line at the biggest size its 48 characters allow; the lede sits attached to the
          rows; and the flat list became the before -> after TRANSFORMATION he sketched
          (problems left, future state right — his pairs, one right-side line adjusted where
          his draft duplicated "your time back", disclosed). Everything fits one viewport at
          100% on a standard laptop. */}

      {/* 2 — HERO (now flows directly into the Four Milestones, per Richard v2). */}
      <header className="scene">
        {/* ROUND 9 (Jacob, Aug 2 2026): "homepage should look like the journeys page for the
            formatting, get rid of the image behind the text." The full-bleed photo (round 3)
            is gone — see the PAGE_CSS comment above for that round's reasoning and this
            round's reversal. Full prior history — the light cream hero (Jul 23), seven
            rejected rounds of a device tucked under the CTA, one round of promoting that
            device into its own scroll-driven section (rejected: "definitely not Apple
            quality"), then the round-3 photo — lives in memory (staybookt-hero-the-clearing.md,
            staybookt-hero-answer-field.md). HeroPayoff.tsx (the retired scroll section) and
            the photo treatment both stay documented in case either is useful again; this hero
            is the same locked format /journeys and /founders already use. */}
        <div className="wrap inner po1-grid">
          {/* OPTION 1 LANDING (Emma redesign round, Jacob's pick, Aug 10 2026): split hero —
              copy left with the restored Get Started CTA, the live interactive dashboard
              right. Same approved copy as the centered layout it replaces (git has it). */}
          <div className="po1-left">
            <Reveal>
              <h1 className="hero-h1">
                <span className="hl1">You built your business to do</span>
                <span className="hl2"><span className="g">What You Love</span><span className="pd">.</span></span>
              </h1>
            </Reveal>
            <Reveal>
              {/* RICHARD'S PUNCH-UP (8-10-26), verbatim; his " - " rendered as a comma per the
                  no-dash rule; his CAPS emphasis (UNFUN / MORE TIME and FREEDOM) rendered as
                  weight, not literal caps, per site register - disclosed to Jacob. */}
              <p className="sub">
                <span>But a lot of <b>&ldquo;unfun&rdquo;</b> stuff gets in the way of that dream.</span>
                <span>StayBookt is the answer to making your business what it was always meant to be, and giving you <b>more time</b> and <b>freedom</b>.</span>
              </p>
            </Reveal>
            {/* Emre via Richard (8-11): the CTA arrives LAST - after the headline, the
                sub, and the dashboard's 2.15s + 1s entrance. */}
            <div className="po1-cta">
              <a className="po1-btn" href="/start" data-cta="hero_o1">Get Started <span aria-hidden>&rarr;</span></a>
            </div>
          </div>
          <div className="po1-right">
            <HeroDashboard />
          </div>
        </div>
        {/* THE "Scroll" CUE IS GONE (Richard, review, July 2026). It sat at the foot of the
            hero, and the very next thing on the page is the film's first label, GET FOUND.
            So you read "Scroll / GET FOUND" as one phrase and stopped to work out whether
            it was an instruction or a heading.

            The homepage does not need it. The hero is a playing video and the section under
            it is a scroll-driven film. Nobody has ever failed to scroll a website.

            /how-it-works used to keep its cue, because that header was a motionless 88vh
            photograph. It is a 190px header now, like every other page except this one and
            /long-term, so there is no cue left anywhere on the site. */}
      </header>

      {/* THE PROBLEMS FOLD — UNDER THE HERO (Jacob, Aug 6: "Richard was referring to under
          the header." The one day it spent as the landing fold read cheap on the live site.
          Hero lands first, this transformation panel is the very next thing.) */
      }
      {/* STATIC ON PURPOSE (Richard, 8-6-26 follow-up: "I don't want an animation because we
          have one on the next slide... I want something that can be absorbed fully in under
          3 seconds"). No Reveal wrappers, no cascade — every element is painted on first
          frame. The punch is hierarchy: muted problem, arrow spine, gradient future state. */}
      <section className="probs">
        <div className="wrap">
          {/* RICHARD 8-11: "Our Mission" split out as its own header above the statement, his
              new sentence verbatim, gradient moved to "improving the lives of owners" per his
              suggestion (one gradient per headline - "full potential" goes plain). */}
          <div className="eyebrow pr-eyebrow">Our Mission</div>
          <h2 className="pr-h">Helping small businesses realize their full potential,<br />and <span className="g">improving the lives of owners</span> and the families behind them<span className="pd">.</span></h2>
          {/* the lede belongs to the MISSION, not the chart (Richard 8-11: it closes fold
              one; the chart waits below) - moved out of the frame. */}
          <p className="pr-lede">We are <b>insanely great</b> at solving the problems that get in the way of this mission.</p>
          {/* RICHARD 8-12: the chart arrived with no header once "missed opportunities" was
              dropped, and the gap that keeps it out of fold one read as dead space. His
              line fills both jobs, gradient on "better future" per his call. */}
          <h3 className="pr-turn">A <span className="g">better future</span> awaits you<span className="pd">.</span></h3>
          <div className="pr-frame">
          <div className="pr-block">
            <div className="pr-cols" aria-hidden><span className="pc-l">Today</span><span /><span className="pc-r">With StayBookt</span></div>
            <div className="pr-rows">
              <div className="pr-row"><span className="pr-was">A website that doesn&rsquo;t generate calls</span><span className="pr-arr" aria-hidden>&rarr;</span><span className="pr-now">Phones ringing, answered 24/7</span></div>
              <div className="pr-row"><span className="pr-was">Feast or famine workloads</span><span className="pr-arr" aria-hidden>&rarr;</span><span className="pr-now">A full pipeline</span></div>
              <div className="pr-row"><span className="pr-was">Soul-sucking paperwork</span><span className="pr-arr" aria-hidden>&rarr;</span><span className="pr-now">Your time back</span></div>
              <div className="pr-row"><span className="pr-was">No time to chase customer reviews</span><span className="pr-arr" aria-hidden>&rarr;</span><span className="pr-now">Google legend</span></div>
              <div className="pr-row"><span className="pr-was">Every call and follow-up running through you</span><span className="pr-arr" aria-hidden>&rarr;</span><span className="pr-now">An AI Assistant team</span></div>
              <div className="pr-row"><span className="pr-was">No time to focus on growing the business</span><span className="pr-arr" aria-hidden>&rarr;</span><span className="pr-now">Time to grow it</span></div>
              <div className="pr-row"><span className="pr-was">A job with your name on it</span><span className="pr-arr" aria-hidden>&rarr;</span><span className="pr-now">A business you can sell someday</span></div>
            </div>
          </div>
          </div>
          <p className="pr-close">Every small business owner struggles with at least one of these problems.
            StayBookt is <span className="g">the solution</span><span className="pd">.</span></p>
        </div>
      </section>


      {/* THE "IN PLAIN ENGLISH" CARD IS GONE (Jacob, July 14 2026).
          Three columns of bullets sat between the hero and the journey: the only
          piece of UI on an otherwise cinematic page. It also said the plot out loud
          and then the film below it showed the same plot. "What we do" is what the
          beats ARE. "What you do" is the payoff, not a feature. "What it costs" got
          its own screen, which is now beat 3 of the film itself.
          Do not put a card back here. */}

      {/* 2 — THE JOURNEY. Was JourneyMap.tsx: an abstract 4-beat pinned scroll-scrub
          (wheel graphic, photo cross-dissolves). Retired (Jacob + Richard, Jul 30 2026) for
          the concrete customer journey that used to live only on /how-it-works — real
          scenes, an owner-voice line per milestone, ordinary scroll instead of a pinned
          track. /how-it-works is retiring because this IS how it works now. See the header
          comment in HomeJourney.tsx for the full reasoning. */}
      <HomeJourney />

      {/* THE PAYOFF. The film ends on the $199 reveal, on black, and dissolves straight
             into this scene: the life the whole thing is for. fromBlack makes the image
             emerge out of the film's black instead of cutting to it. This is the same
             closing CTA every other page now ends on. */}
      {/* THE CLOSING CTA USED TO SIT HERE, at position 4 of 9, with 3,253px — 4.3 screens —
             of unbroken black below it. It is a full-viewport photo scene with one button
             that reads unmistakably as the ending, and then the page kept going: a founder
             quote, a link grid, an FAQ accordion, a dark footer. HeroCta's own header claims
             "Every page now ends on the same thing the homepage ends on." The homepage was
             the one page where that was false.
             Apple never asks you to scroll past the ending. It is now the last thing before
             the footer, where it was always supposed to be. */}

      {/* WAS "5 — WHY WE BUILT THIS": Richard's photo + "Every owner we talked to said the
          same thing" quote band. DELETED (Richard's own homepage feedback doc, Aug 2 2026):
          "I would delete this. I don't think this adds value to the above narrative. And
          unless the content is doing something, I would be in favor of simplifying." The
          founder story still lives in full on /founders; the .whyus CSS block in PAGE_CSS
          was removed with it. */}

      {/* THE ILLUSTRATION FOOTNOTE IS GONE (Jacob, July 2026, after Richard asked twice and
             called it clutter). Read this before putting it back or taking it further:
             deleting it made Promise 05 false, because Promise 05 literally said "Where we
             illustrate the service, we say so, in writing, on the page" — this footnote WAS
             that. So Promise 05 was amended in the same commit. The two move together. If a
             disclaimer ever comes back here, that clause goes back into Promise 05.
             What still holds, and must: we do not show a result we did not produce. The one
             real artifact on this site (/work) is a real screenshot of a real live site you
             can click. Illustrating what the service DOES is fine. Illustrating what it
             ACHIEVED is not, footnote or no footnote. */}

      {/* WAS "6 — GO DEEPER" (Pricing / Journeys / About us card grid, "Start anywhere.").
          DROPPED (Jacob, Jul 30 2026, "get rid of this") — a second in-page nav competing
          with the actual nav bar four lines above the fold. EXPLORE/ExploreIcon removed
          below with it; nothing else referenced them. */}

      {/* FAQ — the last thing before the footer. A curated cross-section only; the full
             sets live on the deep pages. RELIT TO CREAM (Jacob, Jul 30 2026) — was dark
             to match a price payoff and an explore grid that were also dark at the time;
             both have since relit, this was the one holdout. See HomeFaq.tsx for the CSS. */}
      <HomeFaq />

      {/* fromBlack DROPPED — it forced HeroCta's top edge to open on solid black so it
          would dissolve seamlessly out of HomeFaq, which used to be #050506. HomeFaq is
          cream now, so a black band here would be a seam, not a continuation; the
          standard (light-predecessor) grade is correct again. */}
      {/* Close saying per Richard (Images doc, Jul 28): "I like the image" + his two
          lines. "Enjoy Life" capitalized: it is the brand, not a phrase.
          GRADIENT on "Enjoy Life" (Richard's homepage feedback doc, Aug 2 2026:
          "Highlight the Enjoy Life in the StayBookt gradient colors") — the .g class is
          defined in HeroCta.tsx's own CSS. His replacement sub is HeroCta's new default,
          so no sub prop needed here. */}
      <HeroCta
        imgPos="50% 10%"
        heading={<>Helping your business run better.<br />So that you <span className="g">Enjoy Life</span> more<span className="pd">.</span></>}
      />

      </main>

      <SiteFooter />
    </div>
  );
}

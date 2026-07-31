import type { CSSProperties } from 'react';
import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import HomeJourney from '@/components/v4/HomeJourney';
import HomeFaq from '@/components/v4/HomeFaq';
import HeroCta from '@/components/v4/HeroCta';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';
import { min } from '@/lib/css';

const SHARE_DESCRIPTION =
  'StayBookt answers your phone, books your jobs and chases your quotes. You do the work. We run everything around it. $199 a month, nothing upfront, no lock-in.';


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
/* HERO — LIGHT NOW (Jul 23 2026). The dusk photo behind the headline is retired. The hero is
   clean and light, Apple-homepage style: eyebrow + headline + subhead + one dark pill on a warm
   surface, then a polaroid camera roll of the life it buys, below. Nav is forced solid on the
   homepage (see <Nav solidTop />) so its white logo stays legible over the light hero. */
.v4 header.scene{align-items:flex-start;background:var(--v4-cream,#f6f6f3);color:var(--v4-ink);min-height:auto;padding-bottom:clamp(40px,6vw,80px);}
.v4 header.scene .cta .pill{background:var(--v4-ink);color:#fff;border:0;}
.v4 header.scene .cta .pill:hover{transform:translateY(-1px);box-shadow:0 16px 34px -18px rgba(6,12,20,.5);}
/* THE HOMEPAGE HERO HAD NO GUTTER ON A PHONE. This element is class="wrap inner".
   .v4 .wrap gives it padding:0 32px, and this rule is more specific, so padding:15vh 0 0
   silently wiped the horizontal half of it. On desktop you never see the bug: max-width:940
   inside an 1180 container leaves gutters for free. At 390px there is nothing spare, so the
   headline, the ICP badge and the sub-copy all ran flush to both edges.
   Nobody caught it because nobody had opened this site at phone width. Keep the horizontal
   padding here, or restate it if you ever change the vertical. */
.v4 header.scene .inner{padding:clamp(84px,10vh,116px) clamp(20px,4vw,32px) 0;text-align:center;max-width:1200px;margin:0 auto;}
.v4 header.scene h1{max-width:none;margin:20px auto 0;font-size:clamp(20px,6.4vw,88px);letter-spacing:-.03em;line-height:1.02;text-align:center;color:var(--v4-ink);}
/* SUBHEAD = ONE LINE, ALWAYS (global rule, Jacob Jul 23 2026). The max-width:46ch was forcing
   a two-line wrap. No cap, nowrap, and vw-scaled font so the (short) subhead holds one line from
   desktop down to phone. The rule's real teeth: keep subhead copy short. */
.v4 header.scene p.sub{margin:22px auto 0;color:#52565e;max-width:none;white-space:nowrap;font-size:clamp(13px,3.1vw,21px);}
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
/* On the LIGHT hero the badge is a white chip with the brand gradient as its outline: dark
   text, no blur, a soft light shadow. Same gradient-ring signal Emma asked for, inverted for
   the light surface. */
.v4 header.scene .eyebrow{display:inline-flex;align-items:center;
  font-size:12.5px;font-weight:700;letter-spacing:.15em;color:#42474f;
  border:1.5px solid transparent;
  background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad) border-box;
  border-radius:999px;padding:9px 18px;
  box-shadow:0 6px 18px -10px rgba(6,12,20,.25);}

/* THE POLAROID CAMERA ROLL. Real photos of the life the business buys, framed as polaroids and
   scattered like a camera roll to FILL the space under the copy (Jacob: bigger cluster). No
   captions. Six frames drawn from three approved, self-hosted shots (repeated, no adjacent
   dupes); swap in more real photos and the roll de-dupes. --rot per frame is the tilt, kept
   through the entrance animation below. */
.v4 header.scene .hero-roll{display:flex;justify-content:center;align-items:flex-start;flex-wrap:nowrap;margin:clamp(16px,2.6vw,36px) auto 0;max-width:1120px;padding:0 clamp(8px,2vw,24px);}
.v4 header.scene .hero-roll .pol{--rot:0deg;flex:0 0 auto;background:#fff;padding:8px 8px 22px;border-radius:4px;
  box-shadow:0 26px 52px -22px rgba(6,12,20,.42),0 4px 10px -6px rgba(6,12,20,.2);width:min(clamp(104px,12vw,168px),21vh);transform:rotate(var(--rot));}
.v4 header.scene .hero-roll .pol img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:2px;}
.v4 header.scene .hero-roll .p1{--rot:-9deg;margin-top:26px;margin-right:-26px;z-index:1;}
.v4 header.scene .hero-roll .p2{--rot:5deg;margin-top:6px;margin-right:-26px;z-index:3;}
.v4 header.scene .hero-roll .p3{--rot:-3deg;margin-top:32px;margin-right:-26px;z-index:2;}
.v4 header.scene .hero-roll .p4{--rot:7deg;margin-top:10px;margin-right:-26px;z-index:4;}
.v4 header.scene .hero-roll .p5{--rot:-6deg;margin-top:28px;margin-right:-26px;z-index:2;}
.v4 header.scene .hero-roll .p6{--rot:4deg;margin-top:4px;z-index:5;}
@media(max-width:760px){
  .v4 header.scene .hero-roll{max-width:100%;}
  .v4 header.scene .hero-roll .pol{width:26vw;padding:7px 7px 18px;}
}
@media(max-width:520px){
  .v4 header.scene .hero-roll .p5,.v4 header.scene .hero-roll .p6{display:none;}
  .v4 header.scene .hero-roll .pol{width:33vw;margin-right:-22px;}
}

/* "What You Love" is filled with the photo, not the brand gradient — see the long note below
   the keyframes for why. background-attachment left off on purpose: it must scroll WITH the
   text, not stay fixed to the viewport, or the image swims independently of the letters. */
.v4 header.scene h1 .g{background-image:url(/closer-dock.jpg);background-size:240% auto;background-position:38% 46%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gDockPan 14s ease-in-out infinite;}
.v4 header.scene h1 .pd{color:var(--v4-violet);}
@media(prefers-reduced-motion:reduce){.v4 header.scene h1 .g{animation:none;}}

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
  .v4 header.scene .hero-h1 .hl2::before{content:'';position:absolute;inset:-34% -10%;z-index:-1;background:radial-gradient(56% 62% at 50% 54%,rgba(245,158,11,.34),rgba(217,119,6,.18) 46%,transparent 72%);filter:blur(36px);opacity:0;transform:scale(.7);animation:sbGlow 2s ease 1.05s forwards;}
  .v4 header.scene p.sub{opacity:0;filter:blur(6px);transform:translateY(12px);animation:sbHeroIn .9s cubic-bezier(.16,1,.3,1) 1.7s forwards;}
  .v4 header.scene .cta{opacity:0;transform:translateY(12px);animation:sbHeroIn .9s cubic-bezier(.16,1,.3,1) 1.95s forwards;}
  .v4 header.scene .hero-roll .pol{opacity:0;transform:translateY(56px) scale(.86) rotate(var(--rot));animation:sbPolIn .9s cubic-bezier(.19,1,.22,1) forwards;}
  .v4 header.scene .hero-roll .p1{animation-delay:2.15s;}
  .v4 header.scene .hero-roll .p2{animation-delay:2.25s;}
  .v4 header.scene .hero-roll .p3{animation-delay:2.35s;}
  .v4 header.scene .hero-roll .p4{animation-delay:2.45s;}
  .v4 header.scene .hero-roll .p5{animation-delay:2.55s;}
  .v4 header.scene .hero-roll .p6{animation-delay:2.65s;}
}
@keyframes sbHeroIn{to{opacity:1;filter:blur(0);transform:none;}}
@keyframes sbEnjoyIn{0%{opacity:0;filter:blur(32px);transform:translateY(16px) scale(1.35);}55%{opacity:1;}100%{opacity:1;filter:blur(0);transform:translateY(0) scale(1);}}
@keyframes sbGlow{0%{opacity:0;transform:scale(.7);}50%{opacity:.95;}100%{opacity:.62;transform:scale(1);}}
@keyframes sbPolIn{to{opacity:1;transform:translateY(0) scale(1) rotate(var(--rot));}}

/* "WHAT YOU LOVE" IS THE PHOTOGRAPH (Jacob, Jul 31 2026, round 2 — the icon-cluster version
   above was cut same-day: floating icons dissolving into gradient text is the stock move
   every AI site-builder reaches for, not a StayBookt original). This is the actual signature
   move: the words are not colored with the brand gradient anymore, they are FILLED with
   closer-dock.jpg — the two chairs at dusk, the one photo already doing this exact emotional
   job everywhere else on the site (founders' memwall, the homepage's own closing CTA, growth).
   Reusing the site's own recurring "this is what enjoying your life looks like" photograph,
   masked into the literal words "What You Love," is a specific, ownable, un-templatable move
   — nobody else's stock hero has this photo. bgPan drifts it almost imperceptibly, forever
   (not a one-shot entrance like the rest of the hero — this one stays alive after landing),
   so it reads as a living photograph seen through a keyhole of type, not a static swap-in.
   The glow behind it (sbGlow, above) shifted from cool brand teal/indigo to warm amber/copper
   to match the dusk photo instead of clashing against it. */
@keyframes gDockPan{0%{background-position:38% 46%;}50%{background-position:64% 58%;}100%{background-position:38% 46%;}}
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
/* WHY US — RELIT (Jacob, round 4: "remove dark mode from the rest of the page,"
   keeping only the price section on HomeJourney dark). This band and the explore grid
   right after it used to be the same near-black as the price payoff, back to back, so
   the payoff had no contrast to pay off AGAINST — and the explore grid's low-contrast
   dark-on-dark text was genuinely hard to read (Jacob: "the weird nav section under
   Richard's quote"). Cream now, matching the rest of the page. */
.v4 .whyus{background:var(--v4-cream,#f6f6f3);padding:clamp(84px,11vw,140px) 0;text-align:center;position:relative;overflow:hidden;}
.v4 .whyus::before{content:'';position:absolute;inset:0;background:radial-gradient(50% 60% at 20% 0%,rgba(14,165,233,.10),transparent 60%),radial-gradient(50% 60% at 85% 110%,rgba(16,185,129,.10),transparent 60%);pointer-events:none;}
.v4 .whyus .wrap{position:relative;z-index:1;}
.v4 .whyus .eyebrow{color:#69707d;}
.v4 .whyus blockquote{margin:22px auto 0;font-size:clamp(26px,3.4vw,44px);font-weight:600;letter-spacing:-.03em;line-height:1.14;color:var(--v4-ink,#06080d);max-width:18ch;}
.v4 .whyus .qsub{margin:22px auto 0;font-size:clamp(16px,1.9vw,19px);font-weight:400;line-height:1.55;color:#52565e;max-width:48ch;}
.v4 .whyus cite{display:block;margin-top:26px;font-style:normal;font-size:15px;font-weight:600;color:#69707d;}
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

`;

export default function HomePage() {
  return (
    <div id="top" className="v4">
      <style>{min(PAGE_CSS)}</style>
      <Nav solidTop />
      <main id="main" tabIndex={-1}>

      {/* 1 — HERO */}
      <header className="scene">
        {/* THE DUSK FISHING PHOTO BEHIND THE HEADLINE IS RETIRED (Jacob, July 23 2026). The hero
            is light and Apple-homepage style now: clean surface, copy on top, and a polaroid
            camera roll of the life the business buys, below. No full-bleed image behind the type. */}
        <div className="wrap inner">
          <Reveal className="eyebrow" as="div">For owner-operated service businesses</Reveal>
          {/* Two-stage reveal (Jacob, Jul 23 2026): the clause fades up first, then the payoff
              lands on its own in the gradient. Animation lives in PAGE_CSS under
              prefers-reduced-motion:no-preference.
              Jul 30 2026: "Enjoy Life" moved OUT of the hero and into the journey section
              below (see HomeJourney.tsx round 10) — it was reading as an abstract payoff next
              to the very concrete subhead. "What You Love" replaces it as the gradient
              punchline, still ending the sentence started by hl1. First pass added "to do more
              of" to hl1 (12 extra chars) and clipped mid-word on a 1549px viewport — hl1's
              nowrap+clamp sizing was tuned tight for the original 27-char line, no headroom
              for +44% length. Trimmed to "to do" (+3 chars only): "You built your business to
              do What You Love." is the same grammatical sentence, minus "more of," and stays
              inside the width the original already proved safe down to 320px. */}
          <Reveal>
            <h1 className="hero-h1">
              <span className="hl1">You built your business to do</span>
              <span className="hl2"><span className="g">What You Love</span><span className="pd">.</span></span>
            </h1>
          </Reveal>
          {/* THE HERO SUBHEAD IS BACK, REWRITTEN (Jacob, July 23 2026). The old one held the
              reader up because it restated the headline in three sentences. This one earns its
              place: it adds the concrete "what we do" the aspirational headline leaves out, in
              Apple's statement cadence — three parallel beats, each landing on a period, the
              third flipping the same shape onto the payoff. Headline = the life; subhead = the
              time that buys it. Do not lengthen it and do not break the "Every ___, ___." form. */}
          <Reveal>
            <p className="sub">Every call, answered. Every invoice, chased.</p>
          </Reveal>
          <Reveal>
            <div className="cta">
              <a href={START_LINK} className="pill pill-white" style={{ padding: '14px 28px', fontSize: 15 }} data-cta="hero">Get Started</a>
            </div>
          </Reveal>
          {/* THE MYSTERY-SHOP LINE IS GONE FROM THE WHOLE SITE (Jacob, July 2026).
              It read as a gimmick: "before we meet, we try to hire you." Richard flagged it
              as awkward on this page, and it is. The call is described by what the call
              actually is now, not by a trick we do before it.

              Do not put a second line under this button. The hero has one job. */}
          {/* THE POLAROID CAMERA ROLL. Aria-hidden: decorative lifestyle photos, no captions.
              Three approved self-hosted shots; add more and they join the scatter. */}
          <Reveal>
            <div className="hero-roll" aria-hidden="true">
              <div className="pol p1"><img src="/life-boat.jpg" alt="" width={440} height={440} /></div>
              <div className="pol p2"><img src="/life-dog.jpg" alt="" width={440} height={440} /></div>
              <div className="pol p3"><img src="/life-shop.jpg" alt="" width={440} height={440} /></div>
              <div className="pol p4"><img src="/life-boat.jpg" alt="" width={440} height={440} /></div>
              <div className="pol p5"><img src="/life-dog.jpg" alt="" width={440} height={440} /></div>
              <div className="pol p6"><img src="/life-shop.jpg" alt="" width={440} height={440} /></div>
            </div>
          </Reveal>
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

      {/* THE "IN PLAIN ENGLISH" CARD IS GONE (Jacob, July 14 2026).
          Three columns of bullets sat between the hero and the journey: the only
          piece of UI on an otherwise cinematic page. It also said the plot out loud
          and then the film below it showed the same plot. "What we do" is what the
          beats ARE. "What you do" is the payoff, not a feature. "What it costs" got
          its own screen, which is now beat 3 of the film itself.
          Do not put a card back here. */}

      {/* 3 — THE JOURNEY. Was JourneyMap.tsx: an abstract 4-beat pinned scroll-scrub
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

      {/* 5 — WHY WE BUILT THIS */}
      <section className="whyus">
        <div className="wrap">
          <Reveal as="div">
            <img
              src="/photos/richard.jpg"
              alt="Richard, Co-founder of StayBookt"
              width={64}
              height={64}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block',
                margin: '0 auto 24px',
                boxShadow: '0 0 0 1px rgba(255,255,255,.14)',
              }}
            />
          </Reveal>
          <Reveal className="eyebrow" as="div">Why we built this</Reveal>
          <Reveal>
            <blockquote>
              Every owner we talked to said the same thing. There was never enough time.
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="qsub">
              StayBookt is our answer. We take the busywork off your plate, so you get back to the
              work you love, and the life you built it for.
            </p>
          </Reveal>
          <Reveal>
            <cite>Richard, Co-founder</cite>
          </Reveal>
          {/* "Meet the founders" link DROPPED (Jacob, round 4). The About us card in the
              explore grid immediately below points at the same page — one destination,
              one door, not a link and then a card for it four inches later. */}
        </div>
      </section>

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
          lines. "Enjoy Life" capitalized: it is the brand, not a phrase. */}
      <HeroCta
        heading={<>Helping your business run better.<br />So that you Enjoy Life more.</>}
      />

      </main>

      <SiteFooter />
    </div>
  );
}

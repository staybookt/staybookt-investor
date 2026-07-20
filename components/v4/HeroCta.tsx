import { START_LINK } from '@/lib/site';
import { min } from '@/lib/css';

/* THE CLOSING CTA. One of them, on every page (Jacob, live review, July 2026).
 *
 * This replaced StartBanner, the "Before we meet, we try to hire you" text card.
 * That card was a headline and a paragraph in a dark box, and it was doing the same
 * job this scene does, worse. Every page now ends on the same thing the homepage
 * ends on: the life the whole product is for, and one button.
 *
 * SELF-CONTAINED ON PURPOSE. It does not inherit `.v4 .scene` from globals, because
 * /whats-included wraps in `.inc` with no `.v4` ancestor and the scene styles would
 * silently not apply there. Everything it needs is in this file. Do not re-couple it
 * to a page's stylesheet.
 *
 * fromBlack: the homepage only. The film ends on the $199 reveal on black, and this
 * scene has to dissolve out of that black rather than cut to a photo. Everywhere
 * else the section above is light or mid-tone, so the standard grade is correct. */
/* PER-PAGE CLOSES (Jacob, July 2026: "The close on every page should be different.")
 * Each page's closing photo pays off that page's own argument: the slow morning with the paper after
 * /how-it-works teaches the machine, the girlfriends' day out after /whats-included, the
 * dawn tee time after /pricing, the campfire after /long-term, the ride after /work, the
 * long table of old friends after /founders. One dock photo everywhere was efficient, not
 * considered. The dock stays the default: home ends on it, and any page that does not
 * pass `img` falls back to it. */
export default function HeroCta({ fromBlack = false, img = HERO_IMG }: { fromBlack?: boolean; img?: string }) {
  return (
    <section className="hcta" data-fade={fromBlack ? 'black' : undefined}>
      <style>{min(CSS)}</style>
      {/* 2000x2835 is what Pexels returns for the default dock photo at w=2000, measured,
          not guessed. The per-page images have other aspect ratios, and that is fine: the
          CSS above pins this to inset:0 / 100% / object-fit:cover, so the attributes never
          set the rendered size; they only give the browser an aspect ratio up front so it
          reserves the box before the bytes land instead of reflowing around it. */}
      <img src={img} alt="" width={2000} height={2835} loading="lazy" decoding="async" />
      <div className="hcta-ov" />
      <div className="hcta-in">
        {/* WAS "Go enjoy the life you built it for." (Richard: "feels awkward. I have to
            reread it to think I get it.")

            He is right and the reason is grammatical, not tonal. "built it for" makes you
            hunt for what "it" is: the business, mentioned nowhere in the sentence. That is
            a garden-path sentence, and the hero on the homepage already says the same
            thought cleanly: "You built your business to enjoy your life."

            So the closer echoes the hero instead of fighting it, and it keeps Enjoy Life,
            which is the brand. Not turned into a question: a question at the close invites
            the answer "no". */}
        {/* THE CLOSING TAG, LOCKED (Jacob + Richard, July 2026).
            It was "You built the business. Now go enjoy the life." Richard twice: "I have to
            reread it to think I get it... I don't like the tag as I think it is not clear. I
            wouldn't use it anywhere." When a reviewer says the same thing twice, the line is
            the problem, not the reviewer.
            He wanted a question ("Are you ready to do more meaningful work and Enjoy Life
            more?"). We pushed back on the format only: a question at the close can be
            answered "no" in the reader's head for free, right where we want a click. He took
            the alternative. Declarative, instantly clear, no rereading.
            NOTE: the footer used to say "You do the work. We run the rest." — near-identical,
            200px below this, on every page. It now says "Enjoy Life." If you ever change this
            line back, check the footer again. */}
        <h2>Do the work you love. We&rsquo;ll run the rest.</h2>
        <p>We get you found and run the day to day. You get your time back.</p>
        <a className="hcta-btn" href={START_LINK}>Get Started</a>
        <div className="hcta-note">Thirty minutes with a founder. Never a sales rep.</div>
      </div>
    </section>
  );
}

/* WAS the golden-hour family (dad, daughter on shoulders), on every page. Warm, but it
   was the "relationship stuff too heavy" note, sitewide. Two Muskoka chairs on a dock at
   golden hour instead: under "Do the work you love. We'll run the rest." the empty chairs
   read as the evening waiting for you, and a dock is what a seven-figure exit actually
   buys. Richard asked for this shot by name. */
const HERO_IMG = '/closer-dock.jpg';

const CSS = `
.hcta{position:relative;min-height:min(100vh,900px);display:flex;align-items:flex-end;overflow:hidden;color:#fff;background:#050506;}
.hcta>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.hcta .hcta-ov{position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(5,5,6,.6) 0%,rgba(5,5,6,.18) 34%,rgba(5,5,6,.5) 72%,#050506 100%);}
/* homepage only: emerge out of the film's black instead of cutting to the photo */
.hcta[data-fade="black"] .hcta-ov{
  background:linear-gradient(180deg,#050506 0%,rgba(5,5,6,.72) 10%,rgba(5,5,6,.2) 34%,rgba(5,5,6,.5) 72%,#050506 100%);}

.hcta-in{position:relative;z-index:1;width:100%;max-width:1120px;margin:0 auto;
  padding:0 clamp(20px,4vw,40px) clamp(72px,9vw,110px);text-align:center;}
.hcta-in h2{font-size:clamp(34px,5.4vw,74px);font-weight:600;letter-spacing:-.035em;line-height:1.03;
  color:#fff;max-width:15ch;margin:0 auto;text-shadow:0 2px 34px rgba(0,0,0,.55);}
.hcta-in p{margin:20px auto 0;font-size:clamp(16px,1.9vw,20px);line-height:1.5;color:#eef1f5;max-width:38ch;
  text-shadow:0 1px 22px rgba(0,0,0,.6);}

.hcta-btn{display:inline-flex;align-items:center;justify-content:center;margin-top:clamp(28px,3.6vw,38px);
  background:#fff;color:#050506;font-size:15.5px;font-weight:600;border-radius:999px;padding:16px 34px;
  text-decoration:none;box-shadow:0 18px 44px -18px rgba(0,0,0,.7);transition:transform .3s ease,box-shadow .3s ease;}
.hcta-btn:hover{transform:translateY(-2px);box-shadow:0 26px 58px -18px rgba(0,0,0,.8);}
.hcta-note{margin-top:16px;font-size:13px;color:rgba(255,255,255,.62);text-shadow:0 1px 14px rgba(0,0,0,.7);}
@media(prefers-reduced-motion:reduce){.hcta-btn{transition:none;}}
`;

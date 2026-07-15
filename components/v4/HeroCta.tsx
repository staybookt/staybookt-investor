import { START_LINK } from '@/lib/site';

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
export default function HeroCta({ fromBlack = false }: { fromBlack?: boolean }) {
  return (
    <section className="hcta" data-fade={fromBlack ? 'black' : undefined}>
      <style>{CSS}</style>
      <img src={HERO_IMG} alt="" loading="lazy" decoding="async" />
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
        <h2>You built the business. Now go enjoy the life.</h2>
        <p>We get you found and run the day to day. You get your time back.</p>
        <a className="hcta-btn" href={START_LINK}>Get Started</a>
        <div className="hcta-note">Thirty minutes with a founder. Never a sales rep.</div>
      </div>
    </section>
  );
}

const HERO_IMG =
  'https://images.pexels.com/photos/30660768/pexels-photo-30660768.jpeg?auto=compress&cs=tinysrgb&w=2000';

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

import Nav from '@/components/v4/Nav';
import { min } from '@/lib/css';

/* PREVIEW ONLY — not linked from nav, not in sitemap, robots-noindex. Built for Jacob to react
 * to before anything real ships (Aug 2 2026, after he killed the Answer Field: "worst one yet
 * ... a laundry list, not a creative way of illustrating the point").
 *
 * The actual miss on takes 1-4 wasn't permanence vs animation, it was medium. Dissected
 * Journeys and About Us again at his instruction: eyebrow, two-stage headline (black clause +
 * gradient payoff), one-line sub, then a device — and in BOTH cases the device is real
 * PHOTOGRAPHY, elegantly composed (a route map with real customer photos as waypoints; a fanned
 * stack of real candid polaroids). Take 4 (the Answer Field) was pure typography — a grid of
 * words — which is structurally why it read as a "laundry list" no matter how the copy was
 * written. Every sibling device on this site is a picture. The homepage's has never been one.
 *
 * Both concepts below use closer-dock.jpg — the two Muskoka chairs on the dock at golden hour,
 * already the site's single most-repeated image (default HeroCta close on every page, "Richard
 * asked for this shot by name," described in that file as "what a seven-figure exit actually
 * buys"). Not new photography — the existing, most-loved asset, finally given real weight on
 * the page that's supposed to be about what it depicts, instead of being a small closing photo
 * 6 sections down. Same headline, same subhead, same CTA as production — only the device below
 * changes between the two sections. */

const CSS = `
.ph{--v4-ink:#06080d;--v4-cream:#f6f6f3;--v4-muted:#7a828f;color:var(--v4-ink);background:var(--v4-paper,#fff);
  font-family:var(--font-sans,'Inter Tight',system-ui,sans-serif);}
.ph .wrap{max-width:1180px;margin:0 auto;padding:0 32px;}
.ph .hero{background:var(--v4-cream);padding:clamp(70px,9vw,100px) 0 clamp(90px,11vw,140px);}
.ph .eyebrow{display:inline-flex;align-items:center;font-size:12.5px;font-weight:700;letter-spacing:.15em;
  color:#42474f;border:1.5px solid transparent;
  background:linear-gradient(#fff,#fff) padding-box,linear-gradient(100deg,#06b6d4,#10b981 52%,#4f46e5) border-box;
  border-radius:999px;padding:9px 18px;box-shadow:0 6px 18px -10px rgba(6,12,20,.25);}
.ph .inner{text-align:center;padding-top:clamp(60px,8vh,90px);}
.ph h1{margin:20px auto 0;font-size:clamp(28px,6vw,80px);letter-spacing:-.03em;line-height:1.03;font-weight:600;}
.ph h1 .hl1{display:block;}
.ph h1 .hl2{display:block;}
.ph h1 .g{background:linear-gradient(100deg,#06b6d4,#10b981 52%,#4f46e5);-webkit-background-clip:text;
  background-clip:text;color:transparent;}
.ph h1 .pd{color:#4f46e5;}
.ph p.sub{margin:22px auto 0;color:#52565e;font-size:clamp(15px,2.4vw,21px);}
.ph .cta{margin-top:32px;}
.ph .pill{display:inline-flex;align-items:center;justify-content:center;background:var(--v4-ink);color:#fff;
  border-radius:999px;padding:14px 28px;font-size:15px;font-weight:600;text-decoration:none;}
.ph .concept{padding:clamp(60px,8vw,90px) 0;border-top:1px solid #e9e9e6;}
.ph .concept-lbl{text-align:center;font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:var(--v4-muted);margin-bottom:32px;}

.ph .revealA{max-width:880px;margin:0 auto;border-radius:20px;overflow:hidden;position:relative;
  box-shadow:0 30px 70px -30px rgba(6,12,20,.35);}
.ph .revealA img{display:block;width:100%;height:clamp(340px,46vw,560px);object-fit:cover;object-position:center 30%;
  animation:phRevealClip 1.6s cubic-bezier(.65,0,.35,1) .1s both;}
@keyframes phRevealClip{0%{clip-path:inset(0 50% 0 50%);}100%{clip-path:inset(0 0 0 0);}}

.ph .revealB{max-width:880px;margin:0 auto;border-radius:20px;overflow:hidden;position:relative;
  box-shadow:0 30px 70px -30px rgba(6,12,20,.35);}
.ph .revealB .frame{overflow:hidden;border-radius:20px;}
.ph .revealB img{display:block;width:100%;height:clamp(340px,46vw,560px);object-fit:cover;object-position:center 30%;
  animation:phKenBurns 24s ease-in-out infinite alternate;}
@keyframes phKenBurns{0%{transform:scale(1.08) translate(0,0);}100%{transform:scale(1.16) translate(-1.2%,-1.6%);}}
`;

export default function PreviewHero() {
  return (
    <div className="ph">
      <style>{min(CSS)}</style>
      <Nav solidTop />
      <header className="hero">
        <div className="wrap inner">
          <span className="eyebrow">For owner-operated service businesses</span>
          <h1>
            <span className="hl1">You built your business to do</span>
            <span className="hl2"><span className="g">What You Love</span><span className="pd">.</span></span>
          </h1>
          <p className="sub">Every call, answered. Every invoice, chased.</p>
          <div className="cta"><a className="pill" href="#">Get Started</a></div>
        </div>
      </header>

      <section className="concept">
        <p className="concept-lbl">Concept A &mdash; the reveal (curtain wipe, one-time on load)</p>
        <div className="revealA">
          <img src="/closer-dock.jpg" alt="" width={1600} height={900} />
        </div>
      </section>

      <section className="concept">
        <p className="concept-lbl">Concept B &mdash; the reveal (slow Ken Burns drift, always alive)</p>
        <div className="revealB">
          <div className="frame">
            <img src="/closer-dock.jpg" alt="" width={1600} height={900} />
          </div>
        </div>
      </section>
    </div>
  );
}

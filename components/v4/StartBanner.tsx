import { START_LINK } from '@/lib/site';

/* GET STARTED — the closing CTA, as one contained, high-energy card.
 *
 * The old version of this was a headline and a grey paragraph floating in a tall
 * black field, and it read as dead space with a lost button in it (Jacob, live
 * review, July 2026). The idea was never the problem: the mystery shop, "before we
 * meet, we try to hire you," is the best hook we own. The staging was the problem.
 *
 * So it is a CARD now, not an empty section. A contained panel with a gradient
 * hairline, an inner glow, a headline that actually lands, one tight line of copy
 * instead of four, and a single unmistakable gradient button that is the brightest
 * object on the screen. Less height, more punch.
 *
 * THE BUTTON IS THE BRAND GRADIENT. Not a white pill, not a ghost outline. It is
 * the loudest thing here on purpose. Do not tone it down and do not put a second
 * button next to it. One card, one ask. */
export default function StartBanner() {
  return (
    <section className="sbn">
      <style>{CSS}</style>
      <div className="sbn-card">
        <div className="sbn-glow" aria-hidden />
        <div className="sbn-body">
          <div className="sbn-k"><span className="dot" aria-hidden />No pitch &middot; no pressure</div>
          <h2 className="sbn-h">
            Before we meet,<br />
            <span className="g">we try to hire you.</span>
          </h2>
          <p className="sbn-p">
            We call your line, text your listing, and try to book a job, then show you exactly what
            happened. Free, and yours to keep either way.
          </p>
          <a className="sbn-btn" href={START_LINK}>
            Get Started
            <svg className="ci" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <div className="sbn-note">Thirty minutes with a founder. Never a sales rep.</div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.sbn{position:relative;background:#050506;padding:clamp(56px,7vw,88px) clamp(20px,4vw,40px);overflow:hidden;}
.sbn::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(60% 80% at 50% 0%,rgba(16,185,129,.10),transparent 60%);}

/* the card: a contained object with a gradient hairline, not an open field */
.sbn-card{position:relative;width:100%;max-width:720px;margin:0 auto;border-radius:30px;
  padding:1.5px;background:var(--sb-grad);background-size:160% 160%;
  box-shadow:0 40px 100px -40px rgba(16,185,129,.5),0 0 0 1px rgba(255,255,255,.04);
  animation:sbnsheen 9s ease-in-out infinite;}
@keyframes sbnsheen{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}
.sbn-body{position:relative;z-index:1;border-radius:28.5px;background:linear-gradient(180deg,#0b1017,#070a0f);
  padding:clamp(40px,5.4vw,64px) clamp(26px,4vw,54px);text-align:center;overflow:hidden;}
.sbn-glow{position:absolute;inset:0;z-index:0;pointer-events:none;
  background:radial-gradient(80% 120% at 50% -10%,rgba(16,185,129,.16),transparent 58%),
            radial-gradient(70% 90% at 50% 120%,rgba(79,70,229,.14),transparent 60%);}
.sbn-body>*{position:relative;z-index:1;}

.sbn-k{display:inline-flex;align-items:center;gap:8px;font-size:11.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#9aa3b2;}
.sbn-k .dot{width:6px;height:6px;border-radius:50%;background:var(--sb-grad);box-shadow:0 0 10px 1px rgba(16,185,129,.7);}
.sbn-h{margin-top:18px;font-size:clamp(32px,5vw,60px);font-weight:600;letter-spacing:-.04em;line-height:1.02;color:#fff;}
.sbn-h .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.sbn-p{margin:20px auto 0;font-size:clamp(16px,1.8vw,18.5px);line-height:1.55;color:#aeb6c4;max-width:46ch;}

.sbn-btn{display:inline-flex;align-items:center;gap:10px;margin-top:clamp(28px,3.4vw,38px);
  background:var(--sb-grad);background-size:200% 100%;background-position:0% 50%;
  color:#fff;font-size:16.5px;font-weight:700;letter-spacing:-.01em;border-radius:999px;padding:18px 40px;text-decoration:none;
  box-shadow:0 20px 50px -16px rgba(16,185,129,.7),inset 0 1px 0 rgba(255,255,255,.25);
  transition:background-position .6s ease,transform .3s ease,box-shadow .3s ease;}
.sbn-btn:hover{background-position:100% 50%;transform:translateY(-2px);box-shadow:0 30px 66px -16px rgba(16,185,129,.85),inset 0 1px 0 rgba(255,255,255,.3);}
.sbn-btn .ci{transition:transform .3s ease;}
.sbn-btn:hover .ci{transform:translateX(4px);}

.sbn-note{margin-top:16px;font-size:13px;color:#79808e;}
@media(prefers-reduced-motion:reduce){.sbn-card,.sbn-btn{animation:none;transition:none;}}
`;

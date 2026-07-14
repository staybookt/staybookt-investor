import { START_LINK } from '@/lib/site';

/* GET STARTED — a static banner, sitting directly under the film.
 *
 * This used to be beat 3 of JourneyMap: you had to scroll-scrub through the CTA
 * like it was part of the story. It is not part of the story. It is the moment you
 * stop watching and do something, and that should be a wall you hit, not a scene
 * you scrub. So it came out of the film and became a fixed banner (Jacob, July 14
 * 2026). The film now ends on the number, which is the right note to end on.
 *
 * THE BUTTON IS THE BRAND GRADIENT, NOT BLACK ON WHITE. The white pill with black
 * text was the single most off-brand object on the page: it belonged to no palette
 * we own. It is now the wordmark's own gradient, cyan to emerald to indigo, which
 * is the only gradient this company is allowed to use. Do not put a white pill back
 * on a dark section. */
export default function StartBanner() {
  return (
    <section className="sbn">
      <style>{CSS}</style>
      <div className="sbn-in">
        <div className="sbn-k">No pitch &middot; no pressure</div>
        <h2 className="sbn-h">
          Before we meet, <span className="g">we try to hire you.</span>
        </h2>
        <p className="sbn-p">
          We call your line. We text your listing. We search for you the way a stranger with a
          problem would, and we try to book a job. Then we spend thirty minutes showing you exactly
          what happened. Free, and yours to keep whether you hire us or not.
        </p>
        <a className="sbn-btn" href={START_LINK}>
          Get Started
          <svg
            className="ci"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
        <div className="sbn-note">Thirty minutes with a founder. Never a sales rep.</div>
      </div>
    </section>
  );
}

const CSS = `
.sbn{--g:linear-gradient(100deg,#06b6d4,#10b981 52%,#4f46e5);
  position:relative;background:#050506;padding:clamp(76px,10vw,120px) 0;overflow:hidden;}
.sbn::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(70% 100% at 50% 0%,rgba(16,185,129,.12),transparent 62%),
             radial-gradient(60% 90% at 50% 100%,rgba(79,70,229,.1),transparent 62%);}
.sbn-in{position:relative;z-index:1;width:100%;max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px);text-align:center;}

.sbn-k{font-size:11.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#5c6470;}
.sbn-h{margin-top:16px;font-size:clamp(30px,4.6vw,58px);font-weight:600;letter-spacing:-.038em;line-height:1.04;color:#f5f5f7;max-width:18ch;margin-left:auto;margin-right:auto;}
.sbn-h .g{background:var(--g);-webkit-background-clip:text;background-clip:text;color:transparent;}
.sbn-p{margin:22px auto 0;font-size:clamp(16px,1.8vw,19px);line-height:1.6;color:#8b93a5;max-width:52ch;}

/* the brand gradient, not a white pill. */
.sbn-btn{display:inline-flex;align-items:center;gap:9px;margin-top:clamp(30px,3.6vw,40px);
  background:var(--g);background-size:180% 100%;background-position:0% 50%;
  color:#fff;font-size:16px;font-weight:600;border-radius:999px;padding:16px 32px;text-decoration:none;
  box-shadow:0 22px 54px -20px rgba(16,185,129,.6);
  transition:background-position .6s ease,transform .3s ease,box-shadow .3s ease;}
.sbn-btn:hover{background-position:100% 50%;transform:translateY(-2px);box-shadow:0 30px 66px -20px rgba(16,185,129,.75);}
.sbn-btn .ci{transition:transform .3s ease;}
.sbn-btn:hover .ci{transform:translateX(3px);}

.sbn-note{margin-top:18px;font-size:13.5px;color:#6f7787;}
@media(prefers-reduced-motion:reduce){.sbn-btn{transition:none;}}
`;

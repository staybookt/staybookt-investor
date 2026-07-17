import Reveal from '@/components/v4/Reveal';
import { min } from '@/lib/css';

/* ============================================================================
 * REBUILT July 2026. This page used to be a drag-to-compare before/after where
 * BOTH panels were hand-built mockups. The "after" carried a 555 reserved fake
 * phone number and an invented ESA licence number, under body copy that read
 * "This is a real build. Not a mockup, not a concept." It was benched, and this
 * is what replaced it.
 *
 * WHY NOT REBUILD THE BEFORE/AFTER: Tim's old site is recoverable (it is sitting
 * on DreamHost at ~/topchoiceelectrical.com.OFF with its database intact), so we
 * could have. We chose not to. A before/after asks the reader to trust OUR framing
 * of the before. A live URL asks them to trust nothing: they click it, and either
 * an electrician's website loads or it does not. That is the only kind of proof
 * this company should be shipping, and it happens to be the kind we cannot fake.
 *
 * THE ONLY RULE ON THIS PAGE: every sentence must be checkable in thirty seconds
 * by a stranger with a browser. If a claim needs us to be believed, it does not
 * belong here. Specifically:
 *   - No results. No traffic, no leads, no rankings, no revenue. We have not
 *     measured them and Tim's numbers are Tim's business.
 *   - No "Tim answers in ten minutes" or similar. That is TCE's claim on TCE's
 *     own site, not our evidence.
 *   - NO PHONE CTA. Do not invite readers to call Tim to test us. He is a real
 *     person running a real business, not a demo environment.
 *   - The image is a real screenshot. If it is ever replaced with anything styled,
 *     composited or reconstructed, this whole page goes back in the bin.
 * ========================================================================= */

const SHOT = '/photos/tce-live.jpg';
const SHOT_DATE = 'July 2026';
const URL = 'https://www.topchoiceelectrical.com';

/* Everything here is verifiable from the live site itself. Nothing is a result. */
const TRUE_THINGS: { t: string; b: string }[] = [
  { t: 'A real client, named.', b: 'Tim Davis runs Top Choice Electrical out of Newmarket, Ontario, covering York Region and Simcoe County. He is our first client. This is his site.' },
  { t: 'It is live right now.', b: 'This is the site his customers land on when they search for an electrician at nine at night. Type the address into any browser and it loads.' },
  { t: 'Built to open fast on a phone.', b: 'A homeowner standing in a dark basement does not wait around. Open it on your phone and see how it behaves.' },
  { t: 'His, not ours.', b: 'The site, the domain and the Google profile are in his name. If he left tomorrow he would take all of it with him.' },
];

const CSS = `
.wk{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);}
.wk .wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 clamp(20px,4vw,40px);}
.wk .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.wk h1,.wk h2,.wk h3{font-weight:600;letter-spacing:-.035em;}

/* Centred to match the standard. Five interior heroes were centred and four were left-
   aligned, and hero alignment is the first thing anybody sees on a page. */
.wk-hero{position:relative;overflow:hidden;background:#050506;padding:clamp(140px,17vh,190px) 0 clamp(70px,9vw,100px);text-align:center;}
.wk-hero::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(60% 70% at 18% 0%,rgba(14,165,233,.16),transparent 62%),
             radial-gradient(50% 70% at 86% 8%,rgba(16,185,129,.10),transparent 62%);}
.wk-hero .wrap{position:relative;z-index:1;}
/* WAS the homepage's pill badge, near-verbatim: inline-flex, rgba(255,255,255,.08) fill,
   1px border, 999px radius, gradient dot ::before. /long-term's own header lists that exact
   badge as one of the reasons it "looked like a different site" — the rule got written down
   and the page that broke it never got fixed. Only the homepage hero gets the badge.
   Interior pages use the plain eyebrow. */
.wk-k{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#c9cdd6;}
.wk-hero h1{margin:18px auto 0;font-size:clamp(42px,6.6vw,86px);line-height:1.0;color:#fff;max-width:14ch;}
.wk-hero h1 .g{background:var(--sb-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.wk-hero p{margin:26px auto 0;font-size:clamp(17px,2vw,21px);line-height:1.6;color:#aeb6c4;max-width:56ch;}

/* the artifact */
.wk-shot{background:#050506;padding:0 0 clamp(70px,8vw,104px);}
.wk-frame{position:relative;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.14);
  box-shadow:0 60px 120px -50px rgba(0,0,0,.9);background:#0b0d12;}
.wk-bar{display:flex;align-items:center;gap:8px;padding:11px 14px;background:#15181f;border-bottom:1px solid rgba(255,255,255,.08);}
.wk-bar .dot{width:11px;height:11px;border-radius:50%;background:rgba(255,255,255,.16);flex:0 0 auto;}
.wk-bar .pill{display:inline-flex;align-items:center;gap:7px;margin:0 auto;padding:5px 14px;border-radius:999px;
  background:rgba(255,255,255,.07);color:#aeb6c4;font-size:12.5px;font-weight:500;letter-spacing:.01em;}
.wk-bar .pill svg{width:12px;height:12px;flex:0 0 auto;}
.wk-frame img{display:block;width:100%;height:auto;}
.wk-cap{margin:18px auto 0;display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;}
.wk-cap .txt{font-size:14px;line-height:1.6;color:#69707d;max-width:60ch;}
.wk-go{display:inline-flex;align-items:center;gap:9px;padding:13px 22px;border-radius:999px;background:#fff;color:#06080d;
  font-size:15px;font-weight:600;text-decoration:none;transition:transform .25s ease,box-shadow .25s ease;white-space:nowrap;}
.wk-go:hover{transform:translateY(-1px);box-shadow:0 18px 40px -20px rgba(255,255,255,.5);}

.wk-true{padding:clamp(76px,9vw,116px) 0;}
.wk-true h2{font-size:clamp(28px,4vw,50px);line-height:1.05;max-width:16ch;margin-top:14px;}
.wk-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(18px,2.6vw,30px);margin-top:clamp(36px,4.4vw,52px);}
@media(max-width:820px){.wk-grid{grid-template-columns:1fr;}}
.wk-grid > .reveal{display:flex;}
.wk-item{flex:1;background:#fff;border:1px solid #e6e6e1;border-radius:20px;padding:clamp(22px,2.6vw,30px);
  box-shadow:0 30px 60px -46px rgba(6,12,20,.3);}
.wk-item .t{font-size:clamp(17px,1.9vw,21px);font-weight:600;letter-spacing:-.02em;}
.wk-item .b{margin-top:10px;font-size:15.5px;line-height:1.65;color:#69707d;}
.wk-note{margin-top:clamp(34px,4vw,48px);padding-left:clamp(16px,2vw,22px);border-left:3px solid transparent;
  border-image:var(--sb-grad-ink) 1;font-size:clamp(16px,1.8vw,19px);line-height:1.6;color:#42474f;max-width:62ch;}
.wk-note b{color:var(--v4-ink);font-weight:600;}
`;

export default function WorkShowcase() {
  return (
    <div className="wk">
      <style>{min(CSS)}</style>

      <header className="wk-hero">
        <div className="wrap">
          <Reveal as="div"><div className="wk-k">The work</div></Reveal>
          <Reveal>
            <h1>Go look at it <span className="g">yourself.</span></h1>
          </Reveal>
          <Reveal>
            <p>
              Tim Davis is an electrician in Newmarket, Ontario. We built his site, and you can
              open it in the next ten seconds. We would rather you checked than believed us.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="wk-shot">
        <div className="wrap">
          <Reveal>
            <div className="wk-frame">
              <div className="wk-bar">
                <span className="dot" /><span className="dot" /><span className="dot" />
                {/* The real domain. This said "your-business.com" on the fabricated version. */}
                <span className="pill">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  topchoiceelectrical.com
                </span>
                <span style={{ width: 33 }} />
              </div>
              <img
                src={SHOT}
                width={1568}
                height={682}
                alt="A screenshot of the live Top Choice Electrical homepage, built by StayBookt"
              />
            </div>
          </Reveal>
          <Reveal>
            <div className="wk-cap">
              <span className="txt">
                An unedited screenshot of the live site, {SHOT_DATE}. Top Choice Electrical, Newmarket,
                Ontario. Nothing on this page has been touched up or rebuilt for the picture. If it looks
                different when you open it, that is because he has kept working and we have not
                re-shot it.
              </span>
              <a className="wk-go" href={URL} target="_blank" rel="noopener noreferrer">
                Open the live site <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wk-true">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">What you can check</Reveal>
          <Reveal><h2>Four things, and you can check every one.</h2></Reveal>
          <div className="wk-grid">
            {TRUE_THINGS.map((x) => (
              <Reveal key={x.t}>
                <div className="wk-item">
                  <div className="t">{x.t}</div>
                  <div className="b">{x.b}</div>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Says what is NOT here, and why. The absence is the argument. */}
          <Reveal>
            <p className="wk-note">
              There are no numbers on this page. We have not measured Tim&rsquo;s traffic or his
              revenue, and either way that is his business to talk about, not our marketing.{' '}
              <b>One client does not prove a pattern.</b> All we are claiming today is that the thing
              is real, and you can go look at it.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

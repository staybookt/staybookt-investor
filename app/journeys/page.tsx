import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import HeroCta from '@/components/v4/HeroCta';
import JourneysFaq from '@/components/v4/JourneysFaq';
import { min } from '@/lib/css';

/* THE JOURNEYS LANDING — a mini landing page: locked hero format + one supporting
 * animation + three profession cards. Nothing else (Jacob, July 27 2026).
 *
 * V1 of this page shipped with a free-wrapping headline, a four-line intro paragraph
 * and no hero animation — three violations of the locked rules at once (Jacob, with
 * screenshot: "doesn't follow the design rules of the other pages... headline copy is
 * horrid... sub can only be one line"). This build:
 *   - locked hero: eyebrow pill → two-stage 2-line headline (hl1 solid clause /
 *     hl2 gradient payoff + violet period, both nowrap blocks) → ONE-line sub.
 *   - supporting animation Jacob asked for by name: a guided map, GPS-style. Three
 *     avatar pins in three corners, a route per journey drawing itself in that
 *     journey's brand hue with a live dot traveling it, all converging on a pulsing
 *     gradient "Enjoy Life." destination pin. The map IS the argument: three owners,
 *     three corners of the same world, one destination.
 *   - the long intro paragraph is gone; the three cards carry the teasers. */

const SHARE =
  'Three owners, three corners of the same world: a home-service shop, a solo consultant, a real estate agent. Walk a year with whichever one sounds like your week.';

export const metadata = {
  title: 'Journeys',
  description: SHARE,
  alternates: { canonical: '/journeys' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Journeys · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/journeys',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'Journeys · StayBookt', description: SHARE },
};

const CARDS = [
  {
    href: '/journeys/home-service',
    img: '/face-marcus.jpg',
    banner: '/banner-toronto.jpg',
    bpos: 'center',
    person: 'Marcus Bell',
    role: 'Owner · Seamless Electric',
    c: '#06b6d4',
    tag: 'Home service',
    line: 'Marcus got his <span class="g">nights back</span>.',
    teaser: 'You’re the best in your trade for miles. So why does the phone keep going to voicemail while you’re on the tools?',
    cta: 'Every call answered',
  },
  {
    href: '/journeys/consultant',
    img: '/face-sean.jpg',
    banner: '/banner-chicago.jpg',
    bpos: 'center',
    person: 'Sean Anderson',
    role: 'Founder · Anderson Consulting',
    c: '#4f46e5',
    tag: 'Consultant',
    line: 'Sean stopped <span class="g">chasing</span>.',
    teaser: 'You’re brilliant at the work. But your best leads go cold while you’re heads-down delivering for someone else.',
    cta: 'A full pipeline',
  },
  {
    href: '/journeys/real-estate-agent',
    img: '/face-kim.jpg',
    banner: '/banner-vancouver.jpg',
    bpos: 'center',
    person: 'Kim Dempster',
    role: 'Realtor · Dempster Group',
    c: '#7c3aed',
    tag: 'Real estate agent',
    line: 'Kim&rsquo;s first to <span class="g">every door</span>.',
    teaser: 'You’re one of the top agents in town. But the lead always tours with whoever calls back first.',
    cta: 'Every lead in seconds',
  },
];

/* map pins: avatar + hue + start corner (percent coords inside the map card) */
const PINS = [
  { img: '/face-marcus.jpg', pos: 'center', name: 'Marcus', trade: 'Home service', c: '#06b6d4', left: '7%', top: '12%' },
  { img: '/face-sean.jpg', pos: 'center', name: 'Sean', trade: 'Consultant', c: '#4f46e5', left: '46.5%', top: '4%' },
  { img: '/face-kim.jpg', pos: 'center', name: 'Kim', trade: 'Real estate', c: '#7c3aed', left: '84%', top: '14%' },
];

/* Organic winding routes (viewBox 1100x520): smooth cubic S-curves that dip and rise
   on the way to the destination — a journey with ups and downs, not a subway map
   (Jacob, July 27: "imply curves, ups and downs... still clean, just more organic"). */
/* Lines PRE-DRAW with the graphic (dd = draw delay, right after the map fades in at
   2.15s); the heads then travel the finished roads on a 6s loop (delay), with the pin
   fading out while its head is en route (Jacob, July 27). */
/* Arrivals STAGGER 2s apart (6s cycle / 3 routes) so there is always a payoff landing:
   Marcus, then Sean, then Kim, forever. */
const ROUTES = [
  { c: '#06b6d4', d: 'M104,118 C142,225 62,308 172,334 C262,356 298,252 386,270 C462,286 478,392 522,416', dd: '2.35s', delay: '3.95s' },
  { c: '#4f46e5', d: 'M540,74 C588,142 478,192 508,262 C532,318 592,334 566,384 C556,404 552,410 550,414', dd: '2.5s', delay: '5.95s' },
  { c: '#7c3aed', d: 'M958,140 C932,238 1012,292 898,320 C798,346 722,298 662,348 C622,380 606,398 578,416', dd: '2.65s', delay: '7.95s' },
];

/* THE ARRIVAL PAYOFF (Jacob, July 27): when each head reaches Enjoy Life, their reward
   blooms from the destination — an icon of THEIR enjoyment, from their own story:
   Marcus = family time (ten days east), Sean = golf (he picks his clients now),
   Kim = dinner (her evenings back). Badge delay = route delay + 5.75s (the arrival). */
const JOY = [
  { key: 'family', c: '#06b6d4', left: '43%', delay: '9.7s', title: 'Family time',
    svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
  { key: 'golf', c: '#4f46e5', left: '50%', delay: '11.7s', title: 'A tee time',
    svg: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>' },
  { key: 'dinner', c: '#7c3aed', left: '57%', delay: '13.7s', title: 'Dinner at home',
    svg: '<path d="M8 22h8"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>' },
];

export default function JourneysPage() {
  return (
    <div id="top" className="v4">
      <Nav solidTop />
      <main id="main" tabIndex={-1}>
        <section className="jl">
          <style>{min(CSS)}</style>

          <div className="jl-fold">
          <div className="jl-hero">
            <div className="jl-pill">Journeys</div>
            {/* THE POINT OF THIS PAGE IS BELIEF (Jacob, July 27 2026: "what is the point of
                the journeys page, how do we exude that in the header"). Every other page
                argues; this one exists for the owner who has stopped believing their week
                can be different. So the headline says the thing that owner needs to hear,
                and the punchline is what the page literally is: proof. Two earlier heads
                died here: "Three roads / One destination" (described the page, not the
                reader) and "Their week looked like yours / Then it didn't" (recognition
                without emotion). Declarative on purpose — no questions in heads/closes
                (Richard's rule). */}
            {/* THE FAMILY THEME IS "LIFE" (Jacob, July 27 2026): every head on this site
                lands there — "enjoy your life" (home), "off your plate" (HIW), "improve
                lives" (About), "Do the work you love" (every close). Journeys is the page
                where the life actually happened, so its gradient line joins the family.
                Same two-stage incomplete-clause pattern as About's "We're on a mission to /
                improve lives." */}
            <h1>
              <span className="hl1">Three owners got</span>
              <span className="hl2 g">their lives back<span className="pd">.</span></span>
            </h1>
            <p className="jl-sub">Follow their journeys.</p>
          </div>

          {/* THE GUIDED MAP */}
          <div className="jl-mapwrap" aria-hidden="true">
            <div className="jl-map">
              <svg className="jl-svg" viewBox="0 0 1100 520" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <clipPath id="jlcp"><circle r="15" cx="0" cy="0" /></clipPath>
                </defs>
                {/* faint street grid */}
                <g className="grid">
                  {[70, 140, 210, 280, 350, 420].map((y) => (
                    <line key={'h' + y} x1="0" y1={y} x2="1100" y2={y} />
                  ))}
                  {[110, 260, 410, 550, 690, 840, 990].map((x) => (
                    <line key={'v' + x} x1={x} y1="0" x2={x} y2="520" />
                  ))}
                  <line x1="0" y1="480" x2="1100" y2="330" />
                  <line x1="180" y1="0" x2="440" y2="520" />
                </g>
                {/* routes: base draw + the OWNER travels their own road (mini ringed
                    headshot as the moving marker — Jacob: the profile pic is the one
                    moving the map) */}
                {ROUTES.map((r, i) => (
                  <g key={i}>
                    <path className="rt-under" d={r.d} />
                    <path className="rt" d={r.d} pathLength={1} style={{ stroke: r.c, animationDelay: r.dd }} />
                    <g className="jl-trav" style={{ offsetPath: `path('${r.d}')`, animationDelay: r.delay } as React.CSSProperties}>
                      {/* inner group so mobile can scale the traveler up without touching
                          the offset-path animation on the outer group */}
                      <g className="jl-tsz">
                        <circle r="17.5" fill="#fff" stroke={r.c} strokeWidth="2.5" />
                        <image href={PINS[i].img} x="-15" y="-15" width="30" height="30" clipPath="url(#jlcp)" preserveAspectRatio="xMidYMid slice" />
                      </g>
                    </g>
                  </g>
                ))}
              </svg>

              {/* start pins */}
              {PINS.map((p) => (
                <div key={p.name} className="pin" style={{ left: p.left, top: p.top }}>
                  <span className="pav" style={{ boxShadow: `0 0 0 3px #fff, 0 0 0 5.5px ${p.c}, 0 10px 24px rgba(6,12,20,.25)` }}>
                    <img src={p.img} alt="" style={{ objectPosition: p.pos }} />
                  </span>
                  <span className="plab"><b>{p.name}</b>{p.trade}</span>
                </div>
              ))}

              {/* arrival payoffs: each owner's enjoyment blooms from the destination */}
              {JOY.map((j) => (
                <span key={j.key} className="joy" title={j.title} style={{ left: j.left, animationDelay: j.delay, ['--jc' as string]: j.c }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: j.svg }} />
                </span>
              ))}

              {/* destination */}
              <div className="dest">
                <span className="dring" />
                <span className="dpin"><span className="dcore" /></span>
                <span className="dlab">Enjoy Life<span className="pd">.</span></span>
              </div>
            </div>
          </div>
          </div>

          {/* the tee-up: same section pattern as About's "Two founders. One mission." —
              eyebrow, head, short paragraph explaining what a journey IS before the cards */}
          {/* THE TEE-UP CARRIES THE DIAGNOSIS — the one thing no other element on this page
              says: WHY three different businesses are on the same map. Hero = outcome, map =
              metaphor, cards = people; this block = the shared problem. (Two earlier versions
              died here for restating the hero — Jacob, twice.) */}
          <div className="jl-teeup">
            <div className="jl-eyebrow2">The pattern</div>
            <h2>Different trades. Same leak.</h2>
            <p>
              Not one of them had a work problem. They had a front-office problem: calls, quotes,
              follow-ups and invoices all running through one busy owner. Pick the owner who looks
              like your week and take the journey with them, from plugging the leak to earning back
              their time, their money, and their freedom.
            </p>
          </div>

          <div className="jl-grid">
            {/* LinkedIn-profile anatomy (Jacob, July 27, with his own profile as the
                reference): photographic cover banner (the owner's photo, B&W with the
                journey hue washed over it), big headshot overlapping with a white ring
                (tight face crop of the same photo), name over role. */}
            {CARDS.map((c) => (
              <a key={c.href} className="jl-card" href={c.href} data-cta="journeys_card" style={{ ['--hc' as string]: c.c }}>
                <span className="jl-banner">
                  <img src={c.banner} alt="" style={{ objectPosition: c.bpos }} />
                  <span className="jl-bwash" style={{ background: `linear-gradient(135deg,${c.c}b3,#4f46e580 58%,#7c3aed99)` }} />
                </span>
                <span className="jl-cbody">
                  <span className="jl-pav"><img src={c.img} alt={c.person} /></span>
                  <span className="jl-name">{c.person}</span>
                  <span className="jl-role">{c.role}</span>
                  <div className="jl-tag">{c.tag}</div>
                  <div className="jl-line" dangerouslySetInnerHTML={{ __html: c.line }} />
                  <p className="jl-teaser">{c.teaser}</p>
                  <span className="jl-go">{c.cta} <span className="arw">&rarr;</span></span>
                </span>
              </a>
            ))}
          </div>
        </section>
        <JourneysFaq />
        <HeroCta />
      </main>
      <SiteFooter />
    </div>
  );
}

const CSS = `
.jl{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);padding-bottom:clamp(80px,12vh,130px);overflow:hidden;}
.jl .g{background:var(--sb-grad-ink,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));-webkit-background-clip:text;background-clip:text;color:transparent;}
.jl .pd{color:#7c3aed;-webkit-text-fill-color:#7c3aed;}

/* THE FOLD: hero + map fit one screen, like the homepage and /how-it-works */
.jl-fold{min-height:100vh;min-height:100svh;display:flex;flex-direction:column;justify-content:center;padding:clamp(86px,11vh,120px) 0 clamp(18px,3vh,32px);}

/* locked hero: pill -> two-stage 2-line headline -> one-line sub */
.jl-hero{max-width:1160px;margin:0 auto;padding:0 clamp(22px,5vw,44px);text-align:center;}
/* THE CANONICAL HERO REVEAL — identical across homepage / how-it-works / about /
   journeys (Jacob, July 27 2026). Homepage timings verbatim: hl1 .2s -> hl2 focus-pull
   1s (1.5s, glow 1.05s) -> sub 1.7s -> graphic from 2.15s. Change all four or none. */
.jl-pill{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#42474f;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed)) border-box;border-radius:999px;padding:9px 18px;margin-bottom:26px;opacity:0;animation:jlUp .8s cubic-bezier(.16,1,.3,1) .05s forwards;}
.jl-hero h1{font-size:clamp(20px,6.2vw,84px);font-weight:600;letter-spacing:-.045em;line-height:1.02;}
.jl-hero .hl1{display:block;white-space:nowrap;opacity:0;filter:blur(10px);transform:translateY(20px);animation:jlUp .9s cubic-bezier(.16,1,.3,1) .2s forwards;}
.jl-hero .hl2{display:block;white-space:nowrap;position:relative;opacity:0;filter:blur(32px);transform:translateY(16px) scale(1.35);transform-origin:center;animation:jlFocus 1.5s cubic-bezier(.19,1,.22,1) 1s forwards;}
.jl-hero .hl2::before{content:'';position:absolute;inset:-34% -10%;z-index:-1;background:radial-gradient(56% 62% at 50% 54%,rgba(16,185,129,.32),rgba(79,70,229,.2) 46%,transparent 72%);filter:blur(36px);opacity:0;transform:scale(.7);animation:jlGlow 2s ease 1.05s forwards;}
.jl-sub{margin-top:16px;font-size:clamp(13px,1.9vw,20px);color:#52565e;white-space:nowrap;opacity:0;filter:blur(6px);transform:translateY(12px);animation:jlUp .9s cubic-bezier(.16,1,.3,1) 1.7s forwards;}
@keyframes jlUp{to{opacity:1;filter:blur(0);transform:none;}}
@keyframes jlFocus{0%{opacity:0;filter:blur(32px);transform:translateY(16px) scale(1.35);}55%{opacity:1;}100%{opacity:1;filter:blur(0);transform:translateY(0) scale(1);}}
@keyframes jlGlow{0%{opacity:0;transform:scale(.7);}50%{opacity:.95;}100%{opacity:.62;transform:scale(1);}}

/* the guided map — transparent, blends into the page; sized to fit the fold */
.jl-mapwrap{margin:clamp(22px,3.5vh,40px) auto 0;padding:0 clamp(14px,3vw,32px);opacity:0;transform:translateY(26px);animation:jlUp 1s cubic-bezier(.16,1,.3,1) 2.15s forwards;width:100%;}
.jl-map{position:relative;margin:0 auto;width:min(1160px,94vw,calc(50svh * 2.115));aspect-ratio:1100/520;}
.jl-svg{position:absolute;inset:0;width:100%;height:100%;
  -webkit-mask-image:radial-gradient(72% 78% at 50% 50%,#000 58%,transparent 97%);
  mask-image:radial-gradient(72% 78% at 50% 50%,#000 58%,transparent 97%);}
.jl-svg .grid line{stroke:rgba(6,12,20,.05);stroke-width:1.5;}
.jl-svg .rt-under{fill:none;stroke:rgba(6,12,20,.07);stroke-width:9;stroke-linecap:round;stroke-linejoin:round;}
/* routes pre-draw once, fast, as the graphic arrives — then stay */
.jl-svg .rt{fill:none;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;animation:jlDraw 1.1s cubic-bezier(.45,0,.2,1) forwards;}
@keyframes jlDraw{to{stroke-dashoffset:0;}}
/* the traveler: the owner's mini headshot rides the route; it "establishes" large at
   the start (scale settle) then travels. */
/* SMOOTH HAND-OFF (Jacob: the pin-to-journey transition was jerky). The head holds
   STATIONARY at the pin for the first 8% of the cycle (~0.5s), crossfading in at pin
   size while the pin crossfades out, settles, and only then departs. */
.jl-svg .jl-trav{opacity:0;offset-rotate:0deg;animation:jlTravel 6s linear infinite;}
@keyframes jlTravel{0%{offset-distance:0%;opacity:0;transform:scale(1.7);}8%{offset-distance:0%;opacity:1;transform:scale(1.5);}16%{transform:scale(1);}96%{opacity:1;}100%{offset-distance:100%;opacity:0;transform:scale(.85);}}

/* THE HAND-OFF: the WHOLE pin (avatar + name chip) departs when its head hits the road,
   and comes home as the head arrives. Same 6s clock, same delays as line + traveler. */
.jl-map > div:nth-of-type(1){animation:jlPinCycle 6s linear 3.95s infinite;}
.jl-map > div:nth-of-type(2){animation:jlPinCycle 6s linear 5.95s infinite;}
.jl-map > div:nth-of-type(3){animation:jlPinCycle 6s linear 7.95s infinite;}
@keyframes jlPinCycle{0%{opacity:1;}3%{opacity:1;}14%{opacity:0;}88%{opacity:0;}100%{opacity:1;}}

/* the reward chip: blooms up from the destination on arrival, hangs, drifts off */
.joy{position:absolute;top:66%;transform:translate(-50%,0);z-index:3;width:42px;height:42px;border-radius:50%;background:#fff;border:2px solid var(--jc,#4f46e5);color:var(--jc,#4f46e5);display:flex;align-items:center;justify-content:center;box-shadow:0 10px 26px -8px rgba(6,12,20,.3);opacity:0;animation:jlJoy 6s ease-out infinite;}
.joy svg{width:20px;height:20px;}
@keyframes jlJoy{0%{opacity:0;transform:translate(-50%,10px) scale(.5);}5%{opacity:1;transform:translate(-50%,-8px) scale(1.08);}9%{transform:translate(-50%,-12px) scale(1);}26%{opacity:1;transform:translate(-50%,-18px) scale(1);}38%{opacity:0;transform:translate(-50%,-34px) scale(.85);}100%{opacity:0;transform:translate(-50%,-34px) scale(.85);}}

.pin{position:absolute;transform:translate(-50%,-40%);display:flex;flex-direction:column;align-items:center;gap:7px;z-index:2;}
.pav{width:clamp(34px,4.6vw,52px);height:clamp(34px,4.6vw,52px);border-radius:50%;display:block;overflow:hidden;background:#fff;}
.pav img{width:100%;height:100%;object-fit:cover;display:block;}
.plab{font-size:clamp(9px,1.1vw,12.5px);font-weight:500;color:#69707d;background:rgba(255,255,255,.92);border:1px solid rgba(6,12,20,.08);border-radius:999px;padding:3px 10px;white-space:nowrap;line-height:1.3;}
.plab b{font-weight:700;color:var(--v4-ink,#06080d);margin-right:5px;}

.dest{position:absolute;left:50%;top:76%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;z-index:2;}
.dring{position:absolute;top:0;width:clamp(30px,4vw,46px);height:clamp(30px,4vw,46px);border-radius:50%;border:2px solid rgba(16,185,129,.5);animation:jlPulse 2s ease-out 4.2s infinite;opacity:0;}
@keyframes jlPulse{0%{transform:scale(.7);opacity:.8;}100%{transform:scale(2.1);opacity:0;}}
.dpin{width:clamp(30px,4vw,46px);height:clamp(30px,4vw,46px);border-radius:50%;background:var(--sb-grad,linear-gradient(135deg,#06b6d4,#10b981,#4f46e5,#7c3aed));display:flex;align-items:center;justify-content:center;box-shadow:0 12px 28px -8px rgba(79,70,229,.55);opacity:0;animation:jlPop .6s cubic-bezier(.34,1.56,.64,1) 3.85s forwards;}
.dcore{width:38%;height:38%;border-radius:50%;background:#fff;}
.dlab{margin-top:8px;font-size:clamp(11px,1.4vw,15px);font-weight:700;letter-spacing:-.01em;color:var(--v4-ink,#06080d);background:rgba(255,255,255,.92);border:1px solid rgba(6,12,20,.08);border-radius:999px;padding:4px 12px;opacity:0;animation:jlUp .6s ease 4.05s forwards;}
@keyframes jlPop{from{opacity:0;transform:scale(0);}to{opacity:1;transform:scale(1);}}

/* tee-up (About "The team" section pattern) */
.jl-teeup{max-width:1160px;margin:0 auto;padding:clamp(56px,9vh,100px) clamp(18px,3.6vw,40px) 0;}
.jl-eyebrow2{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;}
.jl-teeup h2{margin-top:14px;font-size:clamp(30px,4.6vw,56px);font-weight:600;letter-spacing:-.038em;line-height:1.02;}
.jl-teeup p{margin-top:18px;font-size:clamp(15.5px,1.8vw,19px);line-height:1.65;color:#52565e;max-width:56ch;}

/* cards */
.jl-grid{max-width:1160px;margin:clamp(26px,4vh,42px) auto 0;padding:0 clamp(18px,3.6vw,40px);display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,22px);}
@media(max-width:960px){.jl-grid{grid-template-columns:1fr;max-width:560px;}}
.jl-card{display:block;background:#fff;border:1px solid rgba(6,12,20,.08);border-radius:22px;padding:0;overflow:hidden;text-decoration:none;color:var(--v4-ink,#06080d);box-shadow:0 1px 2px rgba(6,12,20,.04),0 26px 54px -34px rgba(6,12,20,.35);transition:transform .5s cubic-bezier(.16,1,.3,1),box-shadow .5s cubic-bezier(.16,1,.3,1);}
.jl-card:hover{transform:translateY(-5px);box-shadow:0 1px 2px rgba(6,12,20,.05),0 40px 74px -36px rgba(6,12,20,.45);}
.jl-banner{display:block;height:112px;position:relative;overflow:hidden;}
.jl-banner img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.08);transition:transform .8s cubic-bezier(.16,1,.3,1);}
.jl-card:hover .jl-banner img{transform:scale(1.05);}
.jl-bwash{position:absolute;inset:0;mix-blend-mode:multiply;}
.jl-banner::after{content:'';position:absolute;inset:0;background:radial-gradient(120% 95% at 76% 0%,rgba(255,255,255,.22),transparent 55%);}
.jl-cbody{display:block;padding:0 clamp(20px,2.4vw,28px) clamp(22px,2.6vw,30px);}
.jl-pav{display:block;width:104px;height:104px;border-radius:50%;margin-top:-52px;border:4px solid #fff;overflow:hidden;background:#fff;box-shadow:0 12px 28px rgba(6,12,20,.22);position:relative;z-index:1;}
.jl-pav img{display:block;width:100%;height:100%;object-fit:cover;}
.jl-name{display:block;margin-top:12px;font-size:20px;font-weight:700;letter-spacing:-.022em;}
.jl-role{display:block;margin-top:2px;font-size:13px;font-weight:500;color:#69707d;}
.jl-tag{margin-top:16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#69707d;}
/* ONE line, all three cards, always — the longest ("Marcus got his nights back.") sets
   the size cap (Jacob: person cards must follow the exact same format). */
.jl-line{margin-top:8px;font-size:clamp(17px,1.62vw,22.5px);font-weight:600;letter-spacing:-.03em;line-height:1.12;white-space:nowrap;}
.jl-teaser{margin-top:10px;font-size:14.5px;line-height:1.55;color:#52565e;}
/* clean transparent pill, unique label per journey; hue arrives on hover only */
.jl-go{margin-top:18px;display:inline-flex;align-items:center;gap:9px;font-size:14.5px;font-weight:600;color:var(--v4-ink,#06080d);border:1.5px solid rgba(6,12,20,.16);border-radius:999px;padding:11px 20px;transition:border-color .3s ease,gap .3s ease,color .3s ease;}
.jl-go .arw{transition:transform .35s cubic-bezier(.16,1,.3,1);}
.jl-card:hover .jl-go{border-color:var(--hc,#4f46e5);gap:13px;}
.jl-card:hover .jl-go .arw{color:var(--hc,#4f46e5);}

/* phone: the map's SVG scales down hard (367px wide vs 1100 viewBox), so the drawn
   elements bulk up to stay legible — thicker roads, bigger travelers */
@media(max-width:640px){
  .jl-svg .rt{stroke-width:9;}
  .jl-svg .rt-under{stroke-width:14;}
  .jl-svg .jl-tsz{transform:scale(1.8);}
}

@media(prefers-reduced-motion:reduce){
  .jl-pill,.jl-hero .hl1,.jl-hero .hl2,.jl-sub,.jl-mapwrap,.dpin,.dlab{animation:none;opacity:1;}
  .jl-svg .rt{animation:none;stroke-dashoffset:0;}
  .jl-svg .jl-trav,.dring,.joy{animation:none;opacity:0;}
}
`;

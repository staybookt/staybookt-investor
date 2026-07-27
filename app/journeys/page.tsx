import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import HeroCta from '@/components/v4/HeroCta';
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
    img: '/story-marcus.jpg',
    pos: '28% 30%',
    person: 'Marcus Bell',
    role: 'Owner · Seamless Electric',
    tag: 'Home service',
    line: 'Marcus got his <span class="g">nights back</span>.',
    teaser: 'You’re the best in your trade for miles. So why does the phone keep going to voicemail while you’re on the tools?',
    cta: 'Walk his year',
  },
  {
    href: '/journeys/consultant',
    img: '/story-sean.jpg',
    pos: 'center 25%',
    person: 'Sean Anderson',
    role: 'Founder · Anderson Consulting',
    tag: 'Consultant',
    line: 'Sean stopped <span class="g">chasing</span>.',
    teaser: 'You’re brilliant at the work. But your best leads go cold while you’re heads-down delivering for someone else.',
    cta: 'Walk his year',
  },
  {
    href: '/journeys/real-estate-agent',
    img: '/story-kim.jpg',
    pos: 'center 20%',
    person: 'Kim Dempster',
    role: 'Realtor · Dempster Group',
    tag: 'Real estate agent',
    line: 'Kim&rsquo;s first to <span class="g">every door</span>.',
    teaser: 'You’re one of the top agents in town. But the lead always tours with whoever calls back first.',
    cta: 'Walk her year',
  },
];

/* map pins: avatar + hue + start corner (percent coords inside the map card) */
const PINS = [
  { img: '/story-marcus.jpg', pos: '28% 30%', name: 'Marcus', trade: 'Home service', c: '#06b6d4', left: '7%', top: '12%' },
  { img: '/story-sean.jpg', pos: 'center 25%', name: 'Sean', trade: 'Consultant', c: '#4f46e5', left: '46.5%', top: '4%' },
  { img: '/story-kim.jpg', pos: 'center 20%', name: 'Kim', trade: 'Real estate', c: '#7c3aed', left: '84%', top: '14%' },
];

/* Manhattan-style routes (viewBox 1100x520), each from its pin to the destination pin.
   Rounded corners via quadratic joins, Google-Maps route language. */
const ROUTES = [
  { c: '#06b6d4', d: 'M104,110 L104,236 Q104,252 120,252 L400,252 Q416,252 416,268 L416,380 Q416,396 432,396 L520,396', delay: '.55s' },
  { c: '#4f46e5', d: 'M540,68 L540,180 Q540,196 556,196 L560,196 Q548,196 548,212 L548,396 L550,396', delay: '.8s' },
  { c: '#7c3aed', d: 'M958,132 L958,244 Q958,260 942,260 L680,260 Q664,260 664,276 L664,380 Q664,396 648,396 L580,396', delay: '1.05s' },
];

export default function JourneysPage() {
  return (
    <div id="top" className="v4">
      <Nav solidTop />
      <main id="main" tabIndex={-1}>
        <section className="jl">
          <style>{min(CSS)}</style>

          <div className="jl-hero">
            <div className="jl-pill">Journeys</div>
            <h1>
              <span className="hl1">Three owners. Three roads.</span>
              <span className="hl2 g">One destination<span className="pd">.</span></span>
            </h1>
            <p className="jl-sub">Pick the one who sounds like your week. Walk their year.</p>
          </div>

          {/* THE GUIDED MAP */}
          <div className="jl-mapwrap" aria-hidden="true">
            <div className="jl-map">
              <svg className="jl-svg" viewBox="0 0 1100 520" preserveAspectRatio="xMidYMid meet">
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
                {/* routes: base draw + traveling dot */}
                {ROUTES.map((r, i) => (
                  <g key={i}>
                    <path className="rt-under" d={r.d} />
                    <path className="rt" d={r.d} pathLength={1} style={{ stroke: r.c, animationDelay: r.delay }} />
                    <circle className="dot" r="6" style={{ fill: r.c, offsetPath: `path('${r.d}')`, animationDelay: `calc(${r.delay} + 1.1s)` } as React.CSSProperties} />
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

              {/* destination */}
              <div className="dest">
                <span className="dring" />
                <span className="dpin"><span className="dcore" /></span>
                <span className="dlab">Enjoy Life<span className="pd">.</span></span>
              </div>
            </div>
          </div>

          <div className="jl-grid">
            {CARDS.map((c) => (
              <a key={c.href} className="jl-card" href={c.href} data-cta="journeys_card">
                <span className="jl-avchip">
                  <span className="jl-av"><img src={c.img} alt={c.person} style={{ objectPosition: c.pos }} /></span>
                  <span className="jl-who">{c.person}<small>{c.role}</small></span>
                </span>
                <div className="jl-tag">{c.tag}</div>
                <div className="jl-line" dangerouslySetInnerHTML={{ __html: c.line }} />
                <p className="jl-teaser">{c.teaser}</p>
                <span className="jl-go">{c.cta} <span className="arw">&rarr;</span></span>
              </a>
            ))}
          </div>
        </section>
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

/* locked hero: pill -> two-stage 2-line headline -> one-line sub */
.jl-hero{max-width:1160px;margin:0 auto;padding:clamp(110px,15vh,170px) clamp(22px,5vw,44px) 0;text-align:center;}
.jl-pill{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#42474f;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed)) border-box;border-radius:999px;padding:9px 18px;margin-bottom:26px;opacity:0;animation:jlUp .8s cubic-bezier(.16,1,.3,1) .05s forwards;}
.jl-hero h1{font-size:clamp(20px,6.2vw,84px);font-weight:600;letter-spacing:-.045em;line-height:1.02;}
.jl-hero .hl1{display:block;white-space:nowrap;opacity:0;animation:jlUp .9s cubic-bezier(.16,1,.3,1) .15s forwards;}
.jl-hero .hl2{display:block;white-space:nowrap;opacity:0;animation:jlFocus 1s cubic-bezier(.16,1,.3,1) .5s forwards;}
.jl-sub{margin-top:16px;font-size:clamp(13px,1.9vw,20px);color:#52565e;white-space:nowrap;opacity:0;animation:jlUp .9s cubic-bezier(.16,1,.3,1) .85s forwards;}
@keyframes jlUp{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:none;}}
@keyframes jlFocus{from{opacity:0;transform:scale(1.35);filter:blur(10px);}to{opacity:1;transform:none;filter:blur(0);}}

/* the guided map */
.jl-mapwrap{max-width:1160px;margin:clamp(30px,5vh,52px) auto 0;padding:0 clamp(18px,3.6vw,40px);opacity:0;animation:jlUp 1s cubic-bezier(.16,1,.3,1) 1.05s forwards;}
.jl-map{position:relative;background:#fff;border:1px solid rgba(6,12,20,.08);border-radius:24px;box-shadow:0 1px 2px rgba(6,12,20,.04),0 40px 80px -46px rgba(6,12,20,.4);overflow:hidden;aspect-ratio:1100/520;}
.jl-svg{position:absolute;inset:0;width:100%;height:100%;}
.jl-svg .grid line{stroke:rgba(6,12,20,.05);stroke-width:1.5;}
.jl-svg .rt-under{fill:none;stroke:rgba(6,12,20,.07);stroke-width:9;stroke-linecap:round;stroke-linejoin:round;}
.jl-svg .rt{fill:none;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;animation:jlDraw 1.4s cubic-bezier(.45,0,.2,1) forwards;}
@keyframes jlDraw{to{stroke-dashoffset:0;}}
.jl-svg .dot{opacity:0;offset-rotate:0deg;animation:jlTravel 4.2s linear infinite;}
@keyframes jlTravel{0%{offset-distance:0%;opacity:0;}6%{opacity:1;}92%{opacity:1;}100%{offset-distance:100%;opacity:0;}}

.pin{position:absolute;transform:translate(-50%,-40%);display:flex;flex-direction:column;align-items:center;gap:7px;z-index:2;}
.pav{width:clamp(34px,4.6vw,52px);height:clamp(34px,4.6vw,52px);border-radius:50%;display:block;overflow:hidden;background:#fff;}
.pav img{width:100%;height:100%;object-fit:cover;display:block;}
.plab{font-size:clamp(9px,1.1vw,12.5px);font-weight:500;color:#69707d;background:rgba(255,255,255,.92);border:1px solid rgba(6,12,20,.08);border-radius:999px;padding:3px 10px;white-space:nowrap;line-height:1.3;}
.plab b{font-weight:700;color:var(--v4-ink,#06080d);margin-right:5px;}

.dest{position:absolute;left:50%;top:76%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;z-index:2;}
.dring{position:absolute;top:0;width:clamp(30px,4vw,46px);height:clamp(30px,4vw,46px);border-radius:50%;border:2px solid rgba(16,185,129,.5);animation:jlPulse 2s ease-out 2.3s infinite;opacity:0;}
@keyframes jlPulse{0%{transform:scale(.7);opacity:.8;}100%{transform:scale(2.1);opacity:0;}}
.dpin{width:clamp(30px,4vw,46px);height:clamp(30px,4vw,46px);border-radius:50%;background:var(--sb-grad,linear-gradient(135deg,#06b6d4,#10b981,#4f46e5,#7c3aed));display:flex;align-items:center;justify-content:center;box-shadow:0 12px 28px -8px rgba(79,70,229,.55);opacity:0;animation:jlPop .6s cubic-bezier(.34,1.56,.64,1) 2s forwards;}
.dcore{width:38%;height:38%;border-radius:50%;background:#fff;}
.dlab{margin-top:8px;font-size:clamp(11px,1.4vw,15px);font-weight:700;letter-spacing:-.01em;color:var(--v4-ink,#06080d);background:rgba(255,255,255,.92);border:1px solid rgba(6,12,20,.08);border-radius:999px;padding:4px 12px;opacity:0;animation:jlUp .6s ease 2.25s forwards;}
@keyframes jlPop{from{opacity:0;transform:scale(0);}to{opacity:1;transform:scale(1);}}

/* cards */
.jl-grid{max-width:1160px;margin:clamp(26px,4vh,42px) auto 0;padding:0 clamp(18px,3.6vw,40px);display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,22px);}
@media(max-width:960px){.jl-grid{grid-template-columns:1fr;max-width:560px;}}
.jl-card{display:block;background:#fff;border:1px solid rgba(6,12,20,.08);border-radius:22px;padding:clamp(22px,2.6vw,30px);text-decoration:none;color:var(--v4-ink,#06080d);box-shadow:0 1px 2px rgba(6,12,20,.04),0 26px 54px -34px rgba(6,12,20,.35);transition:transform .5s cubic-bezier(.16,1,.3,1),box-shadow .5s cubic-bezier(.16,1,.3,1);}
.jl-card:hover{transform:translateY(-5px);box-shadow:0 1px 2px rgba(6,12,20,.05),0 40px 74px -36px rgba(6,12,20,.45);}
.jl-avchip{display:inline-flex;align-items:center;gap:11px;}
.jl-av{width:46px;height:46px;border-radius:50%;padding:2.5px;background:var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed));display:inline-block;}
.jl-av img{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;background:#fff;}
.jl-who{text-align:left;font-size:13.5px;font-weight:600;line-height:1.25;}
.jl-who small{display:block;font-size:11.5px;font-weight:500;color:#69707d;}
.jl-tag{margin-top:18px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#69707d;}
.jl-line{margin-top:8px;font-size:clamp(21px,2.2vw,26px);font-weight:600;letter-spacing:-.03em;line-height:1.12;}
.jl-teaser{margin-top:10px;font-size:14.5px;line-height:1.55;color:#52565e;}
.jl-go{margin-top:16px;display:inline-flex;align-items:center;gap:10px;font-size:15px;font-weight:600;color:var(--v4-ink,#06080d);}
.jl-go .arw{width:29px;height:29px;border-radius:50%;background:var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed));color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;transition:transform .35s cubic-bezier(.16,1,.3,1);}
.jl-card:hover .jl-go .arw{transform:translateX(5px);}

@media(prefers-reduced-motion:reduce){
  .jl-pill,.jl-hero .hl1,.jl-hero .hl2,.jl-sub,.jl-mapwrap,.dpin,.dlab{animation:none;opacity:1;}
  .jl-svg .rt{animation:none;stroke-dashoffset:0;}
  .jl-svg .dot,.dring{animation:none;opacity:0;}
}
`;

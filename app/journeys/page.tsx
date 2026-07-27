import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import HeroCta from '@/components/v4/HeroCta';
import { min } from '@/lib/css';

/* THE JOURNEYS LANDING — a mini landing page, not a destination (Jacob, July 27 2026):
 * heading + an about-style paragraph + three profession cards. The depth lives on the
 * three dedicated journey pages; this page's whole job is to get the right owner into
 * the right journey. Profession-named routes on purpose: /journeys/home-service beats
 * /journeys/marcus for search, and "Home service" widens the first journey beyond
 * electricians to the trades ICP. */

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

export default function JourneysPage() {
  return (
    <div id="top" className="v4">
      <Nav solidTop />
      <main id="main" tabIndex={-1}>
        <section className="jl">
          <style>{min(CSS)}</style>
          <div className="jl-hero">
            <div className="jl-pill">Journeys</div>
            <h1>See it through <span className="g">someone like you</span><span className="pd">.</span></h1>
            <p className="jl-sub">The work was never the problem. The front of the business was.</p>
            <p className="jl-intro">
              Three owners, three corners of the same world: a home-service shop drowning in missed calls, a solo
              consultant whose best leads go cold mid-delivery, a top agent who’s always the second to call back.
              Same leak, different trade. Step into whichever year sounds like your week.
            </p>
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
.jl{background:var(--v4-cream,#f6f6f3);color:var(--v4-ink,#06080d);padding-bottom:clamp(80px,12vh,130px);}
.jl .g{background:var(--sb-grad-ink,linear-gradient(100deg,#06b6d4,#10b981 46%,#4f46e5 78%,#7c3aed));-webkit-background-clip:text;background-clip:text;color:transparent;}
.jl .pd{color:#7c3aed;-webkit-text-fill-color:#7c3aed;}
.jl-hero{max-width:1000px;margin:0 auto;padding:clamp(120px,17vh,200px) clamp(22px,5vw,44px) clamp(36px,6vh,60px);text-align:center;}
.jl-pill{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#42474f;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--sb-grad,linear-gradient(100deg,#06b6d4,#10b981,#4f46e5,#7c3aed)) border-box;border-radius:999px;padding:9px 18px;margin-bottom:26px;}
.jl-hero h1{font-size:clamp(36px,6.4vw,80px);font-weight:600;letter-spacing:-.045em;line-height:1.0;}
.jl-sub{margin-top:18px;font-size:clamp(16px,1.9vw,20px);color:#52565e;}
.jl-intro{margin:26px auto 0;font-size:clamp(15.5px,1.7vw,18.5px);line-height:1.65;color:#52565e;max-width:62ch;}
.jl-grid{max-width:1160px;margin:0 auto;padding:0 clamp(18px,3.6vw,40px);display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,22px);}
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
`;

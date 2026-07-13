import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import CalEmbed from '@/components/v4/CalEmbed';
import SiteFooter from '@/components/SiteFooter';

const SHARE_DESCRIPTION =
  "A free, no-pitch read on where the calls, quotes, and jobs are slipping through your business, and what it is costing you. Yours to keep.";

export const metadata = {
  title: "See where you’re losing work",
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/start' },
  openGraph: {
    title: "See where you’re losing work · StayBookt",
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com/start',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "See where you’re losing work · StayBookt",
    description: SHARE_DESCRIPTION,
  },
};

const SEE: { n: string; nm: string; p: string }[] = [
  {
    n: '01',
    nm: "What's coming in",
    p: 'Every call, text, and search your business is actually getting. Most owners have never seen this number.',
  },
  {
    n: '02',
    nm: "What's slipping",
    p: 'The calls that went to voicemail. The quotes that went cold. The leads nobody called back. So you can see the size of what is slipping through.',
  },
  {
    n: '03',
    nm: 'Where you stand',
    p: 'What your customers see when they go looking: your reviews, your ranking, how fast you answer. Who is winning the jobs you are not, and the demand in your area you are not capturing yet, in dollars.',
  },
  {
    n: '04',
    nm: 'What it looks like fixed',
    p: 'The same business with StayBookt running the front. Every call answered, every quote chased, every review asked for. And what that hands back to you: your nights, your weekends, your head.',
  },
];

export default function StartPage() {
  return (
    <main className="v4">
      <style>{`.v4 .start-see{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,4vw,56px) clamp(40px,6vw,96px);margin-top:clamp(52px,7vw,84px);}.v4 .start-see .start-see-item p{max-width:38ch;}@media(max-width:760px){.v4 .start-see{grid-template-columns:1fr;}}
.v4 .startfacts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:34px;max-width:820px;}
.v4 .startfacts .sf{border-left:2px solid rgba(255,255,255,.18);padding:4px 0 4px 16px;}
.v4 .startfacts .sf-k{font-size:15px;font-weight:600;color:#fff;letter-spacing:-.01em;}
.v4 .startfacts .sf-v{margin-top:5px;font-size:14px;line-height:1.45;color:#98a0ae;}
@media(max-width:760px){.v4 .startfacts{grid-template-columns:1fr;gap:12px;}}`}</style>
      <Nav />

      {/* HERO */}
      <section className="dark" style={{ paddingBottom: 'clamp(90px,12vw,150px)' }}>
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            <span style={{ color: '#8b93a5' }}>Free &middot; no pitch</span>
          </Reveal>
          <Reveal>
            <h1
              style={{
                marginTop: 18,
                fontSize: 'clamp(44px,7.4vw,104px)',
                color: '#fff',
                maxWidth: '15ch',
                letterSpacing: '-.045em',
                lineHeight: '.98',
                fontWeight: 700,
              }}
            >
              See where you&apos;re losing work.
            </h1>
          </Reveal>
          <Reveal>
            <p className="sub">
              A straight read on where the calls, quotes, and jobs are slipping through, and what
              it is costing you. Built from your real numbers and your market. Yours to keep,
              whether you hire us or not.
            </p>
          </Reveal>
          <Reveal>
            <div className="startfacts">
              <div className="sf">
                <div className="sf-k">30 minutes</div>
                <div className="sf-v">That is the whole ask.</div>
              </div>
              <div className="sf">
                <div className="sf-k">With a founder</div>
                <div className="sf-v">Not a sales rep. Bring your questions.</div>
              </div>
              <div className="sf">
                <div className="sf-k">No pitch, no pressure</div>
                <div className="sf-v">You keep the read either way.</div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 34 }}>
              <a href="#book" className="pill pill-white" style={{ padding: '14px 28px', fontSize: 15 }}>
                Pick a time
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="seam seam-dark-to-light" aria-hidden="true" />

      {/* WHAT YOU GET */}
      <section className="light">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            What you get
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: 16 }}>What you get, in thirty minutes.</h2>
          </Reveal>
          <div className="start-see">
            {SEE.map((s) => (
              <Reveal key={s.n} className="start-see-item">
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.16em', color: 'var(--v4-green-d)' }}>
                  {s.n}
                </div>
                <div style={{ marginTop: 12, fontSize: 'clamp(22px,2.4vw,30px)', fontWeight: 700, letterSpacing: '-.03em' }}>
                  {s.nm}
                </div>
                <p style={{ marginTop: 12, fontSize: 17, lineHeight: 1.55, color: 'var(--v4-muted)' }}>{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="seam seam-light-to-dark" aria-hidden="true" />

      {/* BOOK — close + calendar */}
      <section className="dark" id="book" style={{ paddingTop: 'clamp(96px,13vw,160px)' }}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow" style={{ color: '#8b93a5' }}>
              Pick a time
            </div>
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: 12, fontSize: 'clamp(32px,4.4vw,60px)', color: '#fff' }}>
              30 minutes with a founder.
            </h2>
          </Reveal>
          <Reveal>
            <p style={{ marginTop: 16, fontSize: 'clamp(17px,1.9vw,20px)', lineHeight: 1.5, color: '#aeb4c0', maxWidth: '46ch' }}>
              We do the work before the call. You show up and get the picture. No pitch, no pressure,
              and the read is yours to keep either way.
            </p>
          </Reveal>
          <Reveal>
            <div
              style={{
                marginTop: 40,
                background: '#fff',
                borderRadius: 20,
                padding: 'clamp(10px,1.5vw,18px)',
                boxShadow: '0 60px 120px -40px rgba(0,0,0,.6)',
              }}
            >
              <CalEmbed />
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

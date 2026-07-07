import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import CalEmbed from '@/components/v4/CalEmbed';
import SiteFooter from '@/components/SiteFooter';

const SHARE_DESCRIPTION =
  'Start with your Pulse: a free read on exactly where your business stands, and what it is leaving on the table. Yours to keep, no pitch.';

export const metadata = {
  title: 'Start with your Pulse',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/start' },
  openGraph: {
    title: 'Start with your Pulse · StayBookt',
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com/start',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start with your Pulse · StayBookt',
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
    p: 'The calls that went to voicemail. The quotes that went cold. The leads nobody called back. With a dollar figure on it.',
  },
  {
    n: '03',
    nm: 'Where you stand',
    p: 'How you show up against the other trucks in your area. Reviews, ranking, response time. Who is winning the jobs you are not.',
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
      <style>{`.v4 .start-see{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,4vw,56px) clamp(40px,6vw,96px);margin-top:clamp(52px,7vw,84px);}.v4 .start-see .start-see-item p{max-width:38ch;}@media(max-width:760px){.v4 .start-see{grid-template-columns:1fr;}}`}</style>
      <Nav />

      {/* HERO */}
      <section className="dark" style={{ paddingBottom: 'clamp(90px,12vw,150px)' }}>
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            <span style={{ color: '#8b93a5' }}>Start here</span>
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
              Start with your Pulse.
            </h1>
          </Reveal>
          <Reveal>
            <p className="sub">
              A free read on exactly where your business stands, and what it is leaving on the
              table. Built off your real numbers. Yours to keep, whether we work together or not.
            </p>
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

      {/* WHAT YOU'LL SEE */}
      <section className="light">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            What you will see
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: 16 }}>Four things, in thirty minutes.</h2>
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

      {/* BOOK — Enjoy Life close + calendar */}
      <section className="dark" id="book" style={{ paddingTop: 'clamp(96px,13vw,160px)' }}>
        <div className="wrap">
          <Reveal>
            <p
              style={{
                fontSize: 'clamp(24px,3vw,40px)',
                fontWeight: 600,
                letterSpacing: '-.02em',
                lineHeight: 1.25,
                color: '#fff',
                maxWidth: '20ch',
              }}
            >
              That is the whole idea in one call. We go do the work. You show up and get the picture.
              Clarity now, your life back after. No pitch, no lock-in.
            </p>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 'clamp(40px,6vw,72px)' }}>
              <div className="eyebrow" style={{ color: '#8b93a5' }}>
                Pick a time
              </div>
              <h2 style={{ marginTop: 12, fontSize: 'clamp(32px,4.4vw,60px)', color: '#fff' }}>
                30 minutes with a founder.
              </h2>
              <p style={{ marginTop: 14, fontSize: 17, color: '#aeb4c0' }}>Not a sales rep. Bring your questions.</p>
            </div>
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

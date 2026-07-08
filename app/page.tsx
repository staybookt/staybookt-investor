import type { ReactNode } from 'react';
import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import JourneyMap from '@/components/v4/JourneyMap';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

const SHARE_DESCRIPTION =
  'StayBookt finds the revenue you are missing, runs your business day to day, and builds lasting value in what you have made. You built your business to enjoy your life.';

const CLOSER_IMG =
  'https://images.pexels.com/photos/30660768/pexels-photo-30660768.jpeg?auto=compress&cs=tinysrgb&w=2000';

const GET_WHAT: { n: string; p: string }[] = [
  { n: 'A pipeline that fills itself.', p: 'Found on Google, calls answered 24/7, jobs booked while you sleep.' },
  { n: 'Nothing slips through.', p: 'Every quote chased, every review asked for, every past customer brought back.' },
  { n: 'The admin, gone.', p: 'Scheduling, quoting, closing, the back office — all run for you.' },
  { n: 'A business worth something.', p: 'Years of work, turned into an asset you can keep, pass on, or sell.' },
];

export const metadata = {
  title: 'StayBookt. Enjoy Life.',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'StayBookt. Enjoy Life.',
    description: SHARE_DESCRIPTION,
    url: 'https://www.staybookt.com',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'StayBookt. Enjoy Life.', description: SHARE_DESCRIPTION },
};

function ArrowUpRight(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ display: 'inline-block', verticalAlign: '-2px', marginLeft: 5 }} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

const PAGE_CSS = `
.v4{--v4-muted:#86868b;}
.v4 h1,.v4 h2,.v4 h3{font-weight:600;}
.v4 .scene>video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.v4 .scene .reveal{opacity:1;transform:none;}
/* HERO: Apple centered, top-anchored, video dominant */
.v4 header.scene{align-items:flex-start;}
.v4 header.scene .inner{padding:15vh 0 0;text-align:center;max-width:940px;margin:0 auto;}
.v4 header.scene h1{max-width:16ch;margin:20px auto 0;font-size:clamp(40px,6.6vw,88px);letter-spacing:-.03em;line-height:1.05;color:#f5f5f7;}
.v4 header.scene p.sub{margin:24px auto 0;color:#e9e9ec;max-width:46ch;}
.v4 header.scene .cta{justify-content:center;}
.v4 header.scene .eyebrow{color:#c9cdd6;}
/* BEAT 2: here's what you get */
.v4 .getwhat{background:var(--v4-cream);padding:clamp(72px,9vw,120px) 0;text-align:center;}
.v4 .getwhat h2{font-size:clamp(30px,4.4vw,52px);letter-spacing:-.025em;line-height:1.08;color:var(--v4-ink);max-width:20ch;margin:0 auto;}
.v4 .getwhat-grid{margin-top:clamp(44px,6vw,72px);display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(24px,3vw,44px);text-align:left;}
.v4 .getwhat-item .n{display:block;font-size:clamp(19px,1.9vw,23px);font-weight:600;letter-spacing:-.02em;color:var(--v4-ink);line-height:1.22;}
.v4 .getwhat-item .p{display:block;margin-top:10px;font-size:15px;line-height:1.5;color:var(--v4-muted);}
@media(max-width:820px){.v4 .getwhat-grid{grid-template-columns:1fr 1fr;}}
@media(max-width:520px){.v4 .getwhat-grid{grid-template-columns:1fr;}}
/* SECRET SAUCE (jmap): dark + gradient glow */
.v4 .jmap{background:var(--v4-ink);padding:clamp(80px,11vw,138px) 0 clamp(52px,7vw,84px);position:relative;overflow:hidden;}
.v4 .jmap::before{content:'';position:absolute;inset:0;background:radial-gradient(45% 60% at 15% -10%,rgba(14,165,233,.16),transparent 60%),radial-gradient(45% 60% at 85% 115%,rgba(16,185,129,.16),transparent 60%),radial-gradient(40% 55% at 50% 122%,rgba(6,182,212,.12),transparent 60%);pointer-events:none;}
.v4 .jmap .wrap{position:relative;z-index:1;}
.v4 .jmap .eyebrow{color:#86868b;}
.v4 .jmap h2{color:#f5f5f7;font-size:clamp(28px,4.2vw,54px);letter-spacing:-.03em;line-height:1.08;max-width:24ch;margin-top:14px;}
.v4 .jmap-track{margin-top:clamp(48px,6vw,80px);display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(20px,3vw,40px);position:relative;}
.v4 .jmap-track::before{content:'';position:absolute;top:9px;left:12%;right:12%;height:2px;background:linear-gradient(90deg,#0ea5e9,#06b6d4 34%,#14b8a6 66%,#10b981);opacity:.7;}
.v4 .jmap-stop{text-align:center;position:relative;}
.v4 .jmap-dot{display:block;width:18px;height:18px;border-radius:50%;margin:0 auto;position:relative;z-index:1;}
.v4 .jmap-phase{display:block;margin-top:16px;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#86868b;}
.v4 .jmap-payoff{display:block;margin-top:8px;font-size:clamp(17px,1.7vw,21px);font-weight:600;color:#f5f5f7;letter-spacing:-.02em;line-height:1.25;max-width:18ch;margin-left:auto;margin-right:auto;}
.v4 .jmap-stop.dest .jmap-payoff{color:#34d399;}
.v4 .jmap-tools{margin-top:14px;display:flex;flex-wrap:wrap;gap:7px;justify-content:center;}
.v4 .jmap-tool{font-size:12px;color:#c7ccd6;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:4px 11px;}
@media(max-width:820px){.v4 .jmap-track{grid-template-columns:1fr 1fr;gap:38px 24px;}.v4 .jmap-track::before{display:none;}}
@media(max-width:520px){.v4 .jmap-track{grid-template-columns:1fr;}}
/* proof line */
.v4 .proofline{background:var(--v4-ink);padding:0 0 clamp(64px,9vw,104px);text-align:center;}
.v4 .proofline p{font-size:15px;color:#86868b;}
.v4 .proofline a{color:#38bdf8;font-weight:600;text-decoration:none;}
/* LADDER */
.v4 .price h2{font-weight:600;letter-spacing:-.025em;}
.v4 .price .seefull a{color:#0891b2;}
/* WHY US / founders */
.v4 .whyus{background:var(--v4-ink);padding:clamp(84px,11vw,140px) 0;text-align:center;position:relative;overflow:hidden;}
.v4 .whyus::before{content:'';position:absolute;inset:0;background:radial-gradient(50% 60% at 20% 0%,rgba(6,182,212,.12),transparent 60%),radial-gradient(50% 60% at 85% 110%,rgba(16,185,129,.12),transparent 60%);pointer-events:none;}
.v4 .whyus .wrap{position:relative;z-index:1;}
.v4 .whyus .eyebrow{color:#86868b;}
.v4 .whyus blockquote{margin:20px auto 0;font-size:clamp(24px,3.1vw,38px);font-weight:600;letter-spacing:-.025em;line-height:1.24;color:#f5f5f7;max-width:760px;}
.v4 .whyus cite{display:block;margin-top:24px;font-style:normal;font-size:15px;font-weight:600;color:#86868b;}
.v4 .whyus .learn{color:#38bdf8;}
.v4 .learn{display:inline-block;margin-top:22px;color:#0891b2;font-weight:600;font-size:15px;text-decoration:none;}
`;

export default function HomePage() {
  return (
    <main id="top" className="v4">
      <style>{PAGE_CSS}</style>
      <Nav />

      {/* 1 — HERO: centered, top-anchored, video dominant */}
      <header className="scene">
        <video autoPlay muted loop playsInline poster="/hero-poster.jpg" src="/hero-loop.mp4" />
        <div className="grad-ov" />
        <div className="wrap inner">
          <Reveal className="eyebrow" as="div">For owner-operated service businesses</Reveal>
          <Reveal>
            <h1>You built your business to enjoy your life.</h1>
          </Reveal>
          <Reveal>
            <p className="sub">
              We find the money you are missing, run the day to day, and build real, lasting value in
              what you have made. So the work finally pays off the way you meant it to.
            </p>
          </Reveal>
          <Reveal>
            <div className="cta">
              <a href={START_LINK} className="pill pill-white" style={{ padding: '14px 28px', fontSize: 15 }}>Get Started</a>
            </div>
          </Reveal>
          <Reveal>
            <div className="note">30 minutes with a founder. No pitch. No lock-in.</div>
          </Reveal>
        </div>
        <div className="scrollcue">Scroll</div>
      </header>

      <div className="seam seam-dark-to-cream" aria-hidden="true" />

      {/* 2 — HERE'S WHAT YOU GET */}
      <section className="getwhat">
        <div className="wrap">
          <Reveal>
            <h2>Here&apos;s what you get.</h2>
          </Reveal>
          <div className="getwhat-grid">
            {GET_WHAT.map((g, i) => (
              <Reveal key={g.n} className="getwhat-item" delay={i === 0 ? undefined : ((i > 3 ? 3 : i) as 1 | 2 | 3)}>
                <span className="n">{g.n}</span>
                <span className="p">{g.p}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="seam seam-light-to-dark" aria-hidden="true" />

      {/* 3 — THE SECRET SAUCE (hybrid journey + tools -> life) */}
      <JourneyMap />

      {/* 3b — proof line */}
      <section className="proofline">
        <div className="wrap">
          <Reveal>
            <p>
              We run these ourselves.{' '}
              <a href="/work">Top Choice Electrical and XNL HR, live now<ArrowUpRight /></a>
            </p>
          </Reveal>
        </div>
      </section>

      <div className="seam seam-dark-to-cream" aria-hidden="true" />

      {/* 4 — THE LADDER = the journey */}
      <section className="price" id="price">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">Where you are on the journey</Reveal>
          <Reveal>
            <h2 style={{ marginTop: 14 }}>Get found. Get run. Get free.</h2>
          </Reveal>
          <div className="tiers">
            <Reveal className="tier">
              <div className="nm">Get Found</div>
              <div className="pr">$1,750</div>
              <div className="u">one-time</div>
              <div className="ds">Get found and stop the leaks.</div>
              <div className="term">Yours to keep.</div>
            </Reveal>
            <Reveal delay={1} className="tier dark">
              <div className="nm">StayBookt</div>
              <div className="pr">$199</div>
              <div className="u">per month</div>
              <div className="ds">We run the whole operation.</div>
              <div className="term">Cancel anytime.</div>
            </Reveal>
            <Reveal delay={2} className="tier">
              <div className="nm">Enjoy Life</div>
              <div className="pr">By invitation</div>
              <div className="u">&nbsp;</div>
              <div className="ds">A real asset, and the freedom to choose.</div>
              <div className="term">Invite only.</div>
            </Reveal>
          </div>
          <Reveal className="seefull">
            <a href="/pricing">See full pricing<ArrowUpRight /></a>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 30 }}>
              <a href={START_LINK} className="pill pill-ink" style={{ padding: '14px 28px', fontSize: 15 }}>Get Started</a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="seam seam-cream-to-dark" aria-hidden="true" />

      {/* 5 — WHY WE BUILT THIS */}
      <section className="whyus">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">Why we built this</Reveal>
          <Reveal>
            <blockquote>
              In talking to entrepreneurs, one theme kept coming up: they didn&apos;t have enough time
              to grow their business and enjoy the rewards they&apos;d hoped for. StayBookt is our
              answer to &ldquo;not enough time.&rdquo; We get to build something great while helping
              others realize their own dream, and get back time for the things they love.
            </blockquote>
          </Reveal>
          <Reveal>
            <cite>Richard, Co-founder</cite>
          </Reveal>
          <Reveal>
            <div>
              <a href="/founders" className="learn">Meet the founders<ArrowUpRight /></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 — CLOSER */}
      <section className="scene closer">
        <img src={CLOSER_IMG} alt="" loading="lazy" decoding="async" />
        <div className="grad-ov" />
        <div className="wrap inner">
          <Reveal>
            <div className="mk">
              Stay<span className="bk">Bookt</span>
              <span className="dot">.</span> <span className="life">Enjoy Life.</span>
            </div>
          </Reveal>
          <Reveal>
            <div className="cta" style={{ marginTop: 40 }}>
              <a href={START_LINK} className="pill pill-white" style={{ padding: '15px 30px', fontSize: 15 }}>Get Started</a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

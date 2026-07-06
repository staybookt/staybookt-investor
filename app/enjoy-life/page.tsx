import { TopNav } from '@/components/TopNav';
import Reveal from '@/components/Reveal';
import ParallaxBand from '@/components/ParallaxBand';
import SiteFooter from '@/components/SiteFooter';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'Enjoy Life',
  alternates: { canonical: '/enjoy-life' },
  description:
    'The point was never the business. It was the life it was supposed to buy. A business that runs without you is an asset you can sell, pass on, or finally step back from.',
};

// Lifestyle still (Pexels, licensed). One-line swap to change it.
const LIFE_IMG =
  'https://images.pexels.com/photos/34534420/pexels-photo-34534420.jpeg?auto=compress&cs=tinysrgb&w=1600';

type Door = { k: string; h: string; b: string };

const DOORS: Door[] = [
  {
    k: 'Sell it',
    h: 'Build an asset, not a job.',
    b: 'A business that runs without you is something a buyer actually wants and you can actually walk away from. The systems we build are what turn years of your work into a number on a term sheet.',
  },
  {
    k: 'Pass it on',
    h: 'Hand it to your family.',
    b: 'A business that does not live and die on your personal phone is one you can give to your kids or your crew, and trust that it keeps running the way you built it.',
  },
  {
    k: 'Get back to the work',
    h: 'Do the part you love.',
    b: 'Or keep it, and just get back to the craft, the tools, the customers, the reason you started, before the admin ate your evenings and your weekends.',
  },
];

export default function EnjoyLifePage() {
  return (
    <main className="hpv2">
      <TopNav active="enjoy-life" />

      {/* Full-bleed sunset */}
      <ParallaxBand src={LIFE_IMG}>The point was never the business.</ParallaxBand>

      {/* Intro */}
      <section className="section">
        <div className="wrap-narrow prose">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              Enjoy Life
            </div>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ fontSize: 'clamp(20px,2.4vw,28px)', color: 'var(--hp-text)', maxWidth: '30ch', lineHeight: 1.4 }}>
              It was the life it was supposed to buy. StayBookt runs the front office so the
              business runs without you, and you finally get to go live it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Three doors */}
      {DOORS.map((d, i) => (
        <section key={d.k} className={`feat${i % 2 === 1 ? ' cream reverse' : ''}`}>
          <div className="wrap grid">
            <Reveal>
              <div className="eyebrow">{d.k}</div>
              <h2 className="big">
                <span className="grad">{d.h}</span>
              </h2>
            </Reveal>
            <Reveal delay={1} className="visual">
              <div className="card-soft">
                <p style={{ fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.7, color: 'var(--hp-muted)', margin: 0 }}>
                  {d.b}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* The key */}
      <section className="stand">
        <div className="hair" />
        <div className="aura" />
        <div className="wrap">
          <Reveal>
            <h3>Three different doors. The same key: a business that runs without you.</h3>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ maxWidth: '44ch' }}>
              That is the whole reason StayBookt exists. Not another tool for you to run. We run it,
              we only get paid when it works, and what it buys back is your time, your options, and
              the life you built it for.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Closer */}
      <section className="closer">
        <div className="aura" />
        <div className="wrap">
          <Reveal>
            <h2>
              Stay<span className="b">Bookt</span>
              <span className="dot">.</span> <span className="life">Enjoy Life.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div style={{ marginTop: 40 }}>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-white"
                style={{ padding: '14px 28px', fontSize: 15 }}
              >
                Book a 30-minute call
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

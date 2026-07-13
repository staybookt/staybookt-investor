import { TopNav } from '@/components/TopNav';
import Reveal from '@/components/Reveal';
import ParallaxBand from '@/components/ParallaxBand';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

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

      {/* What it costs — the value share */}
      <section className="section center">
        <div className="wrap-narrow prose" style={{ textAlign: 'center' }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              What it costs
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2
              className="big"
              style={{
                margin: '0 auto',
                fontSize: 'clamp(26px,3.6vw,46px)',
                letterSpacing: '-.03em',
                lineHeight: 1.08,
                maxWidth: '20ch',
              }}
            >
              <span className="grad">Nothing extra. We get paid out of what we build.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p style={{ margin: '22px auto 0', textAlign: 'center' }}>
              Enjoy Life adds nothing to your monthly bill. On day one we agree what the business is
              worth today, independently and in writing. Then we go to work on the things that move
              that number: recurring service agreements, an operation that runs without you, books a
              buyer can trust, and the crew to grow into. When you sell, hand it on, or settle up, we
              take twenty percent of the increase above that starting number. You keep the rest, and
              you keep every dollar the business was already worth. If the number does not move, we
              do not get paid.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p style={{ margin: '22px auto 0', textAlign: 'center', fontSize: 15, color: 'var(--hp-muted)' }}>
              A broker takes eight to twelve percent of your whole sale price for showing up at the
              end. A franchise takes six percent of every dollar you earn, forever, and your name with
              it. We take a fifth of the upside we create, and nothing else. When it is time to sell,
              we run the sale ourselves. No broker fee.
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
                href={START_LINK}
                className="pill pill-white"
                style={{ padding: '14px 28px', fontSize: 15 }}
              >
                Get Started
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

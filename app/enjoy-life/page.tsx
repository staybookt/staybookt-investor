import { TopNav } from '@/components/TopNav';
import Reveal from '@/components/Reveal';
import ParallaxBand from '@/components/ParallaxBand';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

export const metadata = {
  title: 'Enjoy Life',
  alternates: { canonical: '/enjoy-life' },
  description:
    'Enjoy Life does not mean walking away. For most owners it means getting the good half of the job back: the craft, the tools, the customers. And then getting to choose what comes next.',
};

// Lifestyle still (Pexels, licensed). One-line swap to change it.
const LIFE_IMG =
  'https://images.pexels.com/photos/34534420/pexels-photo-34534420.jpeg?auto=compress&cs=tinysrgb&w=1600';

type Door = { k: string; h: string; b: string };

/* The first door is the one most owners will actually walk through: they keep the
 * business and get their life back inside it. Selling is an option, not the goal. */
const DOORS: Door[] = [
  {
    k: 'Keep it, and love it again',
    h: 'Do the part you love.',
    b: 'Most owners do not want out. They want the good half of the job back. The craft, the tools, the customers, the reason you started. You take the work you actually enjoy and hand us the rest: the phone that never stops, the quotes, the chasing, the paperwork that ate your evenings. Same business. The half of it you liked.',
  },
  {
    k: 'Pass it on',
    h: 'Hand it to your family.',
    b: 'A business that does not live and die on your personal phone is one you can hand to your kids or your crew, and trust that it keeps running the way you built it. That only works if the knowledge is in the system, not in your head.',
  },
  {
    k: 'Sell it',
    h: 'Build an asset, not a job.',
    b: 'And if you ever do want out, a business that runs without you is something a buyer actually wants and you can actually walk away from. The systems we build are what turn years of your work into a number on a term sheet. You never have to use this door. You just get to have it.',
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
              It was the life it was supposed to buy. Enjoy Life does not mean walking away. For
              most owners it means getting the good half of the job back, and getting to choose what
              comes next.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p style={{ marginTop: 22, maxWidth: '46ch', lineHeight: 1.7, color: 'var(--hp-muted)' }}>
              Somewhere along the way the business stopped being the thing you loved and started
              being the thing you answered to. We take the half you never wanted, so you can go back
              to the half you did. What you do after that is your call.
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

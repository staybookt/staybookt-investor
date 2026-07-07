import { TopNav } from '@/components/TopNav';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

export const metadata = {
  title: 'Thinking long-term | StayBookt',
  description:
    'Most owners do not think about the value of their business until it is too late. StayBookt is built to take care of that for you: transferable value and a higher multiple, so you can enjoy life when you are ready.',
  alternates: { canonical: '/long-term' },
};

const transferable = [
  'A robust website that generates leads without relying on the owner’s connections',
  'A CRM database that is not buried in the owner’s cell phone contacts',
  'A programmatic system that drives a high volume of repeat business',
];

const multiple = [
  'The lower the risk of transferring value, the better',
  'Highly automated systems that limit the owner’s involvement',
  'A strong brand and online reputation',
  'A demonstrated growth story showing more potential',
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', padding: 0 }}>
      {items.map((item) => (
        <li key={item} style={{ display: 'flex', gap: 14, lineHeight: 1.6, color: 'var(--hp-muted)' }}>
          <span
            aria-hidden
            style={{
              marginTop: 9,
              width: 7,
              height: 7,
              flexShrink: 0,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#06b6d4,#10b981 55%,#4f46e5)',
            }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LongTermPage() {
  return (
    <main className="hpv2">
      <TopNav active="long-term" />

      <section className="subhero">
        <div className="aura" />
        <div className="veil" />
        <div className="wrap subhero-in">
          <div className="eyebrow on-dark reveal">The long game</div>
          <h1 className="reveal d1">
            <span className="grad">Thinking long-term.</span>
          </h1>
          <p className="lead reveal d2">
            Most small and mid-size business owners do not think about maximizing the value of their
            business until it is too late. Our platform is built to take care of this for you. As
            entrepreneurs ourselves, we understand how businesses are valued, and we know positioning
            a business for a future sale is important to long-term wealth. Doing that well is also
            what lets you enjoy life when you are ready to do something else.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap-narrow">
          <Reveal>
            <h2 className="big">
              <span className="grad">Demonstrate</span> transferable value.
            </h2>
            <p className="prose" style={{ marginTop: 22 }}>
              When buyers evaluate a small-to-medium business, the first thing they assess is whether
              the value transfers to a new owner. A business that lives only in the owner{'’'}s
              head, built on personal connections, is not worth much.
            </p>
            <p style={{ marginTop: 26, fontSize: 14, fontWeight: 600, letterSpacing: '.02em' }}>
              What shows a business is transferable:
            </p>
            <BulletList items={transferable} />
          </Reveal>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap-narrow">
          <Reveal>
            <h2 className="big">
              <span className="grad">Maximize</span> the multiple.
            </h2>
            <p className="prose" style={{ marginTop: 22 }}>
              Once you have shown there is transferable value, you need to drive the buy multiple up
              to maximize what the business is worth. StayBookt solves this too.
            </p>
            <p style={{ marginTop: 26, fontSize: 14, fontWeight: 600, letterSpacing: '.02em' }}>
              What makes buyers pay more:
            </p>
            <BulletList items={multiple} />
          </Reveal>
        </div>
      </section>

      <section className="closer">
        <div className="aura" />
        <div className="wrap">
          <Reveal>
            <p className="lead" style={{ maxWidth: '46ch', margin: '0 auto', color: '#c3c9d4' }}>
              StayBookt is built by entrepreneurs who get it. We are here to help you enjoy life while
              you run the business, and when you are ready to move on from it. We are your full-cycle
              partner, today and for the future.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 style={{ marginTop: 40 }}>
              Stay<span className="b">Bookt</span>
              <span className="dot">.</span> <span className="life">Enjoy Life.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
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

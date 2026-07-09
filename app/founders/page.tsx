import type { ReactNode } from 'react';
import { TopNav } from '@/components/TopNav';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

export const metadata = {
  title: 'The two of us | StayBookt',
  description:
    'StayBookt is built and run by two founders who have been on both sides of a service business: the one bringing in the work, and the one making the operation run.',
  alternates: { canonical: '/founders' },
};

function FounderCard({
  photo,
  name,
  role,
  children,
}: {
  photo: string;
  name: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <div className="card-soft" style={{ padding: 'clamp(28px,4vw,40px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <img
          src={photo}
          alt={name}
          width={76}
          height={76}
          style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center 18%',
            flexShrink: 0,
            boxShadow: '0 1px 0 rgba(0,0,0,.06), 0 0 0 1px rgba(0,0,0,.05)',
          }}
        />
        <div>
          <h3 style={{ fontSize: 24, letterSpacing: '-.03em' }}>{name}</h3>
          <p style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: 'var(--hp-muted)' }}>
            {role}
          </p>
        </div>
      </div>
      <p className="prose" style={{ marginTop: 22 }}>
        {children}
      </p>
    </div>
  );
}

export default function FoundersPage() {
  return (
    <main className="hpv2">
      <TopNav active="founders" />

      <section className="subhero">
        <div className="aura" />
        <div className="veil" />
        <div className="wrap subhero-in">
          <div className="eyebrow on-dark reveal">Founders</div>
          <h1 className="reveal d1">
            <span className="grad">The two of us.</span>
          </h1>
          <p className="lead reveal d2">
            StayBookt is built and run by two founders who have been on both sides of a service
            business: the one bringing in the work, and the one making the operation actually run.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="feat grid" style={{ alignItems: 'stretch' }}>
            <Reveal>
              <FounderCard
                photo="/photos/jacob.jpg"
                name="Jacob Charendoff"
                role="Brand, product, and growth."
              >
                Jacob runs the outside game: the brand, the product, and how StayBookt shows up in
                the world. His focus is making a service business impossible to miss and effortless
                to hire, then turning that first impression into a system the owner can actually
                hand off.
              </FounderCard>
            </Reveal>
            <Reveal delay={1}>
              <FounderCard
                photo="/photos/richard.jpg"
                name="Richard"
                role="Operations, growth, and finance."
              >
                Two plus decades of executive-level leadership in high-growth service businesses at
                scale. Responsible for multiple start-up efforts and leading significant growth at
                Venterra from $15M to $500M+ in revenues. Deep understanding of the entire customer
                journey and all aspects of delivering world-class revenue performance. A CPA who has
                a passion for operations and leveraging technology to deliver tangible results.
              </FounderCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="stand">
        <div className="hair" />
        <div className="aura" />
        <div className="wrap">
          <Reveal>
            <h2>
              One of us builds the demand. One of us builds the operation.{' '}
              <span className="grad">Together, we build the thing that runs without you.</span>
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

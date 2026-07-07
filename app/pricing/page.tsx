import { TopNav } from '@/components/TopNav';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

export const metadata = {
  title: 'Pricing',
  alternates: { canonical: '/pricing' },
  description:
    'Get Found: your visibility, built, one-time. StayBookt: the front office, run for you, monthly. Enjoy Life: an invite-only partnership for owners building toward an exit or succession. We only make money when you do.',
};

type PriceTier = {
  nm: string;
  pr: string;
  u: string;
  ds: string;
  dark: boolean;
  points: string[];
};

const TIERS: PriceTier[] = [
  {
    nm: 'Get Found',
    pr: '$1,750',
    u: 'one-time',
    ds: 'A site that gets you found, and it is yours to keep.',
    dark: false,
    points: [
      'Custom, mobile-first website',
      'Google Business Profile rebuilt',
      'Search and reviews foundation',
      'Tap-to-call and booking wired in',
    ],
  },
  {
    nm: 'StayBookt',
    pr: '$199',
    u: 'per month',
    ds: 'The whole front office, run for you.',
    dark: true,
    points: [
      'Everything in Get Found',
      'We answer your phone and texts, 24/7',
      'We capture every lead and book the jobs',
      'We chase quotes, follow-ups, and past customers',
    ],
  },
  {
    nm: 'Enjoy Life',
    pr: 'By invitation',
    u: ' ',
    ds: 'A partnership that turns the business into something you can sell.',
    dark: false,
    points: [
      'Everything in StayBookt',
      'Systems built for a clean exit or a family handoff',
      'We turn a job into a sellable, inheritable asset',
      'We share the upside: 5% of the new business we generate',
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="hpv2">
      <TopNav active="pricing" />

      <section className="subhero">
        <div className="aura" />
        <div className="veil" />
        <div className="wrap subhero-in">
          <div className="eyebrow on-dark reveal">Pricing</div>
          <h1 className="reveal d1">
            We only make money <span className="grad">when you do.</span>
          </h1>
          <p className="lead reveal d2">
            A ladder, not a menu. Get found, then let us run it. And for a select few, a
            partnership that turns the business into an asset you can walk away from.
          </p>
        </div>
      </section>

      <section className="price" id="price">
        <div className="wrap">
          <div className="tiers">
            {TIERS.map((t, i) => (
              <Reveal
                key={t.nm}
                delay={i === 1 ? 1 : i === 2 ? 2 : undefined}
                className={`tier${t.dark ? ' dark' : ''}`}
              >
                <div className="nm">{t.nm}</div>
                <div className="pr">{t.pr}</div>
                <div className="u">{t.u}</div>
                <div className="ds">{t.ds}</div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '20px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {t.points.map((p) => (
                    <li
                      key={p}
                      style={{
                        display: 'flex',
                        gap: 10,
                        fontSize: 14,
                        lineHeight: 1.45,
                        color: t.dark ? '#c3c9d4' : 'var(--hp-muted)',
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          marginTop: 6,
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          flex: 'none',
                          background: 'var(--hp-emerald)',
                        }}
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section center">
        <div className="wrap-narrow prose" style={{ textAlign: 'center' }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              How we count new business
            </div>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ margin: '0 auto', textAlign: 'center' }}>
              Form fills tagged at the source. Calls tracked through your Google Business Profile.
              New customers reconciled against your existing book so we never double-count. You see
              exactly what we count, and the report goes out every month before the invoice.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="stand">
        <div className="hair" />
        <div className="aura" />
        <div className="wrap">
          <Reveal>
            <h3>Not sure it is for you?</h3>
          </Reveal>
          <Reveal delay={1}>
            <p>
              That is what the call is for. 30 minutes, no pitch deck, and we tell you straight
              whether it is a fit.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div style={{ marginTop: 36 }}>
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

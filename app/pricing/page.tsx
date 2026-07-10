import { TopNav } from '@/components/TopNav';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

export const metadata = {
  title: 'Pricing',
  alternates: { canonical: '/pricing' },
  description:
    'One monthly plan gets you found and runs your whole front office: your website, an AI receptionist with a real person behind it, booking, quotes, reviews, and a daily brief. Enjoy Life is an invite-only partnership earned after your first year.',
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
    nm: 'Get Found + StayBookt',
    pr: '$299',
    u: 'per month · 12-month term',
    ds: 'Everything. We get you found, then run the whole front office for you.',
    dark: true,
    points: [
      'A fast website, built and hosted, yours to keep',
      'Google Business Profile rebuilt, ranked locally, reviews building',
      'We answer every call and text, 24/7, in your voice',
      'We book the jobs and chase every quote until it closes',
      'We bring past customers back for repeat work',
      'One short brief each morning. No software to learn',
    ],
  },
  {
    nm: 'Enjoy Life',
    pr: 'By invitation',
    u: 'after your first year',
    ds: 'The partnership you earn once the systems, reputation, and revenue are built. It turns the business into something you can keep, pass on, or sell.',
    dark: false,
    points: [
      'Everything in the plan',
      'Systems built for a clean exit or a family handoff',
      'We turn the work into a sellable, inheritable asset',
      'Shared upside, only on the new business we generate',
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
            One plan. <span className="grad">Everything you need.</span>
          </h1>
          <p className="lead reveal d2">
            No setup fee, no menu. One simple monthly plan gets you found and runs your whole front
            office. Enjoy Life is the partnership you earn after your first year.
          </p>
        </div>
      </section>

      <section className="price" id="price">
        <div className="wrap">
          <div className="tiers" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
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

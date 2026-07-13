import { TopNav } from '@/components/TopNav';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

export const metadata = {
  title: 'Pricing',
  alternates: { canonical: '/pricing' },
  description:
    'One plan. $199 a month, nothing upfront. We get you found and run your whole front office: your website, an AI receptionist with a real person behind it, booking, quotes, reviews, and a daily brief. Ninety days to change your mind, or we refund every month you paid.',
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
    pr: '$199',
    u: 'per month · 12-month term · nothing upfront',
    ds: 'Everything. We get you found, then run the whole front office for you. No build fee, no setup fee, nothing to pay before we start.',
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
    u: 'after your first year · no extra monthly',
    ds: 'The partnership you earn once the systems, reputation, and revenue are built. We turn the business into an asset you can sell, hand on, or step back from. It costs you nothing extra. We take a share of the value we create, and only when you cash it in.',
    dark: false,
    points: [
      'Everything in the plan. No extra monthly fee, ever',
      'We build the recurring service work buyers pay a premium for',
      'We get the business running without you, which is what moves the number',
      'We clean the books and add the crew to grow into',
      'We run the sale or the family handoff. No broker fee',
      'We take 20% of the increase in value. No sale, no fee',
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
            $199 a month. Nothing upfront, no setup fee, no menu. One plan gets you found and runs
            your whole front office. Ninety days to change your mind. Enjoy Life is the partnership
            you earn after your first year.
          </p>
          <p className="lead reveal d2" style={{ marginTop: 18, fontSize: 16 }}>
            <a href="/whats-included" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>
              See everything that is included &rarr;
            </a>
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
              Our guarantee
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h3
              style={{
                margin: '0 auto',
                fontSize: 'clamp(26px,3.4vw,42px)',
                fontWeight: 600,
                letterSpacing: '-.03em',
                lineHeight: 1.08,
                maxWidth: '18ch',
              }}
            >
              Ninety days to change your mind.
            </h3>
          </Reveal>
          <Reveal delay={2}>
            <p style={{ margin: '20px auto 0', textAlign: 'center' }}>
              Give us ninety days. If we have not answered your calls, booked your jobs, and shown
              you the work in black and white, say the word and we refund every month you paid. No
              forms, no argument. The website is yours to keep either way. We ask for the year
              because that is how long it takes to build something worth keeping, not because we
              need you locked in.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section center">
        <div className="wrap-narrow prose" style={{ textAlign: 'center' }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              How the value share works
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h3
              style={{
                margin: '0 auto',
                fontSize: 'clamp(24px,3vw,38px)',
                fontWeight: 600,
                letterSpacing: '-.03em',
                lineHeight: 1.1,
                maxWidth: '20ch',
              }}
            >
              We only get paid if you actually get free.
            </h3>
          </Reveal>
          <Reveal delay={2}>
            <p style={{ margin: '20px auto 0', textAlign: 'center' }}>
              On day one we agree what the business is worth, independently and in writing. That is
              the baseline. Then we go to work on the things that actually move the number: recurring
              service agreements, an operation that runs without you, books a buyer can trust, and
              the crew to grow into. When you sell, hand it on, or settle up, we take twenty percent
              of the increase above that baseline. You keep the rest, and you keep every dollar the
              business was already worth. If the number does not move, we do not get paid.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p style={{ margin: '20px auto 0', textAlign: 'center', fontSize: 15, color: 'var(--hp-muted)' }}>
              For context: a broker takes eight to twelve percent of your entire sale price for
              showing up at the end. A franchise takes six percent of every dollar you earn, forever,
              and your name with it. We take a fifth of the upside we create, and nothing else.
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

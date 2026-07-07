import { TopNav } from '@/components/TopNav';
import Reveal from '@/components/Reveal';
import PhoneBooking from '@/components/PhoneBooking';
import ActivityCard from '@/components/ActivityCard';
import OperatingLoop from '@/components/OperatingLoop';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

export const metadata = {
  title: 'How it works',
  alternates: { canonical: '/how-it-works' },
  description:
    'Four steps: we build your site, set up how customers find you, run the bookings and follow-up, and report back every Monday. You deliver the work. We run the front of the business.',
};

export default function HowItWorksPage() {
  return (
    <main className="hpv2">
      <TopNav active="how-it-works" />

      <section className="subhero">
        <div className="aura" />
        <div className="veil" />
        <div className="wrap subhero-in">
          <div className="eyebrow on-dark reveal">How it works</div>
          <h1 className="reveal d1">
            You deliver the work. <span className="grad">We run everything in front of it.</span>
          </h1>
          <p className="lead reveal d2">
            You did not start your business to answer phones, chase reviews, and wrestle a calendar
            at 9pm. Here is how we take that off your plate.
          </p>
        </div>
      </section>

      {/* 01 - We build and launch your site */}
      <section className="feat" id="s1">
        <div className="wrap grid">
          <Reveal>
            <div className="eyebrow">Step 01</div>
            <h2 className="big">
              <span className="grad">We build</span> and launch your site.
            </h2>
            <p className="body">
              A fast, mobile-first site that makes you look like the best operator in town and turns
              visitors into booked jobs. Live in weeks, not months.
            </p>
          </Reveal>
          <Reveal delay={1} className="visual">
            <PhoneBooking />
          </Reveal>
        </div>
      </section>

      {/* 02 - We get you found (cream, reversed) */}
      <section className="feat cream reverse">
        <div className="wrap grid">
          <Reveal>
            <div className="eyebrow">Step 02</div>
            <h2 className="big">
              <span className="grad">We get</span> you found.
            </h2>
            <p className="body">
              Google Business Profile, local search, reviews, listings. When someone nearby needs
              what you do, you are who they find.
            </p>
          </Reveal>
          <Reveal delay={1} className="visual">
            <div className="card-soft">
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                Where they find you
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                {[
                  'Google Business Profile',
                  'Local map pack and search',
                  'Reviews and reputation',
                  'Directory and listing coverage',
                ].map((label) => (
                  <li
                    key={label}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'center',
                      fontSize: 15,
                      color: 'var(--hp-text)',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        flex: 'none',
                        background: 'var(--hp-emerald)',
                        boxShadow: '0 0 0 4px rgba(16,185,129,.12)',
                      }}
                    />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 - We run the front office */}
      <section className="feat">
        <div className="wrap grid">
          <Reveal>
            <div className="eyebrow">Step 03</div>
            <h2 className="big">
              <span className="grad">We run</span> the front office.
            </h2>
            <p className="body">
              Leads get answered in seconds. Jobs get booked. Reminders go out. Reviews get
              requested. All of it happens whether you are on a job or asleep.
            </p>
          </Reveal>
          <Reveal delay={1} className="visual">
            <ActivityCard />
          </Reveal>
        </div>
      </section>

      {/* 04 - We report back (cream, reversed) */}
      <section className="feat cream reverse">
        <div className="wrap grid">
          <Reveal>
            <div className="eyebrow">Step 04</div>
            <h2 className="big">
              <span className="grad">We report</span> back.
            </h2>
            <p className="body">
              One short brief every Monday: what got booked, what came back, and the one thing that
              needs you. You stay in control without living in an app.
            </p>
          </Reveal>
          <Reveal delay={1} className="visual">
            <div className="card-soft">
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                Monday brief
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                {[
                  { k: 'Booked this week', v: '11 jobs' },
                  { k: 'Won back', v: '3 past customers' },
                  { k: 'Reviews requested', v: '8' },
                  { k: 'Needs you', v: '1 quote to approve' },
                ].map((r) => (
                  <li
                    key={r.k}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 12,
                      fontSize: 15,
                    }}
                  >
                    <span style={{ color: 'var(--hp-muted)' }}>{r.k}</span>
                    <span style={{ fontWeight: 600 }}>{r.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Operating loop in a dark band */}
      <section className="stand">
        <div className="hair" />
        <div className="aura" />
        <div className="wrap">
          <Reveal>
            <h3>What each part actually does.</h3>
          </Reveal>
          <Reveal delay={1}>
            <p>
              Every customer who comes through gets found, captured, booked, followed up, and won
              again, and your database compounds the whole time.
            </p>
          </Reveal>
        </div>
        <OperatingLoop />
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

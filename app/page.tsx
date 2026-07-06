import { TopNav } from '@/components/TopNav';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import PhoneBooking from '@/components/PhoneBooking';
import ActivityCard from '@/components/ActivityCard';
import ParallaxBand from '@/components/ParallaxBand';
import SiteFooter from '@/components/SiteFooter';
import { CAL_LINK } from '@/lib/site';

const SHARE_DESCRIPTION =
  'StayBookt builds and runs the entire front office for service businesses, and only gets paid when it brings you work. So the business runs without you, and you get your life back.';

// Lifestyle still (Pexels, licensed). One-line swap to change it.
const LIFE_IMG =
  'https://images.pexels.com/photos/34534420/pexels-photo-34534420.jpeg?auto=compress&cs=tinysrgb&w=1600';

const CAPABILITIES = [
  { nm: 'Website', py: 'A site that gets you found on Google.' },
  { nm: 'AI Receptionist', py: 'Every call and text answered, 24/7.' },
  { nm: 'Self-serve booking', py: 'Customers book themselves straight in.' },
  { nm: 'CRM', py: 'Every customer and job in one place.' },
  { nm: 'Quote tool', py: 'Sent, tracked, chased. Never forgotten.' },
  { nm: 'Review engine', py: 'Five-star reviews on autopilot.' },
  { nm: 'Repeat business', py: 'Past customers brought back on their own.' },
  { nm: 'Operating dashboard', py: 'Your whole business at a glance.' },
  { nm: 'AI analyst', py: "Reads your numbers, tells you what's next." },
  { nm: 'Daily brief', py: 'One short update every morning.' },
];

const STEPS = [
  { dot: '1', w: 'Week 1', d: 'Your new site goes live and starts getting found.' },
  { dot: '2', w: 'Day 3', d: 'We answer every call and text for you.' },
  { dot: '3', w: 'Week 2', d: 'Your first job booked through the system.' },
  { dot: 'check', w: 'Every Monday', d: 'One short brief. You always know where things stand.' },
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
  twitter: {
    card: 'summary_large_image',
    title: 'StayBookt. Enjoy Life.',
    description: SHARE_DESCRIPTION,
  },
};

function Check() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5l3.5 3.5L16 5.5" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main id="top" className="hpv2">
      <TopNav />

      {/* 00 — HERO: dark aura, film grain, sweeping wordmark */}
      <Hero />

      {/* 01 — It picks up */}
      <section className="feat" id="f1">
        <div className="wrap grid">
          <Reveal>
            <div className="eyebrow">It picks up</div>
            <h2 className="big">
              <span className="grad">Answers every call.</span> Day or night.
            </h2>
            <p className="body">
              A real-sounding receptionist picks up every call and text, books the job, and sends
              the reminder. Even at 2 in the morning. No lead ever hits voicemail again.
            </p>
          </Reveal>
          <Reveal delay={1} className="visual">
            <PhoneBooking />
          </Reveal>
        </div>
      </section>

      {/* 02 — It follows up (cream, reversed) */}
      <section className="feat cream reverse">
        <div className="wrap grid">
          <Reveal>
            <div className="eyebrow">It follows up</div>
            <h2 className="big">
              <span className="grad">Nothing you quote</span> gets forgotten.
            </h2>
            <p className="body">
              Every quote gets sent, tracked, and chased until it's won or lost. Reviews get
              requested. Past customers get nudged back. The work keeps coming without you lifting a
              finger.
            </p>
          </Reveal>
          <Reveal delay={1} className="visual">
            <ActivityCard />
          </Reveal>
        </div>
      </section>

      {/* 04 — Standout beat with logic cases */}
      <section className="stand">
        <div className="hair" />
        <div className="aura" />
        <div className="wrap">
          <Reveal>
            <h2>
              We only make money <span className="grad">when you do.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p>
              We build it, we run it, and we only get paid when it brings you work. If the phone
              doesn't ring more, we haven't earned a cent.
            </p>
          </Reveal>
          <div className="logic">
            <Reveal className="li">
              <h4>Aligned with you</h4>
              <p>We only win when you win. No retainer for nothing.</p>
            </Reveal>
            <Reveal delay={1} className="li">
              <h4>One system, not ten apps</h4>
              <p>The site, the phone, the follow-up. Run for you, in one place.</p>
            </Reveal>
            <Reveal delay={2} className="li">
              <h4>Priced for your size</h4>
              <p>An executive front office without the executive payroll.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — Capability wall */}
      <section className="capwall">
        <div className="wrap">
          <Reveal className="head">
            <div className="eyebrow center">The whole front office</div>
            <h2 className="big grad" style={{ margin: '12px auto 0', maxWidth: '18ch' }}>
              Everything it does. So you don't have to.
            </h2>
            <p className="lead" style={{ maxWidth: '54ch', margin: '22px auto 0' }}>A receptionist, an office manager, a marketer, and a bookkeeper. That is what it takes to run the front of a business, and most owners are doing all of it themselves at 9pm. StayBookt runs the whole thing for you. Here is every part.</p>
          </Reveal>
          <div className="capgrid">
            {CAPABILITIES.map((c) => (
              <Reveal key={c.nm} className="cap">
                <span className="nm">{c.nm}</span>
                <span className="py">{c.py}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Proof: live client browser card */}
      <section className="proof">
        <div className="wrap">
          <Reveal>
            <div className="browser">
              <div className="bbar">
                <i />
                <i />
                <i />
                <span className="url">topchoiceelectrical.com</span>
              </div>
              <div className="site">
                <div className="glow" />
                <div className="k">Licensed electricians · Newmarket, ON</div>
                <div className="t">Top Choice Electrical</div>
                <div className="cta2">
                  <span className="ph">Book online in 60 seconds</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <p className="cap2">
              <b>We built and run Top Choice Electrical.</b> Real business, real site, real jobs
              booked in Newmarket, Ontario.
            </p>
            <a href="https://topchoiceelectrical.com" target="_blank" rel="noopener noreferrer" className="visit">
              Visit the live site ↗
            </a>
          </Reveal>
        </div>
      </section>

      {/* 06 — Timeline: your first two weeks */}
      <section className="timeline">
        <div className="wrap">
          <Reveal className="head">
            <div className="eyebrow center">What it feels like</div>
            <h2 className="big" style={{ margin: '12px auto 0', maxWidth: '16ch' }}>
              Your first two weeks.
            </h2>
          </Reveal>
          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.w} delay={i === 0 ? undefined : ((i as 1 | 2 | 3))} className="step">
                <div className="dot">{s.dot === 'check' ? <Check /> : s.dot}</div>
                <div className="w">{s.w}</div>
                <div className="d">{s.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Lifestyle band with subtle parallax */}
      <ParallaxBand src={LIFE_IMG}>You built it for this.</ParallaxBand>

      {/* 08 — Pricing */}
      <section className="price" id="price">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow center">Pricing</div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="big grad" style={{ margin: '14px auto 0', maxWidth: '18ch' }}>
              Three steps. Be seen, be run, be free.
            </h2>
          </Reveal>
          <div className="tiers">
            <Reveal className="tier">
              <div className="nm">Get Found</div>
              <div className="pr">$1,750</div>
              <div className="u">one-time</div>
              <div className="ds">The visibility foundation.</div>
              <ul className="pts">
                <li>Marketing-quality website</li>
                <li>Google Business Profile + local SEO</li>
              </ul>
              <div className="term">Yours to keep.</div>
            </Reveal>
            <Reveal delay={1} className="tier dark">
              <div className="nm">StayBookt</div>
              <div className="pr">$199</div>
              <div className="u">per month</div>
              <div className="ds">The whole front office, run for you.</div>
              <ul className="pts">
                <li>24/7 receptionist + booking</li>
                <li>Quotes, reviews, repeat business</li>
              </ul>
              <div className="term">Cancel anytime.</div>
            </Reveal>
            <Reveal delay={2} className="tier">
              <div className="nm">Enjoy Life</div>
              <div className="pr">By invitation</div>
              <div className="u">{' '}</div>
              <div className="ds">A partnership that makes the business sellable.</div>
              <ul className="pts">
                <li>Built for a clean exit or handoff</li>
                <li>We share the upside</li>
              </ul>
              <div className="term">Invite only.</div>
            </Reveal>
          </div>
          <Reveal className="seefull">
            <a href="/pricing">See full pricing →</a>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 30 }}>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-ink"
                style={{ padding: '13px 26px', fontSize: 15 }}
              >
                Book a 30-minute call
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 09 — Closer */}
      <section className="closer">
        <div className="aura" />
        <div className="wrap">
          <Reveal>
            <div className="cred">
              Built by operators, not marketers.{' '}
              <b>One of us scaled a service business from $15M to $500M+.</b>
            </div>
          </Reveal>
          <Reveal delay={1}>
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

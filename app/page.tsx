import type { ReactNode } from 'react';
import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import Receptionist from '@/components/v4/Receptionist';
import Dashboard from '@/components/v4/Dashboard';
import DailyBrief from '@/components/v4/DailyBrief';
import SiteFooter from '@/components/SiteFooter';
import { CAL_LINK } from '@/lib/site';

const SHARE_DESCRIPTION =
  'StayBookt builds and runs the entire front office for service businesses, and only gets paid when it brings you work. So the business runs without you, and you get your life back.';

const HERO_IMG =
  'https://images.pexels.com/photos/34534420/pexels-photo-34534420.jpeg?auto=compress&cs=tinysrgb&w=2000';
const CLOSER_IMG =
  'https://images.pexels.com/photos/30660768/pexels-photo-30660768.jpeg?auto=compress&cs=tinysrgb&w=2000';

const CAPABILITIES: { nm: string; p: string }[] = [
  { nm: 'Website', p: 'Found on Google' },
  { nm: 'AI receptionist', p: 'Answered 24/7' },
  { nm: 'Self-serve booking', p: 'Books itself' },
  { nm: 'CRM', p: 'One place' },
  { nm: 'Quotes', p: 'Sent and chased' },
  { nm: 'Reviews', p: 'On autopilot' },
  { nm: 'Repeat business', p: 'Brought back' },
  { nm: 'Dashboard', p: 'At a glance' },
  { nm: 'AI analyst', p: 'What is next' },
  { nm: 'Daily brief', p: 'Every morning' },
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

function ArrowUpRight(): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      style={{ display: 'inline-block', verticalAlign: '-2px', marginLeft: 5 }}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main id="top" className="v4">
      <Nav />

      {/* 01 — HERO: full-bleed photograph, aspiration, solid white type */}
      <header className="scene">
        <img src={HERO_IMG} alt="" />
        <div className="grad-ov" />
        <div className="wrap inner">
          <Reveal className="eyebrow" as="div">
            <span style={{ color: '#c9cdd6' }}>StayBookt &middot; the operating layer for the trades</span>
          </Reveal>
          <Reveal>
            <h1 style={{ marginTop: 22 }}>You built it for a life.</h1>
          </Reveal>
          <Reveal>
            <p className="sub">
              Not a phone that never stops ringing. StayBookt runs the whole front office, so the
              business runs without you, and you get to go live it.
            </p>
          </Reveal>
          <Reveal>
            <div className="cta">
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
          <Reveal>
            <div className="note">30 minutes with a founder. No pitch. No lock-in.</div>
          </Reveal>
        </div>
        <div className="scrollcue">Scroll</div>
      </header>

      {/* 02 — PRODUCT: AI Receptionist */}
      <section className="product">
        <div className="aura" />
        <div className="wrap grid">
          <Reveal>
            <div className="eyebrow">It picks up</div>
            <h2>It answers, and books, before you&rsquo;d have heard the ring.</h2>
            <p className="sub">
              Every call and text picked up in your business&rsquo;s voice, 24/7. The job is on the
              calendar before you even knew it came in.
            </p>
          </Reveal>
          <Reveal delay={1} className="visual">
            <Receptionist />
          </Reveal>
        </div>
      </section>

      {/* 03 — PRODUCT: Operating Dashboard */}
      <section className="product reverse">
        <div className="aura" />
        <div className="wrap grid">
          <Reveal>
            <div className="eyebrow">It runs</div>
            <h2>One system runs the whole business.</h2>
            <p className="sub">
              The site, the phone, the pipeline, the reviews. Every part of the front office in one
              place, run for you and reporting live.
            </p>
          </Reveal>
          <Reveal delay={1} className="visual">
            <Dashboard />
          </Reveal>
        </div>
      </section>

      {/* 04 — PRODUCT: Daily Brief */}
      <section className="product">
        <div className="aura" />
        <div className="wrap grid">
          <Reveal>
            <div className="eyebrow">You wake up to it</div>
            <h2>The business already ran. This is all you read.</h2>
            <p className="sub">
              While you slept it answered the calls, booked the jobs, and chased the quotes. One
              short brief every morning, and you always know where things stand.
            </p>
          </Reveal>
          <Reveal delay={1} className="visual">
            <DailyBrief />
          </Reveal>
        </div>
      </section>

      {/* 05 — CAPABILITY LIST: light, restrained, typographic */}
      <section className="light">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            The whole front office
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: 16 }}>Everything else it quietly does.</h2>
          </Reveal>
          <div className="caps">
            {CAPABILITIES.map((c) => (
              <Reveal key={c.nm} className="cap">
                <span className="n">{c.nm}</span>
                <span className="p">{c.p}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — PROOF: dark, photography of promise, real client */}
      <section className="dark">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            <span style={{ color: '#8b93a5' }}>Real business, real results</span>
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: 16 }}>We only make money when you do.</h2>
          </Reveal>
          <Reveal>
            <p className="sub">
              We build it, we run it, and we only get paid when it brings you work. We proved it on
              ourselves: we built and run Top Choice Electrical, a live business in Newmarket,
              Ontario.
            </p>
          </Reveal>
          <Reveal className="proof-q">
            <blockquote>
              My phone used to ring off the hook and half of it went to voicemail. Now every call
              gets answered and booked. I took a weekend off.
            </blockquote>
            <cite>Tim Ciszkowski, Top Choice Electrical</cite>
            <div className="ph">Placeholder quote, pending approval.</div>
          </Reveal>
          <Reveal>
            <div className="proof">
              <a
                href="https://topchoiceelectrical.com"
                target="_blank"
                rel="noopener noreferrer"
                className="visit"
              >
                Visit topchoiceelectrical.com
                <ArrowUpRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 07 — PRICING: cream, minimal, three tiers */}
      <section className="price" id="price">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            Pricing
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: 14 }}>Get seen. Get run. Get free.</h2>
          </Reveal>
          <div className="tiers">
            <Reveal className="tier">
              <div className="nm">Get Found</div>
              <div className="pr">$1,750</div>
              <div className="u">one-time</div>
              <div className="ds">The website that gets you found.</div>
              <div className="term">Yours to keep.</div>
            </Reveal>
            <Reveal delay={1} className="tier dark">
              <div className="nm">StayBookt</div>
              <div className="pr">$199</div>
              <div className="u">per month</div>
              <div className="ds">The whole front office, run for you.</div>
              <div className="term">Cancel anytime.</div>
            </Reveal>
            <Reveal delay={2} className="tier">
              <div className="nm">Enjoy Life</div>
              <div className="pr">By invitation</div>
              <div className="u">&nbsp;</div>
              <div className="ds">A partnership that makes it sellable.</div>
              <div className="term">Invite only.</div>
            </Reveal>
          </div>
          <Reveal className="seefull">
            <a href="/pricing">
              See full pricing
              <ArrowUpRight />
            </a>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 30 }}>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-ink"
                style={{ padding: '14px 28px', fontSize: 15 }}
              >
                Book a 30-minute call
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 08 — CLOSER: full-bleed photograph, brand wordmark, the one gradient */}
      <section className="scene closer">
        <img src={CLOSER_IMG} alt="" />
        <div className="grad-ov" />
        <div className="wrap inner">
          <Reveal>
            <div className="mk">
              Stay<span className="bk">Bookt</span>
              <span className="dot">.</span> <span className="life">Enjoy Life.</span>
            </div>
          </Reveal>
          <Reveal>
            <div className="cta" style={{ marginTop: 40 }}>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-white"
                style={{ padding: '15px 30px', fontSize: 15 }}
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

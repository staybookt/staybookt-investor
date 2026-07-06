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

      {/* 03 — Standout beat */}
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
        </div>
      </section>

      {/* 04 — Lifestyle band with subtle parallax */}
      <ParallaxBand src={LIFE_IMG}>You built it for this.</ParallaxBand>

      {/* 05 — Pricing teaser */}
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
              <div className="ds">A site that gets you found, and it's yours to keep.</div>
            </Reveal>
            <Reveal delay={1} className="tier dark">
              <div className="nm">StayBookt</div>
              <div className="pr">$199</div>
              <div className="u">per month</div>
              <div className="ds">The whole front office, run for you.</div>
            </Reveal>
            <Reveal delay={2} className="tier">
              <div className="nm">Enjoy Life</div>
              <div className="pr">By invitation</div>
              <div className="u">{' '}</div>
              <div className="ds">
                A partnership that turns the business into something you can sell.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06 — Closer */}
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

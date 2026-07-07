import type { ReactNode } from 'react';
import Nav from '@/components/v4/Nav';
import Reveal from '@/components/v4/Reveal';
import Receptionist from '@/components/v4/Receptionist';
import Dashboard from '@/components/v4/Dashboard';
import DailyBrief from '@/components/v4/DailyBrief';
import ProductScrub from '@/components/v4/ProductScrub';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

const SHARE_DESCRIPTION =
  'StayBookt builds and runs the entire front office for service businesses, and only gets paid when it brings you work. So the business runs without you, and you get your life back.';

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
      <style>{`.v4 .proof-two{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,56px);}@media(max-width:760px){.v4 .proof-two{grid-template-columns:1fr;}} .v4 .product{background:var(--v4-cream);color:var(--v4-ink);padding:clamp(72px,9vw,120px) 0;} .v4 .product.signature{background:var(--v4-cream);} .v4 .product h2{color:var(--v4-ink);max-width:20ch;margin-left:auto;margin-right:auto;} .v4 .product p.sub{color:var(--v4-muted);margin-left:auto;margin-right:auto;} .v4 .product .eyebrow{color:var(--v4-green-d);} .v4 .product .aura{opacity:.35;} .v4 .product .grid{grid-template-columns:1fr;justify-items:center;text-align:center;gap:clamp(36px,5vw,64px);} .v4 .product.reverse .visual{order:0;} .v4 .product .grid>.reveal:not(.visual){max-width:660px;} .v4 .light,.v4 .dark{padding:clamp(90px,12vw,150px) 0;} .v4 .price{padding:clamp(90px,12vw,150px) 0;} .v4 .scene>video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;} .v4 .scene .reveal{opacity:1;transform:none;}`}</style>
      <Nav />

      {/* 01 — HERO: full-bleed silent looping video, aspiration, solid white type */}
      <header className="scene">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          src="/hero-loop.mp4"
        />
        <div className="grad-ov" />
        <div className="wrap inner">
          <Reveal className="eyebrow" as="div">
            <span style={{ color: '#c9cdd6' }}>StayBookt &middot; we run the office so you can run the jobs</span>
          </Reveal>
          <Reveal>
            <h1 style={{ marginTop: 22 }}>You built your business to enjoy your life.</h1>
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
                href={START_LINK}
                className="pill pill-white"
                style={{ padding: '14px 28px', fontSize: 15 }}
              >
                Get Started
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div className="note">30 minutes with a founder. No pitch. No lock-in.</div>
          </Reveal>
        </div>
        <div className="scrollcue">Scroll</div>
      </header>

      <div className="seam seam-dark-to-cream" aria-hidden="true" />

      {/* 02 — SIGNATURE PRODUCT: AI Receptionist, the 2 AM beat */}
      <ProductScrub
        eyebrow="The receptionist that never sleeps"
        headline={<>Answered at 2 AM.</>}
        sub={
          <>
            Every call and text, picked up in your voice and booked, before you would have even
            stirred.
          </>
        }
        signature
      >
        <Receptionist />
      </ProductScrub>

      {/* 03 — PRODUCT: Operating Dashboard */}
      <ProductScrub
        eyebrow="The operation"
        headline={
          <>
            The whole business. One screen.
          </>
        }
        sub={<>Every job, every lead, every dollar. Run for you, in one place.</>}
        reverse
      >
        <Dashboard />
      </ProductScrub>

      {/* 04 — PRODUCT: Daily Brief */}
      <ProductScrub
        eyebrow="Every morning"
        headline={<>It ran while you slept.</>}
        sub={
          <>
            You wake up, read one short brief, and get on with your day. Or your life.
          </>
        }
      >
        <DailyBrief />
      </ProductScrub>

      <div className="seam seam-dark-to-light" aria-hidden="true" />

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

      <div className="seam seam-light-to-dark" aria-hidden="true" />

      {/* 06 — PROOF: dark, two real businesses we built and run */}
      <section className="dark">
        <div className="wrap">
          <Reveal className="eyebrow" as="div">
            <span style={{ color: '#8b93a5' }}>Real businesses, live now</span>
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: 16 }}>We don&apos;t just build it. We run it.</h2>
          </Reveal>
          <Reveal>
            <p className="sub">
              We stake our own name on the work. These are real businesses we built, live on their
              own domains right now, not stock mockups.
            </p>
          </Reveal>
          <div className="proof-two" style={{ marginTop: 'clamp(48px,6vw,72px)' }}>
            <Reveal>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8b93a5' }}>
                Electrical &middot; Newmarket, ON
              </div>
              <div style={{ marginTop: 10, fontSize: 'clamp(22px,2.4vw,29px)', fontWeight: 700, letterSpacing: '-.03em', color: '#fff' }}>
                Top Choice Electrical
              </div>
              <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.55, color: '#aeb4c0', maxWidth: '40ch' }}>
                Tim was running on word of mouth and a phone that rang straight to him. We built the
                site, rebuilt his Google profile, wired tap-to-call and booking, and we run the front
                office for him day to day.
              </p>
              <a
                href="https://topchoiceelectrical.com"
                target="_blank"
                rel="noopener noreferrer"
                className="visit"
                style={{ display: 'inline-block', marginTop: 16 }}
              >
                Visit topchoiceelectrical.com
                <ArrowUpRight />
              </a>
            </Reveal>
            <Reveal delay={1}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8b93a5' }}>
                Professional services &middot; York Region
              </div>
              <div style={{ marginTop: 10, fontSize: 'clamp(22px,2.4vw,29px)', fontWeight: 700, letterSpacing: '-.03em', color: '#fff' }}>
                XNL HR &amp; Communications
              </div>
              <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.55, color: '#aeb4c0', maxWidth: '40ch' }}>
                Evert runs a fractional HR practice where his judgment is the product. We built a site
                that finally tells the XNL story the way he had been trying to for years.
              </p>
              <a
                href="https://www.xnlhr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="visit"
                style={{ display: 'inline-block', marginTop: 16 }}
              >
                Visit xnlhr.com
                <ArrowUpRight />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="seam seam-dark-to-cream" aria-hidden="true" />

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
                href={START_LINK}
                className="pill pill-ink"
                style={{ padding: '14px 28px', fontSize: 15 }}
              >
                Get Started
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="seam seam-cream-to-dark" aria-hidden="true" />

      {/* 08 — CLOSER: full-bleed photograph, brand wordmark, the one gradient */}
      <section className="scene closer">
        <img src={CLOSER_IMG} alt="" loading="lazy" decoding="async" />
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
                href={START_LINK}
                className="pill pill-white"
                style={{ padding: '15px 30px', fontSize: 15 }}
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

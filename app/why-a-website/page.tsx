import { TopNav } from '@/components/TopNav';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import { START_LINK } from '@/lib/site';

export const metadata = {
  title: 'Why the website comes first | StayBookt',
  description:
    'For a service business, the website is not a brochure. It is the first impression and the lead engine. Everything else runs on top of it.',
  alternates: { canonical: '/why-a-website' },
};

const points = [
  {
    title: 'You show up when someone searches.',
    body: 'Built to get found: local SEO, Google Business Profile, listings, and the AI-search era (AEO/GEO), so you are the name that comes up.',
  },
  {
    title: 'It works on a phone, in seconds.',
    body: 'Fast, mobile-first, with tap-to-call and self-serve booking. Most of your customers decide on their phone.',
  },
  {
    title: 'It turns a visitor into a booked job.',
    body: 'Not a business card online. Every page is built to move someone from looking to booked.',
  },
  {
    title: 'It is an asset you own.',
    body: 'The site is built to a marketing-firm standard and it is yours to keep.',
  },
];

export default function WhyAWebsitePage() {
  return (
    <main className="hpv2">
      <TopNav active="why-a-website" />

      <section className="subhero">
        <div className="aura" />
        <div className="veil" />
        <div className="wrap subhero-in">
          <div className="eyebrow on-dark reveal">Why a website</div>
          <h1 className="reveal d1">
            <span className="grad">Why the website</span> comes first.
          </h1>
          <p className="lead reveal d2">
            For a service business, the website is not a brochure. It is the first impression and the
            lead engine. Everything else runs on top of it.
          </p>
        </div>
      </section>

      {points.map((p, i) => (
        <section key={p.title} className={i % 2 === 1 ? 'section cream' : 'section'}>
          <div className="wrap-narrow center">
            <Reveal>
              <div className="eyebrow center">{String(i + 1).padStart(2, '0')}</div>
              <h2 className="big" style={{ margin: '12px auto 0', maxWidth: '18ch' }}>
                {p.title}
              </h2>
              <p className="body" style={{ margin: '20px auto 0', maxWidth: '46ch' }}>
                {p.body}
              </p>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="stand">
        <div className="hair" />
        <div className="aura" />
        <div className="wrap">
          <Reveal>
            <h2>
              Get found first. <span className="grad">Then StayBookt runs the rest.</span>
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

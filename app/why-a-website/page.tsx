import { TopNav } from '@/components/TopNav';
import SiteFooter from '@/components/SiteFooter';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'Why the website comes first | StayBookt',
  description:
    'For a service business, the website is not a brochure. It is the first impression and the lead engine. Everything else runs on top of it.',
  alternates: { canonical: '/why-a-website' },
};

// PLACEHOLDER image (Pexels, licensed). A tradesperson on the phone / a booking
// in hand. Swap for owned or curated imagery; image ID to be curated.
const BAND_IMG =
  'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1600';

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
    <main className="bg-paper text-ink">
      <TopNav active="why-a-website" />

      <section className="mx-auto max-w-4xl px-6 pt-36 pb-16 sm:px-12 sm:pt-44">
        <p className="eyebrow">Why a website</p>
        <h1 className="display-1 mt-4 text-ink">Why the website comes first.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-body">
          For a service business, the website is not a brochure. It is the first
          impression and the lead engine. Everything else runs on top of it.
        </p>
      </section>

      {/* Full-width image band */}
      <section className="relative overflow-hidden">
        <img
          src={BAND_IMG}
          alt="A tradesperson taking a booking on the phone"
          className="h-[46vh] min-h-[320px] w-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,8,17,0.35) 0%, rgba(5,8,17,0.20) 50%, rgba(5,8,17,0.60) 100%)',
          }}
        />
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 sm:px-12 sm:py-32">
        <div className="grid gap-6 sm:grid-cols-2">
          {points.map((p, i) => (
            <div key={p.title} className="card-cream p-8">
              <span className="text-sm font-semibold text-mute">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="display-3 mt-3 text-ink">{p.title}</h2>
              <p className="mt-3 leading-relaxed text-body">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-12">
        <div className="panel-ink p-10 sm:p-14">
          <p className="display-3 leading-snug text-white">
            Get found first. Then StayBookt runs the rest.
          </p>
          <div className="mt-8">
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-ondark">
              Book a 30-minute call
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

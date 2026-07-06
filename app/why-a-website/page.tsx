import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK, EMAIL } from '@/lib/site';

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
    <main className="bg-paper text-ink">
      <TopNav />

      <section className="mx-auto max-w-4xl px-6 pt-40 pb-16 sm:px-12">
        <h1 className="font-display tracking-[-0.03em] text-4xl sm:text-6xl text-ink">
          Why the website comes first.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#475569]">
          For a service business, the website is not a brochure. It is the first
          impression and the lead engine. Everything else runs on top of it.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-12 sm:px-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {points.map((p, i) => (
            <div
              key={p.title}
              className="rounded-2xl border border-[#E5E7EB] bg-cream p-8"
            >
              <span className="text-sm font-semibold text-mute">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-3 font-display tracking-[-0.03em] text-xl text-ink">
                {p.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 sm:px-12">
        <div className="rounded-2xl bg-ink p-10 text-white sm:p-14">
          <p className="font-display tracking-[-0.03em] text-2xl leading-snug sm:text-3xl">
            Get found first. Then StayBookt runs the rest.
          </p>
          <div className="mt-8">
            <a
              href={CAL_LINK}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
            >
              Book a 30-minute call
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E5E7EB]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8 text-sm text-mute sm:px-12">
          <Link href="/" className="hover:text-ink">
            Back to home
          </Link>
          <a href={`mailto:${EMAIL}`} className="hover:text-ink">
            {EMAIL}
          </a>
        </div>
      </footer>
    </main>
  );
}

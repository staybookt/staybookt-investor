import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import OperatingLoop from '@/components/OperatingLoop';
import SiteFooter from '@/components/SiteFooter';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'How it works',
  alternates: { canonical: '/how-it-works' },
  description:
    'Four steps: we build your site, set up how customers find you, run the bookings and follow-up, and report back every Monday. You deliver the work. We run the front of the business.',
};

const STEPS = [
  { n: '01', t: 'We build and launch your site', d: 'A fast, mobile-first site that makes you look like the best operator in town and turns visitors into booked jobs. Live in weeks, not months.' },
  { n: '02', t: 'We get you found', d: 'Google Business Profile, local search, reviews, listings. When someone nearby needs what you do, you are who they find.' },
  { n: '03', t: 'We run the front office', d: 'Leads get answered in seconds. Jobs get booked. Reminders go out. Reviews get requested. All of it happens whether you are on a job or asleep.' },
  { n: '04', t: 'We report back', d: 'One short brief every Monday: what got booked, what came back, and the one thing that needs you. You stay in control without living in an app.' },
];

export default function HowItWorksPage() {
  return (
    <>
      <TopNav active="how-it-works" />
      <main className="bg-paper text-ink">
        <section className="px-6 pb-12 pt-36 sm:px-12 sm:pt-44">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">How it works</p>
            <h1 className="display-1 mt-4 text-ink">
              You deliver the work.<br />We run everything in front of it.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
              You did not start your business to answer phones, chase reviews, and wrestle a calendar at 9pm. Here is
              how we take that off your plate.
            </p>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-12 sm:py-32">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {STEPS.map((s) => (
              <div key={s.n} className="card-cream p-7">
                <span className="display-3 text-mute">{s.n}</span>
                <h2 className="display-3 mt-3 text-ink">{s.t}</h2>
                <p className="mt-3 leading-relaxed text-body">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Operating loop lives in a dark band, so the animated graphic stays legible */}
        <section className="bg-ink px-6 py-24 text-white sm:px-12 sm:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <p className="eyebrow">The operating loop</p>
            <h2 className="display-2 mt-3 text-white">What each part actually does</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-platinum-soft">
              Every customer who comes through gets found, captured, booked, followed up, and won again, and your
              database compounds the whole time.
            </p>
          </div>
          <OperatingLoop />
        </section>

        <section className="px-6 py-24 sm:px-12 sm:py-32">
          <div className="panel-ink mx-auto max-w-4xl p-8 text-center sm:p-12">
            <h2 className="display-3 text-white">See what it looks like running</h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-platinum-soft">Book a call and we will map it to your business, or read why the website comes first.</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-ondark">Book a 30-minute call</a>
              <Link href="/why-a-website" className="btn btn-ghost-dark">Why a website</Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}

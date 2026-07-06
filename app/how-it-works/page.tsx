import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import OperatingLoop from '@/components/OperatingLoop';
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
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-mute">How it works</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.03] tracking-tight text-ink sm:text-6xl">
              You deliver the work.<br />We run everything in front of it.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg">
              You did not start your business to answer phones, chase reviews, and wrestle a calendar at 9pm. Here is
              how we take that off your plate.
            </p>
          </div>
        </section>

        <section className="px-6 py-8 sm:px-12">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-[#E5E7EB] bg-paper p-7">
                <span className="font-display text-3xl text-mute">{s.n}</span>
                <h2 className="mt-3 font-display text-2xl tracking-tight text-ink">{s.t}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Operating loop lives in a dark band, so the animated graphic stays legible */}
        <section className="mt-8 bg-ink px-6 py-20 text-white sm:px-12">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-mute">The operating loop</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-white sm:text-4xl">What each part actually does</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-platinum-soft">
              Every customer who comes through gets found, captured, booked, followed up, and won again, and your
              database compounds the whole time.
            </p>
          </div>
          <OperatingLoop />
        </section>

        <section className="px-6 pb-24 pt-20 sm:px-12">
          <div className="mx-auto max-w-2xl rounded-3xl bg-ink p-8 text-center text-white sm:p-12">
            <h2 className="font-display text-3xl tracking-tight text-white">See what it looks like running</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-platinum-soft">Book a call and we will map it to your business, or read why the website comes first.</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-white/90">Book a 30-minute call</a>
              <Link href="/why-a-website" className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/5">Why a website</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

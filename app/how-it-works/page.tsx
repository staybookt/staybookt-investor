import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import Flywheel from '@/components/Flywheel';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'How it works · StayBookt',
  description:
    'Four steps: we build your site, set up how customers find you, run the bookings and follow-up, and report back every Monday. You deliver the work. We run the front of the business.',
};

const STEPS = [
  { n: '01', t: 'We build and launch your site', d: 'A fast, mobile-first site that makes you look like the best operator in town and turns visitors into booked jobs. Live in weeks, not months.' },
  { n: '02', t: 'We get you found', d: 'Google Business Profile, local search, reviews, the works. When someone nearby needs what you do, you are who they find.' },
  { n: '03', t: 'We run the front office', d: 'Leads get answered in seconds. Jobs get booked. Reminders go out. Reviews get requested. All of it happens whether you are on a job or asleep.' },
  { n: '04', t: 'We report back', d: 'One short brief every Monday: what got booked, what came back, and the one thing that needs you. You stay in control without living in an app.' },
];

export default function HowItWorksPage() {
  return (
    <>
      <TopNav active="how-it-works" />
      <main className="bg-ink-deep">
        <section className="px-6 pb-12 pt-36 sm:px-12 sm:pt-44">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-elec-light">How it works</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.03] tracking-tight text-white sm:text-6xl">
              You deliver the work.<br />We run everything in front of it.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-platinum-soft sm:text-lg">
              You did not start your business to answer phones, chase reviews, and wrestle a calendar at 9pm. Here is
              how we take that off your plate.
            </p>
          </div>
        </section>

        <section className="px-6 py-8 sm:px-12">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <span className="font-display text-3xl text-elec-light">{s.n}</span>
                <h2 className="mt-3 font-display text-2xl tracking-tight text-white">{s.t}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-platinum-soft">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 py-14 sm:px-12">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">The loop that keeps your calendar full</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-platinum-soft">
              Every customer who comes through gets captured, booked, followed up, and brought back. Your customer list
              compounds, and the system gets sharper the longer it runs.
            </p>
            <div className="mt-10"><Flywheel /></div>
          </div>
        </section>

        <section className="px-6 pb-24 sm:px-12">
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl tracking-tight text-white">See what it looks like running</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-platinum-soft">Take a look at the platform, or book a call and we will map it to your business.</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/platform" className="rounded-lg border border-white/15 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/5">See the platform</Link>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-gradient-to-r from-elec to-hvac px-7 py-3.5 text-base font-bold text-ink transition-transform hover:-translate-y-0.5">Book a 30-minute call</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

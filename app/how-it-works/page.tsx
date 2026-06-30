import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import OperatingLoop from '@/components/OperatingLoop';
import { PreviewPill, AnalystScreen, RepeatBusinessScreen } from '@/components/PlatformPreview';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'How it works',
  alternates: { canonical: '/how-it-works' },
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

        <section className="px-6 pt-14 pb-4 sm:px-12">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-elec-light">The operating loop</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-white sm:text-4xl">What each part actually does</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-platinum-soft">
              Scroll through the loop. Every customer who comes through gets found, captured, booked, followed up, and
              brought back, and your database compounds the whole time.
            </p>
          </div>
        </section>
        <OperatingLoop />

        {/* Show: conversational intelligence + the CRM that compounds (preview) */}
        <section className="px-6 py-16 sm:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="mb-4 flex justify-center"><PreviewPill /></div>
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                More than a website. A <span className="bg-gradient-to-r from-elec-light to-hvac-light bg-clip-text text-transparent">business analyst in your pocket.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-platinum-soft">
                As the platform ships, the website becomes the front of a system you can talk to, one that knows your customers and brings them back.
              </p>
            </div>

            <div className="grid items-center gap-7 lg:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-light">Ask it anything</p>
                <h3 className="mt-2 font-display text-2xl tracking-tight text-white sm:text-3xl">Your analyst, in your pocket.</h3>
                <p className="mt-4 text-base leading-relaxed text-platinum-soft">
                  Text it or call it like you would a partner. Ask how last week went, or who is due for service, and the answer comes back in plain English, day or night. The numbers come to you in a sentence, not a spreadsheet.
                </p>
              </div>
              <AnalystScreen />
            </div>

            <div className="mt-12 grid items-center gap-7 lg:grid-cols-2">
              <div className="lg:order-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-hvac-light">Past work into future work</p>
                <h3 className="mt-2 font-display text-2xl tracking-tight text-white sm:text-3xl">Your customer list is future revenue.</h3>
                <p className="mt-4 text-base leading-relaxed text-platinum-soft">
                  Every job you have done sits in a database that is yours. We watch for who is due for service, who is ready for a referral ask, and who went quiet, then bring them back. The cheapest growth you have is the customers you already earned.
                </p>
              </div>
              <div className="lg:order-1"><RepeatBusinessScreen /></div>
            </div>

            <p className="mt-10 text-center text-[11px] text-mute">Preview of where the platform is headed. The conversational intelligence and re-engagement roll out through 2026, each with a human safety net.</p>
          </div>
        </section>

        <section className="px-6 pb-24 pt-10 sm:px-12">
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

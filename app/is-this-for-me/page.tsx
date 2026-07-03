import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'Is this for me?',
  alternates: { canonical: '/is-this-for-me' },
  description:
    'If you run a service business under $5M, the phone still rings to you, and the follow-up keeps eating your nights, StayBookt is built for you. Read the list and see.',
};

const SIGNALS: { signal: string; change: string }[] = [
  {
    signal: 'You can’t get back to people quickly.',
    change: 'Every call and text gets answered in seconds, so the job is yours before someone else picks up.',
  },
  {
    signal: 'You run a service business under $5M.',
    change: 'Big enough that the work is real, small enough that it still runs through you. Exactly who we build for.',
  },
  {
    signal: 'The phone still rings to you.',
    change: 'You are the business. We take the front of it off your plate so you can stay on the work.',
  },
  {
    signal: 'You know technology could help, but nothing has been worth the money.',
    change: 'You get the revenue operation a big company pays an executive a half-million a year to run, for less than a part-time hire.',
  },
  {
    signal: 'You’re great at your work, but the follow-up and management is hard.',
    change: 'Quotes, reminders, reviews, scheduling, and re-bookings all run on their own. The follow-up and the managing stop being your job.',
  },
  {
    signal: 'You want to spend more effort growing the business.',
    change: 'The routine work runs itself, so the hours you get back go into growth instead of catch-up.',
  },
  {
    signal: 'You spend your nights on admin instead of time with your family.',
    change: 'We run the admin. You get your evenings back.',
  },
];

function Check() {
  return (
    <span
      className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-ink"
      style={{ backgroundImage: 'linear-gradient(135deg, #06B6D4, #10B981)' }}
      aria-hidden
    >
      {'✓'}
    </span>
  );
}

export default function IsThisForMePage() {
  return (
    <>
      <TopNav active="is-this-for-me" />
      <main className="bg-ink-deep">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-14 pt-36 sm:px-12 sm:pt-44">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: 'radial-gradient(60% 40% at 50% 0%, rgba(6,182,212,0.18), rgba(6,182,212,0) 70%)' }}
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-mute">Is this for me?</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.03] tracking-tight text-white sm:text-6xl">
              If this is your week, the answer is{' '}
              <span className="text-white">yes.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-platinum-soft sm:text-lg">
              No quiz. No funnel. Read the list. If you nod at even a few of these, we should talk.
            </p>
          </div>
        </section>

        {/* The signals */}
        <section className="px-6 pb-6 sm:px-12">
          <div className="mx-auto max-w-4xl divide-y divide-white/8 rounded-3xl border border-white/10 bg-white/[0.02]">
            {SIGNALS.map((s) => (
              <div key={s.signal} className="flex items-start gap-4 p-6 sm:gap-5 sm:p-8">
                <Check />
                <div>
                  <p className="font-display text-xl leading-snug tracking-tight text-white sm:text-2xl">{s.signal}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-platinum-soft">{s.change}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA — immediately after the list */}
        <section className="px-6 py-14 sm:px-12">
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">Sound like you?</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-platinum-soft">
              We take on a small number of owners we can do great work for. Thirty minutes tells us both if it is a fit.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-8 py-4 text-base font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-white/90">Book a 30-minute call</a>
              <Link href="/platform" className="px-5 py-3.5 text-sm text-platinum-soft transition-colors hover:text-white">See the platform {'→'}</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

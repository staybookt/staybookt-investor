import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK } from '@/lib/site';
import EasyButton from '@/components/EasyButton';
import {
  PreviewPill,
  DashboardScreen,
  ReceptionistScreen,
  BookingScreen,
  QuoteFollowupScreen,
  BriefScreen,
  ReviewScreen,
  AnalystScreen,
  RepeatBusinessScreen,
} from '@/components/PlatformPreview';

export const metadata = {
  title: 'The platform',
  alternates: { canonical: '/platform' },
  description:
    'See what StayBookt runs for you: an always-on AI receptionist, self-serve booking, quote follow-up, automatic reviews, a configurable morning brief and end-of-day debrief, and a customer database that compounds. A preview of the operating layer rolling out through 2026.',
};

function Why({ children }: { children: React.ReactNode }) {
  return <span className="bg-gradient-to-r from-elec-light to-hvac-light bg-clip-text text-transparent">{children}</span>;
}

const BLOCKS = [
  {
    eyebrow: 'Your morning, at a glance',
    title: 'The operating dashboard',
    body:
      'Open it and see exactly where the business stands: leads in, jobs booked, follow-ups sent, reviews landed, revenue trending. The number you need, not a wall of charts. Most mornings, nothing needs you.',
    why: 'You run the business from one screen, in under a minute.',
    Comp: DashboardScreen,
  },
  {
    eyebrow: 'Always on, every lead answered',
    title: 'The AI receptionist',
    body:
      'It never clocks out. A customer texts or calls at 2pm or 2am, and it answers in seconds, in your voice. It listens, qualifies them, answers the basic questions, and books the job. You were on a ladder, or asleep. You did not miss the call.',
    why: 'A receptionist that works 24/7 and never misses.',
    Comp: ReceptionistScreen,
  },
  {
    eyebrow: 'The calendar fills itself',
    title: 'Self-serve booking',
    body:
      'Customers pick a time that actually works, get a confirmation, and get a reminder so they show up. No phone tag. No double-booking. No you, typing appointments at 9pm.',
    why: 'Fewer no-shows, fewer gaps, more jobs in the same week.',
    Comp: BookingScreen,
  },
  {
    eyebrow: 'No estimate dies in a text thread',
    title: 'Quote management and follow-up',
    body:
      'Every quote you send is tracked and chased on a schedule, so the $9,400 rewire does not get forgotten because you were busy. You see what is out, what got followed up, what was won, and what needs you, with a running total of the revenue in play.',
    why: 'The follow-up that wins jobs, done for you, and measured.',
    Comp: QuoteFollowupScreen,
  },
  {
    eyebrow: 'Your reputation, growing',
    title: 'Reviews on autopilot',
    body:
      'After every job, the right customer gets a friendly nudge to leave a review. The good ones land on your profile. You climb in local search without thinking about it.',
    why: 'More reviews means more people find you first.',
    Comp: ReviewScreen,
  },
  {
    eyebrow: 'Your day, bookended',
    title: 'Morning brief and end-of-day debrief',
    body:
      'Start the day with one short message: what is booked, what came back, and the one thing that needs you. Set it daily or weekly, your call. At day’s end, a debrief bookends it with what got done, what moved, and what is still open.',
    why: 'In control from the first coffee to the last job, without living in an app.',
    Comp: BriefScreen,
  },
  {
    eyebrow: 'Your analyst, in your pocket',
    title: 'Ask it anything, by text or phone',
    body:
      'Text it or call it like you would a business partner. Ask how last week went, or who is due for service, and the answer comes back in plain English, day or night. The business intelligence comes to you, in a sentence.',
    why: 'No dashboard to dig through. You just ask.',
    Comp: AnalystScreen,
  },
  {
    eyebrow: 'Grow what you already have',
    title: 'The customer database that compounds',
    body:
      'Every customer you have ever served is room to grow. Your database spots who is due for repeat work, who is a fit for an upsell or a cross-sell, and who is ready to refer you, then brings the work back. You raise your average job and expand revenue without spending a dollar to find a new customer.',
    why: 'The cheapest growth there is: the customers you already earned.',
    Comp: RepeatBusinessScreen,
  },
];

export default function PlatformPage() {
  return (
    <>
      <TopNav active="platform" />
      <main className="bg-ink-deep">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-16 pt-36 sm:px-12 sm:pt-44">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(60% 40% at 50% 0%, rgba(6,182,212,0.18), rgba(6,182,212,0) 70%)',
            }}
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <PreviewPill className="mb-6" />
            <h1 className="font-display text-4xl leading-[1.02] tracking-tight text-white sm:text-6xl">
              This is the front of your business. <Why>Running without you.</Why>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-platinum-soft sm:text-lg">
              You do the work. We run the rest. Go ahead, press the button.
            </p>
            <div className="mt-10"><EasyButton /></div>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-gradient-to-r from-elec to-hvac px-7 py-3.5 text-base font-bold text-ink transition-transform hover:-translate-y-0.5"
              >
                Book a 30-minute call
              </a>
              <Link href="/work" className="px-5 py-3.5 text-sm text-platinum-soft transition-colors hover:text-white">
                See real builds →
              </Link>
            </div>
          </div>
        </section>

        {/* Feature blocks, alternating */}
        <section className="px-6 py-12 sm:px-12">
          <div className="mx-auto grid max-w-6xl gap-12">
            {BLOCKS.map((b, i) => (
              <div key={b.title} className="grid items-center gap-7 lg:grid-cols-2">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-light">{b.eyebrow}</p>
                  <h2 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">{b.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-platinum-soft">{b.body}</p>
                  <p className="mt-4 border-l-2 border-hvac/50 pl-4 text-sm font-medium text-hvac-light">
                    {b.why}
                  </p>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <b.Comp />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 sm:px-12">
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
              Want this running your front office?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-platinum-soft">
              Tell us about your business in 30 minutes. We will show you exactly what we would build and run for you.
            </p>
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-lg bg-gradient-to-r from-elec to-hvac px-8 py-4 text-base font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              Book a 30-minute call
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

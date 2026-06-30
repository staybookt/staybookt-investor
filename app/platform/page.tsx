import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK } from '@/lib/site';
import {
  PreviewPill,
  DashboardScreen,
  ReceptionistScreen,
  BookingScreen,
  BriefScreen,
  ReviewScreen,
  AnalystScreen,
  RepeatBusinessScreen,
} from '@/components/PlatformPreview';

export const metadata = {
  title: 'The platform',
  alternates: { canonical: '/platform' },
  description:
    'See what StayBookt runs for you: the AI receptionist that answers every lead, self-serve booking, automatic reviews, and a Monday brief that comes to you. A preview of the operating layer rolling out through 2026.',
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
    eyebrow: 'Every lead, answered',
    title: 'The AI receptionist',
    body:
      'A customer texts or calls. It gets answered in seconds, day or night, in your voice. It qualifies them, answers the basic questions, and books the job. You were on a ladder. You did not miss the call.',
    why: 'Missed calls are missed money. This one never misses.',
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
    eyebrow: 'Your reputation, growing',
    title: 'Reviews on autopilot',
    body:
      'After every job, the right customer gets a friendly nudge to leave a review. The good ones land on your profile. You climb in local search without thinking about it.',
    why: 'More reviews means more people find you first.',
    Comp: ReviewScreen,
  },
  {
    eyebrow: 'Your week, in 30 seconds',
    title: 'The Monday brief',
    body:
      'Every Monday you get one short message: what got booked, what got recovered, what came back, and the one thing that actually needs you. No dashboard to log into. It comes to you.',
    why: 'You stay in control without living in an app.',
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
    eyebrow: 'Past work into future work',
    title: 'The customer database that compounds',
    body:
      'Every job you have done is future business. Your database watches for who is due for service, who is ready for a referral ask, and who went quiet, then brings them back. The cheapest growth you have is the customers you already earned.',
    why: 'Repeat and referral, working while you do the job.',
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
              This is the front of your business, <Why>running without you</Why>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-platinum-soft sm:text-lg">
              You deliver the work. StayBookt answers the leads, books the jobs, chases the reviews, and tells you
              what matters on Monday. Here is what that actually looks like.
            </p>
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

        {/* Honesty / roadmap band */}
        <section className="border-y border-white/8 bg-white/[0.02] px-6 py-12 sm:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">Straight with you</p>
            <h2 className="mt-3 font-display text-2xl tracking-tight text-white sm:text-3xl">
              The website is live today. The rest rolls in as we ship it.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-platinum-soft">
              We build and launch your site first, so you are found and bookable right away. The AI receptionist,
              automatic reviews, and the Monday brief roll out through 2026, and we turn each one on for you as it is
              ready. The screens above are a preview of where you are headed, not a dashboard we are pretending you
              already have.
            </p>
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

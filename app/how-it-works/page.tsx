import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import OperatingLoop from '@/components/OperatingLoop';
import EasyButton from '@/components/EasyButton';
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
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'How it works',
  alternates: { canonical: '/how-it-works' },
  description:
    'You deliver the work. We run everything in front of it: the website, getting found, the bookings, the follow-up, and the customer database that compounds. See the whole operating loop and the product it runs on, in one place.',
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
    eyebrow: 'Grow what you already have',
    title: 'The customer database that compounds',
    body:
      'Every customer you have ever served is room to grow. Your database spots who is due for repeat work, who is a fit for an upsell or a cross-sell, and who is ready to refer you, then brings the work back. You raise your average job and expand revenue without spending a dollar to find a new customer.',
    why: 'The cheapest growth there is: the customers you already earned.',
    Comp: RepeatBusinessScreen,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <TopNav active="how-it-works" />
      <main className="bg-ink-deep">
        {/* Hero */}
        <section className="px-6 pb-10 pt-36 sm:px-12 sm:pt-44">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-elec-light">How it works</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.03] tracking-tight text-white sm:text-6xl">
              You deliver the work.<br />We run <Why>everything in front of it.</Why>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-platinum-soft sm:text-lg">
              You did not start your business to answer phones, chase reviews, and wrestle a calendar at 9pm. Here is
              how we take that off your plate, and what it looks like running.
            </p>
          </div>
        </section>

        {/* The button: press it, watch the front office run */}
        <section className="px-6 pb-6 sm:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center"><PreviewPill /></div>
            <EasyButton />
            <p className="mx-auto mt-6 max-w-md text-sm text-mute">
              Press it. That is the front of your business, running without you.
            </p>
          </div>
        </section>

        {/* The operating loop */}
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

        {/* See it for real: the product screens */}
        <section className="px-6 pt-20 pb-12 sm:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="mb-4 flex justify-center"><PreviewPill /></div>
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                And here is what it <Why>actually looks like.</Why>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-platinum-soft">
                The screens you and your customers touch. A preview of the operating layer rolling out through 2026.
              </p>
            </div>
            <div className="grid gap-12">
              {BLOCKS.map((b, i) => (
                <div key={b.title} className="grid items-center gap-7 lg:grid-cols-2">
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-light">{b.eyebrow}</p>
                    <h3 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">{b.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-platinum-soft">{b.body}</p>
                    <p className="mt-4 border-l-2 border-hvac/50 pl-4 text-sm font-medium text-hvac-light">{b.why}</p>
                  </div>
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <b.Comp />
                  </div>
                </div>
              ))}
            </div>
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
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">Want this running your front office?</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-platinum-soft">
              Tell us about your business in 30 minutes. We will show you exactly what we would build and run for you.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-gradient-to-r from-elec to-hvac px-8 py-4 text-base font-bold text-ink transition-transform hover:-translate-y-0.5">Book a 30-minute call</a>
              <Link href="/work" className="px-5 py-3.5 text-sm text-platinum-soft transition-colors hover:text-white">See real builds →</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

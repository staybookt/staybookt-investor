import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK, EMAIL } from '@/lib/site';

export const metadata = {
  title: 'Thinking long-term | StayBookt',
  description:
    'Most owners do not think about the value of their business until it is too late. StayBookt is built to take care of that for you: transferable value and a higher multiple, so you can enjoy life when you are ready.',
  alternates: { canonical: '/long-term' },
};

const transferable = [
  'A robust website that generates leads without relying on the owner’s connections',
  'A CRM database that is not buried in the owner’s cell phone contacts',
  'A programmatic system that drives a high volume of repeat business',
];

const multiple = [
  'The lower the risk of transferring value, the better',
  'Highly automated systems that limit the owner’s involvement',
  'A strong brand and online reputation',
  'A demonstrated growth story showing more potential',
];

export default function LongTermPage() {
  return (
    <main className="bg-paper text-ink">
      <TopNav />

      <section className="mx-auto max-w-4xl px-6 pt-40 pb-12 sm:px-12">
        <h1 className="font-display tracking-[-0.03em] text-4xl sm:text-6xl text-ink">
          Thinking long-term.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[#475569]">
          Most small and mid-size business owners do not think about maximizing the
          value of their business until it is too late. Our platform is built to take
          care of this for you. As entrepreneurs ourselves, we understand how businesses
          are valued, and we know positioning a business for a future sale is important
          to long-term wealth. Doing that well is also what lets you enjoy life when you
          are ready to do something else.
        </p>
        <p className="mt-5 text-lg font-medium leading-relaxed text-ink">
          We think about this in two ways.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-8 sm:px-12">
        <div className="rounded-2xl border border-[#E5E7EB] bg-cream p-8 sm:p-10">
          <h2 className="font-display tracking-[-0.03em] text-2xl text-ink sm:text-3xl">
            Demonstrate transferable value.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#475569]">
            When buyers evaluate a small-to-medium business, the first thing they assess
            is whether the value transfers to a new owner. A business that lives only in
            the owner&rsquo;s head, built on personal connections, is not worth much.
          </p>
          <p className="mt-6 text-sm font-semibold text-ink">
            What shows a business is transferable:
          </p>
          <ul className="mt-4 space-y-3">
            {transferable.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-relaxed text-[#475569]">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hvac" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16 sm:px-12">
        <div className="rounded-2xl border border-[#E5E7EB] bg-cream p-8 sm:p-10">
          <h2 className="font-display tracking-[-0.03em] text-2xl text-ink sm:text-3xl">
            Maximize the multiple.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#475569]">
            Once you have shown there is transferable value, you need to drive the buy
            multiple up to maximize what the business is worth. StayBookt solves this
            too.
          </p>
          <p className="mt-6 text-sm font-semibold text-ink">
            What makes buyers pay more:
          </p>
          <ul className="mt-4 space-y-3">
            {multiple.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-relaxed text-[#475569]">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hvac" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 sm:px-12">
        <div className="rounded-2xl bg-ink p-10 text-white sm:p-14">
          <p className="text-lg leading-relaxed text-platinum">
            StayBookt is built by entrepreneurs who get it. We are here to help you enjoy
            life while you run the business, and when you are ready to move on from it. We
            are your full-cycle partner, today and for the future.
          </p>
          <p className="mt-8 font-display tracking-[-0.03em] text-2xl sm:text-3xl">
            <span className="text-white">Stay</span>
            <span className="wordmark-gradient">Bookt</span>
            <span className="text-[#7C3AED]">.</span>{' '}
            <span className="text-hvac">Enjoy Life.</span>
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

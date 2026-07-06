import { TopNav } from '@/components/TopNav';
import Wordmark from '@/components/Wordmark';
import SiteFooter from '@/components/SiteFooter';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'Thinking long-term | StayBookt',
  description:
    'Most owners do not think about the value of their business until it is too late. StayBookt is built to take care of that for you: transferable value and a higher multiple, so you can enjoy life when you are ready.',
  alternates: { canonical: '/long-term' },
};

// PLACEHOLDER image (Pexels, licensed). Evokes a built, sellable business / a
// handshake / calm. Swap for owned or curated imagery; image ID to be curated.
const BAND_IMG =
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600';

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
      <TopNav active="long-term" />

      <section className="mx-auto max-w-4xl px-6 pt-36 pb-12 sm:px-12 sm:pt-44">
        <p className="eyebrow">Long-term value</p>
        <h1 className="display-1 mt-4 text-ink">Thinking long-term.</h1>
        <p className="mt-6 text-lg leading-relaxed text-body">
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

      {/* Full-width image band */}
      <section className="relative overflow-hidden">
        <img
          src={BAND_IMG}
          alt="A calm, well-run business ready to hand on"
          className="h-[44vh] min-h-[300px] w-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,8,17,0.30) 0%, rgba(5,8,17,0.18) 50%, rgba(5,8,17,0.55) 100%)',
          }}
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 sm:px-12 sm:py-32">
        <div className="card-cream p-8 sm:p-10">
          <h2 className="display-2 text-ink">Demonstrate transferable value.</h2>
          <p className="mt-5 leading-relaxed text-body">
            When buyers evaluate a small-to-medium business, the first thing they assess
            is whether the value transfers to a new owner. A business that lives only in
            the owner&rsquo;s head, built on personal connections, is not worth much.
          </p>
          <p className="mt-6 text-sm font-semibold text-ink">
            What shows a business is transferable:
          </p>
          <ul className="mt-4 space-y-3">
            {transferable.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-body">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hvac" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-cream mt-6 p-8 sm:p-10">
          <h2 className="display-2 text-ink">Maximize the multiple.</h2>
          <p className="mt-5 leading-relaxed text-body">
            Once you have shown there is transferable value, you need to drive the buy
            multiple up to maximize what the business is worth. StayBookt solves this
            too.
          </p>
          <p className="mt-6 text-sm font-semibold text-ink">
            What makes buyers pay more:
          </p>
          <ul className="mt-4 space-y-3">
            {multiple.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-body">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hvac" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 sm:px-12">
        <div className="panel-ink p-10 sm:p-14">
          <p className="text-lg leading-relaxed text-platinum">
            StayBookt is built by entrepreneurs who get it. We are here to help you enjoy
            life while you run the business, and when you are ready to move on from it. We
            are your full-cycle partner, today and for the future.
          </p>
          <p className="mt-8">
            <Wordmark onDark period tagline size="md" />
          </p>
          <div className="mt-8">
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-ondark">
              Book a 30-minute call
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

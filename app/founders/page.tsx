import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK, EMAIL } from '@/lib/site';

export const metadata = {
  title: 'The two of us | StayBookt',
  description:
    'StayBookt is built and run by two founders who have been on both sides of a service business: the one bringing in the work, and the one making the operation run.',
  alternates: { canonical: '/founders' },
};

export default function FoundersPage() {
  return (
    <main className="bg-paper text-ink">
      <TopNav />

      <section className="mx-auto max-w-5xl px-6 pt-40 pb-16 sm:px-12">
        <h1 className="font-display tracking-[-0.03em] text-4xl sm:text-6xl text-ink">
          The two of us.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#475569]">
          StayBookt is built and run by two founders who have been on both sides of a
          service business: the one bringing in the work, and the one making the
          operation actually run.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12 sm:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E5E7EB] bg-cream p-8">
            <h2 className="font-display tracking-[-0.03em] text-2xl text-ink">
              Jacob Charendoff
            </h2>
            <p className="mt-1 text-sm font-semibold text-[#7C3AED]">
              Brand, product, and growth.
            </p>
            <p className="mt-5 text-base leading-relaxed text-[#475569]">
              Jacob runs the outside game: the brand, the product, and how StayBookt
              shows up in the world. His focus is making a service business impossible
              to miss and effortless to hire, then turning that first impression into a
              system the owner can actually hand off.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-cream p-8">
            <h2 className="font-display tracking-[-0.03em] text-2xl text-ink">
              Richard
            </h2>
            <p className="mt-1 text-sm font-semibold text-hvac">
              Operations, growth, and finance.
            </p>
            <p className="mt-5 text-base leading-relaxed text-[#475569]">
              Two plus decades of executive-level leadership in high-growth service
              businesses at scale. Responsible for multiple start-up efforts and leading
              significant growth at Venterra from $15M to $500M+ in revenues. Deep
              understanding of the entire customer journey and all aspects of delivering
              world-class revenue performance. A CPA who has a passion for operations and
              leveraging technology to deliver tangible results.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-12">
        <div className="rounded-2xl bg-ink p-10 text-white sm:p-14">
          <p className="font-display tracking-[-0.03em] text-2xl leading-snug sm:text-3xl">
            One of us builds the demand. One of us builds the operation. Together, we
            build the thing that runs without you.
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
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 text-sm text-mute sm:px-12">
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

import Link from 'next/link';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'Enjoy Life',
  alternates: { canonical: '/enjoy-life' },
  description:
    'The point was never the business. It was the life it was supposed to buy. A business that runs without you is an asset you can sell, pass on, or finally step back from.',
};

const DOORS = [
  {
    k: 'Sell it',
    h: 'Build an asset, not a job.',
    b: 'A business that runs without you is something a buyer actually wants and you can actually walk away from. The systems we build are what turn years of your work into a number on a term sheet.',
  },
  {
    k: 'Pass it on',
    h: 'Hand it to your family.',
    b: 'A business that does not live and die on your personal phone is one you can give to your kids or your crew, and trust that it keeps running the way you built it.',
  },
  {
    k: 'Get back to the work',
    h: 'Do the part you love.',
    b: 'Or keep it, and just get back to the craft, the tools, the customers, the reason you started, before the admin ate your evenings and your weekends.',
  },
];

export default function EnjoyLifePage() {
  return (
    <>
      <TopNav active="enjoy-life" />
      <main className="bg-ink-deep">
        {/* Hero */}
        <section className="px-6 pt-36 pb-16 sm:px-12 sm:pt-44">
          <div className="mx-auto max-w-4xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-mute">Enjoy Life</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              The point was never the business.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-platinum-soft sm:text-2xl">
              It was the life the business was supposed to buy. StayBookt runs the front office so the business runs
              without you, and you finally get to go collect it.
            </p>
          </div>
        </section>

        {/* Three doors */}
        <section className="px-6 py-10 sm:px-12">
          <div className="mx-auto max-w-4xl">
            <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.24em] text-mute">Three doors, one key</p>
            <div className="space-y-14">
              {DOORS.map((d) => (
                <div key={d.k} className="border-t border-white/10 pt-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">{d.k}</p>
                  <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-white sm:text-5xl">{d.h}</h2>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-platinum-soft">{d.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The key */}
        <section className="px-6 py-16 sm:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-3xl leading-snug tracking-tight text-white sm:text-4xl">
              Three different doors. The same key: a business that runs without you.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-platinum-soft">
              That is the whole reason StayBookt exists. Not another tool for you to run. We run it, we only get paid
              when it works, and what it buys back is your time, your options, and the life you built it for.
            </p>
          </div>
        </section>

        {/* Close */}
        <section className="px-6 pb-28 pt-8 sm:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-3xl tracking-tight text-white sm:text-4xl">
              <span>Stay</span>
              <span className="wordmark-gradient">Bookt</span>
              <span>.</span> <span>Enjoy Life.</span>
            </p>
            <div className="mt-9">
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-ink transition-colors hover:bg-white/90"
              >
                Book a 30-minute call
              </a>
            </div>
            <p className="mt-8">
              <Link href="/" className="text-sm font-semibold text-elec transition-colors hover:text-white">
                {'←'} Back home
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

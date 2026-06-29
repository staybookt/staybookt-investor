import Link from 'next/link';
import Image from 'next/image';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'Our work · StayBookt',
  description: 'Real sites we built and run for real owner-operators. Top Choice Electrical in York Region and an HR consultancy build in progress.',
};

export default function WorkPage() {
  return (
    <>
      <TopNav active="work" />
      <main className="bg-ink-deep">
        <section className="px-6 pb-10 pt-36 sm:px-12 sm:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-elec-light">Our work</p>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-6xl">
              Real owners. Real sites. Live now.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-platinum-soft sm:text-lg">
              We are early and honest about it. Here is real work for real operators, not stock mockups or invented logos.
            </p>
          </div>
        </section>

        {/* TCE */}
        <section className="px-6 py-8 sm:px-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="p-8 sm:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-hvac-light">Trades · Electrical · York Region</p>
                <h2 className="mt-3 font-display text-3xl tracking-tight text-white">Top Choice Electrical</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-platinum-soft">
                  A licensed electrical contractor that was running on word of mouth and a phone that rang straight to the
                  owner. We built a site that makes them look like the established pro they are, set up their Google
                  profile, and wired tap-to-call and booking so a homeowner can reach them in one tap.
                </p>
                <a
                  href="https://tce-website-three.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
                >
                  Visit the live site <span aria-hidden>→</span>
                </a>
              </div>
              <div className="relative min-h-[280px] bg-ink">
                <Image src="/photos/tce-after.png" alt="Top Choice Electrical website built by StayBookt" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        {/* XNL */}
        <section className="px-6 py-8 sm:px-12">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-light">Professional services · HR consultancy · Build in progress</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-white">An HR + workplace mediation practice</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-platinum-soft">
              A two-partner consultancy whose judgment is the product. We are building the site and the operating layer
              around how they actually win and serve clients, so the founders spend their time on the work, not the
              follow-up. Going live soon.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-elec/40 bg-elec/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-light">
              In build
            </span>
          </div>
        </section>

        {/* Honest reviews gate */}
        <section className="px-6 py-8 sm:px-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-white/12 bg-white/[0.015] p-7 text-center">
            <p className="text-[13px] leading-relaxed text-mute">
              We will put real customer reviews here as our first clients hit their stride. We do not invent
              testimonials, and we never will.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-12">
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl tracking-tight text-white">Want to be one of these?</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-platinum-soft">We are taking on a small number of owners we can do great work for. See if you are a fit.</p>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="mt-7 inline-block rounded-lg bg-gradient-to-r from-elec to-hvac px-8 py-4 text-base font-bold text-ink transition-transform hover:-translate-y-0.5">Book a 30-minute call</a>
          </div>
        </section>
      </main>
    </>
  );
}

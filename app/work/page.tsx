import Link from 'next/link';
import Image from 'next/image';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'Our work',
  alternates: { canonical: '/work' },
  description: 'Real sites we built and run for real owner-operators. Top Choice Electrical and XNL HR, both live on their own domains.',
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
              Real work for real operators, both live on their own domains. Not stock mockups, not invented logos.
            </p>
          </div>
        </section>

        {/* TCE */}
        <section className="px-6 py-8 sm:px-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            {/* clean browser-framed screenshot */}
            <div className="p-6 pb-0 sm:p-8 sm:pb-0">
              <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/50">
                <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.06] px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="ml-3 truncate text-[10px] tracking-wide text-mute">topchoiceelectrical.com</span>
                </div>
                <div className="relative aspect-[16/9] w-full bg-ink">
                  <Image
                    src="/photos/tce-after.png"
                    alt="Top Choice Electrical website built by StayBookt"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
              </div>
            </div>
            <div className="p-8 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-hvac-light">Trades · Electrical · York Region</p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-white">Top Choice Electrical</h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-platinum-soft">
                Tim Ciszkowski, 22 years on the tools, was running on word of mouth and a phone that rang straight to him. We
                built a site that looks like the established pro he is, rebuilt his Google profile, and wired
                tap-to-call and booking so a homeowner reaches him in one tap.
              </p>
            </div>
          </div>
        </section>

        {/* XNL */}
        <section className="px-6 py-8 sm:px-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            {/* clean browser-framed live header */}
            <div className="p-6 pb-0 sm:p-8 sm:pb-0">
              <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/50">
                <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.06] px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="ml-3 truncate text-[10px] tracking-wide text-mute">xnlhr.com</span>
                </div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink">
                  <div className="absolute inset-0 z-0 flex flex-col items-center justify-center px-6 text-center">
                    <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-mute">XNL HR &amp; Communications</p>
                    <p className="font-display text-lg text-platinum-soft">xnlhr.com</p>
                  </div>
                  <iframe
                    src="https://www.xnlhr.com"
                    title="XNL HR live site"
                    loading="lazy"
                    scrolling="no"
                    sandbox="allow-same-origin allow-scripts allow-popups"
                    className="absolute left-0 top-0 z-10 h-[1400px] w-full border-0 pointer-events-none"
                  />
                </div>
              </div>
            </div>
            <div className="p-8 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-light">Professional services · HR consultancy · York Region</p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-white">XNL HR &amp; Communications</h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-platinum-soft">
                Evert Akkerman, CHRL, runs a fractional HR practice where his judgment is the product. We built a site that
                tells the XNL story the way he has been trying to tell it for years, so intake calls land already warmed
                up.
              </p>
            </div>
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

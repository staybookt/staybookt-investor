import Link from 'next/link';
import { MacBookFrame } from './DeviceFrames';

const CAL_LINK = 'https://cal.com/jacobcharendoff/staybookt';
const TIM_HREF = 'https://www.topchoiceelectrical.com';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pb-28 px-6 sm:px-12 bg-ink-deep">
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold mb-7 inline-flex items-center gap-2.5 justify-center">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-elec animate-pulse" aria-hidden />
          <span className="text-platinum-soft">For Ontario service businesses under $1M</span>
        </p>

        <h1 className="font-display text-[44px] sm:text-[68px] lg:text-[96px] leading-[1.02] tracking-[-0.035em] mb-7 max-w-5xl mx-auto mobile-text-balance">
          A website that <span className="text-brand-gradient">earns its keep.</span>
        </h1>

        <p className="text-platinum-soft text-base sm:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          Built for owner-operated trades and local services where the phone still rings to the owner. Paid for by the results, not the promises. The back-office layer is rolling out behind it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-elec to-hvac text-ink font-bold px-8 py-4 rounded-lg text-base sm:text-lg transition-opacity hover:opacity-90"
          >
            Book a 30-minute call
            <span aria-hidden>{'→'}</span>
          </a>
          <Link
            href="#work"
            className="inline-flex items-center gap-2 text-platinum-soft hover:text-white text-sm sm:text-base px-5 py-4 transition-colors"
          >
            See the builds
            <span aria-hidden>{'↓'}</span>
          </Link>
        </div>

        {/* SHOWCASE: Tim's live site */}
        <div className="relative max-w-4xl mx-auto mb-10">
          <div className="relative group">
            <a href={TIM_HREF} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label="Open Top Choice Electrical live site" />
            <MacBookFrame>
              <iframe
                src={TIM_HREF}
                title="Top Choice Electrical live site"
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-popups"
                className="border-0 pointer-events-none [width:1600px] [height:1000px] [transform-origin:top_left] [transform:scale(0.42)] sm:[transform:scale(0.55)] lg:[transform:scale(0.7)]"
              />
            </MacBookFrame>
            <div className="absolute top-3 left-3 z-30 px-2.5 py-1 rounded-md bg-emerald-500 text-ink text-[10px] tracking-[0.18em] uppercase font-bold shadow-lg">
              Live &middot; topchoiceelectrical.com
            </div>
          </div>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-mute mt-4">
            Top Choice Electrical &middot; Newmarket, Ontario &middot; Built in 3 weeks
          </p>
        </div>

        {/* Hero stats — real outcomes */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-2xl mx-auto mb-10">
          <HeroStat number="14" label="leads in 30 days" />
          <HeroStat number="6" label="booked jobs in 60" />
          <HeroStat number="3wk" label="from kickoff to live" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-3">
          <PriceLine amount="$2,500" detail="to launch" />
          <span className="text-divider hidden sm:inline" aria-hidden>·</span>
          <PriceLine amount="$149" detail="a month" />
          <span className="text-divider hidden sm:inline" aria-hidden>·</span>
          <PriceLine amount="5%" detail="on new business the site brings in" />
        </div>
      </div>
    </section>
  );
}

function HeroStat({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-paper/[0.04] border border-divider/40 rounded-xl p-4 sm:p-5">
      <p className="font-display text-3xl sm:text-5xl text-brand-gradient tracking-tight tabular-nums leading-none mb-2">{number}</p>
      <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-mute leading-tight">{label}</p>
    </div>
  );
}

function PriceLine({ amount, detail }: { amount: string; detail: string }) {
  return (
    <p className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase">
      <span className="text-white font-bold">{amount}</span>{' '}
      <span className="text-mute">{detail}</span>
    </p>
  );
}

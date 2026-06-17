import Link from 'next/link';

const CAL_LINK = 'https://cal.com/jacobcharendoff/staybookt';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 px-6 sm:px-12 bg-ink-deep">
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold mb-7 inline-flex items-center gap-2.5 justify-center">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-elec animate-pulse" aria-hidden />
          <span className="text-platinum-soft">For Ontario service businesses under $1M</span>
        </p>

        <h1 className="font-display text-[44px] sm:text-[72px] lg:text-[112px] leading-[1.02] tracking-[-0.035em] mb-8 max-w-5xl mx-auto mobile-text-balance">
          A website that <span className="text-brand-gradient">earns its keep.</span>
        </h1>

        <p className="text-platinum-soft text-base sm:text-lg lg:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          Built for owner-operated trades and local services where the phone still rings to the owner. Paid for by the results, not the promises. The back-office layer is rolling out behind it.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14 max-w-3xl mx-auto">
          <LeakChip label="Missed calls" amount="$24K" />
          <LeakChip label="Slow quote follow-up" amount="$31K" />
          <LeakChip label="Missing reviews" amount="$18K" />
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute mt-1 sm:mt-0 w-full sm:w-auto">a year, lost to three things</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
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

        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-3">
          <PriceLine amount="$2,500" detail="to launch" />
          <span className="text-divider hidden sm:inline" aria-hidden>&middot;</span>
          <PriceLine amount="$149" detail="a month" />
          <span className="text-divider hidden sm:inline" aria-hidden>&middot;</span>
          <PriceLine amount="5%" detail="on new business the site brings in" />
        </div>
      </div>
    </section>
  );
}

function LeakChip({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 bg-paper/[0.04] border border-divider/60 rounded-full px-4 py-2 text-xs sm:text-sm">
      <span className="font-mono tracking-[0.12em] uppercase text-[10px] sm:text-[11px] text-platinum-soft font-semibold">
        {label}
      </span>
      <span className="font-display text-base sm:text-lg text-amber-400 font-semibold tabular-nums">
        {amount}
      </span>
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

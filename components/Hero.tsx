import Link from 'next/link';

const CAL_LINK = 'https://cal.com/jacobcharendoff/staybookt';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 px-6 sm:px-12 bg-ink-deep">
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold mb-7 inline-flex items-center gap-2.5 justify-center">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-elec" aria-hidden />
          <span className="text-platinum-soft">For Ontario service businesses under $1M</span>
        </p>

        <h1 className="font-display text-[44px] sm:text-[68px] lg:text-[96px] leading-[1.02] tracking-[-0.035em] mb-6 max-w-5xl mx-auto mobile-text-balance">
          We build the website that closes them.<br className="hidden sm:inline" /> <span className="text-brand-gradient">Paid for by the results.</span>
        </h1>

        <p className="text-platinum-soft text-base sm:text-lg lg:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
          For owner-operated service businesses where the phone still rings to the owner. We build the website that captures your leads and convert them into bookings. The AI back office that books, follows up, and asks for reviews is rolling out behind it.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 max-w-3xl mx-auto">
          <LeakChip label="Missed calls" amount="$24K" />
          <LeakChip label="Slow quote follow-up" amount="$31K" />
          <LeakChip label="Missing reviews" amount="$18K" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-elec to-hvac text-ink font-bold px-7 py-4 rounded-lg text-sm sm:text-base transition-opacity hover:opacity-90"
          >
            Book a 30-minute call
            <span aria-hidden>{'→'}</span>
          </a>
          <Link
            href="#work"
            className="inline-flex items-center gap-2 text-platinum-soft hover:text-white text-sm sm:text-base px-5 py-4 transition-colors"
          >
            See two builds that are live
            <span aria-hidden>{'↓'}</span>
          </Link>
        </div>

        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-mute">
          $2,500 to launch &middot; $149 a month &middot; 5% on new business the site brings you
        </p>
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

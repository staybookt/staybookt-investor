import Link from 'next/link';
import { CAL_LINK, PRICING } from '@/lib/site';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 px-6 sm:px-12 bg-ink-deep">
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold mb-8 inline-flex items-center gap-2.5 justify-center">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-elec animate-pulse" aria-hidden />
          <span className="text-platinum-soft">For Ontario service businesses under $1M</span>
        </p>

        <h1 className="font-display text-[52px] sm:text-[88px] lg:text-[128px] leading-[0.98] tracking-[-0.04em] mb-9">
          <span className="block text-white">Get Found.</span>
          <span className="inline-flex items-baseline justify-center">
            <span className="text-white">Stay</span>
            <span className="wordmark-gradient">Bookt</span>
            <span className="text-white">.</span>
          </span>
        </h1>

        <p className="text-platinum-soft text-base sm:text-lg lg:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          The system that gets service businesses found, books the work, and keeps the calendar full. Built and run by us. Paid for by the results.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
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

        <p className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase">
          <span className="text-white font-bold">Starting at {PRICING.build}</span>{' '}
          <span className="text-mute">to launch</span>
        </p>
      </div>
    </section>
  );
}

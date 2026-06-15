'use client';

import AnimatedNumber from './AnimatedNumber';

export default function StatRow() {
  return (
    <section className="relative py-20 sm:py-28 px-6 sm:px-12 border-t border-divider/30">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold mb-12 sm:mb-16 inline-flex items-center gap-2.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-elec" aria-hidden />
          <span className="text-platinum-soft">By the numbers</span>
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 sm:gap-x-10">
          <Stat
            value={<AnimatedNumber end={247} />}
            label="Sites Pulse has scanned"
            sub="this year"
            spark="M0,18 L8,15 L16,17 L24,12 L32,13 L40,9 L48,11 L56,6 L64,7 L72,4 L80,2"
          />
          <Stat
            value={<AnimatedNumber end={14} />}
            label="Signals per scan"
            sub="site, GBP, reviews, rivals"
            spark="M0,12 L10,12 L20,12 L30,12 L40,12 L50,12 L60,12 L70,12 L80,12"
            sparkColor="rgba(255,255,255,0.25)"
          />
          <Stat
            value={<AnimatedNumber end={6} />}
            valueSuffix=" / 14"
            label="Avg gaps found"
            sub="on a typical owner site"
            spark="M0,8 L10,10 L20,7 L30,11 L40,9 L50,12 L60,14 L70,13 L80,15"
            sparkColor="rgba(239,68,68,0.55)"
          />
          <Stat
            value={<AnimatedNumber end={3400} prefix="$" />}
            label="Avg monthly leak"
            sub="per site, by Pulse estimate"
            spark="M0,16 L10,14 L20,12 L30,9 L40,11 L50,7 L60,5 L70,3 L80,2"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({
  value, label, sub, spark, sparkColor = 'url(#sb-stat-grad)', valueSuffix,
}: {
  value: React.ReactNode;
  label: string;
  sub: string;
  spark: string;
  sparkColor?: string;
  valueSuffix?: string;
}) {
  return (
    <div className="flex flex-col items-start">
      <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-elec mb-3">
        {label}
      </p>
      <p className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.04em] leading-none text-brand-gradient">
        {value}
        {valueSuffix && <span className="text-platinum-soft text-3xl sm:text-4xl ml-1">{valueSuffix}</span>}
      </p>
      <svg viewBox="0 0 80 20" className="w-24 h-5 mt-4" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="sb-stat-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <path d={spark} fill="none" stroke={sparkColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-mute text-xs mt-4 leading-relaxed">{sub}</p>
    </div>
  );
}

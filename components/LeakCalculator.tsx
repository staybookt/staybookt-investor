'use client';

import { useState, useMemo } from 'react';

const PULSE_SMS = 'sms:+16474908937';

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString();
}

export default function LeakCalculator() {
  const [jobs, setJobs] = useState(40);
  const [value, setValue] = useState(500);
  const [missed, setMissed] = useState(5);
  const [hours, setHours] = useState(12);

  const { callLeak, quoteLeak, reviewLeak, totalLeak, hoursYear } = useMemo(() => {
    const callLeak = missed * 52 * 0.18 * value;
    const quoteLeak = jobs * 12 * 0.13 * value;
    const reviewLeak = jobs * 12 * 0.075 * value;
    const totalLeak = callLeak + quoteLeak + reviewLeak;
    const hoursYear = hours * 52;
    return { callLeak, quoteLeak, reviewLeak, totalLeak, hoursYear };
  }, [jobs, value, missed, hours]);

  return (
    <div className="bg-paper/[0.03] border border-divider/60 rounded-2xl p-7 sm:p-10 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* LEFT: Sliders */}
        <div>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold text-elec mb-3">
            Calculate your leak
          </p>
          <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight text-white mb-3">
            Slide to your business.
          </h3>
          <p className="text-platinum-soft text-sm sm:text-base leading-relaxed mb-8">
            The numbers update live. These are honest industry estimates. Pulse calculates your real numbers from your actual data.
          </p>

          <div className="space-y-7">
            <SliderRow
              label="Monthly jobs completed"
              value={jobs}
              display={`${jobs} jobs`}
              min={5}
              max={200}
              step={5}
              onChange={setJobs}
            />
            <SliderRow
              label="Average job value"
              value={value}
              display={fmt(value)}
              min={100}
              max={5000}
              step={50}
              onChange={setValue}
            />
            <SliderRow
              label="Missed calls per week"
              value={missed}
              display={`${missed} calls`}
              min={0}
              max={30}
              step={1}
              onChange={setMissed}
            />
            <SliderRow
              label="Hours on admin per week"
              value={hours}
              display={`${hours} hrs`}
              min={0}
              max={40}
              step={1}
              onChange={setHours}
            />
          </div>
        </div>

        {/* RIGHT: Outputs */}
        <div className="lg:pl-8 lg:border-l lg:border-divider/40">
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold text-mute mb-4">
            Your annual leak
          </p>
          <p className="font-display tabular-nums tracking-[-0.035em] leading-[0.9] text-brand-gradient mb-3"
             style={{ fontSize: 'clamp(54px, 9vw, 96px)' }}>
            {fmt(totalLeak)}
          </p>
          <p className="text-platinum-soft text-sm sm:text-base mb-8">
            leaking out of your business this year, from three sources.
          </p>

          <div className="border-t border-divider/30 pt-6 space-y-4 mb-8">
            <LeakRow label="Missed calls" amount={fmt(callLeak)} />
            <LeakRow label="Slow quote follow-up" amount={fmt(quoteLeak)} />
            <LeakRow label="Missing reviews" amount={fmt(reviewLeak)} />
          </div>

          <div className="border-t border-divider/30 pt-6 mb-8">
            <p className="text-platinum-soft text-sm leading-relaxed">
              Plus{' '}
              <span className="text-white font-semibold tabular-nums">
                {hoursYear.toLocaleString()} hours
              </span>{' '}
              a year on admin you cannot give back to your family.
            </p>
          </div>

          <a
            href={PULSE_SMS}
            className="group block bg-gradient-to-r from-elec to-plumb hover:opacity-90 text-ink font-bold px-5 py-4 rounded-lg text-center transition-opacity"
          >
            <span className="block font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold mb-1.5 opacity-90">
              See your real numbers
            </span>
            <span className="font-display text-lg sm:text-xl tracking-tight">
              Text Pulse {'→'} (647) 490-8937
            </span>
          </a>
          <p className="text-mute text-[11px] mt-3 leading-relaxed text-center">
            Free diagnostic. Lands on your phone in 90 seconds. No signup. No list.
          </p>
        </div>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-mute">{label}</p>
        <p className="font-display text-xl text-white tracking-tight tabular-nums">{display}</p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full bg-divider/40 appearance-none cursor-pointer accent-elec"
        style={{
          accentColor: '#22d3ee',
        }}
      />
    </div>
  );
}

function LeakRow({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-mute">
        {label}
      </p>
      <p className="font-display text-xl sm:text-2xl text-platinum tracking-tight tabular-nums">
        {amount}
      </p>
    </div>
  );
}

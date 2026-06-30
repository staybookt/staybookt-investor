'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* The "easy button." Domed, glossy, embossed EASY — the classic, in StayBookt
 * colors. Press it and the front office gets handled, ticking through the jobs
 * StayBookt runs, landing on "That was easy." Fun, and a one-glance demo. Preview. */

const TASKS = [
  'Answering every lead, 24/7',
  'Booking the jobs',
  'Organizing quotes',
  'Chasing the reviews',
  'Chasing repeat business',
  'Sending your Monday brief',
];

type Phase = 'idle' | 'running' | 'done';

export default function EasyButton() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');
  const [step, setStep] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const run = () => {
    if (phase === 'running') return;
    clearTimers();
    if (reduce) {
      setStep(TASKS.length - 1);
      setPhase('done');
      return;
    }
    setPhase('running');
    setStep(-1);
    TASKS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i), 450 + i * 560));
    });
    timers.current.push(setTimeout(() => setPhase('done'), 450 + TASKS.length * 560 + 350));
  };

  const reset = () => {
    clearTimers();
    setStep(-1);
    setPhase('idle');
  };

  const done = phase === 'done';
  const label = phase === 'idle' ? 'Run my front office' : phase === 'running' ? 'On it…' : 'That was easy.';

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
        {/* the dome button, in its housing */}
        <div className="relative mx-auto h-36 w-36">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle at 50% 38%, #0c2a33, #050811 78%)', boxShadow: '0 12px 30px rgba(0,0,0,0.55)' }}
          />
          {!reduce && phase === 'idle' && (
            <motion.span
              aria-hidden
              className="absolute inset-1 rounded-full border-2 border-elec/40"
              animate={{ scale: [1, 1.22], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <motion.button
            type="button"
            onClick={done ? reset : run}
            whileTap={reduce ? undefined : { y: 4, scale: 0.97 }}
            aria-label={done ? 'Run it again' : 'Run my front office'}
            className="absolute inset-[14px] flex items-center justify-center rounded-full"
            style={{
              background: done
                ? 'radial-gradient(circle at 35% 28%, #6ee7b7 0%, #10B981 45%, #047857 100%)'
                : 'radial-gradient(circle at 35% 28%, #a5f3fc 0%, #22d3ee 32%, #06B6D4 62%, #0e7490 100%)',
              boxShadow:
                '0 14px 30px -6px rgba(6,182,212,0.55), inset 0 6px 14px rgba(255,255,255,0.55), inset 0 -16px 28px rgba(2,28,38,0.6)',
            }}
          >
            <span aria-hidden className="pointer-events-none absolute left-1/2 top-4 h-7 w-16 -translate-x-1/2 rounded-[50%] bg-white/45 blur-md" />
            <span
              className="relative font-display text-2xl font-extrabold tracking-[0.12em] text-white"
              style={{ textShadow: '0 1px 1px rgba(0,0,0,0.35)' }}
            >
              EASY
            </span>
          </motion.button>
        </div>

        <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-platinum-soft">{label}</p>

        {/* the work, ticking off */}
        <div className="mx-auto mt-6 max-w-xs space-y-2.5 text-left">
          {TASKS.map((t, i) => {
            const lit = step >= i;
            return (
              <div key={t} className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300 ${
                    lit ? 'bg-hvac text-ink' : 'border border-white/15 text-transparent'
                  }`}
                >
                  ✓
                </span>
                <span className={`text-sm transition-colors duration-300 ${lit ? 'text-white' : 'text-mute'}`}>{t}</span>
              </div>
            );
          })}
        </div>

        {done && (
          <motion.button
            type="button"
            onClick={reset}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-light hover:text-white"
          >
            Run it again ↻
          </motion.button>
        )}
      </div>
      <p className="mt-3 text-center text-[11px] text-mute">You do the work. We run the rest. (Preview, rolling out 2026.)</p>
    </div>
  );
}

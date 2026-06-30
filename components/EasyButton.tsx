'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* The "easy button." Press it and watch the front office get handled, ticking
 * through the jobs StayBookt runs, landing on "That was easy." Fun, simple,
 * and it doubles as a one-glance demo of the whole value prop. Preview. */

const TASKS = ['Answering your leads', 'Booking the jobs', 'Chasing the reviews', 'Sending your Monday brief'];

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
      timers.current.push(setTimeout(() => setStep(i), 450 + i * 620));
    });
    timers.current.push(setTimeout(() => setPhase('done'), 450 + TASKS.length * 620 + 350));
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
        {/* the button */}
        <button
          type="button"
          onClick={done ? reset : run}
          className="group relative mx-auto flex h-28 w-28 items-center justify-center rounded-full text-ink transition-transform duration-150 active:scale-95"
          style={{
            backgroundImage: done ? 'linear-gradient(135deg,#10B981,#34d399)' : 'linear-gradient(135deg,#06B6D4,#10B981)',
            boxShadow: '0 0 60px -12px rgba(6,182,212,0.55)',
          }}
          aria-label={done ? 'Run it again' : 'Run my front office'}
        >
          {!reduce && phase === 'idle' && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border-2 border-elec/50"
              animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <motion.span
            key={done ? 'check' : 'play'}
            initial={reduce ? false : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="text-3xl font-bold leading-none"
          >
            {done ? '✓' : '▶'}
          </motion.span>
        </button>

        <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-platinum-soft">{label}</p>

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

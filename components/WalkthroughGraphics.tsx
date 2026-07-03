'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const PANEL = 'mx-auto w-full max-w-[460px] rounded-[28px] border border-white/[0.07] bg-white/[0.015] p-8 sm:p-9';

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const rise: Variants = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };

/* BOOKS — the week filling itself. One idea: your calendar, kept full. */
export function BookingApple() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const week: { day: string; slots: { l: string; s: 'filled' | 'ghost' | 'new' }[] }[] = [
    { day: 'Mon', slots: [{ l: 'AC repair', s: 'filled' }, { l: '', s: 'ghost' }] },
    { day: 'Tue', slots: [{ l: '', s: 'ghost' }, { l: 'Tune-up', s: 'filled' }] },
    { day: 'Wed', slots: [{ l: 'Service', s: 'filled' }, { l: 'AC install', s: 'new' }] },
    { day: 'Thu', slots: [{ l: 'Install', s: 'filled' }, { l: '', s: 'ghost' }] },
    { day: 'Fri', slots: [{ l: 'Quote', s: 'filled' }, { l: '', s: 'ghost' }] },
  ];
  return (
    <div ref={ref} className={PANEL}>
      <div className="mb-6 flex items-baseline justify-between">
        <p className="text-[13px] font-semibold text-platinum-soft">This week</p>
        <p className="text-[12px] text-mute">6 jobs booked</p>
      </div>
      <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className="grid grid-cols-5 gap-2.5">
        {week.map((col) => (
          <div key={col.day} className="space-y-2.5">
            <p className="text-center text-[11px] font-medium text-mute">{col.day}</p>
            {col.slots.map((slot, i) => (
              <motion.div
                key={i}
                variants={rise}
                className={`flex h-14 items-center justify-center rounded-xl px-1 text-center text-[10px] font-medium leading-tight ${
                  slot.s === 'new'
                    ? 'bg-elec/15 text-elec-light ring-1 ring-elec/40'
                    : slot.s === 'filled'
                    ? 'bg-white/[0.06] text-platinum'
                    : 'border border-dashed border-white/8 text-transparent'
                }`}
              >
                {slot.l || '.'}
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
      <p className="mt-6 text-[13px] leading-relaxed text-mute">
        Customers book themselves. Reminders go out. <span className="text-platinum-soft">You just show up.</span>
      </p>
    </div>
  );
}

/* FOLLOWS UP — one hero number, a few clean lines. */
export function QuotesApple() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const rows = [
    { job: 'AC install', who: 'Sarah M.', amt: '$6,800', note: 'Nudged this morning', tone: '' },
    { job: 'Panel upgrade', who: 'R. Okafor', amt: '$3,200', note: 'Follow-up scheduled', tone: '' },
    { job: 'Rewire', who: 'J. Diaz', amt: '$9,400', note: 'Needs your call', tone: 'amber' },
  ];
  return (
    <div ref={ref} className={PANEL}>
      <p className="text-[12px] uppercase tracking-[0.18em] text-mute">Open quotes, chased for you</p>
      <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        <motion.p variants={rise} className="mt-3 font-display text-6xl leading-none tracking-tight text-white sm:text-7xl">
          $19,400
        </motion.p>
        <motion.p variants={rise} className="mt-2 text-[14px] text-platinum-soft">in play right now, none of it dropped.</motion.p>
        <div className="mt-7 space-y-4">
          {rows.map((r) => (
            <motion.div key={r.job} variants={rise} className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-white">
                  {r.job} <span className="font-normal text-mute">&middot; {r.who}</span>
                </p>
                <p className={`text-[12px] ${r.tone === 'amber' ? 'text-amber-300' : 'text-mute'}`}>{r.note}</p>
              </div>
              <p className="shrink-0 text-[15px] font-semibold text-platinum">{r.amt}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* GROWS — one hero number, a few clean lines. */
export function RepeatApple() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const rows = [
    { who: 'Sarah M.', note: 'Maintenance plan due' },
    { who: 'The Patels', note: 'Annual tune-up, 9 months on' },
    { who: 'R. Okafor', note: 'Worth a referral ask' },
  ];
  return (
    <div ref={ref} className={PANEL}>
      <p className="text-[12px] uppercase tracking-[0.18em] text-mute">Customers you already earned</p>
      <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        <motion.p variants={rise} className="mt-3 font-display text-6xl leading-none tracking-tight text-white sm:text-7xl">
          11
        </motion.p>
        <motion.p variants={rise} className="mt-2 text-[14px] text-platinum-soft">ready to book again, reached out for you.</motion.p>
        <div className="mt-7 space-y-4">
          {rows.map((r) => (
            <motion.div key={r.who} variants={rise} className="flex items-center justify-between gap-4">
              <p className="text-[14px] font-semibold text-white">{r.who}</p>
              <p className="text-[13px] text-mute">{r.note}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

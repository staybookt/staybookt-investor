'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

// The doctrine's keynote, shown not told: a real-feeling text thread that plays
// out on scroll. A job gets caught and booked at 2:14 a.m. while the owner sleeps.
const THREAD = [
  { from: 'them', t: 'Hi, my AC just died and the house is 31 degrees. Can someone come today?' },
  { from: 'us', t: 'Hi Sarah, sorry to hear that. We can get a tech out today. Are you still at 14 Maple Crescent?' },
  { from: 'them', t: 'Yes that is right.' },
  { from: 'us', t: 'Great. I can do 2:00pm or 4:30pm today. Which works better?' },
  { from: 'them', t: '2pm please' },
  { from: 'us', t: "You're booked for 2pm. I'll text a reminder at 1. Anything else I can help with?" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.7, delayChildren: 0.35 } },
};
const bubble: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};
const late: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: THREAD.length * 0.7 + 0.3 } },
};

export default function CaughtCall() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl shadow-black/40 ring-1 ring-white/5"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-mute">
          <span className="h-1.5 w-1.5 rounded-full bg-hvac animate-pulse" /> AI Receptionist &middot; always on
        </span>
        <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.2em] text-hvac-light">StayBookt</span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="p-4 sm:p-5"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.2em] text-mute">Inbound &middot; 2:14 a.m.</p>
          <motion.span
            variants={late}
            className="rounded-md bg-hvac/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-hvac-light"
          >
            Booked
          </motion.span>
        </div>

        <div className="space-y-2.5">
          {THREAD.map((m, i) => (
            <motion.div key={i} variants={bubble} className={`flex ${m.from === 'us' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${
                  m.from === 'us'
                    ? 'rounded-br-sm bg-elec text-ink'
                    : 'rounded-bl-sm border border-white/10 bg-white/[0.04] text-platinum'
                }`}
              >
                {m.t}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p variants={late} className="mt-4 text-center text-[12px] text-mute">
          Answered in 4 seconds. Quoted, booked, reminder set. <span className="text-platinum-soft">You were asleep.</span>
        </motion.p>
      </motion.div>
    </div>
  );
}

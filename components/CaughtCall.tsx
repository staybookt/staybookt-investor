'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

// The doctrine's keynote, shown not told, framed as an actual phone. A job gets
// caught and booked at 2:14 a.m. while the owner sleeps.
const THREAD = [
  { from: 'them', t: 'Hi, my AC just died and the house is 31 degrees. Can someone come today?' },
  { from: 'us', t: 'Hi Sarah, sorry to hear that. We can get a tech out today. Are you still at 14 Maple Crescent?' },
  { from: 'them', t: 'Yes that is right.' },
  { from: 'us', t: 'I can do 2:00 PM or 4:30 PM today. Which works better?' },
  { from: 'them', t: '2pm please' },
  { from: 'us', t: "You're booked for 2:00 PM. I'll text a reminder at 1." },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.7, delayChildren: 0.4 } },
};
const bubble: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } },
};
const late: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE, delay: THREAD.length * 0.7 + 0.3 } },
};

export default function CaughtCall() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.35 });

  return (
    <div ref={ref} className="mx-auto w-full max-w-[300px]">
      {/* iPhone */}
      <div
        className="relative rounded-[46px] p-[10px] shadow-2xl shadow-black/60"
        style={{ background: 'linear-gradient(160deg,#1c2230,#0b0e16)', border: '1px solid rgba(255,255,255,0.10)' }}
      >
        <div className="relative overflow-hidden rounded-[38px]" style={{ background: '#070b14' }}>
          {/* dynamic island */}
          <div className="absolute left-1/2 top-2 z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />

          {/* status bar */}
          <div className="flex items-center justify-between px-6 pt-3.5 pb-1 text-[12px] font-semibold text-white">
            <span>2:14</span>
            <span className="flex items-center gap-1.5">
              <span className="flex items-end gap-[2px]" aria-hidden>
                <span className="h-1.5 w-[3px] rounded-sm bg-white/80" />
                <span className="h-2 w-[3px] rounded-sm bg-white/80" />
                <span className="h-2.5 w-[3px] rounded-sm bg-white/80" />
                <span className="h-3 w-[3px] rounded-sm bg-white/40" />
              </span>
              <span className="ml-0.5 h-3 w-6 rounded-[3px] border border-white/50 px-[1.5px] py-[2px]" aria-hidden>
                <span className="block h-full w-2/3 rounded-[1px] bg-white/80" />
              </span>
            </span>
          </div>

          {/* Messages header */}
          <div className="flex flex-col items-center border-b border-white/8 px-4 pb-3 pt-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[12px] font-bold text-white">
              SB
            </div>
            <p className="mt-1.5 text-[14px] font-semibold text-white">StayBookt</p>
            <p className="text-[10px] text-mute">answering for Top Choice Electrical</p>
          </div>

          {/* thread */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="space-y-2 px-3 py-4"
          >
            <motion.p variants={bubble} className="pb-1 text-center text-[10px] uppercase tracking-wide text-mute">
              Today 2:14 AM
            </motion.p>
            {THREAD.map((m, i) => (
              <motion.div key={i} variants={bubble} className={`flex ${m.from === 'us' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 text-[13px] leading-snug ${
                    m.from === 'us'
                      ? 'rounded-[18px] rounded-br-[5px] bg-elec text-ink'
                      : 'rounded-[18px] rounded-bl-[5px] bg-white/[0.08] text-platinum'
                  }`}
                >
                  {m.t}
                </div>
              </motion.div>
            ))}
            <motion.div variants={late} className="flex justify-end pr-1 pt-0.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-hvac/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-hvac-light">
                <span className="h-1.5 w-1.5 rounded-full bg-hvac" /> Booked &middot; 2:00 PM
              </span>
            </motion.div>
          </motion.div>

          {/* input bar */}
          <div className="flex items-center gap-2 border-t border-white/8 px-3 py-2.5">
            <div className="flex h-8 flex-1 items-center rounded-full border border-white/12 px-3 text-[12px] text-mute">
              iMessage
            </div>
            <div className="h-6 w-1 rounded-full bg-white/25" aria-hidden />
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-[13px] text-mute">
        Answered, quoted, booked, reminder set. <span className="text-platinum-soft">You were asleep.</span>
      </p>
    </div>
  );
}

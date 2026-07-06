'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion';
import { CAL_LINK } from '@/lib/site';

const EASE = [0.16, 1, 0.3, 1] as const;

// Two licensed clips (Pexels, HD). Hard work in the hands, dissolving into an
// earned sunset. The crossfade + loop live in CSS keyframes below.
const WORK_SRC = 'https://videos.pexels.com/video-files/5967519/5967519-hd_1920_1080_25fps.mp4';
const LIFE_SRC = 'https://videos.pexels.com/video-files/1966695/1966695-hd_1920_1080_30fps.mp4';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const scaleMedia = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.14]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh', background: '#050811' }}
    >
      <style>{`
        @keyframes heroCross { 0%,38%{opacity:1} 50%,88%{opacity:0} 100%{opacity:1} }
        @keyframes heroKen { from{transform:scale(1.02)} to{transform:scale(1.14)} }
      `}</style>

      {/* Cinematic media — LIFE base, WORK crossfades away to reveal it, then back. */}
      <motion.div aria-hidden style={{ scale: scaleMedia }} className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ animation: reduce ? undefined : 'heroKen 24s ease-in-out infinite alternate' }}
          src={LIFE_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            animation: reduce
              ? undefined
              : 'heroCross 15s ease-in-out infinite, heroKen 24s ease-in-out infinite alternate',
          }}
          src={WORK_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </motion.div>

      {/* Legibility + tie into the ink page below. Let the footage carry the color. */}
      <div aria-hidden className="absolute inset-0" style={{ background: 'rgba(5,8,17,0.42)' }} />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,8,17,0.72) 0%, rgba(5,8,17,0.16) 26%, rgba(5,8,17,0.24) 55%, rgba(5,8,17,0.68) 82%, #050811 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 92% at 50% 44%, rgba(0,0,0,0) 42%, rgba(5,8,17,0.5) 100%)' }}
      />

      {/* Content */}
      <motion.div
        style={{ y: yContent, opacity: fade }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-24 text-center"
      >
        <motion.p
          variants={item}
          className="mb-9 text-[11px] font-medium uppercase tracking-[0.24em] text-platinum-soft/90 sm:text-xs"
        >
          A front office that gets paid to hustle like you
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display tracking-[-0.045em] text-white"
          style={{ fontSize: 'clamp(56px, 12vw, 150px)', lineHeight: 0.9 }}
        >
          <span className="flex items-baseline justify-center">
            <span>Stay</span>
            <span className="wordmark-gradient">Bookt</span>
            <span className="text-[#7C3AED]">.</span>
          </span>
          <span className="block text-hvac">Enjoy Life.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-platinum sm:text-xl"
        >
          You built this for a life, not a phone that never stops ringing. We take the whole front office off your
          hands, and only get paid when it brings you work.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6"
        >
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-ink transition-colors duration-200 hover:bg-white/90"
          >
            Book a 30-minute call
          </a>
          <a
            href="#m1"
            className="inline-flex items-center gap-2 text-base text-platinum-soft transition-colors hover:text-white"
          >
            See it run <span aria-hidden>{'↓'}</span>
          </a>
        </motion.div>

        <motion.p variants={item} className="mt-5 text-[13px] text-mute">
          30 minutes with a founder. No pitch deck. No lock-in.
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-mute"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-base"
        >
          {'↓'}
        </motion.div>
      </motion.div>
    </section>
  );
}

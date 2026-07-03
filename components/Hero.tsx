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

      {/* Legibility + tie into the ink page below. */}
      <div aria-hidden className="absolute inset-0" style={{ background: 'rgba(5,8,17,0.40)' }} />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,8,17,0.72) 0%, rgba(5,8,17,0.14) 26%, rgba(5,8,17,0.22) 55%, rgba(5,8,17,0.66) 82%, #050811 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 92% at 50% 42%, rgba(0,0,0,0) 40%, rgba(5,8,17,0.5) 100%)' }}
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
          className="mb-8 inline-flex items-center gap-2.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.34em]"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-elec animate-pulse" aria-hidden />
          <span className="text-platinum-soft">The front office that runs itself</span>
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display tracking-[-0.045em]"
          style={{ fontSize: 'clamp(56px, 12vw, 150px)', lineHeight: 0.92, textShadow: '0 4px 60px rgba(0,0,0,0.45)' }}
        >
          <span className="flex items-baseline justify-center">
            <span className="text-white">Stay</span>
            <span className="wordmark-gradient">Bookt</span>
            <span style={{ color: '#7C3AED' }}>.</span>
          </span>
          <span className="block text-brand-gradient">Enjoy Life.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-9 max-w-xl text-lg leading-relaxed text-platinum-soft sm:text-xl"
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}
        >
          We build and run the entire front office for your service business. You get the work, and the life, back.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-elec to-hvac px-8 py-4 text-base font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_-8px_rgba(6,182,212,0.7)] sm:text-lg"
          >
            Book a 30-minute call
            <span aria-hidden className="transition-transform group-hover:translate-x-1">{'→'}</span>
          </a>
          <a
            href="#m1"
            className="inline-flex items-center gap-2 px-5 py-4 text-sm text-platinum-soft transition-colors hover:text-white sm:text-base"
          >
            See it run <span aria-hidden>{'↓'}</span>
          </a>
        </motion.div>
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

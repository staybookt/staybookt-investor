'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion';
import { CAL_LINK, PRICING } from '@/lib/site';

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 px-6 sm:px-12"
    >
      {/* Photographic atmosphere, graded into the ink so it reads as depth, not stock. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=70"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(100% 70% at 50% 0%, rgba(5,8,17,0.55), rgba(5,8,17,0.9) 70%), linear-gradient(180deg, rgba(5,8,17,0.78) 0%, rgba(5,8,17,0.94) 55%, #050811 100%)',
          }}
        />
      </div>

      {/* Aurora background — two parallax layers of drifting gradient blobs. */}
      <motion.div aria-hidden style={{ y: y1 }} className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-48 -left-32 h-[40rem] w-[40rem] rounded-full blur-[90px] opacity-40"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(6,182,212,0.5), rgba(6,182,212,0) 70%)' }}
          animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <motion.div aria-hidden style={{ y: y2 }} className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full blur-[90px] opacity-35"
          style={{ background: 'radial-gradient(circle at 60% 40%, rgba(16,185,129,0.45), rgba(16,185,129,0) 70%)' }}
          animate={reduce ? undefined : { x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hidden sm:block absolute -bottom-56 left-1/4 h-[38rem] w-[38rem] rounded-full blur-[100px] opacity-25"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.45), rgba(124,58,237,0) 70%)' }}
          animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        style={{ y: yContent, opacity: fade }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-6xl mx-auto w-full text-center"
      >
        <motion.p
          variants={item}
          className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold mb-8 inline-flex items-center gap-2.5 justify-center"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-elec animate-pulse" aria-hidden />
          <span className="text-platinum-soft">The front office that runs itself</span>
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-[52px] sm:text-[88px] lg:text-[128px] leading-[0.98] tracking-[-0.04em] mb-9"
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
          className="text-platinum-soft text-base sm:text-lg lg:text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          We build and run the entire front office for your service business, and we only get paid when it brings you work.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12"
        >
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-elec to-hvac text-ink font-bold px-8 py-4 rounded-lg text-base sm:text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(6,182,212,0.6)]"
          >
            Book a 30-minute call
            <span aria-hidden className="transition-transform group-hover:translate-x-1">{'→'}</span>
          </a>
          <a
            href="#m1"
            className="inline-flex items-center gap-2 text-platinum-soft hover:text-white text-sm sm:text-base px-5 py-4 transition-colors"
          >
            See it run
            <span aria-hidden>{'↓'}</span>
          </a>
        </motion.div>

        <motion.p variants={item} className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase">
          <span className="text-white font-bold">Starting at {PRICING.build}</span>{' '}
          <span className="text-mute">to launch</span>
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-mute"
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

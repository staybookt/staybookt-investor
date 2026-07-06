'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  type MotionValue,
} from 'framer-motion';
import { useStaticFallback } from '@/lib/useReducedMotion';

/* A pinned, scroll-scrubbed product moment. The outer section is TALL (~220vh);
 * an inner sticky container holds the copy + device and stays pinned in the
 * viewport while the section scrolls. useScroll gives progress 0->1 across the
 * scroll of the tall section, which is handed to the device render-prop to drive
 * its animation. On reduced-motion / narrow viewports we drop the pin and the
 * scrub entirely: a static centered layout, device told to show its final state
 * (progress fixed at 1). */
export default function ProductScrub({
  eyebrow,
  headline,
  sub,
  reverse = false,
  signature = false,
  device,
}: {
  eyebrow: string;
  headline: ReactNode;
  sub: ReactNode;
  reverse?: boolean;
  signature?: boolean;
  device: (progress: MotionValue<number>) => ReactNode;
}) {
  const staticMode = useStaticFallback();
  const tallRef = useRef<HTMLDivElement | null>(null);

  // Always create both a scroll-driven and a constant progress; pick per mode so
  // hook order stays stable.
  const still = useMotionValue(1);
  const { scrollYProgress } = useScroll({
    target: tallRef,
    offset: ['start start', 'end end'],
  });
  const progress = staticMode ? still : scrollYProgress;

  // Copy fades/settles across the first sixth of the scrub so it lands before
  // the device finishes assembling.
  const copyOpacity = useTransform(scrollYProgress, [0, 0.14, 1], [0, 1, 1]);
  const copyY = useTransform(scrollYProgress, [0, 0.18], [26, 0]);

  const cls = `product${reverse ? ' reverse' : ''}${signature ? ' signature' : ''}`;

  if (staticMode) {
    return (
      <section className={cls}>
        <div className="aura" />
        <div className="wrap grid">
          <div className="reveal in">
            <div className="eyebrow">{eyebrow}</div>
            <h2>{headline}</h2>
            <p className="sub">{sub}</p>
          </div>
          <div className="reveal in visual">{device(progress)}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${cls} pin-tall`}>
      <div ref={tallRef} className="pin-track">
        <div className="pin-sticky">
          <div className="aura" />
          {signature ? <SignatureBackdrop progress={scrollYProgress} /> : null}
          <div className="wrap grid">
            <motion.div style={{ opacity: copyOpacity, y: copyY }}>
              <div className="eyebrow">{eyebrow}</div>
              <h2>{headline}</h2>
              <p className="sub">{sub}</p>
            </motion.div>
            <div className="visual">{device(progress)}</div>
          </div>
          {signature ? <SignatureResolve progress={scrollYProgress} /> : null}
        </div>
      </div>
    </section>
  );
}

/* The 2 AM backdrop: near-black wash + large muted timestamp that dims as the
 * phone lights up. */
function SignatureBackdrop({ progress }: { progress: MotionValue<number> }) {
  const tsOpacity = useTransform(progress, [0, 0.12, 0.4], [0.9, 0.7, 0.16]);
  const tsScale = useTransform(progress, [0, 0.4], [1, 0.94]);
  return (
    <motion.div
      className="sig-time"
      style={{ opacity: tsOpacity, scale: tsScale }}
      aria-hidden="true"
    >
      2:14 AM
    </motion.div>
  );
}

/* The resolve line, revealed near the end of the scrub. */
function SignatureResolve({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.82, 0.96], [0, 1]);
  const scale = useTransform(progress, [0.82, 1], [0.965, 1]);
  const y = useTransform(progress, [0.82, 1], [18, 0]);
  return (
    <motion.p className="sig-resolve" style={{ opacity, scale, y }}>
      And you slept right through it.
    </motion.p>
  );
}

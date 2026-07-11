'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useMotionValue, animate } from 'framer-motion';
import { ScrubContext } from './ProductScrub';

/* Drives a product surface (Receptionist, Dashboard) that reads a 0->1 progress
 * MotionValue from ScrubContext. Instead of tying that progress to scroll
 * position (which lagged on desktop and was removed), we play it ONCE as a
 * timed tween the first time the surface scrolls into view. Smooth, no jank.
 * Reduced-motion jumps straight to the final state. */
export default function PlayOnView({ children, duration = 2.6 }: { children: ReactNode; duration?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mv = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      mv.set(1);
      return;
    }
    let played = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !played) {
            played = true;
            animate(mv, 1, { duration, ease: [0.16, 1, 0.3, 1] });
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [duration, mv]);

  return (
    <div ref={ref}>
      <ScrubContext.Provider value={mv}>{children}</ScrubContext.Provider>
    </div>
  );
}

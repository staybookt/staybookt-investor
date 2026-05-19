'use client';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/* === Page Transition Wrapper ============================
 * Wraps page content with a quick crossfade so navigating
 * /how-it-works → /proof doesn't snap-load.
 * ====================================================== */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* === Cursor Follower, subtle accent dot ==============
 * Lags the cursor by ~80ms via spring physics. Hidden on
 * touch devices. Respects prefers-reduced-motion.
 * ====================================================== */
export function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 24, stiffness: 280, mass: 0.5 });
  const springY = useSpring(y, { damping: 24, stiffness: 280, mass: 0.5 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // mobile/touch, skip
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 8);
      y.set(e.clientY - 8);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      className="pointer-events-none fixed z-[100] w-4 h-4 rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        background: 'rgba(245, 158, 11, 0.6)',
      }}
    />
  );
}

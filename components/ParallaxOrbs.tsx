'use client';

import { useReducedMotion, useScroll, useTransform, motion } from 'framer-motion';

export default function ParallaxOrbs() {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  // Drift at 0.4x scroll speed over the first 1200px of scroll
  const y1 = useTransform(scrollY, [0, 1200], [0, -480]);
  const y2 = useTransform(scrollY, [0, 1200], [0, -480]);

  if (reduced) return null;

  return (
    <>
      {/* Cyan orb — upper left */}
      <motion.div
        aria-hidden="true"
        style={{
          y: y1,
          position: 'fixed',
          top: '-80px',
          left: '-80px',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.2) 0%, transparent 70%)',
          filter: 'blur(48px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Emerald orb — lower right */}
      <motion.div
        aria-hidden="true"
        style={{
          y: y2,
          position: 'fixed',
          bottom: '-120px',
          right: '-120px',
          width: '640px',
          height: '640px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.16) 0%, transparent 70%)',
          filter: 'blur(56px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}

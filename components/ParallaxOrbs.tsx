'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';

export default function ParallaxOrbs() {
  const reduced = useReducedMotion();
  const scrollY = useMotionValue(0);
  const y1 = useTransform(scrollY, [0, 1200], [0, -480]);
  const y2 = useTransform(scrollY, [0, 1200], [0, -480]);

  useEffect(() => {
    if (reduced) return;
    const update = () => scrollY.set(window.scrollY);
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [reduced, scrollY]);

  if (reduced) return null;

  return (
    <>
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

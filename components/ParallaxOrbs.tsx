'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxOrbs() {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('[ParallaxOrbs] mount — orb1:', !!orb1.current, 'orb2:', !!orb2.current);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('[ParallaxOrbs] reduced motion, skipping');
      return;
    }

    let ticks = 0;
    const tick = () => {
      ticks++;
      const drift = -(window.scrollY / 1200) * 480;
      const t = `translateY(${drift}px)`;
      if (ticks === 1 || ticks % 30 === 0) {
        console.log(`[ParallaxOrbs] tick #${ticks}`, { scrollY: window.scrollY, transform: t, orb1: !!orb1.current, orb2: !!orb2.current });
      }
      if (orb1.current) orb1.current.style.transform = t;
      if (orb2.current) orb2.current.style.transform = t;
    };

    console.log('[ParallaxOrbs] attaching scroll listener');
    window.addEventListener('scroll', tick, { passive: true });
    return () => {
      console.log('[ParallaxOrbs] cleanup — removing scroll listener');
      window.removeEventListener('scroll', tick);
    };
  }, []);

  return (
    <>
      <div
        ref={orb1}
        aria-hidden="true"
        style={{
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
          willChange: 'transform',
        }}
      />
      <div
        ref={orb2}
        aria-hidden="true"
        style={{
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
          willChange: 'transform',
        }}
      />
    </>
  );
}

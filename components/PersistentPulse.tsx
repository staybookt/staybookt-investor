'use client';

import { useEffect, useRef, useState } from 'react';

const PULSE_SMS = 'sms:+16474908937';

/**
 * PersistentPulse — the Pulse signature that travels with you.
 *
 * v2 fixes:
 * - Anchor now inline-flex w-fit so the hit area is the badge,
 *   not the entire bottom strip of the viewport.
 * - Intent-aware: hides during active scroll, appears after the
 *   visitor pauses for 1.2s. Less "chat widget", more "thoughtful
 *   invitation."
 * - Still hides near hero (so it does not duplicate the ring) and
 *   near footer (so it does not compete with final CTAs).
 */
export default function PersistentPulse() {
  const [visible, setVisible] = useState(false);
  const pauseTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function clearPauseTimer() {
      if (pauseTimerRef.current) {
        window.clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = null;
      }
    }

    function inWindow() {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const fromTop = scrollY > vh * 0.75;
      const fromBottom = scrollY < docHeight - vh * 1.2;
      return fromTop && fromBottom;
    }

    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;

        setVisible(false);
        clearPauseTimer();

        if (inWindow()) {
          pauseTimerRef.current = window.setTimeout(() => {
            if (inWindow()) setVisible(true);
            pauseTimerRef.current = null;
          }, 1200);
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearPauseTimer();
    };
  }, []);

  return (
    <a
      href={PULSE_SMS}
      aria-label="Text Pulse for your free diagnostic"
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 inline-flex w-fit transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
      }`}
    >
      <div className="relative group">
        <div
          className="absolute inset-0 rounded-full border border-elec/40"
          style={{ animation: 'pulse-breath 2.8s ease-in-out infinite' }}
          aria-hidden
        />
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-ink-deep border border-elec/50 rounded-full shadow-2xl shadow-elec/20 flex flex-col items-center justify-center group-hover:scale-105 group-hover:border-elec transition-all">
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] uppercase font-bold text-elec leading-tight">
            Run
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] uppercase font-bold text-elec leading-tight">
            Pulse
          </span>
        </div>
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-2 bg-ink-deep border border-divider/60 rounded-lg whitespace-nowrap text-xs text-platinum-soft shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Free diagnostic to (647) 490-8937
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse-breath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.18);
            opacity: 0.2;
          }
        }
      `}</style>
    </a>
  );
}

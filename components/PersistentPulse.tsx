'use client';

import { useEffect, useState } from 'react';

const PULSE_SMS = 'sms:+16474908937';

/**
 * PersistentPulse — the Pulse signature that travels with you.
 * Hidden during the hero (when the big signal ring is in view).
 * Appears as a small breathing badge in the bottom-right after the
 * visitor scrolls past the hero. Tappable → opens the SMS sheet.
 *
 * Hides itself near the footer / close section so it does not
 * compete with the final CTAs.
 */
export default function PersistentPulse() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;
        const scrollY = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const fromTop = scrollY > vh * 0.75;
        const fromBottom = scrollY < docHeight - vh * 1.2;
        setVisible(fromTop && fromBottom);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <a
      href={PULSE_SMS}
      aria-label="Text Pulse for your free diagnostic"
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
      }`}
    >
      <div className="relative group">
        <div
          className="absolute inset-0 rounded-full border border-elec/40"
          style={{
            animation: 'pulse-breath 2.8s ease-in-out infinite',
          }}
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

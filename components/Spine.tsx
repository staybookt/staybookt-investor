'use client';

import { useEffect, useState } from 'react';

// The managed-journey spine. A fixed chapter rail down the left edge, present
// in every moment, so four sections read as one guided flow. The active
// chapter's tick lights up in the brand gradient as you scroll.
const CHAPTERS = ['00', '01', '02', '03'];

export default function Spine() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = CHAPTERS.map((_, i) => document.getElementById(`m${i}`)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i);
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-4 xl:left-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-7 lg:flex"
    >
      {CHAPTERS.map((n, i) => {
        const on = i === active;
        return (
          <div key={n} className="flex items-center gap-3">
            <span
              className="h-px transition-all duration-500"
              style={{
                width: on ? 28 : 16,
                background: on
                  ? 'linear-gradient(90deg, #06B6D4, #10B981)'
                  : 'rgba(148,163,184,0.25)',
              }}
            />
            <span
              className={`font-display text-sm tabular-nums transition-colors duration-500 ${
                on ? 'text-white' : 'text-white/25'
              }`}
            >
              {n}
            </span>
          </div>
        );
      })}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

// The managed-journey spine. A fixed chapter rail down the left edge, one
// continuous line with four nodes, present in every moment so the page reads
// as one guided flow. The active chapter lights up in the brand gradient.
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
      className="pointer-events-none fixed left-4 xl:left-9 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative">
        <span
          className="absolute left-0 top-3 bottom-3 w-px"
          style={{ background: 'rgba(148,163,184,0.18)' }}
        />
        <div className="flex flex-col gap-9">
          {CHAPTERS.map((n, i) => {
            const on = i === active;
            return (
              <div key={n} className="flex items-center gap-3">
                <span
                  className="h-px transition-all duration-500"
                  style={{
                    width: on ? 28 : 14,
                    background: on
                      ? 'linear-gradient(90deg, #06B6D4, #10B981)'
                      : 'rgba(148,163,184,0.35)',
                  }}
                />
                <span
                  className={`font-display text-xs tabular-nums transition-colors duration-500 ${
                    on ? 'text-white' : 'text-white/30'
                  }`}
                >
                  {n}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

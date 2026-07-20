'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type Delay = 1 | 2 | 3;

/* Mirrors the v4 mockup .reveal: fades + slides children up when scrolled into
 * view (threshold .15), then unobserves. Optional delay maps to d1/d2/d3.
 *
 * THE TIMING IS NOT IN THIS FILE. This component only toggles the class; the duration, the
 * travel and the d1/d2/d3 stagger are all CSS, in globals.css. Below 760px they are retuned
 * (1s and 60/120/180ms become 620ms and 40/80/120ms, travel 28px becomes 18px) because a
 * section fills a 390px viewport and crosses the .15 threshold the instant it appears, so the
 * desktop timing spends a full second catching up with the thumb. Change it there, in the
 * phone pass at the end of globals.css, not here: the mobile block is nested inside
 * prefers-reduced-motion:no-preference and a JS duration would escape that. */
export default function Reveal({
  children,
  delay,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  delay?: Delay;
  className?: string;
  as?: 'div' | 'section';
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const d = delay ? ` d${delay}` : '';
  const cls = `reveal${d}${inView ? ' in' : ''}${className ? ` ${className}` : ''}`;
  const Tag = as;
  return (
    <Tag ref={ref} className={cls}>
      {children}
    </Tag>
  );
}

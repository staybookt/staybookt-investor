'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type Delay = 1 | 2 | 3;

/* Mirrors the v4 mockup .reveal: fades + slides children up when scrolled into
 * view (threshold .15), then unobserves. Optional delay maps to d1/d2/d3. */
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

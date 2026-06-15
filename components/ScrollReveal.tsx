'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    console.log('[ScrollReveal] mount — ref.current:', ref.current);
    const el = ref.current;
    if (!el) {
      console.log('[ScrollReveal] ref is null, bailing');
      return;
    }

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    console.log('[ScrollReveal] reduced-motion matches:', mq.matches);
    if (mq.matches) {
      setReduced(true);
      setRevealed(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    console.log('[ScrollReveal] getBCR:', { top: rect.top, bottom: rect.bottom, height: rect.height, vh: window.innerHeight });

    const obs = new IntersectionObserver(
      ([entry]) => {
        console.log('[ScrollReveal] IO callback — isIntersecting:', entry.isIntersecting, 'ratio:', entry.intersectionRatio);
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    console.log('[ScrollReveal] observer attached');
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(24px)',
        transition: reduced
          ? 'none'
          : `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

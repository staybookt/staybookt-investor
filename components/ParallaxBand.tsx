'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/* Full-bleed sunset band. The image drifts with scroll (translateY of the
 * band's viewport top * -0.06), mirroring the mockup's parallax. The headline
 * reveals on scroll-in like the mockup's .reveal. */
export default function ParallaxBand({ src, children }: { src: string; children: ReactNode }) {
  const bandRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const onScroll = () => {
      const r = band.getBoundingClientRect();
      setOffset(r.top * -0.06);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 },
    );
    io.observe(band);

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div className="life-band" ref={bandRef}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ transform: `translateY(${offset}px)` }} />
      <div className="ov" />
      <h2 className={`reveal${inView ? ' in' : ''}`}>{children}</h2>
    </div>
  );
}

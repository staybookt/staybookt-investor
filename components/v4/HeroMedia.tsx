'use client';

import { useEffect, useState } from 'react';

/* THE HOMEPAGE HERO SHIPPED A 1.24MB VIDEO TO EVERY PHONE, AND IT NEVER PLAYED.
 *
 * Measured on a real 390px viewport (July 2026): hero-loop.mp4 is 1,271KB. Three and a half
 * seconds after load it was still readyState 0, paused, networkState 2 — i.e. the visitor is
 * looking at the 38KB poster and will have scrolled past the hero long before a frame
 * arrives. So a phone paid for 1.24MB of nothing. Meanwhile /work says "Built to open fast
 * on a phone", which made this a claim as well as a cost.
 *
 * A phone gets the poster. It is the same first frame, it is 3% of the bytes, and it is what
 * the visitor was seeing anyway. A desktop gets the film.
 *
 * WHY JS AND NOT CSS: you cannot conditionally *load* a video with a media query. <source
 * media> is unreliable for this and the browser may still fetch. The only way to not pay for
 * the bytes is to not mount the element, which needs the client.
 *
 * The poster renders on the server for everyone, so there is no blank hero on first paint and
 * no layout shift: the video mounts on top of it, only above the breakpoint.
 *
 * 760px matches the film's own mobile breakpoints. If you move one, move the other.
 */
export default function HeroMedia() {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 761px)');
    /* Also respect reduced motion: a looping background film is exactly what that setting is
       for, and the poster is a complete substitute. */
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setWide(mq.matches && !rm.matches);
    set();
    mq.addEventListener('change', set);
    rm.addEventListener('change', set);
    return () => { mq.removeEventListener('change', set); rm.removeEventListener('change', set); };
  }, []);

  return (
    <>
      {/* Server-rendered for everyone. On a phone this is the whole hero. */}
      <img src="/hero-poster.jpg" alt="" fetchPriority="high" decoding="async" />
      {wide && (
        /* ?v=2 busts the CDN + browser cache. The file was re-cut to 12.4s to drop the dough
           and laptop clips, but the old copy was still served under the identical URL. */
        <video autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg" src="/hero-loop.mp4?v=2" />
      )}
    </>
  );
}

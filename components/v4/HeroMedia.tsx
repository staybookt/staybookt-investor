'use client';

import { useEffect, useState } from 'react';

/* THE HOMEPAGE HERO SHIPPED A 1.24MB VIDEO TO EVERY PHONE, AND IT NEVER PLAYED.
 *
 * Measured on a real 390px viewport (July 2026): hero-loop.mp4 is 1,271KB. Three and a half
 * seconds after load it was still readyState 0, paused, networkState 2, so the visitor is
 * looking at the still and will have scrolled past the hero long before a frame arrives. A
 * phone paid for 1.24MB of nothing. /work also says "built to open fast on a phone", which
 * made this a claim as well as a cost.
 *
 * WE ARE NOT GOING TO FIX THAT BY ENGINEERING THE VIDEO HARDER. iOS Low Power Mode blocks
 * autoplay outright, even with muted + playsInline + autoplay, and draws a tap-to-play button
 * over the hero instead. Our reader is an owner-operator on a phone that has been off the
 * charger since six in the morning: Low Power Mode is close to their default state. The
 * failure mode is not a slow video, it is a play button on our first impression.
 *
 * So a phone gets a still, on purpose, and the still gets a slow ken-burns drift. Motion by
 * CSS transform costs zero bytes, is never blocked by Low Power Mode, and reads as
 * deliberate. That is the cinematic feel the video was there for, on every phone, every time.
 *
 * WHY JS AND NOT CSS FOR THE VIDEO: you cannot conditionally *load* a video with a media
 * query. <source media> is unreliable and the browser may still fetch. The only way to not
 * pay the bytes is to not mount the element, which needs the client.
 *
 * The still renders on the server for everyone, so there is no blank hero on first paint and
 * no layout shift: the video mounts on top of it, only above the breakpoint.
 *
 * 760px matches the films' own mobile breakpoints. If you move one, move the other.
 */

type Props = {
  /** The still. Each page picks its own, because the two heroes argue different things. */
  poster: string;
  /** The still's intrinsic pixel size. Required in practice, defaulted to the only still in
   *  use (public/hero-home.jpg, 1800x1200) so an existing caller cannot break.
   *  This is the LCP element on every phone. Without a width and a height the browser has no
   *  aspect ratio for it until the bytes arrive, and the hero grows on decode. Pass the real
   *  numbers for a new poster, do not inherit these. */
  posterW?: number;
  posterH?: number;
  /** Alt stays empty: these are mood, not information. The headline carries the meaning. */
  video?: string;
};

export default function HeroMedia({ poster, video, posterW = 1800, posterH = 1200 }: Props) {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 761px)');
    /* Reduced motion kills the film AND the drift. A looping background is exactly what that
       setting is for, and the still alone is a complete substitute. */
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setWide(mq.matches && !rm.matches);
    set();
    mq.addEventListener('change', set);
    rm.addEventListener('change', set);
    return () => { mq.removeEventListener('change', set); rm.removeEventListener('change', set); };
  }, []);

  return (
    <>
      <img
        className="hm-still"
        src={poster}
        alt=""
        width={posterW}
        height={posterH}
        fetchPriority="high"
        decoding="async"
      />
      {wide && video && (
        <video autoPlay muted loop playsInline preload="auto" poster={poster} src={video} />
      )}
    </>
  );
}

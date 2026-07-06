'use client';

import { useEffect, useState } from 'react';

/* True when the user prefers reduced motion OR the viewport is below the
 * pin-scrub breakpoint (820px). In either case, product moments fall back to a
 * simple on-view reveal with all content shown, and pinned scrubbing is off. */
export function useStaticFallback(): boolean {
  const [staticMode, setStaticMode] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 819px)');
    const update = () => setStaticMode(reduce.matches || narrow.matches);
    update();
    reduce.addEventListener('change', update);
    narrow.addEventListener('change', update);
    return () => {
      reduce.removeEventListener('change', update);
      narrow.removeEventListener('change', update);
    };
  }, []);

  return staticMode;
}

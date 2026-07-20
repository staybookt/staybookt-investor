'use client';

import { useEffect } from 'react';

/* ARROW KEYS SCROLL LIKE A WHEEL.
 *
 * Richard navigates this site with the down arrow, not a mouse. Chrome scrolls ~40px per
 * arrow press; one wheel notch is ~100px. So a keyboard reader was doing 2.5x the input for
 * the same journey — on a site that is mostly scroll-driven film. That is the whole of his
 * "still slow when using the down arrow... seems fine if using the scroll bar" note. The
 * films were tuned to make every press MOVE something, which was necessary but not
 * sufficient: the press was still worth 40px.
 *
 * STEP is 100 on purpose: it is Chrome's wheel delta. One arrow press = one wheel notch, so
 * the keyboard and the mouse walk the film at the same rate and see the same thing. It is
 * not a number we picked by feel, and it is why this is not "faster scrolling" but parity.
 *
 * The easing matters as much as the distance. A raw 100px jump per press strobes; the films
 * read position every frame, so we animate toward an accumulating target and let them track
 * it continuously. Holding the key down accumulates rather than queueing.
 *
 * Deliberately does NOT touch: PageUp/PageDown, Space, Home/End (all native and correct),
 * any modifier combo, or anything typed into a field. Reduced-motion bails entirely — an
 * animated scroll is exactly what that setting is about, and native 40px is fine there.
 */
const STEP = 100;
const EASE = 0.2;

export default function ArrowScroll() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let target = window.scrollY;
    let running = false;
    let raf = 0;

    const maxY = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const tick = () => {
      const cur = window.scrollY;
      const d = target - cur;
      if (Math.abs(d) < 0.5) {
        running = false;
        return;
      }
      /* 'instant' is load-bearing: globals.css sets scroll-behavior:smooth, and without this
         the browser would run its own animation against ours and the page would fight itself. */
      window.scrollTo({ top: cur + d * EASE, behavior: 'instant' });
      raf = requestAnimationFrame(tick);
    };

    const typing = (t: EventTarget | null) => {
      if (!(t instanceof HTMLElement)) return false;
      if (t.isContentEditable) return true;
      if (/^(INPUT|TEXTAREA|SELECT|OPTION)$/.test(t.tagName)) return true;
      const r = t.getAttribute('role');
      return r === 'listbox' || r === 'menu' || r === 'menuitem' || r === 'combobox';
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (typing(e.target)) return;
      /* The nav sheet locks body scroll while open; leave the keys alone under it. */
      if (document.body.style.overflow === 'hidden') return;
      /* The growth quiz owns the keys while its journey is live, so an arrow press advances the quiz instead of double-scrolling; see GrowthQuiz.tsx. */
      if (document.body.dataset.quizActive === '1') return;

      e.preventDefault();
      if (!running) target = window.scrollY; // resync after a wheel/drag/anchor jump
      target = Math.max(0, Math.min(maxY(), target + (e.key === 'ArrowDown' ? STEP : -STEP)));
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    /* Any other scroll input wins immediately — never fight the user's hand. */
    const yield_ = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', yield_, { passive: true });
    window.addEventListener('touchstart', yield_, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', yield_);
      window.removeEventListener('touchstart', yield_);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

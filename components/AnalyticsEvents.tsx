'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/* Fires custom GA4 events for the two things that matter on a lead site:
 * clicks on the Book-a-call / email CTAs, and how far people scroll.
 * Completely inert until NEXT_PUBLIC_GA_ID is set (window.gtag undefined). */
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const text = (a.textContent || '').trim().slice(0, 60);
      if (/cal\.com|calendly/i.test(href) || /book a .*call/i.test(text)) {
        window.gtag?.('event', 'book_call_click', { link_text: text, page: location.pathname });
      } else if (href.startsWith('mailto:')) {
        window.gtag?.('event', 'email_click', { page: location.pathname });
      }
    };

    const marks = [25, 50, 75, 100];
    const hit = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.round((window.scrollY / total) * 100);
      for (const m of marks) {
        if (pct >= m && !hit.has(m)) {
          hit.add(m);
          window.gtag?.('event', 'scroll_depth', { percent: m, page: location.pathname });
        }
      }
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}

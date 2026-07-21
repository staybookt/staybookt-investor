'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';
import { captureFirstTouch } from '@/lib/attribution';

/* Fires custom GA4 events for the things that matter on a lead site: clicks on
 * the Book-a-call / email CTAs, WHICH CTA was clicked, taps on the mobile call
 * bar, and how far people scroll. Completely inert until NEXT_PUBLIC_GA_ID is
 * set: track() no-ops when window.gtag is undefined.
 *
 * CTA CLICKS ARE DELEGATED, NOT WIRED PER COMPONENT. One listener on the
 * document reads a data-cta attribute off the nearest anchor. That is on
 * purpose: HeroCta, the pricing button and the 404 are SERVER components with no
 * 'use client' directive, and giving them onClick handlers would force every one
 * of them into a client bundle to record a click we can already see from here.
 * To instrument a new button, add data-cta="somewhere" to the anchor. Nothing
 * else.
 *
 * It also runs the first touch attribution capture, because this is the one
 * client component mounted on every page in the layout. That capture is NOT
 * gated on analytics: it feeds the cal.com booking record, which is a business
 * record rather than a metric, and it has to work whether or not GA is on. */
export default function AnalyticsEvents() {
  useEffect(() => {
    captureFirstTouch();

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const text = (a.textContent || '').trim().slice(0, 60);
      const cta = a.getAttribute('data-cta');

      if (cta === 'call_bar_call') {
        /* The phone-only tap-to-call bar, kept distinct from a desktop tel link:
           on a phone this is one thumb away at all times, so its rate says
           something different. */
        track('call_bar_call');
        return;
      }
      if (cta === 'leak_check') {
        /* The harvest close at the bottom of the Leak Check. Its own event so the
           quiz funnel reads end to end in one report. */
        track('leak_check_cta');
        return;
      }
      if (cta) {
        track('cta_click', { location: cta, link_text: text });
        return;
      }

      if (/cal\.com|calendly/i.test(href) || /book a .*call/i.test(text)) {
        track('book_call_click', { link_text: text });
      } else if (href.startsWith('mailto:')) {
        track('email_click');
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
          track('scroll_depth', { percent: m });
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

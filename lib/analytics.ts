/* THE ONE WAY THIS SITE SENDS AN EVENT.
 *
 * Every component that wants to record something calls track(). Nothing else
 * touches window.gtag directly, so there is exactly one place that knows how an
 * event is shaped and exactly one place that has to be safe when analytics is
 * not loaded.
 *
 * INERT BY DEFAULT, ON PURPOSE. components/Analytics.tsx renders nothing unless
 * NEXT_PUBLIC_GA_ID is set, which means window.gtag is undefined on a local dev
 * machine, in a preview deploy, and in any environment where the key was never
 * pasted. track() no-ops there. It never throws and never queues, so a page with
 * analytics off behaves exactly like a page with analytics on, minus the network
 * call.
 *
 * The gtag declaration lives here rather than in AnalyticsEvents.tsx because
 * this is now the module that owns the call. */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackParams = Record<string, string | number | boolean | undefined>;

export function track(name: string, params: TrackParams = {}): void {
  if (typeof window === 'undefined') return;
  const gtag = window.gtag;
  if (typeof gtag !== 'function') return;
  try {
    gtag('event', name, { page: window.location.pathname, ...params });
  } catch {
    /* Analytics must never be able to break a page. */
  }
}

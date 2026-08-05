'use client';

import { useEffect } from 'react';
import { getAttribution, toCalUtm } from '@/lib/attribution';
import { track } from '@/lib/analytics';

/* Official Cal.com inline embed. Loads embed.js at runtime (no npm dependency),
 * renders the team/staybookt/talk-to-a-founder calendar inline, and auto-resizes
 * so there is no iframe scrollbar. Brand accent set to StayBookt green. */
export default function CalEmbed() {
  useEffect(() => {
    const w = window as any;
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(w, 'https://app.cal.com/embed/embed.js', 'init');

    w.Cal('init', 'talk', { origin: 'https://cal.com' });

    /* BOOKING ATTRIBUTION. WHERE JACOB FINDS IT: open the booking in cal.com,
     * Bookings -> the booking -> details. Cal.com automatically records
     * utm_source, utm_medium, utm_campaign, utm_term and utm_content on every
     * booking made through an embed that passes them in `config`, with no setup
     * on the cal.com side at all. They also come through on the booking webhook
     * and the CSV export.
     *
     * WHAT WE PASS. lib/attribution.ts stored the visitor's FIRST touch on their
     * first page view: real UTM tags if they arrived with them, otherwise the
     * referring host and the landing path. toCalUtm turns that into the five
     * standard fields. So a booking reads, for example,
     *   utm_source: google.com / utm_medium: referral / utm_campaign: landing:/how-it-works
     * which answers the only question worth asking about this site: which page
     * produced the call.
     *
     * THE TWO sb_ FIELDS BELOW ARE OPTIONAL AND CURRENTLY INERT. Cal.com only
     * keeps NON standard params if a matching hidden booking question exists on
     * the event type. To turn them on: cal.com -> Event Types ->
     * talk-to-a-founder -> Advanced -> Booking questions -> Add, Short Text,
     * identifier `sb_landing` (and `sb_referrer`), toggled Hidden and not
     * required. Until then cal.com ignores them, which is why they are safe to
     * send now.
     *
     * Nothing here is personal data: no name, no email, nothing the visitor
     * typed. It is a page path and a referring domain. */
    const attr = getAttribution();
    const config: Record<string, string> = {
      ...toCalUtm(attr),
      ...(attr ? { sb_landing: attr.landing, sb_referrer: attr.referrer } : {}),
      /* Theme ALSO pinned here, not just in the ui() call below: the rebuilt free-plan embed
         (Aug 2026) ignored the ui() theme and rendered dark inside our white card. Newer
         embed versions read theme from the inline config. */
      theme: 'light',
    };

    w.Cal.ns.talk('inline', {
      elementOrSelector: '#cal-inline',
      /* WAS 'team/staybookt/talk-to-a-founder'. The cal.com Teams trial ended Aug 2026 and
         team links die with it — the embed rendered a blank white box for EVERYONE. Rebuilt
         as a personal event on the free plan (same account, bookings land on the
         info@staybookt.com Google calendar). If a Teams plan ever comes back, revisit for
         round-robin between the founders. */
      calLink: 'staybookt/talk-to-a-founder',
      layout: 'month_view',
      config,
    });

    /* The embed posts a message up to us when a booking completes. Documented
     * cal.com embed event, so this is a real signal rather than a guess at one:
     * if cal.com ever stops firing it, the event simply stops, and nothing else
     * on the page depends on it. No-ops with GA unset like everything else. */
    w.Cal.ns.talk('on', {
      action: 'bookingSuccessful',
      callback: () => {
        track('booking_started', {
          utm_source: config.utm_source,
          utm_campaign: config.utm_campaign,
        });
      },
    });
    w.Cal.ns.talk('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
      /* PINNED TO LIGHT, DELIBERATELY. Left alone, cal.com follows the VISITOR'S system
       * preference, so anyone browsing in dark mode got a dark calendar inside our white
       * card: three themes arguing in one component, and it read as broken rather than
       * intentional (Jacob, live review, July 2026).
       *
       * /start is dark hero then cream body, like every other page here, and the calendar
       * sits in a white card on that cream. That only works if the embed is light for
       * everybody, regardless of their OS setting. If you ever want it dark, the card in
       * app/start/page.tsx has to change in the same commit. */
      theme: 'light',
      cssVarsPerTheme: { light: { 'cal-brand': '#10b981' } },
    });
  }, []);

  return <div id="cal-inline" style={{ width: '100%', minHeight: 640, overflow: 'hidden', background: '#fff', borderRadius: 14 }} />;
}

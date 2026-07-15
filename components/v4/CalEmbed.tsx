'use client';

import { useEffect } from 'react';

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
    w.Cal.ns.talk('inline', {
      elementOrSelector: '#cal-inline',
      calLink: 'team/staybookt/talk-to-a-founder',
      layout: 'month_view',
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

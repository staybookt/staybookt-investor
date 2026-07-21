'use client';

import { usePathname } from 'next/navigation';
import { min } from '@/lib/css';
import { PHONE_DISPLAY, PHONE_HREF, START_LINK } from '@/lib/site';

/* THE TAP-TO-CALL BAR.
 *
 * Matrix.tsx sells clients "a tap-to-call button on every screen, so calling you takes
 * one thumb" and this site did not have one. The only phone number anywhere was a link
 * at the bottom of the footer, so a reviewer on a phone had to scroll a whole page of
 * film to find a way to call us. Mobile is the default viewport for our own buyer.
 *
 * ALWAYS VISIBLE, NOT SCROLL-REVEALED. The obvious version mirrors the nav and appears
 * after scrollY > 60. We are not doing that. Three of this site's pages are scroll-pinned
 * films driven by their own scroll listeners, and adding a fourth listener that toggles a
 * fixed element mid-scroll means the bar can mount, change the document height, and shift
 * the films' progress under the reader's thumb on the exact scroll where they are most
 * likely to notice. A bar that is simply there from the first frame costs one row of
 * screen and cannot fight anything. The reserved space below is static for the same
 * reason: it never changes, so nothing reflows.
 *
 * It sits at z-index 40, below the nav's 50, so the open menu sheet covers it. If you
 * change either number, keep that order. */

const CSS = `
/* NO BACKDROP-FILTER. This bar is fixed, it is over the content, and it is on screen for
   every frame of every scroll, which makes it the most expensive blur on the site: a
   full-width GPU read-back of whatever is behind it, re-composited continuously, on the
   phone hardware our buyer actually owns. It was rgba(5,5,6,.96) + blur(14px), and at 96%
   opacity there is nothing left to see through, so the blur was buying four percent of an
   effect at that price. Solid #050506 looks the same and costs nothing.
   This is a phone-only element (display:none at 768px and up), so there is no desktop
   version of this to preserve. */
.sbcall{position:fixed;left:0;right:0;bottom:0;z-index:40;display:flex;gap:10px;
  align-items:center;background:#050506;
  border-top:1px solid rgba(255,255,255,.10);
  padding:9px clamp(12px,4vw,20px);
  padding-bottom:calc(9px + env(safe-area-inset-bottom));}
.sbcall a{display:flex;align-items:center;justify-content:center;min-height:48px;
  border-radius:999px;font-size:15.5px;font-weight:600;letter-spacing:-.01em;
  text-decoration:none;padding:0 18px;}
.sbcall .sbcall-call{flex:1 1 auto;background:var(--sb-grad);color:#fff;}
.sbcall .sbcall-start{flex:0 0 auto;background:transparent;color:#eef1f6;
  border:1px solid rgba(255,255,255,.24);}
/* The tap highlight is off site-wide, so this dip IS the feedback that the call went
   through. .8 rather than .85: this is the one control on the site whose result (the dialler
   opening) can take a full second to appear. */
.sbcall a:active{opacity:.8;}
/* The bar floats over the page, so the last thing in the footer would sit under it.
   Reserve exactly the bar's height, plus the home indicator inset on a notched phone. */
@media (max-width:767px){
  body{padding-bottom:calc(66px + env(safe-area-inset-bottom));}
}
/* Phones only. The desktop nav already carries Get Started, and a fixed bar on a laptop
   is a cookie banner. */
@media (min-width:768px){
  .sbcall{display:none;}
}
`;

export default function CallBar() {
  /* Same dead-click fix the nav and footer carry: on /start, Get Started pointed at
     /start from /start and did nothing. There it scrolls to the calendar. */
  const onStart = usePathname() === '/start';
  return (
    <nav className="sbcall" aria-label="Call or get started">
      <style>{min(CSS)}</style>
      <a
        href={PHONE_HREF}
        className="sbcall-call"
        aria-label={'Call StayBookt at ' + PHONE_DISPLAY}
        data-cta="call_bar_call"
      >
        Call now
      </a>
      <a href={onStart ? '#book' : START_LINK} className="sbcall-start" data-cta="call_bar">
        Get Started
      </a>
    </nav>
  );
}

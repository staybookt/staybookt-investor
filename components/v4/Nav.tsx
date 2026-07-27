'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { START_LINK } from '@/lib/site';

/* The site nav.
 *
 * What's included was reachable only from the footer and one link on /pricing,
 * so a first-time reader never found the single page that says, in plain English,
 * exactly what the $199 buys. Richard read the whole site and missed it. It is now
 * in the nav (Richard, July 14 2026). */
/* "The work" is back in this list (July 2026). It was pulled for a few hours because both
 * images on it were fabricated mockups on a page claiming "not a mockup". It is now a real
 * screenshot of a real client's live site and a link to it, so it can survive being clicked.
 *
 * Enjoy Life is in the nav (Jacob, July 2026). It is the second half of the company's own
 * name and the whole reason a person would pay us, and it was reachable from nowhere. Six
 * items is the ceiling and we are at it. The order is the argument, not the sitemap:
 *   what it is → what you get → what it costs → why you'd bother → proof → who we are.
 *
 * The footer mirrors this order. If you change one, change the other. The homepage
 * "Go deeper" grid is deliberately NOT a mirror any more, it is a curated four. */
/* ORDER (Jacob, July 27 2026): About / Pricing / Journeys / How it works / Long-term
   value. This replaced the earlier what-it-is→proof→who argument order. The footer
   mirrors this — change one, change the other. */
const LINKS = [
  { href: '/founders', label: 'About us' },
  /* "What's included" MERGED INTO Pricing (Jacob + Richard, Jul 23 2026); /whats-included
     308s to /pricing. */
  { href: '/pricing', label: 'Pricing' },
  /* 'Journeys': mini landing routing to three profession pages (July 27 restructure). */
  { href: '/journeys', label: 'Journeys' },
  { href: '/how-it-works', label: 'How it works' },
  /* Label is Richard's words (July 14): "focus on long-term value as a stand alone." */
  { href: '/long-term', label: 'Long-term value' },
];

/* Fixed dark nav that solidifies (blur + border) once the user scrolls past
 * the hero fold, mirroring the v4 mockup. */
/* THERE WAS NO MOBILE MENU. globals.css hides .nav-links below 860px, and nothing replaced
 * them: on a phone this site had a wordmark, a Get Started pill, and NO WAY TO REACH ANY OF
 * THE SIX PAGES except by scrolling to the footer. Mobile is supposed to be the default
 * viewport. It shipped like that for weeks because every review was done on a laptop.
 * If you add a link to LINKS it appears in both the desktop row and this menu. */
/* solidTop keeps the nav a solid dark bar from the very top, not transparent-over-hero. The
   homepage passes it because its hero is light now (Jul 23 2026), so a transparent nav would
   leave the white wordmark and links invisible on the light surface. */
export default function Nav({ solidTop = false }: { solidTop?: boolean }) {
  const onStart = usePathname() === '/start';
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close on Escape, and never let the menu survive into a resize back to desktop, where
     it would sit open and invisible over the page. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onResize = () => { if (window.innerWidth > 860) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav className={`v4-nav${solid || open || solidTop ? ' solid' : ''}`}>
      <div className="wrap nav-in">
        <a href="/" className="mark" aria-label="StayBookt home" style={{ textDecoration: 'none' }}>
          Stay<span className="bk">Bookt</span>
          <span className="dot">.</span>
        </a>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          {/* ON /start THIS BUTTON WAS A DEAD CLICK. It pointed at /start from /start, so
              the most prominent CTA on the booking page did nothing at all. There it
              scrolls to the calendar instead. Everywhere else it goes to /start. */}
          <a href={onStart ? '#book' : START_LINK} className="pill pill-white" data-cta="nav_pill">
            Get Started
          </a>
          <button
            type="button"
            className={`nav-burger${open ? ' on' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* hidden={!open} was here and did NOTHING — the author rule in globals.css set
          display:block, which beats the UA stylesheet's [hidden]{display:none}, so the
          attribute never applied and the links stayed in the tab order. Visibility does
          the hiding now, in CSS, next to the animation that depends on it. */}
      <div id="nav-sheet" className={`nav-sheet${open ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

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
/* "The work" IS NOT IN THIS LIST, and that is not an oversight (July 2026).
 *
 * It was added because it was "the only page carrying a real customer artifact". It was
 * not. Both images in its drag-to-compare were fabricated mockups, on a page that said
 * "This is a real build. Not a mockup, not a concept." The route is benched on a 307
 * (see next.config.ts) until both panels are real screenshots. Put the link back when
 * the page can survive being clicked.
 *
 * Enjoy Life is in the nav (Jacob, July 2026). It is the second half of the company's own
 * name and the whole reason a person would pay us, and it was reachable from nowhere. Six
 * items is the ceiling; we are at five while /work is benched. The order is the argument, not the sitemap:
 *   what it is → what you get → what it costs → why you'd bother → proof → who we are.
 *
 * The footer mirrors this order. If you change one, change the other. The homepage
 * "Go deeper" grid is deliberately NOT a mirror any more, it is a curated four. */
const LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/whats-included', label: "What's included" },
  { href: '/pricing', label: 'Pricing' },
  { href: '/enjoy-life', label: 'Enjoy Life' },
  { href: '/founders', label: 'About us' },
];

/* Fixed dark nav that solidifies (blur + border) once the user scrolls past
 * the hero fold, mirroring the v4 mockup. */
export default function Nav() {
  const onStart = usePathname() === '/start';
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`v4-nav${solid ? ' solid' : ''}`}>
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
        {/* ON /start THIS BUTTON WAS A DEAD CLICK. It pointed at /start from /start, so
            the most prominent CTA on the booking page did nothing at all. There it
            scrolls to the calendar instead. Everywhere else it goes to /start. */}
        <a href={onStart ? '#book' : START_LINK} className="pill pill-white">
          Get Started
        </a>
      </div>
    </nav>
  );
}

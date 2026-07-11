'use client';

import { useEffect, useState } from 'react';
import { START_LINK } from '@/lib/site';

// Header mirrors the homepage "Go deeper" tabs.
const LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/founders', label: 'About us' },
];

/* Fixed dark nav that solidifies (blur + border) once the user scrolls past
 * the hero fold, mirroring the v4 mockup. */
export default function Nav() {
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
        <a href={START_LINK} className="pill pill-white">
          Get Started
        </a>
      </div>
    </nav>
  );
}

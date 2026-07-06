'use client';

import { useEffect, useState } from 'react';
import { CAL_LINK } from '@/lib/site';

const LINKS = [
  { href: '/why-a-website', label: 'Why a website' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/long-term', label: 'Long-term value' },
  { href: '/founders', label: 'Founders' },
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
        <div className="mark">
          Stay<span className="bk">Bookt</span>
          <span className="dot">.</span>
        </div>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="pill pill-white">
          Book a call
        </a>
      </div>
    </nav>
  );
}

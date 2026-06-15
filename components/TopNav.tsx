'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Wordmark from './Wordmark';

const OWNER_NAV = [
  { href: '#work', label: 'Work' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

const INVESTOR_NAV = [
  { href: '/proof', label: 'Customer' },
  { href: '/opportunity', label: 'Market' },
  { href: '/economics', label: 'Model' },
  { href: '/team', label: 'Team' },
];

const CAL_LINK = 'https://cal.com/jacobcharendoff/staybookt';

export function TopNav({
  active,
  variant = 'owner',
}: {
  active?: string;
  variant?: 'owner' | 'investor';
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pages = variant === 'investor' ? INVESTOR_NAV : OWNER_NAV;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-divider/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Wordmark size="sm" onDark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {pages.map((p) => {
            const isActive = !!active && p.href.includes(active);
            const isAnchor = p.href.startsWith('#');
            const className = `text-[11px] tracking-[0.18em] uppercase font-semibold px-3 py-2 rounded-md transition-colors ${
              isActive ? 'text-elec' : 'text-platinum-soft hover:text-white'
            }`;
            return isAnchor ? (
              <a key={p.href} href={p.href} className={className}>
                {p.label}
              </a>
            ) : (
              <Link key={p.href} href={p.href} className={className}>
                {p.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {variant === 'owner' && (
            <Link
              href="/brief"
              className="text-[11px] tracking-[0.18em] uppercase font-medium text-mute hover:text-platinum-soft transition-colors"
            >
              For investors
            </Link>
          )}
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-elec hover:bg-elec-light text-ink text-xs font-bold px-4 py-2 rounded-lg transition-colors"
          >
            Book 30 min
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-divider/50 bg-ink/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
            {pages.map((p) => {
              const isAnchor = p.href.startsWith('#');
              const inner = (
                <span className="block text-sm tracking-wider uppercase font-semibold py-2 text-platinum hover:text-white">
                  {p.label}
                </span>
              );
              return isAnchor ? (
                <a key={p.href} href={p.href} onClick={() => setOpen(false)}>
                  {inner}
                </a>
              ) : (
                <Link key={p.href} href={p.href} onClick={() => setOpen(false)}>
                  {inner}
                </Link>
              );
            })}
            {variant === 'owner' && (
              <Link
                href="/brief"
                onClick={() => setOpen(false)}
                className="text-sm tracking-wider uppercase font-medium py-2 text-mute"
              >
                For investors
              </Link>
            )}
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-elec text-ink text-sm font-bold px-4 py-3 rounded-lg text-center"
            >
              Book 30 min
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

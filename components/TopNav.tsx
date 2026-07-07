'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Wordmark from './Wordmark';
import { START_LINK } from '@/lib/site';

const NAV = [
  { href: '/why-a-website', label: 'Why a website' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/long-term', label: 'Long-term value' },
  { href: '/enjoy-life', label: 'Enjoy Life' },
  { href: '/founders', label: 'Founders' },
];

export function TopNav({ active }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Wordmark size="sm" onDark period />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((p) => {
            const isActive = !!active && p.href.includes(active);
            return (
              <Link
                key={p.href}
                href={p.href}
                className={`text-[13px] font-medium px-3 py-2 transition-colors ${
                  isActive ? 'text-white' : 'text-platinum-soft hover:text-white'
                }`}
              >
                {p.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={START_LINK}
            className="rounded-full bg-white text-ink text-[13px] font-semibold px-5 py-2 transition-colors hover:bg-white/90"
          >
            Get Started
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
        <nav className="md:hidden border-t border-white/10 bg-ink/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV.map((p) => (
              <Link key={p.href} href={p.href} onClick={() => setOpen(false)}>
                <span className="block text-[15px] font-medium py-2 text-platinum hover:text-white">
                  {p.label}
                </span>
              </Link>
            ))}
            <a
              href={START_LINK}
              className="mt-3 rounded-full bg-white text-ink text-sm font-semibold px-4 py-3 text-center"
            >
              Get Started
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

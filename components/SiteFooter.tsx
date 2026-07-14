import Link from 'next/link';
import Wordmark from '@/components/Wordmark';
import { START_LINK, EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';

/* The footer used to link three pages that no longer exist (/why-a-website,
 * /enjoy-life, /long-term). Now it links only what is real, and it carries the
 * legal pages, which is where people actually look for them. */

/* /work carried the only real artifact on the site, a genuine before-and-after of a
 * build we actually shipped, and it was reachable from NOWHERE: zero links in the nav,
 * zero in the footer. A proof page nobody can reach is not proof. The nav is full at
 * four, so it lives here. */
const SITE = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/whats-included', label: "What's included" },
  { href: '/work', label: 'The work' },
  { href: '/founders', label: 'About us' },
  { href: '/contact', label: 'Contact' },
];

const LEGAL = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
];

export default function SiteFooter() {
  return (
    <footer className="px-6 py-16 sm:px-12" style={{ background: '#050506' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <Wordmark onDark period />
            <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: '#7e8698' }}>
              You do the work. We run the rest.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              href={START_LINK}
              className="text-sm font-semibold text-white transition-opacity hover:opacity-70"
            >
              Get Started
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm transition-colors hover:text-white"
              style={{ color: '#c7ccd6' }}
            >
              {EMAIL}
            </a>
            <a
              href={PHONE_HREF}
              className="text-sm transition-colors hover:text-white"
              style={{ color: '#c7ccd6' }}
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div
          className="flex flex-col items-start justify-between gap-4 border-t pt-8 text-xs sm:flex-row sm:items-center"
          style={{ borderColor: 'rgba(255,255,255,.08)', color: '#8b93a5' }}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {SITE.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="transition-colors hover:text-white"
                style={{ color: '#c7ccd6' }}
              >
                {p.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL.map((p) => (
              <Link key={p.href} href={p.href} className="transition-colors hover:text-white">
                {p.label}
              </Link>
            ))}
            <span>{'©'} 2026 StayBookt. Toronto, ON.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

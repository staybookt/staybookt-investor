import Link from 'next/link';
import Wordmark from '@/components/Wordmark';
import { START_LINK, EMAIL } from '@/lib/site';

const NAV = [
  { href: '/why-a-website', label: 'Why a website' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/enjoy-life', label: 'Enjoy Life' },
  { href: '/long-term', label: 'Long-term value' },
  { href: '/founders', label: 'Founders' },
];

/* The single shared footer for every page. Dark, so it flows from the dark
 * closer above it. Wordmark via the component (onDark), one hairline on top,
 * one nav. No card borders anywhere else. */
export default function SiteFooter() {
  const linkCls = 'transition-colors hover:text-white';
  return (
    <footer className="px-6 py-16 sm:px-12" style={{ background: '#06080f' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <Wordmark onDark period />
            <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: '#7e8698' }}>
              Built and run for service businesses.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              href={START_LINK}
              className="text-sm font-semibold text-white transition-colors hover:opacity-70"
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
          </div>
        </div>
        <div
          className="flex flex-col items-start justify-between gap-3 border-t pt-8 text-xs sm:flex-row sm:items-center"
          style={{ borderColor: 'rgba(255,255,255,.08)', color: '#8b93a5' }}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV.map((p) => (
              <Link key={p.href} href={p.href} className={linkCls} style={{ color: '#c7ccd6' }}>
                {p.label}
              </Link>
            ))}
          </div>
          <p>{'©'} 2026 StayBookt Inc. Toronto, ON.</p>
        </div>
      </div>
    </footer>
  );
}

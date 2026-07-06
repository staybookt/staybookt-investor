import Link from 'next/link';
import Wordmark from '@/components/Wordmark';
import { CAL_LINK, EMAIL } from '@/lib/site';

const NAV = [
  { href: '/why-a-website', label: 'Why a website' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/enjoy-life', label: 'Enjoy Life' },
  { href: '/long-term', label: 'Long-term value' },
  { href: '/founders', label: 'Founders' },
];

/* The single shared footer for every page. Wordmark via the component, one
 * hairline on top, one nav. No card borders anywhere else. */
export default function SiteFooter() {
  const linkCls = 'text-mute transition-colors hover:text-ink';
  return (
    <footer className="bg-paper px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <Wordmark onDark={false} period />
            <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">
              Built and run for service businesses.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-ink transition-colors hover:opacity-70"
            >
              Book a 30-minute call
            </a>
            <a href={`mailto:${EMAIL}`} className="text-sm text-mute transition-colors hover:text-ink">
              {EMAIL}
            </a>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-divider-lt pt-8 text-xs text-mute sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV.map((p) => (
              <Link key={p.href} href={p.href} className={linkCls}>
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

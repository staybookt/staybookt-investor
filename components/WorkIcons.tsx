/* Crisp gradient line icons for the Find / Book / Stay blocks.
 * 48x48 viewBox, scale via className (e.g. "w-9 h-9"). Cyan-to-emerald stroke. */

type IconProps = { className?: string };

function grad(id: string) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
  );
}

export function IconFind({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {grad('ic-find')}
      <circle cx="20" cy="20" r="11" stroke="url(#ic-find)" strokeWidth="2.5" />
      <line x1="28" y1="28" x2="39" y2="39" stroke="url(#ic-find)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3.5" fill="url(#ic-find)" />
    </svg>
  );
}

export function IconBook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {grad('ic-book')}
      <rect x="8" y="11" width="32" height="29" rx="5" stroke="url(#ic-book)" strokeWidth="2.5" />
      <line x1="8" y1="19" x2="40" y2="19" stroke="url(#ic-book)" strokeWidth="2.5" />
      <line x1="16" y1="7" x2="16" y2="14" stroke="url(#ic-book)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="7" x2="32" y2="14" stroke="url(#ic-book)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M17 29.5 l4.5 4.5 l9 -10" stroke="url(#ic-book)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconStay({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {grad('ic-stay')}
      <circle cx="24" cy="24" r="15" stroke="url(#ic-stay)" strokeWidth="2.5" />
      <path d="M24 15.5 l2.5 5.06 5.6 .82 -4.05 3.95 .96 5.57 -5.01 -2.63 -5.01 2.63 .96 -5.57 -4.05 -3.95 5.6 -.82 z" fill="url(#ic-stay)" />
    </svg>
  );
}

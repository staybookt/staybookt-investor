import React from 'react';

// Single icon shell: 18x18 viewBox, 1.5px stroke, currentColor. Designed to
// inherit color from parent so brand-gradient text on the parent shows through
// via the use of stroke="url(#sb-icon-grad)" inside a single shared defs.

function IconShell({ children, size = 18, className = '' }: { children: React.ReactNode; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function IconGlobe(props: { size?: number; className?: string }) {
  return (
    <IconShell {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 010 18" />
      <path d="M12 3a14 14 0 000 18" />
    </IconShell>
  );
}

export function IconPhoneCall(props: { size?: number; className?: string }) {
  return (
    <IconShell {...props}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
      <path d="M15 3a6 6 0 016 6" />
    </IconShell>
  );
}

export function IconClockRotate(props: { size?: number; className?: string }) {
  return (
    <IconShell {...props}>
      <path d="M21 12a9 9 0 11-3.2-6.9" />
      <path d="M21 4v5h-5" />
      <path d="M12 7v5l3 2" />
    </IconShell>
  );
}

export function IconStar(props: { size?: number; className?: string }) {
  return (
    <IconShell {...props}>
      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8l-6.2 3.3 1.2-6.9-5-4.9 6.9-1z" />
    </IconShell>
  );
}

export function IconBarChart(props: { size?: number; className?: string }) {
  return (
    <IconShell {...props}>
      <line x1="4" y1="20" x2="4" y2="14" />
      <line x1="10" y1="20" x2="10" y2="8" />
      <line x1="16" y1="20" x2="16" y2="11" />
      <line x1="22" y1="20" x2="22" y2="4" />
    </IconShell>
  );
}

export function IconUsers(props: { size?: number; className?: string }) {
  return (
    <IconShell {...props}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </IconShell>
  );
}

export function IconFileInvoice(props: { size?: number; className?: string }) {
  return (
    <IconShell {...props}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </IconShell>
  );
}

export function IconWrench(props: { size?: number; className?: string }) {
  return (
    <IconShell {...props}>
      <path d="M14.7 6.3a4 4 0 00-5.6 5.6L2 19l3 3 7.1-7.1a4 4 0 005.6-5.6l-2.8 2.8-2.8-2.8 2.8-2.8z" />
    </IconShell>
  );
}

export function IconMinusCircle(props: { size?: number; className?: string }) {
  return (
    <IconShell {...props}>
      <circle cx="12" cy="12" r="9" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </IconShell>
  );
}

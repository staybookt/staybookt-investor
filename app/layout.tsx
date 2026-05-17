import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StayBookt — Investor Brief',
  description: 'The embedded operating layer for regulated trades. Electrical, HVAC, Plumbing.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

const TITLE = 'StayBookt | The operating layer for the trades';
const DESCRIPTION =
  'StayBookt runs revenue and operations for HVAC, plumbing, and electrical owner-operators on a single retainer with one accountable team. Foundation buildout up front, weekly operating cadence after that.';
const SITE_URL = 'https://staybookt-investor.vercel.app';

/* Note on OG + Twitter images: we let Next.js auto-detect the files
 * at app/opengraph-image.tsx and app/twitter-image.tsx instead of
 * hard-coding URLs here. That keeps the share card in sync with the
 * design system since it is generated server-side from JSX. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · StayBookt',
  },
  description: DESCRIPTION,
  robots: { index: false, follow: false }, // private investor brief
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

const TITLE = 'StayBookt — The embedded ops team for trades';
const DESCRIPTION = 'StayBookt is the embedded ops team for small residential + light-commercial service businesses. We run the revenue engine — find, capture, quote, deliver, retain — using the same playbook, every client.';
const SITE_URL = 'https://staybookt-investor.vercel.app';

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
    images: [
      {
        url: '/photos/IMG_1140.jpg',
        width: 1200,
        height: 630,
        alt: 'StayBookt — the embedded ops team for trades',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/photos/IMG_1140.jpg'],
  },
};

import { CursorFollower } from '@/components/PageFX';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}

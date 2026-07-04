import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.css';
import Analytics from '@/components/Analytics';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import StructuredData from '@/components/StructuredData';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

// Official company slogan. Use in brand-line slots (title, OG, share card).
const SLOGAN = 'Get Found. StayBookt.';
const DESCRIPTION =
  'StayBookt builds and runs websites for service businesses up to $5M across North America. We get you found, book the work, and keep the calendar full. Built and run by us. Paid for by the results.';
const SITE_URL = 'https://www.staybookt.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SLOGAN,
    template: '%s · StayBookt',
  },
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    title: SLOGAN,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SLOGAN,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased ${interTight.variable}`}>
        {children}
        <StructuredData />
        <Analytics />
        <AnalyticsEvents />
      </body>
    </html>
  );
}

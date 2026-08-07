import type { Metadata, Viewport } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.css';
import Analytics from '@/components/Analytics';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Clarity from '@/components/Clarity';
/* Vercel's own two. They need no keys and no IDs: they read the deployment they
 * are running in, and they are no-ops anywhere else, which is why they sit
 * outside the env gates above. Aliased because components/Analytics.tsx is our
 * GA4 loader and the names would otherwise collide. */
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import StructuredData from '@/components/StructuredData';
import ArrowScroll from '@/components/ArrowScroll';
import CallBar from '@/components/v4/CallBar';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

// Official brand line. Use in brand-line slots (title, OG, share card).
const SLOGAN = 'StayBookt. Enjoy Life.';

/* THIS IS THE SITE-WIDE SHARE CARD. Every page that does not define its own
 * openGraph inherits it, which today means /how-it-works, /work, /terms and
 * /privacy. It is therefore the very first thing a prospect reads, before they
 * have clicked anything.
 *
 * It used to say: "...and only gets paid when it brings you work. So the business
 * runs without you." Both halves were wrong.
 *
 * 1. It advertised a performance-based value share that we DELETED (Richard, July
 *    14 2026) and that our own terms of service now explicitly forbid. The link
 *    preview was selling a commercial model the contract prohibits.
 * 2. "Runs without you" is banned language. We never sideline the owner. The line
 *    is "You run the business. We run the busywork."
 *
 * Keep this in lockstep with the homepage description. If the offer changes, this
 * changes in the same commit. */
const DESCRIPTION =
  'StayBookt answers your phone, books your jobs and chases your quotes. You do the work. We run everything around it. $199/mth USD, nothing upfront, no lock-in.';
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

/* Paints the phone's browser chrome the site's own near-black instead of leaving it
 * default grey above a dark, cinematic page. Next 16 wants this on the viewport export,
 * not on metadata, or the build warns and drops it. */
export const viewport: Viewport = {
  themeColor: '#050506',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased ${interTight.variable}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/* Richard reads this site with the down arrow. Chrome gives an arrow press 40px and
            a wheel notch 100px, so the keyboard was doing 2.5x the work through the films. */}
        <ArrowScroll />
        {children}
        {/* Phones only, and mounted once here so every page has it. See CallBar.tsx for
            why it is always visible instead of scroll-revealed. */}
        <CallBar />
        <StructuredData />
        <Analytics />
        <AnalyticsEvents />
        <Clarity />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

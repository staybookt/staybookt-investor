import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import Journey from '@/components/v4/Journey';

/* Updated with the Marcus repositioning (Richard's Journies doc, Aug 2 2026): the
   less-paperwork journey. */
const SHARE =
  'Marcus loves being an electrician. As the business grew, the admin consumed him, until StayBookt took the paperwork off his hands. Follow his journey: same-day quotes, invoices paid, evenings returned.';

export const metadata = {
  title: 'Home service journey',
  description: SHARE,
  alternates: { canonical: '/journeys/home-service' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Home service journey · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/journeys/home-service',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'Home service journey · StayBookt', description: SHARE },
};

export default function HomeServiceJourneyPage() {
  return (
    <div id="top" className="v4">
      <Nav solidTop />
      <main id="main" tabIndex={-1}>
        {/* Journey ends on its own full-screen gradient finale; the sitewide HeroCta
            dock close is deliberately omitted on journey pages (two closes compete). */}
        <Journey id="home-service" />
      </main>
      <SiteFooter />
    </div>
  );
}

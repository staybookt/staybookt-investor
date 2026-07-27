import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import Journey from '@/components/v4/Journey';

const SHARE =
  'Marcus runs a five-person electrical shop. Four of ten calls hit voicemail until StayBookt took the front of the business off his hands. Follow his journey: every call answered, every quote chased, evenings returned.';

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

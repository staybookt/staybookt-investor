import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import Journey from '@/components/v4/Journey';
import HeroCta from '@/components/v4/HeroCta';

const SHARE =
  'Marcus runs a five-person electrical shop. Four of ten calls hit voicemail until StayBookt took the front of the business off his hands. Walk his year: every call answered, every quote chased, evenings returned.';

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
        <Journey id="home-service" />
        <HeroCta />
      </main>
      <SiteFooter />
    </div>
  );
}

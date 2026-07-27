import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import Journey from '@/components/v4/Journey';
import HeroCta from '@/components/v4/HeroCta';

const SHARE =
  'Kim is one of the top agents in town, and she was always the second to call back. Then StayBookt took the front of the business off her hands. Follow her journey: every lead answered in seconds, the database warm all year, her evenings back.';

export const metadata = {
  title: 'Real estate agent journey',
  description: SHARE,
  alternates: { canonical: '/journeys/real-estate-agent' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Real estate agent journey · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/journeys/real-estate-agent',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'Real estate agent journey · StayBookt', description: SHARE },
};

export default function RealEstateAgentJourneyPage() {
  return (
    <div id="top" className="v4">
      <Nav solidTop />
      <main id="main" tabIndex={-1}>
        <Journey id="real-estate-agent" />
        <HeroCta />
      </main>
      <SiteFooter />
    </div>
  );
}

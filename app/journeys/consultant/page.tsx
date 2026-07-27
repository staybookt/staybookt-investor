import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import Journey from '@/components/v4/Journey';

const SHARE =
  'Sean runs a solo consultancy. His best referrals went cold while he was heads-down delivering, until StayBookt took the front of the practice off his hands. Follow his journey: same-day answers, a steady pipeline, the famine months gone.';

export const metadata = {
  title: 'Consultant journey',
  description: SHARE,
  alternates: { canonical: '/journeys/consultant' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Consultant journey · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/journeys/consultant',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'Consultant journey · StayBookt', description: SHARE },
};

export default function ConsultantJourneyPage() {
  return (
    <div id="top" className="v4">
      <Nav solidTop />
      <main id="main" tabIndex={-1}>
        <Journey id="consultant" />
      </main>
      <SiteFooter />
    </div>
  );
}

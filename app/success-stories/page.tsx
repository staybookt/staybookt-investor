import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import SuccessStories from '@/components/v4/SuccessStories';
import HeroCta from '@/components/v4/HeroCta';

const SHARE =
  'Three owner-operators, one front office running behind them. Illustrative example journeys that show exactly what StayBookt does for an electrician, a consultant, and a real estate agent.';

export const metadata = {
  title: 'Success stories',
  description: SHARE,
  alternates: { canonical: '/success-stories' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Success stories · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/success-stories',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'Success stories · StayBookt', description: SHARE },
};

export default function SuccessStoriesPage() {
  return (
    <div id="top" className="v4">
      {/* hero here is cream, so the nav needs its solid treatment to stay visible */}
      <Nav solidTop />
      <main id="main" tabIndex={-1}>
        <SuccessStories />
        <HeroCta />
      </main>
      <SiteFooter />
    </div>
  );
}

import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import HowItWorks from '@/components/v4/HowItWorks';
import HeroCta from '@/components/v4/HeroCta';

const SHARE =
  'Not a tool you learn. An operator that runs the front of your business: your website, an AI receptionist, booking, quotes, reviews and a daily brief. Here is exactly how it runs, step by step.';

/* THIS PAGE HAD NO SHARE CARD OF ITS OWN, so it inherited the layout's, which meant
 * that paste it into a text message and it came back titled "StayBookt. Enjoy Life."
 * and linked to the homepage. This is the page you send someone. It is the single
 * most shared URL we have and it was pointing at a different page. */
export const metadata = {
  title: 'How it works | StayBookt',
  description: SHARE,
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How it works · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/how-it-works',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'How it works · StayBookt', description: SHARE },
};

export default function HowItWorksPage() {
  return (
    <main id="top" className="v4">
      <Nav />
      <HowItWorks />
      {/* Every page closes the same way. This one used to just stop. */}
      <HeroCta />
      <SiteFooter />
    </main>
  );
}

import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import HowItWorks from '@/components/v4/HowItWorks';
import HeroCta from '@/components/v4/HeroCta';

const SHARE =
  'We run the front of your business for you: your website, an AI receptionist, booking, quotes, reviews and a daily brief. There is nothing for you to learn. Here is exactly how it runs, step by step.';

/* THIS PAGE HAD NO SHARE CARD OF ITS OWN, so it inherited the layout's, which meant
 * that paste it into a text message and it came back titled "StayBookt. Enjoy Life."
 * and linked to the homepage. This is the page you send someone. It is the single
 * most shared URL we have and it was pointing at a different page. */
export const metadata = {
  title: 'How it works',
  description: SHARE,
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    /* Defining openGraph WITHOUT images suppresses the inherited app/opengraph-image.tsx,
       so this page shared as a bare grey rectangle. Every page needs its own images line. */
    images: ['/opengraph-image'],
    title: 'How it works · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/how-it-works',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'How it works · StayBookt', description: SHARE },
};

export default function HowItWorksPage() {
  return (
    <div id="top" className="v4">
      <Nav />
      <main id="main" tabIndex={-1}>
      <HowItWorks />
      {/* Every page closes the same way. This one used to just stop. */}
      <HeroCta img="/close-hiw.jpg" />
      </main>
      <SiteFooter />
    </div>
  );
}

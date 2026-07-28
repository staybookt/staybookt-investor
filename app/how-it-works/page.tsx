import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import HowItWorks from '@/components/v4/HowItWorks';

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
      {/* solidTop: this page's hero is light now (Jul 23 2026), so a transparent nav would
          leave the white wordmark and links invisible on the cream surface. */}
      <Nav solidTop />
      <main id="main" tabIndex={-1}>
      <HowItWorks />
      {/* NO HeroCta HERE, ON PURPOSE (Richard, Images doc Jul 28): "I don't love that we
          have two image folds at the bottom... feels too clumsy at the end." The Arrival
          scene inside HowItWorks is the close now — his saying, the CTA button, the
          founder note — and the FAQ is the last word. He also disliked this fold's photo
          ("the guy reading a book"). Re-adding a closer here recreates the double fold. */}
      </main>
      <SiteFooter />
    </div>
  );
}

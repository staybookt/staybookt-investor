import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import WorkShowcase from '@/components/v4/WorkShowcase';
import HeroCta from '@/components/v4/HeroCta';

/* This described the drag-to-compare, which is gone, and promised "makes the phone ring",
 * which is a result we never measured. Both had to go. The share card is the one piece of
 * copy nobody re-reads, which is exactly why it outlived the page it described. */
const SHARE =
  'Our first client is an electrician in Newmarket, Ontario. His site is live right now. Go look at it yourself.';

/* Same bug as /how-it-works: no openGraph, so the one page that carries actual
 * evidence shared as the homepage. Fixed. */
export const metadata = {
  title: 'The work',
  description: SHARE,
  alternates: { canonical: '/work' },
  openGraph: {
    /* Defining openGraph WITHOUT images suppresses the inherited app/opengraph-image.tsx,
       so this page shared as a bare grey rectangle. Every page needs its own images line. */
    images: ['/opengraph-image'],
    title: 'The work · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/work',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { images: ['/twitter-image'], card: 'summary_large_image', title: 'The work · StayBookt', description: SHARE },
};

export default function WorkPage() {
  return (
    <div id="top" className="v4">
      <Nav />
      <main id="main" tabIndex={-1}>
      <WorkShowcase />
      {/* One CTA site-wide. WorkShowcase used to end on its own bespoke card with a
          different headline and a button that said "Pick a time". Now there is one. */}
      <HeroCta />
      </main>
      <SiteFooter />
    </div>
  );
}

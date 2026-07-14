import Nav from '@/components/v4/Nav';
import SiteFooter from '@/components/SiteFooter';
import WorkShowcase from '@/components/v4/WorkShowcase';
import StartBanner from '@/components/v4/StartBanner';

const SHARE =
  'See the difference. The same owner-operated business, before and after StayBookt: a tired, dated website rebuilt into one that makes the phone ring. Drag to compare.';

/* Same bug as /how-it-works: no openGraph, so the one page that carries actual
 * evidence shared as the homepage. Fixed. */
export const metadata = {
  title: 'The work | StayBookt',
  description: SHARE,
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'The work · StayBookt',
    description: SHARE,
    url: 'https://www.staybookt.com/work',
    siteName: 'StayBookt',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'The work · StayBookt', description: SHARE },
};

export default function WorkPage() {
  return (
    <main id="top" className="v4">
      <Nav />
      <WorkShowcase />
      {/* WorkShowcase used to end on its own bespoke card: a different headline, a
          different button shape, and a button that said "Pick a time" when every
          other button on the site says "Get Started". Three CTA styles across six
          pages. Now there is one. */}
      <StartBanner />
      <SiteFooter />
    </main>
  );
}

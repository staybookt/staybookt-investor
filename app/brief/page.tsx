import { Hero, CategoryPosition } from '@/components/Sections';
import { TopNav } from '@/components/TopNav';
import { FlywheelOS } from '@/components/FlywheelOS';
import { SiteFooter } from '@/components/HomeTeasers';

export const metadata = {
  title: 'Brief',
  description:
    'StayBookt investor brief: what we build, who we serve, and why the operating-layer model for sub-$5M service businesses wins.',
  alternates: { canonical: '/brief' },
};

/* /brief — the investor pitch, preserved verbatim from the original homepage.
 * Linked quietly from the corp homepage footer. For investors, partners,
 * friends, family, peers, recruits. Anyone who wants the deeper read.
 * Uses the investor variant of TopNav so the Customer/Market/Model/Team
 * sub-page navigation stays available here. */
export default function BriefPage() {
  return (
    <main id="top" className="relative">
      <TopNav variant="investor" />
      <Hero />
      <CategoryPosition />
      <FlywheelOS />
      <SiteFooter />
    </main>
  );
}

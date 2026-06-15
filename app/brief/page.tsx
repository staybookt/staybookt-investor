import { Hero, CategoryPosition } from '@/components/Sections';
import { TopNav } from '@/components/TopNav';
import { FlywheelOS } from '@/components/FlywheelOS';
import { SiteFooter } from '@/components/HomeTeasers';

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

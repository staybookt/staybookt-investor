import { Hero } from '@/components/Sections';
import { TopNav } from '@/components/TopNav';
import { FlywheelOS } from '@/components/FlywheelOS';
import { SiteFooter } from '@/components/HomeTeasers';

/* Homepage is intentionally lean: Hero (what we do) → FlywheelOS (how it
   runs, ending with the 4-card nav hub for the rest of the brief) → Footer.
   The four investor questions (proof, opportunity, economics, team) live
   on their own pages — the nav hub at the end of FlywheelOS is the menu. */
export default function HomePage() {
  return (
    <main id="top" className="relative">
      <TopNav />
      <Hero />
      <FlywheelOS />
      <SiteFooter />
    </main>
  );
}

import { Hero, CategoryPosition } from '@/components/Sections';
import { TopNav } from '@/components/TopNav';
import { FlywheelOS } from '@/components/FlywheelOS';
import { SiteFooter } from '@/components/HomeTeasers';

/* Homepage CX flow:
 *   1. Hero — what we do (elevator pitch)
 *   2. CategoryPosition — what category we live in (NOT software, NOT agency)
 *   3. FlywheelOS — how the operating team runs (7-stage parallax + nav hub)
 *   4. Footer
 * The four investor questions (proof, opportunity, economics, team) live on
 * their own pages — the nav hub at the end of FlywheelOS is the menu. */
export default function HomePage() {
  return (
    <main id="top" className="relative">
      <TopNav />
      <Hero />
      <CategoryPosition />
      <FlywheelOS />
      <SiteFooter />
    </main>
  );
}

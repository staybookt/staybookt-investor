import { Hero } from '@/components/Sections';
import { AskV2 } from '@/components/ExtendedSections';
import { TopNav } from '@/components/TopNav';
import { FlywheelOS } from '@/components/FlywheelOS';
import {
  ProofTeaser,
  OpportunityTeaser,
  EconomicsTeaser,
  TeamTeaser,
  SiteFooter,
} from '@/components/HomeTeasers';

export default function HomePage() {
  return (
    <main id="top" className="relative">
      <TopNav />
      <Hero />
      <FlywheelOS />
      <ProofTeaser />
      <OpportunityTeaser />
      <EconomicsTeaser />
      <TeamTeaser />
      <AskV2 />
      <SiteFooter />
    </main>
  );
}

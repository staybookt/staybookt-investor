import { Hero } from '@/components/Sections';
import { AskV2 } from '@/components/ExtendedSections';
import { TopNav } from '@/components/TopNav';
import {
  MechanismTeaser,
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
      <MechanismTeaser />
      <ProofTeaser />
      <OpportunityTeaser />
      <EconomicsTeaser />
      <TeamTeaser />
      <AskV2 />
      <SiteFooter />
    </main>
  );
}

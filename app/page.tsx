import { Hero, TheWhy, Photography, Problems } from '@/components/Sections';
import { SideNav, TimCase, Team, AskV2 } from '@/components/ExtendedSections';
import {
  BeforeAfterTCE,
  LiveTimEmbed,
  CustomerJourney,
  PricingV3,
  Roadmap,
  CompetitiveLandscapeV2,
  WhyNow,
  PipelineV2,
  UnitEconomics,
} from '@/components/SectionsV3';

export default function InvestorPage() {
  return (
    <main id="top" className="relative">
      <SideNav />
      <Hero />
      <TheWhy />
      <BeforeAfterTCE />
      <Photography />
      <TimCase />
      <LiveTimEmbed />
      <Problems />
      <CustomerJourney />
      <PricingV3 />
      <Roadmap />
      <CompetitiveLandscapeV2 />
      <WhyNow />
      <PipelineV2 />
      <UnitEconomics />
      <Team />
      <AskV2 />
    </main>
  );
}

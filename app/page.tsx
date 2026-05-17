import { Hero, TheWhy, Photography, Problems } from '@/components/Sections';
import { SideNav, TimCase, Team, AskV2 } from '@/components/ExtendedSections';
import {
  BeforeAfterTCE,
  LiveTimEmbed,
  PricingV3,
  Roadmap,
  CompetitiveLandscapeV2,
  WhyNow,
  PipelineV2,
  UnitEconomics,
} from '@/components/SectionsV3';
import { StayBooktOS, NinetyDayPlaybook, WeeklyOps, CustomerOutcomes } from '@/components/OperatingSystem';

export default function InvestorPage() {
  return (
    <main id="top" className="relative">
      <SideNav />

      {/* 1. Hook */}
      <Hero />

      {/* 2. The problem — universal pain */}
      <TheWhy />
      <Problems />

      {/* 3. THE MECHANISM — the spine of the company */}
      <StayBooktOS />
      <NinetyDayPlaybook />
      <WeeklyOps />

      {/* 4. Proof it works — Tim case */}
      <BeforeAfterTCE />
      <Photography />
      <TimCase />
      <LiveTimEmbed />

      {/* 4b. What every client gets */}
      <CustomerOutcomes />

      {/* 5. Why we win */}
      <CompetitiveLandscapeV2 />

      {/* 6. Market opportunity + why now */}
      <WhyNow />

      {/* 7. Pipeline + unit economics + pricing */}
      <PipelineV2 />
      <UnitEconomics />
      <PricingV3 />
      <Roadmap />

      {/* 8. Team + ask */}
      <Team />
      <AskV2 />
    </main>
  );
}

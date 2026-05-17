import { Hero, TheWhy, Photography, Problems, Flywheel, TAM } from '@/components/Sections';
import {
  SideNav,
  VerticalMarquee,
  TimCase,
  HowItWorks,
  Pricing,
  Moat,
  Competition,
  Pipeline,
  Team,
  AskV2,
} from '@/components/ExtendedSections';

export default function InvestorPage() {
  return (
    <main id="top" className="relative">
      <SideNav />
      <Hero />
      <VerticalMarquee />
      <TheWhy />
      <Photography />
      <TimCase />
      <Problems />
      <Flywheel />
      <HowItWorks />
      <Pricing />
      <Moat />
      <Competition />
      <TAM />
      <Pipeline />
      <Team />
      <AskV2 />
    </main>
  );
}

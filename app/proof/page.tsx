import {
  ICPSegment,
  OwnerWeek,
  VendorSpend,
  MissedCallWound,
  BuyingTriggers,
  SegmentTAM,
  PilotOneCompact,
  MeasurementPlan,
} from '@/components/CustomerProfile';
import { PipelineV2 } from '@/components/SectionsV3';
import { AskV2 } from '@/components/ExtendedSections';
import { TopNav } from '@/components/TopNav';
import { SiteFooter, UpNext } from '@/components/HomeTeasers';

export const metadata = { title: 'Customer' };

export default function ProofPage() {
  return (
    <main id="top" className="relative">
      <TopNav active="proof" />
      <div className="pt-20">
        <PageHeader
          eyebrow="Customer"
          title="Who actually pays us."
          sub="HVAC, plumbing, and electrical owner-operators doing $250K to $2M in revenue. The kind of business that is too small to hire a marketing manager, an operations manager, and a bookkeeper, but too big to run on the owner's phone alone. Below: the segment, the week, the spend, the leak, and the four patterns that turn into signed contracts. Pilot 1 is one of them. There are 10,000 more in Ontario alone."
        />
        <ICPSegment />
        <OwnerWeek />
        <VendorSpend />
        <MissedCallWound />
        <BuyingTriggers />
        <SegmentTAM />
        <PilotOneCompact />
        <PipelineV2 />
        <MeasurementPlan />
        <AskV2 />
      </div>
      <UpNext current="/proof" />
      <SiteFooter />
    </main>
  );
}

function PageHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <section className="bg-ink text-white py-20 sm:py-28 px-8 sm:px-16">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-elec font-semibold uppercase mb-6">{eyebrow}</p>
        <h1 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] leading-[0.95] mb-6 max-w-4xl">{title}</h1>
        <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl">{sub}</p>
      </div>
    </section>
  );
}

import {
  CapitalFlow,
  TwoLayers,
  SilverTsunami,
  NamedComp,
  MoatFour,
} from '@/components/MarketProfile';
import { TAMBreakdown, Sources } from '@/components/SectionsV3';
import { AskV2 } from '@/components/ExtendedSections';
import { TopNav } from '@/components/TopNav';
import { SiteFooter, UpNext } from '@/components/HomeTeasers';

export const metadata = { title: 'Market' };

export default function OpportunityPage() {
  return (
    <main id="top" className="relative">
      <TopNav active="opportunity" />
      <div className="pt-20">
        <PageHeader
          eyebrow="Market"
          title="$1B+ ARR sitting in plain sight."
          sub={<>The trades are no longer a sleepy sector. ServiceTitan IPO&apos;d at a $9.6B opening market cap in December 2024. Apex Service Partners closed a $3.4B continuation fund in 2023 and added 60 acquisitions in 2025 alone. The software layer is well funded. The consolidation layer is well funded. Neither one builds for the $250K to $2M owner-operator. That is the operating layer. That is us.</>}
        />
        <CapitalFlow />
        <TwoLayers />
        <SilverTsunami />
        <TAMBreakdown />
        <NamedComp />
        <MoatFour />
        <Sources />
        <AskV2 />
      </div>
      <UpNext current="/opportunity" />
      <SiteFooter />
    </main>
  );
}

function PageHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: React.ReactNode }) {
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

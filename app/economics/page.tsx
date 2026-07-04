import { UnitEconomics, PricingV3, Roadmap } from '@/components/SectionsV3';
import { UnitMath, CostToDeliver, PathToProfit, BenchmarkComp } from '@/components/ModelProfile';
import { AskV2 } from '@/components/ExtendedSections';
import { TopNav } from '@/components/TopNav';
import { SiteFooter, UpNext } from '@/components/HomeTeasers';

export const metadata = {
  title: 'Model',
  description: 'The StayBookt model: unit economics, pricing, and how the business compounds.',
  alternates: { canonical: '/economics' },
};

export default function EconomicsPage() {
  return (
    <main id="top" className="relative">
      <TopNav active="economics" />
      <div className="pt-20">
        <PageHeader
          eyebrow="Model"
          title="Retainer plus performance. Built to compound."
          sub="$4,000 Foundation buildout, sold up front. $1,999 to $3,499 monthly retainer, sold by tier. Optional 10% performance fee on attributable revenue. Below: the unit math per client, what one client costs us, the curve to cash-positive at roughly 30 clients, and how the model compares to the public comps. Math is transparent, assumptions are labeled."
        />
        <UnitMath />
        <CostToDeliver />
        <UnitEconomics />
        <PathToProfit />
        <BenchmarkComp />
        <PricingV3 />
        <Roadmap />
        <AskV2 />
      </div>
      <UpNext current="/economics" />
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

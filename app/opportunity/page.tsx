import { WhyNow, CompetitiveLandscapeV2 } from '@/components/SectionsV3';
import { AskV2 } from '@/components/ExtendedSections';
import { TopNav } from '@/components/TopNav';
import { SiteFooter, UpNext } from '@/components/HomeTeasers';

export const metadata = { title: 'Opportunity — StayBookt' };

export default function OpportunityPage() {
  return (
    <main id="top" className="relative">
      <TopNav active="opportunity" />
      <div className="pt-20">
        <PageHeader
          eyebrow="Market + timing"
          title="$108M ARR opportunity. Smart money is consolidating the trades."
          sub="The tools layer is funded. The roll-up layer is funded. The owner-operator is still answering the phone himself."
        />
        <WhyNow />
        <CompetitiveLandscapeV2 />
        <AskV2 />
      </div>
      <UpNext current="/opportunity" />
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

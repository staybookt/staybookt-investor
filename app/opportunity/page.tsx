import { WhyNow, CompetitiveLandscapeV2, Moat } from '@/components/SectionsV3';
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
          eyebrow="You asked: is the market big?"
          title="$135M Canadian ARR opportunity. Smart money is consolidating the trades."
          sub={<>~115K Canadian residential + light-commercial trades businesses. Beachhead: ~15K in ON / BC / AB that fit our ICP, × $9K average annual contract value = <span className="text-white font-semibold">$135M addressable ARR</span> before US expansion. The tools layer is funded. The roll-up layer is funded. The owner-operator is still answering the phone himself.</>}
        />
        <WhyNow />
        <CompetitiveLandscapeV2 />
        <Moat />
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

import { SideBySideTCE, PipelineV2 } from '@/components/SectionsV3';
import { TimCase, AskV2 } from '@/components/ExtendedSections';
import { CustomerOutcomes } from '@/components/OperatingSystem';
import { TopNav } from '@/components/TopNav';
import { SiteFooter, UpNext } from '@/components/HomeTeasers';

export const metadata = { title: 'Proof — StayBookt' };

export default function ProofPage() {
  return (
    <main id="top" className="relative">
      <TopNav active="proof" />
      <div className="pt-20">
        <PageHeader
          eyebrow="Receipts"
          title="The transformation, the numbers, the names."
          sub="One client live. Four in motion. Same playbook, every time."
        />
        <SideBySideTCE />
        <TimCase />
        <CustomerOutcomes />
        <PipelineV2 />
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
        <p className="text-xs tracking-[0.3em] text-plumb font-semibold uppercase mb-6">{eyebrow}</p>
        <h1 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] leading-[0.95] mb-6 max-w-4xl">{title}</h1>
        <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl">{sub}</p>
      </div>
    </section>
  );
}

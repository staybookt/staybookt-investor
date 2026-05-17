import { UnitEconomics, PricingV3, Roadmap } from '@/components/SectionsV3';
import { AskV2 } from '@/components/ExtendedSections';
import { TopNav } from '@/components/TopNav';
import { SiteFooter, UpNext } from '@/components/HomeTeasers';

export const metadata = { title: 'Economics — StayBookt' };

export default function EconomicsPage() {
  return (
    <main id="top" className="relative">
      <TopNav active="economics" />
      <div className="pt-20">
        <PageHeader
          eyebrow="You asked: does the math work?"
          title="Three lines of revenue. One sticky operating layer."
          sub="Website is the wedge — cheap to ship, immediate value. Operating team is the moat — high switching cost, embedded weekly. Compounding playbook is the long game — every client makes the next one easier."
        />
        <UnitEconomics />
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

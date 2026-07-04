import {
  FoundersDeep,
  OwnershipMap,
  RichardPortfolio,
  OperatingBench,
  HiringPlan,
} from '@/components/TeamProfile';
import { AskV2 } from '@/components/ExtendedSections';
import { TopNav } from '@/components/TopNav';
import { SiteFooter, UpNext } from '@/components/HomeTeasers';

export const metadata = {
  title: 'Team',
  description: 'The team behind StayBookt: Jacob Charendoff and Richard Roos.',
  alternates: { canonical: '/team' },
};

export default function TeamPage() {
  return (
    <main id="top" className="relative">
      <TopNav active="team" />
      <div className="pt-20">
        <PageHeader
          eyebrow="Team"
          title="Two founders, on the floor."
          sub="Jacob owns revenue, technology, and go-to-market. Richard owns operations, finance, and business development. We are not consultants and we are not first-time founders. The work we are doing for trades clients is the work we have already done inside SaaS, services, and field-service operating teams. Below: the bios, the ownership map, Richard's roll-up portfolio as the inside-track signal, the operating bench, and the hiring plan tied to client count."
        />
        <FoundersDeep />
        <OwnershipMap />
        <RichardPortfolio />
        <OperatingBench />
        <HiringPlan />
        <AskV2 />
      </div>
      <UpNext current="/team" />
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

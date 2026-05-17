import { Team, AskV2 } from '@/components/ExtendedSections';
import { TopNav } from '@/components/TopNav';
import { SiteFooter, UpNext } from '@/components/HomeTeasers';

export const metadata = { title: 'Team — StayBookt' };

export default function TeamPage() {
  return (
    <main id="top" className="relative">
      <TopNav active="team" />
      <div className="pt-20">
        <PageHeader
          eyebrow="Who is building this"
          title="Two operators. One playbook."
          sub="We've done this work before — inside operating teams, on the tools, shipping product and revenue at the same time. StayBookt is what we wished existed every time we sat in a service-business kitchen."
        />
        <Team />
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
        <p className="text-xs tracking-[0.3em] text-plumb font-semibold uppercase mb-6">{eyebrow}</p>
        <h1 className="font-display text-5xl sm:text-7xl tracking-[-0.04em] leading-[0.95] mb-6 max-w-4xl">{title}</h1>
        <p className="text-platinum-soft text-base sm:text-lg leading-relaxed max-w-3xl">{sub}</p>
      </div>
    </section>
  );
}

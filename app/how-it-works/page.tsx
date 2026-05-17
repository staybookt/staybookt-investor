import { StayBooktOS, NinetyDayPlaybook, WeeklyOps } from '@/components/OperatingSystem';
import { AskV2 } from '@/components/ExtendedSections';
import { TopNav } from '@/components/TopNav';
import { SiteFooter, UpNext } from '@/components/HomeTeasers';

export const metadata = { title: 'How it works — StayBookt' };

export default function HowItWorksPage() {
  return (
    <main id="top" className="relative">
      <TopNav active="how-it-works" />
      <div className="pt-20">
        <PageHeader
          eyebrow="You asked: how does the OS run?"
          title="How we deliver — every client, every week."
          sub={<>The <span className="wordmark-gradient">StayBookt</span> OS is the playbook. The 90-day onboarding is the unit. The weekly cadence is the proof we&apos;re still running it.</>}
        />
        <StayBooktOS />
        <NinetyDayPlaybook />
        <WeeklyOps />
        <AskV2 />
      </div>
      <UpNext current="/how-it-works" />
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

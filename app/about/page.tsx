import Link from 'next/link';
import Image from 'next/image';
import { TopNav } from '@/components/TopNav';
import { CAL_LINK } from '@/lib/site';

export const metadata = {
  title: 'About',
  alternates: { canonical: '/about' },
  description: 'Two founders, no layers. One saw the gap from the outside, working alongside owners. The other ran the discipline from the inside, at scale.',
};

function FounderCard({ photo, name, role, lens, bio }: { photo: string; name: string; role: string; lens: string; bio: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="relative aspect-[4/3] w-full bg-ink">
        <Image src={photo} alt={name} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <div className="p-7 sm:p-8">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="font-display text-2xl leading-none tracking-tight text-white">{name}</h3>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">{lens}</p>
        </div>
        <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-hvac-light">{role}</p>
        <p className="text-[15px] leading-relaxed text-platinum-soft">{bio}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <TopNav active="about" />
      <main className="bg-ink-deep">
        <section className="px-6 pb-10 pt-36 sm:px-12 sm:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-elec-light">Who you work with</p>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-white sm:text-6xl">
              Two people. No layers.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-platinum-soft sm:text-lg">
              No account manager, no junior handling your account, no agency telephone game. You talk to a founder on day
              one and every day after.
            </p>
          </div>
        </section>

        <section className="px-6 py-8 sm:px-12">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <FounderCard
              photo="/photos/jacob.jpg"
              name="Jacob Charendoff"
              role="Co-founder · Builder"
              lens="The outside view"
              bio="A decade alongside service-business owners across health, hospitality, software, retail, and home services. The same conversation every time: the owner is brilliant at the work, the work is good, and the follow-up falls through the cracks. He builds the system from the outside in."
            />
            <FounderCard
              photo="/photos/richard.jpg"
              name="Richard Roos, CPA"
              role="Co-founder · Operator"
              lens="The inside view"
              bio="Two-plus decades of executive-level leadership in high-growth service businesses at scale. Responsible for multiple start-up efforts and for leading significant growth at Venterra from $15M to $500M+ in revenue. A deep understanding of the entire customer journey and every aspect of delivering world-class revenue performance. A CPA with a passion for operations and for leveraging technology to deliver tangible results."
            />
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center font-display text-xl leading-snug tracking-tight text-platinum sm:text-2xl">
            The system they both wished existed, for the people they kept running into.
          </p>
        </section>

        <section className="px-6 py-20 sm:px-12">
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl tracking-tight text-white">Talk to one of us</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-platinum-soft">30 minutes, no pitch deck. We learn your business and tell you straight whether we can help.</p>
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="mt-7 inline-block rounded-lg bg-gradient-to-r from-elec to-hvac px-8 py-4 text-base font-bold text-ink transition-transform hover:-translate-y-0.5">Book a 30-minute call</a>
          </div>
        </section>
      </main>
    </>
  );
}

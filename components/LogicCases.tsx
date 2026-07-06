// LogicCases — the two or three most compelling reasons owners choose StayBookt,
// rendered as dark highlight cards on a warm cream section.
// Server component: no client hooks, no motion.

type Case = {
  headline: string;
  body: string;
};

const CASES: Case[] = [
  {
    headline: 'We only make money when you do.',
    body: 'We build it, we run it, and we only get paid when it brings you work. If the phone does not ring more, we have not earned a cent.',
  },
  {
    headline: 'One system, not ten tabs.',
    body: 'The website, the receptionist, the booking, the follow-up, the reviews: one platform, run for you. Not another app you have to babysit.',
  },
  {
    headline: 'Priced for a business your size.',
    body: 'An executive-grade front office without the executive-grade payroll. You do not have to be big to run like you are.',
  },
];

export default function LogicCases() {
  return (
    <section className="bg-cream py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-hvac">
          Why owners choose it
        </p>
        <h2 className="mt-4 font-display tracking-[-0.03em] text-ink text-3xl sm:text-4xl md:text-5xl">
          The case is simple.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CASES.map((c) => (
            <div
              key={c.headline}
              className="rounded-2xl bg-ink text-white p-8"
            >
              <h3 className="font-display tracking-[-0.03em] text-white text-2xl">
                {c.headline}
              </h3>
              <p className="mt-4 text-platinum leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials — owner quotes. These are PLACEHOLDER quotes pending approval,
// so each card carries an amber "PLACEHOLDER — pending approval" pill. Do not
// present as verified. Server component: no client hooks, no motion.

type Quote = {
  quote: string;
  attribution: string;
};

const QUOTES: Quote[] = [
  {
    quote:
      'My old site never once sent me a lead. Now people show up to the first call already knowing who I am, and my calendar fills itself.',
    attribution: 'Tim Ciszkowski, Top Choice Electrical',
  },
  {
    quote:
      'I used to answer the phone on a ladder. StayBookt picks up every call and books the job, so I can actually run the crew and get home for dinner.',
    attribution: 'Evert, XNL',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-paper py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-hvac">
          In their words
        </p>
        <h2 className="mt-4 font-display tracking-[-0.03em] text-ink text-3xl sm:text-4xl md:text-5xl">
          The owners we build for.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {QUOTES.map((q) => (
            <figure
              key={q.attribution}
              className="rounded-2xl border border-[#E5E7EB] p-8"
            >
              <span className="inline-flex text-[11px] font-semibold uppercase tracking-wide text-[#B45309] bg-[#FEF3C7] rounded-full px-2.5 py-1">
                Placeholder — pending approval
              </span>
              <blockquote className="mt-5 text-lg text-ink leading-relaxed">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-mute">
                {q.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

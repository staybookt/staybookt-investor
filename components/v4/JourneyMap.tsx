import Reveal from '@/components/v4/Reveal';

/* The customer journey: the owner's arc from drowning to free, told as one
 * gradient-threaded map (cold -> warm). Lives on a dark section so the brand
 * gradient glows. Lightweight on-view reveals, no pinning. */
const STOPS: { stage: string; feel: string; color: string }[] = [
  { stage: 'Drowning', feel: "You're the bottleneck. The phone never stops.", color: '#3b7fd0' },
  { stage: 'Found', feel: 'The work starts coming to you.', color: '#1ec8c8' },
  { stage: 'Handed off', feel: 'The business runs without you.', color: '#16c088' },
  { stage: 'An asset', feel: "Now it's worth something.", color: '#7bbf4a' },
  { stage: 'Free', feel: 'You get your life back.', color: '#e6b24d' },
];

export default function JourneyMap() {
  return (
    <section className="jmap">
      <div className="wrap">
        <Reveal className="eyebrow" as="div">
          <span style={{ color: '#8b93a5' }}>The journey</span>
        </Reveal>
        <Reveal>
          <h2>From the grind to the life you meant to live.</h2>
        </Reveal>
        <div className="jmap-track">
          {STOPS.map((s, i) => (
            <Reveal
              key={s.stage}
              className="jmap-stop"
              delay={i === 0 ? undefined : ((i > 3 ? 3 : i) as 1 | 2 | 3)}
            >
              <span
                className="jmap-dot"
                style={{ background: s.color, boxShadow: `0 0 0 5px ${s.color}22, 0 0 24px ${s.color}88` }}
              />
              <span className="jmap-stage">{s.stage}</span>
              <span className="jmap-feel">{s.feel}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

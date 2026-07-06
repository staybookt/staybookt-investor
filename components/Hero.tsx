import { CAL_LINK } from '@/lib/site';

/* Homepage V2 hero — ported faithfully from the approved static mockup.
 * Dark aura + film grain + a sweeping "Bookt" wordmark, all pure CSS
 * animation, so this stays a server component. Scoped by the .hpv2 class
 * that wraps the page; .reveal in-view classes are handled by <Reveal>. */
export default function Hero() {
  return (
    <header className="hero">
      <div className="aura" />
      <div className="veil" />
      <div className="grain" />
      <div className="wrap hero-in">
        <div className="eyebrow on-dark reveal" style={{ marginBottom: 26 }}>
          The operating layer for the trades
        </div>
        <h1 className="reveal d1">
          Stay<span className="bk">Bookt</span>
          <span style={{ color: 'var(--hp-violet)' }}>.</span>
          <span className="life">Enjoy Life.</span>
        </h1>
        <p className="lead reveal d2">
          You built this for a life, not a phone that never stops ringing. We run the whole front
          office, and only get paid when it brings you work.
        </p>
        <div className="cta reveal d3">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-white"
            style={{ padding: '13px 26px', fontSize: 15 }}
          >
            Book a 30-minute call
          </a>
          <a href="#f1" className="arrowlink">
            See how it runs {'↓'}
          </a>
        </div>
        <div className="subnote reveal d3">30 minutes with a founder. No pitch. No lock-in.</div>
      </div>
      <div className="scrollcue">{'↓'}</div>
    </header>
  );
}

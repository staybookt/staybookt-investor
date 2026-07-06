import { CAL_LINK } from '@/lib/site';

/* Homepage hero. The headline/CTA animate IN ON LOAD via self-contained CSS
 * (keyframes below), NOT via the scroll-based <Reveal> observer — the hero is
 * above the fold, so it must be visible immediately even before any JS runs. */
export default function Hero() {
  return (
    <header className="hero">
      <style>{`
        @keyframes hpRise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
        .hpv2 .hero .hpRise{opacity:0;animation:hpRise .9s cubic-bezier(.16,1,.3,1) forwards}
        .hpv2 .hero .hpR1{animation-delay:.10s}
        .hpv2 .hero .hpR2{animation-delay:.22s}
        .hpv2 .hero .hpR3{animation-delay:.34s}
        @media(prefers-reduced-motion:reduce){.hpv2 .hero .hpRise{opacity:1;animation:none}}
      `}</style>
      <div className="aura" />
      <div className="veil" />
      <div className="grain" />
      <div className="wrap hero-in">
        <div className="eyebrow on-dark hpRise" style={{ marginBottom: 26 }}>
          The operating layer for the trades
        </div>
        <h1 className="hpRise hpR1">
          Stay<span className="bk">Bookt</span>
          <span style={{ color: 'var(--hp-violet)' }}>.</span>
          <span className="life">Enjoy Life.</span>
        </h1>
        <p className="lead hpRise hpR2">
          You built this for a life, not a phone that never stops ringing. We run the whole front
          office, and only get paid when it brings you work.
        </p>
        <div className="cta hpRise hpR3">
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
            See how it runs
          </a>
        </div>
        <div className="subnote hpRise hpR3">30 minutes with a founder. No pitch. No lock-in.</div>
      </div>
      <div className="scrollcue">{'↓'}</div>
    </header>
  );
}

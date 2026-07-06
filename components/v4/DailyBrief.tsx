'use client';

import { useEffect, useRef, useState } from 'react';

/* Ported from product-dailybrief.html. Cards rise in sequence and the overnight
 * revenue counts up when the phone scrolls into view. Reduced motion reveals
 * everything at once with the final number. */
export default function DailyBrief() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [cards, setCards] = useState<boolean[]>([false, false, false, false]);
  const [rev, setRev] = useState('$0');
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      if (played.current) return;
      played.current = true;

      if (reduce) {
        setCards([true, true, true, true]);
        setRev('$2,140');
        return;
      }

      [0, 1, 2, 3].forEach((i) => {
        timers.push(
          setTimeout(
            () => setCards((prev) => prev.map((v, idx) => (idx === i ? true : v))),
            500 + i * 450,
          ),
        );
      });

      timers.push(
        setTimeout(() => {
          const target = 2140;
          let start: number | null = null;
          const step = (ts: number) => {
            if (start === null) start = ts;
            const k = Math.min((ts - start) / 1000, 1);
            setRev('$' + Math.round(target * (1 - Math.pow(1 - k, 3))).toLocaleString());
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }, 700),
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const sc = (i: number) => (cards[i] ? ' show' : '');

  return (
    <div className="brf-phone" ref={ref}>
      <div className="brf-screen">
        <div className="brf-island" />
        <div className="brf-statusbar">
          <span>9:41</span>
          <span className="r">StayBookt</span>
        </div>
        <div className="brf-app">
          <div className="brf-greet">Tuesday, July 7</div>
          <div className="brf-hero-line">Good morning, Jacob.</div>
          <div className="brf-live">
            <span className="d" />
            Running live
          </div>

          <div className={`brf-card${sc(0)}`}>
            <div className="top">
              <span className="lbl">BOOKED WHILE YOU SLEPT</span>
              <span className="brf-chip g">+3 jobs</span>
            </div>
            <div className="big">{rev}</div>
            <div className="sub">3 jobs booked overnight</div>
          </div>

          <div className={`brf-card${sc(1)}`}>
            <div className="top">
              <span className="lbl">NEEDS YOU</span>
              <span className="brf-chip a">1</span>
            </div>
            <div className="big" style={{ fontSize: 17, marginTop: 8 }}>
              Quote for a panel upgrade, $4,200
            </div>
            <div className="sub">Approve and we send it</div>
          </div>

          <div className={`brf-card${sc(2)}`}>
            <div className="top">
              <span className="lbl">CAME IN</span>
              <span className="brf-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            </div>
            <div className="big" style={{ fontSize: 17, marginTop: 8 }}>
              2 new five-star reviews
            </div>
            <div className="sub">Maria L. and Tim K.</div>
          </div>

          <div className={`brf-card brf-next${sc(3)}`}>
            <div className="t">
              <b>9:00</b>
              <span>AM</span>
            </div>
            <div>
              <div className="lbl" style={{ color: '#0a0e14', fontSize: 14 }}>
                Next up
              </div>
              <div className="sub" style={{ marginTop: 2 }}>
                Panel upgrade &middot; Mike &middot; Newmarket
              </div>
            </div>
          </div>
        </div>
        <div className="brf-tabbar">
          <div className="brf-tab on">
            <i />
            Brief
          </div>
          <div className="brf-tab">
            <i />
            Jobs
          </div>
          <div className="brf-tab">
            <i />
            Quotes
          </div>
          <div className="brf-tab">
            <i />
            Reviews
          </div>
        </div>
      </div>
    </div>
  );
}

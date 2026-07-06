'use client';

import { useEffect, useRef, useState } from 'react';

/* THIS WEEK activity card. The dollar amounts count up (cubic ease-out over
 * 900ms) once the card scrolls into view (threshold .5), staggered ~260ms
 * apart. A new-lead row then slides in ~1.5s after entering view. Mirrors the
 * mockup JS. */
type Row =
  | { label: string; kind: 'text'; value: string }
  | { label: string; kind: 'count'; target: number; prefix: string };

const ROWS: Row[] = [
  { label: 'Quote sent · Panel upgrade', kind: 'text', value: 'chasing' },
  { label: 'Quote accepted · Rewire', kind: 'count', target: 4200, prefix: '$' },
  { label: 'Review requested · Tim K.', kind: 'text', value: '★★★★★' },
  { label: 'Repeat booked · Maria L.', kind: 'count', target: 680, prefix: '$' },
];

function CountUp({
  target,
  prefix,
  run,
  startDelay,
}: {
  target: number;
  prefix: string;
  run: boolean;
  startDelay: number;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start: number | null = null;
    const timer = setTimeout(() => {
      const step = (ts: number) => {
        if (start === null) start = ts;
        const k = Math.min((ts - start) / 900, 1);
        setVal(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, startDelay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, target, startDelay]);
  return (
    <span className="amt">
      {prefix}
      {val.toLocaleString()}
    </span>
  );
}

export default function ActivityCard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let freshTimer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRun(true);
            freshTimer = setTimeout(() => setFresh(true), 1500);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(freshTimer);
    };
  }, []);

  let countIndex = 0;

  return (
    <div className="card-mock" ref={ref}>
      <h4>THIS WEEK</h4>
      {ROWS.map((r, i) => {
        const delay = r.kind === 'count' ? countIndex++ * 260 : 0;
        return (
          <div className="row" key={i}>
            <span>
              <span className="dotG" />
              {r.label}
            </span>
            {r.kind === 'count' ? (
              <CountUp target={r.target} prefix={r.prefix} run={run} startDelay={delay} />
            ) : (
              <span className="muted">{r.value}</span>
            )}
          </div>
        );
      })}
      <div className={`row fresh${fresh ? ' show' : ''}`}>
        <span>
          <span className="dotG" />
          New lead · Google
        </span>
        <span className="muted">just now</span>
      </div>
    </div>
  );
}

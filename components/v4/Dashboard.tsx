'use client';

import { useEffect, useRef, useState } from 'react';

/* Ported from product-dashboard.html. The window scales in, the revenue line
 * draws (CSS, gated by .in), and the KPI numbers count up when the frame
 * scrolls into view. Reduced motion shows final values instantly. */
export default function Dashboard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [booked, setBooked] = useState('$0');
  const [jobs, setJobs] = useState('0');
  const [reviews, setReviews] = useState('0');
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const countUp = (
      target: number,
      prefix: string,
      set: (v: string) => void,
      delay: number,
    ) => {
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const k = Math.min((ts - start) / 1100, 1);
        const val = Math.round(target * (1 - Math.pow(1 - k, 3)));
        set(prefix + val.toLocaleString());
        if (k < 1) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), delay);
    };

    const run = () => {
      if (played.current) return;
      played.current = true;
      setInView(true);
      if (reduce) {
        setBooked('$12,480');
        setJobs('18');
        setReviews('6');
        return;
      }
      setTimeout(() => {
        countUp(12480, '$', setBooked, 0);
        countUp(18, '', setJobs, 140);
        countUp(6, '', setReviews, 280);
      }, 600);
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
    return () => io.disconnect();
  }, []);

  return (
    <div className={`db-frame${inView ? ' in' : ''}`} ref={ref}>
      <aside className="db-side">
        <div className="db-brand">
          Stay<span className="g">Bookt</span>
        </div>
        <nav className="db-nav">
          <a className="on" href="#">
            <i />
            Dashboard
          </a>
          <a href="#">
            <i />
            Jobs
          </a>
          <a href="#">
            <i />
            Pipeline
          </a>
          <a href="#">
            <i />
            Reviews
          </a>
          <a href="#">
            <i />
            Customers
          </a>
          <a href="#">
            <i />
            Analytics
          </a>
        </nav>
        <div className="db-oper">
          <div className="av" />
          <div>
            <div className="nm">Maria</div>
            <div className="ro">Your operator</div>
          </div>
        </div>
      </aside>

      <main className="db-main">
        <div className="db-head">
          <div>
            <div className="g">Tuesday, July 7</div>
            <h3>This week</h3>
          </div>
          <div className="db-live">
            <span className="d" />
            Running live
          </div>
        </div>

        <div className="db-kpis">
          <div className="db-kpi hero">
            <div className="l">Booked</div>
            <div className="v">{booked}</div>
            <div className="c">&uarr; 22% vs last week</div>
          </div>
          <div className="db-kpi">
            <div className="l">Jobs</div>
            <div className="v">{jobs}</div>
            <div className="c">&uarr; 4</div>
          </div>
          <div className="db-kpi">
            <div className="l">Calls answered</div>
            <div className="v">100%</div>
            <div className="c">0 to voicemail</div>
          </div>
          <div className="db-kpi">
            <div className="l">New reviews</div>
            <div className="v">{reviews}</div>
            <div className="c">4.9 avg</div>
          </div>
        </div>

        <div className="db-grid2">
          <div className="db-panel">
            <h4>Revenue</h4>
            <div className="ps">Last 8 weeks</div>
            <svg className="db-chart" viewBox="0 0 520 170" preserveAspectRatio="none">
              <defs>
                <linearGradient id="v4gr" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#06b6d4" />
                  <stop offset=".5" stopColor="#10b981" />
                  <stop offset="1" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="v4ar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(16,185,129,.22)" />
                  <stop offset="1" stopColor="rgba(16,185,129,0)" />
                </linearGradient>
              </defs>
              <path
                className="area"
                d="M0,130 L70,120 L140,124 L210,96 L280,102 L350,70 L420,58 L520,34 L520,170 L0,170 Z"
              />
              <path
                className="ln"
                d="M0,130 L70,120 L140,124 L210,96 L280,102 L350,70 L420,58 L520,34"
              />
            </svg>
          </div>
          <div className="db-panel">
            <h4>Needs you</h4>
            <div className="ps">1 item</div>
            <div className="db-rows">
              <div className="row">
                <span>
                  <span className="dot" style={{ background: '#f59e0b' }} />
                  Quote &middot; Panel upgrade
                </span>
                <span className="amt">$4,200</span>
              </div>
              <div className="row">
                <span>
                  <span className="dot" />
                  Quote accepted &middot; Rewire
                </span>
                <span className="amt">$3,100</span>
              </div>
              <div className="row">
                <span>
                  <span className="dot" />
                  Repeat booked &middot; Maria L.
                </span>
                <span className="amt">$680</span>
              </div>
              <div className="row">
                <span>
                  <span className="dot" />
                  New lead &middot; Google
                </span>
                <span className="mut">booked</span>
              </div>
              <div className="row">
                <span>
                  <span className="dot" />
                  Review &middot; Tim K.
                </span>
                <span className="mut">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState, useContext } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { ScrubContext } from './ProductScrub';

/* Ported from product-dashboard.html. Now scrubbed by scroll progress passed
 * from ProductScrub: the window scales up and lifts, the revenue line draws
 * proportional to progress (stroke-dashoffset mapped to progress), and the KPI
 * numbers count up mapped to progress. At progress 1 (static / reduced-motion)
 * everything is at its final state. */

const DASH = 1400; // matches stroke-dasharray in CSS

function counter(p: number, target: number, start: number, end: number) {
  if (p <= start) return 0;
  if (p >= end) return target;
  const k = (p - start) / (end - start);
  return Math.round(target * k);
}

export default function Dashboard() {
  const still = useMotionValue(1);
  const ctx = useContext(ScrubContext);
  const progress = ctx ?? still;
  const [p, setP] = useState(progress.get());
  useMotionValueEvent(progress, 'change', setP);

  const booked = '$' + counter(p, 12480, 0.15, 0.85).toLocaleString();
  const jobs = counter(p, 18, 0.2, 0.85).toString();
  const reviews = counter(p, 6, 0.25, 0.85).toString();

  // Window scale + lift as you scroll in.
  const scale = useTransform(progress, [0, 0.5], [0.95, 1]);
  const y = useTransform(progress, [0, 0.5], [26, 0]);
  const opacity = useTransform(progress, [0, 0.16], [0, 1]);

  // Line draws proportional to progress: offset goes DASH -> 0 across the scrub.
  const dashOffset = useTransform(progress, [0.12, 0.82], [DASH, 0]);
  const areaOpacity = useTransform(progress, [0.7, 0.95], [0, 1]);

  return (
    <motion.div className="db-frame" style={{ scale, y, opacity }}>
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
              <motion.path
                className="area"
                style={{ opacity: areaOpacity }}
                d="M0,130 L70,120 L140,124 L210,96 L280,102 L350,70 L420,58 L520,34 L520,170 L0,170 Z"
              />
              <motion.path
                className="ln"
                style={{ strokeDashoffset: dashOffset }}
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
    </motion.div>
  );
}

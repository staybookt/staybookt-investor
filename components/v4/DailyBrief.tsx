'use client';

import { useState, useContext } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { ScrubContext } from './ProductScrub';

/* Ported from product-dailybrief.html. Now scrubbed by scroll progress passed
 * from ProductScrub: the brief cards rise in one at a time as progress passes
 * their thresholds, the overnight revenue counts up mapped to progress, and the
 * live dot keeps pulsing (CSS). At progress 1 (static / reduced-motion) all
 * cards are shown with the final number. */

const CARD_T = [0.12, 0.34, 0.54, 0.74];

export default function DailyBrief() {
  const still = useMotionValue(1);
  const ctx = useContext(ScrubContext);
  const progress = ctx ?? still;
  const [p, setP] = useState(progress.get());
  useMotionValueEvent(progress, 'change', setP);

  const revNum = (() => {
    const target = 2140;
    if (p <= 0.12) return 0;
    if (p >= 0.7) return target;
    return Math.round(target * ((p - 0.12) / (0.7 - 0.12)));
  })();
  const rev = '$' + revNum.toLocaleString();

  // Device settle.
  const scale = useTransform(progress, [0, 0.5], [0.96, 1]);
  const opacity = useTransform(progress, [0, 0.14], [0, 1]);

  const sc = (i: number) => (p >= CARD_T[i] ? ' show' : '');

  return (
    <motion.div className="brf-phone" style={{ scale, opacity }}>
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
    </motion.div>
  );
}

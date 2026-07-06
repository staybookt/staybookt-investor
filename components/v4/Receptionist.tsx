'use client';

import { useState, useContext } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { ScrubContext } from './ProductScrub';

/* Ported from product-receptionist.html. The iMessage thread is now scrubbed by
 * scroll progress (0->1) passed from ProductScrub: each bubble reveals as
 * progress passes its threshold, the typing indicator shows in the gaps between
 * messages, the device settles with a subtle scale + rotateX, and the dispatch
 * card lands near progress 0.9. At progress 1 (static / reduced-motion) the whole
 * thread is shown at once. */

// Reveal thresholds along the scrub for each beat.
const T = {
  m1: 0.12,
  typing1: 0.2,
  m2: 0.34,
  m3: 0.46,
  typing2: 0.54,
  m4: 0.66,
  bk: 0.82,
  delivered: 0.9,
};

export default function Receptionist() {
  const still = useMotionValue(1);
  const ctx = useContext(ScrubContext);
  const progress = ctx ?? still;
  const [p, setP] = useState(progress.get());
  useMotionValueEvent(progress, 'change', setP);

  const m1 = p >= T.m1;
  const m2 = p >= T.m2;
  const m3 = p >= T.m3;
  const m4 = p >= T.m4;
  const bk = p >= T.bk;
  const delivered = p >= T.delivered;
  // Typing shows only in the gaps just before an outbound reply lands.
  const typing = (p >= T.typing1 && p < T.m2) || (p >= T.typing2 && p < T.m4);

  // Device settle: scales up and a slight rotateX flattens as you scroll in.
  const scale = useTransform(progress, [0, 0.5], [0.96, 1]);
  const rotateX = useTransform(progress, [0, 0.5], [6, 0]);

  return (
    <motion.div
      className="rc-phone"
      style={{ scale, rotateX, transformPerspective: 1200 }}
    >
      <div className="rc-screen">
        <div className="rc-island" />
        <div className="rc-imhdr">
          <div className="chev">&lsaquo;</div>
          <div className="av">TC</div>
          <div className="nm">New lead &middot; 905-555-0148</div>
          <div className="sub">Handled by StayBookt</div>
        </div>
        <div className="rc-thread">
          <div className="rc-ts">
            <b>Today</b> 2:14 AM
          </div>
          <div className="rc-row in">
            <div className={`rc-b in${m1 ? ' show' : ''}`}>
              Hi, my furnace just died and it&rsquo;s freezing in here. Can someone come out?
            </div>
          </div>
          <div className={`rc-typing${typing ? ' show' : ''}`}>
            <span />
            <span />
            <span />
          </div>
          <div className="rc-row out">
            <div className={`rc-b out${m2 ? ' show' : ''}`}>
              That&rsquo;s an emergency, I&rsquo;m on it. Mike can be there within the hour. Should I send him now?
            </div>
          </div>
          <div className="rc-row in">
            <div className={`rc-b in${m3 ? ' show' : ''}`}>Yes please 🙏</div>
          </div>
          <div className="rc-row out">
            <div className={`rc-b out${m4 ? ' show' : ''}`}>
              Done. Mike is on his way, about 40 minutes out. I&rsquo;ll text you when he&rsquo;s close.
            </div>
          </div>
          <div className={`rc-bkcard${bk ? ' show' : ''}`}>
            <div className="cap">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}>
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Dispatched
            </div>
            <div className="body">
              <div className="r">
                <span className="k">When</span>
                <span className="v">Tonight, ETA 40 min</span>
              </div>
              <div className="r">
                <span className="k">Job</span>
                <span className="v">Furnace, no heat</span>
              </div>
              <div className="r">
                <span className="k">Tech</span>
                <span className="v">Mike, en route</span>
              </div>
            </div>
          </div>
          <div className={`rc-delivered${delivered ? ' show' : ''}`}>Delivered</div>
        </div>
        <div className="rc-inputbar">
          <div className="rc-field">iMessage</div>
          <div className="rc-send">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}>
              <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

/* Ported from product-receptionist.html. The iMessage thread animates in on a
 * scripted timeline that fires when the phone scrolls into view (not on mount),
 * and only once. Respects prefers-reduced-motion by showing everything at once. */
export default function Receptionist() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [m1, setM1] = useState(false);
  const [m2, setM2] = useState(false);
  const [m3, setM3] = useState(false);
  const [m4, setM4] = useState(false);
  const [typing, setTyping] = useState(false);
  const [bk, setBk] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const showAll = () => {
      setM1(true);
      setM2(true);
      setM3(true);
      setM4(true);
      setBk(true);
      setDelivered(true);
    };

    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      if (played.current) return;
      played.current = true;
      if (reduce) {
        showAll();
        return;
      }
      timers.push(setTimeout(() => setM1(true), 500));
      timers.push(setTimeout(() => setTyping(true), 1300));
      timers.push(
        setTimeout(() => {
          setTyping(false);
          setM2(true);
        }, 2400),
      );
      timers.push(setTimeout(() => setM3(true), 3300));
      timers.push(setTimeout(() => setTyping(true), 3900));
      timers.push(
        setTimeout(() => {
          setTyping(false);
          setM4(true);
        }, 4900),
      );
      timers.push(setTimeout(() => setBk(true), 5600));
      timers.push(setTimeout(() => setDelivered(true), 6100));
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
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="rc-phone" ref={ref}>
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
              Hi, my furnace just died and it&rsquo;s freezing in here. Can someone come tomorrow?
            </div>
          </div>
          <div className={`rc-typing${typing ? ' show' : ''}`}>
            <span />
            <span />
            <span />
          </div>
          <div className="rc-row out">
            <div className={`rc-b out${m2 ? ' show' : ''}`}>
              So sorry, that&rsquo;s miserable. I can get Mike out to you at 9am tomorrow. Want me to
              lock it in?
            </div>
          </div>
          <div className="rc-row in">
            <div className={`rc-b in${m3 ? ' show' : ''}`}>Yes please 🙏</div>
          </div>
          <div className="rc-row out">
            <div className={`rc-b out${m4 ? ' show' : ''}`}>
              Done. You&rsquo;re booked for 9am. I&rsquo;ll text a reminder at 8.
            </div>
          </div>
          <div className={`rc-bkcard${bk ? ' show' : ''}`}>
            <div className="cap">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}>
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Job booked
            </div>
            <div className="body">
              <div className="r">
                <span className="k">When</span>
                <span className="v">Tomorrow, 9:00 AM</span>
              </div>
              <div className="r">
                <span className="k">Job</span>
                <span className="v">Furnace, no heat</span>
              </div>
              <div className="r">
                <span className="k">Tech</span>
                <span className="v">Mike</span>
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
    </div>
  );
}

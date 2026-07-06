'use client';

import { useEffect, useRef, useState } from 'react';

/* The 2 AM iMessage booking phone. Bubbles animate in sequence once the phone
 * scrolls into view (threshold .4), then the "Booked while you slept" tag.
 * Timing mirrors the mockup: 400 + i*650ms per bubble, tag after the last. */
const BUBBLES = [
  { dir: 'in', text: "Hey, my furnace just died and it's freezing. Can someone come tomorrow?" },
  { dir: 'out', text: "So sorry, that's the worst. I can get you a 9am slot with Mike. Want me to lock it in?" },
  { dir: 'in', text: 'Yes please!!' },
  { dir: 'out', text: "Booked for 9am. You'll get a reminder at 8. Stay warm." },
] as const;

export default function PhoneBooking() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(0);
  const [tag, setTag] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            BUBBLES.forEach((_, i) => {
              timers.push(setTimeout(() => setShown((n) => Math.max(n, i + 1)), 400 + i * 650));
            });
            timers.push(setTimeout(() => setTag(true), 400 + BUBBLES.length * 650));
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="phone" ref={ref}>
      <div className="screen">
        <div className="bar">
          <span className="av" />
          Messages
        </div>
        {BUBBLES.map((b, i) => (
          <div key={i} className={`bubble ${b.dir}${i < shown ? ' show' : ''}`}>
            {b.text}
          </div>
        ))}
        <div className={`tag${tag ? ' show' : ''}`}>
          <svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5l3.5 3.5L16 5.5" />
          </svg>
          Booked while you slept
        </div>
      </div>
    </div>
  );
}

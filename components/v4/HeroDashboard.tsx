'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { min } from '@/lib/css';

/* THE DASHBOARD — full history:
 *
 * Round 6 (Jacob): pull round 5's standalone "chaos to clarity" section up into the hero
 * itself, as a horizontal CRM-style strip — "red before, green after."
 * Round 7 (Jacob): the dark-glass guess didn't match the rest of the site. White elevated
 * card (same token as GetFoundScene/ReputationScene/AdminScene in HomeJourney.tsx), and
 * the count/color transition slowed down substantially.
 *
 * ROUND 8 (Jacob, Aug 2 2026): "background still on the muskoka chairs, should be white
 * like Journeys, same container." Round 7 fixed the CARD but not the SCENE — a white card
 * still sat on top of the hero's photo, which is exactly the mismatch he's calling out.
 * That treatment works for a single card floating over a photographic scene (that's
 * literally what GetFoundScene does over the Journeys section) but this is a full-width
 * strip, not a single card — it needs a plain module read, not a floating one. Fix: it is
 * its own section now, sitting right after the hero closes, on the same cream background
 * and using the same `.wrap` container class every other section on the page already
 * uses — not a new pattern, the existing one.
 *
 * That move also retires the old "start on mount, timed to land after the hero's own
 * headline choreography" mechanism from round 6 — it existed only because this used to
 * live INSIDE the hero and had to avoid competing with "What You Love" for attention. Now
 * that it's a separate, below-the-hero section, it uses the exact on-view IntersectionObserver
 * pattern every other scene on this page uses (GetFoundScene / ReputationScene / AdminScene
 * in HomeJourney.tsx) instead of a bespoke mount timer.
 *
 * ROUND 8, same message (Jacob): "lack of icons... looks bush league, think how Emma would
 * elevate the UI/UX here." Each stat gets a small icon badge, same visual grammar as the
 * price reveal's per-job icons (HomeJourney.tsx .hjc-job .hjc-ic) — a rounded tinted badge,
 * cycling through the same four brand hues (cyan/emerald/indigo/violet) in the same order,
 * so this strip reads as part of the same design system rather than a bolted-on widget. */

type Stat = { id: string; label: string; from: number; to: number; prefix?: string; suffix?: string; icon: string };

const STATS: Stat[] = [
  { id: 'call', label: 'Missed calls', from: 4, to: 0, icon: 'phone' },
  { id: 'inbox', label: 'Unread inbox', from: 83, to: 0, icon: 'mail' },
  { id: 'invoice', label: 'Overdue', from: 4280, to: 0, prefix: '$', icon: 'cash' },
  { id: 'review', label: 'Reviews this month', from: 0, to: 5, icon: 'star' },
  { id: 'admin', label: 'Hours on admin', from: 6, to: 0, suffix: 'h', icon: 'clock' },
];

/* Same drawing convention as RoleIcon in HomeJourney.tsx: 24x24 viewBox, currentColor
   stroke, round caps/joins — one icon language for the whole page. */
function StatIcon({ id }: { id: string }) {
  const c = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<string, ReactNode> = {
    phone: <path {...c} d="M15.5 13.5c-1.6 1.6-4 .8-5.6-.8-1.6-1.6-2.4-4-.8-5.6l1-1-2.2-2.6-1.2 1.1c-1.9 1.9-1 5.6 1.9 8.5s6.6 3.8 8.5 1.9l1.1-1.2-2.6-2.2-1.1 1z" />,
    mail: <><rect {...c} x="3" y="5.5" width="18" height="13" rx="2.2" /><path {...c} d="M4 7l8 6 8-6" /></>,
    cash: <><circle {...c} cx="12" cy="12" r="8.2" /><path {...c} d="M12 7.3v9.4M14.8 9.6c0-1.3-1.2-2.3-2.8-2.3s-2.8 1-2.8 2.3 1.2 1.9 2.8 2.4 2.8 1 2.8 2.3-1.2 2.3-2.8 2.3-2.8-1-2.8-2.3" /></>,
    star: <path {...c} d="M12 3.3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.2l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3.3z" />,
    clock: <><circle {...c} cx="12" cy="12" r="8.2" /><path {...c} d="M12 7.5V12l3.2 1.9" /></>,
  };
  return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">{paths[id]}</svg>;
}

function Counter({ from, to, prefix = '', suffix = '', start, delay, duration = 900 }: {
  from: number; to: number; prefix?: string; suffix?: string; start: boolean; delay: number; duration?: number;
}) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (!start) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    let t0 = 0;
    const step = (now: number) => {
      if (!t0) t0 = now + delay;
      const t = Math.min(1, Math.max(0, (now - t0) / duration));
      const eased = 1 - (1 - t) ** 3;
      setVal(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start]);
  const shown = Math.round(val).toLocaleString();
  return <span className="hd-num">{prefix}{shown}{suffix}</span>;
}

export default function HeroDashboard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }), { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={`hd-sec${on ? ' on' : ''}`} ref={ref}>
      <style>{min(CSS)}</style>
      <div className="wrap">
        <div className="hd-cap">While you were out</div>
        <div className="hd-bar">
          {STATS.map((s, i) => (
            <div className="hd-seg" key={s.id} style={{ '--i': i } as CSSProperties}>
              <span className="hd-ic"><StatIcon id={s.icon} /></span>
              <Counter from={s.from} to={s.to} prefix={s.prefix} suffix={s.suffix} start={on} delay={i * 260 + 700} duration={2400} />
              <span className="hd-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CSS = `
.hd-sec{background:var(--v4-cream,#f6f6f3);padding:clamp(40px,6vw,64px) 0 clamp(28px,4vw,44px);}

.hd-cap{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#69707d;
  text-align:center;margin-bottom:18px;
  opacity:0;transform:translateY(10px);transition:opacity .7s ease,transform .7s ease;}
.hd-sec.on .hd-cap{opacity:1;transform:none;}

.hd-bar{display:flex;max-width:760px;margin:0 auto;background:#fff;
  border:1px solid #ececf0;border-radius:20px;
  overflow-x:auto;overflow-y:hidden;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;
  box-shadow:0 44px 90px -44px rgba(0,0,0,.4);
  opacity:0;transform:translateY(18px);transition:opacity .8s .1s ease,transform .8s .1s ease;}
.hd-sec.on .hd-bar{opacity:1;transform:none;}
.hd-bar::-webkit-scrollbar{display:none;}
.hd-seg{flex:1 0 132px;scroll-snap-align:start;padding:22px 16px 20px;text-align:center;
  border-left:1px solid #ececf0;}
.hd-seg:first-child{border-left:0;}

/* Icon badges: same tokens as HomeJourney.tsx's .hjc-job:nth-child(n) .hjc-ic cycle, so
   this strip and the price reveal read as the same design system. */
.hd-ic{display:flex;align-items:center;justify-content:center;width:34px;height:34px;
  border-radius:11px;margin:0 auto 10px;border:1px solid transparent;}
.hd-seg:nth-child(1) .hd-ic{color:#38bdf8;background:rgba(14,165,233,.1);border-color:rgba(14,165,233,.22);}
.hd-seg:nth-child(2) .hd-ic{color:#34d399;background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.22);}
.hd-seg:nth-child(3) .hd-ic{color:#818cf8;background:rgba(79,70,229,.12);border-color:rgba(79,70,229,.24);}
.hd-seg:nth-child(4) .hd-ic{color:#a78bfa;background:rgba(124,58,237,.1);border-color:rgba(124,58,237,.22);}
.hd-seg:nth-child(5) .hd-ic{color:#38bdf8;background:rgba(14,165,233,.1);border-color:rgba(14,165,233,.22);}

/* Color eases red -> green once its own Counter has landed. transition-delay is kept in
   sync by hand with the Counter's own delay+duration math above (i*260+700 start,
   2400ms run -> lands at i*260+3100ms). */
.hd-num{display:block;font-variant-numeric:tabular-nums;font-size:clamp(21px,2.4vw,27px);font-weight:700;
  letter-spacing:-.02em;color:#dc2626;}
.hd-sec.on .hd-bar .hd-seg .hd-num{color:#059669;transition:color 1.3s ease;transition-delay:calc(var(--i) * .26s + 3.1s);}
.hd-lbl{display:block;margin-top:5px;font-size:12px;color:#69707d;white-space:nowrap;}

@media(prefers-reduced-motion:reduce){
  .hd-cap,.hd-bar{transition:none;opacity:1;transform:none;}
}
@media(max-width:640px){
  .hd-bar{max-width:100%;}
  .hd-seg{flex:0 0 126px;}
}
`;

'use client';

import { useEffect, useRef, useState } from 'react';

/* Three signature scenes for the About page. All are IntersectionObserver-driven
 * (play once on view) rather than scroll-scrubbed, because scroll-scrubbing
 * lagged on desktop and was removed from this codebase. */

function useOnView<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) el.classList.add('on'); }),
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ============================================================
 * 1. THE MISSED CALL
 * 6:47 on a Tuesday. It rings out. They call the next name.
 * This is the problem, in four seconds, with no narration.
 * ========================================================== */
export function MissedCall() {
  const ref = useOnView<HTMLDivElement>(0.45);
  return (
    <div className="mc" ref={ref}>
      <div className="mc-phone">
        <div className="mc-top">
          <span className="mc-time">Tue 6:47 PM</span>
          <span className="mc-sig" aria-hidden>
            <i /><i /><i /><i />
          </span>
        </div>
        <div className="mc-body">
          <div className="mc-ring" aria-hidden>
            <span className="r1" />
            <span className="r2" />
            <span className="r3" />
            <span className="mc-av">?</span>
          </div>
          <div className="mc-who">Unknown caller</div>
          <div className="mc-sub">Mobile &middot; Newmarket</div>
          <div className="mc-acts">
            <span className="mc-b red" />
            <span className="mc-b green" />
          </div>
          <div className="mc-missed">Missed call</div>
        </div>
        <div className="mc-hand">You are on a job. Both hands full.</div>
      </div>

      <div className="mc-next">
        <div className="mc-nlabel">Meanwhile, on their phone</div>
        <div className="mc-row dim">
          <span className="d" />
          <span className="n">Your business</span>
          <span className="t">No answer</span>
        </div>
        <div className="mc-row hit">
          <span className="d" />
          <span className="n">The next name on the list</span>
          <span className="t">Answered</span>
        </div>
        <div className="mc-out">That job was already yours.</div>
      </div>
    </div>
  );
}

/* ============================================================
 * 2. THE ORG CHART THAT COLLAPSES
 * Interactive. Toggle between the front office you actually have
 * (five seats, all filled by you, at 9pm) and the one you get.
 * ========================================================== */
const SEATS = [
  { r: 'Reception', d: 'Answers the phone' },
  { r: 'Dispatch', d: 'Books the job' },
  { r: 'Quotes', d: 'Chases the yes' },
  { r: 'Reputation', d: 'Earns the reviews' },
  { r: 'Numbers', d: 'Reads it back to you' },
];

export function OrgChart() {
  const ref = useOnView<HTMLDivElement>(0.35);
  const [sb, setSb] = useState(false);

  return (
    <div className={`orgc${sb ? ' sb' : ''}`} ref={ref}>
      <div className="orgc-toggle" role="group" aria-label="Front office staffing">
        <button type="button" className={!sb ? 'on' : ''} onClick={() => setSb(false)}>
          Your front office today
        </button>
        <button type="button" className={sb ? 'on' : ''} onClick={() => setSb(true)}>
          With StayBookt
        </button>
      </div>

      <div className="orgc-stage">
        <div className="orgc-head">The front of your business</div>
        <div className="orgc-seats">
          {SEATS.map((s, i) => (
            <div className="seat" key={s.r} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="av">
                <span className="face you">You</span>
                <span className="face sbm">SB</span>
              </div>
              <div className="rl">{s.r}</div>
              <div className="dd">{s.d}</div>
              <div className="when">9pm, on the couch</div>
            </div>
          ))}
        </div>

        <div className="orgc-you">
          <div className="oy-av">You</div>
          <div className="oy-t">
            <b>Back on the tools.</b>
            <span>Doing the one job only you can do.</span>
          </div>
        </div>
      </div>

      <p className="orgc-cap">
        <span className="c-today">
          Five jobs. One person. After a full day of the work you are actually good at.
        </span>
        <span className="c-sb">
          Five jobs, covered. Same business. You just stopped being the bottleneck.
        </span>
      </p>
    </div>
  );
}

/* ============================================================
 * 3. TWO LENSES CONVERGE
 * Outside and inside, drawing toward the same node.
 * ========================================================== */
export function Converge() {
  const ref = useOnView<HTMLDivElement>(0.45);
  return (
    <div className="cvg" ref={ref}>
      <svg viewBox="0 0 900 260" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="cvgA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0ea5e9" stopOpacity="0.15" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="cvgB" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#f59e0b" stopOpacity="0.15" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        <path className="p pa" d="M40 44 C 260 44, 300 130, 450 130" stroke="url(#cvgA)" />
        <path className="p pb" d="M860 216 C 640 216, 600 130, 450 130" stroke="url(#cvgB)" />

        <circle className="node" cx="450" cy="130" r="13" />
        <circle className="halo" cx="450" cy="130" r="13" />

        <text className="lab la" x="40" y="26">THE OUTSIDE LENS</text>
        <text className="sub la" x="40" y="72">A decade beside owners</text>

        <text className="lab lb" x="860" y="198" textAnchor="end">THE INSIDE LENS</text>
        <text className="sub lb" x="860" y="244" textAnchor="end">Two decades running the operation</text>
      </svg>
      <div className="cvg-out">The same problem.</div>
    </div>
  );
}

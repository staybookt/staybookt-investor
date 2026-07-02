'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';

/* The operating loop, told. A sticky wheel on one side; as you scroll, each
 * node lights up and the panel explains what that part actually does. Content
 * is the whiteboard flywheel in plain owner language. The website + getting
 * found run today; the AI steps roll in as the platform ships. */

type Step = {
  key: string;
  label: string;
  sub: string;
  headline: string;
  body: string;
  isYou?: boolean;
};

const STEPS: Step[] = [
  {
    key: 'discover', label: 'Discover', sub: 'Website + Google',
    headline: 'They find you first',
    body: 'We own the channels that put you in front of customers: a fast website, a complete Google profile, local search, and campaigns back to people you have already served. When someone nearby needs your work, you are who shows up.',
  },
  {
    key: 'capture', label: 'Capture', sub: 'Lead agent',
    headline: 'Nobody slips through',
    body: 'Every call, text, and form gets answered first, in seconds, in your voice. It asks the right questions, handles the easy stuff, and either books the job or hands it to you with a clean summary. No lead sits in a voicemail.',
  },
  {
    key: 'book', label: 'Book', sub: 'Booking + reminders',
    headline: 'The calendar fills itself',
    body: 'The job goes straight onto your calendar, with confirmations and reminders so they show up, and the slot held so it is yours. When it is time, the quote goes out and the payment comes in. No phone tag, no scheduling at 9pm.',
  },
  {
    key: 'deliver', label: 'Deliver', sub: 'You, on the tools', isYou: true,
    headline: 'The part only you can do',
    body: 'You show up and do the work. That is the point. The quoting and the back-and-forth are handled around you, so the only thing on your plate is the job itself.',
  },
  {
    key: 'follow', label: 'Follow up', sub: 'Review request',
    headline: 'Your reputation grows itself',
    body: 'After the job, the right customer gets a nudge for a review, by text and email, plus a thank-you that keeps you top of mind. A quick survey tells you how it went. Good work turns into proof that wins the next job.',
  },
  {
    key: 'bring', label: 'Win them twice', sub: 'Repeat business',
    headline: 'Win them twice',
    body: 'We keep the channels you own warm: reminders when service is due, check-ins on past jobs, a friendly reach-out before they think to call anyone else. The customer you already earned turns into repeat work and referrals, so you win them a second, third, and fourth time.',
  },
  {
    key: 'compound', label: 'Database', sub: 'Compounds',
    headline: 'Your database compounds',
    body: 'Every customer flows into one database that is yours, tagged and segmented, feeding a simple dashboard of what actually matters: leads, bookings, response time, reviews, repeat customers, monthly revenue. Stop wasting time aimlessly searching an endless contact list on your phone just to remember someone. That is not scalable. With a consolidated database you can unleash the power of your rolodex, and running an email campaign is just a few clicks away. The longer it runs, the smarter it gets about your business, and the bigger the asset you own.',
  },
];

// 6 nodes around the ring (the 7th step emphasizes the center).
const ANGLES = [-90, -30, 30, 90, 150, 210];
const CX = 300, CY = 300, R = 200, NR = 60;
const NODE_PTS = ANGLES.map((a) => {
  const rad = (a * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
});

export default function OperatingLoop() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
    setActive(i);
  });

  const wheelY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 24, reduce ? 0 : -24]);
  const wheelScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
  const onCompound = active === STEPS.length - 1;

  return (
    <div ref={ref} className="relative">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-12 lg:grid-cols-2 lg:gap-12">
        {/* Sticky wheel */}
        <div className="top-0 flex h-[62vh] items-center justify-center lg:sticky lg:h-screen">
          <motion.div style={{ y: wheelY, scale: wheelScale }} className="w-full max-w-lg">
            <Wheel active={active} onCompound={onCompound} />
          </motion.div>
        </div>

        {/* Scrolling story panels */}
        <div>
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex min-h-[70vh] flex-col justify-center py-10 lg:min-h-screen">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-[12px] tracking-[0.2em] text-mute">
                  {String(i + 1).padStart(2, '0')} / {STEPS.length}
                </span>
                <p className={`mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${s.isYou ? 'text-hvac-light' : 'text-elec-light'}`}>
                  {s.label} · {s.sub}
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl">{s.headline}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-platinum-soft sm:text-lg">{s.body}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Wheel({ active, onCompound }: { active: number; onCompound: boolean }) {
  return (
    <svg viewBox="0 0 600 600" className="block w-full" role="img" aria-label="The StayBookt operating loop">
      <defs>
        <linearGradient id="ol-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="ol-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* arcs */}
      {NODE_PTS.map((from, i) => {
        const to = NODE_PTS[(i + 1) % NODE_PTS.length];
        return (
          <path key={`arc-${i}`} d={`M ${from.x} ${from.y} A ${R} ${R} 0 0 1 ${to.x} ${to.y}`}
            stroke="url(#ol-grad)" strokeWidth="3" fill="none" strokeLinecap="round"
            opacity={active >= i ? 0.9 : 0.4} style={{ transition: 'opacity 0.4s' }} />
        );
      })}

      {/* center: customer database */}
      <circle cx={CX} cy={CY} r="80" fill="#050811" stroke="url(#ol-grad)" strokeWidth="3"
        opacity={onCompound ? 1 : 0.85} filter={onCompound ? 'url(#ol-glow)' : undefined} style={{ transition: 'opacity 0.4s' }} />
      <text x={CX} y={CY - 10} textAnchor="middle" fill="#fff" fontSize="19" fontWeight="800">Your customer</text>
      <text x={CX} y={CY + 13} textAnchor="middle" fill="#fff" fontSize="19" fontWeight="800">database</text>
      <text x={CX} y={CY + 35} textAnchor="middle" fill="#67E8F9" fontSize="12" fontWeight="700" letterSpacing="2">COMPOUNDS</text>

      {/* nodes */}
      {NODE_PTS.map((p, i) => {
        const s = STEPS[i];
        const isActive = active === i;
        const you = s.isYou;
        const fill = you ? '#10B981' : isActive ? '#0E2230' : '#161B2C';
        const stroke = you ? '#10B981' : isActive ? '#67E8F9' : '#22D3EE';
        return (
          <g key={s.key} filter={isActive ? 'url(#ol-glow)' : undefined} style={{ transition: 'all 0.3s' }}>
            <circle cx={p.x} cy={p.y} r={NR} fill={fill} stroke={stroke} strokeWidth={isActive ? 4 : 2.5}
              opacity={isActive || you ? 1 : 0.82} style={{ transition: 'all 0.3s' }} />
            <text x={p.x} y={p.y - 4} textAnchor="middle" fill={you ? '#050811' : '#fff'} fontSize="18" fontWeight="800"
              opacity={isActive || you ? 1 : 0.92}>{s.label}</text>
            <text x={p.x} y={p.y + 15} textAnchor="middle" fill={you ? '#04231A' : '#D7E3EA'} fontSize="11" fontWeight="600" letterSpacing="0.3"
              opacity={isActive || you ? 1 : 0.85}>{s.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}
